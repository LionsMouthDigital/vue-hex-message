<template>
  <div id="app">
    <h1>Hex Message</h1>
    <h2>There's an an invisible message here.</h2>
    <hex-message dismissible ref="invisible" :visible="false">
      <h3>The Invisible Man</h3>
      <p>&hellip; and other stories by H.G. Wells.</p>
    </hex-message>

    <button @click="$refs.invisible.show = true">Reveal</button>

    <h2>Contexts</h2>
    <p>
      There doesn't appear to be much difference, but that's because you have to include
      <a href="https://github.com/LionsMouthDigital/Hex#using-the-components-wo-the-framework">Hex's
      styles</a> separately.
    </p>

    <p>
      This first one isn't dismissible, but the rest are in some way or another.
    </p>
    <hex-message>
      <h3>That person over there is a person.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </hex-message>

    <hex-message class="v-positive" dismissible>
      <h3>☺ Your dearest dream is coming true.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </hex-message>

    <hex-message class="v-info" dismissible>
      <h3>Today will be yesterday tomorrow.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </hex-message>

    <hex-message ref="msgSelfDestruct" class="v-warn" :self-destruct="5" show-timer-bar>
      <h3>This message will self-destruct.</h3>
      <p>Well… it won't technically self-destruct. You have to click the button.</p>
      <p>
        You can make a message self-destruct by adding a boolean property of
        <code class="language-html">auto-countdown</code>, though.
      </p>
      <p>
        <button class="v-warn" @click="$refs.msgSelfDestruct.countdown()">
          Finished reading
        </button>
      </p>
    </hex-message>

    <hex-message class="v-negative" dismissible>
      <h3>☹ You will die alone and poorly dressed.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
    </hex-message>
  </div>
</template>




<script>
import HexMessage from './components/HexMessage.vue'

export default {
  name: 'app',
  components: {
    HexMessage
  }
}
</script>




<style>
  .message {
    position: relative;
  }

  .timer-bar {
    background-color: red;
    height: 20px;
    position: absolute;
    top: 0;
    transition-property: width;
    transition-timing-function: linear;
    width: 100%;
    z-index: -1;
  }

  .animate-countdown {
    width: 0;
  }
</style>
