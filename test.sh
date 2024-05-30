#!/bin/bash  
  
your_branch_name="main"  # 替换为你的分支名  
  
# 获取最早提交  
first_commit=$(git rev-list --max-parents=0 HEAD)  
  
# 获取最新提交  
last_commit=$(git rev-parse HEAD)  