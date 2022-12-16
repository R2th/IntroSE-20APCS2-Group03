Android đã được tích hợp các tính năng bảo mật giúp giảm đáng kể tần suất và tác động của các vấn đề bảo mật tới ứng dụng. Hệ thống được thiết kế để bạn có thể xây dựng ứng dụng của mình với các permission, đồng thời tránh các quyết định khó khăn về bảo mật.

Các tính năng bảo mật cốt lõi sau đây giúp bạn xây dựng các ứng dụng an toàn:

* Android Application Sandbox: cách ly dữ liệu ứng dụng của bạn và việc thực thi mã khỏi các ứng dụng khác.
* Framework với các triển khai mạnh mẽ của chức năng bảo mật phổ biến như cryptography, permissions, và IPC.
* Các công nghệ như ASLR, NX, ProPolice, safe_iop, OpenBSD dlmalloc, OpenBSD calloc và Linux mmap_min_addr để giảm thiểu rủi ro liên quan đến các lỗi quản lý bộ nhớ phổ biến.
* Hệ thống tệp được mã hóa có thể được kích hoạt để bảo vệ dữ liệu trên các thiết bị khi bị mất hoặc bị đánh cắp.
* Quyền do người dùng cấp để hạn chế truy cập vào các tính năng hệ thống và dữ liệu người dùng.
* Các quyền do ứng dụng xác định để kiểm soát dữ liệu.

Điều quan trọng là bạn phải quen thuộc với các phương pháp bảo mật Android ở trên. Việc tuân theo các phương pháp này như thói quen viết code làm giảm khả năng vô tình đưa ra các vấn đề bảo mật ảnh hưởng xấu đến người dùng.

## 1. Lưu trữ dữ liệu

Mối quan tâm phổ biến nhất về bảo mật đối với một ứng dụng trên Android là liệu dữ liệu bạn lưu trên thiết bị có thể truy cập được vào các ứng dụng khác hay không. Có ba cách cơ bản để lưu dữ liệu trên thiết bị:

* Internal storage
* External storage
* Content providers

Các mục bên dưới sẽ mô tả các vấn đề bảo mật liên quan đến từng cách tiếp cận.

### 1.1 Internal storage

Theo mặc định, chỉ ứng dụng của bạn mới có thể truy cập các tệp bạn tạo trên internal storage. Android thực hiện bảo vệ này và nó gần như là đủ cho hầu hết các ứng dụng.
Nói chung, tránh các chế độ **MODE_WORLD_WRITEABLE** hoặc **MODE_WORLD_READABLE** cho tệp IPC vì chúng không cung cấp khả năng giới hạn quyền truy cập dữ liệu vào các ứng dụng cụ thể cũng như không cung cấp bất kỳ kiểm soát nào về định dạng dữ liệu. Nếu bạn muốn chia sẻ dữ liệu của mình với các ứng dụng khác, thay vào đó, hãy cân nhắc sử dụng **content provider**, cung cấp quyền đọc và ghi cho các ứng dụng khác và có thể cấp quyền động cho từng trường hợp cụ thể.

Để cung cấp khả năng bảo vệ bổ sung cho dữ liệu nhạy cảm, bạn có thể mã hóa các tệp bằng thư viện Security.

### 1.2 External storage

Các tệp được tạo trên external storage, chẳng hạn như thẻ SD, có thể thoải mái đọc và ghi. Vì external storage có thể bị xóa bởi người dùng và cũng có thể bị sửa đổi bởi bất kỳ ứng dụng nào, vì vậy không nên lưu trữ thông tin nhạy cảm bằng bộ nhớ ngoài.

Để đọc và ghi tệp trên external storage theo cách an toàn hơn, hãy cân nhắc sử dụng thư viện Security, cung cấp class **EncryptedFile**.

Bạn nên thực hiện thêm bước xác thực đầu vào khi xử lý dữ liệu từ external storage như cách bạn làm với dữ liệu từ bất kỳ nguồn không đáng tin cậy nào. Bạn không nên lưu trữ file **exe** hoặc file **class** trên external storage trước khi dynamic loading. Nếu ứng dụng của bạn truy xuất các file **exe** từ external storage, thì các file đó phải được ký và xác minh bằng mật mã trước khi thực hiện dynamic loading.

### 1.3 Content providers

Content providers cung cấp một cơ chế lưu trữ có cấu trúc có thể được giới hạn trong ứng dụng của riêng bạn hoặc được xuất ra để cho phép các ứng dụng khác truy cập. Nếu bạn không có ý định cung cấp cho các ứng dụng khác quyền truy cập vào ContentProvider của mình, hãy  sử dụng cờ: **android: export = false** trong file **Manifest**. Nếu không, hãy đặt cờ: **android: export = true** để cho phép các ứng dụng khác truy cập vào dữ liệu được lưu trữ.

