![](https://images.viblo.asia/b1c3639f-b4ec-4967-a29e-f8ea0609b977.png)
## 1. React router là gì?
React Router là một thư viện định tuyến (routing) tiêu chuẩn trong React. Hiện nay phiên bản release là React Router v4.
Nó giữ cho giao diện đồng bộ với URL trên trình duyệt. React Router giúp bạn định nghĩa ra các URL động, và lựa chọn Component phù hợp để hiển thị trên trình duyệt người dùng ứng với từng URL. Nó tương đương với sự khẳng định, nếu bạn có URL này, nó sẽ tương đương với Route này thì giao diện sẽ thế này!

Ví dụ bạn có URL `localhost:3000/contact` thì website sẽ chuyển đến trang "Liên hệ". Nhưng với React, website của bạn là 1 **SPA** (Single-Page Applications) nên nó vẫn giữ nguyên website (thực ra là 1 app), còn nội dung của trang **Liên hệ** (đây là 1 component) được hiện ra mà không load hoàn toàn lại trạng.

![](https://images.viblo.asia/15721e47-b560-44f5-92a1-b70d523cdfdd.gif)

## 2. Cài đặt thư viện
Vì React router là thư viện ngoài, chưa được tích hợp trong boilerplate create-react-app, nên chúng ta cần cài vào project nếu muốn dùng.
Về bản chất, React Router cơ bản đều giống nhau và chúng được chia ra thành 3 package:
> + react-router
> + react-router-dom
> + react-router-native

Để xây dựng website chúng ta chỉ cần dùng package `react-router-dom`

```yarn
yarn add react-router-dom
// hoặc
npm install --save react-router-dom
```

## 3. Chọn Router nào "phát wifi mạnh" nhỉ?
React Router cung cấp cho bạn 2 thành phần là `<BrowserRouter>` & `<HashRouter>`. Hai thành phần này khác nhau ở kiểu URL mà chúng sẽ tạo ra và đồng bộ.
Khi bắt đầu một dự án mới, bạn thường phải chọn xem loại router nào mình sẽ sử dụng. Cho những dự án web, có các loại router là `<BrowserRouter>` và `<HashRouter>`. Với `<BrowserRouter>` chúng ta nên sử dụng nó khi chúng ta đã có phần code ở server để xử lý những requests động, còn `<HashRouter>` dùng cho những trang web tĩnh (chỉ có thể đáp ứng các yêu cầu cho các tập tin trong phạm vi nó biết).
Thông thường, chúng ta luôn được khuyến khích sử dụng `<BrowserRouter>`, vì đa số dự án React thường đi kèm với Nodejs để xử lý thêm nhiều vấn đề phức tạp. Nhưng nếu có dự định cho website tĩnh và hỗ trợ trình duyệt cũ là đủ thì `<HashRouter>` là giải pháp tốt hơn.
Mà ở đây mình dùng luôn `<BrowserRouter>` vì nó "xịn" hơn nên nó sẽ gánh team được.


### History
Mỗi router đều tạo một đối tượng (object) history, được dùng để kiểm soát vị trí hiện tại của ta (location) và sẽ re-render lại website mỗi khi có sự thay đổi. Những component được xây dựng bởi React Router sẽ dựa vào object history này để render. Bất kì component nào được xây dựng bởi React Router mà không được bọc bởi Router (`<BrowserRouter>` hoặc `<HashRouter>` ) sẽ không hoạt động.

### Rendering một router
Mặc định một Router (`<BrowserRouter>` hoặc `<HashRouter>`) chỉ chấp nhận 1 Component con duy nhất nên cách tốt nhất là bọc nó bên ngoài Component <App>. Ví dụ như với boilerplate create-react-app.

```js
import { BrowserRouter } from "react-router-dom";

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
),document.getElementById('root'));
```

### <App /> Component
Là component chứa toàn bộ nội dung website. Ở đây mình sẽ tách ra 3 component `<Header />`, `<Main />`, `<Footer />` để bạn dễ hiểu hơn.
* Header là component chứa các links để điều hướng router.
* Main là component hiển thị nội dung giữa các page (bạn có thể hiểu đây là phần body của mỗi page)
* Footer mình để vào cho đẹp thôi

```js
import React, { Component } from 'react';
import Header from './Header'
import Header from './Footer'
import Main from './Main'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
export default App;
```

### <Route /> Component
`<Route />` là thành phần chính của React Router. Nó đối chiếu URL rồi render ra component tương ứng.

```js
<Route exact path="/" component={Home} /> // localhost:3000 sẽ hiện trang chủ, localhost:3000/ahihi sẽ không hiện ra gì cả vì có exact
<Route path="/contact/" component={Contact} />  // localhost:3000/contact sẽ hiện trang Contact
```

1. ***path***: Là đường dẫn trên URL.
1. ***exact***: Giúp cho route này này chỉ hoạt động nếu URL trên trình duyệt phù hợp tuyệt đối với giá trị của thuộc tính path của nó.
1. ***component***: Là component sẽ đươc load ra tương ứng với Route đó.

### <Link />
Component này giống như thẻ <a></a> thông thường trong HTML, trong react chúng ta dùng "thẻ" <Link></Link> để điều hướng router.
```js
<Link to="/about">About</Link>
```

Thôi nói nhiều quá, mình demo cho các bạn cái ví dụ nho nhỏ đây 
https://stackblitz.com/edit/react-router-demohihi
    
## 4. Tổng kết
Qua bài chia sẻ này, ít nhiều bạn cũng đã hiểu được React router hoạt động như thế nào.  Hi vọng những kiến thức mình chia sẻ sẽ mang lại sự có ích đối với các bạn.
    
Tóm lại Router trong React bạn cứ hiểu đơn giản nó giống như thẻ `<a></a>` trong HTML dùng để chuyển trang thôi.

Ngoài ra bạn có thể tìm hiểu những phần nâng cao tại đây: https://reacttraining.com/react-router/web