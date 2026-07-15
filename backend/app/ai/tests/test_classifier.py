from app.ai.services.classifier import classify_request

request = input("Enter your request: ")

result = classify_request(request)

print("\nAI Result:")
print(result)