Khi tạo ContentProvider cho các ứng dụng khác sử dụng, bạn có thể chỉ định một quyền duy nhất để đọc và ghi hoặc bạn có thể chỉ định các quyền riêng biệt để đọc và ghi. Bạn nên giới hạn quyền của mình đối với những quyền cần thiết để hoàn thành nhiệm vụ trong tầm tay. Hãy nhớ rằng việc thêm các quyền sau này để hiển thị chức năng mới thường dễ dàng hơn so với việc loại bỏ chúng và tác động đến người dùng hiện tại.

Nếu bạn đang sử dụng Content providers để chỉ chia sẻ dữ liệu giữa các ứng dụng của riêng mình, bạn nên sử dụng thuộc tính **android: protectionLevel = signature**. Quyền đối với chữ ký không yêu cầu xác nhận của người dùng, vì vậy chúng cung cấp trải nghiệm người dùng tốt hơn và quyền truy cập được kiểm soát nhiều hơn vào dữ liệu của Content providers khi các ứng dụng truy cập vào dữ liệu được ký với cùng một khóa.

Content providers cũng có thể cung cấp quyền truy cập chi tiết hơn bằng cách khai báo thuộc tính **android: GrantUriPermissions** và sử dụng các cờ **FLAG_GRANT_READ_URI_PERMISSION** và **FLAG_GRANT_WRITE_URI_PERMISSION** trong activity. Phạm vi của các quyền này có thể được giới hạn thêm bởi phần tử **grant-uri-permission**.

Khi truy cập Content providers, hãy sử dụng các phương thức truy vấn **query()**, **update()** và **delete()** đi kèm tham số để tránh việc đưa dữ liệu vào từ các nguồn không đáng tin cậy. Lưu ý rằng việc sử dụng các phương thức được tham số hóa là không đủ nếu đối số lựa chọn được xây dựng bằng cách nối dữ liệu người dùng trước khi gửi nó tới phương thức.

Hãy cần thận với write permission vì nó cho phép thực hiện các câu lệnh SQL giúp một số dữ liệu có thể được xác nhận bằng cách sử dụng mệnh đề WHERE thông minh cùng với việc phân tích cú pháp kết quả. Ví dụ: kẻ tấn công có thể thăm dò sự hiện diện của một số điện thoại cụ thể trong nhật ký cuộc gọi bằng cách sửa đổi một hàng chỉ khi số điện thoại đó đã tồn tại. Nếu dữ liệu của Content providers có cấu trúc có thể dự đoán được, thì quyền ghi có thể tương đương với việc cung cấp cả đọc và ghi.

## 2. Permissions

Bởi vì Android sandboxes kết nối các ứng dụng với nhau, các ứng dụng phải chia sẻ tài nguyên và dữ liệu một cách rõ ràng. Chúng thực hiện điều này bằng cách khai báo các quyền mà ứng dụng cần cho các khả năng bổ sung không được cung cấp bởi sandbox cơ bản, bao gồm quyền truy cập vào các tính năng của thiết bị như máy ảnh. 

### 2.1 Request permissions

Bạn nên giảm thiểu số lượng quyền mà ứng dụng của bạn yêu cầu. Việc hạn chế truy cập vào các quyền nhạy cảm làm giảm nguy cơ vô tình sử dụng sai các quyền đó, cải thiện sự chấp nhận của người dùng và làm cho ứng dụng của bạn ít bị tấn công hơn. Nói chung, nếu ứng dụng của bạn không cần có quyền để hoạt động, đừng yêu cầu quyền đó. Khi cần bắt buộc sử dụng một quyền nào đó, hãy khai báo tính năng đó bằng phần tử **use-feature** trong file Manifest.

Nếu có thể thiết kế ứng dụng của bạn theo cách không yêu cầu bất kỳ quyền nào, thì điều đó là tốt hơn. Ví dụ: thay vì yêu cầu quyền truy cập vào thông tin thiết bị để tạo số UID, hãy tạo GUID cho ứng dụng của bạn. Hoặc, thay vì sử dụng bộ nhớ ngoài (yêu cầu quyền), hãy lưu trữ dữ liệu trên bộ nhớ trong.

Ngoài việc yêu cầu quyền, ứng dụng của bạn có thể sử dụng phần tử **permission** để bảo vệ các IPC nhạy cảm về bảo mật và được tiếp xúc với các ứng dụng khác, chẳng hạn như ContentProvider. Nói chung, bạn nên sử dụng các điều khiển truy cập khác với các quyền đã được người dùng xác nhận nếu có thể vì các quyền có thể gây nhầm lẫn cho người dùng.

### 2.2 Create permissions    

Nói chung, nên cố gắng xác định càng ít quyền càng tốt trong khi vẫn đáp ứng các yêu cầu bảo mật của mình. Tạo một quyền mới tương đối không phổ biến đối với hầu hết các ứng dụng, bởi vì các quyền do hệ thống xác định bao gồm nhiều trường hợp. Khi thích hợp, hãy thực hiện kiểm tra quyền truy cập bằng cách sử dụng các quyền hiện có.

