Microservices là một trong những topic mới nổi và vẫn còn hot cho tới tận bây giờ. Định nghĩa "Microservices" được chính thức công nhận vào Tháng Năm năm 2011 tại Venice. Chỉ sau đó vài năm, Microservices bùng nổ không ngừng và vẫn tiếp tục mở rộng cho tới tận bây giờ. Theo như một báo cáo của [Nginx](https://www.nginx.com/resources/library/app-dev-survey/), 36% các sản phẩm đang sử dụng và 26% là đang trong tiến trình nguyên cứu và tiến tới thực hiện. Vậy kiến trúc Microservices có gì mới lạ mà lại có thể hot như vậy.

# Microservices là gì?

Microservices hay tên đầy đủ là kiến trúc Microservices, là một cách thiết kế ứng dụng mà ta sẽ tách các chức năng riêng biệt thành các service con, trong đó mỗi services:

* Dễ dàng maintain và testing.
* Có thể kết nối với nhau.
* Đưọc deploy một cách độc lập với nhau.
* Được tổ chức xung quanh một ứng dụng chính.
* Được phát triển bởi một team.

Kiến trúc Microservices giúp chúng ta có thể nhanh chóng phát triển, quản lý một ứng dụng có độ phức tạp cao. Bên cạnh đó, vịêc tách thành các service con giúp cho ứng dụng không bó hẹp bởi một ngôn ngữ hay framework nhất định.

Bản thân [viblo.asia](https://viblo.asia)  cũng là một microservice mà các trang web xung quanh có thể hoạt động một cách độc lập cũng như có thể tương tác được với nhau.

![](https://images.viblo.asia/738a1fa5-c993-4858-9e4f-daef0c39fa38.png)

Mô hình bên trên giải thích phần nào sự khác nhau giữa kiến trúc nguyên khối và kiến trúc microservice. Theo mô hình truyền thống, ta có một server sẽ xử lý toàn bộ request. Khi ứng dụng lớn dần lên, ta sẽ gặp phải nhiều vấn đề nan giải, đặc biệt là vấn đề liên quan tới khả năng mở rộng của hệ thống. Còn với kiến trúc microservice, ta có thể cân bằng tải, điều hưóng và cung cấp tài nguyên hệ thống khi một service nào đang bị quá tải trong khi vẫn duy trì các service khác tránh tình trạng sập toàn bộ như với mô hình nguyên khối.

Thiết kệ một hệ thống sử dụng kiến trúc microservice phải đảm bảo 3 yếu tố sau:
* Single purpose: Mỗi service chỉ đảm nhiệm một nhiệm vụ duy nhất
* Loose coupling: Các service tách bịêt với nhau. Khi một service thay đổi sẽ không ảnh hướng tới các service còn lại. Các service tương tác với nhau qua một interface service.
* High cohesion: Các dữ liệu chung sẽ được đồng nhất với nhau. Khi chúng ta xây dựng một chức năng mới, những thay đổi chỉ nên gói gọn trong một service duy nhất.

    ![](https://miro.medium.com/max/2000/1*f5yQlyPApGNPfauFBe0pTA.png)
    
    Khi xây dựng mô hình microservice, chúng ta nên tuân thủ 3 quy tắc trên. Chỉ vi phạm một trong ba, ta sẽ phá vỡ mô hình.
    
    Nếu phá vỡ quy tắc *Single purpose* , mỗi service sẽ đảm nhận nhiều tác vụ. Từ đó, không còn là các mircroservice nữa, thay vào đó là các service nguyên khối. Ta sẽ không tận dụng được những ưu điểm của kiến trúc microservice.
    
    Nếu phá vỡ quy tắc *Loose coupling*, mỗi thay đổi ở service này sẽ tác động tới serivce khác, do đó ta không thể thực hiện những thay đổi đó nhanh và an toàn, mà yếu tố này là một trong những điểm mạnh của kiến trúc microservices.
    
    Nếu phá vỡ quy tắc *High cohesion*, ta sẽ nhận được một hệ thông phân tán. Ta sẽ khó khăn trong việc quản lý dữ liệu cũng như xây dựng các feature mới. Dữ liệu không đồng nhất giữa các service vừa tăng thời gian lẫn tiền bạc để xây dựng ứng dụng.
    
    # Lợi ích của Microservices
    ![](https://cdn.tiempodev.com/wp-content/uploads/2019/06/23163007/Advantages-of-Microservices-Architecture-01.png)
    Microservice đang dần trở thành một xu thế tất yếu khi các công ty lớn như Netflix, Amazone, Medium, .. .đang sử dụng thay cho kiến trúc truyền thống.
    
    * Dễ dàng cách ly lỗi: Dự án lớn gần như không bị ảnh hưởng bởi lỗi của một module con. Bên cạnh đó, sẽ là dễ dàng hơn nhiều khi test một service nhỏ so với một ứng dụng to.
    * Đa dạng ngôn ngữ: Vịêc tách nhiều service giúp chúng ta có thêm nhiều lựa chọn cho technical-stack.  Mỗi ngôn ngữ sẽ có điểm mạnh riêng, và do đó có thể dễ dạng lựa chọn nhiều ngôn ngữ cho từng service.
    * Tăng tóc độ xây dựng ứng dụng: Đây là điểm mạnh nhất so với kiến trúc truyền thống. Các team có thể phát triển, testing, và deploy nhiều microservices cùng một lúc giúp giảm thiểu thởi gian phát triển.
    * Giảm thiểu lượng code: Sau một quá trình phát triển, ứng dụng sẽ được refactor lại và sẽ có rất nhiều function bị loại bỏ. Với ứng dụng truyền thống, để loại bỏ một function có thể khiến ứng dụng lỗi hoàn toàn. Do microservices có lượng code base ít hơn nhiều, do đó ta có thể dễ dàng xoá bỏ giúp vừa giảm thiểu dung lượng ứng dụng cũng như tăng tốc độ phát triển.
    * Dễ dang quản lý: Mỗi service được cách ly với nhau cho nên ta có thể dễ dàng quản lý cũng như nhận biết được lỗi bắt đầu tại đâu có nhanh chóng sữa chúng.
    * Tăng khả năng mở rộng: Đây cũng là một trong những lợi ích chính của kiến trúc microservices. Các ứng dụng khi mở rộng có thể tách thành nhiều service con nữa và sử dụng nhũng technical stacks tiên tiến hơn. Những service có thể được mở rộng theo chiều ngang lần chiều dọc.
 

# Bất lợi của Microservices
Tuy có nhiều điểm lợi, nhưng Microservices có một số bất cập như sau:
* Ứng dụng sẽ phức tạp hơn: Đây là điểm bất lợi chính của kiến trúc Microservices. Càng nhiều service thì độ phức tạp càng lớn.
* Ứng dụng sẽ tốn kém hơn: Do tách riêng cách services, cho nên để đồng bộ dữ liệu sẽ tăng lượng request cũng như độ trễ ứng dụng so với kiến trúc nguyên khối thông thuờng. Do đó, developer cần phải tối ưu lượng request.
* Đau đầu trong quản lý ứng dụng: Với vịêc sử dụng nhiều cơ sở dữ liệu khác nhau, vịêc quản lý cũng như mở rộng sẽ thành một vấn đề nan giải. Bên cạnh đó, mỗi services sẽ cung cấp các API khác nhau dẫn đến việc theo dõi ứng dụng trở nên khó khăn.
* Vịêc Deploy sẽ khó khăn hơn: Khi bạn có nhiều service, vịêc deploy nếu không được làm đúng cách sẽ dẫn đến vịêc chết hệ thống từ vài giây đến cả tiếng đồng hồ. Điều này sẽ gây tổn hại rất nhiều cho doanh nghiệp.

# Tổng kết
Mỗi kiến trúc đều có một điểm lợi và hại riêng, tuy nhiều các công ty lớn sẵn sàng đánh đổi những bất lợi để ứng dụng kiến trúc Microservice vào ứng dùng của mình đã có thấy tiềm năng to lơn của kiến trúc này.