<template>
  <div class="wrapper" ref="aaa">
    <ul class="content">
      <button class="btn">按钮</button>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>
      <li>7890</li>

    </ul>
  </div>
</template>

<script>
/**bertter-scroll基本使用 */
import BSscroll from 'better-scroll'

export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // console.log(this.$refs.aaa)
    // console.log(document.querySelector('.wrapper'))
    this.scroll =  new BSscroll(document.querySelector('.wrapper'),{
      /**0,1都是不侦测实时位置；2手指在上面是侦测，不在上面不侦测；3只要滚动就侦测（包括惯性的滚动） */
      probeType:2,
      click: true,
      pullUpLoad: true/**监听上拉加载更多 */
      })
    this.scroll.on('scroll', (position) => {
      // console.log(position)
    })
    document.querySelector('.btn', addEventListener('click', function() {
      console.log(11111111)
    }))
    this.scroll.on('pullingUp',() => {
      console.log("上拉加载跟多")
      /**下一次的加载需要，发送网络请求，请求更多的数据，等待数据请求完成并且展示后使用finishPullUp()方法 */
      setTimeout(() => {
        this.scroll.finishPullUp()
      },2000)
    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
    }
</style>
