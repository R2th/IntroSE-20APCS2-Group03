Chào các bạn, trong bài viết lần trước, mình đã giới thiệu cho các bạn một số khái niệm cơ bản về Kiểm thử phần mềm. Để tiếp tục chuỗi các kiến thức cần thiết cho 1 tester, hôm nay mình sẽ giới thiệu cho các bạn về các quy trình phát triển phần mềm. Đây là 1 kiến thức rất quan trọng và cần thiết không chỉ tester cần hiểu rõ mà ngay cả các developer cũng cần phải biết đến .



# 1. Quy trình phát triển phần mềm là gì?
 - Cũng như các ngành sản xuất khác, quy trình là một trong những yếu tố đầu tiên và cực kỳ quan trọng đem lại thành công cho các nhà phát triển phần mềm, nó giúp cho mọi thành viên trong dự án từ người cũ đến người mới , trong hay ngoài công ty đều có thể xử lý đồng bộ công việc tương ứng với trị trí của mình thông qua cách thức chung của công ty. Có thể nói, quy trình phát triển phần mềm có tính chất quyết định để tạo ra 1 sản phẩm có chi phí thấp và năng suất cao. Để hiểu rõ hơn về Quy trình phát triển phần mềm, chúng ta sẽ cùng tìm hiểu về nó ngay sau đây nhé. 
 
 - Quy trình phát triển phần mềm là một cấu trúc bao gồm tập hợp các thao tác và các kết quả tương quan sử dụng trong việc phát triển để sản xuất ra một sản phẩm phần mềm.
Nhìn chung, một quy trình phát triển phần mềm bao gồm các giai đoạn như sau:
## 1.1. Giải pháp, yêu cầu
Nhiệm vụ: Thực hiện khảo sát chi tiết yêu cầu của khách hàng để từ đó tổng hợp vào tài liệu giải pháp. Tài liệu này phải mô tả đầy đủ các yêu cầu về chức năng, phi chức năng và giao diện. 

Kết quả: Đầu ra của giai đoạn này là Tài liệu đặc tả yêu cầu
## 	1.2. Thiết kế:
Nhiệm vụ: Thực hiện thiết kế và tổng hợp vào tài liệu thiết kế. 

Kết quả: Tài liệu thiết kế tổng thể, thiết kế module, thiết kế CSDL
## 1.3. Lập trình
Nhiệm vụ: Lập trình viên thực hiện lập trình dựa trên tài liệu Giải pháp và Thiết kế đã được phê duyệt.

Kết quả: Source code
## 	1.4. Kiểm thử
Nhiệm vụ: Tester tạo kịch bản kiểm thử( testcase) theo tài liệu đặc tả yêu cầu, thực hiện kiểm thử và cập nhật kết quả vào kịch bản kiểm thử, log lỗi trên các tool quản lý lỗi.

Kết quả: Testcase , lỗi trên hệ thống quản lý lỗi.
## 1.5. Triển khai
Nhiệm vụ: Triển khai sản phẩm cho khách hàng.

Kết quả: Biên bản triển khai với khách hàng.


