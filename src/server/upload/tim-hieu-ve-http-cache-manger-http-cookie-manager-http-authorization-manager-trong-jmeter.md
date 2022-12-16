Jmeter cung cấp rất nhiều tính năng để kiểm tra hiệu suất của bạn trở nên thực tế hơn. Mặc dù Jmeter không phải là một trình duyệt web, nhưng nó cung cấp các cấu hình để tái tạo hành vi duyệt thực tế. 
Sau đây mình sẽ cùng tìm hiểu về 3 cấu hình, 3 trong những tính năng quan trọng nhất của Jmeter là HTTP Cache Manger, HTTP Cookie Manager và HTTP Authorization Manager.

## HTTP Cache Manager 

Đầu tiên, chúng ta cần phải hiểu các quy tắc cơ bản của Web Browser Caching.

### Browser Cache là gì?
Khái niệm về Browser caching hiện ra từ câu hỏi này, Tại sao phải tải cùng một dữ liệu cho mỗi trang web? Tại sao không tải xuống một lần và lưu trữ để sử dụng lại? Cache của trình duyệt là một vị trí lưu trữ tạm thời của các tệp được trình duyệt web của bạn tải xuống để hiển thị trang web. Bộ nhớ cache bao gồm các tệp html, CSS style sheets, lệnh JavaScript và các tệp đa phương tiện khác.

Khi bạn truy cập trang web lần đầu tiên, trình duyệt sẽ tải tất cả các tệp này vào bộ nhớ cache. Ở lần sau, khi bạn truy cập lại trang, trình duyệt sẽ kiểm tra nội dung đã cập nhật và chỉ tải những tệp không được lưu trữ trong bộ nhớ cache. Cơ chế này làm giảm việc sử dụng băng thông và giúp tải trang web nhanh hơn.
### Cách sử dụng HTTP Cache Manager trong Jmeter
Jmeter sẽ không tải nội dung tĩnh cho đến khi nó được cấu hình rõ ràng để làm như vậy. Nếu bạn đã chọn tùy chọn "Retrieve All Embedded Resources", Jmeter sẽ tải tất cả các tệp tĩnh (như HTML, CSS, js, hình ảnh, v.v.) trong khi thực thi.
Cache Manager sẽ lưu tất cả tệp tin tĩnh và không tải lại từ server cho đến khi được sửa lại. Khá là đơn giản đúng không.

Bây giờ chúng ta sẽ thêm HTTP Cache Manager và hiểu về các thuộc tính của nó nhé.
### Thêm HTTP Cache Manager như thế nào?

1)	Mở Jmeter và click chuột phải vào Test Plan

2)	Add -> Config Element -> HTTP Cache Manager

