Optimization là điều quan tâm hàng đầu của mọi nhà phát triển khi xây dựng bất kỳ phần mềm nào, đặc biệt là ứng dụng web. Các framework JS như Angular, React và các framework khác, đã bao gồm một số cấu hình và tính năng tuyệt vời. Tại đây, mình sẽ giới thiệu một số tip để giúp bạn tối ưu hóa hiệu suất ứng dụng.


### 1. useMemo (), useCallback()

Một function component giống như một hàm render() trong class component, là chức năng sẽ render lại khi state/props thay đổi.

Điều đó có nghĩa:

Nếu một function được gọi bên trong một component, nó sẽ được đánh giá lại, lặp đi lặp lại sau mỗi lần render.
Nếu một function được tạo bên trong một component và được xem như một component con, thì nó sẽ được tạo lại, điều đó con trỏ sẽ thay đổi, khiến những thành phần con render lại hoặc gọi lại những function không cần thiết.

Để giải quyết những sự cố về hiệu suất của app xảy ra. React cung cấp cho chúng ta 2 hook: useMemo và useCallback.

**useMemo** cũng giống như khái niệm **React memo,** nhưng có sự khác biệt rõ ràng. Nếu như React memo sinh ra với mục địch tránh việc rerender nhiều lần thì useMemo tránh cho việc tính toán lại một function lặp đi lặp lại nhiều lần mỗi lần component re-render. Bản chất useMemo là caching lại giá trị return của function, mỗi lần component rerender nó sẽ kiểm tra giá trị tham số truyền vào function nếu giá trị đó không thay đổi, thì return value đã caching trong memory. Ngược lại nếu giá trị tham số truyền vào thay đổi, nó sẽ thực hiện tính toán lại vào trả về value, sao đó caching lại value cho những lần rerender tiếp theo.

**useMemo** nhận vào 2 tham số: 1 là function trả về một lời gọi hàm (plusFive), 2 là một mảng phụ thuộc. Chỉ khi nào mảng phụ thuộc thay đổi, thì function mới được gọi. **useMemo** sẽ trả về kết quả của việc thực hiện gọi hàm và lưu vào bộ nhớ để ngăn hàm gọi lại khi sử dụng cùng một mảng phụ thuộc (hay mảng phụ thuộc không thay đổi).

Hãy xem một ví dụ:

```js
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function App() {
  const [time, setTime] = useState(new Date());

  const tick = () => {
    setTime(new Date());
  };

  const displayMinute = (minute) => {
    console.log("Display minute!");
    return <p> Minute: {minute} </p>;
  };

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  });

  return (
    <div style={{ padding: "15px" }}>
      <h1>Digital Clock</h1>
      <h2>
        {displayMinute(time.getMinutes())}
        {time.toLocaleTimeString()}
      </h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Bạn có thể xem code ở đây : https://codesandbox.io/s/usememo-forked-09yu4?file=/src/index.js:0-751

Ở trên mình hiển thị thời gian hiện tại mỗi khi time thay đổi thì mình update lại state rồi reder lại time hiện tại. 

Ở trên mình có dùng hàm `displayMinute` để hiện thị phút hiện tại. Ở đây mình không dùng userMemo xem chuyện gì xảy ra


![minute.gif](https://images.viblo.asia/1e0279fe-23b9-4975-ab69-78b2c9fbdba1.gif)


Ồ hàm `displayMinute` được gọi liên tục mỗi khi second thay đổi do state thay đổi. Nhưng mình chỉ muốn gọi hàm này mỗi khi minute thay đổi thì sao. Thử với `useMemo` nhé 


```js
import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

