// pages/goods_detail/index.js
import {request} from '../../request/http.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

/*图片预料:
    1. 调用小程序的api wx.previewImage(Object object)
加入购物车
    1. 绑定事件
    2. 获取缓存中的购物车数据, 数组格式
    3. 判断当前商品已经存在, 则修改该商品数据
1. 商品收藏
    1。 onshow 的时候需要加载缓存中的数据,判断当前商品是否收藏,
* */
Page({
    /**
     * 页面的初始数据
     */
    data: {
        // 商品详情信息
        goodsInfo:{},
        // 商品是否被收藏
        isCollect:true
    },
    // 商品id
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const {goods_id}=options;
        this.getGoodsInfo(goods_id);
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    
    },
    // 获取商品详情
    async getGoodsInfo(goodsId){
        const result=await request({name:'goodsInfo',data:{goods_id:goodsId}});
        let collect=wx.getStorageSync('collect')||[];
        // 判断当前商品是否被收藏
        let {goods_id}=result.data.message;
        let isCollect=collect.some(v=>v.goods_id==goods_id)
        this.setData({
            goodsInfo:result.data.message,isCollect
        })
    },
    // 轮播图预料
    handlePreviewImage(e){
        let newArr=this.data.goodsInfo.pics.map(item=>item.pics_mid)
        wx.previewImage({
            current:e.currentTarget.dataset.url,
            urls: newArr
        })
    },
    // 点击加入购物车
    handCartAdd(){
        // 获取缓存中购物车数组  [{goods_id:Number,goods_count:Number},...]
        let cart=wx.getStorageSync('cart') || [];
        let i=cart.findIndex(v=>v.goods_id == this.data.goodsInfo.goods_id)
        if (i !==- 1){
            // 存在
            cart[i].goods_count+=1;
        }else {
            // 新商品
            let {goods_id,goods_name,goods_price,goods_small_logo}=this.data.goodsInfo;
            let obj={goods_id,goods_name,goods_price,goods_small_logo,checked:false,goods_count:1}
            cart.push(obj)
        }
        wx.setStorageSync('cart', cart);
        wx.showToast({
            title: '加入成功',
            mask:true
        })
    },
    // 商品收藏
    handleAddCollect(){
        let collect=wx.getStorageSync('collect')||[];
        // 判断该商品是否被收藏过
        let {goods_id,goods_name,goods_price,goods_small_logo}=this.data.goodsInfo;
        let index=collect.findIndex(v=>v.goods_id ==goods_id);
        if(index != -1){
            // 移除收藏
            collect.splice(index,1)
        }else {
            collect.push({goods_id,goods_name,goods_price,goods_small_logo})
        }
        wx.showToast({title: "操作成功", icon: 'success', mask:true})
        this.setData({isCollect:index==-1})
        wx.setStorageSync('collect', collect);
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
    
    },
    
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
    
    },
    
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
    
    },
    
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
    
    },
    
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
    
    },
    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
    
    }
})