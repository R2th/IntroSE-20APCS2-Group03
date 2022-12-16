## Liên kết Sync Adapter với Framework
Sau khi bạn có code transfer data được đóng gói trong thành phần Sync Adapter, nhưng bạn phải cung cấp quyền truy cập cho Framework vào code của bạn. Để thực hiện điều này, bạn cần tạo một Bound Sevice để chuyển một đối tượng liên kết từ thành phần Sync Adapter đến Framework. Với đối tượng liên kết này, Framework có thể gọi phương thức onPerformSync () và truyền dữ liệu đến nó.

Khởi tạo sync adapter component như là 1 singleton trong phương thức onCreate() của Service.


Khởi tạo thành phần Sync Adapter của bạn dưới dạng singleton trong phương thức onCreate () của dịch vụ. Bằng cách khởi tạo thành phần trong onCreate (), bạn trì hoãn việc tạo nó cho đến khi dịch vụ bắt đầu, điều này xảy ra khi Framework đầu tiên cố gắng chạy transfer data của bạn. Bạn cần khởi tạo component trong một thread-safe.
Ví dụ: đoạn code sau đây là cách tạo lớp implement Bound Service, khởi tạo thành phần Sync Adapter của bạn và nhận đối tượng kết nối Android:

![](https://images.viblo.asia/23aaac12-53b2-437b-be62-03b96e7aaee2.png)

### Thêm Account theo yêu cầu của Framework
Sync Adapter Framework yêu cầu mỗi bộ Sync Adapter phải có loại account. Bạn đã khai báo giá trị loại Account trong phần Thêm file metadata Authenticator. Bây giờ bạn phải thiết lập loại tài khoản này trong hệ thống Android. Để thiết lập loại tài khoản, hãy thêm tài khoản sử dụng loại tài khoản bằng cách gọi addAccountExplicitly ().

Nơi tốt nhất để gọi phương thức là trong phương thức onCreate () của launch activity của bạn. Đoạn code sau đây cho bạn thấy cách thực hiện điều này:

![](https://images.viblo.asia/086cbc73-1040-4ea1-af7c-a7e450a88a97.png)

### Thêm file sync adapter metadata

Để cắm thành phần Sync Adapter của bạn vào Framework, bạn cần cung cấp cho Framework với metadata mô tả thành phần và cung cấp thêm cờ. Metadata chỉ định loại account bạn đã tạo cho bộ Sync Adapter, khai báo quyền của content provider được liên kết với ứng dụng của bạn, kiểm soát một phần user interface hệ thống có liên quan đến bộ sync adapter và khai báo các cờ liên quan đến đồng bộ hóa khác. Khai báo metadata này trong một tệp XML đặc biệt được lưu trữ trong thư mục / res / xml / trong project của bạn. Bạn có thể đặt tên bất kỳ cho tệp, mặc dù nó thường được gọi là syncadapter.xml.

Tệp XML này chứa một phần tử XML duy nhất có các thuộc tính sau:

* android:contentAuthority
URI cho nhà Content Provider của bạn. Nếu bạn đã tạo Stub Content Provider cho ứng dụng của mình trong bài viết trước, hãy sử dụng giá trị bạn chỉ định cho thuộc tính android: authority trong phần tử bạn đã thêm vào tệp Manifest ứng dụng của mình. Nếu bạn đang chuyển dữ liệu từ Content Provider sang Server bằng bộ Sync Adapter của mình, giá trị này phải giống với URI content bạn đang sử dụng cho dữ liệu đó. Giá trị này cũng là một trong các quyền bạn chỉ định trong android:authorities thuộc tính của phần tử <provider>  khai báo trong tệp Manifest của ứng dụng.

* android:accountType
Loại tài khoản được yêu cầu bởi Sync Adapter Framework. Giá trị phải giống với giá trị loại tài khoản bạn đã cung cấp khi tạo tệp metadata của trình authenticator, như được mô tả trong phần Thêm tệp metadata Authenticator. 

Settings attributes

* android:userVisible
Đặt chế độ hiển thị của loại tài khoản của Sync Adapter. Theo mặc định, biểu tượng tài khoản và nhãn được liên kết với loại tài khoản được hiển thị trong phần Tài khoản của ứng dụng Cài đặt của hệ thống, vì vậy bạn nên tắt bộ Sync Adapter trừ khi bạn có loại tài khoản hoặc domain dễ dàng liên kết với ứng dụng của mình. Nếu bạn vô hiệu hóa loại tài khoản của mình, bạn vẫn có thể cho phép người dùng kiểm soát bộ điều hợp đồng bộ hóa với giao diện người dùng trong một trong các activity của ứng dụng của bạn.

* android:supportsUploading
Cho phép bạn tải dữ liệu lên cloud. Đặt điều này thành false nếu ứng dụng của bạn chỉ tải xuống dữ liệu.

* android:allowParallelSyncs
Cho phép nhiều phiên bản của thành phần bộ Sync Adapter của bạn chạy cùng một lúc. Sử dụng điều này nếu ứng dụng của bạn hỗ trợ nhiều Account người dùng và bạn muốn cho phép nhiều người dùng chuyển dữ liệu song song. Cờ này không có hiệu lực nếu bạn không bao giờ chạy nhiều lần truyền dữ liệu.

* android:isAlwaysSyncable
Chỉ ra khuôn khổ bộ Sync Adapter mà nó có thể chạy bất cứ lúc nào bạn đã chỉ định. Nếu bạn muốn kiểm soát theo chương trình khi bộ Sync Adapter của bạn có thể chạy, hãy đặt cờ này thành false và sau đó gọi requestSync () để chạy bộ điều hợp đồng bộ hóa. 

![](https://images.viblo.asia/75e7fd89-e7a5-411f-9f03-922c2ee512d6.png)

## Khai báo sync adapter trong Manifest
Để yêu cầu các quyền, hãy thêm những thông tin sau vào file Manifest của bạn:

![](https://images.viblo.asia/9a66b791-4d0c-4043-8ab1-31fc9d01a401.png)

Cuối cùng là khai báo Bound Service mà Framework dùng để tương tác với bộ Sync Adapter của bạn, hãy thêm XML sau vào file Manifest:

![](https://images.viblo.asia/c928c241-1dec-42f1-92b1-e3b20525923a.png)