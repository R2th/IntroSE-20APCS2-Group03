Sau một thời gian tìm hiểu và áp dụng rất hiệu quả, hôm nay mình chia sẻ với các bạn cấu trúc thư mục và cách viết component chuẩn trong React. Mục tiêu là làm sao cho dự án dễ quản lý, cũng như dễ hiểu để cộng tác làm việc với nhau, cũng như tăng tính tái sử dụng của một component React, việc áp dụng theo hay không thì tùy bạn – tất nhiên, nhưng nếu bạn không sử dụng một quy luật nào đó thống nhất, một ngày không xa bạn sẽ cảm thấy không quản lý hết được dự án của mình khi ngày nó càng phình ra.

Một dự án web app đơn giản nếu muốn đạt mức độ thành phẩm thì sẽ có từ 20-30 components, và theo tiêu chí component càng nhỏ càng tốt vì nó có tính tái sử dụng cao, với cấu trúc thư mục bên dưới webapp có thể chứa khoảng 200-300 components. 

**CẤU TRÚC THƯ MỤC CỦA MỘT DỰ ÁN REACT**
```
/actions/...
/components/common/Link.js
/components/common/...
/components/forms/TextBox.js
/components/forms/TextBox.container.js /* Container component */
/components/forms/TextBox.res/style.css
/components/forms/TextBox.locale/vi-VN/...
/components/forms/...
/components/layout/App.js - The top-level React component
/components/layout/App.res/style.css
/components/layout/App.locale/en-US/...
/components/layout/Navigation.js
/components/layout/Navigation.res/style.css
/components/layout/Navigation.res/data.json
/components/layout/Navigation.locale/en-US/...
/components/layout/...
/components/pages/Home.js
/components/pages/Home.css
/components/pages/Account/index.js
/components/pages/Account/index.css
/components/pages/...
/core/...
/constants/...
/helpers/...
/reducers/...
/stores/...
```
Về Component có nhận dữ liệu từ máy chủ hoặc từ store và nhận dữ liệu từ thao tác người dùng, mình chia làm 2 component với 2 chức năng riêng biệt:

* Container: nhận dữ liệu từ server, component này không render và cũng không nhận bất kỳ thao tác nào của người dùng
* Presentation: chỉ đảm nhiệm việc render, chỉ nhận dữ liệu thông qua props, không có state

Cách tiếp cận này (Container component và Presentation) được Dan Abramov (tác giả Redux và đang là thành viên của React) giới thiệu qua bài viết: Smart and Dump components, và cấu trúc thư mục thì dựa theo Gist này.

Mình sử dụng component stateful và stateless độc lập như trên để dễ quản lý luồng dữ liệu. Trong cấu trúc trên có sử dụng Redux, tuy nhiên chỉ để tham khảo là chính, nếu bạn có sử dụng Redux thì có thêm các thư mục reducers, stores, actions. Còn thư mục core thì có thể chứa business logic, helpers dùng để chứa các hàm hỗ trợ, constants để chứa các biến hằng số.

Thật ra, nếu bạn không sử dụng Redux, có thể chia làm 3 components – đã áp dụng thấy rất ổn:

* Container: như trên
* Presentation: như trên
* Interactive: nhận các thao tác từ người dùng, component này sẽ khai báo các hàm handleClick, handleChange,…và truyền cho presentation component thông qua props.

Với cách tổ chức 3 components như trên thì ưu điểm là phân rõ rạch ròi nhiệm vụ cho từng component: lấy dữ liệu, xuất dữ liệu và tương tác người dùng. Khuyết điểm của cách tiếp cận này là dữ liệu có thể bị trùng lặp ở component Interactive, vì bản thân nó không sử dụng mà truyền xuống cho Presentation, tuy nhiên đây không phải quá tệ để cho cách tổ chức component dễ hiểu và quản lý luồng dữ liệu, cách này được xem là tương tự actions -> store <=> reduce.

