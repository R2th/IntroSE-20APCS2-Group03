# 1. Đặt tên 
**Tên tệp :** Sử dụng PascalCase cho tên tệp. Ví dụ ReservationCard.jsx.

**Đặt tên tham chiếu :** Sử dụng PascalCase cho các thành phần React và camelCase cho các thể hiện của chúng.

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
**Tên component**
Tên của component đề cập đến trách nhiệm của nó, phải rõ ràng và duy nhất trong ứng dụng, để làm cho chúng dễ tìm thấy hơn và tránh nhầm lẫn có thể xảy ra.
> “what this component do ?”
> 

Component ***Sidebar*** này là một Sidebar.

Component  ***ACommunityAddToShortListButton*** là  nút của ACommunity chịu trách nhiệm thêm hồ sơ vào một danh sách ngắn.

Component ***ChatConversationName***  này chỉ chịu trách nhiệm hiển thị tên của một cuộc trò chuyện.

Chúng ta theo cách đặt tên component dựa trên đường dẫn mẫu , bao gồm việc đặt tên thành phần tương ứng với đường dẫn tương đối của nó tới các thư mục components hoặc src trong trường hợp bạn ở ngoài components thư mục. Về cơ bản, một thành phần được đặt tại: components/User/List.jsxsẽ được đặt tên là UserList.

Khi tệp nằm trong một thư mục có cùng tên, chúng ta không cần lặp lại tên. Điều đó nói rằng, components/User/Form/Form.jsx sẽ được đặt tên như UserForm và không UserFormForm.

Các loại Compoent :

*View component* :  chỉ hiển thị redering dữ liệu ( không API gọi )

*Button componen*:  chỉ hiển thị 1 khung nhìn hành động

*Connect component*: legacy connect components

*Forms components*: Input , Upload , etc …

*HoC Component*

**Tên Higher-order Component** 
 Sử dụng kết hợp tên của thành phần bậc cao và tên thành phần được truyền vào làm thành phần **displayName** được tạo. Ví dụ, các thành phần bậc cao **withFoo()**, khi đã thông qua một thành phần **Bar** cần tạo ra một thành phần với một displayName số **withFoo(Bar).**
 
 ```js
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
 **Tên props** 
 Tránh sử dụng tên prop components DOM cho các mục đích khác nhau. 
 
```
 // bad
<MyComponent style="fancy" />

// bad
<MyComponent className="fancy" />

// good
<MyComponent variant="fancy" />
```

# 1. Giữ component nhỏ :
Giữ cho các component nhỏ để tối đa hóa tiềm năng tái sử dụng của chúng, giảm xảy ra lỗi, cho phép chùng tập trung vào một mức độ lặp lại duy nhất và cải thiện khả năng đọc và kiểm tra.

> Tại sao ? Nguyên tắc chung là nếu phương thức render của bạn có hơn 10-20 dòng thì nó là quá lớn. [Ý tưởng của React](https://reactjs.org/docs/thinking-in-react.html) là khả năng tái sử dụng code vì vậy nếu bạn chỉ ném mọi thứ vào một file , bạn sẽ mất đi sự rõ ràng và đơn giản.
# 2. Mỗi component cho một file.
Nên cố gắng  đặt từng component vào file riêng của mình để đảm bảo chúng dễ đọc, bảo trì và kiểm tra hơn.
# 3. Sử dụng các Composition để mở rộng chức  năng.
**Composition** của components được xử lí thông qua this.props.children, cho phép một component render đầu ra của một hoặc nhiều component bằng cách chứa chúng dưới dạng các thành phần lồng nhau.
```js
<Modal show={true}>
  <ModalTitle>My Modal</ModalTitle>
  <ModalBody>
	  Welcome to composition!
  </ModalBody>
</Modal>

```
**Higher-order component (HoC)**  là một hàm lấy 1 component hiện có và trả về một component bao bọc nó. HoC có thể thực hiện bất kì thao tác sau: 

- Làm những việc trước và / hoặc sau khi nó gọi component được bọc
- Tránh hiển thị component được bọc nếu không đạt được tiêu chí nhất định
- Cập nhật các props được truyền vào component được bọc hoặc thêm các props mới
- Chuyển đổi đầu ra của component redern được bọc ( ví dụ: bọc với các phần tử DOM bổ sung, v.v. )

ví dụ  Hiển thị thời gian hiện tại sử dụng HoC
```js
// on-interval.jsx
// HoC cho phép chúng ta refresh 1 component 
// dựa trên một khoảng thời gian
const onInterval = (refresh) => (WrappedComponent) => {
  return class WithInterval extends Component {
	constructor(props) {
      super(props);
	  this.state = { ticks: 0 };
	  this.interval = setInterval(this.tick.bind(this), refresh);
	}
    
    tick() {
      this.setState({ ticks: this.state.ticks + 1 })
    }
    
    componentWillUnmount() {
	  clearInterval(this.interval);
	}
    
    render() {
      return <WrappedComponent {...this.props} />;
	}
  };
};
export default onInterval;
```
```js
/ timer.js
// Component để hiển thị thời gian hiện tại HH:MM:SS A/PM
import onInterval from './on-interval';

