var request = require('request');
var async = require('async');
var qs = require('qs');

function Strava(auth) {
  this.apiBase = "https://www.strava.com/api";

  if (auth) {
    this.auth = auth;
  }

	return this;
}

Strava.prototype.get = function(path, params, callback) {
	if (!callback && typeof params === 'function') {
		callback = params;
		params = undefined;
	}

  q = !params ? '' : '?' + qs.stringify(params);

  request.get({uri:this.apiBase + path + q, json: true}, callback);
}

Strava.prototype.getSegment = function(id, callback) {
  this.get('/v1/segments/' + id, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data.segment) return callback(err, data);
    return callback(undefined, data.segment);
  });
}

Strava.prototype.getSegmentEfforts = function(id, params, callback) {
  var self = this;
  
  self.get('/v1/segments/' + id + '/efforts', params, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data) return callback(err, data);
    return callback(undefined, data);
  });
}

var _getAthlete = function(id, token, callback) {
  var self = this;

  self.get('/v2/athletes/' + id, {token: token}, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data) return cb(err, data);
    return cb(undefined, data);
  });
}

// can read athlete id from token as well.
Strava.prototype.getAthlete = function(id, callback) {
  // abstract waterfall into generic method
  var self = this;

  async.waterfall([
    function(cb) {
      self.getAuthToken(self.auth, function(err, res, tokenData) {
        cb(null, tokenData);
      });
    },
    function(tokenData, cb) {
      self.get('/v2/athletes/' + id, {token: tokenData.token}, function(err, res, data) {
        if (err || res.statusCode !== 200 || !data) return cb(err, data);
        return cb(undefined, data);
      });
    }
  ], function(err, result) {
    callback(err, result);
  });
}

// move into a user/authlete object
// strava says token's never expire as well, memoize
Strava.prototype.getAuthToken = function(auth, callback) {
  var self = this;

  request.post({
    uri: self.apiBase + '/v2/authentication/login',
    body: qs.stringify(auth)
  }, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data) return callback(err, res, data);
    return callback(undefined, res, JSON.parse(data));
  });
}

module.exports = Strava;