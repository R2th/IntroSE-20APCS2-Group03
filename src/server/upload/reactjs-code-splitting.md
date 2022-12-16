### **Code-Splitting là gì?**

Code-Splitting là một trong những kỹ thuật giúp tăng tốc thời gian load Javascript của React App. Một trang web thường có một số thành phần cơ bản sau: HTML, CSS, Javascript và một số media như images, fonts … Và có thể Javascript là một trong những thành phần làm chậm thời gian load page nhất. Một byte của Javascript cần nhiều thời gian xử lý hơn so với 1 byte của css hay images.

Hôm nay chúng ta cùng tìm hiểu cái giá của một web app có quá nhiều JS và cách để tối ưu, cũng như làm tăng thời gian load trang nhất có thể nhé.

Đặc biệt hơn với sự phát triển mạnh mẽ của mobile, chúng ta cần phải quan tâm đến hiệu năng, cũng như thiết kế responsive trên mobile nhiều hơn. Có thể đến 80% người dùng sử dụng mobile để truy cập những trang như CNN, BBC, New York Times, …

Đa số SPA hiện nay đều cần một bundler như webpack. Công việc của webpack là build, minified, và tạo nên những file bundle như js, css, html. Khi mà trang web có hàng trăm file js, nhiệm vụ của webpack là gom gọn và tối ưu những file đó thành một vài file nhỏ hơn.
![](https://images.viblo.asia/1963b38d-ae2f-4bbd-b7a7-a8fe8467cf2d.png)

*What webpack does*

Một khi mà trang trở nên lớn hơn, nhiều tính năng hơn thì kích thước nhưng file bundle js trở nên lớn hơn. Giống như load một video trên youtube, không bao giờ chúng ta load toàn bộ video đó. Chúng ta chỉ load những phần cần thiết cho user.

Cũng với ý tưởng đó, code-splitting có nghĩa là chúng ta chia nhỏ code hiệu quả hơn và load những phần cần thiết cho trang web. Kỹ thuật này cũng được hiểu như là lazy load javascript.

Một người lazy là lười biếng và chỉ làm việc vừa đủ theo yêu cầu. Giả sử anh ta có 10 nhiệm vụ cần hoàn thành trong ngày thì chỉ hoàn thành những phần mà có người yêu cầu và hối thúc. Điều đó cũng tương tự như khi chúng ta bundle trang web và thay vì gom tất cả vào một file bundle.js. Chúng ta sẽ chia nhỏ code ra 10 file bundle.js và load từng file theo yêu cầu của user.
![](https://images.viblo.asia/604f8327-cffd-4e41-bec0-ff423f4f38e6.png)

*Code splitting looks like*
Với phần màu đỏ, code chưa được splitting, chúng ta có thể thấy rằng tất cả đều gom về một cục bundle.js. Ngược lại, với phần màu xanh, code được chia thành nhiều phần nhỏ. Có thể được chia nhỏ theo module và một khi load một trang thuộc về một module nào đó thì phần code nhỏ sẽ được load lên.

  Vòng đời của React Component là gì? (Phần 3)
  React Native Starter Kit – Top 3 bộ Starter Kit tốt nhất 2019
React.lazy
React.lazy cho phép chúng ta load những component động như những cách thông thường. Ví dụ như sau:

Before:
```js
import OtherComponent from './OtherComponent';
 
function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```
After:
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
 
function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
 
```
Lazy sẽ tự động load bundle chứa component **OtherComponent**  khi mà MyComponent được render.

**React.lazy** nhận vào một function sẽ gọi một dynamic **import().**

**Suspense**
Trong một số trường hợp, khi load dynamic component với lazy, chúng ta cần chờ đợi một khoảng thời gian. Khi ấy, **OtherComponent** chưa hiển thị và cần một **loading** để làm cho user có cảm giác đang tương tác với trang web. Trong những tình huống này chúng ta cần đến **Suspense** để truyền một loading component.

**Xem thêm component là gì**

Ví dụ như sau:
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
 
function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
**Code-splitting theo route**

Một trong những giải pháp thông dụng để chia nhỏ code đó là theo Route. Giả sử chúng ta có một số trang như là: Home, About, Contact, … Thì mỗi trang như vậy là một route và tương ứng với url của từng route chúng ta chia nhỏ bundle file thành nhiều file.

Ví dụ như sau:
```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
 
const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));
const Contact = lazy(() => import('./routes/Contact'));
 
const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
      </Switch>
    </Suspense>
  </Router>
);
```
### Tài liệu tham khảo:
https://reactjs.org/docs/code-splitting.html

https://hackernoon.com/lessons-learned-code-splitting-with-webpack-and-react-f012a989113