![](https://images.viblo.asia/29f99b03-79a6-47e7-a2cd-674e30d7c105.png)

Trong rất nhiều thư viện animation ở thời điểm hiện tại cho React thì **react-sping** có một chỗ đứng ổn định, với đà phát triển nhanh và mạnh mẽ (reach **~10k stars** github, **~45k download/week**  via npm) chỉ sau 1 năm ra mắt. Chúng ta hãy cùng đi tìm hiểu một vài nền tảng để sử dụng thư viện này một cách hiệu quả.

**React-spring** tập trung khai thác các animation vật lý, không cầu kì mà đơn giản và mang tính tổng quan (declarative), một trong những thư viện gọn và dễ tiếp cận nhất để tạo animation cho project của bạn.

### 1. Installation
Tạo một project với `create-react-app` và install react-spring, chúng ta sẽ thử khai thác và áp dụng luôn React Hook (có thể ở những kì tới) vì vậy cũng cần install `react@16.7.0-alpha`
```js
create-react-app react-spring-demo && cd react-spring-demo
npm install -S react-spring react@16.7.0-alpha.2 react-dom@16.7.0-alpha.2
```

### 2. Spring component: Tạo animate styles
`<Spring>` là Component cơ bản tạo animate cho bất cứ styles nào có dạng `from` `to` tương đồng với **@keyframes** của css
Một Spring Component có dạng đơn giản như sau:

```js
  <Spring
    from={{ styleOne }}
    to={{ styleTwo }}
  >
    {props => (
      <div style={props}>
        <div >
          ....
        </div>
      </div>
    )}
  <Spring />
```

Áp dụng luôn **Component** này vào tạo hiệu ứng khi load, ta có thể animate fade in cho toàn bộ App như sau:
```js
  // App.js
  import { Spring } from 'react-spring';

  class App extends Component {
    render() {
      return (
        <Spring
          from={{ opacity: 0, marginLeft: -1000 }}
          to={{ opacity: 1, marginLeft: 0 }}
        >
          {props => (
            <div className="App" style={props}>
              <div >
                <header className="App-header" >
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn React
                  </a>
                </header>
              </div>
            </div>
          )
          }
        </Spring>
      );
    }
  }
```

App sẽ slide in nhẹ nhàng với fadeIn effect chuyển opacity nhẹ nhàng từ 0 -> 1
Ta cũng có thể thêm `config` để set một số tùy chỉnh cho quá trình này:
```html
    <Spring
      from={{ opacity: 0, marginLeft: -1000 }}
      to={{ opacity: 1, marginLeft: 0 }}
      config={{ delay: 1000, duration: 2000 }}
    >
```

### 3. Inner Text Animation
Bên cạnh animate style, `<Spring>` cũng có thể animate value của content. Ta demo một Component này nested luôn trong header của App.
```html
  <Spring
    from={{ number: 0 }}
    to={{ number: 10 }}
    config={{ duration: 10000 }}
  >
    {props => <div>{props.number.toFixed()}</div>}
  </Spring>
```

Spring Component sẽ animate `props.number` từ 0 đến 10 với config `duration` tương đương 10s, hàm `toFixed()` được thêm vào khi print `props.number` để việc hiển thị tránh số thập phân.

### 4. Toggle với Spring animated và Transition
Giờ chúng ta sẽ tìm hiểu về `animated` trong **react-sping**
Ta sẽ đi tạo một Dummy Component và tiến hành toggle Component này ra với `animated`

```js
  // src/components/Dummy.js
  import React, { Component } from 'react'

  const customStyles = {
    background: 'skyblue',
    color: 'white',
    padding: '1.5rem 3rem',
  }

  export class Dummy extends Component {
    render() {
      return (
        <div style={customStyles}>
          <h1>Dummy Component</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo culpa doloribus accusantium ex rerum. Consequatur harum inventore quaerat! Tenetur ullam aliquid consequuntur adipisci! Iusto alias quos nihil eaque expedita vel? Explicabo facere, nesciunt culpa dicta pariatur quidem alias quasi vitae.</p>
        </div>
      )
    }
  }

  export default Dummy
```
Bước sau đó ta import Component này vào app và tạo cho App.js một state, một method và một button để apply method toggle **Dummy Component** này ra:
```js
// App.js

// Add state and method toggle
state = {
  showDummy: false
};

toggle = e => {
  this.setState({ showDummy: !this.state.showDummy });
};

// Add Button (anywhere you want to)
<button style={btnStyles} onClick={this.toggle}>
    Toggle Dummy Component
</button>
```

Sau đó ta bổ sung `import { Transition, animated } from 'react-spring'`
**Dummy Component** được wrap trong `Transition` và `animated.div`

```js
  <Transition
    native
    items={this.state.showDummy}
    from={{ opacity: 0 }}
    enter={{ opacity: 1 }}
    leave={{ opacity: 0 }}
  >
    {show =>
      show &&
      (props => (
        <animated.div style={props}>
          <Dummy />
        </animated.div>
      ))
    }
  </Transition>
```

### 5. Ref
Toàn bộ phần code demo trên các bạn có thể tham khảo tại: [react-spring-demo](https://github.com/spideyinf/react-spring-demo)

Bài viết có tham khảo Crash course: [Simple Animations In React](https://www.youtube.com/watch?v=S8yn3-WpVV8) của [Traversy Media](https://www.youtube.com/user/TechGuyWeb) (thanks to Mr.Brad)