## TODO List
- `curryNamedInvokeManually` - Create a `namedCurry` function that should be invoked manually after all parameters were provided. i.e. after setting mandatory parameters it won't be executed, but will return another function that should be called to execute with previously cached parameters. + add ability to set optional parameters in the last execution (invoking the function and applying optional parameters)

old behavior:
```
    const func = ({a, b, c}) => a + b + c,
          keys = ['a', 'b', /*'c'*/], // commented out are optional
          curriedFunction = curryNamed(keys, func )
    
    let result = curriedFunction({a: 1, b: 2 }), // after setting all mandatory parameters the function will execute.

```

new variant behavior:
```
    const func = ({a, b, c}) => a + b + c,
          keys = ['a', 'b', /*'c'*/], // commented out are optional
          curriedFunction = curryNamedInvokeManually(keys, func )
    
    let funcCallback = curriedFunction({a: 1, b: 2 }), // after setting all mandatory parameters, a function will be returned
    let result = funcCallback({c:2}) // manual invocation with ability to add optional parameters last.

```