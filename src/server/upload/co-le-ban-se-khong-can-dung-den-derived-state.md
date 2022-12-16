> Chắc hẳn mọi người khi làm việc với React đều quan tâm tới các phương thức lifecycle của một component để tối ưu hoá và để triển khai logic một cách tối ưu nhất. Gần đây mình có đọc được một  bài viết về cách sử dụng phương thức `componentWillReceiveProps` hay giống với phương thức `getDerivedStateFromProps` ở phiên bản React mới khá hay. Vậy nên mình quyết định viết bài viết này để chia sẻ một chút về cách sử dụng chúng :D

<br/>

Phương thức `componentWillReceiveProps` từng là cách duy nhất để cập nhật state khi thay đổi props mà không cần phải render thêm. Từ bản 16.3, phương thức `getDerivedStateFromProps` được thay thế đẻ làm việc này. Hiện tại, mình thấy có nhiều bạn chưa nắm rõ về hai phương thức này, và phương thức này gây ra một số bugs khá khó và phức tạp. 

# Trong bài viết này mình sẽ đề cập đến các vấn đề sau:
* Khi nào nên sử dụng derived state
* Một số bug thường gặp khi sử dụng derived state:
1. Sao chép props sang state vô điều kiện
2. Xoá bỏ state khi props thay đổi
* Đề xuất giải pháp
* Một chút về memoization

## I. Khi nào nên sử dụng derived state:
`getDerivedStateFromProps` tồn tại vì một lý do duy nhất. Nó cho phép 1 component cập nhật internal state khi việc thay đổi props diễn ra. Có một vài ví dụ điển hình như ghi nhớ “hướng scroll" dựa trên offset props hoặc load dữ liệu ngoài dựa trên props đc set. 

<br/>

Có một nguyên tắc chung là: hạn chế sử dụng derived state. Tất cả các vấn đề với derived state mà chúng ta đã gặp phải có thể được hạn chế tối đa bằng cách sử dụng “cập nhật state bằng props vô điều kiện” hoặc cập nhật state khi props và state không khớp với nhau.
* Nếu bạn sử dụng derived state để ghi nhớ một số phép toán chỉ dựa trên props hiện tại, hãy dùng memoization.
* Nếu bạn cập nhật derived state một cách vô điều kiện và cập nhât nó bất kể khi props và state không khớp thì component của bạn reset state của nó qúa thường xuyên. 

## II. Một số bugs thường gặp khi sử dụng derived state:
Dữ liệu được truyền vào như là props có thể được gọi là dữ liệu “kiểm soát” được (vì component cha kiếm soát luồng dữ liệu đó). Dữ liệu mà chỉ tồn tại duy nhất trong internal state có thể được gọi là “không kiểm soát" (vì component cha không thể trực tiếp thay đổi nó).

<br/>

Lỗi thường gặp nhất với derived state là kết hợp cả hai điều trên; khi gía trị của  derived state cũng được cập nhật khi gọi `setState`, điều này khiến nó không còn được gọi là nguồn dữ liệu đáng tin duy nhất của dữ liệu. Ví dụ khi load dữ loại từ bên ngoài được  đề cập ở trên nghe có vẻ khá giống trường hợp này, nhưng nó khác nhau ở một số điểm quan trọng. Nghĩa là có một nguồn đáng tin duy nhất cho cả nguồn của props và trạng thái đang tải của state. Khi nguồn của prop thay đổi, trạng thái đang tải bị ghi đè lên. Ngược lại, state bị ghi đè chỉ khi props thay đổi và được quản lý bởi component.

<br/>

Vấn đề xảy ra khi có bất kỳ ràng buộc nào trong số này bị thay đổi. Có 2 kiểu thường gặp:

### 1. Ghi chép props vào state vô điều kiện:
`getDerivedStateFromProps` và  `componentWillReceiveProps`  được gọi bất kỳ khi nào component cha được render lại. Vì lí do này, sẽ không an toàn nếu ghi đè state bằng cách sử dụng các phương thức này. Điều này có thể dẫn đến các cập nhật của state bị mất.

<br/>

Hãy xem xét trường hợp sau, một component EmailInput *“tương phản"* cho một prop email trong state:

```javascript
    
class EmailInput extends Component {
  state = { email: this.props.email };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  componentWillReceiveProps(nextProps) {
    // This will erase any local state updates!
    // Do not do this.
    this.setState({ email: nextProps.email });
  }
}
```

Thoạt nhìn, component này trong có vẻ ổn. State được khởi tạo với giá trị được chỉ định bởi props và được cập nhật khi chúng ta gõ vào <input>. Nhưng nếu component cha của component này render lại, tất cả nhưng gì chúng ta gõ vào <input> đều bị mất! Điều nãy vẫn xảy ra nếu chúng ta so sánh `nextProps.email !== this.state.email` trước khi cập nhật lại.

<br/>

