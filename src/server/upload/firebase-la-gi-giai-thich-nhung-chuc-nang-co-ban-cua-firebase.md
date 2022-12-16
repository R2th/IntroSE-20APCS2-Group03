Dịch từ bài viết [Firebaseとは何か？主な機能を一挙に解説！](https://pantograph.co.jp/blog/others/firebase.html)

Trong lĩnh vực phát triển mobile application và web application, Firebase ngày càng nhận được nhiều sự quan tâm. Tuy nhiên, có lẽ không nhiều người có thể giải thích chi tiết về Firebase.

Ở bài viết lần này, tôi sẽ giải thích Firebase là gì, cùng với những chức năng của Firebase.

# 1. Firebase là gì?
**Firebase là platform do Google cung cấp, nhằm hỗ trợ việc tạo ra các web application, mobile application với chất lượng cao.**

Với việc sử dụng Firebase, developer có thể tập trung vào việc phát triển application mà không cần lo về việc sản phẩm của mình sẽ hoạt động và được quản lý thể nào ở phía Backend.

Khái niệm Backend nhắc tới trong câu trên để chỉ việc xử lý và lưu trữ dữ liệu trong service, ở vùng "phía sau" mà người dùng không nhìn thấy.

Firebase là một trong những BaaS (Backend as a service).

 Serverless architecture được chú ý như một giải pháp đáp ứng yêu cầu release một dịch vụ trong thời gian ngắn, trong bối cảnh đó, BaaS ra mắt người dùng.
 
 BaaS hướng đến thiết bị chủ yếu là mobile nên còn được gọi với một tên gọi khác là MBaaS.
 
Tiếp theo sau đây, chúng ta hãy cùng xem Firebase có những chức năng cơ bản gì.

# 2. Các chức năng chính của Firebase
## 2.1 Firebase Analytics
Bằng Firebase Analytics, ta có thể phân tích sự tương tác của người dùng với ứng dụng cũng như tình trạng sử dụng ứng dụng đó.

Firebase có sẵn chức năng tạo report. Nhìn report ấy, chúng ta có thể nắm được một cách rõ ràng hoạt động của người dùng.

Bằng việc cài đặt SDK (Software Development Kit, cụ thể hơn với trường hợp này là FirebaseAnalytics.unitypackage), chức năng phân tích các access trở nên khả dụng. Khi đó, ta không chỉ xem được hoạt động của người dùng mà còn có thể biết được thông tin về thuộc tính hoạt động hay hiệu quả quảng cáo, tình trạng trả phí, v.v.

## 2.2 Firebase Hosting
Firebase Hosting là dịch vụ deploy trang web và web app chỉ bằng những thao tác đơn giản.

Khi tạo một app, nhiều trường hợp nhà phát triển sẽ muốn xử lý một số chức năng trên trang web.

Ví dụ tiêu biểu nhất là trường hợp của Điều khoản dịch vụ (Terms of service) hoặc Chính sách bảo mật (Privacy policy), ta thường sẽ sử dụng trang web có sẵn để hiển thị chúng thay vì tạo riêng một trang trong application.

Khi sử dụng Firebase Hosting, ta có thể sử dụng web page cho ứng dụng iOS và Android của mình.

Với các ưu điểm thao tác nhanh, đơn giản, tính an toàn cao, Firebase hosting giúp các nhà phát triển tạo lập ứng dụng một cách đơn giản hơn so với việc tự tạo hay thuê server thực.

## 2.3 Firebase Cloud Messaging
Với Firebase Cloud Messaging, ta có thể gửi nhận tin nhắn miễn phí. Khái niệm "Gửi message" ở đây còn dùng để chỉ việc push thông báo.

Khi tên nhắn mới được gửi tới, người dùng có thể nhận được thông báo. Ví dụ, với trường hợp  người dùng sử dụng iPhone, khi có mail hay thông báo từ application, ở góc trên bên phải icon của app đó sẽ xuất hiện dấu tròn nhỏ màu đỏ, hay tiện lợi hơn, trong dấu tròn đỏ ấy sẽ hiển thị số lượng thông báo, tin nhắn mới.

Thêm vào đó, ta cũng có thể thiết lập để tin nhắn chỉ gửi tới những đối tượng mà ta mong muốn, ví dụ như việc gửi thông báo yêu cầu viết feedback sản phẩm cho những khách hàng thường xuyên sử dụng sản phẩm.

## 2.4 Firebase Authentication
Firebase Authentication là chức năng dùng để xác thực người dùng bằng Password, số điện thoại hoặc tài khoản Google, Facebook hay Twitter, v.v.

Việc xác thực người dùng là một chức năng quan trọng trong phát triển ứng dụng. Tuy nhiên, việc đối ứng với nhiều phương pháp xác thực khác nhau sẽ tốn nhiều thời gian và công sức.

Firebase Authentication giúp thực hiện việc chia sẻ ID giữa các ứng dụng, giúp người dùng dễ dàng tiếp cận sản phẩm hơn. Vì thế, nó là một chức năng rất quý.

## 2. 5 Firebase Cloud Storage
Firebase Cloud Storage hỗ trợ việc quản lý, chia sẻ các content người dùng upload lên như ảnh, video; cũng như sử dụng những tài nguyên ấy cho ứng dụng của bạn.

Data được lưu trữ trong Google Cloud Storage buckets, và có thể được access từ server.

Đây cũng là một chức năng quan trọng và tiện lợi cho việc phát triển dịch vụ.

## 2.6 Firebase Remote Config
Firebase Remote Config giúp thực hiện việc thay đổi UI cũng như hoạt động của ứng dụng mà không cần phải update app đó.

Việc này thực hiện bằng cách set giá trị ban đầu (giá trị default) cho giao diện và hoạt động của app, sau đó sử dụng Remote Config REST API hoặc Firebase Console để ghi đè giá trị mới lên setting default.

## 2.7 Firebase Test Lab
Firebase Test Lab được sử dụng để test ứng dụng trên nền tẳng cloud.

Bằng cách sử dụng Test Lab, ta có thể test hoạt động của ứng dụng trên nhiều thiết bị đa dạng, nhờ đó có thể xác minh được app sẽ chạy thế nào trên thiết bị thực của người dùng.

## 2.8 Firebase Crashlytics
Firebase Crashlytics là công cụ báo cáo các hoạt động bất thường (crash) phát sinh trên ứng dụng theo thời gian thực (real time).

Tool giúp ích cho việc truy vết các vấn đề bất thường hạ thấp chất lượng sản phẩm, nhờ đó ta có thể đặt thứ tự ưu tiên để có phương hướng xử lý thích hợp.

Công cụ này còn hỗ trợ việc chia nhóm các bất thường phát sinh, truy xuất tình trạng có liên quan đến crash ấy, giúp tiết kiệm thời gian xử lý sự cố.

## 2.9 Firebase App Indexing
Firebase App Indexing là chức năng hiển thị content trong ứng dụng trong kết quả tìm kiếm Google.

Với user đã cài đặt sẵn ứng dụng trên thiết bị của mình, khi user chọn kết quả tìm kiếm có chứa content trong ứng dụng thì application sẽ được khởi động.

## 2.10 Firebase Dynamic Links
Firebase Dynamic Links là chức năng phân chia trang đích một cách thích hợp tuỳ vào tình trạng người dùng.

## 2.11 Firebase Console
Để sử dụng những chức năng được giới thiệu ở trên, ta cần đến Firebase console.

Để login vào console, ta cần có tài khoản Google, vậy bước trước tiên cần được thực hiện là đăng ký một tài khoản Google nếu bạn chưa sở hữu, và đăng nhập với account đó.

Thêm vào đó, bằng việc sử dụng Notifications Composer của Firebase Console, ta có thể gửi tin nhắn thông báo tới thiết bị iOS hay Android.

# 3. Tổng kết
Trong bài viết lần này, tôi đã giới thiẹu Firebase là gì và Firebase có những chức năng gì.

Đây là một dịch vụ do Google cung cấp với các tính năng đa dạng. Hãy ứng dụng các tính năng này cho các mục đích bạn mong muốn nhé.