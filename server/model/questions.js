const { ObjectId } = require("bson");

let questions = undefined;

module.exports.init = function(db)
{
	questions = db.collection('questions');
// index fields 'user' & 'email' for faster new account validation //
}


module.exports.getAllQues = function(callback)
{
	questions.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

module.exports.getQuesById = function(qid,callback)
{
    questions.findOne(ObjectId(qid),function(e, res) {
        if (e) callback(e)
        else callback(null, res)
    });
}


