var React = require('react');

var containerStyle = {
  float: 'left',
  marginLeft: '10px',
  marginRight: '10px',
  fontSize: '18px'
};

var ForecastWeather = React.createClass({
  render: function() {
    return (
      <div style={containerStyle}>
        <div>
          <span className="temp">{this.props.weather.high}</span>
          <span>{'\u00b0 F'}</span>
        </div>
        <div>
          <span className="temp">{this.props.weather.low}</span>
          <span>{'\u00b0 F'}</span>
        </div>
      </div>
    );
  }
});

module.exports = ForecastWeather;
