<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" class="title-item"
        :class="{active: index ==  currentIndex}"
        @click="titleClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components:{
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      // console.log("监听详情页的标题点击")
      // console.log(index)
      this.currentIndex = index
      // 将事件发出去
      this.$emit('titleClick', index)

    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    height: 20px;
    width: 20px;
    margin-top: 13px;
  }
</style>
