>  Bài viết nằm trong Series [Cùng nhau học ReactJs](https://viblo.asia/s/cung-nhau-hoc-reactjs-Wj53OmQe56m)

Reactjs là một thư viện javascript dùng để xây dựng giao diện người dùng nhắm tới mục đích đơn giản phát triển và dễ tái sử dụng. React đã trở nên rất phổ biến trong những năm trở lại đây.

## 1. Giới thiệu về React
### 1.1. React là gì ?
 - React là một thư viện JavaScript nhằm đơn giản hóa việc phát triển giao diện người dùng.
 - Được phát triển bởi Facebook và bản release đầu tiên trên thế giới vào nằm 2013 và được sử dụng để viết ra Facebook, instagram và được sự ủng hộ sử dụng của rất nhiều công ty khác trên thế giới.
 - Mục tiêu của react chính là đơn giản để phát triển. Tất cả trạng thái đều được tập trung tại một thời điểm, bằng cách chia giao diện người dùng thành tập hợp các thành phần (components)
 - React được sử dụng để xây dựng single-page web applications.
### 1.2. Tại sao React lại trở nên phổ biến ?

**Sự đơn giản**

Thời điểm React được công bố, Ember.js và Angular 1.x là những lựa chọn chủ yếu như một khuôn mẫu. Cả hai điều này áp đặt quá nhiều quy ước trên mã chuyển một ứng dụng hiện có không thuận tiện chút nào. React đã lựa chọn rất dễ dàng để tích hợp vào một dự án hiện có.


**Được hậu thuẫn bởi Facebook**

Được hỗ trợ bởi Facebook rõ ràng sẽ mang lại lợi ích cho một dự án nếu nó thành công, nhưng nó không phải là một sự đảm bảo, như chúng ta đã thấy từ nhiều dự án nguồn mở không thành công của cả Facebook và Google làm ví dụ.

**React có thực sự đơn giản ?**

Để có thể sử dụng được React một cách chấp nhận được dường như lập trình viên chỉ cần nắm vững các khái niệm như
- Component
- JSX
- State
- Props

Bây giờ chúng ta sẽ bắt đầu đi sâu hơn vào từng thành phần.
## 2. JSX

Hầu hết các lập trình viên ngay lần đầu tiên đã nghĩ rằng JSX là một thứ gì đó quá phức tạp để chấp nhận và nhanh chóng bác bỏ React mặc dù có thể sử dụng React mà không có JSX.

Không hẳn những gì tốt đẹp đã được chấp nhận ngay từ đầu, cần một thời gian để đa số có thể chấp nhận một thứ mới. ĐÓ là JSX

> JSX is not embedded HTML

Lợi ích chính của việc sử dụng JSX là bạn chỉ tương tác với đối tượng JavaScript, chứ không phải là một template strings.

Giờ hãy bắt đầu một ví đơn giản về JSX:

```
const element = <h1>Hello, world!</h1>
```

Nhìn qua trông giống như sự pha trộn giữa JavaScript và HTML, nhưng thực ra đó là mã JavaScript.

Bên trong một biểu thử JSX, các thuộc tính có thể được chèn vào một cách dễ dàng:
```
const myId = 'test'
const element = <h1 id={myId}>Hello, world!</h1>
```

Ví dụ về một đoạn mã JSX được đóng trong một thẻ div:

```
<div>
  <BlogPostsList />
  <Sidebar />
</div>
```

Một thẻ luôn luôn cần được đóng lại, đó như là một quy chuẩn để đóng gói lại các mã bên trong JSX.

JSX khi được giới thiệu cùng với React, đó không còn là công nghệ thuần React nữa.

## 3. React components
### React component là gì ?

Một component là một thành phần riêng biệt của giao diện. 

Ví dụ: Trong trang chủ của một blog điển hìnhm ta có thể chia ra các thành phần Sidebar và PostList. Chúng lần lượt được tạo bởi các componentm. Bạn có thể có danh sách của các Blog post component, với mỗi blog post đều có các thành phần và đặc tính riêng cuả nó.

![](https://images.viblo.asia/8ed200d4-6f1c-42d3-a64e-03fabd6ffeec.png)

React làm cho mọi thứ trở nên đơn giản: Mọi thứ đều là component.

Ngay cả các thẻ HTML cũng là component mặc định đã được định nghĩa sẵn của react.


Hãy so sánh một chút giữa React sử dụng JSX và không sử dụng bằng ví dụ:

```
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <h1>Hello World!</h1>,
  document.getElementById('app')
)

ReactDOM.render(
  React.DOM.h1(null, "Hello World!"),
  document.getElementById('app')
)
```
### Sử dụng component

Có hai cách để định nghĩa một component trong React. (stateful component và Stateless component)
Bạn có thể tham khảo tại bài viết https://viblo.asia/p/stateful-va-stateless-functional-components-trong-react-3P0lPkymZox

Stateless component không trực tiếp quản lí trạng thái bên trong, và chỉ là một hàm:

```
const BlogPostExcerpt = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>Description</p>
    </div>
  )
}
```

Stateful component: Một component có trạng thái là một lớp, nó quản lý trạng thái trong các thuộc tính riêng của nó:
```
import React, { Component } from 'react'

class BlogPostExcerpt extends Component {
  render() {
    return (
      <div>
        <h1>Title</h1>
        <p>Description</p>
      </div>
    )
  }
}
```

Nếu component chỉ dùng để dịnh nghĩa render ra các thành phần mà chưa xử lý các trạng thái của thành phần bên trong thì chúng ta vẫn chưa có thể phân biệt rõ ý nghĩa và cách sử dụng của hai cách định nghĩa này. Cùng theo dõi trong chương sau nhé!

**Props** được coi như Component lấy được các trạng thái của nó. Bắt đầu từ component trên cùng, tất cả các component con đều lấy props từ component cha (component chứa nó). 

Trong stateless component, props đều được gán sẵn bằng các đối số truyền vào của hàm.
```
const BlogPostExcerpt = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  )
}
```

Đối với stateful component, props đều được truyền vào mặc định. Nó không cần truyền thêm gì đặc biệt vào cả, và chúng có thể được truy cập được bởi `this.props` trong mỗi component.


```
import React, { Component } from 'react'

class BlogPostExcerpt extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </div>
    )
  }
}
```
Truyền props tới các components con là cách tuyệt vời để thay đổi các giá trị bên trong component. Một component có thể chứa dữ liệu hoặc nhận dữ liệu thông qua các props của nó.


Điều này có thể đơn giản với một số trường hợp đơn giản. Thử hình dung một trang Blog có component App chứa các component Banner, List Blog Post..., List Blog Post chứa các Blog Post, trong mỗi Blog Post sẽ có các component về img, contex.,... Và mỗi thành phần đó sẽ có các props để xử lý các thao tác người dùng và trạng thái hiển thị...

Câu trả lời ở đây sẽ là **redux**. Redux không bắt buộc đối với một ứng dụng React, nhưng tôi khuyên bạn nên sử dụng nó. Nó sẽ hữu dụng nếu bạn:
- Cần di chuyển dữ liệu của bạn bên ngoài ứng dụng hoàn toàn vì một số lý do
- tạo các xử lý phức tạp và các hành động để thao tác dữ liệu theo bất kỳ cách nào bạn muốn

### Fragment

Chú ý một chút như đã giới thiệu ở trên, componnet chỉ có thể trả lại một phần tử duy nhất. Nếu bạn muốn nhiều thành phần, bạn cần phải bọc nó trong một thẻ chứa khác.

Tuy nhiên điều này không cần thiết khi hiển thị `div` trong output. Bạn có thể tránh điều này bằng cách sử dụng `React.Fragment`;
```
import React, { Component } from 'react'

class BlogPostExcerpt extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </React.Fragment>
    )
  }
}
```

Và trong Babel 7+, bạn có thể sử dụng một cách đơn giản với `<></>`:

```
import React, { Component } from 'react'

class BlogPostExcerpt extends Component {
  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
      </>
    )
  }
}
```

### PropTypes

Để hiểu một cách rõ ràng và chi tiết tôi khuyên bạn nên đọc bài viết [React PropTypes - Khai báo kiểu dữ liệu cho component](https://viblo.asia/p/react-proptypes-khai-bao-kieu-du-lieu-cho-component-naQZR1aPKvx)
vì theo tôi nên hiểu một cách đầy đủ và đúng đắng về propTypes trước khi sử dụng nó.
Bổ sung thêm một số types được sử dụng:

```
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.symbol
```

Trên đây là các thành phần đơn giản cơ bản nhất mà một người mới học React cần biết để có thể sử dụng. Để có thể đi sâu hơn về ReactJs, mời các bạn theo dõi các phần tiếp theo của series về router trong react
Cảm ơn các bạn đã theo dõi!
## Tham khảo
https://flaviocopes.com/react/