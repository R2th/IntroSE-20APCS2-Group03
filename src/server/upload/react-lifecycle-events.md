Trong phần này,  chúng ta sẽ tìm hiểu về các sự kiện Vòng đời React và cách bạn có thể sử dụng chúng.

Trong suốt vòng đời của một component, có một loạt các sự kiện được gọi và với mỗi sự kiện bạn có thể nối và cung cấp chức năng tùy chỉnh.

Trước tiên, có 3 giai đoạn trong vòng đời thành phần React cần tìm hiểu:
* Mounting
* Updating
* Unmounting

### Mounting
Trong mounting, có 4 phương thức lifecycle trước khi component được ghi ra DOM:
1. Constructor
2.  getDerivedStateFromProps
3.  render
4.  componentDidMount.

**Constructor**

- Là phương thức đầu tiên được gọi khi bắt đầu ghi một componet ra DOM.
- Có thể bạn đã quen với việc sử dụng constructor để khởi tạo một state sử dụng `this.state = ...` mà chưa từng đặt ra câu hỏi vì sao đúng không.


**getDerivedStateFromProps**

   - Khi state được khởi tạo từ props, getDerivedStateFromProps có thể được sử dụng để cập nhật lại state dựa trên giá trị của props.
   - Nó đã được thêm vào trong React 16.3, nhằm mục đích thay thế phương thức không dùng thành phần WillReceiveProps.
   - Trong phương thức này, bạn có quyền truy cập vào`this` vì nó là static method.
   - Nó cũng là một pure function, vì vậy nó không gây ra tác dụng phụ và sẽ trả về cùng một đầu ra khi được gọi nhiều lần với cùng một đầu vào.
   - Trả về một đối tượng có các phần tử được cập nhật của trạng thái (hoặc null nếu trạng thái không thay đổi)

**Render()**

- Từ phương thức render (), bạn trả về JSX xây dựng giao diện thành phần.
- Nó là một pure function, vì vậy nó không gây ra tác dụng phụ và sẽ trả về cùng một đầu ra khi được gọi nhiều lần với cùng một đầu vào.

**componentDidMount()**

- Phương thức này là phương thức mà bạn sẽ sử dụng để thực hiện các lệnh gọi API hoặc xử lý các thao tác trên DOM.

### Updating

Khi updating có 5 phương thức lifecycle trước khi component được ghi ra DOM: 
1. getDerivedStateFromProps
2. shouldComponentUpdate
3.  render
4.  getSnapshotBeforeUpdate and componentDidUpdate.

**getDerivedStateFromProps()**
Tương tự đã được giải thích trên phần Mounting

**shouldComponentUpdate()**

Phương thức này trả về một boolean, đúng hoặc sai. Bạn sử dụng phương pháp này để báo cho React biết nếu nó tiếp tục với việc đăng ký lại và mặc định là đúng. Bạn sẽ trả lại sai khi đăng ký lại trở nên khó khăn và bạn muốn kiểm soát nhiều hơn khi điều này xảy ra.

**render()**
Tương tự đã được giải thích trên phần Mounting

**getSnapshotBeforeUpdate()**

- Tại đây,bạn có thể truy cập vào props và state của lần render trước và render hiện tại.
- Các trường hợp sử dụng của nó rất thích hợp, và nó có lẽ là trường hợp mà bạn sẽ sử dụng ít hơn.

**componentDidUpdate()**

- Phương thức này được gọi khi thành phần đã được cập nhật trong DOM. Sử dụng điều này để chạy bất kỳ API DOM của bên thứ 3 hoặc gọi API nào phải được cập nhật khi DOM thay đổi.

Nó tương ứng với phương thức componentDidMount () từ giai đoạn Mounting.

### Unmounting

- Trong giai đoạn này, chúng ta chỉ có một phương thức, componentWillUnmount.

**componentWillUnmount()**

- Phương thức được gọi khi thành phần được xóa khỏi DOM. Sử dụng điều này để làm bất kỳ loại dọn dẹp nào bạn cần thực hiện.

**Chú ý**
> Nếu bạnđang làm việc trong một ứng dụng người dùng đang sử dụng componentWillMount, componentWillReceiveProps or componentWillUpdate, chúng đã không còn được sử dụng kể từ phiên bản React 16.3 và bạn nên chuyển sang các phương pháp vòng đời khác. Goodluck ;)


### References
https://flaviocopes.com/react-lifecycle-events/