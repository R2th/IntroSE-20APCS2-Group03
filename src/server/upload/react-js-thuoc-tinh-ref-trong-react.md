## Ref trong React Component là gì ?
**Ref** được sử dụng để lấy tham chiếu đến một **node DOM(Document Object Model)** hoặc có thể là một thể hiện của một component trong một ứng dụng React, tức là ref sẽ  về một node mà chúng ta tham chiếu đến khi **render xong cây dom**.

Trong react chúng ta thường sử dụng state thể thay đổi đổi DOM ảo, React không khuyến khích thay đổi DOM thật nhưng trong 1 số trường hợp sau ta có thể sử dụng ref để tương tác với DOM thật của 1 element:
* Xử lý focus ô input, text hoặc media playback
* Kích hoạt 1 animation
* Sử dụng node DOM để tương tác với 1 thư viện của bên thứ 3

Ngoài ra React cũng không khuyến khích chúng ta lạm dụng ref quá nhiều nếu vấn đề của bạn có thể sử dụng state, prop,…
> Avoid using refs for anything that can be done declaratively.
## 
## Các cách thao tác với Ref trong React
Vấn đề ở đây là dùng cách nào để lưu tham chiết của dom này, có 2 cách để truyền 1 biến làm nơi để lưu dữ liệu tham chiếu của cây dom.

**Sử dụng callback ref để lưu Ref của component**
```js
<div ref={ref => {divRef = ref }} />
```
**Gán trực tiếp ref bằng 1 biến được tạo từ useRef hoặc React.createRef() đối với class component**
```js
div ref={divRef} />
```
Nhưng làm cách nào để lưu và sử dụng được tham chiếu DOM mà chúng ta đã gán khi mà giá trị ref này chỉ có khi DOM element được render xong?

> Ví dụ: Ở đây mình dùng Ref để trigger focus vào ô input

**Dùng biến local để lưu ref của component**
```js
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
    const [count, setCount] = useState(1);
    let inputRef = null;
    console.log(inputRef);
    return (
        <div className="App">
            <input
                ref={(ref) => {
                    inputRef = ref;
                }}
            />
            <button
                onClick={() => {
                    console.log(inputRef);
                    inputRef.focus();
                    setCount(count + 1);
                }}
            >
                Focus input
            </button>
        </div>
    );
}
export default App;
```
![](https://images.viblo.asia/77184056-784f-4fb0-9ade-d078c6681005.gif)

Cách này sẽ hiệu quả nếu ta chỉ thao các với ref trong hàm onClick của button, nếu thao tác trong useEffect hoặc tính toán logic trước khi render lần sau thì sẽ là không thể vì lúc này DOM element chưa được khởi tạo và divRef của chúng ta là Null.

Thay vì sử dụng biến local ta có thể sử dụng 1 biến global bên ngoài component nhưng cách này là không khuyến khích sử dụng.

**Sử dụng useRef để lưu ref của component**
UseRef là 1 hook trả về 1 đối tượng với thuộc tính current lưu giá trị được gán. Đối tượng trả về sẽ tồn tại trong toàn bộ thời gian tồn tại của component và không tạo lại khi component render.

Nếu truyền 1 đối tượng ref được tạo từ useRef vào thuộc tính ref của React component, React sẽ đặt thuộc tính của nó .current của đối tượng này thành nút DOM tương ứng bất cứ khi nào nút đó thay đổi.
```js
import logo from './logo.svg';
import './App.css';
import { useRef, useState } from 'react';
function App() {
    const [count, setCount] = useState(1);
    let inputRef = useRef();
    console.log(inputRef);
    return (
        <div className="App">
            <input ref={inputRef} />
            <button
                onClick={() => {
                    console.log(inputRef);
                    inputRef.focus();
                    setCount(count + 1);
                }}
            >
                Focus input
            </button>
        </div>
    );
}
export default App;
```
![](https://images.viblo.asia/246fcae2-ee77-40e0-9684-3040a718ad79.gif)
Mình khuyến khích dùng cách này vì ngắn gọn, sử dụng hook quen thuộc với component.

Trên đây là những chia sẻ cá nhân của mình, mếu thấy hay hãy cho mình 1 , vote, clip hoặc comment suy nghĩ của bạn để bài viết của mình hoàn thiện hơn nhé <3.
![](https://images.viblo.asia/f666ce6f-3159-42f8-90d2-783468d93198.jpg)