function startUp()
{
    initHTMLTree();
    showTree();
}

function showTree()
{
    document.getElementById("theTreeOptionsWrapper").style.display = "none";
    $("#theTreeWrapper").fadeIn();
    $("#previewWrapper").fadeOut();
    $("#treeButton").addClass("active");
    $("#previewButton").removeClass("active");
}

function showPreview()
{
    $("#theTreeWrapper").fadeOut();
    $("#previewWrapper").fadeIn();
    $("#treeButton").removeClass("active");
    $("#previewButton").addClass("active");
    generatePreview();
}

var allRoots = [];
var bodyID = null;

function addNewElement()
{
    $("#HTMLTree").addClass("hideEdit");
    var node = theHTMLTree.tree('getNodeById', bodyID);
    if(node){
        $('#HTMLTree').tree(
            'addNodeBefore',
            {
                id: new Date().getTime().toString(),
                label : "<DIV>",
                nodeID: "",
                style: "",
                className: "",
                innerHTML: "",
                children:[],
                type: "DIV" 
            },
            node
        );
    }
}


var theHTMLTree = null;


function initHTMLTree()
{
    var row =  [{
        id: new Date().getTime().toString(),
        label : "<BODY>",
        nodeID: "",
        children:[],
        type: "BODY",
        style: "",
        className: "",
        innerHTML: ""
    }];
    bodyID = row[0].id;
    
    theHTMLTree = $('#HTMLTree').tree({
        dragAndDrop: true,
        autoOpen: 0,
        data: row,
        saveState: true,
        onCreateLi: function(node, $li) {
            $li.find('.jqtree-element').append(
                "<span class='floatright'>" +  node.type+'</span>'
            );
        },
        onCanMoveTo: function(moved_node, target_node, position) {
            return true;
        }
    });
    $('#HTMLTree').bind(
        'tree.move',
        function(event) {
            aHTMLTreeNodeWasMoved();
            if(event.node){
                var node = event.node;
            }
        }
    );
    
    $('#HTMLTree').bind(
        'tree.select',
        function(event) {
            if (event.node) {
                var node = event.node;
                currEditNode = node;
                aHTMLTreeNodeWasSelected();
            }
        }
    );}

function aHTMLTreeNodeWasMoved()
{
}

function cancelClicked()
{
    document.getElementById("theTreeWrapper").style.display = "block";
    document.getElementById("theTreeOptionsWrapper").style.display = "none";
    document.getElementById("treeSelector").style.display = "block";
}


function aHTMLTreeNodeWasSelected()
{
    document.getElementById("treeSelector").style.display = "none";
    document.getElementById("theTreeWrapper").style.display = "none";
    document.getElementById("theTreeOptionsWrapper").style.display = "block";
    populateNodeAttrs();
}

function newRow()
{
  var temp = new Date().getTime().toString();
  var   outS = "<input value=''>"
                + "<input value=''>" 
                + "<a class='" + temp + "' href='javascript:deleteAttr(" + '"' + temp + '")' + "'> Delete </a>"
                + "<br>";
  document.getElementById("attrWrapper").innerHTML += outS;
}


function getNodeAttrs()
{
  var ret = {
  }
  var list = document.getElementById("attrWrapper").getElementsByTagName("input");
  for(var i = 0; i < list.length/2; i++){
    ret[list[i*2].value] = list[i*2+1].value;
  }

  return ret;
}

function populateNodeAttrs()
{
  var keys = Object.keys(currEditNode);
  var outS = "";
  var noEdits = ["id"];
  var onlyValueEdits = ["nodeID", "name", "type", "style", "className"];

  for(var i = 0; i < keys.length; i++){
    if( typeof currEditNode[keys[i]] === "object"){
      continue;
    }
    if(noEdits.indexOf(keys[i]) >= 0){ // key is part of noEdit
      outS = outS + "<input value='" + keys[i] + "' readonly>"
                + "<input value='" + currEditNode[keys[i]] + "' readonly>" 
                + "<br class='" + currEditNode[keys[i]] + " '>";
    }
    else if(onlyValueEdits.indexOf(keys[i]) >= 0){ // key is part of onlyValueEdit
      var x = "";
      if(keys[i] == "type" && currEditNode.id == bodyID) x = "readonly";
      outS = outS + "<input class='' value='" + keys[i] + "' readonly>"
                + "<input value='" + currEditNode[keys[i]] + "' " + x + ">" 
                + "<br class='" + currEditNode[keys[i]] + " '>";
    }
    else{
      outS = outS + "<input class='" + keys[i] + "' value='" + keys[i] + "'>"
                + "<input class='" + keys[i] + "' value='" + currEditNode[keys[i]] + "'>" 
                + "<a class='" + keys[i] + "' href='javascript:deleteAttr(" + '"' + keys[i] + '")' + "'> Delete </a>"
                + "<br class='" + keys[i] + " '>";
    }
  }

  document.getElementById("attrWrapper").innerHTML = outS;
}




function deleteAttr(c)
{
  var flag = confirm("Are you sure you want to delete attr: "+ c + " ?");
  if(flag){
    $("#attrWrapper ." + c).remove();
  }
}

var currEditNode = null;
var currWidget = null;

function getPagePreview(pInfo)
{
}


function nodeOptions(nodeID, type, level)
{
    currEditNode = nodeID;
    var theNode = theHTMLTree.tree('getNodeById', currEditNode);
    var keys = Object.keys(theNode);
   
}

//hey look functions!!
function traverseDepthFirst(tree){ 
    for (var i = 0; i < tree.length; i++) {
        if (tree[i].children) {
            traverseDepthFirst(tree[i].children);
        } else {
            console.log(tree[i].id);
        }
    }
}
   


