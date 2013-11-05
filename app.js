/**
  Here lies the main app
  Author: Enrico Murru
          http://about.me/enreeco
          @enreeco
 **/

var express = require('express');
var routes = require('./routes');
var C = require('./config');
var MongoStore = require('connect-mongo')(express);
var app = express();
var PORT = C.PORT;

app.configure(function() {
    app.use('/public',express.static(__dirname + '/public'));
    app.engine('html', require('ejs').renderFile);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.use(express.cookieParser());
    
    app.use(express.session({
      secret: 'cs secret',
      expires: new Date(Date.now() + (24*60*60) ),
      store: new MongoStore({ url: C.DB.url })
    }));
    app.use(express.bodyParser());
    app.use(express.logger());
});

app.get('/',routes.mainRoute);
app.get('/api/call', routes.api.call);

exports.server = app.listen(PORT, function() {
    console.log("Listening on " + PORT);
});


//this is to test the server locally (https)
//see the README.md details in the "ssl" folder
//http://stackoverflow.com/questions/13186134/node-js-express-and-heroku-how-to-handle-http-and-https
//creating certificates http://blog.nategood.com/client-side-certificate-authentication-in-ngi
if(C.NODE_ENV==='dev' && C.ENABLE_DEV_SSL){
    console.log(C.NODE_ENV);
    var fs = require('fs');
    var https = require('https');


    var options = {
      key : fs.readFileSync('./ssl/dev/server.key').toString(), 
      cert : fs.readFileSync('./ssl/dev/server.crt').toString(),
      ca:     fs.readFileSync('./ssl/dev/ca.crt').toString(),
      requestCert:        false,
      rejectUnauthorized: false
    }

    var PORT_HTTPS = '5443';
    
    https.createServer(options, app).listen(PORT_HTTPS, function () {
        console.log("Express server listening with https on port %d in %s mode", this.address().port, app.settings.env);
    });
    
    app.use(function (req, res, next) {
        res.setHeader('Strict-Transport-Security', 'max-age=8640000; includeSubDomains');
        if (!req.secure) {
            return res.redirect(301, 'https://' + req.host  + ":" + process.env.PORT + req.url);
        } else {
            return next();
            }
    });

}




