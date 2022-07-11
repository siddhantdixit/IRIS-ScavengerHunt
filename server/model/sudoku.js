const moment 		= require('moment-timezone');
const { ObjectId } = require("bson");

let sudokuManager = undefined;

init = function(db)
{
	sudokuManager = db.collection('sudoku');
}

saveSudokuAnswer = function(userId,sudokuSet,sudokuAns,callback)
{
	try {
		let myquery = {'user_id':ObjectId(userId)};
		let newvalues = { 
			$set:{
				user_id:ObjectId(userId),
				sudokuSet:sudokuSet,
				sudokuAns:sudokuAns,
				timestamp:moment().tz("Asia/Kolkata").format('MMMM Do YYYY, h:mm:ss a')
			}
		};
		const options = { upsert: true };
		sudokuManager.updateOne(myquery,newvalues,options,function(e,res){
			if(e) callback(e)
			else callback(null,res)
		});

	} catch (error) {
		callback(error);
	}
}

getSavedAnswer = function(userId,callback)
{
	try {
		let myquery = {'user_id':ObjectId(userId)};
		sudokuManager.findOne(myquery,function(e,res){
			if(e) callback(e)
			else callback(null,res)
		});

	} catch (error) {
		callback(error);
	}
}


const sudokuAns1 = [
    {number:1,direction:'across',row:1,column:13,clue:'this brainchild of a hunter taught python programmers to plot',answer:'matplotlib',hint:'http://www.angelo.edu/asu_facts/history.php'},
    {number:2,direction:'down',row:1,column:16,clue:'work your brains like a jet with this python editor',answer:'pycharm',hint:'http://www.angelo.edu/services/ticket_office/softball.php'},
    {number:3,direction:'down',row:2,column:7,clue:'this function from the NumPy library is used to calculate scalar products of vectors and matrices',answer:'dot',hint:'http://www.angelo.edu/services/specialevents/hhuc.php'},
    {number:4,direction:'down',row:2,column:10,clue:"This library's name was derived from the word panel data",answer:'pandas',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:5,direction:'across',row:3,column:12,clue:'A library for C++ works in python too',answer:'opencv',hint:'http://myfuture.angelo.edu/content/news/13280-rams-ultimate-frisbee'},
    {number:6,direction:'down',row:3,column:14,clue:'an oops concept to wrap up your data',answer:'encapsulation',hint:'http://www.angelosports.com/news/2017/5/20/no-1-rambelles-clinch-trip-to-college-softball-world-series-with-6-2-win-over-texas-woman-s.aspx'},
    {number:7,direction:'across',row:4,column:5,clue:'This came out in 2008 and made the whole python world change',answer:'python3',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:7,direction:'down',row:4,column:5,clue:'it joins point to point to create a 2D hexagonal diagram',answer:'plot',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:8,direction:'down',row:4,column:18,clue:'Microsoft made this blue beast but not for windows, even Mac and Linux users prefer this when coding',answer:'vscode',hint:'https://youtu.be/VGF4ibgcHQE?t=6s'},
    {number:9,direction:'across',row:5,column:14,clue:'pythons own little family containing its members and what all they do',answer:'class',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:10,direction:'across',row:6,column:9,clue:"this is python's anonymous function, but wait it won’t hack your PC",answer:'lambda',hint:'http://www.angelo.edu/content/profiles/6250-blue-and-gold'},
    {number:11,direction:'across',row:9,column:5,clue:'This library can make use of your camera but only if you have OpenCV',answer:'videocapture',hint:'http://www.angelo.edu/content/news/15372-10000-strong'},
    {number:12,direction:'across',row:11,column:7,clue:'module to manage user-editable configuration files for an application',answer:'configparser',hint:'http://www.angelo.edu/content/news/13930-asu-goes-clubbing/'},
    {number:13,direction:'down',row:11,column:9,clue:"Working with numerics was made possible using this Travis' project",answer:'numpy',hint:'http://www.angelo.edu/content/news/15450-ram-rugby-football-club'},
    {number:14,direction:'down',row:11,column:20,clue:'This library acts as a Python interface for artificial neural networks',answer:'keras',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:15,direction:'across',row:13,column:12,clue:'there are many creators of python as its opensource but there is only one benevolent dictator',answer:'guidovonrossum',hint:'https://www.angelo.edu/asu_facts/traditions.php'},
    {number:16,direction:'down',row:13,column:23,clue:"datasets can be big and small, some might even look like a pig or a mole, attributes they all have, and this one's pandas' fav",answer:'shape',hint:'http://www.angelosports.com/news/2017/5/27/fischer-wins-javelin-national-title-rams-place-10th-and-rambelles-tie-for-13th-at-ncaa-division-ii-track-field-championships.aspx'},
    {number:17,direction:'across',row:15,column:14,clue:"Python doesn't speak English but this library helps in understanding it",answer:'nltk',hint:'http://www.angelo.edu/content/news/15478-athletics-takes-some-big-wins'},
    {number:18,direction:'across',row:16,column:23,clue:"It was initially developed by the Facebook artificial-intelligence research group and Uber’s Pyro software",answer:'pytorch',hint:'http://www.angelosports.com/news/2017/3/14/womens-basketball-belles-historic-season-comes-to-a-close-in-regional-championship-game.aspx?path=wbball'},
    {number:19,direction:'across',row:17,column:13,clue:'The function returns True if the specified object is of the specified type',answer:'isinstance',hint:'http://www.angelo.edu/president_welcome/'},
];

