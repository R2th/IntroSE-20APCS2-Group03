Kiểm thử phần mềm nên bắt đầu sớm trong vòng đời phát triển phần mềm. Điều này giúp nắm bắt và loại bỏ các khiếm khuyết ngay từ những ngày đầu tiên phần mềm được phát triển, dẫn đến tối ưu chi phí trong toàn bộ quá trình.

Các lợi ích khác nhau của việc kiểm thử sớm cho QA Managers, Leads và Testers được trình bày dưới đây.

# Tại sao phải thử nghiệm sớm trong phát triển phần mềm?
Thông thường, Program Manager (PM) phối hợp với tất cả các bên liên quan bao gồm Tiếp thị, Lập trình, QA và Support teams để đưa ra được kế hoạch phát hành phần mềm.

Trong bài viết này, kế hoạch phát triển  dựa trên mô hình thác nước – Waterfall model sẽ được dùng để làm ví dụ cho việc giải thích chi tiết khái niệm kiểm thử phần mềm sớm.

![](https://images.viblo.asia/8f120dee-86da-4082-bb90-b0bfa6e29460.jpg)

# Kế hoạch kiểm thử khi phát hành phần mềm.
Hầu hết các doanh nghiệp hiện nay vẫn sử dụng mô hình phát triển thời gian thực ( Time based release ), khi các sản phẩm hoặc phần mềm được xác định thời gian phát hành trong khoảng nửa năm hoặc theo quý.

Phần lớn, mô hình Waterfall được sử dụng để thực hiện các bản phát hành phần mềm như vậy. Trong một số trường hợp cho chu kỳ phát hành ngắn hơn, mô hình Agile / Scrum được sử dụng thay thế.

![](https://images.viblo.asia/eecf1e4b-b28e-4d46-abfd-dfcc36656053.jpg)
Ví dụ về kế hoạch kiểm thử theo quý.

# Ảnh hưởng của các thiếu sót nghiêm trọng hoặc lỗi cực kỳ nghiêm trọng.
![](https://images.viblo.asia/a3d8ac51-5500-4cf8-867c-1bd35b20d64a.jpg)
Ảnh hưởng của lỗi nghiêm trọng.

**Điểm 1**. Trong quá trình kiểm thử luôn có khả năng:
_Các thiếu sót hoặc lỗi nghiêm trọng được xác định và ghi lại bởi Tester.
_Lập trình viên cần phải xử lý những lỗi này.
_Sau đó, Tester cần xác minh các bản sửa lỗi.
**Điểm 2**. Nhiều tổ chức phát triển phần mềm thừa nhận rằng việc sửa và xác minh các lỗi – bug nghiêm trọng ở một số lượng lớn là:

_Tốn nhiều thời gian.
_Sử dụng nhiều tài nguyên ( con người + máy móc)
_Để sửa một lỗi lớn có thể phát sinh thêm nhiều lỗi nhỏ và cần can thiệp sâu mà mã nguồn của chương trình.
**Điểm 3**. Nếu một số lượng lớn các lỗi nghiêm trọng được tìm thấy trong thời điểm deadline của dự án, nhiều khả năng tiêu cực có thể xảy ra.

_Xác suất cao chu kỳ kiểm định sẽ phải kéo dài thềm.
_Xác suất cao của thời hạn phát hành không kịp tiến độ.
_Một tính năng cụ thể có một số lượng lớn bugs có thể bị rút ra khỏi bản phát hành này.
_Cam kết với khách hàng bị bỏ lỡ.

## Đối với các lỗi khác?
Có những khiếm khuyết mức độ trung bình và thấp sẽ được Tester xác định và ghi lại. Những điều này cũng cần được lập trình viên và QA xử lý thích hợp. Do đó, đây là một hoạt động cần sự phối hợp liên tục giữa hai bên.

# Không có một giải pháp nào đảm bảo chất lượng một cách toàn diện.
Thực tế rằng, không một quy trình kiểm thử nào có thế đảm bảo phát hiện ra toàn bộ sai sót trong một phần mềm. Điều này có nghĩa, dù kiểm định trong bao lâu đi chăng nữa thì cũng không thể có một phần mềm hoàn hảo.
Tuy nhiên, nếu nhìn từ góc độ khả năng ứng dụng trong mô hình thị trường đào thải nhanh, chúng ta cần loại bỏ tư duy hoàn hảo và tập trung vào việc xác định những lỗi nghiêm trọng ngày từ giai đoạn đầu phát triển phần mềm.

Bất kỳ hoặc tất cả những điều trên sẽ có tác động tiêu cực đến hoạt động kinh doanh của doanh nghiệp. Trong bối cảnh này, việc áp dụng kiểm thử sớm như một hoạt động kế hoạch kiểm định riêng biệt sẽ có lợi cho việc quản lý tổng thể phát triển phần mềm cho một dự án.

# Phạm vi của nỗ lực kiểm thử sớm.
Vì chúng ta đang đề cập đến kiểm thử sớm như một hoạt động mới được theo dõi riêng trong quá trình thực hiện kiểm định, vì vậy những giả định dưới đây được mặt định đã được thống nhất.
_Toàn bộ dự án hoặc kế hoạch phát hành phần mềm đã được phê duyệt và cung cấp cho tất cả các bên liên quan.
_Tài liệu kiểm định tổng thể đã được phát triển, xem xét và phê duyệt bởi tất cả các bên liên quan.
_Các tính năng ưu tiên cao, trung bình, thấp cần kiểm tra cũng được ghi lại.
_Kế hoạch kiểm tra và test case cho tất cả các tính năng được phát triển, xem xét và phê duyệt bởi tất cả các bên liên quan.
_Tất cả các kế hoạch kiểm thử và các trường hợp kiểm định được tải lên trong một kho lưu trữ trung tâm để theo dõi thực hiện kiểm tra.
_Tất cả nguồn nhân lực, thiết bị cơ sở hạ tầng và công cụ đều có sẵn để thiết lập và thực hiện các kế hoạch kiểm thử.

# Những điều cần chú ý trong quá trình kiểm thử sớm.
![](https://images.viblo.asia/dc74acaf-c7f5-48ca-b53a-c45e86f6d6aa.png)
Cách tiếp cận tổng thể về phạm vi Kiểm thử sớm

**Cách tiếp cận:**
• Chúng ta hãy lấy một ví dụ về việc phát hành một sản phẩm XYZ có 3 tính năng với độ ưu tiên cao là A, B và C, 10 tính năng có độ ưu tiên trung bình và 15 tính năng có độ ưu tiên thấp.
• Các tính năng Ưu tiên cao là những tính năng giúp đạt được doanh thu cao hoặc tuân thủ những tiêu chuẩn nhất định hoặc nhằm bắt kịp các tính năng của đối thủ cạnh tranh.
• Các tính năng ưu tiên cao thường sẽ có mã nguồn phức tạp, nhiều dòng lệnh.
• Nhiều dòng lệnh mới có thể sẽ gây ra khả năng ảnh hưởng tới những phân hệ khác.
• Thông thường, các tính năng có độ ưu tiên cao hoặc các tính năng có số lượng dòng lệnh nhiều là những đối tượng tốt nhất đê tiến hành kiểm thử sớm.
• Không nhất thiết phải có Test plan được phát triển riêng cho việc kiểm thử sớm.
• QA Lead, tester cùng với Dev lead cần thảo luận và đồng ý về phạm vi code/kiểm thử.
• Xác định các Test case có độ ưu tiên cao phù hợp và một số Test case có độ ưu tiên trung bình nếu bạn cho rằng nó là cần thiết cho Kế hoạch kiểm tra các tính năng A, B và C.
• Khi đã xác định được các tính năng và các Test case, cần sử dụng các công cụ log bug của công ty để báo cáo, theo dõi.
**Hint: Hợp tác chính là chìa khóa!** Trong giai đoạn kiểm thử sớm, cả nhóm Phát triển và QA cần phối hợp chặt chẽ để đảm bảo rằng đạt được các mục tiêu đã đặt ra với kết quả và chất lượng tốt nhất.

# Bắt đầu và kết thúc của giai đoạn kiểm thử sớm.
Điều quan trọng là cả Nhóm Phát triển và QA phải thống nhất về tất cả các phương pháp tiếp cận của toàn bộ hoạt động kiểm thử sớm bao gồm cả thời điểm bắt đầu và thời điểm kết thúc để đảm bảo cả nhóm đạt cùng tiến độ.
**Các điều kiện để bắt đầu**
• Tỷ lệ hoàn thành kiểm thử tích hợp
• Số lượng lỗi đang mở
• Kiểm thử sớm được thống nhất triển khai
**Giai đoạn hoạt động**
• Theo dõi tiến độ
• Khối lượng code được tinh giảm trong quá trình kiểm thử
• Phương pháp sửa lỗi
• Phương pháp xác minh lỗi
• Ghi nhận kết quả kiểm thử
**Điều kiện kết thúc**
• Chuyển các hoạt động sang Giai đoạn kiểm thử tiếp theo (thường là Kiểm thử tính năng).
• Giải quyết các lỗi chưa được giải quyết đã được tìm thấy trong kiểm thử sớm.
• Giải quyết các vấn đề ngăn chặn (nếu có) cho giai đoạn kiểm thử tiếp theo.
• Công bố kết quả kiểm thử sớm

# Ưu, nhược điểm của kiểm thử sớm
Mỗi hoạt động đều có những ưu điểm và nhược điểm của chúng. Ta hãy nói về những ưu và nhược điểm của phương pháp kiểm thử này.
Ưu điểm
• Phù hợp theo mô hình Thác nước.
• Giúp phát hiện sớm các lỗi nghiêm trọng trong chu kỳ kiểm thử.
• Xác định các lỗi nghiêm trọng sớm trong một chu kỳ phát hành phần mềm.
• Giúp Nhóm Phát triển ổn định mã nguồn sớm.
• Giúp giảm thiểu chi phí do sửa lỗi.
• Giúp Nhóm phát triển xác định các lỗi một cách chi tiết ngay từ đầu trong chu kỳ phát hành.
• Nhóm quản lý có thể đưa ra các quyết định kinh doanh phù hợp dựa trên khối lượng các lỗi nghiêm trọng chưa được giải quyết trong Dự án/phiên bản phát hành.
• Giúp mở rộng Test coverage hiệu quả.
• Giúp phân phối tài nguyên dùng cho việc Phát triển và kiểm thử một cách hiệu quả.
**Nhược điểm**
• Không phù hợp lý tưởng cho mô hình Agile/Scrum. Tuy nhiên, các mô hình như vậy có thể áp dụng kiểm thử sớm trong giai đoạn Sprints với một số điều chỉnh phù hợp.
# Kết luận
Khách hàng hoặc người dùng cuối mua hoặc chấp nhận sử dụng một sản phẩm dịch vụ hoặc một hệ thống hoặc một giải pháp. Việc validate một phần mềm đang chạy trên hệ thống hoặc sản phẩm đó là yêu cầu tiên quyết. Các nguyên tắc kiểm thử trọng tâm như Tại sao phải kiểm thử? Kiểm thử là gì? Kiểm thử cái gì? Kiểm thử như thế nào? phải được xác định và hiểu rõ. Tuy nhiên, có một số câu hỏi còn xuyên suốt trong tâm trí của người đọc về các khái niệm của Kiểm thử sớm.
Việc áp dụng kiểm thử sớm như một hoạt động không thể thiếu của toàn bộ quá trình kiểm thử cho bất kỳ Dự án phần mềm cụ thể nào mang lại lợi ích to lớn cho Tổ chức để cung cấp một Sản phẩm hoặc Hệ thống chất lượng.

Bài viết tham khảo từ: http://testerviet.com.vn/kiem-thu-phan-mem-bat-dau-khi-nao/