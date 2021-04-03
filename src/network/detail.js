// 对请求详情页数据统一管理
import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params:{
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

// 创建一个商品描述类
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 创建商家信息类
export class Shop {
  constructor(shopInfo){
    this.shopLogo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

// 创建商品参数信息类
export class GoodsParam {
  constructor(info, rule) {
    // image可能没有值（有的有，有的没有）
    this.image = info.image ? info.image[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}
