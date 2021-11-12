
const accounts = require('./model/accounts');
const questions = require('./model/questions');
const userQuestions = require('./model/userquestions');	
const emailjs = require('./utils/emailjs');
const countries = require('./json/countries');
const { url } = require('stylus');

module.exports = function(app) {

/*

*/
	app.set('json spaces', 2);

	app.get('/qtext',function(req,res){

		let template_data = {
			current_level:'1',
			heading_content:`“Greetings of the day, hunters. Get ready as the treasure awaits you. The intense search has now begun. All the best!”`,
			text_content:`                   Character encoding is an essential part of digital communication. The Internet Assigned Numbers Authority (IANA) prefers the name US-ASCII for this character encoding. ASCII was developed from telegraph code. Its first commercial use was as a seven-bit teleprinter code promoted by Bell data services. Work on the ASCII standard began in May 1961, with the first meeting of the American Standards Association's (ASA) (now the American National Standards Institute or ANSI) X3.2 subcommittee. The first edition of the standard was published in 1963, underwent a major revision during 1967, and experienced its most recent update during 1986. Compared to earlier telegraph codes, the proposed Bell code and ASCII were both ordered for more convenient sorting (i.e., alphabetization) of lists and added features for devices other than teleprinters.

			Originally based on the English alphabet, ASCII encodes 128 specified characters into seven-bit integers as shown by the ASCII chart above. Ninety-five of the encoded characters are printable: these include the digits 0 to 9, lowercase letters a to z, uppercase letters A to Z, and punctuation symbols. In addition, the original ASCII specification included 33 non-printing control codes which originated with Teletype machines; most of these are now obsolete, although a few are still commonly used, such as the carriage return, line feed and tab codes.

			We will set you off for the adventurous venture with this information. Remember to relate this information with any message you might have got before.`
		}

		res.render('qtypes/qtext',template_data);
	});

	app.get('/qimage',function(req,res){

		let template_data = {
			current_level:'2',
			heading_content:'Feel the Random Image',
			image_url:'https://source.unsplash.com/random/800x600'
		}
		res.render('qtypes/qimage',template_data);
	});

	app.get('/qaudio',function(req,res){
		let template_data = {
			current_level:'3',
			heading_content:'Feel the Random Audio',
			audio1_url:'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
			audio2_url:'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav',
			audio3_url:'https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav'
		}
		res.render('qtypes/qaudio',template_data);
	});


	app.get('/mylevel',function(req,res){
		res.render('level/base');
	});
    
	app.get('/mylevel_image',function(req,res){
		res.render('level/base_image');
	});
    

	app.get('/mylevel_audio',function(req,res){
		res.render('level/base_audio');
	});

	app.get('/questions',function(req,res){
		questions.getAllQues( function(e, qns){
			console.log(qns);
			res.send(qns);
		});
	});

	app.get('/questionByID',function(req,res){
		questions.getQuesById('618ac9d625524d662c55bbba',function(e,qns){
			if(qns)
			{
				res.send(qns);
			}
			else
			{
				res.sendStatus(404);
			}
		});
	});

	app.get('/userQuestionsData',function(req,res){
		 userQuestions.getAllUsersData( function(e, qns){
			console.log(qns);
			res.send(qns);
		});
	});



	app.get('/userQuestionsDataByID',function(req,res){
		//Get User Question Data by His ID
		userQuestions.getUserQuestionDataByID("6187b1871dd9a35738b95e19",function(e, qns){
			console.log(qns);
			res.send(qns);
		});
	});




	app.get('/level', async function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			const lvldat = await getLevelData(req,res);
			if(lvldat=='completed')
			{
				res.send('Game Completed');
			}
			else if(lvldat)
			{
				// res.send(lvldat);
				if(lvldat.qdata.type == 'text')
				{
					let template_data = {
						current_level:lvldat.currentLvl,
						heading_content:lvldat.qdata.text,
						text_content: lvldat.qdata.content.paragraph
					}
					res.render('qtypes/qtext',template_data);
				}
				else if(lvldat.qdata.type == 'image')
				{
					let template_data = {
						current_level:lvldat.currentLvl,
						heading_content:lvldat.qdata.text,
						image_url:lvldat.qdata.content['image-url']
					}
					res.render('qtypes/qimage',template_data);
					
				}
				else if(lvldat.qdata.type == 'audio')
				{
					let template_data = {
						current_level:lvldat.currentLvl,
						heading_content:lvldat.qdata.text,
						audio1_url: lvldat.qdata.content['audio1-url'],
						audio2_url: lvldat.qdata.content['audio2-url'],
						audio3_url: lvldat.qdata.content['audio3-url']
					}
					res.render('qtypes/qaudio',template_data);
				}
				else
				{
					res.status(404).send("Something went wrong! Report Issue <a href='https://github.com/siddhantdixit/IRIS-Project'>https://github.com/siddhantdixit/IRIS-Project</a>");
				}
			}
			else
			{			
				res.status(404).send("Something went wrong! Report Issue <a href='https://github.com/siddhantdixit/IRIS-Project'>https://github.com/siddhantdixit/IRIS-Project</a>");
			}
			console.log("AFTER Level Data LINE ");
			// res.render('level/base');
		}
	});


	app.post('/level',async function(req,res){
		
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			if(req.body.answer)
			{
				let entered_answer = req.body.answer.toString().toLowerCase().trim();
				const lvldat = await getLevelData(req,res);
				if(lvldat=='completed')
				{
					res.send('Game Completed');
				}
				else if(lvldat)
				{
					if(entered_answer==lvldat.qdata.answer.toLowerCase())
					{
						const myout = await makeAnswerCorrectAndUpdateLevel(lvldat.currentLvl,req,res);
						if(myout.result.ok == 1)
						{
							res.send({"msg":"YES"});
						}
						else
						{
							res.send({"msg":"Something Went Wrong try again!"});
						}
					}
					else
					{
						res.send({"msg":"NO"});
					}
				}
				else
				{			
					res.status(404).send("Something went wrong! Report Issue <a href='https://github.com/siddhantdixit/IRIS-Project'>https://github.com/siddhantdixit/IRIS-Project</a>");
				}
				console.log("AFTER Level Data LINE ");
			// res.render('level/base');
			}
			else
			{
				res.status(404).send({"msg":"We need answer to verify"});
			}
		}
	});


	function makeAnswerCorrectAndUpdateLevel(levelNo,req,res)
	{
		return new Promise(resolve=>{

			try {
				let userID = req.session.user._id;
				console.log("makeAnswerCorrectAndUpdateLevel ----> ");
				userQuestions.updateUserQuestionDoneAddTimeStampIncrementLevel(userID,levelNo,function(e,data){
					resolve(data);
				});

			} catch (error) {
				resolve(error);
			}
		});
	}

	function getLevelData(req,res)
	{
		return new Promise(resolve=>{
		try {
			
			let level_data = {};

			let userID = req.session.user._id;
			userQuestions.getUserQuestionDataByID(userID,function(e, userdat){
				if(userdat)
				{
					let gameCompleted = userdat.game_completed;
					if(gameCompleted)
					{
						resolve('completed');
					}
					else
					{
						let currentLvl = userdat.current_level.toString();

						let currentQuestionId =  userdat.questions[currentLvl]['question_id'];

						questions.getQuesById(currentQuestionId,function(e,qdata){
							if(qdata)
							{
								console.log(qdata);
								level_data.currentLvl = currentLvl;
								level_data.qdata = qdata;
								resolve(level_data);
							}
							else
							{
								resolve(false);
							}
						});
					}					
				}
				else
				{
					resolve(false);
				}
				
			});
		} catch (error) {
			console.log(error);
			resolve(false);
		}
	});
}

