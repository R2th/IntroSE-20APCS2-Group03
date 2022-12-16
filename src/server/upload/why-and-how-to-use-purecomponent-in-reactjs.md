Bài viết được dịch từ nguồn: https://60devs.com/pure-component-in-react.html

## Why and How to Use PureComponent in React.js

React 15.3 đã được phát hành vào ngày 29 tháng 6 năm 2016 và phần đầu tiên được công bố là sự hỗ trợ cho React.PureComponent, thay thế cho người tiền nhiệm của nó là pure-render-mixin. Trong bài viết này, chúng ta sẽ thảo luận tại sao thành phần này lại quan trọng và chúng ta có thể sử dụng nó ở đâu.

React.PureComponent là một trong những cách quan trọng nhất để tối ưu hóa các ứng dụng React dễ thực hiện và nhanh chóng. Việc sử dụng React.PureComponent cho một sự gia tăng đáng kể về hiệu suất vì nó làm giảm số hoạt động kết xuất trong ứng dụng.


![](https://images.viblo.asia/177b2f38-2a01-4028-bcf9-4dd95c9579c2.gif)

PureComponent thay đổi phương pháp vòng đời nênComponentUpdate và thêm một số logic để tự động kiểm tra xem có cần tái render cho thành phần hay không. Điều này cho phép một PureComponent gọi phương thức render chỉ khi nó phát hiện các thay đổi trong `state` hoặc các `props`, do đó, người ta có thể thay đổi trạng thái trong nhiều thành phần mà không cần phải viết thêm các kiểm tra như:

```
if (this.state.someVal !== computedVal) {
  this.setState({ someVal: computedVal })
}
```

Trong mã nguồn của React, trong trường hợp khi một thành phần là một "Pure", thì việc so sánh sau đây được thực hiện:

```
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || ! shallowEqual(inst.state, nextState);
}
```

Việc sử dụng phương thức shallowEqual cho chúng ta biết rằng chỉ có một kiểm tra `props` và `state` sẽ được thực hiện, điều đó có nghĩa là các đối tượng và mảng lồng nhau sâu sắc sẽ không được so sánh.

So sánh sâu là một hoạt động rất tốn kém và nếu một PureComponent sử dụng nó, nó sẽ làm hại nhiều hơn lợi. Ngoài ra, bạn có thể sử dụng phương thức đã được chứng minh là shouldComponentUpdate để tự xác định sự cần thiết của việc tái xuất hiện mới. Tùy chọn đơn giản nhất là so sánh trực tiếp các tham số:

```
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.user.id === props.user.id;
}
```

Ngoài ra, bạn có thể sử dụng các thuộc tính bất biến. So sánh trong trường hợp này trở nên rất đơn giản, bởi vì các biến có sẵn không được thay đổi và biến mới luôn được tạo. Các thư viện như Immutable.js là đồng minh trung thành của chúng ta trong trường hợp này.

## The usage

PureComponent tiết kiệm thời gian cho chúng tôi và giúp chúng tôi tránh viết mã dư thừa. Điều quan trọng là phải hiểu đúng cách để sử dụng nó, nếu không thì tính hữu ích của nó sẽ bị hủy. Vì PureComponent so sánh nông, các thay đổi bên trong các `props` hoặc `state` sẽ bị bỏ qua. Ví dụ: hãy xem xét một tình huống trong đó thành phần gốc có phương thức hiển thị và trình xử lý nhấp chuột:

```
handleClick() {
  let {items} = this.state

  items.push('new-item')
  this.setState({ items })
}

render() {
  return (
    <div>
      <button onClick={::this.handleClick} />
      <ItemList items={this.state.items} />
    </div>
  )
}
```

Nếu ItemList là một PureComponent, nó sẽ không tái xuất hiện vì this.state.items vẫn trỏ đến cùng một đối tượng, mặc dù với nội dung mới bên trong. Tuy nhiên, trường hợp này có thể dễ dàng được sửa chữa bằng cách xóa các đột biến, ví dụ:

```
handleClick() {
  this.setState(prevState => ({
    words: prevState.items.concat(['new-item'])
  }));
}
```

Một PureComponent sẽ luôn luôn trả lại nếu trạng thái hoặc đạo cụ tham chiếu một đối tượng mới. Điều này ngụ ý rằng nếu chúng ta không muốn mất các lợi ích của PureComponent, chúng ta nên tránh các cấu trúc như vậy:

```
<Entity values={this.props.values || []}/>
```

Mảng mới, mặc dù nó có sản phẩm nào, sẽ luôn luôn buộc các thành phần để tái render. Để tránh vấn đề này, bạn có thể sử dụng defaultProps, có chứa `state` rỗng ban đầu của một thuộc tính. Một cách khác để giải quyết vấn đề là sử dụng mã như sau:

```
<CustomInput onChange={e => this.props.update(e.target.value)} />
```

Trong quá trình tạo thành phần này, một thể hiện mới của hàm được tạo ra, do đó PureComponent lấy dữ liệu mới và kích hoạt lại kết xuất. Cách đơn giản nhất để khắc phục điều này, là sử dụng liên kết trong hàm tạo của thành phần.

```
constructor(props) {
    super(props)
    this.update = this.update.bind(this)
}
update(e) {
    this.props.update(e.target.value)
}
render() {
    return <MyInput onChange={this.update} />
}
```

Ngoài ra, bất kỳ thành phần nào có chứa các phần tử con được tạo trong JSX, sẽ luôn trả về false cho các kiểm tra nông.

Điều quan trọng cần nhớ là PureComponent bỏ qua hoạt động tái kết xuất không chỉ cho thành phần, mà còn cho tất cả các thành phần của nó, vì vậy trường hợp sử dụng tốt nhất cho PureComponent là các thành phần trình bày không có thành phần con và không phụ thuộc vào `global state` ứng dụng.

## Conclusions

Trong thực tế, việc chuyển đổi sang PureComponent khá đơn giản, nếu bạn nhận thức được những đặc thù của JS. Thông thường, việc di chuyển đơn giản như thay đổi lớp cơ sở từ:

```
class MyComponent extends Component {...}

```

to

```
class MyComponent extends PureComponent {...}

```

Việc triển khai ban đầu tiếp tục hoạt động trơn tru và thậm chí với hiệu suất tăng lên. Vì vậy, tôi chắc chắn khuyên tất cả mọi người nên dùng thử và sử dụng nó trong các ứng dụng.

## Caution

Khi một thành phần thuần túy có con, tất cả các thành phần con phụ thuộc vào một sự thay đổi trong this.context sẽ không tái xuất hiện khi bối cảnh được thay đổi, trừ khi cha mẹ PureComponent khai báo contextTypes.

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.