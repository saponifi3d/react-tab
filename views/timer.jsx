var React = require('react'),
    moment = require('moment');

var containerStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%'
};

var timeStyle = {
  position: 'relative',
  transform: 'translate(-50%, -70%)',
  fontSize: '200px',
  display: 'block',
  textShadow: '3px 3px 10px rgba(0,0,0,0.5)'
};

var Timer = React.createClass({
  getInitialState: function () {
    var time = moment(this.props.time);
    return { time: time.format('h:mm') }
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
        <span style={timeStyle}>{this.state.time}</span>
      </div>
    );
  }
});

module.exports = Timer;