const sudokuAns2 = [
    {number:1,direction:'down',row:1,column:13,clue:'an oops concept to wrap up your data',answer:'encapsulation',hint:'http://www.angelo.edu/asu_facts/history.php'},
    {number:2,direction:'down',row:9,column:15,clue:'This library can make use of your camera but only if you have opencv',answer:'videocapture',hint:'http://www.angelo.edu/services/ticket_office/softball.php'},
    {number:3,direction:'across',row:12,column:10,clue:'Microsoft made this blue beast but not for windows, even Mac and Linux users prefer this when coding',answer:'vscode',hint:'http://www.angelo.edu/services/specialevents/hhuc.php'},
    {number:4,direction:'down',row:14,column:7,clue:'module to manage user-editable configuration files for an application',answer:'configparser',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:5,direction:'across',row:15,column:4,clue:'It was initially developed by Facebook artificial-intelligence research group, and Uber’s Pyro software',answer:'pytorch',hint:'http://myfuture.angelo.edu/content/news/13280-rams-ultimate-frisbee'},
    {number:5,direction:'down',row:15,column:4,clue:"This library's name was derived from the word panel data",answer:'pandas',hint:'http://myfuture.angelo.edu/content/news/13280-rams-ultimate-frisbee'},
    {number:6,direction:'down',row:15,column:13,clue:'This came out in 2008 and made the whole python world change',answer:'python3',hint:'http://www.angelosports.com/news/2017/5/20/no-1-rambelles-clinch-trip-to-college-softball-world-series-with-6-2-win-over-texas-woman-s.aspx'},
    {number:7,direction:'down',row:15,column:17,clue:'function returns True if the specified object is of the specified type',answer:'isinstance',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:8,direction:'down',row:18,column:19,clue:"Working with numerics was made possible using this Travis' project",answer:'numpy',hint:'https://youtu.be/VGF4ibgcHQE?t=6s'},
    {number:9,direction:'across',row:19,column:7,clue:'there are many creators of python as its opensource but there is only one benevolent dictator',answer:'guidovonrossum',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:10,direction:'down',row:20,column:23,clue:'it joins point to point to create a 2D hexagonal diagram',answer:'plot',hint:'http://www.angelo.edu/content/profiles/6250-blue-and-gold'},
    {number:11,direction:'across',row:21,column:6,clue:"this is python's anonymous function, but wait it wont hack your PC",answer:'lambda',hint:'http://www.angelo.edu/content/news/15372-10000-strong'},
    {number:12,direction:'across',row:21,column:16,clue:'this brainchild of a hunter taught python programmers to plot',answer:'matplotlib',hint:'http://www.angelo.edu/content/news/13930-asu-goes-clubbing/'},
    {number:13,direction:'across',row:23,column:21,clue:'this function from NumPy library is used to calculated scalar products of vectors and matrices',answer:'dot',hint:'http://www.angelo.edu/content/news/15450-ram-rugby-football-club'},
    {number:14,direction:'across',row:24,column:5,clue:'A library for C++ works in python too',answer:'opencv',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:15,direction:'across',row:24,column:13,clue:"datasets can be big and small, some might even look like a pig or a mole, attributes they all have, and this one's pandas' fav",answer:'shape',hint:'https://www.angelo.edu/asu_facts/traditions.php'},
    {number:16,direction:'down',row:24,column:16,clue:'work your brains like a jet with this python editor',answer:'pycharm',hint:'http://www.angelosports.com/news/2017/5/27/fischer-wins-javelin-national-title-rams-place-10th-and-rambelles-tie-for-13th-at-ncaa-division-ii-track-field-championships.aspx'},
    {number:17,direction:'down',row:26,column:14,clue:"Python doesn't speak english but this library helps in understanding it",answer:'nltk',hint:'http://www.angelo.edu/content/news/15478-athletics-takes-some-big-wins'},
    {number:18,direction:'down',row:26,column:18,clue:'pythons own little family containing its members and what all they do',answer:'class',hint:'http://www.angelosports.com/news/2017/3/14/womens-basketball-belles-historic-season-comes-to-a-close-in-regional-championship-game.aspx?path=wbball'},
    {number:19,direction:'across',row:29,column:14,clue:'This library acts as a Python interface for artificial neural networks',answer:'keras',hint:'http://www.angelo.edu/president_welcome/'},
];



