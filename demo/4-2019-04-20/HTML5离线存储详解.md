# HTML5 离线存储详解

## 📖 概述

HTML5 离线存储（Application Cache）是 HTML5 提供的一种技术，允许 web 应用程序在没有网络连接的情况下仍能正常运行。它通过缓存文件到本地，使用户在离线状态下也能访问应用程序。

**核心概念：** 通过 manifest 文件定义需要缓存的资源，浏览器会自动下载并存储这些资源，在离线时从缓存中加载。

## 🚀 使用方法

### 1. 在 HTML 标签中声明 manifest

```html
<html manifest="cache.manifest">
  <!-- 页面内容 -->
</html>
```

### 2. 创建 manifest 文件

创建一个名为 `cache.manifest` 的文件：

```manifest
CACHE MANIFEST
# 版本号：v1.0.0

# 需要缓存的文件
CACHE:
index.html
style.css
script.js
images/logo.png

# 不缓存的文件（总是从网络获取）
NETWORK:
api/
login.php
*

# 回退页面（当网络资源不可用时的替代页面）
FALLBACK:
/ offline.html
images/ images/offline.png
```

### 3. 设置正确的 MIME 类型

服务器需要为 manifest 文件设置正确的 MIME 类型：

```apache
# Apache (.htaccess)
AddType text/cache-manifest .manifest

# Nginx
location ~* \.manifest$ {
    add_header Content-Type text/cache-manifest;
}
```

## ⚙️ 工作原理

### 缓存过程

1. **首次访问：** 浏览器解析 HTML，发现 manifest 属性
2. **下载 manifest：** 浏览器下载并解析 manifest 文件
3. **缓存资源：** 根据 manifest 文件下载并缓存所有列出的资源
4. **触发事件：** 缓存完成后触发相应的 JavaScript 事件
5. **离线访问：** 后续访问时，如果离线则从缓存加载资源

### 缓存状态

| 状态        | 值  | 描述                   |
| ----------- | --- | ---------------------- |
| UNCACHED    | 0   | 未缓存状态             |
| IDLE        | 1   | 空闲状态，缓存是最新的 |
| CHECKING    | 2   | 正在检查更新           |
| DOWNLOADING | 3   | 正在下载资源           |
| UPDATEREADY | 4   | 新版本下载完成         |
| OBSOLETE    | 5   | 缓存已过时             |

## 💻 JavaScript API

### 基本用法

```javascript
// 获取应用缓存对象
var appCache = window.applicationCache;

// 检查缓存状态
function checkCacheStatus() {
  var status = appCache.status;
  var statusText = "";

  switch (status) {
    case appCache.UNCACHED:
      statusText = "未缓存";
      break;
    case appCache.IDLE:
      statusText = "空闲状态";
      break;
    case appCache.CHECKING:
      statusText = "检查更新中";
      break;
    case appCache.DOWNLOADING:
      statusText = "下载中";
      break;
    case appCache.UPDATEREADY:
      statusText = "更新就绪";
      break;
    case appCache.OBSOLETE:
      statusText = "缓存过时";
      break;
  }

  return statusText;
}
```

### 事件监听

```javascript
// 监听缓存事件
appCache.addEventListener("cached", function () {
  console.log("资源已缓存");
});

appCache.addEventListener("checking", function () {
  console.log("检查更新中...");
});

appCache.addEventListener("downloading", function () {
  console.log("下载新资源中...");
});

appCache.addEventListener("updateready", function () {
  console.log("新版本就绪");
  if (confirm("发现新版本，是否立即更新？")) {
    appCache.swapCache();
    location.reload();
  }
});

appCache.addEventListener("error", function () {
  console.log("缓存出错");
});
```

### 缓存操作

```javascript
// 手动更新缓存
function updateCache() {
  try {
    appCache.update();
  } catch (e) {
    console.log("更新失败：", e);
  }
}

// 交换缓存
function swapCache() {
  if (appCache.status === appCache.UPDATEREADY) {
    appCache.swapCache();
    console.log("缓存已更新");
  }
}
```

## 📝 manifest 文件详解

### 文件结构

manifest 文件分为三个主要部分：

#### CACHE 部分

列出需要明确缓存的文件：

```manifest
CACHE:
index.html
css/style.css
js/app.js
images/logo.png
```

#### NETWORK 部分

列出不缓存的文件，总是从网络获取：

```manifest
NETWORK:
api/
login.php
logout.php
*  # 通配符，表示其他所有未列出的资源
```

#### FALLBACK 部分

定义离线时的回退页面：

```manifest
FALLBACK:
/ offline.html              # 所有页面的回退
api/ offline-api.json       # API的回退
images/ images/offline.png  # 图片的回退
```

### 完整示例

```manifest
CACHE MANIFEST
# Version 1.0.0 - 2024-01-01

# 明确缓存的文件
CACHE:
index.html
css/style.css
js/app.js
images/logo.png
fonts/custom-font.woff

# 始终从网络获取的资源
NETWORK:
api/
login
logout
*

# 离线时的回退页面
FALLBACK:
/ offline.html
api/ offline-api.json
```

## 🔄 缓存更新机制

