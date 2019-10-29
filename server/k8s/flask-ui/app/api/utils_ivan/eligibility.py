from models.models import Candidate, Location


def candidate_eligible_for_location(candidate: Candidate,
                                    location: Location) -> bool:
    '''Determines candidate-location compatibility based on hard constraints

        Args:
            candidate(Candidate): contains "responses" dictionary with
                                  candidate responses
            location(Location): contains "constraints" dictionary with
                                  location-specific constraints

        Returns:
            bool: a candidate's eligbility for a given location
    '''

    responses = candidate['responses']

    for key, constraint in location['constraints'].items():
        if responses[key].responseValue in constraint.value_in\
                responses[key].responseValue not in constraint.value_not_in:
            continue
        else:
            return False

    return True
