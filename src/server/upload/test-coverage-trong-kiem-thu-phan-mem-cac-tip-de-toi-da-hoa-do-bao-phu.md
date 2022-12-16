Bài viết sẽ chia sẻ về : Các để thực hiện test, tiết kiệm thời gian và đạt được kết quả kiểm tra tốt hơn:

Kiểm thử phần mềm là một hoạt động thiết yếu trong vòng đời phát triển và bảo trì phần mềm. Đó là một hoạt động để quyết định và cải thiện chất lượng phần mềm.

Sự phát triển ngày nay có hệ thống hơn và các nhà phát triển luôn tìm kiếm các phương pháp hoàn thiện để show ra những kịch bản test tối ưu nhất . Trong số đó phải kể đến phương pháp Test Coverage - đặc biệt có giá trị.

### Test Coverage là gì?
Nói một cách đơn giản, Coverage là  " Những cái mà chúng ta đang kiểm thử và giá trị của nó "

Test Coverage giúp giám sát chất lượng kiểm tra và hỗ trợ người kiểm tra tạo các kiểm tra bao gồm các khu vực bị thiếu hoặc không được xác thực.

![](https://images.viblo.asia/be352b9d-872b-47b0-a4c2-560a804fff90.jpg)

Phần lớn các team khi test chỉ tính toán độ bao phủ trên các yêu cầu chức năng. Một ứng dụng sẽ làm những gì nó được cho là cần phải làm. Trừ khi những thứ liên quan như : tốc độ ,tính  bảo mật , tính dễ sử dụng - không có vấn đề gì.Tuy nhiên, nếu các team test non- function chuyên dụng và độc lập đang làm việc về hiệu suất, bảo mật, kiểm tra khả năng sử dụng, .., thì sau đó họ cũng sẽ phải tracking các Requirements của mình bằng cách thực hiện thông qua phân tích Test Coverage .

### Test Coverage and Code Coverage

Test Coverage thường bị nhầm lẫn với Code Coverage. Mặc dù các nguyên tắc cơ bản là giống nhau, chúng là hai thứ  khác nhau.

Code Coverage nói về việc thực hiện unit test : mục tiêu là tất cả các vùng code được kiểm tra ít nhất một lần và được thực hiện bởi các nhà dev.

Mặt khác, Test Coverage : sẽ kiểm tra mọi yêu cầu ít nhất một lần và rõ ràng là hoạt động của nhóm QA.

Ví dụ: Một số team cho rằng một yêu cầu được bao phủ nếu có ít nhất một test case gắn cho nó hoặc Yêu cầu được bao phủ nếu ít nhất một thành viên trong nhóm được assign task đó và cũng có thể là  nếu tất cả các trường hợp thử nghiệm liên quan đến nó được thực thi.

* Nếu có 10 yêu cầu và 100 Tcs được tạo - khi 100 TCs này nhắm đến tất cả 10 yêu cầu và không nên bỏ qua bất kỳ Tcs nào - chúng tôi gọi đây là Test Coverage ở mức design. 
* Khi chỉ có 80 trong số các Tcs được tạo  được thực hiện và chỉ nhắm mục tiêu 6 trong số các yêu cầu. Chúng tôi nói rằng 4 yêu cầu không được bao phủ mặc dù 80% thử nghiệm đã được thực hiện. Đây là số liệu thống kê bao phủ ở mức thực hiện.
* Khi chỉ có 90 Tcs  liên quan đến 8 yêu cầu đã chỉ định người kiểm tra, chúng tôi nói độ bao phủ test là 80% (8 trong số 10 yêu cầu).

Việc tính phạm vi độ bao phủ cũng quan trọng.

Nếu bạn làm điều này quá sớm trong quá trình, bạn sẽ thấy rất nhiều khoảng trống vì mọi thứ vẫn chưa hoàn thành. Vì vậy, thông thường nên đợi đến bản build  cuối cùng. Điều này sẽ đưa ra một độ bao phủ test chính xác cho các Yêu cầu cần thực hiện.

### Kinh nghiệm của tôi

Hoàn cảnh 8 năm về trước: Khi tôi có 2 năm kinh nghiệm trong ngành kiểm thử phần mềm, tôi đã nghĩ rằng sẽ ổn thôi nếu tôi không biết một số nguyên tắc cơ bản về kiểm thử phần mềm như một thứ mà người ta có thể học hỏi bằng kinh nghiệm và tôi cũng sẽ làm được.

Tôi đã đúng - và cũng sai.

Đúng bởi vì với kinh nghiệm, bạn học cách nhìn thấy một bức tranh lớn hơn, bạn hiểu ý nghĩa thực sự của "tình huống quan trọng " và bạn hiểu người dùng cuối nhiều hơn.

Sai vì không có điều gì được đề cập đòi hỏi kinh nghiệm, nhưng bạn phải học sớm, điều mà tôi hiểu rất muộn. Đó là yếu tố  khích lệ tôi để viết bài này.

Đây là kinh nghiệm của tôi từ một trong những cuộc phỏng vấn tại thời điểm đó:

"Làm thế nào để bạn chắc chắn rằng test coverage là hoàn thành hoặc tối đa? Tôi đã được hỏi.

Tôi nói:  Tôi sẽ đảm bảo rằng tôi kiểm tra mọi chức năng

Nghĩa là  bạn đang nói rằng một khi bạn kiểm tra tất cả các chức năng, bạn cảm thấy rằng bạn đã bao phủ tối đa ứng dụng / sản phẩm, về mặt kiểm tra, người phỏng vấn phản bác: 

Vâng, vì là khi bạn kiểm tra tất cả các chức năng, bạn tự tin về hành vi ứng dụng / sản phẩm, tôi đáp.

Tôi đồng ý, nhưng câu hỏi của tôi là - nó sẽ giúp bạn tự tin rằng phạm vi kiểm tra của bạn là tối đa hay hoàn thành ?

Tôi đã trở nên thiếu kiên nhẫn, không biết gì về thực tế là tôi sẽ phải học một trong những chủ đề quan trọng nhất về kiểm thử phần mềm - Test Coverage.

Thay vì tái hiện lại các trích đoạn của cuộc phỏng vấn, tôi sẽ tóm tắt ở đây, những gì tôi đã học về Test Coverage. Nhưng trước đó, hãy làm rõ về một điểm -  Test Coverage  không bao giờ có nghĩa là bạn có kiểm tra đủ hay không mà là bạn đang kiểm tra có hoàn hảo hay không ?

### Ý nghĩa Test Coverage

Test Coverage có thể có ý nghĩa khác nhau trong bối cảnh khác nhau. Hãy cùng khám phá những bối cảnh đó từng cái một:

**Độ bao phủ sản phẩm - Những khía cạnh của sản phẩm bạn đã xem xét?**

Khi Test Coverage đo lường về mặt sản phẩm, vùng chính cần tập trung vào là gì  - Vùng sản phẩm nào bạn đã thử nghiệm và vùng nào thì vẫn chưa ?

Ví dụ 1:

Nếu con dao  là một sản phẩm, bạn đang kiểm tra; Không chỉ không tập trung vào việc kiểm tra xem nó cắt rau / trái cây đúng cách hay không mà còn có những khía cạnh khác để tìm kiếm như - người dùng sẽ có thể xử lý nó thoải mái.

Ví dụ # 2:

Nếu notepad là một ứng dụng, bạn đang kiểm tra, kiểm tra các tính năng có liên quan là điều bắt buộc.

Nhưng các khía cạnh khác cần được quan tâm là :  ứng dụng hồi đáp đúng trong khi bạn sử dụng đồng thời các ứng dụng khác hoặc là  ứng dụng không gặp sự cố khi người dùng cố làm điều gì đó bất thường, người dùng được cung cấp thông báo cảnh báo / lỗi thích hợp, người dùng có thể hiểu và sử dụng ứng dụng dễ dàng, nội dung trợ giúp có sẵn khi được yêu cầu...

Nếu bạn không xem xét các tình huống được đề cập, bạn không thể kết luận phạm vi kiểm tra cho ứng dụng đã hoàn tất.

**Độ bao phủ  rủi ro - Những rủi ro nào bạn đã thử nghiệm?**

Độ bao phủ  rủi ro là một khía cạnh khác để có Test Coverage  đầy đủ. Bạn không thể gắn thẻ sản phẩm hoặc ứng dụng dưới dạng "Tested" Cho đến khi bạn cũng kiểm tra các rủi ro liên quan. Độ bao phủ  rủi ro liên quan là một yếu tố quan trọng trong  tổng thể Test Coverage .

Ví dụ 1:

Trong khi thử nghiệm máy bay, nếu một người kiểm tra nói với bạn rằng anh ấy / cô ấy đã kiểm tra đầy đủ hệ thống bên trong của máy bay và nó hoạt động tốt nhưng chỉ có khả năng bay của máy bay không được bao phủ  trong khi thử nghiệm - phản ứng của bạn là gì?

Vâng, đó là những gì có nghĩa là Độ bao phủ  rủi ro. Xác định rủi ro theo ứng dụng / sản phẩm và kiểm tra kỹ lưỡng luôn luôn là một thao tác tốt.

Ví dụ # 2:

Trong khi thử nghiệm một trang web thương mại điện tử, người kiểm tra đã xem xét mọi yếu tố hiệu quả nhưng không xem xét rủi ro về số lượng người dùng truy cập trang web đồng thời và vào ngày Super OFFER, rủi ro không được coi là một sai lầm lớn.

**Độ bao phủ yêu cầu - Những yêu cầu bạn đã thử nghiệm?**

Nếu một sản phẩm hoặc ứng dụng được phát triển rất tốt nhưng nếu nó không phù hợp với yêu cầu của khách hàng thì nó cũng không có tác dụng. Độ bao phủ yêu cầu  trong khi thử nghiệm cũng quan trọng như Độ bao phủ sản phẩm .

Ví dụ 1:

Bạn đã yêu cầu thợ may khâu chiếc váy của bạn và cài vào những nút hiển thị màu xanh con công trên đường viền cổ áo.

Trong khi khâu chiếc váy, thợ may nghĩ rằng đặt những nút đó trên đường viền cổ sẽ trông không đẹp nên anh ta đã khâu đường viền màu vàng thay thế. Vào ngày dùng thử, chắc chắn, khách hàng không hài lòng đã hét vào nhà may vì không tuân thủ các yêu cầu.OK?

Ví dụ # 2:

Trong khi thử nghiệm ứng dụng trò chuyện, người kiểm tra đã quan tâm đến tất cả các điểm quan trọng như nhiều người dùng trò chuyện trong một nhóm, hai người dùng trò chuyện độc lập, tất cả các loại biểu tượng cảm xúc có sẵn, cập nhật được gửi cho người dùng ngay lập tức... nhưng quên xem xét tài liệu yêu cầu, rõ ràng đã đề cập rằng khi hai người dùng trò chuyện độc lập, nên bật tùy chọn cuộc gọi video.

Khách hàng phàn nàn rằng nó sẽ cho phép gọi, trong khi hai người dùng trò chuyện độc lập. Bạn có thể tưởng tượng những gì sẽ xảy ra với ứng dụng trò chuyện.

### Làm thế nào để đáp ứng một phương pháp Test Coverage thích hợp?

**Nhận thức **

Trước tiên, nhóm QA phải biết có bao nhiêu công việc liên quan và task design đang ở đâu. Bằng cách này, họ sẽ nhận thức được nếu có thêm các thử nghiệm được thêm vào. Để làm điều này, bạn có thể sử dụng RTM như một cách thông thường.

Thứ hai, kiểm tra resource và quy trình thực hiện test để xem mọi thứ có được kiểm tra theo cách hiệu quả hơn không.

### Làm thế nào để đảm bảo mọi thứ được kiểm tra?

* Mỗi tester cần nhận thức được các yêu cầu và phương pháp kiểm tra
* Ưu tiên các Yêu cầu của bạn và tập trung năng lượng của bạn ở nơi cần thiết nhất
* Được thông báo về bản release hiện tại với phiên bản trước để bạn có thể xác định các yêu cầu quan trọng chính xác hơn và tập trung vào độ bao phủ tối đa
* Đáp ứng được test auto
* Sử dụng các công cụ quản lý test
* Phân công công việc thông minh - Chuyển nguồn lực tốt nhất của bạn tới các nhiệm vụ quan trọng và để người thử nghiệm mới khám phá nhiều hơn để có góc nhìn mới mẻ
* Duy trì một danh sách kiểm tra cho tất cả các task và hoạt động khác
* Tương tác nhiều hơn với các nhóm Dev / Scrum / BA của bạn để hiểu rõ hơn về hành vi ứng dụng
* Theo dõi tất cả các chu kỳ build và fix của bạn
* Xác định hầu hết các vấn đề ảnh hưởng trong bản build ban đầu (khi có thể) để những vấn đề sau có thể hoạt động để ổn định hơn và tiếp cận các vùng bị block bởi các vấn đề trước

### Các lĩnh vực và phương pháp quan trọng để thử nghiệm hiệu quả

**# 1) Resource chéo : Trao đổi nhiệm vụ giữa các thành viên trong nhóm của bạn. Điều này giúp cải thiện sự tham gia và ngăn chặn sự tập trung kiến thức.**

**# 2) Bao phủ độ tương thích: Đảm bảo bạn biết về các loại  trình duyệt và nền tảng khác nhau để kiểm tra ứng dụng của bạn.**

**# 3) Tự làm chủ : Làm cho người kiểm tra có trách nhiệm và cung cấp cho họ quyền tự do (với sự giám sát và hỗ trợ tất nhiên) cho mô-đun / task mà họ đang làm việc. Điều này giúp xây dựng trách nhiệm và cho phép họ thử các cách sáng tạo thay vì đi theo cách có sẵn .**

**# 4) Deadline : Biết deadline trước khi bắt đầu giai đoạn thử nghiệm giúp lập kế hoạch hiệu quả**

**# 5) Giao tiếp: Giữ communicate tốt với devs và các team khác để biết những hoạt động  đang diễn ra.**

**# 6) Duy trì RTM: Đây được đánh giá là công cụ tốt cho các Stakeholders hoặc Khách hàng, dựa trên lịch Release được xác nhận**

### Ưu điểm của Testing Coverage cho Tester :

* Nó giúp với việc check độ ưu tiên của task 
* Nó giúp đạt được 100% độ bao phủ Requirements  hoặc nói cách khác, nó ngăn chặn rò rỉ yêu cầu
* Phân tích tác động trở nên dễ dàng hơn
* Hữu ích trong việc xác định các kịch bản  EXIT
* Cho phép leader test team chuẩn bị báo cáo thử nghiệm rõ ràng

**Phần kết luận**

Test coverage không chỉ dừng lại với bối cảnh được đề cập. Có nhiều điểm khác cần được xem xét khi nói đến nó.

Không phải lúc nào cũng đúng khi bạn kiểm tra nhiều hơn, kết quả sẽ tốt hơn. Trong thực tế, khi bạn thử nghiệm nhiều hơn mà không có chiến lược rõ ràng, có thể bạn sẽ đầu tư rất nhiều thời gian.

Với cách tiếp cận có cấu trúc hơn, hướng đến mục tiêu 100% yêu cầu và phương pháp thử nghiệm hiệu quả, bạn sẽ không lăn tăn về chất lượng.

Chúng tôi hy vọng các kỹ thuật được nêu trong bài viết này sẽ cung cấp cho bạn một số gợi ý.

Note : Thuật ngữ  RTM : Requirements Traceability Matrix
Ma trận truy xuất yêu cầu (RTM) là một tài liệu cấp cao để lập bản đồ và theo dõi các yêu cầu của người dùng với các test cases để đảm bảo rằng cho mọi yêu cầu ở tất cả mức độ kiểm thử đều đạt được.

https://www.softwaretestinghelp.com/test-coverage/