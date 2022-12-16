Trọng dự án sử dụng react redux, để dispatch một action trong container hay component, bạn phải `mapDispatchToProps` rồi truyền function đó và các child components. 

Ta hãy xét một ví dụ để hiểu rõ thêm nhé. Giả sử ta làm một bài toán đơn giản có 2 button + (cộng) và - (trừ). Mỗi lần bấm vào cộng hoặc trừ thì kết quả sẽ cộng hoặc bớt đi một đơn vị. 

Nào ta hãy bắt đầu với trường hợp sử dụng `mapDispatchToProps` để dispatch acction trong component như sau 

```js
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
  }
}
```

Trong component `Count` chúng ta có code như sau 

```js
const Counter = ({ count, increment, decrement, reset }) => (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )
```

Khi bấm vào button + hoặc - chúng ta sẽ dispath đi action tương ứng type là `INCREMENT` hoặc là `DECREMENT`. Redux store sẽ biết phải làm gì khi nhận được các action type tương ứng rồi, cái này mình không bàn ở đây nữa nhé.


Bây giờ chúng ta không sử dụng `mapDispatchToProps` nữa mà dùng một hook  [react-redux](https://react-redux.js.org/api/hooks#usedispatch) kết quả như dùng `mapDispatchToProps`.

Thay vì dùng `mapDispatchToProps` giờ ta dùng `useDispatch`. Nó sẽ đơn giản hơn, tiết kiệm dòng code hơn.

Bạn cứ hình dùng với cách 1 chúng ta phải map hết các action vào 1 trong một container. Sau đó truyền các function này vào cho các component con sâu bên trong, giả sử 1 container hay 1 component có đến child component sâu đến 3 tầng. Để component tầng 3 có thể sự dụng được một action, chúng ta phải truyền qua tầng 1 rồi xuống tầng 2 rồi mới đến tầng 3.

Làm như vậy nguyên việc validate `PropType` hay `TypeSript` cũng đủ mệt. Chưa kể việc thay đổi thông số cho action, chúng ta lại đi sửa bằng đó component. Nghĩ mà nó chán nhể :D

Giờ đây để giải quyết vấn đề đó, không quan trọng là component tầng thứ n bao nhiêu. Chỉ cần dùng `useDispatch` chúng ta dispath đi được một action lên `redux-store`  rồi. Nó không chỉ làm code clear hơn mà việc code cũng trở nên đơn giản hơn nhiều lần.

Giờ quay lại ví dụ `Count` ở trên nhé, đơn giản chúng ta viết lại component `Count` lại như sau, và hãy quên cái `mapDispatchToProps` đi được rồi :D

```js
import { useDispatch } from 'react-redux'

const Counter = ({ count, increment, decrement, reset }) => {
  const dispatch = useDispatch()
    return(
        <div>
          <button onClick={() -> dispatch({ type: 'DECREMENT' })}>-</button>
          <span>{count}</span>
          <button onClick={ () => dispatch({ type: 'INCREMENT' })}>+</button>
        </div>
  )}
  
```


Code đã trở nên rõ ràng, đơn giản hơn nhiều rồi phải không. Hi vọng bài viết cho bạn có thêm chút kinh nghiệm cho việc dùng `useDispatch` thay cho `mapDispatchToProps` và áp dụng vào trong dự án hiệu quả hơn nữa. Thank you and thank you!