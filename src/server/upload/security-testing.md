Bài viết được tham khảo từ nguồn:
https://www.softwaretestinghelp.com/how-to-test-application-security-web-and-desktop-application-security-testing-techniques/

Một số nội dung mà mình sẽ trình bày trong bài viết này:

1. Tại sao cần Security Testing
2. Các tool đề xuất dùng cho Security Testing
3. 8 kỹ thuật Security Testing hay dùng


# 1. Tại sao cần Security Testing

Trong thời đại ngày nay, ngành công nghiệp phần mềm quả thật được ví như một gã khổng lồ "lớn mạnh", thế giới mạng trong những thập kỷ gần đây nó thống lĩnh và là xu hướng động lực đang được hình thành tại các doanh nghiệp.

Ngày nay, các trang web không chỉ đơn thuần là dùng để quảng bá tiếp thị thông tin, hình ảnh mà chúng được phát triển mạnh mẽ hơn bao giờ hết từ mua sắm nhỏ lẻ đến lớn, y tế,  hàng không, giáo dục, tổ chức chính phủ, ngân hàng, bảo hiểm, chứng khoán.

Điều này khẳng định rằng, các ứng dụng trực tuyến đã có được niềm tin từ khách hàng và người dùng về một tính năng đặc biệt của cá nhân mang tên: Bảo mật.

Tuy nhiên khi nói về Web, tầm quan trọng của bảo mật được tăng lên theo cấp số nhân. Nếu một hệ thống trực tuyến không bảo vệ dữ liệu giao dịch, thông tin cá nhân người dùng (email/ số điện thoại...)...thì một điều chắc chắn là sẽ không ai nghĩ đến việc sử dụng nó. An ninh không phải là thuật ngữ để tìm kiếm trong lĩnh vực công nghệ.

Ví dụ về lỗi bảo mật trong ứng dụng:

 - Cho hệ thống quản lý sinh viên: Kiểm tra tính sửa dữ liệu của điểm thi. Nếu role "Nhập học" có thể chỉnh sửa được điểm thi của sinh viên => Đây là lỗi về bảo mật.
 
 - Cho hệ thống mua sắm trực tuyến: Nếu chi tiết thẻ tín dụng của khách hàng bị mã hóa => Đây là lỗi bảo mật cụ thể là Khách hàng sẽ bị lấy cắp tiền trong tài khoản.
 
 - Sẽ là lỗi bảo mật: Nếu trong truy vấn SQL truy xuất được mật khẩu của người dùng.
 
*#  "Bảo mật có nghĩa là quyền truy cập được cấp phép được cấp cho dữ liệu được bảo vệ, và không được cấp phép cho các quyền truy cập trái phép".*

Vì thế, bảo mật có hai khía cạnh chính: Đầu tiên là bảo vệ dữ liệu và thứ 2 là quyền truy cập vào dữ liệu đó.

Bây giờ hãy cùng tôi giải thích các tính năng của bảo mật được triển khai trong ứng dụng phần mềm và chúng nên được test như thế nào.

# 2. Các tool đề xuất dùng cho Security Testing

## 2.1. Netsparker

Netsparker là một giải pháp để test bảo mật ứng dụng web với khả năng tự động thu thập dữ liệu và quét cho tất cả các loại ứng dụng web cũ và hiện tại như HTML5, Web 2.0. Nó sử dụng công nghệ quét dựa trên các evidence và các tác nhân quét đó có thể mở rộng.

Nó cung cấp cho bạn khả năng hiển thị đầy đủ thông tin ngay cả khi bạn có một số lượng lớn dữ liệu cần quản lý. Nó có nhiều chức năng như: Quản lý theo nhóm, quản lý lỗ hổng. Nó được tích hợp vào các nền tảng CI/CD như Jenkins, TeamCity hoặc Bamboo.

## 2.2. Indusface WAS Free Website Malware Check

Indusface WAS cung cấp cả thâm nhập thủ công đi kèm với máy quét lỗ hổng dựa trên OWASP top 10 và cũng bao gồm các kiểm tra danh tiếng của trang Web và các liên kết, phần mềm độc hại và kiểm tra bề mặt của trang Web trong mỗi lần quét.

