Refer:  https://www.blazemeter.com/blog/performance-testing-vs-load-testing-vs-stress-testing

Nếu là một dev, QA hoặc DevOps, bạn biết mình cần phải tiến hành các loại kiểm tra hiệu suất khác nhau để đảm bảo mỗi thay đổi code hoặc có tính năng  mới được thêm vào sẽ hoạt động và  không phá vỡ hệ thống .
Nhưng bạn nên tiến hành những loại thử nghiệm hiệu suất nào, sự khác biệt giữa load test và các loại thử nghiệm khác và thử nghiệm nào phù hợp với tình huống nào? Trong bài đăng blog này, chúng tôi sẽ đề cập đến câu trả lời cho những câu hỏi này.

### Performance Testing là gì?

Performance Testing là tên gọi chung cho việc kiểm tra cách hệ thống hoạt động và thực hiện. Performance Testing kiểm tra khả năng đáp ứng, tính ổn định, khả năng mở rộng, độ tin cậy, tốc độ và việc sử dụng tài nguyên của phần mềm. Các loại Performance Testing  khác nhau cung cấp cho bạn các dữ liệu khác nhau, vì chúng tôi sẽ trình bày chi tiết hơn.

Trước khi  thực hiện Performance Testing, điều quan trọng là phải xác định mục tiêu bussiness của hệ thống, để bạn có thể biết hệ thống của mình có hoạt động tốt hay không theo nhu cầu của khách hàng.

Sau khi chạy các bài Performance Testing, bạn có thể phân tích các KPI khác nhau, chẳng hạn như số lượng người dùng ảo, số lần truy cập mỗi giây, số lỗi mỗi giây, thời gian phản hồi (response time ), độ trễ và số byte mỗi giây (throughputs ),  cũng như mối tương quan giữa chúng. Thông qua các báo cáo, bạn có thể xác định các nút thắt cổ chai, bugs và errors , từ đó quyết định những gì cần phải làm.

### Khi nào bạn nên sử dụng Performance Test ?

Khi bạn muốn kiểm tra hiệu suất trang web và hiệu suất ứng dụng, cũng như máy chủ, cơ sở dữ liệu, mạng... Nếu bạn làm việc với mô hình Waterfall , thì sử dụng ít nhất mỗi lần bạn release một phiên bản. Còn nếu bạn theo mô hình Agile , bạn nên kiểm tra liên tục.

  Đây là một ví dụ về báo cáo Performance Test  trên CA BlazeMeter. Đây là một thử nghiệm tốt, vì số lượng người dùng ngày càng tăng không ảnh hưởng đến thời gian phản hồi, tỷ lệ lỗi tiếp tục thấp và số lần truy cập mỗi giây tăng theo số lượng người dùng nhưng vẫn ổn định.
  
  ![](https://images.viblo.asia/0a2b1c6e-78df-466c-a859-8afbeb633054.png)
  
### Load test là gì ? 

Load test là thử nghiệm kiểm tra cách hệ thống hoạt động dưới một số lượng lớn người dùng ảo đồng thời thực hiện các giao dịch trong một khoảng thời gian nhất định. Hay nói cách khác, cách hệ thống xử lý khối lượng tải nặng. Có một vài loại tools kiểm tra load test bằng mã nguồn mở, và JMeter là công cụ phổ biến nhất.
  
###   Khi nào bạn nên sử dụng Load test ?

Khi bạn muốn xác định số lượng người dùng mà hệ thống của bạn có thể xử lý. Bạn có thể xác định các tình huống người dùng khác nhau cho phép bạn tập trung vào các phần khác nhau của hệ thống, như trang thanh toán trên trang web hoặc ứng dụng của bạn để kiểm tra tải web. Bạn cũng có thể xác định cách tải hoạt động, chẳng hạn như vị trí địa lý của người dùng đến từ đâu hoặc cách load build và duy trì trong hệ thống. Về cơ bản, kiểm tra tải là việc bạn nên làm mọi lúc để đảm bảo hệ thống của bạn luôn hoạt động tốt. Đó là lý do tại sao nó nên được tích hợp vào các chu kỳ Tích hợp liên tục của bạn, với các công cụ như Jenkins và Taurus.

Đây là cách kiểm tra tải trong JMeter. Thử nghiệm này phân tích thêm 100 người dùng cứ sau 30 giây cho đến khi đạt được 1.000 người dùng. Toàn bộ quá trình mất 300 giây. Sau khi đạt 1.000 threads , tất cả chúng sẽ tiếp tục chạy và tấn công vào máy chủ cùng nhau trong 5 phút.

### Stress Test là gì ?

Stress Test là kiểm tra kiểm tra các giới hạn trên của hệ thống của bạn bằng cách kiểm tra nó dưới extreme loads. Thử nghiệm kiểm tra cách hệ thống hoạt động dưới tải cường độ cao và cách nó phục hồi khi trở lại sử dụng bình thường, tức là các KPI như throughputs và thời gian phản hồi có giống như trước đây không? Ngoài KPI kiểm tra tải, Stress Test  cũng kiểm tra rò rỉ bộ nhớ, độ chậm, các vấn đề bảo mật và hỏng dữ liệu.

Stress Test có thể được tiến hành thông qua các công cụ kiểm tra tải, bằng cách xác định một trường hợp kiểm thử có số lượng người dùng ảo đồng thời rất cao. Nếu kịch bản Stress Test của bạn bao gồm sự gia tăng đột ngột về số lượng người dùng ảo, thì nó được gọi là  Spike Test . Nếu bạn Stress Test trong một khoảng thời gian dài để kiểm tra tính bền vững của hệ thống theo thời gian với tốc độ tăng chậm, thì đó được gọi là Soak Test.

### Khi nào sử dụng Stress Test ?

Website stress tests and app stress tests  rất quan trọng trước các sự kiện lớn như : ngày Thứ Sáu Đen Tối , việc bán vé cho một buổi hòa nhạc nổi tiếng với nhu cầu cao hoặc các cuộc bầu cử. Nhưng chúng tôi khuyên bạn nên Stress Test thỉnh thoảng để bạn biết khả năng chịu đựng của hệ thống. Điều này đảm bảo bạn luôn chuẩn bị cho những đợt tăng đột biến bất ngờ về lưu lượng truy cập, đồng thời giúp bạn có thêm thời gian và nguồn lực để khắc phục các điểm nghẽn của mình. 

Trong ví dụ này, chúng tôi mô tả cách đạt được lưu lượng truy cập tăng đột biến bằng cách sử dụng component  “Ultimate Thread Group” . Chúng tôi cho rằng hệ thống đang thử nghiệm không hoạt động vào lúc 3:00 phút sau khi bắt đầu thử nghiệm. Với Ultimate thread group , chúng tôi xác định các luồng bổ sung chạy trong các cửa sổ thời gian cố định bằng cách sử dụng thuộc tính độ trễ ban đầu (xem hình bên dưới)

Sử dụng các loại kiểm tra hiệu suất khác nhau đảm bảo bạn luôn nhận thức được các vấn đề bạn gặp phải và bạn có thể lập kế hoạch để giải quyết chúng. Vì vậy, đừng từ bỏ bất kỳ loại kiểm tra nào.