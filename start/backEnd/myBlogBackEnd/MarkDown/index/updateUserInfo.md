## 更新用户信息接口

### 接口描述
* 存储用户的信息

### 请求地址
> [http://127.0.0.1:3000/updateUserInfo]

### 支持格式
> JSON

### HTTP请求方式
> POST

#### 请求参数
|参数|必填|类型|说明|
|:------|:------|:------|:------|
|userId | false | String | 用户的Id|
|nickName|true |String | 用户的昵称|
|img|true | String | 用户头像地址|
|gender|false | String | 性别|



#### 返回参数
|返回字段|字段类型|说明|
|:------|:------|:------|
|code|number|状态|
|msg|String| 信息字符|

#### 接口实例
> 地址:[http://127.0.0.1:3000/updateUserInfo]

```
{
    code:1024,
    msg:'更新成功'
}
```
