# Sử dụng `memo` và `PureComponent`
Cùng xem ví dụ dưới đây, ban có nghĩ rằng  ` <ComponentB>` sẽ render lại nếu `props.propA` thay đổi giá trị ?
```js
import React from 'react';

const MyApp = (props) => {
  return (
    <div>
      <ComponentA propA={props.propA}/>
      <ComponentB propB={props.propB}/>
    </div>
  );
};


const ComponentA = (props) => {
  return <div>{props.propA}</div>
};

const ComponentB = (props) => {
  return <div>{props.propB}</div>
};
```
Câu trả lời là **CÓ**. Bởi vì props.propA thay đổi => props thay đổi => `MyApp` được render lại và `<ComponentB>` ở trong đó. Vì vậy mặc dù props của `<ComponentB>`  không hề thay đổi, nhưng parent component thay đổi đã làm cho nó render lại theo.

Điều này cũng xảy ra tương tự khi khi render trong class-based component.

Các tác giả của React nhận thấy điều này sẽ không phải luôn là kết quả mong đợi. Để tăng hiệu suất, ta sẽ so sánh props cũ và props mới trước khi re-render..., đây thực chất là những gì `React.memo` và `React.PureComponent` đã làm.

Giờ thì thử sử dụng `memo` với functional component.
```js
import React, { memo } from 'react';

// 🙅‍♀️
const ComponentB = (props) => {
  return <div>{props.propB}</div>
};

// 🙆‍♂️
const ComponentB = memo((props) => {
  return <div>{props.propB}</div>
});
  
```
Vậy đó, bạn chỉ cần wrap `<ComponentB>` trong function memo() . Và nó sẽ chỉ render lại khi `propB` thực sự thay đổi giá trị, không quan tâm đến parent của nó render lại bao nhiêu lần.
Còn với những class-based component thì sao nhỉ, tương tự như vậy, chúng ta sẽ có `PureComponent`
```js
import React, { Component, PureComponent } from 'react';

// 🙅‍♀️
class ComponentB extends Component {
  render() {
    return <div>{this.props.propB}</div>
  }
}

// 🙆‍♂️
class ComponentB extends PureComponent {
  render() {
    return <div>{this.props.propB}</div>
  }
}
```
Vấn đề hiệu suất đã cải thiện bằng những cách khá dễ dàng. Bạn có thể tự hỏi tại sao các component React lại không tự động chỉ re-render chỉ khi prop của nó thay đổi.

Đó là vì thực sự có một chi phí ẩn giấu với `memo` và `PureComponent`. Vì sử dụng chúng đồng nghĩa sẽ thêm bước so sánh props cũ và mới, và việc này có thể trở thành mua dây buộc mình bất cứ lúc nào. Ví dụ, nếu props của bạn rất lớn, hoặc bạn truyền các React component như props, việc so sánh giá trị mới/cũ sẽ trở nên  phức tạp và tốn kém.

Một công cụ có thể trở thành con dao hai lưỡi bất cứ lúc nào và `memo/PureComponent` cũng không ngoại lệ. Bạn chắc chắn muốn thử chúng một cách kỹ lưỡng, chu đáo nhất. Tuy nhiên đa số trường hợp là tích cực, bạn sẽ ngạc nhiên với hiệu quả về hiệu suất mà chúng mang lại.
    
# Tránh sử dụng các hàm ẩn danh 
Hàm ẩn danh (Anonymous function) là những hàm được sinh ra đúng vào thời điểm chạy của chương trình.

Thông thường, các function trong component thường là các event handler, hoặc callback. Trong nhiều trường hợp bạn thường sẽ sử dụng anonymous function cho chúng như:
```js
import React from 'react';

function Foo() {
  return (
    <button onClick={() => console.log('boop')}> // 🙅‍♀️
      BOOP
    </button>
  );
}
```
Vì anonymous function không được gán định danh (thông qua const/let/var), chúng không tồn tại khi function component cần render lại. Việc này khiến JavaScript phải cấp một bộ nhớ mới mỗi lần component này render lại thay vì chỉ cấp một bộ nhớ duy nhất khi sử dụng "named function" (hàm có tên).

```js
import React, { useCallback } from 'react';

// Variation 1: naming and placing handler outside the component 
const handleClick = () => console.log('boop');
function Foo() {
  return (
    <button onClick={handleClick}>  // 🙆‍♂️
      BOOP
    </button>
  );
}

// Variation 2: "useCallback"
function Foo() {
  const handleClick = useCallback(() => console.log('boop'), []);
  return (
    <button onClick={handleClick}>  // 🙆‍♂️
      BOOP
    </button>
  );
}
```
 `useCallback` là một cách khác để tránh những nhược điểm của hàm ẩn danh, nhưng nó có sự đánh đổi tương tự đi kèm như `React.memo` đã đề cập trước đó.

Với các class-based component, giải pháp này khá dễ dàng và không thực sự có bất kỳ nhược điểm nào. Nó là giải pháp được khuyến khích để định nghĩa các handler trong React

