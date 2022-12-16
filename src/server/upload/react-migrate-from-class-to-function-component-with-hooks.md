## Getting Started
Throughout many years React has undergone many development and improvement. Since the release of version 16.8.0, **hooks** function was introduced and the React community has shift from **class** based to **function** based component, but most of the documents that we can find on the web still wrote in the class based style this can make it hard for developers to adapt to the new approach. In this article we will explore on how to migrate code that have written using class to function based component with hooks

## What is Hooks?
Hooks are javascript functions that let you use state without writting a class and extract a component logic into reusable functions that can be use in another component. There are two rules you need to follow when using hooks.

### Must be Call at the Top
Only call hooks function at the top of your React function, don't call it in a loop, condition, nested function or after any early return. By following this rule, it allows React to correctly preserve the state of Hooks between multiple **useState** or **useEffect** calls.

### Only Use with Function Component
Don't call hooks from regular javascript function or class based component. You can however call hooks function in

1. React Function Component
2. Inside another hooks function

## Class VS Function
First lets take a look at how to declare react component. The class style needed to declare render function and return component while function style just return component back directly.

### Class Style
```JS
class HelloComponent extends Component {
  render() {
    return (
      <h1>Hello, world!</h1>
    )
  }
}
```

### Function Style
```JS
function HelloComponent() {
  return (
    <h1>Hello, world!</h1>
  )
}

// or
const HelloComponent = () => (
  <h1>Hello, world!</h1>
)
```

## State & Props
Next lets look at how to define, use and update component state or props

### Class Style
```JS
class HelloComponent extends Component {
  constructor(props) {
    // this line is important
    super(props);
        
    // define initial state
    this.state = {
      name: 'world!'
    };
  }
    
  render() {
    // use `name` state here
    return (
      <h1>Hello, {this.state.name}</h1>
    )
  }
}
```

To update state we can call **setState** method
```JS
class HelloComponent {
  onChange(event) {
      const { value } = event.target;
      this.setState({ name: value });
  }
}
```

To use **name** as a prop just access it using **this.props** as class property like this
```JS
  // code here
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    )
  }
```

### Function Style
To introduce state into function component we use **useState** hooks function. This function will return array as a result with the first element as a state object and the second element as a function to update that particular state.

```JS
import React, { useState } from 'react';

function HelloComponent() {
  const [name, setName] = useState('world!');

  return (
    <h1>Hello, {name}</h1>
  )
}
```

To update state we can call **setName** function
```JS
  // code above
  const onChange = (event) => {
    setName(event.target.value);
  }
  // code below
```

To use **name** as a prop, just make function component receive the first parameter as props
```JS
function HelloComponent(props) {
  return (
    <h1>Hello, {props.name}</h1>
  )
}
```

## Event Handler & Refs
The next thing is how to define event handler and get a reference to DOM element.

### Class Style
There are commonly two ways to declare event handler in class based component.

First is to create a class method and bind a class instance to it in constructor
```JS
class HelloComponent extends Component {
  constructor(props) {
      super(props);
      
      // bind `onChange` context to class instance
      this.handleChange = this.onChange.bind(this);
  }
  
  onChange() {
    // code here
  }
}
```

Or using ES6 arrow function to create an instance property and use it as event handler
```JS
class HelloComponent extends Component {
  handleChange = () => {
      // code here
  }
}
```

To get a reference to DOM element use **createRef**
```JS
import { Component, createRef } from 'react';

class HelloComponent extends Component {
  constructor(props) {
    super(props);
    
    this.txtInput = createRef();
  }
  
  render() {
    return (
      <input ref={this.txtInput} placeholder="Enter your name" />
    )
  }
}
```

### Function Style
Defining event handler in function component is pretty straightforward. Just create a nested function and pass it as event handler.
```JS
function HelloComponent() {
    const handleChange = (event) => {
      // code here
    }
}
```

To get a reference to DOM element use **useRef**
```JS
function HelloComponent() {
  const txtInput = useRef(null);

  return (
    <input ref={txtInput} placeholder="Enter your name" />
  )
}
```

## Component Lifecycle
The idea of lifecycle functions are more visible in the context of a class based component and different from function component. See *function style* section for the reason why.

### Class Style
To make use of lifecycle function, just define class instance method with the correct lifecycle function name listed in [the doc](https://reactjs.org/docs/react-component.html)
```JS
class HelloComponent {
  componentDidMount() {
    // code here
  }
  
  componentDidUpdate() {
    // code here
  }
  
  componentWillUnmount() {
    // code here
  }
}
```

### Function Style
In function component it takes a different approach. When dealing with function component such lifecycle usually triggered based on the changes that affect component's state or props, hence the new concept is introduced and it is called **effect**. Effect is all about monitoring component's state or props that pass as list of dependencies. We can use **useEffect** to achieved this.

```JS
import { useState, useEffect } from 'react';

function HelloComponent({ fullName }) {
  const [name, setName] = useState('');

  // equivalent to `componentDidMount`
  useEffect(() => {
    // code here
    
    // return clean up function which
    // is equivalent `componentWillUnmount`
    return () => {
      // clean up code
    }
  }, []);
  
  // equivalent to `componentDidUpdate` but limited
  // to change to `name` or `fullName`
  useEffect(() => {
    // code here
  }, [name, fullName]);
}
```

The first argument is callback function to run the the dependencies change and the second argument is array of dependencies to monitor. The callback function may return a clean up function that will be called when component is destroyed.

## Conclusion
Beside the change to state management with the introduction of hooks along with component lifecycle there is nothing different between class vs function based component and I hope you will find this article useful as a building block that you can use in your next project.