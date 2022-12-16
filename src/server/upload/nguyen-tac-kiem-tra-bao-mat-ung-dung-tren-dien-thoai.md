## Chiến lược kiểm tra bảo mật ứng dụng dành cho thiết bị di động:<br>
Mạng di động đã trao quyền cho người dùng thực hiện hầu như tất cả các hoạt động kinh doanh, tài chính, xã hội, v.v. của họ, và sau đó hầu như tất cả các công ty đã khởi chạy các ứng dụng di động của riêng họ.<br>
Các ứng dụng này cực kỳ hiệu quả và họ thực hiện các giao dịch hàng ngày của chúng tôi. Nhưng luôn luôn có một mối quan tâm lớn về an ninh và bảo mật dữ liệu. Các giao dịch xảy ra trên một mạng 3G hoặc 4G do đó trở thành một bữa tiệc cho các hackers. Có khả năng 100% dữ liệu cá nhân khả dụng đối với hackers, có thể là thông tin đăng nhập Facebook của bạn hoặc bằng chứng xác thực tài khoản ngân hàng của bạn.<br>
Tính bảo mật của các ứng dụng này trở nên rất quan trọng đối với hoạt động kinh doanh của bất kỳ công ty nào. Điều này, đến lượt nó, sự cần thiết phải kiểm tra bảo mật của tất cả các ứng dụng di động và do đó được coi là một thử nghiệm quan trọng được thực hiện bởi người thử nghiệm cho một ứng dụng.<br>
![](https://images.viblo.asia/fc489fe2-8cf7-4ff4-ba0d-45c414b9837a.jpg)<br>
Điều này cực kỳ quan trọng đối với các ứng dụng tài chính, xã hội và thương mại. Trong những trường hợp như vậy, ứng dụng không được phát hành và cũng không được chấp nhận bởi khách hàng nếu việc kiểm tra bảo mật không được thực hiện.<br>
**Ứng dụng dành cho thiết bị di động được phân loại thành 3 loại:**<br>
**Ứng dụng web:** Các ứng dụng này giống như các ứng dụng web thông thường được truy cập từ điện thoại di động được tích hợp trong HTML.<br>
**Ứng dụng gốc:** Đây là những ứng dụng gốc cho thiết bị được xây dựng bằng các tính năng của hệ điều hành và chỉ có thể chạy trên hệ điều hành cụ thể đó.<br>
**Ứng dụng hỗn hợp:** Các ứng dụng này trông giống như bản địa nhưng chúng hoạt động giống như các ứng dụng web giúp sử dụng tốt nhất cả tính năng web và bản địa.<br>
![](https://images.viblo.asia/af1ae243-fd2e-45bb-940f-73be545507d7.jpg)<br>
## Tổng quan về kiểm tra bảo mật<br>
Cũng giống như chức năng và yêu cầu kiểm tra, kiểm tra bảo mật cũng cần một phân tích chuyên sâu của ứng dụng cùng với một chiến lược được xác định rõ để thực hiện thử nghiệm hiện tại.<br>
Do đó tôi sẽ đưa ra 'thách thức' và 'nguyên tắc' về kiểm tra an ninh chi tiết trong hướng dẫn này.<br>
Dưới 'thách thức', chúng tôi sẽ bao gồm các chủ đề sau:<br>
- Phân tích mối đe dọa và mô hình hóa<br>
- Phân tích lỗ hổng<br>
- Các mối đe dọa bảo mật cao nhất cho ứng dụng<br>
- Mối đe dọa bảo mật từ hackers<br>
- Mối đe dọa bảo mật từ điện thoại được root và jailbroken<br>
- Mối đe dọa bảo mật từ quyền ứng dụng<br>
- Mối đe dọa bảo mật khác với ứng dụng Android và iOS<br>

Theo 'nguyên tắc', chúng tôi sẽ bao gồm các chủ đề sau:<br>
- Kiểm tra bảo mật thủ công với các bài kiểm tra mẫu<br>
- Kiểm tra bảo mật dịch vụ web<br>
- Thử nghiệm bảo mật ứng dụng (ứng dụng khách)<br>
- Thử nghiệm tự động hóa<br>
- Thử nghiệm cho các ứng dụng Web, Native và Hybrid<br>

Những thách thức mà các QA phải đối mặt để kiểm tra bảo mật của một ứng dụng di động<br>
Trong bản phát hành đầu tiên của một ứng dụng, điều rất quan trọng đối với QA là thực hiện kiểm tra bảo mật chuyên sâu về ứng dụng. Trên một mức độ rộng, kiến thức về bản chất của ứng dụng, các tính năng của hệ điều hành và các tính năng của điện thoại đóng một vai trò quan trọng trong việc thiết kế một kế hoạch thử nghiệm 'hoàn chỉnh'.<br>
Có rất nhiều thứ để kiểm tra và sau đó điều quan trọng là phân tích ứng dụng và vạch ra tất cả những gì cần phải được kiểm tra.<br>
**Vài thách thức được đề cập dưới đây:**<br>
## Phân tích mối đe dọa và mô hình hóa
Khi thực hiện phân tích mối đe dọa, chúng ta cần nghiên cứu các điểm quan trọng nhất:<br>
- Khi một ứng dụng được tải xuống từ Cửa hàng Play và được cài đặt, có thể nó đã được tạo cho cùng một ứng dụng. Khi ứng dụng được tải xuống và cài đặt, để xác minh tài khoản Google hoặc tài khoản iTunes đã hoàn tất. Vì vậy, một nguy cơ thông tin của bạn là hạ cánh trong tay của hackers.<br>
- Thông tin đăng nhập của người dùng (trong trường hợp Đăng nhập một lần) được lưu trữ, do đó các ứng dụng xử lý thông tin đăng nhập cũng cần phân tích mối đe dọa. Là người dùng, bạn sẽ không đánh giá cao nếu ai đó sử dụng tài khoản của bạn hoặc nếu bạn đăng nhập và thông tin của người khác được hiển thị trong tài khoản của bạn.<br>
- Dữ liệu được hiển thị trong ứng dụng là mối đe dọa quan trọng nhất cần được phân tích và bảo mật.<br>
- Dữ liệu được gửi và nhận từ dịch vụ web cần phải được bảo mật để bảo vệ dữ liệu khỏi cuộc tấn công. Các cuộc gọi dịch vụ cần được mã hóa vì mục đích bảo mật.<br>
- Tương tác với các ứng dụng của bên thứ ba khi đặt hàng trên một ứng dụng thương mại, nó kết nối với ngân hàng net hoặc PayPal hoặc PayTM để chuyển tiền và cần phải được thực hiện thông qua kết nối an toàn.<br>
![](https://images.viblo.asia/605c1054-152b-4123-a191-aceb1ae0260b.jpg)<br>
## Phân tích lỗ hổng
Lý tưởng nhất, theo phân tích cho các lỗ hổng bảo mật, tính hiệu quả của các biện pháp đối chiếu và để kiểm tra mức độ hiệu quả của các biện pháp trên thực tế.<br>

Trước khi thực hiện phân tích lỗ hổng, hãy đảm bảo rằng toàn bộ nhóm đã sẵn sàng và chuẩn bị với danh sách các mối đe dọa bảo mật quan trọng nhất, giải pháp để xử lý mối đe dọa và trong trường hợp ứng dụng đang hoạt động được xuất bản, danh sách trải nghiệm (lỗi hoặc sự cố được tìm thấy trong các bản phát hành trước).<br>

Ở cấp độ rộng, thực hiện phân tích tài nguyên mạng, điện thoại hoặc hệ điều hành sẽ được ứng dụng sử dụng cùng với tầm quan trọng của tài nguyên. Ngoài ra, phân tích các mối đe dọa quan trọng nhất hoặc cấp cao nhất là gì và cách bảo vệ như thế nào.<br>

Nếu xác thực để truy cập vào ứng dụng được thực hiện, thì đó là mã xác thực được viết trong nhật ký và có thể tái sử dụng không? Thông tin nhạy cảm có được ghi trong các tệp nhật ký điện thoại không?<br>
## Các mối đe dọa bảo mật hàng đầu cho ứng dụng
- Sử dụng nền tảng không đúng: Maltreat các tính năng của điện thoại hoặc hệ điều hành như cấp quyền cho ứng dụng để truy cập danh bạ, thư viện, v.v., ngoài nhu cầu.<br>
- Lưu trữ dữ liệu thừa: Lưu trữ dữ liệu không mong muốn trong ứng dụng.
- Xác thực tiếp xúc: Không xác định người dùng, không duy trì danh tính của người dùng và không duy trì phiên người dùng.<br>
- Giao tiếp không an toàn: Không giữ phiên SSL đúng.<br>
- Mã bên thứ ba độc hại: Viết mã của bên thứ ba không cần thiết hoặc không xóa mã không cần thiết.<br>
- Không thể áp dụng các điều khiển phía máy chủ: Máy chủ phải cho phép dữ liệu nào cần được hiển thị trong ứng dụng?<br>
- Thiếu bảo vệ dữ liệu khi chuyển tiếp: Không mã hóa dữ liệu khi gửi hoặc nhận qua dịch vụ web, v.v.<br>
## Mối đe dọa an ninh từ hackers<br>
Thế giới đã trải qua một số các hacks tồi tệ nhất và gây sốc ngay cả sau khi có bảo mật cao nhất có thể.<br>
Vào tháng 12 năm 2016, Hiệp hội Giải trí Thể thao điện tử (ESEA) đã cảnh báo người chơi về sự vi phạm bảo mật khi họ phát hiện ra rằng thông tin nhạy cảm như tên, id email, địa chỉ, số điện thoại, thông tin đăng nhập, Xbox ID v.v. bị rò rỉ.<br>
Không có cách cụ thể để đối phó với hack vì hack một ứng dụng khác nhau từ ứng dụng đến ứng dụng và quan trọng nhất là bản chất của ứng dụng.<br>
![](https://images.viblo.asia/1d62dedb-a3f5-41fa-ad10-916e7a9a0fe6.jpg)
## Mối đe dọa an ninh từ điện thoại có nguồn gốc và jailbreak<br>
Tại đây, cụm từ đầu tiên áp dụng cho Android và thuật ngữ thứ hai được áp dụng cho iOS. Trong điện thoại, không phải tất cả các thao tác đều có sẵn cho người dùng như ghi đè tệp hệ thống, nâng cấp hệ điều hành lên phiên bản thường không khả dụng cho điện thoại đó và một số thao tác cần có quyền truy cập vào điện thoại.<br>
Do đó mọi người chạy phần mềm có sẵn trên thị trường để đạt được quyền truy cập đầy đủ vào điện thoại.<br>
**Các mối đe dọa bảo mật mà rễ hoặc jailbreaking đặt ra là:**<br>
1) Cài đặt thêm một số ứng dụng trên điện thoại.<br>
2) Mã được sử dụng để root hoặc jailbreak có thể có mã không an toàn trong chính nó, đặt ra một mối đe dọa bị tấn công.<br>
3) Các điện thoại bắt nguồn từ này không bao giờ được kiểm tra bởi các nhà sản xuất và do đó chúng hoạt động theo những cách không thể đoán trước.<br>
4) Ngoài ra, một số ứng dụng ngân hàng vô hiệu hóa các tính năng cho điện thoại bắt nguồn từ.<br>
5) Tôi nhớ một sự cố khi chúng tôi thử nghiệm trên điện thoại Galaxy S đã bắt nguồn từ và đã cài đặt Ice Cream Sandwich (mặc dù phiên bản cuối cùng được phát hành cho mẫu điện thoại này là Gingerbread) và trong khi thử nghiệm ứng dụng của chúng tôi, mã xác thực đăng nhập đã được đăng nhập vào tệp nhật ký của ứng dụng.<br>
Lỗi này không bao giờ được sao chép trên bất kỳ thiết bị nào khác nhưng chỉ trên điện thoại được root. Và chúng tôi mất một tuần để sửa nó.<br>
![](https://images.viblo.asia/ad4f1611-ed2d-4db4-9446-c4e6b3feab5b.jpg)<br>
## Mối đe dọa an ninh từ quyền ứng dụng<br>
Các quyền được cấp cho một ứng dụng cũng đặt ra một mối đe dọa bảo mật.<br>
Sau đây là các quyền truy cập rất dễ bị kẻ tấn công sử dụng để tấn công: <br>
- Vị trí dựa trên mạng: Các ứng dụng như vị trí hoặc đăng ký v.v., cần có quyền truy cập vị trí mạng. Hackers sử dụng quyền này và truy cập vị trí của người dùng để khởi chạy tấn công hoặc phần mềm độc hại dựa trên vị trí.<br>
- Xem trạng thái Wi-Fi: Hầu như tất cả các ứng dụng đều được cấp quyền truy cập Wi-Fi và phần mềm độc hại hoặc hackers sử dụng điện thoại để truy cập thông tin xác thực Wi-Fi.<br>
- Truy xuất Ứng dụng đang chạy: Các ứng dụng như trình tiết kiệm pin, ứng dụng bảo mật, v.v., sử dụng quyền truy cập vào các ứng dụng hiện đang chạy và hackers sử dụng quyền ứng dụng đang chạy này để giết các ứng dụng bảo mật hoặc truy cập thông tin của các ứng dụng đang chạy khác.<br>
- Truy cập Internet đầy đủ: Tất cả các ứng dụng cần sự cho phép này để truy cập internet được hackers sử dụng để giao tiếp và chèn các lệnh của họ để tải xuống phần mềm độc hại hoặc ứng dụng độc hại trên điện thoại.<br>
- Tự động khởi động khi khởi động: Một số ứng dụng cần sự cho phép này từ hệ điều hành để bắt đầu ngay sau khi điện thoại được khởi động hoặc khởi động lại như ứng dụng bảo mật, ứng dụng tiết kiệm pin, ứng dụng email, v.v. Phần mềm độc hại sử dụng tính năng này để tự động chạy trong mỗi lần bắt đầu hoặc khởi động lại.<br>
![](https://images.viblo.asia/111bba0d-3b86-476b-b689-3ffb65d2fac9.jpg)<br>
## Mối đe dọa bảo mật có khác với Android và iOS không<br>
Trong khi phân tích mối đe dọa bảo mật cho một ứng dụng, QA phải suy nghĩ về sự khác biệt trong Android và iOS về các tính năng bảo mật. Câu trả lời cho câu hỏi là có, mối đe dọa bảo mật khác với Android và iOS.<br>
iOS ít bị mẫn cảm với mối đe dọa bảo mật khi so sánh với Android. Lý do duy nhất đằng sau đây là hệ thống đóng cửa của Apple, nó có các quy tắc rất nghiêm ngặt để phân phối ứng dụng trên cửa hàng iTunes. Do đó, rủi ro của phần mềm độc hại hoặc ứng dụng độc hại tiếp cận iStore bị giảm.<br>
Ngược lại, Android là một hệ thống mở không có quy tắc hoặc quy định nghiêm ngặt về việc đăng ứng dụng lên cửa hàng Google Play. Không giống như Apple, các ứng dụng chưa được xác minh trước khi được đăng.<br>
Nói cách đơn giản, nó sẽ mất một phần mềm độc hại iOS được thiết kế hoàn hảo để gây thiệt hại nhiều như 100 phần mềm độc hại Android.<br>
**Chiến lược kiểm tra bảo mật**<br>
Sau khi thẩm định được hoàn thành cho ứng dụng của bạn, vì vậy bạn cần phải vạch ra chiến lược để thực hiện thử nghiệm.<br>
**Đưa ra dưới đây là vài gợi ý về hoàn thiện chiến lược thử nghiệm:**<br>
**1) Bản chất của ứng dụng:** Nếu bạn đang làm việc trên một ứng dụng mà giao dịch với các giao dịch tiền, sau đó bạn cần phải tập trung hơn vào các khía cạnh bảo mật hơn các khía cạnh chức năng của ứng dụng. Nhưng nếu ứng dụng của bạn giống như một dịch vụ hậu cần hoặc phương tiện giáo dục hoặc truyền thông xã hội, thì ứng dụng đó có thể không cần thử nghiệm bảo mật chuyên sâu.<br>
Nếu bạn đang tạo một ứng dụng mà bạn đang thực hiện các giao dịch tiền hoặc chuyển hướng đến các trang web của ngân hàng để chuyển tiền thì bạn cần phải kiểm tra từng chức năng của ứng dụng. Do đó, dựa trên bản chất và mục đích của ứng dụng của bạn, bạn có thể quyết định cần bao nhiêu kiểm tra bảo mật.<br>
**2) Thời gian cần thiết để thử nghiệm:** Tùy thuộc vào tổng thời gian được phân bổ cho thử nghiệm, bạn cần quyết định thời gian có thể dành riêng cho thử nghiệm bảo mật. Nếu bạn nghĩ rằng bạn cần nhiều thời gian hơn phân bổ thì hãy nói chuyện với BA và quản lý ASAP của bạn.<br>
Dựa trên thời gian được phân bổ ưu tiên nỗ lực thử nghiệm của bạn cho phù hợp.<br>
**3) Những nỗ lực cần thiết để thử nghiệm:** Kiểm tra bảo mật khá phức tạp khi so sánh với chức năng hoặc giao diện người dùng hoặc các loại thử nghiệm khác vì hầu như không có bất kỳ hướng dẫn dự án nào được đưa ra cho nó.<br>
Theo kinh nghiệm của tôi, thực hành tốt nhất là có tối đa 2 QA thực hiện thử nghiệm thay vì tất cả. Do đó những nỗ lực cần thiết cho thử nghiệm này cần được truyền đạt tốt và được nhóm đồng ý.<br>
**4) Chuyển giao tri thức:** Hầu hết thời gian, chúng ta cần dành thêm thời gian cho việc nghiên cứu mã hoặc dịch vụ web hoặc công cụ để hiểu các khía cạnh bảo mật (và thử nghiệm có liên quan) của ứng dụng. Do đó điều này cần thêm thời gian cần được tính vào kế hoạch dự án.<br>
Dựa trên những gợi ý này, bạn có thể hoàn thành chiến lược của mình để thử nghiệm.<br>
## Hướng dẫn kiểm tra bảo mật của ứng dụng dành cho thiết bị di động<br>
Các nguyên tắc dành cho Kiểm tra bảo mật của ứng dụng dành cho thiết bị di động bao gồm.<br>
### 1) Kiểm tra bảo mật bằng tay với các xét nghiệm mẫu:<br>
Kiểm tra khía cạnh bảo mật của một ứng dụng có thể được thực hiện thủ công và thông qua tự động hóa quá. Tôi đã làm cả hai và tôi tin rằng thử nghiệm bảo mật là một chút phức tạp, do đó nó là tốt hơn nếu bạn có thể sử dụng các công cụ tự động hóa. Kiểm tra bảo mật thủ công không tốn nhiều thời gian.<br>
Trước khi bắt đầu thử nghiệm thủ công trên ứng dụng, hãy đảm bảo rằng tất cả các trường hợp kiểm tra liên quan đến bảo mật của bạn đã sẵn sàng, được đánh giá và có mức độ phù hợp 100%. Tôi khuyên bạn nên xem xét lại các trường hợp thử nghiệm của bạn ít nhất là bằng BA của dự án của bạn.<br>
Tạo các trường hợp thử nghiệm dựa trên (thách thức) ở trên và bao gồm tất cả mọi thứ ngay từ mẫu điện thoại đến phiên bản hệ điều hành, bất kỳ điều gì và tuy nhiên ảnh hưởng đến tính bảo mật của ứng dụng của bạn.<br>
Tạo testbed cho thử nghiệm bảo mật đặc biệt là cho các ứng dụng di động là khó khăn do đó nếu bạn có chuyên môn trong thử nghiệm điện toán đám mây, bạn có thể sử dụng đó là tốt.<br>
Tôi đã làm việc trên một ứng dụng hậu cần mà chúng tôi đã phải làm kiểm tra bảo mật sau khi ứng dụng được ổn định. Ứng dụng này là để theo dõi các trình điều khiển và các giao hàng họ đã thực hiện vào một ngày nhất định. Không chỉ phía ứng dụng mà chúng tôi còn thực hiện kiểm tra bảo mật cho dịch vụ web REST.<br>
Việc giao hàng được thực hiện là các mặt hàng đắt tiền như máy chạy bộ, máy giặt, TV vv, và do đó có một mối quan tâm lớn về an ninh.<br>
**Sau đây là một số thử nghiệm mẫu mà chúng tôi đã thực hiện trên ứng dụng của mình:**<br>
- Xác minh xem dữ liệu cụ thể cho trình điều khiển có được hiển thị sau khi đăng nhập hay không.
- Kiểm tra xem dữ liệu có được hiển thị cụ thể cho các trình điều khiển đó khi có nhiều hơn 1 trình điều khiển đăng nhập vào điện thoại tương ứng của chúng hay không.
- Xác minh xem các bản cập nhật được gửi bởi trình điều khiển theo trạng thái phân phối, v.v., chỉ được cập nhật trong cổng thông tin cho trình điều khiển cụ thể đó và không phải tất cả.<br>
- Xác minh xem các trình điều khiển có được hiển thị dữ liệu theo quyền truy cập của họ hay không.<br>
- Xác minh xem, sau một khoảng thời gian cụ thể, phiên của người lái xe hết hạn và anh ta được yêu cầu đăng nhập lại.<br>
- Xác minh nếu trình điều khiển chỉ được xác minh (đã đăng ký trên trang web của công ty) được phép đăng nhập.<br>
- Xác minh xem các trình điều khiển có được phép gửi vị trí GPS giả từ điện thoại của họ hay không. Để kiểm tra chức năng như vậy, bạn có thể tạo tệp DDMS giả và cung cấp vị trí giả mạo.<br>
- Xác minh xem tất cả các tệp nhật ký ứng dụng có lưu trữ mã thông báo xác thực không, đó có phải là tệp nhật ký của ứng dụng hoặc của điện thoại hoặc hệ điều hành.<br>
### 2) Kiểm tra bảo mật dịch vụ web<br>
Cùng với chức năng, định dạng dữ liệu và các phương thức khác nhau như GET, POST, PUT vv, kiểm tra bảo mật cũng không kém phần quan trọng. Điều này có thể được thực hiện cả bằng tay và tự động hóa.<br>
Ban đầu, khi ứng dụng chưa sẵn sàng, rất khó nhưng không kém phần quan trọng để kiểm tra các dịch vụ web. Và ngay cả ở giai đoạn ban đầu khi tất cả các dịch vụ web không sẵn sàng, nó không được khuyến khích sử dụng công cụ tự động hóa.<br>
Do đó tôi sẽ đề nghị để giúp đỡ từ các nhà phát triển và họ đã tạo ra một trang web giả để thử nghiệm dịch vụ web. Khi tất cả các dịch vụ web của bạn đã sẵn sàng và ổn định thì hãy tránh kiểm tra thủ công. Cập nhật đầu vào của dịch vụ web theo cách thủ công theo từng trường hợp thử nghiệm là rất tốn thời gian, vì vậy tốt hơn nên sử dụng các công cụ tự động hóa.<br>
Tôi đã sử dụng soapUI Pro để thử nghiệm dịch vụ web, đó là một công cụ trả phí với một vài tính năng thú vị cho tất cả các phương thức dịch vụ web REST.<br>
![](https://images.viblo.asia/a7b4f174-825b-478c-9e0e-29cd2803490f.jpg)<br>
**Sau đây là một số kiểm tra bảo mật liên quan đến dịch vụ web mà tôi đã thực hiện:**<br>
- Xác minh nếu mã thông báo xác thực của thông tin đăng nhập được mã hóa.<br>
- Xác minh nếu mã thông báo xác thực được tạo chỉ khi chi tiết trình điều khiển được gửi đến dịch vụ web là hợp lệ.<br>
- Xác minh nếu sau khi mã thông báo được tạo, việc nhận hoặc gửi dữ liệu qua toàn bộ các dịch vụ web khác (ngoại trừ xác thực) không được thực hiện mà không có mã thông báo.<br>
- Xác minh xem sau một khoảng thời gian nếu cùng một mã thông báo được sử dụng cho một dịch vụ web, một lỗi thích hợp sẽ được hiển thị cho hết hạn mã thông báo hay không.<br>
- Xác minh rằng khi một mã thông báo thay đổi được gửi đến dịch vụ web, không có giao dịch dữ liệu nào được thực hiện, v.v.<br>
### 3) Ứng dụng (ứng dụng khách)<br>
Điều này thường được thực hiện trên ứng dụng thực tế được cài đặt trên điện thoại của bạn. Đó là thận trọng để thực hiện kiểm tra an ninh với nhiều hơn một phiên người dùng chạy song song.<br>
Ứng dụng thử nghiệm bên không chỉ được thực hiện đối với mục đích ứng dụng mà còn là mô hình điện thoại và các tính năng dành riêng cho hệ điều hành sẽ ảnh hưởng đến tính bảo mật của thông tin. Dựa trên những thách thức được đề cập ở trên, bạn có thể tạo ma trận cho thử nghiệm của mình. Ngoài ra, thực hiện một vòng kiểm tra cơ bản của tất cả các trường hợp sử dụng trên điện thoại được root hoặc jailbroken.<br>
Các cải tiến bảo mật khác nhau tùy theo phiên bản hệ điều hành và do đó hãy thử kiểm tra trên tất cả các phiên bản hệ điều hành được hỗ trợ.<br>
### 4) Công cụ tự động hóa<br>
Những người thử nghiệm cảm thấy không khuyến khích thực hiện kiểm tra bảo mật trên ứng dụng dành cho thiết bị di động vì ứng dụng được nhắm mục tiêu cho rất nhiều thiết bị và hệ điều hành. Do đó, việc sử dụng các công cụ giúp ích rất nhiều trong việc không chỉ tiết kiệm thời gian quý báu mà còn nỗ lực của họ có thể được đưa đến những người dùng khác trong khi các thử nghiệm chạy tự động trong nền.<br>
Ngoài ra hãy chắc chắn rằng có sẵn băng thông để tìm hiểu và sử dụng công cụ. Các công cụ bảo mật có thể không nhất thiết phải được sử dụng cho một thử nghiệm khác do đó việc sử dụng công cụ này phải được người quản lý hoặc chủ sở hữu sản phẩm chấp thuận.<br>

**Sau đây là danh sách các công cụ kiểm tra bảo mật thịnh hành nhất hiện có cho các ứng dụng dành cho thiết bị di động:**<br>
- Dự án OWA SP Zed Attack Proxy<br>
- Gỡ lỗi Android<br>
- Khám phá tệp iPad<br>
- Phân tích tĩnh Clang<br>
- QARK<br>
- Ứng dụng điện thoại thông minh<br>
### 5) Thử nghiệm cho các ứng dụng Web, Native và Hybrid<br>
Kiểm tra bảo mật khác nhau đối với web, ứng dụng gốc và kết hợp tương ứng với mã và kiến trúc ứng dụng hoàn toàn khác nhau đối với cả 3 loại.<br>
## **Phần kết luận**<br>
Kiểm tra bảo mật ứng dụng dành cho thiết bị di động là một thách thức thực sự đòi hỏi nhiều kiến thức thu thập và nghiên cứu. Khi so sánh với ứng dụng dành cho máy tính để bàn hoặc ứng dụng web, nó rất rộng và phức tạp.<br>
Do đó điều quan trọng là phải suy nghĩ từ một hacker và sau đó phân tích ứng dụng của bạn. 60% nỗ lực trong việc tìm kiếm các chức năng dễ bị đe dọa của ứng dụng của bạn và sau đó thử nghiệm sẽ trở nên dễ dàng hơn một chút.<br>
Nguồn dịch: https://www.softwaretestinghelp.com/mobile-app-security-testing-guide/