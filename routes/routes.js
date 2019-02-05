console.log("routes");

var action=require('../action/action.js');
var nodemailer = require('nodemailer');
var util = require('util');
var exec = require('child_process').exec;
// var fd = require('freshdesk-nodejs');
// var Freshdesk = new fd('https://mydomain.freshdesk.com', 'APIKEY');

var UIRoutes=function(app){
    this.app=app;
    this.actionInstance=new action(app);
};

module.exports=UIRoutes;

UIRoutes.prototype.init=function(){

  var self=this;
  var app=this.app;

	app.get('/sign',function(req,res){
		var request=req.query;
		console.log("req",request);

    	self.actionInstance.insert(request,function(error,response){

    		var mailAccountUser = 'svmukunthan97@gmail.com';
            var mailAccountPassword = 'mukunthan8597';

            var fromEmailAddress = mailAccountUser;
        	var toEmailAddress = request.email;

    		var transporter = nodemailer.createTransport({
			  service: 'gmail',
			  auth: {
			    user: mailAccountUser,
			    pass: mailAccountPassword
			  },
			  tls: { rejectUnauthorized: false }
			});


            var rand = function() {
                return Math.random().toString(36).substr(2); // remove `0.`
            };

            var token = function() {
                return rand() + rand(); // to make it longer
            };

            var finalToken = token();

            console.log("finaltoken",finalToken);
            var temporaryPassword1 ='33333333333';
            var temporaryPassword =request.name;
            

            var link = "http://localhost:8000/p/id="+temporaryPassword1 + '/name='+temporaryPassword
            var mailOptions = {
			  from: mailAccountUser,
			  to: toEmailAddress,
			  subject: 'Sending Email using Node.js',
			  text: 'That was easy!',

                html: '<p>Click <a href="'+ link +'">'+ finalToken + ' </a> to verify your account</p>'

            };



			transporter.sendMail(mailOptions, function(error, response){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ',response);
			  }
			});
			res.send(response);
    	});
	});

    

    app.get('/p/:id/:name',function(req,res){

    	self.actionInstance.find(function(error,response){

    		var result=response[0];
    		console.log(result);

    	console.log('Email sent: ' + req.params.id);
        console.log('Email sent: ' + req.params.name);
        res.send("Hai : " + req.params.name+" your account now verified");
	
        self.actionInstance.update(result,function(error,response){
	});
    });
    });



    app.get('/Login',function(req,res){

        var request=req.query;
        console.log(request);

    	self.actionInstance.find(function(error,response){
    		console.log(response);

            if(request.name==response[0].name && request.password==response[0].password){
            	res.render("feedback.ejs");
            }
            else{
            	res.send("Please Enter Valid Username and Password");
            	// res.render("feedback.ejs",{});
            }
		
	});
    });

    app.get('/validate',function(req,res){
        response ={};

        var request=req.query;

        var util = require('util');
        var exec = require('child_process').exec;




        var command = 'curl -v -u '+request.api+':X -H "Content-Type: application/json" -X GET "https://'+request.domain+'/api/v2/tickets"'

        child = exec(command, function(error, stdout, stderr){

            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);

            if(error !== null)
            {
                res.send("Invalid credentials");
            }
            else{

	            self.actionInstance.Validate(request,function(error,response){

	            	res.send("success..");

	            })
        	}

        });
    });
};