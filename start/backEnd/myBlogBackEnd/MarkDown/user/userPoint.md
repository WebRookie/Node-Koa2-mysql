## 用户积分

### 接口描述
* 查询用户的积分积分明细

### 请求地址
> [http://127.0.0.1:3000/getUserPoint]

### 支持格式
> JSON

### HTTP请求格式
> POST

#### 请求参数
|参数|必填|类型|说明|
|:-----|:-----|:-----|-----|
|currentPage|true|number|当前页数|
|pageSize|true|number|每页显示多少条|
|<summary>param</summary>|true|object|用户的Id|   
|userId|true|number|123|