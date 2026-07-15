from app.ai.services.summarizer import generate_summary

requests = [
    "Need insulin urgently",
    "Need drinking water",
    "Need food for children",
    "Need temporary shelter",
    "Need medical assistance",
    "Need electricity for oxygen machine"
]

result = generate_summary(requests)

print(result)