// import assert from 'assert'
import path from 'path'
import { assert } from 'chai'
import filesystem from 'fs'
import deleteModule from 'del'
import configuration from '../setup/configuration'
import { curryNamed } from './entrypoint.js'
const testAssetPath = path.join(configuration.directory.application.containerAbsolutePath, 'test/asset')

describe('function curryNamed: Curry for named arguments', function() {
    
    const func = ({a, b, c}) => a + b + c,
          keys = ['a', 'b', 'c'],
          curriedFunction = curryNamed(keys, func )

    it('Preserved original uncurried behavior - Passing all arguments at once', async function() {
        let args = {a: 1, b: 2, c: 4}
        let actual = curriedFunction(args),
            expected = func(args)
        assert.equal(actual, expected)
    })

    it('Currying behavior - Passing arguments in sequential calls', async function() {
        let args = {a: 1, b: 2, c: 4}
        let actual = curriedFunction({a: args.a})({b: args.b, c: args.c}),
            expected = func(args)
        assert.equal(actual, expected)
    })

    it('Partially applying the function with a number of arguments', async function() {
        let args = {a: 1, b: 2, c: 4}
        let actual = curriedFunction ({a: args.a}) ({b: args.b}, {c: args.c}),
            expected = func(args)
        assert.equal(actual, expected)
    })

    it('Prevent overriding of already passed argument - Should fail when duplicate argument passed', async function() {
        let args = {a: 1, b: 2, c: 4},
            differntArgKeyA = {a: 3}
        let fails = false
        try {
            curriedFunction(differntArgKeyA)(args)
        } catch(error) {
            fails = true
        }
        assert.isOk(fails)
    })
})
