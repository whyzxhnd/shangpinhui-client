<template>
  <!-- 三级联动区域 -->
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 当鼠标离开商品分类整个模块时触发事件 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 使用transition标签来完成过度属性 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                :class="{ k: currentIndex == index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <!--  -->
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{
                        c2.categoryName
                      }}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>
<script>
// 引入第三方包lodash
import throttle from "lodash/throttle";

import { mapState } from "vuex";

export default {
  name: "TypeNav",

  // 当商品分类组件挂在完毕时触发,此时可以发送请求获取动态数据
  data() {
    return {
      currentIndex: -1,
      show: false,
    };
  },

  mounted() {
    // 触发vuex里面的categoryList方法
    // 放在这里,每一次组件挂载都会发送请求,而在home与search组件都需要,为了性能考虑,需要放到app.vue父组件中去获取三级列表数据
    // this.$store.dispatch("categoryList");
    if (this.$route.path !== "/home") {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList; // 返回state里面home仓库的categoryList
      },
    }),
  },
  methods: {
    // 鼠标移动到上面触发事件 修改 currentIndex
    // changeIndex(index) {
    //   // alert(123);

    //   console.log(this.currentIndex);
    // },
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log("完成节流", index);
    }, 100),
    // 当搜索页时,可以控制列表的显示与隐藏
    enterShow() {
      // this.show = true;
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    // 鼠标移出
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 跳转到搜索页面
    goSearch(e) {
      // console.log(e.target.dataset);
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      let location = { name: "search" };
      let query = { categoryName: categoryname };
      //  只有点击的是a标签,才能跳转,因为只有a标签里才有categoryname
      // 注意此处的category1Id  ::大写
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
          // console.log(category3id);
        }

        if (this.$route.params) {
          location.query = query;
          location.params = this.$route.params;
        }
        this.$router.push(location);
      }
    },
  },
};
</script>
<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .k {
          background-color: skyblue;
        }
        // 1.从样式上完成鼠标移上改变颜色.
        // .item:hover {
        //   background-color: skyblue;
        // }
      }
    }
    // 过度动画样式
    // 初始状态
    .sort-enter {
      height: 0;
    }
    // 结束状态
    .sort-leave-to {
      height: 461px;
    }
    // 过程
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>