### 更新触发条件

1. **manifest 文件内容发生变化**
2. **手动调用 `applicationCache.update()`**
3. **浏览器定期检查（不同浏览器策略不同）**

### 更新过程

```javascript
// 完整的更新处理流程
(function () {
  "use strict";

  var appCache = window.applicationCache;

  if (!appCache) {
    console.log("浏览器不支持Application Cache");
    return;
  }

  // 缓存事件处理
  function handleCacheEvent(e) {
    console.log("缓存事件：", e.type);
    updateUI();
  }

  // 绑定所有缓存事件
  var events = [
    "cached",
    "checking",
    "downloading",
    "error",
    "noupdate",
    "obsolete",
    "progress",
    "updateready",
  ];

  events.forEach(function (event) {
    appCache.addEventListener(event, handleCacheEvent);
  });

  // 处理更新就绪事件
  appCache.addEventListener("updateready", function () {
    if (appCache.status === appCache.UPDATEREADY) {
      if (confirm("应用程序已更新，是否重新加载？")) {
        appCache.swapCache();
        window.location.reload();
      }
    }
  });
})();
```

## ⚠️ 重要注意事项

### 已废弃警告

> **重要：** Application Cache 已在现代浏览器中被废弃，推荐使用 Service Worker 替代。

### 使用限制和注意点

1. **MIME 类型：** manifest 文件必须设置正确的 MIME 类型 `text/cache-manifest`
2. **更新机制：** 更新缓存需要修改 manifest 文件（通常修改版本号注释）
3. **缓存优先：** 缓存的页面即使在线也会从缓存加载，除非缓存更新
4. **文件依赖：** 如果 manifest 文件不存在，整个缓存会被清除
5. **协议一致：** HTTPS 页面的 manifest 文件也必须是 HTTPS
6. **大小限制：** 不同浏览器对缓存大小有不同限制（通常 5-10MB）

### 常见问题

#### 1. 缓存不更新

**原因：** manifest 文件内容未发生变化
**解决：** 修改 manifest 文件中的版本号注释

#### 2. 资源加载失败

**原因：** manifest 文件中列出的资源无法访问
**解决：** 检查资源路径，确保所有资源都可访问

#### 3. 缓存过大

**原因：** 缓存的资源超出浏览器限制
**解决：** 减少缓存资源，只缓存必要文件

## 🔄 现代替代方案

### Service Worker

Service Worker 是 Application Cache 的现代替代方案，提供更强大和灵活的离线功能：

```javascript
// 注册Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then(function (registration) {
      console.log("SW注册成功");
    })
    .catch(function (error) {
      console.log("SW注册失败");
    });
}
```

### Cache API

程序化的缓存管理：

```javascript
// 使用Cache API
caches.open("v1").then(function (cache) {
  return cache.addAll(["/", "/styles/main.css", "/scripts/main.js"]);
});
```

### 其他存储方案

| 技术               | 用途           | 特点             |
| ------------------ | -------------- | ---------------- |
| **localStorage**   | 简单键值对存储 | 持久化，同步 API |
| **sessionStorage** | 会话级存储     | 会话结束后清除   |
| **IndexedDB**      | 复杂数据存储   | 异步，支持事务   |
| **WebSQL**         | SQL 数据库     | 已废弃           |

## 📊 浏览器支持

| 浏览器  | 支持版本 | 状态                 |
| ------- | -------- | -------------------- |
| Chrome  | 4+       | 已废弃（Chrome 70+） |
| Firefox | 3.5+     | 已废弃               |
| Safari  | 4+       | 已废弃               |
| IE      | 10+      | 已废弃               |
| Edge    | 12+      | 已废弃               |

## 🎯 最佳实践

### 1. 合理规划缓存内容

- 只缓存必要的核心资源
- 避免缓存频繁变化的内容
- 考虑缓存大小限制

### 2. 版本管理

```manifest
CACHE MANIFEST
# Version 1.2.3 - 2024-01-01
# 每次更新都要修改版本号
```

### 3. 错误处理

```javascript
appCache.addEventListener("error", function (e) {
  console.error("缓存错误：", e);
  // 提供降级方案
  showOfflineMessage();
});
```

### 4. 用户体验

```javascript
// 提供缓存状态反馈
appCache.addEventListener("downloading", function () {
  showMessage("正在更新应用...");
});

appCache.addEventListener("cached", function () {
  showMessage("应用已可离线使用");
});
```

## 📚 总结

HTML5 离线存储虽然已被废弃，但其核心概念和工作原理对理解现代离线存储技术仍然重要：

1. **声明式缓存：** 通过 manifest 文件声明需要缓存的资源
2. **自动管理：** 浏览器自动处理缓存的下载和更新
3. **事件驱动：** 通过 JavaScript 事件监听缓存状态变化
4. **离线优先：** 优先从缓存加载资源，提供离线体验

现代开发中，推荐使用 Service Worker 等新技术来实现更强大的离线功能。但了解 Application Cache 的工作原理，有助于更好地理解和使用这些新技术。

---

_注：本文档基于 HTML5 Application Cache 规范编写，该技术已被现代浏览器废弃，仅供学习参考。_
