## JPA là gì?

JPA là viết tắt của Java Persistence API, là một đặc các tiêu chuẩn của Java để làm việc với cơ sở dữ liệu quan hệ.

JPA có thể xem như cầu nối giữa Java object và cơ sở dữ liệu quan hệ. Là một tập hợp các đặc tả (các interface), JPA không chứa bất kỳ phương thức thực thi nào, nó cần một JPA implementation triển khai tất cả các đặc tả mà nó định nghĩa. Những ORM tools như Hibernate, TopLink đều cung cấp trình triển khai cho JPA.


## ORM là gì?

ORM viết tắt của object-relational-mapping, công nghệ cho phép chuyển đổi từ các object trong ngôn ngữ hướng đối tượng sang database quan hệ và ngược lại.

Hibernate là một trong những ORM tools phổ biến được sử dụng nhiều trong các ứng dụng Java. Từ phiên bản 3.2 trở về sau, hibernate đã cung cấp một JPA Implement và được sử dụng khá rộng trong cộng đồng Java mặc dù chúng ta vẫn còn một số JPA implementaion khác như Apache OpenJPA, EclipeseLink, jOOQ etc.

## Tại sao cần sử dụng ORM?

Hầu hết các ứng dụng đều cần lưu trữ, thao tác với cơ sở dữ liệu. Đối với công nghệ JDBC trước đây chúng ta phải thực hiện các công việc như kết nối cơ sở dữ liệu, viết câu truy vấn, đóng kết nối etc một cách thủ công. 

Ngoài ra việc ánh xạ các table, các thuộc tính từ cơ sở dữ liệu quan hệ sang java object và ngược lại cũng là một thứ gì đó rất đau đớn cho các lập trình viên khi phải làm thủ công, chưa kể nếu muốn chuyển sang một cơ sở dữ liệu mới ví dụ từ mysql sang oracle thì hầu như chúng ta phải sữa tòan bộ các câu truy vấn etc. 

ORM sẽ thay chúng ta làm tất các công việc trên một cách tự động, độc lập với cơ sở dữ liệu quan hệ, chúng ta sẽ dễ dàng chuyển đổi mà không cần phải thay đổi quá nhiều mã nguồn. Chúng ta không cần phải quan tâm đến cơ sở dữ liệu bên dưới là gì Mysql, Oracle, MysqlServer, PostgreSQL đều được.

## Kiến trúc JPA

![](https://images.viblo.asia/5fc481de-7b11-4ebd-b74d-a8b268f2348d.png)


### EntityManagerFactory

Là một factory class của EntityManager có nhiệm vụ khởi tạo và quản lý các EntityManager instance.

### EntityManager

Là một interface cung cáp các API cho việc tương tác giữa ứng dụng với database.

Một số chức năng cơ bản của EntityManager như:

Persist: Tạo mới một thực thể vào CSDl.
Merge: Cập nhật một thực thể trong CSDL.
Remove: Xoá một thực thể trong CSDL.
### EntityTransaction

Transaction là một tập hợp các thao tác các thao tác, trong đó chúng phải được thực hiện thành công hoặc tất cả thất bại.

Một database-transaction bao gồm một tập hợp các câu lệnh SQL được thực thi thành công hoặc bị roll-back..

EntityTransaction có quan hệ 1-1 với EntityManager. Bất kỳ thao tác nào được bắt đầu thông qua đối tượng EntityManager đều được đặt trong một Transaction. Đối tượng EntityManager giúp tạo EntityTransaction.

### Query

Đây là một interface, được mỗi nhà cung cấp JPA implement để có được các đối tượng quan hệ đáp ứng các tiêu chí (criteria) truy vấn.
Nguồn tham khảo
[https://shareprogramming.net/dung-hibernate-da-lau-the-ban-co-biet-jpa-la-gi/](https://shareprogramming.net/dung-hibernate-da-lau-the-ban-co-biet-jpa-la-gi/)