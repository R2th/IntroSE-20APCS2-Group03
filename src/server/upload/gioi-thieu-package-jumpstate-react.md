## 1. Giới thiệu Jumpstate

### 1.1 Giới thiệu

`Jumpstate` là một công cụ đơn giản và hiệu quả trong việc quản lý các `state` của `Redux`

### 1.2 Ứng dụng

* Dễ đọc, dễ tìm hiểu, dễ refactor code khi cần maintain
* Effects (Async actions and side-effects)
* Có hệ thống Global hook
* Không cần `Action creators`
* Không cần `Action constants`
* Không yêu cầu `dispatching`

## 2. Cài đặt và sử dụng

### 2.1 Cài đặt

```
$ npm install jumpstate --save
```


### 2.2 Ví dụ

Bên dưới là ví dụ tổng quát làm nổi bật các tính năng chính của `jumpstate`:

```
// Import Jumpstate
import { State, Effect, Actions, Hook, dispatch, getState, CreateJumpstateMiddleware } from 'jumpstate'

// Create a state with some actions
const Counter = State({
  // Initial State
  initial: { count: 0 },
  // Actions
  increment (state, payload) {
    return { count: state.count + 1 }
  },
  decrement (state, payload) {
    return { count: state.count - 1 }
  }
})

// Create a sandboxed state with similar actions
const SandboxCounter = State('sandboxCounter', {
  // Initial State
  initial: { count: 0 },
  // Actions
  increment (state, payload) {
    return { count: state.count + 1 }
  },
  decrement (state, payload) {
    return { count: state.count - 1 }
  }
})

// Create an asynchronous effect
Effect('asyncIncrement', (isSandbox) => {
  console.log(isSandbox)
  if (isSandbox) {
    return setTimeout(() => SandboxCounter.increment(), 1000)
  }
  setTimeout(() => Actions.increment(), 1000)
})

// Create a hook
Hook((action, getState) => {
  // Like never letting the first counter equal 10!
  if (getState().counter.count === 10) {
    Actions.increment()
  }
})

// Setup your redux however you like
const reducers = {
  counter: Counter,
  counter2: Counter2,
  sandboxCounter: SandboxCounter
}

const store = createStore(
  combineReducers(reducers),
  // Just be sure to apply the Jumpstate Middleware :)
  applyMiddleware(
    CreateJumpstateMiddleware()
  )
)

// Somwhere in a connected component...
React.createClass({
  render () {
    return (
      <div>
        <h1>Counter 1: { this.props.count }</h1>
        <h1>Counter 2: { this.props.count2 } <em>*Try to make me 10</em></h1>
        <h1>Sandboxed Counter: { this.props.sandboxCount }</h1>

        <h3>Global Actions</h3>
        <button onClick={() => Actions.decrement()}>Decrement</button>
        <button onClick={() => Actions.increment()}>Increment</button>
        <button onClick={() => Actions.asyncIncrement()}>Increment after 1 sec.</button>

        <h3>Sandboxed Actions</h3>
        <button onClick={() => SandboxCounter.decrement()}>Decrement</button>
        <button onClick={() => SandboxCounter.increment()}>Increment</button>
        <button onClick={() => Actions.asyncIncrement(true)}>Increment after 1 sec.</button>
      </div>
    )
  }
})
```


### 2.3 Global States

Dễ dàng tạo một `state` toàn cục, có thể gọi được `reducer` cùng với `redux` ngay lập tức. 

```
import { State, Actions } from 'jumpstate'

// Use `State` to make a new global state
const counterReducer = State({
  // Initial State
  initial: { count: 0 },
  // Actions
  increment (state, payload) {
    return { count: state.count + 1 }
  },
  decrement (state, payload) {
    return { count: state.count - 1 }
  }
})

// Now you can use the reducer it returned in your redux setup
const store = createStore({
  counter: counterReducer
})

// And call global actions using jumpstate's `Actions` registry
Actions.increment()
```



### 2.4 State Actions

Khi bạn tạo một `state`, bạn gán nó với các `action function`. Khi được gọi, mỗi `action` sẽ nhận giá trị `state` hiện tại, và `payload` sẽ được truyền cùng với việc gọi đó

Điều quan trọng là vẫn duy trì được tính bất biến ở đây, không làm thay đổi `state`, mà tạo ra các `state` mới cho những `action` khác nhau.

Khi bạn tạo một `state`, bạn cần gán: 

```
increment (state, payload) {
  return {
    count: state.count + 1
  }
},

```


### 2.5 Effect

`Effect` là những `action` không đồng bộ. 

Nó được xây dựng dựa trên các khái niệm của `thunks` và `sagas` nhưng dễ hiểu và dễ sử dụng hơn.

Không giống với `thunks`, `Effect` có các `actions` `redux` riêng, và các `callback` của nó sẽ được thực thi khi các `actions` tương ứng được gọi.

Nó cũng giúp cho việc gọi các api từ server dễ dàng hơn rất nhiều so với `redux-saga`.

Ví dụ tạo `Effect`

