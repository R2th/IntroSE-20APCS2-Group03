Viết code sạch và dễ đọc là một trong các yếu tố tiên quyết đảm bảo chất lượng code. Dễ dàng hơn nhiều so với việc test và đảm bảo performance. Vì thế không có lý do gì cho việc bỏ thêm một ít thời gian để refactor code dễ đọc hơn, clean hơn.

Sau đây là một vài best practices để cải thiện code React tốt hơn. Đó là:

- Tận dụng `event.target.name` khi xử lý event 
- Tránh sử dụng bind this thủ công
- Sử dụng React hooks để cập nhật state
- Cache các hành động phức tạp và tốn thời gian với useMemo 
- Tách các hàm thành `functional function` để cải thiện chất lượng code 
- Tạo các hook tùy biến để tái sử dụng logic 

## Sử dụng name của event 

Khi bạn có một form với một trường input, bạn chỉ cần viết 1 hàm onFirstInputChange để xử lý nội dung của trường đấy 

Tuy nhiên, nếu liệu bạn có cần viết 10 hàm event handler khi bạn có 1 form với 10 trường input, thật sự bạn không nên làm vậy. Bạn có thể sử dụng thuộc tính name của trường input để truy cập đến input trong event handler. Giá trị này cho phép chúng ta chỉ cần sử dụng một handler input cho các sự kiện onChange.

Vd như bạn có một form với 2 input field, và bạn định nghĩa hàm xử lý sự kiện onChange cho mỗi form input. Như vậy sẽ làm cho code bị lặp rất nhiều và dẫn đến khó khăn trong việc maintain.

```
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item1: "",
            item2: "",
            items: "",
            errorMsg: ""
        };
        this.onFirstInputChange = this.onFirstInputChange.bind(this);
        this.onSecondInputChange = this.onSecondInputChange.bind(this);
    }
    onFirstInputChange(event) {
        const value = event.target.value;
        this.setState({
            item1: value
        });
    }
    onSecondInputChange(event) {
        const value = event.target.value;
        this.setState({
            item2: value
        });
    }
    render() {
        return (
            <div>
                <div className="input-section">
                    {this.state.errorMsg && (
                        <p className="error-msg">{this.state.errorMsg}</p>
                    )}
                    <input
                        type="text"
                        name="item1"
                        placeholder="Enter text"
                        value={this.state.item1}
                        onChange={this.onFirstInputChange}
                    />
                    <input
                        type="text"
                        name="item2"
                        placeholder="Enter more text"
                        value={this.state.item2}
                        onChange={this.onSecondInputChange}
                    />
                </div>
            </div>
      );
    }
}
```

Trong trường hợp này, chúng ta có thể truy cập giá trị này thông qua thuộc tính `event.target.name`. Chúng ta có thể tạo một hàm duy nhất và có thể xử lý các sự kiện đấy. Do đó, ta không còn cần onFirstInputChange và onSecondInputChange

```
onInputChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  this.setState({
    [name]: value
  });
};
```

Dĩ nhiên, là với các trường hợp cần validate data phức tạp hơn, chúng ta có thể dùng switch để thêm các điều kiện validate tùy biến.

Thông qua đây, ý tưởng đặt là nên nhóm các đoạn code có điểm chung với nhau, tuân thủ theo nguyên tắc DRY 

## Tránh sử dụng bind this thủ công 

Chúng ta đều biết là React không giữ lại `this` khi gắn một logic xử lý sự kiện vào sự kiện onClick hay onChange. Do đó, chúng ta cần bind this thủ công. Tạo sao cần bind `this`? Đấy là vì khi trong hàm xử lý sự kiện, chúng ta cần giữ lại context, hay đối tượng mà cần thao tác khi chúng ta truyền handler như một callback.

VD: chúng ta thực hiện bind handleClick trong contructor.

```
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.props.setState({ clicked: true });
  }
  
  render() {
    return <button onClick={this.handleClick}>Click me!</button>;
  );
}
```

Để refactor trong trường hợp này, chúng ta chỉ cần sử dụng arrow function, như vậy sẽ không cần phải bind hàm handler với this trong constructor 

```
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }
  
  // arrow function 
  handleClick = () => this.setState({clicked: true });
  render() {
    return <button onClick={this.handleClick}>Click me!</button>;
  );
}
```

Thật đơn giản, chúng ta sẽ không cần phải lo lắng về bind function trong constructor 

## Sử dụng React hook để cập nhật state 

Kể từ phiên bản React 16.8.0, chúng ta có thể sử dụng state và các hàm vòng đời (lifecycle) trong các functional component thông qua sử dụng React Hooks. Nhờ vậy, chúng ta có thể viết code dễ đọc hơn, và dễ bảo trì hơn.

Vd, với useState hook, nếu bạn bận tâm nó là gì, tạo sao nên sử dụng nó, thì có thể tìm hiểu trong tài liệu của React 

```
What is a Hook? A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components.

When would I use a Hook? If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component.
```

Tạm dich là

```
Hook là gì? Hook là một hàm đặc biết, cho phép bạn `móc` vào các điểm đặc trưng của React. VD, useState là một Hook cho phép bạn thêm state của React vào function components.

Khi nào tôi nên sử dụng một Hook? Nếu bạn dùng một function component và nhận thấy cần sử dụng state, thì trước kia, bạn cần phải chuyển đổi nó thành class. Nhưng với sự xuất hiện của Hook, thì bạn có thể sử dụng nó ngay trong các function component.
```

VD, trước kia ta dùng setState 

```
this.setState({
    errorMsg: "",
    items: [item1, item2]
});
```

Bây giờ, ta chỉ cần dùng useState. Đầu tiên là cần import hook này từ thư viện react. Định nghĩa một state mới và truyền vào một giá trị mặc định.  

