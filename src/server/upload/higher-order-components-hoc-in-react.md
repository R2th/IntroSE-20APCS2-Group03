# 1. Introduction

In ReactJS, **Higher-Order Component (HOC)** is a pattern used with the intent to share common functionality between components while eliminating the posibility of DRY. Despite its name including "component" phrase, a Higher-order Component is no component but *a function which takes a component as an argument and returns another component, thus, providing the ability to transform components as well as adding additional data or functionality*.

![](https://images.viblo.asia/eeab64c5-a5f9-4650-9aa6-33281d0da428.png)

# 2. Higher-order Functions
> According to Wikipedia, in Mathematics and Computer Science, a **Higher-order Function* is a function that either takes one or more function as its arguments or returns another function as the result of both**.

Working on Front-end side, you must have probably been accustomed with using Higher-Order Function in one form or another (or course, that is they way Javascript works, duh...). Passing anonymous functions or callbacks as arguments or a function returning another function as result, all of these fall under the categories of Higher-Order Function. For example,

creating a new array with the results of calling a provided function (callback) on every element,

```javascript
const arr = [1, 2, 3];
console.log(arr.map(item => item + 1)); // [2, 3, 4]
```

assign event listener to DOM element by passing callback function,
```javascript
document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('#login-btn')
    .addEventListener('click', () => console.log('Login btn clicked!'));
});
```

or the infamous Closure pattern.
```javascript
const subtractCalculator = () => (a, b) => a - b;

const subtract = subtractCalculator();
console.log(subtract(10, 5)); // 5
```

Let's dig a little deeper in order to have a better perspective of its mechanism and advantages:

```javascript
const add = (...params) => params.reduce((previous, element) => previous + element, 0));

const multiply = (...params) => params.reduce((previous, element) => previous * element, 1));

const calculator = inputFunc => (...params) => inputFunc(...params);
```

We have `add` and `multiply` functions perform arithmetic operations as per their respective name, while the `calculator` function accepts functions as its input and return another function as the output. This is exactly a polymorphism of higher order function. All you have to do is plug in `add` or `multiply` and `calculator` will happlily take it from there:

```javascript

// input functions is invoked with parameters passed down
console.log(calculator(add(1, 2, 3, 4, 5)); // 15
console.log(calculator(multiply(1, 2, 3, 4, 5)); // 120
```

So in summary, `calculator` play the role of a container which extends the functionality of `add` and `multiply`, giving us the capability of dealing with problems at a higher or more abstract level, hence the name **Higher-order Function**. In this situation, the advantages of using Higher-order Function include:
- Enhancement in code readability as well as reusability.
- Enhancement in maintainability, as you can now add extra functionalit common to all arithmetic operations at the container level.

Ok, now that you have probably have a better view on this, let move on to the next section to discover what the **Higher-order Component** in React is capable of.
# 3. Higher-order Components
So how about a Higher-order Component? Similar to that of a higher order function, a **Higher-order Component (HOC)** is a function that takes a component as an argument and returns a new component. 

Two HOC’s implementations that you may be familiar with in the React ecosystem are `connect` from Redux and `withRouter` from React Router. The `connect` function from Redux is used to give components access to the global state in the Redux store, and it passes these values to the component as props. The `withRouter` function injects the router information and functionality into the component, enabling the developer access or change the route.

Consider you are writing a user comment feature for your application. So you will write something like this.

```javascript
/*
* comment-box.js
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postComment } from '../actions/comment';

class CommentBox extends Component {
  static propTypes = {
    postComment: PropTypes.func.isRequired
  }
  
  constructor() {
    super();
    
    this.state = {
      username: '',
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, comment } = this.state;
    
    this.props.postComment({ username, comment });
  }
  
  render() {
    const { username, comment } = this.state;

    return (
      <div className="comment-form">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="form-group">
            <input type="text" name="username" id="username" value={username} onChange={() => this.handleChange(e)} />
          </div>
          <div className="form-group">
            <input type="text" name="comment" id="comment" value={comment} onChange={() => this.handleChange(e)} />
          </div>
          <div className="form-group">
            <button type="submit">Comment</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  postComment: dispatch(postComment(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentBox)
```

As you can figure out from the `render` method, the representation of this component is a form with 2 input fields and 1 submit button. What if one day, you have to include the exact same functionality but with different UI in a different part of your application. Changes are you might end up creating *stateless components* for each of the two forms and then pass the handlers as props to these component. A right approach to go with but actually doesn't look so clean, does it? And not cool, either...

Have a look how we can work out the problem by implementing an HOC.

```javascript
/*
* comment-hoc.js
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postComment } from '../actions/comment';

const CommentHOC = (PassedComponent) => {
  class CommentBoxContainer extends Component {
    static propTypes = {
      postComment: PropTypes.func.isRequired
    }

    constructor() {
      super();

      this.state = {
        username: '',
        comment: ''
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      const { username, comment } = this.state;

      this.props.postComment({ username, comment });
    }

    render() {
      const { username, comment } = this.state;
      return (
        <PassedComponent
          username={username}
          comment={comment}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }
  
  const mapStateToProps = () => ({});
    
  const mapDispatchToProps = dispatch => ({
    postComment: dispatch(postComment(data))
  });
  
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommentBoxParent);
}

export default CommentHOC;
```

```javascript
/*
* comment-box.js
*/
import React, { Component } from 'react';

import CommentHOC from './CommentHOC';

const CommentBox = ({ username, comment, handleChange, handleSubmit }) => (
  <div className="comment-form">
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group">
        <input type="text" name="username" id="username" value={username} onChange={(e) => handleChange(e)} />
      </div>
      <div className="form-group">
        <input type="text" name="comment" id="password" value={comment} onChange={(e) => handleChange(e)} />
      </div>
      <div className="form-group">
        <button type="submit">Comment</button>
      </div>
    </form>
  </div>
);

export default (CommentHOC(CommentBox));
```

and that’s it. No matter how many comment forms you need in you app, just that new comment form component with this `CommentHOC` and you will be able to access to all the props that you are passing from HOC.

# 4. Summary
We have learnt the basic concept of HOC - a popular advanced technique for building reusable components. One thing to keep in mind is that a HOC should be a pure function with no side-effects. In another word, it should not make any modifications and just compose the original component by wrapping it in another component.

References:
[React HOC](https://reactjs.org/docs/higher-order-components.html)