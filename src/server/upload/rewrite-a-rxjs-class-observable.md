This is my experiment rewriting a part of rxjs lib with pure js, that provide same effect as the original one

I start with the Observable class, to check to original class, pls check the doc https://rxjs.dev/guide/observable 

Check this sandbox for my implementation https://codesandbox.io/s/rxjs-rewrite-observable-v6jqd?file=/src/App.js

**A. Observable and subscription**

First of all, we create a simple rxjs original ```observable ```
```js 
const numberObservable = new Observable((subscriber) => {
  subscriber.next(1);
  setTimeout(() => {
    subscriber.next(2);
    subscriber.complete();
    subscriber.next(3);
  }, 5000);
});
```
and a simple react view to show the subscription result
```js
export default function App() {
  const [messages, setMessages] = useState([]);
  const consumer = {
    next(x) { setMessages((messages) => [...messages, x]); },
    error(x) { setMessages((messages) => [...messages, `error: ${x}`]); },
    complete() { setMessages((messages) => [...messages, "done"]); }
  };
  useEffect(() => {
    const numberSubscription = numberObservable.subscribe({ ...consumer });
  }, []);
  return (
    <div className="App">
      {messages.map((i) => (
        <p>{i}</p>
      ))}
    </div>
  );
}
```

Now the result should be ```1``` => ```2``` => ```done``` (```3``` will not shows, cause ```subscriber.next(3)``` command executed after ```complete``` / ```error``` one  ) 

So start to create my own Observable class (```MyObservable```)
```js
class MyObservable {
  constructor(handler) {
  }
  subscribe(subscriberFn) {
  }
}
```

First step is implementing the constructor. The original Observable class take 1 function as argument. So in ```MyObservable``` class  constructor, a handler is created to save that function. The handler has a (bool)isStopped flag to indicate that it's ```complete```/```error``` or still active
```js
  constructor(handler) {
    this.handler = handler;
    this.handler.isStopped = false;
  }
```

Next step is implementing the subscribe method. The original subscribe method take a consumer (which is just an object include 3 pure functions: next, complete, error) as argument. So we have to modify those 3 a bit to make sure the next function can only be executed if it's not completed or got an error. 
When an error/complete command executed, ```isStopped``` flag update to true, then after that, omit the ```next``` function execution 
```js
  subscribe(subscriberFn) {
    const err = subscriberFn.error;
    const comp = subscriberFn.complete;
    const n = subscriberFn.next;
    subscriberFn.error = (value) => {
      if (!this.handler.isStopped) {
        this.handler.isStopped = true;
        err(value);
      }
    };
    subscriberFn.complete = () => {
      if (!this.handler.isStopped) {
        this.handler.isStopped = true;
        comp();
      }
    };
    subscriberFn.next = (value) => {
      if (!this.handler.isStopped) {
        n(value);
      }
    };
    this.handler(subscriberFn);
  }
```
Finally, replace the original ```Observable``` by ```MyObservable```. You should see the same result.

**B. Unsubscription.** 

Next part is unsubscription.
Pls check the orginal doc https://rxjs.dev/guide/subscription
From the doc, we could modify the original observable above this 
```js
const numberObservable = new MyObservable((subscriber) => {
  ...
  return () => {
    console.log("logic unsubscribe number");
  };
});
```
Then if we modify the react view like this: 
```js 
useEffect(() => {
    const numberSubscription = numberObservable.subscribe({ ...consumer });
    setTimeout(() => {
          numberSubscription.unsubscribe();
    }, 2000);
  }, []);
```

We should see the output ```logic unsubscribe number``` printed after 2 sec, at console.log tab.
Note that, Subscriptions can also be put together, so that a call to an unsubscribe() of one Subscription may unsubscribe multiple Subscriptions. 
So if we have an other subscription (let say letterSubscription of letterObservable) 
```js
const letterObservable = new MyObservable((subscriber) => {
  subscriber.next("A");
  return () => {
    console.log("logic unsubscribe letter");
  };
});
```
```js
useEffect(() => {
    const numberSubscription = numberObservable.subscribe({ ...consumer });
    setTimeout(() => {
      numberSubscription.unsubscribe();
    }, 2000);
    const letterSubscription = letterObservable.subscribe({ ...consumer });
    numberSubscription.add(letterSubscription);
  }, []);
```
We should see the output ```logic unsubscribe number``` => ```logic unsubscribe letter``` printed after 2 sec, at console.log tab.

So start to modify ```MyObservable``` again 

We have unscribeList list to tore all supscription
```js
constructor() {
    ...
    this.unscribeList = [];
} 
```

And then subscribe method in turn, will return an object of 2 functions: 1 for add an subscription, and the other is for unsubscribe all of them. 
```js
subscribe(subscriberFn) {
    ...
    const unsubscribeFn = this.handler(subscriberFn);
    return {
      unsubscribe: () => {
        this.handler.isStopped = true;
        unsubscribeFn();
        this.unscribeList.map((fn) => fn.unsubscribe());
      },
      add: (fn) => {
        this.unscribeList.push(fn);
      }
    };
}
```

Finally, replace the original ```Observable``` by ```MyObservable```. You should see the same result again.
Check the sandbox https://codesandbox.io/s/rxjs-rewrite-observable-v6jqd?file=/src/App.js:225-248 for the implementation.