**Sự phổ biến của React không có gì phải bàn cãi, với yêu cầu cho các nhà phát triển đang ngày càng nhiều ở mọi thành phố trên thế giới. Với các nhà phát triển ít kinh nghiệm hơn, thì việc tập trung kiến thức cho quá trình phỏng vấn thì thực sự ác mộng.**

Trong bài viết này, chúng ta sẽ cùng đề cập đến 15 câu hỏi, đây là các câu hỏi sẽ giúp bao phủ một phạm vi kiến thức trung tâm và vừa đủ khi làm việc với React. Môi câu hỏi, chúng ta sẽ cùng tổng hợp câu trả lời và cung cấp một vài link tài liệu bổ sung để mở rộng hơn.

## 1. DOM ảo là gì?

**Trả lời:**

DOM ảo (virtual DOM) là một đại diện được nằm trong bộ nhớ cho một thành phần HTML thật mà cấu thành nên giao diện cho chương trình. Khi một component được thông dịch lại (re-render), DOM ảo sẽ so sánh sự thay đổi với mô hình của DOM thật để tạo một danh sách cập nhật sẽ được thực hiện. Lợi ích chính của việc này là giúp tăng hiệu năng, chỉ tập trung vào các thay đổi nhỏ và thực sự cần thiết với DOM thật hơn là phải re-render lại một tập component lớn. 

**Tham khảo:**

