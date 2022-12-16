![](https://images.viblo.asia/11ff00f7-7905-4b7f-8f06-2a65eda7456b.png)
- Page 404 còn được gọi là trang không tìm thấy và nó thường bật lên khi người dùng truy cập sai đường dẫn hoặc đường dẫn hiện không có . Trong trường hợp này để tạo giao diện người dùng gắn kết, chúng ta cần hiển thị cho họ trang 404 thay vì trang trống và cho họ biết rằng trang mà họ đang tìm kiếm không có .
- Làm cách nào để tạo 404 tùy chỉnh trong React?
- Để hiểu cách tạo nó, trước tiên chúng ta cần đảm bảo rằng chúng ta hiểu cách hoạt động của Routing  trong React.  React Router là thứ mà chúng ta sẽ sử dụng để tạo SPA 
- Trong React và React Router, chúng ta đang trong SPA (Single Page Apps), vì vậy đương nhiên sẽ không có trang “404” - mà thay vào đó là một component. Component  sẽ cần hiển thị nếu một router không được nhận dạng.

- Rất may, điều này rất đơn giản và dễ dàng trong React Router!

- Bên trong thành phần <Switch /> từ React Router, chúng ta có thể khai báo một <Route /> ở cuối cùng của phần khai báo route.
- Điều này có nghĩa nếu các router trên chưa phù hợp, giải pháp duy nhất có thể là chúng ta tạo 1 router mà không thực sự tồn tại.
- Để giúp chúng tôi thay đổi dữ liệu động, chúng tôi sử dụng React Router. Tính năng này hiển thị có điều kiện các thành phần nhất định để hiển thị tùy thuộc vào routet đang được sử dụng trong URL (/, / login, /register, v.v.).
- Để sử dụng router, bạn phải cài đặt nó trước bằng npm : npm install react-router-dom
- Cách sử dụng là chúng ta import những component cần dùng vào code của chúng ta: 


```
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
```

- Làm thế nào chúng ta có thể tạo một component 404? Trong thư component của bạn, hãy tạo một tệp mới có tên NotFound.js và thêm đoạn code sau: 


```
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <img
      src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
      alt="not-found"
    />
    <Link to="/" className="link-home">
      Go Home
    </Link>
  </div>
);

export default NotFound;
```

- Sau khi tạo component not found, hãy đảm bảo rằng bạn import file đó vào cấu hình các router của chúng tôi.

```
import React from 'react';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import RootContainer from 'containers/Root';
import PostListContainer from 'containers/PostList';
import LoginContainer from 'containers/Login';
import RegisterContainer from 'containers/Register';
import NotFound from 'containers/NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/posts" component={PostListContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/" component={RootContainer} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
```

- Switch đảm bảo rằng chỉ một trong các router thích hợp được hiển thị tại một thời điểm. Nó sẽ chỉ hiển thị router đầu tiên phù hợp với url và không hiển thị router nào khác. Vì lý do này, chúng ta phải đặt thành phần 404 cuối cùng
-  Và thêm chút style nữa sẽ dc trang 404 theo ý thích của mình
-  demo page 404: https://codesandbox.io/s/pedantic-mcnulty-iktm8?file=/src/NotFound.js