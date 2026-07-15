from app.ai.services.parser import parse_json_response

from app.ai.services.gemini_client import client
from app.ai.prompts.classify_prompt import CLASSIFICATION_PROMPT

MODEL_NAME = "gemini-3.5-flash"


def classify_request(request: str):

    prompt = CLASSIFICATION_PROMPT.format(
        request=request
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return parse_json_response(response.text)