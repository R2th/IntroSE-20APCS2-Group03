Trong [Chương 6](https://viblo.asia/p/chapter-6-thiet-ke-api-RQqKL2Lzl7z), chúng ta đã học về thiết kế API bằng cách tự xây dựng và khám phá một vài ví dụ trong thế giới thực.  Chúng ta đã sẵn sàng để xem làm thế nào API có thể hoạt động. Trong chương này, chúng ta sẽ tìm hiểu bốn cách để giao tiếp thời gian thực thông qua API.

## Tích hợp

Để bắt đầu cuộc thảo luận của chúng ta, hãy nhớ lại tại sao API hữu ích. Quay lại [Chương 1](https://viblo.asia/p/chapter-1-gioi-thieu-ve-apis-m68Z0RmA5kG), chúng ta đã nói rằng các API giúp dễ dàng chia sẻ dữ liệu giữa hai hệ thống (trang web, máy tính để bàn, điện thoại thông minh). Chia sẻ đơn giản cho phép chúng ta liên kết các hệ thống với nhau để tạo thành một sự tích hợp. Mọi người thích tích hợp vì chúng làm cho cuộc sống dễ dàng hơn. Với sự tích hợp, bạn có thể làm một cái gì đó trong một hệ thống và hệ thống khác sẽ tự động cập nhật.

Chúng ta sẽ chia tích hợp thành hai loại chính. Loại đầu tiên gọi là "điều khiển máy khách" (Client-Driven), nơi một người dùng tương tác tại client và muốn dữ liệu của server cập nhật. Loại còn lại được gọi là "điều khiển máy chủ" (Server-Driven), trong đó một người làm điều gì đó trên máy chủ và cần client nhận thức được sự thay đổi.

Lý do phân chia tích hợp theo cách này xuất phát từ một thực tế đơn giản: client là thứ duy nhất có thể bắt đầu giao tiếp. Hãy nhớ rằng, client thực hiện các yêu cầu và máy chủ chỉ đáp ứng. Một hậu quả của hạn chế này là các thay đổi rất dễ gửi từ máy khách đến máy chủ, nhưng khó thực hiện theo hướng ngược lại.

## Tích hợp theo Client-Driven

Để chứng minh tại sao việc tích hợp theo hướng máy khách lại dễ dàng, hãy chuyển sang cửa hàng pizza đáng tin cậy của chúng ta và API của nó để đặt pizza. Giả sử chúng ta phát hành một ứng dụng điện thoại thông minh sử dụng API. Trong trường hợp này, API tiệm bánh pizza là máy chủ và ứng dụng điện thoại thông minh là máy khách. Một khách hàng sử dụng ứng dụng để chọn một chiếc bánh pizza và sau đó nhấn nút để đặt hàng. Ngay sau khi nhấn nút, ứng dụng biết rằng nó cần phải thực hiện một yêu cầu đối với API tiệm bánh pizza.

![](https://images.viblo.asia/1abc09bd-1d91-4149-8301-fa32c9a856d0.jpeg)

Rõ ràng hơn, khi một người tương tác với client, client biết chính xác khi nào dữ liệu thay đổi, do đó, nó có thể gọi API ngay lập tức để cho máy chủ biết. Không có độ trễ (do đó là thời gian thực) và quá trình này hiệu quả vì chỉ có một yêu cầu được thực hiện cho mỗi hành động được thực hiện bởi một người.

## Tích hợp theo Server-Driven

Sau khi đặt bánh pizza, khách hàng có thể muốn biết khi nào pizza đã sẵn sàng. Làm cách nào để chúng ta sử dụng API để cung cấp cho họ các bản cập nhật? Khách hàng không có gì để làm với pizza. Họ đang chờ đợi trên ứng dụng cửa hàng pizza khi nào trạng thái đặt hàng được cập nhật. Nói cách khác, dữ liệu đang thay đổi trên máy chủ và máy khách cần biết về nó. Tuy nhiên, nếu máy chủ không thể thực hiện yêu cầu, chúng ta dường như bị mắc kẹt không thay đổi được gì!

Để giải quyết vấn đề này, chúng ta sử dụng loại tích hợp thứ hai. Có một số giải pháp mà các nhà phát triển phần mềm sử dụng để giải quyết giới hạn request chỉ dành cho client. Chúng ta hãy xem xét từng cái.

## Polling

Khi máy khách là người duy nhất có thể đưa ra yêu cầu, giải pháp đơn giản nhất để cập nhật thông tin với máy chủ là khách hàng chỉ cần yêu cầu máy chủ cập nhật. Điều này có thể được thực hiện bằng cách liên tục yêu cầu cùng một tài nguyên, kỹ thuật này được gọi là Polling.

Với tiệm bánh pizza của chúng tôi, việc polling cho tình trạng của một đơn đặt hàng có thể trông giống như sau.

![](https://images.zapier.com/storage/photos/1f28a71e93ad44b5a37d117fcf516da4.png?format=jpg)
![](https://images.zapier.com/storage/photos/740527cd546425818f8abac7af80cc7b.png?format=jpg)
![](https://images.zapier.com/storage/photos/44eeba7c09eacd43d196e509e7b4438d.png?format=jpg)

Trong phương pháp này, khách hàng thực hiện các yêu cầu (polls) càng thường xuyên, client càng gần trở thành giao tiếp thời gian thực hơn. Nếu client yêu cầu ý kiến mỗi giờ thì thực sự tệ, có thể có một sự chậm trễ thời gian khi một thay đổi xảy ra trên máy chủ.  Thay vào đó máy khách và máy chủ sẽ giữ đồng bộ ổn khi poll mỗi phút.

Tất nhiên, có một lỗ hổng lớn với giải pháp này là nó không hiệu quả khủng khiếp. Hầu hết các yêu cầu khách hàng đưa ra đều bị lãng phí vì không có gì thay đổi. Tồi tệ hơn, để có được cập nhật sớm hơn, khoảng thời gian bỏ phiếu phải được rút ngắn, khiến khách hàng thực hiện nhiều yêu cầu hơn và thậm chí còn kém hiệu quả hơn. Giải pháp này không có quy mô tốt.

## Long Polling

Nếu các yêu cầu là miễn phí, thì không ai quan tâm đến hiệu quả và mọi người chỉ có thể sử dụng poll. Thật không may, yêu cầu xử lý đi kèm với một chi phí. Để một API xử lý nhiều yêu cầu hơn, nó cần sử dụng nhiều máy chủ hơn, tốn nhiều tiền hơn. Quy mô tình huống cồng kềnh này lên đến tỷ lệ cỡ Google hoặc Facebook và bạn đang phải trả nhiều tiền cho sự không hiệu quả. Do đó, rất nhiều nỗ lực đã được đưa vào để tối ưu hóa cách khách hàng có thể nhận được cập nhật từ máy chủ.

Một tối ưu hóa, xây dựng từ poll, được gọi là long poll. Long poll sử dụng cùng một ý tưởng khi client liên tục gửi yêu cầu lên máy chủ để cập nhật, nhưng với một yêu cầu: máy chủ không phản hồi ngay lập tức. Thay vào đó, máy chủ đợi cho đến khi có gì đó thay đổi, sau đó phản hồi với bản cập nhật.

Hãy xem lại ví dụ bỏ phiếu từ phía trên, nhưng lần này với một máy chủ sử dụng thủ thuật bỏ phiếu dài.
![](https://images.zapier.com/storage/photos/d8e0247c25b5cb145a7d8ed8dd57b1b9.png?format=jpg)
![](https://images.zapier.com/storage/photos/2f19ff605c41b3701ba3ca58f8f22b97.png?format=jpg)
![](https://images.zapier.com/storage/photos/a0a952c22fdef5ed3a8cd7767d28d10a.png?format=jpg)
![](https://images.zapier.com/storage/photos/494a56f22a47f5328d182e6115acf09e.png?format=jpg)

Kỹ thuật này khá thông minh. Nó tuân theo quy tắc của client đưa ra yêu cầu ban đầu trong khi tận dụng thực tế là không có quy tắc nào chống lại việc máy chủ chậm phản hồi. Miễn là cả máy khách và máy chủ đều đồng ý rằng máy chủ sẽ giữ yêu cầu của máy khách và máy khách có thể giữ kết nối của nó với máy chủ mở, nó sẽ hoạt động.

Tài nguyên như long polls cũng có một số nhược điểm. Chúng ta sẽ bỏ qua các chi tiết kỹ thuật, nhưng có những lo ngại như máy chủ có thể giữ bao nhiêu yêu cầu tại một thời điểm hoặc cách phục hồi nếu máy khách hoặc máy chủ mất kết nối. Hiện tại, chúng ta sẽ nói rằng đối với một số tình huống, không có hình thức poll nào là đủ.

## Webhooks

Với việc poll loại trừ, một số nhà phát triển phần mềm sáng tạo đã nghĩ, "nếu tất cả rắc rối của chúng tôi là do khách hàng là người duy nhất đưa ra yêu cầu, tại sao không loại bỏ quy tắc đó?" Vì vậy, họ đã làm ra webhooks, một kỹ thuật trong đó máy khách vừa thực hiện các yêu cầu vừa lắng nghe chúng, cho phép máy chủ dễ dàng đẩy các bản cập nhật lên nó.

Nếu điều này nghe có vẻ gian lận vì bây giờ chúng ta có máy chủ đưa ra yêu cầu cho khách hàng, đừng lo lắng, bạn đã không bị nói dối. Điều làm cho webhooks hoạt động là máy khách cũng trở thành một máy chủ! Từ góc độ kỹ thuật, đôi khi rất dễ dàng mở rộng chức năng của khách hàng để lắng nghe yêu cầu, cho phép liên lạc hai chiều.

Hãy nhìn vào những điều cơ bản của webhooks. Ở dạng đơn giản nhất, webhooks yêu cầu khách hàng cung cấp URL gọi lại nơi có thể nhận các sự kiện và máy chủ phải có một nơi để một người nhập URL gọi lại đó. Sau đó, bất cứ khi nào có gì đó thay đổi trên máy chủ, máy chủ có thể gửi yêu cầu tới URL gọi lại của khách hàng để cho khách hàng biết về bản cập nhật.

Đối với tiệm bánh pizza của chúng ta, dòng chảy có thể mô tả như sau.

![](https://images.zapier.com/storage/photos/ad0fa6a7d13f8c23bd846ca18ef35875.png?format=jpg)
![](https://images.zapier.com/storage/photos/72cf549474cdefe8c145f4ac2eec62c4.png?format=jpg)
![](https://images.zapier.com/storage/photos/58f3a1b0b6b58518bc8baf707915b0d1.png?format=jpg)
![](https://images.zapier.com/storage/photos/81a43f7972c757f48c8cd0c05471c4c0.png?format=jpg)
![](https://images.zapier.com/storage/photos/ee381f84a04bd987cfe58ec6ec6fd016.png?format=jpg)
![](https://images.zapier.com/storage/photos/a6741368b2499bab1b771d60db860bc8.png?format=jpg)

Giải pháp này là tuyệt vời. Những thay đổi xảy ra trên máy chủ được gửi ngay lập tức đến máy khách, vì vậy bạn có giao tiếp thời gian thực. Ngoài ra, webhooks là hiệu quả vì chỉ có một yêu cầu cho mỗi bản cập nhật.

## Subscription Webhooks

Dựa trên ý tưởng về webhooks, đã có nhiều giải pháp nhằm mục đích làm cho quá trình thiết lập trở nên năng động và không yêu cầu một người nhập thủ công URL gọi lại trên máy chủ. Bạn có thể nghe thấy những cái tên như  [HTTP Subscriptions Specification](https://github.com/progrium/http-subscriptions/blob/master/SPEC.md?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier), Restful Webhooks,[ REST Hooks](http://resthooks.org/docs/?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier), and [PubSubHubbub](http://code.google.com/p/pubsubhubbub/?utm_source=zapier.com&utm_medium=referral&utm_campaign=zapier). Điều mà tất cả các giải pháp này cố gắng thực hiện là xác định quy trình đăng ký, nơi khách hàng có thể cho máy chủ biết sự kiện nào họ quan tâm và URL gọi lại để gửi cập nhật.

Mỗi giải pháp có một chút khác nhau về vấn đề, nhưng luồng xử lý chung như sau.

![](https://images.zapier.com/storage/photos/d0c0f567a627085c738c7e078e9334b4.png?format=jpg)
![](https://images.zapier.com/storage/photos/57d69c6834f0e3fb7aefbc3ec883adab.png?format=jpg)
![](https://images.zapier.com/storage/photos/b21708eecaf7564f1190dcb98e0df4fd.png?format=jpg)
![](https://images.zapier.com/storage/photos/06ed43cfcac7a72cd2c661d76146ea32.png?format=jpg)

Webhooks dựa trên đăng ký giữ rất nhiều hứa hẹn. Chúng hiệu quả, thời gian thực và dễ dàng cho mọi người sử dụng. Tương tự như việc áp dụng bùng nổ của REST, một làn sóng đang nổi lên sau phong trào và nó trở nên phổ biến hơn đối với các API để hỗ trợ một số dạng webhooks.

Tuy nhiên, có khả năng sẽ có một nơi để poll và long poll cho tương lai gần. Không phải tất cả client cũng có thể hoạt động như máy chủ. Điện thoại thông minh là một ví dụ tuyệt vời trong đó các hạn chế kỹ thuật loại trừ, webhooks là một khả năng. Khi công nghệ phát triển, những ý tưởng mới sẽ xuất hiện để làm thế nào để giao tiếp thời gian thực dễ dàng hơn giữa tất cả các loại thiết bị.

## Chapter 7 Recap

Trong chương này, chúng tôi đã nhóm các tích hợp thành hai loại lớn, hướng đến máy khách và hướng máy chủ. Chúng ta đã thấy cách API có thể được sử dụng để cung cấp các cập nhật theo thời gian thực giữa hai hệ thống, cũng như một số thách thức.
* Polling: Liên tục yêu cầu tài nguyên trong một khoảng thời gian ngắn
* Long Polling: Bỏ phiếu, nhưng với một phản hồi chậm trễ hơn nhằm nâng cao hiệu quả
* Webhooks: Khi máy khách cung cấp cho máy chủ một URL gọi lại, do đó máy chủ có thể cập nhật thay đổi trong thời gian thực
* Subscription Webhooks: Tên không chính thức cho các giải pháp giúp thiết lập webhooks tự động

## Next
Trong chương cuối cùng của khóa học này, chúng ta sẽ xem xét những gì cần thiết để biến một thiết kế API thành phần mềm hoạt động được.

Chuyển đến Chương 8!

## Link tham khảo
https://zapier.com/learn/apis/chapter-7-real-time-communication/