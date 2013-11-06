/**
  Here lies the Constants and Configurations
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

exports.NODE_ENV = process.env.NODE_ENV;
exports.PORT = process.env.PORT || 5000;

exports.DB = {
	url : process.env.DB_URL,
};

//enable local use of SSL in DEV mode
exports.ENABLE_DEV_SSL = false;

//current host name (MUST BE REPLACED WITH YOUR APP URL)
// Ex.: var currentHost = 'http://www.yourapp.com';
var currentHost = 'http://localhost:'+exports.PORT;
//passport config
exports.PASSPORT = {
	Twitter : {
		ConsumerKey : process.env.TWITTER_CLIENT_ID,
		ConsumerSecret : process.env.TWITTER_CLIENT_SECRET,
		CallbackUrl : currentHost+"/auth/twitter/callback"
	},
	Facebook : {
		ConsumerKey : process.env.FACEBOOK_CLIENT_ID,
		ConsumerSecret : process.env.FACEBOOK_CLIENT_SECRET,
		CallbackUrl : currentHost+"/auth/facebook/callback"
	},
	Google :{
		ClientKey : process.env.GOOGLE_CLIENT_ID,
    	ClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    	CallbackURL : currentHost+"/auth/google/callback"
	},
	GitHub :{
		ClientId : process.env.GITHUB_CLIENT_ID,
		ClientSecret : process.env.GITHUB_CLIENT_SECRET,
		CallbackURL : currentHost+"/auth/github/callback"
	},
	LinkedIn :{
		ConsumerKey : process.env.LINKEDIN_CLIENT_ID,
		ConsumerSecret : process.env.LINKEDIN_CLIENT_SECRET,
		CallbackURL : currentHost+"/auth/linkedin/callback"
	}
}

//utility fto run debug while developing
exports.ConsoleDebug = true;
exports.debug = function(msg){
	if(exports.ConsoleDebug) console.log(msg);
}