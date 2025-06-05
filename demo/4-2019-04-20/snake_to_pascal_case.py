"""
下划线命名转大驼峰命名工具
Snake Case to Pascal Case Converter
"""

def snake_to_pascal_case(snake_str):
    """
    将下划线命名转换为大驼峰命名（PascalCase）
    
    Args:
        snake_str (str): 下划线命名的字符串
        
    Returns:
        str: 大驼峰命名的字符串
        
    Raises:
        TypeError: 当输入不是字符串类型时
        
    Examples:
        >>> snake_to_pascal_case('user_name')
        'UserName'
        >>> snake_to_pascal_case('first_name')
        'FirstName'
        >>> snake_to_pascal_case('user_profile_image')
        'UserProfileImage'
    """
    # 检查输入类型
    if not isinstance(snake_str, str):
        raise TypeError('输入必须是字符串类型')
    
    # 处理空字符串
    if not snake_str:
        return ''
    
    # 将字符串按下划线分割，然后将每个单词的首字母大写
    words = snake_str.split('_')
    pascal_words = []
    
    for word in words:
        # 处理空字符串（连续下划线的情况）
        if word:
            # 将首字母大写，其余字母小写
            pascal_words.append(word.capitalize())
    
    return ''.join(pascal_words)


def batch_snake_to_pascal_case(snake_str_list):
    """
    批量转换下划线命名为大驼峰命名
    
    Args:
        snake_str_list (list): 下划线命名字符串列表
        
    Returns:
        list: 大驼峰命名字符串列表
        
    Raises:
        TypeError: 当输入不是列表类型时
    """
    if not isinstance(snake_str_list, list):
        raise TypeError('输入必须是列表类型')
    
    return [snake_to_pascal_case(snake_str) for snake_str in snake_str_list]


def test_snake_to_pascal_case():
    """测试函数"""
    test_cases = [
        'user_name',           # 预期: UserName
        'first_name',          # 预期: FirstName
        'user_profile_image',  # 预期: UserProfileImage
        'api_key',             # 预期: ApiKey
        'database_connection', # 预期: DatabaseConnection
        'hello_world',         # 预期: HelloWorld
        'a',                   # 预期: A
        '',                    # 预期: ''
        'single',              # 预期: Single
        'multiple_under_scores', # 预期: MultipleUnderScores
        'UPPER_CASE',          # 预期: UpperCase
        'Mixed_Case_String'    # 预期: MixedCaseString
    ]
    
    print('=== 下划线命名转大驼峰命名测试 ===')
    for test_case in test_cases:
        result = snake_to_pascal_case(test_case)
        print(f'{test_case} -> {result}')
    
    # 批量转换测试
    print('\n=== 批量转换测试 ===')
    batch_result = batch_snake_to_pascal_case(test_cases)
    print('批量转换结果:')
    for i, result in enumerate(batch_result):
        print(f'  {test_cases[i]} -> {result}')
    
    # 错误处理测试
    print('\n=== 错误处理测试 ===')
    try:
        snake_to_pascal_case(123)
    except TypeError as e:
        print(f'类型错误测试通过: {e}')
    
    try:
        batch_snake_to_pascal_case('not_a_list')
    except TypeError as e:
        print(f'批量转换类型错误测试通过: {e}')


if __name__ == '__main__':
    test_snake_to_pascal_case() 