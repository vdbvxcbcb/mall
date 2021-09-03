import { ADD_COUNTER, ADD_TO_CART } from "./mutations-type";

export default {
  addCart({ commit, state }, payload) {
    // 查找之前是否有该商品，cartList 中有该商品，就赋值给 oldProduct
    // let oldProduct = null;
    // for (let item of state.carList) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    // 之前有该商品就将该商品的数量加 1
    return new Promise((resolve, reject) => {
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);
      if (oldProduct) {
        // oldProduct.count += 1;
        commit(ADD_COUNTER, oldProduct);
        resolve('当前商品数量+1')
      }
      // 之前没有该商品就该商品的数量设置为 1 并添加到购物车
      else {
        payload.count = 1;
        // state.cartList.push(payload);
        commit(ADD_TO_CART, payload);
        resolve('添加了新的商品')
      }
    })
  }
}