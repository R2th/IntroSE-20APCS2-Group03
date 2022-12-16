> Xem thêm về chuỗi bài viết về [**React.js - Những Câu Hỏi Phỏng Vấn Thường Gặp**](https://viblo.asia/s/reactjs-interview-pmleB8rD5rd).

## 1. React là gì?

React.js là một thư viện JavaScript mã nguồn mở được phát triền bởi Facebook vào năm 2011. Nó được xây dựng dựa trên nguyên lý **Component-based Approach**, để có thể dễ dàng tái sử dụng, nhất là đối với các **Single Page Application**

## 2. Những đặc trưng cơ bản của React?

   1. JSX
   2. Components
   3. One-way Data Binding
   4. Virtual DOM
   5. Simplicity
   6. Performance
 
### 2.1. JSX

JSX là viết tắt của **JavaScript XML**, nó là một cú pháp mở rộng của JavaScript, được React sử dụng. Cú pháp này được xử lý thành các lệnh gọi JavaScript của React, hỗ trợ cả ES6 để có thể cùng tồn tại với mã JavaScript. Chúng ta không bị bắt buộc sử dụng JSX, tuy nhiên, nó được khuyến khích sử dụng trong React

### 2.2. Components

Ứng dụng React.js được tạo nên từ nhiều thành phần (Components), mỗi thành phần có cấu trúc và cách thức xử lý riêng. Điều đặc biệt là các thành phần này có thể được "tái sử dụng" khi cần thiết. Điều này sẽ vô cùng hữu ích với những ứng dụng trung bình và lớn

### 2.3. One-way Data Binding

Dữ liệu trong React sẽ được truyền theo một chiều duy nhất, đó là từ ***component cha*** đến ***component con***, mà không có chiều ngược lại. Việc truyền dữ liệu theo hướng ngược lại được hiểu là "truyền sự kiện". Việc truyền dữ liêụ theo 1 hướng duy nhất sẽ giúp ứng dụng hoạt động một cách có kiểm soát hơn

### 2.4. Virtual DOM

Virtual DOM (DOM ảo) thực chất nó là 1 phiên bản sao chép của Real DOM (DOM gốc). Khi có sự thay đổi trên ứng dụng, toàn bộ UI sẽ được **re-render** (hiển thị lại) trên Virtual DOM. Sau nó, nó kiểm tra sự khác biệt giữa DOM trước đó và DOM mới. Sau khi hoàn tất quá trình kiểm tra, Real DOM sẽ chỉ cập nhật những phần tử có sự thay đổi sau khi so sánh trên Virtual DOM. Điều này sẽ giúp chúng ta tránh việc re-render những phần tử DOM không cần thiết, góp phần tăng hiệu suất ứng dụng và tránh lãng phí tài nguyên bộ nhớ

### 2.5. Simplicity

Chính vì được cấu tạo nên từ các component cũng như sử dụng cú pháp JSX, nên React thật sự sẽ rất dễ tiếp cận để học hỏi và sử dụng

### 2.6. Performance

Hiệu suất của ứng dụng React được biết đến là tốt nhờ chính đặc trưng Virtual DOM mà nó sở hữu

## 3. Những ưu điểm của React?

1. Học hỏi và sử dụng một cách dễ dàng
2. Việc tạo Dynamic Web Applications trở nên dễ dàng hơn
3. Tính tái sử dụng của Component
4. Hiệu suất được nâng cao (**Performance Enhancement**)
5. Có nhiều công cự hỗ trợ tiện dụng, cộng đồng lớn, tài liệu hỗ trợ đa dạng
6. Thân thiện với SEO

## 4. Những hạn chế của React?

1. Tốc độ phát triển cao làm cho nhiều lập trình viên không thể theo kịp, phải học hỏi liên tục khi có sự thay đổi
2. Tài liệu trên trang chủ kém, chưa chuyên sâu, cần sự hỗ trợ từ các tài liệu bên ngoài
3. Việc khuyến nghị sử dụng JSX nó khiến JSX trở thành một rào cản khi lập trình

## 5. Trình duyệt có thể đọc được JSX hay không?

Trình duyệt (**Browser**) không thể đọc được JSX. Nguyên do là trình duyệt chỉ có thể đọc các ***JavaScript object*** và JSX thì không nằm trong số đó. Do vậy, chúng ta cần thực hiện việc chuyển đổi nó về JavaScript object thông thường thông qua các công cụ như Babel để trình duyệt có thể đọc và hiểu

## 6. Tại sao JSX được khuyến khích sử dụng?

1. Nó nhanh hơn JavaScript thông thường nhờ vào việc cải thiện thời gian trong khi dịch mã JavaScript
2. Thay vì phân tách các công nghệ bằng việc chia logic và ngôn ngữ đánh dấu (HTML và JS) thành các tệp riêng biệt, JSX sử dụng các thành phần chứa cả hai
3. Làm cho việc tạo các template dễ dàng hơn
4. Nhờ hỗ trợ type-safe, hầu hết các lỗi có thể được phát hiện trong quá trình biên dịch 

## 7. Props là gì?

Props là viết tắt của **Properties** trong React và nó là **read-only** (chỉ đọc). Nó là một đối tượng lưu trữ các giá trị của thẻ. Nó hoạt động gần giống như các thuộc tính của 1 thẻ HTML. Props được coi như là một cách để truyền dữ liệu từ component cha đến component con trong toàn bộ ứng dụng

Props hỗ trợ cả việc truyền biến và hàm.

Vì props là bất biến nên chúng ta không thể sửa đổi nó bên trong component

## 8. State là gì?

State là một cấu trúc chứa dữ liệu và có thể được cập nhật trong suốt vòng đợi của component. Nó được coi như là trung tâm của một component, bởi nó sẽ quyết định khi nào và cách thức mà component sẽ được re-render.

State được khuyến khích sử dụng càng đơn giản càng tốt

## 9. So sánh props và state?

| Props | State |
| -------- | -------- |
|  Read-Only ( Chỉ đọc)  | Có thể thay đổi |
| Cho phép truyền dữ liệu từ component cha đển component con như là một biến | Lưu thông tin của một component |
| Có thể truy cập bởi component con | Không thể truy cập bởi component con |
| Có thể tồn tại trong Stateless Component | Không thể tồn tại trong Stateless Component |
| Hỗ trợ component trong việc tái sử dụng | Không hỗ trợ component trong việc tái sử dụng |
| Được điều khiển bởi bất kỳ thành phần nào sử dụng component | Được điều khiển bởi chính component sở hữu nó |

## 10. So sánh Stateless Component và Statefull Component?

| Stateless Component | Statefull Component |
| -------- | -------- |
| Không chứa và quản lý state | Có thể chứa và quản lý state |
| Không hoạt động với bất kỳ phương thức nào thuộc LifeCycle của 1 component | Hoạt động với tất cả phương thức thuộc LifeCycle của 1 component |
| Không thể tái sử dụng | Có thể tái sử dụng |

## 11. Giải thích các phương thức thuộc LifeCycle của một component?

- **getInitialState()**: Dùng để mô tả giá trị mặc định của this.state. Nó sẽ được thi trước component được khởi tạo
- **componentWillMount():** Nó sẽ được thực thi trước khi component render trên DOM
- **componentDidMount()**: Được thực thi khi component đã được render hoàn tất trên DOM. Lúc này, bạn có thể thực hiện bất kì truy vấn nào đến DOM.
- **componentWillReceiveProps()**: Nó sẽ được gọi khi một component nhận props mới từ component cha của nó trước khi bất kì hàm render nào được gọi. 
- **shouldComponentUpdate()**: Nó sẽ được gọi khi một component nhận thấy có sự thay đổi tác động lên DOM và trả về giá trị true / false theo một số quy chuẩn . Nếu hàm này trả về true, component sẽ được cập nhật. Ngược lại, component sẽ giữ trạng thái updating.
- **componentWillUpdate()**: Nó sẽ được gọi trước khi component render ra DOM và sau hàm shouldComponentUpdate(). Tại đây, bạn có thể thay đổi state của component bằng cách gọi phương thức this.setState(). Nó sẽ không được gọi nếu shouldComponentUpdate() trả về false.
- **componentDidUpdate()**: Nó sẽ được gọi khi component đã thay đổi hoàn tất trên DOM. 
- **componentWillUnmount()**: Nó sẽ được gọi ngay khi một component bị huỷ và loại khỏi DOM. Nó sẽ giúp giảm tải bộ nhớ nhờ xoá các phương thức lắng nghe sự kiện (event listener), huỷ các yêu cầu mạng (network requests), hay dọn dẹp các phần tử DOM.

## 12. Thế nào là Pure Component?

Pure Component bắt đầu được giới thiệu từ React 15.3. Nó có sự khác biệt với Component dựa trên phương thức **shouldComponentUpdate()**
- Với React.Component, hàm shouldComponentUpdate() sẽ trả về giá trị mặc định ***true***
- Với React.PureComponent, hàm shouldComponentUpdate() sẽ dựa trên sự khác biệt của state hay props để re-render component

Nhờ sự khác biệt trên mà Pure Component giúp đơn giản hoá và tăng hiệu suất ứng dụng

## 13. Thế nào là Higher Order Component (HOC)?

HOC là một kĩ thuật nâng cao trong React nhằm hỗ trợ việc tái sử dụng component. Nó là 1 hàm nhận đầu vào là một component và trả về một component. Nói một cách khác, nó là 1 hàm nhận một hàm khác như là tham số của nó. Lưu ý rằng, HOC không phải là môt React API

## 14. Tại sao phải viết tên của Component bắt đầu bằng chữ cái in hoa?

Vì nếu dùng chữ cái in thường, JSX sẽ nhầm lẫn giữa thẻ của HTML và Component của React

## 15. Fragment là gì?

Fragment được giới thiệu từa React 16.2. Trước đây, mỗi component chỉ được phép trả về duy nhất 1 element. Với Fragment, nó sẽ giúp chúng ta nhóm các element lại, và trả về như một phần tử phụ của DOM


Hẹn gặp lại các bạn trong phần 2 nhé!!!