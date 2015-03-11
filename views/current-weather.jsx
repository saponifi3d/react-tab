var React = require('react');

var tempStyle = {
  fontWeight: 'bolder',
  fontSize: '24px'
};

var CurrentWeather = React.createClass({
  render: function () {
    return (
      <div>
        <div>{this.props.location}</div>
        <div style={tempStyle}>{this.props.weather.temp + '\u00b0 F'}</div>
      </div>
    );
  }
});

module.exports = CurrentWeather;
