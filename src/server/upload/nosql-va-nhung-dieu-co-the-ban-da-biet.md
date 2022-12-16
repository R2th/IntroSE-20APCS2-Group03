# NoSQL và những điều có thể bạn đã biết

![](https://images.viblo.asia/849a1ac9-0a58-46f9-89f8-226b8804f929.png)

Nếu bạn còn chưa biết NoSQL là gì thì hãy đọc bài viết này, còn nếu bạn đã biết rồi thì hãy đọc để chúng ta cùng góp ý cho nhau :sweat_smile: 

Trước khi đi vào tìm hiểu NoSQL là gì chúng ta cũng nên đi ngược lại lịch sử để xem trước khi có sự ra đời của NoSQL chúng ta đã dùng gì để lấy được dữ liệu ra chứ nhỉ :satisfied: 

### Trước khi NoSQL ra đời là sự thống trị của SQL

![](https://images.viblo.asia/d488e09b-59ed-4e57-ae3e-3678eafb120e.png)

SQL là ngôn ngữ truy vấn cấu trúc, đây là ngôn ngữ được sử dụng chung trên tất cả các hệ cơ sở dữ liệu quan hệ (RDBMS), có thể ví dụ như MySQL - có thể bạn đã quá quen với nó ngoài ra có thể kể đến như Oracle, Microsoft SQL Server... 

RDBMS đã từng được sử dụng rộng rãi vì một số ưu điểm nổi trội sau:

* Có tính ACID (Atomicity, Consistency, Isolation, Durability) (các tính chất này mình sẽ không đề cập ở đây vì có thể các bạn đã quá rõ rồi).
* Đặc biệt có tính nhất quán cao trong dữ liệu.
* Dễ thấy được các quan hệ.

Tuy nhiên như vậy vẫn chưa đủ để các lập trình viên thỏa mãn khi yêu cầu đối với dữ liệu ngày càng cao đặc biệt khi RBBMS lại có những nhược điểm như:

1. Mapping các bảng trong database với object trong quá trình code khá phức tạp và rắc rối.
2. Càng join nhiều bảng truy vấn càng chậm (nhiều khi làm bạn phải viết sub-query trong code của mình :confused: để có thể tối ưu mấy cái join đó)
3. Cấu trúc khó thay đổi khi muốn thêm sửa, xóa trường là cả một bầu trời vất vả :3 
4. Khi thêm dữ liệu thì server lưu trữ cần phải hoạt động mạnh mẽ hơn mới có thể đáp ứng được lượng dữ liệu khổng lồ. Đặc biệt RDBMS được thiết kế để thực thi trên một server, việc sử dụng thêm một server khác để chia sẻ sẽ khó khả thi.

Vì vậy NoSQL đã ra đời để giúp đáp ứng những thiếu sót này.

### NoSQL đã làm được những gì?

**1. NoSQL database là gì?**

 - Theo google dịch thì nó sẽ là một cơ sở dữ liệu phi quan hệ hay là phi cấu trúc. Nó cung cấp một cơ chế lưu trữ và truy xuất dữ liệu khác hoàn toàn so với RDBMS vì vậy SQL không thể sử dụng được để truy vấn =)).
 - Nó được ra đời để giải quyết các hạn chế mà RDBMS không làm được.

**2. Những điểm mà NoSQL đã khắc phục được từ SQL**

NoSQL xuất hiện giúp giải quyết được tất cả các vấn đề nan giải trước đó:

- Đầu tiên phải kể đến là vấn đề hiệu suất. Giúp cải thiện hiệu suất đáng kể so với RDBMS trước đó.
- Khả năng khả mở rộng: dễ dàng mở rộng, thêm sửa xóa đơn giản.
- Có thể sử dụng nhiều server để lưu trữ dữ liệu.

**3. Vậy NoSQL có những dạng lưu trữ nào?**

![](https://images.viblo.asia/1edfe796-d964-4915-941e-6a6929d25599.png)

Nếu như mô hình dữ liệu trong hệ quản trị cơ sở dữ liệu quan là các bảng quan hệ thì trong hệ quản trị cơ sở dữ liệu phi quan hệ lại được lưu trữ dưới nhiều dạng khác nhau, dưới đây là các dạng lưu trữ và giới thiệu chung về chúng.

![](https://images.viblo.asia/89c9eda4-ab90-4358-9dff-e9adbffe7815.jpg)

* Key - Value: dữ liệu lưu trữ kiểu này chúng ta sẽ dựa vào key để lấy value. Dữ liệu dạng này có tốc độ truy vấn nhanh và đặc biệt Key - Value được sử dụng để làm cache cho dữ liệu (ví dụ như Redis).
* Document: Mỗi object được lưu trữ trong cơ sở dữ liệu dưới dạng document. Dữ liệu sẽ được lưu trữ dưới dạng BSON/JSON/XML dưới database. Với dạng này chúng ta có thể dễ dàng thêm, sửa, xóa trường một cách linh hoạt vì vậy nó khắc phục được cấu trúc cứng nhắc của Schema.
* Column - Family: Dữ liệu được lưu trữ dạng cột khác với SQL là dạng hàng, mỗi hàng có key/id riêng. Đặc biệt mỗi hàng trong một bảng lại có số lượng cột khác nhau. Với dạng lưu trữ này sẽ thích hợp cho việc ghi một số lượng lớn dữ liệu.
* Graph: Đây là kiểu cơ sở dữ liệu đồ thị, dữ liệu sẽ được lưu trữ theo từng node. Node chính là các thực thể hoặc là đối tượng. Properties là các thuộc tính liên quan đến từng Node, nó sẽ được đặt tên sao cho có quan hệ gần gũi với Node nhất. Edges là cạnh nối các Node, nó biểu thị cho quan hệ giữa các Node. Với dạng lưu trữ này thường được sử dụng trong các mạng noron, mạng xã hội.... Ưu điểm của nó là sử dụng các thuật toán duyệt node để tăng tốc độ truy vấn.

Túm lại thì NoSQL có khá nhiều ưu điểm nổi trội so với SQL, đáp ứng được khá nhiều về việc cải thiện hiệu suất, khả năng mở rộng... Mặc dù vậy NoSQL vẫn không thể hoàn toàn thay thế được RDBMS.

Bài viết của mình vẫn còn nhiều thiếu sót nhưng hi vọng sẽ giúp bạn có thêm cái nhìn tổng quan về các hệ quản trị cơ sở dữ liệu phi cấu trúc này.

Cảm ơn các bạn đã quan tâm đến bài viết của mình, mình rất mong nhận được sự góp ý từ các bạn.

**Nguồn tham khảo**

[https://quantrimang.com/co-so-du-lieu-phi-quan-he-nosql-160708](https://quantrimang.com/co-so-du-lieu-phi-quan-he-nosql-160708)

[https://toidicodedao.com/2015/09/24/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-1/](https://toidicodedao.com/2015/09/24/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-1/)

[https://toidicodedao.com/2015/09/29/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-2/](https://toidicodedao.com/2015/09/29/nosql-co-gi-hay-ho-tong-quan-ve-nosql-phan-2/)

[https://viblo.asia/p/co-ban-ve-graph-database-trong-ruby-7eEREJWZMgNj](https://viblo.asia/p/co-ban-ve-graph-database-trong-ruby-7eEREJWZMgNj)