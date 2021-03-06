---
layout: post
title: Java 切比雪夫距离
category: Develop
tags: [算法]
---

在数学中，切比雪夫距离是向量空间种的一种度量，定义了二点之间的距离是其各个坐标数值差绝对值的最大值。

<!--more-->

对于平面上的两个点 `x = (x0, x1)` 和 `y = (y0, y1)`，设它们的横坐标距离只差为 `dx = |x0 - y0|`，纵坐标距离只差为 `dy = |x1 - y1|`，对于以下三种情况，我们可以分别计算出从 `x` 移到 `y` 的最少次数：

- 当横坐标距离之差小于纵坐标距离之差，即 `dx < dy`， 则移动的最大距离是`dy`。 移动路径为先沿对角线移动`dx`次，再沿竖直方向移动`dy - dx`次，总计  `dx + (dy - dx) = dy ` 次。
- 当横坐标距离之差等于纵坐标距离之差，即 `dx == dy`，移动的最大距离是 `dx`。
- 当横坐标距离之差大于纵坐标距离之差，即 `dx > dy`，则移动的最大距离是 `dx`。移动路径为先沿着对角线移动`dy`次，然后再沿着横坐标移动 `dx - dy` 次，总计 `dy + (dx - dy) = dx` 次。

所以从 `x` 点移到 `y` 点的最大移动距离是 `dx` 和 `dy` 中的较大值。这个距离就被称作是切比雪夫距离。



以下是一个例子：

x 点的坐标为(1, 1)，y 点的坐标为(4, 2)，那么 x 点和 y 点的距离之差就如图所示（黄色线的长度）。

![](/static/images/image-20200226152645080.webp)



## 一道算法题

平面上有 n 个点，点的位置用整数坐标表示 points[i] = [xi, yi]。请你计算访问所有这些点需要的最小时间（以秒为单位）。

你可以按照下面的规则在平面上移动：

每一秒沿水平或者竖直方向移动一个单位长度，或者跨过对角线（可以看作在一秒内向水平和竖直方向各移动一个单位长度）。
必须按照数组中出现的顺序来访问这些点。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/minimum-time-visiting-all-points
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



示例1：

```
输入：points = [[1,1],[3,4],[-1,0]]
输出：7
解释：一条最佳的访问路径是： [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]   
从 [1,1] 到 [3,4] 需要 3 秒 
从 [3,4] 到 [-1,0] 需要 4 秒
一共需要 7 秒
```



示例2：

```
输入：points = [[3,2],[-2,2]]
输出：5
```



题简答案：

```python
def minTimeToVisitAllPoints(self, points: List[List[int]]) -> int:
    d = 0
    cp = None
    for point in points:
        if cp is None:
            cp = point
        else:
            dx = abs(cp[0] - point[0])
            dy = abs(cp[1] - point[1])
            d += max(dx, dy)
            cp = point
    return d
```


