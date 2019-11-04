function findComponentUpward(context, componentName) {
    let parent = context.$parent || context.$root
    let name = parent && parent.$options.name
    while (parent && (!name && name !== componentName)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}
function findComponentsUpward(context, componentName) {
    let parents = []
    let parent = context.$parent || context.$root
    let name = parent && parent.$options.name
    while (parent) {
        if (name === componentName) parents.push(parent)
        parent = parent.$parent
        name = parent && parent.$options.name
    }
    return parents
}
function findComponentDownward(context, componentName) {
    let children = context.$children
    let needChild = null
    if (children.length) {
        for (let child in children) {
            const name = child.$options.name
            if (name && name === componentName) {
                needChild = child
                break
            } else {
                needChild = findComponentDownward(child, componentName)
                if (needChild) break
            }
        }
    }
    return needChild
}
function findComponentsDownward(context, componentName) {
    let children = context.$children
    let needChild = []
    children && children.forEach(child => {
        const name = child.$options.name
        if (name && name === componentName) {
            needChild.push(child)
        }
        const curChildren = findComponentsDownward(child, componentName)
        needChild = needChild.concat(curChildren)
    })
    return needChild
}
function findBrothers(context, componentName, exceptMe = true){
    let parent = context.$parent
    let children = parent && parent.$children
    children.filter(child => {
        return exceptMe ? (child.$options.name === componentName && child !== context) : child.$options.name === componentName
    })
}
export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothers
}