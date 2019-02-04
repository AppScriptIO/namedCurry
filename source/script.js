/**
 * Source: https://github.com/gunar/ncurry 
 *  Allows for currying on named parameters i.e. { param1: '', param2: ''}
 * Features: Currying & Partial application technique - https://codeburst.io/javascript-currying-vs-partial-application-4db5b2442be8
 * Currying returning a function with default values. 
 * Partially apply a function with dynamic number of arguments.
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

// TODO: check todo list in documentation folder.
export function curryNamedInvokeManually() {}

const includesEvery = (mandatory, received) =>
    mandatory.every(key =>
        received.includes(key))

const includesSome = (mandatory, received) =>
    mandatory.filter(key =>
        received.includes(key))
