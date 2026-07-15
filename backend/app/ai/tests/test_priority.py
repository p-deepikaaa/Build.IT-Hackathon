from app.ai.services.priority_detector import detect_priority

request = input("Enter your request: ")

result = detect_priority(request)

print("\nPriority Result:")
print(result)