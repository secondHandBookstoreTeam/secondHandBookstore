// pages/category/index.js
import {request} from '../../request/http.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        // 接口返回数据
        CatesData:[],
        // 被点击的左侧菜单
        currentIndex:1,
        // 右侧疙滚动条距离
        scrollTop:0
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCatesData()
        // 获取本地存储数据做缓存
        /*const Cates=wx.getStorageSync('cates');
        if(!Cates){
            this.getCatesData()
        }else {
            // 过期时间为10分钟
            if (Date.now() - Cates.time > 1000*60*10){
                this.getCatesData()
            }else {
                // 使用旧数据
                this.setData({
                    CatesData:Cates.Data
                })
            }
        }*/
    },
    // 获取分类数据
    async getCatesData() {
        const result=await request({name:'goodsCategory'});
        // wx.setStorageSync('cates', {time:Date.now(),data:result.data.message});
        this.setData({
            CatesData:result.data.message
        })
    },
    // 左侧菜单的点击事件
    handleItemTap(e){
        let {index}=e.currentTarget.dataset;
        // 更新当前点击索引
        this.setData({
            currentIndex:index,
            scrollTop:0
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    
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