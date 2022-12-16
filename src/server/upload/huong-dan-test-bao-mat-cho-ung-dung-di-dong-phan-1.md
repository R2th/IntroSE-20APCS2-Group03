**1. Giới thiệu chung**

***1.1. Chiến lược cho việc test bảo mật cho ứng dụng di động***

Ngày nay mạng di động đã có khả năng hỗ trợ người dùng thực hiện hầu hết tất cả các hoạt động bao gồm kinh doanh, tài chính, xã hội, ... và do đó, gần như tất cả các công ty đã phát triển và đưa vào sử dụng các ứng dụng di động của riêng họ.

Những ứng dụng này cực kỳ hiệu quả và chúng giúp chúng ta dễ dàng hơn trong các giao dịch và công việc hàng ngày. Nhưng đi kèm với đó luôn luôn có một sự quan tâm lớn liên quan đến sự an toàn và việc bảo mật dữ liệu. Các giao dịch quan trọng khi được thực hiện trên mạng 3G hoặc 4G có thể trở thành một miếng mồi ngon cho tin tặc. Và có khả năng 100% dữ liệu cá nhân của bạn có thể rơi vào tay tin tặc, bao gồm các thông tin tài khoản đăng nhập Facebook hay thông tin tài khoản ngân hàng của bạn.

