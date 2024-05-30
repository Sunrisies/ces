#!/bin/bash  
  
your_branch_name="main"  # 替换为你的分支名  
  
# 获取最早提交  
first_commit=$(git log --reverse --max-count=1 --pretty=format:"%H" "$your_branch_name")  
echo "First commit on $your_branch_name: $first_commit"  
  
# 获取最新提交  
last_commit=$(git rev-parse "$your_branch_name")  
echo "Last commit on $your_branch_name: $last_commit"