from fastapi import APIRouter, HTTPException, Request
from app.services.supabase_service import db_manager
from app.core.config import settings
from app.core.rate_limit import limiter
from app.models.schemas import LoginRequest, LoginResponse

router = APIRouter()

@router.post("/register-minor")
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def register_student(request: Request, email: str, password: str, parent_id: str):
    # Fallback for demonstration
    if not db_manager.client or "placeholder" in str(settings.SUPABASE_URL):
        return {"status": "VPC_PENDING", "user_id": "mock_uuid_123", "message": "Demo mode: Consent verification sent to parent."}
        
    # Rule: Parental verification is required before account activation
    user = db_manager.client.auth.sign_up({
        "email": email,
        "password": password,
        "options": {"data": {"parent_id": parent_id, "is_verified": False}}
    })
    
    # Send mock VPC request (e.g., OTP to parent mobile)
    return {"status": "VPC_PENDING", "user_id": user.user.id}

@router.post("/verify-consent")
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def verify_consent(request: Request, user_id: str, otp_token: str):
    # In a real scenario, integrate with Aadhaar or DigiLocker [32]
    if otp_token == "123456": # Mock verification
        # Fallback for demonstration
        if not db_manager.client or "placeholder" in str(settings.SUPABASE_URL):
            return {"status": "success", "message": "Demo mode: Age verified successfully"}
            
        return db_manager.client.table("profiles").update({"age_verified": True}).eq("user_id", user_id).execute()
        
    raise HTTPException(status_code=400, detail="Invalid Consent Verification")

@router.post("/login", response_model=LoginResponse)
@limiter.limit(settings.AUTH_RATE_LIMIT)
async def login(request: Request, credentials: LoginRequest):
    if not db_manager.client or "placeholder" in str(settings.SUPABASE_URL):
        if (
            credentials.email == "teacher@example.com"
            and credentials.password == "demo-password"
        ):
            return LoginResponse(
                access_token="demo_token_teacher",
                user_id="demo_teacher_001",
                role="teacher",
                demo_mode=True,
            )
        raise HTTPException(status_code=401, detail="Invalid credentials")

    auth_response = db_manager.client.auth.sign_in_with_password(
        {"email": credentials.email, "password": credentials.password}
    )
    return LoginResponse(
        access_token=auth_response.session.access_token,
        user_id=auth_response.user.id,
        role=auth_response.user.user_metadata.get("role", "student"),
    )
