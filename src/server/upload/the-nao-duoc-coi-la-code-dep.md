Chào các bạn,

![](https://images.viblo.asia/c6e10211-9a20-4f35-8f67-de4109f57efd.jpg)

*Con người chúng ta sinh đã luôn thích cái đẹp: người đẹp, tâm hồn đẹp, nhà đẹp, xe đẹp, quần áo đẹp và... Code đẹp - một quan niệm về cái đẹp chỉ có ở các lập trình viên. Mình cũng vậy, mình cũng như các bạn, rất thích cái đẹp, và rất thích code đẹp.*

## I. Code thế nào được coi là "code đẹp"?
Chắc hẳn, các bạn đều đã đọc rất nhiều bài về cách viết code đẹp hơn. Nhưng có vẻ lại chẳng có ai định nghĩ về "Code đẹp" là gì? Do mỗi người lại quan điểm về cái đẹp khác nhau, hơn nữa "code đẹp" lại là một khái niệm chưa có trong từ điển Tiếng Việt :grinning:  Vậy nên, hôm nay mình xin phép chia sẻ quan điểm cá nhân về định nghĩa này.

1. **Code chạy đúng trong mọi trường hợp:** Nghĩa là cho dù sản phẩm của bạn có phát triển lớn tới cỡ nào, thì cũng vẫn là đoạn code đấy chạy. Sản phẩm của bạn có 1 người dùng cũng chạy đúng mà 10 triệu người dùng cũng vẫn chạy đúng, vẫn đáp ứng được hiệu năng.
2. **Code chuẩn Style Guide:** Style Guide là những quy ước về cú pháp, cách đặt tên biến, tên hàm, tên hằng trong dự án. Code chuẩn style guide là code tuân theo các quy ước này.
3. **Code áp dụng các design pattern phù hợp:** Design Pattern hiểu nhanh nó là một mô hình giúp các bạn giải quyết vấn đề, áp dụng design pattern chuẩn sẽ giúp code của bạn trong sáng và dễ hiểu, dễ tái sử dụng.
4. **Code áp dụng các công nghệ tiên tiến nhất:** Tất cả những gì tiên tiến nhất sẽ phải hội tụ trong dự án của bạn.
5. **Code không bị dư thừa:** Không dư thừa các hàm, các file, các thư mục không dùng đến.
6. **Code an toàn và bảo mật:** Code sao để hacker không thể tấn công được.

:warning: **Warming:** Các tiêu chí về code đẹp là do mình tự đặt ra như vậy, có bạn nào đã từng làm dự án nào mà chứa toàn code đẹp như vậy chưa?

## II.Code đẹp rất Lợi - Hại
Không thể phủ nhận, code đẹp có rất nhiều mặt lợi. Mình nhớ trong một lần nhận bảo trì trang web bán hàng cho một doanh nghiệp nọ. Họ yêu cầu mình thay đổi một số phần giao diện của website, kèm theo đó là phát triển thêm một số tính năng mới, và hứa sẽ thưởng thêm nếu làm tốt công việc. Lúc nhận yêu cầu, mình thấy công việc cũng không có gì khó khăn, nghĩ bụng phen này chắc sắp giàu rồi. 

Thế nhưng mọi thứ quay ngoắt 180 độ khi mình có trong tay source code của họ... Dự án không hề áp dụng MVC mà viết lẫn lộn cả 3 thành phần vào nhau, tên file và thư mục thì tùy ý đặt tên, code thì không tuân theo style nào cả, mọi thứ cứ lẫn lộn lên như ly chè thập cẩm. Mình chán ngán và hỏi tại sao code lại "chán" như vậy, thì các anh ở đấy bảo code này được phát triển từ một đề tài của sinh viên từ khá lâu rồi, lại trải qua nhiều lần nâng cấp, mỗi người thêm thắp một tý thành ra source code mới rối rắm đến thế. Nghĩ mà chán, thế nên mình quyết định từ bỏ dự án này, cũng may là bên họ tốt không bắt mình đền bù dự án.

Kể câu chuyện như vậy để bạn thấy rằng tầm quan trọng của việc code đẹp, nếu dự án được được áp dụng mô hình MVC thôi, là quá trình bảo trì đã đơn giản hơn rất nhiều rồi. Nhưng đằng này...

Bên cạnh những mặt lợi không thể chối cãi, thì khi code quá đẹp cũng gây ra một số tác dụng phụ ảnh hưởng xấu tới dự án và chính mình, vì cái gì quá cũng không tốt mà. Bản thân mình đã gặp và cảm nhận được một số ảnh hưởng tiêu cực của việc lúc nào cũng cố gắng code đẹp như sau:

**Code nắn nót quá sẽ tốn nhiều thời gian:** Quá nắn nót vào từng dòng code khiến mình mất nhiều thời gian để suy nghĩ hơn. Giả sử như nỗi khi muốn đặt tên biến, tên hàm, tên file, tên thư mục... Mình thường suy nghĩ kỹ xem có nên đặt tên như vậy không, nhiều khi lúc này thấy hợp lý rồi, nhưng ngày mai nghĩ lại thì lại thấy cái tên khác hợp lý hơn. Thế là quay ra sửa lại code ngày hôm qua, cứ như vậy tạo nên một vòng luẩn quẩn khiến mình mãi không hoàn thiện nổi một tính năng.

**Suy nghĩ đến những trường hợp quá xa:** Nghĩ quá xa, vượt quá phạm vi của bài toán khiến mình mãi không ưng với những dòng code mình viết ra. Ví dụ dự án của mình làm xong thì cùng lắm có 5000 người dùng, thế nhưng mình luôn nghĩ phải thiết kế hệ thống sao cho đáp ứng được 5 triệu người dùng. Dự án của mình không cần phải mở rộng, thế nhưng mình luôn code theo hướng có thể mở rộng. Điều này khiến mình tốn rất nhiều thời gian để tìm hiểu, để thay đổi, trong khi các trường hợp đấy không bao giờ xảy ra với dự án mình đang theo đuổi.

**Tích hợp nhiều công nghệ mới, trong khi nó chưa phổ biến:** Khi PHP vừa mới ra mắt phiên bản 7.0, mình hí hoáy triển khai ngay một dự án cho công ty trên nền tảng mới này. Sau khi làm xong, đến bước deploy thì không deploy nổi bởi vì hosting mà công ty mua chỉ chạy được PHP 5.x. Kết quả là công ty mình đã phải chuyển qua sử dụng VPS, để có thể tự cài PHP 7 lên và chạy.

**Quá tập trung vào code mà quên mất mục đích chính của dự án:** Có lần mình làm một dự án về rao vặt bất động sản, tính năng chính là cho khách có thể tạo tài khoản và đăng tin rao vặt lên website. Thế nhưng vì quá mải mê vào việc code sao cho đẹp mà mình cứ làm đi làm lại một tính năng phụ, trong khi tính năng chính cần tập trung thì không làm. Kết quả là sắp deadline, mình phải OT để làm cho kịp dự án.

**Mang dao mổ trâu đi giết gà:** Một bài toán đơn giản thì hãy cứ giữ cho nó đơn giản - Mình chỉ ước là nhận ra điều này sớm hơn. Hồ trước, mình được giao cho một task là liệt kê danh sách các khách hàng dưới dạng bảng và có bộ lọc theo mã khách hàng, tên khách hàng, trạng thái,... Tính năng này không hề khó, thế nhưng vì muốn sản phẩm nhìn phải thật ngầu, thật đẹp nên mình đã tích hợp thư viện datatable để hiển thị danh sách này. Cứ nghĩ phen này chắc là được khen tấm tắc, nào ngờ phải đập đi làm lại vì lý do "mang dao mổ trâu đi giết gà". Việc sử dụng datatable để hiển thị giao diện bảng nhìn thì đẹp thật nhưng nó không cần thiết trong trường hợp này, hơn nữa việc tích hợp thư viện bên thứ ba như vậy sẽ làm dự án khó bảo trì hơn.

Một câu chuyện khác nữa, mình từng build tính năng rút gọn link cho một trang web. Phiên bản đầu dự án được build bằng PHP thuần với html, css tự viết. Sau đó mình nghe nói đến framework Laravel tuyệt lắm, thế là mình sử dụng Laravel để làm backend thay cho PHP thuần trước đó. Tiếp đến, mình lại nghe nói đến Single Page App đem lại trải nghiệm mượt mà, thế là mình lại mày mò áp dụng Single Page App cho dự án này. Kết quả là sản phẩm có tốt hơn, nhưng không tốt hơn là mấy, trong khi mình lại tốn quá nhiều thời gian cho việc thay đổi này. Nếu như bỏ qua việc mình học được thêm 2 công nghệ mới ra, thì việc đánh đổi như vậy là không xứng đáng. Nhưng cũng may, đây chỉ là dự án cá nhân của mình, nên không ảnh hưởng tới ai cả.

## III. Lời kết
Các cụ nói cấm có sai "cái gì cũng có hai mặt", tốt quá cũng xấu, mà xấu quá thì... chắc chắn là xấu rồi. Qua bài viết này, mình muốn nhắn nhủ một vài điều như sau

**Thứ nhất:** Code đẹp, nhưng phải đẹp trong phạm vi của bài toán. Sản phẩm có 1 trăm người dùng, khác hoàn toàn với sản phẩm có 1 triệu người dùng, mặc dù hai sản phẩm có thể cùng tính năng.

**Thứ hai:** Code đừng quá thông minh, bởi không phải ai cũng đủ thông minh để có thể hiểu được những dòng code thông minh đó.

**Thứ ba:** Đôi khi phải đánh đổi sự tốt nhất, nhanh nhất bằng sự phổ biến nhất.

**Thứ tư:** Cân nhắc công sức bỏ ra để đánh đổi lấy code đẹp. Nếu có hai lựa chọn "Code đẹp 8 mất 1 giờ" và "Code đẹp 10 mất 100 giờ" thì hãy chọn Code đẹp 8.

**Thứ năm:** Những tính năng đã hoàn thiện thì hãy cứ để nó ở quá khứ, nếu muốn cải thiện thì phải có kế hoạch rõ ràng.