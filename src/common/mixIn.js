
import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixIn = {
  data() {
    return {
      itemImgListener: null/**保存监听itemImageLoad事件，以便取消 */
    }
  },
  mounted() {
    // 调用debounce防抖函数（图片加载完成监听）
    const refresh = debounce(this.$refs.scroll.refresh, 100)
    // 监听首页图片加载完成
   //对监听图片的函数进行保存
    this.itemImgListener = () => {
      // 对加载出来的图片进行刷新重新计算scrollerHeight
      refresh()
    }
    // 通过事件总线监听事件
    this.$bus.$on('itemImageLoad', this.itemImgListener)

    // 检测是否混入
    // console.log('我是混入的')
  },
}

// 返回顶部
export const backTopMixIn = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000
    }
  }
}
