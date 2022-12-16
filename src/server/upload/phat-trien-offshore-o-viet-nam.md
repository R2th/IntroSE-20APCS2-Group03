Bài viết này sẽ giới thiệu về phát triển offshore giữa công ty Nhật Bản và Việt Nam

### Bắt đầu 1 ngày
Giờ nhật bản từ 11h30 (giờ VN từ 9h30) bắt đầu MTG
Chênh lệch múi giờ là 2 tiếng nên buổi trưa với buổi tối bên Việt Nam ko cần làm cũng có thể cùng nhau làm việc được
Ngoài ra thì ở Việt Nam thời gian bắt đầu 1 ngày làm việc là từ 8 giờ nên buổi sáng sẽ rất sớm

Ở buổi MTG thì từ phía VN những thành viên có thể nói được tiếng nhật như là PM, PL với cả phía Nhật Bản là nhưng người phụ trách phát triển sẽ tham gia. (thông thường sẽ là 1PM đi với team gồm 1 PL và 3~4PG)

Trong buổi họp có sự góp mặt của PM, comtor sẽ báo cáo tiến độ của từng tính năng và vì PM là ngừoi có level hiểu tiếng nhật ở mức độ business nên PM sẽ giải thích specs và truyền đạt cho comtor

Khi bắt đầu MTG sẽ sử dụng 「お疲れ様です」để chào và khi kết thúc sẽ nói 「失礼します」như thế để thể hiện sự lịch sự trong giao tiếp
Trong một số trường hiện tiến độ của dự án ko có vấn đề gì thì có thể không cần MTG nhưng việc hàng ngày trao đổi với nhau sử dụng giọng nói là việc rất quan trọng
Chỉ thông tin text thôi có thể sẽ không hiểu nhưng khi nghe giọng nói thì có thể nắm bắt được vấn đề.
Việc trao đổi có thể dùng mail hoặc chat nhưng khi bị cảm cúm chẳng hạn sẽ nhận được câu hỏi thăm như là [Bạn bị cảm à ? Bạn hãy giữ gìn sức khoẻ nhé!] Điều đó là rất quan trong trọng việc cùng nhau làm việc 


### Cách communication
＜Tool＞
Sử dụng Google Hangout hoặc appear

Vì có thể chia sẻ được màn hình của mình cho người đối diện nên rất tiện lợi
comtor và PM tuy có thể nói được tiếng nhật nhưng mà để truyền đạt được cho đối phương có thể hiểu thì sử dụng  Google Hangout là rất tiện lợi
Khi có điều gì muốn truyền đạt cho thành viên việt nam hoặc là khi truyền đạt bằng từ vựng khó khăn thì vừa thao tác màn hình thực tế và vừa có thể truyền đạt được nội dung nên rất tiện dụng

＜Cách nói chuyện＞
Sử dụng cách nói chuyện chuẩn và nói chậm 

Không sử dụng tiếng anh được nhật hoá
vì có trườn hợp khác ý nghĩa so với tiếng anh nên comtor sẽ hiểu thành nghĩa không chính xác

Trường hợp mà người nghe không hiểu thì có thể người 「わからなかったので、もう一度お願いします」
Người đối diện sẽ nói chậm những gì muốn nói lại một lần nữa

「Hình thức của từ vựng」
Cái này rất quan trọng 
vì nếu không sử dụng từ vựng chi tiết rõ ràng, nên tập thói quen nội dung giữa các dòng không trình bày rõ ràng 
điều này đối với người nhật là rất quan trọng

Ngoài MTG thì vẫn trao đổi với member bằng chat. Về điểm này thì không có sự khác biệt lớn với các member ở bên Nhật. Sử dụng Hangout 1 với 1 trao đổi specs 

### Quản lý dự án
＜Schedule＞
PM sẽ tạo WBS những phần công việc bên Việt Nam phát triển
Schedule đã tạo ra thì có trách nhiệm đảm bảo tiến độ phát triển đúng với schedule
Ngoài ra ai đang làm gì, phân bổ công việc sẽ là trách nhiệm của PM

＜Quản lý task＞
Sử dụng Redmine

### Phát triển tính năng
＜Document・Giải thích spec＞
Tài liệu được viết bằng tiếng nhật và phía JP sẽ tạo, dịch sang tiếng anh và chuyển qua bên VN
Về format thì có định nên ai viết cũng có thể tuân thủ cùng một cách thức viết
ngoài ra, khi tạo tài liệu thì có một số quy tắc, trong đó không được sử dụng tiếng anh được Nhật hoá để tránh hiểu nhầm ý nghĩa

Bước đầu tiên của giải thích specs là dịch qua tiếng anh và gửi cho PM đọc
Bước thứ 2 là đọc specs mà có chỗ nào không hiểu thì sẽ tiến hành hỏi lại
Sau đó, PM sẽ giải thích cho member, PL, PG hiểu specs
Với những specs phứ tạp thì tạo specs xong thì tiến hành QA hỏi 2 lần để nắm bắt được các member có hiểu specs hay không 

Khi bắt đầu phát triển thì hàng ngày có có QA và những QA này sẽ được phía JP trả lời. 
Những thứ liên quan đến việc trao đổi specs vẫn còn lại và có thể share cho người khác
Việc hiểu nhầm là việc nguy hiểm nhất

＜Tài liệu thiết kế chi tiết và tài liệu item test＞
Việc cần thiết thiết kế tài liệu chi tiết hay không tuỳ thuộc vào độ hiểu tính năng của PM
bao gồm cả source code và tiến hành review

Phía VN tạo -> phía VN review -> phía JP review
Từ VN tạo document bằng tiếng anh vì thế phía JP cũng review tài liệu bằng tiếng anh

Team QA là từ dùng để chỉ những tester
Tester sẽ có trách nhiệm tạo document item test và thực thi unit test.
Ở VN có tester nên là việc PG thực hiện test là hầu như không có nên khả năng unit test của PG là chưa cao