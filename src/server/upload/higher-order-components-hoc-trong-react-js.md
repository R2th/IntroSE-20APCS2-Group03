Higher-Order Components (HOC - tạm dịch là các Component cao cấp hơn) là 1 kỹ thuật nâng cao của React để sử dụng lại logic của component. HOCs không phải là 1 phần của React API. Nó là một mô hình được phát triển tử bản chất React

Cụ thể
> Một HOC là 1 HÀM CÁI MÀ NHẬN VÀO 1 COMPONENT VÀ TRẢ VỀ 1 COMPONENT MỚI

(Component này chủ yếu sẽ thêm các props, dữ liệu hoặc gán thêm các sự kiện chung chứ không được thay đổi logic) kiểu như
```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
Trong phần tiếp theo chúng ta sẽ thảo luận xem vì sao HOC lại hữu ích và viết nó như thế nào.

# 1. Tiếp cận

Bài toán đặt ra là có một giá trị `userContext` là ta cần thêm nó vào một component X nào đó. Cách thông thường chúng ta nghĩ tới sẽ là sử dụng cú pháp context trong React thôi :D
```js
const user = {
  name: "MinhNV",
  school: "HUST",
  age: "100"
};

const UserContext = React.createContext(user);

class X extends React.Component {
  render() {
    return (
      <UserContext.Provider value={user}>
        <Toolbar />
      </UserContext.Provider>
    );
  }
}
```

Bây giờ ứng dụng phát triển, không chỉ component X mà các component A,B,C,D .... Z cũng cần `userContext`. Tất nhiên, chúng ta sẽ không bọc tất cả các thẻ đó `<UserContext.Provider value={user}>`, lúc này cần sử dụng HOC với 1 hàm để truyền giá trị `userContext` này vào các component. Lúc đó các component A,B,C,D sẽ được "nâng cấp" thành các thẻ `EnhancedAComponent` có thêm `userContext` với cú pháp
```js
const EnhancedAComponent = withUserContext(A, user);
```

Định nghĩa hàm đó như thế nào thì chúng ta cùng tiếp tục nhé.

# 2. Định nghĩa một HOC

Đầu tiên chúng ta sẽ tạo một thể đơn giản, bình thường trước khi bọc nó lại:
```js
import React from "react";

class WrappedComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("This is props of WrapComponent", this.props);
    return <p> Example wrapped Component and Enhanced Component </p>;
  }
}
```
Trong ví dụ trên, khi sử dụng Component `WrappedComponent`, console sẽ không hiện ra props nào. Bây giờ nhiệm vụ của chúng ta sẽ là sử dụng HOC để thêm props vào component này với dạng như sau
```js
const EnhancedComponent = withUserContext(WrappedComponent, newProps);
```

Chúng ta sẽ sử dụng props chứa trong context
```js
/* Props fake in context */
const userContext = {
  name: "MinhNV",
  age: 20,
  school: "HUST"
};

const UserContext = React.createContext(userContext);

/*
Add some context to the wraaped component use HOC (Higher-Order Component)
 */

function withNewProps(WrappedComponent, userContext) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <UserContext.Provider value={userContext}>
          <UserContext.Consumer>
            {newProps => <WrappedComponent user={userContext}> </WrappedComponent>}
          </UserContext.Consumer>
        </UserContext.Provider>
      );
    }
  };
}

const EnhancedComponent = withUserContext(WrappedComponent, userContext);

class HOC extends React.Component {
  render() {
    return (
      <div>
        <WrappedComponent />
        <EnhancedComponent />
      </div>
    );
  }
}

export default HOC;
```
Lúc này component `EnhancedComponent` được hiển thị ra những props mới là `userContext` được set vào. Như vậy bất cứ component nào cần `userContext`, chỉ cần sử dụng withUserContext là được, thật dễ dàng mà không cần phải bọc Provider và Consumer ở ngoài nó :D

Đến lúc này nếu bạn từng sử dụng redux cho ứng dụng bạn có thấy quen quen dạng
```js
export default connect()(TodoList)
export default combineReducers({
  todos,
  visibilityFilter
})
```
Đó là các kỹ thuật HOC giúp ta kết nối store hoặc làm một công việc gì đó :D
# 3. Một vài lưu ý khi sử dụng HOC
## 3.1. Đừng sử dụng HOC để thay đổi Component gốc của React. Chỉ sử dụng với Component bạn cần
Không nên sử dụng HOC vào protoype vì như vậy nó sẽ thay đổi vào Component gốc (các component cũng bị ảnh hưởng) thay vào đó chỉ sử dụng nó cho component được bao bọc:
```js
/*
Don't do this
*/
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // The fact that we're returning the original input is a hint that it has
  // been mutated.
  return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);

/*
Do this
*/
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Wraps the input component in a container, without mutating it. Good!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

## 3.2. Convention: Truyền các props không liên quan đến các thẻ được bao bọc (tất nhiên :v)
Bạn có thể truyền theo dạng Spread Attributes
```js
return <WrappedComponent {...this.props} />;
```
## 3.3. Convention: Tối đa hóa khả năng kết hợp và đọc code
Không phải tất cả các HOCs đều nhìn giống nhau. Thỉnh thoảng chúng chấp nhận đối số duy nhất là thẻ được bọc
```js
const NavbarWithRouter = withRouter(Navbar);
```
HOCs cũng thường xuyên chấp nhận thêm các đối số
```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```
Một số HOCs thì lại nhìn như
```js
// React Redux's `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```
Cái qué gì vậy? Nếu bạn ngắt chúng xa nhau ra, có lẽ sẽ dễ nhìn hơn @@
```js
// connect is a function that returns another function
const enhance = connect(commentListSelector, commentListActions);
// The returned function is a HOC, which returns a component that is connected
// to the Redux store
const ConnectedComment = enhance(CommentList);
```
Nói một cách khác connect là 1 hàm higher-order cái mà trả về 1 HOC @@.

Cách viết này dường như gây khó hiểu hoặc không cần thiết nhưng nó thực sự hữu ích. Đối số đơn HOCs như là 1 giá trị trả về bởi hàm "connect" có dấu hiệu là `Component => Component.`. Hãy viết theo cách này nếu có thể.

Các hàm có kiểu đầu ra giống như kiểu đầu vào của nó thực sự dễ dàng để kết hợp với nhau.
```js
// Instead of doing this...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... you can use a function composition utility
// compose(f, g, h) is the same as (...args) => f(g(h(...args)))
const enhance = compose(
  // These are both single-argument HOCs
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```
## 3.4. Thận trọng
3 điểm lưu ý khi bạn sử dụng HOC (thực chất cũng khó vấp phải 3 điểm này @@)
- Đừng sử dụng HOC trong phương thức render()
- Các phương thức static cần phải được copy lại
- Refs không được truyền qua HOC

# Tài liệu tham khảo
* https://reactjs.org/docs/higher-order-components.html
* https://github.com/minhnv2306/react-advanced/commit/83249d3becb68e29afcb127516b200da813635a2