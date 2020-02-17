---
layout: post
title: Java 日期和时间相关类和方法
category: Develop
tags: [Java]
---

不管是那种编程语言，日期时间的处理都是很重要的。

<!--more-->

## java.util.Date
精度达到微秒，但很多方法已经废弃使用了。
```java
Date date = new Date();
long time = date.getTime();
```

## java.util.Calendar
Calendar 是一个抽象类，提供了日期时间的计算。
```java
Calendar rightNow = Calendar.getInstance();
```



例子，日期加一天：

```JAVA
Calendar calendar = Calendar.getInstance();
calendar.add(Calendar.DAY_OF_MONTH, 1);
int day = calendar.get(Calendar.DAY_OF_MONTH); // 返回明天日期数
```



例子，返回下周的今天日期数:

```java
Calendar calendar = Calendar.getInstance();
// 周数加1
calendar.add(Calendar.WEEK_OF_YEAR, 1);
// 返回下周的今天日期数
int day = calendar.get(Calendar.DAY_OF_MONTH);
```



例子，指定日期:

```java
// 明天上午10点整
calendar.set(Calendar.HOUR_OF_DAY, 10);
calendar.set(Calendar.MINUTE, 0);
calendar.set(Calendar.SECOND, 0);
calendar.set(Calendar.MILLISECOND, 0);
calendar.add(Calendar.DAY_OF_MONTH, 1);
```



Calendar是与时区有关系的，获取时区的方法如下：

```java
calendar.getTimeZone().getDisplayName();
```

以上输出：中国标准时间



## java.time.LocalDateTime

`LocalDateTime`是一个与时区没有关系的日期系统，可以获取到除了时区以外其他所有的日期参数。

`LocalDateTime` 对象是不可变的，也就是不能修改一个`LocalDateTime`对象年月日等数值。

`LocalDateTime` 可以用来表示生日等不需要时区的日期。



例子，获取当前时间

```java
LocalDateTime now = LocalDateTime.now();
```



## java.time.LocalDate, java.time.LocalTime
`LocalDate`和`LocalTime` 与 `LocalDateTime`特性一样，只是单独出分别来表示日期和时间。`LocalDate`只表示日期，而`LocalTime`只表示时间。





## 总结

如果是要进行日期计算，比如增加天数，则使用Calendar， 如果只是想表示日期时间，与时区没有关系，可以使用LocalDateTime、LocalDate、LocalTime。
