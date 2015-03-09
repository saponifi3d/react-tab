var React = require('react'),
  Timer = require('./timer.jsx'),
  Weather = require('./weather.jsx');

var App = React.createClass({
  render: function () {
    return (
      <div className="react-app">
        <Timer time={this.props.time}/>
        <Weather/>
      </div>
    );
  }
});

module.exports = App;
