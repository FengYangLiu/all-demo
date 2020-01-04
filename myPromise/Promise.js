const PENGDING = 'Pending' // 等待态
const FULFILLED = 'Fulfilled' // 成功态
const REJECTED = 'Rejected' // 失败态

// promise2
function resolvePromise(promise2, x, resolve, reject){
    resolve(x)
}

class Promise {
    constructor(executor) {
        this.status = PENGDING // 存在一个状态
        this.value = void 0 // 成功后的值
        this.reason = void 0 // 失败的值
        this.onResolvedCallbacks = [] // 存储所有成功回调（一个promise对象有可能有多个then）
        this.onRejectedCallbacks = [] // 存储所有失败

        // 成功回调
        const resolve = (value) => {
            if (this.status === PENGDING) { // 只能从等待转换状态
                this.status = FULFILLED
                this.value = value

                // 将数组中的成功方法依次调用 订阅
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        // 失败回调
        const reject = (reason) => {
            if (this.status === PENGDING) {
                this.status = REJECTED
                this.reason = reason

                // 将失败的方法依次调用
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try { // 在执行这个函数的时候有可能会抛出错误，则会reject掉
            executor(resolve, reject) // 执行Promise中的函数
        } catch (err) {
            reject(err)
        }
    }

    // then有两个回调一个是成功回调，另一个则是失败回调
    then(onFulfilled, onRejected) {
        // 规范 2.2.1 参数可选，回调函数不是函数则忽略
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {}
        onRejected = typeof onRejected === 'function' ? onRejected : () => {}

        // 如何实现和jQuery一样的链式调用，JQ中实现链式调用是返回this来达到责任链的功能
        // 在promise中如果返回this是不能实现的，因为每个promise状态改变后就不能被改变了
        // 官方文档中是返回新的一个Promise的实例对象promise2，让当前then可以继续then
        let promise2 = new Promise((resolve, reject) => {

            if (this.status === FULFILLED) {
                setTimeout(()=>{
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
    
            if(this.status === REJECTED){
                setTimeout(()=>{
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                })
            }
    
            if (this.status === PENGDING){
                /**
                 * 当resolve是异步的时候，promise的状态没发生改变,需要保存
                 * 这里需要发布订阅模式来进行操作，在异步的时候发布
                 */
                this.onResolvedCallbacks.push(() => {
                    setTimeout(()=>{
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    })
                })
    
                this.onRejectedCallbacks.push(() =>{ 
                    setTimeout(()=>{
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    })
                })
                
            }
        })
        
        return promise2
    }
}

module.exports = Promise