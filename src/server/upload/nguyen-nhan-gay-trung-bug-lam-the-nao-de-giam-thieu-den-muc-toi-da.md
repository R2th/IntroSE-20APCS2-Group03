Dự án cả team đang yên ổn, kịp tiến độ, các task được giao, các bug được tìm thấy đều được làm và fix một cách tối ưu nhất. Đột nhiên dev nhận được bug mà vừa fix xong ở ticket trước. Dev nghĩ chắc team QA log dư một bug. Sẽ chẳng sao nếu cả dự án chỉ có một vài bug trùng. Tuy nhiên nếu số lượng đó (Duplicate bug) ngày càng tăng thì dự án sẽ ra sao? Tình trạng sprint bị kéo dài, không kịp release, các đơn OT (over time) liên tục được request, tinh thần cả team đi xuống. Vậy nguyên nhân là do đâu? Và cách khắc phục như thế nào?
# NGUYÊN NHÂN GÂY TRÙNG BUG TRONG TESTING
## 1. Thiếu sót trong việc báo cáo và theo dõi bug.
Theo thiết kế, các công cụ phát triển như: SQL, PHP, FileMaker cung cấp cho các team dev quyền tự do đặt tên ngẫu nhiên cho các: bảng (tables), trường (fields), kịch bản (scripts), và bố cục hiển thị (display layouts). Tương tự như vậy, các team test cũng có thể tự do tạo ra tiêu đề cho các bug. Dẫn đến việc các tester trong cùng một team đang log bug theo từng cách riêng biệt và không biết khi nào bug đã được log. Một số team thậm chí còn thiếu quyền truy cập vào một số công cụ theo dõi bug như JIRA, Bugzilla, Fogbugz ... Trong trường hợp này, tester đôi khi phải log bug thông qua bảng tính excel hoặc google doc. Dẫn đến việc gây khó khăn cho tester khi theo dõi bug. Không biết dev đã fix xong chưa? Bug đã được test confirm chưa?
## 2. Nhiều tester cùng test một chức năng giống hoặc tương tự nhau.
Trong điều kiện làm việc khi mà các thành viên trong một team không ngồi cùng nhau tại một văn phòng thì việc trùng bug là điều khó tránh khỏi. Có trường hợp nhiều tester được yêu cầu test các chức năng giống nhau hoặc tương tự. Và một test case thường được test với nhiều kịch bản thử nghiệm khác nhau với nhiều cấu hình phần cứng và phần mềm khác nhau. 

