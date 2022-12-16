HTTP là một điều kì diệu của Internet: một giao thức đã tồn tại hơn 20 năm qua và vẫn đang tiếp tục phát triển. Ở bài viết [trước](https://viblo.asia/p/hieu-hon-ve-trinh-duyet-web-aWj53vkol6m), chúng ta đã biết trình duyệt tương tác với các ứng dụng web qua giao thức HTTP, trong bài viết lần này chúng ta sẽ đi tìm hiểu về giao thức này. Trong thực tế nếu người dùng nhập một thông tin nhạy cảm như thông tin thẻ tín dụng khi sử dụng một trang web và kẻ tấn công có thể chặn bắt được dữ liệu này trước khi nó tới server thì tất nhiên là ứng dụng chúng ta nát bét rồi. Hiểu cách HTTP hoạt động, các đặc điểm của giao thức này và các biện pháp giúp bảo mật kết nối giữa client và server sẽ giúp chúng ta cài đặt một ứng dụng web bảo mật và an toàn hơn. 

Một điều lưu ý là những khái niệm, ý tưởng cơ bản đằng sau giao thức HTTP không thay đổi nhiều, nhưng cách thiết kế để client và server có thể giao tiếp với nhau lại liên tục được cải tiến từ năm này qua năm khác. Nếu bạn nhìn vào một HTTP request từ năm 1996 nó vẫn sẽ không có nhiều sự khác biệt so với HTTP request trong năm 2018.
<div align="center">

![](https://images.viblo.asia/0f054f34-4069-421c-aa46-b19c450bb342.png)

</div>

## Tổng quan
Như đã biết, HTTP có mô hình request/response, khi một client kết nối tới máy chủ và gửi request, máy chủ sẽ xử lý và gửi trả lại response. Một gói tin HTTP (request hoặc response) sẽ gồm các phần sau:
* first line
* header
* body

Trong một request, first line sẽ gồm một "động từ" (GET/POST/PUT/PATCH...) mà client sử dụng, đường dẫn tới tài nguyên client yêu cầu và phiên bản giao thức client sử dụng

`GET /posts HTTP/1.1`

Trong trường hợp này, client muốn `GET` tài nguyên ở địa chỉ `/posts` thông qua phiên bản `1.1` của giao thức. Sau first line, HTTP cho phép chúng ta thêm các thông tin khác vào gói tin ở header dưới dạng key-value, cách nhau bởi dấu hai chấm.
```
GET /players/lebron-james HTTP/1.1
Host: nba.com
Accept: */*
Coolness: 9000
```
Trong request này client đã gửi thêm 3 thông tin khác là `Host`, `Accept` và `Coolness`. Đợi đã, `Coolness`? 

Headers của HTTP không bắt buộc phải sử dụng các tên đặc trưng, nhưng thường thì nên sử dụng các tên chuẩn của HTTP. Càng ít sử dụng các tên chuẩn, càng ít người có thể hiểu được bạn (hoặc request của bạn). Ta có header `Cache-Control` được dùng để xác định xem response của server có thể được cache lại hay không, hầu hết các proxy đều hiểu header này vì chúng được cài đặt sẵn các chuẩn của HTTP. Nếu bạn đổi `Cache-Control` thành `Awesome-Cache-Control`, các proxy sẽ không hiểu được ý nghĩa ban đầu của nó nữa. 

Tuy vậy đôi khi bạn vẫn phải sử dụng các header tự tạo trong gói tin khi muốn thêm các thông tin mà nó không thực sự là một phần của HTTP: máy chủ có thể quyết định xem có thêm các thông tin kỹ thuật trong response không, để client có thể thực hiện request và có được các thông tin quan trọng phụ thuộc vào trạng thái máy chủ trả về chứa trong response.
```
X-Cpu-Usage: 40%
X-Memory-Available: 1%
```
Khi sử dụng các headers tự tạo, bạn nên thêm các tiền tố để chúng không bị conflict với các headers có khả năng trở thành các chuẩn trong tương lai: trước đây ai cũng sử dụng tiền tố `X` cho các header tự tạo tới nỗi mà có một số header như được sử dụng rộng rãi và đa số các proxy và bộ tải có thể hiểu được chúng mặc dù chúng không phải là một phần của chuẩn HTTP. Hai header `X-Forwarded-For` và `X-Forwarded-Proto` là hai header không phải chuẩn của HTTP nhưng được dùng nhiều tới nỗi mà [đa số các bộ cân bằng tải và proxy đều có thể hiểu được chúng.](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#Proxies) Lời khuyên là hãy sử dụng các tiền tố đặc trưng khác như `A-Custom-<tên_Header>`

Sau header một request sẽ có thể có body. Hai phần này được phân tách bởi một dòng trắng. Lưu ý là phần body có thể có hoặc không, đa số trường hợp nó chỉ xuất hiện khi chúng ta muốn gửi dữ liệu tới server. 
```
POST /players/lebron-james/comments HTTP/1.1
Host: nba.com
Accept: */*
Coolness: 9000
Best Player Ever
```

Vậy là xong phần request, giờ sẽ tới response. Một response sẽ có dạng như sau
```
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: private, max-age=3600
{"name": "Lebron James", "birthplace": "Akron, Ohio", ...}
```
Thông tin đầu tiên trong response chúng ta nhận được là phiên bản giao thức máy chủ sử dụng cùng với trạng thái của response. Theo sau là headers và body.

HTTP là giao thức đã trải qua quá trình phát triển và thay đổi mạnh mẽ trong vòng 20 năm qua với nhiều đặc điểm mới(header mới, status code mới,...). Nhưng cấu trúc cơ bản của nó vẫn như vậy (first line, headers, body). Thứ thật sự thay đổi là cách mà client và server trao đổi thông tin với nhau. HTTPS và H2 xuất hiện!

## HTTP và HTTPS và H2
Trong các request trên, chúng ta gặp `HTTP/1.0` và `HTTP/1.1`. Đây là hai thay đổi về các đặc điểm cơ bản của HTTP. `HTTP/1.1` có thêm một số thay đổi như có thêm các status code mới (24 status code trong khi `HTTP/1.0` chỉ có 16 status code),  một kết nối có thể được tái sử dụng và có hỗ trợ cơ chế pipelining. Mọi người có thể đọc thêm về HTTP/1.0 và HTTP/1.1 ở [đây](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP)

"Ủa vậy HTTPS và [HTTP2](https://httpwg.org/specs/rfc7540.html) đâu?"

HTTPS và HTTP2 (còn được viết tắt là H2) là những thay đổi mang tính kĩ thuật, chúng đưa ra cách thức mới để trao đổi các gói tin trên internet mà không làm ảnh hưởng nhiều tới các đặc điểm nguyên thủy của giao thức gốc HTTP.

HTTPS cơ bản là HTTP phiên bản bảo mật hơn, nó tạo ra một kênh truyền an toàn giữa client và server, đảm bảo chúng ta đang trao đổi với đúng đối tượng và mã hóa dữ liệu truyền đi. **HTTPS nhắm tới vấn đề bảo mật của giao thức HTTP** trong khi **H2 lại có mục đích chính là tối ưu tốc độ**. H2 sử dụng các gói tin nhị phân thay vì các gói tin plaintext thông thường, hỗ trợ ghép kênh, sử dụng thuật toán HPACK để nén headers. Tóm lại H2 là HTTP/1.1 nhưng có tốc độ tối ưu hơn rất nhiều. Nhưng các chủ trang web thường rất miễn cưỡng khi phải đổi sang HTTPS vì họ phải tạo thêm các kênh round-trip giữa client  và server (một kênh bí mật cần được tạo giữa hai bên), do dó làm giảm trải nghiệm của người dùng. Với H2, mặc định mọi thứ đã được mã hóa và tốc độ được tăng đáng kể nhờ ghép kênh nên sẽ không còn lí do gì mà phải do dự khi chuyển sang nữa.  Trên viblo đã có một bài viết rất chi tiết về [H2](https://viblo.asia/p/tong-quan-http2-aWj53OEQ56m).

## HTTPS
HTTPS giúp client và server trao đổi bảo mật hơn thông qua TLS, một công nghệ kế nghiệm SSL. Vấn đề mà TLS giải quyết rất đơn giản và có thể được mô tả bằng một tình huống thực tế như sau: người yêu bạn gọi điện cho bạn trong khi bạn đang họp và hỏi bạn mật khẩu của tài khoản internet banking của bạn vì anh/cô ấy cần chuyển học phí cho con bạn đúng hạn. Trước khả năng con bạn có thể bị cho nghỉ học vì nộp học phí muộn, bạn phải đối mặt với hai vấn đề sau:
* **xác thực**: bạn cần chắc chắn rằng bạn đang nói chuyện với người yêu của bạn, nhỡ có ai đó cướp điện thoại của người ấy rồi giả mạo thì sao?
* **mã hóa**: bạn phải tìm cách nói password cho người yêu bạn mà cả hai đều hiểu nhưng đồng nghiệp bạn lại không thể hiểu để mà có thể ghi lại được (bạn đang ngồi trong phòng họp với rất nhiều đồng nghiệp và ai cũng có sẵn giấy bút để ghi lại mọi thứ).

Bạn phải làm gì bây giờ? HTTPS sẽ giải quyết vấn đề này hộ bạn. Để xác thực bạn đang nói chuyện với ai, HTTPS sử dụng các **chứng chỉ khóa công khai**, một loại chứng chỉ để xác thực máy chủ của website: khi bạn kết nối qua HTTPS tới một địa chỉ IP, máy chủ của địa chỉ đó sẽ đưa cho bạn chứng chỉ của nó để xác thực danh tính. 

Quay lại trường hợp con bạn sắp bị đuổi học vì nộp học phí muộn, bạn chỉ cần hỏi lại số chứng minh thư của người yêu bạn. Nhưng nhỡ bồ bạn bị cướp cả chứng minh thư thì sao? Làm thế nào bạn có thể xác thực trong trường hợp này? Chúng ta sẽ phải làm thêm một bước nữa là gọi điện cho mẹ (người đang sống ngay kế bên nhà bạn) nhờ chạy qua nhà bạn ngó xem có đúng là bồ bạn đang nói chuyện với bạn không. Trong HTTPS chúng ta có các **nhà cung cấp chứng chỉ số CA - Certificate Authority** có chức năng tương tự mẹ bạn. CA có trách nhiệm xác nhận một máy chủ. Khi kết nối tới một domain cụ thể, chúng ta không thể bị đưa cho một chứng chỉ được tạo bởi chủ của domain đấy mà phải là chứng chỉ của CA. Trách nhiệm của nhà cung cấp chứng chỉ số là đảm bảo độ tin cậy của một domain và cung cấp chứng chỉ: khi bạn yêu cầu một chứng chỉ (thường được gọi là chứng chỉ SSL, mặc dù hiện tại TLS đã được sử dụng thay thế SSL nhưng người ta vẫn gọi như vậy), nhà cung cấp sẽ gọi hoặc yêu cầu bạn thay đổi các cài đặt của DNS để đảo bảo bạn đang chịu trách nhiệm cho domain bạn yêu cầu. Sau khi xác thực thành công, nó sẽ tạo ra một chứng chỉ mà bạn có thể cài đặt trên webserver của mình. Sau đó client sẽ kết nối tới server và nhận được chứng chỉ. Các trình duyệt có một mối quan hệ đặc biệt với nhà cung cấp chứng chỉ, chúng luôn có một danh sách các nhà cung cấp chứng chỉ tin cậy để xác định xem chứng chỉ nào là tin cậy. Nếu một chứng chỉ không được kí bởi một CA tin cậy, trình duyệt sẽ hiển thị cảnh báo cho người dùng
![](https://images.viblo.asia/3dbd193a-683c-4ad7-a01c-46e8fc988c07.png)

Vậy là chúng ta đã giải quyết xong vấn đề xác thực khi người yêu gọi điện cho bạn. Bây giờ bạn cần nói mật khẩu, vấn đề là xung quanh có rất nhiều đồng nghiệp của bạn và bạn không muốn bị nghe trộm. Cách đơn giản nhất là bạn có thể tạo ra một quy tắc riêng chỉ có bạn và bồ bạn hiểu để mã hóa thông tin, sử dụng mã hóa Caesar dựa trên ngày làm đám cưới hay yêu nhau của bạn chẳng hạn. 
![](https://images.viblo.asia/6e3bab2b-bb01-456b-a55b-2f0f6691621e.png)

Nhưng máy chủ và trình duyệt thì khác vì chúng không có thông tin gì của nhau trước đó. Do vậy giao thức trao đổi khóa[ Diffie-Hellman và các biến thể của nó](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) được sử dụng để phòng chống việc bị  nghe trộm trên đường truyền. Cái này liên quan tới một ít [mật mã học](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange#Cryptographic_explanation).
![](https://images.viblo.asia/b3833b97-1b5b-42e7-b42b-740d0f6209dc.png)

Sau khi đã tạo ra một quy tắc mã hóa riêng, client và server có thể trao đổi thoải mái mà không sợ bị bắt trộm gói tin, kể cả khi kẻ tấn công có lấy được gói tin thì hắn cũng không thể giải mã được. Để hiểu hơn về HTTPS và Diffie-Hellman, bạn có thể đọc các tài liệu sau:
* [HTTPS bảo mật kết nối như thế nào?](https://blog.hartleybrody.com/https-certificates/)
* [HTTPS hoạt động như thế nào?](https://robertheaton.com/2014/03/27/how-does-https-actually-work/)
* [9 thuật toán thay đổi tương lai ](https://en.wikipedia.org/wiki/9_Algorithms_That_Changed_the_Future)

## HTTPS ở khắp mọi nơi
Tới nay mọi người vẫn còn tranh cãi liệu có nên sử dụng HTTPS không. Các trình duyệt web đang dần dần hướng người dùng tránh xa những website không dùng chuẩn HTTPS để ép các lập trình viên web phải sử dụng HTTPS để bảo mật hơn. Từ câu câu khẩu hiểu **[HTTPS ở khắp mọi nơi](https://www.eff.org/https-everywhere)**, các trình duyệt web đang dần dần từ chối các kết nối không mã hóa, Google là nhà cung cấp trình duyệt web đầu tiên đưa ra một deadline cho các nhà phát triển web là kể từ phiên bản Chrome 68 (tháng 7 2018) sẽ đánh dấu các trang web HTTP là "không an toàn". Với các trang web "không an toàn" như vậy, khi người dùng nhập bất cứ thứ gì trên trang web, chữ "not secure" sẽ chuyển đỏ để cảnh báo người dùng trước khi họ trao đổi dữ liệu với một trang web không hỗ trợ HTTPS
<div align="center">

![](https://images.viblo.asia/4999871e-57cc-448d-8cb6-1e02d41a62cb.png)
</div>

Thậm chí nếu người dùng nhập gì đó trên một trang web không dùng HTTPS, chữ "Not secure" sẽ đổi màu đỏ ngay lập tức để cảnh báo người dùng nên suy nghĩ lại trước khi trao đổi dữ liệu với một trang web không hỗ trợ HTTPS
<div align="center">

![](https://images.viblo.asia/ae0df028-3577-4804-8225-3b4eaf654d43.png)

</div>
Nếu sử dụng HTTPS thì sẽ như thế này:
<div align="center">

![](https://images.viblo.asia/ef755aed-7ece-48d1-8af5-f092e43cc542.png)

</div>
Về mặt lý thuyết một website không cần phải bảo mật nhưng trong thực tế, nếu website của bạn không có cái gì bảo vệ, người dùng sẽ té ngay. Trước đây khi chưa có H2, việc sử dụng HTTP không là hoàn toàn dễ hiểu vì có một số người thích tốc độ hơn là bảo mật. Nhưng hiện nay khi H2 xuất hiện thì không còn lí do gì để chúng ta làm vậy nữa. 

## GET vs POST
Hai từ kinh điển với các lập trình viên web. Client nói với server chúng sử dụng "động từ" gì để thực hiện request. Các HTTP verb thường dùng là: `GET`, `POST`, `PUT`, `DELETE`, ngoài ra còn một số từ khác như `TRACE`,  `OPTIONS`, `HEAD`. Về lý thuyết không có method nào an toàn hơn method nào cả, nhưng thực tế thì không đơn giản vậy.

GET thường không có body nên các tham số thường xuất hiện luôn ở URL, còn POST thì dùng để gửi (post) dữ liệu được chứa trong phần body. Một điểm nữa là `GET` là một `idempotent` verb, có nghĩa là bất kể bạn gửi bao nhiêu request đi chăng nữa, bạn sẽ không thể làm thay đổi trạng thái của webserver còn `POST` thì ngược lại, mổi request bạn gửi đều có thể làm thay đổi trạng thái của server (ví dụ khi bạn đang `POST` một thanh toán chuyển khoản, bạn sẽ hiểu tại sao trang web yêu cầu bạn không được tải lại trang trong lúc đang thực hiện thanh toán).

Một bản log của webserver có thể sẽ trông như sau:
```
192.168.99.1 - [192.168.99.1] - - [29/Jul/2018:00:39:47 +0000] "GET /?token=1234 HTTP/1.1" 200 525 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" 404 0.002 [example-local] 172.17.0.8:9090 525 0.002 200
192.168.99.1 - [192.168.99.1] - - [29/Jul/2018:00:40:47 +0000] "GET / HTTP/1.1" 200 525 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" 393 0.004 [example-local] 172.17.0.8:9090 525 0.004 200
192.168.99.1 - [192.168.99.1] - - [29/Jul/2018:00:41:34 +0000] "PUT /users HTTP/1.1" 201 23 "http://example.local/" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" 4878 0.016 [example-local] 172.17.0.8:9090 23 0.016 201
```

Bạn có thể thấy trong log này có các đường dẫn request, điều này nghĩa là nếu bạn có các dữ liệu nhạy cảm được chứa trong ở URL, nó sẽ bị lộ và lưu lại đâu đó trong log, bí mật của bạn đang ở dạng plaintext. Kẻ tấn công có thể đánh cắp được các file log chứa các thông tin bí mật này. 

Trong khi đó webserver không log lại HTTP headers và body vì như vậy dữ liệu lưu lại sẽ quá lớn. Đó là lí do tại sao gửi dữ liệu trong phần body của request sẽ an toàn hơn là qua URL. Từ đây có thể suy ra POST an toàn hơn GET, tuy vậy nó vẫn còn phụ thuộc vào vấn đề dữ liệu được gửi đi như thế nào khi sử dụng một verb thay vì việc verb này an toàn hơn verb khác. Bạn có thể gửi các thông tin nhạy cảm vào phần body của một `GET` request. thế là `GET` request của bạn vẫn an toàn không kém gì `POST`, dù cách sử dụng này hơi dị.

Vậy là chúng ta đã đi hết các kiến thức cơ bản nhất về lịch sử phát triển của HTTP, các thay đổi của giao thức này, cách client và server trao đổi dữ liệu an toàn qua kênh mã hóa trong HTTPS. Sau khi đã hiểu về trình duyệt web ở bài viết trước và các đặc điểm của HTTP ở bài viết này, hi vọng các bạn đã có một cái nhìn tổng quát hơn về bảo mật khi xây dựng ứng dụng web. 

## Tham khảo:
https://medium.freecodecamp.org/web-security-an-introduction-to-http-5fa07140f9b3
https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Evolution_of_HTTP