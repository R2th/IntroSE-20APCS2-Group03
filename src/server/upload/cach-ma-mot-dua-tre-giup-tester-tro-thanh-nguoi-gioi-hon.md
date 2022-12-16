Kiểm thử phần mềm là nghệ thuật đảm bảo chất lượng cho ứng dụng phần mềm bằng cách tìm tòi ra các lỗ hổng và sơ hở tồn tại trong hệ thống. Để kiểm thử một ứng dụng, chúng ta phải thường xuyên check requirement document để xác minh xem ứng dụng đó có tuân thủ các yêu cầu hay không. Khi phát hiện ra sơ hở, tester thực hiện nhiều hành động khác nhau hay một phương pháp bất kì nào đó và với tất cả các phương tiện nhằm phá vỡ ứng dụng.  Nói cách khác, tester cần phải dừng việc test theo các quy tắc và thực hiện gorilla testing(monkey testing) để tìm ra bất kì cơ sở nào có thể xảy ra issues.

Và có thể nói là không có đối thủ nào phá vỡ các quy tắc tốt hơn trẻ em. Việc này sẽ giúp chúng ta học hỏi được một vài điều từ những đứa trẻ. Trong bài viết này, chúng ta sẽ nói về những thói quen khác nhau của trẻ em và một vài kinh nghiệm có thể hướng dẫn chúng ta trở thành tester giỏi hơn.

# 1. Các hành vi chung của trẻ em và làm thế nào để áp dụng vào testing
Trẻ em thuộc nhóm tuổi có nhiều hành vi đột phá. Ngoài những cơn giận dữ thường xuyên và ném những thứ xung quanh thì chúng ta thực sự có thể học được rất nhiều từ hành vi của họ và áp dụng chúng vào testing.

Theo trích đoạn của Business Insider: "Trẻ em không chờ đợi cho tới khi khoa học chỉ cho họ biết rằng họ đã sẵn sàng để loại bỏ các bánh xe đào tạo trên chiếc xe của họ - họ chỉ cần nhảy vào và xem những gì xảy ra". Bây giờ, nếu chúng ta đặt trẻ em vào những tình huống thử nghiệm, chúng ta mong đợi điều gì? 

Trẻ em không lo lắng về mục tiêu cuối cùng, họ chỉ muốn vui vẻ. Trong khi chơi thể thao, với một món đồ chơi hoặc chỉ với một câu đố, họ ít quan tâm đến việc hoàn thành trò chơi. Họ chỉ muốn khám phá và làm tốt nhất mọi thứ họ có trong tay.

**Không lo lắng nhiều về những hạn chế**: Họ lo lắng rất ít về những hạn chế. Ngay cả khi bạn yêu cần họ không chạm và bất kì đồ gia dụng nào hoặc ở lại trong khu vực được cho phép, họ luôn phá vỡ các nguyên tắc của bạn.

**Lặp lại các hành động thường xuyên**: Nếu họ tìm thấy thứ gì đó vui vẻ hoặc không thể tìm ra mục đích mà họ đang làm, họ tiếp tục thực hiện các hành động khác nhau cho đến khi nó có ý nghĩa. Trẻ em luôn như vậy, sẽ xử lý đồ chơi hoặc câu đố khác nhau liên tục cho đến khi chúng tìm ra mục đích của nó.

**Quan sát tỉ mỉ**: Trẻ em là những kẻ bắt chước tuyệt vời và có thể ghi nhận các thói quen và cứ chỉ nhanh chóng. Điều này xảy ra bởi vì họ là những người quan sát tỉ mỉ. Theo một bài đăng từ Parentlane: "Với kĩ năng nhận thức của họ, trẻ em ở độ tuổi này rất quan tâm và tò mò. Họ muốm tìm hiểu về mọi thứ xung quanh, những điều mà bạn thậm chí sẽ không nhận thấy nhưng con bạn sẽ quan sát và muốn biết về nó ". Ví dụ thực tế nhất là cách trẻ em xử lý smartphones. Người lớn hoặc cha mẹ không bao giờ nói cho trẻ em biết cách mở khóa điện thoại hoặc khởi động chúng. Trẻ em chú ý khi bố mẹ họ sử dụng điện thoại và thực hiện những hành động. Họ tiếp tục chú ý đến các bước và cố gắng bắt chước các hành động tương tự. Một khi họ đã cố gắng và sau nhiều lần thất bại, họ đã có được đúng cách mở khóa và sử dụng điện thoai.

**Đặt câu hỏi lặp đi lặp lại**:  Một đặc điểm chung ở các trẻ em là sự tò mò. Nếu bất cứ lỗi gì xảy ra, họ đặt câu hỏi nhiều hơn nữa cho đến khi họ hài lòng với câu trả lời. Ngay cả khi người lớn trả lời, nếu không thỏa mãn họ vẫn tiếp tục hỏi.
# 2. Làm thế nào để các thói quen này giúp cho việc kiểm thử? 
Các hành vi nói trên phổ biến nhất ở trẻ em. Nhưng làm thế nào để thực hành điều đó giúp cải thiện chất lượng của kiểm thử?

**Giảm thiểu cơ hội rò rỉ khiếm khuyết**: Chìa khóa nằm trong thử nghiệm lặp lại. Điều đó không có nghĩa là tester phải check lại nhiều tính năng giống nhau. Việc sử dụng lặp lại nhiều lần dẫn đến hiệu ứng thuốc trừ sâu( pesticide paradox). Thay vào đó, tester nên đầu tư thời gian vào việc tạo ra các test case chất lượng, cụ thể cho từng module và lặp lại quá trình execution mỗi khi có code mới như sau khi fix bug or sau khi kết hợp change request. Bộ thử nghiệm như vậy kết hợp sử dụng với bộ hồi quy, chắc chắn sẽ nâng cao được chấp lượng cho ứng dụng. 

