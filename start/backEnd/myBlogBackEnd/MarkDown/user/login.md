## 登录接口

### 接口描述
* 登录凭证校验，通过登录临时凭证获取openid，以及session_key

### 请求地址
> [http://127.0.0.1/login]

### 支持格式
> JSON

### HTTP请求
> POST

#### 请求参数
|参数|必填|类型|说明|
|:-----|:-----|:-----|-----|
|code |true |string |登录时获取的code |

#### 返回字段
|返回字段|字段类型|说明|
|:-----|:------|:---|
|code |number| 返回状态。100：首次登录。101正常|
|msg |string | 文字信息|
|data | Object | 返回数据|
#### 接口实例
> 地址:[http://127.0.0.1:3000/login?code=1234567890]

```
{
    code: 1,
    msg: '登录成功',
    data：{
        session_key:'qweq/123124',
        openid: 'qweqwdasczdfrt'
    }
}
```