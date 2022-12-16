Chào mọi người

Sau gần 1 năm rưỡi làm việc ở Nhật, mình cảm thấy nếu chỉ biết mỗi code thì ~~lương vẫn thấp~~ kĩ năng, kiến thức về tech không đủ, và công ty mình cũng đang deploy các sản phẩm của công ty trên AWS cloud. Vì vậy, mình quyết định tìm hiểu về các dịch vụ của AWS. Và nếu tìm hiểu không thì cũng rất dễ lan man(do mình chưa được động vào hệ thống thật ngoại trừ lúc release), vì vậy mình quyết tâm đặt 1 mục tiêu cụ thể là lấy 1 chứng chỉ(~~thực ra là để tiện cho đẹp CV nếu có nhu cầu nhảy việc~~)
# Khó khăn đầu tiên
AWS có rất nhiều dịch vụ khác nhau và để thao tác ở AWS, chúng ta cũng có nhiều role khác nhau. Cụ thể theo như định hướng đã phân ra, chúng ta có Solution Architect, Cert Developer và SysOps(mình tạm skip mấy chứng chỉ Specialty). Và xem path mình thấy: "À, đều từ Cloud Practitioner trước tiên à? Chiến!"

Và cũng may là chưa kịp đk thi thì có tư vấn từ anh em bạn bè: "Cloud Practitioner là dành cho người chưa có base IT thôi. Tốt nghiệp BK chương trình HEDSPI thì skip học luôn level Associate đi". Thế là từ Associate. Cơ mà học cái gì đây?

Sau 1 hồi cân nhắc cẩn thận thì mình quyết định học Solution Architect(SA) vì muốn 1 kiến thức tổng quan về AWS trước. Sau đó sẽ dự định học tới Cert Dev và SysOps để vận hành, thiết lập hệ thống best practice dựa theo kiến thức từ SA.
# Chặng đường học hành
## "Nước đi đó mình nhầm, cho mình đi lại nhaaa"
Trước tiên thì mình nghĩ: "Học thế nào cho nó rẻ, chắc lên AWS đọc doc thôi". Và lạc vào 1 rừng các dịch vụ rồi kiến thức không biết có dùng hay không hay available ở region của mình hay không và đọc doc rồi cũng không tóm tắt được point của service. => Đi lại nước lần 1

Vậy mình sẽ thử cách video cày nhanh như là đi học 1 code framework mới xem sao.

