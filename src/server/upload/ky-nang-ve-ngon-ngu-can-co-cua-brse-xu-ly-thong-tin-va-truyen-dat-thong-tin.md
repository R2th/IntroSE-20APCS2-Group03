BrSE được biết đến như là 1 vị trí quan trọng trong tổ chức và quy trình của 1 dự án outsource hoặc offshore, đứng giữa 2 bên team dự án (Việt Nam) và khách hàng (Nhật Bản), đảm bảo cho công việc của dự án được diễn ra trôi chảy.

Ngoài kĩ năng về ngôn ngữ (tiếng Nhật), 1 BrSE còn phải có hiểu biết và linh hoạt đối phó với sự khác biệt về văn hoá, con người. Bên cạnh đó, vị trí này còn đòi hỏi kĩ năng quản lý do tính chất công việc yêu cầu nghiệp vụ quản lý dự án như quản lý về con người, quản lý tiến độ, ...

Bài viết dưới đây sẽ tập trung nói về kĩ năng được cho là vô cùng cần thiết đối với 1 BrSE: kỹ năng về ngôn ngữ, giao tiếp.

Việc làm BrSE cho 1 dự án của Nhật Bản thì việc thành thạo tiếng Nhật luôn luôn là 1 lợi thế không thể phủ nhận. Tuy nhiên, điều đó không có nghĩa cứ giỏi tiếng Nhật thì giao tiếp sẽ tốt, và cũng không có nghĩa không có trình độ tiếng Nhật xuất sắc thì sẽ không điều hành được dự án trơn tru.

Kỹ năng về ngôn ngữ ở đây chủ yếu nằm ở 2 vấn đề: xử lý thông tin, và truyền đạt thông tin

# 1. Xử lý thông tin:

Thực ra việc xử lý thông tin thì không chỉ BrSE, mà 1 biên phiên dịch (comtor) cũng cần có, nhưng khác nhau ở mức độ xử lý đến đâu.

Khi khách hàng đưa ra 1 yêu cầu như thế này:

-----
Ví dụ 1: 
Yêu cầu là chỉnh sửa phần banner của Top page. Thay đổi từ hiển thị 1 ảnh quảng cáo trên banner thành hiển thị 3 ảnh quảng cáo trên banner, khi user swipe (trượt) ảnh sang phải xem tiếp được các ảnh khác

Thì việc của 1 BrSE phải làm trước hết là đọc hiểu nội dung này. (Những từ ngữ, cách nói khó hiểu thì đương nhiên cần hỏi lại khách hàng để khách hàng giúp giải nghĩa). Tuy nhiên 1 BrSE có kinh nghiệm sẽ nhận ra những thông tin còn thiếu sót, hoặc những vấn đề nếu không làm rõ rất khó cho đội ngũ engineer thực hiện, ví dụ:

 + Hiện tại các ảnh quảng cáo trên banner sẽ slide tự động sau 5s, vậy với spec mới này thì có bỏ logic slide tự động đi hay không?
 + Việc thay đổi này dẫn đến thay đổi về design, vậy khi nào sẽ nhận được design mới? ..v.v.

-----
Ví dụ 2: 
Yêu cầu là tạo event mỗi khi user bật video (app này cho phép người dùng xem video trực tuyến) để gửi lên Firebase Crashlytics, và đặt tên event này là "timestamp.play.video"

Nhận ra vấn đề đặt tên cho event như vậy thì Firebase sẽ báo lỗi, BrSE đặt vấn đề luôn với khách hàng: *"Theo tôi được biết thì Fisebase sẽ báo lỗi nếu event name có dấu chấm ".", hay là chúng ta dùng underscore, tức là sửa event name thành "timestampplayvideo" có được ko?*

-----

Trước khi truyền đạt spec (yêu cầu) như vậy tới engineer, BrSE sẽ thực hiện 1 công việc đó là đặt câu hỏi với khách hàng về những vấn đề trên, cùng khách hàng tìm ra giải pháp hợp lý rồi mới "tạo task" cho engineer.

Muốn nhận ra thông tin có vấn đề hoặc còn thiếu, BrSE cần hiểu rõ về hệ thống mà mình đang làm, và có chút kiến thức về công nghệ thông tin. Những thông tin kiểu như vậy không nhất thiết phải là engineer mới biết mà 1 BrSE không có nền tảng về kĩ thuật vẫn có thể tìm hiểu và tích luỹ được.

Mặc dù vậy, không phải đối với yêu cầu nào BrSE cũng nhìn ra ngay được vấn đề, trường hợp như vậy thì BrSE có thể trao đổi cùng với Technical leader để hỏi ý kiến, cùng leader đặt ra các câu hỏi, tìm ra vấn đề vướng mắc đối với mỗi yêu cầu của khách hàng. Không ai là hoàn hảo và biết tất cả mọi thứ, vì thế việc BrSE nhờ đến sự trợ giúp của technical leader hay các member trong dự án để hiểu hơn về spec là chuyện bình thường.

Đặt câu hỏi để làm rõ hơn yêu cầu là điều vô cùng cần thiết. Có 1 sự thực là nếu không có câu hỏi nào được đặt ra, thì hoặc là yêu cầu đó quá dễ, quá rõ ràng, hoặc là ... chưa hiểu gì.

