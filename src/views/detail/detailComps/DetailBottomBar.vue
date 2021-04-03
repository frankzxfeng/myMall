<template>
  <div class="bottom-bar">
    <!-- 左边 -->
    <div class="bar-item bar-left">
      <div class="item">
        <i><img src="~assets/img/detail/kefu.png" alt=""></i>
        <div><span class="text">客服</span></div>
      </div>
      <div class="item">
        <i><img src="~assets/img/detail/shop.png" alt=""></i>
        <div><span class="text">店铺</span></div>
      </div>
      <div class="item">
       <i><img src="~assets/img/detail/collect.png" alt=""></i>
       <div><span class="text">收藏</span></div>
      </div>
    </div>
    <!-- 右边 -->
    <div class="bar-item bar-right">
      <div class="item cart-item" @click="addToCart">
        <div><img src="~assets/img/detail/cart.png" alt=""></div>
        <span class="cart">加入购物车</span>
      </div>
      <div class="item buy-item">
        <p class="buy">购买</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    addToCart() {
      // console.log("点击添加购物车")
      // 发送添加购物车事件
      this.$emit('addToCart')
    }
  },
}
</script>

<style scoped>
 .bottom-bar {
   display: flex;
   background-color: #fff;
   height: 49px;
   position: fixed;
   left: 0;
   right: 0;
   bottom: 0px;
   text-align: center;
 }
 .bar-item {
   flex: 1;
   display: flex;
 }
 .bar-left {
   flex: 1;
   display: flex;
 }
  .bar-left .item {
    flex: 1;
  }
 .item img {
   width: 24px;
   height: 24px;
   margin-top: 3px;
 }
  .item span {
   font-size: 12px;
   margin-bottom: 3px;
 }
  .bar-right {
    flex:1;
    display: flex;
    align-content: center;
 }
  .bar-right .item {
    flex: 1;

  }
  .bar-right .buy-item {
    background: linear-gradient(to left, #f8a7d7, #f7aadd);
    border: solid 2px #fc63bc;
    border-radius: 10px;
  }
  .bar-right .buy-item .buy{
    margin-top: 15%;
  }
</style>
