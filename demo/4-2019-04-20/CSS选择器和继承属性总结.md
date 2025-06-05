# CSS 选择器和继承属性总结

## CSS 选择器类型

### 1. 基础选择器

- **元素选择器**: `p`, `div`, `h1` 等
- **类选择器**: `.class-name`
- **ID 选择器**: `#id-name`
- **通用选择器**: `*`

### 2. 属性选择器

- `[attribute]` - 具有指定属性
- `[attribute="value"]` - 属性值完全匹配
- `[attribute~="value"]` - 属性值包含指定词
- `[attribute|="value"]` - 属性值以指定值开头（后跟连字符）
- `[attribute^="value"]` - 属性值以指定值开头
- `[attribute$="value"]` - 属性值以指定值结尾
- `[attribute*="value"]` - 属性值包含指定值

### 3. 伪类选择器

- **状态伪类**: `:hover`, `:active`, `:focus`, `:visited`
- **结构伪类**: `:first-child`, `:last-child`, `:nth-child(n)`, `:nth-of-type(n)`
- **表单伪类**: `:checked`, `:disabled`, `:enabled`
- **其他**: `:not()`, `:root`, `:empty`

### 4. 伪元素选择器

- `::before` - 在元素内容前插入内容
- `::after` - 在元素内容后插入内容
- `::first-line` - 选择第一行
- `::first-letter` - 选择第一个字母
- `::selection` - 选择被用户选中的部分

### 5. 组合选择器

- **后代选择器**: `div p` (空格)
- **子选择器**: `div > p`
- **相邻兄弟选择器**: `h1 + p`
- **通用兄弟选择器**: `h1 ~ p`

### 6. 分组选择器

- `h1, h2, h3` - 同时选择多个元素

## CSS 可继承属性

### 1. 文本相关属性

- `color` - 文字颜色
- `font-family` - 字体族
- `font-size` - 字体大小
- `font-style` - 字体样式（斜体等）
- `font-weight` - 字体粗细
- `font-variant` - 字体变体
- `font` - 字体简写属性
- `text-align` - 文本对齐
- `text-indent` - 文本缩进
- `text-transform` - 文本转换
- `line-height` - 行高
- `letter-spacing` - 字母间距
- `word-spacing` - 单词间距

### 2. 列表相关属性

- `list-style` - 列表样式
- `list-style-type` - 列表标记类型
- `list-style-position` - 列表标记位置
- `list-style-image` - 列表标记图像

### 3. 表格相关属性

- `border-collapse` - 边框合并
- `border-spacing` - 边框间距
- `caption-side` - 表格标题位置
- `empty-cells` - 空单元格显示

### 4. 其他可继承属性

- `visibility` - 可见性
- `cursor` - 鼠标指针样式
- `direction` - 文本方向
- `quotes` - 引号样式

## 不可继承的属性

大部分布局和盒模型相关的属性都不可继承：

- `width`, `height` - 宽高
- `margin`, `padding` - 外边距、内边距
- `border` - 边框
- `background` - 背景
- `position` - 定位
- `display` - 显示类型
- `float` - 浮动
- `clear` - 清除浮动

## 强制继承

可以使用 `inherit` 关键字强制继承父元素的属性值：

```css
.child {
  border: inherit; /* 继承父元素的边框样式 */
}
```

## 选择器优先级

选择器的优先级从高到低：

1. **内联样式** (1000)
2. **ID 选择器** (100)
3. **类选择器、属性选择器、伪类** (10)
4. **元素选择器、伪元素** (1)
5. **通用选择器** (0)

`!important` 可以提升优先级，但应谨慎使用。

## 示例代码

### 选择器示例

```css
/* 基础选择器 */
p {
  color: blue;
}
.highlight {
  background: yellow;
}
#header {
  font-size: 24px;
}

/* 属性选择器 */
input[type="text"] {
  border: 1px solid #ccc;
}
a[href^="https"] {
  color: green;
}

/* 伪类选择器 */
a:hover {
  text-decoration: underline;
}
li:nth-child(odd) {
  background: #f0f0f0;
}

/* 组合选择器 */
nav > ul {
  list-style: none;
}
h1 + p {
  margin-top: 0;
}
```

### 继承示例

```css
/* 父元素设置可继承属性 */
.parent {
  color: red;
  font-family: Arial, sans-serif;
  font-size: 16px;
}

/* 子元素自动继承 */
.parent p {
  /* 自动继承 color, font-family, font-size */
}

/* 强制继承不可继承的属性 */
.child {
  border: inherit;
}
```

## 重要提示

1. **继承的本质**: 继承是为了减少重复代码，让子元素自动获得父元素的某些样式
2. **优先级计算**: 当多个选择器作用于同一元素时，按优先级规则应用样式
3. **性能考虑**: 复杂的选择器会影响 CSS 解析性能，应适度使用
4. **最佳实践**: 合理利用继承机制，避免过度使用 `!important`

---

_本文档总结了 CSS 选择器的各种类型和 CSS 属性的继承机制，是前端开发的基础知识点。_
