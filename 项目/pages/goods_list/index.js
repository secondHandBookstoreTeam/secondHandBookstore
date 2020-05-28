/*1. 用户上滑页面，滚动条触底加载下一页
    1. 找到滚动条触底事件,
    2. 判断还有没有有下一页数据,
    3. 没有下一页数据,弹出提示
    4. 有加载下一页数据
  2. 下拉涮新
    1. 触发下拉涮新
    2. 重置数据数组
    3.重置页码 值为 1
    4. 重新发送请求
    5. 数据请求回来了需要手动关闭等待效果
* */
import {request} from '../../request/http.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {id: 0, value: '综合', isActive: true},
            {id: 1, value: '销量', isActive: false},
            {id: 2, value: '价格', isActive: false}
        ],
        // 商品列表数据
        goodsList:[],
        // 无图片时显示的默认图片
        defaultImage:'http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000606013705_1_400x400.jpg'
    },
    // 接口要的参数
    QueryParams: {query:'', cid:'', pagenum:1, pagesize:10},
    // 商品列表总条数
    total:0,
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.QueryParams.cid=options.cid||'';
        this.QueryParams.query=options.query||'';
        this.getGoodsList();
    },
    // 获取商品列表数据
    async getGoodsList(){
        const result=await request({name:'goodsSearch',data:this.QueryParams});
        let {total}=result.data.message;
        this.total=total;
        let {goods}=result.data.message;
        this.setData({
            /* 旧数据与新数据拼接*/
            goodsList:[...this.data.goodsList,...goods]
        })
        // 关闭下拉涮新的窗口
        wx.stopPullDownRefresh();
    },
    // 标题点击事件, 从子组件转递过来
    handleTabsItemChange(e) {
        const {index} = e.detail;
        let {tabs} = this.data;
        tabs.forEach((v, i) => index == i ? v.isActive = true : v.isActive = false)
        this.setData({tabs})
    },
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 判断还有没有下一页
        if(this.QueryParams.pagenum*this.QueryParams.pagesize > this.total){
            // 没有下一页
            wx.showToast({title: '没有数据了', icon: 'none', duration: 1000})
        }else {
            // 有下一页
            ++this.QueryParams.pagenum;
            this.getGoodsList()
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // 重置数组
        this.setData({goodsList:[]})
        // 重置页码
        this.QueryParams.pagenum=1;
        this.getGoodsList();
    },
})