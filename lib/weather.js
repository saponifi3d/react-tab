var when = require('when');

function Weather (coords) {
  this.coords = coords;
};

Weather.prototype.getLocationUrl = function () {
  var apiLocation = this.coords.latitude + ', ' + this.coords.longitude;

  return 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22' + encodeURIComponent(apiLocation) + '%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback=';
};

Weather.prototype.getLocationInfo = function (cb) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function (e) {
    var location = JSON.parse(e.target.response).query.results.Result;
    this.getWeatherInfo(location, cb)
  }.bind(this);
  xhr.open('get', this.getLocationUrl(), true);
  xhr.send();
};

Weather.prototype.getWeatherUrl = function(woeid) {
  return 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(' + woeid +')&format=json'
}

Weather.prototype.getWeatherInfo = function (location, cb) {
  var xhr = new XMLHttpRequest();

  xhr.onload = function (e) {
    var weather = JSON.parse(e.target.response).query.results.channel.item;
    cb(location, weather)
  }

  xhr.open('get', this.getWeatherUrl(location.woeid), true);
  return xhr.send();
};

Weather.prototype.getWeather = function(woeid, cb) {
  if(!cb) {
    cb = woeid;
    this.getLocationInfo(cb);
  } else {
    this.getWeatherInfo({ woeid: woeid }, cb);
  }
}

module.exports = Weather;
