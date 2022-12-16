Với tất cả các trang web đã bao giờ bạn nghĩ hoặc tưởng tượng luồng kiến trúc của hệ thống được thiết kế và chạy như thế nào chưa, đằng sau chúng nó sẽ hoạt động ra sao để trả về cho chúng ta 1 trang web theo yêu cầu chỉ trong vài giây (tick tắc).<br>
Và hôm nay mình sẽ chia sẻ cho mọi người nắm được tổng quan của 1 hệ thống và luồng xây dựng một kiến trúc hệ thống.
# I.Tổng quan về kiến trúc hệ thống
-Một hệ thống bất kì nào đó đều sẽ có 1 kiến trúc vật lý riêng và chúng đều được chia làm 2 phần chính là CLIENT và SERVER<br>
-CLIENT tức là trình duyệt web.<br>
-SERVER (máy chủ) có thể hiểu như là 1 cái máy tính của bạn chứa RAM, CPU, ổ cứng... và các phần mềm phục vụ cho việc phát triển web.<br>
-Máy bình thường cũng có thể trở thành 1 máy chủ nếu nó được cài phần mềm Server Software và kết nối vs internet.

![](https://images.viblo.asia/7f8eea90-6141-428b-9bfe-ae6b3c46bab1.png)
# II.Luồng xây dựng kiến trúc hệ thống từ nhỏ tới lớn
Khi bạn gõ **tintuc.vn** thì chuyện gì sẽ xảy ra sau đó?

![](https://images.viblo.asia/58ec3b4a-3caf-40ee-a589-173b395a1c6e.png)


**DNS (Domain Name System)** sẽ dịch domain **tintuc.vn**  -> địa chỉ IP(85.100.100.120) và trình duyệt sẽ tìm đến cái server có địa chỉ IP đó và trả về trang web cho chúng ta.

Vậy chúng ta thử đi tìm hiểu từ hệ thống nhỏ tới lớn để có thể hiểu được tổng quát của các hệ thống và từ đó có thể hiểu,ứng dụng nó vào dự án sao cho phù hợp với quy mô phát triển.
<br>
## 1.Hệ thống nhỏ
Ví dụ: Tin tức, ứng dụng đồ án,các dự án chỉ truyền tải nội dung....

![](https://images.viblo.asia/a0b3ccbe-a123-42d4-bf68-7141c11e523f.png)

Các bạn nhìn hình trên có thể thấy: <br>
-Với hệ thống nhỏ thì tất cả sẽ làm trong 1 máy chủ  (webserver, database server) tức là server chúng ta sẽ chứa và đảm nhiệm cũng như xử lý hết các công việc từ trình duyệt yêu cầu.
## 2.Hệ thống trung bình
Ví dụ: dự án công ty, web bán hàng,.....

![](https://images.viblo.asia/37a16ad6-54f9-48d5-a391-40f1d783ba92.png)

Các bạn có thể thấy với kiến trúc trên phần phía server sẽ được tách ra làm 2 không như trước nữa: 
+ WebServer: Đảm nhiệm xử lý yêu cầu bên server tức là nó sẽ sử dụng một ngôn ngữ (PHP, Java,...) tương thích với nó thường sẽ có 1 framework (Laravel,...) để xử lý nghiệp vụ và logic.
+ Database Server: Dùng để chứa dữ liệu 
<br>
**Note**: Thời mình đi học cũng chỉ làm quen với hệ thống nhỏ hoặc khi đi làm mình thường làm trên local cũng chỉ biết là tất cả trong một. Sau khi được tiếp xúc với môi trường thật thì thấy kiến trúc dự án cũng được chia làm 2 phần như thế này? 
Câu hỏi đặt ra với mình.? Tại sao lại phải chia chúng ra như vậy.! <br>

Và mình cũng đi tìm câu trả lời đó là: 
+ Toàn vẹn dữ liệu 
+ Giảm tải công việc cho máy chủ

Các bạn có thể hiểu đơn giản như là database rất quan trọng khi nó ở chung một nhà với webserver thì hacker chả may xâm nhập được vào máy chủ hoặc máy chủ dính virut dẫn đến dữ liệu database cũng mất. Điều đó sẽ đánh mất dữ liệu khách hàng. (nghĩ mà toang mất thôi).
Và con người ta cũng vậy cái gì riêng rẽ được thì riêng dù biết nhiều người có khả năng thực hiện nhiều công việc nhưng để chuẩn chu thì mỗi người nên đảm nhiệm 1 công việc chính độc lập sẽ giúp cho công việc chung được hoàn hảo hơn và giảm tải lượng công việc thay vì 1 người ôm hết. (Đấy là lý do tại sao người ta lại tách ra như vậy).
## 3.Hệ thống lớn
Ví dụ: Facebook, tiki, các dự án có số người truy cập lớn.<br>
-Vậy kiến trúc trên liệu có đáp ứng được k?  Tất nhiên là không rồi.<br>
-Đơn giản các bạn có thể hiểu:
Cấu hình server của các hệ thống trên chỉ đáp ứng được cho số người dùng nhất định (vd 1000-10000 người).?<br>
Dẫn đến số người lớn hơn -> TOANG ☺!

-Vậy giải quyết sao?<br>
Tăng Ram, tăng ổ cứng, thay CPU… (**vertical scaling**)<br>
**Chú ý:**
Máy tính có giới hạn -> tăng cũng đến mức max-> không ổn?<br>
Chính vì vậy LoadBalancer sinh ra để giải quyết vấn đề trên.<br>
Các bạn có thể hiểu đơn giản như sau: <br>
**LoadBalancer** (cân bằng tải) : Thay vì 1 webserver chịu tải 
ta sẽ tăng webserver lên (**horizontal scaling**)

![](https://images.viblo.asia/bab252a6-ca4a-4c9a-a08c-a3e232b88683.png)

Nhìn vào hình trên số lượng người dùng truy cập sẽ được đi qua Loadbalance và Loadbalance sẽ thực hiện điều chỉnh request đến server nào. Thay vì 1 server thì ta sẽ có nhiều con server xử lý các yêu cầu của người dùng.<br>
Lợi ích:
+ Giảm quá tải ở 1 server
+ Một server chết web vẫn hoạt động

Tóm lược xíu sẽ như sau:
![](https://images.viblo.asia/3b85010e-97c8-4b0c-a4b3-a854089fef86.png)

Nhìn trên có vẻ ngon nhưng cũng chưa thực sự ổn cho lắm: <br>
Với ứng dụng lớn thì database sẽ phình ra rất nhiều và với 1 lúc nhiều request truy cập tới database server -> k chịu nổi. <br>
-Cách giải quyết: Tăng database server lên. 

+Với trường hợp đọc nhiều, ghi ít:

Người ta sử dụng kiến trúc:  **Kiến trúc master/slave**

![](https://images.viblo.asia/ce510daa-51a5-4a7b-a77b-467a45dfd3de.png)
                                                    
                                                    
Các bạn có thể hiểu đơn giản như sau: <br>
Master sẽ là 1 con database chính nó sẽ thực hiện đọc và ghi sau đó sẽ được đồng bộ dữ liệu qua các các slave1, slave2 (đệ tử). Từ đó thay vì server lấy  trực tiếp dữ liệu từ master thì ta sẽ lấy dữ liệu từ các con đệ tử của nó (slave1,slave2,...)<br>
<br>
+Đọc nhiều ghi nhiều như facebook (comment, chat,…) thì sẽ sử dụng **Sharding Database**.<br>
Sharding database có thể hiểu đơn giản là chia nhỏ các database ra theo một số đặc điểm chung <br>
Ví dụ: Người việt nam sẽ truy cập đến database ở việt nam, mỹ sẽ truy cập database ở mỹ. 
<br><br>
Cũng đi được chặng đường cũng dài rồi mình xin tóm lược lại tổng quát về 1 hệ thống như sau:<br>

![](https://images.viblo.asia/f789b3d5-e602-4b3f-a1c3-b98b37645d42.png)


Từ đầu mấy phần cũ mình đã nói qua rồi mình sẽ không nói lại nữa và chỉ điểm qua mấy phần mà mình chưa nói đến ở hình trên:
<br>
-**CDN**: Mạng lưới lưu các nội dung tĩnh (js, css, video, image ...) trên các server được đặt ở khắp nơi 
để khi user request sẽ lấy tìm đến máy chủ chứa nội dung gần nhất thay vì phải tới máy chủ gốc.<br>
-**Caching Service**: Lưu kết quả hay dữ liệu (trong RAM) ít bị thay đổi tăng trải nhiệm người dùng (thay vì phải vào trong database). <br>
-**JobServer**: Thực hiện những tác vụ bất đồng bộ (tải video, import CSV, gửi tin nhắn....)<br>
-**Webserver**: Nơi xử lý logic nghiệp vụ và thường sẽ được viết bằng 1 ngôn ngữ tương đương với 1 framework. 

Bài viết của mình đến đây cũng hết rồi mong mọi người có thể hiểu được 1 luồng kiến trúc hệ thống sẽ như thế nào và tùy từng dự án hay yêu cầu khách hàng mà ta sẽ mổ sẻ các thứ bên trong ra. Nhìn lý thuyết có vẻ đơn giản nhưng thực tế để làm chúng không thực sự đơn giản đâu.Nó sẽ phải cần nhiều kiến trúc sư giàu kinh nghiệm lão làng trong nghành đó. Bài này mình cũng chỉ dừng lại ở mức độ khái quát không đi sâu về một vấn đề nào cả. Các bạn muốn tìm hiểu sâu hơn thì có thể search những từ mình có in đậm trong bài nhé.