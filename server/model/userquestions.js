const moment 		= require('moment-timezone');
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
		let total_levels = 5;
		let questionBoolIndex = `questions.${levelNo}.done`;
		let questionTimeIndex = `questions.${levelNo}.timestamp`;
		let myquery = {'user_id':ObjectId(userId)};
		let newvalues = { 
			$set:{
				[questionBoolIndex]:true,
				[questionTimeIndex]:moment().tz("Asia/Kolkata").format('MMMM Do YYYY, h:mm:ss a')
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

module.exports.insertNewlyRegisteredUserDataSampleData = function(userId,callback)
{
	try{
		let sampledata = {
			user_id:userId,
			current_level:1,
			game_completed:false,
			questions:{
				1:{
					question_id:ObjectId('618ac61d25524d662c55bbb9'),
					done:false
				},
				2:{
					question_id:ObjectId('61897a6371fd9577fc7e335f'),
					done:false
				},
				3:{
					question_id:ObjectId('618ac9d625524d662c55bbba'),
					done:false
				},
			}
		};
		userQuestions.insertOne(sampledata,function(err,res){
			console.log(err);
			callback(err,res);
		});

	}catch(error)
	{
		callback(error);
	}
}