**Tăng cường test coverage**: Khi một module không nằm trong phạm vi của bản release, chúng ta vẫn phải bao gồm nó trong khi test, miễn là chúng tương tác(giao tiếp) với các module khác trong phạm vi release. 

**Detect ra các lỗ hổng ở giao đoạn đầu**: Trẻ em là người quan sát rất tỉ mỉ giống như tester, bạn cũng nên theo dõi chặt chẽ ứng dụng và cách hoạt động của chúng. Thêm nữa, bạn cần phải tìm hiểu focus vào business của ứng dụng. Điều này sẽ giúp bạn dự đoán hành vi mong muốn của ứng dụng, nó cũng sẽ giúp bạn detect các lỗ hổng sớm hơn. 

**Đặt những câu hỏi đơn giản có thể giúp clear các rào cản lớn**: Trẻ em là những người tò mò nhất và thường xuyên làm phiền cha mẹ của họ với những câu hỏi. Các câu hỏi rất đơn giản nhưng đôi khi chúng ta không thể trả lời chúng bởi vì bản thân chúng ta chưa bao giờ nghĩ về nó. Ví dụ như, một đứa trẻ hỏi bạn là: tại sao lửa nóng và bạn có thể trả lời không? Đó, scenario như vậy cũng có thể áp dụng cho tester. Chúng ta nên phân tích vấn đề thành các câu hỏi nhỏ và đơn giản để giải quyết bài toán.
 
# 3. Có thể involve trẻ em vào test ứng dụng phần mềm hay không? 
Bây giờ bạn có thể đang suy nghĩ rằng hành vi được hiển thị bởi trẻ em rất có lợi, vậy tại sao chúng ta không yêu cần họ tự test phần mềm? Thực tế là, chúng ta không bao giờ nên involve trẻ em vào kiểm thử phần mềm bởi những lý do sau:  

**1- Nó sẽ làm giảm chất lượng của exploratory testing**
+ Khi tester thực hiện không theo kịch bản, họ sẽ áp dụng logic và sử dụng những hiểu biết về business để lên các kịch bản test khác nhau cho ứng dụng. 
+ Đây là một hình thức của ad-hoc testing nhưng cũng cần yêu cầu hiểu biết nền tảng và hiểu biết về kĩ thuật. Quá trình này không thể hình thành ở một đứa trẻ và trẻ em không những không thêm được chất lượng mà còn làm giảm hiệu quả test đi.

**2- Business phức tạp** 
+ Một ứng dụng đơn giản khi cho trẻ em sử dụng logic khác nhau để ghép thành module khác nhau cũng trong một luồng. 
+ Việc giải thích và cung cấp dữ liệu cho trẻ em test các kịch bản cũng quá nhiều để trẻ em nắm bắt.
+ Ngoài ra, trẻ em không có bất kì kĩ năng testing nào, không thể implement các kĩ thuật kiểm thử trong khi test ứng dụng. 

**3- Không khuyến kích trẻ em**
+ Testing nói chung đòi hỏi nhiều sự tậm trung và cống hiến. Thậm chí có những đợt tester phải ngồi hàng giờ để thử nghiệm một module, tránh bị gián đoạn. Việc này không có lợi cho trẻ em.
+ Ngoài ra, tester phả hạn chế hệ thống của họ và tập trung cao độ vào màn hình. Điều này có thể ảnh hướng tới sức khỏe của trẻ em.

**4- Nguy cơ vi phạm bảo mật**
+ Trước khi release, sản phẩm phầm mềm sẽ được giữ kín để tránh rò rỉ thông tin. Điều này được hiện để giữ cho các tính năng và chức năng mới không rơi vào tay các đối thủ cạnh tranh. 
+ Nếu trẻ em phải test một ứng dụng, khả năng cao là chúng không quan tâm đến những bảo mật. Điều này có nghĩa là chúng có thể chia sẻ thông tin hoặc đặc điểm kĩ thuật của ứng dụng với mọi người. Với một vài loại ứng dụng, tốt nhất không nên cho trẻ em nhúng vào. 

**5- Nội dung của ứng dụng không phù hợp**
+ Bạn phải rất cẩn thận về những gì trẻ em được tiếp xúc. Ngay cả một cái nhìn thoáng qua nội dung không phù hợp hoặc bạo lực có thể ảnh hưởng đến tâm lý của họ.
+ Các ứng dụng khác nhau được thiết kế riêng cho các tiện ích và nhóm tuổi khác nhau, nên tốt nhất là ngăn chặn mọi cơ hộ có thể khiến trẻ em biết đến nội dung hung hãn hoặc người lớn.
# Kết luận
+ Trẻ em dai dẳng nhất và không lo lắng về những hạn chế được áp dụng cho chúng, mục đích duy nhất của họ là vui chơi và không quan tâm tới mục tiêu cuối cùng.
+ Hành vi của trẻ em có thể cung cấp cho chúng ta các point quan trọng về cách tiếp cận khi testing phần mềm. 
+ Những quan sát của trẻ em, nếu được thực hiện trong kiểm thử hàng ngày có thể giúp cải thiện chất lượng test và giúp chúng ta deliver các sản phẩm tốt hơn.
+ Ngoài việc tập trung vào thực hành testing, tester nên nhấn mạnh vào yêu cầu và cố găng thu thập thêm nhiều kiến thức về ứng dụng đó, bằng tất cả các nguồn có thể.



Nguồn: http://www.helpingtesters.com/how-children-can-help-us-become-better-testers/#more-10801