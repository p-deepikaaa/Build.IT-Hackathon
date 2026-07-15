import json

from app.ai.gemini_client import client
from app.prompts.classify_prompt import CLASSIFICATION_PROMPT


MODEL_NAME = "gemini-3.5-flash"


def classify_request(request: str):

    prompt = CLASSIFICATION_PROMPT.format(
        request=request
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)