{@embed: https://www.youtube.com/watch?v=Ia-UEYYR44s}

Sau có 30 phút tai mình đã ong ong và có dấu hiệu tẩu hoả nhập ma. Cách này không dùng được rồi => Đi lại nước lần 2 

Lần thử thứ 3 thì mình vẫn chọn phương pháp free(thông cảm, từ lúc sang Nhật mình đốt nhiều tiền quá). Mình học theo course của trang chủ Amazon luôn. Nhưng rất tiếc mấy khoá ấy theo đánh giá cá nhân mình là bị lan man, dài dòng cũng đọng lại không được bao nhiêu....

Và sau 3 lần fail thì mình quyết định bỏ tiền ra học tử tế(cũng may mắn là bỏ tiền xong đỗ thì cty tài trợ lại toàn bộ tiền tài liệu lẫn lệ phí thi)
## Cách học tử tế
Đại loại giống cách của anh @qmau94 nhưng có 1 số cái khác.
### Học ở Coursera

Do mình là newbie đúng nghĩa nên lên Coursera quét xem sao

https://www.coursera.org/learn/aws-fundamentals-going-cloud-native

Review thì sau khóa học, chúng ta sẽ có 1 kiến thức tổng quan về hệ thống cũng như các dịch vụ AWS hay dùng khi deploy 1 trang web thông thường. Khá dễ hiểu, tường minh, có thể ghi chú tức thì dễ dàng và có 1 tuần free.

![](https://images.viblo.asia/9ce8980e-2343-4584-aa9a-48cf6690313c.png)

Vấn đề là sau 1 tuần free thì bạn sẽ phải trả hàng tháng ￥4062(xấp xỉ 1 triệu). Tiền thế thì làm sao mà hàng tháng mua đồ chơi siêu nhân được đây? :'( Và mình phải lên kế hoạch course được chia làm 5 tuần thì mình sẽ phải cày trong 5 ngày để kịp cancel subsciption.

Cũng khá may cho mình là khoá này đơn giản nên chiến thuật có tác dụng. Mình vô cùng kiên định với kế hoạch đó(có áp lực kinh tế 1 chút thì có động lực khá mạnh)

![](https://images.viblo.asia/2161eeaa-20f1-4d2d-8e5f-84aad4c11eb1.png)

Điều mình thích ở coursera là khả năng ghi chú nhanh. Ví dụ như ở ảnh trên ngoài lưu lại script do giảng viên nói mình có thể add ghi chú cá nhân như kia.

Và tới cuối khoá học mình sẽ xem hết các ghi chú của mình ở đây và download xuống máy để ôn luyện.

https://www.coursera.org/learn/aws-fundamentals-going-cloud-native/home/notes

Xong khoá Coursera thì mình đọc sách.

### AWS Certified Solutions Architect Official Study Guide Associate Exam
Em lại xin cảm ơn anh Quang lần nữa. Mình đọc sách, tự tóm tắt và luyện đề trong này để đi thi

https://github.com/qmau-me/books/blob/master/.gitbook/assets/aws-certified-solutions-architect-official-study-guide.pdf

### Các nguồn internet 
Nguồn chủ lực của mình là trang này: https://www.examtopics.com/exams/amazon/

Và ở đây có 2 ngân hàng câu hỏi SAA-C01 và SAA-C02. Học hết là đi thi không phải lo nghĩ.

Quizlet cũng là 1 kênh rất hữu ích để mình học các dạng câu hỏi khác nhau.

Các FaQs của VPC, RDS, EC2, S3 và IAM cũng là các chủ đề mình hay tìm kiếm để nghiên cứu sâu vấn đề. Đây cũng là các nội dung quan trọng của đề thi

Cuối cùng là mindmap này cũng là cách để mình ôn luyện nhanh
https://github.com/gitvani/aws-mindmap

### Chiến thuật ghi điểm

Do đã đăng kí thi rồi nên mình cần phải đỗ. Và muốn đỗ thì cũng phải có 1 cái tủ để chắc chắn ghi điểm. Cái tủ ấy của mình là:

- Các câu hỏi về Availabilty Zones(AZ-Subnet, thứ tự terminate instance,...)
- Standard→Standard IA→One Zone IA→Glacier→S3 Glacier Deep Archive: Giá càng xuống, tốc độ lấy lại dữ liệu từ storage càng chậm. Tuỳ theo yêu cầu chọn storage sẽ đi từ chậm nhất lên cho tới khi gặp cái thoả mãn yêu cầu kĩ thuật, từ đó giải quyết các câu giải pháp nào tốt nhất(vừa đáp ứng đủ vừa rẻ)
- VPC
- AWS SSO: cái này cty mình đang áp dụng nên phải nhớ thôi
# Hoạt động nghỉ ngơi đặc biệt

Học ôn thi thì cũng học vừa vừa thôi :v Và mình chọn giải trí là luyện trống/cajon. Nó sẽ giúp mình luyện được khả năng tập trung cũng như xả hết các sự bức bối(Tất nhiên ở Nhật thì mình cũng phải cách âm rồi nhét túi đậu trong thùng cajon để giảm độ vang và độ ồn)

# Kết quả

Sau 2 tháng học như trên và không hề có thực hành trên hệ thống thật, mình đã đỗ vào tháng 4 với 850+ điểm. Nếu có thực hành thì chắc sẽ trên 900 được.

https://www.credly.com/badges/17efe8cf-9ea6-459f-ade9-dc22fff82000/

Dù thế thì đủ để mình dạo này xin le ve 1 vài task lq tới infra để xem rồi thử với sandbox rồi.
# Lời cuối
Mình viết 1 bài đơn lẻ nên chắc lỡ #MayFest năm nay. Các bạn tham gia MayFest cố lên nhé!

Hãy ghé qua bài viết tiếng Nhật của mình ở dưới để ủng hộ mình.
# Bài viết bản tiếng Nhật
Bài viết bản tiếng Nhật tại https://tech.actindi.net/2021/05/26/094257