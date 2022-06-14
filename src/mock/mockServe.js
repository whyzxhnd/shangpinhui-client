import Mock from "mockjs";
import banner from './banner.json'
import floor from './floor.json'

// mock数据: ('请求的地址',请求数据)
Mock.mock("/mock/banner", { code: 200, data: banner }) // 轮播图数据
Mock.mock("/mock/floor", { code: 200, data: floor })  // 楼层数据
