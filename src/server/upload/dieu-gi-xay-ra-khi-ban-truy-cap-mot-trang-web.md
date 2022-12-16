## Đặt vấn đề
Đã có lúc nào bạn đã đặt ra một câu hỏi: Điều gì sẽ xảy ra khi mình truy cập một trang web :thinking: đây cũng là câu hỏi mình tự đặt ra cho mình luôn để đi tìm câu trả lời. Vậy bài viết này sẽ cung cấp một cái nhìn đơn giản về những gì xảy ra khi chúng ra mở một trang web trên điện thoại hay trên máy tính.
Giờ thì chúng ta cùng tìm hiểu xem sao :grinning:

## Cách thức hoạt động của một trang web
### Mô hình Client và Server
Mô hình `Client-Server` là một mô hình nổi tiếng trong mạng máy tính, được áp dụng rất rộng rãi và là mô hình của mọi trang web hiện có. Ý tưởng của mô hình này là máy con (đóng vài trò là máy khách) gửi một yêu cầu (request) để máy chủ (đóng vai trò người cung ứng dịch vụ), máy chủ sẽ xử lý và trả kết quả về cho máy khách. Đây là một giản đồ đơn giản về cách chúng tương tác với nhau:

![](https://images.viblo.asia/9b929812-c8ff-41b6-a0fe-4cbe76f4963d.jpg)

* **Client** là những thiết bị kết nối mạng của những người dùng Internet (Ví dụ: máy tính hay điện thoại của bạn) và những phần mềm kết nối mạng trên những thiết bị đó (Ví dụ là một trình duyệt như firefox, chrome, Safari, ..etc..).
* **Server** là những máy tính lưu trữ trang web hay những ứng dụng. Khi một thiết bị từ client muốn truy cập một trang web, một bản sao của trang web được tải từ máy chủ về máy khách để hiển thị trên trình duyệt của chúng.

### Những thành phần khác
Mô hình `Client-Server` bên trên chưa thể nói rõ hết được toàn bộ cách thức hoạt động của trang web. Còn nhiều phần khác liên quan bên dưới đây.

Bây giờ thử tưởng tượng một trang web là một con đường. Ở đầu đường là `client` như ngôi nhà của chúng ta chẳng hạn. Phía đầu đường bên kia là `server` như Vinmart chẳng hạn, ở đó sẽ có có thứ gì đó bạn muốn mua.

![](https://images.viblo.asia/79deada4-5c05-4783-9e89-73cfa8714cd8.jpg)

+ **Mạng Internet bạn kết nối**: Cho phép bạn gửi và nhận dữ liệu trên web. Với ví dụ bên trên kia thì hiểu đơn giản nó giống như con đường nối giữa nhà của bạn với Vinmart.
+ **TCP/IP**: Bộ giao thức `TCP/IP` có thể được coi là một tập hợp các tầng, mỗi tầng giải quyết một tập các vấn đề có liên quan đến việc truyền dữ liệu, và cung cấp cho các giao thức tầng cấp trên một dịch vụ được định nghĩa rõ ràng dựa trên việc sử dụng các dịch vụ của các tầng thấp hơn. Về mặt logic, các tầng trên gần với người dùng hơn và làm việc với dữ liệu trừu tượng hơn, chúng dựa vào các giao thức tầng cấp dưới để biến đổi dữ liệu thành các dạng mà cuối cùng có thể được truyền đi một cách vật lý. Hay hiểu đơn giản là các giao thức truyền thông xác định dữ liệu sẽ truyền qua web. Điều này giống như cơ chế vận chuyển để cho phép bạn đặt hàng hoặc đến cửa hàng Vinmart để mua được đồ bạn muốn. Trong ví dụ của chúng ta thì sẽ hiểu như là một chiếc xe máy, xe đạp, ô tô hoặc có thể đi bộ :joy:
+ **DNS**: Là một hệ thống cho phép thiết lập tương ứng giữa địa chỉ IP và tên miền trên Internet. Khi chúng ta nhập vào địa chỉ web trong trình duyệt của mình, trình duyệt sẽ nhìn vào DNS để tìm ra địa chỉ IP tương ứng với tên miền đó trước khi truy xuất trang web. Từ đó nó sẽ gửi một messages HTTP đến đúng máy chủ của trang web đó. Điều này giống như là tìm kiếm đúng địa chỉ của Vinmart để bạn tới mua đồ.
+ **HTTP**: HyperText Transfer Protocol là một trong năm giao thức chuẩn của mạng Internet, được dùng để liên hệ thông tin giữa Máy cung cấp dịch vụ (Web server) và Máy sử dụng dịch vụ (Web client) trong mô hình Client/Server dùng cho World Wide Web-WWW. Nó là giao thức tầng ứng dụng và năm trên giao thức TCP/IP. Giống như ngôn ngữ giao tiếp chúng ta sử dụng để mua hàng ở Vinmart.
+ **Component files**: Một trang web được tạo thành từ nhiều file khác nhau , và có 2 loại chính là `Code files` (thành phần xây dựng nên trang web như HTML, CSS, JS, PHP, ...), `Assets` (ví dụ như hình ảnh, video, documents, ...). Giống như các món đồ khác nhau mà chúng ta mua ở Vinmart.

### Vậy chính xác điều gì đã xảy ra?
1. Khi truy cập trang web, trình duyệt sẽ gọi tới máy chủ DNS để biên dịch URL trang web thành một địa chỉ IP, mỗi trang web có địa chỉ IP riêng biệt. Khi tìm thấy địa chỉ IP của trang web chúng ta đang vào, địa chỉ IP đó sẽ được trả về cho trình duyệt.
2. Trình duyệt sẽ sử dụng địa chi IP đó để yêu cầu HTTP gọi tới Server lưu trữ trang web đó. Nó sẽ kết nối cổng số 80 trên Server bằng giao thức TCP/IP.
3. Nếu Server chấp nhận thì sẽ gửi lại thông báo "200 OK". Và sau đó trình duyệt sẽ truy xuất mã HTML của trang web cụ thể được yêu cầu.
4. Khi trình duyệt của bạn nhận được mã HTML đó từ Server thì nó sẽ hiển thị ra cửa sổ của trình duyệt một trang web hoàn chỉnh - awesome!
5. Khi chúng ta đóng trình duyệt thì quá trình kết nối với Server sẽ kết thúc.

## Kết luận
Vậy như trên chúng ta đã cùng tìm hiểu cái nhìn đơn giản về cách thức hoạt động của một trang web. Từ lúc nhập trang web vào trình duyệt cho tới lúc nó hiện thị trang web ra cho chúng ta như nào. Tuy nhiên sâu bên trong nữa nó còn rất nhiều công việc khác để xử lý khi có một request yêu cầu. Và chúng ta sẽ tìm hiểu dần dần vậy, cảm ơn các bạn đã cùng mình tìm hiểu về nó. Bài viết có thể còn sơ sài và mong các bạn cùng chia sẻ với mình để mình học tập thêm. Hẹn các bạn ở bài viết lần sau!

Tài liệu tham khảo:

* https://vi.wikipedia.org
* https://developer.mozilla.org
* https://www.programmerinterview.com/networking/what-happens-when-you-visit-a-website/