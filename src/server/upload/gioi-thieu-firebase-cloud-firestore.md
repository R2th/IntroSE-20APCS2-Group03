# Lời nói đầu
Với những lập trình viên hệ thống, hay những lập trình viên mobile chắc hẳn ai cũng đã nghe hoặc đã sử dụng nền tảng Firebase. Đây là một nền tảng đám mây được Google đưa ra nhằm mục đích cung cấp cho các lập trình viên các công cụ hữu ích và nhanh chóng để có thể lập trình và cải thiện trải nghiệm người dùng tốt nhất.

Nền tảng này cung cấp các services có thể kể đến như Firebase Authentication dùng để xác thực người dùng, Firebase Storage dùng để lưu trữ content ảnh hoặc video, Firebase Cloud Messaging dùng để push notification đến web app, mobile app, Firebase Realtime Database để cung cấp nơi lưu trữ dữ liệu đồng bộ giữa các nền tảng. Và trong bài viết này, mình sẽ cùng tìm hiểu và giới thiệu về nền tảng Firebase Cloud Firestore - một bản nâng cấp của FireBase Database . 

# Nội dung
![](https://images.viblo.asia/06123ed3-9f2b-4dab-8597-b5c46dbd7bda.png)

## Firebase Cloud Firestore là gì ?

Cloud Firestore là một Database linh hoạt và dễ mở rộng cho mobile, web và server được phát triển từ Firebase and Google Cloud Platform. Cũng giống như Firebase realtime database Cloud Firestore giúp cho việc đồng bộ dữ liệu giữa các ứng dụng phía client một các nhanh chóng (Realtime) và hộ trợ lưu offline data trong ứng dụng của bạn.

Cloud Firestore là một cloud-hosted, NoSQL database mà các ứng dụng phía client có thể trực tiếp truy cập thông qua native SDKs. Nó lưu dữ liệu theo mô hình dữ liệu NoSQL. Dữ liệu được lưu trữ trong các file tài liệu chứa các trường được ánh xạ vào các giá trị. Các file tài liệu này được lưu trữ trong các tập hợp chúng có thể sử dụng nó để tổ chức dữ liệu và truy vấn dữ liệu. Cloud Firestore hỗ trợ rất nhiều kiểu dữ liệu từ đơn giản như String, Integer hay những kiểu dữ liệu phức tạp như các nested object

## Các tính năng chính

1. Tính linh hoạt:
Cloud Firestore hỗ trợ các cấu trúc dữ liệu linh hoạt, phân cấp dữ liệu. Lưu trữ dữ liệu của bạn trong các document , được tổ chức thành các collection. Các document có thể chứa các đối tượng phức tạp.

2. Truy vấn tượng trưng :
Bạn có thể sử dụng các truy vấn để truy xuất các document riêng lẻ hoặc để truy xuất tất cả các document trong collection khớp với các tham số truy vấn của bạn. Các truy vấn của bạn có thể bao gồm nhiều bộ lọc, kết hợp giữa bộ lọc và sắp xếp.

3. Cập nhật thời gian thực:
Cloud Firestore sử dụng đồng bộ hóa dữ liệu để cập nhật dữ liệu trên mọi thiết bị được kết nối. Nó cũng được thiết kế để thực hiện các truy vấn tìm nạp một lần .

4. Hỗ trợ offline:
Cloud Firestore lưu trữ dữ liệu tại local, vì vậy ứng dụng có thể viết, đọc, nghe và truy vấn dữ liệu ngay cả khi thiết bị ngoại tuyến. Khi thiết bị trở lại trực tuyến, Cloud Firestore sẽ đồng bộ hóa mọi thay đổi cục bộ lên Cloud Firestore.

5. Khả năng mở rộng:
Mang đến khả năng từ Google Cloud Platform thiết kế để sử dụng cơ sở dữ liệu khó khăn nhất từ các ứng dụng lớn nhất thế giới

## Hoạt động như thế nào ?

Cloud Firestore là một cơ sở dữ liệu NoQuery được lưu trữ trên đám mây mà các ứng dụng IOS, Android, Web có thể truy cập trực tiếp thông qua SDK.Cloud Firestore cũng có sẵn trong Node.js, Java, Python và Go SDKs, REST và RPC APIs.

Được tổ chức theo mô hình dữ liệu NoQuery của Cloud Firestore, dữ liệu lưu trong các document ánh xạ tới các giá trị. Các document này được lưu trữ trong các collection cho bạn tổ chức dữ liệu và thực hiện truy vấn

Bảo vệ quyền truy cập vào dữ liệu của bạn trong Cloud Firestore với Firebase Authentication cho Android, iOS và JavaScript hoặc nhận dạng và quản lý truy cập (IAM)

# Lời kết
Thanks for reading!

Bạn viết nếu có thiếu sót hoặc chưa đúng chỗ nào, các bạn góp ý mình với nhé. Hẹn ngày tái nạm với các bạn vào một bài viết khác ^^

Source: Firebase documents, Viblo, ...