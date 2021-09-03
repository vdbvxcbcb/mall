<template>
  <div id="home">
    <nav-bar class="nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="['流行', '新款', '精选']" @tabClick="tabClick" 
                 class="fixed" v-show="isTabFixed"  ref="tabControl1">
    </tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <feature-view></feature-view>
      <tab-control :title="['流行', '新款', '精选']"  
                   @tabClick="tabClick" 
                   ref="tabControl2" >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-up @click.native="backClick" class="back-up" v-show="isShowBackUp"></back-up>
  </div>
</template>

<script>
  
  import HomeSwiper from './childCpns/HomeSwiper';
  import HomeRecommend from './childCpns/HomeRecommend';
  import FeatureView from './childCpns/FeatureView';

  import NavBar from 'common/navbar/NavBar';
  import TabControl from 'content/tabControl/TabControl';
  import GoodsList from 'content/goods/GoodsList';
  import Scroll from 'common/scroll/Scroll';

  import { getHomeMultidata, getHomeGoods } from 'network/home';

  import {itemListenerMixin, backUpMixin} from 'commonjs/mixin';
  
  export default {
    name: 'Home',
    components: {    
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin, backUpMixin],
    data() {
      return {
        banner: null,
        recommend: null,
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        scrollY: 0     
      }    
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    activated () {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.scrollY, 0);     
    },
    deactivated () {
      this.scrollY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImgLoad', this.itemImgListener);
    },
    methods: {
      // 事件监听
      tabClick(index) {
        switch(index) {
          case 0: 
            this.currentType = 'pop';
            break;
          case 1: 
            this.currentType = 'new';
            break;
          case 2: 
            this.currentType = 'sell';
            break;   
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      contentScroll(position) {
        this.listenShowBackUp(position);
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.refresh();
      },
      swiperImageLoad() {       
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;      
      },
      // 网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        }) 
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
           this.goods[type].list.push(...res.data.list);
           this.goods[type].page += 1;
           this.$refs.scroll.finishPullUp();
        });        
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .nav { 
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
    z-index: 1;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;   
  }
  .back-up {
    position: fixed;
    right: 8px;
    bottom: 55px;  
  }
  .fixed {
    position: relative;
    z-index: 2;
    background-color: white;
  }
</style>