![](https://images.viblo.asia/aeca4b0f-7978-4a84-b1ee-61b0724ab3d1.png)

Tính bảo mật của các ứng dụng này trở nên rất quan trọng đối với hoạt động kinh doanh của bất kỳ công ty nào. Điều này tạo ra nhu cầu về việc kiểm tra bảo mật của tất cả các ứng dụng di động và do đó đây được coi là một bài test quan trọng cần được thực hiện bởi những tester đối với một ứng dụng di động. Điều này là vô cùng quan trọng đối với các ứng dụng tài chính, xã hội và thương mại. Trong những trường hợp như vậy, ứng dụng sẽ không được phát hành cũng như không được khách hàng chấp nhận nếu việc kiểm tra bảo mật không được thực hiện.

***1.2. Phân loại những ứng dụng di động***

Các ứng dụng di động về cơ bản được phân thành 3 loại:
* Ứng dụng web: Đây giống như các ứng dụng web thông thường được truy cập từ điện thoại di động được tích hợp HTML.
* Ứng dụng gốc: Đây là những ứng dụng dành riêng cho thiết bị được xây dựng bằng các tính năng của hệ điều hành và chỉ có thể chạy trên hệ điều hành cụ thể đó.
* Ứng dụng lai: Chúng trông giống như ứng dụng gốc nhưng chúng hoạt động giống như các ứng dụng web để mang đến trải nghiệm tốt nhất cho cả các tính năng web và các tính năng gốc.

**2. Tổng quan của việc test bảo mật**

Giống như việc test chức năng và việc test theo yêu cầu, việc kiểm tra bảo mật cũng cần thực hiện phân tích sâu về ứng dụng đi cùng với các chiến lược được xác định rõ ràng để thực hiện việc kiểm tra trên thực tế. Trong bài viết này, mình sẽ chỉ ra những thách thức (challenges) và đưa ra những hướng dẫn (guidelines) cho việc kiểm tra bảo mật một cách chi tiết.

Trong phần thách thức (challenges), chúng ta sẽ đề cập đến các chủ đề sau:
* Phân tích và mô hình hóa các mối đe dọa
* Phân tích lỗ hổng
* Đưa ra các mối đe dọa bảo mật hàng đầu cho các ứng dụng
* Phân tích mối đe dọa bảo mật đến từ tin tặc	
* Phân tích mối đe dọa bảo mật đến từ điện thoại đã root và jailbreak
* Phân tích mối đe dọa bảo mật đến từ quyền ứng dụng
* Phân tích mối đe dọa bảo mật khác nhau cho các ứng dụng Android và iOS

Trong phần hướng dẫn (guidelines), chúng ta sẽ đề cập đến các chủ đề sau:
* Kiểm tra bảo mật thủ công với các bài kiểm tra mẫu
* Kiểm tra bảo mật dịch vụ web
* Kiểm tra bảo mật ứng dụng (phía khách hàng)
* Kiểm tra tự động
* Kiểm tra các ứng dụng web, ứng dụng gốc và ứng dụng lai.

![](https://images.viblo.asia/22b1c3c1-2383-4a45-b8fd-5eb79ed68b4b.png)

**3. Những thách thức mà các QA phải đối mặt để kiểm tra bảo mật ứng dụng di động**

Trong lần phát hành đầu tiên của một ứng dụng, điều rất quan trọng đối với QA là thực hiện kiểm tra bảo mật chuyên sâu cho ứng dụng. Ở cấp độ rộng, việc tập hợp các kiến thức về bản chất của ứng dụng, các tính năng của hệ điều hành và các tính năng của điện thoại đóng một vai trò quan trọng trong việc thiết kế một kế hoạch thử nghiệm hoàn chỉnh. Có rất nhiều bài test khác nhau và do đó, điều quan trọng là phải phân tích ứng dụng và tìm ra những gì thực sự cần được kiểm tra.

***3.1. Phân tích và mô hình hóa các mối đe dọa***

Khi thực hiện phân tích mối đe dọa, chúng ta cần nghiên cứu các điểm quan trọng nhất như sau:

* Khi một ứng dụng được tải xuống từ Cửa hàng Play (CH Play) và được cài đặt, có thể một file log sẽ được tạo cùng. Khi ứng dụng được tải xuống và cài đặt, việc xác minh tài khoản Google hoặc iTunes được thực hiện. Do đó, sẽ có nguy cơ thông tin đăng nhập của bạn sẽ rơi vào tay tin tặc.
* Thông tin đăng nhập của người dùng (trong trường hợp Đăng nhập một lần) cũng được lưu trữ, do đó các ứng dụng xử lý thông tin đăng nhập cũng cần phân tích mối đe dọa. Là người dùng, bạn sẽ không đánh giá cao nếu ai đó sử dụng tài khoản của bạn hoặc nếu bạn đăng nhập và người khác thông tin khác được hiển thị trong tài khoản của bạn.
* Dữ liệu hiển thị trong ứng dụng là mối đe dọa quan trọng nhất cần được phân tích và bảo mật. Hãy tưởng tượng điều gì sẽ xảy ra nếu bạn đăng nhập vào ứng dụng ngân hàng của mình và một hacker đã hack nó hoặc tài khoản của bạn được sử dụng để đăng bài chống xã hội và điều đó có thể khiến bạn gặp rắc rối nghiêm trọng.
* Dữ liệu được gửi và nhận từ dịch vụ web cần được bảo mật để bảo vệ dữ liệu khỏi bị tấn công. Các cuộc gọi dịch vụ cần được mã hóa cho mục đích bảo mật.
* Khi tương tác với các ứng dụng của bên thứ 3 khi đặt hàng trên một ứng dụng thương mại, nó sẽ kết nối đến mạng ngân hàng hoặc PayPal hoặc PayTM để chuyển tiền và điều đó cần được thực hiện thông qua các kết nối an toàn.

![](https://images.viblo.asia/8305189b-1469-4ca2-9260-9ab4f85ded00.png)

***3.2. Phân tích lỗ hổng***

Lý tưởng nhất, ứng dụng sẽ được phân tích về các lỗ hổng bảo mật, sự hiệu quả của các biện pháp đưa ra để khắc phục các lỗ hổng và việc kiểm tra tính hiệu quả của các biện pháp này trong thực tế.

Trước khi thực hiện việc phân tích lỗ hổng, chúng ta cần đảm bảo rằng toàn bộ team đã sẵn sàng và đã chuẩn bị một danh sách các mối đe dọa bảo mật quan trọng nhất, giải pháp để xử lý mối đe dọa và trong trường hợp ứng dụng đã được công bố, chúng ta cần chuẩn bị một danh sách kinh nghiệm bao gồm các lỗi hoặc các vấn đề đã tìm thấy trong các bản phát hành trước.

Ở mức độ rộng, thực hiện phân tích tổng thể về tài nguyên mạng, về điện thoại và về hệ điều hành sẽ được ứng dụng sử dụng cùng với sự quan trọng của các tài nguyên. Ngoài ra, cũng cần phân tích điều gì là các mối đe dọa cấp cao quan trọng nhất và làm thế nào để bảo vệ chống lại cùng.

Nếu một sự xác thực cho việc truy cập vào ứng dụng được thực hiện thì mã xác thực được ghi vào các file log và nó có thể đưa ra tái sử dụng không? Có thông tin nhạy cảm được ghi trong các file log trong điện thoại hay không?

***3.3. Phân tích các mối đe dọa bảo mật quan trọng nhất cho các ứng dụng***

Sử dụng nền tảng không đúng cách: Việc lạm dụng các tính năng của điện thoại hoặc hệ điều hành như cấp quyền cho ứng dụng để truy cập danh bạ, thư viện, ... ngoài nhu cầu cần thiết.

Lưu trữ dữ liệu không cần thiết: Lưu trữ dữ liệu không mong muốn trong ứng dụng.

Lỗi Xác thực: Lỗi khi xác định người dùng, lỗi khi duy trì danh tính người dùng và lỗi khi duy trì phiên người dùng.

Giao tiếp không an toàn: Lỗi trong việc duy trì một phiên SSL đúng.

Mã bên thứ ba độc hại: Sử dụng code của bên thứ ba không cần thiết hoặc không xóa các code không cần thiết.

Lỗi trong việc ứng dụng các chức năng điều khiển phía Server: Server nên được cấu hình để cho phép dữ liệu nào cần được hiển thị trong ứng dụng?

Lây nhiễm phía khách hàng: Điều này dẫn đến việc lây nhiễm mã độc vào trong ứng dụng.

Thiếu việc bảo vệ dữ liệu trong quá trình truyền nhận: Không thực hiện mã hóa dữ liệu khi gửi hoặc nhận qua dịch vụ web, …

***3.4. Phân tích mối đe dọa bảo mật đến từ tin tặc***	

Thế giới đã trải qua một số vụ bị hacker tấn công tồi tệ nhất và gây sốc ngay cả khi độ bảo mật cao nhất có thể đã được áp dụng. Vào tháng 12 năm 2016, ESEA - trò chơi video lớn nhất lúc đó đã cảnh báo người chơi về một lỗ hổng an ninh khi nó phát hiện ra rằng thông tin nhạy cảm như tên, địa chỉ email, địa chỉ, số điện thoại, thông tin đăng nhập, Xbox ID, ... đã bị rò rỉ.

Không có cách cụ thể để đối phó với hacker vì việc hack một ứng dụng là khác nhau và điều quan trọng nhất là bản chất của ứng dụng. Do đó, để tránh bị hack, hãy thử đặt mình vào vị trí của hacker để xem những gì bạn không thể nhìn thấy khi là một nhà phát triển hay một QA.

![](https://images.viblo.asia/90bea80f-9568-4034-be78-96fb85891fcb.png)

***3.5. Phân tích mối đe dọa bảo mật đến từ điện thoại đã root và jailbreak***

Ở đây thuật ngữ đầu tiên (root) được áp dụng cho Android và thuật ngữ thứ hai (jailbreak) được áp dụng cho iOS. Trong điện thoại, không phải tất cả các thao tác đều khả dụng đối với người dùng như ghi đè tệp hệ thống, nâng cấp HĐH lên phiên bản không có sẵn cho điện thoại đó và một số thao tác cần có quyền truy cập của quản trị viên vào điện thoại. Tuy nhiên một số người thực hiện chạy lại phần mềm để có quyền truy cập đầy đủ vào điện thoại.

Các mối đe dọa bảo mật mà việc root hoặc jailbreak điện thoại mang đến là:

* Việc bị cài đặt một số ứng dụng bổ sung trên điện thoại.
* Mã được sử dụng để root hoặc bẻ khóa có thể là mã không an toàn, gây ra mối đe dọa bị hack.
* Những điện thoại đã root này không bao giờ được các nhà sản xuất kiểm tra và do đó chúng có thể hoạt động theo những cách không thể đoán trước.
* Ngoài ra, một số ứng dụng ngân hàng vô hiệu hóa các tính năng bảo mật của nó trên các điện thoại đã root.
* Chúng tôi vẫn nhớ một sự cố khi đang thử nghiệm trên điện thoại Galaxy S đã được root và đã cài đặt Ice-cream Sandwich trên nó (mặc dù phiên bản cuối cùng được phát hành cho mẫu điện thoại này là Gingerbread) và trong khi thử nghiệm ứng dụng của mình, chúng tôi thấy rằng mã xác thực đăng nhập của mình đã được lưu vào tệp nhật ký của ứng dụng. Lỗi này không bao giờ được tái hiện trên bất kỳ thiết bị nào khác mà chỉ trên điện thoại đã root. Và chúng tôi đã mất một tuần để sửa nó.

![](https://images.viblo.asia/5611cd05-ade8-4e1b-a2b0-76e42aa499d8.png)

***3.6. Phân tích mối đe dọa bảo mật đến từ quyền ứng dụng***

Các quyền được cấp cho một ứng dụng cũng gây ra mối đe dọa bảo mật. Sau đây là các quyền rất dễ bị kẻ tấn công sử dụng để hack:

* Vị trí dựa trên mạng: Các ứng dụng như vị trí hoặc đăng ký cần có quyền truy cập vào vị trí mạng. Tin tặc sử dụng quyền này và truy cập vào vị trí của người dùng để khởi chạy tấn công dựa trên vị trí hoặc max độc.
* Xem trạng thái WiFi: Hầu như tất cả các ứng dụng đều được phép truy cập WiFi và phần mềm độc hại hoặc tin tặc sử dụng các lỗi điện thoại để truy cập thông tin đăng nhập WiFi.
* Truy xuất ứng dụng đang chạy: Các ứng dụng như ứng dụng tiết kiệm pin, ứng dụng bảo mật, ... sử dụng quyền truy cập các ứng dụng hiện đang chạy và tin tặc sử dụng quyền ứng dụng đang chạy này để kill các ứng dụng bảo mật hoặc truy cập thông tin của các ứng dụng đang chạy khác.
* Truy cập Internet đầy đủ: Tất cả các ứng dụng cần có quyền này để truy cập internet được tin tặc sử dụng để liên lạc và chèn lệnh vào chúng để tải xuống phần mềm độc hại hoặc ứng dụng độc hại trên điện thoại.
* Tự động khởi động khi điện thoại khởi động xong: Một số ứng dụng cần có sự cho phép này từ HĐH để được khởi động ngay khi điện thoại được khởi động hoặc khởi động lại như ứng dụng bảo mật, ứng dụng tiết kiệm pin, ứng dụng email, .... Phần mềm độc hại sử dụng để tự động chạy trong mỗi lần điện thoại khởi động hoặc được khởi động lại.

![](https://images.viblo.asia/b1381ea2-1388-4ac3-9026-f465f353de1d.png)

***3.7. Phân tích mối đe dọa bảo mật khác nhau cho các ứng dụng Android và iOS***

Trong khi phân tích mối đe dọa bảo mật cho một ứng dụng, các QA phải suy nghĩ liệu sự khác biệt với 2 hệ điều hành Android và iOS về các tính năng bảo mật hay không. Câu trả lời cho câu hỏi là có và các mối đe dọa bảo mật là khác nhau đối với Android và iOS. 

Hệ điều hành iOS ít bị đe dọa bảo mật hơn khi so sánh với Android. Lý do duy nhất đằng sau điều này là một hệ thống đóng kín của Apple, nó có các quy tắc rất nghiêm ngặt để phân phối ứng dụng trên cửa hàng iTunes. Do đó, nguy cơ phần mềm độc hại hoặc ứng dụng độc hại tiếp cận iStore được giảm thiểu đáng kể.

Ngược lại, Hệ điều hành Android là một hệ thống mở không có quy tắc hoặc quy định nghiêm ngặt về việc đăng ứng dụng lên cửa hàng Google Play. Không giống như Apple, các ứng dụng không được xác minh trước khi được đăng.

Nói một cách đơn giản, việc phát triển một phần mềm độc hại chạy hoàn hảo trên iOS có thể gây ra thiệt hại như 100 phần mềm độc hại trên Android.

**4. Liên kết tham khảo**

https://www.softwaretestinghelp.com/mobile-app-security-testing-guide/#