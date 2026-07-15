from app.ai.services.priority_detector import detect_priority

result = detect_priority(
    "Need ambulance immediately. My father is unconscious."
)

print(result)