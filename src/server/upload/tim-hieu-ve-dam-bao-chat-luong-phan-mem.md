Nếu bạn là 1 dev ở bất cứ ngôn ngữ nào, thì có phải chăng bạn đã từng nghĩ những sản phẩm của mình sau bao nhiêu ngày code vất vả sẽ đem lại những thành quả như mong đợi. Chẳng hạn, android dev hoặc ios dev thì mong app được nhiều lượt tải, web dev thì hy vọng web nhiều lượt view, tương tác....vân vân và vân vân. Nhưng đời không phải lúc nào cũng như mơ đúng không nào, không phải cứ bỏ ra nhiều công sức, hì hục code là sẽ có được thành quả như ý muốn. Dưới đây là đôi lời tâm sự của 1 người bạn đã từng nói với mình:
> "Ngày xưa, khi nhắc về code, tao nghĩ ngay đến 1 thằng con trai gầy gò, nhỏ con, mắt thâm, bên cạnh lúc nào cũng có 1 ly cà phê và điếu thuốc lá đang cháy dở ngồi hì hục code ở 1 góc nhà với chiếc bàn phím đã nhẵn bóng không còn mặt chữ. Nhưng sau những ngày tháng thắp đèn cày đêm đó, tưởng chừng như sẽ có được 1 sản phẩm triệu người dùng với doanh thu tỉ $. Ấy vậy mà, ngày ra mắt sảm phẩm đứa con tinh thần, tao dường như chết lặng bởi những dòng comment phản hổi từ người dùng. Nào là app quá tệ, giao diện xấu, app crash liên tục....Tao đã phải thức trắng nhiều đêm để suy nghĩ về câu hỏi "Tại sao? Tại sao code như vậy mà?". Trong lúc tuyệt vọng ấy, tao chợt nhớ ra bài học lúc còn trên giảng đường cuối đời sv của tao về Đảm bảo Chất lượng Phần mềm. Nó dường như 1 tia sáng cuối con đường cứu rỗi tâm hồn tuyệt vọng này." 

Vậy Đảm bảo Chất lượng Phần mềm là gì? Thực hư nó như thế nào? Tại sao nó lại sức mạnh như vậy?..." Bài viết này mình sẽ chia sẻ 1 chút hiểu biết của mình về nó. Đầu tiên là những khái niêm cơ bản nhất về phần mềm.

### 1. Phần mềm, Lỗi phần mềm là gì
- **Phần mềm** là một tập các dữ liệu hoặc tài liệu hướng dẫn cho máy tính có thể thực hiện được.
- **Lỗi phần mềm** là một **error**, **fault** hoặc **failure** trong chương tình hoặc hệ thống máy tính dẫn đến tạo ra kết quả không chính xác hoặc không mong muốn hoặc một kết quả không lường trước được.

Đến đây các bạn có 1 thắc mắc vậy error, fault, failure là gì? hay các bạn cũng đã từng nghe tới bug, mistake, defect, thì mình sẽ giải đáp luôn nha.
+ **Error**: Lỗi xảy ra khi có hành động của con người dẫn đến kết quả sai. Error hay còn được gọi là mistake.
+ **Fault**: Lỗi xay ra khi có khuyết điểm trong thành phần hoặc hệ thống dẫn đến hành thành phần hoặc hệ thống thực hiện không đúng chức năng của nó. Fault hay còn được gọi là bug, defect.
+ **Failure**: Lỗi xảy ra khi kết quả sai lệch với mong muốn của người dùng hoặc đặc tả của sản phẩm.

Tiếp theo, sẽ là mình sẽ bàn đến các nguyên nhân gây ra lỗi phần mềm
### 2. Các nguyên nhân gây ra Lỗi phần mềm
![](https://images.viblo.asia/cf3fb878-b9d6-4835-8578-796cab522672.jpg)

- Có rất rất nhiều nguyên nhân dẫn đến 1 phần mềm bị lỗi, dưới đây mình sẽ liệt kê ra các nguyên nhân kinh điển nhất:
+ **Nguyên nhân 1**: Lỗi khi định nghĩa yêu cầu
    + Đây được xem như nguyên nhân chính dẫn đến mọi lỗi sau này
    + Định nghĩa yêu cầu lỗi hoặc không đầy đủ, thiếu hoặc không cần thiết
+ **Nguyên nhân 2**: Lỗi thiết kế logic
    + Sai thuật toán, sai công thức tính toán
    + Bỏ sót mố số case trong các trường hợp
    + Không xử lý triệt để logic
+ **Nguyên nhân 3**: Sai phạm có chủ ý với phần mềm
    + Tác nhân chủ yếu là dev :))
    + Dev có thể bỏ qua 1 số function do áp lực về mặt thời gian, tài chính
    + Dev tái sử dụng code mà không test lại
    + Dev tự ý cải tiến một số function mà không báo trước
