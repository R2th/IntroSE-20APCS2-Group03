# Phần 1: Ví dụ Repository Pattern trong C# - Design Pattern: Data Access Layer Patterns
## 1. Giới thiệu chung
Trong bài viết này, mình sẽ giới thiệu và đưa ra ví dụ một trong những design pattern phổ biến có tên là Repository Pattern. Đây là giải pháp được sử dụng khá phổ biến trong nhiều dự án, hiểu nôm na là chúng ta sẽ tạo thêm 1 lớp để tránh việc phụ thuộc của tầng xử lý với tầng truy xuất dữ liệu từ database.
## 2. Vấn đề
Trong các dự án đơn thuần, chúng ta có thể chia ứng dụng thành 3 tầng cơ bản bao gồm Controller, Data Access và Database. Kiểu thiết kế này bộc lộ điểm yếu trong việc phát triển và testing sau này bởi tầng Controller bị phụ thuộc vào tầng Data Access (*Hình minh họa*)
![](https://images.viblo.asia/ce7de9f5-000e-4c2b-b134-b64dabaa37fa.png)
Do đó để giải quyết vấn đề này, chúng ta có thể áp dụng kiểu thiết kế Repository Pattern. Áp dụng kiểu kĩ thuật này đơn giản chúng ta thêm 1 lớp Repository vào chính giữa 2 lớp Controller và Data Access để tách sự phụ thuộc của 2 thằng này 😁 Nhớ vậy mà việc viết test trở nên dễ dàng cũng như có thể mở rộng hay thay đổi Entites trước khi được truyền thẳng vào thằng Controller và giúp code sạch hơn đúng không nào. Nói lý thuyết là vậy phần tiếp theo mình sẽ cho ví dụ cụ thể để các bạn dễ hình dung nhé.
![apply-repository-pattern.png](https://images.viblo.asia/b3ff01bc-d740-4f08-a961-cdb3940747d0.png)
## 3. Thiết kế
Đầu tiên mình có 1 dự án có 3 tầng như sau (*hình minh họa*). Trong đó tầng Web sẽ chứa Model Views và Controllers, tầng Infrastructure sẽ chứa các truy vấn dữ liệu cũng như các services và tầng Domain sẽ là nơi chứa toàn bộ domain (Entitites) của dự án.

![image.png](https://images.viblo.asia/eca6a498-b646-48e6-8bff-2355e0f0f8ed.png)

   Nhìn vào hàm Create trong OrderControllers ở tầng Controllers. Có thể thấy rõ rằng việc truy cập dữ liệu được thực hiện ngay trong file OrderController. Một cách đơn giản là hiện tại OrderController tạo ra một biến dbContext và thực hiện các hàm truy xuất dữ liệu ngay trong chính nó.

![image.png](https://images.viblo.asia/019d4571-d31a-4697-bd2f-75abc0d8baf1.png)

 Điều này bạn nên tránh né vì nó gây ra sự phụ thuộc giữ tầng Controller và tầng Data, giả sử bạn muốn thử xem test xem hàm này có chạy được không thì nếu áp dụng phương pháp này thì trong database cũng sẽ bị thêm 1 dòng dư thừa này đúng không 😅. Để tránh điều này xảy ra mình sẽ áp dụng Repository Pattern.

Đầu tiên mình cần tạo thêm 2 lớp: lớp Repository và interface của nó IRepository. Trong lớp IRepository sẽ là nơi bạn khởi tạo các hàm truy xuất dữ liệu CRUD (Create, Read, Update, Delete) 
![image.png](https://images.viblo.asia/0a7b0d0f-f850-4eb9-bc7c-b3f562b80c46.png)
Repository là lớp bạn sẽ làm việc thay vì trực tiếp gọi nó trong lớp xử lí. Bước tiếp sẽ định nghĩa các hàm này trong lớp Repository.

![image.png](https://images.viblo.asia/fa44eb22-41a4-4b0f-9db3-dd94b66a3885.png)

Những câu lệnh truy vấn trong ví dụ là các hàm trong Entity Framework, trong nội dụng bài viết này mình sẽ không đề cập về nó nhưng chúng ta chỉ cần hiểu việc chúng ta làm là dịch bước xử lí ở trong Controller ban đầu về lớp Data Access. Điều đó đồng nghĩa với việc lớp Controller không biết gì về cách chúng ta truy xuất dữ liệu, nếu sau này chúng ta có muốn thay đổi hay chỉnh sửa gì về cách truy xuất thì Controller cũng không bị ảnh hưởng.

Bởi vì trong một dự án, chúng ta có thể có nhiều hơn một bảng dữ liệu do đó có thể tồn tại nhiều Repository và những Repository này sẽ có thể giống nhau về việc truy xuất cho nên mình tạo abstract cho lớp Repository, tùy vào bạn muốn xử lí dữ liệu ra sao mà có thể override nó nhé 😁. Dưới đây là ví dụ của 2 repository của 2 bảng Product và Order:



![image.png](https://images.viblo.asia/cf62198b-010d-4ba7-8718-fffb1ccc0eaf.png)
![image.png](https://images.viblo.asia/86520e9f-a540-44a5-a70c-62c1bf33b404.png)

Như ví dụ trên cả 2 đều lớp Repository đều kế thừa GenericRepository, trong hàm GenericRepository đã định nghĩa sẵn các hàm truy vấn chung [(hình minh họa)](https://images.viblo.asia/fa44eb22-41a4-4b0f-9db3-dd94b66a3885.png),  nếu bạn muốn thay đổi gì thì có thể override nó như cách mà mình đã làm ở trên.





Nhìn một lần nữa vào OrderController chúng ta sẽ sử dụng kĩ thuật Dependency Injection để có thể sử dụng các Repository đã tạo ở phần trên vào bên trong Controller này 
![image.png](https://images.viblo.asia/63171d08-e176-4b93-aa64-13bb0570cc81.png)

Vậy là các lớp Controller đã được độc lập với lớp Data Access rồi. Trong phần này mình đã giới thiểu tổng quan và đưa ra ví dụ cơ bản về cách Repository pattern áp dụng cho các dự án .NET nói riêng, bạn có áp dụng tương tự cho mọi úng dụng bạn muốn. Trong phần tiếp theo mình sẽ nói về Unit of Work Pattern...

# Link source code
* https://github.com/quocthinh861/DesignPattern-Repository.git
# Tác giả 
https://www.facebook.com/lang.thinh.146/