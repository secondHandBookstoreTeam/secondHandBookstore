// pages/search/index.js
import {request} from '../../request/http.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({
    
    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        // 定时器, 用于用户输入防抖
        time:null,
        // 取消按钮是否显示
        isFocus:false,
        // 输入框的值
        inValue:''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
    },
    handleChange(e) {
        const {value}=e.detail;
        clearTimeout(this.data.time)
        let time=setTimeout((value)=>{
            if(value.trim()){
                this.setData({isFocus:true})
                this.qsearch(value)
            }else {
                this.setData({isFocus:false})
            }
        },900,value)
        
        this.setData({time})
    },
    // 点击取消按钮
    handleCancel(){
        this.setData({goods:[],inValue:'',isFocus:false})
    },
    // 发送请求获取数据
    async qsearch(query){
        const res=await request({name:'goodsQsearch',data:{query}})
        this.setData({goods:res.data.message})
    }
})