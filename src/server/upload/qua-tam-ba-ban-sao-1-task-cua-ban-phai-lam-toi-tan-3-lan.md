## I: 1 task làm 3 lần, làm gì có chuyện đó :O
Tiêu đề của bài viết có lẽ sẽ khiến **một số** anh em chưa hiểu vì sao lại có chuyện 1 task làm tới 3 lần.
Hẳn là có gì nhầm lẫn phải không? 😁 nhưng cầu trả lời là không, không nhầm lẫn gì đâu. <br>
Trong quá trình làm việc chúng ta sẽ nhận 1 task để tiến hành làm, sau đó nó sẽ phát sinh một cơ số bug 🐞, sau khi combat ⚔️ với tester chúng ta sẽ lặng lẽ chịu thua và đi fix những bug này. Sau khi cay cú fix xong bug chúng ta trả lại cho tester với tâm thái "cuối cùng thì nó vẫn là một tính năng" nhưng tôi đã fix cho bạn 😤😤. Chuyện sẽ chẳng có gì nếu như tester báo ok, nó chạy rồi đó nhưng không chúng ta lại thấy 1 tin nhắn nhẹ nhàng từ các bạn tester "ôi, chưa được đâu" hoặc "ối, sao chức năng kia nãy chạy bình thường mà giờ lỗi rồi" 😱😱<br>
Và sau đó, trên tool quản lý task lại thêm 1 cái **Reopen** bug được assign cho bạn.

Hẳn là ai trong số các anh em dev cũng đã gặp những trường hợp như thế này, hôm nay chúng ta sẽ tìm hiểu lý do vì sao chúng ta lại thường xuyên phải làm "**1 task 3 lần**" và có giải pháp nào cho vấn đề này không?

## II: Nguyên nhân của vấn đề này là gì :thinking: ?
**1.  Phần này không phải do em code** 🤷‍♂️

Trong quá trình làm việc, team dự án sẽ có người mới vào, người cũ ra hoặc được chuyển qua dự án khác và vấn đề bạn phải sửa code của một ai đó là điều hết sức bình thường => đây sẽ là lý do mà chúng ta hay sử dụng nhất

**2. Em chưa cẩn thận lắm, lần sau em sẽ chú ý hơn** 🥺

Các bạn dev mới hoặc bạn nào đó bí lý do khi phải tìm cách thuyết phục rằng em đang bận hoặc có vấn đề riêng khiến bản thân mất tập trung để fix bug cẩn thận ngay từ đầu.

**3. Bug không mô tả rõ nên em chỉ fix được như thế thôi** 😤

Một trong số những lý do chúng ta thường xử dụng khi gặp vấn đề giao tiếp với tester, khi fix bug với thái độ bực dọc không bằng lòng dễ xảy ra trường hợp tester nói thế nào chúng ta fix thế ấy và chẳng bao giờ để tâm đến vấn đề thực sự của cái bug đó là gì.

**4. Em đọc chưa kĩ yêu cầu nên fix thiếu case này** 😦

Cũng giống với lỗi "chưa cẩn thận lắm" phía trên, chúng ta mất tập trung, làm vội vàng, tâm lý muốn giải quyết hết các bug cho nhẹ nợ khiến làm nhanh và ẩu không đọc kỹ toàn bộ yêu cầu cần fix của bug.

**5. Em chưa đánh giá được kỹ nên dẫn tới degrade** 😬

Phần này thì có thể sẽ đi kèm với lý do số 1 là do chưa nắm bắt được hết logic nên fix bị degrade mà không biết hoặc chỉ đơn giản là làm nhanh và ẩu không kiểm tra kĩ lại vấn đề gặp phải trước khi fix mà chỉ tập chung vào bug hiện tại để cho xong.

## III. Điều gì sẽ xảy ra khi chúng ta làm 1 task tới tận 3 lần 😵😵😵??? 

**1. Không đảm bảo tiến độ công việc** :calendar: 

Thử nghĩ đơn giản 1 task bạn estimate 2h sau đó fix bug 1h vào thêm ít nhất 30p cho việc fix reopen bug => kết quả là dự án đã mất thêm 1h30p cho task đó của bạn

**2. Năng suất thấp do tốn nhiều thời gian trao đổi, làm đi làm lại** ⏳️

Một ngày bạn có thể solve 5 bugs nhưng do phải đi fix 1, 2 bug reopen khiến số bug bạn thực sự xử lý được chỉ có 3 bugs và các bug khác không được xử lý lại phải chuyển tiếp sang ngày hôm sau hoặc sprint sau

**3. Khi khối lượng bugs nhiều thì dẫn đến chi phí tăng cao** :money_with_wings: 

Sau khi bị reopen bug chúng ta sẽ lại phải điều tra, rà soát và assign qua lại nhiều lần

**4. Công ty / khách hàng đánh giá thấp về chất lượng của dự án, đánh giá thấp về năng lực của bạn** ⬇️