Ngay cả khi BrSE thực ra đã hiểu nội dung yêu cầu của khách rồi, thì thay vì trả lời *"Tôi đã hiểu", "OK",* thì nên nhắc lại nội dung yêu cầu nhưng diễn giải theo cách hiểu của mình: 

*"Tôi hiểu phần spec này có nghĩa là...., như vậy tôi có hiểu sai gì không?"*, hoặc 

*"Tôi hiểu rồi, vậy chúng tôi sẽ làm như thế này...xyz..."*

# 2. Truyền đạt thông tin

Ở đây chia ra thành truyền đạt thông tin cho đội dự án, và truyền đạt thông tin cho phía khách hàng (đối với 1 số trường hợp là PM người Nhật nếu BrSE không làm việc trực tiếp cùng khách hàng)

### Truyền đạt thông tin cho đội dự án

Việc truyền đạt thông tin, thông thường là nội dung spec, yêu cầu của khách hàng tới đội dự án đòi hỏi sự rõ ràng, dễ hiểu.

Việc truyền đạt có rõ ràng hay không, phụ thuộc vào tư duy phân tích và sự hiểu biết về hệ thống, dịch vụ mà team đang làm, chứ không phải vấn đề nằm ở chỗ bạn dịch có tốt hay không. 

Đối với engineer, việc đọc hiểu 1 đoạn spec bằng text dài dòng luôn luôn khó khăn hơn rất nhiều so với đọc hiểu 1 sơ đồ, hình ảnh, hoặc text dưới dạng gạch đầu dòng. Thống nhất về cách gọi tên các chức năng, màn hình, các trường,..đặc thù trong dự án cũng là cách giúp cho BrSE giải thích spec dễ hiểu hơn. 

### Truyền đạt thông tin cho khách hàng (PM)

Việc cung cấp thông tin cho khách hàng đòi hỏi tính thuyết phục và tin cậy.

Khách hàng không phải ai cũng thích suy nghĩ, đa phần họ thích được lựa chọn hoặc đưa ra quyết định hơn.

Keyword ở đây là ***suy nghĩ hộ khách***. Khi muốn đặt câu hỏi hoặc xác nhận thông tin với khách hàng, thì việc BrSE nên làm là tự  (hoặc cùng với team dự án) suy nghĩ trước câu trả lời, và sẽ hỏi hoặc xác nhận khách hàng dưới hình thức câu hỏi Yes/ No hoặc các option.  Việc của khách hàng sẽ là đưa ra quyết định cuối cùng, dựa vào những thông tin, sự lựa chọn mà phía BrSE nêu ra.

-----
Ví dụ 1: 
Khi muốn hỏi khách hàng về môi trường sẽ sử dụng trong dự án, thay vì hỏi

*"Chúng ta sẽ sử dụng những môi trường nào trong dự án này?"*

thì BrSE tốt hơn nên đặt vấn đề như sau

*"Tôi nghĩ chúng ta nên sử dụng môi trường develop và staging để phát triển trong dự án này. Về quy trình, sau khi test ở môi trường develop không vấn đề gì thì chúng tôi sẽ đưa lên môi trường staging và cho các bạn cùng test sản phẩm. Các bạn thấy như vậy có ổn không"*

-----
Ví dụ 2:
Khi muốn xác nhận về công cụ để đưa sản phẩm (ví dụ sản phẩm là app chẳng hạn) lên cho QA và khách hàng test, thay vì hỏi 

*"Bạn muốn chúng tôi sử dụng tool nào để build app lên test?"*

thì BrSE sẽ đề xuất các option cho khách hàng lựa chọn như thế này:

*"Chúng tôi đề xuất 2 tool sau để build app lên test, các bạn muốn sử dụng tool nào?*

1) Crashlytics (Fabric)

Ưu điểm:
 + Build tự động bằng Fastlane
 + Chúng tôi có sẵn tài khoản và không phát sinh thêm chi phí
 + Chúng tôi có sẵn đội ngũ có kinh nghiệm về dựng Fabric nên việc chia sẻ sản phẩm qua Fabric đối với chúng tôi khá nhanh và tiện lợi, dễ dàng hỗ trợ khi có vấn đề xảy ra

Nhược điểm:
 + Cần add UDID khi thêm tester 
 + Có thể các bạn chưa quen sử dụng
2) Deploygate:

Ưu điểm: 
 + Hầu như không mất công setup
 + Dễ dàng cho developer khi upload bản build từ local lên 
 + Không cần add UUID của tester mà bất cứ ai cũng có thể tải bản build về từ app của deploygate hoặc từ browser
 + Tiện lợi, dễ dàng khi muốn update distribution

Nhược điểm:
 + Hạn chế số lượng bản build được phép upload lên
 + Do chưa có sẵn tài khoản nên sẽ phát sinh thêm chi phí để tạo tài khoản enterprise "

-----

Đây là tư duy ***đề xuất***, cùng khách hàng suy nghĩ những phương án tốt nhất để nâng cao chất lượng dự án.

# 3. Tóm lại

Làm dự án outsource rất dễ đưa đội dự án đến tư duy theo lỗi mòn: "Khách bảo gì thì làm nấy".

Nhưng có lẽ cần thay đổi tư duy ấy, bởi vì để có được sự hài lòng của khách hàng thì BrSE nói riêng, team dự án nói chung cần đặt mình vào vị trí của khách, như vậy sẽ trở thành "parter" được khách hàng tin tưởng.