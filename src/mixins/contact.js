export default {
    methods: {
        broadcast(childName, eventName, params) {
            const that = this
            this.$children.forEach(child => {
                const name = child.$options.name
                if (name === childName) {
                    // console.log(name)
                    child.$emit.apply(child, [eventName, params])
                } else {
                    that.broadcast.call(child, childName, eventName, params)
                }
            })
        },
        dispatch(parentName, eventName, params) {
            let parent = this.$parent || this.$root
            let name = parent && parent.$options.name
            while (parent && (!name || name !== parentName)) {
                parent = parent.$parent
                if (parent) name = parent.$options.name
            }
            if (parent) {
                parent.$emit.call(parent, eventName, params)
            }
        }
    }
}
