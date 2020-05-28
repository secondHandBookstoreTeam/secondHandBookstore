// components/digitalInput/digitalInput.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        initnum:{
            type:Number,value:0
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
        handleNumChange(e){
            let {state}=e.currentTarget.dataset;
            this.data.initnum+=state
            if(this.data.initnum<1){
                // 删除商品
                this.data.initnum=1;
                this.triggerEvent('deleteGoods')
            }
            this.triggerEvent('NumChange',{'num':this.data.initnum})
        }
    }
})
