---
layout: post
title: Android 慎用Handler
category: Android
tags: [Android, Handler]
---

Handler 做为 Android 常用组件之一，几乎每个应用程序都会使用。Handler 主要有两个作用，一是当我们需要按照顺序执行多个程序时，二是当我们在非主线程中更新UI的时候。

<!--more-->

当我们需要通过 Handler 执行一段代码时，可以使用 `post(Runnable)`, `postAtTime(java.lang.Runnable, long)`, `postDelayed(Runnable, Object, long)`  加入一个`Runnable`， 或者是使用`sendEmptyMessage(int)`, `sendMessage(Message)`, `sendMessageAtTime(Message, long)`,  `sendMessageDelayed(Message, long)` 发送`Message` 。但它们最终都会加入一个 `MessageQueue` 中，然后由 `MessageQueue` 所在的线程执行。

`Handler` 之所以能工作，是因为有 `Looper` ， 一个线程最多只能有一个 `Looper`, 也可以没有。在创建 `Handler` 的时候，可以指定 `Looper`,  也可以不指定，如果不指定则默认使用当前线程的 `Looper`, 当然前提是当前线程有`Looper`, 如果没有，则创建`Handler` 会抛出异常，而主线程默认是有 `Looper` 的。

需要注意的是，加入 Handler 的任务不会立即执行，如果 Hander 中 Looper 所在线程当前正忙，则可能要等到这个线程不忙的时候才会执行通过 Handler 加入的任务。有些开发人员在开发的时候，会把所有需要主线程执行的任务都通过Handler加入，即使当前已经是在主线程中了，是的，就是在主线中通过Handler加入一个需要在主线程中执行的任务，而又期望能加入的任务能立即执行，但恐期望会落空。因为正如上面所说，加入Handler的任务可能并不会立即执行，这要取决于当地主线程是否在忙。大多数情况下，主线程是比较空闲的，通常我们只在更新UI的时候才会用到主线程，但是在一些较为复杂的项目中，就连开发者自己也不清楚主线程在干什么，他们只有在发现系统卡顿的时候才会去关心主线程。

为了避免上面这种情况，其实也很简单，我们只要判断当前线程是否主线程，如果是就立即执行，否则才加入Handler。

在主线程中运行的例子：
```java
private void runOnMainThread(Runnable runnable) {
    if (Looper.myLooper() == Looper.getMainLooper()) {
        runnable.run();
    } else {
        mHandler.post(runnable);
    }
}
```



Android 程序常常要处理UI，如果本应该立即更新的UI，却延迟了几十甚至上百毫秒，势必造成用户体验下降。所以在开发的时候要特别注意，尽量不要在UI线程处理后台任务，而在UI线程中的任务要尽量及时处理，特别是要避免已经在UI线程中了，还通过Handler执行任务。
