/**
 * 
 */
var mongoose = require('./db')

var LoginSchema = new mongoose.Schema(
		{firstName: String, 
		 lastName:String, 
		 email:String, 
		 userName:String,
		 password:String},
		 {
		 	versionKey: false
		})

//check unique user
LoginSchema.statics.try_register_username=function(userName,callback){	
	return this.find({"userName":userName}).count()
	.exec(callback)
}

//check unique email
LoginSchema.statics.try_register_email=function(email,callback){	
	return this.find({"email":email}).count()
	.exec(callback)
}



//check password 
LoginSchema.statics.try_login=function(userName,password,callback){
	return this.find({$and:[{"userName":userName},{"password":password}]}).count()
	.exec(callback)
}

var Loginuser = mongoose.model('Loginuser',LoginSchema,'loginusers')
module.exports = Loginuser