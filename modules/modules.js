import { HTTP } from '../utils/http.js'
// 通过extends继承父类（也可以实例化后调用）
class IndexModel extends HTTP {
  getGoodsList() {
    //  封装后的请求调用
    let that =this
    let obj={
      page:1,
      rows:10
    }
    return new Promise((resolve, reject)=>{

      that.request({
        url: '/article/shoplist',
        data: obj,
        method:'post',
        success: res => {
          resolve(res)
        }
      })

    })
   
  }
}
export { IndexModel }