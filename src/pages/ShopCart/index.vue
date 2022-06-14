<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              :checked="cart.isChecked == 1"
              name="chk_list"
              @change="changeChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('reduce', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="removeCart(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 选中状态为所有的都选中,并且购物车不为空 -->
        <input
          class="chooseAll"
          :checked="isAllChecked && cartInfoList.length"
          @change="changeAllCheckedPromise($event)"
          type="checkbox"
          id="quanxuan"
        />
        <!-- 1.优化用户体验 -->
        <label for="quanxuan">全选</label>
      </div>
      <div class="option">
        <a href="#none" @click="deleteSelectedGoodsPromise">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ShopCart",
  data() {
    return {
      isFlag: false, // 节流阀 true代表已经点击了按钮,但是没有获取到数据,  当isFlag = false已经收到数据的时候才能够发送
    };
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 总价
    totalPrice() {
      let num = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          num += item.skuNum * item.skuPrice;
        }
      });
      return num;
    },
    checkedNum() {
      let num = 0;
      this.cartInfoList.forEach((item) => {
        if (item.isChecked == 1) {
          num += item.skuNum;
        }
      });
      return num;
    },

    isAllChecked() {
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1;
      });
    },
  },
  methods: {
    async getData() {
      try {
        await this.$store.dispatch("getCartList");
        // console.log(this.cartInfoList);
        this.isFlag = false;
      } catch (error) {
        console.log(error);
      }
    },
    // 当选择的数量变化时 // 此处存在逻辑bug,可能因为throttle,,快速点击时,两次点击

    // 手动写一个节流阀,只有获取到数据之后,才能够发送请求.
    async handler(type, skuNum, cart) {
      if (this.isFlag == true) {
        return;
      } else {
        switch (type) {
          case "add":
            skuNum = 1;
            break;
          case "reduce":
            if (cart.skuNum > 1) {
              skuNum = -1;
            } else {
              skuNum = 0;
            }
            break;
          case "change":
            //  当输入的数据是NaN类型,或者<1的时候,
            if (isNaN(skuNum) || skuNum < 1) {
              skuNum = 0;
            } else {
              skuNum = parseInt(skuNum) - cart.skuNum;
            }

            break;
        }
        // console.log(type, skuNum, cart);
        // 打开节流阀
        this.isFlag = true;
        try {
          await this.$store.dispatch("AddOrUpdateShopCart", {
            skuId: cart.skuId,
            skuNum: skuNum,
          });

          this.getData();

          // 当上面的发送请求成功之后才获取数据,
        } catch (error) {
          alert(error.message);
        }
      }
    },
    // 删除购物车商品
    async removeCart(skuId) {
      try {
        await this.$store.dispatch("removeCart", skuId);

        this.getData();
      } catch (error) {
        alert("fail");
      }
    },
    //  改变选中状态
    async changeChecked(cart, $event) {
      console.log("触发了改变选择的事件");
      // console.log($event.target.checked);
      if ($event.target.checked) {
        cart.isChecked = 1;
      } else {
        cart.isChecked = 0;
      }
      // console.log(cart.isChecked);
      try {
        console.log(1);
        await this.$store.dispatch("updateCheckedById", {
          skuID: cart.skuId,
          isChecked: cart.isChecked,
        });

        this.getData();
      } catch (error) {
        alert(error.message);
      }

      // console.log(cart, $event);
    },
    // 点击了全选按钮, 第一种
    // changeAllChecked($event) {
    //   let result = $event.target.checked == true ? 1 : 0; // 获取当前全选按钮的选中状态
    //   // console.log("全选按钮的状态为", result);

    //   this.cartInfoList.forEach(async (item) => {
    //     // 只需要将与当前选中状态不同的 商品选中或者取消选中
    //     // 优化代码效率
    //     if (item.isChecked !== result) {
    //       item.isChecked = result;
    //       try {
    //         await this.$store.dispatch("updateCheckedById", {
    //           skuID: item.skuId,
    //           isChecked: item.isChecked,
    //         });
    //       } catch (error) {
    //         alert(error.message);
    //       }
    //     }
    //   });
    // },
    // 删除选中的商品
    // 1.使用下面的代码,虽然可以实现成功的功能,但是如果有数据删除失败,那么不好进行处理,
    // deleteSelectedGoods() {
    //   this.cartInfoList.forEach(async (item) => {
    //     if (item.isChecked == 1) {
    //       try {
    //         await this.$store.dispatch("removeCart", item.skuId);
    //       } catch (error) {
    //         alert(error.message);
    //       }
    //     }
    //   });
    //   // 全部删除完毕之后在刷新
    //   this.getData();
    // },
    //  使用promise.all处理 选中状态
    async changeAllCheckedPromise($event) {
      let result = $event.target.checked == true ? 1 : 0; // 获取当前全选按钮的选中状态
      console.log(result, "出发了点击事件");
      // debugger;
      // return;
      // console.log(result);
      try {
        // 返回的是一个promise.all对象, 只有所有的选中都成功,才能够进入下面的getData(),否则catch
        // console.log(
        //   "全选返回参数",
        //   this.$store.dispatch("changeAllchecked", result) // 此处打印将会再次调用这个方法,
        // );
        await this.$store.dispatch("changeAllchecked", result);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    // 2. 使用promise.all处理 删除
    //  *****因为购物车列表渲染的是第一列的数据, 而vuex中的 state里面的 cartList [{},{},{}] 存在很多组数据,我们只取了cartList[0],来渲染,因此,在全部删除之后cartList[1]又变成了cartList[0]
    async deleteSelectedGoodsPromise() {
      //
      try {
        //  返回的是一个promise.all对象,只有都成功才能进入 try, 否则进入catch
        await this.$store.dispatch("deleteAllSelectedGoods");

        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>