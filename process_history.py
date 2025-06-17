#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
处理history.md文件，将每个面试题拆分为单独的文件
按照项目标签分类存储，并在文件名中携带日期
对于已经存在的文件不再创建，也不做任何处理
"""

import re
import os
import urllib.parse
from pathlib import Path


def extract_title_from_url(url):
    """从GitHub URL中提取问题标题"""
    # 从URL中提取issue号码
    match = re.search(r'/issues/(\d+)', url)
    if not match:
        return None
    
    issue_number = match.group(1)
    return issue_number


def clean_filename(filename):
    """清理文件名，移除不合法字符"""
    # 移除或替换不合法的文件名字符
    illegal_chars = ['<', '>', ':', '"', '/', '\\', '|', '?', '*']
    for char in illegal_chars:
        filename = filename.replace(char, '')
    
    # 替换多个空格为单个空格
    filename = re.sub(r'\s+', ' ', filename)
    
    # 限制文件名长度
    if len(filename) > 150:
        filename = filename[:150]
    
    return filename.strip()


def parse_history_file(file_path, output_dir):
    """解析history.md文件"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 创建输出目录
    output_dir = Path(output_dir)
    output_dir.mkdir(exist_ok=True)
    
    # 按天分割内容
    day_pattern = r'- 第(\d+)天 \(([^)]+)\)\s*\n((?:\s*- \[[^\]]+\] \[[^\]]+\]\([^)]+\)\n?)*)'
    
    days = re.findall(day_pattern, content, re.MULTILINE)
    
    total_questions = 0
    skipped_files = 0
    created_files = 0
    category_counts = {}
    
    for day_num, date, questions_block in days:
        print(f"处理第{day_num}天 ({date})")
        
        # 解析每天的问题
        question_pattern = r'\s*- \[([^\]]+)\] \[([^\]]+)\]\(([^)]+)\)'
        questions = re.findall(question_pattern, questions_block)
        
        for category, title, url in questions:
            # 提取issue号码
            issue_match = re.search(r'/issues/(\d+)', url)
            if not issue_match:
                continue
                
            issue_number = issue_match.group(1)
            
            # 创建分类目录
            category_dir = output_dir / category
            category_dir.mkdir(exist_ok=True)
            
            # 统计分类
            if category not in category_counts:
                category_counts[category] = 0
            category_counts[category] += 1
            
            # 创建文件名 - 格式：日期_issue号码.标题.md
            clean_title = clean_filename(title)
            filename = f"{date}_{issue_number}.{clean_title}.md"
            
            # 检查文件是否已存在
            file_path = category_dir / filename
            if file_path.exists():
                print(f"  [{category}] 文件已存在，跳过: {filename}")
                skipped_files += 1
                total_questions += 1
                continue
            
            # 创建文件内容
            file_content = f"""# Problem: {title}

*[interview]: start

*[interview]: end
"""
            
            # 写入文件
            try:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(file_content)
                
                created_files += 1
                total_questions += 1
                print(f"  [{category}] 创建文件: {filename}")
                
            except Exception as e:
                print(f"  [{category}] 创建文件失败 {filename}: {e}")
    
    print(f"\n处理完成！")
    print(f"总共处理了 {total_questions} 个面试题")
    print(f"新创建了 {created_files} 个文件")
    print(f"跳过了 {skipped_files} 个已存在的文件")
    print(f"文件保存在: {output_dir.absolute()}")
    print("\n各分类统计：")
    for category, count in sorted(category_counts.items()):
        print(f"  {category}: {count} 个文件")


def main():
    """主函数"""
    # 配置输入和输出目录
    input_file = 'category/history.md'  # 输入文件路径
    output_directory = 'split_questions_by_category'  # 输出目录
    
    # 检查输入文件是否存在
    history_file = Path(input_file)
    if not history_file.exists():
        print(f"错误: 找不到文件 {history_file}")
        return
    
    print("开始处理history.md文件...")
    print(f"输入文件: {input_file}")
    print(f"输出目录: {output_directory}")
    print("按照项目标签分类存储，文件名包含日期...")
    print("对于已存在的文件将跳过处理...")
    print("-" * 50)
    
    parse_history_file(history_file, output_directory)


if __name__ == "__main__":
    main() 