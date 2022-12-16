Trong bài viết này chúng ta sẽ cùng nhau đi tìm hiểu về Hook trong React, và giới thiệu các hooks hay được sử dụng trong quá trình làm việc với React.

Khi làm việc với các React Component chúng ta cần phải thao tác rất nhiều với state, props hay life cycle. Và kể từ phiên bản 16.8 trở đi React cung cấp một chức năng mới đó là React Hooks, chức năng này cho phép thay thế việc sử dụng state thông thường bằng các khái niệm mới như useState, useEffect..

Việc sử dụng React Hooks cho phép sử dụng state, hay các tính năng khác của React mà không cần phải viết một class component dài dòng.

## React Hooks là gì?
Chúng ta có thể hiểu React Hooks là một chức năng được xây dựng trong React cho phép chúng ta có thể sử dụng state và life cycle bên trong một functional components. Hooks đem lại một vài lợi ích khi làm việc như :

* Cải thiện hiệu suất làm việc bằng cách có thể tái sử dụng code.
* Các thành phần được trình bày khoa học hơn.
* Sử dụng một cách linh hoạt trong component tree.

React Hooks đem lại cho functional components các tính năng cần thiết của component, nó có thể thay thế gần như hoàn toàn việc sử dụng class components. Cùng nhìn vào ví dụ dưới đây:

Khi sử dụng class component
```
import React, { Component } from 'react';
 
export default class RandomNumberComponent extends Component {
  constructor(props) {
    super(props)
    //Khởi tạo state
    this.state = {
      number: 0
    }
    this.randomNumber = this.randomNumber.bind(this)
  }
  randomNumber = () => {
    const number = Math.round(Math.random() * 100)
    //Cập  nhật state mới
    this.setState({
      number
    })
  }
  render() {
    return (
      <div style = {{padding: '10%'}}> 
        <b>{this.state.number}</b> <hr /> 
        <button onClick={this.randomNumber}>Random</button>  
      </div>
    );
  }
}
```
Khi sử dụng functional component
```
import React, { useState } from "react";
 
export default function RandomNumberComponent(props) {
  const [number, setNumber] = useState(0)
 
  return (
    <div style={{ padding: "10%" }}>
      <b>{number}</b> <hr />
      <button onClick={() => {
        setNumber(Math.round(Math.random() * 100))
      }}>Random</button>
    </div>
  );
}
```

Hai cách viết trên đều có một chức năng giống nhau nhưng khi chúng ta sử dụng React Hooks sẽ giúp giảm các đoạn mã và tài nguyên.

## Hooks trong React JS cơ bản
Chúng ta có 10 hooks được xây dựng trong phiên bản React từ 16.8 trở đi. Nhưng trong bài này mình sẽ chỉ ra các hooks cơ bản hay được sử dụng bao gồm:

* useState()
* useEffect()
* useContext()
* useReducer()

Ở đây có 4 hooks cơ bản hay được sử dụng, bây giờ chúng ta sẽ đi tìm hiểu cơ bản nhất về các hooks này. Mình sẽ giới thiệu chi tiết cũng như ví dụ về từng hooks ở các bài viết tiếp theo.
### useState()
Việc sử dụng useState() cho phép chúng ta có thể làm việc với state bên trong functional component mà không cần chuyển nó về class component. Ở ví dụ bên trên mình cũng đã sử dụng useState() để cập nhật state. Chúng ta có thể sử dụng nó bằng cú pháp:
```
const [tenSate, hamCapNhatState] = useState(giaTriBanDauCuaState);
```
Đây làm một hooks được sử dụng hầu như trong tất cả các funcitonal component.

### useEffect()
useEffect() là function nắm bắt tất cả các sự thay đổi của code. Trong một function component, việc sử dụng life cycle không React hỗ trợ, bởi vậy rất khó để debug, cũng như nắm bắt được quá trình khởi chạy của component.

useEffect() sinh ra để làm điều này, nó được khởi chạy khi giá trị của một biến nào đó thay đổi, hay component đã được render ra,...useEffect() có thể thay thế hòan toàn các life cycle trong class component. Chúng ta có thể sử dụng nó bằng cú pháp :
```
useEffect(functionDuocKhoiChay, arrayChuaCacGiaTriThayDoi)
```
### useContext()
useContext() cho phép nhận về giá trị của context mỗi khi nó thay đổi. Cú pháp cơ bản như sau:
```
const giaTriCuaContext = useContext(TenContext);
```
### useReducer()
Hook useReducer được sử dụng để xử lý các state phức tạp và việc chia sẻ state giữa các component. Ở đây chúng ta có cú pháp.
```
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
## Kết luận
Trên đây chúng ta đã cùng nhau đi tìm hiểu về React Hooks trong ReactJS. Đây là kiến thức rất cơ bản về nó nhưng cũng hết sức quan trọng trong quá trình làm việc với ReactJS sau này. Mong rằng bài viết sẽ giúp ích cho bạn.