<template>
  <div class="message" v-show="show">
    <slot></slot>
    <button class="message-dismiss" v-if="dismissible" @click="dismiss()">&times;</button>
    <div class="timer-bar" v-if="selfDestruct && showTimerBar"></div>
  </div>
</template>

<script>
  export default {
    name: 'HexMessage',


    data() {
      return {
        // Determine whether to show the message.
        show:           true,
        timeToDestruct: 0,
      };
    },


    props: {
      /**
       * Automatically count down from value of `selfDestruct`?
       *
       * @type {Boolean}
       */
      autoCountdown: Boolean,

      /**
       * Define how the message gets dismissed.
       *
       * @type {Function}
       */
      dismiss: {
        type:    Function,
        default: function () {
          this.show = false;
        },
      },

      /**
       * Add a button to dismiss the message?
       *
       * @type {Boolean}
       */
      dismissible: {
        type:    Boolean,
        default: true,
      },

      /**
       * Number of seconds after which to dismiss the message.
       *
       * @type {Number}
       */
      selfDestruct: Number,

      /**
       * Show a timer bar?
       *
       * @type {Boolean}
       */
      showTimerBar: {
        type:    Boolean,
        default: true,
      },

      /**
       * Show the message?
       *
       * @type {Boolean}
       */
      visible: {
        type:    Boolean,
        default: true
      },
    },


    methods: {
      /**
       * Countdown, then remove the message.
       *
       * @author Curtis Blackwell
       * @return {void}
       */
      countdown() {
        if (this.selfDestruct) {
          // Run this code every second.
          let countdownTimer = setInterval(() => {
            this.timeToDestruct--;

            // Once the timer reaches 0, remove the message.
            if (this.timeToDestruct === 0) {
              // Stop the repeating code.
              clearInterval(countdownTimer);
              this.dismiss();
            }
          }, 1000);

          // Animate the timer bar.
          if (this.timeToDestruct && this.showTimerBar) {
            let timerBar = this.$el.querySelector('.timer-bar');

            // Set the duration of the transition to the destruction timing and add the class.
            timerBar.style.transitionDuration  = this.timeToDestruct + 's';
            timerBar.className                += ' animate-countdown';
          }
        }
      },
    },


    created() {
      this.show           = this.visible;
      this.timeToDestruct = this.selfDestruct - 1;

      // Start the countdown.
      if (this.autoCountdown) {
        this.countdown();
      }
    },
  }
</script>
