const express = require("express");
const bodyParser= require("body-parser");
const date = require(__dirname+ "/date.js"); //runs the coee of the module

const app = express();

const items = ["Buy", "Cook", "Eat"];
const workListItems =[];
app.set('view engine','ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  const day = date.getDate();

  res.render("list", {listTitle: day, newListItem: items});


});

app.post("/", function(req,res){
  let item = req.body.newItem;
  if(req.body.list==="Work List"){
    workListItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItem: workListItems});
});

app.post("/work", function(req,res){
  let item = req.body.newItem;
  workListItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function(){
  console.log("Up and running")
});
