Trong bài này chúng ta sẽ cùng nhau tìm hiểu sự khác nhau giữa functional và class components trong React và khi nào chúng ta nên chọn cái nào.

Cách đơn giản nhất để xác định một component trong React là tạo một hàm Javascript:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
Trên thực tế nó chỉ là một hàm trả về một phần tử React. Tuy nhiên chúng ta cũng có thể sử dụng cú pháp ES6 để viết các component như:
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Cả 2 ví dụ trên thì đều cho ra một kết quả giống nhau. Vậy thì chúng ta lại tự đặt ra câu hỏi rằng: "Khi nào chúng ta sử dụng function và khi nào thì sử dụng class?". Để giải được câu hỏi đó trước hết chúng ta cùng nhau đi tìm hiểu sự khác nhau giữa functional và class component nhé :D.
## Cú pháp
Sự khác biệt rõ nhất là cú pháp. Một functional component thực tế chỉ là một hàm Javascript đơn giản chấp nhận các props như là một argrument và trả về một phần tử React.

Một class component yêu cầu chúng ta cần kế thừa từ phần React.Component và tạo một function render trả về một phần từ React. Điều này sẽ đòi hỏi chúng ta phải code nhiều hơn nhưng cũng sẽ cung cấp một số lợi ích mà chúng ta sẽ thấy sau này.

Cùng nhìn về ví dụ code được chuyển đổi bời mã Babel chúng ta sẽ thấy một số khác biệt chính:

```
// Function component
const Car = () => {
  return <h2>Hi, I am also a Car!</h2>;
}

// Class component
class Car extends React.Component {
  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}
```
Với ví dụ trên chúng ta hoàn toàn có thể nhận ra sự khác biệt giữa functional và class components. Functional đơn giản chỉ là một hàm trong javascript còn class component là các lớp đơn giản yêu cầu bạn mở rộng từ React để cấu tạo nên components.

## props
Chúng ta cần sử dụng props khi sử dụng cùng một Component nhưng với những thông số khác nhau.

Ví dụ chúng ta có một component in ra chữ Xin chào, nhưng vì muốn tái sử dụng để in ra Xin chào bạn, sử dụng props:
```
// Functional
const Hello = (props) => {
  return (
    <div className="App">
         Hello {props.name}
    </div>
  );
}

// Class component
class Hello extends React.Component {
  render() {
      return (
        <div className="App">
             Hello {this.props.name}
        </div>
      );  
  }
}

// Sử dụng
<Hello name="You" />
```
Với props trong Class Component được xem như giá trị truyển vào cho hàm khởi tạo class. Còn props trong Function Component thì được xem như là giá trị truyền vào hàm pure function khi định nghĩa component.

## State
Trước khi phiên bản React 16.8 ra đời thì chúng ta gần như không thể nào sử dụng state trong functional. Tuy nhiên phiên bản react 16.8 xuất hiện với một thuật ngữ hoàn toàn mới đó là hooks. Với việc xuất hiện hook thì việc sử dụng state trong functional hoàn toàn dễ dàng. Các bạn có thể tìm hiểu thêm tại https://vi.reactjs.org/docs/hooks-intro.html.

state trong Class Component dược định nghĩa như sau:
```
import React, { Component } from 'react';

class TestComponent extends Components {
  constructor(props) {
    super(props);
    // khởi tạo giá trị state
    this.state = { isLoading: false };
  }

  render() {
    return <div>TestComponent</div>;
  }
}
```
Khi muốn thay đổi giá trị state bạn gọi phương thức setState của component:
```
this.setState((state) => ({ isLoading: true }));
```

state trong Function Component được định nghĩa như sau:
```
import React, { useState } from 'react';

export function TestComponent(props) {
  // giá trị khởi tạo state được truyền vào trong useState hook
  const [state, setState] = useState({ isLoading: false });

  return <div>TestComponent</div>;
}
```
Các bạn để ý hàm useState trả về giá trị của component state trong biến state và hàm setState. Khi muốn thay đổi giá trị của state thì bạn có thể gọi hàm setState.
```
setState({ isLoading: true });
```

## Kết luận:
Có những ưu và khuyết điểm trong cả 2 cách sử dụng trên nhưng có lẽ functional đang chiếm ưu thế hơn trong tương lai. Như chúng ta nhận thấy việc sử dụng functional làm cho code ngắn gọn, đơn giản hơn giúp chúng ta dễ phát triển và bảo trì hơn. Với mình sau khi đọc về react hook mình nhận thấy thích sử dụng các functional component hơn =)). Còn vơi bạn thì sao hãy để lại ý kiến đóng góp dưới comment cho mình nha. Cảm ơn các bạn đã theo dõi.