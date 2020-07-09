---
layout: post
title: Android内存泄漏问题
category: Android
tags: [Android, Memory]
---

内存泄漏是引起Android应用崩溃常见的原因，每个Android开发人员都应该明白怎么避免发送。
常用的分析内存的工具有 **Android Profiler** 和 **LeakCanary**。

##  **Android Profiler** 和 **LeakCanary**。

**Android Profiler** 是Android Studio提供的一个工具，用于实时观察应用的情况，包括：内存、CPU、网络等。

**LeakCanary** 是一个第三方库，用于分析内存泄漏。官方地址：https://square.github.io/leakcanary/

## 什么是内存泄漏

是什么导致了内存泄漏呢？当你的代码为一个对象分配了内存，但是却没有释放，就会造成内存泄漏，当然没有释放的原因有很多种。

不管是什么原因，没有释放，是因为这个对象依然被别的对象引用，但是这些被引用的对象应该是要被销毁的。

Android 为每个应用限制的最大内存使用量，当使用的内存超过最大值以后就会引发OOM，是程序奔溃，所以我们要严格限制内存的使用。

## 为什么我们需要关注内存

系统回收内存的时候，你的程序会暂停，但通常这个过程是非常短暂的，一般用户感知不到。

但是有的时候你注意到你的程序变的缓慢和掉针，这是因为回收内存已经赶不上分配内存的速度了。

当内存泄漏发生的时候，内存会不断的增加，导致不断的触发gc，进而导致程序卡顿，甚至系统会强制杀死你的程序已便回收内存。

基于这些原因，我们必须的关注内存。

## 简单介绍下java内存模型

Java内存模型分为Jvm内存模型和Jmm内存模型。Jvm是java虚拟机内存模型，而Jmm内存模型是只为java程序服务。我们通常讨论的Java内存模型，更多的是在讨论Jvm。

Jvm内存模型中按照线程是否独占，可以分为两部分。线程独占内存区有栈，本地方法栈和程序计数器，所有线程共享的有堆和方法区。

- **栈** 也被称为Java虚拟机栈，它的生命周期与线程相同。每个方法在执行的同时都会创建一个栈帧(Stack Frame)用于存储局部变量、操作数栈、动态链接、方法出口等信息。每个方法从开始调用到执行完成对应入栈和出栈的过程。这个区域有两种异常情况：1，如果请求的深度大于虚拟机允许的深度，抛出StackOverflowError异常。2，如果扩展时无法申请到足够的内存，会抛出OutOfMemoryError异常。
- **本地方法栈** 和虚拟机栈类似，不过不是执行Java方法，而是执行本地方法。同Java虚拟机栈一样会抛出StackOverflowError和OutOfMemoryError异常。
- **程序计数器** 是一块较小的内存空间，用来保存当前程序执行的字节码位置。此内存是Java虚拟机中唯一快没有指定OutOfMemoryError的区域。只为执行Java方法服务。
- **堆** 是Java中最大的一块内存，主要用于保存对象实例，几乎所有的线程对象实例都在这里分配内存。这也是垃圾回收器最主要的管理区域。内存不足时将会抛出OutOfMemoryError异常。
- **方法区** 用于存储类信息、常量、静态变量，即时编译器编译后的代码等数据。也叫非堆区。

## Android 的内存有哪些

我们可以使用Android Sudio的 Memory Profiler 中查看App的内存情况。

内存计数中的类别如下：

- **Java**：从 Java 或 Kotlin 代码分配的对象的内存。

- **Native**：从 C 或 C++ 代码分配的对象的内存。
  即使您的应用中不使用 C++，您也可能会看到此处使用的一些原生内存，因为 Android 框架使用原生内存代表您处理各种任务，如处理图像资源和其他图形时，即使您编写的代码采用 Java 或 Kotlin 语言。

- **Graphics**：图形缓冲区队列向屏幕显示像素（包括 GL 表面、GL 纹理等等）所使用的内存。（请注意，这是与 CPU 共享的内存，不是 GPU 专用内存。）

- **Stack**：您的应用中的原生堆栈和 Java 堆栈使用的内存。这通常与您的应用运行多少线程有关。

- **Code**：您的应用用于处理代码和资源（如 dex 字节码、经过优化或编译的 dex 代码、.so 库和字体）的内存。

- **Others**：您的应用使用的系统不确定如何分类的内存。

- **Allocated**：您的应用分配的 Java/Kotlin 对象数。此数字没有计入 C 或 C++ 中分配的对象。



  如果连接到搭载 Android 7.1 及更低版本的设备，只有在 Memory Profiler 连接到您运行的应用时，才开始此分配计数。因此，您开始分析之前分配的任何对象都不会被计入。不过，Android 8.0 及更高版本附带一个设备内置分析工具，该工具可跟踪所有分配，因此，在 Android 8.0 及更高版本上，此数字始终表示您的应用中待处理的 Java 对象总数。

## Android中常见的内存泄漏
Android 中常见的内存泄漏来自Activity，Service，View等组件的不当使用。比如当一个Activity在被销毁后，还被别的对象持有的情况下，gc就没法回收这个activity，导致内存泄漏。
我们来看一个内存泄漏的例子：

```java
class MemoryLeakDemoActivity : AppCompatActivity() {

    companion object {
        private var activities: MutableList<Activity>? = mutableListOf()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_memory_leak_demo)

        // 这会造成内存泄漏
        activities?.add(this)
    }
}
```

这段代码中，在onCreate方法我们把当前activity对象加入到单例列表中，这样当这个activity被销毁后，却不能被gc回收，因为其对象还在被引用，这就造成了内存的泄漏。

## 总结

Android 对内存的要求的比较严格，每个应用程序能够使用的内存都是有限的，不合理的使用内存会造成程序卡顿，甚至崩溃，所以每一个开发者都应该要关注内存的使用情况。

## 参考

https://www.raywenderlich.com/4690472-memory-leaks-in-android

https://www.raywenderlich.com/4557771-android-memory-profiler-getting-started

https://developer.android.com/studio/profile/memory-profiler?hl=zh-cn
