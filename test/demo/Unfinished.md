# 暂时记录一下未完成的一些需求，以及一些小的知识点（其实是熟悉使用markdown）
#### 多表联调。评论的时候，需要知道博客的Id以及评论用户的ID

## Sequelize
### 一对多 
#### 1 -->              N          -- >             1
#### sourcekey  --> foreinKey  -->   targetKey
#### targetKey 就是需要添加的外键
#### sourceKey 是源模型的key键，targetKey是目标模型的Key键。

````将在外键(blog)foreignkey的名字为blogId。````
````最前面的是元模型，就是source 后面的是目的模型 就是target(目的模型的名字就是targetKey)````

#### ````A.hasOne(B)```` 关联意味着 A 和 B 之间存在一对一的关系,外键在目标模型(B)中定义.
#### ````A.belongsTo(B)```` 关联意味着 A 和 B 之间存在一对一的关系,外键在源模型中定义(A).
#### ````A.hasMany(B)```` 关联意味着 A 和 B 之间存在一对多关系,外键在目标模型(B)中定义. 
#### ````A.belongsToMany(B, { through: 'C' })```` 关联意味着将表C用作联结表，在A和B之间存在多对多关系，具有外键（例如aId和bId）
