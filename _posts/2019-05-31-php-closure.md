---
layout: post
title: PHP Cloure
category: PHP
tags: [PHP]
---

## 初识Cloure

Cloure是啥？Cloure表示匿名类，也代表了闭包。

Cloure代表了匿名方法，如下例子，一个匿名方法可以直接用`instanceof`判定是不是`Closure`：

```php
$fun = function(){
};

if ($fun instanceof Closure) {
    echo 'fun is closure';
}
```

以上会输出
```
fun is closure
```

所以我们也就可以用`Closure`来限定匿名类的参数，如：
```php
run(Closure $call)
```

## 闭包
闭包有两个重要概念：作用域与传递性。先看作用域，我们可以闭包里面方法一个的私有方法。

先看作用域，下面的这个例子，展示如何在类的外部访问类的私有方法，突破作用域限制。
先定义一个类A：

```php
class A {
    public function aaa() {
        echo 'this is aaa';
    }

    private function bbb() {
        echo 'this is bbb';
    }
}
```

定义闭包函数：
```php
$fun = function(){
    $this->bbb(); //访问私有方法，突破作用域
};

$a = new A;

//第二个参数传入类名，才可以访问的私有方法，否则按照默认作用域。
$funx = $fun->bindTo($a, 'A'); 

$funx();
```

以上输出：
```
this is bbb
```



传递性是指把上面例子中的`$fun当成参数传递，接收的地方不需要了解`fun`函数具体实现逻辑，起到很好的程序解耦作用。