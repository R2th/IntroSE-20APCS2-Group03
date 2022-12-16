Xin chào tất cả các bạn, hôm nay mình sẽ chia sẻ lộ trình học **QA/ Tester** dành cho những bạn mới bắt đầu. Tài liệu này phù hợp với những bạn vừa mới ra trường hoặc những bạn từ nghề khác muốn chuyển sang làm **QA/Tester** nhé. 

### Mình sẽ chia sẻ các kiến thức sau:
- Kiểm thử phần mềm là gì? 
- Nghề QA/Tester cần có những tố chất gì? 
- 1 dự án phần mềm bao gồm những vị trí nào? 
- Vòng đời của phát triển phần mềm?
- Các mô hình phát triển phần mềm? 
- Test Plan là gì? File QA management template?
- Test viewpoint là gì? Testcase là gì? 
- Cách tạo testcase, checklist? Viết TC, CL trên công cụ nào? Các thuật ngữ tiếng anh hay dùng? Template testcase.
- Các phương phát viết testcase?
- Các giai đoạn Testing? 
- Bug là gì? Dùng công cụ gì để logbug? 
- Vòng đời của bug? 
- Template logbug
- Cách đặt Q&A trong dự án phần mềm?
- Sự khác nhau giữa công ty Outsourcing và Product?
- Các câu hỏi phỏng vấn khi ứng tuyển vị trí QA/Tester? 

### A. Nghề QA/Tester ( Kiểm thử phần mềm) là gì?

**1. Kiểm thử phần mềm là:**
+ quá trình kiểm tra và phát hiện lỗi của phần mềm.
+ giúp đảm bảo đáp ứng đầy đủ các tiêu chí, yêu cầu của khách hàng.  
+ Đồng thời đánh giá và kiểm soát được những rủi ro có thể xảy ra trong quá trình thực thi.

**2. Nghề QA/Tester cần có những tố chất gì?**
- Cần có tính chăm chỉ, cẩn thận, tỉ mỉ, có trách nhiệm với công việc. 
- Cần trau dồi kỹ năng phân tích nghiệp vụ và xử lý vấn đề tốt.
- Cần có tinh thần ham học hỏi, tiếp thu và không ngừng học hỏi những kiến thức mới.

**3. Trong 1 dự án phần mềm bao gồm những vị trí nào:**
- PM ( Project Manager): là quản lý dự án - người chịu trách nhiệm cao nhất về tất cả các vấn đề trong dự án.
- Brse( Kĩ sư cầu nối): là người trung gian giữa khách hàng và team phát triển phần mềm, là người thu thập specs ( tài liệu) để cho team phát triển phần mềm làm việc.
- Comtor: là người dịch, confirm tài liệu ( công việc cũng gần giống với Brse)
- Designer: là người dựa vào specs để thiết kế ra các màn hình mà khách hàng mong muốn, từ đó làm tài liệu để Dev team và QA team dựa vào để code và testing.
- Dev leader ( trưởng nhóm team developer): là người chịu trách nhiệm về phần code và assign task cho Dev member.
- Dev member: là người thực hiện phát triển phần mềm theo các màn hình mà được Dev leader giao.
- QA leader ( trưởng nhóm team QA/Teser): là người chịu trách nhiệm về chất lượng của phần mềm và assign task cho QA member 
- QA member: là người thực hiện kiểm soát chất lượng phần mềm các chức năng/ màn hình mà QA leader giao.

### B. Vòng đời của phát triển phần mềm (Software Development Life-cycle - SDLC) là gì? 
- Là 1 quy trình sản xuất phần mềm với chất lượng cao nhất và chi phí thấp nhất trong thời gian ngắn nhất để đạt được 1 hiệu quả tốt nhất khi nghiên cứu và sáng tạo ra 1 phần mềm.
-  Là 1 khung xác định các nhiệm vụ được thực hiện ở mỗi bước trong quy trình phát triển phần mềm. 
-  Nó bao gồm 5 giai đoạn:

![](https://images.viblo.asia/2a1ddef0-6812-4e9f-96c0-55425a7eefaf.png)

**1.1 Requirement Analysis:**
- Ở giai đoạn này, người đóng vai trò là Brse sẽ đi gặp và trao đổi với khách hàng cũng như làm rõ các chức năng, các yêu cầu mà khách hàng mong muốn xây dựng trong phần mềm của mình. Trong thực tế khi ở giai đoạn này các đơn vị phần mềm sẽ có bộ câu hỏi chung dành cho các dự án cũng như câu hỏi riêng cho đặc thù của dự án cần làm.

- Đây là giai đoạn quan trọng ảnh hưởng đến việc xây dựng và phát triển phần mềm trong thời gian tới do vậy đội ngũ Brse thường là những người đã có nhiều kinh nghiệm để giúp trong quá trình trao đổi với khách hàng sẽ làm rõ và hiểu đúng được các yêu cầu bài toán của khách hàng cũng như thu thập các biểu mẫu thông tin liên quan đến dự án về phục vụ phân tích ở giai đoạn kế tiếp.
- Sau khi đã ghi nhận các yêu cầu của khách hàng về Brse sẽ thực hiện làm rõ các yêu cầu và hiện thực hóa bằng một tài liệu SRS gọi là “Tài liệu đặc tả“. Đây là tài liệu rất quan trọng đối với qúa trình phát triển phần mềm vì bao gồm tất cả các yêu cầu sản phẩm được thiết kế và phát triển trong suốt vòng đời dự án. Các bộ phận liên quan như Dev team, QA team… sẽ thực hiện công việc dựa trên mô tả các chức năng chi tiết trong tài liệu và nó sẽ trả lời câu hỏi “Phần mềm sẽ làm gì ?“. 

**1.2 Design:**
- Sau khi căn cứ vào tài liệu đặc tả (specs), bên Designer sẽ thiết kế đưa ra giao diện chi tiết theo từng chức năng của phần mềm để trao đổi và thống nhất với khách hàng về giao diện, bố cục. Khi khách hàng đồng ý với thiết kế phần mềm theo prototype đó sẽ mới chuyển sang giai đoạn tiếp theo nếu không sẽ ghi nhận ý kiến đóng góp và thực hiện chỉnh sửa cho đến khi khách hàng đồng thuận với bản prototype phần mềm.

**1.3. Devepment:**
- Trong giai đoạn này, Dev team sẽ bắt đầu lên plan các màn hình mình cần phải làm. Sau đó sẽ xử lý chức năng, module theo yêu cầu được giao -> sau đó sẽ chuyển cho QA/Tester team để thực hiện kiểm tra các chức năng theo testcase được xây dựng dựa trên tài liệu đặc tả.

**1.4. Testing:**

- Ở giai đoạn này, các QA/Tester sẽ nhận được các task chức năng/function đã làm xong từ Dev team. Sau đó QA team sẽ thực hiện kiểm tra các chức năng này theo các testcase được xây dựng. Trong quá trình test theo testcase nếu có phát sinh lỗi, QA/Tester sẽ thực hiện báo bug lỗi để Dev team xử lý chức năng đó.

- Quá trình kiểm thử chức năng, kiểm tra lại, báo bug lỗi, báo cáo sẽ thực hiện đi thực hiện lại cho đến khi các chức năng lập trình đã thực hiện đúng theo tài liệu đặc tả hay yêu cầu của khách hàng.

- Sau khi hoàn thiện các chức năng cũng như đạt yêu cầu về kiểm thử, phần mềm sẽ được triển khai thử nghiệm trên môi trường của khách hàng ( Môi trường Production) . Nếu có yêu cầu chỉnh sửa đội ngũ phát triển phần mềm sẽ thực hiện bổ sung, sửa lỗi để có thể nghiệm thu phần mềm.

**1.5. Maintance**
- Một khi sản phẩm sau khi được kiểm thử và sẵn sàng triển khai, sản phẩm được release chính thức trên môi trường Production. Trong quá trình sử dụng phần mềm của khách hàng, công ty phát triển phần mềm sẽ phải hỗ trợ, xử lý lỗi nếu có phát sinh trong quá trình sử dụng. Ở đây có 2 khái niệm cần chú ý đó là:

+ Software repair (bảo trì sửa lỗi): Thực hiện chỉnh sửa các lỗi phát sinh trong quá trình sử dụng phần mềm của khách hàng.

+ Software update (bảo trì cập nhật): Bảo trì hoàn thiện: Sửa đổi phần mềm theo ý khách hàng, Bảo trì thích nghi: Sửa đổi để phần mềm thích nghi với môi trường mới.