# Mở đầu
Nhắc đến React là nhắc đến 1 thư viện JavaScript tuyệt vời và ta sử dụng nó để xây dựng giao diện người dùng (UI). Nó cho tốc độ phản hồi tuyệt vời khi user nhập liệu lên trang web. Vì mọi người rất thích học tập và tìm hiểu về công cụ này. Tuy nhiên việc học và sử dụng Reactjs đôi khi sẽ hơi khó khăn với các bạn mới, khiến các bạn chơi vơi không biết về những khái niệm ví dụ như Hooks, useState, useEffect,...
# Hooks
Giới thiệu một chút về Hooks. Đó là Hooks cung cấp một cách làm mới, mạnh mẽ, trực quan hơn class component để tái sử dụng các chức năng giữa các component, khiến các component dễ hiểu hơn. Vì rất nhiều ưu điểm nổi trôi nên các nhà phát triển cũng yêu cầu nên sử dụng hooks trong các dự án.
## 1. Cập nhật state trong React mà không dùng setState?
Trước hết hãy đến với ví dụ sau. Với cách sử dụng class component để thay đổi 1 đoạn text trong button ta cần làm như sau:
```

import React, { useState } from "react";

export default class Button extends Component {
  constructor() {
    super();
    this.state = { buttonText: "Click me, please" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => {
      return { buttonText: "Thanks, been clicked!" };
    });
  }

  render() {
    const { buttonText } = this.state;
    return <button onClick={this.handleClick}>{buttonText}</button>;
  }
}
```
Và trong trường hợp nếu ta sử dụng Hook thì sao?
```
import React, { useState } from "react";

export default function Button() {
  const [buttonText, setButtonText] = useState("Click me, please");

  return (
    <button onClick={() => setButtonText("Thanks, been clicked!")}>
      {buttonText}
    </button>
  );
}
```
Wow, amazing! Đoạn code xử lý đã trở nên ngắn hơn. Đồng thời việc khởi tạo hay thay đổi giá trị **buttonText** trở nên dễ dàng hơn rất nhiều. 

Đoạn code `const [buttonText, setButtonText] = useState("Click me, please");` chính là cách ta sử dụng useState. Nó trả về một cặp giá trị dưới dạng mảng: state hiện tại (buttonText) và một hàm để update nó (setButtonText). Tham số "Click me, please" được truyền vào sẽ là giá trị mặc định của state hiện tại

## 2. Tìm nạp dữ liệu bằng useEffect
Bạn đã đọc về vòng đời của component trong React chưa? Chắc là đọc rồi và bạn để ý thấy có 3 method phổ biến mã component sẽ chạy qua đó là componentDidMount, componentDidUpdate và componentWillUnmount. 3 method rất tách biệt và dễ sử dụng tuy nhiên nó khiên component trở nên phức tạp hơn và việc quản lý chúng không hề dễ dàng chút nào. 

Và useEffect được ban cho sinh mệnh với nhiệm vụ phục vụ cùng một mục đích với componentDidMount, componentDidUpdate và componentWillUnmount trong các lớp React, nhưng được hợp nhất thành một API duy nhất.

Ví dụ ta muốn fetch dữ liệu lần đầu render thay vì sử dụng componentDidMount:
```
  componentWillUnmount() {
        fetch("http://localhost:3001/links/")
          .then(response => response.json())
          .then(data => setData(data));
    );
  }
```
bây giờ ta có kiểu viết dùng useEffect tương đương:
```
  useEffect(() => {
    fetch("http://localhost:3001/links/")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);
```
và nếu như ta muốn nó chạy mỗi lần component được render thì rất đơn giản
```
  useEffect(() => {
    fetch("http://localhost:3001/links/")
      .then(response => response.json())
      .then(data => setData(data));
  }, [abcState, xyzState]);
```
ta sẽ truyền thêm các giá trị vào mảng phụ và hiểu rằng, mỗi khi một giá trị nào đó trong mảng phụ thay đổi thì useEffect sẽ được chạy lại.


Và với componentWillUnmount ta sẽ chỉ cần thêm return cleanup() vào useEffect
```
  useEffect(() => {
    fetch("http://localhost:3001/links/")
      .then(response => response.json())
      .then(data => setData(data));
      
      return function cleanup() {
          //code ...
      }
  }, []);
```
# Kết
Trên đây là 1 vài tìm hiểu của mình về useState và useEffect. Mong mọi người sẽ đóng góp ý kiến về bài viết của mình ở dưới phần bình luận. Like và subcribe để nhận thêm nhiều bài viết mới nhé! Thươngs!!!

Nguồn: https://www.valentinog.com/blog/hooks/