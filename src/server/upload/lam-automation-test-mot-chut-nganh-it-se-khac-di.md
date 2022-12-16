AUTOMATION TEST(AT) đã và đang là một xu thế cực kì hot trong quy trình phát triển phần mềm. Việc có thể sử dụng và làm việc thuần thục với AT có thể đem đến cho bạn careerpath sáng sủa đi kèm với đó là một benefit tốt. Nhưng, bài viết này không nhằm đề cập đến lợi ích chính mà AT đối với dự án mà thay vào đó tôi muốn đề cập đến lợi ích phụ mà nó mang lại. Lợi ích về việc cải thiện teamwork, để mọi người trong dự án tử tế với nhau hơn và MAKE A BETTER PLACE.

### I. Mở Đầu
Tôi, một DEV chân chính, vừa trải qua 5 tháng trong dự án với vai trò là automation tester ( không phải là do muốn thay đổi careerpath gì cả mà chỉ đơn giản là tổ quốc dí nên đành phải trả lời). Trong thời gian này, tôi chơi với đội test nhiều hơn và đồng thời cũng xung đột với đội dev nhiều hơn (thỉnh thoảng cãi nhau cả với mấy ông chơi với mình :D ) Thời điểm tôi bắt đầu gõ phím cho bài viết này là thời gian vừa bị đá đít ra khỏi dự án không lâu nên tiện thể đang rảnh rỗi muốn share cho mọi người chút trải nghiệm mà mình có được trong 5 tháng qua.Chia sẻ một chút là dự án này bên mình đạt EE là 130% (nghĩa là 1 người làm bằng 1,3 người) mặc dù chẳng ai cần phải ở lại công ty muộn, đến sớm hay bục mặt trên công ty thứ 7 chủ nhật cả. Những điều mình nói trong bài viết này chắc mọi người ai cũng biết cả nhưng phải thực sự trải nghiệm, để chân nhúng chàm thì nỗi đau mới thấm chứ ông PM cứ ra rả suốt ngày: ĐM chúng mày đoàn kết đi! Xin lỗi chứ nói thế chứ nói nữa cũng chả có tác dụng j.

### II. Conflicts
##### 1.  Áp lực deadline, Ai chịu?
**Dev nghĩ**
> Trong một quy trình phát triển của một dự án đều theo kiểu sprint trước sẽ code và sprint sau sẽ bắt đầu test. Deadline ai thì người đó phải chịu chứ làm gì có ai không phải chịu.

**Thực Tế**
> Dev khi thực hiện task của mình 10 ông thì đến 8 9 ông chỉ chăm chăm vào happy flow và popular case với một ý nghĩ vô cùng nông dân là cứ làm xong cho kịp deadline đã, log bug thì sửa để tăng tiến độ công việc của mình. Nhưng thực tế công việc đâu có tự sinh ra và mất đi chỉ có chuyển từ người này sang người khác thôi. Đi kèm với suy nghĩ đó của dev thì list công việc của test sẽ tăng thêm là test, chờ sửa xong, xác định impact và test thêm lần nữa, lần nữa và lần nữa. Cứ thêm nhiều lần như vậy, dẫn đến nhẹ thì ức chế tâm lí, nặng thì phát điên. Vậy là chỉ 1 bug nhỏ của dev thôi nhưng khối lượng công việc tăng thêm cho test thì nhiều vãi ***

**Automation test đã giải quyết như thế nào**

> Chờ thằng dev merge pull xong trước khi về gõ enter một cái cho script chạy, sáng hôm sau đến nhận một cái report như hình bên dưới, ông dev thích thì test tôi cũng nhây với ông tới cùng luôn.