# 3. 8 kỹ thuật Security Testing hay dùng

## 3.1. Access đến application (Truy cập dữ liệu)


Dù là ứng dụng desktop hay website, bảo mật truy cập được thực hiện bởi 2 yếu tố: "Quản lý vai trò và quyền hạn". Nó thường được test ngầm trong khi bao hàm với một chức năng.

Một ví dụ về bảo mật về truy cập như sau: Trong hệ thống quản lý bệnh viện, nhân viên lễ tân ít quan tâm nhất đến các xét nghiệm trong phòng thí nghiệm vì công việc của anh ta là chỉ cần đăng ký cho bệnh nhân và lên lịch hẹn họ với bác sỹ.

Vì thế, các menu, biểu mẫu và màn hình liên quan đến các xét nghiệm sẽ không hiển thị cho vai trò của người: "Lễ tân". Dựa trên thực tế - việc thực hiện đúng vai trò và quyền của mỗi người trong một ứng dụng, một tổ chức sẽ đảm bảo an toàn cho việc truy cập.

### Làm thế nào để test:

Để kiểm tra điều này, cần check role kỹ lưỡng của mỗi nhân viên, check trong cơ sở dữ liệu xem role id bao nhiêu thì thuộc về nhóm lễ tân, role nào thì là bác sỹ...

Tester cần tạo ra một số tài khoản người dùng với tất cả các role có trong một tổ chức. Sau đó, cô ta truy cập với mỗi role đó ứng với tài khoản nào. Và xác minh rằng mọi vai trò chỉ truy cập vào một số mô-đun nhất định, màn hình nhất định, biểu mẫu nhất định, menu nhất định đối với mỗi role. Nếu thấy có sai xót thì cần báo cáo ghi lại một cách đầy đủ và chính xác.

=> Về cơ bản, test bảo mật cho quyền truy cập chính là: "Kiêm tra bạn là ai và bạn có thể làm gì cho mỗi người dùng riêng biệt".

- Ngoài ra, việc kiểm tra xác thực còn là kiểm tra về quy tắc chất lượng của mật khẩu, kiểm tra thông tin đăng nhập mặc định, kiểm tra tính năng khôi phục mật khẩu, kiểm tra hình ảnh xác thực, kiểm tra chức năng đăng xuất, kiểm tra việc thay đổi mật khẩu, kiểm tra câu hỏi và câu trả lời bảo mật...

- Thêm vào đó, là việc kiểm tra việc cấp quyền bị thiếu, kiểm tra các vấn đề kiểm soát truy cập ngang...

## 3.2. Data Protection (Bảo vệ dữ liệu)

Có ba khía cạnh của bảo mật dữ liệu. Thứ nhất người dùng chỉ có thể xem hoặc sử dụng dữ liệu mà anh ta phải sử dụng. Điều này được đảm bảo trong vai trò và quyền.

Thứ 2 là liên quan đến cách lưu dữ liệu đó trong DB.

Tất cả dữ liệu nhạy cảm phải được mã hóa để đảm bảo an toàn. Mã hóa phải đủ mạnh, đặc biệt là đối với dữ liệu nhạy cảm như mật khẩu tài khoản người dùng, số thẻ tín dụng, cvc, hoặc các thông tin khác của doanh nghiệp.

Thứ 3 và cũng là khía cạnh cuối cùng. Các biện pháp bảo mật thích hợp phải được áp dụng khi luồng dữ liệu nhạy cảm hoặc dữ liệu quan trọng trong kinh doanh xảy ra. Cho dù dữ liệu này trôi nổi giữa các mô-đun khác nhau của cùng một ứng dụng hoặc được truyền đến các ứng dụng khác nhau, nó phải được mã hóa để giữ an toàn.

### Làm thế nào để test:

