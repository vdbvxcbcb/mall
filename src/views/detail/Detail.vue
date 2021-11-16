<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-params-info :paramInfo="paramInfo" ref="params"></detail-params-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-up @click.native="backClick" class="back-up" v-show="isShowBackUp"></back-up>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
  import DetailNavBar from './childCpns/DetailNavBar';
  import DetailSwiper from './childCpns/DetailSwiper';
  import DetailBaseInfo from './childCpns/DetailBaseInfo';
  import DetailShopInfo from './childCpns/DetailShopInfo';
  import Scroll from 'common/scroll/Scroll';
  import DetailGoodsInfo from './childCpns/DetailGoodsInfo';
  import DetailParamsInfo from './childCpns/DetailParamInfo';
  import DetailCommentInfo from './childCpns/DetailCommentInfo';
  import GoodsList from 'content/goods/GoodsList';
  import DetailBottomBar from './childCpns/DetailBottomBar';

  import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from 'network/detail';

  import {debounce} from "commonjs/utils.js";
  import {itemListenerMixin, backUpMixin } from 'commonjs/mixin';

  import{mapActions} from 'vuex';

  export default {
    name: 'Detail',
    mixins: [itemListenerMixin, backUpMixin],
    data () {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        titleTopY: [],
        getTitleTopY: null,
        currentIndex: 0,
      }
    },
    created () {
      this.iid = this.$route.params.iid;

      getDetailData(this.iid).then(res => {
        const data =  res.result;
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        this.shop = new Shop(data.shopInfo);
        this.detailInfo = data.detailInfo;
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      this.getTitleTopY = debounce(() => {
        this.titleTopY = [];
        this.titleTopY.push(0);
        this.titleTopY.push(this.$refs.params.$el.offsetTop);
        this.titleTopY.push(this.$refs.comment.$el.offsetTop);
        this.titleTopY.push(this.$refs.recommend.$el.offsetTop);
        this.titleTopY.push(Number.MAX_VALUE);
      }, 100)
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener);
    },
    methods: {
      ...mapActions(['addCart']),
      imgLoad() {
        this.$refs.scroll.refresh();
        this.getTitleTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.titleTopY[index] + 44, 100)
      },
      contentScroll(position) {
        let positionY = -position.y;
        let length = this.titleTopY.length;
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i &&
          (positionY >= this.titleTopY[i] - 44 && positionY < this.titleTopY[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        this.listenShowBackUp(position)
      },
      addToCart() {
        // 获取购物车要展示的商品信息
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.lowNowPrice;
        product.iid = this.iid;
        // 将商品添加到购物车
        // this.$store.dispatch('addCart', product);
        this.addCart(product).then(res => {
          this.$toast(res, 1500)
        })
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    height: 100vh;
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 102px);
  }
  .back-up {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }
</style>
