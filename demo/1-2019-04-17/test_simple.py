# -*- coding: utf-8 -*-
print("测试开始")

import random

def simple_test():
    result = []
    for i in range(5):
        num = random.randint(2, 32)
        if num not in result:
            result.append(num)
    return result

if __name__ == "__main__":
    print("生成随机数组:", simple_test())
    print("测试完成") 