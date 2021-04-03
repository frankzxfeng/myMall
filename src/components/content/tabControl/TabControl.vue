<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles"
    @click="itemClick(index)" :class="{active: currentIndex === index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:　'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      currentIndex: 0/**记录点击的时哪一个 */
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      console.log(this.currentIndex)
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color:var(--color-high-text);

  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
