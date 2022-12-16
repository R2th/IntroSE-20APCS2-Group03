Công nghệ Web đang phát triển từng ngày, từng giờ với hàng tá các framework, library. Đôi khi việc quá tập trung vào các công nghệ, framework mới khiến chúng ta bỏ qua những kiến thức cơ bản, nền tảng nhất. Theo mình, các kiến thức cốt lõi, bản chất mới chính là công cụ đưa chúng ta đến thành công. Trong bài này mình sẽ giải thích về một số khái niệm quan trọng của công nghệ web mà mình nghĩ các bạn cần hiểu nếu muốn làm về web.

## 1 ứng dụng web hoạt động như thế nào?
### Mô hình Client – Server
Đây là kiến thức đầu tiên bạn cần nắm vững để có thể hiểu về Web. Tưởng tượng bạn đi uống coffee tại The coffee house, khi đó bạn là client và tiệm coffee là server. Bạn gọi tổng đài Vinaphone, Viettel…, bạn là client và tổng đài là server.
Như vậy, client – server đơn giản là 1 mô hình được đưa vào từ đời sống, 1 chủ phục vụ nhiều khách. 
Từ đó dẫn đến khái niệm Web Server, được hiểu đơn giản như 1 cửa hàng phục vụ website, mỗi cửa hàng (1 website) sẽ có địa chỉ nhất định (facebook có địa chỉ là facebook.com, google có địa chỉ google.com…), các khách hàng chỉ cần biết địa chỉ cửa hàng này là có thể sử dụng các dịch vụ mà cửa hàng cung cấp.
![](https://images.viblo.asia/cfea81e9-6ae4-41cd-89ee-b079beaea5d2.png)

### Cách 1 ứng dụng web hoạt động
![](https://images.viblo.asia/03204782-82a1-4600-9209-571849e30108.png)

Web server và web application là 2 khái niệm thường gây nhầm lẫn, chúng ta hay dùng từ web server để chỉ 1 web application. Thực tế web server là 1 network application, có thể chứa nhiều web application, lấy ví dụ The coffee house ở trên thì web server giống như các trung tâm thương mại, bạn có thể tìm thấy nhiều tiệm coffee ở trong đó. Để có thể tìm đến đúng tiệm coffee yêu thích (web application), bạn cần biết địa chỉ của trung tâm thương mại (web server), trong thế giới mạng, địa chỉ sẽ được định nghĩa bởi các IP, sau khi có được địa chỉ của trung tâm thương mại, bạn cần biết tiệm coffee bạn muốn tìm nằm ở tầng số mấy, ô thứ bao nhiêu, điều này dẫn đến khái niệm Port. Như vậy, 1 web application được định danh với 2 thông tin: IP và Port. IP thường là 1 dãy số khó nhớ, do đó khái niệm domain ra đời, domain đơn giản là 1 tên thay thế của IP, mỗi domain sẽ ứng với 1 IP. Khi bạn truy cập vào blog của mình, thedarkknighttech.com chính là domain website của mình.

Sau 1 đống chữ mình hy vọng bạn hiểu thế nào là 1 web server và 1 web application. Khi bạn đã tìm được tiệm coffee yêu thích thì 1 khái niệm quan trọng nữa được sinh ra. Để có thể order coffee, bạn và các nhân viên cần hiểu nhau (sử dụng chung ngôn ngữ, kí hiệu…), trong thế giới mạng, các máy tính dùng protocol để hiểu nhau. Protocol đơn giản là 1 tập hợp các quy định giao tiếp mà cả bạn (trình duyệt của bạn) và nhân viên tiệm coffee (web application) đều có thể hiểu được. Với công nghệ Web, chúng ta thường sử dụng HTTP protocol, FTP protocol, Web socket…
![](https://images.viblo.asia/03204782-82a1-4600-9209-571849e30108.png)

Bây giờ bạn và các nhân viên đã có thể hiểu nhau thông qua protocol, bạn order chocolate đá xay, hành động bạn order tương tự như việc trình duyệt của bạn gửi request cho 1 ứng dụng web, sau khi bạn order, nhân viên sẽ phải làm 1 số việc như: rửa lý, pha chế, cất tiền vào tủ…, tương tự như 1 ứng dụng web sẽ: truy cập database, đổ dữ liệu vào các file html… Cuối cùng, bạn có 1 ly chocolate đá xay và trình duyệt của bạn có các file html/css/javascipt (các file này dùng để hiển thị giao diện website trên trình duyệt quả bạn) thông qua response.![](https://images.viblo.asia/a61aba16-1e50-4233-ba4f-2b2886855a60.png)

Một lưu ý cuối cùng trong bức hình trên, bạn không nhất thiết phải request 1 ứng dụng web từ trình duyệt, trình duyệt chỉ đơn giản là 1 ứng dụng có thể đọc được các file html/css/javascript. Bạn có thể request đến 1 ứng dụng web từ bất cứ thiết bị nào (mobile, desktop app..) miễn là request của bạn và web application hiểu nhau (sử dụng chung 1 protocol).

## HTTP protocol
Như mình đã trình bày ở trên, HTTP là 1 trong những protocol chính để giao tiếp trong môi trường web. Đầu tiên, HTTP là viết tắt của Hypertext Transfer Protocol (giao thức truyền tải siêu văn bản). Với HTTP, bạn có thể truyền tải bất cứ định dạng dữ liệu nào, như: images, documents…
![](https://images.viblo.asia/bd3d5e1a-4d59-4b66-91b1-a5eb1205a388.png)

Ở hình trên, khi mình truy cập vào thedarkknighttech.com, trình duyệt sẽ gửi 1 request sử dụng HTTP procotol. Ở phía server, web application của mình sẽ hiểu được giao thức này và response lại các file html/css/javascript tương ứng để trình duyệt hiển thị lên.

Một số tính chất quan trọng của HTTP mà bạn cần nắm, các tính chất này sẽ ảnh hưởng trực tiếp đến các khái niệm quan trọng khác về web. Tính chất quan trọng nhất, HTTP là 1 stateless protocol, tiếp tục ví dụ coffee ở trên, sau khi bạn nhận được chocolate đá xay, bạn rời khỏi The coffee house, các nhân viên ở đây sẽ không còn nhớ bất cứ thông tin gì về bạn, lần sau bạn đến mua coffee, bạn được tiếp đãi như 1 khách hàng mới. Tương như như vậy, khi bạn request đến 1 web application, nhận được response và ngắt kết nối, server sẽ không lưu bất cứ thông tin gì về bạn, lần sau bạn truy cập vào web application đó bạn sẽ được xem như 1 user mới. Tính chất này sẽ dẫn đến 2 khái niệm quan trọng khác của web là Session và Cookie.
![](https://images.viblo.asia/739ea498-f22b-43d5-a5bf-c586d122ce44.png)

## Tạm kết
Vẫn còn một số khái niệm cơ bản khác mà bạn cần hiểu để có thể tiến một bước dài trên con đường trở thành 1 web developer, tuy nhiên bài viết đã khá dài nên mình dừng lại ở đây, nếu được sự ủng hộ của các bạn mình sẽ viết tiếp 1 bài để nói về cookie, session… và các khái niệm quan trọng khác. Qua bài này mình hy vọng giúp các bạn hiểu rõ hơn về cách hoạt động của web một cách nền tảng nhất, hy vọng nhận được sự ủng hộ của các bạn.

**Đọc thêm nhiều bài viết tại:** https://thedarkknighttech.com