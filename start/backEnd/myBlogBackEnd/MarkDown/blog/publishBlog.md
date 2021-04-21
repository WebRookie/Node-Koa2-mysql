## 发布博客

### 接口描述
* 用户用于发布博客  

### 请求地址
> [/publishBlog]

### 支持格式
> JSON  

### HTTP请求方式
> POST  

#### 请求参数  
|参数|必填|类型|说明|
|:-----|:----|:-----|:------|
|userId|true|String|用户Id|
|content|true|String|发布的博客内容|  


#### 返回字段  

|返回字段|字段类型|说明|  
|:------|:-----|:------|
|code|Number|状态码|  
|msg|String|信息|  
|data|Object| 返回数据|  

#### 接口实例  
> 地址:[http://127.0.0.1:3000/publishBlog]  

```
    {
        code:1204,
        data:{Object},
        msg:'发布成功'
    }
```