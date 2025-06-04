/**
 * 使用递归算法生成长度为5且元素为2-32间不重复的随机数数组
 */

/**
 * 生成指定范围内的随机整数
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（包含）
 * @returns {number} 随机整数
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 递归生成不重复的随机数数组
 * @param {number[]} result - 当前结果数组
 * @param {number} targetLength - 目标长度
 * @param {number} min - 随机数最小值
 * @param {number} max - 随机数最大值
 * @returns {number[]} 生成的不重复随机数数组
 */
function generateUniqueRandomArray(
  result = [],
  targetLength = 5,
  min = 2,
  max = 32
) {
  // 递归终止条件：数组长度达到目标长度
  if (result.length === targetLength) {
    return result;
  }

  // 生成随机数
  const randomNum = getRandomInt(min, max);

  // 检查是否重复
  if (!result.includes(randomNum)) {
    // 如果不重复，添加到结果数组中
    result.push(randomNum);
  }

  // 递归调用，继续生成下一个数
  return generateUniqueRandomArray(result, targetLength, min, max);
}

/**
 * 另一种递归实现方式：使用Set来避免重复检查
 * @param {Set} usedNumbers - 已使用的数字集合
 * @param {number[]} result - 结果数组
 * @param {number} targetLength - 目标长度
 * @param {number} min - 最小值
 * @param {number} max - 最大值
 * @returns {number[]} 生成的不重复随机数数组
 */
function generateUniqueRandomArrayWithSet(
  usedNumbers = new Set(),
  result = [],
  targetLength = 5,
  min = 2,
  max = 32
) {
  // 递归终止条件
  if (result.length === targetLength) {
    return result;
  }

  // 生成随机数
  const randomNum = getRandomInt(min, max);

  // 使用Set检查重复，效率更高
  if (!usedNumbers.has(randomNum)) {
    usedNumbers.add(randomNum);
    result.push(randomNum);
  }

  // 递归调用
  return generateUniqueRandomArrayWithSet(
    usedNumbers,
    result,
    targetLength,
    min,
    max
  );
}

/**
 * 更优化的递归实现：预先创建可选数字池
 * @param {number[]} availableNumbers - 可选数字池
 * @param {number[]} result - 结果数组
 * @param {number} targetLength - 目标长度
 * @returns {number[]} 生成的不重复随机数数组
 */
function generateUniqueRandomArrayOptimized(
  availableNumbers = null,
  result = [],
  targetLength = 5
) {
  // 初始化可选数字池
  if (availableNumbers === null) {
    availableNumbers = [];
    for (let i = 2; i <= 32; i++) {
      availableNumbers.push(i);
    }
  }

  // 递归终止条件
  if (result.length === targetLength) {
    return result;
  }

  // 从可选数字池中随机选择一个索引
  const randomIndex = getRandomInt(0, availableNumbers.length - 1);

  // 取出该数字并从池中移除
  const selectedNumber = availableNumbers.splice(randomIndex, 1)[0];
  result.push(selectedNumber);

  // 递归调用
  return generateUniqueRandomArrayOptimized(
    availableNumbers,
    result,
    targetLength
  );
}

// 测试函数
function testRandomArrayGeneration() {
  console.log("=== 递归生成不重复随机数数组测试 ===\n");

  console.log("方法1：基础递归实现");
  for (let i = 1; i <= 3; i++) {
    const result1 = generateUniqueRandomArray();
    console.log(`测试${i}: [${result1.join(", ")}] - 长度: ${result1.length}`);
  }

  console.log("\n方法2：使用Set优化的递归实现");
  for (let i = 1; i <= 3; i++) {
    const result2 = generateUniqueRandomArrayWithSet();
    console.log(`测试${i}: [${result2.join(", ")}] - 长度: ${result2.length}`);
  }

  console.log("\n方法3：预先创建数字池的优化递归实现");
  for (let i = 1; i <= 3; i++) {
    const result3 = generateUniqueRandomArrayOptimized();
    console.log(`测试${i}: [${result3.join(", ")}] - 长度: ${result3.length}`);
  }

  // 验证数组元素的有效性
  console.log("\n=== 验证测试 ===");
  const testArray = generateUniqueRandomArray();
  console.log(`生成的数组: [${testArray.join(", ")}]`);
  console.log(`数组长度: ${testArray.length}`);
  console.log(
    `所有元素都在2-32范围内: ${testArray.every((num) => num >= 2 && num <= 32)}`
  );
  console.log(
    `所有元素都不重复: ${new Set(testArray).size === testArray.length}`
  );
}

// 运行测试
testRandomArrayGeneration();

// 导出函数供其他模块使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateUniqueRandomArray,
    generateUniqueRandomArrayWithSet,
    generateUniqueRandomArrayOptimized,
  };
}
