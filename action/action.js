console.log("action");

// var async = require('async');
var service=require('../service/service.js');

var action=function(app) {
   this.app=app;
   this.apiserviceInstance=new service(app);
};
module.exports=action;

action.prototype.insert=function(request,callback){

    var reqobj=request;
    
    console.log('insert request object',reqobj);

    var self=this;
   
    self.apiserviceInstance.insert(reqobj,function(error,response){

	    callback(error,response);

    });
};

action.prototype.find=function(callback){

    var self=this;
   
    self.apiserviceInstance.FindUpdate(function(error,response){



        callback(error,response);

    });
};

action.prototype.update=function(result,callback){

    var self=this;
   
    self.apiserviceInstance.verification(result,function(error,response){



        callback(error,response);

    });
};

action.prototype.findlogin=function(callback){

    var self=this;
   
    self.apiserviceInstance.findlogin(function(error,response){



        callback(error,response);

    });
};




action.prototype.Validate=function(request,callback){
    var reqobj=request;

    var self=this;
   
    self.apiserviceInstance.InsertValidate(reqobj,function(error,response){



        callback(error,response);

    });
};

