Tất cả các hướng dẫn về JIRA trong loạt bài :
1. Giới thiệu về JIRA và công cụ theo dõi dự án 
1. Các vẫn đề được xử lý thế nào trong JIRA?
1. Tạo và làm việc với các Task trong JIRA
1. Quản lý vấn đề , Tiến trình công việc và tính năng báo cáo
1. Các khía cạnh quản trị của Công cụ kiểm tra JIRA
1. Sử dụng JIRA để quản lý các dự án Agile

# 1.Giới thiệu về JIRA và công cụ theo dõi dự án 
![](https://images.viblo.asia/803c2b5a-79f5-4ce1-b853-19d8ae9c8a72.png)

Trước khi chúng ta tìm hiểu công cụ này là gì, nó có thể được sử dụng như thế nào và nó được ai sử dụng, tôi muốn đưa ra một số quy tắc cơ bản sẽ giúp  tìm hiểu bất kỳ công cụ nào một cách dễ dàng và hiệu quả trong một khoảng thời gian ngắn.
Cá nhân tôi nghĩ rằng việc học bất kỳ công cụ nào có 2 giai đoạn với nó:

- Hiểu quy trình cơ bản
- Học các công cụ - tính năng / khả năng / ...
Lấy trường hợp của JIRA. Hãy nghĩ rằng bạn là một newbie và không biết gì về nó. Bạn đã nghe về nó từ bạn bè khác nhau, tài liệu tham khảo trực tuyến vv Bạn muốn thử nó . Làm thế nào bạn có thể làm điều đó?

Hãy tự hỏi mình những câu hỏi sau: Loại công cụ nào? Ai sử dụng nó?

JIRA là một công cụ quản lýsự cố; Quản lý sự cố là gì? 

Trước khi đi đến  chi tiết về công cụ này, hãy làm quen với quy trình quản lý sự cố.

**Tổng quan về quy trình quản lý sự cố** 

 Bất kỳ nhiệm vụ(task) nào cần được hoàn thành đều có thể được coi là một sự cố.

**10 yêu cầu quản lý sự cố hàng đầu là:**

1. Một sự cố phải được tạo ra
1. Thông tin bổ sung cần được thêm vào sự cố để làm cho mô tả toàn diện
1. Mỗi giai đoạn tiến trình của nó phải được đánh dấu và di chuyển dọc theo các bước cho đến khi hoàn thành
1. Các giai đoạn hoặc các bước mà sự cố cần phải trải qua phải được xác định
1. Nó có thể liên quan đến các sự cố khác hoặc có một số sự cố con 
1. Sự cố có thể phải được nhóm theo một số quy tắc phổ biến
1. Những người có liên quan nên biết về sự cố / thay đổi sự cố trong
1. Những người khác có thể cung cấp phản hồi của họ về một số lỗi nhất định
1. Sự cố phải có thể tìm kiếm được
1. Báo cáo phải có sẵn nếu chúng ta cần xem bất kỳ xu hướng nào
1. Cho dù đó là JIRA hay bất kỳ công cụ quản lý sự cố nào khác, họ sẽ có thể hỗ trợ 10 yêu cầu cốt lõi này và tăng cường chúng nếu có thể, đúng không? Trong loạt bài này, chúng tôi sẽ xem xét cách thức  JIRA liên quan đến danh sách trên.

**JIRA là gì ?**

Nó là một công cụ quản lý theo dõi lỗi / dự án của Atlassian, Inc., phiên bản hiện tại là 6. Đây là nền tảng độc lập.

Bạn có thể tải xuống JIRA và dùng thử miễn phí trong 30 ngày tại trang này: [Dowload JIRA](https://www.atlassian.com/software/jira/download)

**Ai sử dụng JIRA?**

Đội phát triển dự án,  Hệ thống yêu cầu , QA team, Đội quản lý dự án ,vv

**Cơ bản về JIRA**

JIRA dựa trên 3 khái niệm:

![](https://images.viblo.asia/d1b76005-a27d-463c-ba54-67c061ba4606.jpg)

1. Issue: Mọi task, lỗi, yêu cầu nâng cao; về cơ bản mọi thứ được tạo ra và theo dõi qua JIRA được coi là một vấn đề.
1. Dự án: tập hợp các issues
1. Luồng công việc: Luồng công việc đơn giản là một loạt các bước mà một vấn đề trải qua bắt đầu từ khi tạo thành đến khi hoàn thành.

Luồng công việc từ khi issue được tạo , được làm và hoàn thành là :

![](https://images.viblo.asia/d517018d-9b79-4b3a-bbc3-242aaf211c78.jpg)

**Giới thiệu giao diện JIRA**

Vì là bản dùng thử nên sau khi tải bản dùng thử, các bạn đăng ký account và đăng nhập = account đó, sau khi đăng nhập, bảng điều khiển được hiển thị cho người dùng.Trang bảng điều khiển cung cấp một ảnh chụp nhanh về mô tả của dự án bạn thuộc về; tóm tắt vấn đề và luồng hoạt động (các vấn đề được relate cho bạn, các vấn đề mà bạn đã tạo, v.v.).

![](https://images.viblo.asia/9f7975dc-671d-42e4-a83a-7f7b1ef375c2.jpg)

Khi bạn đã tạo 1 danh sách các dự án , Để xem lại các dự án đã được tạo bạn chỉ cần vào chọn tên dự án từ danh sách thả xuống “Projects”.
Một dự án là một tập hợp các issues. Mục số 6 trong danh sách phía trên - tính năng cho phép nhóm các vấn đề được hoàn thành với khái niệm này. Các dự án có các thành phần và phiên bản theo nó. Các thành phần không là gì ngoài các nhóm con trong một dự án dựa trên cơ sở chung. Ngoài ra, đối với cùng một dự án, các phiên bản khác nhau có thể được theo dõi từ JIRA.

**Mỗi dự án đều có các thuộc tính chính sau**:

1. Tên -  được chọn bởi quản trị viên.
1. Key-Nó là một định danh mà tất cả các tên issues theo dự án sẽ bắt đầu . Giá trị này được đặt trong quá trình tạo dự án và không thể sửa đổi sau đó ngay cả bởi quản trị viên.
1. Các thành phần
1. Phiên bản
 Ví dụ, lấy một ứng dụng dựa trên web; có 10 yêu cầu cần được phát triển. Sẽ có thêm 5 tính năng được thêm vào sau này. Bạn có thể chọn tạo dự án là “Thử nghiệm cho STH” phiên bản 1 và Phiên bản 2. Phiên bản 1 với 10 yêu cầu, phiên bản 2 với 5 yêu cầu mới.

Đối với phiên bản 1 nếu 5 yêu cầu thuộc về Module 1 và phần còn lại thuộc về module 2. Module 1 và module 2 có thể được tạo thành các đơn vị riêng biệt

**Ghi chú**: Tạo và quản lý dự án trong JIRA là một nhiệm vụ quản trị. Vì vậy,sẽ không bao gồm việc tạo dự án và sẽ tiếp tục thảo luận bằng cách sử dụng một dự án đã được tạo.

Lấy các chi tiết trong ví dụ trên, tôi đã tạo một dự án trong JIRA được gọi là "Kiểm tra cho STH", khóa là "TFS". Vì vậy, nếu tôi tạo ra một vấn đề mới, bộ định danh vấn đề sẽ bắt đầu với TFS và sẽ là "TSH-01". Phần này sẽ được giải thích rõ trong bài viết sau.

Sau đây là cách các chi tiết Dự án được hiển thị trong JIRA trong phần Sumary: 

![](https://images.viblo.asia/45a4569e-a021-492c-a93b-3d4d2bc3f8aa.jpg)

Xin lưu ý phần menu bên trái.

Khi tôi chọn tùy chọn "Components", nó sẽ hiển thị hai thành phần trong dự án:

![](https://images.viblo.asia/474b0618-6502-4d40-b050-641c6c57e7a4.jpg)

Khi tôi chọn tùy chọn Version, các phiên bản trong dự án được hiển thị

![](https://images.viblo.asia/189be31a-08a1-4c8a-8487-14edda06d8d9.jpg)

Chọn tùy chọn 'Roadmap', thông tin phiên bản được hiển thị cùng với các ngày đưa ra ý tưởng chung về các mốc quan trọng trong dự án.

![](https://images.viblo.asia/474b0618-6502-4d40-b050-641c6c57e7a4.jpg)

Chọn tùy chọn 'Calendar ' để xem các ngày trong giai đoạn quan trọng nào đó:


![](https://images.viblo.asia/c01feb0f-880d-477a-a1b1-7a3b277c1ba1.jpg)

Tại thời điểm này, không có issue nào được tạo cho dự án này. Nếu có, bạn sẽ có thể xem tất cả chúng bằng cách chọn "Issues" từ menu điều hướng bên trái.

Chúng ta sẽ tìm hiểu tất cả về cách làm việc với các vấn đề trong JIRA trong  bài viết sau.