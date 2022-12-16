### Implementation
The observer pattern is a software design pattern in which an object, called the subject, maintains a list of its dependents, called observers, and notifies them automatically of any state changes, usually by calling one of their methods. [-wikipedia](https://en.wikipedia.org/wiki/Observer_pattern)

Basically, if you've ever worked with `PubSub` , it's the same thing. It's one of the 23 pattherns defined in `Gang of four` pattern book.
And it's used when, You need to maintain a one to many relation between objects.
#### Benefits:
 -  It supports the principle of loose coupling between objects that interact with each other
 -  It allows sending data to other objects effectively without any change in the Subject or Observer classes
- Observers can be added/removed at any point in time

[- Learning Python Design Patterns - O'Reilly](https://www.oreilly.com/library/view/learning-python-design/9781785888038/ch06s06.html)

Let us create the Subscriber first. From the definition we realize the Publisher should have a list of subscribers, So lets just do that.
```JS
function Publisher() {
  this.subscribers = [];
}
```

Now, there should be an easy way to append a new subscriber to the `subscribers` array. Let's add that too.
```JS
function Publisher() {
  this.subscribers = [];

  this.subscribe = (subscriber) => {
    this.subscribers.push(subscriber)
  }
}
```

The same way, subscribers should be able to unsubscribe easily.
```JS
this.unsubscribe = (unsubscriber) => {
  this.subscribers = this.subscribers.filter(subscriber => {
    if(subscriber !== unsubscriber) {
      return subscriber;
    }
 })
}
```

And, finally, the publisher should be able to publish.
```JS
this.publish = () => {
  this.subscribers.forEach(sub => sub.call())
}
```

So, the final code should look like
```JS
function Publisher() {
  this.subscribers = [];

  this.subscribe = (subscriber) => {
    this.subscribers.push(subscriber)
  }

  this.unsubscribe = (unsubscriber) => {
    this.subscribers = this.subscribers.filter(subscriber => {
      if(subscriber !== unsubscriber) {
        return subscriber;
      }
    })
  }

  this.publish = () => {
    this.subscribers.forEach(sub => sub.call())
  }
}
```

In short, each of the `publisher` object will have it's own list of `subscribers`, on which it can append or remove subscribers easily, and when the `publish` method is invoked, each of the subscribers should be notified.

Now, let's create our subscribers. For brevity, we'll be using `console.log` instead of actual api calls :) 
``` JS
const subscriberOne = () => {
  console.log("calling subscriber one")
}

const subscriberTwo = () => {
  console.log("calling subscriber two")
}
```

And Voila!. we're done. Now let's put it on test

```JS
p = new Publisher();

// subscrbe
p.subscribe(subscriberOne);
p.subscribe(subscriberTwo);

// unsubscribe
p.unsubscribe(subscriberTwo);

p.publish()
=> "calling subscriber one"
```

### Live code
You can find the implementation here, modify it as you want and play.

https://repl.it/@SSalekin/ObserverPatternJs

### Useful resources
[Wikipedia (as always)](https://en.wikipedia.org/wiki/Observer_pattern)

[Medium article  'The Observer Pattern' by Steven Levia](https://medium.com/@StevenLeiva1/the-observer-pattern-bfbf5ee5e90f)

This excellent youtube video
{@embed: https://www.youtube.com/watch?v=WRkw0l72BL4}