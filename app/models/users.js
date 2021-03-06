/**
 * 
 */
var mongoose = require('./db')

var UserSchema = new mongoose.Schema(
		{user: String, 
		 type:String},
		 {
		 	versionKey: false
		})

//get admin list
UserSchema.statics.get_admin_list=function(callback){	
	return this.aggregate([
	    {$match:{type:"admin"}},
	    {$group:{_id:"$type",list:{$push:"$user"}}}
	]).exec(callback)
}

//get bot list
UserSchema.statics.get_bot_list=function(callback){	
	return this.aggregate([
	    {$match:{type:"bot"}},
	    {$group:{_id:"$type",list:{$push:"$user"}}}
	]).exec(callback)
}


var User = mongoose.model('User',UserSchema,'users')
module.exports = User