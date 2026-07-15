from app.ai.services.matcher import match_resources

resources = [
    "Volunteer A - Drinking Water",
    "Volunteer B - Medicines",
    "Volunteer C - Shelter",
    "Volunteer D - Charging Station"
]

result = match_resources(
    "Need clean drinking water for my family",
    resources
)

print(result)