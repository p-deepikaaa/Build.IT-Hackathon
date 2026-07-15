from app.ai.services.parser import parse_json_response

from app.ai.services.gemini_client import client
from app.ai.prompts.summary_prompt import SUMMARY_PROMPT


MODEL_NAME = "gemini-3.5-flash"


def generate_summary(requests: list):

    prompt = SUMMARY_PROMPT.format(
        requests="\n".join(requests)
    )

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt
    )

    return parse_json_response(response.text)