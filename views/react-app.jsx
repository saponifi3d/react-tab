var React = require('react');

var ReactApp = React.createClass({
  render: function () {
    return (
      <div>{this.props.test}</div>
    );
  }
});

module.exports.App = ReactApp;
