<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'
  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        scroll: {}        
      }
    },
    methods: {
      scrollTo(x, y, time=500) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click:true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      });
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        });
      }
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      });
    }
  }
</script>

<style scoped>

</style>
