Chắc hẳn mọi người đã quá quen với lập trình hướng đối tượng. Mình đã gặp nhiều khó khăn khi để hiểu và áp dụng nó trong lập trình. Trong bài viết này mình đưa ra một số lý thuyết mà bản thân mình tìm hiểu. Có thể cách hiểu mỗi người 1 khác nhưng mong rằng bài viết của mình không quá khó hiểu hay sai sót.
# Lập trình hướng đối tượng là gì?
**Lập trình hướng đối tượng** là mẫu lập trình cho phép các nhà phát triển nhóm các nhiệm vụ tương tự thành các lớp. Việc lập trình hướng đối tượng là cách làm giúp cho mã nguồn thực hiện theo nguyên lý **"Don't repeat yourself - DRY** và có khả năng phát triển và tối ưu mã nguồn.

Lập trình hướng đối tượng cho phép phân tách một vấn đề thành 1 số thực thể được gọi là đối tượng và sau đó xây dựng dữ liệu và chức năng xung quanh đối tượng này. Dữ liệu của đối tượng có thể được truy nhập bởi các hàm được liên kết với đối tượng đó. Hàm là 1 đối tượng có thể truy cập các hàm của đối tượng khác.
# Đặc điểm của lập trình hướng đối tượng
Khi nói đến lập tình hướng đối tượng, mọi người có lẽ sẽ nghĩ nhiều đến 4 tính chất đặc thù của nó. Chúng ta hãy cùng điểm qua 4 tính chất.
## Tính kế thừa
Một trong những ưu điểm chính của OOP chính là khả năng giảm trùng lặp mã nguồn bằng cách thừa kế. Tính thừa kế chính là cho phép ta viết mã nguồn 1 lần ở lớp cha và có thể sử dụng đoạn mã đấy ở cả lớp cha và lớp con.


Lớp con có thể sử dụng tất cả các phương thức và  thuộc tính non-private mà nó kế thừa từ lớp cha. Sự kế thừa để sử dụng lại mã nguồn chỉ xảy ra 1 chiều vì lớp cha không thể sử dụng những thuộc tính, phương thức riêng của lớp con.
## Tính đa hình
Tính đa hình mô tả mô hình lập trình trong OOP trong đó các lớp có chức năng khác nhau chia sẻ cùng 1 Interface. Tính đa hình chỉ ra rằng mã nguồn làm việc bởi các lớp khác nhau không cần biết lớp nào đang sử dụng vì chúng đều được sử dụng cùng 1 cách.

