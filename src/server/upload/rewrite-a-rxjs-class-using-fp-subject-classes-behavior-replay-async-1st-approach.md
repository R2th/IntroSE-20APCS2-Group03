This is my experiment rewriting a part of rxjs lib with pure js, that provide same effect as the original one

At previous post, I'm implemented BehaviorSubject, ReplaySubject, AsyncSubject using OOP. You can have a look at https://viblo.asia/p/rewrite-a-rxjs-class-subject-classes-behavior-replay-async-6J3Zg3pqZmB.

Today, I will try to redo all of those things using functions only. The reasons is I want to take advantages of functional programming's composition over oop inheritance. Pls check https://ui.dev/javascript-inheritance-vs-composition/ to have more details 

My first attemp is convert all of those classes to functions, using object spreading, to see if it looks good? 

Full implementation is at **https://codesandbox.io/s/rxjs-fp-rewrite-subjects-1st-approach-rw11d**

1. A base object **```myObject```**
    ```js
    const mySubject = {
      isStopped: false,
      subscribers: [],
      value: [],
      subscribe(obj) {
        this.subscribers.push(obj);
        return () => this.subscribers.pop();
      },
      getValue: () => this.value[this.value.length - 1],
      next(nextValue) {
        if (!this.isStopped) {
          this.value.push({ nextValue: nextValue, timestamp: Date.now() });
        }
      },
      error(e) {
        if (!this.isStopped) {
          this.isStopped = true;
          this.subscribers.forEach((obj) => obj.error(e));
        }
      },
      complete() {
        if (!this.isStopped) {
          this.isStopped = true;
          this.subscribers.forEach((obj) => obj.complete());
        }
      }
    };
    ```
2. A 2nd base object **```mySyncSubject```**

    Note that: with classes and OOP, you call ```super.next(nextValue)``` without any trouble, because child class and base class that it extends share same state. But it will not be the same when we call ```mySubject.next(nextValue)```. The scope state inside ```next``` function is totally different from outer scope (which supposed to be mySyncSubject). 
    
    So the command should add ```bind``` (```mySubject.next.bind(this)(nextValue)```)   to make sure every function call effects to same state
    ```js
    const mySyncSubject = {
      ...mySubject,
      next(nextValue) {
        mySubject.next.bind(this)(nextValue); // this become mySubject
        if (!this.isStopped) {
          this.subscribers.forEach((obj) => obj.next(nextValue));
        }
      }
    };
    ```

3. **```myAsyncSubject```**

    ```js
    const mySyncSubject = {
      ...mySubject,
      next(nextValue) {
        mySubject.next.bind(this)(nextValue);
        if (!this.isStopped) {
          this.subscribers.forEach((obj) => obj.next(nextValue));
        }
      }
    };
    ```
4. **```myReplaySubject ```**

    ```js
    function myReplaySubject(bufferSize, timeLimit = -1) {
      return {
        ...mySyncSubject,
        bufferSize: bufferSize,
        subscribe(fn) {
          this.value
            .slice(Math.max(this.value.length - this.bufferSize, 0))
            .filter((i) =>
              timeLimit > 0 ? Date.now() - i.timestamp < timeLimit : true
            )
            .map((i) => fn.next(i.nextValue));
          mySyncSubject.subscribe.bind(this)(fn);
        }
      };
    }
    ```
5. **```myBehaviorSubject ```**

    ```js
    function myBehaviorSubject(defaultValue) {
      return {
        ...myReplaySubject(1, -1),
        value: [{ nextValue: defaultValue, timestamp: Date.now() }]
      };
    }
    ```

Now let's check a case like this. We want to have a ReplayAsyncSubject, which receive values when subscribe, and after that, only receives last value when the subject completed. 
So basicly, ReplayAsyncSubject will have methods of ReplaySubject and AsyncSubject. 
As we know that with OOP, we can implement multiple classes, but can only extends 1 class. 

So if one time in the future, we have to make smt like ReplayAsyncSubject, So we have to redesign the entire inheritance hierarchy to feed the new requirements. 

Let see if ```FP``` can make it more easier. 

```js
function myReplayAsyncSubject(bufferSize, timeLimit = -1) {
  return {
    ...myReplaySubject(bufferSize, timeLimit = -1),
    next(nextValue) {
      mySubject.next.bind(this)(nextValue);
    },
    complete: myAsyncSubject.complete
  };
}
```

Let's take the same test case of ReplaySubject 
```js
const subject = myReplayAsyncSubject(3); // buffer 3 values for new subscribers

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`)
});
subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`)
});

subject.next(5);
subject.complete();
```

We should see the result like this 
```
observerB: 2 
observerB: 3 
observerB: 4 
observerA: 5 
observerB: 5 
```

It worked, and the ```myReplayAsyncSubject``` is pretty straightforward. One problem with this approach is we used ```this``` too much. ```This``` somehow has potential trouble if we dont care carefully to the context when we execute function. So I guess at the 2nd attemp, I will try to get rid of ```this```