var React = require('react')
  , WeatherData = require('../lib/weather.js')
  , ForecastWeather = require('./forecast-weather.jsx')
  , CurrentWeather = require('./current-weather.jsx')
  , ls = require('./mixins/localstorage-mixin.jsx')
  , update = require('./mixins/update-mixin.jsx');

var locationStyle = {
  fontFamily: 'Helvetica Neue',
  fontWeight: 'lighter',
  padding: '10px',
  background: 'rgba(0,0,0,0.5)',
  fontSize: '12px',
  textAlign: 'right',
  height: '44px'
};

// move weather fetching up to react-app?
var Weather = React.createClass({
  mixins: [ls, update],

  getInitialState: function () {
    var refreshAt = parseInt(this.get('_refreshAt'), 10),
        location = this.get('_location') || '',
        weather = JSON.parse(this.get('_weather')) || {};

    if (isNaN(refreshAt) || refreshAt < Date.now()) {
      navigator.geolocation.getCurrentPosition(this.getWeather);
    } else {
      var position = JSON.parse(this.get('_position'));
      this.getWeather(position);
    }

    return {
      location: this.get('_location'),
      woeid: this.get('_id'),
      weather: weather.condition,
      forecast: weather.forecast
    };
  },

  updateWeather: function (coords) {
    var data = new WeatherData(coords)

    data.getLocationInfo(function (location, weather) {
      var displayLocation = location.city + ', ' + location.statecode;

      this.set({
        '_location': displayLocation
      , '_id': location.woeid
      , '_weather': JSON.stringify(weather)
      , '_refreshAt': Date.now() + this.interval
      , '_position': JSON.stringify({coords: coords })
      });

      this.setState({
        location: displayLocation,
        woeid: location.woeid,
        forecast: weather.forecast,
        weather: weather.condition
      });

    }.bind(this));
  },

  getWeather: function (position) {
    var item = window.localStorage.getItem('_location')
      , refreshAt = parseInt(this.get('_refreshAt'), 10)
      , weather = JSON.parse(this.get('_weather'));

    if (!item || isNaN(refreshAt) || refreshAt < Date.now()) {
      this.updateWeather(position.coords);
      this.setInterval(this.updateWeather.bind(this, position.coords));
    } else {
      this.setState({
        location: item,
        woeid: window.localStorage.getItem('_id'),
        weather: weather.condition,
        forecast: weather.forecast
      })
    }
  },

  displayWeather: function () {
    if (this.state.location) {
      var len = this.state.forecast.length
        , forecast = []
        , i;

      for (i = 0; i < len; i++) {
        forecast.push(<ForecastWeather key={i} weather={this.state.forecast[i]} />)
      }

      return (
        <div>
          {forecast}
          <div className="current-weather">
            <CurrentWeather location={this.state.location} weather={this.state.weather} />
          </div>
          <div className="clear-fix"></div>
        </div>
      );
    }

    return 'Loading...';
  },

  render: function () {
    return (
      <div>
        <div style={locationStyle}>
          {this.displayWeather()}
        </div>
      </div>
    );
  }
});

module.exports = Weather;
