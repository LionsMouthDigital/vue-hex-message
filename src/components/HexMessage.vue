<template>
  <div class="message" :transition="effect">
    <slot></slot>
    <button class="message-dismiss" v-if="dismissible" @click="dismiss">&times;</button>
    <div class="timer-bar" v-if="selfDestruct && showTimerBar"></div>
  </div>
</template>

<script>
  export default {
    ready() {
      // Start the countdown.
      if (this.autoCountdown) {
        this.countdown();
      }
    },

    props: {
      // Automatically count down from value of `selfDestruct`?
      autoCountdown: Boolean,
      // Add a button to dismiss the message?
      dismissible:   Boolean,
      effect:        String,
      // Number of seconds after which to dismiss the message.
      selfDestruct:  String,
      // Show a timer bar?
      showTimerBar:  Boolean,
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
          var message = this;
          // Run this code every second.
          var countdownTimer = window.setInterval(function() {
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
      dismiss() {
        this.$remove();
      },
    },
  }
</script>
