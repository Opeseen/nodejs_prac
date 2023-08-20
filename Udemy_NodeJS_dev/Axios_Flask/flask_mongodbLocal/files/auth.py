from flask import Blueprint, render_template, request, flash, jsonify, make_response;
from datetime import datetime;
from . import invoice;
from pymongo import errors;
from . import models

auth = Blueprint('auth',__name__)

# Route function to create a note
@auth.route('/create_note',methods=['GET', 'POST'])
def create_note():
    if request.method == 'POST':
        defaultNoteStatus = 'UNCOMPLETED'
        NOTE = request.form.get('note').upper().strip()
        if len(NOTE) > 150:
            flash("Length of Note can't be greater than 150 Characters",category='error')
        else:
            try:
                now = datetime.now()
                date = now.strftime("%B %d, %Y %H:%M:%S")
                invoice.insert_one({'note':NOTE, 'status':defaultNoteStatus , 'date':date})
                flash(' Note Successfully Added',category='success')
                response = make_response(render_template('create_note.html'), 201)
                response.headers["Content-Type"] = "text/html"
                return response
            except Exception as e:
                flash('Error Encountered while adding your note - Contact Admin Support',category='error')
                response = make_response(render_template('create_note.html'), 400)
                response.headers["Content-Type"] = "text/html"
                return response
    
    return render_template('create_note.html')
