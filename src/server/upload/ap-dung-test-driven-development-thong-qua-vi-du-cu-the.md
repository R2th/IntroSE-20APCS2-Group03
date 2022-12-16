# Lời mở đầu

Xin chào, lại là mình với một bài viết ngẫu hứng. Vâng hoàn toàn ngẫu hứng sau khi fix bug sấp mặt và mình chỉ muốn hét lên rằng: "Mọi người ơi, đã đến lúc thay đổi cách code của mình rồi, bug nhiều lắm rồi". Trong thời đại này, đặc biệt là khi microservices đang lên ngôi thì việc đảm bảo chất lượng code phải đặt lên hàng đầu, điều tra lỗi ở mircoservice nó tốn thời gian lắm, nên là việc code shit là không thể chấp nhận được. Bên cạnh đó, tester cũng là người, mà người thì tạo ra lỗi, mọi thứ không thể phụ thuộc hết vào tester, QC để đảm bảo hết bug được, dev cũng phải có trách nhiệm test sản phẩm của mình, test từng dòng code của chính mình. Nhưng mà hầu hết các dự án hiện tại, KH đều bỏ qua effort cho viết unittest, và tất nhiên dev chúng ta chẳng ai ngồi viết test cả. Cứ code, build source, chạy manual vài case cơ bản, thế là done task và sau đó tester quăng 1 đống bug về. Ngày nào cũng phải chịu cảnh task thì dí, bug thì đè như thế có chán không? Chán thực sự luôn. 

Chính vì thế dev cần tìm ra cách đảm bảo chất lượng cho mình, mà không tốn quá nhiều thời gian để thực hiện, thì việc apply BDD, TDD là sự lựa chọn tuyệt vời. Tạm gác BDD qua 1 bên, bài viết này sẽ phân tích về TDD để cho các bạn thấy vì sao nó hiệu quả và không mất quá nhiều thời gian trong việc phát triển phần mềm.


# TDD là gì

TDD - Test Driven Development được hiểu theo đúng nghĩa đen là 1 kỹ thuật lập trình hướng kiểm thử. Lập trình hướng kiểm thử ở đây tóm gọn trong 3 bước sau:

- tạo unit test: đây chính là kịch bản cho mọi tình huống có thể xảy ra. Nơi mà bạn định hình chính xác input và output mà mình cần. Vì chưa có code nên hiển nhiên các testcase này sẽ error.
- code: init logic để cho các testcase hết error và run test. Đây là bước mà bạn code theo requirement
- refactor: code và run test xong, test fail thì lại tiếp tục chỉnh sửa cho đến khi mọi case đều pass.

# Tại sao phải dùng TDD

Điều dễ thấy nhất đó chính là có unit test và đó là thứ đảm bảo chất lượng source code của bạn. Lợi ích của unit test thì khỏi phải bàn rồi. Bên cạch đó, việc viết test trước giúp bạn clear requirement, định hình được những logic cần thiết và thuật toán cần vận dụng. Điều này là ưu điểm phải nó là số 1 của TDD mang lại.  Dev chúng ta quá vội vã cũng như quá tự tin vào ý hiểu của mình và luôn phải đón nhận hậu quả vì nó. Chưa kể còn nhiều người làm dự án biết bao lâu mà lúc nào cũng làm sai requirement. Chỉ cần áp dụng TDD đúng cách, thì không cần lo lắng về nó nữa. Nó định hình được logic giúp code nhanh hơn, giảm số lượng bug phát sinh, tiết kiệm thời gian cho chính mình và người khác.

Một điều nữa có thể kể đến, đó chính là không phải tốn thời gian để test manual cho cả đống input đó nữa. Thử nghĩ xem, thay vì bấm run test và xem kết quả, bạn phải lên UI gõ từng item, hay update param trong payload API thì cái nào nhanh hơn. Rồi bạn có chắc bạn test manual là đủ và không để lọt bug. Unit test sẽ chính là cái mang lại sự tự tin đó. Việc vận dụng TDD, thậm chí kết hợp với BDD đúng cách, thì test manual không còn cần thiết nữa. Run test pass là push PR đưa TL luôn

Chỉ cần một chút thời gian để viết test lúc đầu, bạn đã tiết kiệm được thời gian để test manual, fix bug, thậm chí tiết kiệm nhân công (không cần tester), thì tại sao lại không dùng TDD cơ chứ. Tuy nhiên, những lợi ích nó đem lại bắt buộc bạn phải vận dụng nó đúng cách. Chứ không phải đơn giản là viết vài ba testcase, code và run cho nó pass. Hay là phải viết thêm một đống testcase cho chắc ăn. Thì làm thế nào cho đúng, mình cùng tiếp tục đến với phần sau.


# Apply TDD qua ví dụ cụ thể

