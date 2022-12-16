Trong quá trình làm việc với React, khi phải đưa ra một lựa chọn giữa Hooks, render props và higher-order-components (HOCs), mình luôn lựa chọn Hooks bất cứ khi nào nó khả dụng.
```
// #ví dụ 1 - best
const MyComponent = () => {
  const mousePosition = useMouse();

  // mousePosition.x, mousePosition.y
}

// #ví dụ 2 - not as good
const MyComponent = () => {
  return (
    <Mouse>
      {({ x, y }) => {
        // ...
      }}
    </Mouse>
  )
}

// #ví dụ 3 - bad
const MyComponent = ({ x, y }) => {
  // ...
}

export default withMouse(MyComponent);
```

Tại sao mình lại đưa ra lựa chọn như vậy? Chúng ta sẽ bắt đầu với HOCs.

# Tại sao HOCs lại là lựa chọn tồi:
Mình sẽ đưa ra 2 lý do như sau:
1. **Nó lấy cố định một tên prop, điều này có thể dẫn đến việc các props khác sẽ bị loại bỏ**. Hãy tưởng tượng ví dụ trên # 3, chúng ta muốn truyền một prop x và y trên component:

```
<MyComponent x="some value" y="some other value" />
```

Cả hai giá trị này sẽ bị ghi đè bằng các giá trị đến từ HOCs. Vấn đề này cũng có thể phát sinh khi bạn muốn sử dụng nhiều HOCS trong code:

```
export default withMouse(withPage(MyComponent)); // Nếu withMouse và withPage đặt cùng props, sẽ xảy ra sự cố xung đột ở đây
```

2. **Nó không chỉ ra rõ ràng nguồn gốc xuất xứ của các props**
*withMouse(MyComponent)* không chỉ ra chính xác cho bạn props nào được lấy từ component nào (nếu có), vì thế việc debug và fix code sẽ tốn nhiều thời gian hơn.

# Tiếp tục với Render Props
Tương tự như HOCs render props cũng có những vấn đề của riêng nó.

1. **Nó không cho phép bạn sử dụng data của nó ở bên ngoài *return*.** Với ví dụ trên, bạn sẽ không thể sử dụng x và y ở bất kỳ biến state, useEffect trong hooks hay bất cứ function nào trong component của bạn, bởi vì nó chỉ có thể truy cập đựơc trong *return*.

2. **Nó bị lồng rất nhanh**. Hãy tưởng tượng chúng ta có 3 component props cần render nằm trong component ban đầu:

```
const MyComponent = () => {
  return (
    <Mouse>
      {({ x, y }) => (
        <Page>
          {({ x: pageX, y: pageY }) => (
            <Connection>
              {({ api }) => {
                // yikes
              }}
            </Connection>
          )}
        </Page>
      )}
    </Mouse>
  )
};
```

Và bây giờ hãy đến với hooks và tìm hiểu xem sao nó lại là sự lựa chọn tốt nhất
# **Hooks giải quyết các vấn đề trên như thế nào**

1. **Hooks không có bất kỳ props fix cứng nào** bạn có thể đổi tên bất cứ khi nào và thành bất cứ cái gì bạn muốn

```
const { x, y } = useMouse();
const { x: pageX, y: pageY } = usePage();
```

2. **Hooks sẽ chỉ ra ngọn nguồn gốc gác cho bạn**
Trong ví dụ trên, nó thật rõ ràng để biết x và y đến từ *useMouse* và *pageX*, *pageY* đến từ *usePage*.

3. **Hooks cho phép bạn truy cập vào data từ bên ngoài *return***
Để rõ ràng hãy xem ví dụ sau:
```
const { x: pageX, y: pageY } = usePage();

useEffect(() => {
  // this runs whenever pageX or pageY changes
}, [pageX, pageY]);
```

4. **Hooks không gặp phải vấn đề về nested**
Đoạn render rối rắm lằng nhằng bên trên nếu đựoc viết lại bằng hook, nó sẽ trông giống như sau:
```
const { x, y } = useMouse();
const { x: pageX, y: pageY } = usePage();
const { api } = useConnection();
```

# Ngoài ra còn một số ưu điểm của Hooks
1. **Không còn wrapper hell**
Với hooks, chúng ta có thể tái sử dụng logic trong component mà ko cần tạo ra một HOCs hay sử dụng render props pattern.

Ví dụ bạn muốn tạo mộ logic counter, có thể tăng hoặc giảm. Bởi vì logic này có thể đc sử dụng ở nhiều component khác nhau, bạn muốn chúng có thể tái sử dụng đc. Đây là cách làm với HOCs:

```
import React from 'react';
import ReactDOM from 'react-dom';

const withCounter = Component => {
  return class ComponentWithCounter extends React.Component {
    state = {
      count: 0,
    };

    handleDecrement = () => {
      this.setState({ count: this.state.count - 1 });
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { count } = this.state;

      return (
        <Component {...this.prop} count={count} onIncrease={this.handleIncrement} onDecrease={this.handleDecrement} />
      );
    }
  };
};

const App = ({ count, onIncrease, onDecrease }) => {
  return (
    <div>
      <div>Current count: {count}</div>
      <div>
        <button onClick={onDecrease}>-</button>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
};

const AppWithCounter = withCounter(App);

ReactDOM.render(<AppWithCounter />, document.getElementById('root'));
```

Còn đây là khi bạn dùng hooks, không class, không wrapper chỉ là một component đơn giản với những logic bạn cần trong đó
```
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const useCounter = () => {
  const [count, setCount] = useState(0);

  const onIncrease = () => setCount(count + 1);
  const onDecrease = () => setCount(count - 1);

  return [ count, onIncrease, onDecrease ];
};

const App = () => {
  const [ count, onIncrease, onDecrease ] = useCounter();

  return (
    <div>
      <div>Current count: {count}</div>
      <div>
        <button onClick={onDecrease}>-</button>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

2. **Effect Hook**
Nói lời tạm biệt với *ComponentDidUpdate*, *ComponentDidMount*, với những đoạn code trùng lặp ở cả hai, hooks cung cấp cho bạn **useEffect** để handle những logic bạn cần sau mỗi lần render và có thể tùy chỉnh đối số để effect chỉ chạy khi mà đối số này thay đổi.

# Tuy nhiên có một số lưu ý nếu bạn muốn dùng Hooks
**Chỉ gọi Hook ở trên cùng**

Không gọi hook bên trong loop, câu điều kiện, hay các function lồng với nhau. Thay vì đó, luôn sử dụng Hook ở phần trên cùng của function. Với cách này, bạn đảm bảo các Hook được gọi theo đúng thứ tự trong các lần render. Nó cho phép React có được đúng state giữa nhiều lần gọi useState và useEffect.

**Chỉ gọi Hook từ React Function**

Không gọi Hook từ function JavaScript. Thay vì đó, bạn có thể:
 - Gọi Hook từ React function components.
 - Gọi Hook từ custom Hook (Chúng ta sẽ học ở trang sau).
 
 Hi vọng những chia sẻ trên đây sẽ cung cấp cho các bạn cái nhìn khái quát về hooks, nếu có gì thắc mắc các bạn hãy comment bên dưới nhé.