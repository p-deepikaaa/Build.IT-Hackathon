from app.ai.services.parser import parse_json_response
from app.ai.services.gemini_client import client
from app.ai.prompts.matching_prompt import MATCHING_PROMPT


MODEL_NAME = "gemini-3.5-flash"


def fallback_match_resources(request: str, resources: list):
    """
    Fallback resource matcher used when Gemini is unavailable.
    Matches request keywords with resource information.
    """

    request_lower = request.lower()

    # Category keywords
    keyword_groups = {
        "medical": [
            "insulin",
            "medicine",
            "medical",
            "doctor",
            "hospital",
            "patient",
            "injury",
            "injured"
        ],
        "food": [
            "food",
            "meal",
            "meals",
            "hungry"
        ],
        "water": [
            "water",
            "drinking"
        ],
        "shelter": [
            "shelter",
            "accommodation",
            "place to stay"
        ],
        "transportation": [
            "transport",
            "vehicle",
            "ride",
            "ambulance"
        ],
        "electricity": [
            "electricity",
            "power",
            "generator"
        ]
    }

    # Detect what type of resource the request needs
    detected_category = None

    for category, keywords in keyword_groups.items():
        if any(
            keyword in request_lower
            for keyword in keywords
        ):
            detected_category = category
            break

    # Try to find matching resource
    for resource in resources:

        resource_lower = resource.lower()

        if (
            detected_category
            and detected_category in resource_lower
        ):
            return {
                "matched_resource": resource,
                "reason": (
                    "This resource matches the requested "
                    f"{detected_category} assistance and "
                    "is currently available."
                )
            }

    # Second fallback:
    # Match any important request word with resource text
    request_words = [
        word
        for word in request_lower.split()
        if len(word) > 3
    ]

    for resource in resources:

        resource_lower = resource.lower()

        if any(
            word in resource_lower
            for word in request_words
        ):
            return {
                "matched_resource": resource,
                "reason": (
                    "This available resource closely "
                    "matches the user's requested assistance."
                )
            }

    # No suitable match
    return {
        "matched_resource": "",
        "reason": "No suitable available resource was found."
    }


def match_resources(request: str, resources: list):

    try:

        prompt = MATCHING_PROMPT.format(
            request=request,
            resources="\n".join(resources)
        )

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        match = parse_json_response(
            response.text
        )

        # Make sure Gemini returned a usable result
        if (
            match
            and match.get("matched_resource")
        ):
            return match

    except Exception as error:

        print(
            "Gemini resource matching failed. "
            "Using fallback matcher:",
            error
        )

    # If Gemini fails or returns invalid result
    return fallback_match_resources(
        request=request,
        resources=resources
    )