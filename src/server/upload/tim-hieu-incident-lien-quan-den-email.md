## 1. Incident là gì
Incident là những sự cố xảy ra bất ngờ và gây hậu quả nghiêm trọng trong quá trình phát triển. Đặc biệt đối với các công ty sản xuất phần mềm thì đây được xem như một trong những vấn đề quan trọng cần quan tâm tới. Tùy thuộc vào từng Incident mà sẽ có mức độ ảnh hưởng khác nhau
* Ảnh hưởng tới End user（Người sử dụng dịch vụ)
* Ảnh hưởng tới chức năng  của hệ thống (chức năng chính không hoạt động, chức năng được sử dụng nhiều không hoạt động)
* Bị thương・thiệt hại vật chất (có những điện thoại nếu sạc quá lâu sẽ gây nổ)
* Rò rỉ thông tin cá nhân
* Rò rỉ tài sản dự án (tên dự án, tên khách hàng, source code của dự án)....

Trong số các sự cố về Incident thì Incident về Email được đánh giá là một trong những sự cố nghiêm trọng bởi nó gây ảnh hưởng trực tiếp tới End user. Nếu gửi nhầm Email thì có thể gây lộ thông tin cá nhân hoặc các thông tin cần bảo mật. Chính vì thế là một QA - người đảm bảo chất lượng phần mềm chúng ta cần phải chú ý và cẩn thận khi test các chức năng liên quan đến Email.  ![](https://images.viblo.asia/3237f94c-18b0-4732-ae30-8f24c00266ea.png)


## 2. Các Incident liên quan đến Email
### Rò rỉ thông tin cá nhân
Như chúng ta đã biết Email một khi đã gửi đi thì sẽ không thể chỉnh sửa được nên các thông tin đã bị lộ trên Email thì bị lộ và có thể public trên mạng xã hội gây ảnh hưởng trực tiếp tới người bị lộ thông tin. Điều đó có thể khiến chúng ta bị kiện và phải bồi thường.

**Ví dụ:** Cô ca sĩ A nổi tiếng luôn khẳng định mình sở hữu vẻ đẹp tự nhiên tuy nhiên một hôm thẩm mỹ viện gửi tài liệu về quá trình phẫu thuật của cô qua mail kèm thời gian tái khám. Không may thông tin này lại gửi đến một bệnh nhân có tên gần giống cô. Bệnh nhân kia nhanh chóng public thông tin này lên mạng xã hội.

Incident này sẽ có mức độ cực kỳ nghiêm trọng. Ảnh hưởng trực tiếp tới cô ca sĩ A. Các hợp đồng quảng cáo, các show diễn, các fan hâm mộ đều bị ảnh hưởng. Ai sẽ là người bồi thường thiệt hại cho cô. Thẩm mỹ viện có thể sẽ bị kiện và phải bồi thường vì đã để lộ thông tin bảo mật của cô ca sĩ. Hơn thế nữa bạn có tin tưởng để sử dụng các dịch vụ của thẩm mỹ viện này không? Chắc chắn là không. Vì thế nên thẩm mỹ này cũng có nguy cơ sẽ phải đóng cửa.

### Email bị gửi duplicate
![](https://images.viblo.asia/5423e812-90f8-46a0-9c0f-6e3eccca3e70.jpeg)

Việc một Email bị gửi nhiều lần tới user sẽ khiến user cảm thấy không thoải mái, độ tin tưởng dành cho dịch vụ cũng giảm xuống vì sự thiếu chuyên nghiệp này. Đó là chỉ là các Email chứa thông tin vậy một Email liên quan đến điểm thưởng, mã khuyến mại gây thiệt hại về kinh tế thì sao

**Ví dụ:** Trong đợt sinh nhật của trang thương mại điện tử A, để tri ân khách hàng họ đã gửi tới mỗi user một số point để mua hàng. Thay vì chỉ gửi một email thì user đã nhận được 2 email  với cùng nội dung và số point. Số lượng point phụ thuộc vào thứ hạng của khách hàng nên có những khách hàng có nhiều point, có khách hàng có ít point. Điều này khiến cho hệ thống không check một khách hàng chỉ được dùng một lượng point nhất định mà nó cộng dồn point vào. Ngay sau đó người quản lý công ty A đã phát hiện và dừng tính năng gửi point cho các khách hàng còn lại.

Trong trường hợp này công ty A cũng không thể gửi mail yêu cầu user đừng dùng số point đó vì nó sẽ đánh giá họ thiếu chuyên nghiệp. Công ty đã báo cho bên phát triển và bảo trì hệ thống trong vòng một số giờ để fix tính năng này, bởi đã có thông báo sẽ gửi point cho tất cả user trong ngày hôm đó.
Công ty A đã yêu cầu bồi thường từ phía công ty phát triển, và chấm dứt hợp đồng với họ vì gây ra Incident ảnh hưởng lớn như vậy.

### Email bị gửi sai nội dung 
Mỗi Email gửi tới một End user khác nhau sẽ chứa đựng các thông tin khác nhau. Gửi một thông tin không chính xác sẽ khiến người dùng cảm thấy không thoải mái và đánh giá sự thiếu chuyên nghiệp của hệ thống. Đôi khi việc nội dung Email nhầm lẫn còn có thể gây thiệt hại về kinh tế, tinh thần vì để lộ các thông tin bảo mật
![](https://images.viblo.asia/71653cb5-d33e-499f-b6f4-badf9d4e3bc1.png)


**Ví dụ:**  Trong một tổ chức có một bộ phận chuyên làm nhiệm vụ bí mật và thông tin của họ không được phép public. Ngay cả các thành viên trong bộ phận đó cũng không biết thông tin về những thành viên khác. Một ngày đẹp trời họ nhận Email về các nhiệm vụ của mình trong tháng 10 và nội dung của Email đều ghi là **Dear Mr john** còn các nhiệm vụ nội dung khác thì đều gửi đúng người. Điều này đã khiến cho tất cả các thành viên khác biết được John cũng tham gia hoạt động trong bộ bí mật này. 

Trong trường hợp này người bị ảnh hưởng nhiều nhất đó là John, liệu anh có đủ tin tưởng và an tâm hoàn thành tiếp công việc. Phía tổ chức ngay lập tức đã phải họp bàn các thành viên trong bộ phận để yêu cầu ký cam kết chặt chẽ hơn về việc bảo mật thông tin cho các thành viên khác. Bộ phận gửi Email cũng phải chịu trách nhiệm trước việc không check cẩn thận nội dung Email của mình.

### QA sử dụng Email không quản lý được để test 
Nhằm tăng sự hiểu biết của nhân viên về công ty thì phía lãnh đạo đã ra yêu cầu nhân viên cần trả lời đúng một số câu hỏi mới login được vào hệ thống. Điều này khiến cho một số QA test các dự án khác cần đăng nhập qua hệ thống này gặp khó khăn và mất thời gian. Một QA đã sửa đuôi của một số emal test  có format abc@domain.com.test về abc@domain.com nhằm thoát qua vòng trả lời câu hỏi. QA này thật thông minh? Tuy nhiên ngay sau đó QA lead của dự án đã phát hiện và đã gây ra một Incident không hề nhỏ bởi các email có format abc@domain.com trên thực tế có thể có người sử dụng, vô tình chung các thông tin dự án có thể gửi về những email này.  Ngay lập tức các email đã được chỉnh sửa lại và đây cũng là một bài học lớn khi test các tính năng liên quan đến email. 

Trong trường hợp này vì thời gian phát hiện sớm nên chưa có vấn đề gì sảy ra. Nếu thông tin dự án thật sự bị lộ thì QA kia có thể sẽ phải bị sa thải, bồi thường thiệt hại cho công ty. Dự án có thể bị đánh cắp, ảnh hưởng đến tài sản và niềm tin của khách hàng.


## 3. Một số giải pháp ngăn chặn Incident về Email
### Chú trọng hơn trong khâu kiểm thử
Bộ phận kiểm thử Tester/ QA là một trong những bộ phận vô cùng quan trọng trong dự án. Nếu QA phát hiện ra sớm các lỗi trong quá trình phát triển thì sẽ không để sảy ra Incident khi hệ thống đi vào hoạt động. Vậy làm sao để có thể kiểm thử một cách tốt nhất, đó chính là tạo cho mình một bộ testcases ,checklists test viewpoint đầy đủ nhất có thể
- Check tất cả các thành phần của Email trước khi send : địa chỉ email, title email, nội dung của Email, đặc biệt các Email có thông tin cá nhân
- Note lại các Incident đã sảy ra trước đó để các lần release sau không bị gặp lại
- Thêm testcase type cho các case về Email để các QA khác cùng chú ý test cẩn thận,kỹ lượng đối với các case này

### Chỉ sử dụng các email quản lý được hoặc email của công ty/khách hàng cung cấp
Sử dụng một Email không quản lý được sẽ gây lộ thông tin bảo mật, và gây ra các Incident vì vậy cần đưa ra các rule cho QA/ Tester khi tham gia dự án đó là chỉ được phép sử dụng email của công ty/ Email khách hàng cung cấp trong quá trình test các chức năng về Email.  Còn các case Invalid Email thì có thể tự tạo Email để test.

### Nếu muốn test chức năng cần sử dụng nhiều Email thì sử dụng Email aliases
Email alias là 1 địa chỉ bí danh hay còn gọi là địa chỉ mail phụ của địa chỉ mail chính. Email alias sử dụng chung folder lưu trữ mail với địa chỉ mail chính nên mail từ ngoài gửi vào địa chỉ email alias cũng sẽ vào hộp thư của địa chỉ mail chính. Tính năng email alias chỉ dùng để nhận mail, không dùng để login vào hệ thống hoặc gửi mail đi. 

Email alias = Email chính+ delimiter

Ví dụ: Nhân viên A có địa chỉ mail chính là : abc@gmail.com để test tính năng gửi email thì có thể sử dụng email alias như abc+1@gmail.com, abc+2@gmail.com...
Khi mail từ bên ngoài gửi vào địa chỉ abc+1@gmail.com, abc+2@gmail.com... hệ thống sẽ phân phối mail vào thư mục của địa chỉ abc@gmail.com