import html
import re


CONTROL_CHAR_RE = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]")
WHITESPACE_RE = re.compile(r"\s+")
SAFE_IDENTIFIER_RE = re.compile(r"^[A-Za-z0-9_-]{3,40}$")
SQL_INJECTION_RE = re.compile(
    r"(--|/\*|\*/|;|\b(ALTER|DELETE|DROP|EXEC|INSERT|SELECT|TRUNCATE|UNION|UPDATE)\b)",
    re.IGNORECASE,
)


def normalize_text(value: str) -> str:
    cleaned = CONTROL_CHAR_RE.sub("", value)
    return WHITESPACE_RE.sub(" ", cleaned).strip()


def reject_sql_injection(value: str) -> None:
    if SQL_INJECTION_RE.search(value):
        raise ValueError("Input contains unsafe SQL-like content")


def sanitize_text(value: str, *, max_length: int = 300) -> str:
    normalized = normalize_text(value)
    reject_sql_injection(normalized)
    escaped = html.escape(normalized, quote=True)
    return escaped[:max_length]


def sanitize_identifier(value: str) -> str:
    normalized = normalize_text(value).upper()
    if not SAFE_IDENTIFIER_RE.fullmatch(normalized):
        raise ValueError("Identifier can only contain letters, numbers, _ or -")
    return normalized
