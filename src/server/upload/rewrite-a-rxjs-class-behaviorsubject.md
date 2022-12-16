**A. Make a simple counter with rxjs**

1. go to ```http://codesandbox.io``` then create a react one (mine is: https://codesandbox.io/s/rxjs-rewrite-behaviorsubject-wfh0n)
2. Create an observable object 
    ```js 
    let valueObservable = new BehaviorSubject(0);
    ```
3. Create 2 separated components ```Result``` for showing the result and ```Panel``` for inc/dec value. They will communicate thru ```valueObservable```
```js
    function Result() {
      const [value, setValue] = useState(0);
      useEffect(() => {
        valueObservable.subscribe((it) => setValue(it));
      }, []);
      return <div> Result: {value} </div>;
    }
```

```js
    function Panel() {
      return (
        <div>
          <button
            onClick={() => valueObservable.next(valueObservable.getValue() + 1)}
          > + </button>
          <button
            onClick={() => valueObservable.next(valueObservable.getValue() - 1)}
          > - </button>
        </div>
      );
    }
```
4. Then add them to the root App component and see the result
 ```js 
     export default function App() {
      return (
        <div className="App">
          <Result />
          <Panel />
        </div>
      );
    }
 ```

**B. Rewrite it without using rxjs**

1. Create a class ```MyBehaviorSubject``` having same methods as rxjs ```BehaviorSubject```
```js
export default class MyBehaviorSubject {
  constructor(defaultValue) {
  }

  subscribe(fn) {
  }

  getValue() {
  }

  next(nextValue) {
  }
}
```
Now go implementing each methods: 
```js 
constructor(defaultValue) {
    this.value = defaultValue;
    this.subscribers = [];
  }
```
The subscribe method will take a function as argument, then it should be saved to a list, then they can be trigged later when value changed. So in the constructor, a default value and an empty subscribers list should be created 

```js
subscribe(fn) {
    this.subscribers.push(fn);
    return () => {
      this.subscribers.pop();
    };
}
```
Now the subscribe method will add each ```component update state function``` to that subscribers list. 
And you may wonder what is the purpose of that return function? It's for unmounted components. When a component unmounted, we should remove the callback out from the list, otherwise, it will be triggered every time value changed, even when it no longer appears on UI


```js
getValue() {
    return this.value;
}
```
This function just returns current value

```js
next(nextValue) {
    this.value = nextValue;
    this.subscribers.forEach((fn) => fn(nextValue));
}
```
This function update new value, and then loop thru subscribers and excecute them (note that every element of subscribers list is ```a component update state function```. So the result of these executions is: ```all component will be synced with that new value```) 

Then now, go to codesandbox and replace ```BehaviorSubject``` by ```MyBehaviorSubject```. You should see the same result. 

**C. Make sure we handle well unmounted component case.**

Now, implement something more to make sure that unmounted component callback will not be trigged anymore
Add one more callback for sync number of subscribers that are active
```js 
constructor(defaultValue) {
    ......
    this.fn = () => {};
}
```
```js
subscribe2(fn) {
    this.fn = fn;
}
```
Trigger it every when a subscribe created or removed 
```js
subscribe(fn) {
    this.subscribers.push(fn);
    this.fn(this.subscribers.length);
    return () => {
      this.subscribers.pop();
      this.fn(this.subscribers.length);
    };
}
```

And that's it. Result at https://codesandbox.io/s/rxjs-rewrite-behaviorsubject-wfh0n. 
Every time you show the ```Result Component```, number of subscribers is 1. End when it hided, number of subscribers will be 0, means there is no callback execution when inc/dec button clicked.