Điều này ảnh hưởng trực tiếp đến sự tin tưởng của quản lý trực tiếp đến năng lực của bạn và có thể hạn chế các cơ hội giúp bạn tiếp cận với các dự án hấp dẫn khác cũng như **LƯƠNG** của bạn!

**5. Bản thân không nâng cao được năng lực của mình, đóng góp cho dự án bị hạn chế** 🤕

Bạn tốn nhiều thời gian hơn để xử lý vấn đề của mình và đồng nghiệp thì đã có thể dành thời gian để nghiên cứu giải pháp cho task mới chẳng hạn, điều đó khiến bạn mất đi cơ hội cải thiện và thể hiện năng lực của mình. Đóng góp của bạn cho dự án cũng ít đi vì đa phần bạn chỉ fix bug và fix lại reopen bug.

## IV: Giải pháp nào để fix bug hiệu quả, triệt để 🙄?

![](https://images.viblo.asia/a976d58a-03b1-4aaa-8cf5-f6d0e2863ff0.png)

Hẳn là các bạn cũng nghe đến câu "phòng bệnh hơn chữa bệnh", vậy thì tại sao chúng ta không làm task thật tốt trước thì nó sẽ không có bug, không có bug thì làm gì có để mà reopen phải không ?

No no no, như một triết gia nào đó đã nói trên internet: *cờ bạc, người không chơi là người thắng* à nhầm 😁 <br>
**"Viết code, người không viết là người không gặp bug, người viết code là người luôn tạo ra bug!"**

Vậy nên anh em luôn biết rằng code của mình sẽ có bug và một số việc nhỏ sẽ giúp chúng ta hạn chế được việc tạo ra bug cũng như bị open bug.
Dưới đây là kinh nghiệm của mình để hạn chế bug và bỏ quên tính năng :

+ Khi làm 1 task cần tạo todo list cho 1 chức năng (ví dụ chức năng nhận tin nhắn mới sẽ có notification counting, trạng thái tin nhắn, danh sách tin nhắn, đọc tin nhắn, trả lời nhanh, auto scroll xuống dưới cùng....etc) và lần lượt xử lý từng các tính năng nhỏ và check done khi hoàn thành. Bạn cũng có thể confirm với BA, tester để xem mình có bị miss case nào cần xử lý không

+ Khi xử lý bug cần phải thực sự hiểu rõ vấn đề, trước khi bắt tay vào làm, nếu còn chỗ nào trong bug mà không được mô tả kĩ thì cần hỏi lại QC/tester ngay hoặc có thể xác nhận lại với cả BA để chắc chắn vấn đề đã được hiểu đúng<br> 

+ Nội dung xử lý cần được mô tả rõ ràng, nếu bạn chưa mô tả được rõ cách giải quyết thì khả năng cao bạn vẫn chưa thực sự hiểu rõ vấn đề và solution có thể chưa triệt để hoặc chưa tốt.

+ Mô tả rõ ràng thì sẽ nhanh chóng nhận được sự confirm / support về solution của người có trách nhiệm cao hơn		

+ Tập trung suy nghĩ , liệt kê các hạng mục trước khi làm sẽ cover được nhiều vấn đề hơn, hạn chế được các sai sót do chủ quan, thiếu cẩn thận		

+ Loại bỏ tâm lý "không phải do mình code" vì bạn đã join dự án và nhận bug để fix thì cần có trách nhiệm với nhiệm vụ của mình, nếu chưa nắm rõ được logic, nghiệp vụ của task/bug thì cần xác nhận lại với tester và PM để nhận được sự giúp đỡ

+ Khi fix bug liên quan đến logic thì luôn chú ý phần code bị sửa được sử dụng ở những chỗ nào khác, flow nào khác? Nếu có thì phải đánh giá xem có ảnh hưởng gì không.

+ Self test và mô tả lại các testcase bạn đã tự check. Khi thời gian gấp thì phần này có thể nhờ tester hỗ trợ bạn . Tuy nhiên bạn vẫn cần phải có những quan điểm riêng, vì nhiều khi tester không nắm được hết logic bên dưới nên không thể cover hết.

## V:  kết luận
Nhìn chung tất cả chúng ta đều phải gặp và làm việc với bug **(kim sinh thủy, code sinh bug)**  tuy nhiên cách làm việc khác nhau sẽ dẫn tới kết quả khác nhau. Tuy các phương pháp, cách làm có vẻ mất thời gian ban đầu của bạn nhưng tổng thời gian cho task/dự án sẽ ít đi, do bớt được nhiều việc rework và công việc ở các bên liên quan. <br>
Khi bạn hoàn thành sớm bug, không bị reopen khách hàng vui, team bạn vui, bản thân bạn sẽ không những không gặp phải stress mà còn có thêm nhiều cơ hội mới và thêm thời gian để nâng tầm bản thân mình.

Cảm ơn anh/em đã đọc tới đây, hy vọng bài viết có thể giúp anh em cải thiện công cuộc **chiến đấu** với tester của các anh/em 🤣🤣🤣🤣🤣