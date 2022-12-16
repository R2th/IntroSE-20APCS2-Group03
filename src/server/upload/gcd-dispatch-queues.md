# I. Threads:

-----


- Ứng dụng iOS là một quá trình thực thi nhiều tác vụ bằng cách sử dụng đa luồng. Có thể có nhiều luồng thực thi cùng một lúc khi CPU có đủ core để thực hiện.
- Khi phân chia ứng dụng thành nhiều luồng, ta có những lợi thế sau:
    - **Thực thi nhanh hơn**: Bằng cách chạy các tác vụ trên các luồng, ta có thể hoàn thành công việc đồng thời. Điều này sẽ cho phép công việc được hoàn thành nhanh hơn so với việc chạy mọi thứ một cách tuần tự.
    - **Khả năng phản hồi**: Nếu chỉ thực hiện công việc người dùng có thể nhìn thấy trên luồng UI chính, thì người dùng sẽ nhận được thông báo rằng ứng dụng bị chậm hoặc đóng băng. Việc xử lý đa luồng sẽ không gây chậm hoặc block UI, như vậy sẽ tăng tốc độ phản hồi và tương tác tới user.
    - **Tối ưu hóa mức tiêu thụ tài nguyên**: Thread được hệ điều hành tối ưu hóa cao.

# II. Dispatch Queues:

-----


- Trong iOS, để làm việc với **Thread**, chúng ta có thể thao tác thông qua **DispatchQueue**.
- Khi tạo một **Queue**, hệ điều hành sẽ có khả năng tạo và gán cho **Queue** một hoặc nhiều **Thread**. Nếu các **Thread** đang có sẵn thì chúng có thể được **tái sửu dụng**. Nếu không có sẵn các **Thread** thì hệ điều hành sẽ tiến hành khởi** tạo ra Thread mới**.

Cách để tạo một Queue rất đơn giản như ví dụ dưới đây:
```swift
let label = "com.company_name.project_name.demo_queue"
let queue = DispatchQueue(label: label)
```

Trong ví dụ trên, `label` là một chuỗi string duy nhất để định dạng Queue (tương tự như id). Vì nhãn của Queue còn có thể sử dụng để **debug** nên chúng ta nên đặt tên cho nó theo một ý nghĩa nhất định theo cấu trúc `com.<tên công ty>.<tên app>.<tên queue>`. Ví dụ công ty có tên là **Google**, app có tên là **GoogleMap** và queue phục vụ cho việc **load ảnh** thì label sẽ là `com.google.googlemap.loadimage`.

# III. Synchronous và asynchronous:

-----


- Các tác vụ được đưa vào queue có thể chạy đồng bộ (synchronous) hoặc bất đồng bộ (asynchronous). 
- Khi thực hiện một tác vụ chạy **đồng bộ** (synchronous), ứng dụng sẽ đợi và block tất cả các tác vụ hiện tại cho tới khi tác vụ trong queue được thực hiện xong.
- Khi thực hiện một tác vụ **bất đồng bộ** (asynchronous) thì tác vụ đó sẽ chạy song song cùng với các tác vụ khác.
- Queue quản lý các tác vụ theo cơ chế **FIFO**, tuy nhiên, các tác vụ sẽ không hoàn thành theo cơ chế **FIFO**. Cơ chế **FIFO** áp dụng để đưa các tác vụ vào queue, **không** sử dụng cho việc quyết định thời gian kết thúc các tác vụ.

# IV. Serial Queue và Concurrent Queue:

-----


- Có 2 loại Queue đó là **Serial Queue** và **Concurrent Queue**:
    - **Serial Queue**: là queue chỉ có **duy nhất một Thread** và chỉ cho phép duy nhất 1 tác vụ được thực thi tại một thời điểm.
    - **Concurrent Queue**: là queue có thể **có một hoặc nhiều Thread**. Các Thread có thể được tạo và thực thị cùng một thời điểm.

# V. Main Queue:

-----


