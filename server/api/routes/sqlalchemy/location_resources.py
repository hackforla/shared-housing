"""REST API handling add, update and retrieval operations on the housing location resource."""
from flask import Blueprint, request, jsonify
from models.sqlalchemy.models import HousingLocation, LocationSchema, db

location_schema = LocationSchema()
locations_schema = LocationSchema(many=True)
location_routes = Blueprint("location_routes", __name__)


@location_routes.route('/', methods=['GET', 'POST'])
def locations():

    if request.method == 'GET':
        location_lst = HousingLocation.query.all()
        result = locations_schema.dump(location_lst)
        return jsonify(result), 200

    else:
        if request.is_json:
            # If a location is added lets kickstart the matching process
            latitude = float(request.json['latitude'])
            longitude = float(request.json['longitude'])
            housing_type_id = int(request.json['housingTypeId'])
            beds_available = int(request.json['bedsAvailable'])
            name = request.json['name']

            location = HousingLocation(latitude, longitude, housing_type_id, beds_available, name)
            db.session.add(location)
            db.session.commit()

            result = location_schema.dump(location)
            return jsonify(result), 201
        else:
            return jsonify(message='request not valid json'), 500


@location_routes.route('/<int:location_id>', methods=['GET', 'PUT', 'PATCH'])
def location(location_id):

    location = HousingLocation.query.filter_by(locationId=location_id).first()
    if not location:
        return 404

    if request.method == 'GET':
        result = location_schema.dump(location)
        return jsonify(result)

    elif request.method == 'PUT':
        if request.is_json():
            location.latitude = float(request.json('latitude'))
            location.longitude = float(request.json('longitude'))
            location.housing_type_id = int(request.json('housing_type_id'))
            location.beds_available = int(request.json('beds_available'))

            db.session.commit()
            result = location_schema.dump(location)
            return jsonify(result), 202
        else:
            return 500

    else:
        pass


# TODO(JOSH): these results should be cached. I don't expect to have to recalculate the location's candidate that often.
#  Unless data changes or something
@location_routes.route('/<location_id>/candidates', methods=['GET'])
def location_candidates(location_id):
    pass