from app.ai.services.parser import parse_json_response

from app.ai.services.gemini_client import client
from app.ai.prompts.matching_prompt import MATCHING_PROMPT


MODEL_NAME = "gemini-3.5-flash"


def match_resources(request: str, resources: list):

    prompt = MATCHING_PROMPT.format(
        request=request,
        resources="\n".join(resources)
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return parse_json_response(response.text)
