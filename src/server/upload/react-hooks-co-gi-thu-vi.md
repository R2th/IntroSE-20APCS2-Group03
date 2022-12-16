## React Hooks là gì
React Hooks là một tính năng mới được chính thức release trong bản React 16.8.

Như chúng ta đã biết thì trong React có 2 loại component trong React là Stateless và Stateful. Với **React Hooks** nó cho phép một function component có thể sử dụng state, sử dụng các lifecycle method, context và nhiều thứ khác... Khắc phục những vấn đề "wrapper hell" - các component lồng nhau phức tạp, component dài dòng, bỏ đi mấy cái this màu mè.

![](https://images.viblo.asia/dd0f5127-b84b-4cae-96ff-79cd746a60ee.png)
## Một vài tính năng mới của React Hooks
### useState

Thông thường chúng ta xây dựng component trong react đều viết component theo dạng `stateful`(class).  Đây là cách bình thường chúng ta sử dụng state trong một component:
```js
import React from 'react';

export default class Input extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      value: ''
    }
  }

  updateField = event => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return (
      <div>
        <input
          className="form-control"
          type="text"
          value={this.state.value}
          onChange={this.updateField}
        />
        <h3>
          Value: <span className="text-success">{this.state.value}</span>
        </h3>
      </div>
    )
  }
}
```

> Link demo: https://stackblitz.com/edit/react-demo-hook?file=Input.js

Và đây là cách viết với React Hooks
 ```js
 import React, { useState } from "react"

const InputUseHook = () => {
  const [value, setValue] = useState('')

  const updateField = event => {
    setValue(event.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={updateField}
        className="form-control"
      />
      <h3>
        Value: <span className="text-success">{value}</span>
      </h3>
    </div>
  )
}

export default InputUseHook;
 ```
> Link demo: https://stackblitz.com/edit/react-demo-hook?file=InputUseHook.js

Chỉ cần return về jsx và không còn `constructor` với `render` nữa.

Ở đây `useState` là một hook. Qua ví dụ thì các bạn cũng có thể thấy, thực chất hook cũng chỉ là một function. Và function này cho phép chúng ta mang state vào một stateless component. `useState` nhận một parameter duy nhất là giá trị ban đầu của state.

So với cách viết Stateful thì cách viết với hook có nhìn ngắn gọn hơn nhiều.

```js
const [value, setValue] = useState('') // giá trị value ban đầu là rỗng
```
Ở đây chúng ta sử dụng array destructuring để gán tên cho state thông qua việc gọi useState.

### useEffect
Khi chúng ta cần gọi api để lấy data, khai báo eventListener, thay đổi DOM... các side effect này được xử lý bằng cách sử dụng component life-cycle API của React. Ví dụ như:
```js
componentDidMount() {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      setState({
        data: response.data
      })
    })
    .catch((error) => {
      console.log(error);
    });
}
```

> Link demo: https://stackblitz.com/edit/react-demo-hook?file=Product.js

Để tiếp cận vào các lifecycles, chúng ta có useEffect. Hook này có tác dụng tương tự như `componentDidMount, componentDidUpdate và componentWillUnmount` nhưng được gom lại thành một hàm duy nhất.

Và đây cách làm tương đương khi sử dụng React Hooks:
```js
useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      setState(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
}, [])
```
https://stackblitz.com/edit/react-demo-hook?file=ProductUseHook.js

Đơn giản bạn chỉ cần thực thi nó trong useEffect
```js
useEffect(() => {
// ahihi
}, [param]);
```
`useEffect` nhận 2 parameter, đầu tiên là một function nơi chúng ta xử lý các side effect, thứ hai là một array [param]. Chúng ta có thể hiểu array này là nơi chứa những variable (biến, không nhất thiết là state), mà khi những variable này thay đổi thì hook `useEffect` này sẽ được kích hoạt (chạy, execute). Khi chúng ta không bỏ array này vào hook `useEffect` thì nó sẽ chạy cùng với **mọi lần** component chạy function render.
```js
useEffect(() => {
// ahihi
});
```
Còn nếu như chúng ta chỉ muốn nó chạy 1 lần sau lần render đầu tiên thì chỉ cần thêm 1 array rỗng là được.
```js
useEffect(() => {
// ahihi
}, []);
```

Ngoài một vài hook trên, còn một số các hook nữa mà chúng ta có thể sử dụng, ví dụ như `useContext, useReducer, useRef...`

## Tổng kết
Qua bài viết trên, chúng ta thấy được sự lợi hại mà React hooks đem lại:
- Thay cách viết stateful bằng stateless (làm giảm đáng kể số dòng code trong dự án của bạn)
- Bỏ đi từ khóa `this` màu mè
- Cung cấp API giúp bạn có thể thao tác sâu hơn vào `props, state, context, refs, và các lifecycle.`
- Mình cũng chưa nghĩ ra, các bạn đóng góp lại phần comment nhé.
 
> Các bạn có thể tham khảo thêm tại:
> 
> https://reactjs.org/docs/hooks-reference.html
> 
> https://vi.reactjs.org/docs/hooks-overview.html