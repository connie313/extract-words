db = require('./db-operation');
freq = require('freq');
fs = require('fs');
var BinarySearchTree = require('binary-search-tree').BinarySearchTree
  , AVLTree = require('binary-search-tree').AVLTree   // Same API as BinarySearchTree 
 
// Creating a binary search tree 
var bst = new BinarySearchTree();
try {
    var filename = require.resolve('./lib/stopword.txt');
    fs.readFile(filename, 'utf8', callback);
} catch (e) {
    callback(e);
}

function callback(err, data){
	if(err) return;
	var stopwords = data.split("\n");
    // Add some elements to the filter.
    stopwords.forEach(function(stop){
        bst.insert(stop);
    });
}
exports = module.exports = function(io){
	io.sockets.on('connection', function(socket){
		console.log("client connected");
		socket.on('wordcloud',  function(data){
			console.log("wordcloud");
			db.querySentimentalText(data.time, data.airlinecode)
            .then(function(results){
            	var list_result = freq(results[0].texts);
            	console.log("list result:");
            	console.dir(list_result);
            	var result = removeStopword(list_result,20);
                socket.emit('list', list_result.join());
            })
		});
	});

	function removeStopword(jsonArray, capacity){
		var result_array = [];
	    jsonArray.forEach(function(json){
	    	if(bst.search(json.word)&&result_array.length<capacity){
	    		result_array.push([json.word,json.count]);
	    	}
	    	return (result_array.length>capacity) 
	    	
	    });
	    console.log(result_array.toString());
	    return result_array;
	}
	

}
