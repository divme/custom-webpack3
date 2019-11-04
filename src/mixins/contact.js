export default {
    methods: {
        broadcast(componentName, eventName, params) {
            const that = this
            this.$children.forEach(child => {
                const name = child.$option.name
                if (name === componentName) {
                    child.$emit.apply(child, [eventName, params])
                } else {
                    that.broadcast.call(child, componentName, eventName, params)
                }
            })
        },
        dispatch(componentsName, eventName, params) {
            let parent = this.$parent || this.$root
            let name = parent && parent.$option.name
            while (parent && (!name || name != componentsName)) {
                parent = parent.$parent
                if (parent) name = parent.$option.name
            }
            if (parent) {
                parent.$emit.call(parent, eventName, params)
            }
        }
    }
}