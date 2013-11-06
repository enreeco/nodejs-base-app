/**
  Here lies Passport Strategies
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/
var C = require('../config.js');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GithubStrategy = require('passport-github').Strategy;
var LinkedinStrategy = require('passport-linkedin').Strategy;
var model = require('../model');

exports.passport = passport;

passport.serializeUser(function(user, done) {
  done(null, JSON.stringify(user));
});

passport.deserializeUser(function(serializedUser, done) {
  try{
  	done(null, JSON.parse(serializedUser));
  }catch(e){
    done(e, null);
  };
});

/*
	Handles the saving of user profile for first registration
*/
function saveOrCreateUser(profile, callback){

	model.User.findOne({serviceId: profile.id, service: profile.service}, function(error, user){
		if(error){
			return callback(error);
		}
		if(user){
			return callback(null,user);
		}

		var newUser = new model.User({serviceId: profile.id, 
					username: profile.username,
					service: profile.service,
					displayName: profile.displayName});
		newUser.save(function(error,user){
			if(error){
				return callback(error);
			}
			callback(null, user);
		});
	});
}

passport.use(new TwitterStrategy({
    consumerKey: C.PASSPORT.Twitter.ConsumerKey,
    consumerSecret: C.PASSPORT.Twitter.ConsumerSecret,
    callbackURL: C.PASSPORT.Twitter.CallbackUrl
  },
  function(token, tokenSecret, profile, done) {
		C.debug('Twitter profile');
		C.debug(profile);
		profile = {id: profile.id, 
					username: profile.username,
					service: 'twitter',
					displayName: profile.displayName};
		saveOrCreateUser(profile, done);
		
}));

passport.use(new FacebookStrategy({
    clientID: C.PASSPORT.Facebook.ConsumerKey,
    clientSecret: C.PASSPORT.Facebook.ConsumerSecret,
    callbackURL: C.PASSPORT.Facebook.CallbackUrl
  },
  function(token, tokenSecret, profile, done) {
		C.debug('Facebook profile');
		C.debug(profile);
		profile = {id: profile.id, 
					username: profile.emails[0]["value"],
					service: 'facebook',
					displayName: profile.displayName};
		saveOrCreateUser(profile, done);
		
}));

passport.use(new GoogleStrategy({
    clientID: C.PASSPORT.Google.ClientKey,
  	clientSecret: C.PASSPORT.Google.ClientSecret,
  	callbackURL: C.PASSPORT.Google.CallbackURL
  },
  function(accessToken, refreshToken, profile, done) {
		C.debug('Google profile');
		C.debug(profile);
		profile = {id: profile.id, 
					username: profile.emails[0]["value"],
					service: 'google',
					displayName: profile.displayName};
		saveOrCreateUser(profile, done);

  }
  ));

passport.use(new GithubStrategy({
    clientID: C.PASSPORT.GitHub.ClientId,
  	clientSecret: C.PASSPORT.GitHub.ClientSecret,
  	callbackURL: C.PASSPORT.GitHub.CallbackURL
  },
  function(accessToken, refreshToken, profile, done) {
		C.debug('GitHub profile');
		C.debug(profile);
		profile = {id: profile.id, 
					username: profile.username,
					service: 'github',
					displayName: profile.displayName};
		saveOrCreateUser(profile, done);

  }
  ));

passport.use(new LinkedinStrategy({
    consumerKey: C.PASSPORT.LinkedIn.ConsumerKey,
  	consumerSecret: C.PASSPORT.LinkedIn.ConsumerSecret,
  	callbackURL: C.PASSPORT.LinkedIn.CallbackURL,
  	profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
  },
  function(accessToken, refreshToken, profile, done) {
		C.debug('LinkedIn profile');
		C.debug(profile);
		profile = {id: profile.id, 
					username: profile.username,
					service: 'linkedin',
					displayName: profile.displayName};
		saveOrCreateUser(profile, done);

  }
  ));



exports.twitterAuthRequest = function(req,res,next){
								passport.authenticate('twitter')(req,res,next);
							};

exports.twitterAuthCallback = function(req,res,next){
									passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/' })(req,res,next);
								};

exports.facebookAuthRequest = function(req,res,next){
								passport.authenticate('facebook',{ scope: ['email'] })(req,res,next);
							};

exports.facebookAuthCallback = function(req,res,next){
									passport.authenticate('facebook', { successRedirect: '/',
                                     failureRedirect: '/' })(req,res,next);
								};

exports.googleAuthRequest = function(req,res,next){
								passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile',
																			'https://www.googleapis.com/auth/userinfo.email'] })(req,res,next);
							};

exports.googleAuthCallback = function(req,res,next){
									passport.authenticate('google', { successRedirect: '/',
                                     failureRedirect: '/' })(req,res,next);
								};

exports.githubAuthRequest = function(req,res,next){
								passport.authenticate('github')(req,res,next);
							};

exports.githubAuthCallback = function(req,res,next){
									passport.authenticate('github', { successRedirect: '/',
                                     failureRedirect: '/' })(req,res,next);
								};

exports.linkedinAuthRequest = function(req,res,next){
								passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] })(req,res,next);
							};

exports.linkedinAuthCallback = function(req,res,next){
									passport.authenticate('linkedin', { successRedirect: '/',
                                     failureRedirect: '/' })(req,res,next);
								};