from app.ai.services.matcher import match_resources

request = input("Enter your request: ")

resources = []

print("Enter available resources one by one.")
print("Type 'done' when finished.")

while True:
    resource = input("Resource: ")

    if resource.lower() == "done":
        break

    resources.append(resource)

result = match_resources(request, resources)

print("\nMatching Result:")
print(result)