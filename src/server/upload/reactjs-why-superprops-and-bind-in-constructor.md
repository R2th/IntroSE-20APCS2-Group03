This article tries to answer some **WHY** questions making me confused at the first time that I learn ReactJS about *super(props)* and *bind* method in *constructor*.

This post just explain some lines of code based on JavaScript knowledge. I do not go to deep theories, therefore, you need to read it through recommended articles below in case you are not familiar with these definitions before.

## Requirements knowledge:
- [***this*** in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
- [bind() method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

# 1. Why should we bind methods in constructor?
![image.png](https://images.viblo.asia/3be9a738-80df-44b4-826d-26cb21e62f35.png)

As we have already known:
> ***this*** in a normal function is determined by how it is called, no matter where it is written. 

In the code above, handleRemoveAll() is fired by the click event of *<button>*. Therefore in this case, ***this*** is not point to class Options but to event.target. 

For that reason, using bind method to force ***this*** on handleRemoveAll method points to the class Options. 

# 2. Why do we have to call super() on constructor?
Some questions that spring to my mind when I see super() in constructor at the first time: *'Why do we call super() on constructor although everything seems okay without constructor before ?'*

I start to search and common answers on Internet say that: 
> We cannot use ***this*** in constructor until super() is called


But **WHY?**

So let jump into this example with me.

**Imaging that we can use *this* in constructor without calling super()**

![image.png](https://images.viblo.asia/262462f5-3fe3-4eda-b2a7-cc8f78afd481.png)
=> The code above is ok, everything works well.

But what happens when we access ***this.name*** in actionType method

![image.png](https://images.viblo.asia/986e593b-293c-4a43-a3ec-1db75201f680.png)

Well, definitely it will come into error. Because Dog class does not have *name* property. We only can use **this.name** when call **super** first to inherit *name* property from parents class.

Therefore,

> JavaScript enforces that if you want to use ***this*** in a constructor, you have to call super first

   This makes sure the program run smoothly at all times. 
    
# 3. Why 'props' is passed to super()?
Once again, the answer on the Internet is:
> Passing *props* to super helps us use *this.props* in constructor, otherwise, it will become undefined

**WHY? Why we can call this.props outer constructor but it turns into undefined inside the constructor?**

On ReactJs Document:
> The constructor for a React component is called before it is mounted (Inserted into the tree)

Therefore, this ensures **this.props** is set even before the constructor exits.

-----------------

That's all I want to share with you in this post :grinning:

**Reference:**

1. [Why Do We Write super(props)](<https://overreacted.io/why-do-we-write-super-props/>)
2. [Why do we have to ‘bind’ our functions in React apps?](https://levelup.gitconnected.com/why-did-we-have-to-bind-our-functions-in-react-apps-ee32978af12e)