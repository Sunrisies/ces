#!/bin/sh
#!/bin/bash  
  
your_branch_name="main"  # 替换为你的分支名  
  
# 获取最早提交  
start_sha=$(git rev-list --max-parents=0 HEAD)  
  
# 获取最新提交  
end_sha=$(git rev-parse HEAD)  
# 获取两个参数：起始SHA和结束SHA
# start_sha=$1
# end_sha=$2

# 设置颜色变量
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
# 定义提交信息规范函数
check_commit_message() {
    commit_msg="$1"
    # 检查提交信息是否以指定的前缀开头
    if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore|ci|特性|修复|文档|格式|重构|性能|测试|构建|集成|回退|其他):"; then
        echo -e "${RED}Error:${NC} Commit message format is incorrect. It should start with one of '${BLUE}feat|fix|docs|style|refactor|test|chore|ci特性|修复|文档|格式|重构|性能|测试|构建|集成|回退|其他:${NC}'." >&2
        exit 1
    fi
}

# 遍历从start_sha到end_sha的所有提交
for sha in $(git rev-list $start_sha..$end_sha); do
    commit_msg=$(git show --format=%B -s $sha)
    echo "$commit_msg"
    check_commit_message "$commit_msg"
done

echo -e "${BLUE}Commit message check passed.${NC}\n"