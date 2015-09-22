var http = require('http');
var url = require('url');
var querystring = require('querystring');

var callback = function(req, res){
	var query = url.parse(req.url).query;
	var route = req.url.split("?")[0];
	var params = querystring.parse(query);
	
	console.log(req.url);
	console.log(route);
	console.log(params);
	if(route === "/fibNumbers"){
			var r = parseFloat(params.a);
			var f = fibRecursion(r);
		    res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end(f + "\n");
		
	}else{
		res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end('unidentified route\n');
		
	}

}

var fibRecursion = function(n){
	if(n==2){
		return [0, 1]
	}
	else if (n == 1){
		return [0]
	}
	else var x = fibRecursion(n-1);
	x[x.length] = x[x.length - 1] + x[x.length -2];
	return x
}



var server = http.createServer(callback);
server.listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');
