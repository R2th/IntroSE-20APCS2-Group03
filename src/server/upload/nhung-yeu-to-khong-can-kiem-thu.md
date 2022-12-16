![](https://images.viblo.asia/b7bf0af8-9904-4e63-940c-21def97d0182.jpg)

Bạn đã bao giờ nghĩ về các câu hỏi mà 1 kiểm thử viên tự hỏi mình chưa ? 
Dưới đây là 1 trong số đó : 
1. Chiến lược test tốt nhất mà tôi có thể sử dụng ngay bây giờ là gì ? 
2. Tôi sẽ sử dụng loại thử nghiệm nào ? 
3. Đó có phải là một bug không ? 
4. Tôi đã hoàn thành việc test chưa ? 

Tuy nhiên, cũng còn 1 số câu hỏi mà không thường xuyên xuất hiện trong suy nghĩ của bạn : 
1. Các mục này có cần được kiểm thử không ? 
2. Tôi có nên kiểm thử nó không ? 
3. Nếu chức năng này không hoạt động thì có phải là 1 vấn đề lớn không ? 

Tuy nhiên, có phải tất cả mọi người sẽ đặt ra 3 câu hỏi như trên không ? Đó là tầm quan trọng của việc dạy 1 kiểm thử viên kiểm thử tất cả mọi thứ. Một số kiểm thử viên thậm chí còn có phương pháp riêng yêu cầu tất cả các tính năng đều phải được kiểm thử và ghi nhận các chức năng đã được kiểm thử bởi 1 người trong team Test. Kiểm thử đã trở thành 1 công việc thường lệ và thi thoảng bạn sẽ được nghe những điều sau từ các tester : 

" Tôi là kiểm thử viên, vì vậy, mọi thứ phải được tôi kiểm tra kỹ càng...cho dù trước đó nó đã được kiểm tra bởi 1 người không phải là kiểm thử viên...cho dù tôi biết nó sẽ Passed tất cả các trường hợp...ngay cả khi lập trình viên nói với tôi rằng tôi nên kiểm tra nó như thế nào...tôi phải kiểm tra nó, không có trường hợp ngoại lệ nào cả ! " 

Các suy nghĩ này có thể khiến 1 kiểm thử viên bị mang tiếng xấu. Nó nhấn mạnh việc kiểm thử là 1 quá trình làm việc thiếu suy nghĩ hơn là dịch vụ cung cấp những thông tin quan trọng nhất cho 1 ai đó. 

Vì vậy, có cần thiết phải kiểm tra tất cả mọi thứ hoặc từng thứ một ? Như James Bach đã từng lưu ý : 

" Nếu nó đã tồn tại, thì tôi muốn kiểm thử nó. (Ngoại lệ duy nhất là khi tôi có việc quan trọng khác cần làm ) " 

Một việc thường xuyên xảy ra là luôn có 1 thứ quan trọng hơn cần được kiểm thử. Tuy nhiên, tầm quan trọng không phải lúc nào cũng rõ ràng. Hãy xem xét 3 câu hỏi bên trên và tìm kiếm những thứ có thể không đáng để bạn dành thời gian cho việc kiểm thử. Dưới đây là 1 số ví dụ về những gì không quan trọng mà chúng ta đang nhắc tới : 

1. Các tính năng không liên quan đến Production, ví dụ tăng các bảng log lỗi hoặc các bảng báo cáo theo dõi các hoạt động trên Production. Những phần này xảy ra rất thường xuyên và cũng là các items nằm dưới sự giám sát của các lập trình viên. Nó không liên quan trực tiếp đến quá trình vận hành và về bản chất , chúng không thể ảnh hưởng đến người dùng theo nghĩa đen. 
2. Sửa các vấn đề quan trọng trên Production mà sau khi sửa có thể làm tình hình trở nên tồi tệ hơn. Nếu có 1 vấn đề nghiêm trọng xảy ra trên Production cần được xử lý ngay lập tức, chỉ cần chuyển lỗi này cho bên lập trình viên để khắc phục khẩn cấp.  Chú ý đến các chức năng đã được sửa từ trước và thực hiện test đến khi nào cảm thấy vẫn cần thiết. 
3.  Sửa các bug qua loa mà cần đến việc thiết lập thử nghiệm thích hợp : Giả sử bạn phát hiện ra 1 lỗi chính tả trên ảnh chụp màn hình của 1 thông báo lỗi cần được sửa. Tất nhiên, nó sẽ được sửa trong vòng chưa đầy 30 phút mà không cần lo ngại đến người dùng. Tuy nhiên, nó có thực sự đáng làm không ? 
4.  Thay đổi cấu hình đơn giản. Hãy tưởng tượng sản phẩm của bạn bắt đầu phải đối mặt với những công việc cồng kềnh đặc biệt mà không thể hoạt động được. Lập trình viên đã cố gắng khắc phục bằng cách thay đổi cấu hình. Tuy nhiên nó quá lớn và không phù hợp với môi trường test. Vì vậy, đội kiểm thử đã thay đổi lại cấu hình và hiện taị, người dùng không có kiến thức về kiểm thử cũng có thể thực hiện việc test. 
5.  Sử dụng nhân lực không chuyên về testing. Nếu trong team bạn có 1 người không chuyên về thử nghiệm và có thể giúp bạn thử nghiệm 1 tính năng nhất định nào đó, đừng ngại ngần nhận lời đề nghị của họ. Cùng thảo luận về ý tưởng kiểm thử và yêu cầu một báo cáo kiểm thử bất kỳ mà bạn cần. Nếu bạn cảm thấy chắc chắn việc kiểm thử đã được hoàn tất, bạn không cần kiểm thử lại nữa. 
6.  Không có bước repro. Thi thoảng, các lập trình viên sẽ sửa một tính năng có thể ảnh hưởng đến 1 tính năng khác nào đó trong hệ thống. Một việc thường xảy ra là các lỗi sẽ được báo cáo lên nhưng không thể tái hiện được. Tester có thể sẽ muốn kiểm thử hồi quy khu vực mới được sửa,  nhưng không thể tránh được việc cho rằng lỗi có cần sửa hay không, vì họ không thể biết nó bug có thực sự xảy ra nữa hay không. 
7.  Không đủ dữ liệu kiểm tra hoặc không đủ phần cứng. Hãy chấp nhận sự thật rằng phần lớn các tester không có đủ máy chủ cân bằng tải như môi trường Production. Tình cờ rằng các dữ liệu trên môi trường Production lại hoàn toàn có ích khi các bước kiểm thử hợp lệ. Do vậy, kiểm thử viên có thể không cần kiểm tra vấn đề.

Bây giờ có thể đang có rất nhiều các kiểm thử viên đang tưởng tượng rằng, 1 vấn đề có thể xảy ra nếu 1 trong các vấn đề bên trên không được đưa vào kiểm thử. Nhưng hãy nhớ, đây là các mục có thể làm lãng phí thời gian kiểm tra. Đầu tiên, hãy cân nhắc chính xác các độ ưu tiên trong các đầu việc của bạn, sau đó trao đổi với các bên liên quan khi có điều gì đó không rõ ràng. 

Tuy nhiên, để bỏ qua một tính năng nào đó mà không cần thử nghiệm, bạn nên chắc chắn về nó. Nếu bạn và nhóm của bạn đồng ý rằng nó không đáng để kiểm thử thì không sao, nhưng nếu có cá nhân nào đó chống lại nó, bạn nên xem xét kỹ càng và tiến hành kiểm thử. Nếu bạn quyết định không kiểm thử bất cứ thứ gì, nên đánh dấu lại rằng không có gì để kiểm thử và đưa nó lên Production. Việc này đôi khi sẽ tiết kiệm cho bạn rất nhiều thời gian và năng lượng để sử dụng cho những công việc quan trọng hơn. 

Lần tới khi bạn tham gia vào thử nghiệm, hãy nghĩ đến việc không cần thử nghiệm 1 tính năng nào đó. Qua thời gian, nhóm bạn sẽ tôn trọng quyết định của bạn và nâng cao phạm vi kiểm thử khi thực sự cần thiết.

Nguồn : https://testfort.com/blog/things-you-may-not-need-to-test