// git
// git checkout -b localname  origin/remoteBranch  从远程仓库检出分支到本地
// git push --set-upstream origin  localname  将本地分支推送到远程仓库
// git push origin localname:remotename 将本地分支推送到远程分支
// git push origin :remotename 利用推送方法，删除远程分支
// git push origin --delete remotebranch 删除远程分支

// git branch -r -D origin/branchname 删除本地的远程分支信息： 本地分支存在，远程分支也存在，但是本地不再有此远程分支的信息
// git branch --set-upstream-to origin/branchname  将当前分支关联到远程分支


// webpack 路径
// 模块路径 node_modules
// import 'vue'
// import 'vue/lib/profile'

// 相对路径
// import './router'
// import '../router'

// 绝对路径
// import '/router'


// 三个问题
// 1. uglify-webpack-plugin 报错： es6 语法不解析？
//    webpack-parallel-uglify-plugin: 利用webpack内置uglify功能开启多线程打包，没看出来
// 2. vue style标签内，使用scss，修复好的方法
// 3. js打包到同一个文件夹下
// 4. css 文件： extract-text-webpack-plugin 替代style-loader

// 检测与优化
