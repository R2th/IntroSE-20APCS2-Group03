# What is Props and State in React?
Meeting props and state when taking your baby steps as a ReactJS developer is inevitable. They are both met with enthusiasm and a bit of confusion by most developers, why? Probably because they look the same but are used differently, or maybe because they follow an entirely different pattern from other JavaScript frameworks, could be another reason. In this post, I will try to clear the air on props and state, what works where and why. With demos to help, we are going to walk through both basic and advanced ideas in props and state and understand how both of them actually work.
# Props Explained
sdfwewewefwefShort for properties, props can best be defined as a way of passing data from component to component, basically from parent to child component. I think the simplest explanation of how props work is this demo culled from the [React docs](https://reactjs.org/docs/components-and-props.html)
```js
class BasicProp extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}

React.render(<BasicProp name="Jake" />, document.getElementById('app'));
```
In the demo above, you can see that the line <BasicProp name=`"Jake"/>creates a property in the form ofnameand valueJake`. Props and Components are similar to arguments and functions. Rewriting this as a function taking an argument gives us:

```js
 function BasicProp(props) {
    return <h1>Hello {props.name}</h1>
  }
```

So we create a component that accepts a property name and later in our code, we invoke the component by passing the name property. It’s a general notion that props are always passed from parent to child but this may not always be the case. Using the getDefaultProps configuration value, components can also have default props so even if a props isn’t passed through from a parent component, it can still be set in the component it’s required. Check out the CodePen demo below:
```js
var Garage = React.createClass({
    getDefaultProps:function(){
        console.log(this.props); //note this logs undefined
        return {car:'Mercedes Benz GLE 43'};
    },
    render: function() {
        return <div>{this.props.car}</div>;
    }
});

var AutoList = React.createClass({
    render: function() {
        return (<div>
            <Garage />
            <Garage car="BMW M5" />
        </div>);
    }
});

ReactDOM.render(<AutoList />, document.getElementById('app'));
```

In the demo above, the default props is set on this.props if no prop is sent into the component. If we remove the car prop from the render function in the Garage component of AutoList, it will revert to the default car Mercedes Benz GLE 43. Please note that the getDefaultProps is run before any instances are created thus using this.props inside of the getDefaultProps will not work.

Another distinct feature of props is that they are immutable. In the past you could change props with setProps and replaceProps but these have been deprecated. The React philosophy is that props should not change, parent components can send prop values to child components but the child cannot modify its own props. Components that use only props will always render the same output when given the same input and this makes them easier to test.

#### Recap:
* Props are mainly used for passing data from component to component.
* getDefaultProps is invoked once and cached when the component is created.
* Props are immutable and should only be sent from parent to child component.

# State Explained
If props hold immutable data and are rendered by components, then state stores data about the component that can change over time. Change could come in the form of user events or system events such as response to user input or server requests. Working with a state’s component normally involves setting a component’s default state, accessing the current state and updating the state. I think the most suitable way to explain state in React would be the demo of a counter. In the process of creating a counter that renders the current count value each time a button is clicked, a self contained component class is created. Let’s go ahead and take a look at the demo:


The first thing we must do is to initialize our state data before we can use it in render(). To set the initial state, we use this.state in the constructor with our React.Component syntax. If you’re getting logic from a parent component, be sure to call the super() method with props:

```js
 class Counter extends React.Component {
    constructor(props) {
      super(props)
      this.state = { ...
      }
    }
    render() { ...
    }
  }
```

When setting the initial state we can also add logic, a good example is the initial value of count in our application:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
      }
    }
    render() { ...
    }
  }
```

Generally, the constructor() method is invoked when a component class is created. Most times when a constructor() is invoked, the super() method is invoked inside of it else the parent’s constructor won’t be executed. The value of this.state must be an object.

To update our state, we use the this.setState(data, callback) method. When this method is called, React merges data with current states and calls render(). After that, React calls callback.

Having the callback in setState() is important because the methods work asynchronously. You can use the callback to make sure a new state is available before using it. If you rely on a new state without waiting for setState() to finish its work, you would be working synchronously with asynchronous operations and that implies you might have a bug when the state is still an old state.

The value of this changes depending on where a function is called from. Context relating to our component is bound to this to ensure that this is in sync with our component.

```js
class Counter extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0
      }
    }
    increment() {
      this.setState({
        count: this.state.count += 1
      })
    }
    decrement() {
      this.setState({
        count: this.state.count -= 1
      })
    }
    render() { ...
    }
  }
```

A warning about setState():

With time the idea might come to input stuff like this.state.count = this.state.count + 1, don’t do it. The reason is that React cannot listen to the state getting updated in this way so your component will not re-render. Be sure to always use setState()

# Differences between Props and State
With a lot of “theory” differences between Props and State, let’s proceed to highlight the differences between props and state:



| PROPS | STATE | 
| -------- | -------- |
| Props are used for passing data to child components | State is used for defining the shape of data both initially and upon user interaction.     | 
| Props are usually passed down from “above” parent components     | State is created in the component, it gets its initial data in the constructor() method     |
| Props are immutable to the component receiving them. You don't change props passed to a component from within the component      | State is changeable, React uses the setState() method to update the object of a state. State can only be mutated by the component that contains the state. It is private in this sense. |

A word of caution: for best practice, State should be avoided if at all possible. It’s best to use stateless components in your application because, stateful components create complexity. The React documentation suggests: "A common pattern is to create several stateless components that just render data, and have a stateful component above them in the hierarchy that passes its state to its children via props. The stateful component encapsulates all of the interaction logic, while the stateless components take care of rendering data in a declarative way."

### Summary
Although they do similar things, Props and State are used differently. When building an app, most of your components will probably be stateless. Props pass data from parent to child components. They are immutable and thus will not be changed. State **handles data that will change. This is particularly useful for private data such as user input. A good case study is a registration form where the user will type in data and state helps update what they see.

### References
[reactjs.org](https://reactjs.org/)