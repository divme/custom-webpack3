//一、 git

// git remote add origin url 本地init的项目，关联远程仓库
// git remote rm origin 移除远程仓库

// git pull == git fetch  & git merge origin/master 先获取远程仓库信息，再merge到当前工作区

// git checkout -b localname  origin/remoteBranch  从远程仓库检出分支到本地

// git push --set-upstream origin  localname  将本地分支推送到远程仓库

// git push origin localname:remotename 将本地分支推送到远程分支;推送后还要手动关联一下
//    git branch --set-upstream-to origin/branchname

// git push origin :remotename 利用推送方法，删除远程分支
// git push origin --delete remotebranch 删除远程分支

// git branch -r -D origin/branchname 删除本地的远程分支信息： 本地分支存在，远程分支也存在，但是本地不再有此远程分支的信息
// git branch --set-upstream-to origin/branchname  将当前分支关联到远程分支

