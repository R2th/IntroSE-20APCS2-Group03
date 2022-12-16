Đồng bộ hóa dữ liệu giữa thiết bị Android và Server có thể làm cho ứng dụng của bạn hữu ích hơn và hấp dẫn hơn với người dùng.
Ví dụ, chuyển dữ liệu đến một Server tạo một bản Backup hữu ích và chuyển dữ liệu từ máy chủ sẽ cung cấp dữ liệu cho người dùng ngay cả khi thiết bị ngoại tuyến. Trong một số trường hợp, người dùng có thể dễ dàng nhập và chỉnh sửa dữ liệu của họ trong giao diện web và dữ liệu đó sẽ được đồng bộ về trên thiết bị của họ hoặc họ có thể muốn thu thập dữ liệu theo thời gian và sau đó tải dữ liệu lên storage center.
Mặc dù bạn có thể thiết kế hệ thống của riêng của mình để thực hiện truyền dữ liệu trong ứng dụng, nhưng bạn nên cân nhắc về việc sử dụng Sync Adapter framework của Android. Framework này giúp quản lý và tự động chuyển dữ liệu và điều phối các hoạt động đồng bộ hóa trên các ứng dụng khác nhau. Khi bạn sử dụng khung này, bạn có thể tận dụng một số tính năng không có sẵn cho các lược đồ truyền dữ liệu mà bạn tự thiết kế:
1. Kiến trúc Plug-in
Cho phép bạn thêm code để transfer data vào hệ thống dưới dạng các callable components.
2. Tự động thực thi
Cho phép bạn tự động chuyển dữ liệu dựa trên nhiều tiêu chí khác nhau, bao gồm thay đổi dữ liệu, thời gian trôi qua hoặc thời gian trong ngày. Ngoài ra, hệ thống sẽ thêm các lần transfer data đến hàng đợi và chạy chúng khi có thể.
3. Tự động kiểm tra network state
Hệ thống chỉ chạy dữ liệu của bạn khi thiết bị có kết nối mạng.
4. Cải thiện hiệu suất pin
Cho phép bạn tập trung tất cả các tác vụ chuyển dữ liệu của ứng dụng vào một nơi để tất cả chúng chạy cùng một lúc. Việc truyền dữ liệu của bạn cũng được lên lịch cùng với việc truyền dữ liệu từ các ứng dụng khác. Những yếu tố này làm giảm số lần hệ thống phải bật mạng, làm giảm mức sử dụng pin.
5. Quản lý và xác thực tài khoản
Nếu ứng dụng của bạn yêu cầu thông tin đăng nhập của người dùng hoặc thông tin đăng nhập máy chủ, bạn có thể tích hợp tùy chọn quản lý và xác thực tài khoản vào transfer data của mình.

Ở phần này sẽ hướng dẫn cách tạo Authenticator
Sync Adapter framework giả định rằng bộ sync adapter của bạn truyền dữ liệu giữa device được kết hợp với tài khoản và server yêu cầu quyền truy cập đăng nhập. Vì lý do này, framework mong muốn bạn cung cấp một thành phần được gọi là Authenticator như là một phần của Sync Adapter của bạn. Thành phần này cắm vào các tài khoản Android và framework và cung cấp một giao diện chuẩn để xử lý thông tin đăng nhập của người dùng, chẳng hạn như thông tin đăng nhập.
Ngay cả khi ứng dụng của bạn không sử dụng tài khoản, bạn vẫn cần phải cung cấp thành phần xác thực. Nếu bạn không sử dụng tài khoản hoặc đăng nhập máy chủ, thông tin được xử lý bởi trình xác thực bị bỏ qua, vì vậy bạn có thể cung cấp một thành phần xác thực có chứa các phương thức triển khai phương thức gốc. Bạn cũng cần cung cấp một Service bị ràng buộc cho phép sync adapter framework gọi các phương thức của trình xác thực.
Để thêm một thành phần xác thực gốc vào ứng dụng của bạn, hãy tạo một class extend AbstractAccountAuthenticator và sau đó phân tách các phương thức được yêu cầu, hoặc bằng cách trả về null hoặc bằng cách ném một ngoại lệ.
Đoạn code sau đây cho thấy một ví dụ về một class Authenticator:

