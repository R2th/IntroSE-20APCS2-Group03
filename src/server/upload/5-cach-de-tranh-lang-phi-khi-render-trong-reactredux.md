Trong quá trình làm việc với React / Redux, mình nhận thấy một số components của mình được render nhiều lần mà không có bất kỳ lý do rõ ràng nào. Đây thường không phải là vấn đề lớn mà bạn quan tâm nhưng khi một ứng dụng phát triển, hiệu năng có thể trở thành mối quan tâm hàng đầu và đây sẽkhông còn là một vấn đề nhỏ nữa. Không quan trọng nếu bạn ở đây để tìm cách thoát khỏi cái bẫy render hay đơn giản là bạn chỉ muốn tìm hiểu những điều mới, thì sau đây mình sẽ đưa ra 5 mẹo sẽ giúp trong trường hợp này:

# 1. Tích hợp why-did-you-update vào tools mà bạn đang sử dụng:

[Why-did-you-update](https://github.com/maicki/why-did-you-update) là một công cụ thực sự hữu ích để giải quyết những trường hợp như thế này. Tóm lại, đây là một function ghi log cho các trường hợp không cần render trong console (không thay đổi props / state, v.v.):
![](https://images.viblo.asia/4eb09960-2b40-454b-8081-4edb9c65bc34.png)

Nhưng mình muốn cảnh báo các bạn một điều, bạn có thể nhận ra rằng code của mình không thực sự hiêu quả như bạn nghĩ, điều này có thể gây tổn hại đến niềm tự tôn của một coder chân chính (^^).
# 2. Sử dụng PureComponent thay vì component:

Mẹo này không thật sự cần thiết đối với những người mới tiếp cận với React. Đầu tiên, bạn phải nhận ra được sự khác nhau giữa chúng.
PureComponent tuơng tự như một component bình thường. ngoại trừ việc nó xử lý sẵn hàm 'shouldComponentUpdate' cho bạn. Khi props hay state thay đổi, PureComponent sẽ so sánh các values hiện tại và tương lai sau đó sẽ re-render lại nếu có sự khác biệt. Mặt khác, một component sẽ re-render mặc định khi shouldComponent được goị kể cả khi props hay state không thay đổi.
Cho nên, nếu bạn không muốn tự tay gọi shouldComponentUpdate mình khuyến khích bạn nên sửu dụng PureComponent.

# 3. Sử dụng shouldComponentUpdate:

Bên trong môth Component, React cung cấp cho bạn một hàm lifecycle tên là shouldComponentUpdate. Hàm này sẽ cung cấp cho bạn cơ hội để qyết định xem dưới điều kiện nào thì Component sẽ đựoc re-render. Nó rất đơn giản để triển khai và sẽ khiên hiệu năng của ứng dụng của bạn được cải thiện rất nhiều:
```
class ListItem extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.isFavourite != this.props.isFavourite;
    }
    ...
}
```

# 4.  Sử dụng những hàm Handle:

Khi chúng ta truyền một hàm vào vào props trong một component, bạn có thể truyền vào như là một handle function hoặc một inline function:
```
const handleClick = value => this.setState({ value });

// Handle Function
<MyComponent onClick={this.handleClick} />

// Inline Function
<MyComponent onClick={value => this.setState({ value })}
```
Nhìn qua, cả 2 cách đều trông khá đơn giản nhưng sự khác biệt lại xảy ra bên trong shouldComponentUpdate. Hãy cũng so sánh một cách chi tiết 2 đối tượng javascript sau:
```
const object1 = { key: "value" }
const object2 = { key: "value" }
object1 === object2 // false
object1 === object1 // true
```
Trong JavaScript, các hàm là các đối tượng first-clas và những gì phân biệt chúng với các đối tượng khác là cách chúng có thể được gọi. Vì vậy, chúng ta sẽ dùng chung một cách để gọi chúng:
```
const logFunction = () => console.log("Example");

(() => console.log("Example")) === (() => console.log("Example")); // false
logFunction === (() => console.log("Example")); // false
logFunction === logFunction // true
```
Khi một hàm được truyền vào một component, nó sẽ được đón nhận như là một hàm mới mỗi khi component cha được re-render. Cho nên, bạn thật sự nên dùng handle function cho dùng hàm bạn truyền vào chỉ có một dòng code đi chăng nữa.
# 5. Sử dụng selector thay vì mapStateToProps:

thay vì dùng Object.values() trong mapStateToProps để biến một key object từ Redux thành một array, bạn nên thử xem qua selector. Mot selector sẽ không tính toán lại trừ khi một biến hay giá trị của nó thay đổi, điều này sẽ tránh những làn re-render vô nghĩa. Mình thật sự khuyến khích các bạn nên sử dụng [reslect](https://github.com/reduxjs/reselect), một trong những thư viên selector tốt nhất của Redux.
```
// Store Redux
state = {
 cars: {
   carsById: {
     1: { id: 1, name "Toyota" },
     2: { id: 2, name "Lexus" },
     3: { id: 3, name "Honda" }
   }
 }
};

// selectors.js
const carsSelector = state => state.cars.carsById;
export const getCarsSelector = createSelector(carsSelector, carsById => Object.values(carsById));

// CarListPage.js
class CarListPage extends PureComponent {
  ...
  render() {
    return (
      <div className="myClass">
        {this.props.cars.map(car => <CarComponent car={car} />)}
      </div>
    );
  };
  ...
}
  
const mapStateToProps = state => {
  return {
    cars: getCarsSelector(state)
  };
};
```

Điều cuối cùng mà mình muốn chia sẻ là điều quan trọng nhất cần nhớ khi xử lý tối ưu hóa lại là sử dụng những phương pháp thông thường. Càng đơn giản càng đẹp, đây chắc chắn là điều mà bạn nên lưu ý để tránh cho code vừa phức tạp vừa xấu xí.
Bài chia sẻ cuả mình cũng xin dừng lại tại đây, nếu bạn có bất cứ ý kiến gì hãy cho mình biết nhé. Hẹn gặp lại các bạn trong những bài viết sau.