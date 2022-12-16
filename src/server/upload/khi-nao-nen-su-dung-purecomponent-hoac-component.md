PureComponent tiền đề của nó là một phiên bản có hiệu suất cao hơn của Component. Điều này là đúng, nhưng hiệu suất đạt được đi cùng với một vài thứ đi kèm. Chúng ta hãy tìm hiểu về PureComponent và hiểu tại sao chúng ta nên sử dụng nó nhé.

## Component và PureComponent có một sự khác biệt

```
PureComponent chính xác giống như Component ngoại trừ việc đó là nó xử lý shouldComponentUpdate cho bạn.
```
Khi props hoặc state thay đổi, PureComponent sẽ làm một *shallow comparison* (so sánh nông) trên cảm props và state. Component trên mặt khác sẽ không so sánh props và state của hiện tại với tương lai. Như vậy, component sẽ re-render bởi mặc định bất cứ khi nào shouldComponentUpdate gọi.

## Shallow Comparison 101

Khi so sánh props và state trước và sau, một *shallow comparison* sẽ kiểm tra những giá trị nguyên thuỷ đó có cùng giá trị(ví dụ 1 bằng 1 hoặc *true* bằng với *true*) và rằng các *references value* là giống nhau giữa các giá trị javascript phức tạp như objects và arrays.

## Never MUTATE

Bạn có lẽ đã nghe không thay đổi objects và arrays trong props và state. Nếu bạn thay đổi object trong một component cha, component "pure" con của bạn sẽ không update. Mặc dù giá trị đã thay đổi ở component cha, component con sẽ so sánh *reference* tới props trước đó và không phát hiện ra sự khác biệt chúng vân cùng reference tới cùng một object.

Thay vào đó trả về một objects mới khi bạn làm một sự thay đổi bằng cách tận dụng es6 cho object và array *spreading* hoặc sử dụng một thư viện để thi hành *immutability*.

## Có vấn đề với hiệu năng không?

So sánh primitives và object references là một 
hoặt động  **vô cùng rẻ tiền**. Nếu bạn có một danh sách của object con và một trong đó update, làm một kiểm tra trên props và state của chúng là so sánh nhanh như ánh sáng so với chi phí của việc re-render từng cái một.

# Những cách khác bạn có thể làm để tăng hiệu năng

### Đừng bind giá trị vào fuction trong render

Bạn có một danh sách các items, mỗi lần chuyền một tham số độc nhất tới phương thức cha. Theo thứ tự bind parameter bạn có lẽ sẽ hoàn thành như thê này: 
```javascript
<CommentItem likeComment={() => this.likeComment(user.id)} />
``` 
vấn đề đó là mỗi lần component cha render method sẽ gọi, một function mới (với một reference mới) được tạo ra và chuyền xuống **LikeComnent**. Điều này có side effect của thay đổi props trên mỗi component con mà lần lượt sẽ là nguyên nhân tât cả chúng re-render, thậm chí tất cả dữ liệu là giống nhau.

Để giải quyết vấn đề này, chỉ cần chuyền function nguyên mẫu từ component cha tới con. prop của **LikeComent** sẽ luôn luôn có cùng reference và không bao giờ gây ra re-render không cần thiết.

```javascript
<CommentItem likeComment={this.likeComment} userID={user.id} />
```

Sau đó trong component con tạo ra một class method sẽ reference props của nó:

```javascript
class CommentItem extends PureComponent {
  ...
  handleLike() {
    this.props.likeComment(this.props.userID)
  }
  ...
}
```

### Đừng lấy dữ liệu trong render

Xem xét một danh sách của các bài viết từ đó component hồ sơ của bạn sẽ hiển thị 10 người dùng bạn thích nhất.

```javascript
render() {
  const { posts } = this.props
  const topTen = [...posts].sort((a, b) => 
    b.likes - a.likes).slice(0, 9)
  return //...
}
```

**TopTen** sẽ có một *new reference* mỗi lần component re-render, mặc dù **posts** không có sự thay đổi và dữ liệu có cùng nguồn gốc. Điều này sau đó sẽ re-render list một cách không cần thiết.

Bạn có thể giải quyết điều này bởi *caching* dữ liệu gốc. Cho ví dụ, đặt dữ liệu gốc trong state của component và update chỉ khi **posts** có updated.

```javascript
componentWillMount() {
  this.setTopTenPosts(this.props.posts)
}
componentWillReceiveProps(nextProps) {
  if (this.props.posts !== nextProps.posts) {
    this.setTopTenPosts(nextProps.posts)
  }
}
setTopTenPosts(posts) {
  this.setState({
    topTen: [...posts].sort((a, b) => b.likes - a.likes).slice(0, 9)
  })
}
```
Nếu bạn sử dụng Redux, xem xét sử dụng [reselect](https://github.com/reduxjs/reselect) để tạo "selectors" để soạn và cache dữ liệu gốc.


# Tổng kết

An toàn khi sử dụng pureComponent thay thế Component miễn là bạn theo hai quy tắc đơn giản sau:

1. Thây đổi đột ngột **reference value** nhìn chung là không tốt. Nhưng vấn đề là phức tạp khi sử dụng PureComponent.
2. Nếu bạn tạo ra một function, object, array mới trong render bạn (có lẽ) làm nó sai.

# Tham khảo
https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81