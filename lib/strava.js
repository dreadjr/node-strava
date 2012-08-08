var request = require('request');
var qs = require('qs');

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

  q = !params ? '' : '?' + qs.stringify(params);

  console.log(this.apiBase + path + q);
  request.get({uri:this.apiBase + path + q, json: true}, callback);
}

module.exports = Strava;

Strava.prototype.getSegment = function(id, callback) {
  this.get('/v1/segments/' + id, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data.segment) return callback(err, res, data);
    return callback(undefined, res, data.segment);
  });
}

Strava.prototype.getSegmentEfforts = function(id, params, callback) {
  this.get('/v1/segments/' + id + '/efforts', params, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data) return callback(err, res, data);
    return callback(undefined, res, data);
  });
}

Strava.prototype.getAthlete = function(id, callback) {
  this.get('/v2/athletes/' + id, function(err, res, data) {
    if (err || res.statusCode !== 200 || !data) return callback(err, res, data);
    return callback(undefined, res, data);
  });
}