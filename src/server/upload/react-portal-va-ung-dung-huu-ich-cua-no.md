Trong lúc phát triển dự án về web cùng với `react` các bạn đã nghĩ đến việc show một modal full màn hình hay show một notification ở góc màn hình và đặt chúng ở đâu trong `DOM` chưa? Ở trong bài này tôi sẽ giúp bạn tìm ra giải pháp đó.

## React Portals là gì?

Đây chính là giải pháp mà tôi muốn chia sẻ `React Portals` sẽ giúp bạn giải quyết được vấn đề ở trên, Nó cho phép bạn tạo ra `component` bên ngoài app của bạn hay nói cách khác là bên ngoài thẻ `<div id="root"></div>` nhưng nó vẫn giữ được các `state` và bạn vẫn có thể sử dụng đồng thời truyền những props vào như một `component` bình thường vậy mà vị trí trong DOM có thể ở bất cứ đâu.

## Vậy sử dụng nó như thế nào?

Trước tiên ở thư mục index.html bạn cần thêm 1 thẻ như sau:

```html
<div id="portal"></div>
```

Thẻ này sẽ chứa tất cả nhưng `component` nào mà bạn không muốn nó xuất hiện trong `DOM` của `<div id="root">`.

Tiếp theo bạn cần tạo một `portal` để chứa các `component` alert hoặc notification của mình.
`portal > index.jsx`

```js
import React from "react";

const Portal = ({ children }) => {
  const domElement = document.getElementById('portal');

  return (
    ReactDOM.createPortal(children, domElement)
  );
}

export default Portal;
```

Bây giờ bạn chỉ cần tự tạo cho mình một cái notification thật xịn xò và đẹp đẽ sau đó apply vào `portal` nữa là xong rồi.

`notification > index.jsx`

```js
import React from "react"
import Portal from '../portal'

const Notification = ({
  children,
  autoClose = 3000,
  onClose,
}) => {
  const [isClose, setIsClose] = React.useState(false)

  React.useEffect(() => {
    const timerId = setTimeout(() => setIsClose(true), autoClose)

    return () => {
      clearTimeout(timerId)
    }
  }, [autoClose])

  const animationEnd = () => {
    if (isClose) onClose()
  }

  return (
    <Portal>
        <div className={`container ${isClose ? "close" : "open"}`} onAnimationEnd={animationEnd}>
          <div className="container__icon">
                Icon
          </div>
          <p className="container__message">{children}</p>
          <div className="container__close" onClick={() => setIsClose(true)}>
              x
          </div>
        </div>
    </Portal>
  )
}

export default Notification
```

`notification > style.css`

```css
.container {
  width: 350px;
  min-height: 65px;
  display: flex;
  align-items: center;
  background-color: #2BDE3F;
  position: fixed;
  top: 40px;
  right: 0;
  z-index: 300;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  overflow: hidden;  
}

@keyframes fadeOut {
  0% {
    transform: translateX(0) rotateY(0) scale(1);
    transform-origin: -1800px 50%;
    opacity: 1;
  }
  100% {
    transform: translateX(1000px) rotateY(-30deg) scale(0);
    transform-origin: -100% 50%;
    opacity: 0;
  }
}

@keyframes fadeIn {
  0% {
    transform: translateX(1000px) rotateY(-30deg) scale(0);
    transform-origin: -100% 50%;
    opacity: 0;
  }
  100% {
    transform: translateX(0) rotateY(0) scale(1);
    transform-origin: -1800px 50%;
    opacity: 1;
  }
}

.close {
  animation: fadeOut 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.open {
  animation: fadeIn 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.container__message {
  flex: 1;
  padding: 10px 26px 10px 10px;
  color: white;
  font-weight: bolder;
  font-size: 14px;
  line-height: 1.5;
}

.container__icon {
  width: 65px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #0a6314;
}

.container__close {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
}
```
Giờ chỉ việc show ra thành quả thôi nào

```js
import React from "react";
import Notification from "./notification"

function App() {
  return (
    <div>
         <h1>Hello Bro !!!</h1>
         <Notification>This is notification</Notification>
    </div>
  );
}

export default App;
```

Trên đây là một ví dụ nhỏ về ứng dụng của  React Portals. Bạn có thể áp dụng tương tự cho `Modal` hoặc là `Tooltip` chẳng hạn.

Nếu muốn tìm hiểu kĩ càng hơn về nó thì hãy vào [đây](https://reactjs.org/docs/portals.html) nhé :v: