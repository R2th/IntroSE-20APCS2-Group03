Bài viết này nằm trong loạt bài viết về những kiến thức cơ bản về Test mà những developer cần có trong quá trình phát triển phần mềm, dựa trên tài liệu của tổ chức ISTQB.

# Tính thiết yếu của Test
Các hệ thống phần mềm đã trở thành một phần không thể thiếu trong xã hội hiện đại. Tuy nhiên có thể nói bất kì ai trong chúng ta cũng đã từng thấy lỗi xảy ra ở một hệ thống nào đó, mà một ví dụ cụ thể là lỗi trên các trang web chẳng hạn. Việc hệ thống không thực hiện theo đúng như thiết kế không chỉ tạo ra những thiệt hại về kinh tế, lãng phí thời gian, mất độ tin cậy ..., mà nhiều khi còn có thể gây ra tai nạn cho chính con người.

 Nguyên nhân chính là do những thiếu sót trong source code, document, ... Con người chúng ta rất dễ tạo ra lỗi, đặc biệt dưới áp lực phải làm cho đúng thời hạn, hay trong trường hợp spec của phần mềm phức tạp. Ngoài ra cũng có thể là do những yếu tố khách quan như ảnh hưởng của môi trường đến hardware chẳng hạn.
 
 Để làm giảm thiểu rủi ro cho hệ thống, chúng ta phải có những Test phù hợp. Và dựa vào kết quả Test ta có thể đo và cải thiện chất lượng của phần mềm. 
 
 # Test là gì?
  Thông thường Test hay được nhắc đến như là việc thực thi Test, tức là việc cho chạy phần mềm và kiểm tra. Tuy nhiên việc thực thi Test chỉ là một phần, không phải toàn bộ trong hoạt động Test.  Hoạt động Test bao gồm cả những hoạt động trước và sau khi thực thi Test (cho chạy Test), ví dụ như việc thiết kế Test hay kiểm tra kết quả,  viết báo cáo Test, ...  
  
  Mục đích chính của Test bao gồm những mục dưới đây.
  + Tìm lỗi
  + Kiểm tra chất lượng của sản phẩm
  + Cung cấp thông tin để hỗ trợ cho các quyết định cho sản phẩm, ví dụ như đã có thể release được chưa chẳng hạn
  + Phòng ngừa việc tạo ra các lỗi trong hệ thống

Cần phân biệt Test và Debug. Test là việc tìm ra lỗi, còn Debug là tìm hiểu nguyên nhân của lỗi và sửa nó. Thông thường trách nhiệm Test thuộc về người phụ trách Test, còn trách nhiệm Debug thuộc về dev.

# 7 nguyên tắc của Test
### Nguyên tắc 1: Test chỉ có thể chứng minh rằng phần mềm có lỗi
Thông qua Test ta có thể biết rằng phần mềm có lỗi, tuy nhiên không thể chứng minh rằng phần mềm hoàn toàn không có lỗi nào cả. Việc Test có thể làm giảm số lượng lỗi trong phần mềm nhưng kể cả trong trường hợp không tìm ra lỗi, ta cũng không thể khẳng định rằng phần mềm của chúng ta không có lỗi.

### Nguyên tắc 2: Việc Test toàn bộ pattern là điều không thể
Việc Test toàn bộ pattern (ghép tất cả các điều kiện ở các mục nhập dữ liệu) là điều không khả thi, ngoại trừ một số phần mềm cực kì đơn giản. Thay vì Test toàn bộ, chúng ta nên dựa vào độ rủi ro hay độ ưu tiên để tập trung vào các điểm cần thiết.

 ### Nguyên tắc 3: Test càng sớm càng tốt
 Để tìm được lỗi sớm thì việc Test nên bắt đầu càng sớm càng tốt trong quá trình phát triển phần mềm.
 
 ### Nguyên tắc 4: Sự phân bố không đồng đều của lỗi
 Hầu hết lỗi phát hiện trước khi realease hay trong quá trình vận hành tập trung ở một số module nhất định.
 
 ### Nguyên tắc 5: Nguyên tắc thuốc trừ sâu
 Khi thực hiện cùng một Test nhiều lần, sẽ dần dần không tìm ra được lỗi nữa. Để tránh điều này, cần phải xem lại và cải thiện testcase một cách định kì.
 
 ### Nguyên tắc 6: Test phụ thuộc vào điều kiện
 Đối với các điều kiện khác nhau thì sẽ có những phương pháp Test khác nhau. Ví dụ như Test hệ thống ngân hàng sẽ khác hoàn toàn với Test một trang web bán hàng.
 
