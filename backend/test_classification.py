from app.services.ai_service import classify_request

result = classify_request(
    "Need insulin urgently for my father."
)

print(result)