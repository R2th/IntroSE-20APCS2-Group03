### 1. Lời mở đầu
Chắc các bạn hiện tại đang tìm hiểu cũng như đang code ReactJs thì không còn xa lạ gì với khái niệm React Hooks nhỉ. Qua trang chủ  [reactjs.org](https://vi.reactjs.org/docs/getting-started.html) hoặc các trang mà các tác giả đã hướng dẫn, giới thiệu vể React Hooks thì chúng ta có thể hình dung được React Hooks ra đời  với mục đính gì? cách sử dụng như nào?

Đến với bài viết này thì mình có chia sẻ một chút kiến thức về React Hooks mà mình đã tìm hiểu được, để tìm hiểu React Hooks một cách dễ hiểu nhất là chúng ta nên thực hiện qua các bước: 

 - B1: Hiểu React Hooks được ra đời như thế nào? ra đời giải quyết vấn đề gì?
 - B2: Cách sử dụng State Hook
 - B3: Sử dụng Effect Hook
 - B4: Quy tắc của Hooks 
 
### 2. Giới thiệu về hooks
Hooks mới được thêm vào trong React phiên bản 16.8. Chúng cho phép sử dụng state và những tính năng khác của React mà không cần phải dùng tới Class.

Dưới đây là ví dụ sử dụng React Hooks:
```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
 Như các bạn có thể thấy cú pháp tạo state, setState trong Hooks hoàn toàn dễ hiểu, code ngắn, thao tác gọi state, setState hoàn toàn đơn giản. 
 
 Hooks ra đời nhằm giải quyết các vấn đề:
 1. Khó để sử dụng lại logic giữa các component
     - Hook cho phép sử dụng lại logic mà không phải thay đổi cấu trúc component.
 2. Component phức tạp và trở nên khó hiểu: 
    - Khi bắt đầu code thì chúng sẽ tạo ra những component đầu tiên đơn giản, nhưng qua quá trình phát triển thì nó trở nên phức tạp và khó quản lý, bừa bộn các logic và side effect được đặt trong componentDidMount, componentDidUpdate, componentWillUnmount.
    - Hook cho phép bạn chia một component thành các hàm nhỏ hơn dựa trên các phần liên quan, chỉ với useEffect giải quyết được vấn đề bừa bộn các logic và side effect.
 3. Class khiến chúng ta thấy rất là bối rối khi code:
    - Bạn phải hiểu cách this hoạt động trong Javascript. Bạn phải nhớ bind các event handler. Nếu không sử dụng cú pháp đề xuất, code sẽ rất dài dòng.
    - Với hooks cho phép bạn sử dụng nhiều tính năng của React mà không cần Class.

 
### 3. Sử dụng State Hook
Để hiểu rõ cách viết khác nhau khi chúng ta thao tác với state thì mình có đưa ra ví dụ đếm số lần bạn click vào button, và hiển thị trên màn hình, mình sẽ viết làm 2 kiểu để so sánh:


#####  Cách sử dụng Class: 
```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>Bạn đã click {this.state.count} lần</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Bấm vào tôi
        </button>
      </div>
    );
  }
}
```
Đối với cách này thì các bạn phải khai báo một state trong 1 `constructor` với từ khóa `this.state` sau đó gán giá trị khởi tạo cho nó.

Khi muốn gọi state thì sẽ gọi là `this.state.${stateName}`, vd: `{this.state.count}`

Khi update value của state với câu lệnh `this.setState({stateName: value})`, vd: `{() => this.setState({ count: this.state.count + 1 })}`

 Đối với việc thao tác với State trong Class phải hiểu `this` hoạt động trong Javascript như nào, khi mình chưa biết đến React Hooks thì học đến đây là mình thấy cách sử dụng State này rất là thần kỳ rồi.
 

#####  Cách xử dụng State Hooks
```
import React, { useState } from 'react';

function Example() {
  // Khai báo 1 biến state mới đặt tên là "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Bạn đã click {count} lần</p>
      <button onClick={() => setCount(count + 1)}>
        Click vào tôi
      </button>
    </div>
  );
}
```
Đối với cách sử dụng này các bạn chỉ cần gọi `useState` từ React. Các bạn có thể khai báo state như công thức dưới đây:
```
const [name, setName] = useState(value);

Trong đó: 
  name: Tên của state
  setName: Đây là tên của hàm update value của state đó nó bắt đầu bằng string set + name state(viết hoa chữ cái đầu)
  value: Giá trị mặc định ban đầu của state
