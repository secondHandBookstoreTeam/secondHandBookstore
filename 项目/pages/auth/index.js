// pages/auth/index.js
import {request} from '../../request/http.js';
import regeneratorRuntime from '../../lib/runtime/runtime.js';
import {login} from '../../utils/asyncWx.js';

Page({
    async getUserInfo(e) {
        try{
            // 获取用户信息
            const {encryptedData, iv, rawData, signature} = e.detail;
            // 获取小程序登陆成功后的 code
            const code = await login();
            // 发生请求获取用户token值
            let params={name:'userToken',method:'POST',data:{encryptedData,iv,rawData,signature,code}};
            const res=await request(params)
            // 模拟token
            const toekn='1234567890'
            wx.setStorageSync('token',toekn);
            wx.navigateBack({delta:1})
        }catch (e) {
            console.log(e)
        }
    }
})