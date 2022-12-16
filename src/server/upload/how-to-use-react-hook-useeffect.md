### I. useEffect in React Hooks
useEffect is a hook in React Hooks that allows us to work with life cycles in functional components. We can simply understand that useEffect Hook is combine of 3 methods `componentDidMount` , `componentDidUpdate` , and `componentWillUnmount`.

Lifecycle is very important in a component. Usually,  we need to fetch data from the API when the component has been rendered, or process some logic when a component is updated. As you can see the most important and commonly used method in the life cycle is `componentDidMount` , `componentDidUpdate` .

But in a functional component it is not possible to work with these life cycles in the normal way, so that why we need  useEffectHooks to do this.

useEffect allows us to handle logic in component lifecycles and is called every time there is any change in a component.

### II. Why do we need to use useEffect() ?
We can say that `useEffect` is a place to manage the `side-effect` in a React Components. Side effects are basically anything that affects something outside of the scope of the current function that’s being executed. let's see example below:
```
let a = 10;
function calculate() {
 a++;
}
// After we call function calculate(), a will have value 11
// a change value while we do not need pass variable into function
// This way is called as side-effect
calculate(); // a = 11; 
```
Back to useEffect, it is also similar to this, it can be included the logic or processing that effect to outside React components. It usually use for:
* Call API to get additional information for Components
* Update components' states
* ...

### III. How to use React useEffect? 
`useEffect` can be fired after the render React component's process is complete. It also be called and perform the logic in a callback.

Let's see a simple example below:
```
import React, {useEffect} from 'react'

function Example() {
    // Sử dụng useEffect
    useEffect(() => {
        document.title = "Example Title";
    }, [])

    return (
        <h1>Example</h1>
    ); 
}
```
In `React.useEffect` it have 2 arguments:
```
useEffect(callback, dependencies);
```
* Callback is the function containing the side-effect logic. callback is executed right after changes were being pushed to DOM.
* Dependencies is an optional array of dependencies. useEffect() executes callback only if the dependencies have changed between renderings.

### IV. Dependencies in useEffect()

Dependencies argument of` useEffect(callback, dependencies)`, it lets us control how to useEffect work.
Dependencies in the following cases :

**Not provided**
In this case, we don't provide anything. useEffect will be called and perform the logic when the component renders.
```
import React, {useEffect} from 'react'

function Example() {
    // useEffect will be set title when component re-render
    useEffect(() => {
        document.title = "Example Title";
    })

    return (
        <h1>Example</h1>
    ); 
}
```
**An empty array[]**

When you pass an empty array in, it will only execute once after the component renders for the first time, similar to that componentDidMountof the Class Component.
```
import React, {useEffect} from 'react'

function Example() {
	// just fire only one time after return run.
	useEffect(() => {
		document.title = "Example Title";
	}, [])

	return (
		<h1>Example</h1>
	); 
}
```
**Passed Props, State**

When dependencies is array of props, state `[props1, props2,.. stateA]`. React useEffect will rely on the value props, state. In the next render, it will check and compare the value of props, state. If they change, it will be called useEffect callback. 

This way is similar to using the Life Cycle componentDidUpdate and shouldComponentUpdateof the Class Component.

```
import React, {useEffect, useState} from 'react'

function Example() {
    const [count, setCount] = useState(0);

    // useEffect will be fire while count is changed
    const increment = () => {
        setCount(count + 1);
    }

    // useEffect will not be fire while count is not changed
    const nothing = () => {
        setCount(count);
    }

    // useEffect callback will be call when count is changed
    useEffect(() => {
        console.log("useEffect được gọi");
    }, [count])

    return (
        <section>
            <h1>{count}</h1>

            <button onClick={increment}>Add one</button>
            <button onClick={nothing}>Do nothing</button>
        </section>
    ); 
}
```
**Clean up useEffect**

Some side-effect need clean-up in order to avoid problems such performance memory-leak. This problem is often seen during your React app development.

In useEffect, we'll return a function inside useEffect to clean up.
```
useEffect(() => {
    window.addEventListener("scroll", () => {...});

    return () => {
        window.removeEventListener("scroll", () => {...})
    }
}, [])
```

### V. Conclusion
useEffect is a React hook that manages side-effect components. The callback argument is a function to set the logic side-effect. It will be fired or not depends on dependency argument which change value or not.
We can make useEffect callback fire on first execution after rendering and we can continue to fire it again by put the requirement of dependency.