### Nguyên tắc 7: Cạm bẫy "bug zero"
Không được quá chú tâm vào việc tạo một hệ thống không có lỗi, mà quên đi những yêu cầu ban đầu từ khách hàng.

# Các giai đoạn Test cơ bản
### Lên kế hoạch và control
Lên kế hoạch Test là việc xác định mục đích của Test và quyết định spec cho Test. Test control là hoạt động so sánh kế hoạch với tiến độ trong suốt quá trình Test.

### Phân tích và thiết kế Test
Chuyển những mục đích trừu tượng thành những điều kiện Test hay những bản thiết kế Test cụ thể.
Ví dụ cụ thể:
+ Review cho những testbase như báo cáo phân tích rủi ro, interface spec, ...
+ Thiết kế testcase kèm theo độ ưu tiên của chúng
+ Phân loại các test data cần thiết

### Test implement và Test execution
Ở giai đoạn này chúng ta sẽ tạo ra script hoặc bản ghi trình tự Test dựa trên testcase và các thông tin cần thiết khác, rồi sau đó setup môi trường và tiến hành thực thi Test.

### Đánh giá tiêu chuẩn kết thúc và báo cáo
Đánh giá tiêu chuẩn kết thúc là việc đánh giá xem việc thực thi test đã thoả mãn so với mục đích của Test chưa.
Ví dụ:
+ So sánh kết quả Test với tiêu chuẩn kết thúc Test đã quy định ở giai đoạn lên kế hoạch Test
+ Phán đoán xem có cần Test bổ sung hay cần thay đổi tiêu chuẩn kết thúc Test không
+ Viết báo cáo Test cho những người liên quan

### Kết thúc Test
Là công đoạn tập hợp các data, testware, các bài học rút ra từ test,... Công đoạn này được thực hiện trong trường hợp hệ thống đã được release, Test project kết thúc hay là khi đã đạt đươc milestone, ...
Ví dụ:
+ Kiểm tra xem các product đã được release hay chưa
+ Tập hợp và lưu lại các testware, test infrastructure, ... để lần sau có thể tiếp tục sử dụng
+ Rút ra những bài học có được từ việc Test

# Tâm lí học trong Test
Cách suy nghĩ khi Test hoặc review khác so với cách suy nghĩ khi phát triển phần mềm. Nếu như dev có quan điểm phù hợp thì có thể tự mình Test. Tuy nhiên việc tách Test ra và nhờ tester thực hiện sẽ mang lại hiệu quả hơn, và việc Test dưới góc nhìn hoàn toàn độc lập với dev bởi những pro tester đã được đào tạo bài bản sẽ mang lại nhiều lợi ích hơn.

Tính độc lập là tăng dần trong các trường hợp dưới đây:
+ Chính người dev thiết kế test (tính độc lập thấp nhất)
+ Người trong dev team thiết kế test
+ Người của bộ phận khác cùng công ty thiết kế test
+ Người của công ty khác test (nghĩa là nhờ công ty khác làm test)

Ngoài ra, việc tìm ra lỗi trong khi Test có thể bị hiểu là truy cứu trách nhiệm của người dev. Tuy Test là một công việc mang tính xây dựng nhưng nhiều khi vẫn bị coi dưới quan điểm tiêu cực, nên việc tạo mối quan hệ tốt giữa tester và dev là vô cùng quan trọng.

Và để tạo dựng được quan hệ tốt giữa tester và dev, những việc sau cần đuọc chú ý.
+ Có một mục tiêu chung là tạo ra một sản phẩm chất lượng tốt, khởi đầu công việc với thái độ hợp tác, không phải đối lập
+ Những ý kiến đối với product phải mang tính trung lập và đúng sự thật
+ Cố gắng hiểu được tâm trạng và phản ứng của người khác
+ Cố gắng truyền đạt được ý mình muốn nói và hiểu được ý của người khác muốn nói

Trên đây là những kiến thức cơ bản về Test, dựa trên phần 1 trong tài liệu của ISTQB. Phần tiếp theo của loạt bài viết này mình sẽ nói về việc Test trong lifecycle của phần mềm.