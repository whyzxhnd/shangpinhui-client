<template>
  <div>
    <!-- 头部 -->
    <Header></Header>
    <router-view></router-view>
    <!-- 底部 根据$route里的path来控制底部是否显示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 在这里获取三级联动数据性能更好.
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped>
</style>
