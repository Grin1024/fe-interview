/**
 * 去掉字符串中空格的多种方法
 */

// 方法1: 去掉所有空格（包括空格、制表符、换行符等所有空白字符）
function removeAllSpaces(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }
  return str.replace(/\s/g, "");
}

// 方法2: 只去掉普通空格
function removeSpaces(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }
  return str.replace(/ /g, "");
}

// 方法3: 去掉首尾空格（trim）
function removeLeadingTrailingSpaces(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }
  return str.trim();
}

// 方法4: 去掉多余空格，将连续空格替换为单个空格
function removeExtraSpaces(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }
  return str.replace(/\s+/g, " ").trim();
}

// 方法5: 使用split和join方法去掉所有空格
function removeSpacesBySplit(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }
  return str.split(" ").join("");
}

// 方法6: 使用正则表达式去掉指定位置的空格
function removeSpacesByPosition(str, position = "all") {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  switch (position) {
    case "start":
      return str.replace(/^\s+/, "");
    case "end":
      return str.replace(/\s+$/, "");
    case "middle":
      return str.replace(/^(\S*)\s+(.*)$/, "$1$2");
    case "all":
    default:
      return str.replace(/\s/g, "");
  }
}

// 测试函数
function testRemoveSpaces() {
  const testString = "  Hello   World  \n\t  JavaScript  ";

  console.log("原始字符串:", `"${testString}"`);
  console.log("去掉所有空白字符:", `"${removeAllSpaces(testString)}"`);
  console.log("只去掉普通空格:", `"${removeSpaces(testString)}"`);
  console.log("去掉首尾空格:", `"${removeLeadingTrailingSpaces(testString)}"`);
  console.log("去掉多余空格:", `"${removeExtraSpaces(testString)}"`);
  console.log("使用split/join:", `"${removeSpacesBySplit(testString)}"`);
  console.log(
    "去掉开头空格:",
    `"${removeSpacesByPosition(testString, "start")}"`
  );
  console.log(
    "去掉结尾空格:",
    `"${removeSpacesByPosition(testString, "end")}"`
  );
}

// 导出函数（如果在Node.js环境中使用）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    removeAllSpaces,
    removeSpaces,
    removeLeadingTrailingSpaces,
    removeExtraSpaces,
    removeSpacesBySplit,
    removeSpacesByPosition,
    testRemoveSpaces,
  };
}

// 如果直接运行此文件，执行测试
if (typeof window === "undefined") {
  testRemoveSpaces();
}