+ **Nguyên nhân 4**: Quan hệ giữa dev và client
    + Hiểu sai các tài liệu yêu cầu
    + Hiểu sai tài liệu khi bị thay đổi
    + Đội khi cùng 1 vấn đề nhưng dev hiểu mộ đường còn client hiểu một kiểu khác
+ **Nguyên nhân 5**: Lỗi lập trình
    + Chủ yếu là lỗi liên quan đến coding
    + Lỗi cú pháp
    + Lỗi logic
    + Lỗi run time
+ **Nguyên nhân 6**: Không tuân thủ các hướng dẫn viết code và tài liệu
    + Lỗi do không tuân thủ các chuẩn coding conventions, các template, structure.
+ **Nguyên nhân 7**: Thiếu sót của quá trình kiểm thử
    + Quá trình kiểm thử thường xuyên bị bỏ qua ở một số phần mềm vừa và nhỏ
    + Hoặc nếu có thì chỉ test sơ sài, qua loa, dẫn đến không phát hiện được lỗi hoặc phát hiện lỗi nhưng không chính xác, mập mờ
    + Hoặc nếu tìm được lỗi thì không có đủ thời gian sửa lỗi
Ngoài ra còn khá nhiều nguyên nhân nữa, nhưng mình xin dừng ở đây, các bạn có thể gg để tìm hiểu thêm nhé

### 3. Chất lượng phần mềm, Đảm bảo chất lượng phần mềm là gì? Các tiêu chí Đảm bảo chất lượng phần mềm
- Chất lượng phần mềm là mức độ mà nó đáp ứng được yêu cầu chức năng hoặc đặc tả yêu cầu (hoặc là mức độ mà một hệ thống, thành phần, hay tiến trình đáp ứng được nhu cầu/mong muốn của khách hàng/người dùng.)
- Đảm bảo chất lượng phần mềm là 1 mô hình có kế hoạch và hệ thống của tất cả các hành động cần thiết để đem lại sự tin cậy rằng 1 sản phẩm phần mềm tuân thủ đầy đủ các yêu cầu về kĩ thuật đã đề ra.

