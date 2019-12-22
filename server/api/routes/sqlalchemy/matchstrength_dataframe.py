from flask import Blueprint, request, jsonify
import numpy as np
import pandas as pd

dataframe_routes = Blueprint("dataframe_routes", __name__)
@dataframe_routes.route('', methods=[]) # TODO: URLS and methods
def percentage_dataframe():
    """
    Args:
        TODO: Specify arguments needed to create pivot table.
    Returns:
        Pandas Dataframe: Each cell represents a matching percentage.
    """
   matches_df = pd.DataFrame(# TODO: Insert dataframe source here )
   matches_df = matches_df('candidateId', 'locationId', 'matchStrength')
   return matches_df


