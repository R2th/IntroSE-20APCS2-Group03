## Hệ thống nhúng là gì?
Phần mềm nhúng là một chương trình được viết, biên dịch trên máy tính và nạp vào một hệ thống khác bao gồm một hoặc nhiều bộ vi xử lý đã được cài sẵn một hệ điều hành, bộ nhớ ghi chép được, các cổng giao tiếp với các phần cứng khác…
Hệ thống nhúng là các thiết bị được điều khiển điện tử trong đó phần mềm và phần cứng được kết hợp chặt chẽ. Người dùng cuối thường không nhận thức được sự tồn tại của nó.

Hiện nay phần lớn các phần mềm nhúng nằm trong các sản phẩm về truyền thông, tự động hoá điều khiển, quan trắc và truyền tin, các sản phẩn ô tô, máy móc thiết bị y tế,các thiết bị năng lượng....

## Kiểm thử phần mềm nhúng là gì?
Kiểm thử phần mềm nhúng là kiểm tra các hệ thống nhúng. Kiểm thử phần mềm nhúng cũng tương tự như các loại kiểm thử khác. Phần mềm nhúng được kiểm tra về hiệu suất, tính nhất quán và được xác thực theo yêu cầu của khách hàng và được thực hiện bởi nhóm phát triển phần mềm.

Kiểm tra phần mềm nhúng kiểm tra và đảm bảo phần mềm liên quan có chất lượng tốt và tuân thủ tất cả các yêu cầu cần đáp ứng. Kiểm thử phần mềm nhúng là một cách tiếp cận tuyệt vời để đảm bảo an ninh trong các ứng dụng quan trọng như thiết bị y tế, đường sắt, hàng không, ngành công nghiệp xe cộ, ... Kiểm tra nghiêm ngặt và cẩn thận là rất quan trọng để cấp chứng nhận phần mềm.

## Cách thực hiện Kiểm thử phần mềm nhúng
Kiển thử phần mềm nhúng vì bốn lý do:

* Để tìm lỗi trong phần mềm
* Giúp giảm rủi ro cho cả người dùng và công ty phát triển
* Cắt giảm chi phí phát triển và bảo trì
* Để cải thiện hiệu suất

Trong Kiểm thử nhúng, các hoạt động sau được thực hiện:

1. Cung cấp đầu vào cho phần mềm.

2. Một phần của phần mềm được thực thi.

3. Trạng thái phần mềm được quan sát và các đầu ra được kiểm tra các thuộc tính dự kiến ​​như liệu đầu ra có khớp với kết quả mong đợi hay không, phù hợp với các yêu cầu và không có sự cố hệ thống.

## Các loại kiểm thử phần mềm nhúng
Về cơ bản, có năm cấp độ thử nghiệm có thể được áp dụng cho phần mềm nhúng

### Kiểm thử đơn vị phần mềm
Các mô-đun đơn vị là một chức năng hoặc lớp. Kiểm thử đơn vị được thực hiện bởi nhóm phát triển, chủ yếu là nhà phát triển và thường được thực hiện theo mô hình đánh giá ngang hàng. Dựa trên đặc điểm kỹ thuật của các trường hợp thử nghiệm mô-đun được phát triển.

### Kiểm thử tích hợp
Kiểm thử tích hợp có thể được phân thành hai phân khúc:

Kiểm thử tích hợp phần mềm
Kiểm thử tích hợp phần mềm / phần cứng.

Phát triển phần mềm nhúng có một đặc điểm duy nhất tập trung vào môi trường thực tế. Điều này gây ra sự bất tiện cho thử nghiệm vì thử nghiệm toàn diện không thể được thực hiện trong điều kiện mô phỏng.


### Kiểm thử đơn vị hệ thống
Mô-đun được kiểm tra là một khung đầy đủ bao gồm mã phần mềm hoàn chỉnh bổ sung tất cả hệ điều hành thời gian thực (RTOS- real- time operating system) và các phần liên quan đến nền tảng như ngắt, cơ chế tác vụ, truyền thông, v.v. Giao thức Point of Control không còn là một cuộc gọi đến một chức năng hoặc một lời gọi phương thức, mà là một tin nhắn được gửi / nhận sử dụng các hàng đợi tin nhắn RTOS.

Tài nguyên hệ thống được quan sát để đánh giá khả năng của hệ thống để hỗ trợ thực thi hệ thống nhúng. Đối với khía cạnh này, thử nghiệm hộp xám là phương pháp thử nghiệm được ưa chuộng. Tùy thuộc vào tổ chức, kiểm tra đơn vị hệ thống là nhiệm vụ của nhà phát triển hoặc nhóm tích hợp hệ thống chuyên dụng.

