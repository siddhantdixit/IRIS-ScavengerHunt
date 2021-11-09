const { ObjectId } = require("bson");

let userQuestions = undefined;

module.exports.init = function(db)
{
	userQuestions = db.collection('userquestions');
// index fields 'user' & 'email' for faster new account validation //
}


module.exports.getAllUsersData = function(callback)
{
	userQuestions.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
}

module.exports.getUserQuestionDataByID = function(qid,callback)
{
    userQuestions.findOne({'user_id':ObjectId(qid)},function(e, res) {
        if (e) callback(e)
        else callback(null, res)
    });
}


