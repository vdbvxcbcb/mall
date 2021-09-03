import { debounce } from "commonjs/utils.js";

import BackUp from "content/backUp/BackUp";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => refresh();
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
}

export const backUpMixin = {
  components: {
    BackUp
  },
  data() {
    return {
      isShowBackUp: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenShowBackUp(position) {
      this.isShowBackUp = -position.y > 1000;
    }
  }
}

export const tabControlMixin = {
  data() {
    return {
      currentType: 'pop'
    };
  },
  methods: {
    tabClick(index) {
      switch (index) {
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
      // console.log(this.currentType);
    }
  }
};
