Bắt đầu với việc kiểm thử tự động cho một trang web có thể phức tạp sẽ phải đòi hỏi trải qua 1 quá trình nghiên cứu, học tập, đặc biệt là đối với những người mới sử dụng automation testing. Hướng dẫn sau đây sẽ giúp bạn giảm bớt quá trình đó bằng cách sử dụng Katalon Studio.

## Test scenario
Đối với hướng dẫn này, chúng tôi đang sử dụng Katalon Studio để kiểm tra ứng dụng web giả ( CURA ) có thể truy cập tại v . CURA là một dịch vụ chăm sóc sức khỏe đơn giản cho phép bệnh nhân đặt lịch hẹn với bác sĩ.

Trong hướng dẫn này, chúng tôi tạo một trường hợp thử nghiệm để kiểm tra các luồng sau

1. Đăng nhập

2. Đặt lịch hẹn

3. Kiểm tra xem cuộc hẹn đã được đặt thành công chưa

4. Đăng xuất

## Bắt đầu
1.Tạo một project  thử nghiệm tự động hóa trong Katalon Studio như sau:
![](https://images.viblo.asia/04f3b620-c5cf-40bf-af2d-3733bd723dc7.png)
![](https://images.viblo.asia/efdc6d72-c2d8-4452-bb3a-a0af9fa16bed.png)

2.Tạo một project, trong đó chứa tất cả các sptep cần thiết của một kịch bản sẽ được viết:

![](https://images.viblo.asia/d3733c9b-7c24-435a-94cb-95fe931c4bb5.png)
![](https://images.viblo.asia/55b56c28-fa5d-442b-811e-b150f072f6bf.png)

Case thử nghiệm mới được tạo dưới dạng tệp script file, Bạn bắt đầu có thể viết các luồng logic cho việc kiểm thử rồi

3.Tạo các trường hợp thử nghiệm tự động hóa
Đối với người mới bắt đầu, chúng tôi khuyên bạn nên sử dụng chức năng Record – Playback để làm quen với quy trình viết kịch bản. Katalon Studio Recorder có khả năng tạo các bước kiểm tra một cách nhanh chóng và người dùng có thể chỉ cần tập trung vào các bước xác thực.
Nhấp vào nút Record trên Thanh công cụ để mở hộp thoại Record, sau đó nhập http://demoaut.katalon.com cho trường URL và chọn Chrome trên hộp thoại để bắt đầu ghi.

![](https://images.viblo.asia/748d82ba-c7fd-4588-bd5f-94e35a079af2.png)
![](https://images.viblo.asia/27cf12c2-2682-43b5-8360-89080abca978.png)

 trình duyệt Chrome với trang web CURA sẽ được kích hoạt. Bấm vào nút Make Appointment.
 
 ![](https://images.viblo.asia/38915c85-d152-43e7-8b5a-4dbde6b00c4b.png)
 
Nhập “ John Doe ” cho tên người dùng và “ ThisIsNotAPassword ” cho mật khẩu trên trang đăng nhập.
Trên trang Đặt hẹn, điền thông tin cuộc hẹn cần thiết và nhấp vào nút Book Appointment để đặt lịch hẹn

![](https://images.viblo.asia/8634b3e3-59e8-4958-9160-c08b4f3a1a00.png)

Trang Xác nhận Cuộc hẹn sẽ hiển thị. Nhấp vào nút Đăng xuất để hoàn tất phiên đã ghi.

![](https://images.viblo.asia/b5ab9f3f-61e1-42fb-9bfe-0b38c9fd0240.png)

Quay lại hộp thoại Katalon Studio Record và bạn có thể xem tất cả các thao tác được ghi lại. Nhấp vào OK để kết thúc quá trình ghi 
![](https://images.viblo.asia/9735384b-8263-4a2a-8327-5fec8fcde14f.png)

Các kịch bản kiểm tra đã ghi có thể được phát lại ngay lập tức và bạn có thể bắt đầu kiểm tra tự động hóa ngay. Nhấp vào nút Chạy với Chrome để bắt đầu chạy trường hợp thử nghiệm của bạn.

![](https://images.viblo.asia/b3f54bdc-ea2e-4118-9dc2-d0ffdf9d8f34.png)

Các tập lệnh kiểm tra được ghi lại sẽ chạy trơn tru, nhưng bạn sẽ thấy kiểm tra không thành công ở bước 14 (Click on “a_Logout” element ) với thông báo lỗi “Unable to click on object 'Object Repository/Page CURA Healthcare Service (3)/a Logout'. Đừng lo lắng, điều này có thể được khắc phục bằng các bước sau.

4.Hoàn thành trường hợp thử nghiệm đầu tiên của bạn, nếu bạn điều tra thông báo không thực hiện được thử nghiệm, nó sẽ bao gồm thông báo “ org.openqa.selenium.WebDriverException: lỗi không xác định: Phần tử không thể nhấp tại điểm ”.

Điều này xảy ra do Menu bên của trang web CURA đang mở và ảnh animation  khiến phần tử Đăng xuất xuất hiện chậm và quá trình phát lại của Katalon Studio không thể nhận ra nó. Để khắc phục sự cố này, chúng ta cần bước chờ ngay trước bước đăng xuất bằng cách sử dụng từ khóa waitForElementClickable , sử dụng phần tử “ a_Logout ” làm đối tượng và thay đổi đầu vào thời gian chờ thành 5 giây.

![](https://images.viblo.asia/99fc6411-a7dd-4ed3-b534-5e78551e94af.png)

Chạy lại trường hợp kiểm tra, bạn sẽ thấy nút Đăng xuất được tìm thấy và bước được thông qua.

5.Để tạo báo cáo thử nghiệm, chúng tôi cần có một bộ thử nghiệm. Bộ thử nghiệm trong Katalon Studio là nơi bạn có thể nhóm các trường hợp thử nghiệm để chạy chúng cùng nhau. Để tạo bộ thử nghiệm trong Katalon Studio, hãy nhấp vào nút Thanh công cụ mới và chọn mục Bộ thử nghiệm mới.

![](https://images.viblo.asia/70e0914c-ede6-44f5-a809-8d09cac32749.png)

Trong hộp thoại Bộ thử nghiệm mới, nhập tên và mô tả về bộ thử nghiệm của bạn, nhấp vào OK để tạo bộ thử nghiệm mới:

![](https://images.viblo.asia/e20cb5b7-e3f0-4e5d-ae54-b30887553827.png)

Từ giao diện người dùng của bộ thử nghiệm, nhấp vào nút Thêm và check vào “ Cơ bản ”, sau đó nhấn OK để tạo báo cáo

![](https://images.viblo.asia/928e140a-8279-403b-895a-93ef7a675ec4.png)

Thực thi bộ thử nghiệm này như chúng tôi đã làm với trường hợp thử nghiệm của mình bằng cách nhấp vào Execution toolbar. Sau khi thực hiện, bạn sẽ nhận thấy rằng một thư mục báo cáo mới được tạo. Bấm vào mục báo cáo đầu tiên để xem nó.

![](https://images.viblo.asia/93c33219-2b8e-4c0f-bc10-3f1138366281.png)

Chi tiết của báo cáo thử nghiệm được hiển thị như bên dưới ( với “ Hiển thị chi tiết trường hợp thử nghiệm ” được chọn )

![](https://images.viblo.asia/25b1cb49-678e-4bab-9fae-5082cd97d1cd.png)



Nguồn tài liệu: https://toolsqa.com/katalon-studio/kickstart-the-automation-testing-using-katalon-studio/