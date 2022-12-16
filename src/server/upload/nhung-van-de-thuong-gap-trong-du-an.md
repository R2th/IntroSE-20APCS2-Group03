Bài viết được tổng hợp từ kinh nghiệm cá nhân khi làm việc với khách hàng Nhật và dịch từ cuốn sách **Ship it! a practical guide to successful software projects.**

Đây là cuốn sách hướng dẫn chúng ta cách xây dựng phần mềm hiệu quả. Những điều được viết trong cuốn sách này đã được đúc kết từ kinh nghiệm thực tế của tác giả đã được thực tiễn kiểm chứng, những điều mà chúng ta không bao giờ được dạy khi còn ngồi trên ghế nhà trường và có thể được áp dụng trực tiếp ngay vào dự án thực tế.

Sách bao gồm những kinh nghiệm xương máu, qui trình khá hay như source control, CI/CD, code review... Nhưng trong phần này, mình sẽ chỉ trích ra một phần nhỏ vì thấy nó khá là đúng trong dự án thực tế. 

1. Độ thỏa mãn của khách hàng
2. Khách hàng thêm chức năng mới và change spec liên tục

## 1. Độ thỏa mãn của khách hàng
Để biết được khách hàng có thỏa mãn hay không thì điều đầu tiên là chúng ta phải nắm được khách hàng muốn đạt được gì ở project. Và nếu 2 bên hiểu nhau, khi khách hàng không phải là khách hàng nữa mà là một người hỗ trợ chúng ta thì nó sẽ là bằng chứng cho việc chúng ta đang đi đúng hướng. 

Thật đơn giản đúng không ? Tuy nhiên, việc nắm được khách hàng muốn thì bao giờ cũng là phần việc khó nhất trong một dự án :))

Trong 1 dự án, hãy không chỉ kết thúc ở việc nghe và làm theo yêu cầu, mà cố gắng giữ liên lạc liên tục với khách hàng thông qua tình trạng của dự án. Hãy làm cho khách hàng nghĩ thay vì là "project của chúng tôi" mà chính là "project của chúng ta". Cuối cùng, thì khách hàng sẽ không phải là người đánh giá chúng ta nữa, mà sẽ trở thành 1 partner. :D

Vậy thì bằng cách nào để có thể truyền tải được chính xác tình trạng của project hiện tại? 

- Nếu làm mới 1 chức năng, cách tốt nhất là thông qua bản demo. Cho dù là bản demo có chưa hoàn thiện hãy cung cấp cho khách hàng để lắng nghe feedback sớm từ họ. Đây cũng là nguyên tắc đầu tiên trong agile **Thoả mãn yêu cầu của khách hàng thông qua việc giao sản phẩm sớm và liên tục**. 

> Sản phẩm sẽ được demo cho khách hàng thường xuyên (thường là hàng tuần) để cho khách hàng thấy được sản phẩm của mình như thế nào. Nếu có chỗ nào không ổn hay cần cải tiến thì sẽ phản hồi với đội dự án ngay lập tức. Do đó sẽ giúp tránh được tình huống dở khóc dở cười sau khi hoàn thành sản phẩm như “tôi tưởng anh muốn ABC”, “tôi nghĩ mặc định anh sẽ làm XYZ”, v.v

- Nếu fix bug product, cho dù chưa tìm ra nguyên nhân thì cũng nên báo cáo ít nhất 2 tiếng 1 lần cho khách hàng những thứ chúng ta điều tra được. Cứ câm nín đến lúc không tìm ra nguyên nhân thì ăn (tat) là điều tất nhiên :D

- Đừng ngại đề xuất với khách hàng. Việc đề xuất thể hiện sự am hiểu đối với nghiệp vụ dự án và cho dù bị reject thì tôi nghĩ rằng chúng ta vẫn được đánh giá cao. Và làm cho khách hàng nghĩ rằng đây là "project của chúng ta". :D