- Khi ứng dụng iOS được khởi chạy, **MainQueue** sẽ tự động được khởi tạo. **MainQueue** là một **serial queue** chịu trách nhiệm cập nhật **UI** cho ứng dụng.
- Vì **MainQueue** được sử dụng thường xuyên nên **Apple** đã biến nó thành một một **thuộc tính** của **class** mà có thể truy cập bằng cách gọi `DispatchQueue.main`.
- Việc thực hiện một tác vụ **synchronously** (đồng bộ) trên **MainQueue** sẽ khiến **UI bị block** làm cho user không thể tương tác với ứng dụng.

Cách để tạo một Serial Queue:
```swift
let label = "com.company_name.project_name.serial_queue"
let queue = DispatchQueue(label: label)
```

Cách để tạo một Concurrent Queue:
```swift
let label = "com.company_name.project_name.serial_queue"
let queue = DispatchQueue(label: label, attributes: .concurrent)
```

# VI. Quality of service:

-----


- Vì **Concurrent Queue** có thể chạy đồng thời nhiều tác vụ nên chúng ta cần phải đặt độ ưu tiên cho các tác vụ. Các tác vụ có độ ưu tiên cao hơn sẽ được thực hiện trước, do đó nó có thể yêu cầu nhiều tài nguyên của hệ thống hơn, đòi hỏi nhiều năng lượng hơn các tác vụ có độ ưu tiên thấp.
- Trong trường hợp chúng ta muốn sử dụng **Concurrent Queue** nhưng không muốn tự khởi tạo và quản lý chúng thì chúng ta có thể sử dụng và thao tác với **Global Queue**.
```swift
let queue = DispatchQueue.global(qos: .userInteractive)
```

Có 6 **quality of service** được sử dụng cho **Concurrent Queue**:
- **.userInteractive**: được khuyến nghỉ sử dụng cho các tác vụ mà người dùng tương tác trực tiếp, các tác vụ tính toán cập nhật giao diện ứng dụng, hình ảnh,... Các tác vụ được gửi đến queue sẽ hoàn thành gần như ngay lập tức.
- **.userInitiated**: được sử dụng khi người dùng khởi động một tác vụ từ UI cần phải xử lý ngay lập tức nhưng có thể thực hiện một cách bất đồng bộ (asynchronously). Tác vụ được thực hiện trong queue sẽ mất một vài giây hoặc ít hơn để hoàn thành. Ví dụ như việc đọc dữ liệu từ local database (Core Data, SQLite, Reaml,...).
- **.utility**: được sử dụng để làm việc với các tác vụ tính toán có thời gian dài, connect networking hoặc các nguồn cấp dữ liệu liên tục. Các tác vụ thực hiện trong queue có thể mất thời gian từ vài giây tới vài phút.
- **.background**: sử dụng cho các tác vụ chạy ngầm trong ứng dụng. Ví dụ như việc đồng bộ hoá dữ liệu với server, sao lưu dữ liệu,... Hệ điều hành sẽ tập trung vào hiệu quả năng lượng hơn tốc độ xử lý, do đó nên tác vụ sử dụng queue này sẽ mất nhiều thời gian để thực hiện, khoảng vài phút trở lên.
- **.default** and **.unspecified**: **.default** có độ ưu tiên nằm giữa **.userInitiated** và **.utility** và là giá trị mặc định của một **Concurrent Queue**. Nó không dành cho chúng ta sử dụng trực tiếp. Tùy chọn thứ hai là **.unspecified** và tồn tại để hỗ trợ các API kế thừa có thể loại bỏ thread ra khỏi **quality of service**. 
    
# VII. Thêm tác vụ vào Queue:

-----


- DispathQueue cung cấp 2 phương thức `sync` và `async` để thực hiện việc thêm tác vụ vào Queue.
```swift
DispatchQueue.global(qos: .utility).async { [weak self] in
  guard let self = self else { return }
  // Perform your work here
  // ...
  // Switch back to the main queue to update your UI
  DispatchQueue.main.async {
    self.textLabel.text = "New articles available!"
  }
}
```

- `sync` để thực hiện tác vụ **đồng bộ** (synchronous).
- `async` để thực hiện tác vụ **bất đồng bộ** (asynchronous).

# VIII. Tài liệu tham khảo:

-----


- Concurrentcy by tutorials - 1st Edition