***Ví dụ:*** một nhà bán lẻ trực tuyến họ muốn thử nghiệm quy trình thanh toán với các trạng thái khác nhau của giỏ hàng, phương thức thanh toán và với nhiều loại người dùng khác nhau đối với nhiều trình duyệt khác nhau. Kèm theo đó là ứng dụng có thể thanh toán trên mobile. 
Sẽ hơi khó khăn khi việc test này được thực hiện chỉ bởi một người, nhưng nếu hai người cùng test một chức năng thì làm thế nào để họ biết bug được tìm ra đó đã được log hay chưa?
## 3. Tổng số bug tìm ra được dùng làm thước đo năng suất (Productivity) và giá trị (Value).
Nhiều team QA đo lường năng suất làm việc của thành viên bằng các issues (bug) được tìm thấy. Điều này có thể dẫn đến việc các thành viên trong nhóm cảm thấy bắt buộc phải gửi nhiều issues/ bug nhất có thể để cho thấy rằng họ đang làm việc chăm chỉ và tiến bộ trong suốt quá trình test của họ. 
## 4. Trùng tiêu đề bug, các tiêu đề bug có chất lượng kém.
*“High-Quality Search Results” are an essential part of “Bug Reporting”* - “Các kết quả tìm kiếm với chất lượng cao nhất” là một phần thiết yếu của việc “báo cáo bug”. Các báo cáo bug được “diễn đạt kém” hoặc bị “trùng lặp” dẫn đến hiệu suất công việc giảm, mất nhiều thời gian của team dev và team test. Giảm [ROI](https://vi.wikipedia.org/wiki/T%E1%BB%B7_su%E1%BA%A5t_ho%C3%A0n_v%E1%BB%91n) của các nhà đầu tư dự án.
# HƯỚNG GIẢI QUYẾT VÀ CÁCH KHẮC PHỤC
## 1. Sử dụng công cụ quản lý Test Case tích hợp.
Tích hợp công cụ theo dõi bug với một công cụ quản lý Test Case tập trung. Để thực sự tránh trùng lặp lỗi tester phải xem cách mà các công cụ kiểm tra liên kết các bug cho các test case và ngược lại. Điều quan trọng là tester phải biết xem các test case nào có bug liên quan đã được log trên hệ thống. 
## 2. Cải thiện giao tiếp.
Để hạn chế phần nào việc trùng bug, các thành viên trong cùng một team nên cải thiện giao tiếp với nhau. Khi test cùng một chức năng, các thành viên được giao cùng task nên trao đổi khi tìm thấy bug. Xem là bug đó đã được log chưa? Nếu bug đã tồn tại, mọi người có thể confirm với người đã log xem case có trùng nhau hay không và có cần thiết phải log bug mới hay không? Điều này không chỉ làm giảm thời gian log bug, mà còn có thể cải thiện việc báo cáo bug vì bug được cập nhật liên tục với kết quả từ lần test cuối cùng. Bên cạnh đó nó cũng nâng cao kỹ năng mềm, kỹ năng giao tiếp và kỹ năng làm việc nhóm (teamwork) hai trong số các kỹ năng cần thiết cho mọi người kh đi làm.

***Ví dụ:***  một bug giao diện xảy ra trên trình duyệt Firefox đã được log trước đó. Sau đó một tester khác lại tìm được bug này trên Chrome. Vậy tester đó chỉ việc update thêm môi trường xảy ra bug ở ticket đã có.
## 3. Tập trung vào kiểm tra chất lượng (Quality Testing) và báo cáo.
“Tập trung vào chất lượng không phải số lượng”-“*Focus on quality not quantity*”. Dễ nói, nhưng đôi khi khó làm. Các tester muốn cho mọi người thấy rằng họ đã hoàn thành được một điều gì đó. Nên họ log tất cả bug tìm thấy được mà không quan tâm bug đó đã được log hay chưa. Xét cho cùng, những người tester khi làm remote đa phần họ sẽ không được ghi nhận thời gian làm việc khi họ không log bug - dù chất lượng làm việc của họ có cao đến mức nào. Điều này nghĩa là họ cần một hệ thống liên kết (link) các bug lại với nhau và một hệ thống báo cáo số lượng các bug liên kết.

Nếu dự án của bạn chỉ tập trung xem các bug liên quan (linking bug) thay vì xem tất cả các bug được log trên hệ thống thì tester cần phải đảm bảo báo cáo cũng được điều chỉnh/cập nhập để hiển thị các bug liên quan với nhau (dán link bug JIRA vào case bị lỗi tương ứng). Ngoài ra, có thể cập nhật thông tin về môi trường test, cấu hình máy test của tester đối với các lỗi đặc biệt chỉ xảy ra với một version, hệ điều hành nhất định. Điều này giúp cho team dev dễ dàng hơn trong việc fix và team test cũng dễ hơn trong việc test confirm bug.
## 4. Đặt tiêu đề bug riêng biệt.
Bốn yếu tố tạo nên một tiêu đề (title) bug riêng biệt:
1. Đặt tên theo một công thức.
2. Ngôn ngữ dùng để báo cáo.
3. Kết hợp tiêu đề bug.
4. Từ ngữ dùng để diễn tả.

Hai yếu tố đầu tiên được xem xét và cho rằng là yếu tố chủ chốt làm tăng hiệu quả quản lý cho hầu hết các dự án. Hai yếu tố còn lại là những yếu tố có thể cải thiện đáng kể cho nhiều dự án. Vì vậy, chúng ta hãy tuần tự nói về các yếu đó:
### 4.1. Đặt tên theo công thức (Naming Formula).
Khi làm việc trong một dự án team QA thường sẽ được yêu cầu log bug theo một công thức chung. 

***Ví dụ:*** Dự án được thực hiện trên 3 nền tảng, Web, iOS với 2 vai trò người dùng Shop, User và có nhiều màn hình cần test vậy công thức cho việc đặt tên bug sẽ là:

**[Tên nền tảng/ hệ điều hành][Vai trò người dùng][ID màn hình][Tên màn hình] chủ đề của bug**

*Trong đó:*
- **[Tên nền tảng/ hệ điều hành]**: Web; iOS; Android.
- **[Vai trò người dùng]**: Shop; User.
- **[ID màn hình]**: SP312; SP 311; ...
- **[Tên màn hình]**: Login screen; Register screen;... 
- **Chủ đề bug**: tùy theo từng loại bug mà sẽ có chủ đề tương ứng.
### 4.2. Ngôn ngữ dùng để báo cáo (Reporting language).
Ngày nay đa phần các dự án của công ty đều có khách hàng là người nước ngoài và để không bị khó khăn trong giao tiếp thì “Tiếng anh” là ngôn ngư ưu tiên hàng đầu. Khi log bug cũng vậy team QA thống nhất sử dụng một ngôn ngữ để log trong suốt quá trình tham gia dự án. 
### 4.3. Kết hợp tiêu đề bug (Combination “Bug” title).
Đôi khi, một bug có thể yêu cầu được log với tên được kết hợp từ nhiều title.

***Ví dụ:*** [Web][User][SP112][modal chọn ngày, giờ/ Modal Calendar] Modal không ẩn đi khi người dùng đã chọn ngày giờ đến lấy.

Trong trường hợp này, vấn đề xỷ ra với Modal calendar nhưng cụ thể là chức năng chọn ngày, giờ của Modal calendar. Bug này có thể được log theo hai cách sau:

a. Modal calendar không ẩn đi sau khi người dùng đã chọn ngày, giờ đến lấy.

b. Modal chọn ngày, giờ không ẩn đi sau khi người dùng chọn ngày, giờ đến lấy.

Cả hai cách đều đúng và gần như là giống nhau về mặt ý nghĩa. Tuy nhiên nên kết hợp 2 tiêu đề trên để đảm bảo rằng, bug đó sẽ được tìm thấy cho một trong hai cách tìm kiếm theo “Modal Calendar” hoặc “Modal chọn ngày, giờ”.
### 4.4. Từ ngữ dùng để diễn tả (Vocabulary).
Trong một team khi mà các thành viên đến từ nhiều quốc gia với nhau, ngoài ngôn ngữ mẹ đẻ thì tiếng anh là ngôn ngữ thứ hai của họ. Dẫn đến sự đa dạng về từ vựng được sử dụng. Chính vì điều đó nên việc các bug bị trùng về mặt ngữ nghĩa và các tiêu đề bug kém chất lượng là khó tránh khỏi. Hướng giải quyết là tạo một “[Lexicon](https://www.hellochao.vn/ngu-phap-tieng-anh/dictionary-vs-lexicon-vs-glossary-su-khac-nhau-giua-dictionary-lexicon-va-glossary/?aid=45c40cce2e2d77bd1~151c51c7c695MO)”. Đây sẽ là một file quản lý các từ vựng chuyên dùng cho dự án nó sẽ được tạo từ khi start dự án và sẽ được chỉnh sửa, cập nhập thường xuyên bởi các thành viên trong team test. File này có thể được tạo thông qua google excel, google doc, project wiki,...
# KẾT LUẬN
Lỗi trùng bug (duplicate bug) là một vấn đề khó khăn không chỉ đối với team QA. Các bug bị trùng xảy ra thường xuyên làm cho việc phát triển (code) của dự án/app bị chậm trễ và làm các báo cáo trở nên lộn xộn. 

Sử dụng một công cụ quản lý bug hiệu quả, cải thiện kỹ năng giao tiếp của các thành viên trong dự án. Team test có những quy định chung ngay từ đầu và sẽ thay đổi linh hoạt. Những điều đó không những nâng cao năng suất làm việc của team QA, giảm số lượng bug bị trùng mà còn làm cho dự án được hoàn thành một cách tốt nhất. 

Bên cạnh đó các thành viên còn tự mình cải thiện được kỹ năng giao tiếp, kỹ năng làm việc nhóm và đặc biệt là sẽ gắn kết được mọi người trong team với nhau.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
*Link tham khảo:*

- http://blog.qmetry.com/how-to-avoid-the-problem-of-duplicate-issues/
- http://www.logigear.com/magazine/test-methods-and-metrics/how-to-reduce-duplicate-bug-reporting-by-75-percent/