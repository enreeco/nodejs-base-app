/**
  Here lies the API routes
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

exports.call = function(req,res){
	res.send({data: Date()});
};

exports.isLogged = function(req,res){
	var user = (req.session && req.session.passport)?req.session.passport.user:null;
	res.send(user);
}

exports.logout = function(req,res){
	req.logout();
	res.send({});
}