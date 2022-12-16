Nếu đã từng làm việc trong các dự án được quản lý theo phương pháp Agile, có lẽ ai cũng quen thuộc với khái niệm __stand-up meeting__.

Hãy lắng nghe thử 1 chia sẻ cá nhân của 1 product manager về vấn đề này nhé.

---

Hiện tại tôi là 1 __technical product manager__ quản lý 1 đội ngũ kỹ sư bên dưới. Trước đây, khi còn là 1 developer, tôi khá chán nản với việc liên tục phải tham gia các buổi họp. Do đó, ngay khi trở thành manager, tôi đã thử triển khai dự án của mình theo 1 cách riêng biệt: 

* Không stand-up meeting
* Không lập kế hoạch (planning) ở từng phân đoạn lặp (iteration, sprint v.vv..)
* Không retros
* Tất cả mọi buổi họp đều không bắt buộc

Nghe thật kinh khủng phải không? Nhưng tất cả đều có thể giải thích được.

Tôi muốn cả team biết được, rằng tôi thực sự tin tưởng họ. Không vấn đề gì hết nếu họ luôn duy trì tốc độ của mình một cách ổn định. Tôi chỉ đặt mục tiêu cho 3 tháng, và hy vọng công việc sẽ được hoàn thành.

Kết quả thật đáng ngạc nhiên: công việc thực sự được hoàn thành. 

Team đã trở thành 1 tập thể năng suất, dễ dàng thích nghi với mọi thay đổi và luôn đảm bảo tất cả mục tiêu được đặt ra. 

Trước khi đi vào phân tích chi tiết tại sao quản lý như vậy lại thành công, thì hãy cùng tôi xem lại cách mà 1 team Agile bình thường hoạt động ra sao.

## Agile Team điển hình

Giờ giả sử chúng ta có 1 team có tên là SuperAgileRockstars.

SuperAgileRockstars sẽ thực hiện từng phân đoạn lặp (iteration, sprint) như sau:

* Sáng thứ Hai hàng tuần, dành 1h để lập kế hoạch cho cả tuần. _(Planning)_
* Hàng sáng, họp stand-up. Mỗi người sẽ trình bày việc đã làm hôm qua, việc sẽ làm hôm nay, có vấn đề hay thông báo chung gì không. _(Stand-up)_
* Cuối tuần, dành 1h để thảo luận xem cái gì tốt, cái gì chưa tốt, phương án giải quyết là gì. _(Retrospective)_

Nghe thật hợp lý, phải không nào.

Tuy nhiên, mọi thứ có thực sự là màu hồng. Hãy thử nhìn vào thực tế nhé.

* Trello (hay bất cứ tool nào bạn sử dụng) cần phải đồng bộ với những gì thảo luận trong buổi họp - điều hiếm khi xảy ra. Team càng lớn, việc này càng phức tạp. 
* Stand-ups KHUYẾN KHÍCH việc kế hoạch thay đổi theo từng ngày. Nhưng sự thiếu nhất quán lại gây ảnh hưởng xấu đến tiến trình phát triển dự án (developer flow).
* Standup đòi hỏi mọi người phải nhiệt tình ở 1 thời điểm và thời gian cứng nhắc.
* Chỉ những người hướng ngoại mới thích stand-ups, planning, và retros. Tech debt là vấn đề cơ bản, nhưng không nhất thiết phải ép developers giải quyết nó. 
* Tại sao chúng ta lại thoả hiệp với việc vấn đề được thảo luận 1 lần 1 tuần? Thay vì chỉ ra ở retros, chúng ta nên chỉ ra ngay lập tức.
* Iteration (hay Sprint) thúc đẩy việc phát triển phần mềm theo vòng lặp. Tôi cũng tán thành việc chia nhỏ và đơn giản hoá các tasks khi triển khai 1 chức năng lớn. Nhưng Iteration (hay Sprint) lại khiến chúng ta không ưu tiên tech debt. Chả mấy khi các bạn thấy 1 sprint chỉ để giải quyết tech debt phải không nào?

Điều gì sẽ xảy ra khi chúng ta không lên kế hoạch hàng tuần, không thực hiện retros cũng như stand-ups?

## Ngừng thực hiện stand-up

Tôi thấy stand-up thật phiền phức, dễ làm gián đoạn công việc khi tạo áp lực cho developer phải đặt độ ưu tiên của chức năng lên trên tech debt. Thậm chí nhiều khi nó còn kéo dài hơn 30 phút.

Không thực hiện stand-up nữa, có thể sẽ mang lại những lợi ích sau:

* Developers chia sẻ với nhau nhiều hơn
* Team thân thiết hơn
* Tech debt được chú ý hơn
* Developers cảm thấy thoải mái, ít áp lực hơn
* Developers hiểu bạn tin tưởng họ cũng như kết quả công việc của họ

Tại Spotify, vai trò của tôi là technical product manager - có nghĩa là "lái tàu" (quyết định xem cả team làm gì). Chả sao cả nếu chỉ mình tôi coi stand-up là mặc định phải làm trong dự án. Nhưng nếu cả tổ chức suy nghĩ như thế, thì đó là vấn đề mà tôi thấy nên xem lại.

