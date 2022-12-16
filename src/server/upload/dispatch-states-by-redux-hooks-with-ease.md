Since the release of React-Redux `version 7.1`  in (11th June 2019), `Redux Hooks` is now can be used properly.

Redux Hooks makes it easy to use each component and `dispatch`, `state` without using `connect()`.

Here is my sample code, the `Action`, `Reducer` part is omitted.

A component that simply increases or decreases the counter value.
```
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementAction, decrementAction } from "./Actions";

const counterSelector = state => state.counter;

const Counter = props => {
  // You can get the dispatch attached to the store with useDispatch.
  const dispatch = useDispatch();

  // You can get the state of the store using useSelector
  const counter = useSelector(counterSelector);

  return (
    <>
      <p> count: {counter} </p>
      <button onClick={dispatch(incrementAction())}>increment</button>
      <button onClick={dispatch(decrementAction())}>decrement</button>
    </>
  );
};
```

If we don't unse `useSelector` and `useDispatch`,  the source code will be like this:
```
import React from "react";
import { connect } from 'react-redux'
import { incrementAction, decrementAction } from "./Actions";

const counterSelector = state => state.counter;

const CounterComponents = props => {
  return (
    <>
      <p> count: {props.counter} </p>
      <button onClick={props.increment}>increment</button>
      <button onClick={props.decrement}>decrement</button>
    </>
  );
};

const mapStateToProps = state => ({
  counter: counterSelector(state)
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(incrementAction()),
  decrement: () => dispatch(decrementAction())
});

const Counter = connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterComponents);
```
If we use Redux Hooks, we can see that the connect part is gone, and the code is pretty clean.

# `useSelector()`
If you want to get the `state` from the `store`, call `useSelector()`. Specify a `selector` function that takes a `state` as an argument of `useSelector`.
```
const counterSelector = (state) => state.counter

const Counter = (props) => {
    const counter = useSelector(counterSelector)
    return <div>{counter}</div>
}
```
# `useDispatch()`
You can get the `dispatch` attached to the store with `useDispatch`.
```
const Counter = (props) => {
    const dispatch = useDispatch()

    return (
        <>
            <button onClick={()=> {dispatch({ type: "INCREMENT_COUNTER" })}}>increment</button>
            <button onClick={()=> {dispatch({ type: "DECREMENT_COUNTER" })}}>decrement</button>
        </>
    )
}
```
When passing `dispatch` to a child component, it is recommended use `useCallback` to memorize. This is to avoid unnecessary re-rendering of child components due to parent re-rendering.
```
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```
# Important Note
Unlike using `mapStateToProps`, `useSelector` has some problems.

Problems can arise especially when `useSelector()` relies on `props`. Reference: [Usage Warnings](https://react-redux.js.org/api/hooks#usage-warnings)

Each time `dispatch` is executed, `useSelector()` is also executed. At this time, there is no guarantee that `props` is up-to-date.

Example

* `dispatch()` is executed and the component's `useSelector()` is executed.
* The parent component is rerendered and `props` are passed to the component.
* If `useSelector()` is executed before `props` is passed, an inconsistency will occur if the selector function depends on `props`.

The solutions are as follows.

* The `selector` function does not use `props`.
* Use carefully if the `selector` function depends on `props` and `props` changes or `state` data is deleted based on a `state` change. Instead of using something like `state.todos[props.id].name`, first check the existence of data with `state.todos[props.id]`, and then call it `todo.name`.

# Managing
How to prepare simple global `state` by combination of `useContext` and `useReducer` has been proposed since React Hooks was officially announced.

I think using `Redux` is easy and pretty attractive.

I've been using it from `v7.1.0-alpha.5`, and it is quite handy.

Though i needed to configure it with care
# Summary
That's all I want to share for the Redux Hooks, which has been officially released since React Redux 7.1.

Using `react-starter-kit` can further reduce the amount of code written and make development easier.