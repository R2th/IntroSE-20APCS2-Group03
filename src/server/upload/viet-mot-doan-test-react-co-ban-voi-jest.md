### Tại sao phải viết Testing?
Mặc dù chúng ta có thể tự self test code của mình trên môi trường local, tuy nhiên việc cứ sao chép qua lại các function như vậy cũng khiến công việc trở nên nhàm chán. Chưa kể làm vậy có khi bị miss nhiều lỗi xảy ra trong quá trình thao tác qua lại như vậy. Một số loại lỗi được điểm tên như sau:

- Syntax Errors (Lỗi cú pháp): Có thể do chúng ta đã viết sai cú pháp ở đâu đó, thông thường nếu sử dụng lint thì sẽ thường xuyên bắt gặp khi commit code.
- Type Errors (Lỗi : Chúng ta đã truyền sai loại data ở function nào đó (kiểu như lẽ ra phải truyền vào "1" thay vì 1, hoặc truyền vào "true" thay vì true). Tuy rằng nó vẫn đúng nhưng có một vài tình huống sẽ vô tình gây not working nếu truyền không đúng. Đây là tình huống khá thảm, nhưng thật may vì giờ có Typescript có gợi ý khi gõ đã giúp kiểm soát được vấn đề này dễ dàng hơn.
- Logic Errors (Lỗi logic): Đây rồi, riêng với ca này thì lint hay Typescript cũng chẳng thể cứu được chúng ta. Code viết tốt đấy, rõ ràng đã pass thậm chí trả về đúng types đó, nhưng sao nó vẫn không chạy nhỉ :)). Logic mà, đã sai thì muốn bắt nó quay đầu, chúng ta cần làm thêm vài thao tác testing để chắc chắn đúng hơn phải không.

### Đóng vai làm Tester ngắn hạn
Thử xem, viết một đoạn test đơn giản kiểu như "Nếu là X, thì mong đợi Y" chẳng hạn. Và ta sẽ có các đoạn văn mẫu như sau:
- Nếu ứng dụng được người dùng cuối xài đúng cách, vậy ta sẽ mong đợi điều gì?
- Nếu ứng dụng bị người dùng cuối xài sai cách, vậy điều mong đợi ở đây là gì?
- Người dùng sẽ  thao tác thế nào để ứng dụng của tôi toang trong một nốt nhạc?
- .....

Bằng cách đặt ra những câu hỏi như vậy sẽ giúp chúng ta linh động hơn trong việc fill được một danh sách các kịch bản cần test, biết đâu lại trông ra dáng như một tester thực thụ vậy.

Cài đặt thử một project React để test nào!
```
npx create-react-app testingpractice
```
Tham khảo thêm về cách thiết lập Jest cho React [tại đây](https://jestjs.io/docs/tutorial-react).

Thử ứng dụng vào project cơ bản *basic counter* huyền thoại.

```js
import { useState } from "react";
import "./App.css";

function App() {
  //the state
  const [counter, setCounter] = useState(0);
  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>+1</button>
      <button onClick={() => setCounter(counter - 1)}>-1</button>
    </div>
  );
}

export default App;
```

Ý chính cần test trong component là phần counter. Do đó chúng ta sẽ tạo một kịch bản test xem counter có tồn tại hay không.

App.test.js

```js
import { render, screen } from '@testing-library/react';
import App from './App';

test("testing the counter exists", () => {
  // Render component cần test
  render(<App />);
  // Lấy ra h1 và button
  const h1 = screen.getByText("0");
  // Check xem h1 có tồn tại hay không
  expect(h1).toBeInTheDocument();
});
```

Giả định rằng sau khi component được render thì h1 sẽ trả về 0, vì thế sẽ check xem có hiển thị một phần tử text là 0 hay không.

```
run npm run test
```

Đoạn code test đã pass.

Kịch bản test thứ hai, nếu click button +1 thì số có được tăng lên không?

```js
test("testing the +1 button", () => {
  // Render component cần test
  render(<App />);
  // Testing the +1 Button
  const plusbutton = screen.getByText("+1");
  // click +1 button
  fireEvent.click(plusbutton);
  // test việc h1 đã thay đổi
  const h1plus = screen.getByText("1");
  expect(h1plus).toBeInTheDocument();
});
```
Kịch bản thứ ba, test trường hợp khi click button -1 thì có giảm hay không?
```js
test("testing the -1 button", () => {
  // Render component cần test
  render(<App />);
  // Testing the -1 Button
  const minusbutton = screen.getByText("-1");
  // Click -1 button
  fireEvent.click(minusbutton);
  // test việc h1 đã thay đổi
  const h1minus = screen.getByText("-1", {selector: "h1"});
  expect(h1minus).toBeInTheDocument();
});
```

Full đoạn code:
```js
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("testing the counter exists", () => {
  // Render component cần test
  render(<App />);
  // Lấy ra h1 và button
  const h1 = screen.getByText("0");
  // Check xem h1 có tồn tại hay không
  expect(h1).toBeInTheDocument();
});

test("testing the +1 button", () => {
  // Render component cần test
  render(<App />);
  // Testing the +1 Button
  const plusbutton = screen.getByText("+1");
  // click +1 button
  fireEvent.click(plusbutton);
  // test việc h1 đã thay đổi
  const h1plus = screen.getByText("1");
  expect(h1plus).toBeInTheDocument();
});

test("testing the -1 button", () => {
  // Render component cần test
  render(<App />);
  // Testing the -1 Button
  const minusbutton = screen.getByText("-1");
  // Click -1 button
  fireEvent.click(minusbutton);
  // test việc h1 đã thay đổi
  const h1minus = screen.getByText("-1", {selector: "h1"});
  expect(h1minus).toBeInTheDocument();
});
```
### Kết luận
Mục đích của bài viết này giúp chúng ta sẽ cảm thấy việc sử dụng testing sau khi hoàn chỉnh các chức năng code là một việc khá cần thiết. Nó sẽ giúp chúng ta xác thực được việc logic code có đang hoạt động đúng hay không, nếu không đúng thì chúng ta cần phải nâng cấp như nào. Sẽ giúp tránh được việc gây ra nhiều bug mà chỉ với một lần làm không thể phát hiện ra hết được. 

Trên đây chỉ là một ví dụ đơn giản để làm quen với testing React với Jest. Chúng ta có thể tham khảo thêm và tự trải nghiệm nhiều hơn với tài liệu về Jest [tại đây](https://jestjs.io/docs/tutorial-react).