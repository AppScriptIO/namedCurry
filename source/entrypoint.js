/**
 * Source: https://github.com/gunar/ncurry 
 *  Allows for currying on named parameters i.e. { param1: '', param2: ''}
 */
// IMPORTANT: take notice of the way "namedCurry" works, if all required arguments are passed then it will execute the function not always the desired behavior.
 
export function curryNamed (keys, fn) {
    return function helper (cache) {
        return function (...objects) {
            const incoming = Object.assign({}, ...objects)
            const argsOverridden = includesSome(Object.keys(cache), Object.keys(incoming))
            const error = `The following arguments were overidden: ${argsOverridden}`
            if (argsOverridden.length > 0) throw Error(error)
            const obj = Object.assign({}, cache, ...objects)
            return includesEvery(keys, Object.keys(obj)) ? fn(obj) : helper(obj)
        }
    }({})
}
const includesEvery = (mandatory, received) =>
    mandatory.every(key =>
        received.includes(key))

const includesSome = (mandatory, received) =>
    mandatory.filter(key =>
        received.includes(key))
