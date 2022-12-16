# Lời nói đầu

Microsoft Azure là nền tảng tính toán đám mây được xây dựng bởi Microsoft dành cho xây dựng, kiểm thử, triển khai và quản lý các ứng dụng và dịch vụ thông qua mạng lưới trung tâm dữ liệu được quản lý bởi Microsoft. Nó cung cấp các phần mềm, nền tảng, và hệ thống cơ sở hạ tầng như các dịch vụ hỗ trợ nhiều ngôn ngữ lập trình, framework, công cụ khác nhau.

Các dịch vụ mà Azure cung cấp:

* Compute:
* Mobile services.
* Storage services.
* Data management.
* Messaging.
* Media services.
* CDN
* Developer
* Managemet
* Machine learning
* IoT

Ở phần này mình sẽ giới thiệu về storage services - Azure storage là một dịch vụ quản lý nhằm mục đích cung cấp giải pháp cho lưu trữ đám mây cho các dữ liệu hiện nay. Azure storage cung cấp các kho lưu trữ dữ liệu là các đối tượng khác nhau: kho các file dữ liệu cho hệ thống file, kho lưu trữ các tin nhắm cho các kênh tin nhắn bảo mật, kho lưu trữ dữ liệu NoSQL.

Các đặc điểm nổi bật của Azure Storage:

* Bền vững và luôn sẵn sàng.
* An toàn.
* Có khả năng mở rộng
* Được quản lý bởi Microsoft trong trường hợp cần bảo trì hoặc các vấn đề nghiêm trọng.
* Có khả năng truy cập đẽ dàng thông qua HTTP, HTTPs bằng các REST Api được cung cấp bởi Microsoft.

Azure Storage bao gồm các dịch vụ:

* Azure Blobs: giải pháp cho việc lưu trữ nhiều loại dữ liệu khác nhau trên đám mây. Blob được tối ưu để lưu trữ một lượng lớn các dữ liệu không các cấu trúc như text, các dữ liệu nhị phân. Các đói tượng lưu trữ trong Blob có thể truy cập từ mọi nơi thông qua HTTP hoặc HTTPs. Blob thường dùng để:

    * Lưu ảnh, các tài liệu.
    * Lưu các file cần cho truy cập phân tán.
    * Streaming video và audio.
    * Lưu trữ dữ liệu cho việc sao lưu và phục hồi.
    * Lưu trữ dữ liệu dùng để phân tích.

* Azure Files: cho phép ta thiết lập một mạng lưới network để chia sẻ file và có thể truy cập sử dụng giao thức Server Message Block (SMB). Điều này có nghĩa các VMs (virtual machine) có thể chia sẻ cùng các file với quyền đọc và ghi. Các file cũng có thể truy cập sử dụng các REST Aoi hoặc các thư viện khác nhau.

* Azure queue: được sử dụng để lưu trữ và lấy lại các tin nhắn. Queue có thể lên đến kích thước 64KB và một queue có thể chưa đén hàng triệu tin nhắn. Các queue thường được sử dụng để lưu trữ danh sách các tin nhắm cần được xử lý bất đồng bộ.

* Azure Tables: Dùng để lư trữ các dữ liệu NoSQL.

# Thiết lập Azure Blob để lưu trữ dữ liệu.

Hầu hết các ứng dụng hiện nay đều cho phép người dùng upload file: video, ảnh, audio, tài liệu... Azure Blob cho phép ta lưu trữ dễ dàng các file đó trên đám mây và dễ dàng truy cập thông qua url hoặc các Api mà Azure cung cấp. Để tạo một kho lưu trữ file Blobs cần thực hiện các bước sau:

## Tạo tài khoản trên Azure.

Để sử dụng Azure tất nhiên cần có tài khoản trên Microsoft Azure. Bạn có thể tạo tài khoản thông qua đường link này https://login.live.com và tạo tài khoản theo hướng dẫn. Sau khi tạo tại khoản bạn cần truy cập vào https://azure.microsoft.com/en-us/ để tiến hành đăng nhập vào tài khoản mới tạo.

Sau khi đăng nhập ta sẽ được chuyển về trang chủ https://azure.microsoft.com/en-us/, lúc này click vào đường dẫn Portal để bắt đầu sử dụng các dịch vụ của Azure.

