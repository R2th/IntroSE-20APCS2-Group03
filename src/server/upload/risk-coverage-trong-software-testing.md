# Mở đầu

Trong kỉ nguyên của Agile và DevOps, các quyết định release cần đưa ra nhanh chóng, kể cả tự động và tức thời. Kết quả test thường chỉ tập chung vào số lượng case đã test khiến bạn có một điểm mù rất lớn. Nếu bạn muốn đánh giá nhanh và chính xác các rủi ro liên quan đến các bản phát hành chuẩn bị lên PRD, bạn cần phải tiến hành đánh giá Risk coverage thay thế cho test coverage

Nếu bạn đã từng nhìn vào test result, bạn có thể thấy một cái gì đó như thế này:

![](https://images.viblo.asia/3a272b39-af53-4e5d-91de-7212ab82e725.png)

Điều này thực sự nói với bạn điều gì?

Có tổng cộng 53.274 test case
Gần 80% case (42.278) đã pass
Hơn 19% trong số đó failed
Khoảng 1% đã không execute

Nhưng bạn có sẵn sàng đẩy version này lên PRD dựa trên kết quả này không?

Có thể kết quả test fail liên quan đến một số chức năng normal, có thể xuất phát từ những chức năng main của hệ thống, chính là xương sống của hệ thống. Hoặc tệ hơn là những chức năng chính quan trọng nhất lại chưa được kiểm tra. Việc theo dõi những thông tin này đòi hỏi việc kiểm tra một cách thủ công và mang lại câu trả lời chậm chễ và thường là câu trả lời không chính xác

Trong kỉ nguyên của Agile à DevOps, các quyết định cần đưa ra nhanh chóng và chính xác, tốt nhất là tự động và tức thời. Việc chỉ tập chung vào con số khiến bạn bị một điểm mù cực lớn và nguy hiểm, không phù hợp với tốc độ agile và devOps

# Một đơn vị đo lường mới trong testing

Test coverage không phải là một số liệu không hiệu quả nếu các chức năng của ứng dụng và tất cả hoạt động test có tầm quan trọng ngang bằng nhau. Tuy nhiên, nếu chỉ chăm chú vào con số mà không quan tâm đến các mức độ quan trọng của function test thì chẳng khác gì bạn tập chung vào số lượng cổ phiếu mà không hiểu gì về giá trị của chúng cả.

Dựa trên kết quả test đã nói ở trên, bạn sẽ không thể biết được liệu lần release này sẽ cho một kịch bản lỗi nào không. Nếu bạn muốn đánh giá nhanh, chính xác các rủi ro liên quan đến các version chuân bị lên PRD, bạn cần một đơn vị đo lường mới là Risk Coverage.

Phạm vi kiểm tra cho bạn biết bao nhiêu phần trăm của tổng số các chức năng ứng dụng được bao phủ bởi các case kiểm thử. Mỗi ứng dụng có một số chức năng nhất định; hãy gọi cho N = số chức năng đó:

![](https://images.viblo.asia/5bee5037-684a-41a8-b809-67b9c952dd55.png)

Tuy nhiên giả sử bạn không kiểm thử tất cả N chức năng mà chỉ kiểm tra được M trong số N chức năng

![](https://images.viblo.asia/ba803afe-e678-4a7a-bc08-297c41970bb2.png)

Bạn sẽ tính toán phạm vi kiểm tra của bạn như sau:

![](https://images.viblo.asia/26a6fed9-18de-408a-afb7-bb949e6cd3c6.png)

Chẳng hạn, nếu bạn có 200 chức năng nhưng chỉ thử nghiệm 120 chức năng đó, điều này mang lại cho bạn phạm vi kiểm tra 60%:

![](https://images.viblo.asia/92d743b5-ab0e-43ed-9ea5-8505c4616183.png)

Risk Coverage cho bạn biết bao nhiêu phần trăm rủi ro  của bạn được Coverage bởi các ca kiểm thử

Phạm vi Risk Coverage cho thực tế là một số trương hợp kiểm thử về cơ bản quan trọng hơn các trường hợp kiểm thử khác, và do đó có trọng số Risk Coverage cao hơn các case khác.

Với phạm vi rủi ro, trọng tâm chuyển từ số lượng yêu cầu được kiểm thử sang trọng số rủi ro của các yêu cầu được  kiểm thử. Bạn thường có thể đạt được phạm vi Risk Coverage cao hơn nhiều bằng cách kiểm tra 10 case  quan trọng hơn kiểm tra 100 case ít quan trọng hơn.

Tổng của tất cả các trọng số rủi ro luôn tổng cộng 100%:

![](https://images.viblo.asia/3f0d6271-c655-4571-bdc9-eec54d4bed50.png)

Nếu bạn cộng các trọng số rủi ro cho các M case đã được test, RC được tính như sau:

![](https://images.viblo.asia/8ff96fbb-493a-4948-afb7-72d4c5522521.png)

Một ví dụ đơn giản để hình dung, giả sử trọng số rủi ro của các function như sau:

![](https://images.viblo.asia/3941eeb5-c1ee-4752-a3f0-2418a9075c4a.png)

Nếu bạn corver tính năng Capture Order, bạn đã đạt được 80% độ bao phủ risk coverage. Nếu cover 2 chức năng khác là Rectify Order, Cancel Order bạn chỉ đạt được 20% độ bao phủ risk coverage. Nói cách khác, bằng cách cover hết tính năng Capture Order bạn đã đạt được hơn 50% mức độ bao phủ risk coverage. Đây chính là ví dụ điển hình của  “Test smarter, not harder.”

Bằng cách đo lường mức độ rủi ro - risk coverage, bạn có được cái nhìn sâu sắc về:

-  Business risks  hàng đầu của bạn đã được kiểm tra nghiêm ngặt như thế nào
- Những tính năng có Risk Coverage hàng đầu của bạn có đáp ứng mong đợi hay không (dựa trên kết quả kiểm tra tương quan)
- Mức độ nghiêm trọng của điểm mù, trọng số những phần có risk coverage cao chưa được kiểm tra

Ví dụ, hãy xem xét các kết quả sau:

![](https://images.viblo.asia/bc95374f-f087-45e4-83d0-fe43f2b12a95.png)

Chúng ta không bận tâm về số lượng test case ở đây mà thay vào đó là cái nhìn sâu sắc hơn nhiều. Ta có thể nói rằng 66% rủi ro trong hệ thống được kiểm thử và dường như hoạt động như mong đợi. Ngoài ra 9% rủi ro dường như bị fail, 15% rủi ro không được exe và 10% rủi ro không có bất kì ca kiểm thử nào. Điều này có ý nghĩa ít nhất 9% đến 34% tính năng không hoạt động trong version này

# Không phải mọi hoạt động test đều như nhau
Lý do kiểm thử truyền thống dự đoán kém về khả năng sẵn sàng release là thường tuân theo quy luật 80/20, hay còn gọi là nguyên tắc Pareto. Thông thường nhất là ý tưởng 20 nỗ lực tạo ra 80% giá trị. 
Tương đương với việc phát triển phần mềm là 20% transaction chiếm 80% businesss value, 20% requirement cover 80% business risk...

![](https://images.viblo.asia/fb47eb90-877f-4293-a0de-807813cb3176.png)

Hầu hết các team đã nhận ra một vài function được coi là quan trọng và họ sẽ kiểm tra kĩ càng hơn so với những chức năng được coi là ít quan trọng hơn. Một con đường khác là cố gắng kiểm tra tất cả các chức năng với nỗ lực như nhau, bất kể rủi ro. Với lộ trình này bạn nhanh chóng tiếp cận đến mốc giới hạn: mốc mà thời gian execute vượt qua thời gian cho phép kiểm thử

![](https://images.viblo.asia/721e2fb9-8bcb-4560-9a0e-8e5dc234c40a.png)

Với một đánh giá chính xác về rủi ro của bạn nằm ở đâu, bạn có thể khắc phục những rủi ro đó cực kỳ hiệu quả. Đây là một cơ hội lớn chưa được khai thác để làm cho việc kiểm thử của bạn có hiệu quả hơn. Nếu bạn hiểu mức độ rủi ro được phân phối trên hệ thống, ứng dụng đang test và bạn biết 20% nhóm chức năng nào tương quan với 80% value về mặt bussiness  thì điều đó hoàn toàn khả thi mà không phải tốn chi phí (thời gian, nhân lực) quá nhiều. 

Nguồn: https://www.stickyminds.com/article/risk-coverage-new-currency-testing