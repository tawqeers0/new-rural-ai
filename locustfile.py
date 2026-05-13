from locust import HttpUser, between, task


class TeacherMatchingUser(HttpUser):
    wait_time = between(0.2, 1.0)

    @task(4)
    def check_school_availability(self):
        self.client.get("/api/v1/connectivity/schools/101/availability")

    @task(4)
    def check_teacher_status(self):
        self.client.get("/api/v1/connectivity/teachers/TCH-1001/status")

    @task(1)
    def health_check(self):
        self.client.get("/")

    @task(1)
    def ussd_status(self):
        self.client.post(
            "/api/v1/connectivity/ussd",
            data={
                "sessionId": "load-test",
                "serviceCode": "*123#",
                "phoneNumber": "+919999999999",
                "text": "1*TCH-1001",
            },
        )
