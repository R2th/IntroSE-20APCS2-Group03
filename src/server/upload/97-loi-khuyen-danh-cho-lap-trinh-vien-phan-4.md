Bạn có thể xem bài viết gốc của mình tại đây: https://phucluong.com/97-loi-khuyen-danh-cho-lap-trinh-vien-phan-4/

## Điều 16 – A Comment on Comments – Ghi chú trong code của bạn
Trong môn học lập trình đầu tiên của tôi thời đại học, có lần giáo viên đưa cho chúng tôi 2 tờ giấy (coding sheet) và yêu cầu chúng tôi viết code bằng ngôn ngữ BASIC trên giấy. Yêu cầu đề bài khá đơn giản: “viết chương trình cho phép nhập vào 10 điểm số của một ván bowling và tính trung bình”. Tôi không nhớ chính xác khi ấy tôi chọn phương án nào, nhưng đoạn code không thể dài quá 15 dòng được. Tôi đã khá bối rối không hiểu vì sao giáo viên lại đưa đến tận 2 tờ giấy trong khi bài tập quá đơn giản? Nhưng mặc kệ, vì chữ viết của tôi không được đẹp lắm nên tôi dùng tờ thứ 2 để chép lại bài làm của tôi ở tờ thứ nhất một cách cẩn thận và tỉ mỉ hơn, với hi vọng giáo viên sẽ chấm điểm cao hơn nhờ “vở sạch chữ đẹp”.

Tuy nhiên, khi nhận được kết quả, tôi đã vô cùng ngạc nhiên vì điểm số tôi nhận được chỉ “vừa đủ đậu”. Và giáo viên để lại một nhận xét ngắn gọn ngay bên trên mớ code “đẹp đẽ” của tôi: “No comments?”

Bài tập này đã dạy cho tôi một bài học rằng, dù bạn và giáo viên đều hiểu mục đích của đoạn code ấy, không có gì đảm bảo là những lập trình viên khác cũng sẽ hiểu như bạn, và bạn phải viết code làm sao để nó tự toát ra ý nghĩa và mục đích của nó. Đó là bài học mà tôi không bao giờ quên.

Viết comments trong code không có gì là sai cả. Nó cũng cơ bản và cần thiết như những câu lệnh if hay for trong các ngôn ngữ lập trình vậy. Có những công cụ có thể tự xây dựng nên API document chỉ dựa trên các comment (theo chuẩn quy định của công cụ ấy) trong code của bạn. Tuy nhiên như vậy vẫn chưa đủ, bạn cần viết comment giải thích mục đích của code của mình. Hãy nhớ lấy điều này: “Nếu bạn thấy việc diễn giải code của bạn là khó khăn, thì việc người khác (hoặc chính bạn) đọc hiểu được đoạn code đó sẽ càng khó khăn hơn”.

Tuy nhiên, đừng vì thế mà muốn viết comment thế nào cũng được. Hãy tránh viết lan man và thậm chí làm cho người đọc càng khó hiểu hơn so với đọc code. Trong một hàm, bạn có thể viết comment ở đầu hàm để giải thích mục đích và cách dùng nó, và ở các dòng code bên trong, bạn có thể diễn giải chi tiết hơn để người lập trình sau này có thể hiểu và bảo trì chúng.

## Điều 17 – Comment Only What the Code Cannot Say – Chỉ nên viết comment cho những phần mà ngay cả đọc code cũng thấy khó hiểu.
Người ta thường khuyên rằng việc viết comment trong code là rất hữu ích. Lý thuyết đúng là như vậy, comment giúp giải thích code rõ ràng hơn, người đọc sẽ dễ hiểu các đoạn code hơn là chỉ đọc code mà không có comment. Tuy nhiên, thực tế cho thấy rằng việc viết comment có thể sẽ phản tác dụng. Cũng như những kĩ năng về viết lách khác, việc viết comment cũng đòi hỏi kĩ năng của lập trình viên. Tuy nhiên, có một kĩ năng chúng ta cần lưu ý là “biết khi nào KHÔNG nên viết comment”.

Hãy tưởng tượng nếu code bị lỗi cú pháp, IDE sẽ phát hiện ra ngay. Hoặc nếu có lỗi về chức năng, sớm hay muộn những lỗi đó cũng sẽ bị phát hiện (thông qua code review, test, khách hàng báo lỗi…). Tuy nhiên, một comment dù chất lượng hay kém chất lượng, có khả năng sẽ nằm lại trong code một thời gian rất dài. Những comment kém chất lượng sẽ như rác trong code của bạn, nó có thể gây hiểu sai vấn đề khi bạn cố gắng đọc hiểu chúng, làm cho hiểu biết của bạn bị ảnh hưởng và lạc lối.

