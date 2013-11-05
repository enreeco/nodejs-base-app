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
