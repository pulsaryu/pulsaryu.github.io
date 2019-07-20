---
layout: post
title: Laravel facade 是如何设计的
category:  develop
tags: [Laravel, Facade]
---
Laravel的Facades提供了以“静态”的方式调用大多数服务，如Request，Cache，Session，DB等，能够把需要调用代码缩短很多。
使用的方式很简单：

```php
Cache::get('key');
Session:::get('key');
```

那这是怎么实现的呢？

首先你的程序中需要已经注册了相应的服务，比如Cache，DB，Session，Cookie，Log，Queue等服务。
后面会直接调用这些已经注册好的服务。
