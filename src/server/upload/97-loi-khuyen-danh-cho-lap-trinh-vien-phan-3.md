Bạn có thể xem bài viết gốc của mình tại đây: https://phucluong.com/97-loi-khuyen-danh-cho-lap-trinh-vien-phan-3/

## Điều 11 – Code in the Language of the Domain – Viết code theo ngôn ngữ của sản phẩm
Bạn thấy đoạn code này thế nào?

``` javascript
if (portfolioIdsByTraderId.get(trader.getId())
    .containsKey(portfolio.getId())) {...}
```
Hmm, có phần hơi khó hiểu. Có thể là nó đang lấy mấy cái ID từ trader và portfolio object, rồi sau đó dò tìm trong một cái mảng, có lẽ là Map object, để tìm thông tin liên kết của trader và portfolio. Bạn lần sâu vào code và lại tìm thấy:

``` javascript
Map<int, Map<int, int>> portfolioIdsByTraderId;
```
Không ít thời gian bạn bỏ ra là để cố gắng đọc hiểu logic của đoạn code hiện tại, và lần mò sâu hơn để có cái hiểu tốt hơn đúng không. Ở một thế giới khác, bạn có thể thấy đoạn code như sau:

``` javascript
if (trader.canView(portfolio)) {...}
```

Oh yeah, bạn có nhận ra là mình cũng đã từng thấy hoặc từng viết như vầy rồi đúng không? Đôi khi trong các buổi họp với team, bạn share màn hình và trình bày điều gì đó ngay đoạn code này, ngay cả QA/PO (nói chung là non-dev) cũng sẽ dễ dàng hiểu được đoạn code đang làm gì. Câu hỏi đặt ra là: “Bạn thích và muốn làm việc với phong cách nào hơn?”

Ngày xưa, khi cấu trúc dữ liệu sơ khai chỉ có bit, bytes và characters, ngành khoa học máy tính đã phát triển chóng mặt để đưa ngôn ngữ lập trình đến gần với con người hơn, dễ đọc dễ hiểu hơn. Bạn có thể đặt các tên biến, tên hàm, tên class, tên model, tên datatable… theo bất cứ thuật ngữ gì bạn muốn. Nếu vậy, tại sao lại không đặt tên cho chúng theo các thuật ngữ chuyên môn của sản phẩm của bạn. Chẳng hạn như nếu bạn làm sản phẩm về giáo dục, hãy đặt tên theo các thuật ngữ của ngành giáo dục…

Và một ngày nào đó, những lập trình viên khác đọc những đoạn code này của bạn, họ sẽ không bị bối rối cũng như mất thời gian để tìm hiểu ý nghĩa của đoạn code giống bạn. Lập trình viên ấy đôi khi có thể là chính bạn trong vài tháng tới đấy.

## Điều 12 – Code is Design – Code là bản thiết kế
Lời khuyên này của tác giả hơi khó hiểu khi đọc lần đầu, nhưng khi đọc lại nhiều lần thì mình cũng hiểu được phần nào thông điệp mà tác giả muốn truyền tải. Mình xin trình bày vắn tắt:

Tác giả giả định rằng trong tương lai sẽ có hàng triệu con robot giá rẻ có thể tự động chế tạo các nguyên liệu với chi phí cực thấp. Chúng sẽ làm thay con người hầu hết mọi việc vì đã được “thiết kế sẵn”. Ở một góc nhìn khác xa hơn, nhờ các mô hình mô phỏng được tạo ra và kiểm thử hết sức khắc khe, chi phí cho việc xây dựng gần như là miễn phí. Nếu thiết kế có vấn đề, không sao cả, chỉ cần tìm hiểu vấn đề ở đâu trong thiết kế, và nhờ robot xây dựng lại. Điều này làm mình nhớ đến những clip trên mạng về việc các kiến trúc sư mô phỏng các căn phòng, tòa nhà trên máy tính trước khi xây dựng thực tế. Hay các máy in 3D, các đồ dùng gia đình, mọi thứ đều được thiết kế bằng các phần mềm đồ họa vi tính. Ngày xưa, vì không có thiết kế tốt từ đầu, việc thiết kế và xây dựng diễn ra đồng thời, dẫn đến việc thiết kế thì dang dở, và sản phẩm hoàn thiệt lại không giống với thiết kế.

Hãy tưởng tượng bạn đang lái một chiếc xe, nhưng nó lại được chế tạo dựa trên một thiết kế không hoàn chỉnh và chắp vá, và bạn sẽ phải liên tục đưa nó đến nhà sản xuất để sửa chữa. Tất nhiên chúng ta không hề muốn lái một chiếc xe mà nó lại có những lỗi có thể ảnh hưởng đến tính mạng của chúng ta. Vì thế, nhờ vào một thị trường cạnh tranh năng động, các công ty dần chuyển dịch sang việc đầu tư cho thiết kế và thúc đẩy việc hoàn thành sớm các bản thiết kế của mình. Tuy nhiên, với những người không hiểu tầm quan trọng của thiết kế, sẽ thấy việc làm này là vô bổ, tốn thời gian, và cho rằng “thiết kế hiện tại trông có vẻ ổn rồi đấy”.

Tương tự trong lĩnh vực phần mềm của chúng ta. Code không phải chỉ là những dòng mã nguồn để xây dựng nên một sản phẩm phần mềm, mà nó còn là những bản thiết kế đầy tính sáng tạo và chất xám bên trong. Một thiết kế sẽ phải được kiểm thử tự động nghiêm ngặt, đảm bảo nó phải vượt qua tất cả các thử thách. Tuy nhiên, để có một thiết kế tốt (hay code tốt) đòi hỏi người tạo ra nó cũng giỏi giang không kém.

## Điều 13 – Code Layout Matters – Code layout cũng quan trọng
Có nghiên cứu chỉ ra rằng thời gian chúng ta thực sự gõ code khá ít, so với thời gian mà chúng ta ngồi đọc hiểu code, lần mò giữa các file code, các dòng code, các hàm, các class… Vậy thì chúng ta hãy tìm cách làm cho code của chúng ta thật “dễ nhìn” và “gọn gàng”, khi đó công sức bỏ ra để đọc hiểu và mò mẫm cũng sẽ giảm đáng kể. Có 3 thứ mà bạn có thể làm tốt hơn:

* Easy to scan – hãy quy định những chuẩn coding (convention) cho mình và cho team của bạn. Khi các đoạn code đều có cùng một format, việc đọc hiểu code sẽ nhanh hơn và khả năng tìm ra điểm khác biệt giữa 2 đoạn code “na ná” nhau cũng dễ dàng hơn.
* Expressive layout – chúng ta thường cố gắng viết code một cách rõ nghĩa, thông qua việc đặt tên biến, tên hàm, hay để lại các comment trong code… Code layout cũng là một phần của phương thức giúp code rõ nghĩa. Bạn có thể thống nhất với cả team và sử dụng những công cụ hỗ trợ định dạng code tự động, và có thể chỉnh sửa bằng tay khi cần. Khi ấy, dần dà cả nhóm sẽ quen với việc “nhìn” code theo một format chung, và thói quen viết code theo format của bản thân cũng sẽ thay đổi.
* Compact format – nếu code có thể được gói gọn trên một màn hình – thay vì phải scroll lên xuống liên tục, hay di chuyển qua các file khác nhau – thì sẽ tốt hơn nhiều. Việc hiểu ngữ cảnh cũng như mục đích của code sẽ dễ dàng hơn và chúng ta cũng không cần phải lưu giữ quá nhiều thông tin trong trí nhớ. Ví dụ bạn mở 2 file, và khi xem file A, bạn lưu thông tin vào đầu, sau đó chuyển qua file B, thì bạn sẽ phải lục lại thông tin về file A để có thể tham chiếu hay so sánh với file B. Đôi khi bạn quên, bạn sẽ phải chuyển qua lại 2 file này để gợi nhớ liên tục.

## Điều 14 – Code Reviews – quy trình review code giữa các thành viên
Nếu chưa từng review code của đồng nghiệp, bạn cần thực hiện quy trình đó ngay. Hoặc nếu bạn đã và đang thực hành review code, thì hãy chăm chỉ và duy trì thoái quen tốt này. Tại sao? Bởi vì nó giúp nâng cao chất lượng code cũng như giảm thiểu khả năng gây ra bug của code.

Ở một số công ty, việc review code là một quy trình bắt buộc, và mọi người đều phải tuân theo. Tuy nhiên, có thể vì một số trải nghiệm không hay với code review mà không ít người tỏ ra không thích việc này. Có thể quy trình ở các nơi đó quá cứng nhắc và hình thức, gây ra sự chán nản và “làm cho có” ở các thành viên, hoàn toàn phản tác dụng so với mục đích tốt đẹp mà code review mang lại. Ví dụ, một số người sẽ cảm giác giống như là có một “ban thẩm định chất lượng code” chuyên đi soi mói tìm lỗi sai trong code của mình. Hay việc chờ đợi mòn mỏi những “reviewer” nhấn approve cho code của mình để được cho lên production, làm tắc nghẽn hay trì trệ công việc của bạn.

Tuy nhiên, nếu nhìn ở một khía cạnh khác tích cực hơn, việc code review còn là một công cụ hữu ích để chia sẻ kiến thức lẫn nhau. Hãy để một (hoặc nhiều) thành viên ngẫu nhiên review code của mọi người trong nhóm mỗi khi có Merge request (hay pull request). Và khi review, hãy tránh việc soi mói tìm lỗi, mà hãy cố gắng học tập và hiểu ý nghĩa của chúng. Hãy tỏ ra thân thiện và vui vẻ, dùng những từ ngữ mang tính xây dựng hơn là phán xét/soi mói. Chúng ta có thể phân nhóm những reviewer để giảm áp lực và công sức của họ, ví dụ như người thì chuyên về review các tài liệu, người thì review về các trường hợp ngoại lệ (exception), người thì review về các chức năng được thêm vào/chỉnh sửa.

Mỗi tuần nên có ít nhất một ngày dành cho code review. Có thể dành hẳn một cuộc họp vài tiếng để thực hiện review code, và xoay vòng người sẽ được review trong buổi họp đó mỗi lần như vậy. Đương nhiên chúng ta cũng nên xoay vòng những reviewer và những phạm vi mà họ sẽ review.

Việc code review nên bao gồm cả những bạn junior, fresher (sinh viên mới tốt nghiệp). Tuy ít kinh nghiệm, nhưng họ cũng sẽ có những cái nhìn khác từ kiến thức từ trường học, hoặc có thể là những câu hỏi dành cho chúng ta. Đôi khi việc giải thích, trả lời câu hỏi cho người khác cũng giúp chúng ta nghiệm ra được nhiều điều. Còn một điều nữa, nếu team của bạn có sử dụng các công cụ format code tự động, thì chúng ta có thể để nó làm công việc của nó, và chúng ta không cần phải review những thứ như format code nữa. Những điều đó có thể có ích cho junior, fresher, nhưng với các senior khác thì đôi khi họ sẽ cảm giác bị soi mói.

Tóm lại, hãy tạo ra một môi trường/văn hóa code review trên sự vui vẻ và sẻ chia. Mục đích của nó là để chia sẻ kinh nghiệm và kiến thức lẫn nhau, đừng biến nó thành một công việc mang tính hình thức và buồn tẻ. Nếu không, bạn có thể vô tình làm cho động lực làm việc của các thành viên giảm sút chỉ vì những bình luận, những hiểu nhầm, những xung đột trong quá trình code review.

## Điều 15 – Coding with Reason – Viết code hợp lý
Tác giả muốn khuyên rằng bạn phải luôn luôn tự đặt câu hỏi về code của mình, xem nó đã thực sự tốt chưa, bạn có thực sự hiểu nó chạy thế nào và hiệu quả ra sao chưa… Và khi bạn nghĩ rằng nó đã “tối ưu” rồi, bạn vẫn cứ luôn đặt câu hỏi liệu có cách nào khác “tối ưu” hơn nữa không? Đôi khi câu trả lời không đến ngay lập tức, mà sẽ mất một thời gian dài khi bạn tích lũy nhiều kinh nghiệm hơn, bạn mới nghiệm ra câu trả lời. Có một số công cụ giúp quét qua code của bạn để tìm lỗi hoặc các nguy cơ tiềm ẩn, nhưng không phải lúc nào nó cũng có thể hiểu hết code của bạn, vì vậy bạn vẫn cần phải làm điều đó.

Bạn có thể chia code của mình ra thành nhiều phần nhỏ để dễ dàng đánh giá chất lượng hơn. Hoặc bạn có thể review lại chính code của mình khi bạn vừa hoàn thành một task nào đó. Có rất nhiều những kinh nghiệm lập trình được chia sẻ rộng rãi giúp code của bạn “tốt” hơn và ít rủi ro gây bug hơn:

* Tránh sử dụng goto trong code, vì chúng làm cho code bị ràng buộc lẫn nhau và khó đoán được trình tự vận hành của code.
* Tránh thay đổi giá trị các biến toàn cục, vì những nơi đang sử dụng chúng đều sẽ bị ảnh hưởng. Nói cách khác, hãy tránh sử dụng các biến toàn cục có thể thay đổi được (avoid using modifiable global variables)
* Mỗi biến được tạo ra nên được đặt trong một phạm vi (scope) nhỏ nhất có thể. Ví dụ, ta có thể khai báo biến ngay thời điểm chúng ta bắt đầu sử dụng chúng. Bằng cách này, code sẽ ít bị phân mảnh, và dễ đọc dễ hiểu hơn.
* Cố gắng đưa các đối tượng (object) về trạng thái “không thay đổi được” (immutable) bất kì khi nào thấy cần thiết.
* Phân cách các đoạn code bằng các dòng trắng (empty line) để giúp code dễ đọc hơn.
* Code nên tự nó toát ra ý nghĩa và mục đích của nó thông qua các tên biến, tên hàm… ngắn nhưng rõ nghĩa.
* Nếu bạn có ý định lồng code nhiều cấp với nhau, tốt nhất hãy tạo một function để bọc chúng lại.
* Cố gắng tạo ra những hàm ngắn và đơn giản, chỉ giải quyết một tác vụ mà thôi. Ví dụ, một hàm chỉ nên tối đa 24 dòng. Điều này vẫn đúng đến tận ngày nay.
* Một hàm chỉ nên có ít tham số thôi (tối đa 4). Bạn cũng có thể gom nhóm những param có liên quan với nhau vào cùng một object, và xem nó như một tham số của hàm. Với cách đó, số lượng tham số sẽ ít lại, nhưng vẫn đảm bảo đầy đủ data cần thiết cho hàm. Và một điều tiện lợi khác, là thứ tự của các tham số sẽ không còn là vấn đề nữa khi gom lại trong cùng một object.