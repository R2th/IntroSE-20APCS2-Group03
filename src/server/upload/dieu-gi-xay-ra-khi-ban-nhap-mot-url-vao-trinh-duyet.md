Bất kể bạn là một kỹ sư, nhà phát triển, nhà tiếp thị hay ngay cả trong bán hàng, sẽ luôn luôn là điều tốt nếu có hiểu biết cơ bản về điều gì xảy ra trên trình duyệt và thông tin được vận chuyển đến máy tính của chúng ta thông qua internet như thế nào.

Hãy tưởng tượng rằng bạn muốn truy cập maps.google.com để kiểm tra thời gian chính xác bạn cần để đến một nơi nào đó.

### 1, Bạn gõ maps.google.com vào thanh địa chỉ của trình duyệt

### 2, Trình duyệt kiểm tra DNS trong cache để tìm địa chỉ IP tương ứng của maps.google.com
DNS là một cơ sở dữ liệu quản lý tên miền và địa chỉ IP tương ứng với tên miền đó. Mục đích chính của DNS là để dễ nhớ. Bạn có thể dễ dàng truy cập trang web bằng cách sử dụng địa chỉ IP, nhưng việc có thể nhớ được các địa chỉ IP cho các trang web khác nhau là rất khó. Thay vào đó, ta chỉ cần nhớ tên miền vì nó dễ nhớ hơn địa chỉ IP và DNS sẽ làm việc để mapping sang địa chỉ IP tương ứng.

Để tìm bản ghi DNS, đầu tiên trình duyệt sẽ kiểm tra cache.
* Thứ nhất, trình duyệt kiểm tra cache của trình duyệt. Trình duyệt sẽ lưu giữ cache các bản ghi DNS trong một khoảng thời gian cho các trang web mà bạn đã truy cập trước đó.
* Thứ hai, trình duyệt kiểm tra OS cache. Nếu không tìm được trong cache của trình duyệt, nó sẽ tạo một cuộc gọi hệ thống (ví dụ gethostname trong Windows) đến hệ điều hành của máy tính để lấy bản ghi DNS vì OS cũng duy trì cache của DNS.
* Thứ ba, nó kiểm tra trong cache của router. Khi không tìm thấy trong máy tính của bạn, trình duyệt sẽ giao tiếp với router để lấy bản ghi DNS.
* Cuối cùng, nếu vẫn không tìm thấy ở những nơi trên thì trình duyệt sẽ kiểm tra ISP cache.

### 3, Nếu URL không tìm thấy trong cache, DNS server của ISP sẽ thiết lập một truy vấn DNS để tìm kiếm địa chỉ IP của server phục vụ maps.google.com
Như đã đề cập ở trên, để máy tính kết nối đến máy chủ phục vụ maps.google.com thì ta cần địa chỉ IP của maps.google.com. Mục đích của truy vấn DSN là để tìm kiếm địa chỉ IP chính xác của trang web trên các máy chủ DNS trên internet. Đây là loại tìm kiếm đệ quy vì nó sẽ được lặp lại qua các máy chủ DNS đến khi tìm được địa chỉ IP ta cần và sẽ trả về lỗi nếu không tìm thấy. Các máy chủ DNS thực hiện tìm kiếm DNS dựa trên kiến trúc miền của tên miền của trang web. Sơ đồ dưới đây giải thích về kiến trúc miền:

