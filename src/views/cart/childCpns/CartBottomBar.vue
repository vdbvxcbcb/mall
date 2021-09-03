<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick">
      </check-button>
      <span>全选</span>
    </div>
    <div class="total">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="toBuy">去结算({{checkLength}})</div>
  </div>
</template>

<script>
  import CheckButton from 'content/checkButton/CheckButton';
  import { mapGetters } from 'vuex';

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.cartList.length === 0) {
          return false
        }
        // 找到其中的一个商品 checked 为 false，即一个商品不选中则返回该商品，最后返回 false
        // 没有找到其中的一个商品 checked 为 false，即每个商品都选中则返回 undefined，最后返回 true
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods:{
      checkClick() {
        // 如果全部商品被选中
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        }
        // 如果全部商品或部分商品不被选中
        else {
          this.cartList.forEach(item => item.checked = true)
        }
      },
      toBuy() {
        this.$toast('对不起,此功能尚未开发', 1500)
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 44px;
    line-height: 44px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 40px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .total {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: orangered;
    color: #fff;
    text-align: center;
  }
</style>
