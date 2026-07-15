MATCHING_PROMPT = """
You are an AI assistant for NeighborhoodGrid.

Your task is to match a user's request with the best available resource.

Choose ONLY ONE best resource.

Return ONLY valid JSON.

Format:

{{
    "matched_resource": "",
    "reason": ""
}}

User Request:
{request}

Available Resources:
{resources}
"""