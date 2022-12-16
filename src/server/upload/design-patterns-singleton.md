### Lời mở đầu 

Có khá nhiều mẫu design pattern, mỗi loại cung cấp 1 giải pháp để giải quyết 1 bài toán nào đó. 

Trong bài viết này, mình xin phép được giới thiệu về Singleton Pattern và khi nào nên áp dụng nó.

### Basic idea 

Trong phần mềm, Singleton Pattern là mẫu thiết kế dùng để giới hạn việc khởi tạo 1 đối tượng. 

Singleton Pattern nên được sử dụng khi:

1.  Phải có 1 single class và class này có thể được truy cập từ access point được biết đến.
2.  Singleton class có thể được mở rộng bằng cách kế thừa, client  phải có thể sử dụng các lớp mở rộng mà không thực hiện bất kỳ thay đổi nào đối với nó.

Singleton Pattern có nhiều lợi thế, có thể được tóm tắt dưới đây: 

1. Có một kiểm soát chặt chẽ về cách thức và thời điểm khách hàng truy cập vào cá thể singleton. Vì vậy, bạn có quyền truy cập được kiểm soát vì lớp singleton đóng gói thể hiện của nó.
2. Khi bạn cần hạn chế số lượng instance mà chúng ta tạo từ một lớp để lưu tài nguyên hệ thống.

Bây giờ tôi sẽ chỉ cho bạn cách bạn có thể triển khai bằng JavaScript. Tôi đã tạo ra một vấn đề trong đó có một lớp có tên là DatabaseConnection xác định hai thuộc tính: configure và getUniqueIdentificator. Lớp này là kết nối đến cơ sở dữ liệu của chúng tôi. DatabaseConnection được sử dụng bởi một số client (client 1, client2).


Đoạn code được mô tả dưới đây:

![](https://images.viblo.asia/6b064095-455b-46d8-b6fc-9129c38d8080.png)

Mỗi máy khách tạo một kết nối mới đến cơ sở dữ liệu và yêu cầu định danh duy nhất của từng kết nối. Một trong những hậu quả chính của kiến trúc này là nhiều tài nguyên đang được sử dụng hơn mức cần thiết.

![](https://images.viblo.asia/931c73e6-cf06-4591-831f-6e1b9dd37357.png)

Kết qủa ta nhận được như sau: 

![](https://images.viblo.asia/67c593a7-5fc7-4be4-be5e-530949f6f5c9.png)

###  Solution 

Giải pháp là sử dụng một singleton chỉ tạo một thể hiện của lớp
![](https://images.viblo.asia/d3601b9b-64d6-4d14-ac31-26b5c539ad6e.png)

Điểm truy cập duy nhất đến cá thể là sử dụng phương thức tĩnh getDatabaseConnection, phương thức này sẽ tạo một cá thể mới trong trường hợp cá thể đó không tồn tại hoặc sẽ get nó ra.
![](https://images.viblo.asia/0fb945e3-7e19-492c-9c31-e68b0925917a.png)

Và kết quả mà ta nhận được là: 
![](https://images.viblo.asia/33b163f7-101b-42b5-907f-2e8cb0ad1624.png)

### Summary 

Qua phần trình bày của mình, hy vọng mọi người sẽ hiểu tổng quát về singleton pattern. Cảm ơn mọi người đã đọc.

Link tham khảo: https://medium.com/swlh/design-patterns-singleton-batman-and-spiderman-here-741211acdfaa