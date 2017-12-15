---
layout: post
title: "修改 git 提交的姓名和邮箱地址"
subtitle: ""
date: 2017-12-15
category: git
tags: ssh git
finished: true
---

通常有两种情况：

## 全局修改

```
git config --global user.name 你的名字
git config --global user.email 你的邮箱
```

## 仅限当前项目

方法很简单，不指定 --global 参数即可

```
git config user.name 你的名字
git config user.email 你的邮箱
```

当然，也可以直接修改 .git/config 文件，增加或修改相应设置即可

```
[user]
name = 你的名字
email = 你的邮箱地址
```