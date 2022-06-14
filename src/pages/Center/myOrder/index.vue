<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table
          class="order-item"
          v-for="goodItem in orderList"
          :key="goodItem.id"
        >
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{ goodItem.createTime }} 订单编号：{{
                    goodItem.outTradeNo
                  }}
                  <span class="pull-right delete"
                    ><img src="../images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(cart, index) in goodItem.orderDetailList"
              :key="cart.id"
            >
              <td width="60%">
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width: 80px; height: 100px" />
                  <a href="#" class="block-text">{{ cart.skuName }}</a>
                  <span>x{{ cart.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <td
                :rowspan="goodItem.orderDetailList.length"
                width="8%"
                class="center"
                v-if="index == 0"
              >
                {{ goodItem.consignee }}
              </td>
              <td
                :rowspan="goodItem.orderDetailList.length"
                width="13%"
                class="center"
                v-if="index == 0"
              >
                <ul class="unstyled">
                  <li>总金额¥{{ goodItem.totalAmount.toFixed(2) }}</li>
                  <li>在线支付</li>
                </ul>
              </td>
              <td
                :rowspan="goodItem.orderDetailList.length"
                width="8%"
                class="center"
                v-if="index == 0"
              >
                <a href="#" class="btn">{{ goodItem.orderStatusName }} </a>
              </td>
              <td
                :rowspan="goodItem.orderDetailList.length"
                width="13%"
                class="center"
                v-if="index == 0"
              >
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="choose-order">
        <!-- 分页 -->
        <Pagination
          :pageNo="page"
          :pageSize="limit"
          :total="total"
          :continues="5"
          @getPageNo="getPageNo"
        ></Pagination>
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "myOrder",
  data() {
    return {
      page: "1",
      limit: "5",
      orderList: {},
      total: 0,
      current: 1,
    };
  },
  mounted() {
    this.getMyOrderList(this.page, this.limit);
  },
  methods: {
    async getMyOrderList(page, limit) {
      let res = await this.$API.reqMyOrderList(page, limit);
      if (res.code == 200) {
        this.orderList = res.data.records;
        this.total = res.data.total;
      }
      //   console.log(res);
    },
    getPageNo(e) {
      //   console.log(e);
      this.page = e;
      this.getMyOrderList(this.page, this.limit);
    },
  },
};
</script>

<style lang="less" scoped>
</style>