Nếu một comment không sai về mặt kĩ thuật, nhưng cũng không có ích gì thêm cho code cả, thì những comment này hoàn toàn không cần thiết. Comment mà chỉ lặp lại những gì code đã trình bày rõ ràng, hay chỉ đơn thuần là diễn đạt lại bằng ngôn ngữ tự nhiên của “loài người”, thì cũng không làm nó đúng hơn hoặc chân thật hơn code được. “Code bị comment” (commented-out code) cũng vậy, nó là đoạn code bị ẩn dưới danh nghĩa comment, và tất nhiên nó không chạy được. Những “commented-out code” đó sẽ rất nhanh chóng bị lỗi thời, không còn hợp với ngữ cảnh mới, và có khả năng trong tương lai sẽ bị xóa bởi một ai đó mà thôi. Nếu bạn chỉ muốn giữ lại nó để tham chiếu, thì các công cụ version control đã hỗ trợ tốt việc đó rồi.

Giống như câu chuyện “cậu bé chăn cừu”, nếu comment rác quá nhiều, các lập trình viên sẽ dần mất niềm tin vào comment và sẽ không muốn đọc bất cứ comment nào nữa, vì họ sợ sẽ bị hiểu sai, bị phân tâm, hay tốn thời gian vô ích. Thậm chí, họ có thể chỉnh IDE của họ để tự động ẩn comment, hay đổi màu comment để biến mất (trùng màu với background chẳng hạn)… Những việc này hoàn toàn không nên làm vì nó sẽ hình thành một thói quen xấu cho chúng ta. Và để tránh những lập trình viên phải làm như vậy, chúng ta cần giải quyết vấn đề từ gốc rễ là tăng chất lượng comment và tránh những comment không hữu ích. Nếu một comment không giúp tăng thêm giá trị gì cho code hay cho người đọc nó, xóa nó ngay.

Vậy comment chất lượng là thế nào? Comment nên được viết để toát ra những ý nghĩa, mục đích của code nếu như việc đọc code sẽ vô cùng khó hiểu. Tuy nhiên, nếu chỉ viết comment để giải thích về cấu trúc code hay chuẩn coding, thì tốt nhất chúng ta hãy cấu trúc lại code (refactor) luôn thay vì để lại những comment ấy. Ví dụ, thay vì viết comment để giải thích một tên hàm khó hiểu, hãy đặt lại tên hàm ấy. Hay thay vì viết comment để giải thích một hàm dài, hãy tách nhỏ hàm ấy ra thành nhiều hàm nhỏ với những tên hàm phù hợp. Nói tóm lại, hãy cố gắng dùng code để giải thích mọi thứ nhiều nhất có thể. Nếu trong code có những tầng ý nghĩa sâu xa và không thể tự nó toát lên những ý nghĩa ấy, thì đó là lúc hợp lý để viết comment, đừng viết comment chỉ vì bạn lười refactor code.

## Điều 18 – Continuous Learning – Liên tục học hỏi và cập nhật kiến thức
Ngày nay, lập trình viên có ở khắp mọi nơi, và một người ở quốc gia này vẫn có thể làm việc từ xa cho một công ty ở quốc gia khác. Điều đó có nghĩa là mức độ cạnh tranh trong nghề của chúng ta cũng tăng lên đáng kể. Trong cái ngành mà công nghệ liên tục thay đổi và phát triển đi lên, nếu bạn không liên tục cập nhật kiến thức và kĩ năng của mình, bạn sẽ nhanh chóng trở nên lạc hậu và không còn được săn đón như thời đỉnh cao của sự nghiệp nữa, mức thu nhập của bạn cũng sẽ đi xuống hoặc thậm chí bị đào thải.

Ở một số công ty, họ sẽ rất sẵn lòng đầu tư để bạn được tham gia các khóa học hoặc có nhiều cách khác nhau để bạn tự phát triển bản thân. Nhưng một số công ty khác thì lại không. Tốt nhất là bạn vẫn nên chủ động thay vì chờ đợi cơ hội đến với mình một cách thụ động.

Một số cách bạn có thể tham khảo:

* Đọc sách, blog, Twitter feeds, website, youtube… Bạn cũng có thể tham gia hoặc đăng kí vào các mailing list để nhận những thông tin mới nhất về các vấn đề mà bạn quan tâm.
* Nếu bạn muốn đào sâu hơn về công nghệ nào, hãy bắt tay vào việc viết code thay vì chỉ dừng ở việc học.
* Bạn có thể học một ngôn ngữ lập trình mới, một công cụ mới, một framework mới… vào mỗi năm. Bằng cách ấy, bạn có thể mở rộng được tuy duy của mình cũng như giúp bạn có nhiều kiến thức mới mẻ.
* Hãy tìm cho mình một người mentor giỏi để có thể định hướng và giúp đỡ bạn. Tất nhiên là bạn có thể học hỏi từ bất kì ai, nhưng bạn sẽ học được rất nhiều từ những người thông minh hoặc có nhiều kinh nghiệm hơn bạn.
* Bạn cũng có thể tìm cho mình một người mentor ảo, nghĩa là những người có viết sách, viết blog hay các video dạy học. Hãy subscribe các kênh của họ.
* Khi bạn chọn sử dụng framework hoặc thư viện nào, hãy tìm hiểu kĩ về nó vì khi bạn hiểu cách nó hoạt động thế nào, thì bạn sẽ biết cách sử dụng nó sao cho hiệu quả. Và đặc biệt hơn nếu đó là mã nguồn mở, bạn sẽ có cơ hội để debug code của họ, và học hỏi được rất nhiều từ những người tài giỏi ấy.
* Đừng bỏ qua những thông báo lỗi hoặc cảnh báo lỗi (warning) từ các công cụ hỗ trợ quét code hoặc IDE của bạn, mà hãy tìm cách phân tích và hiểu rõ những lỗi ấy.
* Mỗi khi bạn phạm sai lầm gì đó, hoặc khi fix bug, hoặc gặp một vấn đề nào đó, hãy cố gắng hiểu đúng bản chất của chúng thay vì chỉ đi tìm giải pháp tạm thời để giải quyết nhanh vấn đề. Thông thường, những lỗi chúng ta gặp khả năng cao là người khác cũng đã từng gặp, nên bạn có thể tìm kiếm thông tin trên Google, tuy nhiên cũng đừng quên xem xét kĩ những giải pháp bạn tìm thấy được nhé.
* Một cách khác khá hữu ích để học một thứ gì đó là hãy tìm cách truyền đạt hoặc trò chuyện với người khác về chúng. Khi có người lắng nghe bạn, họ có thể sẽ đặt câu hỏi, và các bạn sẽ vừa trao đổi vừa động não để diễn đạt vấn đề, đôi khi bạn cũng sẽ nhận được những lời khuyên hoặc kiến thức bổ ích từ những người đang lắng nghe bạn. Bạn có thể tạo một buổi nói chuyện vào buổi ăn trưa, hoặc một nhóm bạn, nhóm đồng nghiệp để cùng chia sẻ kiến thức với nhau.
* Bạn cũng nên đến các buổi hội thảo, diễn thuyết, chia sẻ về công nghệ hoặc những đề tài bạn quan tâm. Nếu bạn không thể đến đó, thì bạn cũng có thể tham gia online (nếu được).
* Bạn không nhất thiết chỉ tập trung học về công nghệ. Bạn cũng nên học về lĩnh vực của sản phẩm mà bạn đang làm việc (ví dụ như y tế, giáo dục, giải trí…). Hoặc bạn cũng nên học về các kĩ năng mềm nữa vì chúng sẽ giúp cho bạn rất nhiều.
* Quay trở lại trường học.

## Điều 19 – Convenience Is Not an -ility – Sự thuận tiện không nên là cái cớ để bào chữa cho thiết kế của bạn
Khi bạn thiết kế API, hoặc xây dựng các class, thật khó để có được một thiết kế “tốt” ngay từ ban đầu. Và ngay cả khi đã hoàn thành, cũng sẽ thật khó để thay đổi nó trong tương lai. Có rất nhiều lời khuyên được chia sẻ từ những lập trình viên có kinh nghiệm, ví dụ như việc đảm bảo tính nhất quán, trừu tượng, đối xứng… ở một phạm vi nào đó. Tuy nhiên, trong lời khuyên này, tôi muốn thảo luận một vấn đề mà tôi gặp rất thường xuyên: tranh cãi về “sự thuận tiện”. Hãy thử tham khảo đoạn code này:
``` javascript
walk(true);
```
Nếu không đọc code bên trong của hàm walk hoặc đọc document về nó, thì chắc hẳn bạn sẽ không biết true ở đây là gì đúng không.

