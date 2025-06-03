/**
 * 简化版递归生成不重复随机数数组
 */

// 生成指定范围内的随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 递归生成不重复的随机数数组
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

// 测试
console.log("递归生成的不重复随机数数组:");
for (let i = 1; i <= 5; i++) {
  const result = generateUniqueRandomArray();
  console.log(`测试${i}: [${result.join(", ")}]`);
}

// 验证
const testArray = generateUniqueRandomArray();
console.log(`\n验证结果:`);
console.log(`数组: [${testArray.join(", ")}]`);
console.log(`长度: ${testArray.length}`);
console.log(`范围正确: ${testArray.every((num) => num >= 2 && num <= 32)}`);
console.log(`无重复: ${new Set(testArray).size === testArray.length}`);