Trong ví dụ đơn giản bên trên, thêm `shouldComponentUpdate` để render lại chỉ khi email prop có sự thay đổi có thể fix lỗi này. Tuy nhiên, các component thường xuyên nhận nhiều props; một prop thay đổi vẫn có thể khiến việc render lại component xảy ra không đúng logic. Các props function và object thường được create theo kiểu inline, khiến đièu này rất khó thực hiện đúng `shouldComponentUpdate` để nó trả về true một cách đúng nhât. Kết quả là `shouldComponentUpdate` được dùng tốt nhất để cải thiện performance chứ không phải để đảm bảo sự chính xác của derived state.

<br/>

Mình mong rằng các bạn giờ đã hiểu tại sao lại là một cách tệ nếu ghi chép props vào state một cách vô điều kiện. Trước khi đi vào cách giải quyết cho vấn đề này, hãy xem xét một vấn đề liên quan: nếu chúng ta chỉ cập nhật state khi email prop thay đổi.

<br/>

### 2. Xoá state khi props thay đổi:
Tiếp tục ví dụ bên trên, chúng ta cũng có thể tránh việc xoá bỏ state một cách vô ý bằng cách chỉ cập nhật nó khi props email thay đổi:
```javascript 
class EmailInput extends Component {
  state = {
    email: this.props.email
  };

  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.email !== this.props.email) {
      this.setState({
        email: nextProps.email
      });
    }
  }
}
```
Chúng ta vừa cải thiện đáng kể bằng phương pháp trên. Bây giờ component sẽ xoá những gì chúng ta gõ chỉ khi props thay đổi.

<br/>

Nhưng vẫn có bug, hãy tưởng tượng khi chúng ta sử dụng component trên cho pasword. Khi di chuyễn giữa mục chi tiết cho 2 tài khoản với cùng một email, input sẽ cập nhật thất bại. Bởi vì giá trị của prop được truyền vào component sẽ giống hệt cho cả 2 tài khoản! Điều này sẽ khiến người dùng bị rơi vào cảnh hiều nhầm khi có một số thay đổi chưa được save vào một tài khoản lại ảnh hưởng tới các tài khoản khác với cùng một email.

<br/>

Cách thiết kế này về cơ bản không đúng, nhưng nó rất dễ gặp phải. Khá may mắn là có hai cách để thay thế tốt hơn. Điểm mấu chốt của cả hai cách này là đối với bất kỳ dữ liệu nào, bạn nên chọn một component tách biệt mà phụ thuộc vào duy nhất một dữ liệu để tránh việc trùng lặp nó trong các component khác. Hãy cùng xem cách giải quyết sau.

<br/>

## III. Các giải pháp được đề xuất:
### 1. Component được kiểm soát hoàn toàn:
Có một cách để tránh các vấn dề được đề cập bên trên là loại bỏ state hoàn toàn khỏi components của chúng ta. Nếu địa chỉ email chỉ tồn tại như một prop, chúng ta ko cần phải lo về việc xung đột với state. Chúng ta còn có thể chuyển EmailInput thành một component như sau:

```javascript
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```

### 2. Component hoàn toàn không được kiểm soát bằng cách sử dụng key:
Một phương pháp khác, trong trường hợp này component vẫn nhận giá trị khởi tạo nhưng sẽ bỏ qua các thay đổi prop sau đó:

```javascript
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}
```

Để reset giá trị khi di chuyển đến item khác (giống như trường hợp password trên), chúng ta có thể sử dụng một thuộc tính đặc biệt của React được gọi là key. Khi key thay đổi, React sẽ tạo một component instance mới thay vì update component hiện tại. Các key thường được dùng cho các dynamic list. Trong trường hợp này, chúng ta có thể sử dụng user ID để tạo lại email input bất kỳ khi nào một user mới được chọn:
```javascript
<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
``` 

Mỗi khi ID thay đổi, EmailInput sẽ được tạo lại và state của nó sẽ được reset lại bằng giá trị mặc định, Với phương pháp này, bạn không cần thêm key cho mỗi input, thay vào đó chỉ cần thêm key vào form. Mỗi khi key thay đổi, tất cả các component bên trong form đều được tạo lại với giá trị mặc định.

<br/>

# Tổng kết:
Mình tóm tắt lại một chút, khi thiết kế một component, hãy quyết định xem luồng dữ liệu có nên được “kiểm soát" hay “không kiểm soát".

<br/>

Thay vì ghi chép giá trị của prop vào state, hãy làm component “kiếm soát" và củng cố hai giá trị của state trong component cha. Ví dụ, thay vì để component con nhận giá trị từ props làm giá trị state mặc định, hãy để component cha kiểm soát cả hai giá trị đó trong state và kiểm soát giá trị cho component con một cách trực tiếp. Điều này khiến cho luồng dữ liệu minh bạch và dễ dàng kiểm soát hơn.

<br/>

Đối với các component “không kiểm soát", nếu bạn muốn reset state khi có một prop nào đó thay đổi, hãy sử dụng một số giải pháp sau:
* Để reset toàn bộ state, hãy sử dụng key.
* Sử dụng một prop đặc thù để quan sát việc thay đổi cho các trường nhất định (vd: user id)
* Sử dụng instance method cùng với refs.

Bài viết này của mình tới đây cũng khá dài rồi, phần tiếp theo mình sẽ viết tiếp về hai phương pháp sử dụng refs và memoization.
Cảm ơn các bạn đã theo dõi bài viết :D