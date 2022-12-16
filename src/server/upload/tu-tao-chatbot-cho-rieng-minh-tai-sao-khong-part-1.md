<div align="center">
    
# Lời mở đầu
</div>

- Xin chào mọi người, mình lại quay trở lại rồi đây. Sau những loạt bài tìm hiểu về tài liệu của các công nghệ (Vue/Laravel) có vẻ không thu hút được sự chú ý của mọi người lắm, nên lần này mình quyết định sẽ "THINK OUTSIDE THE BOX" và tìm hiểu một cái mới mẻ hơn và có thể áp dụng vào thực tế vui hơn. Đó chính là tự làm **ChatBot** bằng **Laravel** và sử dụng cho [**ChatWork**](https://www.chatwork.com) nhé! (ChatBot Facebook mình nghĩ cũng tương tự thôi)
- Và ở trong part 1 này, mình xin phép giới thiệu qua một chút về lý thuyết trước, còn phần source code cũng như là demo thì xin hẹn các bạn ở part 2 nhé!

<div align="center">
    
# Nội dung
</div>

<div align="center">
    
## ChatBot là gì
</div>

- Nếu các bạn từng chơi **Counter Strike** hay gần đây hơn là **PUBG Mobile** thì chắc hẳn đã quen với khái niệm Bot, nhưng thay vì bắn nhau với người dùng thì ChatBot sẽ làm nhiệm vụ trò chuyện cùng người dùng. Và cách mà ChatBot nói chuyện như thế nào (ngu hay khôn) thì sẽ do bản thân các bạn quyết định.
    - Ở những level cơ bản thì ChatBot sẽ hoạt động theo kiểu khi nhận được các keyword có sẵn, ChatBot sẽ trả lời theo như kịch bản đã được lên từ trước, nói nôm na là kiểu switch case ấy.
    - Còn ở trình độ cao hơn thì có thể tích hợp **AI** và **Machine Learning** vào để cho Bot tự học và phát triển thêm. Cái tên nổi tiếng nhất mà mình tin ai cũng từng nghe qua và sử dụng đó chính là [**SimSimi**](https://www.simsimi.com/) (con Bot lầy lội nhất mà mình từng thấy), ngoài ra còn có thể kể đến các trợ lí ảo rất nổi tiếng như là [**Siri (Apple)**](https://www.apple.com/siri/), [**Google Assistant**](https://play.google.com/store/apps/details?id=com.google.android.apps.googleassistant&hl=en), [**Cortana (Microsoft)**](https://support.microsoft.com/en-us/help/17214/cortana-what-is)

- Sau 2 phần của bài viết này, mình sẽ hướng dẫn các bạn tự làm ra 1 con ChatBot cho riêng mình, và tất nhiên là nó chỉ dừng lại ở mức độ đơn giản thôi :blush::blush::blush::blush::blush::blush: 
- Còn nếu muốn xây dựng hẳn 1 trợ lí ảo thì bạn có thể tham khảo bài viết [**này**](https://viblo.asia/p/build-your-own-artificial-intelligence-assistant-similar-to-google-assistant-GrLZD8BBZk0) hoặc liên hệ trực tiếp với [**tác giả**](https://viblo.asia/u/QuangPH)!

<div align="center">
    
## Tại sao lại cần đến ChatBot
</div>

- Đối với người dùng cá nhân:
    - Dùng để nhắc việc: thử tưởng tượng xem, mỗi buổi sáng thức dậy sẽ có một con Bot dự báo thời tiết để bạn chuẩn bị trang phục cho phù hợp, đến giờ họp, giờ ăn trưa Bot sẽ tự động gửi tin nhắn nhắc nhở bạn, tiện quá phải không?
    - Dùng để tra cứu thông tin: khi bạn muốn tìm kiếm các bài báo/nghe nhạc, thay vì bạn tự lên search google thì chỉ cần 1 cú pháp đơn giản, ChatBot sẽ gửi lại cho bạn danh sách kết quả cần tìm
    - Đến ngày sinh nhật thì có Bot nhắn tin chúc mừng, quan tâm cho bớt cảm giác cô đơn (FA lâu quá nên bệnh nặng lắm rồi :D)
- Đối với người kinh doanh/doanh nghiệp:
    - Trả lời khách hàng tự động: đối với người kinh doanh/doanh nghiệp thì số lượng nhân viên để chăm sóc khách hàng thì có hạn, mà số lượng người dùng thì lại quá lớn không thể đáp ứng ngay lập tức được. Còn về phía khách hàng, nếu họ phải chờ tin nhắn trả lời quá lâu thì xin chia buồn, bạn đã mất đi 1 vị khách rồi đấy. Để giải quyết vấn đề này, ChatBot sẽ giúp trả lời khách hàng gần như ngay lập tức (với những câu hỏi được lên kịch bản sẵn) và cũng giảm được sức người (con người không thể trực tổng đài 24/24 được nhưng ChatBot thì có, miễn là không bị rút nguồn :D)
    - Tự động thông báo khi hệ thống gặp sự cố: có thể tỉnh thoảng server của bạn lăn ra chết mà không rõ lí do, nhưng lúc đó lại chẳng ai theo dõi để mà bật lại server cả, thế là dịch vụ của bạn chết tầm vài tiếng. Nghe thì có vẻ đơn giản nhưng hậu quả của nó thì rất lớn nếu như có nhiều người sử dụng (cứ thử Facebook sập 1 tiếng xem kết quả thế nào)

<div align="center">
    
## Để làm được ChatBot thì cần tìm hiểu những gì
</div>

- Trước hết để làm được thì bạn cần tìm hiểu xem nguyên lí hoạt động của nó như thế nào trước đã. Về cơ bản, quá trình hoạt động của ChatBot gồm 3 bước chính:
    - **Bước 1 (Translator)**: Nhận input từ khách hàng, dịch ra giúp máy hiểu đúng công việc mình cần thực hiện.
    - **Bước 2 (Processor)**: Xử lý yêu cầu, cái này thì do bạn lập trình cho nó thôi (con Bot khôn hay ngu quyết định là ở 2 bước này đấy :D)
    - **Bước 3 (Respondent)**: Sau khi xử lý yêu cầu thì trả lại kết quả thu được cho người dùng.

![](https://images.viblo.asia/8516974e-c37e-48d8-ab4b-b0b6c8c07cbb.png)

<div align="center">
hình ảnh minh hoạ cho quá trình làm việc của chatbot    
</div>
    
- Vì là Chatbot nên chắc chắn nó sẽ phải hoạt động trên một nền tảng tin nhắn nào đó. Với thời đại hiện nay thì không quá khó để có thể kể ra những cái tên như Facebook Messenger, Line, Zalo, ... Và những ông lớn này đều cung cấp sẵn các API cũng như là platform để chúng ta có thể xây dựng và phát triển ChatBot chạy trên sản phẩm của họ. Và quan trọng nhất là hầu như chúng đều public và miễn phí. Ví dụ như: [Facebook Messenger](https://rapidapi.com/dimashirokov/api/FacebookMessenger), [Zalo](https://developers.zalo.me/docs/api/official-account-api/phu-luc/lam-the-nao-de-tao-chatbot-tra-loi-tu-dong-voi-zalo-api-post-1698), ...

- Ngôn ngữ lập trình: về cơ bản thì ngôn ngữ lập trình chỉ là công cụ để thực hiện thôi. Các ngôn ngữ bây giờ đều có các Framework cũng như các **SDK (Software Development Kit)** để phát triển ChatBot rồi. Chỉ cần bạn quen với ngôn ngữ nào thì sử dụng nó sẽ nhanh hơn và đỡ mất công tìm hiểu hơn thôi. 
 
=> Mình chọn LARAVEL. CÒN BẠN THÌ SAO?

<div align="center">
    
# Lời kết
</div>

Qua part 1 này, hi vọng các bạn đã nắm được cách thức hoạt động cơ bản của ChatBot cũng như là ứng dụng thực tế của nó. Hãy cùng chờ đón part 2 nhé, mình sẽ lên bài sớm thôi!

<div align="center">
    
# Tài liệu tham khảo
</div>

- https://viblo.asia/tags/chatbot
- https://viblo.asia/p/tat-ca-nhung-gi-ban-can-biet-ve-chatbot-Az45bnNg5xY
- https://www.google.com/