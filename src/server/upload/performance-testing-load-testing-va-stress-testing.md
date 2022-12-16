# 1. Performance Testing # 
## 1.1. Performance Testing là gì?

Kiểm tra hiệu suất là kiểm tra được thực hiện để xác định xem các thành phần của hệ thống đang hoạt động như thế nào trong một tình huống nhất định.

Việc sử dụng tài nguyên, khả năng mở rộng và độ tin cậy của sản phẩm cũng được xác nhận theo thử nghiệm này. Thử nghiệm này là một tập hợp con của kỹ thuật hiệu suất, tập trung vào việc giải quyết các vấn đề về hiệu suất trong thiết kế và kiến trúc của một sản phẩm phần mềm.

![image.png](https://images.viblo.asia/f9d80039-0ae7-4d0f-b1c0-d247a4580d6d.png)

Hình ảnh trên giải thích rõ ràng cho chúng ta rằng Performance Testing là một khái niệm lớn bao gồm cả Load Testing và Stress Testing. Các loại thử nghiệm khác được bao gồm trong thử nghiệm hiệu suất là Spike testing, Volume testing, Endurance testing, và Scalability testing. Do đó, Kiểm thử hiệu suất về cơ bản là một thuật ngữ rất rộng.

## 1.2. Mục đích của Performance Testing

Mục tiêu chính của test hiệu năng bao gồm thiết lập hành vi chuẩn (benchmark behavior) của hệ thống. Có một số điểm chuẩn đã được định nghĩa sẵn cần được đáp ứng trong quá trình kiểm tra hiệu năng.

Kiểm tra hiệu năng không nhằm mục đích tìm ra lỗi trong ứng dụng. Nó cũng không có khái niệm như đã vượt qua hoặc đã bị lỗi khi chạy bài test. Thay vào đó, nó giải quyết nhiệm vụ quan trọng là thiết lập điểm chuẩn (benchmark) và tiêu chuẩn (standard) cho một ứng dụng. Kiểm tra hiệu năng nên được thực hiện rất chính xác. Giám sát chặt chẽ hiệu năng của ứng dụng / hệ thống là đặc điểm chính của kiểm tra hiệu năng.

Điểm chuẩn và tiêu chuẩn của ứng dụng nên được đặt theo các thuộc tính như tốc độ, thời gian phản hồi, thông lượng, sử dụng tài nguyên và độ ổn định. Tất cả các thuộc tính này được kiểm tra trong một bài kiểm tra hiệu năng.

Với những bạn đọc chưa hiểu rõ thông lượng là gì thì đây là khái niệm và tài liệu refor cho mọi người:
Thông lượng đề cập đến việc thực hiện các tác vụ của một dịch vụ hoặc thiết bị tính toán trong một khoảng thời gian cụ thể. Nó đo lường khối lượng công việc đã hoàn thành so với thời gian tiêu thụ và có thể được sử dụng để đo hiệu suất của bộ xử lý, bộ nhớ hoặc truyền thông mạng. [Refer](https://www.techopedia.com/definition/5573/throughput)

## 1.3. Ví dụ về Performance Testing

Chẳng hạn, bạn có thể kiểm tra hiệu năng mạng của ứng dụng thông qua biểu đồ Tốc độ kết nối so với độ trễ. Độ trễ là chênh lệch thời gian giữa dữ liệu cần tiếp cận từ nguồn đến đích. Một trang 70kb sẽ không mất quá 15 giây để tải trong trường hợp kết nối tồi tệ nhất của modem 28,8kbps (độ trễ là 1000 mili giây), trong khi trang có cùng kích thước sẽ xuất hiện trong vòng 5 giây cho kết nối trung bình 256kbps DSL (độ trễ là 100 mili giây). Một kết nối T1 1,5 mbps (độ trễ là 50 mili giây) sẽ có điểm chuẩn hiệu năng là 1 giây để đạt được mục tiêu này.

Một ví dụ khác là mô hình Yêu cầu - Phản hồi. Chúng ta có thể đặt điểm chuẩn là chênh lệch thời gian giữa việc tạo yêu cầu và xác nhận phản hồi phải nằm trong phạm vi x ms (mili giây) và y ms, trong đó x và y là các chữ số tiêu chuẩn.

Một bài test hiệu suất thành công nên dự kiến hầu hết các vấn đề về hiệu năng, có thể liên quan đến cơ sở dữ liệu, mạng, phần mềm, phần cứng, ...

![image.png](https://images.viblo.asia/31c1e19f-b3b4-456b-aef6-af84ac4251ae.png)

# 2. Load Testing

## 2.1. Load Testing là gì

Load Testing là kiểm tra hệ thống bằng cách tăng tải liên tục và đều đặn cho hệ thống cho đến khi đạt đến giới hạn ngưỡng. Nó là một tập hợp con của test hiệu năng.

![image.png](https://images.viblo.asia/31a8a76a-6fb5-48aa-a880-a1b12f151a1b.png)

Kiểm tra tải có thể dễ dàng thực hiện bằng cách sử dụng bất kỳ công cụ tự động hóa phù hợp nào có sẵn trên thị trường. WAPT và LoadRunner là hai công cụ nổi tiếng hỗ trợ kiểm tra tải. Load Testing cũng nổi tiếng bởi các tên như: Kiểm tra khối lượng và kiểm tra độ bền.

Tuy nhiên, kiểm tra khối lượng chủ yếu tập trung vào cơ sở dữ liệu. Trong khi đó, kiểm tra độ bền thực hiện kiểm tra hệ thống bằng cách giữ nó dưới một tải trọng đáng kể trong một khoảng thời gian duy trì.

Mục đích duy nhất của kiểm tra tải (Load Testing) là gán cho hệ thống công việc lớn nhất mà nó có thể xử lý để kiểm tra độ bền của hệ thống và theo dõi kết quả. Một thực tế thú vị ở đây là đôi khi hệ thống được cung cấp một tác vụ trống để xác định hành vi của hệ thống trong tình huống không tải.

Các thuộc tính được theo dõi trong kiểm tra tải bao gồm hiệu suất cao nhất, thông lượng máy chủ, thời gian đáp ứng dưới các mức tải khác nhau (dưới ngưỡng ngắt), tính thỏa đáng của môi trường H/W, có bao nhiêu ứng dụng người dùng có thể xử lý mà không ảnh hưởng đến hiệu suất.

## 2.2. Mục đích của Load Testing

Các mục tiêu của kiểm tra tải bao gồm:

Phơi bày các khiếm khuyết của một ứng dụng liên quan đến lỗi tràn bộ đệm, rò rỉ bộ nhớ và quản lý sai bộ nhớ. Các vấn đề cuối cùng sẽ xuất hiện do thử nghiệm tải có thể bao gồm các vấn đề cân bằng tải, vấn đề băng thông, công suất của hệ thống hiện tại, ...
Để xác định giới hạn trên của tất cả các thành phần của ứng dụng như cơ sở dữ liệu, phần cứng, mạng, … để ứng dụng có thể quản lý tải được dự đoán trong tương lai.
Để đặt SLA cho ứng dụng.

## 2.3. Ví dụ về Load Testing

Hãy xem xét để kiểm tra chức năng email của một ứng dụng, ứng dụng này có thể có 1000 người dùng cùng một lúc. Giờ đây, 1000 người dùng có thể kích hoạt các giao dịch email (đọc, gửi, xóa, chuyển tiếp, trả lời) theo nhiều cách khác nhau.

Nếu chúng tôi thực hiện một giao dịch cho mỗi người dùng mỗi giờ, thì đó sẽ là 1000 giao dịch mỗi giờ. Bằng cách mô phỏng 10 giao dịch / người dùng, chúng tôi có thể tải thử nghiệm máy chủ email bằng cách chiếm 10000 giao dịch / giờ.

Một ví dụ khác về kiểm tra tải được hiển thị trong hình dưới đây:

![image.png](https://images.viblo.asia/5dcbfebc-9deb-4459-ad89-215732dd717c.png)

Hình ảnh trên mô tả một bài kiểm tra tải được thực hiện trên công cụ JMeter. Kiểm tra này được thực hiện để xác định số lượng người dùng mà một hệ thống có thể xử lý. Trong thử nghiệm này, 100 người dùng được thêm sau mỗi 30 giây cho đến khi tải đạt 1000 người dùng. Mỗi bước mất 30 giây để hoàn thành và JMeter đợi 30 giây trước khi bắt đầu bước tiếp theo.

Khi tải đạt đến 1000 luồng, tất cả chúng sẽ tiếp tục chạy trong 300 giây (5 phút) cùng nhau và cuối cùng dừng 10 luồng sau mỗi 3 giây.

# 3. Stress Testing

## 3.1. Stress Testing là gì

Dưới Stress Testing, các hoạt động khác nhau để làm quá tải các tài nguyên hiện có với các công việc dư thừa khác nhau sẽ được thực hiện trong nỗ lực phá vỡ hệ thống. Thử nghiệm tiêu cực (negative testing), bao gồm loại bỏ các thành phần khỏi hệ thống cũng được thực hiện như một phần của Stress Testing.

![image.png](https://images.viblo.asia/ccab1fc1-7db0-4a92-bbfb-5cd8acf83052.png)

Stress Testing còn được gọi là kiểm tra độ mỏi (fatigue testing), bài test này sẽ nắm bắt được tính ổn định của ứng dụng bằng cách kiểm tra nó vượt quá khả năng băng thông của nó.

Do đó, về cơ bản, Stress Testing đánh giá hành vi của một ứng dụng vượt quá tải tối đa và các điều kiện bình thường.

Mục đích của Stress Testing là để xác định sự thất bại của hệ thống và theo dõi cách hệ thống phục hồi. Thách thức ở đây là thiết lập một môi trường được kiểm soát trước khi khởi chạy bài test để chúng ta có thể nắm bắt chính xác hành vi của hệ thống nhiều lần trong các tình huống khó lường nhất.

Các vấn đề cuối cùng xuất hiện do Stress Testing có thể bao gồm các vấn đề đồng bộ hóa, rò rỉ bộ nhớ, ...

Nếu Stress Testing kiểm tra cách hệ thống xử lý trong tình huống tăng đột ngột số lượng người dùng , sau đó nó được gọi là bài kiểm tra việc tăng đột biến.

Nếu Stress Testing là để kiểm tra tính bền vững của hệ thống trong một khoảng thời gian thông qua việc tăng số lượng người dùng một các chậm rãi, thì nó được gọi là bài test ngâm.

## 3.2. Mục đích của Stress Testing

Mục tiêu của Stress Testing là phân tích các báo cáo sau sự cố để xác định hành vi của ứng dụng sau thất bại.

Thách thức lớn nhất là đảm bảo để hệ thống không bị ảnh hưởng đến an toàn của các dữ liệu nhạy cảm sau sự cố. Trong một bài stress testing thành công, hệ thống sẽ trở lại trạng thái bình thường cùng với tất cả các thành phần của nó ngay cả sau sự cố nghiêm trọng nhất.

## 3.3. Ví dụ Stress Testing

Ví dụ: một trình xử lý văn bản như Writer1.1.0 của OpenOffice.org được sử dụng để phát triển các chữ cái, bản trình bày, bảng tính, v.v. Mục đích của stress testing là tải nó với số lượng ký tự vượt quá.

Để làm điều này, chúng tôi sẽ dán nhiều lần một dòng dữ liệu, cho đến khi nó đạt đến ngưỡng giới hạn xử lý một khối lượng lớn văn bản. Ngay sau khi kích thước ký tự đạt đến 65.535 ký tự, nó sẽ từ chối chấp nhận thêm dữ liệu.

Kết quả của Stress Testing trên Writer 1.1.0 cho ra kết quả rằng nó không bị sập dưới áp lực và nó xử lý tình huống một cách nhẹ nhàng, đảm bảo rằng ứng dụng đang hoạt động chính xác ngay cả trong các điều kiện căng thẳng nghiêm ngặt

# 4. Sự khác biệt giữa Performance Testing, Load Testing và Stress Testing

Tóm tắt lại, chúng ta hãy cùng xem sự khác biệt chính giữa kiểm tra tải (Load Testing), kiểm tra căng thẳng, sức chịu (Stress Testing) cũng như kiểm tra hiệu năng (Performance Testing) trong bảng dưới đây:


|  | Performance Testing | Load testing | Stress Testing |
| -------- | -------- | -------- | -------- |
| Miền | Bao hàm của Load testing và Stress testing     | Nằm trong performance testing	  | Nằm trong performance testing |
| Phạm vi	 | Phạm vi rất rộng. Bao gồm - Kiểm tra tải, Kiểm tra căng thẳng, kiểm tra năng lực, kiểm tra khối lượng, kiểm tra độ bền, kiểm tra tăng đột biến, kiểm tra khả năng mở rộng và kiểm tra độ tin cậy, ...	 | Phạm vi hẹp hơn so với thử nghiệm hiệu năng. Bao gồm kiểm tra khối lượng và kiểm tra độ bền.	 | Phạm vi hẹp hơn so với thử nghiệm hiệu năng. Bao gồm kiểm tra ngâm và kiểm tra tăng đột biến. |
| Mục đích chính	 | Để thiết lập điểm chuẩn và tiêu chuẩn cho ứng dụng.	 | Để xác định giới hạn trên của hệ thống, hãy đặt SLA của ứng dụng và xem cách hệ thống xử lý khối lượng tải nặng.	 | Để xác định cách hệ thống hoạt động dưới tải trọng lớn và cách nó phục hồi từ thất bại. Về cơ bản, để chuẩn bị ứng dụng của bạn cho lưu lượng truy cập tăng đột biến. |
| Giới hạn tải | Cả hai - cả ngưỡng dưới và trên ngưỡng nghỉ ngơi.ngưỡng trên của điểm break.	 | Từ dưới đến điểm break.	 | Trên điểm break. |
| Những thuộc tính được thực thi	 | Sử dụng tài nguyên, độ tin cậy, khả năng mở rộng, thời gian đáp ứng, thông lượng, tốc độ, ...	 | Hiệu suất cao nhất, thông lượng máy chủ, thời gian đáp ứng dưới các mức tải khác nhau (dưới ngưỡng ngắt), tính thỏa đáng của môi trường H/W, số lượng ứng dụng người dùng có thể xử lý, yêu cầu cân bằng tải, ...	 | Tính ổn định vượt quá dung lượng băng thông, thời gian đáp ứng (trên ngưỡng ngắt), ... |
| Những vấn đề được chỉ ra sau bài test này	 | Tất cả các lỗi về hiệu năng bao gồm thời gian chạy, phạm vi để tối ưu hóa, các vấn đề liên quan đến tốc độ, độ trễ, thông lượng, ... Về cơ bản - mọi thứ liên quan đến hiệu năng!	 | Vấn đề cân bằng tải, vấn đề băng thông, vấn đề dung lượng hệ thống, thời gian đáp ứng kém, vấn đề thông lượng, ...	 | Các lỗ hổng bảo mật với tình trạng quá tải, vấn đề dò ghỉ dữ liệu ở tình trạng quá tải, chậm, rò rỉ bộ nhớ, ... |


# 5. Sự khác biệt giữa Load Testing, Stress Testing và Volume Testing

Đến bây giờ chúng tôi đã biết về load testing và stress testing cùng với sự khác biệt giữa hai loại test này. Bây giờ chúng ta hãy khám phá volume testing là gì và nó khác với load testing và stress testing như thế nào. Kiểm tra khối lượng (volume testing) cũng là một loại kiểm tra hiệu năng tập trung chủ yếu vào cơ sở dữ liệu.

Trong kiểm tra khối lượng, nó kiểm tra xem hệ thống hoạt động như thế nào đối với một khối lượng dữ liệu nhất định. Do đó, các cơ sở dữ liệu được nhồi với dung lượng tối đa và mức hiệu suất của chúng như thời gian đáp ứng và thông lượng máy chủ được theo dõi.

Để cho đơn giản, sự khác biệt giữa Load Testing, Stress Testing và Volume Testing được hiển thị dưới đây:


| Volume testing | Load testing	 | Stress testing |
| -------- | -------- | -------- |
| Một khối lượng lớn của dữ liệu.     | Một số lượng lớn của người dùng     | Quá nhiều dữ liệu, quá nhiều người dùng dẫn đến hệ thống quá tải.    |

# 6. Kết luận

Trong hướng dẫn này, chúng ta đã thấy và hiểu thông qua các ví dụ về cách Performance Testing, Load Testing và Stress Testing khác nhau như thế nào và phạm vi của từng loại test là gì.

Chúng ta cũng đã có một cái nhìn ngắn gọn về nhiều danh mục của performance testing như spike testing, recovery testing, volume testing, ... và hiểu mỗi loại này khác nhau như thế nào.

# Tài liệu tham khảo

- https://www.softwaretestinghelp.com/what-is-performance-testing-load-testing-stress-testing/