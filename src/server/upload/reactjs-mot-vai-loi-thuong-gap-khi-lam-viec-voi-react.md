### 1.  Thao tác trực tiếp với DOM:
Đây là lỗi thường gặp với các developer mới. Đặc biệt đối với những developer đã quen làm việc với Jquery trước đây. Dừng lại vài giây xem trước kia bạn đã từng code như thế này không?
```
import React from "react";

export class Menu extends React.Component {
  componentDidMount() {
    if (window.innerWidth < 500) {
      const menu = document.querySelector(".menu");
      menu.classList.add("mobile");
    }
  }
 
  render() {
    return <div className="menu">{this.props.children}</div>;
  }
}
```
**Hướng giải quyết:**

Trong React chúng ta nên tránh việc thao tác trực tiếp trên DOM. Thay vì truy cập trực tiếp phần tử và thêm class cho nó, chúng ta sử dụng state trong component và sử dụng state để thêm class chúng ta mong muốn.
```
import React from "react";

export class Test extends React.Component {
  state = {
    isMobile: false
  };
  componentDidMount() {
    if (window.innerWidth < 500) {
      this.setState({
        isMobile: true
      });
    }
  }
 
  render() {
    return (
      <div className={this.state.isMobile ? "mobile" : ""}>
        {this.props.children}
      </div>
    );
  }
}
```
Code chúng ta giờ đây hoàn toàn dễ hiểu, cập nhật className một cách dễ dàng mà không phải sử dụng **document.querySelector**
### 2. Không clear các sự kiện đã khai báo trong componentDidmount:
Chúng ta sử dụng một ví dụ đơn giản, khi người dùng nhấn phím space trên bàn phím sẽ kích hoạt một sự kiện nào đó. Một vài developer mới sẽ viết code trông như thế này:
```
import React from "react";

export class CaptureSpace extends React.Component {
  componentDidMount() {
    document.body.addEventListener("keydown", event => {
        if (event.keyCode === 32) {
          // do something when user hits spacebar
        }
    });
  }
  
render() {
    return (
       //
    );
  }
}
```
Trong đoạn code trên khi thêm một sự kiện lắm nghe **keydown** nhưng không remove nó sau đó. Điều này có thể dẫn tới rò rỉ bộ nhớ và khó debug trong quá trình code. Do đó cách tốt nhất chúng ta nên remove sự kiện khi chúng ta unmount component đó.
```
import React from "react";

export class CaptureSpace extends React.Component {
  componentDidMount() {
    document.body.addEventListener("keydown", this.captureSpace);
  }
  
componentWillUnmount() {
    document.body.removeEventListener("keydown", this.captureSpace);
  }
const captureSpace = event => {
    if (event.keyCode === 32) {
      // do something when user hits spacebar
    }
  };
 
render() {
    return (
       //
    );
  }
}
```
### 3. setState là hàm bất đồng bộ:
Một lỗi mà đa số developer đã từng gặp đó là cố gắng truy cập giá trị state ngay sau khi thực hiện hàm **setState()**.
```
handleChange = count => {
  this.setState({ count });
  this.props.callback(this.state.count); // Old state value
};
```
Việc cập nhật giá trị mới cho state không được thực hiện ngay lập tức, thông thường nó sẽ hoàn thành trong lần render kế tiếp. Vì vậy việc truy cập giá trị state ngay sau khi **setState** sẽ không phải là state mới nhất được update. Chúng ta có thể giải quyết vấn đề này bằng cách sử dụng **callback function** của hàm setState(), hàm sẽ được thực thi say khi state được update.
```
handleChange = count => {
  this.setState({ count }, () => {
    this.props.callback(this.state.count); // Updated state value
  });
};
```
### 4. Sửa trực tiếp State:
**State** trong React được coi là bất biến do đó chúng ta cần tránh việc thay đổi trực tiếp state. Trong ví dụ dưới đây chúng ta sẽ update các trường được checked dựa vào object **listFeatures**.
```
const updateFeaturesList = (e, idx) => {
  listFeatures[idx].checked = e.target.checked;
  setListFeatures(listFeatures);
};
```
Trong đoạn code trên object **listFeatures** được sửa một cách trực tiếp state được update với cùng một object do đó UI không được re-render lại. Solution ở đây chúng ta nên dùng hàm **map()** và object spread để đảm bảo chúng ta không thay đổi trực tiếp state:
```
const updateFeaturesList = (e, idx) => {
  const { checked } = e.target;
  setListFeatures(listFeatures => {
    return listFeatures.map((feature, index) => {
      if (idx === index) {
        feature = { ...feature, checked };
      }
      return feature;
    });
  });
};
```
### Kết luận:
Trên đây chỉ là một vài mistake mà mình cũng đã từng gặp và sưu tập được và muốn chia sẻ với các bạn. Mong rằng bài viết sẽ hữu ích để giúp các developer tránh những lỗi không đáng có. Rất cảm ơn các bạn đã đón đọc!
### Tham khảo:
- https://medium.com/frontend-digest/mistakes-junior-react-developers-make-c546b1af187d
- https://dev.to/clarity89/the-most-common-mistakes-when-using-react-45h2