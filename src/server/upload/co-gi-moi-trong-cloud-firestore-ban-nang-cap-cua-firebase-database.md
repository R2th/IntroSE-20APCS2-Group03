# Giới thiệu chung

* Chắc hẳn đối với các lập trình viên mobile sẽ không còn xa lạ gì với FireBase nữa, bởi đây là một nền tảng đám mây được Google đưa ra nhằm mục đích cung cấp cho các lập trình viên các công cụ hữu ích và nhanh chóng để có thể lập trình và cải thiện trải nghiệm người dùng tốt nhất.
* Có thể kể đến các tiện ích google cung cấp như Realtime Database (để cung cấp nơi lưu trữ dữ liệu đồng bộ giữa các nền tảng), FireBase Cloud Messaging (để gửi thông báo cho người dùng), FireBase Authentication (để xác thực người dùng), .... và rất nhiều các tiện ích khác mà FireBase cung cấp cho các lập trình viên. 
* Mới đây FireBase đã cung cấp Cloud Firestore coi như là bản nâng cấp của FireBase Realtime Database, được hứa hẹn sẽ có nhiều đổi mới về thao tác với cơ sở dữ liệu realtime của FireBase. Chúng ta sẽ cùng tìm hiểu xem liệu Cloud Firestore có đáng dùng hơn so với FireBase Realtime Database hay không.
# Cloud Firestore & Database Realtime
![](https://images.viblo.asia/b14d1b89-8e67-4c46-a714-1059b979c014.png)


## Điểm chung
* Về cơ bản thì FireBase Realtime Database và Cloud Firestore đều lưu trữ dữ liệu người dùng trên nền tảng đám mây theo dạng noSQL, dữ liệu được đồng bộ tới tất cả các máy khách kết nối với nó theo thời gian thực và vẫn khả dụng khi ứng dụng ngoại tuyến. Chúng phù hợp để làm những ứng dụng cần thời gian cập nhật nhanh chóng như là một ứng dụng chat, chia sẻ dữ liệu tức thời khi nhiều người làm cùng một việc. 
## Khác biệt
### Cloud Firestore or Realtime Database (Lựa chọn cơ sở dữ liệu nào):
* Firebae Database: Là cơ sở dữ liệu gốc của FireBase hoạt động hiệu quả, có đỗ trễ thấp cho các ứng dụng yêu cầu các trạng thái 
* Là cơ sở dữ liệu hàng đầu của FireBase mới được đưa ra với việc cải thiện cơ sở dữ liệu trực quan hơn, có các truy vấn phong phú và nhanh hơn so với FireBase Database 

### Data Model ( Mô hình dữ liệu)
* Firebase Database lưu trữ dữ liệu dưới dạng một cây JSON lớn, điều này giúp cho việc lưu trữ dữ liệu một cách đơn giản hơn, nhưng cũng vì thế mà dữ liệu phân cấp phức tạp sẽ khó tổ chức hơn nếu quy mô lớn.
* Trong khi đó Cloud Firestore lưu trữ dữ liệu được sắp xếp trong các bộ sưu tập, điều này cũng giúp việc lưu trữ dữ liệu dễ dàng vì nó tương tự như JSON. Dữ liệu phân cấp, phức tạp cũng dễ dàng tổ chức hơn để sắp xếp các tài liệu bên trong đó. Nó cũng yêu cầu ít chuẩn hóa và làm gọn dữ liệu

### Querying  (Truy vấn)
* **Firebase Database** truy vấn với một số các phương thức có sẵn được cung cấp ví dụ như orderByChild(), orderByKey(), orderByValue(), limitToFirst(), limitToLast(), startAt(), endAt(), equalTo(). Việc này có hạn chế là việc bạn chỉ có thể lọc hoặc sắp xếp chứ không thể cả hai được. Việc truy vấn cũng theo mặc định luôn trả về toàn bộ các cây con.
* **Cloud Firestore** truy vấn với việc đánh chỉ mục và sử dụng cả lọc và sắp xếp với nhau. Nó mạnh mẽ hơn với phương thức where() với 3 tham số như một trường để lọc, một phép toán và một giá trị để so sánh. Ví dụ một số hàm như whereEqualTo(), whereLessThan(), whereGreaterThanOrEqualTo, whereLessThanOrEqualTo, ... làm cho việc truy vấn trở nên hiệu quả hơn và dễ dàng hơn. Truy vấn mặc định được đánh chỉ số theo kết quả trả về. Tuy nhiên Cloud Firesotre lại không hỗ trợ các truy vấn sau: Mỗi truy vấn chỉ được thực hiện trên một bộ sưu tập nhất định, truy vấn các thành viên của mảng riêng lẻ (bạn có thể sử dụng các kỹ thuật sử dụng cho List, ArrayList, Set để truy vấn), truy vấn logic OR bạn nên tạo truy vấn riêng cho từng truy vấn và hợp nhất với nhau, truy vấn có mệnh đề "!=" (trường hợp này bạn nên tạo truy vấn cho từng trường hợp lớn hơn hoặc nhỏ hơn của truy vấn đó).

### Writes and Transactions
* Firebase Database thực hiện write và transaction một cách cơ bản như: ghi dữ liệu như một thao tác đơn lẻ, còn transaction trong SDKs thì sử yêu cầu phải có sự kiện trả về hoàn tất. 
* Cloud Firestore thực hiện write và transaction một cách nguyên bản: Hoạt động hàng loạt và hoàn thành chúng một cách nguyên bản, transaction tự động lặp lại cho đến khi nó hoàn tất.

### Reliability and performance ( Sự ổn định và hiệu năng)
* Về khoản này thì FireBase Database làm một sản phẩm đã hoàn thành: Sự ổn định của nó đã được kiểm nghiệm và độ trễ của nó cũng là thấp nhất, do đó nó là sự lựa chọn tốt nhất cho những ứng dụng cần thiết việc đồng bộ hóa trạng thái thường xuyên. 
* Cloud Firestore hiện tại đang trong giai đoạn thử nghiệm với phiên bản beta: Sự ổn định của bản thử nghiệm không phải lúc nào cũng được như bản đã hoàn thành, dữ liệu của bạn được đặt ở nhiều nơi đảm bảo tính mở rộng và độ tin cậy cao, khi nó vượt qua giai đoạn thử nghiệm sẽ hứa hẹn sự ổn định và hiệu năng tốt hơn so với FireBase Database.


### Scalability ( Khả năng mở rộng)
   * FireBase Database nếu muốn mở rộng phải yêu cầu sự phân tán, có thể chia sẻ cho khoảng 100.000 kết nối và 1000 lần ghi / giây trong một database. Mở rộng thì phải yêu cầu phân tán dữ liệu của bạn trên nhiều cơ sở dữ liệu.
   * Cloud Firestore: Việc mở rộng này là hoàn toàn tự động, vậy nên bạn sẽ không cần phải quan tâm đến việc dữ liệu của mình lưu trữ theo nhiều phiên bản. 
  
  ### Security (Bảo mật)
  * FireBase Database có  các quy tắc xác thực xếp tầng riêng: FireBase Database Rules là quy tắc bảo mật duy nhất bao gồm các quy tắc đọc và ghi, bạn cần xác thực dữ liệu riêng biệt bằng các quy tắc xác thực của FireBase.
  * Cloud Firestore thì bảo mật đơn giản và mạnh mẽ hơn cho SDK di động, web và server: SDK trên thiết bị di động và web sử dụng các quy tắc bảo mật của Cloud Firestore. SDK máy chủ sử dụng quản lý danh tính và truy cập ( Identity and Access Management - IAM), các quy tắc không xếp tầng trừ khi bạn sử dụng ký tự đại diện, xác thực dữ liệu diễn ra một cách tự động, quy tắc có thể hạn chế việc truy vấn nếu như người dùng truy vấn vào dữ liệu không có quyền truy cập thì toàn bộ truy vấn sẽ không thành công.