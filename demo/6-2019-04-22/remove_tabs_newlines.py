#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
去除制表符和换行符的工具方法
提供多种实现方式供不同场景使用
"""

import re
import string


def remove_tabs_and_newlines(text):
    """
    方法1: 使用正则表达式去除制表符和换行符
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    # 去除制表符(\t)、换行符(\n)、回车符(\r)
    return re.sub(r'[\t\n\r]', '', text)


def remove_tabs_and_newlines_with_replacement(text, replacement=' '):
    """
    方法2: 去除制表符和换行符，并用指定字符替换
    
    Args:
        text (str): 输入字符串
        replacement (str): 替换字符，默认为空格
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    return re.sub(r'[\t\n\r]', replacement, text)


def remove_all_whitespace(text):
    """
    方法3: 去除所有空白字符（包括制表符、换行符、空格等）
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    # \s 匹配所有空白字符
    return re.sub(r'\s', '', text)


def remove_tabs_and_newlines_keep_spaces(text):
    """
    方法4: 去除制表符和换行符，保留普通空格
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    # 只去除制表符和换行符，保留空格
    return re.sub(r'[\t\n\r]', '', text)


def remove_tabs_newlines_and_compress_spaces(text):
    """
    方法5: 去除制表符和换行符，并压缩多个连续空格为单个空格
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    # 将制表符和换行符替换为空格
    text = re.sub(r'[\t\n\r]', ' ', text)
    # 将多个连续空格压缩为单个空格
    text = re.sub(r'\s+', ' ', text)
    # 去除首尾空格
    return text.strip()


def remove_tabs_and_newlines_by_replace(text):
    """
    方法6: 使用字符串replace方法
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    return text.replace('\t', '').replace('\n', '').replace('\r', '')


def remove_tabs_and_newlines_by_translate(text):
    """
    方法7: 使用str.translate方法（高性能）
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    # 创建翻译表，将制表符、换行符、回车符映射为None（删除）
    translator = str.maketrans('', '', '\t\n\r')
    return text.translate(translator)


def remove_tabs_and_newlines_by_filter(text):
    """
    方法8: 使用filter函数
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理后的字符串
        
    Raises:
        TypeError: 当输入不是字符串时
    """
    if not isinstance(text, str):
        raise TypeError("输入必须是字符串类型")
    
    # 过滤掉制表符、换行符、回车符
    return ''.join(filter(lambda x: x not in '\t\n\r', text))


def test_methods():
    """测试所有方法"""
    test_string = "这是一个\t包含制表符\n和换行符\r的测试字符串\t\n\r"
    
    methods = [
        ("方法1: 正则表达式", remove_tabs_and_newlines),
        ("方法2: 替换为空格", lambda x: remove_tabs_and_newlines_with_replacement(x, ' ')),
        ("方法3: 去除所有空白", remove_all_whitespace),
        ("方法4: 保留空格", remove_tabs_and_newlines_keep_spaces),
        ("方法5: 压缩空格", remove_tabs_newlines_and_compress_spaces),
        ("方法6: replace方法", remove_tabs_and_newlines_by_replace),
        ("方法7: translate方法", remove_tabs_and_newlines_by_translate),
        ("方法8: filter方法", remove_tabs_and_newlines_by_filter),
    ]
    
    print(f"原始字符串: {repr(test_string)}")
    print("-" * 50)
    
    for name, method in methods:
        try:
            result = method(test_string)
            print(f"{name}: {repr(result)}")
        except Exception as e:
            print(f"{name} (错误): {e}")


if __name__ == "__main__":
    test_methods() 