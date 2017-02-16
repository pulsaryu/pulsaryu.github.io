---
layout : post
title : RESTFul API 设计
category : framework
tags : [API, REST, RESTful]
---

REST(Representational State Transfer) 是一种网络架构风格，所以明确一点REST不是什么标准，不要试图找的最标准的格式，是没有的。
REST是由Adobe高级技术专家、Apache联合创始人Roy Fielding在2000年的时候博士论文中提出的，牛人啊。

<!--more-->

## 要点
- 通过操作资源的表现形式来操作资源。把所有需要操作的内容都看做是一种资源，客户端做的就是就是对这些资源的各种操作。
- 对资源的操作包括获取、创建、修改和删除，正好对应HTTP协议提供的GET、POST、PUT（更新全部）/PATCH（更新部分）和DELETE方法。
- 操作的资源通过URI指定。

## 举例
- GET /users 查看用户列表
- GET /users/123 查看一个用户信息
- POST /users 创建一个用户
- PUT /users/123 完全修改用户信息
- PATCH /users/123 部分修改用户信息
- DELETE /users/123 删除用户

## 幂等操作
GET, PUT, PATCH, DELETE应该都要满足幂等操作，也就API使用这些方法执行多次，不会产生任何副作用。

## Hypermedia API 超媒体风格
超媒体风格基于REST设计，其特性是已超媒体的各种资源为本。包括图像、声音、用户资料等各种我们常用的资源。

超媒体风格的特性还包括
HATEOAS(Hypermedia As The Engine Of Application State，超媒体的状态应用引擎)。返回的API中如果有链接到别的资源，要提供完整的URL。例如下一页：

    {
        "paging":{
            "next":"https://api.example.com/v1/users?after=200"
        }
    }

应用超媒体风格的例子有PayPal REST APIs以及Elastic Path(电商平台)Cortex Hypermedia API。

## 提供批量请求方法
一次请求多个API， 并返回多个API的结果。
