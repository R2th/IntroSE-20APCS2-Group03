*Bài viết được dịch từ DEV.to. Truy cập bài viết gốc: **[Grow up](https://dev.to/macsikora/grow-up-20c5)**.*

Vừa qua mình có đọc được một bài viết chia sẻ kinh nghiệm của một dev trên trang DEV.to rất hay và đâu đó thấy hình ảnh của bản thân phảng phất trong những khuyết điểm được đề cập. Mình xin dịch lại bài viết để cùng chia sẻ và nghiền ngẫm những ý hay trong bài.

----
![](https://res.cloudinary.com/practicaldev/image/fetch/s--zsEfoLTz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/lfvlu9hib7j4x2ucjw1u.jpg)
Những quan điểm cứng nhắc về những thứ không đáng, đây là điều đang diễn ra trong cộng đồng developer. Tab vs space, React vs Angular, JS vs TS, Python vs PHP, OOP vs FP. Đó là một vài ví dụ, chúng ta hay nói công nghệ mà mình chọn là tốt hơn, giải pháp mà mình đưa ra là đỉnh nhất, phải... nhưng không hẳn là đúng.

## Code của tui tốt hơn
Code của tui tốt hơn bạn, nhưng tốt hơn nghĩa là gì? Chẳng phải đó chỉ là lời tuyên bố chủ quan? Nếu bạn viết 'vòng for' lại thành 'reduce' chỉ vì bạn không thích nhìn thấy nhiều vòng lặp, thì việc đó cũng chả liên quan gì đến mục tiêu của dự án. Tất cả những bài viết có tiêu đề dạng như - "Đừng bao giờ dùng x" hay "Ngưng sử dụng y". Để làm gì? Để cho mọi người thấy quan điểm của bạn tốt hơn họ. Có gì chứng minh? Không, chỉ là những ví dụ để cho thấy sự khác biệt trong một khía cạnh nào đó, phù hợp với người đó mà thôi. Không có lý do gì để bảo người khác nên 'return sớm' thay cho việc dùng 'else', không có lợi ích gì cho việc sửa code chỉ vì nó đang dùng switch, thay vì sử dụng những cú pháp cao siêu. Nếu bạn nghĩ code của bạn là hoàn hảo - bạn chưa trưởng thành.

## Mô hình cho mọi vấn đề
*(phần này hơi quá tầm hiểu biết nên mình dịch có thể sai ý)*

Tôi quan sát thấy có những người đang cố gắng thể hiện cho cộng đồng lập trình rằng FP là một mô hình tốt hơn những cái khác, và những cái khác đó không đáng thử. Hầu hết những chương trình đang hoạt động và được bảo trì trong các ngành công nghiệp và xã hội này được viết bằng kiểu lập trình mệnh lệnh. Bạn nói lập trình mệnh lệnh là sai - bạn chưa trưởng thành.
> **Ghi chú:** Không phải tôi đang nói FP sai, mà chỉ là không lý tưởng, không phải là giải pháp hoàn toàn cho mọi vấn đề.

## Static vs dynamic
*(Ngôn ngữ static: C, C++, C#, Java, Go, Rust...; ngôn ngữ dynamic: JavaScript, Python, PHP...)*

Không có khác biệt gì giữa kiểu static và kiểu dynamic. Có người nói - tôi không cần kiểu static, chả có lợi ích gì khi sử dụng. Có người lại nói - kiểu dynamic chỉ có một dạng, và dễ bị lỗi mà mình chả làm gì được. Cá nhân tôi thích ngôn ngữ kiểu static, nhưng tôi thấy được sự đánh đổi, đó là ngôn ngữ kiểu static muốn đạt được độ biểu đạt tốt cần phải tạo những cách rất phức tạp để tạo sự đa hình (ví dụ như Haskell typeclass). Một ví dụ về thứ không thể được biểu đạt trong các ngôn ngữ kiểu static là - transducer(?). Ngôn ngữ kiểu dynamic cũng có một số lợi ích rõ ràng như viết những chương trình nhỏ, cho phép phát triển nhanh chóng. Mặt khác, ngôn ngữ kiểu static cung cấp những công cụ cho việc bảo trì code mà không phải lo. Bạn nói kiểu static vô dụng - bạn chưa trưởng thành. Bạn nói kiểu dynamic không có đất dung thân - bạn cũng chưa trưởng thành.

## Mọi người phải chơi theo luật của tui
Dự án mới, hãy tuân theo luật của tui. Rất phổ biến việc các senior developer tham gia vào một dự án,  thay vì hiểu rõ codebase hiện tại và tại sao lại viết code như vậy, họ hay nói - phải viết lại, hoặc - code sai bét vì không dùng thư viện x. Hãy nhớ tư duy phản biện có lợi, còn tư duy bác bỏ thì có hại. Nếu bạn muốn viết lại code của người khác, chỉ vì bạn không muốn hiểu nó - bạn chưa trưởng thành.

## Ngôn ngữ mà tui chọn là số 1
Mọi công nghệ đều có ưu điểm lẫn khuyết điểm. Một số ngôn ngữ, thư viện sẽ phù hợp với mình trong một số trường hợp nhất định. Thường thì chúng ta hay chọn những thư viện, ngôn ngữ mà mình đã quen thuộc. Và việc đó ok thôi. Nếu tiếng mẹ đẻ của bạn là tiếng Ba Lan, mặc dù tiếng Ba Lan là một ngôn ngữ khó, và bạn dễ diễn đạt bằng tiếng Ba Lan hơn là tiếng Anh, điều đó không có nghĩa là tiếng Ba Lan vốn dĩ tốt hơn trong việc diễn đạt, nó chỉ phù hợp trong tình huống của bạn mà thôi. Nếu bạn chọn Node.js cho server của mình, chỉ vì bạn có 1 team chuyên JS, cũng ok thôi, nhưng đừng nói dối rằng bạn chọn Node.js vì nó là công nghệ server side tốt nhất. Nếu bạn nói ngôn ngữ mà bạn chọn là số 1 - bạn chưa trưởng thành.

## Ngôn ngữ lập trình thực thụ
PHP không phải là ngôn ngữ lập trình. Tại sao PHP không phải trong khi Python lại phải? Chỉ khác nhau về cú pháp, cả 2 đều vẫn biễu diễn các giải thuật. Chúng ta có thể khách quan nói Python được thiết kế tốt hơn, cú pháp đẹp hơn, nhưng không có nghĩa PHP không phải là một ngôn ngữ lập trình. Nếu bạn nói PHP không phải là một ngôn ngữ lập trình - bạn chưa trưởng thành.

## Lập trình viên thực thụ
Frontend không phải là lập trình. Hiện tại thì ý kiến này không còn phổ biến như trước. Nhưng tôi còn nhớ thời gian mà những developer backend tự hào gọi mình là "lập trình viên thực thụ". Nếu bạn nghĩ vậy - bạn chưa trưởng thành.

## Mọi thứ đều có sự đánh đổi
Hãy suy nghĩ, nhìn nhận những điểm mạnh và điểm yếu, am hiểu chứ đừng quá mê muội công cụ của mình. Mỗi ngôn ngữ có điểm khác biệt, nhưng hầu hết đều thực hiện những việc như nhau. Việc ghét hay thích không phải là việc nên làm, làm vậy không giúp bạn làm việc tốt hơn đâu. Chỉ làm với một ngôn ngữ trong 10 năm cũng vậy. Hãy thay đổi, cả ngôn ngữ, lẫn đomain, học hỏi từ những người khác, bạn là senior trong JS, tuyệt, nhưng đừng sợ khi là một junior Java developer, thay đổi giúp bạn trở thành một lập trình viên tốt hơn, mở mang hơn.

## Áp dụng những quy tắc đã thống nhất
Code cần phải nhất quán, các dự án nên có những quy tắc, và mọi người nên tuân theo những quy tắc này. Nếu chúng ta đồng ý sử dụng các kỹ thuật FP như map và reduce, hãy sử dụng chúng, nếu chúng ta đã thống nhất các quy ước coding, hãy tuân thủ, nếu chúng ta cần unit test, hãy thực hiện, cho dù bạn không thấy lợi ích gì. Nếu những quy tắc cần sửa đổi, hãy ngồi xuống, thảo luận, đề xuất ý kiến, đừng gò ép. Một vài thành viên team có thể không thoải mái với những gì mà bạn thấy thoải mái, bạn cần giúp họ, đưa họ lên cùng level với bạn. Nhưng cũng có thể có lúc bạn cần phải gác ý kiến của bạn, vì lợi ích của cả team.

## Hãy tạo ảnh hưởng tích cực
Không bảo vệ quan điểm không có nghĩa bạn không quan tâm đến chất lượng code hay đồng ý với những giải pháp tệ. Bạn vẫn thấy được code nào dở, code nào tốt, bạn vẫn refactor code dở, bạn vẫn cố gắng hướng tới những giải pháp tốt hơn. Điều khác biệt là quyết định của bạn không lệ thuộc một cách phiến diện một framework mà bạn biết, những cái phổ biến hay giải pháp mà bạn thích và hay dùng. Mà quyết định của bạn đựa trên kiến thức và kinh nghiệm. Bạn nhìn thấy được sự đánh đổi. Nếu quyết định của bạn dựa trên kinh nghiệm, bạn có thể diễn đạt và lý giải tại sao ý tưởng của bạn tốt mà không phải gò ép ai làm theo.


Bài đăng này được viết cho bản thân tôi ở quá khứ. Phải, tôi là một developer với nhiều quan điểm cứng nhắc. Tôi đã phải mất rất nhiều thời gian để hiểu rằng thái độ như vậy làm tôi yếu kém. Tôi mong là bạn sẽ nhận ra sớm hơn tôi. Và cuối cùng, cũng nhớ rằng, luôn có một vài đồng nghiệp cùng làm lập trình của bạn sẽ không bao giờ trưởng thành.

----
@khangnd<br>[![Github](https://images.viblo.asia/20x20/81dd12f0-a8c9-403f-ae51-27b92828ca22.png)](https://github.com/khang-nd) [![Linkedin](https://images.viblo.asia/20x20/4981766e-5e57-401a-8623-d3657a3148e5.png)](https://www.linkedin.com/in/khangnd/) [![Dev.to](https://images.viblo.asia/20x20/3921db2e-e4e5-45d7-acc8-e8b92e02d47d.png)](https://dev.to/khangnd) [![Fandom](https://images.viblo.asia/20x20/fad64df3-0be8-4481-b810-8995f18f71ea.png)](https://dev.fandom.com/wiki/User:KhangND)