function traverseBreadthFirst(tree){
    if (tree != null){
        for (var i = 0; i < tree.length; i++) {
            console.log(tree[i].id);
            if (tree[i].children == false) {
                console.log("hit");
                console.log(tree[i-1].id);
                return;
            } else {
                treeStack.push(tree[i].children);
                //console.log(treeStack);
                var temp = treeStack.pop();
                traverseBreadthFirst(temp);
            }
        }
    }
}
   

/*Function to print level order traversal of tree*/
//printLevelorder(tree)
//for d = 1 to height(tree)
//   printGivenLevel(tree, d);

/*Function to print all nodes at a given level*/
//printGivenLevel(tree, level)
//if tree is NULL then return;
//if level is 1, then
//    print(tree->data);
//else if level greater than 1, then
//    printGivenLevel(tree->left, level-1);
//    printGivenLevel(tree->right, level-1);


     

function saveClicked()
{
  var saveObj = getNodeAttrs();
    $("#HTMLTree").tree(
       'updateNode',
       currEditNode,
       saveObj
     );
  cancelClicked();
}

function deletePage()
{
    dialogConfirm.display("Delete Page# <div class='font75'>" + currEditNode + "</div>", "fa fa-file-text-o", "Cancel", null, "Delete", "pageDeleteYesClicked()");
}

function pageDeleteYesClicked()
{
    activityIndicator.show();
    var node = theHTMLTree.tree('getNodeById', currEditNode);
    if(node){
        $('#HTMLTree').tree(
               'removeNode',
                node
        );
        document.getElementById("navMapOptionsWrapper").display = "none";
        aHTMLTreeNodeWasMoved();
    }
    cancelEdit();
}

function generatePreview()
{   
  var i;
  var temp; 
  var Parent;
  
  var pathAlongDOM = new Array(); 
  document.getElementById("previewWrapper").innerHTML = "";
  
  $('#HTMLTree').tree('getTree').iterate(
     function(node,level) {
        //console.log(node.id,level);
        if(level == 0){
          Parent = document.getElementById("previewWrapper");
          Parent.name = node.name;
          pathAlongDOM = [Parent]; 
        }
        while(pathAlongDOM.length < level+1){
           pathAlongDOM.pop();
        }     
        
        Parent = pathAlongDOM[pathAlongDOM.length-1];                  

        var type = node.type;
        if(type.toLowerCase() == "body"){
          type = "div";
        }

        var NewNode = document.createElement(type);

        var keys = Object.keys(node);
        for(var i =0; i < keys.length; i++){
          NewNode[keys[i]] = node[keys[i]];
        }


        NewNode.id = node.nodeID;
        if(NewNode.id.length == 0){
          NewNode.id = node.id;
        }
        Parent.appendChild(NewNode);   
        pathAlongDOM.push(NewNode); 
         
         console.log("Depth First (from tree1):");
         traverseDepthFirst(treeIn);
         console.log("Breadth First (from tree1):");
         traverseBreadthFirst(treeIn);
                  console.log("Depth First (from tree2):");
         traverseDepthFirst(treeIn2);
         console.log("Breadth First (from tree2):");
         traverseBreadthFirst(treeIn2);
                  console.log("Depth First (from tree3):");
         traverseDepthFirst(treeIn3);
         console.log("Breadth First (from tree3):");
         traverseBreadthFirst(treeIn3);
        


        return true;
     }
  );
}

  


var tree1 = '[{"id":"1447692676177","name":"<BODY>","nodeID":"","type":"BODY","style":"","className":"","innerHTML":"","is_open":true,"children":[{"id":"1447692680511","name":"Wrapper 1","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":false,"children":[{"id":"1447692749749","name":"H1","nodeID":"","style":"","className":"","innerHTML":"","type":"H1"},{"id":"1447692766027","name":"H2","nodeID":"","style":"","className":"","innerHTML":"","type":"H2"},{"id":"1447692786169","name":"Para","nodeID":"","style":"","className":"","innerHTML":"","type":"p"}]},{"id":"1447692712967","name":"Wrapper 2","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":false,"children":[{"id":"1447692740254","name":"H1","nodeID":"","style":"","className":"","innerHTML":"","type":"H1"},{"id":"1447692765760","name":"H2","nodeID":"","style":"","className":"","innerHTML":"","type":"H2"},{"id":"1447692786474","name":"Para","nodeID":"","style":"","className":"","innerHTML":"","type":"p"}]}]}]';
var tree2 = '[{"id":"1447821849583","name":"<BODY>","nodeID":"","type":"BODY","style":"","className":"","innerHTML":"","is_open":true,"children":[{"id":"1447821875018","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821875185","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821874515","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821873496","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821873845","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]},{"id":"1447821874029","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]}]},{"id":"1447821874684","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821873677","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821874849","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]}]}]'
var tree2Root = "1447821849583";

var tree3 = '[{"id":"1447821972921","name":"<BODY>","nodeID":"","type":"BODY","style":"","className":"","innerHTML":"","is_open":true,"children":[{"id":"1447821974587","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821975009","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821974734","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"},{"id":"1447821974420","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821974111","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]},{"id":"1447821974884","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV","is_open":true,"children":[{"id":"1447821974261","name":"<DIV>","nodeID":"","style":"","className":"","innerHTML":"","type":"DIV"}]}]}]}]';
var treeIn = JSON.parse(tree1);
var treeIn2 = JSON.parse(tree2);
var treeIn3 = JSON.parse(tree3);
var treeStack = [];        