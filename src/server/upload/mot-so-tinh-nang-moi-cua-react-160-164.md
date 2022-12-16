Bài viết đc dịch từ: https://hackernoon.com/react-16-0-16-3-new-features-for-every-day-use-f397da374acf

Đây là một bài viết ngắn dành cho các dev muốn migrate từ React 15 lên React 16, hoặc từ những version 16.x đầu đến 16.3. Mình sẽ tập trung viết về những tính năng mà mọi người sẽ dùng nhiều.

### Return nhiều element từ một component với fragment

Việc chia nhỏ UI thành nhiều component con có thể tái sử dụng đc dẫn đến việc sinh ra nhiều DOM element ko cần thiết, ví dụ như khi bạn muốn trả về nhiều element từ một component. React 16 có vài lựa chọn để tránh điều đó:

```js
// React 15: phải bọc vào một element chung là ul
const Breakfast = () => (
  <ul>
    <li>Coffee</li>
    <li>Croissant</li>
    <li>Marmalade</li>
  </ul>
);

// React 16.0: có thể trả về dạng mảng như này (chú ý là cần có key)
const Breakfast = () => [
  <li key="coffee">Coffee</li>,
  <li key="croissant">Croissant</li>,
  <li key="marmalade">Marmalade</li>
];

// React 16.2: có thể dùng Fragment như này
const Breakfast = () => (
  <React.Fragment>
    <li>Coffee</li>
    <li>Croissant</li>
    <li>Marmalade</li>
  </React.Fragment>
);

// React 16.2: cách viết tắt của Fragment
const Breakfast = () => (
  <>
    <li>Coffee</li>
    <li>Croissant</li>
    <li>Marmalade</li>
  </>
);

// React 16: Khi kết hợp các cách trên, có thể có một cấu trúc DOM đẹp như sau:
const Meals = (
  <ul>
    <Breakfast />
    <Lunch />
    <Dinner />
  </ul>
);
```

Lưu ý là cách viết tắt Fragment như ở trên có thể sẽ ko đc support bởi vài tool mà bạn đang dùng. Tham khảo thêm: https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html#support-for-fragment-syntax

### Trả về string hoặc số từ component

Trong React 16, component có thể trả về string hoặc số. Điều này rất là hữu dụng đối với các component mà ko cần có markup, ví dụ như i18n hay format:

```js
// React 15
const LocalDate = ({ date }) => (
  <span>
    {date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })}
  </span>
);

// React 16
const LocalDate = ({ date }) =>
  date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
```

### Hủy setState để tránh việc render lại

Ở React 15, bạn ko thể hủy đc setState và tránh việc phải render lại. Ở React 16, bạn có thể hủy bằng cách return null ở callback của hàm setState:

```js
// React 16
handleChange = event => {
  const city = event.target.value;
  this.setState(
    prevState => (prevState.city !== city ? { city } : null)
  );
};
```

Ở ví dụ này, việc gọi hàm handleChange() với thành phố giống như trong state thì sẽ ko gây ra việc render lại lãng phí.

### Update state dựa trên props với getDerivedStateFromProps

getDerivedStateFromProps() là một hàm lifecycle thay thế cho componentWillReceiveProps(). Nó hữu dụng khi mà bạn có một prop với giá trị default cho một state, nhưng bạn muốn reset lại state khi mà prop đó thay đổi. Ví dụ, một modal có một prop rằng giá trị ban đầu là open, và một state cho trạng thái nó có đang open hay ko:

```js
// React 15
class Modal extends React.Component {
  state = {
    isOpen: this.props.isOpen
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({
        isOpen: nextProps.isOpen
      });
    }
  }
}

// React 16.3
class Modal extends React.Component {
  state = {};
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen !== prevState.isOpen) {
      return {
        isOpen: nextProps.isOpen
      };
    }
  }
}
```

Hàm getDerivedStateFromProps() đc gọi khi component đc khởi tạo và khi nó nhận prop mới, do vậy bạn ko cần phải đổi prop thành state 2 lần (khi khởi tạo và trong componentWillReceiveProps()).

### Một số tính năng mới khác

React 16.x có rất nhiều các tính năng hữu dụng khác như:
*  [error boundaries](https://reactjs.org/docs/error-boundaries.html)
*  [portals](https://reactjs.org/docs/portals.html)
*  [forwarding refs (16.3)](https://reactjs.org/docs/forwarding-refs.html)
*  [context API mới (16.3)](https://reactjs.org/docs/context.html)
*  [hàm lifecycle mới getSnapshotBeforeUpdate() (16.3)](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)
*  [pointer events (16.4)](https://reactjs.org/blog/2018/05/23/react-v-16-4.html#pointer-events)