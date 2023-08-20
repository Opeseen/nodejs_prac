from . import invoice;
from bson.objectid import ObjectId

# MongoDB find all note function
def getNote():
    try:
        all_note = invoice.find()
        return list(all_note)
    except Exception as e:
        return False

# MongoDB delete note function
def deleteNote(id):
    try:
        invoice.delete_one({"_id": ObjectId(id)})
        return True
    except Exception as e:
        print(e)
        return False

# MongoDB update note function
def updateNote(id,notes,status):
    try:
        invoice.update_one(
            {
                "_id":ObjectId(id)
            },
            {
                "$set":{
                    "note":notes,
                    "status":status
                }
            },
            upsert=False
        )
        return True
    except Exception as e:
        print(e)
        return False