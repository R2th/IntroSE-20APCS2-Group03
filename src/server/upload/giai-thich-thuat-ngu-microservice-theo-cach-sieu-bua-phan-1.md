Giaosucan Blog - Chia sẻ kiến thức theo cách bá đạo
### http://www.giaosucan.com/
### https://www.facebook.com/Giaosucan/

Cảnh báo, biết viết chứa nhiều nội dung 18+, nghiêm cấm phụ nữ có thai và cho con bú. Những hình ảnh và nội dung trong bài có thể làm vẩn đục tâm hồn ngây thơ, trong trắng của các bạn

![](https://images.viblo.asia/099e5742-88c0-4b24-a1eb-9bc656fc5410.jpg)

Trong bất kì lĩnh vực nào, các bạn sẽ đều bắt gặp những thuật ngữ “chuyên môn”. Ví dụ ở thế giới của thiên địa, các bạn sẽ được nghe những hot keyword như “check hàng”, “rau sạch”, “some swing”. Trong thế giới của kiếm hiệp, đó là “võ lâm giang hồ”, “khẩu quyết võ công”, “bí kíp”. Còn thế giới drama Hàn Quốc, đó là Uppa, Sunbae, Aegyo. Tóm lại là tả pì lù, không bút nào kể xiết.
Thế giới của Microservice cũng vậy, các bạn sẽ phải tìm hiểu những khái niệm, những thuật ngữ “trên trời” kiểu như Domain Driven Design, Distributed Transaction, Boundary Context, Anti-Pattern, Stranger Pattern, Anemic Domain… Những khái niệm này nếu tra cứu Google sẽ ra hàng nghìn kết quả hàn lâm mà cỡ phải IQ như Ngô Bảo Châu đọc mới hiểu nổi. Bài viết này sẽ giải thích các thuật ngữ trên bằng một hình thức khác, thấm đẫm chất 18+ và có phần siêu bựa.
## Boundary Context
Đây là một thuật ngữ được dùng nhiều trong Domain Driven Design (DDD), một chiến lược thiết kế phần mềm do Eric Evans đề xuất. Phương pháp này được áp dụng rất hiệu quả trong Microservice. Mình sẽ có series cụ thể riêng về cái này
Đây là cách giải thích theo kiểu hàn lâm của Eric Evans, có lẽ chỉ dành người có IQ cao
![](https://images.viblo.asia/453db696-6c70-4a3d-9a97-9f31e2d433a1.png)
Còn đây là cách giải thích “siêu bựa” của Giaosucan’s blog
![](https://images.viblo.asia/14d19f6f-1b2e-4019-a663-6910ac35fafb.png)
Ngọc Trinh là một Domain Entity (hiểu theo khái niệm Microservice), thực chất là một object với các thuộc tính như Tên, Giới tính, địa chỉ… 
Theo mô tả của Eric Evan 
An entity’s identity can cross multiple microservices or Bounded Contexts.
Có thể hiểu thế này
Ở ngữ cảnh Việt Nam, Domain Entity Ngọc Trinh trở thành người Vietnamese woman có tính cách trung hậu đảm đang, có vẻ đẹp thùy mị đoan trang. Tóm lại công, dung ngôn, hạnh đủ cả.
Nhưng ở ngữ cảnh Showbiz, Ngọc Trinh lại trở thành 1 idol. Ở ngữ cảnh này, người ta chỉ quan tâm đến Nickname, số đo 3 vòng, công ty quản lý (Venus) và ko care mấy cái trên
Còn ở ngữ cảnh thiên địa, Ngọc Trinh là trở thành “hàng”, anh em đồng râm lại chỉ quan tâm đến thuộc tính như xôi, bưởi, sò của em ý.
Như vây, cùng 1 domain entity nhưng ở những ngữ cảnh khác nhau, nó lại được thể hiện với tên và thuộc tính khác nhau, mặc dù đó vẫn chỉ là 1 mình em Ngọc Trinh. Các Context trên trở thành Boundary Context, các boundary context này sẽ giới hạn thuộc tính, và behavior của Entity tùy thuộc vào nghiệp vụ. Ví dụ Context Thiên Địa thì chỉ quan tâm em Ngọc Trinh ở thuộc tính như bưởi to, giò dài chứ ko care thuộc tính tính cách trung hậu đảm đang làm gì.
Khi thiết kế Microservice, các bạn cần xác định được các Boundary Context, data model như trên, từ đó sẽ xác định được các Microservice, data model cần thiết cho chúng, từ đó xây dựng database theo nhu cầu của Micorservice
## Rich domain model vs anemic domain model
![](https://images.viblo.asia/d52ddc48-9342-4c44-bfa9-e0193b1938fd.jpg)

Đây là một thuật ngữ trong Domain Driven. Với cách giải thích hàn lâm của Martin Flower như sau

*The basic symptom of an Anemic Domain Model is that at first blush it looks like the real thing. 
There are objects, many named after the nouns in the domain space, and these objects are connected with the rich relationships and structure that true domain models have. 
The catch comes when you look at the behavior, and you realize that there is hardly any behavior on these objects, making them little more than bags of getters and setters*

Tất nhiên, với cách giải thích trên thì ngay cả Toeic 990 đọc xong cũng thổ huyết mà chết.
Cách giải thích siêu bựa của Giaosucan’s blog
Nếu bạn định nghĩa Domain Entity Ngọc Trinh có thuộc tính như sau
* Name
* Address
* Sex
* Birthday

OK, rồi sao. Ngọc Trinh là người nhưng không có hoạt động gì cả, chỉ có thuộc tính mà không có behavior. Thực tế Ngọc Trinh có behavior như showHang (có thể hiểu là show hàng hay show háng đều OK), dancing… Một domain mà không có behavior là anemic domain, còn có đẩy đủ thuộc tính lẫn behavior thì là Rich domain model
Trong trường hợp Microservice và Bounded Context của bạn đơn giản (a CRUD service) thì dùng anemic domain model là đủ. Tuy nhiên nếu Microservice của bạn phức tạp, business thay đổi liên tục, thì nên thiết kế Rich domain model sẽ tốt hơn
Bài tiếp theo sẽ giới thiệu các thuật ngữ của Microservice tiếp theo, nội dung hứa hẹn “bựa” không kém

Additional resources
* DevIQ. Domain Entity http://deviq.com/entity/
* Martin Fowler. The Domain Model https://martinfowler.com/eaaCatalog/domainModel.html
* Martin Fowler. The Anemic Domain Model
*  https://martinfowler.com/bliki/AnemicDomainModel.html