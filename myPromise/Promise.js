const PENGDING = 'Pending' // 等待态
const FULFILLED = 'Fulfilled' // 成功态
const REJECTED = 'Rejected' // 失败态

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

        if (this.status === FULFILLED) {
            onFulfilled(this.value)
        }

        if(this.status === REJECTED){
            onRejected(this.reason)
        }

        if (this.status === PENGDING){
            /**
             * 当resolve是异步的时候，promise的状态没发生改变,需要保存
             * 这里需要发布订阅模式来进行操作，在异步的时候发布
             */
            this.onResolvedCallbacks.push(() => onFulfilled(this.value))

            this.onRejectedCallbacks.push(() => onRejected(this.reason))
            
        }
    }
}

module.exports = Promise