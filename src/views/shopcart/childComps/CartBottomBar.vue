<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll"
      @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">合计：{{totalPrice}}</div>

    <div class="calculate" @click="calcClick">
      去计算:({{checkedLength}})
    </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartBottomBar',
  components: {
    checkButton
  },
  methods: {
    checkClick() {
      // console.log("监听全选")
      /**全部选中 */
      if(this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else{
        /**部分选中 */
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if(!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 2000)
      }
    }
  },
  computed: {
    totalPrice() {
      return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
// 方式一
      // return !(this.$store.state.cartList.filter(item => item.checked).length)
// 方式二
      // if(this.$store.state.cartList.length === 0) return false
      // return !this.$store.state.cartList.find(item => !item.checked)

// 方式三
      if(this.$store.state.cartList.length === 0) return false
      for(let item of this.$store.state.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true

    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #eee;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;

    background-color: orange  ;
  }
</style>