![](https://images.viblo.asia/d188974d-5cd1-48bd-aefd-fef47858a895.PNG)

## Thiết lập Storage account.

Sau khi vào Portal thì giao diện các dịch vụ của Azure sẽ hiện ra như hình dưới.

![](https://images.viblo.asia/d6ad1734-4c7b-458b-9541-317ece9ac522.PNG)

Lúc này để tạo Storage account ta click vào menu Storage accounts và màn hình về các storage accounts sẽ hiện ra. Màn hình này sẽ liệt kê danh sách các account mà ta đã tạo cùng các thông tin của nó.

![](https://images.viblo.asia/9bb8d5ad-af00-4751-b0b7-4353602e4d67.PNG)

Để thêm mới một account ta click vào Add, và điền đây đủ các thông tin cần thiết vào form để tạo account bao gồm:

![](https://images.viblo.asia/4390bc08-4fba-41ce-a92d-30926afb7fe3.PNG)

* Name: tên của account, tên này là duy nhất trên toàn bộ hê thống Azure Storage, từ 3 - 24 ký tự và chỉ có thể chứa các chữ cái viết thường hoặc chữ số.

* Deloyment model: nếu cần phát triển một ứng dụng mới ta chọn Resource manager, còn chọn Classic trong trường hợp ta đã có một ứng dụng đã được triển khai trong mạng ảo Classic.

* Account kind: có 3 lựa chọn - với Storage (general purpose v1) và StorageV2 (general purpose v2) cho phép lưu trữ các blobs, files, tables, và queues trong cùng một account. Blob storage chỉ dùng để lưu trữ dữ liệu blob và hỗ trợ việc chọn tầng truy cập (cái cho phép ta tần suất là dữ liệu trong account được truy cập). Vì ở đây ta đang tìm hiểu về Azure Blobs nên ta chọn Blob storage.

* Location: Chọn vị trí địa lý phù hợp với nơi ta triển khai ứng dụng.

* Replication: Lựa chọn khả năng tái tạo dữ liệu để đảm bảo khả năng lưu trữ lâu dài của dữ liệu.

* Performace: với lựa chọn standard thì account sẽ được thiết lập để lưu trữ trên các ổ đĩa từ và giá của nó sẽ là rẻ nhất cho mỗi GB, lựa chọn này tốt nếu với các ứng dụng mà dữ liệu lưu trữ được truy cập không thường xuyên. Còn với Premium thì dữ liệu sẽ được lưu trữ trên các ổ đía SSD và độ trên khi phản hời thấp (Tuy nhiên để sử dụng option này tài khoản Azure cần nâng cấp, với tài khoản free trial).

* Access tier: lựa chọn này có 2 option tùy thuộc vào tần suất dữ liệu được sử dụng. Hot Access Tier là lựa chọn với ứng dụng cần truy xuất dữ liệu thường xuyên, Cool Access Tier là lựa chọn cho ứng dụng truy cập dữ liệu không thường xuyên.

* Secure transfer required: Là tùy chọn tăng cường tính bảo mật cho storage account bằng việc chỉ cho phép các yêu cầu tới storage account thông qua các kết nối an toàn ví dụ như sử dụng HTTPs.

* Subscription: chọn các sử dụng, đối với tài khoản free chỉ có lựa chọn Free Trial.

* Resource group: ta có thể tạo mới hoặc sử dụng group tài nguyên có sẵn.

* Còn 2 lựa chọn cuối chỉ sử dụng được khi ta upgrade tài khoản lên.

Sau khi bấm create một storage account sẽ được tạo cho chúng ta và sẽ xuất hiện trên màn hình quản lý.

![](https://images.viblo.asia/516e6442-132e-49df-ab41-467a01f583a2.PNG)

## Làm việc với storage account

Để làm việc, thiết lập và quản lý storage account ta click vào tên storage mà ta mới tạo một màn hình thông tin quản lý sẽ xuất hiện

![](https://images.viblo.asia/9b031c0e-2330-4cf8-bb18-d84f4819b44d.PNG)

Ở đây một vài menu sẽ cung cấp các thông tin về storage account như: các thông tin về trạng thái, các lựa chọn mà ta đã chọn khi tạo storage account, các biểu đồ giám sát lưu lượng, độ trễ và request...

Để bắt đầu quản lý việc lưu trữ các blob ta cần tạo ra blobs container để có thể lưu trữ. Click vào menu Blobs màn hình quản lý blob container sẽ hiện ra. Tại màn hình này click vào container để thêm container.

![](https://images.viblo.asia/1cd4476e-4b98-46ff-9431-37fe05353151.PNG)

Điền thông tin tên của blob và chọn việc dữ liệu trong blob có được truy cập công khai không để tạo blob container. Như vậy một blob container đã được tạo và ta có thế sử dụng storage account cùng blob container để lưu trữ các file blob.

![](https://images.viblo.asia/9896d139-5859-4b1c-9d20-dfe0a8b91c74.PNG)

Khi truy cập vào blob container màn hình quản lý các file trong container sẽ xuất hiện.

![](https://images.viblo.asia/2f930adf-6dec-4240-9b79-c5694e059033.PNG)

Như vậy ta đã có thể upload file lên Azure Blob Storage và sử dụng nó. Có rất nhiều cách để upload và lưu trữ file: upload trực tiếp, sử dụng api của Microsoft Azure, một số thư viện cho phép upload file lên azure thông qua file system.

# Tài liệu tham khảo

1.) https://docs.microsoft.com/en-us/azure/storage/