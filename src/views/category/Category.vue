<template>
  <div class="category">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>


    <div class="content">
      <scroll class="slide-bar-height" ref="scroll">
      <silde-bar :slideBarList="goodsTitle" ref="silde" @slideBarItemClick="slideBarItemClick"/>
    </scroll>

    <scroll class="sub-category" ref="scroll">
      <sub-category :CategoryList="goods" @changeHeight="changeHeight"/>
    </scroll>
    </div>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import SildeBar from './childComps/SildeBar'
import SubCategory from './childComps/SubCategory.vue'

import Scroll from "components/common/scroll/Scroll"

import {getCategory,getSubcategory} from 'network/category'


export default {
  name: 'User',
  components: {
    NavBar,
    SildeBar,
     SubCategory,
    Scroll
  },
  data() {
    return {
      goodsTitle: [],
      goods: []
    }
  },
  created() {
    this.getCategory()
    this.slideBarItemClick({index: 0,maitKey: "3627"})
  },
  methods: {
    // 请求分类名称数据
      getCategory() {
        getCategory().then(res => {
          //  console.log(res.data)
          this.goodsTitle = res.data.category.list;
          // console.log(this.goodsTitle)
        })
      },
      slideBarItemClick(item) {
          getSubcategory(item.maitKey).then(res => {
            this.goods = res.data.list
            // console.log(item.index)
            // console.log(res.data)
          })
      },
      changeHeight() {
        this.$refs.scroll.refresh()
      }
  }
}
</script>

<style scoped>
  .category-nav {
      background-color: var(--color-tint);
      color: white;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 999;
  }
  .content {
    display: flex;
    justify-content: space-between;
    border: 1px red solid;
  }
  .slide-bar-height {
    position: fixed;
    top: 44px;
    right: 0px;
    bottom: 49px;
    left: 0px;
    overflow: hidden;
    flex: 1;
    background-color: #f6f6f6;
    height: calc(100vh - 44px - 49px);
  }
  .sub-category {
    position: fixed;
    left: 100px;
    right: 0;
    top: 44px;
    bottom: 0;
    overflow: hidden;
    flex: 3;
    display: flex;
    flex-wrap: wrap;
    height: calc(100vh - 44px - 49px);
  }
</style>
