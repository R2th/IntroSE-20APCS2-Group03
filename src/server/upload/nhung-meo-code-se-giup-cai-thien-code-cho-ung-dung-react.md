React hiện nay đang rất phổ biến trong cộng đồng Developer, vì các ứng dụng React thường có quy mô rất lớn thường là rất thú vị khi làm việc và phải xem xét việc tối ưu hóa để cải thiện hiệu năng code cho ứng dụng của mình. Việc tối ưu từ 2500ms thời gian chờ xuống 1500ms có thể tác động rất lớn đến UX và thời gian biên dịch ứng dụng của bạn. 
![](https://images.viblo.asia/e2b757ec-ed73-4ecc-8a62-8b239c3ee856.png)

Dưới đây sẽ là một số mẹo nhỏ giúp tăng hiệu suất sử dụng với React:
### React.memo
Nếu bạn có một **[stateless component](https://viblo.asia/p/stateful-va-stateless-functional-components-trong-react-3P0lPkymZox)** và bạn biết rằng sẽ không cần  re-render, gộp toàn bộ stateless component bên trong một **[React.memo](https://reactjs.org/docs/react-api.html#reactmemo)** function.

Ví dụ như:
```JS
import React from 'react';

const profile = ({username}) => {
  return (
    <div className="wrapper">
        <p>{username}</p>
    </div>
  )
}
```

Sẽ thay thế như sau:
```JS
import React, { memo } from 'react';

const profile = memo(({username}) => {
  return (
    <div className="wrapper">
        <span>{username}</span>
    </div>
  )
})

profile.displayName = 'profile'
```
Khi chúng ta gộp toàn bộ stateless component bên trong `React.memo` nên lưu ý thêm `profile.displayName` để có thể debug function này.

`React.memo` tương đương với class `React.PureComponent`.
### React.PureComponent
PureComponent so sánh các **props** và **state** trong vòng đời của phương thức `shouldComponentUpdate`. Điều này có nghĩa là nó sẽ không re-render nếu **states** và **props** giống nhau. Tức là để tái cấu trúc lại stateless component trước đó đựa trên class-based component.

Ví dụ như sau:
```JS
import React, { Component } from 'react'

export default class profile extends Component {
  render() {
    return (
      <div className="wrapper">
        <span>{username}</span>
      </div>
    )
  }
}
```
Nếu chúng ta biết rằng các **props** và **states** sẽ không thay đổi,  thay thế việc sử  dụng Component. Chúng ta sẽ dụng `PureComponent`
```JS
import React, { PureComponent } from 'react'

export default class profile extends PureComponent {
  render() {
    return (
      <div className="wrapper">
        <span>{username}</span>
      </div>
    )
  }
}

profile.displayName = 'profile'
```
### ComponentDidCatch(error, info) {} Lifecycle Method
Các component có thể gây  ảnh hưởng làm phá vỡ cấu trúc ứng dụng sản phẩm  của bạn nếu bạn có hơn 1000 components.  Nó có thể khó theo dõi mọi thứ.
```JS
class MyComponent extends Component {

  state = { hasError: false };
  
  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state
    
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }
    
    return <div>All good!</div>
  }
}
```
Có rất nhiều biến động của các thành phần trong một ứng dụng web hiện đại, nó đã gặp khó khăn trong việc gói gộp toàn bộ trong toàn khái niệm và xử lý lỗi. Nhưng thật may mắn, React đã giới thiệu một phương pháp vòng đời mới để xử lý lỗi.
Phương thức `componentDidCatch()` hoạt động giống như việc bắt {} block, nhưng đối với các components. Duy nhất chỉ  class components có thể là hạn chế lỗi.
### React.lazy: Code-Splitting with Suspense
Khi bạn build cho những components để trì hoãn việc rendering trong khi tải dữ liệu đồng bộ được gọi là **`Suspense`**. Bạn có thể dừng bất cứ trạng thái cập nhật nào cho đến khi dữ liệu sẵn sàng và bạn có thể nạp vào async loading vào bất cứ component nào trong hệ sinh thái không có cần kết nối các props và state qua ứng dụng của bạn.
Trường hợp mạng nhanh, việc thực hiện cập nhật sẽ rất trôi chảy và ngay lập tức mà không thể thấy được các thay đổi của việc hiển thị và ẩn đi các biểu tưởng quay tròng (loading).
Nhưng trường hợp mạng chậm, bạn có thể thiết kế trạng thái chờ tải để người dùng có thể nhìn thấy mức độ cơ bản của chúng thay vì hiển thị các biểu tượng loading trên cách viết code thông thường. 

Ví dụ như:
```JS
import React, {lazy, Suspense} from 'react';

const ArticleComponent = lazy(() => import('./ArticleItemsComponent'));

const ArticleComponent = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ArticleItemsComponent />
  </Suspense>
)
 
export default ArticleComponent;
```

### React.Fragments to Avoid Additional HTML Element Wrappers
Nếu bạn đã từng sử dụng React, có thể bạn sẽ gặp lỗi sau:

`Parse Error: Adjacent JSX elements must be wrapped in an enclosing tag.`
```JS
render() {
 <div></div>
 <div></div>
}
```

Lỗi phân tích cú pháp: Các phần tử JSX liền  nhau phải được bọc trong một thẻ kèm theo sẽ làm phá vỡ cấu trúc ứng dụng React của bạn và đây là nguyên nhân gây ra lỗi cú pháp.
Các components trong React chỉ có thể là một thành phần con bởi vì nó được thiết kế như vậy (thật stupid) nhưng

Các giải quyết vấn đề này là gộp tất cả trong một element như sau:
```JS
render() {
  <div>
    <div></div>
    <div></div>
  </div>
}
```
Nhưng khi gộp các `div` thành một `div` duy nhất chúng ta sẽ phải xét lại việc render  có thể làm chậm ứng dụng của mình. Vậy nên chúng ta có thể mở rộng bằng cách sử dụng `Fragment` để giải quyết vấn đề này.

**Fragments to the rescue:**
```JS
import React, { Fragment } from 'react'
...
render() {
  <Fragment>
    <div></div>
    <div></div>
  </Fragment>
}
```
hoặc sử dụng cú pháp rút gọn cho các **`Fragment`**
```JS
import React from 'react'
...
render() {
  <>
    <div></div>
    <div></div>
  </>
}
```
Bài viết này tôi đã mình đã chia sẻ một số các mẹo nhỏ để cải thiện được hiệu năng và cách code của mình. Hy vọng các bạn sẽ có nhiều đóng góp để tôi có thể hoàn thiện hơn nội dung trong phần sắp tới.
Think outside the box.