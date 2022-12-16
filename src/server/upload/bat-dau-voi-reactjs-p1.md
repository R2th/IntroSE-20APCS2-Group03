## Introduction
React (Hay ReactJS, React.js) là một thư viện Javascript mã nguồn mở để xây dựng các thành phần giao diện có thể tái sử dụng. Nó được tạo ra bởi Jordan Walke, một kỹ sư phần mềm tại Facebook.

Khi tìm hiểu về ReactJs mình thấy có 3 khái niệm cơ bản mà hay nhắc đến là Component, Props, State.
## 1. Component
Là cái khối hay là các bộ phận nhỏ và có thể tái sử dụng một component ở nhiều nơi với các trạng thái hoặc thuộc tính khác nhau và một component có thể chứa thành phần khác.

Mỗi component có một trạng thái riêng, có thể thay đổi và React sẽ thực hiện cập nhật component dựa trên những thay đổi của trạng thái. 

Để khởi tạo Component chúng ta sẽ có nhiều cách như sau:
* Dùng let, const trong JavaScript ES6 hoặc var ở các phiên bản JavaScript thấp hơn.
* Dùng Function.
* Dùng Class trong JavaScript ES6.

Ví dụ:
```ruby

import React, { Component } from 'react';
 
#Ví dụ 1
let Tab_let = () => {
  return (
    <div>Khởi tạo bằng let</div>
  );
};
 
#Ví dụ 2
const Tab_const = () => {
  return (
    <div>Khởi tạo bằng const</div>
  );
};
 
#Ví dụ 3 - const hoặc let đều được
const Tab_shorthand = () => (
  <div>Cách tắt khi dùng Arrow Function</div>
);
 
#Ví dụ 4
function Tab_function() {
  return (
    <div>Khởi tạo bằng Function</div>
  );
}
 
#Ví dụ 5
class Tab_class extends Component {
  render() {
    return (
      <div>Khởi tạo bằng Class</div>
    );
  }
}
```
Ở đây khi dùng let hoặc const, chúng ta cần dùng Arrow Function hoặc Anonymous Function để gán vào cho biến hoặc hằng. 
Trong khi Function có cách dùng tương tự cách định nghĩa biến và hằng thì Class lại phải kế thừa từ Class Component trong ReactJS để có thể chạy được.
## 2. Props
“props” có nghĩa là gì?

Props thực chất là viết tắt của Properties

Cùng xem ví dụ sau đây:
```ruby
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
 
const element = <Welcome name="Sara" />;
```
Dòng `<Welcome name="Sara" />`tạo ra một thuộc tính name có giá trị "Sara". Nhìn có vẻ như một cách gọi hàm. Đúng là như vậy, props được chuyển đến component tương tự như cách một đối số được chuyển đến một hàm. Trọng thực tế, thậm chí chúng ta có thể viết một cách ngắn gọn hơn là:
```ruby
function Welcome(props) {
  return <h1>Hello {props.name}</h1>;
}
```
Một component cũng có thể có props mặc định, do đó nếu component không truyền vào props nào thì nó vẫn sẽ được thiết lập. Chúng ta có thể tạo thuộc tính `name` mặc định bằng cách thêm `defaultProps` vào class `Welcome`:
```ruby
class Welcome extends React.Component {
  render() {
    return <h1>Hello {this.props.name}</h1>;
  }
}
 
Welcome.defaultProps = {
  name: "world",
};
```

Nếu Welcome được gọi mà không truyền vào bất kỳ thuộc tính name nào thì nó đơn giản sẽ render ra `"Hello world"`

Vì vậy, props có thể đến từ parent, hoặc có thể được thiết lập bởi chính component đó.

**Không nên thay đổi Props**

Bạn có thể thay đổi props bằng cách sử dụng setProps hay replaceProps nhưng nó không được khuyến khích.

Kể từ lúc chúng ta truyền props vào component thì chúng không được thay đổi. Điều này giúp bạn nghĩ đến sẽ sử dụng props cho bất kì component nào mà luôn hiển thị cùng 1 đầu ra cho cùng 1 đầu vào. Điều này giúp chúng ra dễ dàng kiểm soát nó.

## 3. State

Giống như props, sate cũng giữ thông tin về component. Tuy nhiên, loại thông tin và cách xử lý nó khác nhau. State hoạt động khác với Props. State là thành phần của component, trong khi các props lại được truyền giá trị từ bên ngoài vào component Có một lưu ý nhỏ là chúng ta không nên cập nhật state bằng cách sử dụng trực tiếp this.state mà luôn sử dụng setState để cập nhật state của các đối tượng. Sử dụng setState để re-renders một component và tất cả các component con. Điều này thật tuyệt, bởi vì bạn không phải lo lắng về việc viết các xử lý sự kiện (event handler) như các ngôn ngữ khác.

**Khi nào thì sử dụng State**

Bất cứ khi nào dữ liệu thay đổi trong một component, State có thể được sử dụng.

**Sử dụng state trong component**

Trước hết chúng ta hãy cùng nhìn vào đoạn code sau:
```ruby
class Form extends React.Component {
  constructor (props) {
     super(props)
     this.state = {
       input: ''
     }
  }
handleChange = (text) => {
    this.setState({ input: text })
  }
  
  render () {
    const { input } = this.state
    return (
    <div>
        <label>
          Name:
           <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </div>
      )
    }
 }
```
Trong đoạn code trên, bạn có thể thấy một lớp Form với một state input. Nó hiển thị một text input chấp nhận đầu vào của người dùng. Mỗi khi người dùng nhập văn bản, onChange được kích hoạt, lần lượt gọi setState trên input.

SetState kích hoạt re-rendering lại component, và giao diện người dùng (UI) bây giờ được cập nhật với thông tin mới nhất được nhập từ người dùng. Ví dụ đơn giản này minh họa state trong một component có thể được cập nhật như thế nào và cách sử dụng nó.

## Kết luận
Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về props và state. Cảm ơn các bạn đã theo dõi. Trong bài viết có tham khảo tại [đây](https://lucybain.com/blog/2016/react-state-vs-pros/)