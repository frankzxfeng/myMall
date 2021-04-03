/** 轮播图抽取到这个组件中，然后在Home组件使用*/
<template>
  <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'


export default {
  name: 'HomeSwiper',
  props: {/**利用props访问父组件中的banners对象 */
    banners: {
      type: Array,
      default() {
        return []
      }
    },
    data() {
      return {
        // 用于判断只加载一次轮播图就好
        isLoad: false
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // console.log("监听轮播图加载")
      // 发送轮播图加载事件
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true/**将不再执行if中的处理语句 */
      }
    }
  },
}
</script>

<style scoped>

</style>
