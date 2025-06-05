/**
 * 字符串大小写切换方法总结
 *
 * 问题：写一个把字符串大小写切换的方法
 * 来源：前端面试每日3+1 第5天 (2019-04-21)
 * 链接：https://github.com/haizlin/fe-interview/issues/15
 */

function toggleCase0(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }
  let result = "";
  for (let i = 0; i < str.length; i++) {
    result +=
      str[i] === str[i].toUpperCase()
        ? str[i].toLowerCase()
        : str[i].toUpperCase();
  }
  return result;
}

/**
 * 方法一：使用字符编码判断 (推荐)
 * 原理：通过字符的ASCII码值判断大小写，然后进行转换
 * 优点：性能好，逻辑清晰
 *
 * @param {string} str - 需要转换的字符串
 * @returns {string} 转换后的字符串
 */
function toggleCase1(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  let result = "";
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charCode = char.charCodeAt(0);

    // 判断是否为大写字母 (A-Z: 65-90)
    if (charCode >= 65 && charCode <= 90) {
      result += char.toLowerCase();
    }
    // 判断是否为小写字母 (a-z: 97-122)
    else if (charCode >= 97 && charCode <= 122) {
      result += char.toUpperCase();
    }
    // 其他字符保持不变
    else {
      result += char;
    }
  }
  return result;
}

/**
 * 方法二：使用正则表达式
 * 原理：通过正则匹配大小写字母，然后使用回调函数进行转换
 * 优点：代码简洁，易读
 *
 * @param {string} str - 需要转换的字符串
 * @returns {string} 转换后的字符串
 */
function toggleCase2(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  return str.replace(/[a-zA-Z]/g, function (char) {
    return char === char.toUpperCase()
      ? char.toLowerCase()
      : char.toUpperCase();
  });
}

/**
 * 方法三：使用ES6箭头函数和正则
 * 原理：结合ES6语法，使代码更加简洁
 * 优点：代码最简洁
 *
 * @param {string} str - 需要转换的字符串
 * @returns {string} 转换后的字符串
 */
const toggleCase3 = (str) => {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  return str.replace(/[a-zA-Z]/g, (char) =>
    char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
  );
};

/**
 * 方法四：使用数组方法
 * 原理：将字符串转为数组，使用map方法处理每个字符
 * 优点：函数式编程风格
 *
 * @param {string} str - 需要转换的字符串
 * @returns {string} 转换后的字符串
 */
function toggleCase4(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  return str
    .split("")
    .map((char) => {
      if (/[a-z]/.test(char)) {
        return char.toUpperCase();
      } else if (/[A-Z]/.test(char)) {
        return char.toLowerCase();
      } else {
        return char;
      }
    })
    .join("");
}

/**
 * 方法五：支持中文和特殊字符的增强版本
 * 原理：使用Unicode范围判断，支持更多字符类型
 * 优点：支持国际化字符
 *
 * @param {string} str - 需要转换的字符串
 * @returns {string} 转换后的字符串
 */
function toggleCaseAdvanced(str) {
  if (typeof str !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  return str.replace(/\p{L}/gu, (char) => {
    const upper = char.toUpperCase();
    const lower = char.toLowerCase();
    return char === upper ? lower : upper;
  });
}

// 测试用例
function runTests() {
  const testCases = [
    "Hello World!",
    "JavaScript",
    "ABC123def",
    "hELLo WoRLd!",
    "123!@#",
    "",
    "a",
    "A",
    "aB1cD2eF3",
    "The Quick Brown Fox Jumps Over The Lazy Dog",
  ];

  console.log("=== 字符串大小写切换方法测试 ===\n");

  testCases.forEach((testStr, index) => {
    console.log(`测试用例 ${index + 1}: "${testStr}"`);
    console.log(`方法一结果: "${toggleCase1(testStr)}"`);
    console.log(`方法二结果: "${toggleCase2(testStr)}"`);
    console.log(`方法三结果: "${toggleCase3(testStr)}"`);
    console.log(`方法四结果: "${toggleCase4(testStr)}"`);
    console.log(`增强版结果: "${toggleCaseAdvanced(testStr)}"`);
    console.log("---");
  });
}

// 性能测试
function performanceTest() {
  const testString = "The Quick Brown Fox Jumps Over The Lazy Dog".repeat(1000);
  const iterations = 10000;

  console.log("\n=== 性能测试 ===");
  console.log(`测试字符串长度: ${testString.length}`);
  console.log(`测试次数: ${iterations}\n`);

  // 测试方法一
  console.time("方法一 (字符编码)");
  for (let i = 0; i < iterations; i++) {
    toggleCase1(testString);
  }
  console.timeEnd("方法一 (字符编码)");

  // 测试方法二
  console.time("方法二 (正则表达式)");
  for (let i = 0; i < iterations; i++) {
    toggleCase2(testString);
  }
  console.timeEnd("方法二 (正则表达式)");

  // 测试方法三
  console.time("方法三 (ES6箭头函数)");
  for (let i = 0; i < iterations; i++) {
    toggleCase3(testString);
  }
  console.timeEnd("方法三 (ES6箭头函数)");

  // 测试方法四
  console.time("方法四 (数组方法)");
  for (let i = 0; i < iterations; i++) {
    toggleCase4(testString);
  }
  console.timeEnd("方法四 (数组方法)");
}

// 导出方法供其他模块使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    toggleCase1,
    toggleCase2,
    toggleCase3,
    toggleCase4,
    toggleCaseAdvanced,
    runTests,
    performanceTest,
  };
}

// 如果直接运行此文件，执行测试
if (typeof window === "undefined" && require.main === module) {
  runTests();
  performanceTest();
}

/**
 * 总结：
 *
 * 1. 最佳实践推荐：
 *    - 对于简单场景：使用方法二（正则表达式）
 *    - 对于性能要求高的场景：使用方法一（字符编码判断）
 *    - 对于国际化需求：使用增强版本
 *
 * 2. 各方法特点：
 *    - 方法一：性能最好，但代码稍长
 *    - 方法二：代码简洁，性能良好
 *    - 方法三：ES6语法，最简洁
 *    - 方法四：函数式风格，但性能较差
 *    - 增强版：支持Unicode，适合国际化
 *
 * 3. 注意事项：
 *    - 需要处理非字符串输入
 *    - 非字母字符应保持不变
 *    - 考虑性能和可读性的平衡
 *    - 根据实际需求选择合适的方法
 *
 * 4. 扩展思考：
 *    - 如何处理emoji表情？
 *    - 如何处理其他语言的大小写？
 *    - 如何优化大字符串的处理性能？
 */