```
import { Effect, Actions } from 'jumpstate'

const postFetchEffect = Effect('postsFetch', (payload) => {
  // You can do anything here, but async actions are a great use case:
  Actions.showLoading(true)
  Axios.get('http://mysite.com/posts')
    .then(Actions.postsFetchSuccess)
    .catch(Actions.postsFetchError)
    .finally(() => Actions.showLoading(false))
})

// Call the effect
Actions.postsFetch()
// or alternatively
postFetchEffect()
```

### 2.6 Hook

Dễ dàng tạo `Hook`, cho phép bạn theo dõi các `state` của từng `actions`

Có thể `cancel` các `Hook` khi đã làm xong việc.

Ví dụ tạo `Hook`:

```
import { Hook, Actions } from 'jumpstate'

// You can hook into any actions, even ones from external libraries!
const formLoadedHook = Hook((action, getState) => {
  if (action.type === 'redux-form/INITIALIZE') {
    console.log('A Redux-Form was just initialized with this payload', payload)
  }
})

// Load google analytics if it is not yet loaded
const analyticsLoadedHook = Hook((action, getState) => {
  if (!getState().analytics.loaded)
  Actions.analytics.load()
})

// Cancel a hook:
formLoadedHook.cancel()
analyticsLoadedHook.cancel()
```

### 2.7 Actions 

Tất cả các `actions` (bao gồm các `Effect`) có sẵn thông qua object `Actions`

```
Actions.increment()
Actions.mySandbox.increment()
Actions.myEffect()
```

### 2.8 Sandboxed States

Các `sandboxed state` đã được đặt tên và không làm ảnh hưởng tới các `event` bên ngoài.

Các `state` của nó chỉ được thay đổi bằng cách gọi các `action` thông qua `Actions.prefixName.actionName()` hoặc thông qua các phương thức `reducer`

```
import { State, Actions } from 'jumpstate'

// Create a sandboxed state by passing a name as the first parameter
const SandboxedCounter = State('otherCounter', {
  // Initial State
  initial: { count: 0 },
  // Actions
  increment (state, payload) {
    return { count: state.count + 1 }
  },
  decrement (state, payload) {
    return { count: state.count - 1 }
  },
})

// Now you can use the reducer it returned in your redux setup
const store = createStore({
  sandboxedCounter: SandboxedCounter
})

// Sandboxed actions are accessible through the prefix on Actions or as methods on its reducer!
Actions.otherCounter.increment()
// or
SandboxedCounter.increment()
```

### 2.9 Action Creators

`Jumpstate` tự động cung cấp cho bạn quyền truy cập vào các `action creator`. Mỗi `action` sẽ có một `action creator method` tương ứng có:

1. Đối tượng có thể truy xuất `action creator`
2. `reducer` mà `action` thuộc về thông qua `myReducer.actionCreators`
3. `effect` thông qua `myEffect.actionCreator`

```
import { State, Actions, Effect, ActionCreators } from 'jumpstate'

const globalCounterReducer = State({
  initial: { count: 0 },
  increment (state, payload) {
    return { count: state.count + 1 }
  }
})

const myCounterReducer = State('myCounter', {
  initial: { count: 0 },
  increment (state, payload) {
    return { count: state.count + 1 }
  }
})

const incrementAsyncEffect = Effect('incrementAsync', () => setTimeout(() => Actions.increment(), 1000))

// All of the available action creators are available...

// On The ActionCreators object:
ActionCreators.increment(2) === {
  type: 'increment',
  payload: 2
}
ActionCreators.myCounter.increment(2) === {
  type: 'myCounter_increment',
  payload: 2
}
ActionCreators.incrementAsync(2) === {
  type: 'incrementAsync',
  payload: 2
}

// And on the reducer/effect the action belongs to:
globalCounterReducer.actionCreators.increment(2) === {
  type: 'increment',
  payload: 2
}
myCounterReducer.actionCreators.increment(2) === {
  type: 'myCounter_increment',
  payload: 2
}
incrementAsyncEffect.actionCreator.increment(2) === {
  type: 'myCounter_increment',
  payload: 2
}
```

### 2.10 Removing/Cancelling Effects and Hooks

Nếu bạn biết các `Effect` hay `Hook` đã hoàn thành xong nhiệm vụ của mình, hãy xóa chúng để giúp bộ nhớ của máy rộng rãi hơn

```
// Effects
const myEffect = Effect(...)
myEffect.cancel()

// Hooks
const myHook = Hook(...)
myHook.cancel()
```

## 3. Kết luận

Trên đây mình có giới thiệu tổng quan về package Jumpstate, hi vọng sẽ giúp ích được cho mọi người trong khi làm việc với Redux - React

Cảm ơn mọi người đã theo dõi bài viết.

Tài liệu tham khảo: https://github.com/jumpsuit/jumpstate

Giới thiệu về Hook: [Bài viết của tác giả Phạm Văn Đức](https://viblo.asia/p/react-introducing-hooks-QpmleERNlrd)

Action Creator: [Tham khảo ở đây](https://codeaholicguy.com/2016/08/16/hoc-reactredux-qua-vi-du-thuc-te-redux/#actionCreators)