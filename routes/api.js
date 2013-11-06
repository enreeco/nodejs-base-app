/**
  Here lies the API routes
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

exports.call = function(req,res){
	if(currentUser(req))
		res.send({data: Date()});
	else
		res.send('User not logged!');
};

exports.isLogged = function(req,res){
	res.send(currentUser(req));
}

exports.logout = function(req,res){
	req.logout();
	res.send({});
}

function currentUser(req){
	var user = (req.session && req.session.passport && req.session.passport.user)?req.session.passport.user:null;
	return user;
}