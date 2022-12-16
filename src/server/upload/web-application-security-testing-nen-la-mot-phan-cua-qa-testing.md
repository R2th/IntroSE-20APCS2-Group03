Một công ty phần mềm phát triển phần mềm và ứng dụng web luôn có một bộ phận kiểm thử hoặc đội QA (quality assurance) liên tục kiểm tra phần mềm và ứng dụng web được phát triển bởi công ty để đảm bảo rằng những sản phẩm hoạt động như mong muốn và không có lỗi. Những công ty lớn cùng đầu tư hàng trăm ngàn thậm chí là hàng triệu đôla để tự động hoá một số quy trình kiểm thử và đảm bảo sản phẩm có chất lượng cao.

![](https://images.viblo.asia/c8b50e33-4718-4f41-aa3c-f9ba2aa31346.png)

### **Ứng dụng web vẫn có nhiều bug**

Vậy làm thế nào mà các trang web và ứng dụng web vẫn bị hack mỗi ngày? Ví dụ, Vào tháng 4 năm 2013, một lỗ hổng cho phép tin tặc thực thi mã độc từ xa trên máy chủ web của nạn nhân đã được xác định  trong hai plugin WordPress lưu trữ phổ biến nhất. Tại sao loại lỗi này (còn gọi là lỗi khi phát triển) khi khai thác có thể khiến dữ liệu và doanh nghiệp của khách hàng gặp rủi ro không được phát hiện bởi bộ phận kiểm tra hoặc nhóm QA?


### **Chỉ kiểm tra những chức năng của ứng dụng web**

Mặc dù các công ty phần mềm có các bộ phận chuyên xác định các lỗi chức năng, nhưng hầu hết thì không có bất kỳ lỗi về bảo mật nào. Trên thực tế như nhà phát triển thêm một button trên giao diện web, thông thường thì chức năng của button sẽ được ghi lại để bộ phận tester có thể kiểm tra lại chức năng của button đó. Tuy nhiên, không có một quy trình nào kiểm tra chức năng dưới button và kiểm tra nếu button đó bị can thiệt và bị khai thác. Điều này chủ yếu xảy ra vì nhiều công ty vẫn phân biệt chức năng (QA) và kiểm tra bảo mật hoặc bộ phận quản lý chưa hình dung rõ ràng về hệ lụy mà vấn đề bảo mật khi bị khai thác có thể ảnh hưởng lớn đối với hoạt động kinh doanh của khách hàng.


### **Các ứng dụng web nên được kiểm tra các lỗ hổng trong suốt vòng đời phát triển**

Kiểm tra bảo mật các ứng dụng web và phần mềm phải được đưa vào vòng đời phát triển phần mềm (SDLC) với QA kiểm tra như bình thường. Nếu một lỗ hổng bảo mật được tìm thấy ở giai đoạn sau, hoặc bởi một khách hàng, điều đó gây sự khó chịu cho khách hàng và nó cũng sẽ khiến khách hàng phải trả giá nhiều hơn cho việc khắc phục lỗ hổng. Vì vậy, các nhà phát triển sẽ thực hiện unit test khi họ code một chức năng mới, bộ phận kiểm thử cũng nên kiểm tra và xác nhận rằng chức năng mới này là an toàn và không thể khai thác.

Thông thường, các nhà phát triển cũng nói rằng họ tuân theo quy định về code nhưng khi hoàn thành, họ cũng nên kiểm tra code của họ nhiều lần và công ty vẫn nên đầu tư tiền và xây dựng bộ phận kiểm tra lại code của họ, vậy tại sao không kiểm tra code của họ để biết các lỗ hổng ứng dụng web? Trừ khi các nhà phát triển là những hacker dày dạn kinh nghiệm, code của họ sẽ không bao giờ được phát hành trừ khi nó đã được thông qua một cuộc kiểm toán bảo mật thích hợp.

Sau tất cả, một lỗ hổng bảo mật giống như một lỗi phần mềm thông thường. Ví dụ một trường trên ứng dụng web cho phép người dùng nhập tên và giới hạn chỉ nhập chữ. Bộ phận kiểm thử sẽ kiểm tra dữ liệu nhập chỉ là chữ và được lưu trữ thành công. Trường hợp khác kiểm tra nếu dữ liệu là ký tự đặc biệt thì có cho phép không, hoặc nếu dữ liệu mã hoá được thực thi trên ứng dụng web. Nếu có thì nó là một lỗi về bảo mật.

Cụ thể như chúng ta sử 1 đoạn ký tự đặc biệt như sau: </script>alert(1);</script>. Với trường hợp kiểm tra nhập dữ liệu đặc biệt, nếu dữ liệu mã hóa này được thực thi trên ứng dụng web thì sẽ hiển thị ra một popup alert như sau:
![](https://images.viblo.asia/80ebd079-6524-40cd-a930-b01fdad45ffd.png)
=> Đây là một lỗi về bảo mật


### **Automatically Scanning cho lỗ hổng Web Application**

Đội QA có thể sử dụng những ứng dụng web quét bảo mật để phát hiện những lỗ hổng trong code. Web application security scanners tự động cho phép người dùng phát hiện những lỗ hổng trong ứng dụng web ngay cả khi họ không phải là chuyên gia bảo mật. Phần mềm như vậy giúp nhà phát triênt hiểu được các lỗ hổng và đào tạo họ viết code an toàn hơn trong tương lai. Bằng cách tự động web application security testing, bạn cũng tiết kiệm được tiền, thời gian và đảm bảo không có lỗ hổng nào được tìm thấy.

VÍ dụ: Một trong số những tool tự động scan ứng dụng quét được sử dụng phổ biến hiện nay như: OWASP Zed Attack Proxy (ZAP)
ZAP là một công cụ miễn phí và phổ biến được duy trì bởi hằng trăm nghìn tình nguyện viên trên toàn thế giới. Nó là công cụ bổ ích khi kiểm tra bảo mật thủ công vì nó giúp chúng ta tìm ra các lỗ hỏng bảo mật trên website một cách tự động.
Tham khảo thêm cách sử dụng cụ thể tại: https://viblo.asia/p/zap-tool-cho-nguoi-moi-bat-dau-naQZRxrd5vx

### **Phát triển phần mềm và ứng dụng web an toàn**

Như chúng ta đã thấy có đủ lý do và lợi thế nên kiểm tra bảo mật với kiểm tra chức năng. Bạn không bao giờ có thể cho rằng một ứng dụng web là an toàn, giống như cách bạn không bao giờ có thể cho rằng ứng dụng đó hoạt động đúng, đó là lý do tại sao các công ty đầu tư vào các đội QA. Rốt cuộc, lỗ hổng ứng dụng web là lỗi chức năng phần mềm bình thường!

Security test là kiểm thử quan trọng nhất đối với một ứng dụng và kiểm tra xem dữ liệu tuyệt mật có thực sự được giữ bí mật hay không. Trong loại kiểm thử này, tester sẽ đóng vai trò của hacker và khai thác các lỗ hổng có thể có xung quanh hệ thống để tìm các lỗi liên quan đến bảo mật. Security test đóng vai trò rất quan trọng trong công nghệ kỹ thuật phần mềm để bảo vệ dữ liệu bằng mọi cách.

Nguồn tham khảo: https://www.netsparker.com/blog/web-security/web-application-security-tests-included-in-functionality-qa-tests/

Home: [link](https://gcqt.adj.st/open/home?adj_deep_link=baseballlive%3A%2F%2Fopen%2Fhome)
Live: 2D [link](https://gcqt.adj.st/open/contents/2021000524/2d?adj_deep_link=baseballlive%3A%2F%2Fopen%2Fcontents%2F2021000524%2F2d)
Live multi 
Miss 2D [link](https://gcqt.adj.st/open/contents/2021004844/2d?adj_deep_link=baseballlive%3A%2F%2Fopen%2Fcontents%2F2021004844%2F2d)
Miss Multi [link](https://gcqt.adj.st/open/contents/2021999008/multi?adj_deep_link=baseballlive%3A%2F%2Fopen%2Fcontents%2F2021999008%2Fmulti)
VOD [link](https://gcqt.adj.st/open/video/2?adj_deep_link=baseballlive%3A%2F%2Fopen%2Fvideo%2F2)