### Kiểm thử tích hợp hệ thống
Các điểm kiểm soát và quan sát (PCO- Points of Control and Observations) là sự pha trộn của các giao thức truyền thông và RTOS liên quan đến mạng, như tin nhắn mạng và các sự kiện RTOS. 

### Kiểm tra xác nhận hệ thống
Mô-đun được kiểm tra là một hệ thống con hoặc hệ thống nhúng hoàn chỉnh. Mục tiêu của thử nghiệm cuối cùng này là để đáp ứng các yêu cầu chức năng thực thể bên ngoài. Việc kiểm tra liên quan đến thực thể bên ngoài hoặc một thiết bị trong mạng viễn thông hoặc cả hai.

## Sự khác biệt: Kiểm thử nhúng và Kiểm thử phần mềm

| Kiểm thử phần mềm | Kiểm tra nhúng | 
| -------- | -------- |
|Kiểm thử phần mềm chỉ liên quan đến phần mềm     | Kiểm tra nhúng có liên quan đến cả phần mềm cũng như phần cứng.     |
|Trung bình 90% thử nghiệm được thực hiện trên thế giới hoàn toàn là thử nghiệm hộp đen thủ công.	|Thử nghiệm nhúng được thực hiện trên các hệ thống nhúng hoặc chip, nó có thể là thử nghiệm hộp đen hoặc hộp trắng.|
|Các lĩnh vực kiểm tra chính là kiểm tra GUI, chức năng, xác nhận và một số cấp độ kiểm tra cơ sở dữ liệu.	|Các lĩnh vực chính của thử nghiệm là hoạt động của phần cứng dựa trên đầu vào|
|Kiểm thử phần mềm được thực hiện chủ yếu trên các ứng dụng máy khách, máy chủ và web.|	Kiểm tra nhúng thường được thực hiện trên Phần cứng.|
|ví dụ: Google Mail, Yahoo Mail, ứng dụng Android.|	ví dụ: Máy thuộc lĩnh vực chăm sóc sức khỏe, Vi điều khiển được sử dụng trong máy tính.|

## Thách thức: Kiểm thử phần mềm nhúng
Một số thách thức có thể gặp phải trong quá trình kiểm thử phần mềm nhúng:

### Phụ thuộc phần cứng
Sự phụ thuộc phần cứng là một trong những khó khăn chính gặp phải trong quá trình kiểm thử phần mềm nhúng vì quyền truy cập hạn chế vào phần cứng. Tuy nhiên, Trình mô phỏng có thể không thể hiện chính xác hoạt động của thiết bị thực tế và có thể hiểu sai về hiệu suất hệ thống và khả năng sử dụng của ứng dụng.

### Phần mềm mã nguồn mở
Phần lớn các thành phần phần mềm nhúng là nguồn mở, không có kiểm tra hoàn chỉnh có sẵn cho nó.

### Lỗi phần mềm so với phần cứng
Một khía cạnh khác là khi phần mềm đang được phát triển cho một phần cứng mới được tạo ra, trong quá trình này có thể xác định được tỷ lệ lỗi phần cứng cao. Các khiếm khuyết tìm thấy chỉ là không giới hạn ở phần mềm. Nó cũng có thể liên quan đến phần cứng.

### Cập nhật phần mềm liên tục
Các hệ thống nhúng yêu cầu cập nhật phần mềm thường xuyên như nâng cấp kernel, sửa lỗi bảo mật, trình điều khiển thiết bị khác nhau, v.v ... Các ràng buộc được xác định với ảnh hưởng cập nhật phần mềm khiến việc nhận dạng lỗi trở nên khó khăn. Ngoài ra, nó làm tăng tầm quan trọng của quy trình xây dựng và triển khai.

## Kết luận

Có một số khó khăn trong việc kiểm tra kiểm thử phần mềm nhúng khiến việc này khó hơn kiểm thử phần mềm thông thường. Vấn đề cơ bản nhất là sự phụ thuộc chặt chẽ vào môi trường phần cứng được chuẩn bị đồng thời với phần mềm và điều đó thường xuyên được yêu cầu để thực hiện kiểm thử phần mềm đáng tin cậy. Đôi khi thậm chí rất khó để kiểm tra phần mềm mà không có các công cụ tùy chỉnh.
Một trong những điều quan trọng nhất là nên thường xuyên chọn kiểm tra phần mềm tự động. Kiểm thử tự động giúp quá trình kiểm thử nhanh hơn, sẽ mất vài giờ để hoàn thành và theo cách này, vấn đề về phần mềm của bạn được giải quyết.

Nguồn tài liệu : https://www.guru99.com/embedded-software-testing.html