// 找到指定名字的最近的父组件；如果没有，返回根组件
function findComponentUp(src, targetName) {
   let parent = src.$parent;
   while (parent) {
     let name = parent.$options.name;
     if ([targetName].indexOf(name) > -1) return parent;
     // 允许输入名称为组件名子集
     // if (name.indexOf(targetName) > -1) return parent;
     parent = parent.$parent;
   }
   return src.$root;
}
function findAllComponentsUp(src, targetName) {
   const parentArr = [];
   let parent = src.$parent;
   while (parent) {
     let name = parent.$options.name;
     if (targetName === name) parentArr.push(parent);
     parent = parent.$parent;
   }
   return parentArr;
}
// 向下找到最近的子节点
function findComponentDown(src, targetName) {
   const children = src.$children;
   if (children.length) {
     for (let i = 0; i < children.length; i++) {
       if (children[i].$options.name === targetName) {
         return children[i]
       }
       const child = findComponentDown(children[i], targetName);
       if (child) return child;
     }
   }
}
function findAllComponentsDown(src, targetName) {
  let childrenArr = [];
  const children = src.$children;
  if (children.length) {
    for (let i = 0; i < children.length; i++) {
      if (children[i].$options.name === targetName) {
        childrenArr.push(children[i]);
      }
      const childArr = findAllComponentsDown(children[i], targetName);
      if (childArr.length) childrenArr = childrenArr.concat(childArr);
    }
  }
  return childrenArr;
}
// 找到指定名称的最近的兄弟元素
function findComponentSibling(src, targetName, exceptMe) {
  const parent = src.$parent;
  if (parent) {
    const children = parent.$children;
    if (children.length) {
      for (let m = 0; m < children.length; m++) {
        if (children[m]._uid === src._uid) continue;
        if (children[m].$options.name === targetName) return children[m];
      }
    }
  }
}
function findAllComponentsSibling(src, targetName, exceptMe) {
  const brotherArr = [];
  const parent = src.$parent;
  if (parent) {
    const children = parent.$children;
    if (children.length) {
      for (let m = 0; m < children.length; m++) {
        if (exceptMe && children[m]._uid === src._uid) continue;
        if (children[m].$options.name === targetName) brotherArr.push(children[m]);
      }
    }
  }
  return brotherArr;
}
