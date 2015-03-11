var UpdateMixin = {
  interval: 600000,

  componentWillMount: function () {
    this.intervals = [];
  },

  setInterval: function (cb, interval) {
    interval = interval || this.interval;
    this.intervals.push(setInterval(cb, interval));
  },

  componentWillUnmount: function () {
    this.intervals.map(clearInterval);
  }
}

module.exports = UpdateMixin;
