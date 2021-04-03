<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    // 1创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      pullUpLoad: this.pullUpLoad
    })
    // 2监听滚动位置
    // 只有当probeType值为2或3时监听
    if(this.probeType ==2 || this.probeType == 3) {
      this.scroll.on('scroll', (position) => {
      // console.log(position)
      // 将位置信息传出去
      this.$emit('scroll',position)
      })
    }
    // 3监听scroll何时滚动到底部
    // 当pullUpLoad存在时
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        // console.log("滚动到底部")
        // 向Home发出事件
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 返回顶部按钮的一个方法，在home组件在调用
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    refresh() {
      // 对加载出来的图片进行刷新重新计算scrollerHeight的方法
      // console.log("----------------")
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll.y ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
