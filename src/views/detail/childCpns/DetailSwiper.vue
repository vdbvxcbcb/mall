<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) of topImages" :key="index">
      <img :src="item" alt="detail images">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'common/swiper'
  export default {
    name: 'DetailSwiper',
    data () {
      return {
      }
    },
    props:{
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