Việc khách hàng cùng nắm được tình trạng cũng sẽ có lợi khi trễ tiến độ, khi kh cũng lý giải được nguyên nhân thì khả năng cao sẽ xin được kéo dài thời gian.
Và tất nhiên, là khi khách hàng feedback sẽ kèm theo hàng tá các yêu cầu và chỉnh sửa mới. Rõ ràng là bên phía họ sẽ trả thêm tiền phát sinh nhưng việc chiều lòng khách hàng khi mà sửa đến version 3, version 4 rồi lại quay lại version đầu thì không phải ai cũng chịu đựng được. Ok  chúng ta sẽ sang phần tiếp theo, để xem nên làm thế nào đối với những thay đổi.

## 2. Khách hàng thêm chức năng mới và change spec liên tục
![](https://images.viblo.asia/fc853797-ba01-4181-980c-54c7881f9e30.png)

Điều đầu tiên là đón nhận, vì change spec là vấn đề mà bất kỳ ai đều gặp thường xuyên trong 1 dự án phần mềm. Thay đổi là điều đương nhiên, vì khách hàng không phải lúc nào cũng xác định được chính xác đều mình muốn làm. 
Nên cứ phải xác định tư tưởng là **khách hàng là thượng đế** và **fix, fix nữa, fix mãi...**

Quản lý Change Request là yếu tố quan trọng quyết định sống còn đến thành công của dự án. Mọi thay đổi của khách hàng, chúng ta nên chủ động trao đổi để làm rõ vấn đề, tại sao lại như vậy, hơn là chỉ biết tuân thủ làm theo. Những thay đổi tốn thời gian càng cần xem xét kỹ càng, bởi không phải đơn thuần là thêm effort là thêm cost, còn những hậu hoạ không lường trước được nếu chúng ta vội vàng chiều theo khách hàng.

Có 3 điều mà cần phải thực hiện xuyên suốt dự án khi làm việc với Change Request

- Phải trả lời được 3 câu hỏi: 
    - Khi fix thì có ảnh hưởng đến scheduler hiện tại không ? 
    - Khi fix thì có ảnh hưởng đến các chức năng đã lên scheduler không? 
    - Và cuối cùng là độ ưu tiên có cao hơn các task hiện tại không? 
- Thái độ đầu tiên với change request, không phải là “ngoan ngoãn” vâng lời, mà bình tĩnh nghiên cứu, nghĩ đến những khó khăn lớn nhất có thể xảy ra để thương lượng với khách.
- Tuyệt đối không vội vàng làm luôn. Kể cả khi thấy thay đổi đó là hợp lý thì cũng cần xem xét độ ưu tiên trước khi quyết định làm. Và điều may mắn là, có khá nhiều change request, sau 1-2 tuần chúng tôi chưa làm đến, khách đã tự reject. Thử tưởng tượng chúng ta làm luôn thì sẽ tốn công như thế nào.

Fix bug và change spec là cuộc chiến trường kỳ, ngay cả với những sản phẩm đã lên product thì việc này vẫn tiếp tục.  Chúng ta chào đón việc thay đổi yêu cầu từ khách hàng, kể cả khi mà phần lớn công việc đã được làm xong đi chăng nữa. Và chúng ta nên chấp nhận thay đổi với thái đội vui vẻ thay vì kêu ca phàn nàn. Điều này giống với nguyên tắc thứ 2 trong agile :
> “Welcome changing requirements, even late in development. Agile processes harness changes to the customer’s competitive advantage.”

Khách hàng đã nhận được sản phẩm sớm, thường xuyên. Do đó mà họ có thể nhìn thấy được tiến triển cũng như những vấn đề trong dự án. Vì vậy mà những thay đổi của họ đa phần là đều có ý nghĩa. Thay vì kêu ca phàn nàn chúng ta hãy tìm hiểu, bàn luận với khách hàng để xử lý những yêu cầu thay đổi một cách trơn tru nhất. 

Việc cứ fix đi fix lại hàng tháng trời theo yêu cầu của khách hàng rất dễ làm nản chí đồng đội, và cả tôi =)) Nhưng hãy tin đi, cứ fix và sớm muộn gì cũng đến ngày release mà thôi :)
![](https://images.viblo.asia/c46e5c59-4634-4a99-8071-2e08592963d0.png)