Tôi đã nói chuyện với sếp về sản phẩm chúng tôi sẽ giao vào cuối quý, và tin tưởng rằng cả team biết cần phải làm gì.

Tôi muốn cho họ sự tự do mà họ cần để duy trì tính sáng tạo trong công việc.

Cần 1 ngày không đến công ty để làm việc ở 1 nơi nào đó bên ngoài? Không sao hết.

Muốn làm 1 thứ gì đó thực sự khác biệt trong 1 vài ngày? Nghe vui đấy chứ.

Tech debt đang ngoài tầm kiểm soát và cần thêm thời gian để giải quyết? OK, cứ triển khai.

Chúng ta là những người bạn, cùng hướng đến 1 mục tiêu, vậy tại sao hàng ngày cứ phải nói với nhau những câu như “hiện tại những item có độ ưu tiên cao nhất trên backlog là x, y, z”.

Thật phiền phức.

## Ngừng lên kế hoạch định kỳ

Việc phải định kỳ lên kế hoạch cũng gây khó hiểu cho tôi. Với kinh nghiệm của mình, tôi hiếm khi thấy có thay đổi nghiêm trọng đến mức toàn bộ team cần phải tập hợp và tìm phương án. Nếu thực sự có vấn đề khẩn cấp như thế, thì hãy họp rồi cùng ngồi thảo luận. Tôi không phản đối việc lên kế hoạch, tôi chỉ không đồng tình với việc phải lên kế hoạch hàng tuần.

Khi bạn không lên kế hoạch định kỳ nữa, mọi thứ sẽ ra sao:

* Developers nhận được sự tin tưởng rằng họ đang làm đúng việc
* Developers không bị gián đoạn công việc
* Backlog được sử dụng để quyết định mức độ ưu tiên
* Tasks được thêm liên tục vào backlog khi cần
* Vấn đề được thảo luận ngay lập tức
* Chỉ thực hiện Planning khi bắt buộc phải thay đổi kế hoạch.

## Ngừng retros

Bạn đang có người yêu và tình cảm 2 người đang thăng hoa. Liệu bạn có cần đến gặp bác sĩ tâm lý để xin tư vấn hàng tuần ko?

Đương nhiên là không. Vậy tại sao chúng ta phải thực hiện retros mỗi tuần hay mỗi tháng?

Thêm vào đó, tại sao chúng ta phải đợi đến retros mới thảo luận vấn đề hay khen ngợi nhau?

Bạn sẽ thấy những thay đổi sau khi ngừng thực hiện retros:

* Developers tập trung vào hoàn thành công việc
* Vấn đề được quan tâm sớm hơn
* Thay vì mua bút để viết, chúng ta có thể dùng tiền đó mua đồ ăn trưa =))

## FAQs

__“Làm sao tôi biết được mình nên làm gì?”__

_Good_: Chọn 1 item từ backlog.

_Better_: Backlog đã được xếp theo mức độ ưu tiên, chỉ cần lựa chọn item có độ ưu tiên cao nhất trên backlog.

_**Best**_: Xử lý tech debt hay open source cho thoải mái đầu óc cả ngày.

__“Nếu task của tôi bị tắc lại (blocked) thì sao?”__

_Good_: Chọn 1 item khác từ backlog.

_Better_: Tạo 1 cột tên “blocked” ở trello, chuyển task sang đó, rồi chọn 1 item khác từ backlog.

_**Best**_: Chuyển task sang “blocked” cột, chọn 1 item khác từ backlog, rồi gửi 1 message trên slack để báo với team về việc đó.

__“Làm cách nào để nắm được tiến độ hiện tại?”__

_Good_: Hỏi team. Đừng hỏi hàng ngày.

_Better_: Update backlog, quan sát Trello.

_**Best**_: Thảo luận với team nếu có vấn đề độ ưu tiên cao. Hãy tin tưởng rằng công việc sẽ hoàn thành, cho đến khi không thể tin được nữa. Lấy thông tin từ những bữa ăn, hay bữa nhậu.

Bạn cần những developers luôn sẵn sàng đối mặt với tech debt, và người quản lý thực sự quan tâm đến chất lượng của sản phẩm.

Nhưng thực tế là hầu hết các công ty không hoạt động như vậy, và cũng ko có môi trường tốt cho những người hướng nội.

## Tổng kết

Một team hoạt động hiệu quả sẽ chủ động thảo luận về mọi thứ. Họ tin tưởng lẫn nhau, qua đó mà hoàn thành được tốt công việc.

Tôi viết bài viết này để trả lời cho câu hỏi những gì đang trở thành đặc trưng ở agile team. Họp stand-ups hàng ngày, lên kế hoạch hàng tuần, retros hàng tuần (tôi còn chưa nói gì đến estimation).

Lời khuyên của tôi cho mọi người là đừng bắt đầu với quá nhiều thứ phức tạp.

> Stand-ups, planning, hay retros chỉ là công cụ, đừng mặc định sử dụng, mà hãy suy nghĩ thật kỹ khi lựa chọn.

---

*Source*: [You don’t need standup](https://medium.com/@jsonpify/you-dont-need-standup-9a74782517c1)