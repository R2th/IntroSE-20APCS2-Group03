Xin chào tất cả các bạn, bài viết này mình xin chia sẻ một chút kiến thức mình tìm hiểu được về `Router` trong `ReactJs`, mong mọi người theo dõi.

Như các bạn đã biết thì thư viện `ReactJs` giúp chúng ta tạo ra các `component` và từ các component đó chúng ta có thể xây dựng thành các view giao diện, bản thân `ReactJs` không hỗ trợ `Router` vậy nên hôm nay mình xin giới thiệu một thư viện hỗ  trợ công việc này đó là: `react-router`, `link` trang chủ: [tại đây.](https://reacttraining.com/react-router/)

**1) React-Router là gì?**

- `React-Router` là một thư viện định tuyến (routing) tiêu chuẩn trong React. Nó giữ cho giao diện của ứng dụng đồng bộ với `URL` trên trình duyệt. `React-Router` cho phép bạn định tuyến "luồng dữ liệu" (`data flow`) trong ứng dụng của bạn một cách rõ ràng. Nó tương đương với sự khẳng định, nếu bạn có URL này, nó sẽ tương đương với Route này, và giao diện tương ứng.
- Phiên bản mới nhất hiện tại là v4.
- Cài đặt:
> npm install react-router-dom --save


**2) Các thành phần trong React-Router**

***2.1) BrowserRouter vs HashRouter***
    
- `React-Router` cung cấp cho chúng 2 thành phần hay sử dụng đó là `BrowserRouter` & `HashRouter`. Hai thành phần này khác nhau ở kiểu `URL` mà chúng sẽ tạo ra và đồng bộ.

- `BrowserRouter`: Được sử dụng phổ biến hơn, nó sử dụng `History API` có trong `HTML5` để theo dõi lịch sử bộ định tuyến của bạn.
- `HashRouter`: Sử dụng `hash` của `URL` (window.location.hash) để ghi nhớ mọi thứ.
    
```js
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
```

***2.2) Route***

`Route`: Định nghĩa một ánh xạ (mapping) giữa một URL và một `Component`. Điều đó có nghĩa là khi người dùng truy cập theo một URL trên trình duyệt, một `Component` tương ứng sẽ được `render` trên giao diện.

```js
<Router>
    <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound}/>
    </div>
</Router>
```

Trong đó:
- **path:** Là đường dẫn trên URL.
- **exact:** Liúp cho route này này chỉ hoạt động nếu URL trên trình duyệt phù hợp tuyệt đối với giá trị của thuộc tính path của nó.
- **component:** Là component sẽ đươc load ra tương ứng với Route đó.

***2.3) Link***

Trong HTML thì cặp thẻ để chuyển hướng đó là thẻ `<a></a>` thì trong react chúng ta sẽ dử dụng cặp thẻ `<Link></Link>` được `import` từ `React-Router`.

```js
<Link to="/about">About</Link>
```
trong đó:
 - **to**: Giống như thuộc tính `href` trong thẻ `a`.

**2.4) NavLink**

`NavLink` thì rất giống với `Link` về cách sử dụng, nhưng **NavLink** tốt hơn vì nó hỗ trợ thêm một số thuộc tính như là **activeClassName** và **activeStyle** 2 thuộc tính này giúp cho khi mà nó trùng khớp thì nó sẽ được active lên và chúng ta có thể style cho nó.

```js
<NavLink exact activeStyle={{
    backgroundColor : 'white',
    color : 'red'
}} to="/" className="my-link">Trang Chu</NavLink>
```

***2.5) Custom Link***
ở trên ta có thẻ NavLink giúp chúng ta có thêm một thuộc tính nhưng giả sử khi bạn không muốn activeClassName hoặc activeStyle tại thẻ NavLink mà nó lại nằm ở một thẻ bao nó ví dụ như thẻ div hay thẻ li thì sao? sau đây mình sẽ custom lại để có thể sử dụng các class hoặc style ở thẻ bao ngoài của nó.

```js
const MenuLink = ({
    label, // nội dung trong thẻ
    to, // giống như href trong thẻ a
    activeOnlyWhenExact
}) => {
    return (
        <Route 
            path={to}
            exact={activeOnlyWhenExact}
            children={ ({ match }) => { //match la doi tuong xac dinh su trung khop cua URL
                var active = match ? 'active abc' : '';

                return (
                    <li className={`my-li ${active}`}>
                        <Link  to={to} className="my-link">{label}</Link>
                    </li>
                );
            }}
        />
    );
}
```

***2.6) Đối tượng Match***

Khi bạn muốn lấy một số thông tin ở trên URL thì bạn có thể dùng đối tượng `match` để  lấy dữ liệu về.
Tại cấu hình `Router` ta chỉ cần truyền thêm đối tượng `match` vào `component` mà cần sử dụng đối tượng `match`
```js
   {
        path : '/products',
        exact : false,
        main : ({match}) => <Products match={match} />
    }
```
Khi `console.log(match)` ta sẽ có kết quả như sau.
![](https://images.viblo.asia/f0ea77eb-f128-4e4e-bfd9-88fbaeb67f38.png)

Trong đối tượng params sẽ chứa các tham số mà ta truyền trên URL.

***2.7) Đối tượng prompt - Xác nhận trước khi chuyển trang***

Giả sử khi bạn đang nhập liệu ở form nào đó mà không may click nút back hay chuyển trang thì thôi xong dữ liệu bạn nhập sẽ mất hết để khác phục điều đó ta có đối tượng prompt nó sẽ giúp chúng ta trước khi back hay chuyển trang nó sẽ xác nhận xem là chúng ta có chắc chắn muốn back hay chuyển trang không!

Khi muốn sử dụng đối tượng prompt thì chúng ta chỉ cần import nó từ react-router
```js
import {Prompt} from 'react-router-dom';

<Prompt 
    when={true} // true | false
    message={ (location) => (`Ban chac chan muon di den ${location.pathname}`) }
/>
```
![](https://images.viblo.asia/00e6deaa-24b5-453e-b579-d57330d6ac5e.png)

***2.8) Redirect***

- Chức năng dùng để chuyển trang.
- Có thể truy xuất thông tin trang trước đó thông qua đối tượng location.
Để sử dụng Redirect ta chỉ cần import nó từ react-router.
```js
import { Redirect } from 'react-router-dom';
```
Khi bạn muốn sử  dụng location thì tại cấu hình Router ta chỉ cần truyền thêm đối tượng location vào component mà cần sử dụng đối tượng location.
```js
{
    path : '/login',
    exact : false,
    main : ({location}) => <Login location={location} />
}
```
![](https://images.viblo.asia/04995437-b55c-41ce-a740-23bdcbd10961.png)

**3) Ví dụ:**

Ví dụ các bạn có thể tham khảo [tại đây](https://github.com/lvgvictory/GiangLeLe/tree/master/React-router/lesson15-react-router/src)

**Kết Luận**

Trên đây là một chút kiến thức mà mình tìm hiểu được về  các thành phần trong react-router, rất mong được sự góp ý của mọi người. Cảm ơn mọi người đã theo dõi bài viết của mình.

**Nguồn tham khảo**

- https://reacttraining.com/react-router/web/guides/philosophy
- https://www.youtube.com/watch?v=gL5HBA_1bDQ&list=PLJ5qtRQovuEOoKffoCBzTfvzMTTORnoyp