# 1. Tổng quan về Detailed Design 
a. Detailed design là gì?
Detailed design là một trong những level của design phần mềm. Trong quá trình này, người ta sẽ đi thiết kế chi tiết các thành phần và cho output là một bản thiết kế có thể dễ dàng coding.
Các thành phần chi tiết đó có thể là
- Phân tích các thành phần hệ thống thành các component của phần mềm
- Phân bổ chức năng cho các module
- Giao diện người dùng
- Trạng thái, thay đổi trạng thái
- Data và tương tác người dùng
- Thuật toán, cấu trúc dữ liệu
- Phạm vi các module
# 2. Creating Detailed Design
Không giống với achitecture, nơi tập hợp các yêu cầu tổng quan một cách rõ ràng. Detailed design lại đi sâu vào phân tích, thiết kế các module, component. Sau khi hoàn thành 1 module hoặc component, coder có thể tiến hành code luôn.
Khi tiến hành thiết kế chi tiết các component đó, chung ta phải chú ý các thành phần quan trọng:
- Interface Design - Internal & External 
- Graphical User Interface (GUI) Design (Chapter 9)
- Internal Component Design (Chapter 7)
- Data Design ~ Database ; data dictionary
## 1. Interface Design
Theo như các quy tắc đã được đề ra thì. Interface deisign sẽ được tập trung vào
- Giao diện bên trong các component
- Giao diện được sử dụng bên ngoài giữa các thành phần
Ví dụ:
![](https://images.viblo.asia/a018ad92-b5e5-42d8-b63e-454ac253a950.png)

# 3. Đánh giá thiết kế chi tiết
Các thiết kế logic chỉ được đánh giá thông qua các kỹ thuật tĩnh. Vì tới bước này chúng ta chưa có phần mềm cụ thể. 
Khi tiến hành đánh giá, chúng ta có Technical review, tuân theo các nguyên tắc sau:
- Gửi thông báo yêu cầu đánh giá có đủ thời gian cho người khác review
- Luôn phải có chuyên gia trong quá trình đánh giá ở team review
- Luôn có 1 QA trong quá trình review
- Tập trung vào các khía cạnh quan trọng, trả lời câu hỏi: 
    Làm sao để thiết kế này có thể đáp ứng được chức năng hoặc phi chức năng
- Có tài liệu quản lí progress chuẩn
# 4. Documenting Detailed Design
Tài liệu về Detailed Design cũng được lưu lại trong tài liệu phát triển phần mềm (SDD). Các bên dev, QA, BrSE, ... đều có quyền sử dụng.
Có một số chuẩn hình thức về tài liệu như là:
- Interface Control Document 
- Version Control Document 
# 5. Quản lý thực hiện
- Giám sát, kiểm soát tính đồng bộ của Detailed Design
- Đánh giá mức độ đồng bộ của thiết kế? Có dễ code hay không? Nếu mức độ hổng lớn hoặc ko thể code có thể dẫn đến 1 dự án thất bại
- Trong giai đoạn maintain cần chú ý đặc biệt. Nhất là các new member mới gia nhập dự án
- Các quy trình thực hiện phải đảm bảo được tính đồng bộ cao.
# 6. Tổng kết
Trên đây là các nguyên tắc Detailed Design mà mình đã tổng hợp được. Nó bao gồm 2 ý chính:
- Detailed Design là gì
- Các Key Task trong detailed Design

Hi vọng bài viết có thể giúp ích các bạn ít nhiều. Cảm ơn các bạn đã đọc !

Nguồn: https://people.utm.my/noraini/files/2016/09/Chapter-5-Detailed-Design-Principles.pdf