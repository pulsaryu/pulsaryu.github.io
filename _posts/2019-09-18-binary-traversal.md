---
layout: post
title: 二叉树遍历
category: 算法
tags: [算法, 二叉树]
---

二叉树（binary tree）是一颗这样的树，它的每个节点都不能超过两个儿子。
# 二叉树遍历

二叉树遍历分类深度优先遍历DFS和广度优先遍历BFS，而深度优先遍历又分为前序遍历、中序遍历后后续遍历。

<!--more-->

## 深度优先遍历DFS

深度优先遍历的遍历方式是，先遍历左子树，然后回到上一个节点，继续遍历右子树。

如下图，剪头表示了前序遍历的顺序：

<img src="/images/binary-tree-dfs.webp" alt="深度优先遍历" style="zoom:50%;" />

遍历输出结果为：1245367

DFS算法可以使用栈的方式实现，实现方法如下：

```java
Stack<TreeNode> stack = new Stack<>();
stack.push(root);

while (!stack.empty()) {
    TreeNode node = stack.pop();
    System.out.print(node.val);

    if (node.right != null) stack.push(node.right);
    if (node.left != null) stack.push(node.left);
}
```

以上实现的前序遍历

### 中序遍历实现

中序遍历相对前序遍历如果使用非递归方式实现，会稍微有些复杂。主要区别点在于合适开始弹出队列，要在左子树为空的时候，开始弹出队列。

以下是中序遍历非递归实现代码：

```java
/**
 * 二叉树中序遍历
 * @param root
 */
private List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> out = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    if (root != null) stack.push(root);

    /**
     * 表示是否处于出栈过程
     */
    boolean isPop = false;

    while (!stack.isEmpty()) {

        if (isPop) {
            TreeNode node = stack.pop();
            out.add(node.val);
            if (node.right != null) {
                stack.push(node.right);
                isPop = false;
            }
            continue;
        }

        TreeNode node = stack.peek();
        if (node.left != null) {
            stack.push(node.left);
        } else {
            isPop = true;
        }
    }

    return out;
}
```



### 后序遍历实现

后续遍历的规则是，先遍历左子树，然后遍历右子树，最后遍历节点。

```java
/**
 *  二叉树后序遍历实现
 * @param root
 * @return
 */
private List<Integer> postorderTraversal(TreeNode root) {
    LinkedList<Integer> out = new LinkedList<>();

    Stack<TreeNode> stack = new Stack<>();

    if (root != null) stack.add(root);

    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        out.addFirst(node.val);

        if (node.left != null) {
            stack.add(node.left);
        }

        if (node.right != null) {
            stack.add(node.right);
        }
    }

    return out;
}
```





## 广度优先遍历BFS

先对上层节点进行遍历，然后再对下层节点遍历。如下图，剪头表示遍历的方向：

<img src="/images/binary-tree-bfs.webp" alt="广度优先遍历" style="zoom:50%;" />

遍历输出的结果为：1234567

BFS算法我们可以使用队列的方式实现，算法如下：

```java
Queue<TreeNode> queue = new LinkedList<>();
queue.add(treeNode);
while (!queue.isEmpty()) {
    TreeNode node = queue.poll();
    System.out.print(node.val);

    if (node.left != null) queue.add(node.left);
    if (node.right != null) queue.add(node.right);
}
```



## 为什么要使用非递归实现

在树的遍历算法中，递归是很容易想到的一种方法，然而使用栈等非递归的方案是一种更加高级，也更加复杂的一种算法，如果能在树的算法中掌握使用非递归算法，将会对我们算法能力有很大帮助。