Trong thư mục chính components, được chia làm các thư mục con, các thư mục con này cũng là các react component, tuy nhiên được phân loại theo từng cấp độ lớn nhỏ: pages chứa các component theo phân loại chức năng trang, trong một trang (page component) chứa rất nhiều component nhỏ khác và được bọc trong layout component (layouts)

**CÁCH VIẾT MỘT COMPONENT REACT ĐÚNG CHUẨN AIRBNB**

**Quy tắc cơ bản**

Chỉ bao gồm một React component cho mỗi tệp.
Tuy nhiên có thể có nhiều Stateless, hoặc Pure, component được phép cho mỗi tập tin.

Luôn luôn sử dụng cú pháp JSX.
Không sử dụng React.createElement trừ khi bạn đang khởi tạo ứng dụng từ tệp không phải là JSX.

**Class vs React.createClass vs stateless**

Nếu bạn có internal state hoặc refs, prefer class extends React.Component trên React.createClass. 

```
// bad
const Listing = React.createClass({
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
});

// good
class Listing extends React.Component {
  // ...
  render() {
    return <div>{this.state.hello}</div>;
  }
}
```

Nếu bạn không có state hoặc refs hãy dùng các hàm bình thường (không phải các hàm mũi tên) trên các lớp:

```
// bad
class Listing extends React.Component {
  render() {
    return <div>{this.props.hello}</div>;
  }
}

// bad (relying on function name inference is discouraged)
const Listing = ({ hello }) => (
  <div>{hello}</div>
);

// good
function Listing({ hello }) {
  return <div>{hello}</div>;
}
```

**Mixins**

Không sử dụng mixins.
Tại sao? Mixins giới thiệu các phụ thuộc ngầm, gây xung đột tên và gây phức tạp nếu mở rộng. Hầu hết các trường hợp sử dụng cho mixins có thể được thực hiện theo những cách tốt hơn thông qua các thành phần, các thành phần bậc cao, hoặc các module hữu ích.

**Đặt tên**

Extensions: Sử dụng phần mở rộng .jsx cho React components.

Tên tệp: Sử dụng PascalCase cho tên tập tin. Ví dụ: ReservationCard.jsx.

Tham khảo Đặt tên: Sử dụng PascalCase để phản ứng các thành phần và camelCase cho các trường hợp của họ. 
```
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

Tên components: Sử dụng tên tệp làm tên components. Ví dụ: ReservationCard.jsx nên có tên tham chiếu của ReservationCard. Tuy nhiên, đối với các components gốc của một thư mục, hãy sử dụng index.jsx làm tên tệp và sử dụng tên thư mục làm tên components:

```
// bad
import Footer from './Footer/Footer';

// bad
import Footer from './Footer/index';

// good
import Footer from './Footer';
```

Đặt tên components bậc cao: Sử dụng một thành phần của tên components đặt hàng bậc cao và tên của components được truyền như displayName trên components được tạo ra. Ví dụ, components đặt hàng cao hơn Foo (), khi thông qua một components Bar sẽ tạo ra một thành phần với displayName của withFoo (Bar).

Tại sao? Tên hiển thị của components có thể được sử dụng bởi các công cụ dành cho nhà phát triển hoặc trong các thông báo lỗi và có một giá trị thể hiện rõ ràng mối quan hệ này sẽ giúp mọi người hiểu điều gì đang xảy ra.

```
// bad
export default function withFoo(WrappedComponent) {
  return function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }
}

// good
export default function withFoo(WrappedComponent) {
  function WithFoo(props) {
    return <WrappedComponent {...props} foo />;
  }

  const wrappedComponentName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  WithFoo.displayName = `withFoo(${wrappedComponentName})`;
  return WithFoo;
}
```

Props Naming: Tránh sử dụng DOM prop cho các mục đích khác nhau.

Tại sao? Mọi người mong đợi style và className có nghĩa là một điều cụ thể. Thay đổi API này cho một tập con của ứng dụng làm cho mã khó đọc và bảo trì hơn, và có thể gây ra lỗi.

```
// bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />
```