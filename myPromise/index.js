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
// let promise = new Promise((resolve, reject) => {
//     // 直接调用
//     // 两个回调函数那个先执行就执行那个，且只能执行一个
//     console.log('立即执行！')
//     // throw new Error('xx') // 如果抛出错误则相当于调用了reject
//     // resolve(1)
//     // reject(2)
//     setTimeout(() => {
//         // 异步状态下，不能和同步一样需要保存等待状态的函数
//         resolve(1)
//     }, 1000)
//     // reject(1)

// })

// promise.then(val => {
//     // console.log(val)
// })

// // 同一个promise可以走多次所以存储函数的时候需要用数组来保存
// promise.then(val => {
//     // console.log(val)
// })


let promise2 = new Promise((resolve, reject) => {
    resolve(1)
})

// 如何实现和jQuery一样的链式调用，JQ中实现链式调用是返回this来达到责任链的功能
// 在promise中如果返回this是不能实现的，因为每个promise状态改变后就不能被改变了
// 官方文档中是返回新的一个Promise的实例对象promise2
promise2
    .then(val => val)
    .then(val => {
        console.log(val)
    })
    .then(val => {
        throw 111
    })
    // catch 方法可以拦截错误，但是不会阻止运行
    //实际上 catch就是then的简写
    // then(null, err => {throw err})
    .catch(err => console.log(err))
    .then(val => console.log(val))


// 如果promise 中resove的是一个 Promise实例呢么则会吧resolve实例的成功值(并且会等待)
let p = new Promise((resolve, reject) => {
    resolve(new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100)
        }, 1000)
    }))
})
p.then(val => console.log(val)).finally(() => {
    console.log('finally')
})

Promise.resolve('Promise.resolve').then(val => {
    console.log(val)
})

Promise.reject('Promise.reject').catch(err => {
    console.log(err)
})