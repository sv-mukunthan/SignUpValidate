console.log("service");

var service=function(app) {
this.app=app;
};

module.exports=service;

var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost/27017';

service.prototype.insert=function(reqobj,callback){
     
  var userrequest=reqobj;
  console.log("req object from client insert method",userrequest);

    MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("Project");
	    dbo.collection("SignUp").insertOne(userrequest, function(err, res) {
	      if (err) throw err;
	      console.log("1 document inserted");
	      db.close();
	      callback(err,res);
	    });
    });
};

service.prototype.FindUpdate=function(callback){

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Project");
 dbo.collection("SignUp").find({}).sort({_id:-1}).limit(1).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
    callback(err,result);
  });
});
};


service.prototype.verification=function(result,callback){

	var update=result;
	console.log("verification",update.verification);

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Project");
  var myquery = { verification: update.verification };
  console.log(myquery,"qwerftyuiop");
  var newvalues = { $set: {verification: true } };
  console.log("qwertyuiop",newvalues);
  dbo.collection("SignUp").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
    callback(err,res);
  });
});
};


service.prototype.InsertValidate=function(reqobj,callback){
     
  var userrequest=reqobj;
  console.log("req object from client insert method",userrequest);

    MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db("Project");
	    dbo.collection("ValidateData").insertOne(userrequest, function(err, res) {
	      if (err) throw err;
	      console.log("1 document inserted");
	      db.close();
	      callback(err,res);
	    });
    });
};