![](https://images.viblo.asia/28426d1e-f96e-41ec-bedd-981e93b67dc6.png)

Liên kết xác thực với Framework
Để cho Sync Adapter Framework truy cập vào Authenticator của bạn, bạn phải tạo một Service bị ràng buộc cho nó. Dịch vụ này cung cấp một đối tượng kết dính Android cho phép framework gọi Authenticator của bạn và transfer data giữa Authenticator và Framework.
Vì framework khởi động Service này lần đầu tiên cần truy cập Authenticator, bạn cũng có thể sử dụng Service để khởi tạo Authenticator, bằng cách gọi hàm tạo Authenticator trong phương thức Service.onCreate () của dịch vụ.
Đoạn code sau đây cho bạn biết cách xác định bound Service:

![](https://images.viblo.asia/ca0f9e91-4312-4514-a8dc-69fd329736bd.png)

Thêm authenticator metadata file
Để cắm thành phần authenticator của bạn vào Sync adapter và account framework, bạn cần phải cung cấp các framework này với metadata mô tả thành phần. Metadata này khai báo loại tài khoản bạn đã tạo cho bộ Sync adapter và khai báo các phần tử user interface mà hệ thống hiển thị nếu bạn muốn làm cho loại tài khoản của mình hiển thị cho người dùng. Khai báo siêu dữ liệu này trong tệp XML được lưu trữ trong thư mục / res / xml / trong dự án ứng dụng của bạn. Bạn có thể đặt tên bất kỳ cho tệp, mặc dù nó thường được gọi là authenticator.xml.
Tệp XML này chứa một phần tử duy nhất <account-authenticator> có các thuộc tính sau:

android:accountType
Sync adapter framework yêu cầu mỗi sync adapter phải có loại tài khoản, dưới dạng tên miền. Framework sử dụng loại tài khoản như một phần của nhận dạng nội bộ của sync adapter. Đối với các máy chủ yêu cầu đăng nhập, loại tài khoản cùng với tài khoản người dùng được gửi đến máy chủ như một phần của thông tin xác thực đăng nhập. Nếu máy chủ của bạn không yêu cầu đăng nhập, bạn vẫn phải cung cấp loại tài khoản. Đối với giá trị, sử dụng một tên miền mà bạn kiểm soát. Trong khi framework sử dụng nó để quản lý bộ sync adapter của bạn, thì giá trị đó không được gửi đến máy chủ của bạn.

android:icon
Con trỏ đến Resource chứa icon. Nếu bạn làm cho bộ sync adapter hiển thị bằng cách chỉ định thuộc tính android: userVisible = "true" trong res / xml / syncadapter.xml, thì bạn phải cung cấp tài nguyên biểu tượng này. Nó xuất hiện trong phần Tài khoản của ứng dụng Cài đặt của hệ thống.

android:smallIcon
Con trỏ đến Resource chứa small icon. Tài nguyên này có thể được sử dụng thay cho biểu tượng android: icon trong phần Tài khoản của ứng dụng Cài đặt của hệ thống, tùy thuộc vào kích thước màn hình.

android:label
String để xác định loại tài khoản cho người dùng. Nếu bạn làm cho bộ sync adapter hiển thị bằng cách chỉ định thuộc tính android: userVisible = "true" trong res / xml / syncadapter.xml, thì bạn nên cung cấp chuỗi này. Nó xuất hiện trong phần Tài khoản của ứng dụng Cài đặt của hệ thống, bên cạnh biểu tượng bạn xác định cho Authenticator.

Đoạn code sau hiển thị tệp XML cho Authenticator của bạn đã tạo trước đó:

![](https://images.viblo.asia/89c84088-f07f-4e27-bfb9-633c02adf5f6.png)

Khai báo Authenticator trong file manifest
Trong bước trước, bạn đã tạo một bound Service liên kết Authenticator với Sync adapter framework. Để xác định dịch vụ này cho hệ thống, hãy khai báo nó trong file manifest của ứng dụng bằng cách thêm phần tử sau làm phần tử con của <application>:

![](https://images.viblo.asia/0c4f30b9-dc36-4704-8fff-1ffb2c55672e.png)

Phần tiếp theo tôi sẽ hướng dẫn cách tạo 1: Stub content provider