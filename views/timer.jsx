var React = require('react'),
  Weather = require('./weather.jsx'),
  moment = require('moment');

var containerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 0,
  height: 0
};

var timeStyle = {
  position: 'relative',
  transform: 'translate(-50%, -70%)',
  fontSize: '200px',
  display: 'block',
  minWidth: '470px',
  textAlign: 'center'
};

var Timer = React.createClass({
  getInitialState: function () {
    return { time: moment().format('h:mm') }
  },

  componentDidMount: function () {
    setInterval(this.tick, 150);
  },

  tick: function () {
    var timer = moment().format('h:mm');
    this.setState({ time: timer });
  },

  render: function () {
    return (
      <div style={containerStyle}>
        <div style={timeStyle}>
          <span className="time">{this.state.time}</span>
          <Weather/>
        </div>
      </div>
    );
  }
});

module.exports = Timer;