Tester cần kiểm tra truy vấn cơ sở dữ liệu để tìm "mật khẩu" tài khoản người dùng, thông tin thanh toán của khách hàng, dữ liệu nhạy cảm và quan trọng khác và phải xác minh rằng tất cả dữ liệu đó được lưu ở dạng mã hóa trong DB.

Xác minh được dữ liệu được truyền giữa các biểu mẫu hoặc màn hình khác nhau chỉ sau khi mã hóa thích hợp. Hơn nữa, tester phải đảm bảo dữ liệu mã hóa được giải mã đúng cách tại thời điểm đến. Đặc biệt chú ý đến những "submit" khác nhau.

Tester phải xác minh rằng khi thông tin đang được truyền client and server, thông tin đó không được hiển thị trên thanh địa chỉ của trình duyệt web ở định dạng có thể hiểu được. Nếu bất kỳ xác minh nào trong số này không thành công, thì ứng dụng đó chắc chắn có một lỗ hổng bảo mật.

Tính ngẫu nhiên không an toàn cũng nên được kiểm tra vì nó là một loại lỗ hổng. Một cách khác để kiểm tra khả năng bảo vệ dữ liệu là kiểm tra việc sử dụng thuật toán yếu.

Ví dụ: HTTP là một giao thức văn bản rõ ràng, nếu dữ liệu nhạy cảm như thông tin đăng nhập của người dùng được truyền qua HTTP, thì đó là một mối đe dọa đối với bảo mật ứng dụng. Thay vì HTTP, dữ liệu nhạy cảm nên được chuyển qua HTTPS.

Tuy nhiên, HTTPS làm tăng bề mặt tấn công và do đó cần được kiểm tra xem cấu hình máy chủ có phù hợp và đảm bảo tính hợp lệ hay không.

## 3.3. Brute-Force Attack (Tấn công bạo lực)

Brute Force Attack chủ yếu được thực hiện bởi một số công cụ phần mềm. Khái niệm là bằng cách sử dụng ID người dùng hợp lệ, phần mềm sẽ cố gắng đoán mật khẩu liên quan bằng cách cố gắng đăng nhập lại nhiều lần.

Một ví dụ đơn giản về bảo mật chống lại cuộc tấn công như vậy là tạm ngưng tài khoản trong một khoảng thời gian ngắn như tất cả các ứng dụng gửi thư ‘Yahoo’, ‘Gmail’ và ‘Hotmail’. Nếu một số lần thử liên tiếp cụ thể (thường là 3 lần) không đăng nhập thành công, thì tài khoản đó sẽ bị khóa trong một thời gian (30 phút đến 24 giờ).

### Làm thế nào để test:
Tester phải xác minh rằng một số cơ chế tạm ngưng tài khoản có sẵn và đang hoạt động chính xác. Anh ta phải cố gắng đăng nhập bằng ID người dùng và Mật khẩu không hợp lệ để đảm bảo rằng ứng dụng phần mềm sẽ chặn tài khoản nếu liên tục cố gắng đăng nhập bằng thông tin đăng nhập không hợp lệ.

Nếu ứng dụng đang làm như vậy, nó sẽ an toàn trước cuộc tấn công brute-force. Nếu không, tester phải báo cáo lỗ hổng bảo mật này.

Test bằng phương pháp tấn công bạo lực cũng có thể được chia thành hai phần - kiểm thử hộp đen và kiểm thử hộp xám.

Trong kiểm thử hộp đen, phương pháp xác thực được ứng dụng sử dụng được phát hiện và test. Hơn nữa, kiểm thử hộp xám dựa trên kiến thức một phần về mật khẩu và chi tiết tài khoản và các cuộc tấn công đánh đổi bộ nhớ.

## 3.4. SQL Injection And XSS (Cross-Site Scripting)

Về mặt khái niệm, 2 phương pháp: SQL Injection And XSS (Cross-Site Scripting) là tương tự nhau. Theo cách tiếp cận này, tập lệnh độc hại được tin tặc sử dụng để thao túng một trang web.

Có một số cách để miễn nhiễm với những nỗ lực như vậy. Đối với tất cả các trường đầu vào của trang web, độ dài trường phải được xác định đủ nhỏ để hạn chế đầu vào của bất kỳ tập lệnh nào.