function App() {
  // State for our counter
  const [time, setTime] = useState(new Date());

  const tick = () => {
    setTime(new Date());
  };

  const displayMinute = (minute) => {
    console.log("Say hi!");
    return <p> Minute: {minute} </p>;
  };

  const displayM = useMemo(() => displayMinute(time.getMinutes()), [time.getMinutes()]);

  useEffect(() => {
    var timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  });

  return (
    <div style={{ padding: "15px" }}>
      <h1>Digital Clock</h1>
      <h2>
        {displayM}
        {time.toLocaleTimeString()}
      </h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

Code: https://codesandbox.io/s/usememo-forked-09yu4?file=/src/index.js:251-264


Do mình sử dụng useMemo nên hàm `displayMinute` chỉ được gọi mỗi khi phút thay đổi thay vì mỗi giây thay đổi như trước: 



![after.gif](https://images.viblo.asia/1681302d-f711-452c-9f53-7caf9d581d33.gif)


**useCallback** có nhiệm vụ tương tự như **useMemo** nhưng khác ở chỗ function truyền vào useMemo bắt buộc phải ở trong quá trình render trong khi đối với useCallback đó lại là function callback của 1 event nào đó như là onClick chẳng hạn. Ví dụ:

```js
const App = () => {
  const [text, setText] = React.useState('');

  return (
    <>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Wrap />
    </>
  );
};

const Wrap = () => {
  const [isChecked, setIsChecked] = React.useState(false);
  const toggleChecked = useCallback(() => setIsChecked(!isChecked), [
    isChecked
  ]);

  return <Checkbox value={isChecked} onClick={toggleChecked} />;
};

const Checkbox = React.memo(({ value, onClick }) => {
  console.log('Checkbox is renderd!');
  return (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      {value ? '☑' : '□'}
    </div>
  );
});
```

Trong ví dụ trên ta sử dụng useCallback cho sự kiện onClick, điều này có nghĩa là việc thay đổi giá trị text trong ô Input sẽ không làm component Checkbox bị re-render.

Như vậy bạn có thể tránh được re-render những hàm không cần thiết, perfomance được cải thiện đáng kể. 

### 2.  Virtualize long lists

Nếu bạn hiển thị danh sách dữ liệu lớn, bạn chỉ nên hiển thị một phần nhỏ của tập dữ liệu tại một thời điểm trong khung nhìn hiển thị của trình duyệt, sau đó dữ liệu tiếp theo được hiển thị khi danh sách được cuộn, điều này được gọi là "windowing" . Một số thư viện  được xây dựng cho việc này. Mình thấy thư viện oke đó là  [react-window](https://github.com/bvaughn/react-window) và [ react-virtualized](https://github.com/bvaughn/react-virtualized)


![Uploading virtual-list.gif…]()


Giả sử mình có một danh sách có vài nghìn bài post như FaceBook chẳng hạn nếu ta render một lúc hết luôn thì khá mất thời gian, thay vì load hết thì scroll đến đâu thì render đến đó ý tưởng khá oke phải không . Nghe yang hồ đồn thì dev bên này toàn tay to bên FB nên không lo đâu nha .


### 3. React.PureComponent

PureComponent chính xác giống như Component ngoại trừ việc đó là nó xử lý shouldComponentUpdate cho bạn.

Theo mặc định, một React.Component đơn giản có anh shouldComponentUpdate luôn luôn trả về đúng. Điều này cũng tốt thôi bởi vì điều đó có nghĩa là React sẽ luôn cập nhật component trong trường hợp có bất kỳ dữ liệu mới nào để hiển thị. Tuy nhiên, nó có thể dẫn đến một vài trường hợp render không cần thiết. Một trong những cách thiết thực nhất là tối ưu lại cái anh shouldComponentUpdate để anh ấy kiểm tra xem có cần render hay không.

Khi props hoặc state thay đổi, PureComponent sẽ làm một shallow comparison (so sánh nông) trên cả props và state. Component trên mặt khác sẽ không so sánh props và state của hiện tại với tương lai. Như vậy, component sẽ re-render bởi mặc định bất cứ khi nào shouldComponentUpdate gọi.


Ở đây nếu mình dùng Component  để kiểm soát việc render không cần thiết thì trong shouldComponentUpdate mình phải handle xem có nên trả ra true hay false .

```js
class ReactComponent extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            data: null
        }
        this.inputValue = null
    }
    handleClick = () => {
        this.setState({data: this.inputValue})
    }
    onChange = (evt) => {
        this.inputValue = evt.target.value
    }
    shouldComponentUpdate( nextProps,nextState) {
        if(nextState.data === this.state.data)
            return false
        return true
    }
    render() {
        l("rendering App")
        return (
            <div>
                {this.state.data}
                <input onChange={this.onChange} />
                <button onClick={this.handleClick}>Click Me </button>
            </div>
        )
    }
}

```

Viết bằng  React.PureComponent thì sao nhỉ 

```js
class ReactComponent extends React.PureComponent {
    constructor(props, context) {
        super(props, context)
        this.state = {
            data: null
        }
        this.inputValue = null
    }
    handleClick = () => {
        this.setState({data: this.inputValue})
    }
    onChange = (evt) => {
        this.inputValue = evt.target.value
    }
    render() {
        l("rendering App")
        return (
            <div>
                {this.state.data}
                <input onChange={this.onChange} />
                <button onClick={this.handleClick}>Click Me </button>
            </div>
        )
    }
}
```

sẽ không còn thấy hàm shouldComponentUpdate do ReactComponent extend React.PureComponent đã xử lý thay chúng ta việc này rồi


### 4. Using reselect selectors

Nếu bạn dùng redux để quản lý state chắc hẳn đã quen thuộc với Selector để get state rồi nhỉ 

Selector có thể hiểu là một đoạn logic được sử dụng để tính toán ra một giá trị nào đó từ các giá trị có sẵn, hoặc chỉ đơn giản là lấy một giá trị từ một giá trị có sẵn.

Chúng ta hoàn toàn có thể viết các selector của riêng mình để lấy hoặc tính toán một giá trị từ các giá trị trong store của redux để tái sử dụng chúng trong function.


```js
// *** selector dùng để lấy property 'users' từ store của redux
const getUsers = state => state.users;

// *** selector dùng để tính toán một giá trị dựa trên property 'users' của store
const getUserViaId = (state, id) => state.users.map(user => user.id === id);
```

Vì useSelector dùng phép so sánh === nên nếu hàm selector trả về mảng (dùng .map, .filter, destructuring ...), component sẽ bị trigger re-render.

Để ý, khi function dùng làm selector có thể có nhiều tính toán, transform phức tạp. Với mỗi lần re-render, sẽ tốn thời gian để thực thi hàm selector.



```js
const selectData = state => {
    const filteredData = expensiveFiltering(state.data);
    const sortedData = expensiveSorting(filteredData);
    const transformedData = expensiveTransformation(sortedData);
    return transformedData;
};
...
const data = useSelector(selectData);
```

Trong lúc re-render, dù cho data không thay đổi, hàm selectData vẫn được gọi.

Giải quyết bằng cách sử dụng thư viện [Reselect](https://github.com/reduxjs/reselect), nó sẽ cho phép trả về kết quả trước đó, nếu input là giống nhau.


```js
import React from 'react'
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';

const selectUsers = state => state.users;

const selectData = createSelector(
    state => state.data,
    data => {
        const filteredData = expensiveFiltering(data);
        const sortedData = expensiveSorting(filteredData);
        const transformedData = expensiveTransformation(sortedData);
        return transformedData;
    }
);

export const UsersCounter = () => {
    ...
    const data = useSelector(selectData);
    ...
}
```




**Kết** 

Đây là một số cách giúp cải thiện perfomance đáng kể mà mình tìm hiểu được. Nếu bạn có cách nào khác thì chia sẻ với mình nha.

Tài liệu tham khảo : https://blog.bitsrc.io/10-ways-to-optimize-your-react-apps-performance-e5e437c9abce