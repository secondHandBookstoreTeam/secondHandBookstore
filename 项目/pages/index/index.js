import {request} from '../../request/http.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
Page({
    data:{
        // 轮播图数组
        swiperList:[],
        // 导航数组
        catesList:[],
        /// 楼层数据
        floorList:[]
    },
    onLoad:function () {
        this.getSwiperData()
        this.getCatesData()
        this.getFloorData()
    },
    // 获取轮播图数据
    getSwiperData() {
        request({name:'swiper'}).then(result=>{
            this.setData({
                swiperList:result.data.message
            })
        })
    },
    async getFloorData() {
        const res=await request({name:'floor'});
        let data=res.data.message;
        this.setData({
            floorList:data
        })
    },
    // 导航菜单
    getCatesData() {
        request({name:'navMenu'}).then(result=>{
            this.setData({
                catesList:result.data.message
            })
        })
    },
    onReady:function () {

    },
    onHide:function () {

    },
    onUnload:function () {

    },
    onPullDownRefresh:function () {

    }
})