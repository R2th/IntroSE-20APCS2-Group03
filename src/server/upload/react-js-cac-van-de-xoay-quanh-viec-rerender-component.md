React đang ngày càng trở nên phổ biến trong các thư viện hỗ trợ giao diện single page app. Cùng tìm hiểu các vấn đề xoay quanh việc react render các component cùng mình nhé.
## I. Khái niệm DOM và VDOM
**DOM**: Viết tắt của Document Object Model, tạm dịch là mô hình các đối tượng tài liệu. DOM được dùng để truy xuất và thao tác trên các tài liệu có cấu trúc dạng HTML hay XML bằng các ngôn ngữ lập trình thông dụng như Javascript, PHP,…
![](https://images.viblo.asia/d1e5b52b-5a89-4bcd-960c-6c054ff9908b.gif)

Tất cả các thẻ HTML đều được quản lý trong đối tượng document. Ở javascript để thao tác với các thẻ html chúng ta phải sử dụng đối tượng document như document.write, Node.appendChild, element.setAttribute.

**VDOM**: Virtual DOM (hoặc VDOM) của React, là bản coppy hoàn toàn của DOM. Những thay đổi mà ta muốn trong DOM sẽ được áp dụng cho VDOM trước tiên, react sẽ tính toán, so sánh với DOM trước đó (Snapshots) và thư viện ReactDOM sẽ thực hiện 1 cách hiệu quả nhất bằng cách chỉ thực hiện những gì cần được cập nhật.

Ví dụ: Nếu chỉ thuộc tính của 1 phần tử thay đổi React sẽ chỉ cập nhật thuộc tính của phần tử HTML bằng cách gọi document.setAttribute (hoặc 1 cái gì đó tương tự).

Các bản cập nhật DOM thực chậm vì chúng gây ra bản vẽ lại giao diện người dùng thực tế. React làm cho điều này hiệu quả hơn bằng cách cập nhật số lượng nhỏ nhất có thể trong DOM thực.

Bản chất không phải việc đọc và ghi vào cây DOM thực của trình duyệt là chậm hơn việc thay đổi thông qua javascript (DOM ảo) mà việc mất thời gian ở đây chỉnh là khi thực hiện thay đổi DOM thật trình duyệt sẽ mất thời gian tính toán lại style css của cả cây DOM.

## II. Khi nào react sẽ rerender component
> Quá trình render của 1 component react là việc chạy lại component, tính toán và update DOM ảo và dẫn đến thay đổi DOM (nếu có).

![](https://images.viblo.asia/ec41eba6-801f-44fa-a45b-db4087c7df6b.png)

### Khi state thay đổi (bao gồm cả case redux)

State có thể hiểu đơn giản nó là 1 nơi lưu trữ 1 dữ liệu nào đó của component, State thay đổi thì sẽ luôn trigger việc rerender lại component, dù đã có kinh nghiệm hay mới làm quen với react chúng ta cũng đều biết điều này.

Lưu ý ở đây là global state (từ redux) nếu bị thay đổi thì điều này cũng làm rerender lại các component sử dụng global state đó

Ví dụ: State count thay đổi thì component app được rerender
```
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function App() {
    const [count, setCount] = useState(0);
    console.log('Render app...');
    return (
        <div className="App">
            <button onClick={() => setCount(count + 1)}>Click me !</button>
        </div>
    );
}
export default App;
```
![](https://images.viblo.asia/29707df5-cd9b-4856-9c60-f0165bb1a70c.gif)

### Khi prop thay đổi

Props là một object được truyền vào trong một components, được sử dụng để giao tiếp giá trị giữa các component. Khi 1 prop của component thay đổi thì sẽ trigger rerender lại component đó

Ví dụ: Khi props count thay đổi thì component counter sẽ rerender lại
```
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function Counter(props) {
    console.log('Render counter...');
    return <div>Count: {props.count}</div>;
}
function App() {
    const [count, setCount] = useState(0);
    return (
        <div className="App">
            <button onClick={() => setCount(count + 1)}>Click me !</button>
            <Counter count={count} />
        </div>
    );
}
export default App;
```
![](https://images.viblo.asia/8f969c87-2815-467d-81d4-b1a6a5335dd4.gif)

### Khi component cha rerender
Khi component cha thay đổi thì các component con nếu không sử dụng 1 số kỹ thuật như sử dụng React.Memo, hay PureComponent thì cũng sẽ bị rerender theo.

Ví dụ: State count thay đổi => Component App rerender => Component Counter rerender
```
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
function Counter(props) {
    console.log('Render counter...');
    return <div>Count: {props.count}</div>;
}
function App() {
    const [count, setCount] = useState(0);
    console.log('Render app...');
    return (
        <div className="App">
            <button onClick={() => setCount(count + 1)}>Click me !</button>
            <Counter />
        </div>
    );
}
export default App;
```
![](https://images.viblo.asia/bcfc06da-8732-4f43-8b03-cd9fae54a714.gif)
## 
## III. Các vấn đề khi 1 component render
Như ở phần 1 đã đề cập, ReactDOM tối ưu các thay đổi tốt nhất có thể nên khi đa số khi render lại của component sẽ không ảnh hưởng quá nhiều đến hiệu năng của ứng dụng. Chúng ta chỉ thực sự nghĩ tới việc tối ưu khi các component này tính toán logic phức tạp, render các hiệu ứng animation nặng như biểu đồ, canvas,…

Để tối ưu việc rerender của component chúng ta sử dụng 1 số kỹ thuật như PureComponent, React.Memo, useMemo, useCallback mình sẽ đề cập sau ^.^

Trên đây là những chia sẻ cá nhân của mình, mếu thấy hay hãy cho mình 1 , vote, clip hoặc comment suy nghĩ của bạn để bài viết của mình hoàn thiện hơn nhé <3.
![](https://images.viblo.asia/f666ce6f-3159-42f8-90d2-783468d93198.jpg)