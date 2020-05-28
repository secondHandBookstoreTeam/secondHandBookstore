// pages/cart/index.js
/*
    1. 支付
        先判断缓存中有没有 token , 否 跳转授权页面,进行获取token
        完成支付, 手动删除缓存中 已经选中的商品
        再跳转页面
* */
import {request} from '../../request/http.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({
    data: {
        address:{},
        /*购物车数据*/
        cart:[],
        // 总价格
        totalPrice:0,
        // 总数量
        totalNum:0
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取本地存储的收货地址
        const address=wx.getStorageSync('address');
        // 获取缓存中购物车数据
        let cart=wx.getStorageSync('cart') || [];
        // 筛选数组
        cart=cart.filter(v=>v.checked);
        this.setData({cart,address})
        this.calculateToolData()    // 计算工具栏数据
    },
    // 计算底部工具栏的数据
    calculateToolData(){
        let totalPrice=0,totalNum=0,data=this.data.cart;
        data.forEach(item=>{
            if(item.checked){
                totalPrice+=item.goods_price*item.goods_count;
                totalNum+=item.goods_count;
            }
        })
        this.setData({totalPrice,totalNum})
    },
    // 支付
    async handleOrderPay(){
        const token=wx.getStorageSync('token');
        if(!token){
            wx.navigateTo({url: '/pages/auth/index'})
            return;
        }
        // 已经存在token, 创建订单
        let goods=[];
        this.data.cart.forEach(v=>goods.push({
            goods_id:v.goods_id,
            goods_number:v.goods_count,
            goods_price:v.goods_price
        }))
        const params={
            name:'createOrder',
            method:'post',
            header:{Authorization:token},
            data:{
                order_price:this.data.totalPrice,
                consignee_addr:this.data.address.detailedAddress,
                goods
            }
        }
        // 发送请求创建订单
        const res=await request(params)
        await wx.showToast({
            title: '支付成功仅演示',
            icon: 'success',
            duration: 2000
        })
        // 支付成功删除缓存已经购买的商品
        let cart=wx.getStorageSync('cart') || [];
        // 筛选数组
        cart=cart.filter(v=>!v.checked);
        wx.setStorageSync('cart', cart);
        wx.navigateBack({delta:1})
    },
})