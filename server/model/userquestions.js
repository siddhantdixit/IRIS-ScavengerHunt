const moment 		= require('moment');
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
	try {
		userQuestions.findOne({'user_id':ObjectId(qid)},function(e, res) {
			if (e) callback(e)
			else callback(null, res)
		});
		
	} catch (error) {
		callback(error);
	}

}

module.exports.updateUserQuestionDoneAddTimeStampIncrementLevel = function(userId,levelNo,callback) 
{
	try {
		console.log("1   updateUserQuestionDoneAddTimeStampIncrementLevel ------>  ");
		let total_levels = 3;
		let questionBoolIndex = `questions.${levelNo}.done`;
		let questionTimeIndex = `questions.${levelNo}.timestamp`;
		let myquery = {'user_id':ObjectId(userId)};
		let newvalues = { 
			$set:{
				[questionBoolIndex]:true,
				[questionTimeIndex]:moment().format('MMMM Do YYYY, h:mm:ss a')
			}
		};
		console.log("2   updateUserQuestionDoneAddTimeStampIncrementLevel ------>  ");
		if(total_levels == parseInt(levelNo))
		{
			newvalues['$set']['game_completed'] = true;
		}
		else
		{
			newvalues['$set']['current_level'] = parseInt(levelNo)+1;
		}
		console.log("3 updateUserQuestionDoneAddTimeStampIncrementLevel ------>  ");
		console.log(newvalues);
		userQuestions.updateOne(myquery,newvalues,function(e,res){
			if(e) callback(e)
			else callback(null,res)
		});

	} catch (error) {
		callback(error);
	}
}

