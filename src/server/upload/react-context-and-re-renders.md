# `React Context and Re-Renders`

`React Context Provider` sẽ thay đổi tất cả các `Consumers` re-render mỗi khi giá trị `value` của `Provider` thay đổi.

![](https://images.viblo.asia/62675c47-c26f-4c2d-ad15-73db4731e456.png)

### Problem
```js
// first render
<Provider value={1}>
// next render
<Provider value={2}>
// all consumers will re-render
<Consumer>{value => (/*...*/)}</Consumer>
```
Điều này là hoàn toàn chính xác, mỗi khi giá trị `value` thay đổi thì các component đang sử dụng đến nó nên được biết và cập nhật render ngay khi có thể. Tuy nhiên nhiều khi có những trường hợp mà rõ ràng giá trị `value` của `Provider` không thực sự thay đổi mà chỉ do `reference` `value` của Provider vô tình bị xử lý không đúng đắn làm chúng hiểu nhầm rằng các `Consumer` nên được update theo.

```js
class App extends React.Component {
  render() {
    return (
      <Provider value={{ something: 'something' }}>
        <Toolbar />
      </Provider>
    )
  }
}
```

Mỗi khi App được re-render, something sẽ được khởi tạo thành một object mới và `Provider value` sẽ so sánh reference cũ và reference mới, rõ ràng là khác nhau. `Provider` do đó sẽ ngay lập tức thông báo tới các `Consumer` biết về điều này và re-render lại View.

### Solution

Có 2 cách để cải thiện tính hình này
1. Handle mutation yourself 🤡
1. Let React do it 😎

Do một bài viết có độ dài có hạn, mình không thể truyền tải hết được, mình sẽ chỉ nói về cách thực hiện dễ dàng hơn với tất cả là thực hiện các 2.
Thay vì set giá trị ngay tại render method, mình nên khởi tạo giá trị ấy trước sau đó mới trỏ vào biến đó.
```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: { something: 'something '},
    }
  }

  render() {
    return (
      <Provider value={ this.state.value }>
        <Toolbar />
      </Provider>
    )
  }
}
```
Như vậy kể cả khi App re-render, giá trị state kia không bị tạo lại nên `Provider` sẽ không thông báo update khi không cần thiết! Và đừng quên sử dụng PureComponent vô cùng hữu dụng nữa.

### References
1. https://reactjs.org/docs/context.html
2. https://medium.com/@ryanflorence/react-context-and-re-renders-react-take-the-wheel-cd1d20663647