Ví dụ: Last Name phải có độ dài 30 characters thay vì 255. Có thể có một số trường cần đầu vào dữ liệu lớn, đối với những trường như vậy, việc xác thực đầu vào phải được thực hiện trước khi lưu dữ liệu đó vào ứng dụng.

Hơn nữa, trong các trường như vậy, mọi thẻ HTML hoặc đầu vào thẻ script đều phải bị cấm. Để kích động các cuộc tấn công XSS, ứng dụng nên loại bỏ các chuyển hướng tập lệnh từ các ứng dụng không xác định hoặc không đáng tin cậy.

### Làm thế nào để test:

Tester phải đảm bảo rằng độ dài tối đa của tất cả các trường đầu vào được xác định và thực hiện. Anh ta cũng nên đảm bảo rằng độ dài xác định của các trường đầu vào không phù hợp với bất kỳ đầu vào tập lệnh nào cũng như đầu vào thẻ. Cả hai đều có thể dễ dàng kiểm tra.

Ví dụ: Nếu 20 là độ dài tối đa được chỉ định cho trường ‘Name’ và chuỗi nhập “<p> thequickbrownfoxjumpsoverthelazydog” có thể xác minh cả hai ràng buộc này.

Tester cũng phải xác minh rằng ứng dụng không hỗ trợ các phương pháp truy cập ẩn danh. Trong trường hợp bất kỳ lỗ hổng nào trong số này tồn tại, ứng dụng đang gặp nguy hiểm.

Về cơ bản, kiểm thử SQL injection có thể được thực hiện thông qua năm cách sau:

Kỹ thuật phát hiện
Kỹ thuật chèn SQL tiêu chuẩn
Đánh dấu cơ sở dữ liệu
Kỹ thuật khai thác
Kỹ thuật xâm lấn chữ ký SQL Injection

XSS cũng là một loại nội dung đưa tập lệnh độc hại vào một trang web.
    
## 3.5. Service Access Points (Sealed And Secure Open)
    
Ngày nay, các doanh nghiệp phụ thuộc và cộng tác với nhau, điều này cũng tốt cho các ứng dụng, đặc biệt là các trang web. Trong trường hợp này, cả hai cộng tác viên nên xác định và xuất bản một số điểm truy cập cho nhau.

Cho đến nay, kịch bản có vẻ khá đơn giản và dễ hiểu, nhưng đối với một số sản phẩm dựa trên web như giao dịch chứng khoán, mọi thứ không đơn giản và dễ dàng như vậy.

Khi có một số lượng lớn đối tượng mục tiêu, các điểm truy cập phải đủ mở để tạo điều kiện thuận lợi cho tất cả người dùng, đủ sức chứa để đáp ứng mọi yêu cầu của người dùng và đủ an toàn để đối phó với bất kỳ thử nghiệm bảo mật nào.

### Làm thế nào để test:
    
Ví dụ về ứng dụng web giao dịch chứng khoán; một nhà đầu tư (người muốn mua cổ phiếu) phải có quyền truy cập vào dữ liệu hiện tại và lịch sử về giá cổ phiếu. Người dùng phải được cung cấp cơ sở để tải xuống dữ liệu lịch sử này. Điều này đòi hỏi ứng dụng phải đủ mở.

Bằng cách phù hợp và an toàn, ứng dụng tạo điều kiện cho các nhà đầu tư tự do giao dịch (theo quy định pháp luật). Họ có thể mua hoặc bán 24/7 và dữ liệu của các giao dịch phải miễn nhiễm với bất kỳ cuộc tấn công hack nào.

Hơn nữa, một số lượng lớn người dùng sẽ tương tác với ứng dụng đồng thời, vì vậy ứng dụng phải cung cấp đủ điểm truy cập để tất cả người dùng giải trí.

Trong một số trường hợp, các điểm truy cập này có thể bị niêm phong đối với các ứng dụng hoặc người không mong muốn. Điều này phụ thuộc vào lĩnh vực kinh doanh của ứng dụng và người dùng của nó,

