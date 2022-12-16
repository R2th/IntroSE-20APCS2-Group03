Thành phần Sync Adapter trong app của bạn đóng gói code cho các tác vụ chuyển dữ liệu giữa device và server. Dựa trên lịch trình và trình kích hoạt bạn cung cấp trong app của mình, Sync Adapter Framework chạy code trong thành phần Sync Adapter. Để thêm thành phần Sync Adapter vào ứng dụng của bạn, bạn cần thêm các phần sau:

*  Class Sync adapter.

Một Class chứa code truyền dữ liệu của bạn trong một interface tương thích với Sync Adapter Framework.

*  Bound Service

Một thành phần cho phép Sync Adapter Framework chạy code trong class Sync Adapter của bạn.

*  File Sync adapter XML metadata.

File chứa thông tin về bộ Sync Adapter của bạn. Framework đọc file này để tìm hiểu cách tải và lên lịch chuyển dữ liệu của bạn.

*  Khai báo trong file manifest.

Khai báo bound service và XML metadata.

## Tạo 1 sync adapter class

Để tạo thành phần bộ sync adapter, hãy bắt đầu bằng cách extend AbstractThreadedSyncAdapter và viết các hàm contructor của nó. Sử dụng các hàm contructor để chạy các tác vụ thiết lập mỗi lần thành phần Sync Adapter của bạn được khởi động, giống như bạn sử dụng Activity.onCreate () để thiết lập một Activity. Ví dụ: nếu ứng dụng của bạn sử dụng một Content Provider để lưu trữ dữ liệu, hãy sử dụng các contructor để khởi tạo instance của ContentResolver. Kể từ khi contructor thứ 2 được thêm vào trong nền tảng Android phiên bản 3.0 để hỗ trợ đối số parallelSyncs, bạn cần tạo hai contructor để duy trì khả năng tương thích.
Ví dụ sau đây cho bạn thấy cách implement AbstractThreadedSyncAdapter và các hàm contructor của nó:

![](https://images.viblo.asia/56d05fa6-2382-47c4-aacf-e9f6154c1ca4.png)

Thêm code transfer data
Thành phần Sync Adapter không tự động truyền dữ liệu. Thay vào đó, nó đóng gói code transfer data của bạn, để Sync Adapter Framework có thể chạy truyền dữ liệu dưới background, mà không cần sự tham gia từ ứng dụng của bạn. Khi Framework công tác sẵn sàng để đồng bộ hóa dữ liệu của ứng dụng của bạn, nó sẽ gọi bạn thực hiện phương thức onPerformSync ().

Để tạo thuận lợi cho việc chuyển dữ liệu từ code ứng dụng của bạn sang thành phần Sync Adapter , Sync Adapter Framework gọi onPerformSync () với các đối số sau đây:

*  Account

Một đối tượng Account được liên kết với sự kiện đã kích hoạt bộ Sync Adapter. Nếu Server của bạn không sử dụng Account, bạn không cần sử dụng thông tin trong đối tượng này.

*  Extras

Một Bunlde chứa các flag được gửi bởi sự kiện đã kích hoạt bộ Sync Adapter.

*  Authority

Authority của Content Provider trong hệ thống. Ứng dụng của bạn phải có quyền truy cập vào provider này.

*  Content provider client

ContentProviderClient cho Content Provider được chỉ định bởi đối số quyền hạn. ContentProviderClient là một interface cho một Content Provider. Nó có chức năng cơ bản giống như một ContentResolver. Nếu bạn đang sử dụng Content Provider để lưu trữ dữ liệu cho ứng dụng của mình, bạn có thể kết nối provider với đối tượng này. Nếu không, bạn có thể bỏ qua nó.

*  Sync result

Một đối tượng SyncResult mà bạn sử dụng để gửi thông tin đến Sync Adapter Framework.

Đoạn code sau đây cho thấy cấu trúc tổng thể của onPerformSync ():

![](https://images.viblo.asia/0c3d2039-8d12-4a1a-861d-d7509c59597d.png)

Mặc dù việc triển khai thực tế onPerformSync () dành riêng cho các yêu cầu sync data của ứng dụng và giao thức kết nối máy chủ, nhưng có một số tác vụ chung mà triển khai của bạn nên thực hiện:

### Kết nối đến 1 server
Vì Sync Adapter Framework không tự động kết nối với máy chủ.

### Downloading và uploading dữ liệu
Bộ Sync Adapter không tự động hóa bất kỳ tác vụ truyền dữ liệu nào. Nếu bạn muốn tải xuống dữ liệu từ máy chủ và lưu trữ dữ liệu trong Content Provider, bạn phải viết code request dữ liệu, tải xuống và insert vào provider. Tương tự, nếu bạn muốn gửi dữ liệu đến server, bạn phải đọc dữ liệu từ một file, cơ sở dữ liệu hoặc provider và gửi request tải lên cần thiết. Bạn cũng phải xử lý các lỗi mạng xảy ra trong khi truyền dữ liệu của bạn đang chạy.

### Xử lý xung đột dữ liệu
Bộ Sync Adapter không tự động xử lý xung đột giữa dữ liệu trên Server và dữ liệu trên thiết bị. Ngoài ra, nó không tự động phát hiện nếu dữ liệu trên máy chủ mới hơn dữ liệu trên thiết bị hoặc ngược lại. Thay vào đó, bạn phải cung cấp các thuật toán của riêng bạn để xử lý tình huống này.

### Clean up.
Luôn luôn đóng các kết nối đến server và dọn dẹp các tập tin tạm thời và lưu trữ vào cuối phiên transfer data của bạn.