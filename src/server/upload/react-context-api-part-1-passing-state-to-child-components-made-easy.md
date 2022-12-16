Trong docs của ReactJS có câu thế này
```
React has a powerful composition model, and we recommend using
composition instead of inheritance to reuse code between components.
```
Có thể hiểu là họ khuyến khích người dùng react nên sử dụng `composition` hơn là `inheritance` để tái sử dụng lại những đoạn code biến chúng thành các components :).

Có một vài cách sau đây để tạo ra các components có thể `reuse`

- Wrapper component
- this.props.children
- Children function
- HOC (higher order component)
- Context

Không lòng vòng, nay ta tìm hiểu về Context trước :3

## 1. What is context?
React context API được xây dựng để giúp việc truyền dữ liệu đến các `components` dễ dàng hơn.

Có khá nhiều tool làm việc này dễ dàng, điên hình như [Redux](https://redux.js.org/) hiện rất được ưa chuộng - khá nhiều sao á :v: 

Thế ngắn gọn `context` là gì? `Context` cho phép dữ liệu trạng thái được truyền từ `parent component` sang `child component`  thông qua `Provider`. Mỗi `child component` sẽ có `Consumer` sẽ tác động đến các thay đổi `state` từ `parent component`. Bây giờ, một `func child component` có thể tác động đến `state` của `parent component`.

## 2. Why is context useful?
`Context` cho phép dữ liệu được chia sẻ như một `global data` trong một `component`. Điều này làm cho code của chúng ta dễ đọc hơn. Một `child component` sẽ tác động trực tiếp vào `component state` trên cùng bất kể `child component` nằm ở đâu trong `component` đó.

## 3. Simple Tutorial
Đầu tiên hãy tạo 1 file `Context.js`. Sẽ có sẵn 2 component cho ta sử dụng `Provider` và `Consumer`

```
import { createContext } from "react"
const { Provider, Consumer } = createContext()
export { Provider, Consumer }
```

import `createContext` từ react trước nhé. Sau đó là tạo `Provider` và `Consumer`, `Provide` sẽ cung cấp `state` đến `Consumer`, Mỗi `Consumer` sẽ tác động đến những lần thay đổi của `Provider`

Tiếp, ta phải tạo `parent component`
```
import React, { Component } from "react"
import { Provider } from "./Context"
import Child from "./Child"
class Parent extends Component {
  state = {
    people: [
      { id: 0, name: "Bob", age: 24 },
      { id: 1, name: "Jack", age: 22 },
      { id: 2, name: "Jill", age: 26 },
    ],
  }
  render() {
    return (
      <Provider value={this.state}>
        <Child />
      </Provider>
    )
  }
}
export default Parent
```

Lúc này `Provider` context đang `wrap` `child component`. value được set là `{this.state}`. Vậy trong `Child component` sẽ là 1 `Consumer` và sẽ tác động đến value được cung cấp bởi `Provider`. Và trong TH này value = `state`.

`Note: nó sẽ không work nếu các components không được bao bởi 1 Provider :))`

import `Child` component mà chưa tạo file thì được nhiên sẽ lỗi nhỉ, tạo thôi :3 
```
import React from "react"
import { Consumer } from "./Context"
import Grandchild from "./GrandChild"
function Child() {
  return (
    <Consumer>
      {context => (
        <div>
          <h1>Child Component</h1>
          {context.people.map(person => {
            return (
              <p key={person.id}>
                Hi, I am {person.name} and I am {person.age}
                years old.
              </p>
            )
          })}
          <GrandChild />
        </div>
      )}
    </Consumer>
  )
}
export default Child
```

Tóm tắt lại các bước thì, đầu tiên `Consumer` context đã đc import, sau đó thì toàn bộ components đã được bao bởi `Consumer`
```
<Consumer>
  {context => (
    <div>
      <h1>Child Component</h1>
      {context.people.map(person => {
        return (
          <p key={person.id}>
            Hi, I am {person.name} and I am {person.age} years old.
          </p>
        )
      })}
      <GrandChild />
    </div>
  )}
</Consumer>
```
Bên trong `Consumer` ta khai báo `{context => ( ... )}`. 
`context` ở đây chỉ là 1 tên tùy ý - có thể chọn tên khác được

Tập trung vào đoạn này để phân tích rõ hơn
```
{
  context.people.map(person => {
    return (
      <p key={person.id}>
        Hi, I am {person.name} and I am {person.age} years old.
      </p>
    )
  })
}
```

Vì ở đây `context` đã được truyền đến `Consumer` và tạo kết nối đến state của `parent component` (hiểu đơn giản là có thể access các value từ provider), cho nên ta có thể sử dụng được `people`. Và việc còn lại hiển giờ là show các giá trị của `people` ra

Giờ ta thử thay đổi value mà `Provider` cung cấp xem sao nhé
```
<Provider value={state: this.state}>
  <Child />
</Provider>
```

Một cách khác để ta có thể truyền thêm nhiều params cho `Consumer` sử dụng.

Và đây là cách gọi chúng ra:
```
{
  context.state.people.map(person => {    return (
      <p key={person.id}>
        Hi, I am {person.name} and I am {person.age} years old.
      </p>
    )
  })
}
```
Và giờ ta sẽ đến phần của `cháu nội` :v - tác giả vui tính ghê :v 
```
import React from "react"
import { Consumer } from "./Context"
function GrandChild() {
  return (
    <Consumer>
      {context => (
        <div>
          <h1>Grandchild Component</h1>
          {context.people.map(person => {
            return (
              <p key={person.id}>
                Hi, I am {person.name} and I am {person.age} years old                                             
              </p> 
            )
          })}
        </div>
      )}
    </Consumer>
  )
}
export default GrandChild
```

Xem lại cấu trúc thì là như thế này Provider > Child > GrandChild. Vậy nghĩa là `GrandChild` component có quyền truy cập để get value được nhận từ `Provider`

`Child component` là component đầu tiên nhận `state`  từ `context provider`. Sau đó, nó đi trước để chuyển `state` cho `Grandchild`. Như vậy, ngay cả thành phần `Grandchild` được bao bọc trong `Child component` cũng có quyền truy cập vào `parent state`

## Conclusion
Với một tutorial nhỏ ta lắm được nguyên tắc nhỏ: `State from parent component` sẽ được truyền `child components` thông qua `Provider`. `Consumer` dùng được sử dụng trong các `child componens` để  cho phép access các giá trị được truyền trong `Provider`.

Tham khảo: https://reactjs.org/docs/context.html

Bài viết được dịch từ nguồn: https://medium.com/javascript-in-plain-english/react-context-api-part-1-passing-state-to-child-components-made-easy-5152001e1988

Hy vọng giúp được các b mới học ReactJS :bowman