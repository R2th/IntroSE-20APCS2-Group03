HOC viết tắt của Higher Order Components, cho phép chúng ta thêm các pros cho các component mà chúng có cùng một logic nào đó hoặc đơn giản validate một thông tin nào đó ví dụ như là thông tin user là kinh điển nhất.

Trang đặt hàng trên các trang thương mại điện tử, trước khi hoàn thành đơn hàng bạn phải đăng nhập thông tin user để hoàn thành đơn hàng

Đơn giản không có thông tin user, thì sau khi bạn đặt hàng thì shop sẽ không thể biết ship cho bạn đến địa chỉ nào.

Để cho tất cả các component hay container kiểm tra được thông tin user có hay chưa nếu chưa có thì redirect sang trang login, nếu user đăng nhập rồi tiếp tục các step tiếp theo. Có nhiều cách, hôm này mình chia sẻ với đọc giả sử dụng `HOC` check thông tin user đã đăng nhập hay chưa nó sẽ như thế nào nhé.

`HOC` là một component  nhưng bên trong nó lại là một extends Component, chúng ta hãy xem ví dụ sau để hiểu rõ hơn

```
//HOC for check authentication
import React, { Component } from 'react';
import { connect } from 'react-redux';
export default (ComposedComponent) => {
   class RequireAuth extends Component {
      componentWillMount() {
         if (!this.props.authenticated)
            this.props.history.push("/login");
      }
      
      render() {
         return (
            <ComposedComponent { ...this.props } />
         )
      }
   }
   function mapStateToProps({ auth: { authenticated }}) {
      return {
         authenticated
      }
   }
   return connect(mapStateToProps)(RequireAuth);
}
```

chúng ta map `auth` từ store vào bên trong thành một props cho component `RequireAuth`. Việc đơn giản bây giờ chúng ta check nếu chưa có thông tin `auth` thì redirect về trang login trong `componentWillMount` và `componentWillUpdate`

Có component `HOC` rồi, giờ sử dụng thế nào nhỉ :D

Đơn giản chúng ta chỉ cần bọc những component nào cần user login như sau 

```
export default class App extends Component {
  
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={ Welcome } />
          <Route path="/signin" component={ Signin } />
          <Route path="/signout" component={ Signout } />
          <Route path="/signup" component={ Signup } />     
          <Route path="/stores" component={ RequireAuth(Stores) } />
          <Route path="/cart" component={ RequireAuth(Cart) } />
          <Route path="/order" component={ RequireAuth(OrderList) } />
        </Switch>
      </React.Fragment>
    );
  }
}
```

giờ khi chạy vào các link `cart`, `order`,  `stores` user chưa login sẽ tự động redirect về trang login rồi các bạn nhé. 

Đây là một ví dụ rất đơn giản về `HOC` check thông tin user, hi vọng bài viết sẽ giúp cho các bạn sửa dụng `HOC` một cách hiệu qủa hơn nữa.