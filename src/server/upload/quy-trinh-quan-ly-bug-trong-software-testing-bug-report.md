**Bug là gì?**

Bug là hậu quả/kết quả của lỗi mã hóa (coding fault) 

**Defect là gì?**

Defect là một biến thể hoặc sai lệch so với yêu cầu nghiệp vụ ban đầu.

Hai thuật ngữ này có sự khác nhau rất nhỏ, Trong ngành, cả hai đều là lỗi cần được sửa chữa.

Khi một người thử nghiệm thực hiện các trường hợp thử nghiệm, có thể tình cờ gặp kết quả thử nghiệm trái ngược với kết quả mong đợi. Biến thể này trong kết quả kiểm tra được gọi là Lỗi phần mềm (Software Defect) . Những khiếm khuyết hoặc biến thể này được gọi bằng các tên khác nhau trong một tổ chức khác nhau như issues, problem, bug or incidents.

Trong hướng dẫn này, chúng ta sẽ nhắc đến: 

* Bug Report (Báo cái lỗi) 
* Defect Management Process (Quy trình quản lý lỗi)
    * Discovery (Phát hiện)
    * Categorization (Phân loại)
    * Resolution (Giải pháp)
    * Verification (Xác minh)
    * Closure (Đóng)
    * Reporting (Báo cáo)
* Important Defect Metrics (Số liệu defect quan trọng)

## 1. Bug report (Báo cái lỗi) 

Trong khi báo cáo lỗi cho developer. Báo cáo lỗi của bạn phải chứa thông tin sau:

* Defect_ID - ID nhận dạng duy nhất cho lỗi.
* Defect Description - Mô tả chi tiết về lỗi bao gồm thông tin về module trong đó lỗi được tìm thấy.
* Version - Phiên bản của ứng dụng trong đó lỗi được tìm thấy.
* Steps - Các bước chi tiết cùng với ảnh chụp màn hình mà developer có thể tái hiện các lỗi
* Date Raised - Ngày mà lỗi được raised lên
* Reference-  Nơi bạn cung cấp tài liệu tham khảo như thế nào. yêu cầu, thiết kế, kiến trúc hoặc thậm chí có thể là ảnh chụp màn hình của lỗi để giúp hiểu lỗi.
* Detected By - Name/ID của Tester, người đã raised lên lỗi
* Status - Status của lỗi
* Fixed by - Name/ID của developer, người đã sửa lỗi
* Date Closed - Ngày mà lỗi được đóng.
* Severity - Mô tả tác động của lỗi trên ứng dụng
* Priority - Mức độ ưu tiên, mức độ nghiêm trọng có thể cao / trung bình / thấp dựa trên mức độ khẩn cấp tác động mà tại đó lỗi phải được khắc phục tương ứng.

## 2. Defect Management Process (Quy trình quản lý lỗi)

Bạn có thể làm theo các bước dưới đây để quản lý lỗi.

![](https://images.viblo.asia/d34a904d-df0c-46e4-8098-414d90c0f83b.png)

### Discovery (phát hiện)
Trong giai đoạn discovery, các nhóm dự án phải cover được càng nhiều lỗi càng tốt, trước khi người dùng cuối có thể phát hiện ra nó. Một lỗi được cho là được phát hiện và thay đổi thành trạng thái "accepted" khi nó được các developer thừa nhận và chấp nhận.

![](https://images.viblo.asia/11d9d599-fbb7-4219-aa94-abc58d7d6060.png)

### Categorization (Phân loại)
Phân loại lỗi giúp các developer ưu tiên các nhiệm vụ của họ. Nếu thực hiện được việc phân loại lỗi tốt, sẽ giúp các developer ưu tiên sửa được những lỗi quan trọng trước.

![](https://images.viblo.asia/ce1bc246-6fc0-4a7d-bdac-0844678102c5.png)

Defect thường được phân loại bởi Test manager

### Resolution (Giải pháp)
Khi các lỗi được chấp nhận và phân loại, bạn có thể làm theo các bước sau để khắc phục lỗi.

![](https://images.viblo.asia/bfa5b48b-6945-416d-a9c2-d6e0e4d5367a.jpg)

**Assignment:** Được chỉ định cho developer hoặc technician khác để khắc phục và thay đổi trạng thái thành Responding.

**Schedule fixing:** Phía developer chịu trách nhiệm trong giai đoạn này. Họ sẽ tạo ra một lịch trình để sửa chữa những lỗi này, phụ thuộc vào mức độ ưu tiên của lỗi.

**Fix the defect:** Trong khi developer đang sửa các lỗi, Test Manager theo dõi quá trình sửa lỗi so với lịch trình trên.

**Report the resolution:** Nhận báo cáo về độ phân giải từ developer khi lỗi được khắc phục.

### Verification (Xác minh)
Sau khi developer sửa lỗi và báo cáo lỗi, tester xác minh rằng các lỗi thực sự được sửa hay không.

### Closure (Đóng)
Khi một lỗi đã được sửa và xác minh, lỗi đó được thay đổi trạng thái là **closed**. Nếu không, hãy gửi thông báo cho developer để kiểm tra lại lỗi.

### Reporting (Báo cáo) 
Manager có quyền biết tình trạng của lỗi. Họ phải hiểu quy trình quản lý lỗi để hỗ trợ bạn trong dự án này. Do đó, bạn phải báo cáo cho họ tình hình lỗi hiện tại để nhận phản hồi từ họ.

## 3. Important Defect Metrics (Số liệu defect quan trọng)
Làm thế nào để đo lường và đánh giá chất lượng thực hiện thử nghiệm?

Đây là một câu hỏi mà tất cả Test manager muốn biết. Có 2 tham số mà bạn có thể xem xét như sau

![](https://images.viblo.asia/d2d060a5-7863-47d9-9047-6e4ddb0a4085.png)

Giá trị nhỏ hơn của DRR và DLR là chất lượng thực hiện kiểm tra tốt hơn. Phạm vi tỷ lệ được chấp nhận là gì? Phạm vi này có thể được xác định và chấp nhận cơ sở trong mục tiêu dự án hoặc bạn có thể tham khảo các số liệu của các dự án tương tự.

Nếu chất lượng thực hiện kiểm tra là thấp. Bạn nên tìm biện pháp đối phó để giảm các tỷ lệ này như:
* Cải thiện kỹ năng kiểm tra của thành viên.
* Dành nhiều thời gian hơn để thực hiện kiểm tra, đặc biệt là để xem xét kết quả thực hiện kiểm tra.
 
 Tài liệu tham khảo: https://www.guru99.com/defect-management-process.html