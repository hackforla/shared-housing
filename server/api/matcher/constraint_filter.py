from models.sqlalchemy.models import Candidate, QuestionResponse, LocationResponse, CandidateLocation, db

from utils_ivan import eligibility


def recalculate(location_id: int):
    """Recalculates all candidates eligibility for this location

        Args:
            location_id(int): location identifier used to gather relevant comparison data
    """

    # TODO(JOSH): Gets all candidates for filtering. Seems like there is room for optimization here. Potentially only
    #  pull back candidates who have been added or modified since after last recalculating
    candidates = Candidate.query.all()

    location_responses = LocationResponse.query.filter_by(locationId=location_id) \
        .order_by(LocationResponse.questionId).all()
    for candidate in candidates:
        candidate_responses = QuestionResponse.query.filter_by(candidateId=candidate.candidateId) \
            .order_by(QuestionResponse.questionId).all()

        # Check to see if the candidate and location do not violate any hard constraints
        if eligibility.candidate_eligible_for_location(candidate_responses, location_responses):
            # Check to see if the candidate location combination has already been added
            candidate_location = CandidateLocation.query.get((candidate.candidateId, location_id))
            if candidate_location is None:
                eligible_candidate = CandidateLocation(candidate.candidateId, location_id)

                db.session.add(eligible_candidate)
                db.session.commit()
        else:
            # TODO(JOSH): delete is not working properly right now. Read Sqlalchemy docs to properly delete record
            candidate_location = CandidateLocation.query.get((candidate.candidateId, location_id))
            if candidate_location is not None:
                CandidateLocation.query.filter_by(candidateId=candidate.candidateId, locationId=location_id) \
                    .delete(synchronize_session=False)
