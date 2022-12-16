![](https://images.viblo.asia/01ad796d-b476-4393-be4a-7314250a006f.jpeg)

Khi xây dựng bất kì một ứng dụng nào, chúng ta đều cần phải có một cơ chế đáng tin cậy để giao tiếp giữa các thành phần của nó.

Ví dụ, với một ứng dụng web, ta cần phải giao tiếp giữa trình duyệt và server. Đôi khi, server cần gửi lại một vài messages cho trình duyệt. Bên cạnh đó, còn có một vài trường hợp, phía backend phụ thuộc vào dịch vụ bên thứ ba, làm tốn nhiều thời gian để giao tiếp.

Đây là khi APIs, WebSockets và WebHooks được ứng dụng vào. Chúng cung cấp một cơ chế hoàn hảo để giao tiếp và đồng bộ dữ liệu giữa các thành phần của một ứng dụng. Mặc dù nhứng phương pháp, giao thức này đều chú trọng tới việc giao tiếp, nhưng vẫn có những sự khác biệt giữa chúng. Vì vậy trong bài này, tôi sẽ trình bày cách hoạt động của 3 phương thức này và cách làm sao để chúng ta có thể chọn được phương thức phù hợp nhất tùy theo hoàn cảnh hiện tại.

# APIs
API hoặc là Application Programming Interface là một cách kết nối giữa người dùng và phía cung cấp dịch vụ thông qua HTTP.
Phương pháp này rất phù hợp để sử dụng trong trường hợp thực thi các lệnh CRUD cơ bản trên web, mobile, hoặc giữa các service với nhau. Các giao tiếp chủ yếu được thực hiện dựa vào JSON hoặc XML để truyền dữ liệu.

Lấy ví dụ như user cần tìm kiếm product trên một trang web thương mại điện tử. Khi người dùng gửi yêu cầu tìm thứ mà người đó muốn sử dụng một search query, người đó sẽ nhận được một phản hồi (response) trong vòng vài giây. Đó là qui trình cơ bản của API.

![](https://images.viblo.asia/308c1833-1934-46ab-addc-e583dfd7ed85.png)


Như đã được đề cập từ đầu, request của API được tạo bởi người dùng. Vì vậy, chúng rất phù hợp để sử dụng cho các ứng dụng muốn toàn vẹn trạng thái hoặc thực thi nhanh một hành dộng để nhận kết quả ngay lập tức từ phía backend.

Tuy nhiên, nếu server cần giao tiếp với trình duyệt, thì không có cách nào khác khi sử dụng API, trừ khi trình duyệt kiểm tra định kỳ để cập nhật nội dung mới.

Lấy ví dụ, các task như tạo báo cáo có thể tốn khá nhiều thời gian và tài nguyên khi được thực thi ở background. Vì vậy, một khi người dùng muốn phía cung cấp dịch vụ tạo một bản báo cáo thì không có cách nào trực tiếp để thông báo kết quả cho người dùng. Trình duyệt có thể sẽ phải thu thập thông tin từ API một cách liên tục.

Tuy nhiên, cách đó lại không mang lại hiệu quả cao, vì vậy mới có các phương pháp tốt hơn để đối phó với những trường hợp như vậy ví dụ như là WebSockets chẳng hạn.

# WebSockets

WebSockets cung cấp một phương thức giao tiếp qua lại hai chiều một cách bền vững giữa người dùng và phía cung cấp dịch vụ.

Một kênh giao tiếp hai chiều như vậy cho phép phía cung cấp dịch vụ có thể truyền thông điệp bất cứ lúc nào. Hiện nay, hầu như mọi trình duyệt đều hỗ trợ WebSockets, vì thế, đây là lựa chọn tốt nhất cho các ứng dụng web thời gian thực.

![](https://images.viblo.asia/490ae3d7-53f1-478b-8123-b485fc65ba27.png)

Tuy nhiên, việc giữ cho kết nối được mở liên tục có thể tiêu tốn nhiều tài nguyên, tốn điện (với các thiết bị di động).

Ví dụ, nếu chúng ta vẫn sử dụng kịch bản tạo báo cáo như ở các ví dụ trước, sử dụng WebSockets là một lựa chọn tuyệt vời. Tuy nhiên, nó có thể không phải là lựa chọn hàng đầu đối với các thiết bị di động. Bên cạnh đó, nếu phía backend có phụ thuộc vào các dịch vụ bên thứ ba để tạo báo cáo, WebSockets lại càng phông phải là lựa chọn tốt nhất.

Đó chính là khi chúng ta nên sử dụng WebHooks.

![](https://images.viblo.asia/2bd68689-1c90-428f-b524-79d9dfe82128.png)

# WebHooks
WebHooks cung cấp một phương pháp để giải quyết các vấn đề khó khăn của WebSockets bằng cách cung cấp một cơ chế ngắt kết nối để nhận được thông điệp phản hồi từ phía cung cấp dịch vụ.

Nhìn theo khía cạnh technical, phía người dùng đăng ký WebHook (một callback URL) với phía cung cấp dịch vụ, và URL đó sẽ đóng vai trò là một nơi để nhận dữ liệu từ WebHook.

Với hầu hết các trường hợp, URL này thuộc về một server khác, và WebHooks được sử dụng chủ yếu để giao tiếp giữa các server hoặc các tiến trình phía backend.

Chúng ta có thể chia quá trình trên thành bốn phần:

![](https://images.viblo.asia/9862a353-7098-42bd-853c-953e1441ccc6.png)

* Kích hoạt event: Đây là event được sử dụng để chạy WebHook. Mỗi lần event được kích hoạt, WebHook sẽ bắt đầu làm việc.
* Phía cung cấp WebHook tạo WebHook và gửi các POST request: Phía cung cấp WebHook chịu trách nhiệm quản lý các event và tạo WebHook. Một khi event được kích hoạt, phía cung cấp WebHook sẽ gửi POST HTTP request tới các ứng dụng bên thứ ba.
* Ứng dụng bên thứ ba nhận dữ liệu: Ứng dụng bên thứ ba sẽ nhận dữ liệu từ URL hoặc listener được giao cho phía cung cấp WebHook khi đăng ký.
* Thực thi hành động được mô tả trong ứng dụng bên thứ ba: Một khi ứng dụng nhận được POST request, lập trình viên có thể sử dụng dữ liệu để làm những điều họ muốn.

Trên bề ngoài, ta có thể thấy các quá trình trên ngược lại hoàn toàn so với API, vì vậy nhiều người cho WebHooks chính là phiên bản ngược của APIs

# Kết luận
Như tôi đã từng đề cập, WebHooks, WebSockets và APIs phục vụ chủ yếu cho việc giao tiếp, chúng cũng có rất nhiều cách sử dụng.

APIs là lựa chọn tốt nhất cho các ứng dụng cần thực thi các lệnh CRUD cơ bản và đồng bộ các thông điệp phản hồi. Đồng thời, APIs có thể được dùng với cả ứng dụng web và ứng dụng trên các thiết bị di động và các dịch vụ tích hợp một cách dễ dàng.

Nhưng nếu ứng dụng web của bạn yêu cầu giao tiếp thời gian thực với backend, thì WebSockets lại là một lựa chọn tuyệt vời hơn. Nó cho phép chúng ta có thể thiết lập một kênh giao tiếp hai chiều giữa trình duyệt và backend.

Tuy nhiên, WebHooks lại có đôi chút khác biệt với APIs và WebSockets. Một khi phía người dùng đăng ký URL WebHook với phía cung cấp dịch vụ, WebHook có thể được gọi khi cần tới.

Tôi nghĩ giờ bạn đã hiểu được sự khác biệt giữa các phương thức giao tiếp này trong các trường hợp cụ thể. 
Cảm ơn vì đã dành thời gian đọc bài viết của tôi!!!

Dịch từ bài viết: https://blog.bitsrc.io/apis-vs-websockets-vs-webhooks-what-to-choose-5942b73aeb9b