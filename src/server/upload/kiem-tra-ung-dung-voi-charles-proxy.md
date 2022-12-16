Khi thử nghiệm ứng dụng trên thiết bị di động và web, phần lớn thử nghiệm chỉ yêu cầu quan sát và tương tác với giao diện người dùng (UI). 

Khi các cuộc gọi HTTP mà ứng dụng đang thực hiện cho các dịch vụ gửi dữ liệu đến và từ ứng dụng, toàn bộ chức năng ứng dụng trở nên trong suốt hơn. 

Điều này không chỉ cho phép chúng ta tìm hiểu thêm về cách hoạt động của ứng dụng, và mở ra cho chúng ta một loạt các khả năng thử nghiệm mới để khám phá.

Để hiểu thêm về cách ứng dụng tương tác với các dịch vụ web phụ trợ của nó thì chúng ta sẽ xem mã nguồn của ứng dụng. 
- Có thể xem những cuộc gọi nào đang được thực hiện khi người dùng thực hiện một hành động nhất định, tải trang hoặc một số sự kiện khác diễn ra.
- Có thể xem chi tiết về cách ứng dụng xử lý các tiêu đề hoặc tải trọng của các cuộc gọi này khi chúng diễn ra. 

Sẽ rất tuyệt vời nếu có một công cụ có thể được sử dụng mà sẽ cho phép chúng ta thực sự nhìn thấy và chỉnh sửa các cuộc gọi HTTP ứng dụng của bạn đang gửi và nhận? Đó là công cụ  Charles Proxy.
![](https://images.viblo.asia/605c405c-de28-4f8f-8134-7b6d91758022.png)

## Cách thiết lập Charles Proxy
Gồm các bước sau đây:
### BƯỚC 1
- Tải xuống và cài đặt phiên bản mới nhất của Charles tại đây https://www.charlesproxy.com/download/
- Sau khi cài đặt, cần thực hiện một số bước thiết lập để thiết lập và chạy. 

Sau đây, tôi sẽ trình bày chi tiết các bước thiết lập và sử dụng trên macOS và iOS, các hệ điều hành khác cũng tương tự.

### BƯỚC 2
Khởi chạy Charles từ thư mục Ứng dụng của bạn. Bạn sẽ thấy thông báo dưới đây xuất hiện nơi bạn có thể Grant Privileges và sau đó nhập mật khẩu người dùng hệ thống của bạn để xác nhận.


![](https://images.viblo.asia/a1ff1806-0398-4246-bed7-58b90afafab6.png)



### BƯỚC 3
Cần cài đặt root certificate Charles trên máy tính chạy Charles cũng như trên thiết bị di động. Điều này sẽ cho phép truy cập lưu lượng SSL đang được ủy quyền thông qua Charles.
- Tải xuống và nhập root certificate Charles vào Keychain trên macOS bằng cách chọn  **Help** > **SSL Proxying** > **Install Charles Root Certificate**. 
- Do chứng chỉ này không được tin cậy theo mặc định nên cần thực hiện một số thay đổi.

    - Nhấp đúp vào tên của chứng chỉ Charles để mở cửa sổ chi tiết chứng chỉ. Mở rộng phần **Trust** và chọn **Always Trust**  từ danh sách thả xuống Khi sử dụng chứng chỉ này. 

    - Đóng cửa sổ chi tiết chứng chỉ và nhập lại mật khẩu để xác nhận thay đổi. Chứng chỉ Charles sẽ được đánh dấu là đáng tin cậy.

![](https://images.viblo.asia/e20f3b8b-a360-47c7-98c7-6c98c6c956df.png)

### BƯỚC 4

Nếu bạn đang sử dụng thiết bị iOS. 
Để thiết lập thiết bị di động, trước hết cần biết địa chỉ IP cục bộ của máy tính đã cài charles.
- Ở Charles, chọn  **Help >  Local IP Address**  để hiển thị thông tin này. Địa chỉ IP cục bộ cũng có thể được tìm thấy trong **Apple > System Preferences… > Network** hoặc gõ ipconfig trong command.
![](https://images.viblo.asia/4d04a876-bcef-4586-afd4-d69b2eaa7900.png)



- Khi đã biết địa chỉ IP cục bộ của máy tính, cần kết nối thiết bị di động của mình với cùng một mạng và sau đó thiết lập các thiết lập proxy thích hợp trên thiết bị. 
- Khi cả hai thiết bị được kết nối với cùng một mạng, hãy nhấn vào nút thông tin của mạng được kết nối trong  **iOS Settings > Wi-Fi** để mở trang có thêm chi tiết về kết nối mạng. 

    - Trong **HTTP PROXY**, chọn **Configure Proxy > Manual** và nhập địa chỉ IP cục bộ mà bạn đã tìm thấy ở trên trong trường **Server** và 8888 vào trường **Port**. Nhấn **Save** để áp dụng các thay đổi của bạn.

![](https://images.viblo.asia/75763f52-aae3-467c-8279-832a0c23d771.png)


8888 là cổng mặc định cho Charles. Nếu điều này xảy ra xung đột, thì có thể thay đổi cài đặt này trong Charles trong **Proxy > Proxy Settings**.

- Tiếp theo, cần cài đặt chứng chỉ gốc Charles trên thiết bị di động. Để làm như vậy, hãy khởi chạy iOS Safari trên thiết bị di động và điều hướng đến  chls.pro/ssl . 
- Certificate Charles sẽ tải xuống thiết bị và đưa bạn đến trang **Profiles & Devices Management** để cài đặt certificate. Nhấn vào  **Install** ở góc trên bên phải và làm theo lời nhắc để cài đặt chứng chỉ trên thiết bị. Sau khi hoàn tất, nhấn **DONE** để được đưa trở lại iOS Safari.

- Đối với iOS 10 trở lên, bạn cũng sẽ cần bật Cài đặt tin cậy chứng chỉ cho chứng chỉ gốc Charles trên thiết bị. Điều này có thể được thực hiện bằng cách điều hướng đến **iOS Settings > General > About > Certificate Trust Settings** và chuyển đổi bộ chọn cho chứng chỉ gốc của Proxy Charles được bật.

Tại một số thời điểm trong quá trình cài đặt chứng chỉ gốc Charles trên thiết bị di động, sẽ thấy thông báo sau trong Charles:
![](https://images.viblo.asia/50db7ade-b2fb-4b62-8cdd-a9c7e8845545.png)


Thông báo cho phép thiết bị sử dụng Charles trên máy tính làm proxy. Nhấp vào **Allow** 

- Nếu bạn đang sử dụng Trình mô phỏng iOS

    - Charles có quy trình cài đặt rất đơn giản của chứng chỉ gốc cho Trình mô phỏng iOS. Để cài đặt, chỉ cần điều hướng đến **iOS Settings > General > About > Certificate Trust Settings** trong Trình mô phỏng iOS . Nhấp vào **OK** 

    - Trong trường hợp bạn bỏ lỡ nó: Thông báo xác nhận cho biết rằng nếu lưu lượng giả lập không xuất hiện ở Charles, hãy thử chạy Charles trước khi bạn chạy Trình mô phỏng.

Tiếp theo, hãy bật SSL Proxying để có thể xem tất cả chi tiết về lưu lượng HTTPS.

### BƯỚC 5
Để bật SSL Proxying, điều hướng đến **Proxy > SSL Proxying Settings** và đảm bảo rằng **Enable SSL Proxying** được chọn. 
- Nên đọc mô tả của hộp thoại cũng như nhấp vào dấu hỏi trợ giúp "**?**" ở góc dưới cùng bên trái để biết thêm thông tin.

- Chọn bật  SSL Proxying cho tất cả các vị trí bằng cách nhấp vào **Add** , nhập ký tự đại diện đơn ( * ) vào trường **Host**, trường **Port** để trống, sau đó nhấp vào **OK** . Khi hoàn tất, Cài đặt proxy SSL của chúng tôi sẽ như sau:

![](https://images.viblo.asia/2cae1e55-901b-4bb6-97d8-4a07f5544299.png)

### BƯỚC 6
Hãy nhanh chóng thiết lập thêm một vài điều khiển ở Charles. Từ menubar, chọn **View > Sequence**. Cho phép chúng ta xem các cuộc gọi tuần tự khi chúng được thực hiện. 
- Tiếp theo, chọn **Charles > Preferences…** , chọn tab  **Viewers**, bỏ chọn **Combine request and response**  và đặt **Time** thành mili giây.

Nhấp **OK** để trở về cửa sổ chính của Charles và bắt đầu kiểm tra.

## Quan sát các yêu cầu và phản hồi HTTP

- Chức năng cơ bản của Charles Proxy tập trung vào các yêu cầu và phản hồi HTTP giữa ứng dụng hoặc trang web và các dịch vụ cung cấp thông tin. 
- Nói một cách dễ hiểu hơn là chúng ta có thể chỉnh sửa để web browser hoặc device bên ngoài truy cập vào internet thông qua máy tính của bạn. Charles có thể theo dõi và hiển thị dữ liệu gửi đi và nhận về các request.
- Sau khi allow ở step 4, thiết bị sẽ truy cập vào internet thông qua proxy máy tính của bạn. Khi gửi request mạng trên device, thì Charles sẽ có đầy đủ thông tin kết nối.

![](https://images.viblo.asia/4a3f0468-5d08-4ca1-b720-f5af780789ba.png)
## Breakpoints chỉnh sửa http request và responses
Khi ủy quyền thông qua Charles các yêu cầu sẽ được kích hoạt bởi một số sự kiện hoặc hành động khởi tạo trong ứng dụng dành cho thiết bị di động, được gửi qua Charles làm proxy. Sau đó nó được xử lý bởi các dịch vụ, nơi một phản ứng được tạo ra. Phản hồi đó cuối cùng cũng được gửi lại cho ứng dụng đi qua Charles trên đường đi.
![](https://images.viblo.asia/a50daadc-bde2-4b34-ace0-5e7ed59d57f1.png)
- Charles có khả năng thiết lập các điểm ngắt (breakpoints) cho các cuộc gọi.
        - Thiết lập một breakpoint trên request (tức là sau khi một request được gửi từ app nhưng trước khi yêu cầu được nhận bởi backend)
        - Thiết lập một breakpoint trên response (tức là sau khi response đã được backend gửi nhưng trước response được ứng dụng nhận)

- Tạo điểm ngắt (breakpoints) bằng cách điều hướng đến **Proxy** > **Breakpoint Settings**…, chọn **Enable Breakpoints**, nhấp vào  **Add**, sau đó nhập thông tin về cuộc gọi muốn đặt điểm ngắt.
![](https://images.viblo.asia/09fd4d71-03df-4526-89d7-9930c23817e2.png)

- Khi cuộc gọi được thực hiện và điểm ngắt được gọi, sẽ hiển thị chế độ xem Breakpoints trong Charles ngay lập tức. Từ đây, chọn **Edit Response** tab, chọn **JSON** từ thanh tab thấp hơn, tại đây bạn có thể chỉnh sửa format json trả về trước khi bấm **Execute**.
    - Ví dụ: check case thông tin call API sau khi xem video/ quảng cáo xong,  xem nó gọi API nào trước trong trường hợp: đang xem video -> Tắt mạng -> Tiếp tục xem video cho đến khi xong -> Bật mạng.

## Điều chỉnh mạng (Network Throttling)
- Ngoài việc quan sát và sửa đổi các yếu tố khác nhau trong các yêu cầu và phản hồi, Charles cũng vô cùng hữu ích cho việc mô phỏng các loại kết nối mạng khác nhau, còn được gọi là điều chỉnh mạng.

- Đây có thể là một công cụ cực kỳ có giá trị cho người thử nghiệm vì điều này sẽ cho phép mô phỏng điều kiện mạng mà nhiều người dùng ứng dụng có thể trải nghiệm trong thế giới thực.
- Nếu ứng dụng đang hoạt động như mong muốn khi ứng dụng được thử nghiệm trong văn phòng với kết nối Wi-Fi nhanh, nhưng nếu trên mạng chậm hoặc không đáng tin cậy thì app sẽ hoạt động như thế nào?

- Điều chỉnh mạng ở Charles rất đơn giản. Điều hướng đến **Tools** > **Throttle Settings** và chọn **Enable Throttling**. 
![](https://images.viblo.asia/587f8bbc-0db8-48a7-ba1f-782cd02cfcd7.png)
- Lưu ý: có tùy chọn để bật điều chỉnh cho các vị trí được chọn, nhưng tôi sẽ điều chỉnh trên toàn cầu cho tất cả lưu lượng mạng. Chọn một giá trị đặt trước từ drop-down **Throttle preset** và bấm **OK** .
- Nếu không quen với các thuật ngữ được sử dụng trong Throttle Settings, bạn nên tìm hiểu về ý nghĩa của chúng và thử nghiệm theo những cách khác nhau. Như vậy, dựa trên cài đặt mạng sẽ phục vụ tốt nhất cho quá trình thử nghiệm của bạn.

## Kết luận
Trên đây là hướng dẫn cơ bản về sử dụng charles, có thể thấy các công cụ trong Charles Proxy rất mạnh mẽ khi được áp dụng trong ngữ cảnh phù hợp và hi vọng các bạn sẽ tiếp tục khám phá Charles để có thể tận dụng chúng trong thử nghiệm của riêng bạn.







### Tham khảo
http://www.testeffective.com/better-mobile-app-testing-with-charles-proxy/
https://www.lunametrics.com/blog/2016/11/17/using-charles-proxy-inspect-debug-google-analytics/
https://www.digitaldatatactics.com/index.php/2016/03/11/using-charles-proxy-for-analytics/