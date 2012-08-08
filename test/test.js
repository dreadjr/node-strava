var Strava = require('../lib/strava');

var s = new Strava();

s.get('/v1/segments/1665029/', function(err, resp, data) {
  console.log(data);
});

s.getSegment(1665029, function(err, resp, data) {
  console.log(data);
});

s.getSegmentEfforts(1665029, {athleteId: 10749}, function(err, resp, data) {
  console.log(data);
});