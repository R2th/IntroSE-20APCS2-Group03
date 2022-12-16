![](https://images.viblo.asia/940c7570-5abc-4764-8a6d-bea1414921ca.png)

Tối ưu hóa hiệu suất là một phần phát triển quan trọng mà mọi lập trình viên phải đối mặt

Chúng ta không thể có một lượng người dùng lớn nếu như trang web của chúng ta xử lí các tác vụ một cách chậm chạp, hoặc là khi cố gắng điều hướng sang một trang khác trong ứng dụng, người dùng ngay lập tức nhận thấy thời gian tải cao.

Tại thời điểm đó, chúng ta biết là cần phải bắt tay ngay vào việc tối ưu hóa hiệu suất.

Trong khi phát triển trên trên localhost, chúng ta hầu như không gặp phải bất kỳ vấn đề nào về hiệu suất, nhưng đó là do có sự khác biệt giữa môi trường `production` và `development`

Trong khi phát triển trên `locahost`, tất cả các files của chúng ta đều được lưu trữ trong máy tính. 

Trong React, cổng được mặc định là `3000`. Vì kết nối internet không thành vấn đề trong khi đang sử dụng máy chủ cục bộ, chúng ta có thể tải xuống tất cả các files và  các gói javaScript của mình một cách cực kỳ nhanh chóng.

Tuy nhiên, việc tải xuống các tệp lớn và các gói JavaScript sẽ trở thành một vấn đề lớn khi chúng ta thực hiện trên môi trường `production`, đặc biệt là ở những nơi có thể không có Internet tốc độ cao. 

Có một số kỹ thuật và thủ thuật tối ưu hóa hiệu suất để sử dụng với React. Trong bài viết này, chúng ta sẽ xem xét cách cải thiện hiệu suất bằng cách sử dụng `code splitting` 

- [Đọc thêm về code splitting ](https://reactjs.org/docs/code-splitting.html)

## The benefits of code splitting

Một lợi ích tuyệt vời khi sử dụng ứng dụng `create-react-app` là nó cung cấp cho chúng ta khả năng `code splitting` và `chunking`. 

`Chunking` cho phép chúng ta tách các đoạn code của mình thành các gói nhỏ hơn, là một nhóm các phần liên quan được đóng gói thành một tệp duy nhất. 

Các công cụ như `create-react-app`, `Gatsby.js` và `Next.js` đều sử dụng `webpack` để đóng gói các ứng dụng. 

Các gói như webpack import tất cả các files ứng dụng và merge chúng thành một gói duy nhất.

Một số lợi ích của việc này là:

- Cho phép trình duyệt của người dùng tải xuống toàn bộ ứng dụng một lần để họ có thể điều hướng liền mạch mà không cần các request HTTP khác.

- Trình duyệt không cần yêu cầu hoặc import bất kỳ tệp nào khác vì tất cả chúng đều nằm trong gói đã tải xuống

- Nói thêm về React:

React sử dụng cơ chế `Client Side Rendering(CSR)` sẽ tải hết các file tĩnh HTML, js của ứng dụng về phía client để sử dụng.

Vì vậy, trong lần tải đầu tiên sẽ mất nhiều thời gian để tải xuống các file xuống, vì vậy, việc tối ưu hóa là rất cần thiết

- [Đọc thêm về CSR](https://medium.com/walmartglobaltech/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)

- [Đọc thêm về chunking file](https://medium.com/jspoint/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)

Đối với phương pháp tốt nhất, các lập trình viên web sẽ chia các gói lớn thành các gói nhỏ hơn vì nó cho phép các nhà phát triển tải các tệp theo kiểu `lazy load` và cải thiện hiệu suất của ứng dụng React.

Dưới đây là snippet của bản build `production` cho ứng dụng React:

![](https://images.viblo.asia/449e1369-905e-45ac-8409-1570beb14a7b.png)

Bạn có thể tạo một bản build production bằng cách chạy lệnh build `npm run build` hoặc `yarn build` - các files `.js` và `.css` trong thư mục `build/static/js` và `build/static/css` tương ứng.

Từ hình ảnh trên, chúng ta có thể thấy rằng các files được chia thành nhiều `chunks` khác nhau. `create-react-app` đạt được điều này với plugin [`SplitChunksPlugin`](https://webpack.js.org/plugins/split-chunks-plugin/)  trong webpack. 

Hãy phân tích đoạn mã trong hình trên:

`Main.[hash].chunk.css` đại diện cho tất cả các mã CSS mà ứng dụng của chúng ta cần. Lưu ý rằng ngay cả khi bạn viết CSS bằng JavaScript bằng cách sử dụng `styled-components`, nó vẫn sẽ được biên dịch sang CSS

`Number.[hash].chunk.js` đại diện cho tất cả các thư viện được sử dụng trong ứng dụng. Về cơ bản, đó là tất cả các `vendor codes` được impoet từ thư mục `node_modules`

`Main.[hash].chunk.js` là tất cả các files ứng dụng - `App.js, Contact.js, About.js, v.v.` Nó đại diện cho tất cả mã đã viết cho ứng dụng React của mình

`Runtime-main.[hash].js` đại diện cho một logic thời gian chạy webpack nhỏ được sử dụng để tải và chạy ứng dụng. Nội dung của nó nằm trong file `build/index.html` theo mặc định

Tuy nhiên, ngay cả khi bản build `production` được tối ưu hóa, vẫn còn chỗ để cải thiện.

Cùng xem xét hình ảnh bên dưới:

![](https://images.viblo.asia/8f5523f6-22b9-4421-8b18-e64b21867391.png)

Mặc dù chúng ta có thể tạo một bản build production và triển khai ứng dụng như hiện tại, nhưng hình ảnh trên cho thấy rằng nó vẫn có thể được tối ưu hóa hơn nữa.

Từ hình ảnh, chúng ta thấy rằng file `main.[hash].chunk.js` chứa tất cả các files ứng dụng và có kích thước `1000KB`. 

Chúng ta cũng có thể thấy rằng khi người dùng truy cập `/login`, toàn bộ đoạn coder `1000KB` sẽ được trình duyệt tải xuống. Đoạn này chứa code mà người dùng có thể không bao giờ cần. 

Do đó, nếu trang `/login` là `2KB`, người dùng sẽ phải tải một đoạn `1000KB` để xem một trang chỉ có `2KB`.

Vì kích thước `main.[hash].chunk.js` tăng lên khi ứng dụng được phát triển, các ứng dụng lớn hơn có thể vượt quá kích thước `1000KB`, có nghĩa là thời gian tải ứng dụng sẽ có thể tăng đáng kể - và nó có thể hoạt động chậm hơn nếu người dùng có tốc độ internet kém. Đây là lý do tại sao chúng ta cần tối ưu hóa hơn nữa.

Giải pháp cho việc này là chia `main.[hash].chunk.js` thành các phần nhỏ hơn, điều này đảm bảo rằng khi người dùng truy cập trang web, họ chỉ tải xuống phần mã mà họ cần. Trong ví dụ này, trình duyệt của người dùng chỉ nên tải đoạn `/login`

Bằng cách đó, chúng ta sẽ giảm đáng kể số lượng code mà người dùng tải xuống trong lần tải đầu tiên của ứng dụng và tăng hiệu suất ứng dụng lên đáng kể.

Hãy xem cách triển khai `code splitting` trong  luôn nào

## Implementing route-centric code splitting

Để implement `code splitting`, chúng ta cần kết hợp cả những kĩ thuật của `Javascript` và `React` nữa


### 1. Dynamic imports

Đây là một tính năng JavaScript hiện đại giúp nhập các filé gần giống như một `promise`

Before:

```js
import Login from "Pages/Login.js";
import Home from "Pages/Home.js";
import About from "Pages/About.js";
import Contact from "Pages/Contact.js";
import Blog from "Pages/Blog.js";
import Shop from "Pages/Shop.js";
```

After:

Các đoạn mã ở trên import các files bằng cách `static import`. 

Khi webpack gặp cú pháp này, nó sẽ gộp tất cả các files lại với nhau.

Sau:

```js
const module = await import('/modules/myCustomModule.js');
```

Không giống như `static import` - đó là import đồng bộ, `dynamic import` là import không đồng bộ. Điều này cho phép import các modules và files của mình theo yêu cầu request.

Khi `webpack` gặp cú pháp này, nó ngay lập tức bắt đầu `code splitting`.

### 2. React.lazy()

Các `Component React` này là một function lấy một function khác làm đối số. Đối số này gọi một phép `dynamic import` và trả về `promise`. 

`React.lazy()` xử lý `promise` này và yêu cầu nó trả về một modules có chứa `React component` trong  export default (Export của mỗi files).

Before:

```js
import Login from "Pages/Login.js";
```

After:

```
import React, {lazy} from "react";
const Login = lazy(()=> import("Pages/Login"));
```

Trang đăng nhập hiện `lazy-loaded`, đảm bảo rằng đoạn `Login.js chunk` chỉ được tải khi nó được hiển thị.

- Error boundaries

Nếu các module đấy hoặc các modules không tải được (ví dụ: do lỗi mạng), nó sẽ gây ra lỗi toàn bộ.

Bạn có thể xử lý các lỗi này bằng cách hiển thị thông báo cho người dùng để trải nghiệm của người dùng tốt hơn và quản lý việc khôi phục bằng `Error boundaries`. 

Khi bạn đã tạo `Error boundaries`, bạn có thể sử dụng nó ở bất kỳ đâu phía trên các `Lazy Component` của mình để hiển thị trạng thái lỗi khi có lỗi mạng xảy ra, v.v.

- [Đọc thêm về Error boundaires](https://reactjs.org/docs/error-boundaries.html)


### 3. React.Suspense()

`React.Suspense()` cho phép tạm dừng có điều kiện việc hiển thị một thành phần cho đến khi nó được tải.

Nó có một `fallback prop`, nó được chấp nhận như một phần tử React. Phần tử React này có thể là một đoạn code `JSX` hoặc một component hoàn chỉnh.

Khi người dùng truy cập trang sử dụng `dynamic import`, họ có thể thấy màn hình trắng trong khi ứng dụng tải modules. 

Đôi khi người dùng thậm chí có thể gặp lỗi do `dynamic export` không đồng bộ. Khả năng xảy ra điều này sẽ tăng lên nếu người dùng có kết nối internet chậm.

`React.lazy()` và `React.suspense()` được sử dụng cùng nhau để giải quyết vấn đề này.

Trong khi `React.Suspense` tạm ngừng hiển thị component cho đến khi tất cả các thành phần phụ thuộc của nó được tải xuống, nó cũng hiển thị phần tử  `fallback props` dưới dạng giao diện tải xuống (đây là lúc icon loading được hiển thị để người dùng biết rằng việc tải trang vẫn đang diễn ra).

Hãy xem xét đoạn mã dưới đây:

```js
import React, { lazy, Suspense } from 'react';

const Hero = lazy(() => import('./Components/Hero'));
const Service = lazy(() => import('./Component/Service'));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Page is Loading...</div>}>
        <section>
          <Hero /> 
          <Service />
        </section>
      </Suspense>
    </div>
  );
}
```

Ở đây, chúng ta `lazy-load` `Components/Hero` và các `Compoents/Service`. Đây là những phụ thuộc của component `Home`. Nó cần chúng để hiển thị một trang chủ hoàn chỉnh.

Chúng ta sử dụng `Suspense component` để tạm ngừng hiển thị thành phần chính cho đến khi các phần phụ thuộc được `lazy load` để người dùng không gặp lỗi hoặc trang trống khi họ điều hướng đến `homepage`.

Bây giờ khi một component đang được `lazy load`, người dùng sẽ tương tác với giao diện `fallback UI` bên dưới:

```js
<div>Page is Loading...</div>
```

### 4. react-router-dom

Thư viện `react-router-dom` cũng hỗ trợ `code splittng`. 

Nó cho phép tải xuống các `chunks` ở mức `route level`.

Hãy xem xét đoạn mã dưới đây:

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const Shop = lazy(() => import('./routes/Shop'));

const App = () => {
    return ( 
    <Router>
      <Suspense fallback={<div>Page is Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Shop}/>
          <Route path="/shop" component={Shop}/>
        </Switch>
      </Suspense>
    </Router>
  )
};
```

Từ đoạn code mẫu trên, chúng ta đã thiết lập các route của mình bằng cách sử dụng thư viện `react-router-dom`, và `HomeCompoent` và `ShopComponent` được lazy load. 

Do thiết lập của chúng ta, webpack sẽ phân đoạn mã của chúng ta thành các chunk.  Vì vậy, người dùng chỉ nhận được các đoạn `chunks` cần thiết để hiển thị một trang theo yêu cầu. 

Ví dụ: khi người dùng truy cập homepage, người dùng nhận được đoạn chunk của `Home.js` và khi người dùng truy cập `shop page`, họ sẽ thấy đoạn chunk `Shop.js`.

Do đó, chúng ta đã giảm được đáng kể thời gian tải ban đầu của ứng dụng, ngay cả khi không giảm số lượng code trong ứng dụng của mình.

## Conclusion

Trong bài viết này, chúng ta đã giải thích phần `code splitting`là gì và tại sao việc sử dụng lại hữu ích. 

Chúng ta cũng đã thảo luận về việc tận dụng `dynamic import`, `React.lazy()` và `Suspense` để tạo ra một ứng dụng React hoạt động tốt hơn.

Hi vọng chia sẽ của mình giúp ích được cho mọi người

## References

[Error boundaries](https://reactjs.org/docs/error-boundaries.html)

[Chunk file and webpack](https://medium.com/jspoint/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312)

[Code splitting Reactjs](https://reactjs.org/docs/code-splitting.html)

[Speed up Reactjs Application](https://blog.logrocket.com/speed-up-react-app-dynamic-imports-route-centric-code-splitting/)