![](https://images.viblo.asia/0a998c18-def1-4be4-8245-496acb17470d.jpg)

Từ những khái niệm cơ bản trên, [McCall](https://en.wikipedia.org/wiki/ISO/IEC_9126) đã đề ra 11 tiêu chí cho Đảm bảo chất lượng phần mềm, được chia thành 3 loại
* Tiêu chí vận hành sản phẩm (Product operation factors): Hệ thống có chạy tốt không, có dễ sử dụng không
    - Correctness: Tính đúng đắn: đặc tả về độ chính xác, sự toàn vẹn của output
    - Reliability: Tính tin cậy: Đề cập tới lỗi khi cung cấp dịch vụ: tỉ lệ lỗi, thời gian hệ thống chết
    - Efficiency: Tính hiệu quả: Đề cập tới tài nguyên phần cứng cần để thực hiện các chức năng của phần mềm.
    - Integrity: Tính toàn vẹn: Đề cập tới bảo mật của hệ thống với việc ngăn chặn truy cập trái phép
    - Usability: Tính khả dụng: Đề cập tới quy mô nguồn lực để đào tạo nhân viên mới sử dụng hệ thống
* Tiêu chí sửa đổi sản phầm (Product revision factors): Hệ thống có dễ dàng sửa lỗi không, dễ dàng kiểm thử không
    - Maintainability: Mức công sức cần để bảo trì khi có lỗi, kiến trúc các module như thế nào
    - Flexibility: Đề cập tới nguồn lực để thay đổi phần mềm khi khách hàng thay đổi
    - Testability: Có hỗ trợ test hay không: tạo file log, backup
* Tiêu chí chuyển giao sản phầm (Product transition factors): Hệ thống có dễ dàng chuyển đổi sang các phần cứng không, có thể tái sử dụng không
    - Portability: Nếu phần mềm cài ở môi trường mới, có giữ đc các tính năng như cũ không
    - Reusability: Có thể tái sử dụng các module nhỏ không
    - Interoperability: Phần mềm có cần Interface với các hệ thống đã có

Tiếp theo là 1 phần đươc rất nhiều bạn quan tâm, nhưng vì kiến thức của mình có phần hạn hẹp nên không thể trình bày nhiều được, mong các bạn thông cảm nha.
### 4. Kiểm thử phần mềm: kỹ thuật, phương pháp
Trước khi đi vào nội dung chính của phần này, mình xin điểm qua 1 vài bug dẫn đến các sự cố kinh điển trong lịch sử thế giới
1. **Tên lửa đánh chặn patriot thất bại**
![](https://images.viblo.asia/e2a1e253-d520-4204-9dfa-d159ef1c0f62.jpg)

- Xảy ra trong chiến tranh Vùng vịnh tháng 2 năm 1991
- Hậu quả: 28 người chết, 100 người bị thương
- Nguyên nhân: do lỗi làm tròn số
3. **Sự cố máy tính Y2K**
![](https://images.viblo.asia/a6574c8e-a650-489a-9ddf-480d57f5f74d.jpg)

- Xảy ra vào thời điểm chuyển giao thế kỉ 20 và 21
- Hâu quả: nhiều hệ thống máy tính bị tính toán sai
- Nguyên nhân: do máy tính không phân biệt được năm 2000 và năm 1900

Từ một số ví dụ trên, chúng ta nhận thấy được tầm quan trọng của việc kiểm thử phần mềm ở mức độ nào rồi chứ. Vậy kiểm thử phần mềm có những kỹ thuật nào, hay phương pháp ra sao, thì cùng mình tìm hiểu nhé.

**1. Kỹ thuật kiểm thử**

a. Kiểm thử hộp đen
![](https://images.viblo.asia/8eb33ca3-54cb-4cb2-95b7-5f4ae4d0eb0d.gif)

- Nghe cái tên thì có vẻ đen tối nhỉ, nhưng thực ra nó được hiểu theo đúng nghĩa đen vậy đó.
- Kiểm thử hộp đen là phương pháp kiểm thử mà không cần biết cài đặt hay cấu trúc bên trong của hệ thống
- Phương pháp:
    + Phân vùng tương đương
    + Phân tích giá trị biên
    + Sử dụng bảng quyết định
- Ưu điểm:
    + Người kiểm thử không nhất thiết phải là dân IT chuyên nghiệp
    + Người kiểm thử có thể thực hiện độc lập với dev để có 1 cái nhìn khách quan
    + Xây dựng kịch bản test khá nhanh
- Nhược điểm:
    + Dữ liệu đầu vào khá lớn
    + Viết testcase khá khó cho 1 số dự án đầu vào không rõ ràng
    + Kiểm thử hộp đen được ví như "chim xa bụi rậm, không biết đi lối nào", vì người test không nắm được cấu trúc của phần mềm
    + .
    
b. Kiểm thử hộp trắng
![](https://images.viblo.asia/b0bfb9e5-ec14-41a8-aede-446385d6871d.jpg)
- Kiểm thử hộp trắng là phương pháp kiểm thử cần biết cấu trúc hay cài đặt bên trong của hệ thống
- Phương pháp:
    + Kiểm thử dựa trên luồng điều khiển
    + Kiểm thử đường cơ bản
- Ưu điểm:
    + Thời gian có thể bắt đầu test sớm
    + Dễ dàng phát hiện các lỗi bên trong của hệ thống so với Kiểm thử hộp đen
    + Dev có thể tự kiểm tra code   
- Nhược điểm:
     + Do quá trình test phức tạp, nên yêu cầu test phải có trình độ chuyên môn
     + Các công cụ test hầu như không sẵn có

### 5. Tổng kết
Trên đây là là một số chia sẻ của mình về 1 vấn đề nằm ngoài luồng code hằng ngày của các dev. Hy vọng mỗi dev có thể dành 1 chút thời gian, tạm gác lại công việc code để có thể suy nghĩ về một số khía cạnh khác trong quá trình phát triền phần mềm. Và 1 trong những khía cạnh không thể bỏ qua đó là **Đảm bảo chất lượng phần mềm**.

Là 1 Android dev nên mình cũng không nắm sâu về phần này, nhưng mình cũng có những hiểu biết cơ bản về nó. Và mình hy vọng với bài chia sẻ của mình về những cái gọi là cơ bản nhất có thể hữu ích với mọi người. Thanks all.

Tài liệu tham khảo: [IEEE standard 610.12](http://www.mit.jyu.fi/ope/kurssit/TIES462/Materiaalit/IEEE_SoftwareEngGlossary.pdf)