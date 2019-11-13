from datetime import date
from marshmallow import Schema, fields, pprint

class CandidateSchema(Schema):
    name = fields.Str()
    uuid = fields.UUID()

class CandidateResponseSchema(Schema):
    question_uuid = fields.UUID()
    candidate_uuid = fields.UUID()
    response_value = fields.Str()

class QuestionSchema(Schema):
    uuid = fields.UUID()
    text = fields.Str()
    response_values = fields.List(fields.Str())

class HousingUnitSchema(Schema):
    uuid = fields.UUID()
    name = fields.Str()

class ResponseConstraint(Schema):
    uuid = fields.UUID()
    question_uuid = fields.UUID()
    housing_unit_uuid = fields.UUID()

bowie = dict(name='David Bowie')
album = dict(artist=bowie, title='Hunky Dory', release_date=date(1971, 12, 17))

schema = CandidateSchema()
result = schema.dump(album)
pprint(result, indent=2)
