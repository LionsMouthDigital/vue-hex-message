var Vue = require('vue');

new Vue({
  el: 'body',

  components: {
    HexMessage: require('./src/component.js'),
  },
});
