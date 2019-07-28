<template>
  <transition name="fade" class="error-model">
    <div class="overlay" @click="hideOverlay()">
        <p>Please wait while we redirect you to Payment..</p>
    </div>
  </transition>
</template>
<script>
export default {
    methods: {
        hideOverlay() {
            this.$parent.toggleOverlay();
        }
    },    
}
</script>
<style lang="scss">
.overlay {
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.9);
  z-index: 2;
  cursor: pointer;
    p {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 20px;
        color: white;
        transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
    }
}
</style>