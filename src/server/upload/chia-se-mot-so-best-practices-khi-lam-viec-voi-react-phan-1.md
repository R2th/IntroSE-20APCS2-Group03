# 1. Truyền Props dạng Function
Thông thường, chúng ta thường truyền function làm props cho component con dưới dạng inline function như sau
```
<TestRenderComponent onHandle={() => this.onHandle(this.state.param)} />
```
Nhưng có một nhược điểm lớn khi bạn sử dụng cách làm trên, đó là Props onHandle của TestRenderComponent sẽ luôn được làm mới mỗi khi component cha của nó Rerender, điều này dẫn đến việc Rerender không cần thiết ở chính TestRenderComponent, xem code ví dụ tại [đây](https://codepen.io/nvtcp9x/pen/deoWxg) (bạn có thể xem log để thấy component TestRenderComponent sẽ reRender mỗi khi bạn click vào button, mặc dù button đó chỉ thay đổi state khác không liên quan đến component này)
Chúng ta có 1 cách để khắc phục nhược điểm trên, đó là ta truyền thêm 1 prop param nữa để gọi method onHandle tại component con, cụ thể:
```
<TestRenderComponent param={this.state.param} onHandle={this.onHandle} />
```
Ngoài ra trong đa số trường hợp, param chúng ta cần truyền thường là id của một item trong 1 list item, vậy nên chúng ta có thể tách List component thành 2 phần như sau:
```
var List = React.createClass({
  render() {
    let { handleClick } = this.props;
    // handleClick still expects an id, but we don't need to worry
    // about that here. Just pass the function itself and ListItem
    // will call it with the id.
    return (
      <ul>
        {this.props.items.map(item =>
          <ListItem key={item.id} item={item} onItemClick={handleClick} />
        )}
      </ul>
    );
  }
});

var ListItem = React.createClass({
  render() {
    // Don't need a bind here, since it's just calling
    // our own click handler
    return (
      <li onClick={this.handleClick}>
        {this.props.item.name}
      </li>
    );
  },

  handleClick() {
    // Our click handler knows the item's id, so it
    // can just pass it along.
    this.props.onItemClick(this.props.item.id);
  }
});
```
Và như vậy chúng ta sẽ không cần truyền thêm id vào cho component ListItem nữa vì tại mỗi component ListItem đều có thể tự lấy được id của nó để truyền vào làm tham số cho hàm xử lý rồi.
# 2. Khai báo method trong Component
Chúng ta có 2 cách khai báo method trong Component, đó là:
Cách 1 (using an arrow function as a class property)
```
class MyClass {
   methodA = () => { ... }
}
```
Và cách 2
```
class MyClass {
   methodA () { ... }
}
```
Mặc dù 2 cách làm này đều sẽ cho ra output giống hệt nhau, tuy nhiên chúng lại khác nhau ở một số điểm. Ở cách 2, chúng ta sẽ cần thực hiện bind(this) tại constructor để có thể sử dụng this bên trong method (khi sử dụng class của ES6), còn cách 1 thì không. Vậy nên đa số chúng ta đều sẽ sử dụng cách 1, tuy nhiên đó không thực sự là cách tốt để áp dụng trong trường hợp chúng ta tạo ra 1 class có nhiều instance, ví dụ như 1 Item trong 1 list. Nguyên nhân là về việc sử dụng memory ở 2 cách này là khác nhau, chúng ta hãy cùng phân tích chi tiết về vấn đề này.
- Đối với [cách thứ nhất](https://cdn-images-1.medium.com/max/800/1*leLj2bFa6x_FBcevgdnQBw.png): Mỗi khi chúng ta tạo ra 1 instance của MyClass, các instance đó sẽ tạo ra một hàm handle mới, cùng với state mới và 1 tham chiếu đến method render của MyClass
- Trong khi đối với [cách thứ hai](https://cdn-images-1.medium.com/max/800/1*tx-jKwnNs-24oP70I3nD8A.png), mỗi khi chúng ta tạo ra 1 instance của MyClass, nó sẽ gọi tới handle method của base class. Từ đó chiếm dụng một lượng memory nhỏ hơn rất nhiều so với cách thứ nhất, performance cũng tốt hơn đáng kể. (Đọc thêm về so sánh chi tiết tại đây: https://medium.com/@charpeni/arrow-functions-in-class-properties-might-not-be-as-great-as-we-think-3b3551c440b1)
# 3. Hàm SetState
- Một chú ý khi sử dụng hàm setState mà người mới tiếp cận React thường chưa biết đó là hàm setState là hàm bất đồng bộ, vậy nên nếu bạn viết code như sau có thể gây ra bug logic:
```
state = {
   testState: 0
}
...
this.setState({ testState: 10 })
handleSomething(this.state.testState)
```
Bởi lẽ khi bạn truyền testState làm tham số cho hàm handleSomething thì testState chưa được cập nhật giá trị mới, cách xử lý đúng ở đây là bạn cần truyền hàm handleSomething làm callback cho hàm setState, cụ thể:
```
this.setState({ testState: 10 }, () => handleSomething(this.state.testState))
```
Khi đó, chỉ sau khi state testState đã được gán giá trị mới xong thì hàm handleSomthing mới được gọi tới.
- Điểm chú ý thứ hai khi sử dụng hàm setState đó là nó hoạt động theo cơ chế Batching, nghĩa là React sẽ thực hiện gom nhóm các câu lệnh setState và chỉ thực hiện một lần thay vì nhiều lần, vậy nên trong một số trường hợp đặc biệt mà 1 state có thể bị thay đổi nhiều lần liên tục, ta sẽ cần sử dụng đến một kỹ thuật là Functional setState để xử lý các trường hợp như vậy, có thể đọc chi tiết hơn về việc này tại bài viết [này](https://viblo.asia/p/functional-setstate-trong-react-moi-ma-khong-he-moi-p1-LzD5dOyOljY).
# 4. Sử dụng Pure Component
- Ta nên sử dụng Pure Component mỗi khi có thể, bởi Purecomponent đã được tự động implement method shouldComponentUpdate để tránh những render không cần thiết, từ đó tạo nên hiệu quả lớn về mặt performance của toàn app. (Bạn có thể đọc thêm về sự khác nhau giữa Pure Component, Component và Functional stateless component tại [đây](https://viblo.asia/p/so-sanh-giua-react-functional-stateless-component-component-va-pure-component-1VgZvNORZAw))
- Việc sử dụng PureComponent thay thế cho Component sẽ không gây ra lỗi nếu bạn tuân thủ nguyên tắc tối quan trọng đó là: Never MUTATE! Vì nếu bạn mutate các object trong component cha, các component con ở dạng "pure" sẽ không thể được update vì shallow equality được implement trong shouldComponentUpdate khi ấy sẽ không thể phát hiện ra sự thay đổi của chúng.
# 5. Memoize và Reselect 
(updating...)

Nội dung phần 2
- 6. Batching render with Redux
- 7. Use Render Props for sharing code between React components

# Tài liệu tham khảo
- https://daveceddia.com/avoid-bind-when-passing-props/
- https://medium.com/dailyjs/demystifying-memory-usage-using-es6-react-classes-d9d904bc4557
- https://medium.freecodecamp.org/functional-setstate-is-the-future-of-react-374f30401b6b
- https://medium.freecodecamp.org/understanding-memoize-in-javascript-51d07d19430e