<template>
  <div class="tab-control">
    <div v-for="(item, index) of title" :key="index" 
    @click="tabClick(index)" :class="{active: currentIndex === index}"
    class="tab-control-item">
      <span>{{item}}</span> 
    </div>  
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .tab-control-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);   
  }
  .active span {   
    border-bottom: 2px solid var(--color-tint);
    padding: 5px;
  }
</style>
