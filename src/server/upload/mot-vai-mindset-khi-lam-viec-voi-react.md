# Mở đầu

Ngày nay, công nghệ ngày càng phát triển, và thế giới Web cũng vậy. Đa số web hiện đại đều đã nói lời tạm biệt với những dòng Ruby, PHP, hay Java được nhúng trong HTML/JS. Phần giao diện người dùng được chính browser phía client xử lý, thay vì server ôm hết như xưa. Các thư viện/framework như React, Angular, Vue, ... đều đã trở nên quá quen thuộc.

Nếu bạn có ý định học hay đã chuyển sang React thì mong bài viết có thể giúp các bạn có những mindset tốt hơn khi làm việc với nó.

Sau 1 thời gian làm việc với React, đây đều là những thứ mình cho rằng nên quan tâm 

Bài viết này không nói về việc hướng dẫn code React.

# Component

### React is all about components

React được design theo hướng Component, mỗi phần tử nhỏ nhất như thẻ `<span>`, hay `<button>` đều có thể wrap thành một component để tái sử dụng 1 cách tối đa.

```jsx
// path/to/button.jsx
export function Button({ children, type, onClick }) {
  return (
    <button type="button" className={`btn btn-${type}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

Và ở đâu cần component này, ta sẽ import nó vào để sử dụng.

```jsx
import { Button } from "./path/to/button";

function Screen() {
  return (
    <Button type="primary" onClick={() => console.log("Clicked")}>
      Click me
    </Button>
  );
}
```

Với những ngôn ngữ server side truyền thống, ta sẽ viết như sau (slim ruby):

```slim
/ path/to/a.slim
button.btn.btn-primary
  | Button A
```

```slim
/ path/to/b.slim
button.btn.btn-primary
  | Button B
```

Có thể thấy là code của ta trông sáng sủa hơn rất nhiều.

Trên thực tế, ta cũng nên viết những component nhỏ nhất có thể như vậy, nó sẽ giúp giao diện app ta đồng bộ, và debug cũng trở nên dễ hơn.

Hay thử với một component phức tạp hơn hơn xíu:

```jsx
function List({ items, renderItem, emptyText }) {
  if (items.length === 0) {
    return (
      <div>
        <span>{emptyText}</span>
      </div>
    );
  }

  return <div>{items.map(item => renderItem(item))}</div>;
}
```

### Cấu trúc thư mục

Đối với những dự án lớn, có một cấu trúc thư mục rõ ràng sẽ khiến việc code trở nên dễ chịu hơn nhiều.

Lại quay lại các ngôn ngữ server side MVC cũ - Rails. Đây là một cấu trúc khó mà có thể thay đổi trong tất cả các dự án:

