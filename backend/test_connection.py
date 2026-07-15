from app.ai.gemini_client import client

response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Say Hello from NeighborhoodGrid AI!"
)

print(response.text)