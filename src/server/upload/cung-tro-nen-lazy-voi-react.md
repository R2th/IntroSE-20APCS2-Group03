**Khi ứng dụng của bạn ngày càng phát triển, thì khối lượng dữ liệu hay code của bạn cũng tăng theo. Điều bạn cần làm lúc này là chỉ tải những thứ mà người dùng thực sự cần. Việc này có thể làm giảm khối lượng code lẫn nội dung cần thiết tải lên cho lần khởi tạo đầu tiên, trì hoãn việc tải các component hoặc modules  khác cho đến khi người dùng thực sự yêu cầu.**

React đã được bổ sung nhiều tính năng tuyệt vời giúp cho việc làm việc với các component trong React trở nên dễ dàng hơn. Tháng 10 năm 2018, React đã phát hành tính năng lazy load của mình trong React 16.6.

Theo như mình biết thì React có một hệ thống Router dựa trên component khá tốt và mình cũng đã tìm hiểu về một tính năng trên React có tên là Suspense. Suspense cho phép mình có thể sử dụng React.lazy, thứ mà mình đang tìm kiếm. Và mình thật sự rất ngạc nhiên khi thấy nó đơn giản hơn mình nghĩ nhiều. 

### Điều này có ý nghĩa gì đối với coder

Render không đồng thời được thêm vào có nghĩa là chúng ta có thể tối ưu hóa việc tải trang lúc ban đầu, tăng hiệu suất của ứng dụng của chúng ta và giúp cung cấp trải nghiệm người dùng tốt hơn.

Chúng ta muốn trì hoãn việc tải các tài nguyên không thực sự quan trọng và chỉ tải chúng theo yêu cầu bằng cách sử dụng [ code-splitting](http://thaunguyen.com/javascript/reactjs-code-splitting-la-gi). Điều này sẽ giúp chúng ta quản lý việc tải hình ảnh, dữ liệu hoặc bất cứ thứ gì chúng ta muốn tách riêng.

Tách biệt các tài nguyên quan trọng và không quan trọng là một bài thực hành tốt trong việc xây dựng ứng dụng web của riêng bạn. Chúng ta muốn tải nội dung quan trọng trước tiên cũng như mọi dữ liệu cần thiết để phục vụ việc tải trang lần đầu. Sau đó, các tài nguyên ít quan trọng hơn có thể được tải khi chúng ta chuyển sang một trang mới, cuộn qua một hình ảnh, bất cứ điều gì.

### Code Splitting

Cách tốt nhất để sử dụng Code Splitting trong ứng dụng của bạn là thông qua việc sử dụng cú pháp import động. React App và Next.js đều hỗ trợ cú pháp này trong các phiên bản mới nhất của chúng. Một ví dụ về Code Splitting có thể trông như thế này:
```
import("./math").then(math => {
  math.sum(1, 2, 3);
});
```

### Code Splitting bằng React.lazy

trong React, chúng ta có React.lazy cho phép chúng ta render một import động như component. Điều này làm cho việc chia tách và tải các component của React trở nên dễ dàng hơn. Chúng ta có thể làm điều này thay vì nhập một component từ một tệp khác và cho nó hiển thị ngay lập tức.

Giả sử chúng ta có ArtistComponent có danh sách các sự kiện mà chúng ta có thể tải từ một component **Event** và chúng ta chỉ muốn tải component **Event** nếu ArtistComponent được tải. Chúng ta có thể làm như sau:
```
const Events = React.lazy(() => import('./Events'));

function ArtistComponent() {
  return (
    <div className="event-list">
      <Events />
    </div>
  );
}
```

Với React.lazy, chúng ta đã tự động tải component **Event** chỉ khi ArtistComponent được hiển thị. Nhưng điều gì sẽ xảy ra nếu module chứa component **Event** chưa được tải vào thời điểm ArtistComponent render? Nếu chúng ta đưa component  **Suspense** vào, chúng ta đã có một loading dự phòng để hiển thị cho đến khi component **Event** được tải xong.

```
const Events = React.lazy(() => import('./Events'));

function ArtistComponent() {
  return (
    <div className="event-list">
      <Suspense fallback={<div>Loading...</div>}>
        <Events />
      </Suspense>
    </div>
  );
}
```

React.lazy () nhận một hàm trả về promise là kết quả của câu lệnh import.

Điều gì xảy ra nếu chúng ta muốn tải cùng lúc nhiều component ? Điều đó hoàn toàn ổn, chúng ta có thể bọc nhiều lazy component bên trong  Suspense và mọi thứ sẽ hoạt động giống hệt nhau:
```
const Events = React.lazy(() => import('./Events'));
const Gallery = React.lazy(() => import('./Gallery'));

function ArtistComponent() {
  return (
    <div className="event-list">
      <Suspense fallback={<div>Loading...</div>}>
        <Events />
        <Gallery />
      </Suspense>
    </div>
  );
}
```

Tất cả điều này đều cung cấp cho người dùng trải nghiệm tốt hơn. Điều này không hề mới và chúng ta hoàn toàn thể làm nó trong React trước đây. Tuy nhiên, trước đây, bạn phải import  các dependencies và thư viện khác để thực hiện và thư viện *react-loadable* sẽ được sử dụng. Nhưng bây giờ với Suspense và Lazy, chúng ta có thể thực hiện bên trong lõi React mà không cần thêm dependencies.

Chúng ta cũng nên xem xét thêm một ví dụ về cách thực hiện việc này với React Router.
```
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Events = lazy(() => import('./routes/Events'));
const Gallery = lazy(() => import('./routes/Gallery'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/events" component={Events}/>
        <Route path="/gallery" component={Gallery}/>
      </Switch>
    </Suspense>
  </Router>
);
```

Còn nhiều thứ hơn nữa để tìm hiểu về Suspense, tính năng mới của React, như cách tạo trải nghiệm UX tốt hơn, nhưng mình hy vọng rằng hướng dẫn đơn giản này sẽ cung cấp cho bạn ý tưởng hay về cách bắt đầu sử dụng lazy load trong React. Để biết thêm thông tin về tính năng Lazy của Suspense và React, hãy truy cập [ReactJS.org](https://reactjs.org/)!

Cảm ơn bạn đã đọc, nếu có ý kiến hay góp ý gì cho bài viết, hãy để lại comment bên dưới nhé. Hẹn gặp lại các bạn trong các bài viết sau.