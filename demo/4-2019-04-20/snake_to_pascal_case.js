/**
 * 将下划线命名转换为大驼峰命名（PascalCase）
 * @param {string} snakeStr - 下划线命名的字符串
 * @returns {string} 大驼峰命名的字符串
 */
function snakeToPascalCase(snakeStr) {
  // 检查输入是否为字符串
  if (typeof snakeStr !== "string") {
    throw new Error("输入必须是字符串类型");
  }

  // 处理空字符串
  if (!snakeStr) {
    return "";
  }

  // 将字符串按下划线分割，然后将每个单词的首字母大写
  return snakeStr
    .split("_")
    .map((word) => {
      // 处理空字符串（连续下划线的情况）
      if (!word) return "";
      // 将首字母大写，其余字母小写
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * 批量转换下划线命名为大驼峰命名
 * @param {string[]} snakeStrArray - 下划线命名字符串数组
 * @returns {string[]} 大驼峰命名字符串数组
 */
function batchSnakeToPascalCase(snakeStrArray) {
  if (!Array.isArray(snakeStrArray)) {
    throw new Error("输入必须是数组类型");
  }

  return snakeStrArray.map((str) => snakeToPascalCase(str));
}

// 测试用例
function testSnakeToPascalCase() {
  const testCases = [
    "user_name", // 预期: UserName
    "first_name", // 预期: FirstName
    "user_profile_image", // 预期: UserProfileImage
    "api_key", // 预期: ApiKey
    "database_connection", // 预期: DatabaseConnection
    "hello_world", // 预期: HelloWorld
    "a", // 预期: A
    "", // 预期: ''
    "single", // 预期: Single
    "multiple_under_scores", // 预期: MultipleUnderScores
  ];

  console.log("=== 下划线命名转大驼峰命名测试 ===");
  testCases.forEach((testCase) => {
    const result = snakeToPascalCase(testCase);
    console.log(`${testCase} -> ${result}`);
  });

  // 批量转换测试
  console.log("\n=== 批量转换测试 ===");
  const batchResult = batchSnakeToPascalCase(testCases);
  console.log("批量转换结果:", batchResult);
}

// 如果直接运行此文件，执行测试
if (typeof require !== "undefined" && require.main === module) {
  testSnakeToPascalCase();
}

// 导出函数（Node.js环境）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    snakeToPascalCase,
    batchSnakeToPascalCase,
  };
}

// 导出函数（浏览器环境）
if (typeof window !== "undefined") {
  window.snakeToPascalCase = snakeToPascalCase;
  window.batchSnakeToPascalCase = batchSnakeToPascalCase;
}
