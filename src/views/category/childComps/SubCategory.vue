<template>
  <div class="category-detail">
    <div :key="index" class="category-detail-item" v-for="(item, index) in CategoryList">
      <a :href="item.link"><img :src="item.image" alt="" @load="changeHeight"/></a>
      <div class="title">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Subcategory",
  props: {
    CategoryList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    changeHeight() {
      this.$emit('changeHeight')
    }
  }
};
</script>

<style scoped>


.category-detail {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.category-detail-item {
  
  padding-bottom:20px;
  position: relative;
  width: 30%;
}

.category-detail-item img {
    width: 100%;
}
.title{
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
}

.title p {
  font-size: 12px;
  margin-bottom: 2px;
}
</style>
