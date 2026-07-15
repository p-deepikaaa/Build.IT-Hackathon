from app.ai.services.summarizer import generate_summary

requests = []

print("Enter community requests one by one.")
print("Type 'done' when finished.")

while True:
    request = input("Request: ")

    if request.lower() == "done":
        break

    requests.append(request)

result = generate_summary(requests)

print("\nCommunity Summary:")
print(result)