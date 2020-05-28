// components/upimg/upImg.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src: {
            type: String,
            value: ''
        },
        index:{
            type: Number,
            value: 0
        }
    },
    
    /**
     * 组件的初始数据
     */
    data: {},
    
    /**
     * 组件的方法列表
     */
    methods: {
        handleDeleteImg(){
            this.triggerEvent('DleteImg',{index:this.data.index})
        }
    }
})
