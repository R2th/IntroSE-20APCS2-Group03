### URLs là gì? 

- URL là một thuật ngữ chuyên ngành, được dùng phổ biến trên cộng đồng internet. URL là từ viết tắt của cụm từ tiếng Anh: “Uniform Resource Locator” có nghĩa tiếng Việt là “Tham chiếu tài nguyên internet”. 

- Bạn có thể hiểu một cách đơn giản hơn, URL là một phương tiện để người dùng sử dụng, truy cập đến tài nguyên trên mạng máy tính. Mỗi tài nguyên trên máy tính khi ta truy cập tìm kiếm hàng ngày đều được gán một địa chỉ, hay còn gọi là đường link cố định (thay vì một dãy địa chỉ IP dài). Chỉ cần nhập địa chỉ (đường link) đó và search, bạn có thể đến được địa chỉ website mình tìm kiếm.

Ví dụ: Địa chỉ website của Google là: http://google.com ( hoặc địa chỉ IP: 142.250.66.46)

### Cấu trúc của URL:
![](https://images.viblo.asia/7e2edb3e-27b9-4f2b-adf7-58c25625fff6.png)
- protocol ( hay còn gọi là scheme: giao thức) - định nghĩa dạng dịch vụ Internet ( phổ biến chủ yếu là http hay https)
- domain - định nghĩa tên miền Internet (chẳng hạn như w3schools.com)
- top-level domain chính là: .com, .vn, .edu, .org, .net ....
(tham khảo thêm: https://sal.vn/dKGn4i)
- path – định nghĩa đường dẫn tại server (nếu đường dẫn thiếu thì mặc định sẽ là đường dẫn gốc của trang web)

=>>  Để hiểu rõ hơn các thành phần URL là gì, sau đây chúng ta sẽ cùng đi phân tích cụ thể về cấu trúc URL.
Một URL đơn giản sẽ có 2 phần chính là giao thức kết nối (Protocol) và nhà cung cấp (Authority).
### A, Protocol (Scheme)  trong URL:
Protocol là phần mở đầu của URL kết thúc trước dấu ” : “, đại diện cho phương thức mà trình duyệt web của bạn dùng để giao tiếp với server. Người dùng thường sẽ ít chú ý đến phần này của đường dẫn URL. Tuy nhiên, scheme sẽ quy định cách thức truyền tải dữ liệu giữa trình duyệt và server. 

- Có 3 dạng giao thức Protocol chủ yếu sau:

| Protocol | Tên đầy đủ| Dùng cho |
| -------- | -------- | -------- |
| http     | HyperText Transfer Protocol  | Các trang web không mã hóa đường truyền    |
| https     | Secure HyperText Transfer Protocol    | Các trang web mã hóa đường truyền
| ftp    | File Transfer Protocol    | Tải về/tải lên tập tin    |
<br>
Với các trình duyệt hiện đại như ngày này, bạn có thể không cần sử dụng Protocol để truy cập địa chỉ nào đó, bởi trình duyệt có thể tự động xác định giao thức phù hợp. Tuy nhiên, trong một số trường hợp yêu cầu bắt buộc, bạn vẫn phải nhập đầy đủ cả giao thức.

### B. Authority - nhà cung cấp của URL:
![](https://images.viblo.asia/b55259f4-c66f-4d06-82f7-7790117d7977.jpeg)

Phần Authority là phần còn lại của URL. Phần này sẽ được chia thành nhiều phần khác nhau.

Ví dụ: www.example.com =>> đây là hostname đại diện cho địa chỉ IP. Nếu bạn thuộc địa chỉ IP bạn có thể gõ vào phần URL thay vì hostname. Tuy nhiên IP sẽ khó nhớ hơn rất nhiều với hostname. Ví thế người ta có xu hướng nhớ hostname thay vì địa chỉ IP.

Những thành phần của hostname URL là gì?
### 
### Tên miền cấp cao nhất (Top-Level Domain)
 - Hiện tại “com” là tên miền cấp cao nhất. 
<br>  =>> Những tên miền cấp cao nhất này được Tập đoàn Internet cấp số và tên miền (ICANN) tạo và quản lý. Có ba tên miền cấp cao nhất phổ biến là .com., .net, .gov.

- Hầu hết các quốc gia đều có tên miền cấp cao nhất. Những tên miền này gồm hai chữ cái, ví dụ như: .us (Mỹ), .vn (Việt Nam), .ca (Canada), v.v… Việc đăng ký tên miền nào phù hợp sẽ phụ thuộc vào mô hình kinh doanh và quốc gia mà bạn nhắm lượng khách hàng của mình tập trung ở đó nhiều nhất.
- Bạn có thể thao khảo các tên miền khác tại đây: https://sal.vn/dKGn4i
### Tên miền phụ (Subdomain)

- Cả hai phần “www” và “example” của URL ví dụ trên được xem là  subdomain (tên miền phụ).
<br> + Phần “example” là tên miền phụ của tên miền cấp cao nhất “com”
<br> + Phần “www” là tên miền phụ của tên miền “example”. 
<br> => Đó là lý do tại sao bạn thấy công ty có tên đăng ký như “google.com” được chia thành các tên miền phụ như “www.google.com”, “mail.google.com”,… Hoặc "www.facebook.com" , "facebook.com"...

### Thành phần bổ sung của URL
Có 3 thành phần bổ sung khác dành cho Authority của URL đó là:

- Path (đường dẫn)
- Query (Truy vấn)
- Fragment(Phân mảnh).

**1. Đường dẫn (path) URL là gì?**

- Đường dẫn đưa bạn đến đúng thư mục hoặc file trên máy chủ đó. Đường dẫn được bắt đầu bằng dấu gạch chéo. Những dấu gạch chéo này sẽ tiếp tục thể hiện phân chia giữa các thư mục và thư mục con (subfolder). Ví dụ như:

`www.example.com/folder/subfolder/filename.html`

=> Phần cuối cùng là tên file sẽ được mở khi truy cập vào trang web. Bạn có thể sẽ không thấy đường dẫn này trên thanh địa chỉ. Nhưng điều đó không có nghĩa là không có. Một vài ngôn ngữ được sử dụng để tạo trang web ẩn tên và phần mở rộng của file để người dùng dễ nhớ và gõ URL hơn.

**2. Truy vấn (query) URL là gì?**

- Truy vấn của URL được sử dụng để xác định những thứ không phải là thành phần của cấu trúc đường dẫn cố định. 
- Thông thường, bạn sẽ thấy chúng được sử dụng để thực hiện tìm kiếm. Hoặc khi trang web phân phối dữ liệu thông qua biểu mẫu cũng sử dụng query. Phần truy vấn này được bắt đầu bằng dấu hỏi chấm và theo sau đường dẫn (hoặc sau tên máy chủ nếu không có đường dẫn).

Ví dụ, dưới đây là URL khi thực hiện tìm kiếm “Mắt Bão” trên trang Google.

`https://www.google.com/search?q=M%E1%BA%AFt+B%C3%A3o&oq=M%E1%BA%AFt+B%C3%A3o&aqs=chrome..69i57j69i61l3.17415j0j4&sourceid=chrome&ie=UTF-8`

Như bạn thấy, sau dấu chấm hỏi là 2 phần của truy vấn:
URL cho tìm kiếm: “search?q=” và từ khóa đã được mã hóa:”M%E1%BA%AFt+B%C3%A3o&oq=M%E1%BA%AFt+B%C3%A3o”

**3. Phân mảnh (fragment) URL là gì?**
- Phân mảnh được bắt đầu bằng một dấu thăng (#) và được sử dụng để xác định vị trí cụ thể của trang web. 
- Đây là thành phần cuối cùng của một URL. Khi tạo website, các nhà thiết kế có thể thêm liên kết neo (anchor text) cho văn bản cụ thể như tiêu đề. 
- Khi sử dụng một phân mảnh thích hợp ở cuối URL, trình duyệt của bạn sẽ tải trang. Sau đó chuyển đến vị trí của liên kết neo đó. Liên kết neo và URL cùng với phân mảnh thường được sử dụng để tạo mục lục trang web giúp điều hướng dễ dàng hơn.

Ví dụ:

`https://www.matbao.net/ten-mien/dang-ky-ten-mien.html#nguyen-tac-chon-ten-mien`
=> Ở ví dụ trên phần “#nguyen-tac-chon-ten-mien” chính là phân mảnh anchor text. Khi bạn truy cập vào URL: “https://www.matbao.net/ten-mien/dang-ky-ten-mien.html”, trình duyệt sẽ tự di chuyển đến mục đã được gắn anchor text trên.


### C. Các cách tối ưu URL: 
Một URL được tối ưu sẽ giúp người dùng dễ nhớ, họ có thể gõ lại URL để vào web của bạn nếu muốn truy cập vào lần sau. Thu hút khách hàng click vào link nếu URL liên quan đến đúng keyword tìm kiếm.
- URL không được quá dài: 
<br> + URL của bạn chỉ nên gồm 10 từ hoặc 96 ký tự.
- Không viết có dấu hay nhiều kí tự đặc biệt:
<br> +  Viết dưới dạng tiếng Việt thì đều được để dưới dạng không dấu và nối với nhau bởi những dấu gạch nối như “dang-ky-ten-mien-o-dau”. 
<br> +  Hạn chế tối đa việc thể hiện các kí tự đặc biệt trong đường dẫn như *&^%$… Những kí tự này được xem là khó hiểu và ảnh hưởng nhiều đến khả năng xếp hạng website của bạn.
- URL phải có chứa từ khóa chính hoặc ít nhất là từ khóa phụ
<br> + Nếu bạn đang SEO từ khóa quan trọng nào, hãy đảm bảo rằng từ khóa mình muốn SEO có hiển thị trong đường dẫn URL đó. Đó là điều mà các công cụ SEO thường xuyên nhắc nhở bạn trước khi update hay cho đăng tải bài viết nào.
- Không chỉnh sửa URL khi đã được Google Index
- Không để trùng lặp URL
### D. Cách viết testcase đối với URL: 
 Format chuẩn của URL:
 
` protocol/subdomain/domain/Top - level domain/Floder/Paths/ Page/Named Anchor`

**CASE INVALID:**
+ Ko có domain
+ ko có top-level domain 
+ Ko có domain và top-level domain 
                      - Only protocol (scheme)
                     - Only domain/subdomain
                       - Only top-level domain
                       - Only Floder/Paths/ Page/Named Anchor 
                       
**CASE VALID:**
- Có đầy đủ: protocol/subdomain/domain/Top - level domain/Floder/Paths/ Page/Named Ancho
- Chỉ có domain và top-level domain
- Ko có protocol (shame)
- Ko có Folder
- Ko có Paths 
- Ko có page 
- Ko có Name Anchor

Nguồn tham khảo: https://moz.com/learn/seo/url