const Timer = ({ label }) => {
  const now = new Date();
  const hours = (now.getHours() % 12) || 12;
  const mins = now.getMinutes();
  const secs = now.getSeconds();
  return (<p>
    <b>{label && `${label}: `}</b> 
    {(hours < 10 ? '0' : '') + hours}:
    {(mins < 10 ? '0' : '') + mins}:
    {(secs < 10 ? '0' : '') + secs}
    {hours < 12 ? ' PM' : ' AM'}
  </p>);
};

export default onInterval(1000)(Timer);
```
```js
// app.js
import Timer from './timer';
import { render } from 'react-dom';

render(<Timer label="Current Time"/>, document.querySelector('#app'));

// Output được update theo mỗi giây
// => Current Time: 12:35:28 AM
// => Current Time: 12:35:29 AM
// => ...
```
# 4. Luôn luôn khai báo *propTypes*, *defaultProps* và *displayName*
Luôn luôn khai báo các loại prop và  tên hiển thị cho tất cả các component ( container or presentational ); và khai báo các props mặc định cho mọi props không bắt buộc.

> Tại sao ? propsTypes là 1 một dạng tài liệu và cung cấp defaultProps có nghĩa là người đọc code của bạn không phải giải sử nhiểu như vậy. Ngoài ra, nó còn có thẻ có nghĩa là code của bạn có thể bỏ qua các kiểm tra loại nhất định.
```js
// bad
function Bookend({ left, right, children }) {
  return <div>{foo}{children}{bar}</div>;
}
Bookend.propTypes = {
  left: PropTypes.number.isRequired,
  right: PropTypes.string
};

// good
function Bookend({ left, right, children }) {
  return <div>{left}{children}{right}</div>;
}
Bookend.displayName = 'Bookend';
Bookend.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string,
  children: PropTypes.node
};
Bookend.defaultProps = {
  right: '',
  children: null,
}; 
```

# 5. JSX 
### JSX đa dòng
Bất kể có bao nhiêu phần tử được trả về, chúng ta nên chọn viết bất kỳ JSX nào chứa các phần tử lồng nhau trên nhiều dòng có thụt lề để tăng cường khả năng đọc, tức là:
```js
return (
        <div>
            <ComponentOne />
            <ComponentTwo />
        </div>
    );
```
Thay vì
```js
return (<div><ComponentOne /><ComponentTwo /></div>);
```
### JSX có điều kiện
Khi bạn  có các phần tử có điều kiện cần được trả về tùy thuộc vào state, props hoặc điều kiện khác,  bạn khai báo một biến trống ở đầu hàm render và chỉ điền nó với JSX nếu điều kiện được đáp ứng. Khi biến được trả về trong câu lệnh trả về phương thức render, nó sẽ render  các phần tử có điều kiện hoặc không có gì cả.
```js
var optionalElement;

    if (this.props.condition) {
        optionalElement = (<div> … </div>);
    }

    return (
        <div>
            …
            {optionalElement}
            …
        </div>
    );
```
### Lùi dòng và dòng mới cho các thuộc tính component
```js
<Component
        attribute={...}
        anotherAttribute={...}
        attributeThree={...}
        …
    />

```
Thay vì 
```js
<Component attribute={...} anotherAttribute={...} attributeThree={...} />

```
# Kết luận 

Một số Covention này sẽ giúp bạn phát triển SPA lớn  nhanh mà không có vấn đề kết hợp, giúp code trong sáng hơn , dễ đọc dễ hiểu và dễ bảo trì.

Và hơn nữa, nó hoàn toàn tương thích với tìm kiếm mờ Sublime / VSCode! 🌟


Nguồn : 
https://hackernoon.com/react-components-naming-convention-%EF%B8%8F-b50303551505
https://gist.github.com/datchley/4e0d05c526d532d1b05bf9b48b174faf
https://web-design-weekly.com/2015/01/29/opinionated-guide-react-js-best-practices-conventions/