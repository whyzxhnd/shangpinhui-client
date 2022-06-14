<template>
  <div class="swiper-container" id="floor1Swiper" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="index">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    // 当list有值的时候,获取实例对象, 但是有可能循环还没有完全渲染
    list: {
      immediate: true,
      handler() {

        this.$nextTick(() => {

          new Swiper(this.$refs.mySwiper, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },

            // 如果需要滚动条
            scrollbar: {
              el: ".swiper-scrollbar",
            },
          });
        });
      },
    },
  },
};
</script>
<style scoped lang='less'>
</style>