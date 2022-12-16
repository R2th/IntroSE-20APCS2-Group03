This is my experiment rewriting a part of rxjs lib with pure js, that provide same effect as the original one

I made a simple version of BehaviorSubject before (https://viblo.asia/p/rewrite-a-rxjs-class-behaviorsubject-6J3Zg3NBZmB).

Today I will implement others type of Subject including: BehaviorSubject, ReplaySubject, AsyncSubject using OOP.
I guess I will try to make another one using FP as well. 

For the test cases, pls check the original doc https://rxjs.dev/guide/subject

Full implementation is at **https://codesandbox.io/s/rxjs-rewrite-subjects-u206x**

**A. Overall**

These are all classes I created: 
1. A base class **```MySubject```** that have these methods: 
    ```js
    class MySubject {

      subscribe(obj) { //store subscriber's callbacks and provide unsubscribe function 
      }

      next(nextValue) { //push new value provided to value list 
      }

      error(e) {//manage subject status (stopped or not)  and trigger subscriber's callbacks accordingly
      }

      complete() {//same as error
      }
    }
    ```
2. A 2nd base class **```MySyncSubject```** extends ```MySubject```

    ```js
    class MySyncSubject extends MySubject {
      next(nextValue) {// override next method to trigger subscriber's next callback
      }
    }
    ```
3. **```MyReplaySubject```** extends ```MySyncSubject``` 
    ```js
    class MyReplaySubject extends MySyncSubject {
      subscribe(fn) {// override subscribe method to broadcast values based on bufferSize and timeFilter
      }
    }
    ```
4. **```MyBehaviorSubject```** extends ```MyReplaySubject```
    
    This is ```BehaviorSubject``` rewritted, a special one of ```MyReplaySubject``` which have ```bufferSize = 1``` and no ```timeFilter```
5. **```MyAsyncSubject```** extends ```MySubject```
    ```js
    class MyAsyncSubject extends MySubject {
      complete() {//override complete method to broadcast the last value to all subscribers when subject completed
      }
    }
    ```    
**B. Details**
1. **```MySubject```**
    ```js
    class MySubject {
      constructor() {
        this.isStopped = false;
        this.subscribers = [];
        this.value = [];
      }

      subscribe(obj) {//store subscriber's callbacks and provide unsubscribe function
        this.subscribers.push(obj);
        return () => {
          this.subscribers.pop();
        };
      }

      next(nextValue) {//push new value provided to value list
        if (!this.isStopped) {
          this.value.push({ nextValue: nextValue, timestamp: Date.now() });
        }
      }
      error(e) {//manage subject status (stopped or not)  and trigger subscriber's callbacks
        if (!this.isStopped) {
          this.isStopped = true;
          this.subscribers.forEach((obj) => obj.error(e));
        }
      }

      complete() {
        if (!this.isStopped) {
          this.isStopped = true;
          this.subscribers.forEach((obj) => obj.complete());
        }
      }
    }
    ```
 2. **```MySyncSubject```** 
     ```js
     class MySyncSubject extends MySubject {
      next(nextValue) {// override next method to trigger subscriber's next callback
        super.next(nextValue);
        if (!this.isStopped) {
          this.subscribers.forEach((obj) => obj.next(nextValue));
        }
      }
    }
     ```
 3. **```MyReplaySubject```** 
     ```js
     class MyReplaySubject extends MySyncSubject {
      constructor(bufferSize, timeLimit = -1) {
        super();
        this.bufferSize = bufferSize;
        this.timeFilter = (i) => {
          return timeLimit > 0 ? Date.now() - i.timestamp < timeLimit : true;
        };
      }
      subscribe(fn) {// override subscribe method to broadcast values based on bufferSize and timeFilter
        this.value
          .slice(Math.max(this.value.length - this.bufferSize, 0))
          .filter(this.timeFilter)
          .map((i) => fn.next(i.nextValue));

        super.subscribe(fn);
      }
    }
     ```
 4. **```MyBehaviorSubject```** 
     ```js
     class MyBehaviorSubject extends MyReplaySubject {
      constructor(defaultValue) {// override bufferSize = 1 and no timeFilter
        super();
        this.value = [{ nextValue: defaultValue, timestamp: Date.now() }];
        this.bufferSize = 1;
        this.timeFilter = () => true;
      }
    }
     ```
 5. **```MyAsyncSubject```**  
     ```js
     complete() {//override ```complete``` method to broadcast the last value to all subscribers when subject completed
        super.complete();
        this.subscribers.forEach((obj) =>
          obj.next(this.value[this.value.length - 1].nextValue)
        );
      }
     ```