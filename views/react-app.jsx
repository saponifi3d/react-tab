var React = require('react')
  , Timer = require('./timer.jsx')
  , images = require('../lib/images')
  , ls = require('./mixins/localstorage-mixin.jsx')
  , update = require('./mixins/update-mixin.jsx');

var App = React.createClass({
  mixins: [ls, update],

  componentWillMount: function () {
    this.updateBackground();
    this.setInterval(this.updateBackground)
  },

  updateBackground: function () {
    var refreshAt = parseInt(this.get('_refreshAt'), 10);

    if (isNaN(refreshAt) || refreshAt < Date.now()) {
      var len = images.length
        , random = Math.floor( Math.random() * len );

      this.set('img', images[random])
    }

    document.body.style.backgroundImage = 'url("' + this.get('img') + '")';
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
