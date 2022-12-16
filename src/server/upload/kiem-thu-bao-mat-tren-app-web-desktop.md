## Kiểm thử bảo mật là gì?

Phần mềm đã đạt được sự công nhận trong thời đại ngày nay. Hơn thế nữa, trong thời gian gần đây thế giới mạng dường như bị thống trị và thúc đẩy hình thành nên các hình thức kinh doanh mới tiết kiệm thời gian, chi phí và khá là hiệu quả cho các doanh nghiệp. Hệ thống Enterprise Resource Planning System - ERP (hoạch định nguồn lực doanh nghiệp) dựa trên web được sử dụng là bằng chứng cho thấy Công Nghệ Thông Tin đã bao quát toàn cầu hoá.

Nhưng ngày nay, các trang web không chỉ công khai tiếp thị mà còn phát triển thành các công cụ phục vụ nhu cầu kinh doanh hoàn chỉnh.

Hệ thống website về trung tâm mua sắm, ngân hàng, ứng dụng giao dịch, chứng khoán đã đang được xây dựng và cho ra sử dụng như những sản phẩm.

Điều này đồng nghĩa với việc ứng dụng trực tuyến đã đạt được sự tin tưởng của khách hàng và người dùng về tính năng quan trọng của nó đó là Bảo Mật

