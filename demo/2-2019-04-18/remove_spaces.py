#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
去掉字符串中空格的多种方法
"""

import re
import string


def remove_all_spaces(text):
    """
    方法1: 去掉所有空白字符（包括空格、制表符、换行符等）
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 去掉所有空白字符后的字符串
        
    Raises:
        TypeError: 如果输入不是字符串类型
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    return re.sub(r'\s', '', text)


def remove_spaces_only(text):
    """
    方法2: 只去掉普通空格字符
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 去掉普通空格后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    return text.replace(' ', '')


def remove_leading_trailing_spaces(text):
    """
    方法3: 去掉首尾空格（strip）
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 去掉首尾空白字符后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    return text.strip()


def remove_extra_spaces(text):
    """
    方法4: 去掉多余空格，将连续空格替换为单个空格
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 处理多余空格后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    return re.sub(r'\s+', ' ', text).strip()


def remove_spaces_by_split(text):
    """
    方法5: 使用split和join方法去掉所有空格
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 去掉所有空格后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    return ''.join(text.split(' '))


def remove_spaces_by_filter(text):
    """
    方法6: 使用filter函数去掉所有空白字符
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 去掉所有空白字符后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    return ''.join(filter(lambda x: not x.isspace(), text))


def remove_spaces_by_translate(text):
    """
    方法7: 使用translate方法去掉所有空白字符
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 去掉所有空白字符后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    # 创建翻译表，将所有空白字符映射为None（删除）
    translator = str.maketrans('', '', string.whitespace)
    return text.translate(translator)


def remove_spaces_by_position(text, position='all'):
    """
    方法8: 根据位置去掉空格
    
    Args:
        text (str): 输入字符串
        position (str): 位置选项 ('start', 'end', 'all')
        
    Returns:
        str: 处理后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    if position == 'start':
        return text.lstrip()
    elif position == 'end':
        return text.rstrip()
    elif position == 'all':
        return re.sub(r'\s', '', text)
    else:
        raise ValueError("position参数必须是 'start', 'end' 或 'all'")


def remove_spaces_by_comprehension(text):
    """
    方法9: 使用列表推导式去掉所有空白字符
    
    Args:
        text (str): 输入字符串
        
    Returns:
        str: 去掉所有空白字符后的字符串
    """
    if not isinstance(text, str):
        raise TypeError("参数必须是字符串类型")
    
    return ''.join([char for char in text if not char.isspace()])


def test_remove_spaces():
    """测试所有去掉空格的方法"""
    test_string = "  Hello   World  \n\t  Python  "
    
    print("=" * 60)
    print("去掉字符串空格的方法测试")
    print("=" * 60)
    print(f"原始字符串: {repr(test_string)}")
    print(f"原始字符串长度: {len(test_string)}")
    print("-" * 60)
    
    methods = [
        ("去掉所有空白字符", remove_all_spaces),
        ("只去掉普通空格", remove_spaces_only),
        ("去掉首尾空格", remove_leading_trailing_spaces),
        ("去掉多余空格", remove_extra_spaces),
        ("使用split/join", remove_spaces_by_split),
        ("使用filter函数", remove_spaces_by_filter),
        ("使用translate方法", remove_spaces_by_translate),
        ("去掉开头空格", lambda x: remove_spaces_by_position(x, 'start')),
        ("去掉结尾空格", lambda x: remove_spaces_by_position(x, 'end')),
        ("使用列表推导式", remove_spaces_by_comprehension),
    ]
    
    for name, func in methods:
        try:
            result = func(test_string)
            print(f"{name:15}: {repr(result)} (长度: {len(result)})")
        except Exception as e:
            print(f"{name:15}: 错误 - {e}")
    
    print("=" * 60)


def performance_test():
    """性能测试"""
    import time
    
    test_string = "  Hello   World  \n\t  Python  " * 1000
    iterations = 10000
    
    methods = [
        ("正则表达式", remove_all_spaces),
        ("replace方法", remove_spaces_only),
        ("filter函数", remove_spaces_by_filter),
        ("translate方法", remove_spaces_by_translate),
        ("列表推导式", remove_spaces_by_comprehension),
    ]
    
    print("\n性能测试结果 (执行 {} 次):".format(iterations))
    print("-" * 40)
    
    for name, func in methods:
        start_time = time.time()
        for _ in range(iterations):
            func(test_string)
        end_time = time.time()
        
        elapsed = end_time - start_time
        print(f"{name:15}: {elapsed:.4f} 秒")


if __name__ == "__main__":
    # 运行测试
    test_remove_spaces()
    
    # 运行性能测试
    performance_test() 