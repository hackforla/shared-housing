from models.sqlalchemy.models import Candidate, Location, QuestionResponse, LocationResponse


def recalculate(location_id: int):
    """Recalculates all candidates eligibility for this location

        Args:
            location_id(int): location identifier used to gather relevant comparison data
    """

    # location = Location.query.get(location_id).first()
    candidates = Candidate.query.get.all()

    location_responses = LocationResponse.query.filter_by(locationId=location_id).all()
    for candidate in candidates:
        candidate_responses = QuestionResponse.query.filter_by(candidateId=candidate['candidateId']).all()
        eligible = True
