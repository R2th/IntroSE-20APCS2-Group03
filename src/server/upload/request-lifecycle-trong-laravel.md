## Giới Thiệu
- XIn chào mọi người mình quay lại với bài tiếp theo về **Request Lifecycle** trong laravel đây . (hihi)
## 1. Request Lifecycle 
- Khi sử dụng bất kì công cụ nào , chúng ta đều cảm thấy tự tin hơn nếu chúng ta có thể hiểu được cách hoạt động của nó , việc phát triển ứng dụng cũng vậy khi bạn hiểu các công cụ hoạt động như thế nào bạn sẽ cảm thấy tự tin hơn khi sử dụng chúng . Mục đích phần tiếp theo này mình muốn các bạn có 1 cái nhìn tổng quan về cách hoạt động của laravel . Bằng cách có 1 cái nhìn tổng thể hơn,bạn sẽ cảm thấy mọi thứ cảm thấy ít "huyền diệu" hơn và tự tin hơn khi xây dựng các ứng dụng của mình. Nếu bạn không hiểu tất cả các thuật ngữ ngay lập tức, đừng nản lòng! Hãy thử cố gắng hiểu từng cái cơ bản nhất, kiến thức của bạn sẽ được tăng lên khi bạn khám phá từng phần của tài liệu này.
## 2. Tổng quan về Lifecycle
Giống như mọi loại framework khác, mọi request của một ứng dụng Laravel đều được bắt đầu từ file **public/index.php**. Tất cả các **request** chuyển đến file này đều được chuyển đến từ **Web Server** của bạn (Apache / Nginx). Trong filei **ndex.php** sẽ không bao gồm nhiều đoạn code . Thay vào đó nó là điểm khởi đầu để loading phần còn lại của framework.

Trong file **index.php** sẽ load ra các package được **install từ Composer** và khởi tạo **Autoloader**, và sau đó khởi tạo bộ khung làm việc của framework Laravel từ **bootstrap/app.php** script. Điều đầu tiên là Laravel tự sinh ra các instance của ứng dụng  **service container**.

### HTTP / Console Kernels
Tiếp theo, các request sẽ được gửi đến HTTP kernel hoặc console kernel, tùy thuộc vào loại yêu cầu đang cập nhật ứng dụng. 2 kernels này sẽ như là trung tâm điều khiển mà tất cả các yêu cầu sẽ phải đi qua tuy nhiên trong bài viết này chúng ta hãy chỉ tập trung vào tìm hiểu HTTP kernel, vị trí của nó nằm ở **app/Http/Kernel.php**.

HTTP kernel được **extends** từ class the **Illuminate\Foundation\Http\Kernel** class, nó định nghĩa một mảng **bootstrappers** sẽ được chạy trước khi các **request** được thực thi. Những **bootstrappers** cấu hình việc xử lý lỗi, cấu hình **logging**, Tiếp theo, các request sẽ được gửi đến HTTP kernel hoặc console kernel, tùy thuộc vào loại yêu cầu đang cập nhật ứng dụng. 2 kernels này sẽ như là trung tâm điều khiển mà tất cả các yêu cầu sẽ phải đi qua tuy nhiên trong bài viết này chúng ta hãy chỉ tập trung vào tìm hiểu HTTP kernel, vị trí của nó nằm ở app/Http/Kernel.php.

The HTTP kernel được extends từ class the Illuminate\Foundation\Http\Kernel class, nó định nghĩa một mảng bootstrappers sẽ được chạy trước khi các request được thực thi. Những bootstrappers cấu hình việc xử lý lỗi, cấu hình logging, detect the application environment, và thực hiện các nhiệm vụ khác cần được thực hiện trước khi request thực sự được xử lý.

The HTTP kernel cũng định nghĩa một danh sách HTTP middleware mà tất cả các requests phải đi qua trước khi được ứng dụng sử lý. Các middleware này xử lý đọc và ghi HTTP session, xác định xem ứng dụng có đang ở chế độ bảo trì hay không, xác minh the CSRF token, và hơn thế nữa.

Phương thức chữ ký cho HTTP kernel phương thức handle có vẻ rất đơn giản: nhận một Request và trả về một Response. Hãy suy nghĩ về Kernel như là một trung tâm điều hành đại diện cho toàn bộ ứng dụng của bạn. Cung cấp cho nó các request HTTP và nó sẽ trả về các response HTTP.Tiếp theo, các request sẽ được gửi đến HTTP kernel hoặc console kernel, tùy thuộc vào loại yêu cầu đang cập nhật ứng dụng. 2 kernels này sẽ như là trung tâm điều khiển mà tất cả các yêu cầu sẽ phải đi qua tuy nhiên trong bài viết này chúng ta hãy chỉ tập trung vào tìm hiểu HTTP kernel, vị trí của nó nằm ở app/Http/Kernel.php.

