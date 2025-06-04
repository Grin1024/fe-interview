/**
 * 去除字符串中最后一个指定字符的多种方法
 */

// 方法1: 使用 lastIndexOf + substring
function removeLastChar1(str, char) {
  if (typeof str !== "string" || typeof char !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  if (char.length !== 1) {
    throw new Error("要删除的字符必须是单个字符");
  }

  const lastIndex = str.lastIndexOf(char);
  if (lastIndex === -1) {
    return str; // 如果没有找到指定字符，返回原字符串
  }

  return str.substring(0, lastIndex) + str.substring(lastIndex + 1);
}

// 方法2: 使用 lastIndexOf + slice
function removeLastChar2(str, char) {
  if (typeof str !== "string" || typeof char !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  if (char.length !== 1) {
    throw new Error("要删除的字符必须是单个字符");
  }

  const lastIndex = str.lastIndexOf(char);
  if (lastIndex === -1) {
    return str;
  }

  return str.slice(0, lastIndex) + str.slice(lastIndex + 1);
}

// 方法3: 使用正则表达式（从右到左匹配）
function removeLastChar3(str, char) {
  if (typeof str !== "string" || typeof char !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  if (char.length !== 1) {
    throw new Error("要删除的字符必须是单个字符");
  }

  // 转义特殊正则字符
  const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // 使用正向先行断言，匹配最后一个指定字符
  const regex = new RegExp(`${escapedChar}(?!.*${escapedChar})`);

  return str.replace(regex, "");
}

// 方法4: 使用数组反转
function removeLastChar4(str, char) {
  if (typeof str !== "string" || typeof char !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  if (char.length !== 1) {
    throw new Error("要删除的字符必须是单个字符");
  }

  const arr = str.split("");
  const reversedArr = arr.reverse();

  // 找到第一个匹配的字符（实际上是原字符串的最后一个）
  const index = reversedArr.indexOf(char);
  if (index === -1) {
    return str;
  }

  // 删除该字符
  reversedArr.splice(index, 1);

  // 反转回来并连接
  return reversedArr.reverse().join("");
}

// 方法5: 使用循环从后往前查找
function removeLastChar5(str, char) {
  if (typeof str !== "string" || typeof char !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  if (char.length !== 1) {
    throw new Error("要删除的字符必须是单个字符");
  }

  for (let i = str.length - 1; i >= 0; i--) {
    if (str[i] === char) {
      return str.slice(0, i) + str.slice(i + 1);
    }
  }

  return str; // 没有找到指定字符
}

// 方法6: 支持删除多个字符的版本
function removeLastChars(str, chars) {
  if (typeof str !== "string" || typeof chars !== "string") {
    throw new Error("参数必须是字符串类型");
  }

  if (chars.length === 0) {
    return str;
  }

  const lastIndex = str.lastIndexOf(chars);
  if (lastIndex === -1) {
    return str;
  }

  return str.slice(0, lastIndex) + str.slice(lastIndex + chars.length);
}

// 测试函数
function testRemoveLastChar() {
  const testCases = [
    { str: "hello world", char: "l", expected: "hello word" },
    { str: "javascript", char: "a", expected: "jvascript" },
    { str: "programming", char: "m", expected: "programing" },
    { str: "test", char: "x", expected: "test" },
    { str: "aaaaaa", char: "a", expected: "aaaaa" },
    { str: "", char: "a", expected: "" },
    { str: "single", char: "s", expected: "ingle" },
  ];

  const methods = [
    { name: "lastIndexOf + substring", func: removeLastChar1 },
    { name: "lastIndexOf + slice", func: removeLastChar2 },
    { name: "正则表达式", func: removeLastChar3 },
    { name: "数组反转", func: removeLastChar4 },
    { name: "循环查找", func: removeLastChar5 },
  ];

  console.log("=".repeat(80));
  console.log("去除字符串中最后一个指定字符的方法测试");
  console.log("=".repeat(80));

  testCases.forEach((testCase, index) => {
    console.log(
      `\n测试用例 ${index + 1}: "${testCase.str}" 删除最后一个 "${
        testCase.char
      }"`
    );
    console.log(`期望结果: "${testCase.expected}"`);
    console.log("-".repeat(60));

    methods.forEach((method) => {
      try {
        const result = method.func(testCase.str, testCase.char);
        const isCorrect = result === testCase.expected;
        console.log(
          `${method.name.padEnd(20)}: "${result}" ${isCorrect ? "✓" : "✗"}`
        );
      } catch (error) {
        console.log(`${method.name.padEnd(20)}: 错误 - ${error.message}`);
      }
    });
  });

  // 测试多字符删除
  console.log("\n" + "=".repeat(80));
  console.log("删除多个字符的测试");
  console.log("=".repeat(80));

  const multiCharTests = [
    { str: "hello world hello", chars: "hello", expected: "hello world " },
    { str: "abcdefabcdef", chars: "abc", expected: "abcdefdef" },
    { str: "test string", chars: "xyz", expected: "test string" },
  ];

  multiCharTests.forEach((testCase, index) => {
    console.log(
      `\n测试用例 ${index + 1}: "${testCase.str}" 删除最后一个 "${
        testCase.chars
      }"`
    );
    const result = removeLastChars(testCase.str, testCase.chars);
    const isCorrect = result === testCase.expected;
    console.log(`结果: "${result}" ${isCorrect ? "✓" : "✗"}`);
    console.log(`期望: "${testCase.expected}"`);
  });
}

// 性能测试函数
function performanceTest() {
  const testString = "a".repeat(10000) + "b" + "a".repeat(10000);
  const iterations = 10000;

  const methods = [
    { name: "lastIndexOf + substring", func: removeLastChar1 },
    { name: "lastIndexOf + slice", func: removeLastChar2 },
    { name: "正则表达式", func: removeLastChar3 },
    { name: "数组反转", func: removeLastChar4 },
    { name: "循环查找", func: removeLastChar5 },
  ];

  console.log("\n" + "=".repeat(80));
  console.log(
    `性能测试 (字符串长度: ${testString.length}, 执行次数: ${iterations})`
  );
  console.log("=".repeat(80));

  methods.forEach((method) => {
    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
      method.func(testString, "a");
    }

    const endTime = performance.now();
    const elapsed = endTime - startTime;

    console.log(`${method.name.padEnd(25)}: ${elapsed.toFixed(2)} ms`);
  });
}

// 导出函数（如果在Node.js环境中使用）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    removeLastChar1,
    removeLastChar2,
    removeLastChar3,
    removeLastChar4,
    removeLastChar5,
    removeLastChars,
    testRemoveLastChar,
    performanceTest,
  };
}

// 如果直接运行此文件，执行测试
if (typeof window === "undefined") {
  testRemoveLastChar();
  performanceTest();
}
