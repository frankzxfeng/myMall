<template>
  <div id="home">
    <!-- 头部 -->
    <nav-bar class="home-bar"><div  slot="center">购物街</div></nav-bar>

    <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1"
    class="tab-control" v-show="isTabFixed"/>


    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
    @scroll="contentScroll" @pullingUp="loadMore">
      <!-- 使用组件进行轮播图展示 -->
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
    <!-- 推荐图标链接展示 -->
    <recommend-view :recommends="recommends"/>
    <!-- 特色图标链接展示 -->
    <feature-view/>
    <!-- 商品按钮链接展示 -->
    <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"/>
    <!-- 商品列表链接展示 -->
    <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <!-- 返回顶部按钮展示 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'



import {getHomeMultidata, getHomeGoods} from 'network/home'
import {itemListenerMixIn, backTopMixIn} from 'common/mixIn'


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll
  },
  mixins: [itemListenerMixIn, backTopMixIn],
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ['流行','新款','精选'],
      goods: {/**定义存储商品类型的对象变量 */
        'pop': {page:0,list:[]},
        'new': {page:0,list:[]},
        'sell': {page:0,list:[]}
      },
      currentType: 'pop',/**记录商品当前类型 */
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,/**记录滚动到的位置 */
      itemImgListener: null/**保存监听itemImageLoad事件，以便取消 */
    }
  },
  // 处于不活跃
  activated() {
    // console.log("home")
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  // 处于活跃
  deactivated() {
    // console.log("home leave")
    // 保存滚动到的位置Y
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)

  },
  //vue实例创建完成进行数据请求
  created() {
    //调用请求多个数据的方法(函数)
    this.getHomeMultidata()

    //调用请求商品数据的方法（函数）
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 利用混入mixin
  },
  methods: {
    /** 监听事件点击*/

    // 商品类型切换
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    contentScroll(position) {
      //1返回顶部按钮显示隐藏位置
      this.listenShowBackTop(position)

      // 2决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop

    },
    loadMore() {
      // console.log("监听成功滚动到底部")
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      //监听轮播图加载
      // console.log("监听轮播图加载")
      // 获取tabCtrol的offsetTop
      // 所有的组件有一个属性$el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

/**这是网络数据请求的方法（函数） */
    // 请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
    },
    //请求商品数据
    getHomeGoods(type) {
      //因为初始化的page是0，而商品页是从page=1开始，并且请求完成后页数加1
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1
        // 完成上拉加载更多
        // 继续加载
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
  .home-bar {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }
  /**方案2 使用定位*/
  .content{
    /* height: 400px; */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /**方案1通过计算 */
  /* .content{
    height: 475px;
    overflow: hidden;
    margin-top: 44px;
  } */
  </style>