[Hiểu hơn về Virtual DOM](https://bitsofco.de/understanding-the-virtual-dom/)

[Giải thích về Virtual DOM](https://www.pluralsight.com/guides/virtual-dom-explained)

## 2. JSX là gì?

**Trả lời:**

JSX là một phần mở rộng của cú pháp JavaScript cho phép viết code trông giống như HTML. Nó sẽ biên dịch thành các lời gọi hàm Javascript thông thường, cung cấp một cách tiếp cận dễ hiểu hơn để tạo các markup cho component của bạn.  

Ta có JSX:

```ruby
<div className="sidebar" />
```

Khi được dịch sang Javascript sẽ là:

```ruby
React.createElement(
  'div',
  {className: 'sidebar'}
)
```

**Tham khảo:**

[JSX là gì?](https://www.newline.co/fullstack-react/30-days-of-react/day-2/)

[Hiểu sâu về JSX](https://reactjs.org/docs/jsx-in-depth.html)

[JSX trong React Design Patterns và các Best Practices](https://www.sitepoint.com/premium/books/react-design-patterns-and-best-practices-second-edition/read/1/?preview=true&utm_source=blog&utm_medium=articles)

## 3. Sự khác nhau giữa class component và functional component?

**Trả lời:**

Trước phiên bản React 16.8 ( trước khi giới thiệu hooks ), component dựa theo class thường được sử dụng để tạo component, với mục đích để lưu giữ trạng thái bên trong hay tận dụng các phương thức vòng đời ( VD: `componentDidMount` hay `shouldComponentUpdate` ). Một component dựa theo class là một class ES6, nó mở rộng class React Component và với tối thiểu phải thực hiện phương thức `render()`

**Class component:**

```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Functional component là không có trạng thái (stateless) ( được dùng ở phiên bản React trước 16.8 ) và trả về output mà cần được render. Chúng phù hợp với việc render UI chỉ phụ thuộc vào props, thông thường chúng đơn giản hơn và nhanh hơn so với component dựa theo class.

**Functional component:**

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

**Tham khảo:**

[Functional Components với Class Components trong React](https://www.freecodecamp.org/news/functional-components-vs-class-components-in-react/)

## Keys được dùng để làm gì?

**Trả lời:**

Khi thực hiên render một tập hợp trong React, việc thêm một key cho mỗi thành phần được lặp lại là cần thiết để giúp React theo dấu mối liên kết giữa các thành phần và dữ liệu. Key nên là một ID duy nhất, lý tưởng nhất nên là một UUID hay một chuỗi duy nhất khác từ tập hợp phần tử, hoặc cũng có thể là index của array.

```
<ul>
  {todos.map((todo) =>
    <li key={todo.id}>
      {todo.text}
    </li>
  )};
</ul>
```

Không dùng key có thể dẫn đến một vài sự thay đổi lạ khi thêm và xoá các phần tử từ tập hợp.

**Tham khảo:**

[List và keys](https://reactjs.org/docs/lists-and-keys.html#keys)

[Tìm hiểu về key React props](https://kentcdodds.com/blog/understanding-reacts-key-prop)

## 5. Sự khác nhau giữa state và props 

**Trả lời:**

Props là dữ liệu được truyền vào trong một component từ cha của nó. Chúng không nên bị thay đổi, và chỉ dùng để hiển thị hay tính toán các giá trị khác. State là dữ liệu bên trong của một component, nó có thể được thay đổi trong vòng đời của component và được duy trì giữa các lần re-render 

**Tham khảo:**

[Props và states](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)

## 6. Tại sao phải goi setState thay vì trực tiếp thay đổi state?

**Trả lời:**

Nếu bạn cố gắng thay đổi một state của component trực tiếp, React sẽ không thể biết được khi nào nó cần phải re-render component. Bằng cách sử dụng phương thức `setState()`, React có thể cập nhật component của UI.

Nếu bạn cần cập nhật một state của component dựa theo dữ liệu của state khác hay props khác, chỉ cần truyền một hàm vào setState(), khi đấy bạn truyền state và props như 2 tham số của hàm:

```
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

**Tham khảo:**

[Sử dụng state chính xác](https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly)

## 7. Làm thế nào để bạn giới hạn kiểu giá trị cho props được truyền vào hay làm nó luôn cần required?

**Trả lời:**

Để kiểm tra kiểu cho một props của component, bạn có thể dùng thư viện `prop-types` để chỉ rõ kiểu của giá trị mong muốn và yêu cầu prop là cần phải có hay không:

```
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

**Tham khảo:**

[Typechecking với PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

## 8. Props drilling là gì? Cách để phòng tránh nó?

**Trả lời:**

Prop drilling là điều xảy ra khi bạn cần truyền dữ liệu từ một component cha xuống một component thấp hơn trong cây component, drilling - khoan vào các component khác mà các component đấy có thể không cần giá trị props, trong khi chỉ một vài component là cần thôi.

Thỉnh thoảng vấn đề prop drilling có thể được phòng tránh bằng việc refactor component, tránh việc chia component thành nhỏ hơn và giữ các state chung vào trong component cha chung gần nhất. Với việc bạn cần chia sẻ state giữa các component mà không phụ thuộc vào vị trí xa hay gần trong cây component, bạn có thể sử dụng React Context API hay thư viện quản lý state tập trung _ vd như Redux.

**Tham khảo:**

[Prop drilling](https://kentcdodds.com/blog/prop-drilling)

## 9. React context là gì?

**Trả lời:**

Context API được cung cấp bởi React để giải quyết vấn đề chia sẻ state giữa các component trong một ứng dụng. Trước khi context ( bối cảnh ) được giới thiệu, giải pháp duy nhất là sử dụng một thư viện quản lý state, VD như Redux. Tuy nhiên, nhiều nhà phát triển cảm thấy Redux cung cấp nhiều thứ phức tạp không cần thiết, đặc biệt là với ứng dụng nhỏ.

**Tham khảo:**

[Context ( React doc )](https://reactjs.org/docs/context.html)

[Thay thế Redux với React Hook và Context API](https://www.sitepoint.com/replace-redux-react-hooks-context-api/)

## 10. Redux là gì?

**Trả lời:**

Redux là thư viện quản lý state bên thứ 3 cho React, được tạo trước context API. Nó dựa theo khái niệm của một kho chứa state, hay gọi là store, các component có thể nhận dữ liệu từ các props. Cách duy nhất để update store là dispatch một hành động đến store, và việc này được thực thi qua reducer. Reducer sẽ nhận action và state hiện tại, và trả về một state mới, đồng thời kích hoạt cho các component đăng ký trạng thái re-render lại.

![](https://images.viblo.asia/f05dc1c3-b9b3-410d-9d7b-a95ef9814fe4.png)

**Tham khảo:**

[Bắt đầu với Redux](https://www.sitepoint.com/getting-started-redux/)

[Tìm hiểu sâu về Redux](https://www.sitepoint.com/redux-deep-dive/)

## 11. Cách tiếp cận phổ biến để style ứng dụng React?

**Trả lời:**

Có nhiều cách tiếp cần để style React component, mỗi cách đều có ưu và nhược điểm. Đó là:

- Inline styling: rất hữu ích cho việc sửa style, nhưng có nhiều giới hạn ( vd: không style được các class giả )
- Class based CSS styles: nhiều tính năng hữu ích hơn inline styling và phù hợp với các nhà phát triển mới 
- CSS in JS styling: có nhiều thư viện cho phép style được định nghĩa như Javascript trong components, và chúng ta thao tác giống như code JS thông thường 

**Tham khảo:**

[So sánh 8 cách để style React component](https://www.sitepoint.com/react-components-styling-options/)

## 12. Sự khác nhau controlled và uncontrolled component?

**Trả lời:**

Trong một tài liệu HTML, có rất nhiều thành phần quản lý trạng thái của chính nó. Một uncontrolled component ( component không tự điều khiển ) coi DOM như nguồn state của input của chúng. Còn trong một controlled component ( component tự điều khiển ), state bên trong thường được sử dụng để theo dấu giá trị của thành phần. Khi giá trị của input thay đổi, React sẽ re-render lại input.

Uncontrolled components có thể hữu ích khi tích hợp với code không React 

**Tham khảo:**

[Controlled và uncontrolled input react](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/)

[Controlled component ( React doc )](https://reactjs.org/docs/forms.html#controlled-components)

[Uncontrolled component ( React doc )](https://reactjs.org/docs/uncontrolled-components.html)

## 13. Các phương thức vòng đời là gì?

**Trả lời:**

Các component dựa theo class có thể sử dụng các phương thức đặc biệt, được gọi tại các thời điểm cụ thể trong vòng đời của nó, như khi nó được mount ( render vào DOM ) và khi nó bị unmount. Những thời điểm này rất hữu ích cho việc cài đặt và cung cấp thông tin cho một component có thể cần, cài đặt bộ đo thời gian hay gắn một vài sự kiện trình duyệt, ...

Các phương thức vòng đời bên dưới hay được dùng:

- componentWillMount: được gọi sau khi component được tạo, nhưng trước khi nó được render vào DOM.
- componentDidMount: được gọi sau lần render đầu tiên, thành phần DOM của component đã chuyển sang trạng thái sẵn sàng sử dụng
-  componentWillReceiveProps: được gọi khi một prop cập nhật 
-  shouldComponentUpdate: khi các prop mới được nhận, phương thức này có thể chặn quá trình re-render để tối ưu hoá hiệu suất 
-  componentWillUpdate: được gọi khi prop mới được nhận và shouldComponentUpdate trả về true 
-  componentDidUpdate: được gọi sau khi component đã cập nhật 
-  componentWillUnmount: được gọi trước khi component được xoá khỏi DOM, cho phép bạn xoá mọi thứ như bộ lắng nghe sự kiện, ...

**Tham khảo:**

[Mô hình các phương thức vòng đời trong react](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

[Vòng đời component](https://reactjs.org/docs/react-component.html#the-component-lifecycle)

## 14. React hook là gì?

**Trả lời:**

Hook là nỗ lực của React để mang sự thuận tiện của component dựa theo class sang component dựa theo function ( bao gồm state nội tại và các phương thức vòng đời )

**Tham khảo:**

[Học React hook trong 5 phút](https://www.freecodecamp.org/news/react-hooks-in-5-minutes/)

[React Hook: bắt đầu và sử dụng](https://www.sitepoint.com/react-hooks/)

## 15. Các ưu điểm của React hooks?

**Trả lời:**

Có một vài lợi ích khi sử dụng React hook là:

- Xoá bỏ sự cần thiết của component dựa theo class, các vòng đời và keyword `this`
- Dễ dàng tái sử dụng logic, bằng cách trừu tượng hoá các chức năng phổ biến thành custom hook 
- Code dễ đọc, dễ test bằng cách chia sẻ logic giữa các component với nhau 

**Tham khảo:**

[Lợi ích của React hook](https://www.darrenlester.com/blog/benefits-of-react-hooks)

[React hook - ưu điểm và so sánh với cách tiếp cận tái sử dụng code cũ](https://medium.com/@mateuszroth/react-hooks-advantages-and-comparison-to-older-reusable-logic-approaches-in-short-f424c9899cb5)

## Tổng kết 

Mặc dù không tập trung chi tiết nhưng với những câu hỏi trên cũng đã bao quát khá nhiều phạm vi kiến thức liên quan đến React. Hiểu kỹ những chủ đề này sẽ giúp bạn có kiến thức tốt hơn về thư viện này, và đi kèm với một vài sự thay đổi gần đây. Ngoài ra, với các bài viết tham khảo cũng giúp bạn hiểu sâu hơn về các chủ đề đó.