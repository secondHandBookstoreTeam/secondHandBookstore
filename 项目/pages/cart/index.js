// pages/cart/index.js
/*获取用户地址功能
    1. 调用小程序内置的api获取用户收货地址 , 行不通
    2. 获取用户对当前小程序 所授予 获取地址的 权限状态 scope
        1. 点击获取收货地址 确定 : authSetting scope.address scope 值 true
        2. 用户点击收货地址 取消 :  authSetting scope.address scope 值 false
            诱导用户自己 授权设置页面
        3. 从来没有调用过收货地址 api, scope 值 undefined
    3. 获取到的收货地址保存在本地存储中
2. 页面进入需要判断本地存储是否有收货地址
3. onshow
    1. 获取缓存中的购物车数据渲染
    2. 全选实现:所以商品被选中全选就被选中,反之
    3. 总价格 ,总数量
        1. 都需要商品被选中,才计算
        2. 获取到购物车数组, 判断商品被选中
        3. 总价格+=商品的单价 * 商品数量
        4. 总数量 += 数量
        吧计算后的价格和数量 setData()
    - 商品选中功能
        1. 更改data中的数据
        2. 页面隐藏时data数据同步到本地缓存中
4. 删除商品
    1. 购买数量 =1 同时点击 -号
    2. 询问用户是否删除
5. 结算
    1.判断购物车和地址信息
    2. 跳转到支付页面
6. 支付
    1. 哪些人,哪些账号可以实现微信支付
        1. 企业账号,企业账号后台中 必须给开发者添加上白名单
            一个appid可以同时绑定多个开发者
            这些开发者就可以公用appid 和它的开发权限
    2. 没有企业账号和服务器, 做不了支付功能
* */
import {getSetting,chooseAddress,showModal} from '../../utils/asyncWx.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';

Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        /*购物车数据*/
        cart:[],
        // 全选
        allChecked:false,
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
    // 点击收货地址按钮
    async handleChooseAddress(){
        // 获取权限状态
        try {
            const res1=await getSetting();
            let state=res1.authSetting['scope.address'];
            if(state === false){
                await wx.openSetting()
            }
            const address=await chooseAddress()
            address.detailedAddress=address.provinceName+address.cityName+address.countyName+address.detailInfo
            wx.setStorageSync('address',address);
            
        }catch (error) {
            console.log(error)
        }
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取本地存储的收货地址
        const address=wx.getStorageSync('address');
        // 获取缓存中购物车数据
        const cart=wx.getStorageSync('cart') || []
        // 计算全选, every数组的方法,每个项返回true才返回true,空数组调用返回true
        this.setData({cart,address})
        this.calculateToolData()    // 计算工具栏数据
    },
    // 数字输入框组件改变事件
    numChange(e){
        let goods_id=e.currentTarget.dataset.id;
        let goods_count=e.detail.num;
        let {cart}=this.data;
        let index=cart.findIndex(v=>v.goods_id==goods_id)
        cart[index].goods_count=goods_count;
        this.setData({cart})
        this.calculateToolData(cart)
    },
    // 根据商品id 删除商品
    async deleteGoods(e){
        let goods_id=e.currentTarget.dataset.id;
        let {cart}=this.data;
        const index=cart.findIndex(v=>v.goods_id==goods_id);
        let bool=await showModal({title: '提示',content: '你是否要删除该商品？'})
        if(bool){
            cart.splice(index,1);
            this.setData({cart});
            this.calculateToolData(cart);
        }
    },
    // 商品选中
    handleItemChange(e){
        const goods_id=e.currentTarget.dataset.id;
        let {cart}=this.data;
        let index=cart.findIndex(v=>v.goods_id==goods_id)
        cart[index].checked=!cart[index].checked;
        this.setData({cart})
        this.calculateToolData(cart)
    },
    // 全选
    handleCheckAll(){
        let {cart,allChecked}=this.data;
        cart.forEach(v=> v.checked=!allChecked)
        this.setData({cart})
        this.calculateToolData(cart)
    },
    // 计算底部工具栏的数据
    calculateToolData(){
        let totalPrice=0,totalNum=0,allChecked=true,data=this.data.cart;
        data.forEach(item=>{
            if(item.checked){
                totalPrice+=item.goods_price*item.goods_count;
                totalNum+=item.goods_count;
            }else {
                allChecked=false
            }
        })
        allChecked=data.length?allChecked:false;  // 排除数组为空情况
        this.setData({allChecked,totalPrice,totalNum})
        // 同步本地缓存
        wx.setStorageSync('cart',data);
    },
    // 结算
    handlePay(){
        // 判断地址
        const {address,totalNum}=this.data
        if(!address.userName){
            wx.showToast({title: '没有收货地址', icon: 'none', duration: 1000})
            return;
        }
        // 判断是否选中商品
        if(totalNum==0){
            wx.showToast({title: '没有选择商品', icon: 'none', duration: 1000})
            return;
        }
        // 跳转支付页
        wx.navigateTo({url: '/pages/pay/index'})
    },
})