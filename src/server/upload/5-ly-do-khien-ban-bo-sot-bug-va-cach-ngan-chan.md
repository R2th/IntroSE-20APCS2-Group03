Nhiều quan điểm cho rằng người kiểm thử phải chịu trách nhiệm tìm thấy tất cả các lỗi trong hệ thống. Nếu có bất kỳ lỗi nào xảy ra khi sản phẩm đã đến tay khách hàng và gây ra tổn thất về doanh số, uy tín của công ty, khách hàng tiềm năng,...thì người kiểm thử cũng có trách nhiệm trong đó. Vì thế, bỏ sót lỗi (lack bug) là một điều khá tồi tệ đối với những kiểm thử viên.

Bài viết này đưa ra 5 lý do tại sao chúng ta thường bỏ sót bug trong kiểm thử phần mềm và những gì có thể làm để ngăn chặn bug đó xảy ra lần nữa.

### 1. Bỏ sót bug vì đã không kiểm thử phần đó.
Điều này là hiển nhiên. Nếu bạn đã không test qua một tính năng nào đó hoặc bỏ qua các trường hợp kiểm thử, nhiều khả năng các lỗi sẽ được chuyển đến tay khách hàng. Tất nhiên, có một số lý do khiến bạn không thực hiện test tính năng đó, do bạn quên hay do test design của bạn không tốt. Nhưng đây là những lý do phổ biến:
* Đội Developers đã thực hiện những thay đổi trong code và bạn không được biết đến. Developers có thể cố tình che giấu điều đó, hoặc họ chỉ đơn giản nghĩ rằng những thay đổi đó là nhỏ, không gây ra ảnh hưởng gì, do đó không cần kiểm thử hoặc không cần báo cáo sự thay đổi.
* Do lỗi truyền đạt: leader chưa báo sự thay đổi đó cho bạn để thực hiểm kiểm thử.

**Bạn có thể làm gì để ngăn chặn điều đó?**

* Theo dõi mọi thay đổi có thể có trong mỗi bản release, đặc biệt là các thay đổi của các thành phần quan trọng hoặc thay đổi vào phút cuối. Nếu bạn đang gặp rắc rối, hãy hỏi về những thay đổi và nếu có thể, hãy đưa ra những rủi ro nếu việc kiểm thử bị bỏ qua đối với những thay đổi đó.
* Nhờ leader trao đổi vấn đề với tất cả thành phần trong dự án, thường xuyên giao tiếp, trao đổi để truyền đạt thông tin cần thiết, nói thêm về rủi ro, chất lượng của hệ thống.

### 2. Không bao quát được tất cả các trường hợp.
Bug luôn tiềm ẩn trong hệ thống, vì vậy không dễ để tìm thấy, đòi hỏi nhiều nỗ lực, phương pháp kiểm thử tốt.

Trong nhiều trường hợp, phải thực hiện các “steps” phức tạp hoặc các kết hợp khác nhau để tìm ra lỗi. Về mặt kỹ thuật, phần mềm ngày càng phức tạp hơn để phục vụ và đáp ứng nhu cầu kinh doanh hiện nay. Với kiểm thử Blackbox testing, bạn có thể không nhận thức được mức độ phức tạp của hệ thống hoặc cách các thành phần của nó hoạt động cùng nhau. Kết quả là bạn đã không xác định được hết phạm vi kiểm thử hoặc các trường hợp kiểm thử mà tại đó có nhiều bug khó được tìm thấy. Những bug này đôi khi khiến mọi người thường tự hỏi "tại sao xảy ra? ai là người gây ra?".

**Bạn có thể làm gì để ngăn chặn điều đó?**

* Là người kiểm thử nên đặt mình vào vị trí người dùng để hiểu cách họ thường sử dụng sản phẩm, những thao tác bất thường cũng là cách để tìm ra bug.
* Tìm hiểu về cách hệ thống hoạt động. Trong nhiều trường hợp, bạn không cần phải biết cách các thành phần trong hệ thống giao tiếp với nhau, hoặc hiểu từng dòng code. Tuy nhiên, việc hiểu tổng quan về hệ thống dưới góc độ kỹ thuật sẽ giúp bạn tìm ra bug tốt hơn.
* Nếu bạn có nhiều thời gian, hãy dành thời gian để thiết kế và bao quát nhiều điều kiện kết hợp nhất có thể. Tất nhiên, điều này sẽ tốn thời gian, nhưng sẽ đem lại hiệu quả nhất định.

### 3. Bỏ qua những bug hiển nhiên, dễ dàng thấy được.
Đôi khi những bug bị bỏ sót là những bug rất rõ ràng, hiển nhiên, ở trước mặt nhưng chúng ta không nhận thấy.

Có một số lý do tại sao bạn không thấy các lỗi rõ ràng như vậy:

