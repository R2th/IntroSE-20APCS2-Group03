# Giới thiệu 
Firebase của Google cung cấp hai loại cơ sở dữ liệu NoSQL cho người dùng có thể  lưu trữ cơ sở dữ liệu đám mây và là giải pháp cho các ứng dụng di động với dữ liệu được đồng bộ hoá theo thời gian thực - Realtime Database và Cloud Firestore. 

Giải pháp cho xây dựng ứng dụng không Server
![](https://images.viblo.asia/d9e48db4-71df-4d3a-b050-d522e9f614e4.png)
## Firebase Realtime Database là gì ?
Firebase Realtime Database là một cơ sở dữ liệu NoSQL được lưu trữ đám mây cho phép bạn lưu trữ và đồng bộ dữ liệu. Dữ liệu được lưu trữ dưới dạng JSON và được đồng bộ hóa theo thời gian thực cho mọi máy kết nối. 

Khi bạn xây dựng các ứng dụng đa nền tảng với SDK iOS, Android và JavaScript, tất cả các client của bạn sẽ chia sẻ một phiên bản Realtime Database và tự động cập nhật với dữ liệu mới nhất. Do đó đối với các ứng dụng di động yêu cầu trạng thái đồng bộ hóa giữa các máy trong thời gian thực thì đây là một giải pháp hiệu quả và có độ trễ thấp.
![](https://images.viblo.asia/6afba404-c67c-4e54-b605-c8b50f741571.jpg)
### Tính năng chính
- Realtime : Firebase sử dụng đồng bộ hoá dữ liệu ,mỗi khi dữ liệu thay đổi mọi thiết bị kết nối sẽ nhận được thay đổi lập tức.

- Offline :  Ứng dụng sử dụng Firebase vẫn khả dụng khi ngoại tuyến vì Firebase Realtime Database SDK vẫn lưu dữ liệu của bạn trên local. Khi kết nối được thiết lập lại, thiết bị sẽ được cập nhật thay đổi nào đã bỏ lỡ và đồng bộ hóa dữ liệu hiện tại với máy chủ.

- Sử dụng cho nhiều thiết bị : Firebase Realtime Database có thể được truy cập trực tiếp từ thiết bị di động hoặc trình duyệt web.

- Khả năng mở rộng thông qua kết hợp cơ sở dữ liệu : Với Firebase Realtime Database trên gói Blaze (bản trả phí) cho phép mở rộng qua việc sử dụng kết hợp nhiều database trong cùng một Firebase project. 
### Cách hoạt động
Firebase Realtime Database cho phép bạn xây dựng các ứng dụng dễ dàng, đa dạng ,an toàn với cơ sở dữ liệu trực tiếp từ client. Dữ liệu được duy trì cục bộ và ngay cả khi offline, các sự kiện thời gian thực vẫn sẽ được tiếp tục khi thiết bị lấy lại kết nối, Realtime Database sẽ đồng bộ hóa các thay đổi dữ liệu cục bộ với các dữ liệu từ máy chủ và tự động hợp nhất mọi xung đột.

Firebase Realtime database còn cung cấp một quy tắc bảo mật để xác định cách cấu trúc dữ liệu và quyền đọc ghi dữ liệu thường kết hợp với Authentication Firebase.

Realtime Database là một cơ sở dữ liệu NoQuery và do đó có các tối ưu hóa chức năng  so với cơ sở dữ liệu quan hệ. Realtime Database được thiết kế cho việc thực hiện nhanh chóng. Điều này cho phép bạn xây dựng trải nghiệm thời gian thực tuyệt vời có thể phục vụ hàng triệu người dùng mà không cần suy nghĩ đến khả năng đáp ứng. 
## Cloud Firestore là gì ?
Cloud Firestore là cơ sở dữ liệu mới của Firebase phát triển dành cho ứng dụng di động. Nó là sự kế thừa của Realtime Database với mô hình dữ liệu mới và trực quan hơn. Cloud Firestore phong phú hơn, nhanh hơn và có khả năng mở rộng siêu việt hơn so với Realtime Database.

Giống như Firebase Realtime Database, nó giúp dữ liệu của bạn đồng bộ hóa trên các ứng dụng client thông qua việc đăng ký realtime và cung cấp hỗ trợ ngoại tuyến cho thiết bị di động và web. Cloud Firestore cũng cung cấp tích hợp với các sản phẩm khác của Firebase và Google Cloud Platform, bao gồm cả Cloud Functions.
![](https://images.viblo.asia/a644e8f2-d28f-4963-a6cc-0e132e18d669.png)
### Tính năng chính
- Tính linh hoạt: Cloud Firestore hỗ trợ các cấu trúc dữ liệu linh hoạt, phân cấp dữ liệu. Lưu trữ dữ liệu của bạn trong các document , được tổ chức thành các collection. Các document có thể chứa các đối tượng phức tạp.
- Truy vấn tượng trưng : Bạn có thể sử dụng các truy vấn để truy xuất các document riêng lẻ hoặc để truy xuất tất cả các document trong collection khớp với các tham số truy vấn của bạn. Các truy vấn của bạn có thể bao gồm nhiều bộ lọc, kết hợp giữa bộ lọc và sắp xếp.
- Cập nhật thời gian thực: Cloud Firestore sử dụng đồng bộ hóa dữ liệu để cập nhật dữ liệu trên mọi thiết bị được kết nối. Nó cũng được thiết kế để thực hiện các truy vấn tìm nạp một lần .
- Hỗ trợ offline:  Cloud Firestore lưu trữ dữ liệu tại local, vì vậy ứng dụng có thể viết, đọc, nghe và truy vấn dữ liệu ngay cả khi thiết bị ngoại tuyến. Khi thiết bị trở lại trực tuyến, Cloud Firestore sẽ đồng bộ hóa mọi thay đổi cục bộ lên Cloud Firestore.
- Khả năng mở rộng: Mang đến khả năng từ Google Cloud  Platform thiết kế để sử dụng cơ sở dữ liệu khó khăn nhất từ các ứng dụng lớn nhất thế giới.
### Cách hoạt động 
Cloud Firestore là một cơ sở dữ liệu NoQuery được lưu trữ trên đám mây mà các ứng dụng IOS, Android, Web có thể truy cập trực tiếp thông qua SDK.Cloud Firestore cũng có sẵn trong Node.js, Java, Python và Go SDKs,  REST và RPC APIs.

Được tổ chức theo mô hình dữ liệu NoQuery của Cloud Firestore, dữ liệu lưu trong các document  ánh xạ tới các giá trị. Các document này được lưu trữ trong các collection cho bạn tổ chức dữ liệu và thực hiện truy vấn

Bảo vệ quyền truy cập vào dữ liệu của bạn trong Cloud Firestore với Firebase Authentication cho Android, iOS và JavaScript hoặc nhận dạng và quản lý truy cập (IAM) .

# Nên lựa chọn cơ sở dữ liệu nào cho ứng dụng của bạn ? 
![](https://images.viblo.asia/a7d0b491-3361-426d-a5e6-f7939cce013f.png)
Trước khi lựa chọn , hãy xem sự khác nhau giữa Realtime Database và Cloud Firestore.

## Sự khác nhau giữa Realtime Database và Cloud Firestore
### Mô hình dữ liệu 
- Cả hai cùng là cơ sở dữ liệu NoSQL
- Realtime Database lưu trữ dữ liệu dưới dạng một cây JSON, giúp lưu trữ dữ liệu đơn giản dễ dàng hơn nhưng khó tổ chức dữ liệu phức tạp và phân cấp dữ liệu khi muốn mở rộng.
- Cloud Firestore lưu trữ dữ liệu trong các document được sắp xếp trong các collection. Dữ liệu đơn giản được lưu trữ trong các document, tương tự như cách lưu trữ dữ liệu trong JSON. Đối với dữ liệu phức tạp, phân cấp có thể cấu trúc dữ liệu theo các subcollection. Cloud Firestore yêu cầu ít về chuẩn hóa dữ liệu hơn.
![](https://images.viblo.asia/60afddda-7a61-4054-9280-6258b4da71d8.png)
### Dữ liệu thời gian thực và hỗ trợ offline
- Cả 2 là cơ sở dữ liệu đầu tiên hỗ trợ Realtime SDK và hỗ trợ lưu trữ tại local
- Realtime Database chỉ cho phép ngoại tuyến mobile là iOS và Android trong khi đó Cloud Firestore cung cấp hỗ trợ ngoại tuyến cho iOS, Android và cả web.
![](https://images.viblo.asia/914fa518-0c13-424a-bb6d-2958b64f3e65.png)
### Truy vấn
- Dữ liệu có thể được lấy, sắp xếp và lọc từ bất kỳ cơ sở dữ liệu nào thông qua các truy vấn.
- Realtime Database thực hỗ trợ các truy vấn với chức năng sắp xếp ,lọc và giới hạn. Trong một truy vấn duy nhất, bạn chỉ có thể sắp xếp hoặc lọc, không phải cả hai, trên một thuộc tính. 
- Cloud Firestore hỗ trợ các truy vấn chỉ mục kết hợp với sắp xếp, lọc,  ghép.  Cloud Firestore cho phép sử dụng đồng thời bộ lọc và sắp xếp trên một thuộc tính trong một truy vấn duy nhất.  Loại truy vấn mặc định là kiểu chỉ mục trong đó hiệu suất truy vấn tỷ lệ thuận với kích thước của tập kết quả của bạn và không phụ thuộc đến cả dữ liệu.
### Write and transaction
- Firebase Realtime Database thực hiện write và transaction theo các thực hiện riêng lẻ trong khi transaction yêu cầu chỉ thực hiện hoàn tất khi complete callback
- Cloud Firebase cho phép thực hiện theo đợt và lặp lại cho đến khi thực hiện được
### Tính ổn định và hiệu suất
- Realtime Database là một sản phẩm hoàn thiện và sẽ có sự ổn định cao. Realtime Database cho thấy độ trễ rất thấp thích hợp dữ liệu với sự đồng bộ.
- Cloud Firestore có sự ổn định cao hơn Realtime Database vì nó phân tán dữ liệu trên các máy chủ trên toàn cầu.
### Khả năng mở rộng :
- Realtime Database có thể thực hiện 100.000 kết nối đồng thời và 1.000 ghi / giây trong một database nên khi mở rộng cần phân tán trên các database khác 
- Trong Cloud Firestore hoàn toàn tự động tăng khả năng mở rộng.
### Tính bảo mật
- Realtime database sử dụng dựa trên quy tắc xác thực thông thường 
- Cloud Firestore cung cấp bảo mật đơn giản nhưng mạnh mẽ hơn.Di động và web sử dụng Quy tắc bảo mật của Cloud Firestore trong khi máy chủ sử dụng Quản lý nhận dạng và truy cập (IAM). 
![](https://images.viblo.asia/b7d9e274-aad1-4366-81d5-42f17768945c.png)
### Giá cả
- Cả hai đều có sẵn trên các gói giá Firebase, Spark (Miễn phí), Flame ($ 25 / tháng) và Blaze (Trả tiền khi bạn sử dụng).
- Realtime Database chỉ tính phí băng thông và lưu trữ dữ liệu, với tốc độ cao hơn.
- Cloud Firestore tính phí dựa trên các hoạt động được thực hiện trong database (đọc, ghi, xóa) ngay cả tốc độ thấp, băng thông và lưu trữ dữ liệu. 
## Cuối cùng kết luận 
- Có thể sử dụng cả hai cơ sở dữ liệu cùng nhau trong một ứng dụng hoặc dự án Firebase.
-  Cloud Firestore cung cấp thêm chức năng, hiệu suất và khả năng mở rộng kết hợp các tính năng mới trong tương lai.
- Bạn có thể mong muốn tìm cách truy vấn mới, quy tắc bảo mật mạnh mẽ hơn và hiệu suất được cải thiện với một số tính năng nâng cao khác thì nên sử dụng Cloud Firestore. Chỉ cần ghi nhớ những khác biệt được đề cập ở trên nếu bạn quyết định sử dụng cả hai cơ sở dữ liệu hoặc chọn một trong số chúng cho ứng dụng di động của bạn.