Ví dụ: Hệ thống quản lý văn phòng dựa trên web tùy chỉnh có thể nhận ra người dùng của nó trên cơ sở Địa chỉ IP và từ chối thiết lập kết nối với tất cả các hệ thống (ứng dụng) khác không thuộc phạm vi IP hợp lệ cho ứng dụng đó.

Người kiểm tra phải đảm bảo rằng tất cả quyền truy cập liên mạng và nội mạng vào ứng dụng là của các ứng dụng, máy móc (IP) và người dùng đáng tin cậy.

Để xác minh rằng điểm truy cập mở có đủ an toàn hay không, tester phải cố gắng truy cập điểm truy cập đó từ các máy khác nhau có cả địa chỉ IP đáng tin cậy và không đáng tin cậy. Các loại giao dịch thời gian thực khác nhau nên được thử hàng loạt để có sự tin tưởng tốt về hiệu suất của ứng dụng. Làm như vậy, dung lượng của các điểm truy cập của ứng dụng cũng sẽ được quan sát rõ ràng.

Teser phải đảm bảo rằng ứng dụng chỉ xử lý tất cả các yêu cầu giao tiếp từ các ứng dụng và IP đáng tin cậy trong khi tất cả các yêu cầu khác đều bị từ chối.

Tương tự, nếu ứng dụng có một số điểm truy cập mở, thì tester phải đảm bảo rằng nó cho phép (nếu được yêu cầu) tải lên dữ liệu của người dùng một cách an toàn. Theo cách bảo mật này, giới hạn kích thước tệp, giới hạn loại tệp và quét tệp đã tải lên để tìm vi-rút hoặc các mối đe dọa bảo mật khác.

Đây là tất cả cách tester có thể xác minh tính bảo mật của ứng dụng đối với các điểm truy cập của ứng dụng đó.
    
## 3.6. Session Management
    
Một session web là một chuỗi các giao dịch phản hồi và yêu cầu HTTP được liên kết với cùng một người dùng. Các tester quản lý phiên kiểm tra cách xử lý quản lý phiên trong ứng dụng web.

Bạn có thể kiểm tra việc hết hạn phiên sau thời gian nhàn rỗi cụ thể, kết thúc phiên sau thời gian tồn tại tối đa, kết thúc phiên sau khi đăng xuất, kiểm tra phạm vi và thời lượng cookie, kiểm tra xem một người dùng có thể có nhiều phiên đồng thời hay không, v.v.
    
## 3.7. Error handling (Xử lý lỗi)
    
Testing để xử lý lỗi bao gồm:

Kiểm tra mã lỗi: Ví dụ: kiểm tra yêu cầu 408 hết thời gian chờ, 400 yêu cầu không hợp lệ, không tìm thấy 404, v.v. Để kiểm tra các mã lỗi này, bạn cần thực hiện các yêu cầu nhất định đối với trang để các mã lỗi này được trả về.

Các mã lỗi được trả về với một thông báo chi tiết. Những tin nhắn này không được chứa bất kỳ thông tin quan trọng nào có thể được sử dụng cho mục đích hack

Kiểm tra dấu vết ngăn xếp: Về cơ bản, nó bao gồm việc cung cấp một số đầu vào đặc biệt cho ứng dụng sao cho thông báo lỗi trả về chứa dấu vết ngăn xếp không chứa thông tin thú vị cho tin tặc.
    
## 3.8. Specific Risky Functionalities (Các chức năng rủi ro cụ thể)
    
Về cơ bản, hai chức năng rủi ro là thanh toán và tải tệp lên. Các chức năng này nên được kiểm tra rất tốt. Đối với tải lên tệp, bạn cần check xem có hạn chế tải lên tệp không mong muốn hoặc độc hại nào không.

Đối với các khoản thanh toán, bạn cần chủ yếu kiểm tra các lỗ hổng bảo mật, lưu trữ mật mã không an toàn, tràn bộ đệm, đoán mật khẩu, v.v.