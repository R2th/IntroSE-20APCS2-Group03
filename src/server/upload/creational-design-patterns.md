Creational Design Patterns
---

***Giới thiệu***

“Những mẫu thiết kế này là tất cả về khởi tạo lớp. Mẫu này có thể được chia thành các mẫu tạo lớp và mẫu tạo đối tượng. Trong khi các mẫu tạo lớp sử dụng hiệu quả kế thừa trong quy trình khởi tạo, các mẫu tạo đối tượng sử dụng ủy quyền hiệu quả để hoàn thành công việc.”

“Trong công nghệ phần mềm, các mẫu thiết kế sáng tạo là các mẫu thiết kế xử lý các cơ chế tạo đối tượng, cố gắng tạo các đối tượng theo cách phù hợp với tình huống. Hình thức cơ bản của việc tạo đối tượng có thể dẫn đến các vấn đề thiết kế hoặc tăng thêm độ phức tạp cho thiết kế. Các mẫu thiết kế sáng tạo giải quyết vấn đề này bằng cách nào đó kiểm soát việc tạo đối tượng này.”

***Đó là:***
* Abstract Factory

"Tạo một thể hiện của một số họ các lớp. "
"Tạo các đối tượng của các đối tượng phụ thuộc liên quan Builder - Xây dựng các đối tượng phức tạp bằng cách sử dụng từng bước một"
* Builder

"Tách xây dựng đối tượng từ đại diện của nó"
* Factory Method

"Tạo một thể hiện của một số lớp dẫn xuất. Tạo đối tượng của một số lớp liên quan mà không chỉ định đối tượng chính xác được tạo."
* Object Pool

"Tránh mua lại và giải phóng tài nguyên đắt tiền bằng cách tái chế các đối tượng không còn sử dụng"
* Prototype

Một trường hợp khởi tạo đầy đủ sẽ được sao chép hoặc nhân bản (clone)
* Singleton

"Một lớp chỉ tồn tại một thể hiện duy nhất. "
"Đảm bảo rằng hầu hết chỉ một thể hiện của một đối tượng tồn tại trong suốt ứng dụng."

**Trong loạt bài viết của tôi, chúng ta sẽ thảo luận về 2  Creational design patterns: Prototype, Singleton.**

Tham chiếu:
* [https://sourcemaking.com/design_patterns](https://sourcemaking.com/design_patterns)