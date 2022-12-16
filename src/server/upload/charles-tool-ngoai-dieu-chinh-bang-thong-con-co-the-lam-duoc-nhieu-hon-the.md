## I. Giới thiệu
![](https://images.viblo.asia/7adfb0b2-54e1-42ab-b8c9-3af3cd46e9c8.jpeg)
* Charles là một HTTP Proxy/HTTP Monitor/Reverse Proxy cho phép lập trình viên theo dõi tất cả HTTP traffic giữa browser/mobile app tới Internet, bao gồm các requests, responses và HTTP Headers (chứa cả cookies và các thông tin caching), đặc biệt là khả năng theo dõi các kết nối HTTPS đã được mã hóa.

* Charles còn hỗ trợ giả lập tốc độ mạng bằng cách delay các requests gửi đi, cho phép trải nghiệm ứng dụng của mình với điều kiện tốc độ mạng không được tốt.

* Ngoài ra, Charles còn có rất nhiều tính năng khác như: AJAX debugging, AMF, Repeat Request, Edit Request, Breakpoints, Validate records, …

* Với những tính năng như trên, Charles là công cụ cực kì đắc lực trong việc phát triển, lập trình web và các ứng dụng di động, hoặc có thể là nghiên cứu, dịch ngược cách thức hoạt động của một ứng dụng 

* Đối với 1 QA khi cần test API rằng liệu dữ liệu truyền đi/trả về có đúng như mong đợi hay không khi việc đặt debug log khá tốn thời gian và đôi khi không chính xác trong điều kiện thực tế?Thì hay nghĩ tới PostMan nhưng muốn sử dụng PostMan QA cần phải biết các param header và footer do dev cung cấp.  Charles Proxy sẽ giúp bạn giải quyết tất cả các vấn đề trên mà không cần phải tốn 1 đống thời gian chờ đợi developer.

## II. Cài đặt Charles Proxy

1. Tải bản cài đặt mới nhất tại https://www.charlesproxy.com/documentation/installation/ và làm theo hướng dẫn 

2. Giao diện Charles (Tất cả các bản free đều có trial 30 ngày):
![](https://images.viblo.asia/2f79ff3d-4961-4e9e-9af7-bf03c17b8026.png)

3. Thiết lập Charles:  tạo Proxy Server như hình: 
![](https://images.viblo.asia/d2a4f247-1af9-4b78-851f-c70e1ddf2cb5.png)
Lưu ý: Khi test trên FireFox, Safari(Mac) thì phải setting Manual Proxy
Dưới đây là mình setting Manual Proxy trên FireFox
![](https://images.viblo.asia/e9c3e98c-f300-4120-9cc6-2aeff2a26402.png)

4. Thiết lập Throttle Settings như hình:
![](https://images.viblo.asia/178ba5b5-5a0b-4243-9764-b2a853064b13.png)

5. Input băng thông mà bạn mong muốn -> Click button OK.
![](https://images.viblo.asia/b35a2b2e-5551-4ba3-93e3-2b09b30e30f2.png)
 
6. Click button Start Throlling để bắt đầu việc điều chỉnh băng thông theo mong muốn
![](https://images.viblo.asia/8eb905c9-0fce-4d79-a387-15a2b3090b9d.png)

Bây giờ bạn có thể thực hiện test với băng thông mà bạn mong muốn.

## III. Thiết lập SSL Proxy Server (nâng cao)
* Một tính năng rất hay của Charles là có thể theo dõi được các kết nối HTTPS đã được mã hóa. Để có thể sử dụng được tính năng này, Charles sẽ tự động sinh ra một root certificate, mobile client sẽ cài đặt và trust certificate này, khi đó Charles sẽ có quyền intercept các kết nối HTTPS đã được mã hóa từ mobile client, kỹ thuật này có thể hiểu là Man in the Middle.

* Từ menu SSL Proxying Settings ta có thể chọn danh sách các domain mà Charles sẽ intercept các HTTPS request, mặc định thì Charles sẽ bỏ qua, các bạn có thể chỉ định tên domain muốn xem, có thể áp dụng wildcard * tương ứng với bất kì kí tự nào.

![](https://images.viblo.asia/53f1fb90-7880-49b0-88be-07b35ec5a252.png)

* Ngoài ra, tool Charles có thể giúp QA bắt được hoạt động của các event
![](https://images.viblo.asia/40e8484a-a5b2-44ba-8f7b-779fcd878f6e.png)
## IV. Cài đặt SSL Certificate
* Để Charles có thể theo dõi được các kết nối HTTPS, client cần phải cài đặt và trust CA Certificate từ Charles.

* Đối với iOS, mở trình duyệt Safari (hoặc Android Browser, Chrome đối với Android (lưu ý không dùng Firefox)
1. Truy cập vào địa chỉ https://charlesproxy.com/getssl 
2. Hệ thống sẽ hỏi bạn có muốn cài đặt CA Certificate vào máy không
3. Chọn Yes.
![](https://images.viblo.asia/1d893298-0b1b-40f5-8705-af7ebddd0ab9.jpg)

Đối với iOS 10.3 trở lên, bạn cần vào Settings > General > About > Certificate Trust Settings và enable certificate vừa cài đặt thì mới có hiệu lực.

## V. Sử dụng Charles để theo dõi
1. Mở một ứng dụng bất kỳ trên điện thoại
2. Các request/response sẽ được hiển thị trên Charles.
Lưu ý:  Domain trong hình đã trust certificate để Charles có thể theo dõi được các API đến server này, đối với những server khác nếu không thêm vào settings, mặc định Charles sẽ bỏ qua.
![](https://images.viblo.asia/69a38f6c-1648-4235-a85f-9d7edd2c8203.png)
![](https://images.viblo.asia/944d44ac-694e-4546-b201-3e0803c07034.png)
## VI. Lưu ý
* Ở trên có đề cập không nên dùng trình duyệt Firefox ở bước cài đặt Certificate, bởi vì Firefox có cơ chế quản lý certificate riêng, nếu bạn cài bằng Firefox thì certificate chỉ có hiệu lực bên trong Firefox, hệ thống sẽ không ghi nhận được ảnh hưởng.
* Không phải trường hợp nào cũng có thể áp dụng SSL Certificate để theo dõi request được, tiêu biểu như Facebook. Lý do là tùy app được thiết kế mà sẽ có cơ chế so sánh fingerprint riêng biệt lúc tạo kết nối HTTPS, nhất là các app sử dụng self-signed certificate, lúc này dù certificate của Charles tạo ra có hợp lệ đi nữa vẫn không được chấp nhận vì khác fingerprint certificate gốc của server.
Khi không sử dụng nữa, các bạn nên tắt Proxy trên điện thoại, nếu không sẽ bị gặp vấn đề với kết nối mạng do Proxy gây ra.
Charles thực sự rất mạnh và hữu dụng cho việc phát triển, debug phần mềm, hoặc hơn nữa là nghiên cứu về bảo mật của ứng dụng. 
Hy vọng sau khi đọc bài này bạn sẽ có thêm một công cụ đắc lực cho QA..

## VII. Reference:
https://www.charlesproxy.com

https://viblo.asia/p/tim-hieu-charles-va-fiddler-web-debugging-maGK7E4blj2