const PENGDING = 'Pending' // 等待态
const FULFILLED = 'Fulfilled' // 成功态
const REJECTED = 'Rejected' // 失败态

class Promise {
    constructor(executor) {
        this.status = PENGDING // 存在一个状态
        this.value = void 0 // 成功后的值
        this.reason = void 0 // 失败的值
        // 成功回调
        const resolve = (value) => {
            console.log(this.status,value)
            if (this.status === PENGDING) { // 只能从等待转换状态
                this.status = FULFILLED
                this.value = value
            }
        }

        // 失败回调
        const reject = (reason) => {
            if (this.status === PENGDING) {
                this.status = REJECTED
                this.reason = reason
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

        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }

        if(this.status === REJECTED){
            onRejected(this.reason)
        }

    }
}

module.exports = Promise