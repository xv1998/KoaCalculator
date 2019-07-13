const Koa = require('koa')
const app = new Koa()
const { query } = require('./default')
const Router = require('koa-router')
let router = new Router

const calculator = async (ctx) =>{
    let num1 = ctx.query.num1.toString()
    let num2 = ctx.query.num2.toString()
    let symbol1 = ctx.query.symbol1.toString()
    let str = num1 + symbol1 + num2
    // console.log(str)
    let result = eval(str).toString()
    console.log(result)
    ctx.body = str + '='+ result
}


const register = async (ctx)=> {
    let account = ctx.query.account
    let password = ctx.query.password
    // console.log(account)
    if (account && password) {
        ctx.body = await query(`insert into cal (account,password) VALUES ( '${account}','${password}' )`)
    }else{
        ctx.body = 'insert error!'
    }
}

app.use(router.routes()).use(router.allowedMethods())
router.get('/cal',calculator)
router.get('/register',register)

app.listen(3000, () => {
    console.log('[demo] route-use-middleware is starting at port 3000')
})
