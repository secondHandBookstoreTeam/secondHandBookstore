const urlMap={
    "rootUrl":"https://api-hmugo-web.itheima.net/api/public/v1",
    "swiper":"/home/swiperdata",    // 轮播图
    "navMenu":"/home/catitems",     // 导航菜单
    "floor":"/home/floordata",     // 导航菜单
    "goodsCategory":"/categories",     // 商品分类
    "goodsSearch":"/goods/search",     // 商品列表搜索
    "goodsInfo":"/goods/detail",     // 商品详情
    "goodsQsearch":"/goods/qsearch",     // 搜索建议查询
    "userToken":"/users/wxlogin",     // 获取用户token
    "payParams":"/my/orders/req_unifiedorder",     // 获取支付参数
    "createOrder":"/my/orders/create",     // 创建订单
    "orderState":"/my/orders/chkOrder",     // 查看订单支付状态
    "orderHistory":"/my/orders/all",     // 历史订单查询
}
// 同时发送异步请求的次数
let ajaxTime=0;
export const request=(parames)=>{
    ++ajaxTime;
    wx.showLoading({title: '加载中',mask:true});
    parames.url=urlMap.rootUrl+urlMap[parames.name];
    return new Promise((resolve, reject) => {
        wx.request({
            ...parames,
            success (res) {
                resolve(res)
            },fail:(err)=>{
                reject(err)
            },complete:()=>{
                --ajaxTime;
                if(ajaxTime ===0){
                    wx.hideLoading();
                }
            }
        })
    })
}