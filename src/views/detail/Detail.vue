<template>
  <div id="detail">
    <detail-nav-bar class="detail-bar" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <!-- 属性：topImages  传值时top-images -->

      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <!-- 展示商家 -->
      <detail-shop-info :shop="shop"/>
      <!-- 展示商品详情 -->
      <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"/>
      <!-- 展示参数 -->
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <!-- 展示评论 -->
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <!--展示推荐  -->
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <!-- 底部导航 -->
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- 返回顶部按钮展示 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>

    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from './detailComps/DetailNavBar'
import DetailSwiper from './detailComps/DetailSwiper'
import DetailBaseInfo from './detailComps/DetailBaseInfo'
import DetailShopInfo from './detailComps/DetailShopInfo'
import DetailGoodsInfo from './detailComps/DetailGoodsInfo'
import DetailParamInfo from './detailComps/DetailParamInfo'
import DetailCommentInfo from './detailComps/DetailCommentInfo'
import DetailBottomBar from './detailComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import Toast from 'components/common/toast/Toast'

import GoodsList from 'components/content/goods/GoodsList'

import {getDetail, Goods, Shop,  GoodsParam,getRecommend} from 'network/detail'


import {debounce} from 'common/utils'
import {itemListenerMixIn, backTopMixIn} from 'common/mixIn'

import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    Toast,
    GoodsList,
  },
  mixins: [itemListenerMixIn, backTopMixIn],
  data() {
    return {
      iid: null,
      topImages: [],/**详情页轮播图 */
      goods: {},/**保存详情页商品基本信息 */
      shop: {},/**保存店铺信息 */
      detailInfo: {},/**保存商品详情信息 */
      paramInfo: {},/**保存参数信息 */
      commentInfo: {},/**保存评论信息 */
      recommends: [],/**数组形式保存推荐数据 */

      themeTopYs: [],/**记录主题的各个坐标 */
      getThemeTopY: null,/**赋予值是防抖函数 */
      positionY: 0,/**记录当前滚动到的poaition值 */
      currentIndex: 0,/**记录当前滚到区域的index值 */
      message: '',/**弹窗显示的文字 */
      show: false
    }
  },
  methods: {
    // 映射addCart这个函数
    ...mapActions(['addCart']),

    titleClick(index) {
      // 监听点击
      // console.log(index)
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    // 对图片加载刷新
    detailImageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    // 监听内容滚动事件
    contentScroll(position) {
      // console.log("监听内容滚动")
      // 1获取y只（y值是负数）
      this.positionY = -position.y
      // 2.positionY与主题值对比
      let length = this.themeTopYs.length
      for(let i = 0; i < length - 1; i++) {
        if(this.currentIndex !== i && (this.positionY > this.themeTopYs[i] && this.positionY < this.themeTopYs[i+1])){
          // 存储当前的i
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.detailNav.currentIndex = this.currentIndex
        }
      }
      // 3是否显示回到顶部按钮
      this.listenShowBackTop(position)
    },
    // 监听添加到购物车
    addToCart() {
      // console.log("点击添加购物车")
      // 1获取购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2将商品添加购物车
      // >1正常写法
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })

      // 2>映射addCart函数后的写法
      this.addCart(product).then(res => {
        // 弹窗的显示
        // console.log(res)
        // 1普通
        // this.show = true
        // this.message = res

        // setTimeout(() => {
        //   this.show = false
        // this.message = ''
        // },1500)

        // 2
        this.$toast.show(res)
      })

    }
  },
  created() {
    // 1保存传入的iid
    this.iid = this.$route.params.iid
    // 2根据id请求详情页数据
    getDetail(this.iid).then(res => {
      // 做一个数据中转，保存在data中
      const data = res.result

      // 详情页所有数据
      // console.log(res)
      console.log(res.result)
      this.topImages = data.itemInfo.topImages
      // 顶部图片数据
      // console.log(this.topImages)

      // 获取商品信息(创建商品信息对象)
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      console.log(this.goods)

      // 商家信息获取(创建商家信息对象)
      this.shop = new Shop(data.shopInfo)
      // console.log(this.shop)

      // 获取商品详情信息
      this.detailInfo = data.detailInfo
      // console.log(this.detailInfo)

      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }
    })

    // 3.请求保存推荐的数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })
    // 4给getThemeTopY赋值(对给getThemeTop赋值的操作进行防抖)
    // 目的保证图片加载后只是回调一次
    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs)
    },100)
  },
  destroyed() {
    // console.log('stroyed')
    // 取消全局事件的监听
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
  #detail {
    /* 来到详情页底部导航消失 */
    position:relative;
    z-index: 9;
    background-color: #fff;

    height: 100vh;
  }
  .detail-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  /* .content {
    height: calc(100% - 44px);
  } */
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
