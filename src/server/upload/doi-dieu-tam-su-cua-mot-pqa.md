## Giới thiệu 
Trước khi tâm sự về PQA thì trước hết mình xin giải thích để các bạn có thể hiêu về khái niệm PQA.Vậy PQA là gì? PQA là viết tắt của Process Quality Assurance – Bảo đảm chất lượng quy trình. 
Vậy điều gì thú vị đã khiến  mình chọn trở thành 1 PQA. Điều đó đến từ một sự tình cờ có chủ ý của PM dự án mình đang làm. Lúc ấy mình vẫn đang làm 1 dev iOS. Còn dự án mình đang làm với quy mô 30 member bao gồm cả dev và SQA, dự án đang là 1 line trong rất nhiều line đang chạy song song của một đối tác khách hàng rất lớn và khó tính. Vấn đề đặt ra là chưa có 1 hệ thống quy trình chung cho các line dự án nên dễ gây ra conflict giữa các line, member gặp khó khăn trong việc nắm bắt quy trình để follow theo các rules khắt khe của khách hàng. Cộng thêm khối lượng ticket quá nhiều, không có người đảm nhận việc giám sát quy trình đặc biệt là tickets của từng line. Và thế là mình bắt đầu bước chân vào nghề PQA từ đó.
## Các đặc trưng của nghề PQA
![](https://images.viblo.asia/edda9c55-5527-446d-a052-562de2353ce6.png)
### Mục tiêu cần đạt được của PQA
* Xây dựng hệ thống quy trình cho một line dự án nói riêng cũng như toàn bộ các dự án của khách hàng(bằng cách ứng dụng những quy trình quản lý sẵn có như ISO hay CMM hoặc dựa trên đó xây dựng quy trình chuẩn)
* Thực hiện việc giám sát, kiểm tra việc thực hiện quy trình của từng bộ phận, từng dự án mà cụ thể là giám sát ticket có tuân thủ đúng process dự án hay không, từ đó tổng hợp thông tin để đưa ra những cải tiến cho quy trình hoạt động tốt.
### Các công việc cần thực hiện để đạt được mục tiêu của 1 PQA

* Đề xuất, đưa ra quy trình phát triển (development process) sản phẩm phù hợp với yêu cầu của từng dự án. Các quy trình này có thể phát triển dựa trên V-model hay Agile hay thông qua việc áp dụng những quy trình quản lí sẵn có như ISO , CMMI. Như ở công ty mình thì tuỳ vào input source khách hàng cung cấp để quyết định theo Water fall hay Agile
* Soạn thảo ra những tài liệu, biểu mẫu, hướng dẫn để đảm bảo chất lượng của sản phẩm cho tất cả bộ phận trong nhóm phát triển sản phẩm. Các member trong team sẽ follow các tài liệu này để thực hiện
* Tổ chức các buổi training cho member để mọi người có mindset về việc đảm bảo và tuân thủ quy trình sẽ phải tiến hành như thế nào và tầm quan trọng của nó
* Kiểm tra, audit việc thực thi quy trình của các bộ phận trong nhóm sản phẩm có đúng quy trình đã đề ra không.
* Nhắc nhở đội ngũ phát triển sản phẩm việc tuân thủ theo quy trình và deadline làm việc đã đưa ra.
* Điều chỉnh, thay đổi quy trình phù hợp với từng sản phẩm mà các team đang thực hiện.

### PQA là 1 nghề cần đến sự mềm dẻo và khéo léo trong công việc

Với tất cả những công việc và nhiệm vụ của 1 PQA, bạn có thể thấy 1 điều đơn giản đó chính là PQA chạm đến mọi ngõ ngách trong dự án từ việc implement task của dev, việc kiểm thử phần mềm của SQA và cả việc quản lý dự án của PM, việc trao đổi với khách hàng của BrSe. Nếu PQA ko mềm dẻo và khéo léo tìm được một tiếng nói chung với các member trong dự án thì sẽ rất khó để cùng mọi người xây dựng lên 1 quy trình phù hợp với riêng từng dự án và PQA sẽ thành một người dễ ghét nhất trong dự án.

Vậy nên lời khuyên cho tất cả các PQA mới vào nghề đó chính là quy trình dự án đặt lên hàng đầu thì xếp thứ 2 chắc chắn là sự linh hoạt trong công việc. Con người và dự án không phải là cỗ máy rập khuôn, chỉ có sự linh hoạt mới có thể khiến dự án vận hành theo quy trình được mượt mà
## Tại sao các doanh nghiệp hiện nay cần PQA
Với công việc đúng nghĩa như trên thì PQA đang là nhân sự cần thiết mà các doanh nghiệp rất cần để có thể tiết kiệm được chi phí hoạt động của dự án. Doanh nghiệp phần mềm nào cũng hiểu rằng xây dựng được một quy trình quản lý chất lượng tốt chính là cách làm tăng lợi nhuận hơn gấp nhiều lần. 
Trong chi phí về chất lượng sản phẩm, có 3 loại chi phí con:
* Chi phí chặn lỗi (prevention cost); 
* Chi phí kiểm soát lỗi (control cost) 
* Chi phí xảy ra khi có lỗi (failure).
 Theo một số tài liệu về quy trình sản xuất phần mềm , 1 đồng bỏ ra cho khâu thứ nhất sẽ làm giảm 10 đồng cho khâu thứ 3, và 1 đồng cho khâu thứ 2 sẽ giảm 3 đồng cho khâu thứ 3. Muốn làm được việc ấy, điều hiển nhiên phải có người đưa quy trình ấy vào thực tế. Nhưng để tuyển được một PQA không phải là điều đơn giản.
## Tại sao hiện nay có rất nhiều người muốn theo đuổi nghề PQA
###  PQA đòi hỏi rất nhiều cho một nhân viên QA giỏi
* Cần hiểu biết về quy trình ở mức sâu, khả năng trình bày, thuyết phục tốt, biết lắng nghe, để thấy cái gì cần điều chỉnh thì điều chỉnh và cũng để thuyết phục tốt hơn, kỹ năng đo lường và phân tích số liệu, kỹ năng làm phần mềm 
* Mới chỉ biết quy trình làm phần mềm phải theo những bước nào nhưng giữa các bước đó có liên quan với nhau như thế nào, cần kiểm tra ra sao mà chưa hình dung được thì rất khó để làm 1 PQA giỏi
* Để đào tạo họ hiểu biết về hệ thống, tư duy về hệ thống và hiểu biết về mô hình quản lý chất lượng thì không thể trong một thời gian ngắn. Thông thường họ cũng phải trải qua vài dự án làm việc test lỗi với mức độ khó dần để hình dung được quy trình, nắm bắt được yêu cầu của dự án”.
### Kết luận
Tuy nhiên càng thử thách càng khó khăn lại càng khiến người ta muốn theo đuổi và chinh phục. Hiểu và nắm được quy trình vận hàng dự án sẽ giúp bạn nắm được chìa khoá then chốt trong việc phát triển sự nghiệp của riêng mình cũng như sự phát triển lâu dài của doanh nghiệp