Thì trăm nghe không bằng 1 thấy, trăm thấy không bằng một sờ, trăm sờ không bằng 1 làm, thì mình làm luôn 1 ví dụ để các bạn có thể hiểu được cách vận dụng TDD trong lập trình nó như thế nào. Thì đầu tiên chúng ta cần có 1 requirement làm đề bài. Giá sử đang có một API thu nhận dữ liệu từ các công tơ điện, và cần add thêm validation cho nó. Để bài viết không trở nên quá dài và rối rắm thì mình chỉ đưa ra một yêu cầu nhỏ trong phần validation đó là kiểm tra xem Id của công tơ có hợp lệ hay không

```
smartMeterId phải đúng cấu trúc sau: "smart-meter-x-y" trong đó
- x là một trong 3 giá trị S/M/L (tương ứng với 3 công ty phân phối điện có trong hệ thống)
- y là số tự nhiên từ 0-99 (mỗi công ty chỉ phân phối tối đa 100 công tơ điện)
```

Với yêu cầu này thì hẳn chính ta hình dung được mình cần dùng regex để code. Với cách lập trình truyền thống, cứ thế mà bay vào code thôi. Viết cái regex, build source, chạy API xem nó có đúng không. Không đúng lại chỉnh sửa, tiếp tục run và call API... thì với TDD, đầu tiên chúng ta sẽ clear requirement với một số phân tích sau:
- smartMeterId có cấu trúc gồm 3 phần là tiền tố `smart-meter`, company code `x` và smart meter number `y`. Mỗi phần phân tách nhau bằng dấu -
- Với tiền tố `smart-meter` thì confirm nó có phân biệt chữ hoa thường hay không => confirm là chữ thường, chữ hoa không hợp lệ
- company code `x` chỉ nhận 3 giá trị là `S`, `M`, `L` là chữ ghi hoa => confirm chính xác
- smart meter number `y` có giá trị từ 0-99 vậy số có giá trị dưới 10 thì là hai chữ số hay 1 chữ số => confirm 1 chữ số.

Đấy clear requirement phát nắm ngay cái regex nó thế nào ngay. Nếu so với cách truyền thống, chưa chắc lúc code bạn đã định hình được cái regex nó như thế nào đâu. Đúng chứ? Và tiếp theo mà viết test case với các input và output đúng theo requirement mà mình hiểu. Về các case thì bao gồm case input hợp lệ đúng format và các case không đúng như sai prefix, sai code, sai number. Mình viết một testcase như này cho nhanh. Để rõ ràng hơn các bạn nên viết thành từng case riêng rõ ràng chứ không nên gộp như mình. Tại mình lười thôi. 

![image.png](https://images.viblo.asia/845d15e7-8c51-4113-b473-eb799ca5ee04.png)

Bạn có thể thấy mình sẽ sử dụng method `isSmartMeterIdValid`  để kiểm tra smartMeterId. Và nó có màu đỏ, màu của ERROR vì tất nhiên `isSmartMeterIdValid` chưa có tồn tại

Bước tiếp theo sẽ là tạo method `isSmartMeterIdValid` ở meterReadingService. Init như thế này để chạy được test cái đã

![image.png](https://images.viblo.asia/1b6dc700-353d-4bfc-8ec1-49086d202741.png)

và kết quả sau khi run test

![image.png](https://images.viblo.asia/889f3310-2635-48e4-a0b0-654b29ede39b.png)


Thì ở bước này chắc chắn sẽ có test fail. Nếu không có test fail thì chúc mừng, bạn đã trúng một vé cơ hội viết lại unit test. Đối với test fail thì mình refactor lại code cho nó pass. Chỉ cần update lại regex thôi

![image.png](https://images.viblo.asia/e6333675-49b4-42a6-88a8-4631789fbfae.png)

và tiếp tục run test

![image.png](https://images.viblo.asia/ed0e4d38-dd7c-477b-b5ab-ffc02d73daf3.png)

Với kết quả như trên thì tự tin đẩy PR rồi :D Trường hợp logic phức tạp, code sai phải sửa đi sửa lại nhiều thì việc run test thấy ngay kết quả cũng dễ chịu hơn nhiều so với việc chạy manual, vừa mất công, tốn thời gian chờ các thứ rất khó chịu. Việc lập trình theo TDD nghe đáng sợ thế thôi chứ khi áp dụng vào thực hiện, mọi thứ lại dễ dàng ngay có phải không


# Lời kết

Thật sự thì mình cũng đang trong quá trình chuyển đổi cách code sang TDD, cũng không dám chém gì cao siêu. Chỉ mong qua ví dụ nho nhỏ ở trên giúp các bạn có cái nhìn về cách áp dụng TDD trong việc lập trình và thông qua nó thay đổi cách lập trình truyền thống. Cảm ơn các bạn đã đọc. Hẹn gặp lại ở các bài viết tiếp theo

# Tham khảo

https://www.guru99.com/test-driven-development.html