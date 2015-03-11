var React = require('react')
  , WeatherData = require('../lib/weather.js')
  , ForecastWeather = require('./forecast-weather.jsx')
  , CurrentWeather = require('./current-weather.jsx');

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
  getInitialState: function () {
    navigator.geolocation.getCurrentPosition(this.getWeather);

    return { location: '' };
  },

  // TODO - how do you do good ajaxz with react?
  getWeather: function (position) {
    var item = window.localStorage.getItem('_location')
      , refreshAt = parseInt(window.localStorage.getItem('_refreshAt'), 10)
      , weather = JSON.parse(window.localStorage.getItem('_weather'));

    if (!item || isNaN(refreshAt) || refreshAt < Date.now()) {
      var data = new WeatherData(position.coords)

      data.getLocationInfo(function (location, weather) {
        var displayLocation = location.city + ', ' + location.statecode;

        window.localStorage.setItem('_location', displayLocation);
        window.localStorage.setItem('_id', location.woeid)
        window.localStorage.setItem('_weather', JSON.stringify(weather))
        window.localStorage.setItem('_refreshAt', Date.now() + 600000)

        this.setState({
          location: displayLocation,
          woeid: location.woeid,
          forecast: weather.forecast,
          weather: weather.condition
        })
      }.bind(this));

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
          <div className="pull-right">
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
