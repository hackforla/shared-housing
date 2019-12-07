from models.sqlalchemy.models import QuestionResponse, LocationResponse, Question


def candidate_eligible_for_location(candidate_responses: QuestionResponse,
                                    location_responses: LocationResponse) -> bool:
    """Determines candidate-location compatibility based on hard constraints

        Args:
            candidate_responses(QuestionResponse): contains list of responses provided by candidate
            location_responses(LocationResponse): contains list of responses provided by location

        Returns:
            bool: a candidate's eligibility for a given location
    """

    candidate_response_index = 0
    for location_response in location_responses:
        question = Question.query.get(location_response.questionId)

        if question is not None and question.isConstraint:
            while candidate_responses[candidate_response_index].questionId < question.questionId:
                if candidate_response_index >= len(candidate_responses) - 1:
                    return False
                candidate_response_index = candidate_response_index + 1
            if not candidate_responses[candidate_response_index].questionId == question.questionId:
                return False

            # TODO(JOSH): Might be an easier way to do this?
            if question.inverseRelationship:
                if (not bool(candidate_responses[candidate_response_index].responseValue)) == bool(
                        location_response.responseValue):
                    return False
            else:
                if bool(candidate_responses[candidate_response_index].responseValue) == bool(
                        location_response.responseValue):
                    return False

    return True
