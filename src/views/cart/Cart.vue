<template>
  <div class="cart">
    <nav-Bar class="nav">
      <div slot="center">购物车({{length}})</div>
    </nav-Bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
  import navBar from 'common/navbar/NavBar';
  import {mapGetters} from 'vuex';
  import CartList from './childCpns/CartList';

  export default {
    name: 'Cart',
    components: {
      navBar,
      CartList
    },
    computed: {
      ...mapGetters({
        length: 'cartLength'
      })
    }
  }
</script>

<style>
  .cart {
    height: 100vh;
  }
  .nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>