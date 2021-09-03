<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item of cartList"
        :key="item.iid"
        :item-info="item">
      </cart-list-item>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import Scroll from 'common/scroll/Scroll';
  import CartListItem from './CartListItem';
  import CartBottomBar from './CartBottomBar';
  import {mapGetters} from 'vuex';

  export default {
    name: 'CartList',
    components: {
      Scroll,
      CartListItem,
      CartBottomBar
    },
    computed: {
      ...mapGetters({
        cartList: 'cartList'
      })
    },
    activated () {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 137px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
