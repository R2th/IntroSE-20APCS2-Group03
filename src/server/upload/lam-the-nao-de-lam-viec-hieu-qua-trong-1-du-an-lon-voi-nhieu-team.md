Chào bạn đọc, khi tôi ngồi viết được bài này là tôi đang làm việc trong 1 dự án lớn với nhiều team và khá đông thành viên, mỗi người đến từ 1 site khác nhau và như thế tính cách, phong thái làm việc cũng hoàn toàn khác nhau. Là 1 QA tôi luôn phải là người trao đổi, tiếp xúc với hầu hết tất cả các thành viên từ các team nhỏ PM, Brse, dev Server, dev Mobile... mà không phải lúc nào các thành viên cũng có thể trao đổi 1 cách thuận tiện. Vị trí ngồi khác nhau, làm việc khác nhau, suy nghĩ khác nhau, thậm chí còn phải trao đổi qua màn hình máy tính với các thành viên cách xa hàng trăm cây số. Thời gian làm việc trao đổi tôi cũng gặp không ít khó khăn - nhất là với các member ở xa, việc confirm tốn không ít thời gian và gây cảm giác khó chịu. 

Hôm nay tôi sẽ viết về 1 số kinh nghiệm của bản thân được rút ra trong thời gian qua, tôi biết bạn chắc hẳn sẽ có nhiều kinh nghiệm hay hơn và có ích hơn - đừng ngại hãy nói cho tôi biết để tôi được hoàn thiện bài viết hơn nhé :sweat_smile:
### 1. Làm việc dựa trên "giấy tờ" 
Nghe có vẻ cứng rắn nhưng nó nhất định là **CẦN** . Spec được cho là xương sống của dự án, spec càng rõ ràng càng ít có sự hiểu lầm. Team của bạn có rất nhiều người và cách hiểu của mỗi người là khác nhau.
Vậy để hạn chế sự khác nhau trong suy nghĩ của mỗi người là `giấy trắng, mực đen` được biểu thị trên spec. Sự confirm nhiều lần giữa các member với PM và Brse tốn rất nhiều thời gian cho cả 2 bên. Giả dụ có 1 function A mà user 1 không rõ - ông này đi confirm với Brse và được trả lời, ông Brse này lại không update vào spec. 1 thời gian sau QA test chức năng A này sẽ lại phải confirm với ông Brse 1 lần nữa 

=> Như ví dụ ở trên ta nhận thấy ông Brse mất effort gấp 2 lần để làm rõ 1 vấn đề. Vậy giải pháp là ông Brse nên ưu tiên update vào spec những gì chưa rõ ràng mà member của mình raise lên. 
Có những issue khá là nhỏ nhưng do trong spec không rõ ràng nên đã gây ra sự hiểu lầm thậm chí tranh luận mà tưởng chừng như không có gì to tát cả, nhưng vào 1 thời điểm căng thẳng như release từng phase, hay dealine dự án thì bạn mới biết những vấn đề nhỏ này có thể làm nên chủ đề cho việc tranh luận gay gắt giữa các thành viên.
1 ví dụ mình đã gặp phải trong chính team của mình là: Có thay đổi về nội dung message, ông Brse và QA chỉ trao đổi thông qua việc chat trên box chung mà không update spec. QA dĩ nhiên có update trong testcase. Tuy nhiên vào 1 ngày đẹp trời 1 member B ở Đà Nẵng lại hỏi về nội dung message lấy ở đâu ra, dĩ nhiên ta thấy vấn đề ở đây là ông B không có mặt trong cuộc trao đổi giữa Brse và QA và rồi ông B lại trách móc .

=> Giải pháp ở đây là lập 1 file message list chung cho toàn dự án, bắt buộc mỗi thành viên khi confirm đều phải list vào file này. Khi code dev sẽ lấy message từ file này ra thôi.
Việc làm cho spec đủ tất cả các trường hợp và rõ ràng là không thể , bởi bạn biết đấy con người còn có thể thay đổi cơ mà - rồi 1 ngày khách hàng vui tính lại thay đổi 1 chút spec thôi cũng làm thay đổi rất nhiều thứ, bạn cập nhật kịp thời thì effort của bạn sẽ đủ, nhưng vì 1 lý do nào đó mà bạn cập nhật muộn thì công sức bạn bỏ ra sẽ hóa cát bụi.
Đừng chần chừ khi bạn biết spec thay đổi, hãy nhắc nhở ông Brse cập nhật ngay vào spec để mà "nói có sách, mách có chứng" không effort của nhiều người khác nhé! 
### 2. Phát hiện thế mạnh của từng thành viên 
Làm việc được 1 thời gian nếu bạn chú ý 1 chút sẽ nhận thấy: ông A rất vui vẻ chấp nhận bug, fix nhanh gọn lẹ. Ông B rất ghét những bug lẻ tẻ => Khi nào gặp những bug giao diện, follow đợn giản sẽ nhờ ông A fix, còn bug cần sửa nhiều tôi sẽ nhờ ông B. 

