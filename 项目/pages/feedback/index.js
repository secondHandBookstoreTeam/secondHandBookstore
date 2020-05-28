// pages/feedback/index.js
/*点击+ 触发tap点击事件
    1、调用小程序内置的图片选择api
    2. 获取图片路径 存到 data变量中
    3. 页面可以根据数据渲染
* */
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {id: 0, value: '体验问题', isActive: true},
            {id: 1, value: '商品、商家投诉', isActive: false},
            {id: 2, value: '其他', isActive: false}
        ],
        // 选择的图片数组
        chooseImgs: []
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
    },
    // 点击+号选择图片事件
    handleChooseImg() {
        wx.chooseImage({
            success: res => {
                this.setData({
                    chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
                })
            }
        })
    },
    // 移除图片
    handleRemoveImg(e) {
        const {index} = e.detail;
        let {chooseImgs} = this.data;
        chooseImgs.splice(index, 1);
        this.setData({chooseImgs})
    },
    handleSubmit() {
        wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 1500
        })
        setTimeout(()=>{
            try{
                wx.navigateBack();
            }catch (e) {
                console.log(e.message)
            }
        },1500)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    
    },
    handleTabsItemChange(e) {
        const {index} = e.detail;
        let {tabs} = this.data;
        tabs.forEach((v, i) => index == i ? v.isActive = true : v.isActive = false)
        this.setData({tabs})
    },
})