![](https://images.viblo.asia/7ce670aa-aa05-4ce6-ab07-8e1a737e7517.png)

### Thuộc tính của HTTP Cache Manager

![](https://images.viblo.asia/23f606db-54de-43e4-938a-99e55765bb9c.png)

**Clear Cache each Iteration** : Sau mỗi lần lặp lại, nội dung đã cache được xóa bỏ.

**Use Cache-Control/Expires header when processing GET requests** : Nếu tùy chọn này được chọn, Jmeter sẽ kiểm tra giá trị Cache-Control / Expires so với thời gian hiện tại. Nếu time stamp trong tương lai và yêu cầu là Get thì Sampler sẽ trả về ngay lập tức mà không yêu cầu URL từ Server.

**Maximum Number of Elements in cache** : Jmeter lưu tất cả tài nguyên bộ đệm trong RAM. Theo mặc định, Cache Manager lưu trữ lên tới 5000 mục trong bộ nhớ cache cho mỗi người dùng ảo. Nếu bạn tăng giá trị này, Jmeter sẽ tiêu thụ nhiều bộ nhớ hơn cho phù hợp. Nó có thể dẫn đến ngoại lệ “OutOfMemory”. Để tránh lỗi như vậy, bạn nên chọn JVM-Xmx trong jmeter.bat \ sh.

## HTTP Cookie Manager

Một câu hỏi Jmeter phổ biến - Tôi muốn hiểu và xem một ví dụ để sử dụng JMeter Cookie Manager và giải thích các lý do khác nhau mà tôi có thể sử dụng nó.

Trên nhiều trang web và ứng dụng sử dụng cookie để giữ lại quyền xử lý giữa các phiên hoặc để giữ một số trạng thái ở phía khách hàng.　Nếu bạn định sử dụng JMeter để kiểm tra các ứng dụng web như vậy, thì bạn nên sử dụng JMeter Cookie Manager. 

Trình quản lý cookie tự động xử lý cookie (lưu trữ và gửi cookie) mà không cần bất kỳ cấu hình bổ sung nào giống như trình duyệt web. Trong ngôn ngữ layman, nếu bạn không thêm Cookie Manager thì kiểm thử JMeter sẽ hoạt động giống như một trình duyệt có cookie bị vô hiệu hóa. Sau đây là một vài đặc điểm quan trọng:

* Store Cookies: Cookie Manager tự động lưu trữ cookie và sẽ sử dụng cookie cho tất cả các yêu cầu sau này đối với trang web đó

* Threads and Cookies: Mỗi JMeter thread có một “vùng lưu trữ cookie” riêng biệt và lưu trữ các cookie cụ thể cho một thread / user. Giả sử bạn đang chạy thử nghiệm JMeter cho nhiều thread/ users thì nó sẽ lưu trữ cookie riêng cho từng người dùng (ví dụ session cookie)

* Properties: JMeter cho phép thay đổi hành vi / cấu hình mặc định của trình quản lý cookie bằng cách thay đổi giá trị thuộc tính của nó, ví dụ:

- save.cookies = true / false (đặt là true nếu bạn muốn giữ cookie dưới dạng biến)

- check.cookies = true / false (đặt là false nếu bạn muốn lưu trữ các cookie cross-domain và có thể sử dụng chúng sau này)

- name.prefix = true / false

- delete_null_cookies = true / false

* Custom Defined: Cookies Manager cho phép bạn thêm cookie bằng tay. Cookie được thêm bằng tay sẽ được tất cả threads / user chia sẻ

* Cookie Policy and Implementation

* Cái này có những ảnh hưởng thực sự về cách cookie được quản lý và gửi qua các yêu cầu web của bạn

* Chúng ta chủ yếu sẽ giữ lại mặc định để mô phỏng trình duyệt càng gần càng tốt.

![](https://images.viblo.asia/31e11150-ea8d-463e-abcd-c270093e8581.png)

### Ví dụ:

Ta sẽ xây dựng 2 test plan để chỉ ra cho bạn thấy sự khác nhau giữa có và không có CookieManager. Kiểm thử thực hiện đăng nhập và tìm kiếm xác thực mà người dùng đã đăng nhập.

**Test Plan với CookieManager Enabled**

Thử chạy và bạn sẽ thấy testcase của bạn Pass. Bạn có thể xem điều này ở “view results tree.”

![](https://images.viblo.asia/a258d163-babf-45d5-8605-a31df4826a42.png)

**Test Plan với CookieManager Disabled**

Thử chạy lại kiểm thử tương tự ở trên với trường hợp disable cookies manager và so sánh kết quả. Nếu cookies manager của bạn bị disable, người dùng sẽ không thể đăng nhập và sampler của bạn sẽ fail do việc xác nhận.

![](https://images.viblo.asia/36a51ed9-17ff-4bce-a2f8-ecd3792278c7.png)

## HTTP Authorization Manager

Authorization Manager cho phép bạn chỉ định một hoặc nhiều thông tin đăng nhập của người dùng trên các trang web bị hạn chế sử dụng xác thực.

![](https://images.viblo.asia/e59d68c6-f76f-4dfc-86b9-910d75d85aa7.png)

Bạn thấy loại xác thực này khi sử dụng trình duyệt để truy cập trang bị hạn chế và trình duyệt của bạn sẽ hiển thị hộp thoại đăng nhập. JMeter truyền thông tin đăng nhập khi nó gặp trang kiểu như thế.

**Name**

Mô tả tên của phần tử được hiển thị trên tree.

**Clear auth on each iteration?**

Được sử dụng bởi xác thực Kerberos. Nếu chọn, việc xác thực sẽ được thực hiện trên mỗi lần lặp của Main Thread Group ngay cả khi nó đã được thực hiện trong lần trước đó. Điều này thường hữu ích nếu mỗi lần lặp main thread group diễn tả hành vi của một Người dùng ảo.

**Base URL**

URL một phần hoặc toàn bộ khớp với một hoặc nhiều URL yêu cầu HTTP.

Ví dụ: giả sử bạn chỉ định Base URL là "http: // localhost/restricted/" với Username "jmeter" và Password là "jmeter".

Nếu bạn gửi HTTP request đến URL "http://localhost/restricted/ant/myPage.html", Authorization Manager sẽ gửi thông tin đăng nhập cho người dùng có tên "jmeter".

**Username**

Tên người dùng để xác thực

**Password**

Mật khẩu của người dùng (N.B. Cái này sẽ được lưu trữ không được mã hóa trong test plan)

**Domain**

Domain để sử dụng cho NTLM.

**Realm**

Các lĩnh vực để sử dụng cho NTLM.

**Mechanism**

Loại xác thực để thực hiện. JMeter có thể thực hiện các loại xác thực khác nhau dựa trên Http Samplers đã sử dụng:
Java
BASIC
HttpClient 4
BASIC, DIGEST and Kerberos


*Nguồn dịch:*
http://jmeter.apache.org/usermanual/component_reference.html#HTTP_Authorization_Manager
https://octoperf.com/blog/2018/04/24/jmeter-basic-authentication/