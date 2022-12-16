Hooks are the newest addition to react v16.8. Uisng hooks it's possible to organize logical components much easily, while making the components much smaller, easier to understand and easier to test. With this we can manage a small to medium projects state easily, keep the components small and concise, and more.

Here's a direct quote from Dan "Hooks apply the React philosophy (explicit data flow and composition) inside a component, rather than just between the components. That’s why I feel that Hooks are a natural fit for the React component model.

Unlike patterns like render props or higher-order components, Hooks don’t introduce unnecessary nesting into your component tree. They also don’t suffer from the drawbacks of mixins." - taken from [here](https://css-tricks.com/intro-to-react-hooks/).

Also, you can read the official post.
[Introducing Hooks](https://reactjs.org/docs/hooks-intro.html)

# Why functional components are better

1. Easy to understand

2. Easy to test

3. Has better performance than Class components

 4. 101 more reasons about why functional components are better than class components can be read [here](https://hackernoon.com/why-react-hooks-a-developers-perspective-2aedb8511f38) and [here](https://programmingwithmosh.com/react/react-functional-components/)

# How to use
We discuss the new hooks api in short.
### useState()
is a special function that lets you add the react state into functional components, which wasn't possible before. Previously if we wanted to use state in a component, we had to make sure it was a class component, functional components weren't able to use this feature. Now with `useState()` method, we're able to use the application state inside our functional component. Here you can see the difference,

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}
```

we can do the same thing now with

```js
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);
}
```

When we call the `useState()` method, it declares a state variable (here we are using count, but it can be of any name). Also, calling the method returns a couple of values: the current state (`count`), and the function that updates it (`setCount`).

This does the job of `this.state.count` and `this.setState` like we used in class components before.

So, to read the state we can use
```js
<p>You clicked {count} times</p>
```

instead of,
```js
<p>You clicked {this.state.count} times</p>
```

And update using

```js
<button onClick={() => setCount(count + 1)}>
  Click me
</button>
```

instead of the previous

```js
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
  Click me
</button>
```

For more detailed explanation, read [Using the State Hook](https://reactjs.org/docs/hooks-state.html)

### useEffect()
The Effect hook lets us use side effects from a functional component. It's purpose is similar to the lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillMount`) in class components.

```js
useEffect(didUpdate);
```

we can also decide when to re-render a component using `useEffect`

```js
useEffect(() => {
  document.title = `Clicked ${count}`;
}, [count]);
```
this will only re-run when the count value is updated.

Often, effects generate resources that needs to be purged before the component gets unmounted. Example: Subscription or timer id. For this, the function paseed in `useEffect` can run the cleanup function, example:

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```

more detailed explanation [here](https://reactjs.org/docs/hooks-reference.html#useeffect)


### useContext()

Since the birth of react, one thing developers complained consistantly was passing data throgh many level of components. Before we could only do this by passing props to all the nested child components. Or, we had to use another library like redux to handle this for us, which tbh, is too much work and boilerplate for small apps. That's why with the latest version of react we can use the context api to handle this situation.
Here's an example

```js
// App.js
import React from 'react'

const CurrentRoute = React.createContext({ path: '/welcome' })

export default function App() {
  return (
    <CurrentRoute.Consumer>
      {currentRoute =>
        currentRoute.path === '/welcome' &&
        "Welcome!"
      }
    </CurrentRoute.Consumer>
  )
}
```

```js
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

which, if we had to use props drilling, had to be done like this mess

```js
// App.js
import React from 'react'

const CurrentRoute = React.createContext({ path: '/welcome' })
const CurrentUser = React.createContext(undefined)
const IsStatic = React.createContext(false)

export default function App() {
  return (
    <CurrentRoute.Consumer>
      {currentRoute =>
        <CurrentUser.Consumer>
          {currentUser =>
            <IsStatic.Consumer>
              {isStatic =>
                !isStatic &&
                currentRoute.path === '/welcome' &&
                (currentUser
                  ? `Welcome back, ${currentUser.name}!`
                  : 'Welcome!'
                )
              }
            </IsStatic.Consumer>
          }
        </CurrentUser.Consumer>
      }
    </CurrentRoute.Consumer>
  )
}
```

```js
// index.js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

(example taken from [here](https://frontarm.com/james-k-nelson/usecontext-react-hook/))

# Creating a demo using `useState`
```bash
npx create-react-app hello-hooks
cd hello-hooks
```

```js
// App.js
import React, { useState } from 'react';
import TodoList from './Todo/TodoList';

