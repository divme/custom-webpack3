function findComponentUpward(context, componentName) {
    let parent = context.$parent || context.$root
    let name = parent && parent.$options.name
    while (parent && (!name || name !== componentName)) {
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

function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]'  : 'boolean',
        '[object Number]'   : 'number',
        '[object String]'   : 'string',
        '[object Function]' : 'function',
        '[object Array]'    : 'array',
        '[object Date]'     : 'date',
        '[object RegExp]'   : 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null',
        '[object Object]'   : 'object'
    };
    return map[toString.call(obj)];
}
// deepCopy
function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if ( t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if ( t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

export {
    findComponentUpward,
    findComponentsUpward,
    findComponentDownward,
    findComponentsDownward,
    findBrothers,
    deepCopy
}
