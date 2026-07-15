from app.ai.services.parser import parse_json_response

from app.ai.services.gemini_client import client
from app.ai.prompts.priority_prompt import PRIORITY_PROMPT


MODEL_NAME = "gemini-3.5-flash"


def detect_priority(request: str):

    prompt = PRIORITY_PROMPT.format(
        request=request
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return parse_json_response(response.text)