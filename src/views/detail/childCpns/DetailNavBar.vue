<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="title">
      <div class="item" :class="{active: index === currentIndex}" 
            @click="tabClick(index)" v-for="(item, index) of title" :key="index">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'common/navbar/NavBar'
  export default {
    name: 'DetailNavBar',
    data() {
      return {
        title: ['商品', '详情', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick() {
        this.$router.back();
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .back img {
    margin-top: 12px;
  }
  .title {
    display: flex;   
    font-size: 12px;
  }
  .item {
    flex: 1;
    text-align: center;
  }
  .active {
    color: var(--color-tint)
  }
</style>
