---
layout: post
title: "systemctl 设置依赖服务"
subtitle: ""
date: 2019-09-23
category: linux
tags: linux systemctl
finished: true
---

如果 B 服务依赖 A 服务，可以通过在 `B.service` 中设置 Requires 配置，让系统自动启动依赖服务

## A.service

```
[Unit]
Description=A
After=network.target

[Service]
Type=simple
ExecStart=/your/app/path

[Install]
WantedBy=multi-user.target
```

## B.service

```
[Unit]
Description=A
After=network.target
Requires=A.service

[Service]
Type=simple
ExecStart=/your/app/path

[Install]
WantedBy=multi-user.target
```