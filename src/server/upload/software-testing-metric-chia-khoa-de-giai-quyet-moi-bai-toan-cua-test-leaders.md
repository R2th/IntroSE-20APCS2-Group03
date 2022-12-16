Chao xìn, chắc hẳn các bạn QA (đặc biệt là các bạn test leader) sẽ/đã/đang gặp tình trạng cảm thấy bất an về chất lượng và những risk của sản phẩm. Các bạn cảm nhận được sản phẩm đang có nhưng vấn đề vô hình nào đó nhưng không thể chỉ rõ ràng được khi được hỏi. Hay các bạn bế tắc khi làm việc với dev tạo ra quá nhiều bugs hoặc khách hàng trả lời Q&A quá chậm làm ảnh hưởng đến timeline của đội Tester mà khum bít phải làm gì để cải thiện. 

Bài viết này của mình với mục đích mang thêm một kiến thức/khái niệm cơ bản về quản lí cho mọi người và đặc biệt hướng tới các bạn là Test leader. 

Chắc hẳn bạn đã rất nhiều lần cảm thấy bế tắc khi nói đến vấn đề về chất lượng. Bạn nói chất lượng của một sản phẩm "tốt" "không tốt" hay "cũng tàm tạm" thì dựa vào đâu để các bạn có những kết luận đó? Dựa vào cảm tính của bạn hay lời nói của người khác? Từ đó chúng ta thấy rằng, chúng ta cần một thước đo, và thước đo đó gọi là: 

# Software Testing Metric

> "You can not control what you can not measure. Measurement is the prerequisite to management control". 

*from Tom DeMarco American Consultant, 1982*


Trước tiên chúng ta sẽ cần hiểu Metric là gì:
##  1. Test metric là gì?
* Là 1 chuẩn đo lường
* Metric phải được xác định căn cứ vào mục tiêu cụ thể cho từng dự án, quy trình, hoặc sản phẩm
* Đánh giá hiệu quả và hiệu năng của một số hoạt động phát triển phần mềm
* Được tập hợp và tính toán trong suốt quá trình test
* Cung cấp Công thức đo sự thành công của dự án một cách khách quan

## 2. Tại sao chúng ta cần có Software Testing Metric?
Bạn không để phát triển chất lượng nếu như bạn không biết bạn đang ở đâu và bạn đang như thế nào. Để phát triển bạn cần đánh giá. Và việc đánh giá về chất lượng không thể chủ dựa vào "cảm tính", chúng ta cần số liệu thực tế.

=> Dựa vào Metric để đánh giá được chất lượng của sản phẩm và năng suất của dịch vụ để đạt được sự hài lòng của khách hàng. Metric sẽ cung cấp số liệu để có thể cải tiến quy trình.

=> Cùng với việc phân tích nguyên nhân gốc rễ, test metric có thể được sử dụng để theo dõi các vấn đề phát sinh (issues) trong suốt quá trình phát triển

=> Test metric được tích lũy, cập nhật và được báo cáo thường xuyên, nó đảm bảo rằng các vấn đề của dự án sẽ được đánh giá đúng, xử lý kịp thời do đó dễ dàng cho việc quản lý

=> Quan trọng hơn hết, test metric là yếu tố quyết định thành công hay thất bại của một dự án

## 3. Vòng đời của  Software Testing Metric
Về cơ bản, Test metric phải được phân tích và xác định ngay từ đầu dự án và nó sẽ là một phần của Test Plan.  Để xác định các Test Metric nào sẽ được dùng cho dự án của bạn cần rất nhiều yếu tố như: Loại dự án của các bạn là gì? Chiến lược test của công ty/ tổ chức/ dự án là gì? Vòng đời phát triển của sản phẩm là gì?  Và rất nhiều yếu tố khác để cân nhắc. Tuy nhiên, mình sẽ liệt kê cho các bạn các loại test metric thường gặp của từng categogy ở phần 5 của bài nhé 😋

Chúng ta cũng cần xác định với nhau rằng, để có được một bộ test metric với các data bám sát với kế hoạch là điều cực cực cực.....(n cực) khó, tất nhiên không phải không thể làm được 🙄
Test metric cần phải được thu thập liên tục trong cả quá trình làm dự án, thậm trí có những loại metric các bạn cần phải bám sát từng ngày. Nó cũng cần sự đồng lòng và công nhận của cả team dự án. Mình nhắc lại cần cả team đồng lòng và một mình test leader/PM các bạn sẽ rất vất vả nếu như không kêu gọi được tiếng nói chung về nhưng rules được tạo ra khi thu thập test metric.

Dưới đây là cách mà test metric được thu thập: 
![image.png](https://images.viblo.asia/fddf646e-5f36-49e0-9c0b-ea73ced9dae9.png)

##  4. Metric types
Chúng ta chia ra làm 4 loại:
![image.png](https://images.viblo.asia/a0e9f1e5-6869-47d8-9c42-eb7ee41714d5.png)

## 5. Test metric shopping nèo:
Dưới đây mình liệt kê cho các bạn các loại test metric hay được dùng để các bạn shopping về dự án của các bạn nhé 🤪 

![image.png](https://images.viblo.asia/3d1cbd59-f77f-4820-b0a0-0dacccbd5b43.png)

Về công thức tính các mức độ bao phủ, tham khảo ví dụ sau:
Phần trăm của số TC đã thực hiện test:
                 
% Test cases Passed  = (Số TC đã thực hiện / Tổng số TC) * 100
                  
Thường thì với mỗi phase test sẽ ứng với mỗi bộ test case, yêu cầu tỉ lệ testcase đã thực hiện test phải đạt 100%, nếu không đặt được mức đó thì team phải check lại những case chưa test để biết được nguyên nhân.

 Ngoài những metric trên đây, bạn có thể đo tất cả những gì bạn muốn. Ví dụ, để giải quyết được bài toán phải làm sao khi dev liên tục trễ bản build hay khách hàng trả lời trễ Q&A ư? Chúng ta sẽ chửi mắng  dev hay KH để giải quyết ?😎 (Gud idea). Chúng ta sẽ có metric cho việc đo lag time. Và dưới đây là biểu đồ lag time ( thời gian chết) của team testing. Sau khi có biểu đồ này rồi thì cứ cuộc họp lôi nó ra làm bằng chứng mà chửi thui 😏
![](https://images.viblo.asia/1ff8d3c8-ec48-474a-91ed-831ab8a6c1ad.png)