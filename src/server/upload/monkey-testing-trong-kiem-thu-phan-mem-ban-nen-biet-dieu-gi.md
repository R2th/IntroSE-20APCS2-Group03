Đôi lúc chúng ta hay test random, test một cách ngẫu nhiên hoặc như chúng ta hay nói là free test để test input đầu vào một cách ngẫu nhiên - Điều này cũng mang lại những điểm tốt, tuy nhiên cũng mang lại những khó khăn khi chúng ta phát hiện ra bug nhưng lại không thể nào reproduce nó được. Thế là trong lúc mò mẫm mình cũng tìm được 1 khái niệm mới toang cho các phương pháp trên - đó là Monkey testing, chúng ta cùng tìm hiểu nhé!

![](https://images.viblo.asia/a51406c0-c7f0-4545-b216-6d5d3b784dc6.png)

Monkey testing không sử dụng bất kỳ testcase nào, kĩ thuật này không theo quy tắc hay chiến lược xác định trước. Nó làm việc theo cảm tính của người kiểm thử và bất cứ ai trong dự án đều có thể thực hiện nó.

Monkey Testing là một kỹ thuật trong kiểm tra phần mềm khi đó, người dùng kiểm tra ứng dụng bằng cách đưa giá trị đầu vào bất kỳ và kiểm tra xem vận dụng xử lý ra sao

Monkey testing kiểm tra hiệu suất của toàn bộ ứng dụng bằng cách sử dụng các đầu vào ngẫu nhiên này để đảm bảo rằng hệ thống không bị sập do các giá trị không mong muốn

Kỹ thuật này được tự động hóa hay nói đúng hơn là bạn có thể viết chương trình/ kịch bản để tạo ra đầu vào ngẫu nhiên rồi đưa vào ứng dụng và phân tích xử lý. Kĩ thuật này làm việc khá tốt khi thực hành load/stress testing hay khi bạn cố phá hủy chương trình bằng cách đưa không ngừng giá trị tình cờ vào.

**Sử dụng Monkey Testing:**

1. Monkey Testing không yêu cầu nhiều thông số kỹ thuật trong khi thực hiện thử nghiệm này.

2. Monkey Testing hoàn toàn tập trung vào sự cố hệ thống bằng cách đánh các đầu vào ngẫu nhiên, vì vậy nhóm thử nghiệm có thể đảm bảo độ bền của sản phẩm.

3. Monkey Testing được thực hiện trong một số khu vực nhất định của phần mềm, nơi các lỗi không được xác định đều đặn.

4. Monkey Testing đòi hỏi ít thời gian và nỗ lực hơn khi so sánh với các loại thử nghiệm khác. Thử nghiệm khỉ đảm bảo rằng ứng dụng phần mềm là đáng tin cậy và hiệu quả.

5. Monkey Testing giúp chúng tôi hiểu hành vi của ứng dụng khi được cung cấp cho người dùng không biết cách sử dụng nó như thế nào.
 
6. Monkey Testing cũng có thể được sử dụng để thực hiện kiểm tra cơ sở dữ liệu. Nó có thể được thực hiện bằng cách bắt đầu một giao dịch và nhập dữ liệu ngẫu nhiên hoặc thực hiện các hành động ngẫu nhiên và sau đó quay lại để xem liệu nó có gặp sự cố hay không hoặc nếu có bất kỳ lỗi nào của cơ sở dữ liệu xảy ra.

**Các loại Monkey Testing:**

Monkey testing có thể được phân loại thành ba loại dựa trên cách nó được triển khai.

![](https://images.viblo.asia/8873945e-e60b-4bc6-a8f2-a5d690fae2b4.png)

**1.Dumb Monkey Testing:**

Trong monkey testing, khi người thử nghiệm không có kiến thức về phần mềm hoặc các tính năng, chức năng, hành vi và bắt đầu thử nghiệm ứng dụng một cách ngẫu nhiên, nó được gọi là kỹ thuật Dumb monkey testing. Nó còn được gọi là khỉ ngu dốt.

Người kiểm tra thường không biết liệu các đầu vào đã cho là hợp lệ hay không hợp lệ. Kiểm tra câm khá đơn giản vì nó không yêu cầu người kiểm tra biết về hoạt động của ứng dụng.

Người thử nghiệm còn được gọi là con khỉ câm trong thử nghiệm này không có ý tưởng về quy trình công việc hoặc dữ liệu yêu cầu cần được cung cấp cho ứng dụng trong một môi trường lý tưởng.

Nhưng điều này có thể dẫn đến các lỗi khó tái tạo vì người thử nghiệm không biết ứng dụng và các lỗi được tìm thấy có thể ít nghiêm trọng hơn hoặc không liên quan.

**2. Smart Monkey Testing:**

Trong monkey testing, khi người thử nghiệm hiểu sâu về quy trình làm việc của phần mềm, nó được gọi là Smart Monkey Testing.

Ở đây những người thử nghiệm biết họ đang thử nghiệm cái gì, họ đang thử nghiệm ở đâu và điều này sẽ dẫn đến đâu. Điều này sẽ rất hữu ích trong việc tái tạo lỗi.

Trong loại monkey testing này, những người thử nghiệm tập trung nhiều hơn vào việc phá vỡ ứng dụng hơn là tìm lỗi, vì họ đủ nhận thức để báo cáo những lỗi đó.

So sánh, Smart Monkey Testing mang lại kết quả tốt hơn trong thời gian ngắn hơn.

**3. Brilliant Monkey Testing:**

Trong monkey testing, khi người thử nghiệm có kiến thức nâng cao về cả chức năng của ứng dụng và kiến thức chuyên môn về miền, nó được gọi là Brilliant monkey testing.

Giả sử chúng ta đang thử nghiệm ứng dụng đặt vé tàu, người thử nghiệm sẽ biết ứng dụng hoạt động như thế nào và sẽ có một bức tranh rõ ràng về cách ứng dụng nên và không nên hoạt động dưới các đầu vào ngẫu nhiên.

Cơ hội tìm thấy các lỗi không liên quan và không thể tái tạo là rất ít trong thử nghiệm này.

Tại đây, người kiểm tra thực hiện kiểm tra từ góc độ của người dùng, vì họ biết việc sử dụng ứng dụng.

Kỹ thuật Brilliant Monkey Testing là một phần mở rộng của Smart Monkey Testing.

Kỹ thuật này có thể giúp chúng tôi tìm ra các lỗi có thể xảy ra trong khoảng thời gian hoạt động của nó trong tương lai.

**Ưu điểm của Monkey Testing:**

Nó dễ thực thi vì nó không tuân theo bất kỳ trường hợp cụ thể nào được xác định trước, người kiểm tra phải cung cấp đầu vào ngẫu nhiên cho ứng dụng.

Đó là một cách hiệu quả để tìm một số lỗi ngoài hộp

Đó là một cách tuyệt vời để tìm ra các lỗi lớn có thể phá vỡ hệ thống do các đầu vào ngẫu nhiên.

Các lỗi mới có thể được phát hiện thông qua các thử nghiệm với Monkey Testing mà không thể tìm thấy trong quá trình thử nghiệm truyền thống.

Các tình huống được đề cập trong Monkey Testing là đặc biệt, người thử nghiệm có thể kiểm tra thời gian phản hồi của máy chủ cùng với nó.

Monkey Testing có thể được thực hiện tốt trong ứng dụng máy tính để bàn, ứng dụng web và ứng dụng di động.

Monkey Testing cần ít thời gian và nỗ lực hơn để thiết lập môi trường.

Monkey Testing là cách tiếp cận tốt nhất để thực hiện kiểm tra căng thẳng và kiểm tra tải theo cách đặc biệt.

Monkey Testing cũng có thể được thực hiện bằng các công cụ tự động.

**Nhược điểm của Monkey Testing:**

Người thử nghiệm có thể không tạo lại được lỗi vì điều này được thực hiện một cách ngẫu nhiên.

Các lỗi được tìm thấy trong Monkey Testing có thể nằm ngoài phạm vi hoặc ngoài yêu cầu kinh doanh.

Chỉ những người thử nghiệm có miền và chuyên môn kỹ thuật tốt mới có thể thực hiện Monkey Testing một cách chính xác.

Có thể tốn thời gian để lấy các đầu vào ngẫu nhiên đó, thực thi các trường hợp cho một tập hợp các lỗi nhỏ thậm chí có thể không liên quan.

Phạm vi trường hợp thử nghiệm không thể được đảm bảo vì nó được thực hiện một cách ngẫu nhiên.

Chỉ thử nghiệm Smart Monkey Testing và thử nghiệm Brilliant Monkey Testing mới có thể đưa ra các lỗi có liên quan và có thể tái tạo, nhưng chi phí cao hơn vì nó đòi hỏi nguồn lực chuyên gia.

Việc phân tích các lỗi được tìm thấy trong quá trình thử nghiệm trên khỉ có thể là một thách thức và tốn nhiều thời gian.

Thử nghiệm Smart Monkey Testing phụ thuộc vào một mô hình trạng thái tốt nhưng việc phát triển các mô hình như vậy có thể khá tốn kém.

**Phần kết luận:**

Chúng ta có thể sử dụng Monkey Testing để phân tích các tình huống mà khách hàng có thể sử dụng ứng dụng. Không phải mọi người dùng đều sử dụng ứng dụng theo cách dự định, họ có thể tấn công hệ thống bằng các đầu vào khi họ không nhận được kết quả như mong đợi. Do đó, người thử nghiệm phải xác minh ứng dụng từ góc độ của người dùng. Monkey Testing giúp chúng tôi ngăn chặn các tình huống như vậy trong đó hệ thống có thể bị hỏng do các đầu vào không mong muốn.

Không giống như các kỹ thuật kiểm thử khác, Monkey Testing không tuân theo bất kỳ mẫu hoặc trường hợp kiểm thử cụ thể nào. Vì vậy, nó rất ít tốn thời gian và chúng tôi có thể tìm thấy các lỗi nghiêm trọng mà không cần tuân theo một tập hợp các tình huống được xác định trước. Một nhược điểm lớn ở đây là nó không đảm bảo rằng kỹ thuật này có thể xác định tất cả các lỗi nhưng nó nhằm mục đích kiểm tra ứng dụng bằng cách sử dụng tất cả các đầu vào có thể.

Do thiếu nguồn lực, thời gian và các dự án có mức độ ưu tiên cao hơn, Monkey Testing không được sử dụng rộng rãi trong toàn ngành. Họ đầu tư vào các hình thức thử nghiệm khác mang lại kết quả và lợi tức đầu tư tốt hơn.

Bài viết được tham khảo từ: https://www.softwaretestingmaterial.com/monkey-testing/