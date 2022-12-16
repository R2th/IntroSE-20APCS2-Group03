## Getting Start
Over the years the javascript world has evolved greatly, new libraries and frameworks pop up and existing ones have improve a lot and that is especially true to React as well. Among the vast majority of library, redux is a popular one that developer usually used along side when they develop a React application. Many others utility and devtool libraries also being used, which makes setting up a React project a very daunting task. As the pattern grow very common, a community has bundle all those together and thus redux-toolkit was borned.

## Redux Toolkit

### Install Package
To get start with redux toolkit, first lets install it

```SH
$ npx create-react-app app-name --template redux # javascript
$ npx create-react-app app-name --template redux-typescript # typescript
$ # or using yarn
$ yarn create react-app --template redux
$ yarn create react-app --template redux-typescript
```

Or add it into existing project
```SH
$ npm install @reduxjs/toolkit # or using yarn
$ yarn add @reduxjs/toolkit
```

### The Basic
Lets start from our redux store in `src/app/store.js`. It will looks like this

```JS
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});
```

Lets add a todo feature into our app, start from todoReducer
```JS
// src/features/todo/todoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  status: 'idle'
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    }
  }
});

export const { addTodo, removeTodo } = todoSlice.actions;

export const selectTodo = (state) => state.todo;

export default todoSlice.reducer;
```

The slice is a place where your reducer and action that will cause redux's state to change live. `createSlice` takes the name of the slice of the state tree, initial state value and reducer function to define how the state will update. These reducer function will become action creator function to be used inside of component.

Also notice that redux require that we write all updates immutably, but our reducer function mutate the state directly that's because `createSlice` API used Immer object internally.

Then in `src/app/store.js` add the following lines

```JS
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/todo/todoSlice' // new line

export default configureStore({
  reducer: {
    todo: todoSlice // new line
  },
});
```

### Using in Component
Let's take a look at how to use it in component. The code is simple first we use `useSelector` to select the todo from a slice of our state tree by using selector function import from our previous file. Then in the component we dispatch `addTodo` and `removeTodo` in respond to `Add todo` and `Delete` button click respectively. When `addTodo` and `removeTodo` are dispatch our reducer function define in `todoSlice` with the same name will be trigger and update our state tree accordingly.

```JS
// src/features/TodoList.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTodo, addTodo, removeTodo } from './todoSlice';

function Todo({ todo, onDelete }) {
  const onClick = (event) => {
    event.preventDefault();
    onDelete(todo.id);
  };

  return (
    <li>
      <span>{todo.title}</span>
      <a href="#" onClick={onClick}>Delete</a>
    </li>
  );
}

export default function TodoList() {
  const dispatch = useDispatch();
  const { todos } = useSelector(selectTodo);
  const [todo, setTodo] = useState({ id: 1, title: '' });
  
  const onChange = (event) => {
    const { value } = event.target;
    setTodo({ ...todo, title: value });
  };
  
  const onClick = () => {
    dispatch(addTodo(todo));
    setTodo({ id: todo.id + 1, title: '' });
  };
  
  const onDelete = (id) => {
    dispatch(removeTodo({ id }));
  };

  return (
    <div>
      <input type="text" onChange={onChange} value={todo.title} />
      <button onClick={onClick}>Add todo</button>
      <ul>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
```

### Async Action
Redux Toolkit come with `async action` handling by default using `redux-thunk`. To create an async action creator we use `createAsyncThunk` like follow.

```JS
// src/features/todo/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

function addTodoAPI(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(payload), 1000);
  });
}

export const addTodoAsync = createAsyncThunk(
  'todo/addTodoAsync',
  async (payload) => {
    const data = await addTodoAPI(payload);
    return data;
  }
);

export const todoSlice = createSlice({
  ...,
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos.push(action.payload);
      });
  }
});
```

`createAsyncThunk` will return a function with three actions: `pending`, `fulfilled` and `rejected`. These actions are correspond to each state of the API. In our example above we mimic the delay of response from server by using `setTimeout`.


### Using Redux Saga
If you prefer handling async action using redux-saga then we need to modify and create a custom middleware when create our store like follow

```JS
// src/app/store.js
import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/todo/todoSlice';
import rootSaga from './saga';

// disalbe thunk and add redux-saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export default configureStore({
  reducer: {
    todo: todoSlice
  },
  middleware
});

sagaMiddleware.run(rootSaga);

// src/app/saga.js
import { all } from 'redux-saga/effects';
import { todoSaga } from '../features/todo/todoSlice';

export default function* rootSaga() {
  yield all([todoSaga()]);
}
```

Then in `todoSlice.js`

```JS
import { call, put, takeLatest } from 'redux-saga/effects';
import { createAction } from '@reduxjs/toolkit';

export const addTodoAsync = createAction('todo/addTodoAsync');

function* addTodoSaga(action) {
  const data = yield call(addTodoAPI, action.payload);
  yield put(addTodo(data));
}

export function* todoSaga() {
  yield takeLatest(addTodoAsync, addTodoSaga);
}

// rest of the code
```

## Conclusion
In this article we've learned the basic of how to use redux toolkit as well as configuring it to our need by switch some of the core library, redux-thunk with redux-saga. I hope you find this is helpful.