Trong bài viết này mình sẽ chia sẻ cách sử dụng các **Hooks** của **React-Redux**. Trước hết hãy làm rõ lại một chút **Flow** của **project** **React-Redux** mà chúng ta vẫn quen thuộc.
### redux, action, reducer, store,...
```js
 import { createStore } from 'redux'
 
 const initialState = { count: 0 }
 
 const INCREASE = 'INCREASE'
 const DECREASE = 'DECREASE'
 
 const increaseAction = ({ type: INCREASE })
 const increaseAction = ({ type: DECREASE })
 
 function reducer(state = initialState, action) {
     switch(action.type) {
         case INCREASE:
             return { ...state, count: state.count + 1 }
         case DECREASE:
             return { ...state, count: state.count - 1 }
         default:
             return state
     }
 }
 
 const store = createStore(reducer)
 export default store
```
Chúng ta có một **state** với count = 0, count tăng thêm 1 mỗi khi **store** thực hiện **dispatch** một **action** có type=INCREASE và giảm đi một khi **action** được **dispatch** có type=DECREASE. Giả sử bạn đã hiểu rõ tiến trình hoạt động cơ bản của **redux** với **action**, **reducer** rồi nhé, vì bài viết này dành cho những người đã biết sử dụng **redux** rồi.
### Provider, connect
**redux** cung cấp công cụ quản lý **state** cho ứng dụng **javascript**, vì vậy nó không chỉ dành cho **react**, để kết nối **react** với **redux**, chúng ta cần dùng thư viện **react-redux**, đầu tiên cần "truyền" **store** mà chúng ta vừa tạo vào **component** chính của ứng dụng.
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'  
import store from './store'
import App from 'containers/App'

const appRoote = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    appRoot
)
```
**Provider** là một **API** của **react-redux**, sử dụng **Context API** của **React** giúp toàn bộ **component** trong **Component Tree** của ứng dụng đều có thể truy cập tới **store** mà chúng ta tạo ra, vì vậy nó sẽ được **render** phía trên một "cấp" đối với **App** - **component** chính của ứng dụng.  
Và nếu **Provider** đóng vai trò như **Context.Provider** thì **connect** chính là **Context.Consumer**, **api** chúng ta sẽ dùng để "nhận" **state** từ **store** và các **action** được khai báo rồi truyền vào mỗi **component** cần thiết dưới dạng **props**.  
ta có **App component** như sau:
```js
import React from 'react'
import { connect } from 'react-redux' 

function App() {
    return (
        <div>
            <p>count = {props.count}<p>
            <button onClick={() => props.increase()}>increase</button>
            <button onClick={() => props.decrease()}>decrease</button>
        <div>
    )
}

const mapStateToProps = (state) => ({
    count: state.count
})

const matchDispatchToProps = dispatch => ({
    increase: () => dispatch({ type: 'INCREASE' }),
    decrease: () => dispatch({ type: 'DECREASE' })
})

const withConnect connect(mapStateToProps, matchDispatchToProps)

export default withConnect(App)
```
OK sử dụng **redux** như vậy rất cơ bản và bình thường, nhưng phải thừa nhận mình không thích **connect** cho lắm, thứ nhất vì cú pháp tương đối khó hiểu, nhất là với người mới, mình cũng từng ngất lên ngất xuống để hiểu và quen với **mapStateToProps** hay **matchDispatchToProps**, thứ hai vì **connect** sử dụng **higher order component (hocs)** nên nó tạo ra nhiều **layer** đối với **component tree** của ứng dụng.  
### hooks api  
**react hooks** ra đời cho phép chúng ta phát triển ứng dụng **react** một cách đơn giản hơn, không cần sử dụng **class component** với hệ thống **lifecycle** phức tạp, **custom hooks** cho phép tạo ra các **state** có thể dùng lại mà không cần sử dụng **Hocs**. Hiểu đơn giản thì dùng **hooks** thì **code** sạch hơn, dễ hiểu hơn rất nhiều.  
**react-redux** phiên bản gần đây cũng đã cung cấp các **hooks api** giúp chúng ta **connect** dễ dàng hơn nhiều, và cũng không cần dùng **connect** nữa luôn, trước hết mình sẽ **refactor** lại **App** với **hooks**.  
```js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux' 

function App() {
    const count = useSelector(state => state.count)
    const dispatch = useDispatch()

    return (
        <div>
            <p>count = {count}<p>
            <button onClick={() => dispatch({ type: 'INCREASE' })}>increase</button>
            <button onClick={() => dispatch({ type: 'DECREASE' })}>decrease</button>
        <div>
    )
}

export default App
```
hmm, mình đã tự hỏi là ngắn gọn thế này sao mãi mới có mà dùng nhỉ, nghĩ đến ngày xưa cứ **connect** mà thấy cực. Nếu cần nhận về **state** thì sử dụng **useSelector**, cần **dispatch action** thì cứ dùng **useDispatch**, cũng không lo phải khai báo **propsType** dài lê thê khi có nhiều **state** hay **action** cần **connect** nữa.  
**useSelector** cũng có thể được sử dụng với thư viện **reselect**, **state** selector phổ biến của **redux**
```js
import { createSelector } from 'reselect'
const countSelector = createSelector(
    state => state.count,
    count => count
)
...
const count = useSelector(countSelector)
...
```
mình thử tự viết **useDispatch** để sử dụng thay cho **useDispatch** có sẵn của **react-redux** và chưa thấy lỗi chi cả:
```js
import { useContext } from 'react'
import { ReactReduxContext } from 'react-redux'

function useDispatch() {
    const store = useContext(ReactReduxContext)
    return store.dispatch
}
```
Dễ hiểu phải không nhỉ, hiểu rồi thì dùng luôn đi không cần suy nghĩ nhé, lưu ý là để dùng trọn bộ combo **hooks** như trên thì ứng dụng của bạn cần cài **react, react-dom v16.8** trở lên và **react-redux v7.1.0 trở lên**.
Ngoài ra cần tham khảo thêm các **hooks** của **react-redux** cũng như tìm hiểu sâu hơn, bạn có thể đọc ở [đây](https://react-redux.js.org/api/hooks).
Trên đây là phần chia sẻ của mình về cách sử dụng một số **hooks** mới của **react-redux**, cảm ơn đã theo dõi.  
Link code demo: https://codesandbox.io/s/redux-hooks-rqs76