![](https://images.viblo.asia/70c519f5-7322-4384-a76f-caae42495028.png)

Dù với sự hỗ trợ của các Editor/IDE hiện đại trong việc tìm kiếm, mở file, thì cũng khá mất thời gian để có thể tìm được những file liên quan.

Với React thì flexible hơn, bạn có thể tổ chức theo kiểu trên (VD cho 1 project dùng Redux)

![](https://images.viblo.asia/a6cd4317-a0e0-4990-bdbe-5eea297d9ced.png)

Nhưng với mình thì mình thích cách tổ chức theo component/màn hình hơn.

![](https://images.viblo.asia/f70e763d-8744-497a-9a0c-6abcfc380195.png)

Mình học được cấu trúc trên từ một dự án trong list awesome react native - [Gitpoint](https://github.com/gitpoint/git-point), dù nó được viết bằng React Native nhưng bản chất vẫn là React nên không có vấn đề gì hết.

Tuy nhiên cấu trúc này gặp 1 nhược điểm ở chỗ nếu 2 màn hình mà share nhau chung 1 state (redux) thì sẽ gây bối rối, hoặc là lặp code. Với mình, mình chọn giải pháp tạo 1 thư mục shared, rồi cũng tổ chức file giống cấu trúc của thư mục `screens`. Còn không thì chấp nhận việc code bị lặp 1 chút.

# Functional Programming (FP)

Nếu như Ruby, Java là các ngôn ngữ lập trình hướng đối tượng (OOP) thì Javascript lại mang phong cách lập trình hàm, mặc dù vẫn có class, object nếu bạn muốn dùng (Prototype)

Với OOP, ta thường xuyên thay đổi trạng thái (các biến instance) của object, nhưng FP lại không thích điều này, mà thường hướng tới tính bất biến (Immutability) và pure function. Ta hãy cũng tìm hiểu thêm về chúng

### Pure Functions

Lấy ví dụ với việc cộng 2 số tự nhiên

```js
const z = 10;
const add = (x, y) => x + y;
add(1, 2); // 3
add(1, 3); // 4
```

Hàm `add` nhận 2 tham số `x` và `y`, nó chỉ sử dụng 2 tham số đầu vào này để thực hiện phép tính, mà không sử dụng/làm thay đổi các biến ngoài phạm vi hàm.

Hơn nữa nó luôn trả về cùng 1 giá trị nếu như tham số đầu vào không thay đổi.

Còn xem hàm dưới đây

```js
const bonus = 5;
const add = (x, y) => x + y + bonus;
add(1, 2); // 3
add(1, 2); // 3
```

Dù luôn trả về một giá trị với cùng tham số, tuy nhiên hàm lại phụ thuộc vào biến `bonus` (external variable) nên đây được xem là 1 impure function.

Ngoài ra impure function cũng gây ra các side effects như các hàm sau:

- Gọi HTTP request
- Ghi dữ liệu
- `Math.random()`, `new Date()`
- ....

Giá trị trả về của chúng không phải lúc nào cũng giống nhau, điều đó khiến kết quả của hàm khó mà lường trước được, khi test ta thường phải mock 1 giá trị cố định.

Pure function sẽ giúp app chúng ta ít lỗi hơn, ngoài ra cũng dễ dàng test hơn.

Trong React, nói đến pure function ta thường nghĩ đến stateless component - Functional Component, nó sẽ chỉ sử dụng props để tính toán và render dựa trên những props đó. Tuy nhiên những update gần đây đã thêm [Hook](https://reactjs.org/docs/hooks-intro.html), nó làm cho Functional Component cũng có thể có state. Cá nhân mình không thích cái Hook này lắm.

Nhưng app của ta không chỉ toàn pure function được, sẽ phải có những hàm gọi API, thay đổi state, lấy state để tính toán, lưu dữ liệu vào localStorage, ... nhưng hãy cố gắng giảm thiểu số lượng side effects xuống thấp nhất có thể.

### Immutability

Một điều quan trọng nữa là tính bất biến.

Functional programming nói chung và React nói riêng, ta thường tránh việc sửa trực tiếp 1 biến nào đó, hay state. Thay vào đó, ta sẽ tạo 1 biến mới.

```js
const person = {
  age: 12
};
person.name = "Name";

let array = [1, 2, 3];
array.push(4);
```

Nếu trong dự án của bạn có những dòng code như trên, thì code bạn đã mất tính bất biến.
Thay vì trực tiếp chỉnh sửa 1 biến như vậy. Ta nên tạo 1 biến mới với những giá trị cũ, sau đó thêm giá trị mới vào.

```js
const updatedPerson = {
  age: person.age,
  name: "Name"
};
// hay
const updatedPerson = {
  ...person,
  name: "Name"
};
```

Dễ dàng nhận thấy `updatedPerson.age` vẫn tham chiếu đến giá trị cũ của `person.name`, tuy nhiên ta sử dụng biến `updatedPerson` này thế nào đi nữa, thì cũng sẽ không ảnh hưởng đến giá trị của `person`

Nhưng tại sao lại phải làm vậy? Thử xét 1 vòng lặp đơn giản như:

```js
let s = 0;
let index = 0;
for (index = 0; index < data.length; index++) {
  s += data[index];
}
```

Giả sử đang trong quá trình lặp, thi `data[n]` bị thay đổi, chẳng phải `s += data[index]` sẽ sai luôn hay sao.

Còn trong React, ta có `React.PureComponent` nó sẽ shallow compare props và state để quyết định xem có update component hay không.

```jsx
export class SampleComponent extends React.PureComponent {
  state = {
    filter: {
      name: "A name",
      age: 21
    }
  };

  //  shouldComponentUpdate(nextProps, nextState) {
  //	  return shallowCompare(this, nextProps, nextState)
  // 	}

  handleClick = () => (this.state.filter.name = "New name");

  render() {
    return (
      <div>
        <h3>{this.state.filter.name}</h3>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}
```

`React.PureComponent` đã định nghĩa sẵn cho ta phương thức `shouldComponentUpdate` như phần mình comment.

Hàm `shallowCompare` chỉ đơn thuần lặp tất cả các key có trong props và state, so sánh với state/props cũ.

Nó sẽ thực hiện việc so sánh `currentState.filter === nextState.filter` (so sánh bằng tham chiếu).

Việc này có lợi hơn rất nhiều so với việc deep compare tất cả các giá trị trong filter (cả về thời gian lẫn độ phức tạp).

Tuy nhiên, khi chúng ta trực tiếp chỉnh sửa `this.state.filter.name = 'New name'`, sẽ khiến filter không hề thay đổi về tham chiếu. Khi đó:

```js
currentState.filter === nextState.filter; // true
currentState.filter.name === nextState.filter.name; // false
```

và `SampleComponent` của ta cũng sẽ không re-render, cho dù bạn có click đến sang năm.

![](https://images.viblo.asia/ecee315c-f2a5-4eb6-a290-af2c100a8724.png)

Thay vào đó ta sẽ làm như sau

```js
handleClick = () => {
  this.setState({ filter: { ...this.state.filter, name: "New name" } });
};
```

Ta copy toàn bộ tham chiếu các attribute của `state.filter` cũ sang 1 object mới, và sau đó thay đổi biến `name` của object mới này, ta không hề làm thay đổi `state.filter` cũ.

Khi đó `currentState.filter === nextState.filter` sẽ trả về `false`. `SampleComponent` của ta được re-render lại. Và nếu có action nào không làm thay đổi `state`, component của ta cũng sẽ không re-render. Vậy là cả React và ta đều happy - _một người khỏe, 2 người vui :v_

### Higher-Order Functions (HOF)

> HOF nhận tham số là hàm, hoặc trả về một hàm khác, hoặc là cả 2.

VD 1 hàm nhận tham số hàm:

```js
const name = "React";
const phoneNumber = "0969696969";
const numberValidator = str => str.match(/\d+/g);
const validate = (value, validator) => !!validator(value);

validate(name, numberValidator); // false
validate(phoneNumber, numberValidator); // false
```

Hay 1 hàm trả về 1 hàm:

```js
function makeAdder(constantValue) {
  return function adder(value) {
    return constantValue + value;
  };
}
```

ta gọi hàm này như sau: `makeAdder(10)(20)`

Thoạt nhìn có vẻ sợ, nhưng nếu viết minh bạch ra

```js
const add10 = makeAdder(10);
add10(20); // 30
```

Mọi thứ trở nên rõ ràng hơn nhiều, `makerAdder(10)` trả về một hàm, sau đó ta gọi hàm này với tham số là 20

```js
const add10 = makeAdder(10);
// add10 = function adder(value) {
//	 return 10 + value
// }
add10(20);
```

Trong React, ta cũng thường xuyên áp dụng kỹ thuật này, tuy nhiên ngoài HOF, thì ta còn có Higher-Order Component (HOC), nhằm chỉ những hàm nhận vào tham số là 1 Component và trả về 1 Component khác.

VD:

```jsx
function protectRoute(Component, requiredRole) {
  return function ProtectedRoute(props) {
    const currentRole = localStorage.getItem("role");
    if (currentRole < requiredRole) {
      return <Redirect to="/sign_in" />;
    }
    return <Component {...props} />;
  };
}
```

### Declarative Programming

Ta có 2 thiên hướng lập trình đối lập nhau, đó là:

- Imperative Programming: mô tả control flow của việc cần làm
- Declarative Programming: chỉ viết ra những gì cần làm mà không mô tả rõ control flow của từng bước.

VD tiêu biểu đó là 1 vòng lặp cơ bản:

Style Imperative:

```js
const arr = [1, 2];
const newArr = [];
for (let i = 0; i < arr.length; i += 1) {
  newArr.push(arr[i] + 1);
}
console.log(newArr); // [2, 3]
```

Với style này, bạn nêu lần lượt từng bước code bạn thực hiện như thế nào, ta phải đi sâu vào implementation hơn.

Trong khi đó với Declarative:

```js
const arr = [1, 2];
const newArr = arr.map(element => element + 1); // [2, 3]
```

Ta sẽ chỉ nói rằng ta cần 1 mảng mới từ arr, mà mỗi phần tử của nó tăng lên 1. Code của ta vừa dễ hiểu và vừa đẹp hơn.

Một số ngôn ngữ tiêu biểu:

- Imperative: C/C++, Java, ...
- Declarative: SQL, HTML, ...
- Tạp phế lù: Javascript =)), ...

Ở trên là những gì mình search được trên google khi bắt đầu tìm hiểu về Declarative Programming. Tuy nhiên, vẫn khá là khó hiểu, và khó phân biệt giữa 2 thằng Imperative và Declarative

Tuy nhiên khi đọc được comment [này](https://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-programming#comment29365241_1784702), mọi thứ đã trở nên sáng sủa hơn nhiều. Mình coi nó là 1 lớp abstract, mà khi gọi hàm đó, ta chỉ cần quan tâm đến _what to do_ mà không phải nghĩ xem _how to do_.

Hãy sử dụng các hàm có sẵn của javascript như: `.map`, `.reduce`, `.filter`, ... và bạn sẽ nhận thấy được vẻ đẹp của Declarative Programming.

Quay trở lại với React, vậy thì tính Declarative của nó ở đâu?

Chính bản thân các component React đã rất 'declarative' rồi.

Hãy đọc phần description của React trên [Github](https://github.com/facebook/react)

> A declarative, efficient, and flexible JavaScript library for building user interfaces.

Thử so sánh 2 đoạn mã sau:

```js
// jQuery
$(".like").click(function() {
  const $btn = $(this);
  if ($btn.hasClass("liked")) {
    $btn.removeClass("liked");
  } else {
    $btn.addClass("liked");
  }
});
```

```jsx
// React
class LikeButton extends React.Component {
  // ...codes
  render() {
    if (this.state.liked) {
      return <HighlightButton>Like</HighlightButton>;
    }
    return <Button>Like</Button>;
  }
}
```

Với jQuery, ta phải mô tả chính xác code ta cần làm gì.

Trong khi đó với React: _Tiểu nhị, like rồi thì cho cái `HightlightButton` ra đây, không thì `Button` thường thôi._

Ta sẽ quan tâm đến việc component cần hiển thị cái gì tương ứng với mỗi (props/state) của nó.

# Link tham khảo

https://github.com/facebook/react

https://github.com/jondot/awesome-react-native

https://github.com/gitpoint/git-point

https://medium.freecodecamp.org/all-the-fundamental-react-js-concepts-jammed-into-this-single-medium-article-c83f9b53eac2?gi=7fb0830efbd4

https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536

https://www.miles.no/blogg/tema/teknisk/why-care-about-functional-programming-part-1-immutability

https://blog.logrocket.com/immutability-in-react-ebe55253a1cc

https://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-programming#comment29365241_1784702