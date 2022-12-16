Lại xin chào các bạn.

Sau bài viết về Pair Programming này:
https://viblo.asia/p/ket-noi-voi-nhau-bang-pair-programming-gGJ59r9aKX2

Thì mình nhận thấy cần giới thiệu và đưa ý kiến về eXtreme Programming 1 cách bài bản. Vì vậy, bài số 2 của MayFest lần này của mình sẽ là giới thiệu và ý kiến cá nhân về eXtreme Programming.

![](https://images.viblo.asia/d53e428f-5608-409f-96e1-2ac02c89fa8e.gif)

# Khái niệm
**eXtreme Programming (XP)** là 1 framework phần mềm có mục tiêu hướng đến các phần mềm chất lượng cao nhất và chất lượng kỹ sư tốt nhất cho 1 dự án/sản phẩm. Và đây cũng là mô hình phát triển cụ thể nhất hướng tới kỹ thuật và các áp dụng kỹ thuật ở trong Agile(Scrum thì hướng tới giao tiếp con người và quản lý hơn, Kanban thì đang dừng ở mức 1 kỹ thuật hơn là 1 cấp mô hình phát triển).

Dự án XP đầu tiên được bắt đầu từ ngày 6 tháng 3 năm 1996. Có thể lấy đây là ngày ra đời của XP.
# Các giá trị của XP
http://www.extremeprogramming.org/values.html

Theo nguồn trên, XP đề cao 5 giá trị sau:
- **Simplicity**: Chỉ làm những gì cần làm, không hơn không kém. Đây là cách để tối ưu hóa giải pháp trong 1 budget nhất định. Chia nhỏ công việc ra thành các bước nhỏ để thực hiện từng bước và tối thiểu hóa các lỗi phát sinh. Tạo ra 1 sản phẩm hoạt động được, có ích và duy trì bảo trì nó ở 1 mức chi phí hợp lý.
- **Communication**: Ai cũng là thành viên trong team và chúng ta sẽ giao tiếp hàng ngày với nhau. Làm việc với nhau từ lúc có yêu cầu cho tới code thành phẩm. Cùng nhau tạo ra giải pháp tốt nhất cho vấn đề đang gặp phải bằng năng lực của tất cả thành viên của team.
- **Feedback**: Tạo ra và chuyển cho mọi người các sản phẩm hoạt động được. Đưa ra sản phẩm sớm, lắng nghe ý kiến và thay đổi nếu cần. Luôn hướng mọi mục tiêu tới dự án và làm cho các quy trình trở nên phù hợp với dự án, không vòng vo.
- **Respect**: Team member sẽ thể hiện và nhận lại sự tôn trọng lẫn nhau. Developer sẽ thể hiện sự tôn trọng với khách hàng. Người quản lý sẽ tôn trọng team và cho phép họ tự quản và tự quyền nhằm hướng tới chất lượng công việc.
- **Courage**: Nói ra thực tế về tiến độ cũng như dự kiến. Không làm văn bản trình bày dài dòng lý do thất bại vì mục tiêu là thành công. Không nên lo sợ gì và thích ứng với thay đổi khi có thay đổi.

Tất cả các giá trị trên đều là các giá trị xuất phát từ Agile nên hiểu cũng không có gì khó lắm. Cái cần chú ý ở đây là cách mà cách giá trị ấy được diễn giải theo khái niệm XP. Ở đây là đẩy mọi giá trị lên mức cao nhất có thể.
# Rules
## Lập kế hoạch
* Viết ra user stories.
* Từ kế hoạch release tạo ra lịch release.
* Tạo ra các release nhỏ thường xuyên.
* Chia project thành các iteration.
* Lập kế hoạch cho iteration trước khi bắt đầu mỗi iteration.
## Quản lí
* Tạo không gian làm việc mở cho team.
* Đặt một nhịp độ làm việc dễ chịu.
* Tổ chức stand up meeting hàng ngày.
* Thiết lập Velocity cho Project.
* Luân chuyển công việc thường xuyên.
* Đảm bảo mọi người tuân thủ theo XP.
## Thiết kế
* Chú trọng sự đơn giản.
* Sử dụng Class, Responsibilities, and Collaboration (CRC) Cards.
* Tạo ra những giải pháp để giảm thiểu rủi ro.
* Những chức năng không cần thiết thì không làm.
* Refactor bất cứ nơi nào và khi nào có thể.
## Coding
* Luôn có sự giao tiếp với khách hàng.
* Việc viết code phải có các quy chuẩn.
* Viết unit test trước.
* Tất cả code đều cần được pair-programming.
* Chỉ duy nhất một pair thực hiện tích hợp tại 1 thời điểm.
* Tích hợp thường xuyên.
* Dùng riêng 1 máy tính cho việc tích hợp.
* Cho phép mọi người được đóng góp vào mọi phần của dự án.
## Testing
* Tất cả code phải có unit test.
* Code phải pass qua tất cả unit test trước khi được release.
* Khi một bug được phát hiện phải có test cho tính năng bị bug ấy.
* Acceptance test cần được chạy thường xuyên và kết quả phải luôn được trả lại.

# Ý kiến cá nhân và đánh giá
Đây có thể nói là Framework chú trọng vào kĩ thuật phát triển và quy trình, công cụ nhất. Từ định nghĩa này, 1 số kỹ thuật và công cụ ra đời như Pair Programming, CRC Cards,... Rất dài và nhiều cái cần chú ý. Có thể nói so với tôn chỉ của Agile thì guide của XP khá là nhiều document và cứng, nếu không muốn nói là cứng nhất trong các framework tư tưởng Agile. Tất cả quy trình, quá trình và kỹ thuật lập trình, phát triển phần mềm được đẩy lên mức cao nhất tới độ "cực đoan"(extreme). Vậy là đủ hiểu tại sao phương pháp này có tên eXtreme Programming.

Về tính thực tế, một số rule của XP là hơi quá lý tưởng như việc "Luôn có sự giao tiếp với khách hàng" nguyên văn là "The customer is always available". Chúng ta không thể bắt khách hàng kè kè bên cạnh cả ngày hay yêu cầu lúc nào cần liên lạc thì họ phải liên lạc lại luôn được. Hay là việc Pair Programming chẳng hạn?

Về việc công sức, thời gian và hiệu quả, hiệu quả cao nhưng thời gian bỏ ra cũng rất nhiều và công sức cũng bị đẩy lên mức cao độ mệt mỏi. 

Thế nên với mình, áp dụng Agile cũng phải linh hoạt(mà thực tế theo đúng chuẩn Scrum cũng chưa có nhiều người, team hay cty là áp dụng Scrum đúng). Và với 1 framework nặng như XP, việc áp dụng vào thực tế cũng cần phải linh hoạt để cân bằng giữ hiệu quả công việc, công sức cũng như tính thực tế

Bài viết tham khảo ở http://www.extremeprogramming.org/