* Quá tập trung vào việc kiểm thử một phạm vi cụ thể của hệ thống mà không quan tâm đến vấn đề của các phần khác.
* Tập trung vào một nhiệm vụ khác nên không để tâm đến việc phát hiện lỗi. Ví dụ: bạn đang viết test design, test case và có thể vẫn đang tương tác với hệ thống. Nhưng vì chỉ tập trung vào việc chính và bạn có thể bỏ lỡ các bug rất hiển nhiên, dễ để thấy được.
* Những bug hiển nhiên, dễ dàng để thấy được thì đôi khi nhiều kiểm thử viên nghĩ đã được phát hiện trước khi mình thấy được.
* Kiểm thử theo cùng một phương pháp và lặp đi lặp lại nhiều lần với một tính năng.

**Bạn có thể làm gì để ngăn chặn điều đó?**
* Hãy tập để là một “multi-tasking” tester, luôn có nhạy cảm trong việc phát hiện bug, để không bỏ qua những bug nhỏ nhất.
* Bạn cũng có thể thử tiếp cận hệ thống từ một góc nhìn khác, áp dụng các kỹ thuật khác nhau để kiểm thử.

### 4. Sức ép về thời gian
Nhiều khách hàng muốn ra mắt sản phẩm phần mềm tới thị trường càng sớm càng tốt. Mặt trái của việc này là đội kiểm thử bị áp lực về thời gian khi phải hoàn thành kiểm thử cho kịp deadline. Điều đó đồng nghĩa với việc họ phải làm thêm giờ hoặc chấp nhận bỏ qua một số trường hợp kiểm thử trong đợt release này. Khi đội kiểm thử đang "chạy" để kịp release, họ bỏ qua một số trường hợp, và bug lại tiềm ẩn trong các trường hợp mà họ đã bỏ qua.

**Bạn có thể làm gì để ngăn chặn điều đó?**

* Trên thực tế, giải pháp duy nhất là tìm cách để bạn không cảm thấy bị áp lực dưới sức ép về thời gian, khi đó bạn có thể đảm bảo được chất lượng phần mềm và hạn chế số bug bị bỏ sót. 
* Nếu thời gian bàn giao cố định, hãy giao tiếp nhiều hơn với mọi người để phân tích rủi ro và hạn chế bug ở một số trường hợp kiểm thử đơn giản mà bạn dự định bỏ qua. Trao đổi với leader về tiến độ kiểm thử, những rủi ro có thể gặp phải khi không thực hiện kiểm thử cho trường hợp đó.

### 5. Nhận ra vấn đề nhưng không báo cáo.

Chắc chắn có những lần gặp bug, bạn nghĩ sẽ báo cáo nó sau. Nhưng sau đó chuyển sang một công việc khác, kiểm thử phần khác và rồi “sau” (later) đã trở thành “không bao giờ” (never). Bạn hoàn toàn quên việc báo cáo bug đó.

Trong vài trường hợp khác, nghi ngờ đó là bug và có thể bạn không chắc chắn để báo cáo (ví dụ: Tôi không muốn làm phiền Dev vì chưa chắc nó đã là bug, muốn kiểm tra thêm) hoặc bạn đánh giá mức độ nghiêm trọng của bug đó thấp, người dùng không quan tâm lắm nên đã bỏ qua. Kết quả, bạn quyết định không báo cáo các bug đó. Nhưng bug đó có thể không quan trọng (với bạn, với phần này) nhưng lại là một lỗi nghiêm trọng (với ai đó, với phần khác).

**Bạn có thể làm gì để ngăn chặn điều đó?**

Nếu bạn nghĩ rằng nó là một bug, hãy báo cáo (tất nhiên, luôn luôn giải thích lý do tại sao bạn cho rằng đó là một lỗi). Đó là một hành động cần thiết mà người kiểm thử nên thực hiện thường xuyên hơn. Và báo cáo càng sớm càng tốt khi phát hiện vấn đề.

### Kết luận
Là một kiểm thử viên, việc của chúng ta là kiểm thử và cung cấp sản phẩm giá trị, chất lượng cho người quản lý sản phẩm phần mềm. Trong một số trường hợp, kiểm thử viên đóng vai trò là cánh cổng cuối cùng để đánh giá chất lượng sản phẩm trước khi bàn giao cho khách hàng. 

Ở đây, có điểm quan trọng cần lưu ý: Bỏ qua bug là không tốt, có thể gây nhiều hậu quả nghiêm trọng. Nếu có xảy ra, hãy cùng xem xét quá trình kiểm thử, rút ra bài học để ngăn chặn việc đó xảy ra lần nữa.

Tài liệu tham khảo :
https://www.asktester.com/5-simple-reasons-missed-bugs-prevent/