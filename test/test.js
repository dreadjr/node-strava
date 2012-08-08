var strava_api = require('../lib/strava');

var s = new strava_api();

s.get('/v1/segments/1665029/', function(err, resp, data) {
  if (err) console.log(err);
  console.log(data);
});

s.getSegment(1665029, function(err, data) {
  if (err) console.log(err);
  console.log(data);
});

s.getSegmentEfforts(1665029, {athleteId: 10749}, function(err, data) {
  if (err) console.log(err);
  console.log(data);
});

// authenticate
var sauth = new strava_api({email: '{email}', password:'{password}'});

sauth.getAthlete(10749, function(err, data) {
  if (err) console.log(err);
  console.log(data);
});