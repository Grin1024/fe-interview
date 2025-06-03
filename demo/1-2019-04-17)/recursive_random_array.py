#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
使用递归算法生成长度为5且元素为2-32间不重复的随机数数组
"""

import random
from typing import List, Set


def generate_unique_random_array(
    result: List[int] = None, 
    target_length: int = 5, 
    min_val: int = 2, 
    max_val: int = 32
) -> List[int]:
    """
    递归生成不重复的随机数数组
    
    Args:
        result: 当前结果数组
        target_length: 目标长度
        min_val: 随机数最小值
        max_val: 随机数最大值
    
    Returns:
        生成的不重复随机数数组
    """
    # 初始化结果数组
    if result is None:
        result = []
    
    # 递归终止条件：数组长度达到目标长度
    if len(result) == target_length:
        return result
    
    # 生成随机数
    random_num = random.randint(min_val, max_val)
    
    # 检查是否重复
    if random_num not in result:
        # 如果不重复，添加到结果数组中
        result.append(random_num)
    
    # 递归调用，继续生成下一个数
    return generate_unique_random_array(result, target_length, min_val, max_val)


def generate_unique_random_array_with_set(
    used_numbers: Set[int] = None,
    result: List[int] = None,
    target_length: int = 5,
    min_val: int = 2,
    max_val: int = 32
) -> List[int]:
    """
    使用Set优化的递归实现
    
    Args:
        used_numbers: 已使用的数字集合
        result: 结果数组
        target_length: 目标长度
        min_val: 最小值
        max_val: 最大值
    
    Returns:
        生成的不重复随机数数组
    """
    # 初始化
    if used_numbers is None:
        used_numbers = set()
    if result is None:
        result = []
    
    # 递归终止条件
    if len(result) == target_length:
        return result
    
    # 生成随机数
    random_num = random.randint(min_val, max_val)
    
    # 使用Set检查重复，效率更高
    if random_num not in used_numbers:
        used_numbers.add(random_num)
        result.append(random_num)
    
    # 递归调用
    return generate_unique_random_array_with_set(
        used_numbers, result, target_length, min_val, max_val
    )


def generate_unique_random_array_optimized(
    available_numbers: List[int] = None,
    result: List[int] = None,
    target_length: int = 5
) -> List[int]:
    """
    优化的递归实现：预先创建可选数字池
    
    Args:
        available_numbers: 可选数字池
        result: 结果数组
        target_length: 目标长度
    
    Returns:
        生成的不重复随机数数组
    """
    # 初始化可选数字池
    if available_numbers is None:
        available_numbers = list(range(2, 33))  # 2到32的数字
    if result is None:
        result = []
    
    # 递归终止条件
    if len(result) == target_length:
        return result
    
    # 从可选数字池中随机选择一个索引
    random_index = random.randint(0, len(available_numbers) - 1)
    
    # 取出该数字并从池中移除
    selected_number = available_numbers.pop(random_index)
    result.append(selected_number)
    
    # 递归调用
    return generate_unique_random_array_optimized(
        available_numbers, result, target_length
    )


def test_random_array_generation():
    """测试函数"""
    print("=== 递归生成不重复随机数数组测试 ===\n")
    
    print("方法1：基础递归实现")
    for i in range(1, 4):
        result1 = generate_unique_random_array()
        print(f"测试{i}: {result1} - 长度: {len(result1)}")
    
    print("\n方法2：使用Set优化的递归实现")
    for i in range(1, 4):
        result2 = generate_unique_random_array_with_set()
        print(f"测试{i}: {result2} - 长度: {len(result2)}")
    
    print("\n方法3：预先创建数字池的优化递归实现")
    for i in range(1, 4):
        result3 = generate_unique_random_array_optimized()
        print(f"测试{i}: {result3} - 长度: {len(result3)}")
    
    # 验证数组元素的有效性
    print("\n=== 验证测试 ===")
    test_array = generate_unique_random_array()
    print(f"生成的数组: {test_array}")
    print(f"数组长度: {len(test_array)}")
    print(f"所有元素都在2-32范围内: {all(2 <= num <= 32 for num in test_array)}")
    print(f"所有元素都不重复: {len(set(test_array)) == len(test_array)}")


if __name__ == "__main__":
    test_random_array_generation() 