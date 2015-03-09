var React = require('react')
  , WeatherData = require('../lib/weather.js')
  , CurrentWeather = require('./current-weather.jsx');

var containerStyle = {
  position: 'absolute',
  right: '10px',
  top: '20px'
};

var locationStyle = {
  fontFamily: 'Helvetica Neue',
  fontWeight: 'lighter',
  padding: '10px',
  background: 'rgba(0,0,0,0.5)',
  fontSize: '12px',
  textAlign: 'right'
};

// move weather fetching up to react-app?
var Weather = React.createClass({
  getInitialState: function () {
    navigator.geolocation.getCurrentPosition(this.getWeather);

    return { location: '' };
  },

  // TODO - how do you do good ajaxz with react?
  getWeather: function (position) {
    var lat = Math.round(position.coords.latitude * 1000) / 1000
      , lon = Math.round(position.coords.longitude * 1000) / 1000
      , key = lat + ',' + lon
      , item = window.localStorage.getItem(key)
      , refreshAt = parseInt(window.localStorage.getItem('refreshAt'), 10);

    if (!item || refreshAt < Date.now()) {
      var data = new WeatherData(position.coords)

      data.getLocationInfo(function (location, weather) {
        var displayLocation = location.city + ', ' + location.statecode;

        window.localStorage.setItem(key, displayLocation);
        window.localStorage.setItem(key + '_id', location.woeid)
        window.localStorage.setItem(key + '_weather', JSON.stringify(weather))
        window.localStorage.setItem('refreshAt', Date.now() + 60000)

        this.setState({
          location: displayLocation,
          woeid: location.woeid,
          forecast: weather.forecast,
          weather: weather.condition
        })
      }.bind(this));

    } else {
      var weather = JSON.parse(window.localStorage.getItem(key + '_weather'));

      this.setState({
        location: item,
        woeid: window.localStorage.getItem(key + 'id'),
        weather: weather.condition,
        forecast: weather.forecast
      })
    }
  },

  displayWeather: function () {
    if (this.state.location) {
      return (
        <div>
          <CurrentWeather weather={this.state.weather} forecast={this.state.forecast} />
          <span>{this.state.location}</span>
        </div>
      );
    }

    return 'Loading...';
  },

  render: function () {
    return (
      <div style={containerStyle}>
        <div style={locationStyle}>
          {this.displayWeather()}
        </div>
      </div>
    );
  }
});

module.exports = Weather;
