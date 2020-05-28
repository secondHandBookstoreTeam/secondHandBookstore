// components/tabs/tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs:{
            type:Array,
            value:[]
        },
        type:{
            type:Number,
            value: 1
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
        // tabs 栏点击事件
        handleItemTap(e){
            const {index}=e.target.dataset;
            // 触发父组件事件
            this.triggerEvent('tabsItemChange',{index})
        }
    }
})
