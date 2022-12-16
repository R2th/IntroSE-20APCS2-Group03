Comment có thể giúp đỡ rất tốt nếu đặt đúng vị trí, nhưng nó cũng có thể trở nên tồi tệ, gây nhiễu loạn không tin khi đặt sai hay cung cấp thông tin không chính xác.

Sử dụng comment như một sự bù đắp cho thất bại trong việc thể hiện code. Comment luôn luôn là thất bại. Chúng ta phải sử dụng nó vì chúng ta không thể luôn luôn tìm ra cách đề thể hiện code ra, nhưng sử dụng nó không phải là một nguyên nhân đáng để ăn mừng.

Điều tin tưởng tuyệt đối nhất là: Code. Chỉ có Code mới nói cho chúng ta biết chính xác nhất nó đang làm gì. Mặc dù đôi khi bình luận là cần thiết, nhưng chúng ta sẽ tiêu hao đáng kể năng lượng cho việc giảm thiểu chúng.

# Comments Do Not Make Up for Bad Code (Comment không dùng để trang trí cho mã xấu)
Một trong những động lực phổ biến thúc đẩy việc viết comment là mã xấu. Chúng ta viết một module và chúng ta biết rằng nó lộn xộn và vô tổ chức. Chúng ta biết nó bữa bộn. Nên chúng ta nói với chính mình "Ohh, tôi nên bình luận nó!" Không! Bạn nên dọn dẹp nó!

Dọn dẹp và diễn đạt code cùng với một vài bình luận tốt hơn nhiều là code lộn xộn cùng với một đống comment. Thay vì dành thời gian cho việc viết bình luận cho một đống lộn xộn, bạn nên dọn dẹp nó.

# Explain Yourself in Code
Code chắc chắn là lời giải thích tốt nhất. Trong nhiều trường hợp, thay thế code nghèo nàn bằng cách tạo ra những hàm mới đã nói lên đủ những lời comment mà bạn muốn viết dành riêng cho đoạn code nghèo nàn đó.

# Good Comments
Một số comment là cần thiết hoặc có lợi ích.
### Legal Comments (Bình luận pháp lý)
Điều này tùy thuộc vào tiêu chuẩn viết code của công ty. Ví dụ: Bản quyền và quyền tác giả là điều cần thiết và hợp lý để đưa vào comment lúc bắt đầu của mỗi tập tin mã nguồn.

Nếu có thể, hãy tham khảo tới một giấy phép tiêu chuẩn hay một tài liệu ở bên ngoài hơn là đặt tất cả các điều khoản và điều kiện pháp lý vào trong comment.
### Informative Comments (Bình luận thông tin)
Đôi khi khá là hữu dụng khi cung cấp những thông tin cơ bản với một bình luận.

```
// Returns an instance of the Responder being tested.
protected abstract Responder responderInstance();
```
Một bình luận như vậy đôi khi khá là hữu ích, tuy nhiên tốt hơn hết là nên truyền tải thông tin thông qua tên của function nếu có thể. (responderBeingTested.)
```
// format matched kk:mm:ss EEE, MMM dd, yyyy
Pattern timeMatcher = Pattern.compile(
"\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*");
```
Trong trường hợp này bình luận nhằm cho chúng ta biết định dạng về thời gian trong hàm SimpleDateFormat.format với một chuỗi xác định. Tuy nhiên, nó vẫn có thể được làm tốt hơn, rõ ràng hơn nếu mã này được chuyển sang một class đặc biệt với mục đích chuyển đổi định dạng thời gian. Sau đó, những comment có thể không cần thiết nữa.
### Explanation of Intent (Giải thích về mục đích)
Đôi khi một lời bình luận còn vượt xa hơn cả mong đợi thông tin hữu ích về việc thực hiện và cung cấp mục đích đằng sau một quyết định.
### Clarification (Làm sáng tỏ)
Dịch ý nghĩa của các lập luận khó hiểu, hoặc trả lại một giá trị rõ ràng ở bên phải chính nó. Nhưng chỉ khi một phần thư viện chuẩn hoặc trong code mà bạn không thể thay đổi được, một bình luận Clarifying có thể hữu ích.
```
{
   WikiPagePath a = PathParser.parse("PageA");
   WikiPagePath ab = PathParser.parse("PageA.PageB");
   WikiPagePath b = PathParser.parse("PageB");
   WikiPagePath aa = PathParser.parse("PageA.PageA");
   WikiPagePath bb = PathParser.parse("PageB.PageB");
   WikiPagePath ba = PathParser.parse("PageB.PageA");

   assertTrue(a.compareTo(a) == 0); // a == a
   assertTrue(a.compareTo(b) != 0); // a != b
   assertTrue(ab.compareTo(ab) == 0); // ab == ab
   assertTrue(a.compareTo(b) == -1); // a < b
   assertTrue(aa.compareTo(ab) == -1); // aa < ab
   assertTrue(ba.compareTo(bb) == -1); // ba < bb
   assertTrue(b.compareTo(a) == 1); // b > a
   assertTrue(ab.compareTo(aa) == 1); // ab > aa
   assertTrue(bb.compareTo(ba) == 1); // bb > ba
}
```
Thực tế nó là một rủi ro, clarifying comment là không chính xác. Clarification là cần thiết và nó cũng đầy rủi ro. Vì vậy, trước khi viêt bình luận như vậy hãy quan tâm xem có cách nào tốt hơn không, và sau đó dành nhiều quan tâm hơn để lựa chọn đúng đắn nhất.
### Warning of Consequences (Cảnh báo về các hậu quả)
Cảnh báo những lập trình viên khác về những hậu quả nhất định. Ví dụ, giải thích lý do tại sao một test case cụ thể bị tắt đi:
```
// Don't run unless you
// have some time to kill.
public void _testWithReallyBigFile()
{
   writeLinesToFile(10000000);
   response.setBody(testFile);
   response.readyToSend(this);
   String responseString = output.toString();
   assertSubString("Content-Length: 1000000000", responseString);
   assertTrue(bytesSent > 1000000000);
}
```
Có thể bạn phàn nàn rằng có những cách tốt hơn để giải quyết vấn đề này. Về điều này hoàn toàn đồng ý với bạn. Nhưng bình luận được đưa ra ở đây là hoàn toàn hợp lý. Nó ngăn chặn một số lập trình viên khác
### TODO Comments
TODO là những công việc mà lập trình viên nghĩ là nên làm, nhưng vì một số lý do mà chưa thể làm ở hiện tại. Nó có thể là một lời nhắc nhở về việc xóa một tính năng bị phản đối, một lời bào chữa cho ai đó khi nhìn vào vấn đề. Nó có thể là một yêu cầu dành cho ai đó để nghĩ ra một cái tên hay hơn, hay nhắc nhở về một sự thay đổi nào đó cho sự kiện đã được lên kế hoạch từ trước. Bất kể sử dụng TODO như thế nào nó cũng không phải là một cái cớ để để lại mã xấu ở lại trong hệ thống.

Bạn cũng không muốn Code của mình rải rác với TODO ở một vài nơi. Vì vậy nên quét qua chúng thường xuyên và giải quyết những gì bạn có thể.
### Amplification (Phóng đại)
Comment có thể được dùng để khuếch đại một điều gì đó quan trọng mà nó có vẻ như là không quan trọng.