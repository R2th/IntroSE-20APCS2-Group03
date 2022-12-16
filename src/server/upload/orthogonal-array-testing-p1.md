# I. Orthogonal Array testing:
![](https://images.viblo.asia/48eda032-aad4-47ff-87cd-e94870a090d7.png)

### Orthogonal Array là gì ?

Mảng trực giao (OA) là một công cụ mảng đa chiều có các yếu tố và các mức như đầu vào và tạo ra các test case với mức độ phù hợp tối đa nhất có thể cho tất cả các cấp trong mỗi yếu tố. Điều này được thực hiện để tối ưu hóa các kịch bản test có nhiều yếu tố nhưng có nhiều kết hợp.

Đó như là một kỹ thuật thống kê để tạo ra hoán vị các đầu vào, tạo ra các test case có phạm vi kiểm tra tối ưu để giảm công sức của con người trong giai đoạn lập kế hoạch thử nghiệm và thiết kế thử nghiệm.

### Orthogonal Array cần những gì ?

Khi chức năng mở rộng với nhiều hoán vị và kết hợp trên các đầu vào khác nhau, sẽ rất khó để đảm bảo mức độ phù hợp theo cách thủ công.

Khách hàng có thể cần:

- Phương pháp thiết kế thử nghiệm có hệ thống,
- Thời gian nhanh hơn để tiếp thị,
- Giảm nỗ lực trong việc thực hiện các trường hợp kiểm tra ưu tiên.

Phạm vi kiểm tra tối ưu là bắt buộc đối với kết hợp của các yếu tố đầu vào . Mảng trực giao sẽ trả lời trên yêu cầu trên. Hãy xem ví dụ sau đây :

Input:
| Mobile phones | Web browsers | OS |
| -------- | -------- | -------- |
| Apple    | Safari   | iOS      |
| Samsung    | Chrome   | Android      |
| HTC    | I.E   | Windows mobile      |
| Nokia    | Firefox   |       |

Output:

Số test case bắt buộc =  48 (4 devices * 4 browsers * 3 OS)

### Các bước Orthogonal Array để đạt được kết quả mong muốn

- Composite factoring - Tối ưu hóa một hoặc nhiều yếu tố thành yếu tố đơn ( các cột thuộc tính ở đây được gọi là yếu tố)
- Quyết định các yếu tố tối đa. Nó sẽ xác định 2, 3 và 4 sự kết hợp với nhau.
ex: 2's sẽ được thực hiện dưới dạng các trường hợp kiểm tra được ưu tiên và sau đó tiếp tục cho đến khi thành kết hợp tối đa.
- Xóa các kết hợp không khả thi
- Thêm vài kết hợp dựa trên nghiệp vụ đề ra 
- Đội nghiệp vụ sẽ xem xét phạm vi test.

### Orthogonal Array và các ưu điểm của nó

- Bảo đảm testing các cặp được kết hợp dựa trên tất cả các yếu tố đã chọn
- Bộ kiểm tra có thể tăng cường một cách dễ dàng nếu mà có sự kết hợp ba và bốn chiều đáng ngờ cần được kiểm tra.
- Tạo một bộ test case hiệu quả , ngắn gọn và súc tích
- Sẽ ít lỗi hơn so với testcase thủ công
- Rất hiệu quả trong Integration test và Regression test
- Giảm được thời gian design và thời gian thực hiện test

### Hạn chế của Orthogonal Array

- OATS không đảm bảo phạm vi kiểm tra 100%, nó chỉ có thể đảm bảo phạm vi kiểm tra tối ưu
- Các kịch bản được tạo ra thông qua OATS có thể sẽ phải xác thực theo cách thủ công và các điều kiện test case bổ sung có thể sẽ phải thêm vào để đảm bảo phạm vi kiểm tra tối đa. 

# II. Nghiên cứu điển hình cho OATS :
***Đây là một case study cho các cửa hàng bán lẻ trong một siêu thị lớn.!***

Mục đích của nghiên cứu này là đưa ra danh sách các luồng cần thiết nhất để đưa ra mức độ phủ sóng tối đa trong toàn bộ vòng đời kiểm thử . Điều này nếu được thực hiện thủ công sẽ cần phải có một bài phân tích, thống kê dài mà không phải lúc nào cũng đủ nguồn lực để thực hiện. Vào cuối case study, dữ liệu thống kê sẽ cung cấp số effort đã lưu và cách cải thiện hiệu quả của test case.

Trong dự án này chúng ta sẽ sử dụng hai modules lớn đó là : 
- Hiệu chỉnh độ nhạy của khuyến mại : liên quan đến quá trình tính toán doanh số bán hàng cho một sản phẩm sau khi giảm giá của nó. Mức tăng doanh số này được tính dựa trên chi tiết lịch sử bán hàng trước và sau quảng cáo, chính xác một năm kể từ ngày có hiệu lực.
- Dự đoán doanh thu của một tập hợp các sản phẩm trong các tuần sắp tới dựa trên các điều kiện nhất định. Dự đoán này được thực hiện ở cấp độ chương trình, nơi các sản phẩm được liên kết với một chương trình. Dự báo được thực hiện mỗi tuần để đảm bảo rằng doanh số bán hàng, nếu không khớp chính xác với dự đoán, ít nhất là gần với dự đoán. Những "điều kiện" nhất định được bắt nguồn sau nhiều năm nghiên cứu được thực hiện trên xu hướng mà tại đó các sản phẩm đã được bán ra.   

### Phân tích những vấn đề đang mắc phải
Trong giai đoạn trước của dự án, chúng tôi đã nhận được những phản hồi từ khách hàng cho thấy chúng tôi giảm tỷ lệ để lọt bug trong User Acceptance Testing (UAT) để cải thiện hiệu quả của test case trong giai đoạn System Testing (ST). Do đó chúng tôi đã tiến hành phân tích gốc rễ vấn đề trong phản hồi của khách hàng. Kết quả phân tích được như : 
- Tỷ lệ để lọt bug cao hơn tiêu chuẩn
- Phạm vi test trong giai đoạn System Test không đủ.

Mặc dù chúng tôi có nhiều test case tốt, nhưng không đủ để phát hiện tất cả các bug có độ ưu tiên cao trong các chức năng của ứng dụng.

Chúng tôi quyết định làm theo một cách tiếp cận có hệ thống để kết thúc các vấn đề trên. Với mục tiêu chính là cải thiện phạm vi testing, chúng tôi đã phân tích và tìm thấy tính khả thi để triển khai **Orthogonal Array** trong dự án. 

Hơn nữa, chúng tôi đã đảm bảo được số lượng test case được tạo sau khi triển khai Orthogonal Array phù hợp với kế hoạch kiểm thử trong tất cả các chu kỳ testing.


Vậy đã phân tích được vấn đề nằm ở đâu thì việc tiếp theo chúng ta sẽ phải làm những gì ? từng bước một như thế nào ? sau thực hiện Orthogonal Array Testing như thế nào?


- ##### To be continued ...

Nguồn : http://toolsqa.com/blogs/orthogonal-array-testing-technique/