**Compound components** là 1 design pattern rất hay trong React, 1 kiểu component có thể quản lí`internal state` của nó và component đó được render như thế nào thì nằm ở phía `implementation`  chứ không phải `declaration` . 

```html
    <select>
    	<option>1</option>
    	<option>2</option>
    	<option>3</option>
    </select> 
    
    Đây cũng là 1 compound component.
```

Xem ví dụ để hình dung rõ hơn nhé: 

```jsx
<Toggle onToggle={onToggle}>
  <Toggle.On>The button is on</Toggle.On>
  <Toggle.Off>The button is off</Toggle.Off>
  <Toggle.Button />
</Toggle>
```

Ở ví dụ trên ta có:  

- `<Toggle.On>`, `<Toggle.Off>`, `<Toggle.Button>` : chính là các compound components
- `<Toggle>` là parent bao bọc các compound components
- **"1 cách nào đó"** để có thể parent Toggle và children có thể chia sẽ chung 1 `internal state`. Chúng ta sẽ sử dụng 1 số low-level React APIs để thực hiện điều này: [`React.children.map()`](https://reactjs.org/docs/react-api.html#reactchildrenmap) and [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement)



**Ưu điểm** của pattern này là tất cả các logics của component được đóng gói bên trong `<Toggle>` và các compound components của nó ( `<Toggle.On>`, `<Toggle.Off>`, `<Toggle.Button />`) được export cùng với `<Toggle>`. Từ đó khi sử dụng `<Toggle>` thì người sử dụng nó sẽ có toàn quyền control được `<Toggle>` sẽ render như thế nào. 

## Áp dụng Compound Components Pattern

Vậy chúng ta hãy thử áp dụng compound components pattern để build Toogle component ở trên nhé. 🏁

1. **Đầu tiên `<Toggle>` được define cơ bản như sau**: 

```jsx
import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    const {on} = this.state
    return <Switch on={on} onClick={this.toggle} />
  }
}

export default Toggle
       
```

2. **Build các compound components: `<On>`, `<Off>`, `<Button>`** 


    - Ở đây mình sử dụng `static` để define các compound components bên trong `<Toggle>` để giúp tối ưu `encapsulation` và tường minh hơn. Vẫn có thể define ra 1 class hoặc function component riêng nhé.
    - `<On>`, `<Off>` nhận vào các props là `on` và `children`.
        - `on` : để control điều kiện render ( từ state của `<Toggle>` )
        - `children:` content child của các compound components.
    - `<Button>`,  nhận vào các props là `on` và `toggle`.
        - `on` : để control điều kiện render `<Switch>` ( từ state của `<Toggle>` )
        - `toggle:` toggle function handler ( từ method của `<Toggle>` )

```jsx
import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
    static On = ({on, children}) => (on ? children : null)
    static Off = ({on, children}) => (on ? null : children)
    static Button = ({on, toggle, ...props}) => (
      <Switch on={on} onClick={toggle} {...props} />
    )
 /// ...
```

3. **Truyền state từ `<Toggle>` parent xuống các child: `<On>`, `<Off>`, `<Button>`**
    - [`React.children.map()`](https://reactjs.org/docs/react-api.html#reactchildrenmap) : method dùng để map các children của `<Toggle>`
    - [`React.cloneElement()`](https://reactjs.org/docs/react-api.html#cloneelement) : method dùng để clone các child component và đây là nơi mình chia sẽ được state của `<Toggle>` tới các children.
    - Nhiều bạn sẽ tự hỏi tại sao không sử dụng  `this.props.children.map()`  thì trong React khi component chỉ có 1 children thì `children` chính là children đó chứ không trả về 1 array. Chi tiết hơn thì các bạn xem docs về  hàm này nhé.

    **Và ta có `<Toggle>` hoàn chỉnh:**
```jsx
import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
    static On = ({on, children}) => (on ? children : null)
    static Off = ({on, children}) => (on ? null : children)
    static Button = ({on, toggle, ...props}) => (
      <Switch on={on} onClick={toggle} {...props} />
    )
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
        return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle,
      }),
    )    
  }
}

export default Toggle
        
```

4.  **Sử dụng `<Toggle>` component**

```jsx
 const onToggle = () => console.log('toggled')

<Toggle onToggle={onToggle}>
  <Toggle.On>The button is on</Toggle.On>
  <Toggle.Off>The button is off</Toggle.Off>
  <Toggle.Button />
</Toggle>
```


Tận dụng Compound components chúng ta còn có thể tạo ra những `highly customized` , `reusable components` và `clean component APIs` cho khi sử dụng. Giúp chúng ta có thể tách riêng được business logic và rendering logic.

Cám ơn các bạn đã theo dõi bài viết 😎

*Nguồn tham khảo:*

- [https://reactjs.org/docs/react-api.html](https://reactjs.org/docs/react-api.html)
- [https://medium.com/@Dane_s/react-js-compound-components-a6e54b5c9992](https://medium.com/@Dane_s/react-js-compound-components-a6e54b5c9992)