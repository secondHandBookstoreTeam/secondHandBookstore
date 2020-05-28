/*
* promise 形式 getSetting
* */
export const getSetting=()=>{
    return new Promise(((resolve, reject) => {
        wx.getSetting({
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            },
        })
    }))
}
/*
* promise 形式 chooseAddress
* */
export const chooseAddress=()=>{
    return new Promise(((resolve, reject) => {
        wx.chooseAddress({
            success:(result)=>{
                resolve(result)
            },
            fail:(err)=>{
                reject(err)
            },
        })
    }))
}
/*
* promise 形式 showModal
* @param {object} 参数
* */
export const showModal=(parms)=>{
    return new Promise(((resolve, reject) => {
        wx.showModal({
            ...parms,
            success:(res)=>{
                resolve(res.confirm);
            },fail:(err)=>{
                reject(err)
            }
        })
    }))
}
/*
* promise 形式 wx.login
* @param {object} 参数
* */
export const login=()=>{
    return new Promise(((resolve, reject) => {
        wx.login({
            timeout:2000,
            success:res=>{
                resolve(res.code)
            },fail:err=>{reject(err)}
        })
    }))
}