<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <!-- 语法一 -->
      <!-- <div slot="center">购物车({{cartLength}})</div> -->
      <!-- 语法二 -->
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'


import {mapGetters} from 'vuex'

export default {
  name: 'ShopCart',
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 语法一:可以是数组
    // ...mapGetters([
    //   'cartLength'
    // ])
     // 语法二：可以是对象
     ...mapGetters({
       length: 'cartLength'
     })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
