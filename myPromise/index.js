/**
 * Promise简单说明
 * 1. 通过new Promise(executor) 来生成一个Promise, Promise的参数executor会立即执行
 * 2. Promise 中存在两个回调函数 resolve 成功回调， reject 失败回调
 * 3. Promise 只有有三个状态 等待态，成功态，失败态，并且只能由等待态转换为其他状态
 * 4. 一个 Promise 状态只能更改一次不能反复更改,先调用 resolve 先执行，若在调用 reject 则忽略
 * 5. Promise 的实例对象上存在一个 then 函数来接受 resolve 或者 reject 的回调的结果
 */

const Promise = require('./Promise')


// Promise 一般用法
let promise = new Promise((resolve, reject) => {
    // 直接调用
    // 两个回调函数那个先执行就执行那个，且只能执行一个
    console.log('立即执行！')
    // throw new Error('xx') // 如果抛出错误则相当于调用了reject
    // resolve(1)
    // reject(2)
    setTimeout(() => {
        // 异步状态下，不能和同步一样需要保存等待状态的函数
        resolve(1)
    }, 1000)
    // reject(1)

})

promise.then(val => {
    console.log(val)
})

// 同一个promise可以走多次所以存储函数的时候需要用数组来保存
promise.then(val => {
    console.log(val)
})
