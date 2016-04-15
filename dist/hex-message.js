(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.hexMessage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var HexMessage = _dereq_('./components/HexMessage.vue');

module.exports = HexMessage;

},{"./components/HexMessage.vue":2}],2:[function(_dereq_,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  ready: function ready() {
    // Start the countdown.
    if (this.autoCountdown) {
      this.countdown();
    }
  },


  computed: {
    /**
     * Determine if this message is a modal.
     *
     * @author Curtis Blackwell
     * @return {Boolean}
     */

    isModal: function isModal() {
      return this.$parent.hasOwnProperty('$options') && this.$parent.$options.name === 'hex-modals';
    },

    /**
     * Determine whether to show the message.
     *
     * @author Curtis Blackwell
     * @return {boolean}
     */
    show: function show() {
      return this.visible;
    }
  },

  props: {
    // Automatically count down from value of `selfDestruct`?
    autoCountdown: Boolean,
    // Add a button to dismiss the message?
    dismissible: Boolean,
    effect: String,
    // Number of seconds after which to dismiss the message.
    selfDestruct: String,
    // Show a timer bar?
    showTimerBar: Boolean,
    // Show the message?
    visible: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    /**
     * Countdown, then remove the message.
     *
     * @author Curtis Blackwell
     * @return {void}
     */

    countdown: function countdown() {
      if (this.selfDestruct) {
        var message = this;
        // Run this code every second.
        var countdownTimer = window.setInterval(function () {
          message.selfDestruct--;

          // Once the timer reaches 0, remove the message.
          if (message.selfDestruct < 1) {
            // Stop the repeating code.
            window.clearInterval(countdownTimer);
            message.dismiss();
          }
        }, 1000);

        // Animate the timer bar.
        if (this.selfDestruct && this.showTimerBar) {
          var timerBar = this.$el.querySelector('.timer-bar');
          // I'd prefer to set only `animationDuration`, but for some reason, setting it
          // separately causes the animationTimingFunction to be ease-in-out.
          timerBar.style.transition = this.selfDestruct + 's ' + 'linear';
          timerBar.className += ' animate-countdown';
        }
      }
    },


    /**
     * Dismiss the message.
     *
     * @author Curtis Blackwell
     * @return {void}
     */
    dismiss: function dismiss() {
      this.visible = false;

      // If this is a modal, let the parent `hex-modals` component know this was dismissed.
      if (this.isModal) {
        this.$dispatch('dismissed');
      }
    }
  }
};
if (module.exports.__esModule) module.exports = module.exports.default
;(typeof module.exports === "function"? module.exports.options: module.exports).template = "\n<div class=\"message\" :transition=\"effect\" v-show=\"show\">\n  <slot></slot>\n  <button class=\"message-dismiss\" v-if=\"dismissible\" @click=\"dismiss\">×</button>\n  <div class=\"timer-bar\" v-if=\"selfDestruct &amp;&amp; showTimerBar\"></div>\n</div>\n"
if (module.hot) {(function () {  module.hot.accept()
  var hotAPI = _dereq_("vue-hot-reload-api")
  hotAPI.install(_dereq_("vue"), true)
  if (!hotAPI.compatible) return
  var id = "/Users/curtisblackwell/Sites/hex/vue-hex-message/src/components/HexMessage.vue"
  if (!module.hot.data) {
    hotAPI.createRecord(id, module.exports)
  } else {
    hotAPI.update(id, module.exports, (typeof module.exports === "function" ? module.exports.options : module.exports).template)
  }
})()}
},{"vue":undefined,"vue-hot-reload-api":undefined}]},{},[1])(1)
});