![](https://images.viblo.asia/985c76c2-6e9a-4a55-ac12-ec622567db71.png)
#####  2.  Suốt ngày đi trà đá
**Test nghĩ**
> Ôi DM! dự án cháy, deadline đuổi đến tận mông rồi mà chúng nó vẫn đi trà đá đc

**Thực Tế**
> Dự án cháy có ai mà không muốn cố đâu nhưng căng thẳng lắm rồi, cố ngồi cũng chả nghĩ ra gì, chi bằng đi uống nước tí cho hạ nhiệt tí chứ cứ nhìn cố màn hình được gì đâu

**Automation test đã giải quyết như thế nào**
> Chị em test lúc viết code automation cũng stress quá, chán quá gọi hết chè rồi đến bánh tráng trộn lên ăn có người còn xin nghỉ một ngày ở nhà cho thoải mái, Hậu quả là cuối tháng hết tiền, tăng cân, béo phì và tự hỏi sao mấy anh em dev đi uống thuốc lắc ở đâu mà chúng nó đi 30 phút xong về chúng nó lại code như nhanh như chuột đẻ vậy.
#####  3.  Free test chỉ là một cách gọi khác của ngồi chơi
**Dev nghĩ**
> Đây là cái lí do được đội test bịa ra để hợp thức hóa việc ngồi chơi của mình

**Thực Tế**
> Đa số các bug được tìm ra do quá trình này vì thực tế test case được define trước chỉ thuần túy theo kiểu người dùng như tôi gõ cái này vào đây, tôi bấm nút, nếu sai nó hiện ra cái này, đúng thì nó chuyển đi đâu, chứ không ngăn chặn được việc có mấy ông user custommer hâm hâm xong làm các bước tứ tung lên, nhưng biết sao được, người ta là user, là khách hàng mà, họ có quyền, và cũng vì thế nên mình cũng phải bỏ effort ra cho việc free test thôi
#####  4.  Mấy thằng dev tại sao chúng nó có thể thiếu cẩn thận như vậy
Như mình đã nói không nói ở trên chẳng phải là do ông dev không biết không cẩn thận đâu, mà chỉ là do tâm lí ỷ lại thôi. Tạm thời không nói đến tính đúng sai của của vấn đề này mà mình chỉ muốn nói đến tâm lí của các tester sau khi tham gia dự án autotest. Dường như khi cũng phải lao vào viết các step của automation thì mọi người đã có vẻ thông cảm với nhau hơn. Trong quá trình làm việc mình nghe những câu nói từ chính đội test mà cười muốn rụng răng. Kiểu như:
* Hardcode thì làm sao?
* Thôi mày approve đi tao mệt lắm rồi, nó chạy được rồi còn gì
* DRY là cái gì?
* ....
#####  5.  giảm thiểu các công việc chân tay
Với một dự án có đến 70 80% số case được chạy tự động liên tục xuyên đêm, thì chắc chắn công việc của test trở nên đỡ áp lực, đỡ phải tập trung và đỡ mỏi mắt hơn rất nhiều. Khách hàng nhìn thấy report chuyên nghiệp vui hơn, sang thăm niềm nở hơn.Mọi người có thể dành effort của mình để test kĩ hơn những case có độ ưu tiên cao hơn hay trau chuốt animation của dự án. Nói chung là test kĩ càng hơn rất nhiều. Có một sự thật là dự án mình đạt chỉ số EE lên đến 130% (có nghĩa là hiệu suất của một người là 130%).
#####  6.  Có nhiều thời gian trò chuyện hơn
Mỗi khi có một automation test case bị failed, sau mỗi lần release thì cả dev và test cùng phải ngồi lại để xem đó là do code dự án sai hay code automation sai. Thông qua đó có nhiều thời gian trò chuyện hơn tiếp xúc với nhau và dĩ nhiên tình cảm cảm xúc cũng thăng hoa hơn rất rất nhiều. Thực sự đối với trải nghiệm cá nhân của mình thì Automation test là một cách tuyệt vời để cải thiện teamwork cho các member trong dự án mà chẳng cần phải có một bàn tay nào tác động vào như ma thuật vậy.

### III. Tổng kết

Automation test rất kì diệu nhưng nó cũng đem lại không ít những phiền toái cho dự án. Có thể kể đến như: 
* Cost của dự án tăng cao. Đương nhiên là như vậy cái gì cũng có giá của nó chi phí, chất lượng, thời gian. Luôn chỉ có thể chọn 2 trong 3 cái thôi. Autotest tốt cho những dự án dài hơi chứ không phù hợp với những dự án ngắn hạn.
* Độ ổn định của AT có cao nhưng không phải tuyệt đối, vì nó phụ thuộc vào nhiều vấn đề như hệ điều hành, device, phiên bản và cả chất lượng phần cứng nữa
* Lĩnh vực automation test vẫn đang còn mới và người thực hiện nó thường là các manual tester chuyển sang nên chất lượng code chưa cao lắm, những vấn đề như structure, hardcode, dry vẫn mắc phải khá nhiều và đây thực sự là nút thắt cổ chai của AT vì đây là vấn đề sống còn của dự án lớn, nếu không làm tốt người tham gia dự án sau sẽ no hành.

Cảm ơn mọi người đã quan tâm và lắng nghe!