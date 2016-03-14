Tweet = require('./models/Tweet');
var Promise = require('bluebird');

module.exports.querySentimentalText = function(time,airlinecode){
	var d = new Date(time);
	yy = d.getFullYear();
	mm = d.getMonth();
	dd = d.getDate();
	return new Promise(function (resolve, reject) {
		Tweet.aggregate([
	            	{
				        $match : {
				        	$and: [
				        		{airlinecode: airlinecode},
				        		{created_at: {$gte: new Date(yy, mm, dd), $lt: new Date(yy, mm, dd+1)}}
				        	]
				        }
				    },
	                {
				    	$project:{
				    		cmp: { $cmp: ["$sentiment", 0]},
				    		text:"$text"
				    	}
				    },
		        	{
				        $group : {
				           _id : "$cmp",
				           texts: { $push: "$text" }
				        }
				    },
				    {
				    	$sort : {
				    		_id : 1
				    	}
				    }
	    ]).exec(function(err, docs) {
	    	console.dir(docs);

			if(err) {
				console.log(err);
				return reject(err)
			}
			else {
				//exception
				if(!docs) return [{"_id":-1,"texts":[]},{"_id":0,"texts":[]},{"_id":1,"texts":[]}];
				if(docs.length!==3){
					var temps = [{"_id":-1,"texts":[]},{"_id":0,"texts":[]},{"_id":1,"texts":[]}];
					docs.forEach(function(doc){
						temps[doc._id+1].texts=doc.texts;
					});
					var returns = [];
					for(var i=0;i<3;i++){
						returns.push({
							"_id":i-1,
							"texts":temps[i].texts||[]
						});
					}
					return resolve(returns);
				}
				return resolve(docs);
			}
		})
	})
};