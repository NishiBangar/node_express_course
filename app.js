var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var expressValidator = require("express-validator");


     
var app = express();


/*
//Custom Middleware
 var logger = function(req,res,next){
 	console.log("Logging...");
 }

 app.use(logger);
 */

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// add validation methods to request
// app.use(expressValidator());

// View Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


// Set Static Path
app.use(express.static(path.join(__dirname,'public')));

// Global Vars
app.use(function(req,res,next){
	res.locals.errors=null;
	next();
});

 // Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


var people=[
	{
		name:'Nishi',
		age:25
	},{
		name:'Mark',
		age:26
	},{
		name:'Will',
		age:30
	}
];

//Handle routing
app.get("/",function(req,res){
	//res.send("Hello Nishi");
	//res.json(people); 
	res.render('index',{
		title:'Customers',
		userArr:people
	});
});

app.post("/user/add",function(req,res){


	 /* req.checkBody('name','Name is Required').notEmtpy();
	  req.checkBody('age','Age is Required').notEmtpy();*/

	  errors = req.validationErrors();


	if(errors){
		console.log("Errors");
		res.render('index',{
			title:'Customers',
			userArr:people,
			errors:errors
		});

	}else{
		var newUser = {
		 	name :req.body.name,
		 	age : req.body.age
		 }
		 console.log("Success");
	}

	 

	 console.log(newUser);
});

app.listen(3000,function(){
	console.log("Server started on port 3000");
});