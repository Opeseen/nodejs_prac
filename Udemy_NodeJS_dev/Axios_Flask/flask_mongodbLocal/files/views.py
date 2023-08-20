from flask import Blueprint, render_template, flash, make_response, redirect, url_for, request, flash, jsonify, Response;
import pandas as pd;
from . import invoice;
from bson.objectid import ObjectId;
from bson.json_util import dumps;
from . import models;

views = Blueprint('views',__name__)

@views.route('/dashboard', methods=['GET'])
def dashboard():
    getNotes = (models.getNote())
    if getNotes:
        responses = Response(response=dumps(getNotes),status=200,mimetype='application/json')
        return responses
    else:
        error = "cound not load the note dashboard"
        return error