![](https://images.viblo.asia/0d056bb5-7757-437f-8b8b-7f3088e6b09a.png)

Các địa chỉ trang web hiện nay chủ yếu gồm third-level domain, second-level domain, và top-level domain. Mỗi loại level lại có máy chủ DNS riêng của nó.

Với maps.google.com, đầu tiên, DNS recursor sẽ liên lạc với máy chủ root. Máy chủ root sẽ chuyển hướng đến máy chủ .com. Máy chủ .com sẽ chuyển hướng đến máy chủ google.com. Máy chủ google.com sẽ tìm địa chỉ IP cho maps.google.com trong các bản ghi DNS của nó và trả về cho DNS recursor và cuối cùng được trả về cho trình duyệt.

Những request trên được gửi đi sử dụng các packet dữ liệu nhỏ. Những package đó di chuyển qua nhiều thiết bị mạng trước khi đến với DNS server chứa thông tin địa chỉ IP cần tìm kiếm. Những thiết bị mạng đó sử dụng bảng điều hướng để tìm ra con đường nhanh nhất có thể để các package có thể đi đến đích. Nếu những package đó bị mất, bạn sẽ nhận được lỗi request thất bại, ngược lại, chúng sẽ đến đúng máy chủ DNS, lấy thông tin địa chỉ IP và quay trở về trình duyệt.

### 4, Trình duyệt khởi tạo một kết nối TCP đến máy chủ.

Khi trình duyệt nhận được thông tin về địa chỉ IP, nó sẽ tạo một kết nối tới máy chủ tương ứng với địa chỉ đó để vận chuyển thông tin. Trình duyệt sử dụng giao thức mạng để xây dựng kết nối. Có nhiều loại giao thức khác nhau có thể được sử dụng, nhưng TCP là giao thức phổ biến nhất được sử dụng cho rất nhiều loại HTTP request.

Để vận chuyển dữ liệu giữa máy tính của bạn và máy chủ, thiết lập một kết nối TCP là rất quan trọng. Kết nối này được thiết lập sử dụng quá trình bắt tay ba bước. Tại quá trình này, client và server trao đổi thông điệp SYN (synchronize) và ACK (acknowledge) để thiết lập kết nối.

1. Client gửi một SYN package đến server, yêu cầu mở một kết nối mới.
2. Nếu server đã mở port và có thể chấp nhận kết nối, nó sẽ trả về SYN/ACK packet tương ứng với SYN packet của client.
3. Client nhận SYN/ACK packet và công nhận nó bằng cách gửi một ACK packet đến server.

Sau đó, một kết nối TCP được thiết lập để vận chuyển dữ liệu.

### 5, Trình duyệt gửi một HTTP request đến webserver
Khi kết nối TCP đã được thiết lập, trình duyệt sẽ gửi một GET request yêu cầu trang web maps.google.com. Nếu bạn nhập thông tin đăng nhập hoặc gửi một form, POST request sẽ được sử dụng. Request sẽ chứa một số thông tin bổ sung như định danh trình duyệt, kiểu request được chấp nhận, ... Nó cũng sẽ gửi kèm các thông tin từ cookie mà trình duyệt lưu cho tên miền này.

Ví dụ GET request

![](https://images.viblo.asia/5f8bcbf5-727d-4e22-89a3-21e13604df80.png)

### 6,  Server xử lý request và gửi trả về response
Những server phổ biến nhất hiện nay là Apache hay nginx cho Linux và IIS cho Windows. Server nhận request, phân tích request thành các tham số sau:
* Phương thức HTTP (GET, HEAD, POST, PUT, PATCH, DELETE, CONNECT, OPTIONS, hay TRACE)
* Tên miền (maps.google.com)
* Path được yêu cầu, trong trường hợp này là `/`

Server xác minh rằng có một Virtual Host đã được cấu hình trên server tương ứng với maps.google.com.

Server xác mình rằng maps.google.com chấp nhận một GET request.

Server kiểm tra xem client có được truy cập không.

Nếu server có cài đặt một rewrite module (mod_rewrite cho Apache hay URL Rewrite cho IIS), nó sẽ sử dụng các quy tắc đã được cấu hình để rewrite lại request.

Server lấy content tương ứng với request, nếu google chạy bằng PHP, server sẽ sử dụng PHP để xử lý.

Server trả về response chứa trang web cùng với status code, kiểu nén (Content-Encoding), cache trang web như thế nào (Cache-Control), cookie, ...

Ví dụ về HTTP response:

![](https://images.viblo.asia/60d56fcd-9138-4266-b15e-23226e469fe7.png)

Trong response ở trên, dòng đầu tiên hiển thị status code. Đây là một thông tin khá quan trọng nó về trạng thái của response. Có 5 loại trạng thái:
* 1xx biểu thị thông báo
* 2xx biểu thị trạng thái thành công
* 3xx chuyển hướng client đến một URL khác
* 4xx biểu thị một lỗi do phía client
* 5xx biểu thị một lỗi do phía server

### 8, Trình duyệt hiển thị nội dung HTML (với HTML response)
Trình duyệt hiển thị nội dung HTML theo từng giai đoạn. Đầu tiên, nó sẽ hiển thị bộ xương HTML. Sau đó, nó kiểm tra các thẻ HTML và gửi GET request để yêu cầu các thành phần bổ sung trên trang web, như ảnh, các tệp CSS, Javascript, ... Những tệp tĩnh được cache bởi trình duyệt, do đó, ở những lần truy cập lại trang web sau đó, những tệp này sẽ không cần được request nữa. Cuối cùng, trang web maps.google.com hiển thị trên trình duyệt.
## Tham khảo
[https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a](https://medium.com/@maneesha.wijesinghe1/what-happens-when-you-type-an-url-in-the-browser-and-press-enter-bb0aa2449c1a)