```
import React, { useState } from "react";

const App = () => {
  const [items, setIems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
};

export default App;
```

Và giờ đây, ta có thể dễ dùng sử dụng các state items và errorMsg 

```
import React, { useState } from "react";

const App = () => {
  const [items, setIems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <form>
        <button onClick={() => setItems(["item A", "item B"])}>
          Set items
        </button>
    </form>
  );
};

export default App;
```

Rất đơn giản và clear

## Cache các hành động nặng với useMemo

Memoization ( ghi nhớ ) là một kỹ thuật tối ưu bằng các lưu lại các kết quả của các hoạt động nặng, nghĩa là tốn thời gian xử lý, tốn bộ nhớ. Và tất nhiên, chúng ta đều không muốn thực hiện các hàm nặng nề đó trong mỗi lần render trang.

Do đó, chúng ta có thể sử dụng hook `useMemo` để ghi nhớ lại kết quả khi bạn truyền các tham số giống nhau vào các hàm đã được ghi nhớ. Hook `useMemo` chấp nhận một hàm và giá trị tham số input để ghi nhớ. React cung cấp nó trong một mảng phụ thuộc. Mọi giá trị được tham chiếu trong hàm cũng nên xuất hiện trong mảng phụ thuộc này, để việc ghi nhớ chuẩn xác hơn. 

VD, chúng ta truyền vào 2 tham số a và b vào một hàm nặng. Và khi đấy, mạng phụ thuộc của useMemo hook chứa a và b.

```
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Kỹ thuật này là một trong những kỹ thuật hiệu quả nhất khi cần tối ưu hiêu năng trang web.

## Tách thành các pure function để cải thiện chất lượng code 

Đây là một best practice phổ thông nhất, bạn nên chia nhỏ các hàm mà không phụ thuộc vào component. Nghĩa là, một hàm không phụ thuộc vào bất cứ state hoặc React hook.

VD, hàm sắp xếp là một ví dụ tuyệt vời cho việc tách thành hàm pure function.

Bạn có thể thắc mặc là tại sao bạn nên áp dụng tư tưởng lập trình hàm ở đây?

Đầu tiên, với định nghĩa lập trình hàm ( function programming ):

```
Functional programming is the process of building software by composing pure functions, avoiding shared state, mutable data, and side-effects. Pure function are better readable and easier to test. Therefore, they improve code quality.
```

Tạm dịch là 

```
Lập trình hàm là phần mềm được xây dựng bằng cách tổng hợp các pure function, tránh việc chia sẻ state, dữ liệu có thể thay đổi và side effect. Pure function giúp code dễ đọc hơn và dễ test hơn. Do đó, giúp tăng chất lượng code. 
```

Bây giờ, trong bối cảnh của React component, thì đó là một hàm có thể đặt ở trong cả một React component hay đặt ở bên ngoài. Và khi không tương tác với state, chúng ta có thể đặt các pure function vào một file riêng và import vào các file khác nhau khi cần thiết.

```
function ascSort (a, b) {
  return a < b ? -1 : (b > a ? 1 : 0);
}

function descSort (a, b) {
  return b < a ? -1 : (a > b ? 1 : 0);
}
```

## Tạo các hàm hook tùy biến 

Chúng ta đã xem cách dùng useState và use Memo trong React hook. Và dĩ nhiên, React cũng cho phép chúng ta tự định nghĩa các hàm React hook để tách logic và tạo các component dễ đọc.

Chúng ta có thể định nghĩa các React hook tùy biến với keyword `use`, giống như các React hook có sẵn. Lợi ích của việc tạo các custom hook là khi bạn muốn chia sẻ logic giữa các hàm khác nhau. Thay vì phải copy các hàm, chúng ta có thể định nghĩa logic như một React hook và tái sử dụng trong các hàm khác.

Đây là VD của một React component mà giúp cập nhật state khi kích thước màn hình giảm xuống dưới 600 pixels. Nếu xảy ra, giá trị isScreenSmall được để là true, không thì là false. Chúng ta dùng sự kiện resize trong window object để xác định kích thước màn hình thay đổi.

```
const LayoutComponent = () => {
  const [onSmallScreen, setOnSmallScreen] = useState(false);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
  }, []);

  let checkScreenSize = () => {
    setOnSmallScreen(window.innerWidth < 768);
  };

  return (
    <div className={`${onSmallScreen ? "small" : "large"}`}>
      <h1>Hello World!</h1>
    </div>
  );
};
```

Bây giờ, chúng ta muốn sử dụng cùng logic đấy trong component khác mà phụ thuộc vào biến isScreenSmall. Thay vì việc copy code, thì chỉ cần chuyển đổi thành custom React hook 

```
import { useState, useEffect } from "react";

const useSize = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(false);

  let checkScreenSize = () => {
    setIsScreenSmall(window.innerWidth < 600);
  };
  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isScreenSmall;
};

export default useSize;
```


Chúng ta có thể tạo một custom React hook bằng cách đóng gói logic trong một hàm use. VD, chúng ta đặt tên custom React hook đó là `useSize`. Bây giờ, chúng ta chỉ cần import useSize hook ở bất cứ đâu dùng nó.

Và giờ, component đã trở nên clean hơn 

```
import React from 'react'
import useSize from './useSize.js'

const LayoutComponent = () => {
  const onSmallScreen = useSize();

  return (
    <div className={`${onSmallScreen ? "small" : "large"}`}>
      <h1>Hello World!</h1>
    </div>
  );
}
```

Trên đây là một vài cách để giúp chúng ta viết code dễ đọc hơn và tái sử dụng tốt hơn, nhờ vậy chất lượng code được cải thiện hơn.