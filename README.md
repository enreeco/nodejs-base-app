# base app
==
This is a starting point app with NodeJS, MongoDB, AngularJS and Bootstrap.

In the *views/index.html* file replace 

	ga('create', '**XXXXXXX-INSERT-YOUR-ANALITICS-ID-XXXXXX**', '**www.yoursite.com**');

with your app info (if you need Analytics; otherwise remove the script).

Configure the *config/index.js* file with your mongo DB endpoint

To use the Passport facilities, set your hostname in the *config.js* file:
	
	//current host name (MUST BE REPLACED WITH YOUR APP URL)
	var currentHost = 'http://localhost'+exports.PORT;

Set the environmentals variables for social networks client key/password (see *config.js* file):

Es.:

	TWITTER_CLIENT_ID=XXXXX
	TWITTER_CLIENT_SECRET=YYYYY

Libraries and dependancies:

- http://nodejs.org
- http://www.mongodb.org
- http://angularjs.org
- http://jquery.com
- http://getbootstrap.com
- http://fontawesome.io
- http://mgcrea.github.io/angular-strap

==

Author: Enrico Murru

Site: http://about.me/enreeco

Twitter: @enreeco
