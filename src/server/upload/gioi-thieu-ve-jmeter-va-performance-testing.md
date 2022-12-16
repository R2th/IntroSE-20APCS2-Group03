![](https://images.viblo.asia/37bf57b9-5e13-4998-93d4-8b993e3b7e93.png)

Ngày nay, trong thời đại nay, nơi các trang web và người dùng của họ đang gia tăng mạnh mẽ, trải nghiệm người dùng liền mạch là điều bắt buộc phải có đối với các công ty vì sự chậm trễ không cần thiết trong phản hồi của trang web hoặc ứng dụng khiến người dùng mất kiên nhẫn. Đây là lý do số một tại sao performance test trở nên rất quan trọng. Nghiên cứu cho thấy rằng thời gian tải trang chỉ chậm trễ 1 giây sẽ dẫn đến ít tương tác hơn 7%, lượt xem trang ít hơn 11% và mức độ hài lòng của khách hàng giảm 16%. Và điều này được chuyển thành tiền - nếu trang web của bạn kiếm được 100.000 đô la mỗi ngày, thì bạn sẽ mất 2,5 triệu đô la mỗi năm do 1 giây này. Do đó, các công ty thích thực hiện các bài performance test và load test trên ứng dụng trước khi khởi chạy chúng hoặc sau mỗi bản release.

Trong bài này, chúng ta sẽ tìm hiểu về:

- Performance test là gì?
- Tầm quan trọng của performance test
- JMeter là gì và lịch sử của nó
- Đặc điểm của JMeter
- JMeter hoạt động như thế nào

## 1. Performance test là gì?

Performance test là một loại non-funtional testing được sử dụng để đánh giá hiệu suất của ứng dụng đang được kiểm tra về khả năng đáp ứng của nó .

Một ứng dụng hoạt động hiệu quả nếu nó cho phép người dùng cuối thực hiện một task mà không bị chậm trễ hoặc khó chịu quá mức. Một ứng dụng hoạt động tốt luôn có thời gian phản hồi tốt. Vì vậy, khả năng phản hồi của một ứng dụng đóng một vai trò rất quan trọng giống như giao diện người dùng và chức năng của nó bởi vì người dùng ngày nay rất khắt khe và muốn mọi thứ nhanh chóng.

Trang web chậm dẫn đến trải nghiệm người dùng không tốt và có tác động tiêu cực đến doanh thu của công ty. Ngay cả sự chậm trễ thứ hai, trong thời gian dài hơn, có thể dẫn đến thất thu rất lớn. Để thục hiện performance test, chúng ta có sẵn các công cụ như: JMeter, LoadRunner, WebLoad, LoadView,...

## 2. Tầm quan trọng của performance test

- Giúp đánh giá các tắc nghẽn tiềm ẩn của hệ thống.
- Độ chậm của một ứng dụng hoặc webservice khi lượng lớn truy cân có thể được đánh giá.
- Có thể xử lý bao nhiêu người dùng cùng lúc.
- Giúp tìm ra tác động của những thay đổi trong mỗi bản release về mặt hiệu suất.

**Lưu ý: Hệ thống ứng dụng hoặc phần mềm khi được kiểm tra được gọi là Application Under Test.**

## 3. JMeter là gì và lịch sử tóm tắt của nó

Apache JMeter là một phần mềm nền tảng Java thuần túy mã nguồn mở được thiết kế để load test functional và đo lường hiệu suất.

Ban đầu, JMeter được giới thiệu cho các ứng dụng web kiểm tra tải và hiệu suất, nhưng sau đó, phạm vi của nó đã được mở rộng và có thể thực hiện kiểm tra tải và hiệu suất trên Trang web, Ứng dụng web và các tài nguyên tĩnh hoặc động như Cơ sở dữ liệu, Rest Webservices, LDAP, Java Objects,...

Stefano Mazzocchi của Apache Software Foundation là nhà phát triển ban đầu của JMeter. Anh ấy viết nó chủ yếu để performance test cho Apache JServ (hiện được gọi là dự án Apache Tomcat được sử dụng phổ biến làm máy chủ). Sau đó, cộng đồng Apache đã thiết kế lại nó để nâng cao GUI, thêm nhiều tính năng và khả năng kiểm tra chức năng.

## 4.  Đặc điểm của JMeter

Các tính năng chính (Key) của JMeter bao gồm:

- License: Vì JMeter là mã nguồn mở nên nó miễn phí và dễ sử dụng.
- Graphical User Interface: Đơn giản, thân thiện với người dùng và dễ học so với các công cụ performance test khác
- Server/ Protocol Support: JMeter có khả năng load và performance test các ứng dụng/máy chủ/giao thức khác nhau. Một số giao thức bao gồm HTTP, HTTPS, FTP, SOAP/REST, Cơ sở dữ liệu qua JDBS, LDAP, JMS, SMTP (S), POP (3) và IMAP (S), Native Commands/Shell Scripts và TCP.
- Platform: JMeter là phần mềm java thuần túy. Do đó, nó độc lập với nền tảng và hỗ trợ mọi môi trường.
- Simulation: Mô phỏng nhiều người dùng bằng cách sử dụng người dùng ảo hoặc người dùng duy nhất để tạo ra lưu lượng truy cập lớn trên máy chủ web hoặc dịch vụ.
- Supports Distributed Testing:: Nó có master slave để kiểm tra phân tán, trong đó master sẽ phân phối các bài test giữa tất cả các slave và các slave sẽ thực thi các tập lệnh gọi máy chủ của bạn.
- Test Result Visualisation: Kết quả test có thể xem ở các định dạng khác nhau như Đồ thị, Bảng, Cây và Báo cáo,...
- Reporting: Theo mặc định, JMeter chỉ cung cấp các Định dạng Báo cáo XML và CVS. Chúng ta có thể sử dụng Jmeter và ANT cùng nhau để lấy báo cáo HTML theo yêu cầu.
- Testing Types: Ngoài performance test, Load test, Stress test, Jmeter còn hoạt động tốt cho functional test, regression và Soak/Endurance test.
- Record and Playback Ghi lại kịch bản/hành động của người dùng trong Trình duyệt Firefox và phát các tập lệnh
- Framework: Framework đa luồng cho phép lấy mẫu đồng thời và mô phỏng các chức năng khác nhau bởi nhiều nhóm hoặc luồng riêng biệt.
- Installation: Không cần cài đặt phức tạp - Chỉ cần chạy JMeter.bat trên windows/chạy Jmeter.sh trên Linux
- Knowledge: Jmeter không yêu cầu kiến ​​thức lập trình sâu rộng. Nếu có kiến thức về java thì sẽ tốt hơn
 
## 5. Cách hoạt động của JMeter

JMeter mô phỏng một số người dùng gửi yêu cầu đến Ứng dụng đang được kiểm tra. Ngay sau khi JMeter mô phỏng các request, máy chủ sẽ phản hồi và Jmeter bắt đầu thu thập dữ liệu. Jmeter lưu tất cả các phản hồi và dựa trên phản hồi của máy chủ, nó trả về thống kê. Các số liệu thống kê này cho thấy hiệu suất của AUT ở dạng nhiều định dạng khác nhau theo yêu cầu.

Do đó, với sự trợ giúp của JMeter, chúng tôi có thể mô phỏng load trên máy chủ, mạng hoặc các đối tượng đến từ các máy khác nhau để thực hiện kịch bản thế giới thực.

## 6. Quy trình làm việc của JMeter

![](https://images.viblo.asia/861057b6-6417-4779-a191-8771a0b716e5.png)

Khi chúng tôi bắt đầu load hoặc thực hiện test một ứng dụng, JMeter sẽ tạo các yêu cầu đến máy chủ mục tiêu và mô phỏng số lượng người dùng gửi yêu cầu đến máy chủ mục tiêu. Ngay sau khi máy chủ bắt đầu phản hồi các yêu cầu, JMeter bắt đầu lưu tất cả các phản hồi. Trên cơ sở dữ liệu/phản hồi JMeter thu thập dữ liệu để tính toán thông tin thống kê. Cuối cùng, sử dụng thông tin thống kê này JMeter chuẩn bị một báo cáo cho biết về hiệu suất của AUT.

## 7. Cài đặt JMeter

### Chuẩn bị

- Yêu cầu cài Java 8+

[Install Java on Mac](https://toolsqa.com/jmeter/how-to-install-java-on-mac-os/)
[Install Java on Windows](https://toolsqa.com/selenium-webdriver/download-and-install-java/)

### Cài đặt

Ở phần này chúng ta sẽ cài bảng JMeter 5.3 (mới nhất hiện tại)

1. Đi đến trang chủ của JMeter và chon mục [Download](https://jmeter.apache.org/download_jmeter.cgi)

![](https://images.viblo.asia/03f6bae3-56f8-4437-a116-d4a6b9e7b101.png)

2. Chọn **apache-jmeter-5.3.zip**, giống nhau trên Mac hoặc Windows

![](https://images.viblo.asia/8dc74317-b59d-4e53-abf9-f0ef7842138e.png)

3. Trình duyệt sẽ bắt đầu tải về

![](https://images.viblo.asia/e23091fd-90dc-42c7-a411-920ec210e586.png)

4. Sau khi tải xong nó sẽ ở trong folder Download

![](https://images.viblo.asia/357edc75-bb8a-4e14-b799-a596c550ba29.png)

5. Tiến hàng Unzip sau khi tải bạn được folder mới, tại đây có folder **bin** bạn cần phải chú ý

![](https://images.viblo.asia/2b7e1e8e-c5a6-44ce-8f3d-e04bf97958ae.png)

- Folder bin chứa các file thực thi của JMeter như jmeter.sh, jmeter.bat

![](https://images.viblo.asia/0f8e73fa-1da8-4b81-8e3d-a4dc73b038a3.png)

6. Bạn cần vào terminal và lấy đường dẫn đến file jmeter.sh rồi chạy như sau

![](https://images.viblo.asia/5a07c990-fbca-4220-b7e3-efd5855c9bc9.png)

7. Nhấn Enter để chạy lệnh, sau khi xong giao diện của JMeter sẽ hiện lên

![](https://images.viblo.asia/926a7dbe-3de7-4ab7-8b63-e53a2229bc93.png)



## Tham khảo

- [Introduction to JMeter](https://www.toolsqa.com/jmeter/introduction-to-jmeter/)
- [How to Install JMeter?](https://www.toolsqa.com/jmeter/how-to-install-jmeter/)