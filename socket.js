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
            	var return_data=[];
            	for(var i=0;i<3;i++){
	            	var list_result = freq(results[i].texts);
	            	console.log("list result:");
	            	console.dir(list_result);
	            	result = removeStopword(list_result,20);
	            	return_data.push(result.join("*"));	
            	}
            	
                socket.emit('list', return_data.join(" + "));
            })
		});
	});

	function removeStopword(jsonArray, capacity){
		var result_array = [];
	    jsonArray.forEach(function(json){
	    	if(json.count==1) return result_array;
	    	if(bst.search(json.word).length==0){

	    		result_array.push([json.word,json.count]);
	    	}
	    	if(result_array.length>20) return result_array;
	    	
	    	
	    });
	    return result_array;
	}
	

}
