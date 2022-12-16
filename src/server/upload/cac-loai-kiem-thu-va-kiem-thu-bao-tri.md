Sau đây là cái nhìn tổng quan về kiểm thử phần mềm và các kiến thức cơ bản về kiểm thử, các kỹ thuật dùng trong kiểm thử và các công cụ hỗ trợ.
![](https://images.viblo.asia/a6278159-b763-402e-84f6-89f61574f128.png)
## 1. Kiểm thử chức năng (functional testing).
![](https://images.viblo.asia/ccb0bb1e-f6fb-4b61-8eab-79fb9e66491f.png)
Kiểm thử chức năng là một loại kiểm thử hộp đen (black box) và test case của nó được dựa trên đặc tả của ứng dụng phần mềm/thành phần đang test. Các chức năng được test bằng cách nhập vào các giá trị và kiểm tra kết quả đầu ra, ít quan tâm đến cấu trúc bên trong của ứng dụng.

Kiểm thử chức năng có thể được thực hiện từ 2 góc nhìn: dựa trên yêu cầu và dựa trên quy trình nghiệp vụ.

Dựa trên yêu cầu:
- Sử dụng các đặc tả kỹ thuật của các yêu cầu chức năng để làm cơ sở cho việc test các thiết kế.
- Nội dung của các yêu cầu có thể làm các mục kiểm thử ban đầu hoặc sử dụng nó như là một danh sách các mục kiểm thử hoặc không kiểm thử.
- Dựa theo yêu cầu để phân mức độ ưu tiên trong quá trình kiểm thử. Cần ưu tiên các yêu cầu có mức độ rủi ro cao. <br>

Dựa trên quy trình nghiệp vụ:
- Các quy trình nghiệp vụ mô tả các kịch bản scenarios liên quan đến các nghiệp vụ hằng ngày của hệ thống
- Các usecase được bắt nguồn phát triển theo hướng đối tượng nhưng hiện tại phổ biến trong nhiều trong các vòng đời phát triển.
- Lấy các quy trình nghiệp vụ làm điểm khởi đầu, các quy trình nghiệp vụ xuất phát từ các nhiệm vụ được thực hiện bởi người dùng.
- Các use case là một cơ sở hữu ích cho các testcase từ góc độ nghiệp vụ.<br>

Kiểm thử chức năng bao gồm 5 bước:
- Xác định các chức năng mà phần mềm mong muốn sẽ thực hiện.
- Tạo ra các dữ liệu đầu vào dựa trên các tài liệu đặc tả kỹ thuật của các chức năng.
- Xác định kết quả đầu ra dựa trên các tài liệu đặc tả kỹ thuật của các chức năng.
- Thực hiện các trường hợp kiểm thử.
- So sánh kết quả thực tế và kết quả mong muốn. <br>

Các loại kiểm thử chức năng:
- Kiểm thử đơn vị (Unit Testing)
- Kiểm thử khói (Smoke Testing - check nhanh xem hệ thống có khởi động được hay không)
- Kiểm thử độ tỉnh táo (Sanity Testing - check nhanh xem sau khi sửa đổi thì function có hoạt động như mong muốn hay không)
- Kiểm thử giao diện (Interface Testing)
- Kiểm thử tích hợp (Integration Testing)
- Kiểm thử hệ thống (Systems Testing)
- Kiểm thử hồi quy (Regression Testing)
- Kiểm thử chấp nhận (Acceptance testing)
## 2. Kiểm thử phi chức năng (non-functional testing).
Kiểm thử phi chức năng cùng giống kiểm thử chức năng ở chỗ là thực hiện được ở mọi cấp độ kiểm thử,Kiểm thử phi chức năng xem xét các hành vi bên ngoài của phần mềm . Kiểm thử phi chức năng bao gồm:
- Kiểm thử hiệu năng (performance testing).
-Kiểm thử khả năng chịu tải (load testing).
- Kiểm thử áp lực(stress testing).
- Kiểm thử khả năng sử dụng (usability testing).
- Kiểm thử bảo trì (maintainability testing).
- Kiểm thử độ tin cậy (reliability testing)
- Kiểm thử tính tương thích(portability testing) <br>

Những đặc điểm phụ tương ứng:
- Độ tin cậy (reliability): được xác định rõ hơn từ các đặc trưng phụ đã được tính toán cẩn thận(độ bền), khả năng chịu lỗi(fault tolerance), phục hồi (recoverability) và tuân thủ (compliance).
- Khả năng sử dụng (usability): được chia thành các đặc trưng dễ hiểu, khả năng học hỏi (learnability), khả năng hoạt động (operability), sự thu hút (attractiveness) và tính tuân thủ (compliance).
- Tính hiệu quả (efficiency): được chia thành hành vi về thời gian(hiệu suất), sử dụng tài nguyên (resource utilization) và tuân thủ (compliance).
- Khả năng bảo trì (maintainability): bao gồm 5 đặc điểm phụ: phân tích, khả năng thay đổi, tính ổn định, khả năng kiểm tra và tuân thủ.
- Tính tương thích (portability): bao gồm 5 đặc điểm phụ: khả năng thích ứng, khả năng cài đặt, cùng tồn tại, khả năng thay thế và tuân thủ.
## 3. Kiểm thử cấu trúc/kiến trúc phần mềm(structural testing).
* Kiểm thử cấu trúc có thể xảy ra ở bất kỳ mức độ kiểm thử nào, được áp dụng chủ yếu ở kiểm thử thành phần, tích hợp.
* Phương pháp kiểm thử cấu trúc cũng có thể áp dụng ở các mức độ như kiểm thử tích hợp hệ thống hoặc kiểm thử chấp nhận.
* Kỹ thuật kiểm thử cấu trúc được sử dụng tốt nhất sau các kỹ thuật dựa trên các đặc điểm kỹ thuật( specification-based). Giúp đo lường kỹ lưỡng kiểm thử thông qua đánh giá độ bao phủ của loại cấu trúc.
* Độ bao phủ là phạm vi mà một cấu trúc đã được thực hiện bởi một bộ kiểm thử, tính theo phần trăm của các mục đã được bao phủ. Nếu độ bao phủ không phải là 100% các kiểm thử sẽ được thiết kế để kiểm tra các mục đã bị bỏ lỡ để tăng độ bao phủ.
* Các ký thuật được sử dụng để kiểm thử cấu trúc là: các kỹ thuật hộp trắng và các mô hình luồng điều khiển(Control flow models).
## 4. Kiểm thử xác nhận(confirmation testing) và kiểm thử hồi quy(regression testing)
Kiểm thử xác nhận.
- Sau khi một lỗi được phát hiện và sửa chữa, phần mềm được kiểm thử lại để xác nhận lỗi ban đầu đã được khắc phục gọi là kiểm thử xác nhận (Confirmation testing).
- Khi thực hiện kiểm thử xác nhận phải đảm bảo rằng các thử nghiệm được thực hiện giống như lần đầu tiên sử dụng, sử dụng các inputs, dữ liệu và môi trường giống nhau.  <br>
Kiểm thử hồi quy:
- Mục đích của kiểm thử hồi quy là xác minh rằng sửa đổi trong phần mềm hoặc môi trường không gây ra các phản ứng phụ không mong muốn và hệ thống vẫn đáp ứng các yêu cầu.
- Kiểm thử hồi quy là các kiểm thử lặp đi lặp lại của một chương trình đã được kiểm thử, sau khi sửa đổi.
- Kiểm thử hồi quy được thực hiện bất cứ khi nào trong phần mềm hoặc là kết quả của các bản sửa lỗi, chức năng mới được thay đổi
- Kiểm thử hồi quy dựa vào các bộ test case. Khi thêm chức năng mới thì phải thêm các testcase mới hoặc là các chức năng cũ được thay đổi hay xóa bỏ thì test case cũng phải được thay đổi hoặc xóa bỏ.
- Kiểm thử hồi quy có thể được thực hiện tại tất cả mức độ kiểm thử , bao gồm kiểm thử chức năng, phi chức năng và kiểm thử cấu trúc.
## 5. Kiểm thử bảo trì (Maintenance testing).
Phân tích tác động và kiểm thử hồi quy: <br>
Thông thường kiểm thử bảo trì gồm 2 phần: kiểm thử các thay đổi và Kiểm thử hồi quy để cho thấy phần còn lại của hệ thống không bị ảnh hưởng bởi công việc bảo trì.
Hoạt động chính và quan trọng trong việc kiểm thử bảo trì là việc phân tích các tác động. Từ việc phân tích sẽ quyết định được những phần nào của hệ thống có thể bị ảnh hưởng không mong muốn. <br>
Phân tích rủi ro sẽ giúp quyết định được nơi cần tập trung kiểm thử hồi quy. <br>
Khởi động cho kiểm thử bảo trì:
- Kiểm thử bảo trì được thực hiện trên hệ thống đã tồn tại và được thực hiện khi có sự thay đổi, di chuyển hoặc rút lui của phần mềm hoặc hệ thống.
- Kiểm thử bảo trì cho việc thay đổi: Các cải tiến bao gồm thay đổi tăng theo kế hoạch, khắc phục những thay đổi khẩn cấp và thay đổi môi trường.
- Kiểm thử bảo trì cho sự chuyển đổi: Bao gồm kiểm tra hoạt động của môi trường mới , các phần mềm đã thay đổi. Kiểm thử di chuyển ( kiểm thử chuyển đổi) cũng cần thiết khi dữ liệu từ một ứng dụng khác sẽ được di chuyển vào hệ thống đang được bảo trì.
- Kiểm thử bảo trì đối với hệ thống đã ngưng hoạt động: bao gồm kiểm thử việc chuyển đổi dữ liệu hoặc lưu trữ, nếu cần lưu trữ dữ liệu lâu dài.
- Từ quan điểm của việc chuyển đổi thì có 2 loại:
  + Chuyển đổi theo kế hoạch bao gồm: Chuyển đổi hoàn thiện(phần mềm thích nghi được với mong muốn người dùng), Chuyển đổi thích nghi ( phần mềm thích nghi được với sự thay đổi của môi trường như phần cứng mới, phần mềm hệ thống mới), Chuyển đổi điều chỉnh theo kế hoạch ( sửa chữa lỗi).
  + Những chuyển đổi bột phát không thể lên kế hoạch được: đối với những lỗi như thế này cần phân tích rủi ro của hệ thống hoạt động để xác định chức năng hoặc chương trình gây lỗi. <br>
  
Kết thúc bài viết lần này các bạn có thể nắm được những thông tin cơ bản về 4 loại kiểm thử chính ( chức năng, phi chức năng, cấu trúc và các thay đổi có liên quan) và kiểm thử bảo trì.