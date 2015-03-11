var React = require('react'),
  Timer = require('./timer.jsx'),
  images = require('../lib/images');

var App = React.createClass({
  componentWillMount: function () {
    var refreshAt = parseInt(window.localStorage.getItem('_refreshAt'), 10);

    if (isNaN(refreshAt) || refreshAt < Date.now()) {
      var len = images.length
        , random = Math.floor( Math.random() * len );

      window.localStorage.setItem('img', images[random]);
    }

    document.body.style.backgroundImage = 'url("' + 
      window.localStorage.getItem('img') + '")';
  },

  render: function () {
    return (
      <div className="react-app">
        <Timer/>
      </div>
    );
  }
});

module.exports = App;
