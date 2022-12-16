Một trong những kiến thức cần thiết của một kỹ sư kiểm thử phần mềm chuyên nghiệp đó là hiểu biết và nắm rõ SDLC (Software Development Life-cycle/chu kỳ phát triển phần mềm), bởi vì kiểm thử phần mềm (software testing) là 1 phần và liên quan chặt chẽ, mật thiết đến SDLC. 

Vòng đời phát triển phần mềm (SDLC – Software Development Life Cycle) là một quá trình theo sau cho một dự án phần mềm, trong một tổ chức phần mềm. Nó bao gồm một kế hoạch chi tiết mô tả làm thế nào để phát triển, duy trì, thay đổi hoặc nâng cấp phần mềm cụ thể. 

Quy trình là một trong những yếu tố cực kỳ quan trọng đem lại sự thành công cho các nhà sản xuất phần mềm, nó giúp cho mọi thành viên trong dự án từ người cũ đến người mới, trong hay ngoài công ty đều có thể xử lý đồng bộ công việc tương ứng vị trí của mình thông qua cách thức chung của công ty, hay ít nhất ở cấp độ dự án.

![](https://images.viblo.asia/6b2548be-c858-4ef0-b90a-8cc9fa956551.png)

Trong thực tế các công ty xây dựng và phát triển phần mềm tùy theo từng quy mô, hình thức hoạt động mà có thể điều chỉnh gộp tách các giai đoạn tùy theo nhu cầu thực tế của công ty đó. Tuy nhiên để tạo ra một sản phẩm phần mềm sẽ bao gồm các giai đoạn sau:

1. Pha yêu cầu                        

2. Pha đặc tả                         

3. Pha thiết kế                     

4. Pha lập trình

5. Pha kiểm thử

6. Pha triển khai và bảo trì 

![](https://images.viblo.asia/d671bb75-f213-4a69-876f-59cf60591cb3.png)

## 1. Pha yêu cầu
Ở pha này bộ phận phân tích yêu cầu sẽ đi gặp và trao đổi với khách hàng cũng như làm rõ các chức năng, các yêu cầu mà khách hàng mong muốn xây dựng trong phần mềm của mình. Trong thực tế khi ở pha này các đơn vị phần mềm sẽ có bộ câu hỏi chung dành cho các dự án cũng như câu hỏi riêng cho đặc thù của dự án cần làm.

Đây là pha quan trọng ảnh hưởng đến việc xây dựng và phát triển phần mềm trong thời gian tới do vậy đội ngũ phân tích yêu cầu thường là những người đã có nhiều kinh nghiệm giúp trong quá trình trao đổi với khách hàng sẽ làm rõ và hiểu đúng được các yêu cầu bài toán của khách hàng cũng như thu thập các biểu mẫu thông tin liên quan đến dự án về phục vụ phân tích ở giai đoạn kế tiếp.

## 2. Pha đặc tả 
Đây là pha sẽ được thực hiện sau khi đã ghi nhận các yêu cầu của khách hàng về bộ phận phân tích sẽ thực hiện làm rõ các yêu cầu và hiện thực hóa bằng một tài liệu **SRS**  gọi là “Tài liệu đặc tả“. Đây là tài liệu rất quan trọng đối với qúa trình phát triển phần mềm vì bao gồm tất cả các yêu cầu sản phẩm được thiết kế và phát triển trong suốt vòng đời dự án. Các bộ phận liên quan như lập trình, kiểm thử viên,… sẽ thực hiện công việc dựa trên mô tả các chức năng chi tiết trong tài liệu và nó sẽ trả lời câu hỏi “Phần mềm sẽ làm gì ?“.

## 3. Pha thiết kế
Ở pha này sau khi căn cứ vào tài liệu đặc tả, bộ phận thiết kế sẽ thiết kế đưa ra giao diện chung cũng như bộ phận lập trình sẽ thiết kế giao diện mức chi tiết theo từng chức năng của phần mềm. Tức là sẽ hiển thực hóa các chức năng trong tài liệu mô tả thành giao diện chức năng phần mềm dạng prototype. Sau đó sử dụng bản khung phần mềm này để trao đổi và thống nhất với khách hàng về giao diện, bố cục. Khi khách hàng đồng ý với thiết kế phần mềm theo prototype đó sẽ mới chuyển sang giai đoạn tiếp theo nếu không sẽ ghi nhận ý kiến đóng góp và thực hiện chỉnh sửa cho đến khi khách hàng đồng thuận với bản prototype phần mềm.

## 4. Pha lập trình
Trong giai đoạn này SDLC bắt đầu phát triển thực tế và sản phẩm được xây dựng. Pha lập trình là pha hiện thực hóa các chức năng của phần mềm sau khi khách hàng đã thống nhất prototype của phần mềm. Ở pha này các lập trình viên (developer) sẽ lập trình xử lý chức năng, module theo yêu cầu được giao giao sau đó sẽ chuyển cho kiểm thử viên thực hiện kiểm tra các chức năng theo testcase được xây dựng dựa trên tài liệu đặc tả. 

## 5. Pha kiểm thử
Ở pha này, các kiểm thử viên sẽ nhận được các bàn giao chức năng thực hiện từ lập trình viên. Sau đó các kiểm thử viên sẽ thực hiện kiểm tra các chức năng này theo các testcase được xây dựng. Trong quá trình kiểm thử theo testcase nếu có phát sinh lỗi, kiểm thử viên sẽ thực hiện báo bug lỗi để lập trình viên xử lý chức năng đó fix lỗi.

Quá trình kiểm thử chức năng, kiểm tra lại, báo bug lỗi, báo cáo sẽ thực hiện đi thực hiện lại cho đến khi các chức năng lập trình đã thực hiện đúng theo tài liệu đặc tả hay yêu cầu của khách hàng.

Sau khi hoàn thiện các chức năng cũng như đạt yêu cầu về kiểm thử, phần mềm sẽ được triển khai thử nghiệm trên môi trường của khách hàng. Nếu có yêu cầu chỉnh sửa đội ngũ phát triển phần mềm sẽ thực hiện bổ sung, sửa lỗi để có thể nghiệm thu phần mềm.

## 6. Pha triển khai bảo trì
Một khi sản phẩm sau khi được kiểm thử và sẵn sàng triển khai, sản phẩm được phát hành chính thức trên thị trường thích hợp. Đôi khi việc triển khai sản phẩm xảy ra theo từng giai đoạn theo chiến lược kinh doanh của tổ chức đó. Trong quá trình sử dụng phần mềm của khách hàng, công ty phát triển phần mềm sẽ phải hỗ trợ, xử lý lỗi nếu có phát sinh trong quá trình sử dụng. Ở đây có 2 khái niệm cần chú ý đó là:

– Software repair (bảo trì sửa lỗi): Thực hiện chỉnh sửa các lỗi phát sinh trong quá trình sử dụng phần mềm của khách hàng.

– Software update (bảo trì cập nhật)
+ Bảo trì hoàn thiện: Sửa đổi phần mềm theo ý khách hàng
+ Bảo trì thích nghi: Sửa đổi để phần mềm thích nghi với môi trường mới

# Mô hình SDLC

Có nhiều mô hình vòng đời phát triển phần mềm được xác định và thiết kế theo sau trong quá trình phát triển phần mềm. Các mô hình này được gọi là các mô hình quá trình phát triển phần mềm. Mỗi mô hình quy trình tuân theo các bước cho kiểu của nó để đảm bảo thành công trong quá trình phát triển phần mềm.
Sau đây là các mô hình SDLC quan trọng và phổ biến nhất:

## 1. Mô hình thác nước – Waterfall 

![](https://images.viblo.asia/9fe38dc0-1031-4bad-84e6-f89c247d5f7a.png)

*Mô hình này bao gồm các giai đoạn xử lý nối tiếp nhau như sau:*
* **Phân tích yêu cầu và tài liệu đặc tả (Requirements and Specifications)**: là giai đoạn xác định những Yêu cầu liên quan đến chức năng và phi chức năng mà hệ thống phần mềm cần có. Giai đoạn này cần sự tham gia tích cực của khách hàng và kết thúc bằng một tài liệu được gọi là “Bản đặc tả yêu cầu phần mềm” hay SRS (software requirement specification). Tài liệu Đặc tả yêu cầu chính là nền tảng cho các hoạt động tiếp theo cho đến cuối dự án. 
* **Phân tích hệ thống và thiết kế (System Analysis and Design)**: là giai đoạn định ra làm thế nào để hệ thống phần mềm đáp ứng những yêu cầu mà khách hàng yêu cầu trong tài liệu SRS.
* **Lập trình (Coding and Unit Test)**: là giai đoạn hiện thực làm thế nào được chỉ ra trong giai đoạn “Phân tích hệ thống và thiết kế” 
*  **Kiểm thử (Test)**: bao gồm kiểm thử tích hợp cho nhóm các thành phần và kiểm thử toàn hệ thống (system test). Một khâu kiểm thử cuối cùng thường được thực hiện là nghiệm thu (acceptance test), với sự tham gia của khách hàng trong vai trò chính để xác định hệ thống phần mềm có đáp ứng yêu cầu của họ hay không.
*  **Cài đặt và bảo trì (Deployment and Maintenance)**: đây là giai đoạn cài đặt, cấu hình và đào tạo cho khách hàng. Giai đoạn này sửa chữa những lỗi của phần mềm (nếu có) và phát triển những thay đổi mới được khách hàng yêu cầu (như sửa đổi, thêm hay bớt chức năng/đặc điểm của hệ thống). 

## 2. Mô hình chữ V – V model 

![](https://images.viblo.asia/9c83bf08-e5e1-4ab8-9e4a-fe8edc7db0d8.png)

* Trong mô hình Waterfall, kiểm thử được thực hiện trong một giai đoạn riêng biệt. Còn với mô hình chữ V, toàn bộ qui trình được chia thành hai nhóm giai đoạn tương ứng nhau: phát triển và kiểm thử. Mỗi giai đoạn phát triển sẽ kết hợp với một giai đoạn kiểm thử tương ứng 
* Tinh thần chủ đạo của V-model là các hoạt động kiểm thử phải được tiến hành song song (theo khả năng có thể) ngay từ đầu chu trình cùng với các hoạt động phát triển. Ví dụ, các hoạt động cho việc lập kế hoạch kiểm thử toàn hệ thống có thể được thực hiện song song với các hoạt động phân tích và thiết kế hệ thống

## 3. Mô hình Xoắn ốc – Spiral model 

![](https://images.viblo.asia/e3dee13e-5105-4e32-96ca-7cccebfb52ee.png)

* Trong mô hình xoắn ốc, quy trình phát triển phần mềm được thực hiện như một vòng xoáy ốc. Mỗi vòng xoắn ốc biểu diễn một hoạt động trong tiến trình phát triển phần mềm 
* Nó dựa trên ý tưởng là tối thiểu hóa rủi ro, bằng viêc phân tích yếu tố rủi ro ở mỗi bước lặp và sử dụng phương pháp làm bản mẫu. Quá trình phát triển được chia thành nhiều bước lặp lại, mỗi bước bắt đầu bằng việc lập kế hoạch, phân tích rủi ro, rồi tạo bản mẫu, hoàn thiện và phát triển hệ thống, duyệt lại, và cứ thế tiếp tục. Nội dung gồm 4 hoạt động chính:

Lập kế hoạch: xác định mục tiêu, giải pháp và ràng buộc

Phân tích rủi ro: phân tích các phương án, xác định và giải quyết rủi ro

Phát triển và kiểm định: phát triển sản phẩm “mức tiếp theo”. Xây dựng một hay một số biểu diễn của ứng dụng 

Lên kế hoạch cho chu kỳ lặp tiếp theo: kiểm duyệt tất cả các kết quả của các giai đoạn con xảy ra trước đó và lập kế hoạch cho chu kỳ lặp tiếp theo. 

* Với mỗi lần lặp vòng xoắn ốc (bắt đầu từ tâm), các phiên bản được hoàn thiện dần. Tại một vòng xoắn ốc, phân tích rủi ro phải đi đến quyết định “ tiến hành tiếp hay dừng “. Nếu rủi ro quá lớn, thì có thể đình chỉ dự án hay thay đổi yêu cầu đặt ra cho thích hợp. Mô hình này thích hợp để phát triển các hệ thống quy mô lớn. 

## 4. Mô hình Agile: quy trình Scrum 

![](https://images.viblo.asia/e977f38b-099e-48d7-b56e-5162d18121f1.png)

Sprint là chu trình nhỏ để phát triển sản phẩm. Trong Sprint, nhóm dự án sẽ tập trung phát triển những chức năng cụ thể nào đó và hoàn thiện nó vào mỗi cuối sprint. Mỗi Sprint có thời gian thống nhất, thường là 1 hoặc 2 tuần và thường không quá 4 tuần. 

*  Trước khi cả nhóm thực hiện làm các sprint, đội sản xuất cùng họp với Product Owner để lập kế hoạch cho từng Sprint (gọi là Scrum Meeting). Kết quả của buổi lập kế hoạch (theo cách làm của Scrum) là Sprint Backlog chứa các công việc cần làm trong suốt một Sprint
*  Trong suốt quá trình phát triển, nhóm sẽ phải cập nhật Sprint Backlog và thực hiện công việc họp hằng ngày (Daily Scrum) để chia sẻ tiến độ công việc cũng như các vướng mắc trong quá trình làm việc cùng nhau. Nhóm được trao quyền để tự quản lí và tổ chức lấy công việc của mình để hoàn thành công việc trong Sprint
*  Buổi họp Sơ kết Sprint (Sprint Review) ở cuối Sprint sẽ giúp khách hàng thấy được nhóm đã có thể chuyển giao những gì, còn những gì phải làm hoặc còn gì phải thay đổi hay cải tiến. Sau khi kết thúc việc đánh giá Sprint, Scrum Master và nhóm cùng tổ chức họp Cải tiến Sprint (Sprint Retrospective)  để tìm kiếm các cải tiến trước khi Sprint tiếp theo bắt đầu, điều này sẽ giúp nhóm liên tục học hỏi và trưởng thành qua từng Sprint. 
*  Các Sprint sẽ được lặp đi lặp lại cho tới khi nào các hạng mục trong Product Backlog đều được hoàn tất hoặc khi Product Owner quyết định có thể dừng dự án căn cứ tình hình thực tế. Do quy trình luôn luôn được cải tiến, nhóm Scrum thường có năng suất lao động rất cao. Đây là hai lợi ích to lớn mà Scrum mang lại cho tổ chức. 
*  Scrum định nghĩa quy tắc cho bốn sự kiện chủ chốt (các cuộc họp) nhằm tạo môi trường và quy cách hoạt động và cộng tác cho các thành viên trong dự án. Các lễ nghi này diễn ra trước khi Sprint bắt đầu (Sprint Planning), trong khi Sprint diễn ra (Daily Scrum) và sau khi Sprint kết thúc (Sprint Review và Sprint Retrospective)
*  Trong Scrum, đội ngũ tham gia phát triển phần mềm được phân chia ra ba vai trò với trách nhiệm rõ ràng để đảm bảo tối ưu hóa các công việc đặc thù. Ba vai trò này bao gồm: **Product Owner** (chủ sản phẩm), **Scrum Master** và **Development Team** (Đội sản xuất hay Nhóm Phát triển). 

Product Owner: Là người chịu trách nhiệm về sự thành công của dự án, người định nghĩa các yêu cầu và đánh giá cuối cùng đầu ra của các nhà phát triển phần mềm

Scrum Master: họ phải đảm bảo các sprint được hoàn thành đúng mục đích, bảo vệ đội làm việc và loại bỏ các trở ngại

Development Team: thường từ 5-9 người, tùy theo quy mô dự án nó có thể có rất nhiều đội, nhiều người tham gia. 

# Tài liệu tham khảo
https://www.tutorialspoint.com/sdlc/sdlc_overview.htm

http://istqbexamcertification.com/what-are-the-software-development-life-cycle-sdlc-phases/