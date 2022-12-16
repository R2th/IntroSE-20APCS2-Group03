# Về các loại incident và báo cáo incident (sự cố)
 ![](https://images.viblo.asia/844b5bc5-8a80-4f90-88f0-3a344e295f73.png)
<br>Trong sự cố thì có cả những sự cố nhỏ, ví dụ như rớt chữ đang hiển thị trên màn hình, và cũng có cả những lỗi lớn ví dụ bị lỗi 50x trên toàn bộ màn hình, hay không thể kết nối thanh toán được gây thiệt hại về tiền tệ… Nếu khi nào đó được yêu cầu viết báo cáo sự cố thì nguyên tắc là “hãy viết toàn bộ có thể”.<br>
Điều kiện tiền đề ở đây chính là “báo cáo incident không phải là bản kiểm điểm, hay bản tường trình gì cả”. Nên không cần thiết phải viết theo kiểu ăn năn hối lỗi bất đắc dĩ làm gì. Nếu là trường hợp ở chỗ chúng tôi không có văn hóa kiểu như vậy thì bản thân team của mình thử bắt đầu làm báo cáo incident cũng được.
 
# Quy luật Heinrich, hay Hiyari Hatto (ヒヤリ ハット)
http://ja.wikipedia.org/wiki/ハインリッヒの法則

Có một quy luật tên là Heinrich. Đây là một nghiên cứu thống kê cho thấy rằng phía sau 1 vụ tai nạn nghiêm trọng là ẩn chứa 29 vụ tai nạn nhẹ và 300 vụ tình huống nguy hiểm (chưa xảy ra tai nạn nhưng suýt chút nữa đã có thương tích).
<br>Nói cách khác quy luật này có ý nghĩa rằng bằng cách quản lý chặt chẽ kể cả là báo cáo sự cố nhỏ đi chăng nữa thì cũng có thể tránh được sự cố nghiêm trọng.<br>


# Về format báo cáo incident
Nếu có thể thì quản lý báo cáo incident trên hệ thống ticket/issue thì sẽ tốt hơn. Còn nếu không thì viết dưới dạng wiki thôi cũng được. Format báo cáo tối thiểu cần có các nội dung dưới đây.
* Tóm tắt nội dung incident
* Customer feedback
* Incident Timeline
* Sự khác biệt xử lý
* Đối sách phòng tránh lặp lại sự cố
## Tóm tắt nội dung sự cố
Hãy mô tả tóm tắt nội dung sự cố một cách thẳng thắn. Khi đó “đã làm gì” ở đây không phải là nội dung của “hiện tượng đã xảy ra” mà là “tên module đã phát sinh bug và nguyên nhân”. Cái nên viết ở đây là đề cập về khía cạnh hiện tượng mà tất cả member chứ không chỉ engineer đều có thể hiểu được.
<br>Ví dụ như: không phải là mô tả là “phát sinh sự cố vật lý của HogeFuga_master DB” mà cần viết “hiển thị internal server error trên màn hình hiển thị Hoge” hoặc “phát sinh bug không thể đăng bài Hoge được”
Điều quan trọng là dùng để share mức độ ảnh hưởng cho cả bộ phận kinh doanh và bộ phận support.<br>
 
## Customer feedback
Mô tả số lần thắc mắc và nội dung liên quan tới sự cố đã phát sinh. Hoặc là hãy mô tả cho người bộ phận liên quan. Cái này rất có hữu ích để làm trực quan mức độ ảnh hưởng. 
<br>Ngoài ra, vì là formate cần dùng để chia sẻ thông tin với bộ phận liên quan khi phát sinh sự cố, nên hãy viết dễ hiểu để thông báo phát sinh sự cố và trả lời thắc mắc khi xử lý sự cố.<br>
 
## Incident Timeline
Incident Timeline chính là báo cáo liên quan tới thời điểm phát sinh, thời điểm phát hiện ra, thời điểm bắt đầu xử lý, thời điểm kết thúc xử lý và trạng thái xử lý theo trình tự thời gian. Ngoài ra cũng để hiểu rõ “do ai” “khi nào” “như thế nào”.
<br>Lý do mô tả cái này là vì rất có ích cho lúc xem xét đối sách. Ví dụ như trường hợp từ lúc phát sinh tới lúc phát hiện là 2h, nếu phát hiện trong 10 phút thì mức độ ảnh hưởng của sự cố đã khác rồi. Hơn nữa cũng tương tự như thời khắc “từ lúc phát hiện tới lúc bắt đầu xử lý” và “lúc bắt đầu xử lý tới lúc hoàn thành xử lý”.<br>
Về mức độ ảnh hưởng của sự cố được đánh giá bằng

***Mức độ ảnh hưởng của sự cố＝Phạm vi ảnh hưởng  mức độ nghiêm trọng thiệt hại tiền tệ  thời gian tới lúc hoàn thành xử lý***
 
 
## Sự khác biệt xử lý
Bắt buộc dán link tới sự khác biệt xử lý. Có nhiều trường hợp chỉ bằng câu từ thì không thể truyền đạt lý do của sự cố.
## Đối sách phòng tránh lặp lại sự cố
Đối sách phòng tránh lặp lại sự cố là lý do lớn nhất để viết bản báo cáo sự cố. Tại thời điểm viết báo cáo sự cố, không cần thiết mô tả toàn bộ, nhưng điều quan trọng là không được close ticket cho tới khi hoàn thành việc tìm ra đối sách phòng tránh lặp lại sự cố. <br>Hơn nữa khi viết đối sách phòng tránh lặp lại sự cố, hãy viết chi tiết “(cái mình nghĩ là) nguyên nhân” và “đối sách”. Đó là bởi vì có cả trường hợp không chia sẻ cái được cho là nguyên nhân nên đối sách đã bi lạc đề mất.<br>
 
<br>Ngoài ra, khi đó còn cần xem xét đối sách phòng tránh lặp lại sự cố ở 3 giai đoạn như là:<br>
* Nguyên nhân trực tiếp　：　Nguyên nhân trực tiếp làm phát sinh bug đó
* Nguyên nhân gián tiếp　：　Nguyên nhân gián tiếp dẫn tới bug đó
* Lý do thực sự：vì sao mà phát sinh sự cố như vậy

<br>Việc cần tới 3 giai đoạn như vậy nếu liên tưởng tới quy luật Heinrich ở trên thì sẽ hiểu được. Trong một sự cố, ẩn chứa 300 tình huống nguy hiểm hoặc là những sự cố mà tùy vào thói quen, tập quán, nỗ lực của member có thể tránh được. <br>Nếu chỉ dựa vào nguyên nhân gián tiếp thì nhiều khi đối sách phòng tránh lặp lại sự cố không phù hợp.  Thay vì thế nhiều khi vẫn còn chứa đựng vấn đề gián tiếp gây nên nhiều vấn đề khác, và bằng cách giải quyết vấn đề đó sẽ tìm ra đối sách phòng tránh lặp lại sự cố thực sự.<br>
Ngoài ra,thử hình dung mức độ ảnh hưởng của sự cố theo như trên, đưa ra đối sách để làm giảm độ ảnh hưởng mới là quan trọng.
<br>Chủ yếu là xem xét đối sách phòng tránh lặp lại sự cố dựa vào những câu hỏi:<br>
* Phạm vi ảnh hưởng：Dù có xảy ra vấn đề tương tự thì có thể làm giảm thiểu tối đa mức độ ảnh hưởng không？
* Thời gian tới khi hoàn thành xử lý ：Dù có xảy ra vấn đề tương tự thì có thể xử lý trong thời gian ngắn hoặc tự động xử lý không?
# Về chu trình xem xét đối sách phòng tránh
## Team thực hiện retrospective
Điều quan trọng để xem xét đối sách phòng tránh đó là cả team phải định kì thực hiện retrospective. Cần lưu ý để không chỉ trích đối với team member đã gây ra sự cố khi đó. Khi xem xét đối sách nhất định phải có người chủ trì, phải chú ý tới màn hình hoặc bảng trắng, và tạo bầu không khí tự do để brainstorm. Có thể chuẩn bị kẹo hoặc câu hỏi hoặc hoạt động icebreaker vừa phải cũng tốt.
<br>Khi đó, quan trọng là mỗi member đều có thể xem được giấy của đối sách tốt và chưa tốt được mô tả ở dưới.
Ngoài ra, người chủ trì cũng phải bàn luận theo thứ tự nguyên nhân => đối sách.<br>
## Quan điểm thứ hai
<br>Nếu tạo ra bối cảnh để các member ngoài team cùng nhìn nhận lại đối sách thì chẳng phải rất tốt sao. 
<br>Một trong những lý do là bằng cách chia sẻ thông tin với member của team khác thì có thể đưa ra được hướng giải quyết vấn đề ở phạm vi rộng hơn. 
<br>Còn một điều nữa, có thể nhận được ý kiến tránh thiên lệch tùy vào tình huống của team. 
<br>Nếu team hành động thì vì bận quá nên có xu hướng giải quyết vấn đề trước mắt, và bằng cách xây dựng mối quan kệ với team khác cùng chỉ ra vấn đề thì có thể tạo ra được văn hóa để vận dụng tài sản gọi là “sự cố”.
# Đối sách tốt và đối sách chưa tốt
## Đối sách tốt
Nếu đánh thứ tự thì đối sách tốt thì được đánh theo thứ tự như sau.
* Đối sách giải quyết được vấn đề mà không cần để ý tới lần thứ 2
* Đối sách có thể tự động phát hiện ra các loại vấn đề
* Đối sách mà kể cả có gặp các vấn đề thì cũng tự động phục hồi được
* Đối sách mà dù có phát sinh vấn đề cũng gói gọn phạm vi ảnh hưởng, trở thành "fool-proof" và "fail-safe" (Trong kỹ thuật, thuật ngữ "fool-proof" hay "idiot-proof" mô tả thiết kế với mục đích tránh các sai sót khi sử dụng từ phía người dùng cuối. Giải pháp đôi khi khó dùng và phức tạp hơn, nhưng đảm bảo tính đúng đắn ngay cả với người dùng "very idiot".Trong khi đó, thuật ngữ "fail-safe" hay "fail-secure" chỉ hệ thống khi hỏng hóc sẽ không gây ra thiệt hại hoặc giảm tối đa thiệt hại cho người và thiết bị.)
## Đối sách chưa tốt
Đối sách chưa tốt đơn giản là sử dụng yếu tố con người. 
* Thêm phê chuẩn, lộ trình thanh toán để tránh trách nhiệm
* Nắm được thiếu sót trong việc nỗ lực/nhẫn nại/bản tính người khác và yêu cầu cải thiện
* Nguyên nhân là mức độ chú ý của cá nhân/team và “thật chú ý và xác nhận nhiều hơn”
* Cơ cấu double check/ triple check để tránh sai sót
* Đối sách kiểu như thêm chỉ thị này vào tài liệu!
# Lời kết
* Báo cáo sự cố là tài sản. Dù tạo theo kiểu nào thì cũng hãy ứng dụng hiệu quả
* Tránh việc đưa đối sách có sự tham gia của yếu tố con người
* Xây dựng quan điểm thứ hai
<br>Trích nguồn
https://qiita.com/hirokidaichi/items/f9f4549c88aaf8b38bda<br>