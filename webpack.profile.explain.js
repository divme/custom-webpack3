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

//   相对路径
//      import './router'
//      import '../router'

//   绝对路径
//     import '/router'


// 二、 三个问题
// 1. uglify-webpack-plugin 报错： es6 语法不解析？
//    webpack-parallel-uglify-plugin: 利用webpack内置uglify功能开启多线程打包，没看出来
// 2. vue style标签内，使用scss，修复好的方法
// 3. js打包到同一个文件夹下
// 4. css 文件： extract-text-webpack-plugin 替代style-loader

// 三、检测与优化

// 四、Babel
// 1. @babel/core 是 Babel 的核心功能包，必须安装。
// 2. babel-loader 是 Webpack 用来转译 JS 代码的加载器。
// 3. @babel/preset-env 能根据当前的运行环境，自动确定需要的 plugins 和 polyfills。主要负责将代码转成 ES5 语法规则。
// 4. babel-polyfill。Babel 编译时只编译语法，并不会编译 API 和实例方法，如：async/await、Promise 等，babel-polyfill 会把这些没有的 API 全部挂载到全局对象，也就是所谓的“垫片”。

