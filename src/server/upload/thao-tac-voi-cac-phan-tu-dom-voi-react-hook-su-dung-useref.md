Xử lý DOM là kỹ thuật căn bản mà mọi lập trình frontend cần nắm, tuy nhiên nhiều anh em không cảm thấy hứng thú khi sử dụng refs.
Theo như hiểu biết của mình tính đến thời điểm hiện tại, chúng ta có đến tận 4 cách để dùng refs !!!!
- Dùng string (không được khuyến khích)` (<div ref="stringGiday" />)`
- Dùng callback ref (`<div ref={ref => {this.inputRef = ref }} />`)
- Dùng API createRef
- Dùng hook useRef<br>
Refs đã chán nay còn chán hơn khi có quá nhiều lựa chọn. Nhưng nếu bắt buộc phải thay đổi DOM thì mình sẽ chọn hook useRef. Vì vậy trong bài viết này chúng ta sẽ cùng tìm hiểu useRef và cách sử dụng nó nhé.
### 1. UseRef():
Theo [tài liệu chính thức ](https://reactjs.org/docs/hooks-reference.html#useref) ta có định nghĩa về useRef như sau:
> The useRef Hook is a function that returns a mutable ref object whose .current property is initialized to the passed argument (initialValue). The returned object will persist for the full lifetime of the component.

```objectivec
const refContainer = useRef(initialValue);
```
Các trường hợp phổ biến khi cần phải truy cập tới các thành phần con trong DOM đó là làm việc với input:
```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
Về cơ bản, useRef giống như một "box", dùng để lưu các giá trị của một element sử dụng thuộc tính **.current**.  Bạn có thể quen thuộc với ref chủ yếu như một cách để truy cập DOM. Nếu bạn chuyển một đối tượng ref cho React với `<div ref = {myRef} />`, React sẽ đặt thuộc tính **.current** của nó tới node DOM tương ứng bất cứ khi nào node đó thay đổi.

Tuy nhiên, useRef () hữu ích hơn nhiều so với thuộc tính ref. Nếu bạn đã quen thuộc với Class Component, bạn có thể nhận thấy rằng Fuction Component là component không có khả năng render function. Mọi thứ được định nghĩa trong phần thân của hàm là hàm kết xuất trả về JSX cuối cùng. 
Điều này có nghĩa là bất cứ khi nào có thay đổi về state thì tất cả các đoạn code  trong function component sẽ được thực thi. Điều này chỉ ra rằng nếu chúng ta có một biến đối tượng bên trong function component thì với mỗi render, điều này sẽ được khởi tạo với giá trị mặc định. Chúng ta hãy chứng minh điều này. Chúng ta có một biến đếm tổng mỗi lần component đc render. Đầu tiên chúng tôi sẽ viết một cái gì đó như dưới đây :
```javascript
import React, {useState} from 'react';
const child = {
  padding: '25px',
  margin: '25px',
  border: '2px solid blue'
};

const Child = (prop) => {
  console.log("fuction called....");
  let counter = 0;
  let [myState, setMyState] = useState("A");

  let updateState = () => {
    counter++;
    setMyState(myState + "-u-");
    console.log("counter: "+ counter);
  }

  return (
    <div style={child}>
      <div>
        <div>MyState : {myState}</div>
        <input type="button" onClick = {() => updateState()} value="Update State"></input>
      </div>
    </div>
  );
}

export default Child;
```
Nhưng, Ở đây chúng ta thấy một vấn đề mà mọi giá trị đếm stateChage là 1 và lý do rất đơn giản mỗi lần render thì biến counter được gán lại.
![](https://images.viblo.asia/a7b59a54-16d4-4e77-a157-3f0fe3050a27.png)
Yêu cầu ở đây là Nó sẽ được tăng lên với mỗi khi thay đổi trạng thái. Bây giờ chúng ta hãy sửa đổi biến thể hiện này được tạo bằng useRef. Với ref, một object được trả về và tồn tại trong suốt vòng đời của component

```javascript
import React, {useState, useRef} from 'react';
const child = {
  padding: '25px',
  margin: '25px',
  border: '2px solid blue'
};

const Child = (prop) => {
  console.log("fuction called....");
  let counter = useRef(0);
  let [myState, setMyState] = useState("A");

  let updateState = () => {
    // Now we can update the current property of Referenced object as below.
    counter.current++;
    setMyState(myState + "-u-");
    console.log("counter: "+ counter.current);
  }

  return (
    <div style={child}>
      <div>
        <div>MyState : {myState}</div>
        <input type="button" onClick = {() => updateState()} value="Update State"></input>
      </div>
    </div>
  );
}

export default Child;
```
Bây giờ, cuối cùng chúng tôi nhận được kết quả mong đợi.
![](https://images.viblo.asia/c4072516-88db-4cc2-9129-7e9d12505334.png)
### 2. Khi nào sử dụng thuộc tính Ref???
Nhưng nó không phải luôn luôn là một ý tưởng tốt để sử dụng thuộc tính ref. Nguyên tắc chung là tránh nó. Tài liệu React chính thức đề cập đến khi nào bạn có thể sử dụng nó vì bạn không có lựa chọn nào khác.<br>
```markdown
- Managing focus, text selection, or media playback.
- Integrating with third-party DOM libraries.
- Triggering imperative animations.
```
<br> Đầu tiên, bạn có thể sử dụng thuộc tính ref để truy cập API DOM (API là gì?). Bạn có thể nhận được giá trị của một phần tử đầu vào nhưng bạn cũng có thể kích hoạt các phương thức focus(). Ví dụ, nó cung cấp cho bạn quyền kiểm soát API DOM để sử dụng các thành phần media.<br>
Thứ hai, bạn có thể sử dụng nó để tích hợp với các thư viện của bên thứ ba dựa vào DOM. D3.js là một trường hợp sử dụng như vậy, bởi vì nó phải nối vào DOM và nó có API thao tác DOM riêng. Chẳng hạn, bạn có thể muốn tích hợp một thành phần D3 trong hệ thống phân cấp thành phần React của bạn. Do đó, bạn có thể sử dụng thuộc tính ref làm điểm vào cho thành phần D3. Bạn rời khỏi thế giới React và truy cập vào thế giới D3.<br>
Cuối cùng nhưng không kém phần quan trọng, bạn có thể kích hoạt hình ảnh động bắt buộc trên các element của bạn. Đây là những trường hợp tiêu biểu bạn nên sử dụng thuộc tính ref để truy cập đến React DOM của mình.
### Tài liệu tham khảo:
- https://www.codementor.io/@dhananjaykumar/useref-hook-as-mutable-ref-object-ykb77fwvk
 - https://reactjs.org/docs/hooks-reference.html#useref