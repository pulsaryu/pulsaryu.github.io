---
layout: post
title: 算法动态规划
category: 算法
tag: [算法, 动态规划]
---
动态规划就是将本来是递归算法解决的问题，改写为非递归的方式，把计算过程中产生的子问题答案记录在一个表内。利用这种方法的一种技巧就交做**动态规划**。

<!--more-->

我们已计算斐波那契数列为例，我们可以很容易想到使用递归方式实现，实现的代码如下：

```java
static int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
```

这种方式是非常低效的，计算增长的速度是指数级的。

采用动态规划的方案计算，时间负载度是O(N)，下面是代码：

```java
public static int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    int lasta = 0, lastb = 1; //记录上一次运行的结果
    for (int i = 2; i < n; i++) {
        int tmp = lastb;
        lastb = lasta + lastb;
        lasta = tmp;
    }
    return lasta + lastb;
}
```

这里判断一个递归算法的是否能用动态规划的方法实现的重点是，递归算法是否做了重复的工作。
我们在是使用递归方法计算斐波那契数的时候，由于n-1递归的对n-2和n-3进行调用，导致n-3被重复调用3次。
