### 1. Object trong Java
Object (đối tượng) là một thực thể vật lý, có thể là một con vật, một đồ vật… Ví dụ như ngôi nhà, máy bay, xe máy, con người…


Mỗi đối tượng sẽ có đặc trưng riêng của nó:

+ Trạng thái của đối tượng: thể hiện ở giá trị của các biến trong class (các field của đối tượng), ví dụ cái xe màu gì, bao nhiêu phân khối, giá tiền…
+ Hành vi: các method (phương thức) của Class, hay được hiểu là các hành động của đối tượng. Ví dụ cái xe có thể chạy, phát tiếng còi, phát ánh đèn…
+ Định danh: việc nhận diện đối tượng được triển khai thông qua một ID duy nhất. Giá trị của ID là không thể nhìn thấy với người dùng bên ngoài. Nhưng nó được sử dụng nội tại bởi JVM để nhận diện mỗi đối tượng một cách duy nhất.

Ví dụ: Có một đối tượng bút tên là Thiên Long, có màu đen, … được xem như là trạng thái của nó. Nó được sử dụng để viết, do đó viết là hành vi của nó.


### 2. Class trong Java
Trong Java nói riêng và trong lập trình hướng đối tượng nói chung thì Class (lớp) được hiểu là một nhóm các đối tượng có các đặc điểm chung.
+ Ví dụ class xe là một nhóm các đối tượng có bánh xe và dùng làm phương tiện duy chuyển trên đường bộ.

Class là một mô hình chi tiết để bạn sử dụng tạo ra các Object. Class định nghĩa tất cả các thuộc tính và các phương thức cần thiết của một Object.
+ Ví dụ class XeOto gồm các thuộc tính (màu sắc, phân khối, tốc độ…) thì ta có thể hiểu đây là thiết kế của một chiếc XeOto, và khi tạo một chiếc xe ô tô (object) từ bản thiết kế đó ta sẽ có nhiều lựa chọn khác nhau: màu sắc (màu trắng, màu vàng, màu xanh,  màu đen), phân khối (phân khối 5.2L, 6.3L), tốc độ (300km/h, 400km/h)…

Việc tạo ra các đối tượng phải tuân theo bản thiết kế (class) đã định nghĩa trước đó:
+ Ví dụ Class XeOto được thiết kế không có cánh quạt thì thì đối tượng (ví dụ: xe ô tô màu đen, phân khối 5.2L và tốc độ 300km/h) được tạo sẽ không thể nào có cánh quạt.


### 3. Abstract class trong Java
Abstract class hay còn gọi là lớp trừu tượng đơn giản được xem như một Class cha cho tất cả các Class có cùng bản chất. Do đó mỗi lớp dẫn xuất (lớp con) chỉ có thể kế thừa từ một lớp trừu tượng. Bên cạnh đó nó không cho phép tạo instance, nghĩa là sẽ không thể tạo được các đối tượng thuộc lớp đó.

Một lớp được khai báo với từ khóa abstract là lớp trừu tượng (abstract class).

Lớp trừu tượng có thể có các phương thức: Abstract method hoặc Non-abtract method.

Abstract method là method trống không có thực thi.

Non-abtract method là method có thực thi.

Lớp trừu tượng có thể khai báo 0, 1 hoặc nhiều method trừu tượng bên trong.

Không thể khởi tạo 1 đối tượng trực tiếp từ một class trừu tượng.


### 4. Interface trong Java
Interface được xem như một mặt nạ cho tất cả các Class cùng cách thức hoạt động nhưng có thể khác nhau về bản chất. Từ đó lớp dẫn xuấtcó thể kế thừa từ nhiều lớp Interface để bổ sung đầy đủ cách thức hoạt động của mình (đa kế thừa - Multiple inheritance).

Interface không phải là class.

Interface chỉ chứa những method/properties trống không có thực thi.

Interface giống như một khuôn mẫu, một khung để để các lớp implement và follow.

Các Class có thể kế thừa nhiều interface.

Interface là một contract, các class implement phải triển khai các method theo như interface đã định nghĩa.

### 5. Tổng kết
Class là một mô hình chi tiết để bạn sử dụng tạo ra các Object. Class định nghĩa tất cả các thuộc tính và các phương thức cần thiết của một Object.

Mỗi Object phải thuộc một Class nào đó. Và một Object là một thể hiện của Class. Tất cả các Object thuộc về cùng một Class có cùng các thuộc tính và các phương thức.

Bạn không nên nhầm lẫn khi nói về việc một class được implement hay extend.

Bạn chỉ có thể thừa kế (extend) từ một class và chỉ có thể hiện thực (implement) các chức năng (interface) cho class của mình. Theo cách ngắn gọn, quan hệ giữa một class khi thừa kế một abstract class được gọi là is-a, và một class khi hiện thực một interface được gọi là can-do (hoặc –able).