Các bạn có thể hiểu về tính đa hình qua ví dụ như việc mình ấn nút. Ta chỉ cần biết nhấn nút còn việc nút làm như thế nào còn phụ thuộc vào ngữ cảnh mà nó sử dụng, tuy vậy, kết quả không ảnh hưởng đến cách nó sử dụng.
## Tính đóng gói
Đóng gói là cơ chế được sử dụng để an toàn dữ liệu hoặc thông tin trong 1 đối tượng. Nó không cho phép người sử dụng các đối tượng thay đổi trạng thái nội tại của đối tượng. Việc cho phép môi trường bên ngoài tác động lên các dữ liệu nội tại của 1 đối tượng theo cách nào là tùy thuộc vào người viết mã.
* **Private**: Các phương thức, thuộc tính được khai báo ỏ dạng này thì chúng chỉ có thể sử dụng được trong class đó. Ngay cả các lớp kế thừa nó cũng không thể sử dụng các phương thức, thuộc tính này.
* **Protected**: Các phương thức và thuộc tính được khai báo protected thì chúng được sử dụng trong class đó và cả class con kế thừa từ nó.
* **Public**: Với việc khai báo public thì đây là mức độ truy cập cao nhất trong OOP. Các phương thức, thuộc tính này có thể được tác động từ cả trong lẫn ngoài class.
## Tính trừu tượng
Trừu tượng hóa cũng cấp 1 cách nhìn tổng quát về các lớp hoặc đối tượng bằng cách cung cấp các thông tin liên quan. Trừu tượng là quá trình ẩn đi cách làm việc của 1 đối tượng và hiển thị thông tin của đối tượng theo 1 cách dễ hiểu. Tính chaasrt này giúp chúng ta tập trung vào những vấn đề cốt lõi cần thiết của đối tượng thay vì quan tâm đến cách nó thực hiện. Nó cũng làm tăng khả năng mở rộng khi sử dụng cùng với tính đa hình và kế thừa trong lập trình hướng đối tượng.
# Abstract Class vs Interface
Mình vẫn luôn rất hoang mang khi nói đến vấn đề này - Abstract Class và Interface. Là những khi dùng nhưng không hiểu mục đích nó sinh ra trên đời để làm gì. Nhưng lập trình hướng đối tượng đã đưa nó vào chả nhẽ chỉ để làm cảnh. Thôi thì mình cố gắng hiểu xem chúng làm được cho đời vậy.
## Abstract Class ???
Abstract Class được giới thiệu từ PHP5 cùng với phương thức abstract. Một số đặc điểm của Abstract Class như sau:
1. Bạn không thể khởi tạo Abtract Class.
2. Bất kỳ lớp nào có chứa **ít nhất 1** phương thức trừu tượng thì chắc chắn nó phải là Abstract Class. 1 Abstract Class có thể chứa các phương thức trừu tượng hoặc không trừu tượng.
3. Phương thức abstract của Abstract Class **không được phép khai báo** nội dung phương thức. Nó chỉ có thể định nghĩa tên cũng như các tham số đầu vào.
4. Khi các lớp kế thừa từ một Abstract Class thì các phương thức được đánh dấu là abstract thì **bắt buộc phải** định nghĩa ở lớp con. Các phương thức ở Abtract Class được định nghĩa là bình thường thì ở lớp con vẫn có khả năng định nghĩa lại **giống hoặc thấp hơn với mức giới hạn của phương thức (public, private, protected)** và sẽ thực hiện nội dung ở lớp con.
5. Không hỗ trợ đa kế thừa.
## Interface
Interface được định nghĩa để cung cấp một tên hàm chung để có thể triển khai. Interface được xem như là bộ xương để thực hiện. So với Abstract Class thì Interface cũng có một số điểm gần giống. Hãy xem thử một số đặc điểm sau đây:
1. Interface cũng không thể khởi tạo. Nó là cấu trúc trong OOP cho phép các class khác có thể `implements`.
2. Hơi khác với Abstract Class thì các phương thức trong Interface **bắt buộc** toàn bộ là các phương thức trừu tượng.
3. Các phương thức trong Interface chỉ có thể được định nghĩa với khả năng là **public** và cũng không được định nghĩa nội dung.
4. Interface có thể được **extends** với nhau.
5. 1 class có thể implements nhiều Interface.
# Phương thức static (tĩnh)
> Static trong lập trình hướng đối tượng là 1 thành phần tĩnh (thuộc tính hoặc phương thức).
 
* Phương thức static có thể truy cập mà không cần khởi tạo.
* Trong phương thức static không thể gọi phương thức hoặc thuộc tính non-static.
* Trong phương thức non-static có thể gọi phương thức hoặc thuộc tính static.
* Phương thức static có thể gọi ngay cả khi chưa khởi tạo đối tượng.

Trong PHP có 2 từ khoá đặc biệt là **self** và **static** đóng vai trò quan trọng trong các lớp thừa kế các phương thức tĩnh hoặc biến thành viên. Nó gần giống với việc sử dụng **\$this**. **self** và **static** có thể được sử dụng để truy cập các phương thức tĩnh và các biến từ bên trong 1 lớp xác định hoặc kế thừa chúng.
* **self** đại diện cho cho chính đối tượng **khai báo** đến nó.
* **static** thì lại đại diện cho chính đối tượng đang **gọi** đến nó.
# Tạm kết
Lan man 1 hồi thì mong rằng mình và bạn nào có đọc bài viết thì sẽ hiểu hơn 1 phần về lập trình hướng đối tượng trong PHP. Một số vấn đề nữa về Magic function, Trait mình sẽ nói đến ở phần sau.