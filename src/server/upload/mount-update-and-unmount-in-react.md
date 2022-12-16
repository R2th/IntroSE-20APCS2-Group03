Mỗi thành phần React đi kèm với một số phương thức cho phép các nhà phát triển cập nhật trạng thái ứng dụng và phản ánh sự thay đổi thành UI. Có ba giai đoạn chính của một thành phần bao gồm Mount , Update và Unmount.

## 1. Mounting
Các phương thức sẽ được gọi khi một instance của thành phần React được tạo và gắn vào DOM.
### constructor()
Phương thức này được gọi trước khi một thành phần React được `mount`. Để gọi được `super(props)` trước bất kỳ statement trong các constructor đều bắt buộc phải có phương thức này. Vì nó sẽ cho phép chúng ta gọi hàm constructor của lớp cha và tự khởi tạo trong trường hợp lớp của chúng ta mở rộng bất kỳ lớp nào khác có chính nó. Nếu không, `this.props` sẽ không xác định được thành phần có `props` hay không.

Constructor dùng để khởi tạo trạng thái hoặc liên kết các trình xử lý sự kiện với thể hiện của lớp rất tốt.

Ví dụ

```js
constructor(props) {
    super(props);
    this.state = {
      count: 0,
      value: 'Hey There!',
    };
    this.handleClick = this.handleClick.bind(this);
};
```
KHÔNG làm bất kỳ phát sinh thêm nào trong hàm constructor.

### componentWillMount() / UNSAFE_componentWillMount()

`componentWillMount` sẽ được gọi một lần trước khi component được mount và nó sẽ chạy trước function `render`. Hàm này đã được sử dụng để tìm nạp dữ liệu từ điểm cuối theo thứ tự để truy xuất dữ liệu render ban đầu của nhiều nhà phát triển. Tuy nhiên, đây không phải là trường hợp vì không có gì đảm bảo rằng request sẽ được hoàn thành trước khi function `render` được gọi.

Theo trang phản ứng chính thức, không nên thực hiện bất kỳ side-effect hoặc subscriptions nào trong chức năng này. Thay vào đó, thực hiện tại  `componentDidMount`

Ngoài ra, `setState` sẽ vô dụng vì nó sẽ không kích hoạt bất kỳ render lại nào.

Lưu ý : Chức năng này đã không được chấp nhận và sẽ được thay đổi thành `UNSAFE_componentWillMount` từ phiên bản 17.

### static getDerivedStateFromProps(nextProps, prevState)

Chức năng này được gọi khi thành phần được mount cũng như nhận `props` mới cho dù chúng có bị thay đổi hay không. Nó cũng được gọi nếu thành phần cha được render lại, vì vậy nếu bạn chỉ muốn cập nhật thay đổi giá trị, phải có sự so sánh giá trị mới và trước đó.

Hàm này sẽ trả về một đối tượng để cập nhật trạng thái hoặc null vì hàm static sẽ không có bất kỳ xác nhận nào tới `this`. Nếu state của component được khởi tạo từ các `props` nhận được từ component cha. Chức năng này là nơi thích hợp để đồng bộ hóa props và state. Để làm như vậy, khi bạn cần cập nhật state, hãy nhớ trả về đối tượng chứa thuộc tính cần cập nhật.

```js
static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      console.log('props changed. Return an object to change state');
      return {
        value: nextProps.value,
      }
    }
```
### componentDidMount()
Sau khi một component được mount, phương thức này sẽ được gọi. Đây là nơi thích hợp để tải bất kỳ dữ liệu nào từ điểm cuối hoặc thiết lập bất kỳ subscription nào.

Gọi `setState` ở đây sẽ kích hoạt render lại, vì vậy phải cẩn thận khi dùng nó nhé
## 2.Updating

### componentWillReceiveProps(nextProps)/UNSAFE_componentWillReceiveProps(nextProps)

Hàm này sẽ được gọi:

* Khi thành phần nhận `props` mới cho dù `props` có thay đổi hay không. Nếu bạn muốn thiết lập trạng thái mới dựa trên `props`, hãy nhớ so sánh giá trị, khá giống với `getDerivedStateFromProps `
```js
componentWillReceiveProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      console.log('props changed. Return an object to change state');
      return {
        value: nextProps.value,
      }
    }
```
* Khi thành phần cha được kết xuất lại.

