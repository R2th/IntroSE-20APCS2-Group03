Compnent state là cách lưu trữ, xử lý và sử dụng thông tin bên trong một Component nhất định và cho phép bạn thực hiện logic của nó. State thường là một POJO (Đối tượng Java [Script] thuần túy), và thay đổi nó là một trong số ít cách để tạo Component tự re-render lại.

Đây là một trong những ý tưởng cơ bản nhất đằng sau React, tuy nhiên nó có một số thuộc tính khiến nó khó sử dụng và có thể dẫn đến hành vi không mong muốn trong ứng dụng của bạn.
# 1. Cập nhật state
Nơi bạn có thể viết trực tiếp this.state phải là hàm constructor trong Component . Ở tất cả những nơi khác bạn nên sử dụng function this.setState, function này sẽ chấp nhận truyền vào một Object cuối cùng và sẽ được hợp nhất vào state của Component hiện tại.

Mặc dù về mặt kỹ thuật có thể thay đổi state bằng cách viết this.state trực tiếp, nhưng nó sẽ không dẫn đến việc re-rendering Component với dữ liệu mới và thường dẫn đến sự không nhất quán về trạng thái.
# 2. setState không đồng bộ(*)
Thực tế là setState gây ra sự hòa giải (quá trình re-rendering lại Component) là cơ sở của thuộc tính tiếp theo - setState không đồng bộ. Điều này cho phép chúng ta có nhiều lệnh gọi đến setState trong một phạm vi duy nhất và không kích hoạt khi không cần re-rendering toàn bộ Component.

Đây là lý do tại sao bạn không thấy các giá trị mới ở state ngay sau khi bạn cập nhật nó
```javascript
// assuming this.state = { value: 0 }
this.setState({
  value: 1
});
console.log(this.state.value); // 0
```
React cũng sẽ cố gắng nhóm hàng loạt các cuộc gọi setState thành một cuộc gọi duy nhất:
```javascript
// assuming this.state = { value: 0 };
this.setState({ value: this.state.value + 1});
this.setState({ value: this.state.value + 1});
this.setState({ value: this.state.value + 1});
```
Sau khi tất cả các cuộc gọi trên được xử lý, this.state.value sẽ là 1, không phải 3 như chúng ta mong đợi!
# 3. setState chấp nhận một hàm làm tham số của nó.
Nếu bạn truyền một hàm làm đối số đầu tiên của setState, React sẽ gọi hàm đó với trạng thái tại thời điểm cuộc gọi hiện tại và muốn bạn trả lại một Object để hợp nhất thành state. Vì vậy, cập nhật lại ví dụ ở trên:
```javascript
// giả sử this.state = {value: 0}; 
this .setState ((state) => ({value: state.value + 1})); 
this .setState ((state) => ({value: state.value + 1})); 
this .setState ((state) => ({value: state.value + 1}));
```
Kết quả sẽ cho chúng ta this.state.value = 3 như chúng ta mong muốn. Hãy nhớ luôn luôn sử dụng cú pháp này khi cập nhật state thành giá trị, được tính dựa trên state trước đó!
# 4.setState có đồng bộ không?
Hãy nhớ làm thế nào bạn vừa học được setState là không đồng bộ? Thực tế, không phải lúc nào cũng như vậy ! Nó phụ thuộc vào bối cảnh thực hiện, ví dụ:
```javascript
  render() {
    return <button onClick={this.inc}>Click to update</button>
  }
  
  inc() {
    console.log('before: ' + this.state.test);
    this.setState({
      test: this.state.test+1
    });
    console.log('after: ' + this.state.test);
  }
```
Click vào nút sẽ dẫn đến bảng điều khiển của bạn hiển thị:
```javascript
// click!
before: 1
after: 1
// click!
before: 2
after: 2
```
Nhưng nếu chúng ta thêm:
```javascript
componentDidMount() {
  setInterval(this.inc, 1000);
}
```
Chúng ta sẽ thấy:
```javascript
before: 1
after: 2

before: 2
after: 3
```
# 5.setState chấp nhận gọi lại
Nếu bạn cần thực thi một số chức năng hoặc xác minh xem state có thực sự cập nhật chính xác hay không, bạn có thể chuyển một hàm làm đối số thứ hai của setState, hàm sẽ được thực thi khi trạng thái được cập nhật. Hãy nhớ rằng vì tất cả các cập nhật trong một phạm vi được thực hiện theo đợt, nếu bạn có nhiều cuộc gọi đến setState, mỗi cuộc gọi lại của chúng sẽ được gọi với state được cập nhật đầy đủ.
Một cách khác để đảm bảo đoạn mã của bạn thực thi sau khi cập nhật xảy ra, chúng ta sẽ đặt nó vào componentWillUpdate hoặc componentDidUpdate.
# 6. Lỗi thông thường
Một trong những lỗi phổ biến nhất khi sử dụng Component state là đặt giá trị của nó dựa trên các props trong hàm tạo. Xem xét đoạn mã sau:
```javascript
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  
  render() {
    return <div>The value is: {this.state.value}</div>
  }
}
```
Nếu Component cha render ra nó là:
```javascript
<Component value={42} />
```
Nó sẽ hiển thị chính xác " giá trị là 42". Nhưng nếu sau đó Component parent thay đổi thành:
```javascript
<Component value={13} />
```
Nó vẫn sẽ nghĩ rằng this.state.value là 42 - mà bởi vì React sẽ không hủy đi Component và tạo lại nó - nó sẽ sử dụng lại Component được rerender lại một lần và sẽ không chạy lại hàm tạo. Để giải quyết vấn đề này, bạn không nên gán các props cho state thay vì sử dụng this.props.value trong phương thức render. Tuy nhiên, nếu bạn quyết định sử dụng state (ví dụ: vì giá trị từ props được sử dụng trong một tính toán rất phức tạp mà bạn không muốn chạy trên mỗi render), bạn nên thực hiện một giải pháp sẽ cập nhật state khi cần, ví dụ:
```javascript
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.value !== this.props.value) {
      this.setState({value: nextProps.value});
    }
  }
  render() {
    return <div>The value is: {this.state.value}</div>
  }
}
```
Hi vọng bài viết này sẽ giúp các bạn hiểu thêm về setState() trong ReactJs. Cảm ơn các bạn đã theo dõi. Trong bài viết có tham khảo tại https://medium.com/@baphemot/understanding-reactjs-setstate-a4640451865b.