``` javascript
function walk(shouldRun) {
  // ...
  if (shouldRun) {
    // run instead of walk
  }
}
```
Hóa ra true là một cái cờ để điều hướng việc “walk” chuyển sang “run”. Có thể bạn sẽ thấy việc này khá hiển nhiên, developer nào lại thiết kế tệ thế. Nhưng thực tế việc này diễn ra rất thường xuyên với những tình huống “không hiển nhiên” cho lắm, và developer tại thời điểm đó cảm thấy rất hài lòng với thiết kế của mình vì tính “thuận tiện” trong thiết kế của mình. “Tại sao lại phải tách một tác vụ thành 2 hàm trong khi một hàm thôi cũng có thể làm được rồi, tiện quá chứ còn gì nữa”. Tất nhiên sự thuận tiện bản chất là không hề sai nếu nó được dùng trong những tình huống phù hợp. Tuy nhiên khi thiết kế API, điều cơ bản là những API này cần ẩn dấu những xử lý phức tạp bên dưới, chứ không phải đưa ra những sự phức tạp ra bên ngoài gây hoang mang cho người sử dụng (những lập trình viên khác).

Lần tới, nếu bạn có ý định gom nhiều thứ vào trong một hàm (hay API endpoint), hãy nhớ rằng trong tiếng Anh không hề có một từ nào mang ý nghĩa là MakeUpYourRoomBeQuietAndDoYourHomeWork, mặc dù chuỗi hành động ấy có thể rất phổ biến.

## Điều 20 – Deploy Early and Often – Deploy sớm và thường xuyên
Thông thường, việc deploy/release hay rơi vào thời điểm dự án gần kết thúc. Ở một số nơi, họ còn giao hẳn công việc ấy cho một người (hoặc một team) chuyên biệt, chứ không phải là các lập trình viên. Điều này dẫn đến việc các thành viên trong nhóm phát triển chẳng hề có kinh nghiệm nào về việc release, hoặc việc release trễ sẽ dễ dẫn đến những vấn đề phát sinh nhưng lại quá muộn để giải quyết.

Chỉ khi nào release, thì khách hàng mới thấy được sản phẩm. Vì thế, hãy thiết lập một quy trình, công cụ, kiến thức về việc release ngay từ ban đầu, để giúp đội phát triển có một môi trường ổn định và tin cậy khi phát triển sản phẩm. Một lợi ích khác là khi phát triển sản phẩm, chúng ta sẽ biết ngay là code của chúng ta có gây lỗi release hay không, hay có thể phát hiện ra những vấn đề trong release sớm hơn để có thể khắc phục và tối ưu thời gian release, tránh những chủ quan từ phía lập trình viên rằng code của chúng ta sẽ chạy tốt trên môi trường production thôi (dù cả năm trời chưa release một lần nào). Dần dà, tất cả mọi người trong nhóm phát triển sẽ đều có những kinh nghiệm về công việc này.

Nếu việc deploy được thực hiện muộn màng, có khả năng những vấn đề về deploy, hệ thống, tương thích… sẽ phức tạp hơn rất nhiều và cũng sẽ lấy không ít thời gian và công sức của bạn. Đừng nghĩ rằng code của bạn chạy rất ổn ở môi trường local, với sự hỗ trợ tận răng của IDE, thì việc release lên production cũng sẽ dễ dàng và nhanh chóng như vậy.

Một nhận định mà tôi cho là sai lầm, rằng việc “deploy sớm không mang lại lợi ích thiết thực nào cho user cả, vì có khi deploy để đó thôi chứ đã có user dùng đâu”. Tuy nhiên, tôi cho rằng không cần biết bạn đã xây dựng sản phẩm của bạn đến giai đoạn nào rồi, chỉ đến khi nào bạn có thể deploy nó lên một môi trường thật sự, thì những lợi ích thiết thực mới bắt đầu lộ diện. Nếu bạn cho rằng việc deploy sớm đó không khó khăn gì mấy, “đơn giản thôi mà, làm sau cũng được”, thì hãy làm ngay đi vì chi phí của nó không hề cao. Còn nếu nó phức tạp và có nhiều điều chưa chắc chắn, thì hãy bắt tay vào các thử nghiệm, đánh giá, tái cấu trúc lại quy trình release của bạn.