## Props

Viết tắt của các thuộc tính, props tốt nhất có thể được định nghĩa là một cách truyền data từ component này sang component khác, về cơ bản từ component cha sang component con. Tôi nghĩ rằng lời giải thích đơn giản nhất về cách thức hoạt động của props là bản demo này. tham khảo [tài liệu React](https://reactjs.org/docs/components-and-props.html):

{@codepen: https://codepen.io/oBuiThiHuyen/pen/OYxqaZ}

Trong bản demo ở trên, bạn có thể thấy dòng <BasicProp name="Jake"/>  tạo ra một thuộc tính  ***name***  có giá trị là ***Jake*** Props và Components tương tự như đối số và chức năng. Viết lại điều này như là một hàm lấy một đối số cho chúng ta:
```
function BasicProp(props) {
    return <h1>Hello {props.name}</h1>
  }
```

Vì vậy, chúng ta tạo ra một thành phần chấp nhận thuộc tính ***name***  và sau đó trong code của chúng ta, chúng ta gọi thành phần đó bằng cách chuyển thuộc tính ***name***. Nó có một quan niệm chung rằng props luôn được truyền từ cha sang con nhưng điều này có thể không phải luôn luôn như vậy. Sử dụng value config getDefaultProps, các component cũng có thể có các props mặc định, vì vậy ngay cả khi một props được truyền qua từ một component chính, nó vẫn có thể được đặt trong component mà nó yêu cầu. Xem bản demo CodePen dưới đây:

{@codepen: https://codepen.io/oBuiThiHuyen/pen/WBZWBQ}

Trong bản demo ở trên, các props mặc định được đặt trên ***this.props*** nếu không có prop nào được gửi vào component. Nếu chúng ta loại bỏ prop ***car*** khỏi function render trong component Garage của AutoList, nó sẽ trở lại ***car*** mặc định của *Mercedes Benz GLE 43*. Lưu ý rằng ***getDefaultProps*** được chạy trước khi bất kỳ trường hợp nào được tạo do đó sử dụng ***this.props*** bên trong ***getDefaultProps*** sẽ không hoạt động.

Một đặc điểm khác biệt của props là chúng không thay đổi. Trước đây, bạn có thể thay đổi props với ***setProps*** và ***replaceProps*** nhưng chúng không được dùng nữa. Triết lý của React là props không nên thay đổi, các thành phần cha có thể gửi giá trị prop cho các thành phần con nhưng con không thể sửa đổi props của chính nó. Các thành phần chỉ sử dụng props sẽ luôn render cùng một output khi được cung cấp cùng một đầu vào và điều này giúp chúng dễ kiểm tra hơn. 

***Tóm lại:*** 

* Props chủ yếu được sử dụng để truyền dữ liệu từ component này sang component khác.
* getDefaultProps được gọi một lần và lưu vào bộ đệm khi component được tạo.
* Props là không thay đổi và chỉ nên được gửi từ cha đến component con.


## State

Nếu props giữ dữ liệu không thay đổi và được render bởi các component, thì state lưu trữ dữ liệu về component có thể thay đổi theo thời gian. Thay đổi có thể đến dưới dạng sự kiện người dùng hoặc sự kiện hệ thống, chẳng hạn như phản hồi yêu cầu của người dùng hoặc máy chủ. Làm việc với một state’s component, thông thường bao gồm thiết lập state mặc định component, truy cập state hiện tại và cập nhật state. Tôi nghĩ rằng cách thích hợp nhất để giải thích state trong React sẽ là bản demo của counter. Trong quá trình tạo counter hiển thị giá trị đếm hiện tại mỗi lần click vào button, một lớp component tự chứa được tạo. Hãy cùng xem thử bản demo:

{@codepen: https://codepen.io/oBuiThiHuyen/pen/qGPzbB}

Điều đầu tiên chúng ta phải làm là khởi tạo dữ liệu state trước khi có thể sử dụng nó trong ***render()*** . Để set state ban đầu, chúng ta sử dụng ***this.state*** trong hàm tạo với cú pháp ***React.Component*** của chúng ta. Nếu bạn có được logic từ component cha, hãy nhớ gọi phương thức ***super ()*** bằng các ***props***:

```
  class Counter extends React.Component {
    constructor(props) {
      super(props)
      this.state = { ...
      }
    }
    render() { ...
    }
  }
```

Khi thiết lập state ban đầu, chúng ta cũng có thể thêm logic, một ví dụ điển hình là giá trị ban đầu của ***count*** trong app của chúng ta:

```
  class Counter extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0
      }
    }
    render() { ...
    }
  }
```

Nói chung, phương thức ***constructor ()*** được gọi khi một lớp component được tạo. Hầu hết khi một ***constructor()*** được gọi, phương thức ***super ()*** được gọi bên trong nó. Giá trị của ***this.state*** phải là một object.

Để cập nhật state, chúng ta sử dụng phương thức ***this.setState(data, callback).*** Khi phương thức này được gọi, React hợp nhất ***data*** với các states hiện tại và gọi ***render ().*** Sau đó, React gọi callback.

Có callback trong ***setState ()*** rất quan trọng vì các phương thức hoạt động không đồng bộ. Bạn có thể sử dụng callback để đảm bảo state mới khả dụng trước khi sử dụng. Nếu bạn dựa vào state mới mà không đợi ***setState ()*** hoàn thành công việc của nó, bạn sẽ làm việc đồng bộ với các hoạt động không đồng bộ và điều đó có nghĩa là bạn có thể gặp lỗi khi state vẫn ở state cũ.

Giá trị của ***this*** thay đổi tùy thuộc vào nơi một hàm được gọi từ đâu. Bối cảnh liên quan đến thành phần của chúng ta bị ràng buộc với ***this*** để đảm bảo rằng ***this*** đồng bộ với component.

```
 class Counter extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        count: 0
      }
    }
    increment() {
      this.setState({
        count: this.state.count += 1
      })
    }
    decrement() {
      this.setState({
        count: this.state.count -= 1
      })
    }
    render() { ...
    }
  }
```

Một cảnh báo về ***setState ()***

Theo thời gian, ý tưởng có thể đến với những thứ đầu vào như thế này ***this.state.count = this.state.count + 1***, đừng làm điều đó. Lý do là React không thể lắng nghe state được cập nhật theo cách này để component của bạn sẽ không re-render. Hãy chắc chắn luôn luôn sử dụng ***setState()***


## Sự khác biệt giữa Props và State

Với rất nhiều lý thuyết về sự khác biệt giữa các Props và State, giờ ta tiến hành làm nổi bật sự khác biệt giữa các Props và State:

| PROPS | STATE | 
| -------- | -------- | 
| Props được sử dụng để truyền dữ liệu đến các component con     | State được sử dụng để xác định hình dạng của dữ liệu cả ban đầu và khi tương tác của người dùng.     | 
| Props thường được truyền lại từ các component cha     | State được tạo trong component, nó lấy dữ liệu ban đầu trong phương thức constructor ()    | 
| Props là thay đổi cho các component nhận được chúng. Bạn không thay đổi props được truyền cho một component từ bên trong component    | State có thể thay đổi, React sử dụng phương thức setState () để cập nhật object của state. State chỉ có thể bị thay đổi bởi component có chứa state. Nó là riêng tư theo nghĩa này.     | 


## Kết luận

Mặc dù chúng làm những việc tương tự, Props và State được sử dụng khác nhau. Khi xây dựng một ứng dụng, hầu hết các component của bạn có thể sẽ không state. Props truyền dữ liệu từ cha đến các component con.  Chúng là không thay đổi và do đó sẽ không được thay đổi. State ** xử lý dữ liệu sẽ thay đổi. Điều này đặc biệt hữu ích cho dữ liệu riêng tư như đầu vào của người dùng. Một nghiên cứu trường hợp tốt là một hình thức đăng ký mà người dùng sẽ nhập dữ liệu và state giúp cập nhật những gì họ nhìn thấy.

Tài liệu tham khảo: https://reactjs.org/docs/components-and-props.html