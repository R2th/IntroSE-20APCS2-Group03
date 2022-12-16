Chào mọi người, lần này mình xin nối tiếp chủ đề ***"vở sạch chữ đẹp"*** như những tiết học trước. Bài viết lần này mình xin chia sẻ vài kinh nghiệm viết code React mà mình đã đúc kết qua một vài dự án.

![](https://images.viblo.asia/ee76ad06-5fc3-442e-ab35-f5627088228b.png)

## 1. Cách tổ chức component

### Cách đặt tên component và kiểu file

Tên component nên đặt theo chuẩn PascalCase
`Header.jsx`

```js
// bad
import reservationCard from './ReservationCard';

// good
import ReservationCard from './ReservationCard';

// bad
const ReservationItem = <ReservationCard />;

// good
const reservationItem = <ReservationCard />;
```

Tên component cần đề cập đúng mục đích của nó, phải rõ ràng và duy nhất trong ứng dụng, để dễ tìm thấy hơn và tránh những nhầm lẫn có thể xảy ra.

Một vài ví dụ về tên và mục đích component:

 ```js
 Header.jsx // component Header
 PageAbout.jsx // component chứa page About 
Sidebar.jsx // component Sidebar 
```

### Tổ chức component
Giả sử bạn muốn tổ chức một cấu trúc component bạn có thể tham khảo path đơn giản sau:

```
components/
|
|– header/          // component Header
|   |– index.jsx
|   |– styled.scss
|
|– PageAbout/
|   |– index.jsx    // component PageAbout
|   |– partials     // folder sub components
|   |   |– PageAboutAdmin
|   |   |   |– index.js
|   |   |   |– styled.scss
|   |   |
|   |   |– PageAboutSubUser
|   |   |   |– index.js
|   |   |   |– styled.scss
|
```

### Cách import component
```js
// good
import Header from 'Header';
import Header from 'PageAbout/partials/PageAboutAdmin';

// bad
import Header from 'Header/index';
import Header from 'PageAbout/partials/PageAboutAdmin/index';
```

### Giữ component gọn nhất có thể
Thông thường, một file chứa duy nhất 1 component  và export default. Cũng có thể 1 file chứa nhiều component. Tuy nhiên chúng ta nên viết 1 file với 1 component, chỉ định nghĩa nhiều component trong 1 file khi đó là định nghĩa những thứ liên quan tới common như Button, Image...

## 2. Stateless và Stateful
![](https://images.viblo.asia/dd0f5127-b84b-4cae-96ff-79cd746a60ee.png)

Một React component thường có hai loại: component kiểu `class` hoặc component kiểu `function`. Sự khác biệt giữa hai loại trên có thể thấy rõ ràng từ tên của chúng.
```js
// Stateful
class Hello extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Hello {props}</div>;
  }
}

// Stateless
const Hello = ({name}) => <div>Hello, {name}!</div>;
```

### Chọn cái nào
`JavaScript` khác với những ngôn ngữ như `C/C++, Java, PHP...` vì nó không phải là ngôn ngữ hướng đối tượng, mà là ngôn ngữ chức năng (***function languge***). Chính vì vậy React ở bản nâng cấp đầu năm vừa qua đã bỏ cách viết class (stateful) để hướng người dùng trở về đúng với mục đích của nó.

>***Đoạn này mình chỉ chém gió theo suy nghĩ của mình thôi nhé***

React từ phiên bản 16.8 khi chúng ta cài boilerplate template `create react app` xong sẽ thấy code ví dụ ở file `App.js` được viết theo kiểu `function` (stateless). Ở bản cập nhật này, React cũng đã đưa ra rất nhiều cải tiến, với tên [React Hooks](https://viblo.asia/p/react-hooks-co-gi-thu-vi-naQZRWMjlvx).

Câu trả lời thì rõ ràng rồi, nên chọn cách viết Stateless để định nghĩa component.


## 3. Thời buổi này phải dùng tool

![](https://images.viblo.asia/4b9946d9-5faf-40e9-811d-8925f7751d1e.png)

Để làm anh hùng bàn phím, ngoài việc gõ 10 ngón là chưa đủ, mình chỉ là thằng mổ cò nhưng mình viết code rất nhanh, một phần do mình gõ nhanh nhưng phần lớn là dùng những extends xịn sò mà có thể bạn chưa biết.

*Ở bài trước mình đã chia sẻ nhiều extension về bắt lỗi "vở sạch chữ đẹp" bài này mình chỉ chia sẻ những extension support cho chức năng nhé*
- [ES7 React/Redux/GraphQL/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets): Extension này định nghĩa nhiều snippets tuyệt vời cho React

- [Auto Import - ES6, TS, JSX, TSX](https://marketplace.visualstudio.com/items?itemName=NuclleaR.vscode-extension-auto-import): Gợi ý đường dẫn component để import chính xác

- [HTML to JSX](https://marketplace.visualstudio.com/items?itemName=riazxrazor.html-to-jsx): Giúp convert code HTML sang JSX chuẩn

- [Guides](https://marketplace.visualstudio.com/items?itemName=spywhere.guides): Giúp định vị được phạm vi trong dấu mở ngoặc

- [VScode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components): Support snippets cho styled component

- [Change-case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case): Chuyển đổi chuẩn đặt tên nhanh chóng

## Tổng kết
Trên đây là một vài chia sẻ của mình để làm việc với project React. Hi vọng sẽ giúp bạn dễ quán lỷ source và code sạch đẹp hơn. Nếu bạn có đóng góp gì hãy nhiệt tình để lại bên dưới nhé.