/*
	login & logout
*/

	app.get('/', function(req, res){
	// check if the user has an auto login key saved in a cookie //
	console.log("==== 1. / Called ====");
		if (req.cookies.login == undefined){
			console.log("==== 2. LOGIN Redirect ====");
			res.render('login', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
			console.log("==== 3. Auto Login Started ====");
			accounts.validateLoginKey(req.cookies.login, function(e, o){
				if (o){
					console.log("==== 4. IF O Passed ====");
					console.log(o);
					accounts.autoLogin(o.user, o.pass, function(o){
						req.session.user = o;
						console.log("==== 5. LEVEL Redirect ====");
						res.redirect('/level');
					});
				}	
				else{
					console.log("==== 6. LOGIN Redirect ====");
					res.render('login', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});

	app.post('/', function(req, res){
		accounts.manualLogin(req.body['user'], req.body['pass'], function(e, o){
			if (!o){
				res.status(400).send(e);
			}	else{
				req.session.user = o;
				if (req.body['remember-me'] == 'false'){
					res.status(200).send(o);
				}	else{
					accounts.generateLoginKey(o.user, req.ip, function(key){
						res.cookie('login', key, { maxAge: 900000 });
						res.status(200).send(o);
					});
				}
			}
		});
	});

	app.post('/logout', function(req, res){
		res.clearCookie('login');
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	})

/*
	control panel
*/

	app.get('/settings', function(req, res) {
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			console.log(`============= SETTINGS ======== Session `);
			console.log(req.session.user);
			res.render('home', {
				title : 'Control Panel',
				countries : countries,
				udata : req.session.user
			});
		}
	});

	app.post('/settings', function(req, res){
		if (req.session.user == null){
			res.redirect('/');
		}	else{
			accounts.updateAccount({
				id		: req.session.user._id,
				name	: req.body['name'],
				email	: req.body['email'],
				pass	: req.body['pass'],
				country	: req.body['country']
			}, function(e, o){
				if (e){
					res.status(400).send('error-updating-account');
				}	else{
					req.session.user = o.value;
					res.status(200).send('ok');
				}
			});
		}
	});

/*
	new accounts
*/

	app.get('/signup', function(req, res) {
		res.render('signup', {  title: 'Signup', countries : countries });
	});

	app.post('/signup', function(req, res){
		accounts.addNewAccount({
			name 	: req.body['name'],
			email 	: req.body['email'],
			user 	: req.body['user'],
			pass	: req.body['pass'],
			country : req.body['country']
		}, function(e){
			if (e){
				res.status(400).send(e);
			}	else{
				res.status(200).send('ok');
			}
		});
	});

/*
	password reset
*/

	app.post('/lost-password', function(req, res){
		let email = req.body['email'];
		accounts.generatePasswordKey(email, req.ip, function(e, account){
			if (e){
				res.status(404).send(e);
			}	else{
				emailjs.dispatchResetPasswordLink(account, function(e){
			// TODO this callback takes a moment to return, add a loader to give user feedback //
					if (!e){
						res.status(200).send('ok');
					}	else{
						log(e);
						res.status(500).send('unable to dispatch password reset');
					}
				});
			}
		});
	});

	app.get('/reset-password', function(req, res) {
		accounts.validatePasswordKey(req.query['key'], req.ip, function(e, o){
			if (e || o == null){
				res.redirect('/');
			} else{
				req.session.passKey = req.query['key'];
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});

	app.post('/reset-password', function(req, res) {
		let newPass = req.body['pass'];
		let passKey = req.session.passKey;
	// destory the session immediately after retrieving the stored passkey //
		req.session.destroy();
		accounts.updatePassword(passKey, newPass, function(e, o){
			if (o){
				res.status(200).send('ok');
			}	else{
				res.status(400).send('unable to update password');
			}
		})
	});

/*
	view, delete & reset accounts
*/

	app.get('/print', function(req, res) {
		accounts.getAllRecords( function(e, accounts){
			res.render('print', { title : 'Account List', accts : accounts });
		})
	});

	app.post('/delete', function(req, res){
		accounts.deleteAccount(req.session.user._id, function(e, obj){
			if (!e){
				res.clearCookie('login');
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			}	else{
				res.status(400).send('record not found');
			}
		});
	});

	app.get('/reset', function(req, res) {
		accounts.deleteAllAccounts(function(){
			res.redirect('/print');
		});
	});

	app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

};