```js
import React from 'react';

class Foo extends Component {
  render() {
    return (
      <button onClick={() => console.log('boop')}>  {/* 🙅‍♀️ */}
        BOOP
      </button>
    );
  }
}

class Foo extends Component {
  render() {
    return (
      <button onClick={this.handleClick}>  {/* 🙆‍♂️ */}
        BOOP
      </button>
    );
  }
  handleClick = () => {  // this anonymous function is fine used like this
    console.log('boop');
  }
}
```
# Tránh Object Literals
Object literals hiểu đơn giản là khai báo một object trong JavaScript ({ }).

Tip này cũng tưong tự với tip trên. Object literal không được cấp một bộ nhớ liên tục (persistent memory space), vì vậy component của bạn sẽ cần cấp một vị trí mới trong bộ nhớ bất cứ khi nào component re render.
```js
function ComponentA() {
  return (
    <div>
      HELLO WORLD
      <ComponentB style={{  {/* 🙅‍♀️ */}
        color: 'blue',     
        background: 'gold'
      }}/>
    </div>
  );
}

function ComponentB(props) {
  return (
    <div style={this.props.style}>
      TOP OF THE MORNING TO YA
    </div>
  )
}
```
Mỗi lần `<ComponentA>` được re-rendered, một object literal mới sẽ được tạo ra trong bộ nhớ. Ngoài ra, điều đó cũng có nghĩa là `<ComponentB>` cũng nhận được một object style khác. Sử dụng `memo` và `PureComponent` sẽ không đủ để ngăn chặn việc render lại ở đây 😭

Tip này không chỉ áp dụng cho prop là style, nhưng nó thường là nơi các object literal được sử dụng vô tình trong React Component. Chúng ta sẽ khắc phục bằng cách đặt tên cho object (đương nhiên là ở phía ngoài nội dung component)
```js
 const myStyle = {  // 🙆‍♂️
  color: 'blue',     
  background: 'gold'
};
function ComponentA() {
  return (
    <div>
      HELLO WORLD
      <ComponentB style={myStyle}/>
    </div>
  );
}

function ComponentB(props) {
  return (
    <div style={this.props.style}>
      TOP OF THE MORNING TO YA
    </div>
  )
}
```
# Sử dụng `React.lazy` and `React.Suspense`
Cải thiện tốc độ cho ứng dụng React của bạn nhanh  hơn có thể thực hiện được thông qua việc tách mã. Tính năng này được giới thiệu cho React v16 với `React.lazy` và `React.Suspense.`

Phân tách mã  có nghĩa là source code ứng dụng JavaScript của bạn được chia thành các phần nhỏ hơn (bundle) và chỉ tải các đoạn này theo kiểu lazy. Nếu không có bất kỳ phân tách mã nào, một gói duy nhất có thể rất lớn:
```
 - bundle.js (10MB!)
```

Sử dụng phân tách mã sẽ giúp yêu cầu mạng ban đầu cho gói nhỏ hơn đáng kể:

```
- bundle-1.js (5MB)
- bundle-2.js (3MB)
- bundle-3.js (2MB)
```

Yêu cầu mạng ban đầu sẽ chỉ cần tải xuống 5 MB, và nó có thể bắt đầu hiển thị một cái gì đó thú vị cho end-user. Hãy tưởng tượng một trang web blog khi load đầu tiên chỉ cần tiêu đề và phần footer. Sau khi đã tải, nó sẽ bắt đầu yêu cầu bundle thứ 2 chứa các bài post trên blog. Đây chỉ là một ví dụ thô sơ trong đó việc phân tách mã sẽ có ích. 👏👏👏
# Tránh việc thường xuyên Mounting/Unmounting
Đa số chúng ta thường sử dụng một biến điều kiện khi muốn component được hiển thị hay biến mất
```
import React, { Component } from 'react';
import DropdownItems from './DropdownItems';

class Dropdown extends Component {
  state = {
    isOpen: false
  }
  render() {
    <a onClick={this.toggleDropdown}>
      Our Products
      {
        this.state.isOpen
          ? <DropdownItems>
          : null
      }
    </a>
  }
  toggleDropdown = () => {
    this.setState({isOpen: !this.state.isOpen})
  }
}
```

Vì `<DropdownItems>` bị xóa khỏi DOM, nó sẽ khiến trình duyệt cần repaint hoặc tái cấu trúc lại. Việc này có thể gây tốn kém, đặc biệt nếu nó làm cho các yếu tố HTML khác thay đổi xung quanh.

Để giảm thiểu điều này, bạn nên tránh việc unmouting component. Thay vào đó, bạn có thể sử dụng một số cách khác như như đặt opacity của CSS thành 0 hoặc visibility CSS thành "none". Điều này sẽ giữ component trong DOM, đồng thời làm cho nó biến mất một cách hiệu quả mà không phải chịu bất kỳ chi phí hiệu năng nào.

Trên đây là mình đã giới thiệu 5 tip để có thể cải thiện hiệu năng cho các ứng dụng React, hi vọng các bạn sẽ áp dụng chúng một cách hiệu quả khi làm dự án thực tế.

Cảm ơn các bạn đã theo dõi bài viết. 

Nguồn: https://alligator.io/react/keep-react-fast