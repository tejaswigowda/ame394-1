var url = require('url'); /* expose url object to var url */
var querystring = require('querystring'); 

var jsonObj = require("./feed.json");
  for (var i = 0; i < jsonObj.length - 1; i++)
  {
    jsonObj[i].date = new Date(jsonObj[i].date).getTime();
  }

var allTags = getTags();
var allCats = getCats();

var express = require("express"),
app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

app.get("/getSortedJSON", function (req, res) {
  var query = url.parse(req.url).query;
  var params = querystring.parse(query);
  var alg = params.alg || "bubble";
  var key = params.key || "id";
  var result = [];
  
  if(alg === "bubble"){
    result = bubbleSort(key); 
  }
  else if(alg === "insertion"){
    result = insertionSort(key); 
  }
  else if(alg === "selection"){
    result = selectionSort(key); 
  }
  res.send(JSON.stringify(result));
  res.end();
});

app.get("/", function (req, res) {
    res.redirect("/index.html");
});
app.get("/getTags", function (req, res) {
    res.send(getAllTags());
	res.end;
});
app.get("/getCats", function (req, res) {
    res.send(getAllCats());
	res.end;
});

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);

function insertionSort(key)
{
    var arr = jsonObj;
    for(var i = 0; i<arr.length - 1; i++){
        var tmp = arr[i];
        var j;
        for(j = i; j>0; j--){
            if(arr[j-1][key] < tmp[key]){
                break;
            }
            arr[j] = arr[j-1];
        }
        arr[j] = tmp;
    }
    return arr;
}


function bubbleSort(key)
{
  var returnArray = jsonObj;
  var temp;
    for(var i = returnArray.length -1; i >= 0 ;i--){
        for(var j = 0; j < i; j++){
            if(returnArray[j+1][key] < returnArray[j][key]){
                temp = returnArray[j];
                returnArray[j] = returnArray[j+1];
                returnArray[j+1]=temp;
            }
        }
    }
  return returnArray;
}


function selectionSort(key)
{
  var arr = jsonObj;
  for (var i = 0; i < arr.length - 1; i++)
    {
        var min = i;  // record the position of the smallest
        for (var j = i + 1; j < arr.length; j++)
        {
        // update min when finding a smaller element
        if (arr[j][key] < arr[min][key])
            min = j;
        }
 
        // put the smallest element at position i
        var temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
  return arr;
}

function getTags() {
	var tags = [];
	objs = jsonObj;
  	for(var i=0; i < objs.length; i++){
		for (var j = 0; j < objs[i].tags.length; j++) {
			var tag = objs[i].tags[j].slug;
			var isInList = false;
			for (var k = 0; k < tags.length; k++) {
				if (tags[k]==tag) {
					isInList = true;				}
			}
			if (isInList == false) {
				tags.push(tag);
			}
		}
	
	}

	return tags;
}


function getCats() {
	var cats = [];
	objs = jsonObj;
  	for(var i=0; i < objs.length; i++){
		for (var j = 0; j < objs[i].categories.length; j++) {
			var cat = objs[i].categories[j].slug;
			var isInList = false;
			for (var k = 0; k < cats.length; k++) {
				if (cats[k]==cat) {
					isInList = true;
				}
			}
			if (isInList == false) {
				cats.push(cat);
			}
		}
	
	}
	console.log(cats);
	return cats;
}


function getAllTags() {
	return allTags.toString();
}
function getAllCats() {
	return allCats.toString();
}
