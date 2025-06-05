# CSS3 新增伪类总结

## 概述

CSS3 引入了许多新的伪类选择器，这些伪类大大增强了 CSS 的选择能力，使开发者能够更精确地选择和样式化 HTML 元素。

## 结构性伪类

### :nth-child(n)

- **描述**: 选择父元素的第 n 个子元素
- **用法**: `:nth-child(2n)` 选择偶数位置的子元素，`:nth-child(odd)` 选择奇数位置的子元素
- **示例**: `li:nth-child(3)` 选择第 3 个 li 元素

### :nth-last-child(n)

- **描述**: 从后往前数，选择父元素的第 n 个子元素
- **用法**: `:nth-last-child(2)` 选择倒数第 2 个子元素

### :nth-of-type(n)

- **描述**: 选择同类型元素中的第 n 个
- **用法**: `p:nth-of-type(2)` 选择第 2 个 p 元素

### :nth-last-of-type(n)

- **描述**: 从后往前数，选择同类型元素中的第 n 个
- **用法**: `div:nth-last-of-type(1)` 选择最后一个 div 元素

### :first-of-type

- **描述**: 选择同类型元素中的第一个
- **用法**: `h1:first-of-type` 选择第一个 h1 元素

### :last-of-type

- **描述**: 选择同类型元素中的最后一个
- **用法**: `p:last-of-type` 选择最后一个 p 元素

### :only-child

- **描述**: 选择父元素中唯一的子元素
- **用法**: `div:only-child` 选择作为唯一子元素的 div

### :only-of-type

- **描述**: 选择同类型中唯一的元素
- **用法**: `img:only-of-type` 选择同类型中唯一的 img 元素

### :empty

- **描述**: 选择没有任何内容的元素（包括文本节点）
- **用法**: `div:empty` 选择空的 div 元素

## 状态伪类

### :target

- **描述**: 选择当前活动的目标元素（URL 片段标识符指向的元素）
- **用法**: `:target` 选择被锚点链接指向的元素

### :enabled

- **描述**: 选择启用状态的表单元素
- **用法**: `input:enabled` 选择可用的 input 元素

### :disabled

- **描述**: 选择禁用状态的表单元素
- **用法**: `input:disabled` 选择被禁用的 input 元素

### :checked

- **描述**: 选择被选中的表单元素（checkbox、radio）
- **用法**: `input:checked` 选择被选中的复选框或单选按钮

### :indeterminate

- **描述**: 选择处于不确定状态的表单元素
- **用法**: `input:indeterminate` 选择不确定状态的 checkbox

### :valid

- **描述**: 选择验证通过的表单元素
- **用法**: `input:valid` 选择内容有效的 input 元素

### :invalid

- **描述**: 选择验证失败的表单元素
- **用法**: `input:invalid` 选择内容无效的 input 元素

### :required

- **描述**: 选择必填的表单元素
- **用法**: `input:required` 选择带有 required 属性的 input 元素

### :optional

- **描述**: 选择可选的表单元素
- **用法**: `input:optional` 选择没有 required 属性的 input 元素

### :in-range

- **描述**: 选择值在指定范围内的 input 元素
- **用法**: `input:in-range` 选择值在 min 和 max 范围内的 input

### :out-of-range

- **描述**: 选择值超出指定范围的 input 元素
- **用法**: `input:out-of-range` 选择值超出 min 和 max 范围的 input

### :read-only

- **描述**: 选择只读的表单元素
- **用法**: `input:read-only` 选择只读的 input 元素

### :read-write

- **描述**: 选择可读写的表单元素
- **用法**: `input:read-write` 选择可编辑的 input 元素

## 否定伪类

### :not(selector)

- **描述**: 选择不匹配指定选择器的元素
- **用法**: `p:not(.highlight)` 选择没有 highlight 类的 p 元素

## 语言伪类

### :lang(language)

- **描述**: 选择指定语言的元素
- **用法**: `:lang(en)` 选择英语内容的元素

## 根元素伪类

### :root

- **描述**: 选择文档的根元素（通常是 html 元素）
- **用法**: `:root` 常用于定义 CSS 变量

## 实际应用示例

```css
/* 表格斑马纹效果 */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* 表单验证样式 */
input:valid {
  border-color: green;
}

input:invalid {
  border-color: red;
}

/* 响应式导航 */
.nav-item:not(:last-child) {
  margin-right: 20px;
}

/* 目标元素高亮 */
:target {
  background-color: yellow;
  animation: highlight 2s ease-in-out;
}
```

## 总结

CSS3 新增的伪类选择器极大地增强了 CSS 的选择能力，使得开发者能够：

1. **更精确的元素选择**: 通过结构性伪类可以精确选择特定位置的元素
2. **动态状态处理**: 状态伪类能够响应用户交互和表单状态变化
3. **减少 JavaScript 依赖**: 许多以前需要 JavaScript 实现的功能现在可以纯 CSS 完成
4. **提升用户体验**: 通过伪类可以提供更好的视觉反馈和交互效果

这些伪类的引入使 CSS 变得更加强大和灵活，是现代 Web 开发中不可或缺的工具。
