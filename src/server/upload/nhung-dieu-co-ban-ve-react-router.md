Sau một thời gian tìm hiểu về **ReactJs** hôm nay mình sẽ giới thiệu cho các bạn một khái niệm thường xuyên được sử dụng trong **ReactJs**, đó là **React Router**.

![](https://images.viblo.asia/b0c76708-6dbf-4423-81c5-bd3b1a932069.png)

**React Router** là một **API** cho các ứng dụng **React**. Hầu hết các mã hiện tại đang được sử dụng bằng **React Router 3**, mặc dù phiên bản 4 đã được phát hành. **React Router** sử dụng **dynamic routing** (định tuyến động).

**Định tuyến động**, có nghĩa là định tuyến diễn ra khi **ứng dụng của bạn được hiển thị , không phải trong cấu hình hoặc quy ước bên ngoài ứng dụng đang chạy**. Điều đó có nghĩa là hầu hết mọi thứ là một component trong **React Router**.

## Tại sao nên sử dụng React Router?
**React Router** và **định tuyến động**, từ phía client, cho phép chúng ta xây dựng một ứng dụng web một trang với điều hướng mà không cần làm mới trang khi người dùng điều hướng. React Router sử dụng **component structure** để gọi các **component**, hiển thị thông tin phù hợp.

Bằng cách ngăn chặn việc refresh trang và sử dụng **Router** hoặc **Link** có sẵn của Reactjs, thay vì việc phải mất thời gian để reload lại trang việc sử dụng **React Router** đem lại một trải nghiệm mượt mà hơn cho người dùng.  **React router** cũng cho phép người dùng sử dụng chức năng trình duyệt như nút back và refresh lại trang trong khi duy trì giao diện chính xác của ứng dụng.

### Điều gì xảy ra khi bạn cần điều hướng 2 hệ thống định tuyến?
API là nơi hệ thống của bạn có thể giao tiếp với một hệ thống khác (nói cách khác là trao đổi tài nguyên giữa các hệ thống)

Nếu bạn đang làm việc trên một hệ thống bao gồm cả font-end và back-end, hay thậm chí hệ thống của bạn được viết bằng nhiều ngôn ngữ khác nhau mà các qui ước về routing không giống nhau thì đừng lo lắng! Các chức năng phụ trợ của **React Routes** giống như một API sẽ giúp bạn. Các routes được sử dụng để quản lý tất cả các truy vấn đến các cơ sở dữ liệu khác nhau. Bây giờ hãy bắt đầu với  **React Routes**.
## Thành phần chính của React Router
    
Có ba loại thành phần chính trong React Router:

* Router, như là <BrowserRouter> và <HashRouter>
* Route matchers, như là <Route> và <Switch>
* Chuyển hướng, như là <Link>, <NavLink>, và <Redirect>
    
Tất cả các component mà bạn sử dụng trong một ứng dụng web nên được nhập từ react-router-dom.
    
```
import { BrowserRouter, Route, Link } from "react-router-dom";
```

## Sử dụng React Router

Đầu tiên, cài đặt React Router, sử dụng yarn hoặc npm, các bạn có thể sử dụng các lệnh sau:

```
yarn add react-router-dom
npm install react-router-dom
```

Lưu ý rằng trong các tài liệu và trong **API**, các component thực tế được gọi là **Browser Router**. Một số người đơn giản gọi component là Router, vì vậy bạn có thể thấy nó được đặt một aliased đơn giản là **<Router>**. Để có thể sử dụng được các option bạn cần khai báo như sau: 
    
`
import { BrowserRouter } from ‘react-router-dom’
//alternatively, aliased
import { BrowserRouter as Router} from ‘react-router-dom’
`
    
Khi bạn không sử dụng **React Router**, **APP** thường sẽ là component chính cao nhất trong ứng dụng **React** (component cha). Tuy nhiên, khi **React Router** được sử dụng thì component **Router** cần là thành phần chính cao nhất. Điều này cho phép tất cả các thành phần con của nó có thể sử dụng được sức mạnh của **Router**, với tư cách là cha, nó truyền tất cả các chức năng đã được định nghĩa sẵn trong **props** của nó.
    
Một cách để thiết lập trong file **index.js**:
    
`
ReactDom.render(<Router><App /></Router>)
`
  
###     React Router <Link>
  **React Router <Link>** sử dụng các chức năng <Link> tương tự như sử dụng thẻ <a>, nhưng như đã đề cập ở trên, nó ngăn chặn việc làm refesh và nó chính là 1 component của **Reacjs**.
 
Khi bạn muốn điều hướng tới một trang Contact:
    
`<Link to= “/contact”>Contact Us</Link>`

Khi sử dụng như vậy bạn sẽ cần load lại trang... Còn nếu sử dụng **React Router** bạn có thể chuyển hướng đến trang Contact mà không cần tải lại trang!

```
<Route path="/contact" component={ContactPage} />
```
 
Cú pháp **component =** chính là một tham chiếu đến component **ContactPage**, nó cho phép gọi component **ContactPage** một cách nhanh nhất. Tương tự các bạn có thông qua Router các bạn có thể gọi các component khác của ứng dụng một cách nhanh chóng.
 
Về cơ bản, đây là định tuyến phía client.

##     Kết luận

Trên đây là một số các kiến thức về "React Router" mà mình đã học và tìm hiều được, hi vọng sẽ giúp được các bạn mới bắt đầu tìm hiều về **ReactJs** có cách hiều khái quát về khái niệm này. Cảm ơn các bạn đã đọc!!!
    
### Tài liệu tham khảo
    
 https://reactrouter.com/web/guides/primary-components
    
https://medium.com/@marcellamaki/a-brief-overview-of-react-router-and-client-side-routing-70eb420e8cde