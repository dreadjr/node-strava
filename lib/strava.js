var request = require('request');
var qs = require('querystring');

function Strava(urlRoot) {
	if (!urlRoot) {
		this.apiBase = "https://www.strava.com/api";
	}

	return this;
}

Strava.prototype.get = function(path, params, callback) {
	if (!callback && typeof params === 'function') {
		callback = params;
		params = undefined;
	}

  qs = !params ? '' : '?' + querystring.stringify(params);

  request.get({uri:this.apiBase + path + qs, json: true}, callback);
}

module.exports = Strava;

Strava.prototype.getSegment = function(id, callback) {
  this.get('/v1/segments/' + id, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data.segment) return callback(err, res, data);
    return callback(undefined, res, data.segment);
  });
}