Dĩ nhiên là 1 member non kinh nghiệm bạn chưa thể assign task/bug chính xác được, bạn có thể gợi ý để leader chọn member phù hợp để fix bug cho bạn  :satisfied: 
Việc phát hiện thế mạnh của từng thành viên trong team sẽ giúp bạn có những gợi ý lý tưởng cho leader phân chia ticket cho đúng người , có thể kết hợp ưu điểm của nhiều thành viên để làm nên thế mạnh lớn hơn. Khi đó, khả năng thành công của team-work sẽ cao hơn nhiều.
### 3. Tạo sự cân bằng trong team 
 1 câu chuyện hài hước, 1 câu trêu đùa, thậm trí troll nhau hay 1 bữa team building nho nhỏ hàng tuần cũng làm cho team của bạn gần gũi hiểu nhau hơn. Ai cũng thích làm việc trong 1 môi trường thoải mái tình cảm, hơn là 1 không khí căng thẳng lúc nào cũng tràn nhập bug và task.
 
 Ngoài những yếu tố khách quan kể trên, quan trọng hơn cả là phân chia công việc đối với từng thành viên phải phù hợp với từng người, dealine cho các task phải rõ ràng lành mạch. Một team có lượng công việc phù hợp, ăn chơi vừa phải sẽ giúp từng thành viên thoải mái và chẳng ngại gì mà họ có thể dễ dàng hơn để fix bug mà bạn tìm được. 
### 4. Góp ý chân thành
 Có 1 ông dev không chịu fix bug, có 1 ông lại cố tình không hiểu follow bạn giải thích. Tôi cũng đã gặp trường hợp tương tự khá nhiều lần. Ban đầu tôi khá là khó chịu và bực mình khi đó là bug mà họ tạo ra, thời gian đầu khi gặp phải những người cứng đầu hoặc gặp những pha khó giải quyết tôi thường nhờ leader của mình confirm giúp, chị ấy nói khá từ tốn và có lý lẽ khiến dev phải ngậm ngùi quay về fix bug. Lúc ấy tôi nhận ra rằng ngoài việc cứ khăng khăng bảo khác spec - sửa đi thì dẫn chứng lý lẽ từ các dự án khác sang cũng phải thuyết phục. 
 
 => Khi gặp các trường hợp như này tôi nhận thấy ngoài việc dựa vào spec và lấy dẫn chứng kèm theo thì việc góp ý chân thành với member đó cũng giúp họ thay đổi phần nào. Chính bản thân tôi là 1 người khá là cứng rắn trong suy nghĩ - nhưng được mọi người góp ý nhiều mà tôi đã thay đổi trong cách làm việc cũng như tiếp thu ý kiến của người khác. Vậy nên hãy biết cách giúp từng thành viên khắc phục bug với thái độ tích cực chứ không phải chỉ trích, cũng đừng quên có lời khen ngợi trong hoàn cảnh phù hợp bởi điều đó tạo nên sự thân thiện và thoải mái cho dev đó :smiley: .
 
### 5. Vừa mềm vừa rắn
Hãy kiên định với dev mỗi lần confirm về spec, hãy có những đòi hỏi khắt khe để họ phấn đấu chứ đừng tạo cho họ tâm lý hơi khó tý đã nản lòng, lùi bước. Tuy nhiên trong từng trường hợp khác nhau mà khéo léo mềm mỏng sẽ tạo nên hiệu quả hơn là cứ cứng nhắc. 

Ví dụ có 1 lần 1 dev trong Đà Nẵng đã hỏi tôi rất nhiều lần để xin account dùng để test phần bạn đó làm. Tôi đã cho nhiều lần, nhưng việc xin account lặp lại khá nhiều lần, lúc này tôi hướng dẫn bạn ấy tạo account từ đâu, như nào , tuy hơi tốn thời gian nhưng bạn ấy rất thoải mái khi tự mình tạo account test, mà chính tôi cũng không tốn thời gian để lặp lại các tin nhắn cũ đã có sẵn.
Cũng có 1 lần anh dev A nói bug này là không thể fix nổi, tôi khẳng định là có thể làm được và đã lấy dẫn chứng các trường hợp tương tự để anh dev A đồng ý fix bug.

=> Việc confirm trao đổi cần phải có kinh nghiệm cả tuổi đời và tuổi nghề, chính bạn cũng cần sự mềm mỏng đấy thôi. Vậy nên hãy cứ cứng nhưng vẫn mềm để làm việc đạt hiệu cao nhé! 
### 6.  Kết luận
Việc làm vừa lòng tất cả mọi người trong team là không thể. Vậy điều bạn cần làm là hãy cứ làm việc dựa theo spec, logic sự lắng nghe và thấu hiểu bởi mục đích mà bạn hướng tới không phải là sự yêu ghét của bất cứ ai, mà là sự thành công của dự án kia mà.