const sudokuAns3 = [
    {number:1,direction:'down',row:1,column:19,clue:'It was initially developed by Facebook artificial-intelligence research group, and Uber’s Pyro software',answer:'pytorch',hint:'http://www.angelo.edu/asu_facts/history.php'},
    {number:2,direction:'across',row:2,column:15,clue:"Working with numerics was made possible using this Travis' project",answer:'numpy',hint:'http://www.angelo.edu/services/ticket_office/softball.php'},
    {number:3,direction:'across',row:4,column:15,clue:'This library can make use of your camera but only if you have opencv',answer:'videocapture',hint:'http://www.angelo.edu/services/specialevents/hhuc.php'},
    {number:4,direction:'down',row:6,column:9,clue:'there are many creators of python as its opensource but there is only one benevolent dictator',answer:'guidovonrossum',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:5,direction:'down',row:7,column:4,clue:'this brainchild of a hunter taught python programmers to plot',answer:'matplotlib',hint:'http://myfuture.angelo.edu/content/news/13280-rams-ultimate-frisbee'},
    {number:6,direction:'across',row:7,column:16,clue:'work your brains like a jet with this python editor',answer:'pycharm',hint:'http://www.angelosports.com/news/2017/5/20/no-1-rambelles-clinch-trip-to-college-softball-world-series-with-6-2-win-over-texas-woman-s.aspx'},
    {number:7,direction:'down',row:7,column:18,clue:'pythons own little family containing its members and what all they do',answer:'class',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:8,direction:'down',row:9,column:6,clue:'module to manage user-editable configuration files for an application',answer:'configparser',hint:'https://youtu.be/VGF4ibgcHQE?t=6s'},
    {number:9,direction:'across',row:9,column:15,clue:'This library acts as a Python interface for artificial neural networks',answer:'keras',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:10,direction:'across',row:10,column:4,clue:'it joins point to point to create a 2D hexagonal diagram',answer:'plot',hint:'http://www.angelo.edu/content/profiles/6250-blue-and-gold'},
    {number:11,direction:'down',row:10,column:13,clue:'A library for C++ works in python too',answer:'opencv',hint:'http://www.angelo.edu/content/news/15372-10000-strong'},
    {number:12,direction:'down',row:11,column:11,clue:'This came out in 2008 and made the whole python world change',answer:'python3',hint:'http://www.angelo.edu/content/news/13930-asu-goes-clubbing/'},
    {number:13,direction:'across',row:11,column:13,clue:"This library's name was derived from the word panel data",answer:'pandas',hint:'http://www.angelo.edu/content/news/15450-ram-rugby-football-club'},
    {number:14,direction:'across',row:13,column:2,clue:'this function from NumPy library is used to calculated scalar products of vectors and matrices',answer:'dot',hint:'http://www.angelo.edu/asu_facts/traditions.php'},
    {number:15,direction:'across',row:13,column:6,clue:'function returns True if the specified object is of the specified type',answer:'isinstance',hint:'https://www.angelo.edu/asu_facts/traditions.php'},
    {number:16,direction:'down',row:13,column:15,clue:'an oops concept to wrap up your data',answer:'encapsulation',hint:'http://www.angelosports.com/news/2017/5/27/fischer-wins-javelin-national-title-rams-place-10th-and-rambelles-tie-for-13th-at-ncaa-division-ii-track-field-championships.aspx'},
    {number:17,direction:'down',row:15,column:1,clue:"Python doesn't speak english but this library helps in understanding it",answer:'nltk',hint:'http://www.angelo.edu/content/news/15478-athletics-takes-some-big-wins'},
    {number:18,direction:'across',row:15,column:13,clue:'Microsoft made this blue beast but not for windows, even Mac and Linux users prefer this when coding',answer:'vscode',hint:'http://www.angelosports.com/news/2017/3/14/womens-basketball-belles-historic-season-comes-to-a-close-in-regional-championship-game.aspx?path=wbball'},
    {number:19,direction:'across',row:16,column:1,clue:"this is python's anonymous function, but wait it wont hack your PC",answer:'lambda',hint:'http://www.angelo.edu/president_welcome/'},
    {number:20,direction:'across',row:19,column:2,clue:"datasets can be big and small, some might even look like a pig or a mole, attributes they all have, and this one's pandas' fav",answer:'shape',hint:'http://www.angelo.edu/content/news/15394-grand-occasion-fitting-tribute'},
];

checkSudokuAnswer = function(userEncodedInput,set){
	let sudokuInputs = JSON.parse(decodeURIComponent(userEncodedInput));
	// console.log(sudokuInputs);

	var correctAns;

	if(set.toLowerCase()=="a")
	{
		correctAns = sudokuAns1;
	}
	else if(set.toLowerCase()=="b")
	{
		correctAns = sudokuAns2;
	}
	else
	{
		correctAns = sudokuAns3;
	}

	for(i=0;i<correctAns.length;i++)
    {
        var number = correctAns[i]['number'];
        var direction = correctAns[i]['direction'][0];
        var answerLength = correctAns[i]['answer'].length;
		var realAns = correctAns[i]['answer'];
        
        var userAnswer = '';
        for(j=1;j<=answerLength;j++)
        {
            userAnswer+= sudokuInputs[direction+'-'+number+'-'+j];
        }
		

		console.log(userAnswer+ '   => ('+realAns+')');
		if(userAnswer.trim().toLowerCase()!=realAns)
		{
			return false;
		}
    }

	return true;
}

module.exports = {
	init,
	saveSudokuAnswer,
	getSavedAnswer,
	checkSudokuAnswer
}