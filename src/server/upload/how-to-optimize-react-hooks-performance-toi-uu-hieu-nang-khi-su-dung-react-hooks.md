> Bài gốc : https://rahmanfadhil.com/optimize-react-hooks/

-----

Kể từ version 16.8, React giới thiệu một feature mới gọi là React Hooks. Một cách ngắn gọn nhất, React Hook là phiên bản nâng cấp của function component, cho phép function component sử dụng các tính năng mà trước đó chỉ class component mới có như life cycle hooks, state. 

Nhưng như trong phim kiếm hiệp hay có câu, *thanh gươm càng có nhiều sức mạnh thì càng khó điều khiển*, chúng ta hãy cùng nhau tìm hiểu xem, làm thể nào để điều khiển được thanh gươm React Hooks này một cách hiệu quả nhất.

# Getting started
Đầu tiên, tạo một project mới hoàn toàn sử dụng [Create React App](https://create-react-app.dev/)

```markdown
$ npx create-react-app my-app
```

Sau đó, viết lại toàn bộ file `App.js` như sau:

```javascript:js
// ./src/App.js
import React, { useState } from "react"
import Counter from "./Counter"

export default function App() {
  const [value, setValue] = useState("")

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Counter />
    </div>
  )
}
```
Trong `App` component, chúng ta có một thẻ input, với giá trị được điều khiển bởi biến `value` được tạo ra bởi `useState` hook. Đồng thời, chúng ta cũng cho hiển thị `Counter` component được import từ `./Counter.js`, giờ thì hãy tạo ra `Counter` component:

```javascript:js
// ./src/Counter.js
import React, { useState, useRef } from "react"

export default function Counter() {
  const [counter, setCounter] = useState(0)
  const renders = useRef(0)

  return (
    <div>
      <div>Counter: {counter}</div>
      <div>Renders: {renders.current++}</div>
      <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
    </div>
  )
}
```

Trong `Counter` component này, chúng ta sẽ có một `counter` state, nó sẽ tăng lên mỗi lần chúng ta nhấn nút Increase Counter, và một `renders` [ref](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables) để "keep track" số lần component của chúng ta được re-render, hay nói cách khác là cái đống bên trong `return` được chạy lại. 

Nói thêm về việc sử dụng [useRef](https://reactjs.org/docs/hooks-reference.html#useref) ở đây, sẽ có nhiều bạn cũng như mình khi lần đầu nhìn thấy cái useRef này, chắc chắn sẽ thắc mắc và tự hỏi tại sao lại dùng useRef. Thì câu trả lời là do chúng ta muốn tính số lần re-render của component, và useRef cho chúng ta chính xác cái chúng ta đang cần. Vì khi thay đổi giá trị của `.current` của ref, nó sẽ không trigger việc re-render. Các bạn có thể đọc thêm về đặc điểm này của useRef tại [useRef](https://reactjs.org/docs/hooks-reference.html#useref) và [Is there something like instance variables?](https://reactjs.org/docs/hooks-faq.html#is-there-something-like-instance-variables)

# The unnecessary rerender
Bây giờ, các bạn thử `yarn start` để chạy ứng dụng lên, ta sẽ thấy mỗi lần nhấn nút "Increase Counter", con số counter sẽ đúng bằng số lần render. Điều này có nghĩa là `Counter` component sẽ được re-render (hay nói cách khác là cái đống jsx trong return được chạy lại) mỗi khi state thay đổi.

(**NOTE**: Nhớ bỏ đi **React.StrictMode** ở file *index.js*, vì nó sẽ khiến component [render twice](https://github.com/facebook/react/issues/15074#issuecomment-471197572))

Nhưng, khi ta gõ vào ô input của `App` component, ta thấy con số renders vẫn tăng lên. Điều này có nghĩa là `Counter` component cũng sẽ re-render mỗi khi cái state của ô input ở `App` componnet thay đổi, điều này là không cần thiết vì chẳng có gì ta muốn thay đổi bên trong `Counter` component.

Chạy lại đống code trong `Counter` component là không cần thiết, vậy thì làm sao để ta có thể tránh việc này ?

# Memoizing components
Từ phiên bản [16.6](https://reactjs.org/blog/2018/10/23/react-v-16-6.html), ta có thêm `React.memo` có tính năng tương tự [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) hay [shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) bên class component, nhưng `React.memo` là cho function component. Mấy thứ fancy stuffs này mục đích sử dụng chủ yếu để optimize performance, nghĩa là nó sẽ giúp ta giảm số lần render. Nghĩa là nó chỉ render khi mà input prop có thay đổi, còn nếu giống thì nó sẽ tự "bail out". Nói tới đây, thì các bạn có thể nghiên cứu thêm về cơ chế mà React quyết định như nào là giống, như nào là khác, nghĩa là thuật toán nó dùng để so sánh props để xác định có sự thay đổi.

Bây giờ chúng ta hãy thử dùng `React.memo` để bọc cái `Counter` của chúng ta lại.

```javascript:js
// ./src/Counter.js
import React, { useState, useRef } from "react"

export default React.memo(() => {
  const [counter, setCounter] = useState(0)
  const renders = useRef(0)

  return (
    <div>
      <div>Counter: {counter}</div>
      <div>Renders: {renders.current++}</div>
      <button onClick={() => setCounter(counter + 1)}>Increase Counter</button>
    </div>
  )
})
```
Đơn giản, dễ xài! Giờ thử mở app của chúng ta lên, và ta sẽ thấy `Counter` component sẽ không re-render mỗi khi ta nhập vào ô input.

Khi ta truyền một `prop` vào memoried component, thì memoried component này sẽ kiểm tra xem là prop có thay đổi hay không để quyết định có re-render component hay không. Để kiểm tra tính năng này, hãy thử truyền một `prop` vào `Counter` component.

```javascript:js
// ./src/App.js
import React, { useState } from "react"
import Counter from "./Counter"

export default function App() {
  const [value, setValue] = useState("")

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Counter greeting="Hello world!" />
    </div>
  )
}
```

Ở đây, chúng ta đang truyền `greeting` prop vào `Counter` component. Nếu bạn chạy lại app, nó sẽ vẫn như khi vừa nãy. Bởi vì memoried component sẽ chỉ cập nhật lại khi `prop` thay đổi.

# Memoizing functions
`React.memo` is awesome, nhưng nó cũng có nhược điểm. Nó sẽ hoạt động tốt với các kiểu dữ liệu như string, number, boolean. Còn với objects và functions, nó sẽ không đủ thông minh để kiểm tra chính xác sự thay đổi.
```javascript:js
// ./src/App.js
import React, { useState } from "react"
import Counter from "./Counter"

export default function App() {
  const [value, setValue] = useState("")

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Counter
        addHello={() => setValue(value + "Hello!")}
        myObject={{ key: "value" }}
      />
    </div>
  )
}
```
Ở đây ta đang truyền cho Counter hai `prop` mới, một function và một object. Và lúc này, mỗi khi ta nhập vô ô input của `App` component, thì `Counter` component của chúng ta lại re-render. Điều này đồng nghĩa, với mỗi lần chạy, props đi vào `Counter` component là một function và một object khác nhau. Props thay đổi nên component re-render.

Để giải quyết vấn đề này, chúng ta có thể sử dụng [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback), để memoize cái function trước khi pass xuống cho `Counter` component. Cái memozied version của cái function sẽ chỉ thay đổi khi mà một trong các **dependencies** thay đổi. Hãy sửa code trong `App.js` lại như sau:

```javascript:js
// ./src/App.js
import React, { useState, useCallback } from "react"
import Counter from "./Counter"

export default function App() {
  const [value, setValue] = useState("")

  const addHello = useCallback(() => setValue(value + "Hello!"), [value])

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Counter addHello={addHello} myObject={{ key: "value" }} />  {/* khi chạy app, hãy tạm xóa cái myObject nhé  */}
    </div>
  )
}
```

Phương pháp này sẽ rất hữu ích khi chúng ta có nhiều hơn một state hook. Cái memoized function sẽ chỉ được chạy lại khi mà cái **chosen state** bị thay đổi. Để minh họa cho điều này, hãy thêm vào một ô input nữa:

```javascript:js
import React, { useState, useCallback } from "react"
import Counter from "./Counter"

export default function App() {
  const [value, setValue] = useState("")
  const [newValue, setNewValue] = useState("")

  const addHello = useCallback(() => setValue(value + "Hello!"), [value])

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <input
        type="text"
        onChange={(e) => setNewValue(e.target.value)}
        value={newValue}
      />
      <Counter addHello={addHello} myObject={{ key: "value" }} /> {/* khi chạy app, hãy tạm xóa cái myObject nhé */}
    </div>
  )
}
```
Bây giờ, khi ta nhấn vô ô input mới, cái `Counter` component sẽ không re-render, bởi vì chúng ta đã chỉ ra trong cái `[]` dependencies là nó chỉ phụ thuộc vào gia trị `value`, nó chỉ được chạy lại khi mà cái giá trị đó thay đổi, còn những giá trị khác thay đổi thì mặc kệ.
# Memoizing objects
Tới đây, chúng ta đã biết cách memoize các function, nhưng còn một thứ nữa chúng ta nên biết về momoizing.

Hiện tại, cái `Counter` component của chúng ta vẫn bị re-render mỗi khi state thay đổi. Đó là bởi vì cái `myObject` prop vẫn chưa được memoized. Chúng ta có thể sử dụng [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) để memoize tất cả các giá trị (bao gồm cả objects) bằng cách truyền vào một "create" function và một mảng các **dependencies**.  Cái giá trị được tính toán ra sẽ chỉ được tính toán lại khi mà một trong các **dependencies** thay đổi (giống hệt như useCallback ở trên). 

```javascript:js
import React, { useState, useCallback, useMemo } from "react"
import Counter from "./Counter"

export default function App() {
  const [value, setValue] = useState("")
  const [newValue, setNewValue] = useState("")

  const addHello = useCallback(() => setValue(value + "Hello!"), [value])
  const myObject = useMemo(() => ({ key: "value" }), [])

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <input
        type="text"
        onChange={(e) => setNewValue(e.target.value)}
        value={newValue}
      />
      <Counter addHello={addHello} myObject={myObject} />
    </div>
  )
}
```

# Conclusion
Bằng cách áp dụng các phương pháp này, chúng ta sẽ có thể passs props vào một **memozied** component một cách tối ưu nhất.