function App() {
  let store = [];
  const appCss = {
    background: 'rgba(191, 196, 200, 0.44) none repeat scroll 0% 0%',
    padding: '50px',
    height: '100vh'
  }

  if (localStorage.getItem('todoStore') !== null) {
    store = JSON.parse(localStorage.getItem('todoStore'));
  } else {
    store = [{
      item: "example todo",
      isCompleted: false
    }]
  }

  const [todos, setTodos] = useState( store );

  const addItem = text => {
    const newTodos = [...todos, { item: text }];
    setTodos(newTodos);
    localStorage.setItem('todoStore', JSON.stringify(newTodos));
  }

  const complete = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
    localStorage.setItem('todoStore', JSON.stringify(newTodos));
  }

  const removeItem = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem('todoStore', JSON.stringify(newTodos));
  }

  return (
    <div style={appCss}>
      <TodoList todos={todos} addItem={addItem} completeTodo={complete} removeItem={removeItem} />
    </div>
  );
}

export default App;

```
Now lets create the Todo component
```bash
mkdir Todo
cd Todo
```

```js
// TodoList.js
import React from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';

export default function TodoList({todos, addItem, completeTodo, removeItem}) {
  const style = {
    width: '50%',
    background: 'rgba(255, 0, 0, 0.6) none repeat scroll 0% 0%',
    minHeight: '60%',
    maxHeight: '80%',
    padding: '50px',
    marginLeft: '21%',
    borderRadius: '10px'
  }

  return (
    <div style={style}>
      <TodoForm addItem={addItem} />

      {todos.map( (todo,i) =>
        <Todo key={i} index={i} todo={todo} completeTodo={completeTodo} removeItem={removeItem} />
      )}
    </div>
  )
}

```

```js
// TodoForm.js
import React, { useState } from 'react'

export default function TodoForm({addItem}) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return;
    }

    addItem(value.trim());
    setValue('');
  }

  const style = {
    boxShadow: '2px 2px 1px rgba(0, 0, 0, 0.15)' ,
    padding: '10px 30px',
    fontSize: '24px',
    margin: '10px',
    borderRadius: '3px',
    width: '90%'
  }

  return (
    <form onSubmit={handleSubmit}>
      <input style={style} type="text" value={value} placeholder="type and press enter" onChange={e => setValue(e.target.value)} />
    </form>
  )
}

```
And, 
```js
// Todo.js
import React, { useState } from 'react';

export default function Todo( {todo, index, completeTodo, removeItem} ) {

  const style = {
    background: todo.isCompleted ? '#ccc' : '#fff',
    boxShadow: '2px 2px 1px rgba(0, 0, 0, 0.15)' ,
    padding: '10px 30px',
    fontSize: '24px',
    margin: '10px',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    textDecoration: todo.isCompleted ? 'line-through' : ''
  }

  return (
    <div style={style}>
      {todo.item}

      <div>
        <button onClick={() => completeTodo(index)}>Done</button>
        <button onClick={() => removeItem(index)}>Remove</button>
      </div>
    </div>
  )
}
```

Here's a git repo of the finished project. [GIT](https://github.com/SSalekin/learning-react-hooks)


When loaded for the first time, users will be shown a demo todo item. After that, with each change / addition / update done, it'll be stored in the browsers `localStorage`, thus making the todolist persist refreshes.

![](https://images.viblo.asia/2b8d36dc-c163-4bdf-b697-5ee697ec2aae.gif)

## How it can be improved
If you read the source code, I have just used `useState()` to access state data in functional components. You can use the `useReducer()` and `useContext()` hooks to pass props to children without props drilling, thus making the code more lighter.

# Learning material

[Awesome React Hooks](https://github.com/rehooks/awesome-react-hooks) : Hundreds of community submitted custom hooks.

[Making API call using hooks](https://blog.bitsrc.io/making-api-calls-with-react-hooks-748ebfc7de8c?gi=acccb2ecbdf1)

[useHooks()](https://usehooks.com/) : More custom hooks, useAuth, useWhyDidYouUpdate

[Example apps using hooks](https://codesandbox.io/react-hooks)

# Finally

The best use of hook in mankinds history. **The Fountain Hook**
{@embed: https://www.youtube.com/watch?v=d6H-HEpnlk8}