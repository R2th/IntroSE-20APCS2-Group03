## 1. System testing là gì?
System testing có nghĩa là kiểm tra toàn bộ hệ thống. Tất cả các mô-đun / thành phần được tích hợp để xác minh xem hệ thống có hoạt động đúng theo spec đã xác định trước và như mong đợi hay không.
Kiểm tra hệ thống được thực hiện sau khi kiểm tra tích hợp. Điều này đóng một vai trò quan trọng trong việc cung cấp một sản phẩm chất lượng cao. 
![](https://images.viblo.asia/310d950e-8d72-4f7e-a17c-f43f8dd41c3c.jpg)

## 2. Khi nào system testing được thực hiện
Nó được thực hiện khi kiểm tra tích hợp hoàn thành. Và trước khi acceptance testing được tiến hành.
![](https://images.viblo.asia/2839eed3-6def-4085-a0c5-1c6840d6b548.jpg)

System testing chủ yếu sử dụng phương pháp kiểm thửi hộp đen. System testing đánh giá chức năng của hệ thống hoàn chỉnh theo yêu cầu chức năng được quy định trước, với sự trợ giúp của tài liệu đặc tả. Trong quá trình kiểm thử dường như sẽ không quan tâm đến mã code.

## 3.Các quan điểm chính khi thực hiện system testing
Một số khía cạnh, system testing cần tập trung
* Giao diện 
* Bảo mật: Đảm bảo hệ thống không bị truy cập trái phép, đánh cắp các dữ liệu
* Phục hồi : Đảm bảo hệ thống phục hồi như mong đợi
* Hiệu suất : Đảm bảo hiệu suất của hệ thống trong các điều kiện khác nhau
* Khả năng cài đặt : Kiểm tra xem phần mềm có gặp vấn đề gì khi cài đặt không. Đây là thử nghiệm quan trọng nó là tương tác đầu tiên giữa người dùng và sản phẩm.
* Tài liệu : Đảm bảo tài liệu hệ thống là mô tả chính xác các spec của hệ thống
* Tính khả dụng : Đảm bảo hệ thống dễ sử dụng, dễ vận hành
* Load test : Đảm bảo hệ thống hoạt động tốt dưới các mức tải khác nhau

## 4.Tại sao phải thực hiện system testing
1. System testing đóng vai trò rất quan trọng, nó là bước kiểm tra tổng thể hệ thống xem có đáp ứng yêu cầu chức năng không.

2. System testing được thực hiện trong một môi trường tương tự như môi trường production và do đó các bên liên quan có thể biết được các thao tác của người dùng.

3. Nó giúp giảm thiểu các lỗi sau khi phát triển

4. Xác minh phần mềm đáo ứng đúng theo các yêu cầu chức năng kinh doanh của khách hàng

5. Thử nghiệm này rất quan trọng và nó đóng một vai trò quan trọng trong việc cung cấp một sản phẩm chất lượng cho khách hàng.. Đảm bảo đầu ra như mong đợi của khách hàng
## 5.Thực hiện system testing như thế nào?
Về cơ bản, system testing là một phần của kế hoạch kiểm thử phải có plan cụ thể cho việc này. Để thực hiện system testing hiệu quả yêu cầu người kiểm thử phải nắm rõ các chức năng của hệ thống, hiểu rõ cách sử dụng hệ thống.

Các bước thực hiện system testing:

1. Bước đầu tiên là tạo Kế hoạch kiểm tra.
2. Tạo các trường hợp kiểm tra hệ thống và các kịch bản thử nghiệm.
3. Chuẩn bị dữ liệu test cần thiết.
4. Thực hiện chạy các trường hợp kiểm thử hệ thống.
5. Báo cáo các lỗi
6. Kiểm thử hồi quy để xác minh tác động của sự thay đổi trong mã code.
7. Lặp lại chu trình thử nghiệm cho đến khi hệ thống sẵn sàng được triển khai.

![](https://images.viblo.asia/7a8ba8a7-6d0d-4211-b065-543c984faec4.jpg)

### Các điểm được đề cập trong system testing
* Thử nghiệm từ đầu đến cuối nhằm xác minh sự tương tác giữa tất cả các thành phần trong hệ thống có hoạt động tốt trong bất kỳ tình huống.
* Xác minh nếu tất cả các yêu cầu chức năng & phi chức năng được kiểm tra và hoạt động như mong đợi.
* Kiểm tra thăm dò giúp phát hiện ra các lỗi không thể tìm thấy trong kiểm tra theo kịch bản vì nó mang lại sự tự do cho người kiểm tra để kiểm tra và mong muốn của họ dựa trên kinh nghiệm và trực giác của họ.
## 6.Ưu điểm của system testing
* System testing chạy các kịch bản từ đầu đến cuối để kiểm tra hệ thống
* Thử nghiệm này được thực hiện giống với môi trường Sản xuất giúp hiểu được quan điểm của người dùng và ngăn ngừa các sự cố có thể xảy ra khi hệ thống hoạt động.
* Nếu thử nghiệm này được thực hiện một cách có hệ thống và đúng đắn, thì nó sẽ giúp giảm thiểu các vấn đề sau khi release.
* Thử nghiệm này kiểm tra cả kiến trúc ứng dụng và yêu cầu kinh doanh của hệ thống

Nguồn tài liệu: https://www.softwaretestinghelp.com/system-testing/?fbclid=IwAR3-B1MUbfHbAD6ZrCP97YoBjkhfwLO0smXz4o3mh2WMSSlU-XmnArP-nk4