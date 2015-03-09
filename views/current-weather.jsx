var React = require('react')

var tempStyle = {
  fontWeight: 'bolder',
  fontSize: '24px'
};

var CurrentWeather = React.createClass({
  render: function () {
    return (
      <div>
        <span style={tempStyle}>{this.props.weather.temp}° F</span>
      </div>
    );
  }
});

module.exports = CurrentWeather;
