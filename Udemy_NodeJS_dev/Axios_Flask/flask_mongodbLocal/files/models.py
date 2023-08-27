from . import noteCollection;
from bson.objectid import ObjectId

# MongoDB find all note function
def getNote(pageNumber):
    try:
        all_note = noteCollection.find().skip((pageNumber - 1) * 10).limit(10)
        return list(all_note)
    except Exception as e:
        return False

# MongoDB delete note function
def deleteNote(id):
    try:
        noteCollection.delete_one({"_id": ObjectId(id)})
        return True
    except Exception as e:
        print(e)
        return False

# MongoDB update note function
def updateNote(id,notes,status):
    try:
        noteCollection.update_one(
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