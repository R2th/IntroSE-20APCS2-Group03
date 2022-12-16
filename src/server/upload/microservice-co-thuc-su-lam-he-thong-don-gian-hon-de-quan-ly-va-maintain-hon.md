*Dạo gần đây, mình gặp khá nhiều bài chia sẻ về microservice rồi gặp ổng anh có bài toán là hệ thống cồng kềnh phức tạp, chậm, khó maintain và táp luôn phát là muốn dùng microsevice để xử lý bài toán đó vì nghĩ rằng nó có thể giải quyết được bài toán. Thế nên mình mới quyết định viết bài chia sẻ về hiểu biết của mình với microservice. (Bài viết này chỉ là chia sẻ nên sẽ không có ảnh ọt gì và cũng sẽ chẳng phân tiêu đề gì cả)* Mình cũng hay đọc rất nhiều bài chia sẻ về microservice thì nhiều bạn hay viết ưu điểm của microservice mang ý nghĩa ***giúp hệ thống đơn giản hơn, dễ quản lý và maintain hơn***. Thật vậy sao? Cùng tìm hiểu nhé

Thực ra nó không phải. Và để phản biện cho vấn đề này, chúng ta cũng nhau thử đi giải quyết nó trên mô hình microservice.
Để làm được cái ưu điểm đầu tiên kia thì cần những điều kiện tiên quyết sau:
- Về mặt con người thì cần có những người kiến trúc sư có kinh nghiệm dày dặn
-  Về hệ thống cần lên được ý tưởng/tầm nhìn/kế hoạch rõ ràng về sự phát triển của hệ thống

Từ 2 điều kiện kia thì bước tới việc phân tích hệ thống để chia nhỏ thành các microservice. Các cụm microservie này thì nên đi theo chức năng business của hệ thống và chúng cũng nên hạn chế phụ thuộc vào nhau. Tại sao phải như vậy vì các microservice tách biệt nhau nên chúng phải giao tiếp nhau trên qua đường truyền mạng và như vậy có thể khiến nó chậm hơn so với mô hình monolithic truyền thống. Lập luận ngược lại với mô hình monolithic liệu có làm được vậy không thì xin thưa là có. Vẫn 2 điều tiên quyết trên, người kỹ sư sẽ thiết kê sao cho hệ thống họ ổn định phần base, có thể scale được cả theo chiều rộng và chiều sâu với mô hình truyền thống kia, rồi khi implement thì code ngon, rõ ràng, document có đầy đủ và chi tiết thì hệ thống monolithic thừa sức đáp ứng được cái ưu điểm đầu tiên. Đó, các bạn thấy rõ chưa, đó không phải là ưu điểm thực sự của microservice. Đừng nghĩ chia nhỏ ra là bớt rối rắm, bớt độ phức tạp, microservice khi càng mở rộng thì phức tạp, risk cũng cao như monolithic thôi.

Vậy khi nào chọn dùng microservice:
- Hệ thống có thể chia nhỏ thành các cụm service có tính độc lập cao, nghĩa là cụm service này ít hoặc không bị phụ thuộc vào cụm service khác
- Mỗi cụm service muốn scale theo các hướng và mức độ khác nhau
- Mỗi một cụm service muốn sử dụng các công nghệ khác nhau. Vd như cụm service quản lý đơn thuần thì có thể dùng rails, cụm service chuyên phân tích, dự đoán thì lại dùng Python để tận dụng ML
- (Chắc còn nhưng mình k biết, để mình nghĩ tiếp nhé, bye... :D )