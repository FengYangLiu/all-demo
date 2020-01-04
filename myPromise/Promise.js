const PENGDING = 'Pending' // 等待态
const FULFILLED = 'Fulfilled' // 成功态
const REJECTED = 'Rejected' // 失败态

/**
 * 提取处理then函数中的公共方法
 * 规范2.3中的处理then的方法
 * @param {Promise} promise2 then后的promise对象
 * @param {Any} x x时一个合法的js值
 * @param {Function}} resolve 成功回调
 * @param {Function} reject 失败回调
 */
function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) { // 规范2.3.1 promise2 和 x是同一个引用则抛出typeError
        // 实际上这里 promise2 如果和 x 是同一个引用以为值自己引用自己造成循环引用
        return reject(new TypeError('循环引用'));
    }

    // 判断x的类型 是为了兼容其他人的promise中的then方法
    if ((x !== null && typeof x === 'object') || typeof x === 'function') { // 规范2.3.3
        let then = x.then // 规范 2.3.3.1
        try {
            if (typeof then === 'function') {
                // 规范2.3.3.3
                then.call(x, y => { //2.3.3.3.1
                    resolvePromise(promise2,y,resolve,reject); // 递归
                }, r => {//2.3.3.3.2
                    reject(r)
                }) 
            } else { // 规范 2.3.3.4 不是函数，是一个对象，直接resolve()
                // 有可能是这种
                // let obj = { 
                //     then: {}
                // }
                resolve(x)
            }
        } catch (e) { // 规范2.3.3.2  then跑错则reject(e)
            reject(e)
        }
    } else { // 2.3.4 x不是一个对象或者函数则直接resove(x)
        // x 是个常量
        resolve(x)
    }
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
                /**
                 * 这里用setTime是为了异步，是因为执行回调时promise2还未生成，需要异步先生成promise2
                 * 并且规范中2.2.4 onFulfilled, onRejected这两个回调没有不能在本次执行上下文中调用
                 */
                setTimeout(() => {
                    try { // 确保then中抛出错误作为reject来处理
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err);
                    }

                })
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                })
            }

            if (this.status === PENGDING) {
                /**
                 * 当resolve是异步的时候，promise的状态没发生改变,需要保存
                 * 这里需要发布订阅模式来进行操作，在异步的时候发布
                 */
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }

                    })
                })

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    })
                })

            }
        })

        return promise2
    }
}

module.exports = Promise