Nếu bạn phải tạo một quyền mới, hãy xem xét liệu bạn có thể hoàn thành nhiệm vụ của mình với mức signature protection hay không. Quyền đối với chữ ký là minh bạch đối với người dùng và chỉ cho phép truy cập bởi các ứng dụng được ký bởi cùng một nhà phát triển. Nếu quyền mới vẫn được yêu cầu, quyền đó sẽ được khai báo trong  Manifest bằng phần tử **permission**. Các ứng dụng muốn sử dụng quyền mới có thể tham chiếu nó bằng cách thêm phần tử **uses-permission** vào các tệp kê khai tương ứng của chúng. Bạn cũng có thể thêm quyền một cách động bằng cách sử dụng phương thức **addPermission()**.

Nếu bạn tạo quyền với mức dangerous protection, có một số phức tạp mà bạn cần xem xét:

* Quyền phải có một chuỗi diễn đạt chính xác cho người dùng quyết định lựa chọn khi họ được yêu cầu thực hiện.
* Phải được dịch sang nhiều ngôn ngữ khác nhau.
* Người dùng có thể chọn không cài đặt ứng dụng vì một quyền khó hiểu hoặc được coi là rủi ro.
* Các ứng dụng có thể yêu cầu quyền khi người tạo ra quyền đó chưa được cài đặt.

## 3. Networking

Các kết nối trên mạng vốn có rủi ro về bảo mật, vì chúng liên quan đến việc truyền dữ liệu cho người dùng. Mọi người ngày càng nhận thức được những lo ngại về quyền riêng tư của thiết bị di động, đặc biệt là khi thiết bị thực hiện các giao dịch mạng, vì vậy, điều rất quan trọng là ứng dụng của bạn phải triển khai tất cả các phương pháp hay nhất để luôn bảo mật dữ liệu của người dùng.

### 3.1 IP networking

Kết nối mạng trên Android không khác biệt đáng kể so với các môi trường Linux khác. Cân nhắc chính là đảm bảo rằng các giao thức thích hợp được sử dụng cho dữ liệu nhạy cảm, chẳng hạn như **HttpsURLConnection** để có lưu lượng web an toàn. Bạn nên sử dụng HTTPS qua HTTP ở bất kỳ nơi nào mà HTTPS được hỗ trợ trên máy chủ, vì các thiết bị di động thường xuyên kết nối trên các mạng không được bảo mật, chẳng hạn như các điểm truy cập Wi-Fi công cộng.

Xác thực, mã hóa các giao tiếp ở cấp socket được có thể được triển khai dễ dàng bằng cách sử dụng class **SSLSocket**. Với tần suất các thiết bị Android kết nối với mạng không dây không an toàn bằng Wi-Fi, việc sử dụng mạng an toàn được khuyến khích mạnh mẽ cho tất cả các ứng dụng giao tiếp qua mạng.

Đã có một số ứng dụng sử dụng cổng mạng localhost để xử lý IPC nhạy cảm. Bạn không nên sử dụng cách này vì các giao diện này có thể truy cập được bởi các ứng dụng khác trên thiết bị. Thay vào đó, hãy sử dụng cơ chế IPC của Android khi có thể xác thực, chẳng hạn như với service.

Đảm bảo rằng bạn không tin tưởng vào dữ liệu được tải xuống từ HTTP hoặc các giao thức không an toàn khác. Điều này bao gồm xác thực thông tin đầu vào trong WebView và bất kỳ phản hồi nào đối với các ý định được đưa ra chống lại HTTP.

### 3.2 Telephony networking

Giao thức SMS chủ yếu được thiết kế để giao tiếp giữa người dùng với người dùng và không phù hợp cho các ứng dụng muốn truyền dữ liệu. Do những hạn chế của SMS, bạn nên sử dụng Google Cloud Messaging (GCM) và mạng IP để gửi tin nhắn dữ liệu từ máy chủ web đến ứng dụng của bạn trên thiết bị người dùng.

Hãy lưu ý rằng SMS không được mã hóa cũng như không được xác thực mạnh mẽ trên mạng hoặc thiết bị. Đặc biệt, bất kỳ người nhận SMS nào cũng có thể mong đợi rằng một người dùng độc hại có thể đã gửi SMS đến ứng dụng của bạn. Không dựa vào dữ liệu SMS chưa được xác thực để thực hiện các lệnh nhạy cảm. Ngoài ra, bạn nên biết rằng SMS có thể bị giả mạo và/hoặc đánh chặn trên mạng. Trên chính thiết bị hỗ trợ Android, tin nhắn SMS được truyền dưới dạng ý định phát sóng, vì vậy chúng có thể được đọc hoặc ghi lại bởi các ứng dụng khác có quyền READ_SMS.

Ở trên là một số tip hay cho phần sercurity trên Android. Phần kế tiếp của bài viết này sẽ là một số tip khác trong việc validate dữ liệu, sử dụng dữ liệu của người dùng cung cấp, webview, cryptography hay sử dụng native code...