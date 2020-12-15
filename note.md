# Stock-app
TTP
Qs5LEDWIaPITXIIn
mongodb+srv://donghao:<password>@cluster0-qvchz.mongodb.net/test?retryWrites=true&w=majority

Finnhub API key is needed.

Content-Type: application/json (register User)

### 开发过程难点总结：

1. 使用 Finnhub API，还有 Mongodb 的连接，建模。
2. 处理 auth 的各种前端操作，包括每个 action 对应引起多个动作，活用 dispatch。
3. 前端的固定动作 setAuthToken。
4. 处理 mobile css styles 和 flex box运用。
5. 后端的 route 函数建立，包括 auth 过程中运用 bcrypt 和 json web token。
6. 后端一段逐个处理 promise 的函数：

```js
const handleOneRequest = (index) => {
    return new Promise(resolve => {
        finnhubClient.quote(user.shareholding[index].symbol, (error, data, response) => {
            resolve(data);
        })
    })
}

const handleAllRequest = async (index) => {
    const res = await handleOneRequest(index);
    allStocksData.stock.push([user.shareholding[index].quantity, res, user.shareholding[index].symbol]);
    allStocksData.value += Number(res.c * user.shareholding[index].quantity);
    index++;
    if (index < user.shareholding.length) {
        await handleAllRequest(index);
    }
}

if (user.shareholding.length > 0) {
    await handleAllRequest(0);
}
```

7. 前后端的数据对接。
8. setAlert 函数的广泛使用。
9. 有些数据条件限制会在前端做，有些会在后端做，有些会在前后端做，一个保险的策略是提交动作后自动重载。
10. app refactor。