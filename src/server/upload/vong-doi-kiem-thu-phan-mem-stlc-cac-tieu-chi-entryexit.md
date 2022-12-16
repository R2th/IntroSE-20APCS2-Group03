# Vòng đời kiểm thử phần mềm (STLC) là gì?
Vòng đời kiểm thử phần mềm (STLC) được định nghĩa là một chuỗi các hoạt động được thực hiện để tiến hành Kiểm thử phần mềm.

Trái với sự tin tưởng thông dụng, Kiểm thử phần mềm không chỉ là một hoạt động đơn lẻ. Nó bao gồm một loạt các hoạt động được thực hiện theo phương pháp để giúp chứng nhận sản phẩm phần mềm của bạn.

# Các giai đoạn khác nhau của Mô hình STLC

STLC Diagram    
![](https://images.viblo.asia/58a821fb-dd28-42b5-96c3-f5398ec7a3c8.PNG)

Dưới đây là các giai đoạn của STLC:
* Phân tích yêu cầu (Requirement Analysis)
* Kế hoạch kiểm tra (Test Planning)
* Phát triển trường hợp thử nghiệm (Test case development)
* Kiểm tra thiết lập môi trường (Test Environment setup)
* Thực hiện kiểm tra (Test Execution)
* Kiểm tra đóng cửa chu kỳ (Test Cycle closure)

Mỗi giai đoạn này có một tiêu chí Nhập và Xuất xác định, Hoạt động & Sản phẩm được liên kết với các tiêu chí này.

# Tiêu chí Entry - Exit là gì?
* Tiêu chí đầu vào (Entry Criteria): Tiêu chí đầu vào đưa ra các mục tiên quyết phải được hoàn thành trước khi thử nghiệm có thể bắt đầu.
* Tiêu chí đầu ra (Exit Criteria): Tiêu chí đầu ra xác định các mục phải hoàn thành trước khi kiểm tra có thể được kết luận

Bạn có Tiêu chí đầu vào và đầu ra cho tất cả các cấp trong Vòng đời Thử nghiệm Phần mềm (STLC)

Trong một thế giới lý tưởng, bạn sẽ không bước vào giai đoạn tiếp theo cho đến khi các tiêu chí đầu ra cho giai đoạn trước được đáp ứng. Nhưng thực tế điều này không phải lúc nào cũng có thể. Vì vậy, đối với hướng dẫn này, chúng tôi sẽ tập trung vào các hoạt động và phân phối cho các giai đoạn khác nhau trong vòng đời STLC.  Hãy cùng tìm hiểu chi tiết hơn về chúng.

## Phân tích yêu cầu (Requirement Analysis)
Trong giai đoạn này, nhóm thử nghiệm nghiên cứu các yêu cầu từ quan điểm thử nghiệm để xác định các yêu cầu thử nghiệm.

Nhóm QA có thể tương tác với các bên liên quan khác nhau (Khách hàng, Nhà phân tích kinh doanh, Nhà lãnh đạo kỹ thuật, Kiến trúc sư hệ thống, v.v.) để hiểu chi tiết các yêu cầu.

Các yêu cầu có thể là Chức năng (xác định những gì phần mềm phải làm) hoặc Không chức năng (xác định tính khả dụng / bảo mật của hệ thống)

Tính khả thi tự động hóa cho dự án thử nghiệm nhất định cũng được thực hiện trong giai đoạn này.

### Hoạt động

* Xác định các loại thử nghiệm sẽ được thực hiện.
* Thu thập chi tiết về ưu tiên kiểm tra và tập trung.
* Chuẩn bị ma trận truy xuất nguồn gốc yêu cầu (RTM).
* Xác định chi tiết môi trường thử nghiệm nơi thử nghiệm được cho là được thực hiện.
* Phân tích tính khả thi tự động hóa (nếu cần).

### Sản phẩm bàn giao
* RTM
* Báo cáo khả thi tự động hóa. (nếu có)

### Kế hoạch kiểm tra (Test Planning)
Thông thường, trong giai đoạn này, Senior QA manager sẽ xác định effort và dự toán chi phí cho dự án và sẽ chuẩn bị và hoàn thiện Kế hoạch kiểm tra. Trong giai đoạn này, Chiến lược thử nghiệm cũng được xác định.

### Hoạt động

* Chuẩn bị kế hoạch kiểm tra / tài liệu chiến lược cho các loại thử nghiệm
* Lựa chọn công cụ kiểm tra
* Dự toán nỗ lực
* Lập kế hoạch nguồn lực và xác định vai trò và trách nhiệm.
* Yêu cầu đào tạo
* 
### Sản phẩm bàn giao
* Kế hoạch kiểm tra / tài liệu chiến lược.
* Tài liệu dự toán nỗ lực.

## Phát triển trường hợp thử nghiệm (Test Case Development)
Giai đoạn này liên quan đến việc tạo, xác minh và làm lại các trường hợp thử nghiệm & kịch bản thử nghiệm. Dữ liệu thử nghiệm, được xác định / tạo và được xem xét và sau đó làm lại.

* ### Hoạt động

* Tạo trường hợp thử nghiệm, tập lệnh tự động hóa (nếu có)
* Xem xét và kiểm tra các trường hợp cơ bản và kịch bản
* Tạo dữ liệu thử nghiệm (Nếu Môi trường thử nghiệm khả dụng)

### Sản phẩm bàn giao
* Các trường hợp / kịch bản thử nghiệm
* Dữ liệu kiểm tra

## Kiểm tra cài đặt môi trường
Môi trường kiểm tra quyết định các điều kiện phần mềm và phần cứng, theo đó một sản phẩm làm việc được kiểm tra. Thiết lập môi trường thử nghiệm là một trong những khía cạnh quan trọng của quy trình thử nghiệm và có thể được thực hiện song song với Giai đoạn phát triển trường hợp thử nghiệm. Nhóm thử nghiệm có thể không tham gia vào hoạt động này nếu khách hàng / nhóm phát triển cung cấp môi trường thử nghiệm trong trường hợp nhóm thử nghiệm được yêu cầu thực hiện kiểm tra sẵn sàng (thử nghiệm khói) của môi trường cụ thể.

### Hoạt động

* Hiểu kiến trúc cần thiết, thiết lập môi trường và chuẩn bị danh sách yêu cầu phần cứng và phần mềm cho Môi trường thử nghiệm.
* Thiết lập thử nghiệm Môi trường và dữ liệu thử nghiệm
* Thực hiện kiểm tra khói trên công trình

### Sản phẩm bàn giao
* Môi trường sẵn sàng với dữ liệu thử nghiệm được thiết lập
* Kết quả Smoke Test.

## Thực hiện kiểm tra (Test Execution)
Trong giai đoạn này, những người thử nghiệm sẽ thực hiện thử nghiệm dựa trên các kế hoạch thử nghiệm và các trường hợp thử nghiệm được chuẩn bị. Lỗi sẽ được báo cáo lại cho nhóm phát triển để sửa lỗi và kiểm tra lại sẽ được thực hiện.

### Hoạt động

* Thực hiện kiểm tra theo kế hoạch
* Kết quả kiểm tra tài liệu và lỗi đăng nhập cho các trường hợp thất bại
* Lỗi bản đồ cho các trường hợp thử nghiệm trong RTM
* Kiểm tra lại các sửa lỗi
* Theo dõi các khuyết tật để đóng cửa

### Sản phẩm bàn giao
* Đã hoàn thành RTM với trạng thái thực thi
* Các trường hợp thử nghiệm được cập nhật với kết quả
* Báo cáo lỗi

## Kiểm tra đóng chu kỳ (Test Cycle Closure)
Nhóm thử nghiệm sẽ gặp gỡ, thảo luận và phân tích các tạo phẩm thử nghiệm để xác định các chiến lược phải thực hiện trong tương lai, lấy bài học từ chu kỳ thử nghiệm hiện tại. Ý tưởng là để loại bỏ các nút thắt quá trình cho các chu kỳ thử nghiệm trong tương lai và chia sẻ các thực tiễn tốt nhất cho bất kỳ dự án tương tự nào trong tương lai.

### Hoạt động

* Đánh giá các tiêu chí hoàn thành chu kỳ dựa trên Thời gian, Phạm vi kiểm tra, Chi phí, Phần mềm, Mục tiêu kinh doanh quan trọng, Chất lượng
* Chuẩn bị các số liệu kiểm tra dựa trên các thông số trên.
* Tài liệu học tập ngoài dự án
* Chuẩn bị báo cáo đóng cửa thử nghiệm
* Báo cáo định tính và định lượng về chất lượng sản phẩm làm việc cho khách hàng.
* Kiểm tra phân tích kết quả để tìm ra phân phối lỗi theo loại và mức độ nghiêm trọng.

### Sản phẩm bàn giao
* Báo cáo kết thúc kiểm tra
* Kiểm tra số liệu

Nguồn: https://www.guru99.com/software-testing-life-cycle.html