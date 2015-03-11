var LocalStorage = {
  set: function(key, value) {
    if (typeof key === 'string') {
      window.localStorage.setItem(key, value);
    } else {
      for(var k in key) {
        window.localStorage.setItem(k, key[k])
      }
    }
  },

  get: function (key) {
    return window.localStorage.getItem(key);
  }
};

module.exports = LocalStorage;
