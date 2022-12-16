### Mở đầu
**Component**, **State**, **Props**, **Component Lifecycle**,... là những thuộc tính quan trọng nhất của **React**, mình tin chắc là bạn không thể tạo ra ứng dụng tốt với **React** nếu không nằm lòng và vận dụng linh hoạt chúng. Để sử dụng đầy đủ các tính năng trên, **component** mà chúng ta xây dựng phải là một **class component**, với cú pháp quen thuộc sau:  
```js
  import React from 'react'

  class App extends React.Component {
      state = {
          name: ''
      }
  
      handleChange = (e) => {
          this.setState({ name: e.target.value })
      }
      
      render() {
          return (
              <input value={this.state.value} onChange={this.handleChange} />
          )
      }
  }
```
Tuy nhiên từ phiên bản **16.8.0**, **React** bổ sung **react hook**, một khái niệm hoàn toàn mới cho chúng ta thêm một lựa chọn để xây dựng ứng dụng **React** với các **component** hoàn toàn được xây dựng từ các **function**, nhìn nhận về **state** và **component lifecycle** theo một cách hoàn toàn khác.
```js
import React, { useState } from 'react'

function App() {
     const [name, setName] = useState('')
     
     function handleChange(e) {
         setName(e.target.value)
     }
     
    return (
        <input value={name} onChange={handleChange} />
    )
}
```
### Sử dụng Custom Hook
Giả sử bạn đọc đã nắm được cơ bản về **React Hook**, sau đây mình xin chia sẻ về cách **React Hook** được sử dụng để chia sẻ và sử dụng lại **logic** giữa các **component** - **Custom Hook**, từ trước tới nay **React** cung cấp **Higher Order Components (Hocs)** hay **Render Props** để phục vụ công việc này, và mình thấy **Custom Hook** mạnh mẽ và đơn giản hơn nhiều so với 2 công cụ trên. 
Đầu tiên, **Custom Hook** được là một **function**, thường và nên bắt đầu bằng từ **"use"**, và cũng có quy tắc giống với **React Hooks**, tham khảo tại [link](https://reactjs.org/docs/hooks-rules.html).

Trường hợp đơn giản nhất, giả sử ta có **component** sau:  
```js
import React, { useState } from 'react'

function App() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    function handleChangeMail(e) {
        setEmail(e.target.value)
    }
    
    function handleChangePassword(e) {
        setPassword(e.targe.value)
    }
    
    return (
        <form>
            <input value={email} onChange={handleChangeMail} />
            <input value={password} onChange={handleChangePassword} />
        </form>
    )
    
}
```
Sử dụng **Custom Hook** để giảm việc lặp **code** như sau:
```js
import React, { useState } from 'react'

function useInputText(defaultValue) {
    const [value, setValue] = useState(defaultValue)
    function onChange(e) {
        setValue(e.target.value)
    }
    return {
        value,
        onChange,
    }
}

function App() {
  const useEmail = useInputText('')
  const usePassword = usePassword('')
  return (
   <form>
      <input {...useEmail} />
      <input {...usePassword} />
   </form>
  )
}

```
Trường hợp tiếp theo, sử dụng **Custom Hook** lắng nghe sự thay đổi của kích thước màn hình:
```js
import React, { useState, useEffect } from 'react'

function useWindowSize() {
    const [width, setWidth] = useState(window.innerWidth)
    const [height, setHeight] = useState(window.innerHeight)
    
    function handleChangeSize() {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }
     
    useEffect(() => {
        window.addEventListener('resize', handleChangeSize)
        return () => {
            window.removeEventListener('resize', handleChangeSize)
        }
    })
    
    return { width, height }
}

function App() {
    const { width, height } = useWindowSize()
    // ...
}
```
Nâng cao hơn một chút, kết hợp **Custom Hooks** với **Context API.** để sử dụng một **Modal** duy nhất cho toàn bộ **Application.** Đây là vấn đề không đơn giản nhưng có thể được xử lý một cách **nhẹ nhàng** với **Hooks** và **Context**.  
Tạo **Context API** dùng để quản lý **data** cho **Modal**
```js
import React, { useState } from 'react'

export const ModalContext = React.createContext()
function ModalProvider({ children }) {
    const [toggle, setToggle] = useState(false)
    const [content, setContent] = useState(null)
    
    const value = {
        toggle,
        setToggleModal: () => setToggle(!toggle),
        content,
        setModalContent: (val) => setContent(val),
    }
    
    return (
        <ModalContext.Provider value={value}>
            {children} // Application
        </<ModalContext.Provider>
    )
}

// function App() {
//   return (
//     <ModalContext>
//       <AppComponent />
//     </ModalContext>
//   )
// }

```

Tiếp theo chúng ta tạo ra **Component** chứa **Modal** (giả định **Modal** của **[reactstrap](https://reactstrap.github.io/)**):  
```js
import React, { useRef } from 'react'
import { ModalContext } from 'ModalProvider'
import { Modal } from 'reactstrap'

function Modal() {
    const { toggle, content } = useRef(ModalContext)

    return (
        <Modal isOpen={toggle}>
            {content}
        </Modal>
    )
}
```
Chúng ta đã thiết lập xong **Modal** của mình, khi cần sử dụng **Modal**:  
```js
import React, { useRef } from 'react'
import { ModalContext } from 'ModalProvider'

const ModalContent = ({ setToggle }) => (
    <div>
        <button onClick={setToggle}>Close</button>
    </div>
)

function HomeComponent() {
    const { setToggle, setModalContent } = useRef(ModalContext)
    
    useEffect(() => {
        setModalContent(<ModalContent setToggle={setToggle} />)
    }, [])
    
     return (
         <div>
             <button onClick={setToggle}>open</button>
         </div>
     )
}
```
Kết hợp **React Hook** và **Context** cho phép chúng ta dễ dàng xử lý các bài toán như trên 
Trong bài viết này, mình đã trình bày một số trường hợp sử dụng **React Hook** để chia sẻ và tái sử dụng **logic** giữa các **component**, thật sự mình thấy **Custom Hook** rất dễ sử dụng và mạnh mẽ so với **Hocs** và **Render props** trước đây, hi vọng bài viết hữu ích với bạn đọc.