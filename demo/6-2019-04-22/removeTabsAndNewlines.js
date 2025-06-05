/**
 * 去除制表符和换行符的工具方法
 * 提供多种实现方式供不同场景使用
 */

/**
 * 方法1: 使用正则表达式去除制表符和换行符
 * @param {string} str - 输入字符串
 * @returns {string} - 处理后的字符串
 */
function removeTabsAndNewlines(str) {
  if (typeof str !== "string") {
    throw new Error("输入必须是字符串类型");
  }

  // 去除制表符(\t)、换行符(\n)、回车符(\r)
  return str.replace(/[\t\n\r]/g, "");
}

/**
 * 方法2: 去除制表符和换行符，并用空格替换
 * @param {string} str - 输入字符串
 * @param {string} replacement - 替换字符，默认为空格
 * @returns {string} - 处理后的字符串
 */
function removeTabsAndNewlinesWithReplacement(str, replacement = " ") {
  if (typeof str !== "string") {
    throw new Error("输入必须是字符串类型");
  }

  return str.replace(/[\t\n\r]/g, replacement);
}

/**
 * 方法3: 去除所有空白字符（包括制表符、换行符、空格等）
 * @param {string} str - 输入字符串
 * @returns {string} - 处理后的字符串
 */
function removeAllWhitespace(str) {
  if (typeof str !== "string") {
    throw new Error("输入必须是字符串类型");
  }

  // \s 匹配所有空白字符
  return str.replace(/\s/g, "");
}

/**
 * 方法4: 去除制表符和换行符，保留普通空格
 * @param {string} str - 输入字符串
 * @returns {string} - 处理后的字符串
 */
function removeTabsAndNewlinesKeepSpaces(str) {
  if (typeof str !== "string") {
    throw new Error("输入必须是字符串类型");
  }

  // 只去除制表符和换行符，保留空格
  return str.replace(/[\t\n\r]/g, "");
}

/**
 * 方法5: 去除制表符和换行符，并压缩多个连续空格为单个空格
 * @param {string} str - 输入字符串
 * @returns {string} - 处理后的字符串
 */
function removeTabsNewlinesAndCompressSpaces(str) {
  if (typeof str !== "string") {
    throw new Error("输入必须是字符串类型");
  }

  return str
    .replace(/[\t\n\r]/g, " ") // 将制表符和换行符替换为空格
    .replace(/\s+/g, " ") // 将多个连续空格压缩为单个空格
    .trim(); // 去除首尾空格
}

/**
 * 方法6: 使用split和join的方式
 * @param {string} str - 输入字符串
 * @returns {string} - 处理后的字符串
 */
function removeTabsAndNewlinesBySplit(str) {
  if (typeof str !== "string") {
    throw new Error("输入必须是字符串类型");
  }

  return str
    .split("\t")
    .join("") // 去除制表符
    .split("\n")
    .join("") // 去除换行符
    .split("\r")
    .join(""); // 去除回车符
}

// 使用示例和测试
function testMethods() {
  const testString = "这是一个\t包含制表符\n和换行符\r的测试字符串\t\n\r";

  console.log("原始字符串:", JSON.stringify(testString));
  console.log("方法1结果:", JSON.stringify(removeTabsAndNewlines(testString)));
  console.log(
    "方法2结果:",
    JSON.stringify(removeTabsAndNewlinesWithReplacement(testString))
  );
  console.log("方法3结果:", JSON.stringify(removeAllWhitespace(testString)));
  console.log(
    "方法4结果:",
    JSON.stringify(removeTabsAndNewlinesKeepSpaces(testString))
  );
  console.log(
    "方法5结果:",
    JSON.stringify(removeTabsNewlinesAndCompressSpaces(testString))
  );
  console.log(
    "方法6结果:",
    JSON.stringify(removeTabsAndNewlinesBySplit(testString))
  );
}

// 导出方法（Node.js环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    removeTabsAndNewlines,
    removeTabsAndNewlinesWithReplacement,
    removeAllWhitespace,
    removeTabsAndNewlinesKeepSpaces,
    removeTabsNewlinesAndCompressSpaces,
    removeTabsAndNewlinesBySplit,
    testMethods,
  };
}

// 浏览器环境下的全局导出
if (typeof window !== "undefined") {
  window.StringUtils = {
    removeTabsAndNewlines,
    removeTabsAndNewlinesWithReplacement,
    removeAllWhitespace,
    removeTabsAndNewlinesKeepSpaces,
    removeTabsNewlinesAndCompressSpaces,
    removeTabsAndNewlinesBySplit,
    testMethods,
  };
}
