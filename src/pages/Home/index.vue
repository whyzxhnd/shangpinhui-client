<template>
  <div>
    <!-- 三级联动组件 :全局组件不需要注册 -->
    <type-nav></type-nav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>
<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import { mapState } from "vuex";

export default {
  name: "",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  methods: {},
  async mounted() {
    this.$store.dispatch("getFloorList");
    try {
      await this.$store.dispatch("getUserInfo");
    } catch (error) {
      console.log(error.message);
    }
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>
<style scoped lang='less'>
</style>