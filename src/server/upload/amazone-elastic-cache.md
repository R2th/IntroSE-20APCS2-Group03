Ai đã từng tìm hiểu về AWS chắc đã từng nghe qua cụm từ Elastic Cache, Redis hay Memcache.
Vừa qua dự án của mình vừa gặp 1 vấn đề và phải sử dụng đến Redis để giải quyết, nên mình quyết định tìm hiểu về service này của AWS.

### 1.	Các khái niệm
Amazone Elastic Cache là một service cung cấp dịch vụ cache data trên AWS Cloud.
Thật ra để làm được dự án yêu cầu phải lưu dữ liệu bạn vẫn có thể lưu DB chứ không nhất thiết phải sử dụng service này của AWS (bởi vì nó tốn phí).
Tuy nhiên, xét về tính performance của product thì nên lựa chọn Elastic Cache. Bởi lẽ việc extract dữ liệu từ cache chắc chắn sẽ nhanh hơn query từ DB.
Chưa kể khi sử dụng cache thì rule của server từ trước đến nay luôn là tìm dữ liệu tương ứng trong cache trước, rồi mới tìm trong Node (khái niệm node này nếu tìm hiểu sâu hơn về Redis và Memcache sẽ quen thuộc hơn.

Vậy là đại khái các bạn đã hình dung được về Elastic Cache. Vậy còn Redis và Memcache. Chắc chắn ai đã từng tiếp xúc với AWS thì đã biết 2 thuật ngữ này rồi. Elastic Cache chính là dịch vụ cung cấp Redis và Memcache cho bạn sử dụng.


### 2.	Khi nào cần sử dụng Elastic Cache?
Cái này thì có rất nhiều cái để ứng dụng.
Như vừa qua dự án của  mình gặp 1 vấn đề là nhiều request được thực hiện trên những instance khác nhau nhưng lại phải dùng chung 1 object. Do đó mình bắt buộc phải lưu dữ liệu lại để call ra dùng chứ không thể chứa trong object.
Lúc đó có 2 lựa chọn là lưu vào db hoặc sử dụng elastic cache. Và đương nhiên là chúng mình chọn elastic cache (vừa có performance tốt hơn, việc chỉnh sửa cũng ít hơn).
Nói từng ví dụ cụ thể thì khó có thể giúp các bạn overview ra những trường hợp cụ thể có thể dùng elastic cache. Nên mình sẽ nêu ra một số lợi thế của nó, các bạn có thể dựa vào đó để áp dụng vào thực tế.
Elastic Cache được gọi là “As a managed database service” – một service về database cung cấp cho bạn đầy đủ khả năng quản lý.
Và như thế:
-	Tăng performance cho product, đơn giản select từ cache bao giờ cũng nhanh hơn
-	Giảm thiểu cost : đương nhiên bạn vẫn sẽ tốn phí để sử dụng dich vụ của AWS. Tuy nhiên, xét về mặt cấu trúc hạ tầng (infra), nhiều khi sử dụng Elastic Cache sẽ tiết kiệm chi phí hơn là xây dựng db
-	Rate limition: thông thường 1 vài API chỉ cho phép bao nhiêu request trong 1 khoảng thời gian nhất định (như API của Twitter chẳng hạn), với Amazon ElastiCache for Redis engine bạn có thể sử dụng increment counter và những tool khác để gia tăng tốc độ truy cập của API từ đó có thể có nhiều request hơn trong 1 khoảng thời gian quy định
…

### 3.	Nên chọn Redis hay Memcache
Trong các dự án hiện tại thì mình thấy mọi người hay lựa chọn Redis hơn là Memcache, đơn giản Redis là kỹ thuật mới hơn tiện dụng hơn. Memcache thường được dùng trong các ứng dụng cũ.

Cụ thể Redis khác Memcache như thế nào? Cùng so sánh một chút.

Memcache:
-	Chỉ lưu dữ liệu đơn giản dạng value-key.
-	Memcache không có tính persis. Tức là một khi xóa là xóa hẳn, không có backup
-	Memcache cung cấp multi node trong một cluster.
-	Lưu dữ liệu vào RAM


Redis:
-	Lưu được những kiểu dữ liệu phức tạp hơn như: string, hash, sets…
-	Có tính persis, sau một khoảng thời gian thì tự động lưu dữ liệu vào một file dump
-	Lưu dữ liệu vào RAM. Tuy nhiên cũng có cách để đẩy vào swap
-	Cho phép Replication. Khi 1 primary node bị hỏng thì replica sẽ được đẩy lên làm primary node.
-	Single node. 1 cluster chỉ có thể tạo 1 node, tuy nhiên có thể gom các cluster lại thành 1 group
-	Tốm RAM hơn Memcache (nhiều khi dữ liệu ở file dump là 1GB nhưng ở RAM lại ngốn mất 2GB)