The HTTP kernel được extends từ class the Illuminate\Foundation\Http\Kernel class, nó định nghĩa một mảng bootstrappers sẽ được chạy trước khi các request được thực thi. Những bootstrappers cấu hình việc xử lý lỗi, cấu hình logging, detect the application environment, và thực hiện các nhiệm vụ khác cần được thực hiện trước khi **request** thực sự được xử lý.

HTTP kernel cũng định nghĩa một danh sách HTTP **middleware** mà tất cả các **requests** phải đi qua trước khi được ứng dụng sử lý. Các **middleware** này xử lý đọc và ghi **HTTP session**, xác định xem ứng dụng có đang ở chế độ bảo trì hay không, xác minh the **CSRF token**, và hơn thế nữa.

Phương thức chữ ký cho HTTP kernel phương thức **handle** có vẻ rất đơn giản: nhận một **Request** và trả về một **Response**. Hãy suy nghĩ về **Kernel** như là một trung tâm điều hành đại diện cho toàn bộ ứng dụng của bạn. Cung cấp cho nó các **request HTTP** và nó sẽ trả về các **response HTTP**., và thực hiện các nhiệm vụ khác cần được thực hiện trước khi request thực sự được xử lý.

HTTP kernel cũng định nghĩa một danh sách HTTP **middleware** mà tất cả các **requests** phải đi qua trước khi được ứng dụng sử lý. Các **middleware** này xử lý đọc và ghi HTTP session, xác định xem ứng dụng có đang ở chế độ bảo trì hay không, xác minh the **CSRF token**, và hơn thế nữa.

Phương thức chữ ký cho HTTP kernel phương thức handle có vẻ rất đơn giản: nhận một **Request** và trả về một **Response**. Hãy suy nghĩ về **Kernel** như là một trung tâm điều hành đại diện cho toàn bộ ứng dụng của bạn. Cung cấp cho nó các request HTTP và nó sẽ trả về các response HTTP.

### Service Providers
Một trong những hành động  quan trọng nhất là tải các **service providers** cho ứng dụng của bạn. Tất cả các **service providers** cho ứng dụng được cấu hình trong **config/app.php** trong mảng **providers** . Đầu tiên, phương thức register sẽ được gọi trong tất cả các providers, sau đó, khi tất cả các providers đã được đăng ký, phương thức boot sẽ được gọi.

Các **Service providers** chịu trách nhiệm khởi động tất cả các components khác nhau của Framework như: **database**, **queue**, **validation**, và **routing components**. Vì chúng khởi động và cấu hình mọi tính năng được cấu hình được cung cấp bởi framework nên các **service providers** là thành phần quan trọng nhất của toàn bộ quá trình khởi động **Laravel**.

### Dispatch Request
Khi ứng dụng được khởi động xong và tất cả các **service providers** đã được đăng ký, các **Request** sẽ được đưa đến các bộ định tuyến **(router)**. Các **router** sẽ kiểm tra các yêu cầu được chuyển đến **Route** hoặc **Controller**, cũng như là chạy qua bất kỳ **Middleware** nào đó.

## 3. Service Providers
**Service providers** là key để cài đặt 1 ứng dụng **Laravel**. Các instance sẽ được tạo ra **created**, các **service providers** được đăng ký, và yêu cầu được xử lý. Thật là đơn giản =))

Có sự nhận biết về cách 1 ứng dụng Laravel được xây dựng như thế nào và cài đặt qua **service providers** có vai trò quan trọng như thế nào. Dĩ nhiên, các giá trị mặc định s**ervice providers** trong ứng dụng của bạn được lưu trong thư mục **app/Providers**.

**AppServiceProvider** là hoàn toàn trống. **Provider** là nơi lý tưởng để thêm cài đặt cho ứng dụng của bạn. Dĩ nhiên, với 1 ứng dụng lớn, bạn có thể tạo các service providers, mỗi cái tương ứng với 1 loại cấu hình của cài đặt.

Nguồn : https://laravel.com/docs/6.x/lifecycle

## 4 Kết thúc 
- Hy vọng bài viết trên sẽ giúp ích cho bạn đã và đang làm việc với FW laravel nhe ^.^ . Bài tiếp theo mình sẽ viết về **Service Container** and **Service Providers** chi tiết nhé . Thank you .
                                                                                                                      -- To be Continue --