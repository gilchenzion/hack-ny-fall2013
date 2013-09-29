
var mongoose = require('mongoose');
var queryString = require('querystring');
var request = require('request');

var mongourl = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost/decks'; 
mongoose.connect(mongourl);
var db = mongoose.connection;

var deckSchema = mongoose.Schema({
	createdAt: { type: Date, default: Date.now },
	title: String,
	description: String,
	imageURL: String,
	numOfCards: Number,
	numOfNouns: Number,
	numOfAdjs: Number,
	numOfVotes: Number,
	tags:[String],
	nounCards: [String],
	adjCards: [String],
	generated: Boolean,
	editorsPick: Boolean
});

var Deck = db.model('Deck', deckSchema);

exports.getAllDecks = function (req, res) {
	params = {};
	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);
	if(query != "") {
		var params = {
			title: { $regex: new RegExp(objParams.title), $options: 'i' }
		}
	}
	var page = objParams.page;
	var limit = objParams.limit;
	var sortBy = objParams.sort_by;
	var sort = {};
	if(sortBy == "date") {
		sort = {createdAt: -1};
	} else if(sortBy == "votes") {
		sort = {numOfVotes: -1};
	} else if(sortBy == "editorspick") {
		params.editorsPick = true;
	}
	var skip = limit * (page - 1);
	Deck.find(params, {} ,{limit: limit, skip: skip, sort: sort}, function(err, result) {
		if(err) {
			return handleError(err);
		} else {
			return res.json({
				count: result.length,
				result: result
			});
		}
	});
};

exports.getDeckById = function (req, res) {
	Deck.findById(req.params.id, function(err, result) {
		if(err) {
			return handleError(err);
		} else {
			return res.render('view', {result: result});
		}
	});
};

exports.postDeck = function (req, res) {
	var newDeck = new Deck(req.body);
	newDeck.save(function(err) {
		if(err) {
			return handleError(err);
		} else {
			console.log('woooot');
		}
	});
	return res.json(newDeck);
};

exports.generateDeck = function (req, res) {
	// get url string and convert to json object
	var query = req._parsedUrl.query;
	var objParams = queryString.parse(query);

	//grab params and set defauls
	var query = objParams.q;
	var adjs = objParams.adjs;
	if(adjs == null) {
		adjs = 10;
	}
	var maxNouns = objParams.max_nouns;
	if(maxNouns == null) {
		maxNouns = 50;
	}

	//generate random adjs
	var justAdjs = [];
	var i, j;
	var wordnik = "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=adjective&minCorpusCount=1000000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5&limit=" + adjs;
	request(wordnik, function(err, result) {
		var finalAdjs = JSON.parse(result.body);
		for(i = 0; i < adjs; i++) {
			justAdjs.push(finalAdjs[i].word);
		}
	});

	//pull relevent words from NY Times
	var nyTimes = "http://api.nytimes.com/svc/semantic/v2/concept/search.json?fields=article_list&api-key=719abfb140844f90fe632b5f28db4118:3:68190560&query=" + query;
	request(nyTimes, function(err, result) {
		var finalWords = [];
		var results = JSON.parse(result.body).results
		
		for(i =0; i < results.length; i++) {
			var r = results[i].article_list.results;
			for(j = 0; j < r.length; j++) {
				var concepts = r[j].concepts;
				finalWords = finalWords.concat(concepts.nytd_des, concepts.nytd_geo, concepts.nytd_per, concepts.nytd_org);
			}
		}
		var uniqueWords = [];
		for(i=0; i < finalWords.length; i++) {
			if(finalWords[i] != null && uniqueWords.length < maxNouns) {
				if(uniqueWords.length == 0) {
					uniqueWords.push(finalWords[i]);
				} else {
					var isRepeat = false;
					for(j= 0; j < uniqueWords.length; j++) {
						if(uniqueWords[j] === finalWords[i]) {
							isRepeat = true;
						}
					}
					if(isRepeat == false) {
						uniqueWords.push(finalWords[i]);
					}
				}
			}
		}

		// return list of nouns and adjs
		res.json({
			nouns: uniqueWords,
			adjs: justAdjs
		});
	});
};