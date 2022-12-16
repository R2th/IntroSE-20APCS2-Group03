<div align="center">

# Lời mở đầu
</div>

- Xin chào các đã đang và sẽ trở thành "web developer", bài viết hôm nay sẽ đề cập đến một chủ để khá cơ bản nhưng chưa chắc nhiều bạn để ý tới, nhất là những bạn mới bắt đầu tìm hiểu, học tập về lập trình web. Đó là việc lựa chọn 1 web server.
- Chắc hẳn các bạn bắt đầu học lập trình web (PHP) không còn xa lạ gì với [**xampp**](https://www.apachefriends.org/index.html) nữa. Nó là một gói tổng hợp môi trường gồm **Apache** + MariaDB + PHP + Perl. Và trong bài phạm vi bài viết này chúng ta sẽ chỉ quan tâm đến **Apache** (web server) thôi nhé!
- Ngoài **Apache** ra thì một  web server cũng khá phổ biến hiện nay là **Nginx** (đọc là En-gin-ích) mà ban đầu mình hay gọi nó là `Ngĩn` :D Và trong bài viết này, chúng ta sẽ cùng tìm hiểu và so sánh hai web server này để các bạn có thể lựa chọn một web server phù hợp cho bản thân nhé. Bắt đầu thôi nào!

<div align="center">

# Nội dung
</div>

<div align="center">

## Tìm hiểu về web server
</div>

- **Web server** là máy chủ web (về cơ bản gồm `phần cứng` là một máy tính bình thường và `phần mềm` để tiếp nhận yêu cầu, xử lý và trả dữ liệu) chứa dữ liệu của một/nhiều trang web. Và cũng giống như con người muốn trao đổi, nói chuyện thì phải sử dụng chung một ngôn ngữ, máy tính muốn "nói chuyện" với nhau cũng cần phải có một giao thức (phương thức giao tiếp) chung, và ở đây là giao thức [HTTP](https://www.google.com/search?q=http+l%C3%A0+g%C3%AC&rlz=1C1CHBF_enVN851VN851&oq=http+l%C3%A0+g%C3%AC&aqs=chrome..69i57j0l4j69i65l3.1415j1j4&sourceid=chrome&ie=UTF-8). 

<div align="center">

### Apache
</div>

- **Apache** là một phần mềm mã nguồn mở cho máy chủ sử dụng giao thức HTTP.
- **Apache** được phát triển bởi "Apache Software Foundation" và phiên bản đầu tiên ra đời vào năm ~1995 (cùng tuổi Hợi với mình này). Và sau hơn 20 năm, tính tới thời điểm hiện tại thì **Apache** vẫn là một trong những web server phổ biến bậc nhất. 
- Để tồn tại được hơn 20 năm trong một xã hội công nghệ thay đổi từng ngày, rõ ràng Apache sẽ có những điểm mạnh riêng của mình. 
- Và khi **Apache** bước sang tuổi thứ 9, `một-người-em-web-server-khác` ra đời và cạnh tranh với Apache, đó chính là **Nginx**. Và đến thời điểm hiện tại, mức độ phổ biến của 2 web server này có lẽ là đang cân bằng nhau.

<div align="center">

### NGINX
</div>

- **Nginx** được tạo ra bởi [Igor Sysoev](https://www.google.com/search?q=Igor+Sysoev&rlz=1C1CHBF_enVN851VN851&oq=Igor+Sysoev&aqs=chrome..69i57&sourceid=chrome&ie=UTF-8) và phát hành công khai lần đầu tiên vào năm 2004.

> NGINX is open source software for web serving, reverse proxying, caching, load balancing, media streaming, and more. It started out as a web server designed for maximum performance and stability. In addition to its HTTP server capabilities, NGINX can also function as a proxy server for email (IMAP, POP3, and SMTP) and a reverse proxy and load balancer for HTTP, TCP, and UDP servers.

- **Vietsub**: Nginx là một phần mềm mã nguồn mở cho web, proxy, caching, cân bằng tải, ... Ngoài các khả năng của máy chủ HTTP, Nginx cũng có thể hoạt động như một máy chủ proxy cho email (IMAP, POP3, SMTP) và một trình cân bằng tải và proxy ngược cho các máy chủ HTTP, TCP, UDP.



<div align="center">

## So sánh giữa Apache và NGINX
</div>

### 1. Mức độ phổ biến
- Mình thấy điều này rất quan trọng nên quyết định để nó lên mục đầu tiên để so sánh. Trong cộng đồng CNTT nói chung và lập trình web nói riêng thì việc sử dụng các package, công cụ opensource không có gì lạ lẫm. Và khi package/công cụ bạn sử dụng có một lượng lớn người sử dụng thì tất nhiên bạn có thể dễ dàng tìm kiếm sự hỗ trợ  hơn từ cộng đồng. 
- Và dưới đây là biểu đồ mức độ phổ biến của các web server hiện tại (ngày 31/05/2020), và như bạn thấy thì Apache có nhỉnh hơn 1 chút, tuy nhiên cả 2 đều bỏ khá xa đối thủ tiếp theo là Cloudflare.

![](https://images.viblo.asia/dd7a3365-438a-4b70-b28f-dce3977bb9e7.jpg)



### 2. Tốc độ xử lý
- Mình cũng mới được khai phá một công cụ kiểm tra thử tốc độ của một website, đó chính là https://www.bitcatcha.com/.
- Tất nhiên việc so sánh tốc độ này chỉ mang tính chất `tương đối` vì nó còn phụ thuộc vào `một số yếu tố khác` nữa. Và đối tượng được test thử là 2 website về du lịch là booking.com (**Nginx**)  và expedia.com (**Apache**). Và bên dưới là kết quả: 

![](https://images.viblo.asia/1b3adacc-05cd-4502-863d-a58c35567f04.jpg)

![](https://images.viblo.asia/bc07310f-4bfc-4ce7-9a12-a9d16381f101.jpg)

- Bạn có thể thấy kết quả cũng gần tương đương nhau, tuy nhiên khi truy cập trực tiếp thì mình thấy booking.com tải nhanh hơn. Và như mình có nói ở trên, vì còn phụ thuộc vào nhiều yếu tố khác nên không thể kết luận được là cái nào nhanh hơn nhé. 
- Về tốc độ xử lý, coi như là 2 web server có tốc độ bằng nhau.

### 3. Khả năng chịu tải
- Là một người phát triển và vận hành trang web, tất nhiên việc bạn quan tâm đó là có nhiều người truy cập vào website của bạn hay không, và khi nhiều người cùng truy cập một lúc thì server có thể chịu nổi không? Và khả năng chịu tải cũng là điều mà bạn cần chú ý nếu website của bạn có nhiều lượt truy cập (trang đăng kí tín chỉ/nộp nguyện vọng đại học chẳng hạn), còn nếu bạn chỉ làm một trang web dạng blog cá nhân với ít lượt truy cập thì mình nghĩ 2 cái sẽ như nhau.

![](https://images.viblo.asia/1512a504-75ac-4ca0-9692-9e1c895588a6.jpg)

<div align="center">
        mức độ phổ biến & số lượng website có lượt truy cập cao sử dụng các webserver
</div>

- Và như bạn có thể thấy thì đứng đầu đang là **[Cloudflare](https://www.cloudflare.com/)** (trong phạm vi bài viết này sẽ không đề cập tới). Còn **Nginx** được sử dụng nhiều hơn **Apache** đối với các website có mức độ truy cập cao. 

- Được sử dụng nhiều hơn thì chắc là **Nginx** tốt hơn rồi nhỉ!

### 4. Khả năng bảo mật
- Để được sử dụng rộng rãi và duy trì lâu dài như Apache (~25 năm) và Nginx (~20 năm) thì tất nhiên việc bảo mật cũng được đề cao và liên tục phát triển. Và là một "tay mơ" về vấn đề bảo mật nên mình cũng không dám bàn luận quá sâu.

- Tuy nhiên có một lưu ý khi bạn sử dụng Apache, đó chính là hãy disable chức năng `Directory Listing` mà `config mặc định của Apache` là **enable**. Có thể bạn nghĩ đây là 1 tính năng nhưng thực ra việc show ra cấu trúc thư mục có thể vô tình cung cấp thông tin cho hacker xâm nhập vào website của bạn. 

![](https://images.viblo.asia/4db88472-2743-4cf0-b308-6b57d3b292d1.jpg)

- Còn cách config disable `Directory Listing` thì bạn có thể tham khảo ở [**đây**](https://www.google.com/search?rlz=1C1CHBF_enVN851VN851&sxsrf=ALeKk01oVx6QmrKQVsXRp83ZlAhhICEN2Q%3A1590939763423&ei=c9DTXsetGYaK0ASx4aqwBw&q=how+to+disable+directory+listing+in+apache&oq=how+to+disable+directory+li&gs_lcp=CgZwc3ktYWIQAxgAMgUIABDLATIFCAAQywEyCAgAEMsBEIsDMggIABDLARCLAzIFCAAQywEyBQgAEMsBMgUIABDLATIFCAAQywEyCAgAEMsBEIsDMggIABDLARCLAzoECCMQJzoFCAAQiwM6CAgAEIMBEIsDOgQIABBDOgcIABBDEIsDOgIIADoGCAAQFhAeOggIABAWEAoQHjoECAAQEzoHCAAQExCLA1CsIFjuY2CWa2gNcAB4AIABgQGIAf8WkgEEMjQuOJgBAKABAaoBB2d3cy13aXq4AQM&sclient=psy-ab).

<div align="center">

# Tổng kết
</div>

- Đến đây, chắc hẳn các bạn cũng đã có thể đưa ra lựa chọn web server cho riêng mình. Và hãy nhớ rằng:
> Đừng tìm thứ tốt nhất, hãy tìm thứ phù hợp nhất (tự dưng nghĩ ra câu này thôi chứ chả phải quote ở đâu về đâu :rofl::rofl::rofl::rofl::rofl:)

- Hi vọng rằng bài viết này đã có thể cung cấp những kiến thức hữu ích cho các bạn, nhất là những bạn mới bắt đầu tìm hiểu về lập trình web. Nếu có bất cứ khúc mắc gì, đừng ngần ngại comment xuống phía dưới hoặc đặt câu hỏi [**ở đây**](https://viblo.asia/questions/ask) để mình và mọi người trong cộng đồng Viblo giải đáp cho bạn nhé. Cảm ơn bạn đã theo dõi bài viết.

- Bây giờ là 23h10' ngày 31/05/2020, bài này chắc cũng là bài chốt hạ của event #VibloMayfest rồi nhỉ, chúc cho cộng đồng Viblo ngày càng phát triển và có thêm những event chất lượng để cho cộng đồng hoạt động sôi nổi hơn nữa.

<div align="center">

# Tài liệu tham khảo
</div>

- Số liệu tham khảo: https://w3techs.com/
- www.google.com
- Nginx là gì?: https://viblo.asia/p/nginx-la-gi-1VgZvOXMlAw
- Trang chủ Nginx: https://www.nginx.com/resources/glossary/nginx/
- Trang chủ Apache: https://httpd.apache.org/