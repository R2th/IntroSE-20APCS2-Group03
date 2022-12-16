## What is Hooks?
Hooks are functions that allow developers to use state and lifecycle methods inside functional components. It enables developer to extract common stateful logic out into a separate function and reuse then in different components.

## Custom Hooks
A custom Hook is a JavaScript function whose name starts with **use**. A hook can use other hooks and doesn’t need to have a specific signature. We can decide what it takes as arguments, and what it should return or nothing at all. The name that starts with **use** is not required, but it's a good idea to follow this convention so that you can tell at a glance that the function is a hook. Example of custom a hook

```JS
function useIncrement(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  function increase() {
    setValue(value + 1);
  }
  
  return [value, increase];
}
```

And we can use it like this

```JS
function Count() {
  const [value, increase] = useIncrement(0);

  return (
    <div>
      <span>{count}</span>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
```

Custom hooks are very useful and can make our life much easier, so with that being said, let's write some useful utilities hooks that we can use in real project.

## usePrevious
This hook make use of **useRef** to store the value that was previously passed into the function. The **useEffect** is used to listen to change made to **value** so that we can update our previous value to the last change value and finally return back the previous value.

```JS
function usePrevious(value) {
  const prev = useRef();
  
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
    }
  }, [value]);
  
  return prev.current;
}
```

An example of using this hook

```JS
function Component() {
  const [value, setValue] = useState(0);
  const prev = usePrevious(value);

  const changeValue = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div>
      <p>Prev: {prev}</p>
      <p>Current: {value}</p>
      <input value={value} onChange={changeValue} />
    </div>
  );
}
```

## useToggle
This hook is nice when you are working with toggleable UI like checkbox, radio button or any component that required toggleable state. We can import and use this hook over and over again without having to copy and paste the same logic. The extra bonus of this hook is that we can also opt-out to explicitly set the state on/off by passing in the boolean value when we toggle the value.

```JS
function useToggle(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  function toggleValue(value) {
    setValue(currentValue =>
      typeof currentValue === 'boolean' ? value : !currentValue
    );
  }
  
  return [value, toggleValue];
}
```

Here is an example usage of this hook
```JS
function Component() {
  const [open, toggleOpen] = useToggle(false);
  
  return (
    <div>
      <button onClick={toggleOpen}>{open ? 'Hide' : 'Show'}</button>
      {open && <p>Hidden content</p>}
    </div>
  );
}
```
## useUpdateEffect
This hook is similar to **useEffect**, but the different is we only want to run the **callback** function only after the depenencies are updated and not on the first render. As we can see in the **useEffect** if the first render occured we just mark it as false and return without calling the callback function and as soon as the **deps** changes the callback will be called.

There are many situations that we want to have this kind of behavior, so extracting this into a custom hook can improve productivity a tons.

```JS
function useUpdateEffect(callback, deps) {
  const firstRender = useRef(true);
  
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    
    return callback();
  }, [deps]);
}
```

An example of using this hook. Notice that the first time this component is rendered the alert is not show only after we click on increase button that alert is show. If we change **useUpdateEffect** to **useEffect** we will see alert pop up immediately after the component rendered.

```JS
function Component() {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => alert(count), [count]);
  
  const increase = () => {
    setCount(count + 1);
  }
  
  return (
    <div>
      <p>Value: {count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
```

## Conclusion
Writing custom hooks is a good way to improve project quality and maintainability. If you ever spot the place that use simlilar kind of code or pattern there is a high change that it can be moved into a custom hook. I hope this article can help you getting up to speed to your future react project.