Gọi `this.setState` sẽ không kích hoạt bất kỳ render nào và nó sẽ không được gọi trong kết xuất ban đầu. Không nên sử dụng phương pháp này, thay vào đó hãy sử dụng `getDerivedStateFromProps`

**Lưu ý** : Chức năng này đã không được chấp thuận và sẽ được thay đổi thành `UNSAFE_componentWillReceiveProps` từ phiên bản 17.

### static getDerivedStateFromProps(nextProps, nextState)
Hàm này sẽ được gọi khi:

* Các thành phần được khởi tạo.
* Nhận `props` mới cho dù chúng có thay đổi hay không.
* Thành phần cha được render lại.

**Lưu ý: khi chức năng này được triển khai, có khả năng các componentWill*chức năng sẽ không được gọi.**

### shouldComponentUpdate (nextProps, nextState)

Phương pháp này sẽ được gọi trước khi render khi nhận được `props` hoặc `state` mới. Theo mặc định, khi có thay đổi state hoặc props, các thành phần sẽ được render lại. Khi bạn không muốn các thành phần có nhiều render vô dụng, thì phương pháp này là nơi tuyệt vời để xác minh tất cả các thay đổi bạn cần trước khi render lại. Nếu bạn không muốn render lại các thành phần, hãy trả lại `false` , nếu không nó sẽ quay trở lại `true`.

**Lưu ý **: Khi chức năng này trở lại `false` , `UNSAFE_componentWillUpdate` , `render` và `componentDidUpdate` sẽ không được gọi.

### componentWillUpdate(nextProps, nextState) / UNSAFE_componentWillUpdate(nextProps, nextState)

Hàm này sẽ được gọi trước mỗi khi render nhận `props` hoặc `state` mới. Điều này có thể được sử dụng để thực hiện một số chuẩn bị trước khi cập nhật xảy ra.

Hàm này sẽ không được gọi trong render ban đầu. Nếu bạn muốn cập nhật `state` dựa trên thay đổi `props`, hãy xem xét `getdeviredStateFromProps` .

Bạn không thể gọi `setState` trong chức năng này.

**Lưu ý** : Chức năng này đã không được chấp nhận và sẽ được thay đổi thành `UNSAFE_componentWillUpdate` từ phiên bản 17.

### getSnapshotBeforeUpdate()

Phương thức này được gọi ngay trước khi `virtual DOM` sắp thực hiện thay đổi đối với `DOM`, cho phép các thành phần của chúng ta nắm bắt các giá trị hiện tại. Đây là một chu kỳ mới đã được thêm vào kể từ React 16.3 và trả về một giá trị. Mọi giá trị được trả về sẽ được chuyển qua như một tham số thứ ba `componentDidUpdate`.

### componentDidUpdate(prevProps, prevState, snapshot)
Phương pháp này sẽ được gọi sau mỗi lần render. Vì phương pháp này chỉ được gọi một lần sau khi cập nhật, đây là nơi thích hợp để thực hiện bất kỳ hoạt động hiệu ứng phụ nào. Tuy nhiên, đừng quên thực hiện so sánh giữa các `props` trước đây và hiện tại.

```js
componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.count !== prevState.count) {
      // state has change!! Do some side effect as you wish
    }
  }
```
## 3. Unmounting
### componentWillUnmount()
Khi một thành phần không được `unmounted` hoặc `destroyed`, phương thức này sẽ được gọi. Đây là một nơi để clean lại:

* Bộ hẹn giờ vô hiệu hóa
* Hủy bỏ bất kỳ yêu cầu mạng
* Xóa trình xử lý sự kiện
* Xóa mọi đăng ký

Gọi `setState` ở đây là vô ích vì sẽ không có render lại trên component.

### componentDidCatch(error, info)

Kể từ React 16, một vòng đời mới đã được giới thiệu để ghi lại lỗi chưa được xử lý xảy ra trong các thành phần con. Điều này sẽ cho phép xử lý thành phần cha để hiển thị giao diện người dùng dự phòng khi cần thay vì làm hỏng thành phần.

```js
componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
     //custom fallback UI
      return <div>Something went wrong.</div>;
    }
    return this.props.children; //render children 
  }
```
Để xem vòng đời hoạt động như thế nào, bạn có thể xem ví dụ [này](https://codepen.io/Dragonza/pen/OZdoqK) nhé:
***
Cóp nhặt từ https://code.likeagirl.io/understanding-react-component-life-cycle-49bf4b8674de =)