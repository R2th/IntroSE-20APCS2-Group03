Ở phần 1 thì chúng ta đã đưa ra được những requirement tổng quan cho hệ thống **"Theo dõi con đi học"**, từ phần này hãy cùng đi sâu hơn vào phần chức năng của từng người dùng cuối có liên quan đến hệ thống này.

Để đưa ra 1 lúc chức năng cụ thể của cả quản lý nhà trường, phụ huynh và bảo mẫu trong 1 bài viết có lẽ hơi khó khăn, vậy nên mình sẽ tách nhỏ ra nhiều phần, phần 2 này sẽ phân tích kỹ hơn về luồng nghiệp vụ các chức năng của **bảo mẫu** nhé.

**Requirement của bảo mẫu**
1. Có thể xem được danh sách các học sinh đi xe (xem được học sinh nào nghỉ)
2. Có thể cho học sinh điểm danh bằng cách quẹt thẻ khi lên, xuống xe
3. Nhận cảnh báo khi thiếu học sinh quẹt thẻ
4. Xem được thông tin của học sinh, phụ huynh học sinh

# 1. Usecase & đặc tả
Về vụ usecase và đặc tả usecase này trên mạng có khá nhiều về lý thuyết rồi nên mình không nhắc lại nữa, mọi người hãy google nhé!

Giờ ta hãy bắt tay vào làm luôn cho user bảo mẫu nào.

## Usecase
![](https://images.viblo.asia/7ee19d1e-ea80-42b2-afe2-03d68a61b53b.png)
Theo suy nghĩ của mình chắc nó cũng đơn giản như này thôi, mọi người ai có bổ sung gì thì comment bên dưới nhé.

## Đặc tả usecase
Để mà viết đặc tả usecase đầy đủ thì sẽ rất rất dài! Vậy nên mình sẽ chọn phần **đăng nhập** - phần phổ biến và khá dễ hiểu để mọi người tiện theo dõi. Các bạn hãy thử viết đặc tả usecase của các usecase khác và comment bên dưới để chúng ta cùng trao đổi nhé.

![](https://images.viblo.asia/9385c2f4-2943-4936-98fe-edcdd3a13ffe.PNG)
*Mình định tạo bảng luôn trên viblo nhưng mà khó format quá nên mọi người chịu khó nhìn ảnh vậy :sweat_smile:*
# 2. Luồng sử dụng của bảo mẫu
*(Ở bài này mình chuyển sang sử dụng flowchart cho đa dạng các loại biểu đồ nhé, thường thì chúng ta sẽ dùng 1 trong 2 loại flowchart hoặc bpmn cho 1 dự án thôi)*
![](https://images.viblo.asia/0bd4c84b-abf4-47e0-94bc-497bc00c2532.png)

*Phù, tưởng ngắn mà dài phết!*

# 3. Mockup cho bảo mẫu
Sau khi có đặc tả usecase cũng như luồng nghiệp vụ rồi thì bước tiếp theo chúng ta sẽ làm 1 bản mockup để chính bản thân mình hình dung được hệ thống sẽ thế nào, sau đó hoàn thiện dần để khi code sẽ dễ dàng hơn là vừa code vừa tưởng tượng cái màn hình nó chạy thế nào, có đúng hay chưa.

Do mockup mà up video hay gif lên đây nhìn không được trực quan lắm, vậy nên mình sẽ sử dụng basimiq-wireframe - 1 trang cho phép chạy demo các wireframe trực tiếp trên web luôn. 

Mọi người hãy click vào [link này](https://drive.google.com/file/d/14Zh_hSoHTuHSkGuM5eW0icvybYKaoxlv/view?usp=sharing), chọn ứng dụng bên thứ 3 (basimiq wireframe) để xem qua bản mockup của mình nhé, đây là bản chưa hoàn thiện nên còn nhiều thiếu sót, mọi người hãy xem tham khảo và tự đưa ra bản vẽ của mình nha.

# 4. Tạm kết
Trên đây mình đã đưa ra những phân tích cho các tính năng của bảo mẫu, ở các phần sau mình sẽ đi dần dần để xây dựng tính năng cho từng loại end user trên hệ thống nhé.