![](https://images.viblo.asia/29f57664-f608-49b3-b793-e1c76beeba7f.jpg)


Vậy thì, yếu tố bảo mật ở đây cũng chính là giá trị cốt yếu trong ứng dụng máy tính hiện nay.
Khi chúng ta nói về web, tầm quan trọng của bảo mật tăng lên theo cấp số nhân. Nếu một hệ thống trực tuyến không thể bảo vệ dữ liệu giao dịch, không ai có thể nghĩ đến việc sử dụng nó.

**Một số ví dụ cụ thể để hiểu rõ hơn về Bảo Mật:**

1. Hệ thống quản lý sinh viên không an toàn nếu mục ‘Tuyển sinh’ có thể cho phép chỉnh sửa dữ liệu của ‘Bài kiểm tra’
2. Hệ thống ERP không an toàn nếu DEO (toán tử nhập dữ liệu) có thể tạo ra ‘Báo cáo’
3. Trung tâm mua sắm trực tuyến không được bảo mật nếu Chi tiết thẻ tín dụng của khách hàng không được mã hóa
4. Một phần mềm tùy chỉnh có bảo mật không đầy đủ nếu truy vấn SQL truy xuất ra mật khẩu thực của người dùng


***Định nghĩa Bảo Mật một cách đơn giản nhất đó là: “Bảo mật có nghĩa là quyền truy cập sẽ được cấp phép cho những Dữ liệu quan trọng và đồng thời sẽ hạn chế quyền truy cập trái phép”***


Vì vậy, nó sẽ có 2 khía cạnh: bảo vệ truy cập trái phép dữ liệu và truy cập vào dữ liệu đó. Cho dù ứng dụng là máy tính hay web hay app.

Một máy tính để bàn nên được bảo mật không chỉ liên quan đến truy cập của nó mà còn đối với việc tổ chức và lưu trữ dữ liệu của nó. Tương tự như vậy, một ứng dụng web yêu cầu bảo mật liên quan đến truy cập của nó, cùng với bảo vệ dữ liệu. Một nhà phát triển web nên làm cho ứng dụng không bị ảnh hưởng với SQL Injection, Brute Force Attacks và XSS (cross-site scripting). Tương tự, nếu ứng dụng web tạo điều kiện cho các điểm truy cập từ xa thì chúng cũng phải được bảo mật.

Tiếp theo, chúng ta sẽ nói đến các tính năng bảo mật được thực hiện trong ứng dụng phần mềm và cách chúng ta thực hiện để kiểm thử chúng. 

*Whats and Hows để kiểm thử bảo mật?*


## 8 Kỹ thuật kiểm thử bảo mật phổ biến:


### **1. Truy cập vào ứng dụng**


Cho dù đó là ứng dụng dành cho máy tính để bàn hay một trang web, việc truy cập bảo mật được thực hiện bởi 'Vai trò và Quản lý quyền'. Nó thường được thực hiện khi chạy kết hợp với các chức năng.
Ví dụ: Trong hệ thống quản lý bệnh viện, nhân viên tiếp tân ít quan tâm đến các xét nghiệm trong phòng thí nghiệm vì công việc của anh ấy là chỉ cần đăng ký bệnh nhân và lên lịch hẹn với bác sĩ. Vì vậy, tất cả các menu, biểu mẫu và màn hình liên quan đến các thử nghiệm trong phòng thí nghiệm sẽ không có sẵn cho Vai trò của ‘Nhân viên tiếp tân’. Do đó, việc thực hiện đúng vai trò và quyền sẽ đảm bảo tính bảo mật của truy cập.

*Cách kiểm tra*: Để kiểm tra điều này, cần thực hiện kiểm tra kỹ lưỡng tất cả các vai trò và ta nên sử dụng ứng dụng với sự trợ giúp của các tài khoản này và phải xác minh rằng mọi vai trò đều có quyền truy cập vào các mô-đun, màn hình, biểu mẫu và menu riêng của nó. Nếu tìm thấy bất kỳ xung đột nào, chúng ta nên log một issue bảo mật với team/system một cách kín đáo.


Kiểm tra xác thực và Uỷ quyền được miêu tả như hình sau:

![](https://images.viblo.asia/6f5a027c-ce19-4442-8c8a-35f25c8fa763.jpg)

Vì vậy, về cơ bản, bạn cần phải thử nghiệm về ‘bạn là ai’ và ‘những gì bạn có thể làm’ cho những người dùng khác biệt.


### **2. Bảo vệ dữ liệu**


Có ba khía cạnh của bảo mật dữ liệu. Đầu tiên là người dùng chỉ có thể xem hoặc sử dụng dữ liệu mà người đó được sử dụng. Điều này cũng được đảm bảo bởi vai trò và quyền.

Ví dụ: Nhân viên của một công ty có thể xem dữ liệu của một cổ phiếu có sẵn, nhưng không thể xem có bao nhiêu nguyên liệu đã được mua cho sản xuất.


Khía cạnh thứ hai của bảo vệ dữ liệu liên quan đến cách dữ liệu được lưu trữ trong DB. Tất cả các dữ liệu nhạy cảm phải được mã hóa để bảo đảm tính an toàn cho nó. Mã hóa phải mạnh mẽ, đặc biệt là đối với những dữ liệu như mật khẩu của tài khoản người dùng, số thẻ tín dụng hoặc thông tin quan trọng khác về kinh doanh. Khía cạnh cuối cùng là phần mở rộng của khía cạnh thứ hai này. Các biện pháp an ninh thích hợp phải được áp dụng khi luồng dữ liệu quan trọng này diễn ra. Cho dù dữ liệu này là luồng giữa các mô-đun khác nhau của cùng một ứng dụng hay được truyền đến các ứng dụng khác nhau, nó phải được mã hóa để giữ cho nó an toàn.

![](https://images.viblo.asia/12b89a4f-9bc8-49b0-a219-045f84f664f2.jpg)

*Cách kiểm tra bảo vệ dữ liệu*: Trình kiểm tra sẽ truy vấn cơ sở dữ liệu cho 'mật khẩu' của tài khoản người dùng, thông tin thanh toán của khách hàng, dữ liệu quan trọng và phải xác minh rằng tất cả dữ liệu đó được lưu dưới dạng mã hóa trong DB. Tương tự, chúng ta phải xác minh rằng dữ liệu được truyền đi giữa các hình thức hoặc màn hình khác nhau chỉ sau khi mã hóa thích hợp. Hơn nữa, người kiểm tra phải đảm bảo rằng dữ liệu được mã hóa được giải mã đúng tại đích. Cần chú ý đặc biệt đến các hành động ‘gửi’ khác nhau. Tester phải xác minh rằng khi thông tin được truyền giữa máy khách và máy chủ, nó sẽ không được hiển thị trong url địa chỉ của trình duyệt web ở định dạng dễ hiểu. Nếu bất kỳ xác minh nào không thành công thì ứng dụng chắc chắn có lỗ hổng bảo mật.


Tester cũng nên kiểm tra việc sử dụng giá trị đặc biệt để gắn thêm vào đầu vào cuối mật khẩu do đó sẽ làm cho nó mạnh hơn và khó bị bẻ khóa hơn

Tính ngẫu nhiên không an toàn cũng nên được kiểm tra vì nó là một loại lỗ hổng.

Một cách khác để kiểm tra bảo vệ dữ liệu là kiểm tra việc sử dụng HTTP hay HTTPS. Ví dụ, vì HTTP là một giao thức văn bản rõ ràng, nếu các dữ liệu nhạy cảm như thông tin người dùng được truyền qua HTTP, thì đó là một mối đe dọa cho bảo mật ứng dụng. Thay vì HTTP, dữ liệu nhạy cảm sẽ được chuyển qua HTTPS (bảo mật thông qua SSL, TLS). Tuy nhiên, HTTPS làm tăng bề mặt tấn công và do đó cần kiểm tra xem cấu hình máy chủ có phù hợp và hiệu lực chứng chỉ được đảm bảo hay không.


### **3. Tấn công Brute-Force**


Brute Force Attack chủ yếu được thực hiện bởi một số công cụ phần mềm. Khái niệm này là bằng cách sử dụng ID người dùng hợp lệ, phần mềm sẽ cố gắng đoán mật khẩu được liên kết bằng cách cố đăng nhập lại. Một ví dụ đơn giản về bảo mật chống lại tấn công như vậy là tạm ngưng tài khoản trong một khoảng thời gian ngắn (ví dụ 3 lần) vì tất cả các ứng dụng không đăng nhập thành công, thì tài khoản đó bị chặn trong một khoảng thời gian (tuỳ có thể từ 1 phút đến 24 giờ).

![](https://images.viblo.asia/a0287f62-d704-486a-8b20-c54801655df4.jpg)

*Cách kiểm tra Brute-Force Attack*: Tester phải xác minh chính xác rằng một số cơ chế tạm ngưng tài khoản là đang có sẵn và đang hoạt động bình thường. Chúng ta phải cố đăng nhập bằng ID người dùng và mật khẩu không hợp lệ để đảm bảo rằng ứng dụng phần mềm chặn các tài khoản nếu có các lần thử liên tục được thực hiện để đăng nhập bằng thông tin đăng nhập không hợp lệ. Nếu ứng dụng đang làm như vậy, nó là an toàn chống lại tấn công brute-force. Nếu không, lỗ hổng bảo mật này phải được báo cáo bởi tester.

Thực hiện kiểm thử cũng có thể được chia thành hai phần - thử nghiệm hộp đen và thử nghiệm hộp màu xám.

Trong thử nghiệm hộp đen, phương pháp xác thực ứng dụng được phát hiện và thử nghiệm. Và việc kiểm thử hộp màu xám dựa trên ghi nhận mật khẩu - chi tiết tài khoản và lịch sử các lần tấn công bộ nhớ.

*Ba khía cạnh bảo mật trên nên được áp ụng cho cả App, Web và Desktop trong khi các điểm sau chỉ liên quan đến các ứng dụng dựa trên web.***


### **4. SQL Injection và XSS (cross-site scripting)**

![](https://images.viblo.asia/f3a7f413-9db9-4c91-830b-2b0c29afbd00.jpg)

Trong cách tiếp cận này, tập lệnh độc được sử dụng bởi các tin tặc để thao túng một trang web. Có một số cách để chống lại những nỗ lực đó. Đối với tất cả các trường nhập của trang web, độ dài trường phải được xác định đủ nhỏ để hạn chế đầu vào của bất kỳ tập lệnh nào

Ví dụ: Tên cuối cùng phải có độ dài trường 30 thay vì 255. Có thể có một số trường đầu vào cần nhập dữ liệu lớn, để các trường như vậy xác nhận hợp lệ đầu vào phải được thực hiện trước khi lưu dữ liệu đó vào ứng dụng. Hơn nữa, trong các trường như vậy, mọi thẻ HTML hoặc đầu vào thẻ tập lệnh đều phải bị cấm. Để tránh các cuộc tấn công XSS, ứng dụng nên loại bỏ các chuyển hướng từ các ứng dụng không xác định hoặc không đáng tin cậy.

*Làm thế nào để kiểm tra SQL Injection và XSS*: Tester phải đảm bảo rằng độ dài tối đa của tất cả các trường đầu vào đều được xác định và thực hiện kiểm thử. Chúng ta phải đảm bảo rằng chiều dài được xác định của ô nhập đầu vào không chứa bất kỳ tag input cũng như script input nào. Cả hai đều có thể dễ dàng kiểm tra.

Ví dụ: Nếu 20 là độ dài tối đa được chỉ định cho trường ‘Tên’ và chuỗi đầu vào “<p> thequickbrownfoxjumpsoverthelazydog” có thể xác minh cả hai ràng buộc này. Nó cũng cần được xác minh bởi người kiểm thử rằng ứng dụng không hỗ trợ các phương thức truy cập nặc danh. Trong trường hợp bất kỳ lỗ hổng nào tồn tại, ứng dụng sẽ gặp nguy hiểm.

Về cơ bản, kiểm thử SQL injection có thể được thực hiện thông qua năm cách sau đây:

* Kỹ thuật phát hiện
* Các kỹ thuật kiểm thử SQL injection chuẩn
* Vân tay cơ sở dữ liệu
* Kỹ thuật khai thác
* SQL Injection Signature Invasion Kỹ thuật

XSS cũng là một loại injection đưa mã độc vào một trang web. Để tìm hiểu sâu về thử nghiệm cho XSS cũng như SQL injection có thể tham khảo những bài viết khác.


### **5.  Điểm truy cập dịch vụ**

![](https://images.viblo.asia/f4a78b92-5781-48df-9692-a93fbfd975c7.jpg)

Ngày nay, các doanh nghiệp phụ thuộc và cộng tác với nhau, cùng nắm giữ các ứng dụng đặc biệt là các trang web. Trong trường hợp này, cả hai nên xác định và đưa ra một số điểm truy cập cho nhau. Nhưng đối với một số sản phẩm dựa trên web như giao dịch chứng khoán, mọi thứ không đơn giản và dễ dàng như vậy. Khi có số lượng lớn đối tượng mục tiêu, các điểm truy cập mở phải đủ để tạo thuận lợi cho tất cả người dùng, đủ sức chứa để đáp ứng tất cả yêu cầu của người dùng và đủ an toàn để đối phó với bất kỳ bản dùng thử bảo mật nào.

*Cách kiểm tra các điểm truy cập dịch vụ:* Ví dụ về ứng dụng web giao dịch chứng khoán; một nhà đầu tư (những người muốn mua cổ phần) có quyền truy cập vào dữ liệu hiện tại và lịch sử về giá cổ phiếu. Người dùng phải được cung cấp cơ sở để tải xuống dữ liệu lịch sử này. Điều này đòi hỏi ứng dụng phải đủ mở. Bằng cách có sức chứa và an toàn, ứng dụng sẽ tạo thuận lợi cho các nhà đầu tư tự do thương mại (theo các quy định pháp luật). Họ có thể mua hoặc bán 24/7 và dữ liệu giao dịch phải miễn dịch với bất kỳ cuộc tấn công nào. Hơn nữa, một số lượng lớn người dùng sẽ tương tác với ứng dụng đồng thời, vì vậy ứng dụng sẽ cung cấp đủ số điểm truy cập để thoả mãn tất cả người dùng.

Tester phải đảm bảo rằng tất cả truy cập mạng nội bộ vào ứng dụng là bởi các ứng dụng, máy móc (IP) và người dùng đáng tin cậy. Để xác minh rằng một điểm truy cập mở là đủ an toàn, người kiểm thử phải cố gắng truy cập nó từ các máy khác nhau có cả địa chỉ IP đáng tin cậy và không đáng tin cậy. Các loại giao dịch thời gian thực khác nhau nên được thử hàng loạt để có được sự tự tin tốt về hiệu suất của ứng dụng. Bằng cách đó, khả năng của các điểm truy cập của ứng dụng cũng sẽ được quan sát rõ ràng.

Tester phải đảm bảo rằng ứng dụng thoả mãn tất cả các yêu cầu liên lạc từ các IP và ứng dụng đáng tin cậy chỉ trong khi tất cả các yêu cầu khác đều bị từ chối. Tương tự, nếu ứng dụng có một số điểm truy cập mở, thì trình kiểm tra phải đảm bảo rằng nó cho phép tải lên dữ liệu của người dùng một cách an toàn (nếu cần). Bao gồm cả về giới hạn kích thước tệp, hạn chế loại tệp và quét tệp đã tải lên vì vi-rút hoặc các mối đe dọa bảo mật khác. Đây là tất cả các cách một tester có thể xác minh tính bảo mật của một ứng dụng liên quan đến các điểm truy cập của nó.


### **6. Quản lý phiên**

![](https://images.viblo.asia/827ec928-0ba7-4650-8f76-95342ae58806.jpg)

Phiên web là một chuỗi các giao dịch yêu cầu và phản hồi HTTP được liên kết với cùng một người dùng. Kiểm tra quản lý phiên là kiểm tra cách quản lý phiên được xử lý trong ứng dụng web. Tester có thể kiểm tra phiên hết hạn sau thời gian rảnh web cụ thể, chấm dứt phiên sau khi hết thời gian, kết thúc phiên sau khi đăng xuất, kiểm tra phạm vi và thời lượng cookie của phiên, kiểm tra xem một người dùng có thể có nhiều phiên đồng thời, v.v.


### **7. Xử lý lỗi**

![](https://images.viblo.asia/d17198eb-c1e5-4dc7-aaa3-489a5575c14a.jpg)

Thử nghiệm để xử lý lỗi bao gồm

Kiểm tra mã lỗi: Ví dụ: kiểm tra yêu cầu hết thời gian 408, 400 yêu cầu không hợp lệ, 404 không tìm thấy, v.v. Để kiểm tra những điều này, tester cần thực hiện một số yêu cầu cho trang sao cho các mã lỗi này được trả lại. Các mã lỗi được trả về với một thông báo chi tiết. Các thông báo này không được chứa bất kỳ thông tin quan trọng nào có thể được sử dụng cho mục đích hacking

Kiểm tra ngăn xếp: Về cơ bản nó bao gồm một số đầu vào đặc biệt cho ứng dụng sao cho thông báo lỗi trả về chứa các dấu vết ngăn xếp có thông tin thú vị cho tin tặc.


### **8. Các chức năng rủi ro cụ thể**

Chủ yếu, hai chức năng nguy hiểm là thanh toán và tải lên tệp. Các chức năng này nên được kiểm thử thật kỹ. Để tải tệp lên, tester cần chủ yếu kiểm tra xem tệp tải lên có bất kỳ tệp không mong muốn hoặc tệp độc hại bị hạn chế nào hay không. Đối với các khoản thanh toán, bạn cần kiểm tra chủ yếu các lỗ hổng injections, lưu trữ mật mã không an toàn, tràn bộ đệm, đoán mật khẩu, v.v.


Nguồn tham khảo tại: https://www.softwaretestinghelp.com