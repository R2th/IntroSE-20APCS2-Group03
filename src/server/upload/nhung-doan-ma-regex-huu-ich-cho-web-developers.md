Regular Expression (Regex) - Biểu thức chính quy là một công cụ mạnh mẽ cần có trong bộ công cụ của mọi nhà phát triển Web. 
Regex được sử dụng trong hầu hết các ngôn ngữ lập trình và được coi là tiêu chuẩn  cho thao tác chuỗi.
Phần khó nhất là học cú pháp và học cách viết mã regex của riêng bạn từ đầu. Để tiết kiệm thời gian, mình đã tổng hợp lại các đoạn mã regex khác nhau mà bạn có thể kết hợp vào các dự án. Và vì regex không giới hạn ở một ngôn ngữ duy nhất, bạn có thể áp dụng các đoạn mã này cho bất kỳ thứ gì từ JavaScript sang PHP hoặc Python .
### Độ mạnh của Mật khẩu / Password 
```javascript
^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$
```
Kiểm tra độ mạnh của mật khẩu thường chủ quan nên không có câu trả lời chính xác tuyệt đối. Nhưng mình cảm thấy đoạn mã Regex này là điểm khởi đầu tuyệt vời nếu bạn không muốn viết trình kiểm tra độ mạnh mật khẩu của riêng mình từ đầu.( [Nguồn](https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength/5142164#5142164) )

### Xác thực địa chỉ email

```javascript
/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
```
Một trong những nhiệm vụ phổ biến nhất đối với Developer là kiểm tra xem một chuỗi có được định dạng theo kiểu địa chỉ email hay không. Có nhiều biến thể khác nhau để thực hiện nhiệm vụ này, tuy nhiên trang SitePoint này cung cấp hai đoạn mã riêng biệt để kiểm tra cú pháp e-mail đối với một chuỗi. ( [Nguồn](https://www.sitepoint.com/javascript-validate-email-address-regex/) )

### Số điện thoại hợp lệ
```javascript
^\+?\d{1,3}?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$
```
Ngắn và chính xác. Mã regex này sẽ xác nhận bất kỳ cú pháp số điện thoại truyền thống nào chủ yếu dựa trên kiểu số điện thoại của người Mỹ.

Vì việc tranh cãi về Validate Số điện thoại có thể biến thành một chủ đề khá phức tạp, mình khuyên các bạn nên lướt qua [chủ đề Stack này](https://stackoverflow.com/questions/123559/a-comprehensive-regex-for-phone-number-validation) để có câu trả lời chi tiết hơn. ( [Nguồn](https://snipplr.com/view/24284/valid-phone-number/) )

### Ngày xác thực ở định dạng DD / MM / YYYY
```javascript
^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$

```
Việc Validate **Ngày** là việc khó khăn vì chúng có thể xuất hiện dưới dạng văn bản + số hoặc chỉ là số với các định dạng khác nhau. PHP có một hàm [Date](http://php.net/manual/en/function.date.php) tuyệt vời nhưng đây không phải luôn là lựa chọn tốt nhất khi kéo một chuỗi thô. Thay vào đó, hãy xem xét sử dụng biểu thức chính quy này được thực hiện cho cú pháp ngày cụ thể này. ( [Nguồn](https://stackoverflow.com/questions/15491894/regex-to-validate-date-format-dd-mm-yyyy/15504877#15504877) )
### Lấy ID video YouTube
```javascript
/http:\/\/(?:youtu\.be\/|(?:[a-z]{2,3}\.)?youtube\.com\/watch(?:\?|#\!)v=)([\w-]{11}).*/gi
```
YouTube đã giữ cấu trúc URL giống nhau trong nhiều năm. Đây cũng là trang web chia sẻ video phổ biến nhất trên Internet, vì vậy video trên YouTube có xu hướng thu hút nhiều lưu lượng truy cập nhất.

Nếu bạn cần lấy ID video YouTube từ URL, mã Regex này là hoàn hảo và sẽ hoạt động tốt cho tất cả các biến thể của cấu trúc URL YouTube. ( [Nguồn](https://snipplr.com/view/33375/youtube-url-matcher-video-id-catcher/) )
### Kiểm tra mã Zip
```javascript
^\d{5}(?:[-\s]\d{4})?$
```
Người tạo ra đoạn Regex không chỉ chia sẻ miễn phí mà còn dành thời gian để giải thích. Bạn sẽ thấy đoạn mã này hữu ích cho dù bạn phù hợp với mã zip 5 chữ số thông thường hoặc phiên bản 9 chữ số dài hơn.

Hãy nhớ rằng điều này chủ yếu dành cho hệ thống mã zip của Mỹ nên điều này có thể yêu cầu điều chỉnh cho các quốc gia khác. ( [Nguồn](https://stackoverflow.com/questions/2577236/regex-for-zip-code/2577239#2577239) )
### Tìm Filetype đặc biệt
```javascript
/^(.*\.(?!(htm|html|class|js)$))?[^.]*$/i
```
Khi bạn đang xử lý các định dạng tệp khác nhau như .xml, .html và .js, nó có thể giúp kiểm tra các tệp cả cục bộ và được tải lên bởi người dùng. Đoạn mã này kéo một phần mở rộng tệp để kiểm tra xem nó có hợp lệ từ một loạt các tiện ích mở rộng hợp lệ có thể thay đổi khi cần không. ( [Nguồn](https://stackoverflow.com/questions/18086473/regular-expression-for-extension-of-file/18086622#18086622) )

### Nối rel = hay nofollow vào các liên kết
```javascript
(<a\s*(?!.*\brel=)[^>]*)(href="https?://)((?!(?:(?:www\.)?'.implode('|(?:www\.)?', $follow_list).'))[^"]+)"((?!.*\brel=)[^>]*)(?:[^>]*)>
```
Nếu bạn đang làm việc với một loạt mã HTML, việc áp dụng lao động thủ công vào các nhiệm vụ lặp đi lặp lại có thể là khủng khiếp. Biểu thức thông thường là hoàn hảo cho dịp này và chúng sẽ tiết kiệm rất nhiều thời gian.

Đoạn mã này có thể làm cho tất cả các liên kết neo từ một khối HTML và nối thêm thuộc tính **rel="nofollow"** vào mỗi phần tử.

### Tìm một chuỗi Base64 hợp lệ trong PHP

```javascript
\?php[ \t]eval\(base64_decode\(\'(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?){1}\'\)\)\;
```

Nếu bạn là một nhà phát triển PHP thì đến một lúc nào đó bạn có thể cần phân tích cú pháp mã để tìm kiếm các đối tượng nhị phân được mã hóa Base64. Đoạn mã này có thể được áp dụng cho tất cả các mã PHP và sẽ kiểm tra mọi chuỗi Base64 hiện có. ( [Nguồn](https://snipplr.com/view/57477/find-valid-base64-string-in-php-files/) )

### Địa chỉ IPv4
```javascript
/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/
```

Tương tự như một địa chỉ email, địa chỉ IP điển hình được sử dụng để xác định một máy tính cụ thể truy cập Internet. Biểu thức chính quy này sẽ kiểm tra một chuỗi để xem nó có tuân theo cú pháp địa chỉ IPv4 không. ( [Nguồn](https://snipplr.com/view/43002/regex--match-ipv4-address/) )


### Địa chỉ IPv6

```javascript
(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))
```
Ngoài ra, bạn có thể muốn kiểm tra một địa chỉ cho cú pháp IPv6 với đoạn mã regex nâng cao hơn này. ( [Nguồn](https://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses/17871737#17871737) )

### Kiểm tra phiên bản Internet Explorer
```javascript
^.*MSIE [5-8](?:\.[0-9]+)?(?!.*Trident\/[5-9]\.0).*$
```
Đoạn mã này có thể được sử dụng trong JavaScript để kiểm tra tác nhân trình duyệt dựa trên phiên bản Internet Explorer (5-11) nào đang được sử dụng. ( [Nguồn](https://stackoverflow.com/questions/29296524/regex-to-detect-ie-5-6-7-and-8-but-no-others/29296626#29296626) )

### Kết luận
Con đường để làm chủ Regex rất dài nhưng sẽ rất bổ ích nếu bạn gắn bó với nó. Ngoài các công cụ Regex điển hình , cách tốt nhất để nghiên cứu nó là thông qua sự lặp lại. Hãy thử xây dựng các ứng dụng Ưeb dựa trên các đoạn regex này để tìm hiểu cách chúng hoạt động. Và nếu bạn có các đoạn Regex này hay đề xuất, bạn có thể đăng chúng trong bình luận bên dưới.
Cám ơn các bạn đã đọc bài này của mình.
Happy hacking!!!