# 2. Một số mô hình cho việc xây dựng quy trình phát triển phần mềm.
Có rất nhiều mô hình phát triển phần mềm nhưng trong bài viết này, mình sẽ giới thiệu 3 mô hình phát triển phần mềm phổ biến nhất đó là : Mô hình thác nước, Mô hình chữ V, Mô hình Agile(Phương pháp Scrum).
## 2.1. Mô hình thác nước
![](https://images.viblo.asia/1030bd28-865b-4db1-b165-b9cd42256afe.JPG)


Mô hình này gồm các giai đoạn xử lý nối tiếp nhau như sau:
* Thu thập yêu cầu (Requirement gathering) : Đây là giai đoạn xác định các yêu cầu chức năng và phi chức năng mà hệ thống phần mềm cần có. Kết quả của giai đoạn này là bản tài liệu đặc tả yêu cầu. Tài liệu này sẽ là nền tảng cho những giai đoạn tiếp theo cho đến cuối dự án.
* Phân tích hệ thống ( System Analysis): Là giai đoạn định ra làm thế nào để hệ thống phần mềm đáp ứng đúng yêu cầu của khách hàng. Giai đoạn này thực hiện phân tích, thiết kế hệ thống phần mềm.
* Coding:Là giai đoạn thực hiện sản phẩm dựa trên đặc tả yêu cầu và tài liệu thiết kế module.
* Testing: Tester sẽ nhận sản phẩm từ dev và thực hiện kiểm thử cho nhóm các thành phần và kiểm thử hệ thống. Khâu kiểm thử cuối cùng sẽ là Kiểm thử chấp nhận, giai đoạn này còn có sự tham gia của khách hàng.
* Implementation:Triển khai hệ thống ra môi trường của khách hàng.
* Operations &Maintenance: Đây là giai đoạn cài đặt, cấu hình và đào tạo cho khách hàng. Giai đoạn này sửa chữa những lỗi của sản phẩm (nếu có) và phát triển những thay đổi mới được khách hàng yêu cầu.

	**Đặc điểm:**
- Thường áp dụng cho các phần mềm có quy mô vừa và nhỏ.
- Các dự án có yêu cầu rõ ràng, ít thay đổi.
- Nguồn lực được đào tạo và sẵn sàng.

**Ưu điểm:** 
Vì có yêu cầu rõ ràng nên dễ hiểu, dễ áp dụng.
Dễ phân công công việc, bố trí , giám sát

**Nhược điểm:** 
Thực tế cho thấy rằng đến những giai đoạn cuối cùng của dự án mới có khả năng nhận ra sai sót trong những giai đoạn trước để có thể quay lại sửa chữa.


## 2.2. Mô hình chữ V
![](https://images.viblo.asia/8315eeef-a9b0-45f2-b2ba-675dca65cbfb.png)


- Hoạt động tốt với các dự án có quy mô vừa và nhỏ.
- Dễ dàng quản lý vì mỗi giai đoạn có các mục tiêu và mục tiêu được xác định rõ ràng.
- Toàn bộ quy trình được chia thành 2 nhóm giai đoạn tương ứng nhau là phát triển và kiểm thử. Mỗi giai đoạn phát triển sẽ tiến hành song song với một giai đoạn kiểm thử tương ứng. Do đó, các lỗi được phát hiện sớm ngay từ đầu.

 **Ưu điểm**

Ngay từ lúc nhận được tài liệu đặc tả yêu cầu, tester sẽ tham gia vào review tài liệu đặc tả yêu cầu sau đó lên kế  hoạch và thực hiện viết test case. Lỗi được phát hiện từ giai đoạn này sẽ ít tốn thời gian và chi phí hơn các giai đoạn sau.

 **Nhược điểm**

Trong mô hình chữ V, các yêu cầu vẫn được đưa vào thực hiện cùng 1 lúc mà rủi ro về thay đổi yêu cầu từ phía khách hàng là rất lớn. Do đó, mô hình này vẫn có thể gặp rắc rối khi khách hàng thường xuyên thay đổi yêu cầu. 
## 2.3 Mô hình Agile: quy trình Scrum
![](https://images.viblo.asia/260f13d3-82c8-474d-bdc8-43d6f32e85c1.jpg)
**Agile là gì?**
 Agile là một phương pháp phát triển phần mềm linh hoạt để làm sao đưa sản phẩm đến tay người dùng càng nhanh càng tốt.

 **Đặc trưng của Agile:**

 **Tính lặp ( Interative):** Dự án sẽ được thực hiện trong các phân đoạn lặp đi lặp lại. Các phân đoạn (được gọi là Interation hoặc Sprint) này thường có khung thời gian ngắn ( từ 1 đến 4 tuần) . Trong mỗi phân đoạn này , nhóm phát triển phải thực hiện đầy đủ các công việc cần thiết như lập kế hoạch, phân tích yêu cầu, thiết kế, triển khai, kiểm thử để cho ra các phần nhỏ của sản phẩm. 
 
 Các phân đoạn Sprint lặp đi lặp lại trong Agile: các phương pháp Agile thường phân rã mục tiêu thành các phần nhỏ với quá trình lập kế hoạch đơn giản và gọn nhẹ nhất có thể, không thực hiện lập kế hoạch dài hạn.
 
 **Tính tiệm tiến và tiến hóa:** Cuối các phân đoạn Sprint, nhóm phát triển thường cho ra các phần nhỏ của sản phẩm cuối cùng. Các phần nhỏ này thường đầy đủ, có khả năng chạy tốt, được kiểm thử cẩn thận và có thể sử dụng được ngay. Theo thời gian, các phân đoạn này nối tiếp các phân đoạn kia, các phần chạy được tích lũy và lớn dần lên cho tới khi toàn bộ yêu cầu của khách hàng được thỏa mãn.
 
 **Tính thích ứng:** Do các sprint chỉ kéo dài trong khoảng 1 thời gian ngắn và việc lập kế hoạch cũng được điều chỉnh liên tục , nên các thay đổi trong quá trình phát triển đều có thể áp dụng theo cách thích hợp. Theo đó, các quy trình Agile thường thích ứng rất tốt với các thay đổi.

**Scrum là gì?**

 Scrum là một quy trình phát triển phần mềm theo mô hình linh hoạt. Vì thế, nó tuân thủ các nguyên tắc của Agile.
Scrum rất linh hoạt như các phương pháp Agile khác. Nhờ đó nó mang lại tính thích nghi rất cao. Dựa trên các thông tin minh bạch hóa từ các quá trình thanh tra và làm việc, Scrum có thể phản hồi lại các thay đổi một cách tích cực, nhờ đó mang lại thành công cho dự án.

 Các công cụ (artifacts) Scrum:

**Product backlog:**
Đây là danh sách ưu tiên các tính năng (feature) hoặc đầu ra khác của dự án, có thể hiểu như là danh sách yêu cầu (requirement) của dự án. Product Owner  chịu  trách  nhiệm  sắp  xếp  độ  ưu  tiên  cho  từng  hạng  mục  (Product  Backlog Item) trong Product Backlog dựa trên các giá trị do Product Owner định nghĩa

 **Sprint backlog:** Đây là bản kế hoạch cho một Sprint,  là kết quả của buổi họp lập kế hoạch (Sprint Planning). Với sự kết hợp của Product Owner, nhóm sẽ phân tích các yêu cầu theo độ ưu tiên từ cao xuống thấp để hiện thực hóa các hạng mục trong Product Backlog dưới dạng danh sách công việc (TODO list).
 - Product Owner tạo ra Product Backlog chứa các yêu cầu của dự án với các hạng mục được sắp theo thứ tự ưu tiên. Đội sản xuất sẽ thực hiện việc hiện thực hóa dần các yêu cầu của Product Owner với sự lặp đi lặp lại các giai đoạn từ 1 đến 4 tuần làm việc (gọi là Sprint) với đầu vào là các hạng mục trong Product Backlog, đầu ra là các gói  phần  mềm  hoàn  chỉnh  có  thể  chuyển  giao  được  (Potentially  Shippable  Product Increment)
-  Đội sản xuất cùng họp với Product Owner để lập kế hoạch cho từng Sprint. Kết quả của buổi lập kế hoạch (theo cách làm của Scrum) là Sprint Backlog chứa các công việc cần làm trong suốt một Sprint.
- Các Sprint sẽ được lặp đi lặp lại cho tới khi nào các hạng mục trong Product Backlog
đều được hoàn tất.
 - Trong suốt quá trình phát triển, nhóm sẽ phải cập nhật Sprint Backlog và thực hiện công việc họp hằng ngày (Daily Scrum) để chia sẻ tiến độ công việc cũng như các vướng mắc trong quá trình làm việc cùng nhau. Nhóm được trao quyền để tự quản lí và tổ chức lấy công việc của mình để hoàn thành công việc trong Sprint.
 - Khi kết thúc Sprint, nhóm tạo ra các gói phần mềm có chức năng hoàn chỉnh, sẵn sàng chuyển giao cho khác hàng. Buổi họp Sơ kết Sprint (Sprint Review) ở cuối Sprint sẽ giúp khách hàng thấy được nhóm đã có thể chuyển giao những gì, còn những gì phải làm hoặc còn gì phải thay đổi hay cải tiến.
 - Sau khi kết thúc việc đánh giá Sprint, Scrum Master và nhóm cùng tổ chức họp Cải tiến Sprint (Sprint Retrospective) để tìm kiếm các cải tiến trước khi Sprint tiếp theo bắt đầu, điều này sẽ giúp nhóm liên tục học hỏi và trưởng thành qua từng Sprint.

![](https://images.viblo.asia/35a357a0-3d73-4ba1-8027-97042a2a816d.png)

 Bao gồm 4 cuộc họp như sau: 

 **1.	Sprint Planning (Họp Kế hoạch Sprint):** Nhóm phát triển họp với Product Owner để lên kế hoạch làm việc cho một Sprint. Công việc lập kế hoạch bao gồm việc chọn lựa các yêu cầu cần phải phát triển, phân tích và nhận biết các công việc phải làm kèm theo các ước lượng thời gian cần thiết để hoàn tất các tác vụ. Scrum sử dụng cách thức lập kế hoạch từng phần và tăng dần theo thời gian, theo đó, việc lập kế hoạch không diễn ra duy nhất một lần trong vòng đời của dự án mà được lặp đi lặp lại, có sự thích nghi với các tình hình thực tiễn trong tiến trình đi đến sản phẩm.
 
 **2.	Daily Scrum (Họp Scrum hằng ngày):** Scrum Master tổ chức cho Đội sản xuất
họp hằng ngày trong khoảng 15 phút để Nhóm Phát triển chia sẻ tiến độ công việc
Trong cuộc họp này, từng người trong nhóm phát triển lần lượt trình bày để trả lời 3 câu hỏi sau:

+	Hôm qua đã làm gì?

+	Hôm nay sẽ làm gì?

+	Có khó khăn trở ngại gì không?

**3.	Sprint Review (Họp Sơ kết Sprint):** Cuối Sprint, nhóm phát triển cùng với Product Owner sẽ rà soát lại các công việc đã hoàn tất (DONE) trong Sprint vừa qua và đề xuất các chỉnh sửa hoặc thay đổi cần thiết cho sản phẩm.

**4.	Sprint Retrospective (Họp Cải tiến Sprint):** Dưới sự trợ giúp của Scrum Master, nhóm phát triển sẽ rà soát lại toàn diện Sprint vừa kết thúc và tìm cách cải tiến quy trình làm việc cũng như bản thân sản phẩm.
	
 **Bao gồm 3 vai trò:**
 
**1. Product Owner:** Là người chịu trách nhiệm về sự thành công dự án, người định nghĩa các yêu cầu cho sản phẩm và đánh giá đầu ra cuối cùng của các nhà phát triển phần mềm.

**2. Scrum Master:** Là người đảm bảo các sprint được hoàn thành theo đúng quy trình Scrum, giúp đỡ loại bỏ các trở ngại cho đội dự án.

**3. Deverlopment Team:** Là tập hợp của từ 5 đến 9 thành viên chịu trách nhiệm trực tiếp tham gia sản xuất. Tùy theo quy mô của dự án để bố trí số thành viên cho phù hợp.

 **Ưu điểm**

- Phù hợp với các yêu cầu / nghiệp vụ hay thay đổi, hoặc hệ thống nghiên cứu do làm theo từng giai đoạn ngắn ngày, có thể nhìn thấy những rủi ro hay những điểm chưa phù hợp để thay đổi.

**Nhược điểm**
- Thiếu sự nhấn mạnh về thiết kế và tài liệu cần thiết

- Quy mô nhân lực thường giới hạn , sẽ có trở ngại lớn nếu nguồn nhân lực yêu cầu vượt quá con số này ví dụ trong các cuộc họp trao đổi.

- Yêu cầu nguồn nhân lực phải có kiến thức và am hiểu về Agile

Như vậy, trên đây là những kiến thức về các quy trình phát triển phần mềm phổ biến hiện nay mà mình đã tìm hiểu được. Trong quá trình tìm hiểu sẽ không thể tránh được những sai sót, vậy nên nếu có bất kỳ ý kiến đóng góp nào, vui lòng comment bên dưới giúp mình nhé ;) . Chúc các bạn một ngày học tập và làm việc hiệu quả !<3

# 3.Tham Khảo
https://hocvienagile.com/agipedia/cac-vai-tro-trong-scrum/