```

Khi chúng ta muốn lấy giá trị của state chỉ cần gọi `name`, vd: `{count}`

Khi muốn setState thì chúng ta gọi hàm `setName(value)`,  vd: `setCount(count + 1)}`

Nhìn 2 ví dụ trên các bạn có thể thấy là đối với cách sử dụng React Hooks thì code ngắn gọn hơn, dễ hiểu, dễ code hơn đúng không nào, đây cũng là sự nổi trội hơn của Hooks nhưng chưa hết, Effect Hook cũng rất là hay, giải quyết được nhiều vấn đề khi chúng ta thao tác với các side effect trong Class.

### 4. Sử dụng Effect Hook
Effect Hook cho phép thực hiện side effect bên trong các function component.

Nếu bạn quen với các phương thức lifecycle của React class, bạn có thể hình dung useEffect Hook như sự kết hợp của componentDidMount, componentDidUpdate, và componentWillUnmount.

Để hiểu hơn về câu nói ở trên thì chúng ta cùng phân tích một ví dụ sau đây: Yêu cầu của 2 cách là cập nhập document title ngay sau khi React thay đổi DOM:


#####  Cách sử dụng Class: 
```
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```
Trong React Class thì   chúng ta đặt các side effect trong các event như là `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`. Khi nhìn vào ví dụ trên thì chúng ta đã lập lại 2 thao tác tương tự nhau bên trong 2 phương thức lifecycle đó là cùng cập nhật document.

Lý do ở đây là gì: Chúng ta muốn thực hiện cùng một side effect khi component đã mount hoặc đã update. Chúng ta muốn thực hiện sau mỗi lần render, nhưng React Class component không có phương thức như vậy. Chúng ta có thể tách nó ra thành một hàm riêng, nhưng vẫn phải gọi nó ở 2 nơi khác nhau -> Đối với việc này dẫn đến sự trùng lặp về code, code dài hơn, phức tạp hơn, khi sửa đổi nội dung thì phải cập nhật ở nhiều chỗ -> **imperfect**.


#####  Cách sử dụng Hooks:

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
Ở đây thì chúng ta nói với React rằng component của chúng ta cần thực hiện một việc gì đó sau khi render.

React sẽ ghi nhớ hàm bạn truyền vào (là “effect”), và sau đó gọi lại hàm này sau khi DOM đã update.

Trong useEffect chúng ta có thể cập nhật document, fetch data, call Api...

Đối với cách này các bạn có thể dễ dàng thấy sử dụng rất dễ dàng, useEffect đã gói gọn chức năng của 3 componentDidMount, componentDidUpdate, và componentWillUnmount -> **perfect**.

### 5. Quy tắc khi sử dụng Hooks
##### 5.1 Chỉ gọi Hook ở trên cùng
- Không gọi hook bên trong loop, câu điều kiện, hay các function lồng với nhau. 
- Luôn sử dụng Hook ở phần trên cùng của React function, trước bất cứ việc trả về (return) nào. Với cách này, bạn đảm bảo các Hook được gọi theo đúng thứ tự trong các lần render. 

##### 5.2 Chỉ gọi Hook từ React Function

 - Gọi Hook từ React function components.

- Gọi Hook từ custom Hook.

##### 5.3 Có thể sử dụng nhiều state, effect trên cùng 1 components
Ở đây mình sẽ tạo một function Form trong đó có 2 state và 2 effect:
```
function Form() {
  // 1. Sử dụng state tên name
  const [name, setName] = useState('Mary');

  // 2. Sử dụng một effect lưu giá trị name trên form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Sử dụng state tên surname
  const [surname, setSurname] = useState('Poppins');

  // 4. Sử dụng 1 effect cập nhập title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

Vậy làm sao React biết được state nào ứng với lúc gọi useState ? React dựa trên thứ tự Hook được gọi. Trong ví dụ trên, vì thứ tự Hook được gọi đúng theo lúc khai báo trong khi render:

```
// Lần render thứ 1
// ------------
useState('Mary')           // 1. Khởi tạo  biết name với giá trị 'Mary'
useEffect(persistForm)     // 2. Thêm một effect
useState('Poppins')        // 3. KHởi tạo biến surname với giá trị 'Poppins'
useEffect(updateTitle)     // 4. Thêm một effect cập nhập title

// Lần render thứ 2
// -------------
useState('Mary')           // 1. Đọc giá trị biến name
useEffect(persistForm)     // 2. Thay thế effect cũ
useState('Poppins')        // 3. Đọc giá trị biến surname
useEffect(updateTitle)     // 4. Thay thế effect cập nhập title
// ...
```

### 6. Kết luận 
Qua các bước mình mô tả phía bên trên các các bạn cũng đôi phần hiểu được kiến thức về state hooks, effect trong ReactJs. 

Đối với mình thì sự cải tiến của ReactJs qua từng phiên bản sử dụng Hooks thay thế Class thì hoàn toàn hữu ích, giúp chúng ta khi code đơn giản, dễ hiểu hơn, tiết kiệm thời gian hơn.

Trên đây là những kiến thức mình tìm hiểu được về React Hooks, nếu các bạn có thắc mắc hay bổ sung hãy comment ở dưới nhé! Thankiu các bạn đã theo dõi bài viết của mình!

 Tài liệu: 
- https://vi.reactjs.org/