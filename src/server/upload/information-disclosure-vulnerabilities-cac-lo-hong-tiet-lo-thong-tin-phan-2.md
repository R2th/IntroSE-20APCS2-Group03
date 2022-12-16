## III. Phân tích và khai thác các lỗ hổng tiết lộ thông tin - Information disclosure vulnerabilities

### 1. Thông tin tiết lộ qua các tệp Web crawlers

Web Crawler hay còn được gọi là Web Spider có thể hiểu một con bot/công cụ được thiết kế với mục đích tìm kiếm, thu thập thông tin và lập chỉ mục cho toàn bộ nội dung trong các trang web trên mạng internet.

![](https://i.imgur.com/uExZ2C6.png)

Chúng có khả năng hỗ trợ các công cụ tìm kiếm tìm ra những đánh giá chính xác nhất về dữ liệu của trang web, đồng thời truy xuất nội dung ngay khi có yêu cầu.

Do đó, bằng cách áp dụng các thuật toán tìm kiếm khác nhau cho những dữ liệu được thu thập bởi Web Crawler, các công cụ tìm kiếm có thể cung cấp liên kết đáp ứng yêu cầu truy vấn của người dùng (Sau khi người dùng nhập từ khoá, một danh sách website liên quan sẽ được hiển thị).

* Tệp tin `robots.txt`:

Chủ yếu dùng để quản lý lưu lượng truy cập của trình thu thập dữ liệu vào trang web và thường dùng để ẩn một tệp khỏi Google. Ví dụ, một tệp tin `robots.txt` có nội dung:

```
User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /
```

Điều này có nghĩa các người dùng thông thường được phép truy cập toàn bộ trang web. Còn đối với con bot **Googlebot** thì không được phép thu thập dữ liệu tại mọi URL bắt đầu bằng `http://example-website/nogooglebot/`.

Đôi khi, tệp tin `robots.txt` chứa các đường dẫn nhạy cảm khiến người dùng cố tình truy cập. Chúng ta có thể truy cập tệp tin này bằng cách thêm `/robots.txt` vào sau URL.

![](https://i.imgur.com/fHiNT7P.png)

* Tệp tin `sitemap.xml`:

Tệp tin `sitemap.xml` chứa các đường link liên kết có nhiệm vụ trích dẫn đến trang website chính. Trong đó, trang web con phải đảm bảo tính rõ ràng, mạch lạc của chúng. Tệp tin này có chức năng chính là định hướng và giúp những bộ máy tìm kiếm đến địa chỉ website, từ đó giúp việc thu thập thông tin nhanh chóng và dễ dàng hơn. Bởi vậy, nó cũng có thể chứa một số đường dẫn nhạy cảm. Chúng ta có thể truy cập tệp tin này bằng cách thêm `/sitemap.xml` vào sau URL.

![](https://i.imgur.com/RjSG0Wv.png)

### 2. Liệt kê tên thư mục

Có được toàn bộ danh sách các tên thư mục giống như một người thám hiểm nắm trong tay một bản đồ chi tiết. Bên cạnh những thư mục công khai cho người dùng truy cập, các trang web còn chứa một số thư mục không công khai nhưng chưa ngăn chặn quyền truy cập từ người dùng. Kẻ tấn công có thể sử dụng một số công cụ liệt kê thư mục với nguyên lý tấn công vét cạn truy cập tới tất cả tổ hợp tên thư mục được sinh ra bởi các chữ cái và kí tự, từ đó thu thập được toàn bộ thư mục của trang web, xác định rõ hơn các phương hướng tấn công.

### 3. Thông tin tiết lộ trong các thông báo lỗi

Các thông báo lỗi có thể xuất hiện trong nhiều trường hợp khác nhau. Chúng có thể xảy ra do mã nguồn lỗi logic hoặc khi hệ thống hoạt động bất thường dưới một tác động nào đó. Ví dụ, một trang web bán hàng hiển thị sản phẩm cho người dùng theo mã định danh `id` với giá trị là một số nguyên dương.

![](https://i.imgur.com/m2saZZs.png)

Như vậy, chúng ta có thể thay giá trị `id` thành các giá trị chữ cái, giá trị kí tự đặc biệt, ...

`https://shopee.vn/ao-so-mi-dai-tay-nam?id=abc`
`https://shopee.vn/ao-so-mi-dai-tay-nam?id='`

Điều này sẽ khiến trang web nhận được một tham số với giá trị không mong muốn và thường đưa ra thông báo lỗi, trong đó có thể chứa một số thông tin thú vị.

Thông báo lỗi có thể để lộ thông tin loại công nghệ sử dụng, phiên bản, ... Nếu đó là một phiên bản công nghệ đã cũ, chúng ta hoàn toàn có thể tìm kiếm một số lỗ hỏng (CVE) xảy ra đối với phiên bản đã cũ đó và khai thác trang web thành công. Và sẽ càng nguy hiểm hơn nếu trang web sử dụng một framework open source (mã nguồn mở) mà có thể tìm thấy toàn bộ source code qua [Git hub](https://github.com/).

Các thông báo lỗi để lộ thông tin nhạy cảm có thể là cơ sở cho kẻ xấu thực hiện các cuộc tấn công **SQL Injection**, **Server-side Template Injection**, ...

#### Phân tích lab [Information disclosure in error messages](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-in-error-messages)

![](https://i.imgur.com/uxiby4Z.png)

**Miêu tả**: Các dòng thông báo lỗi từ trang web này cho chúng ta biết một số thông tin về framework trang web sử dụng. Chúng ta cần tìm ra mã phiên bản của framework này.

![](https://i.imgur.com/RGA0ZHA.png)

Từ giao diện chúng ta thấy đây là một trang web bán hàng, mỗi sản phẩm có mục tùy chọn **View detail** có thể xem thông tin chi tiết sản phẩm.

Khi chọn **View detail** của sản phẩm bất kì, chúng ta được chuyển tới thư mục `/product`.

![](https://i.imgur.com/citaktY.png)

Quan sát thanh URL nhận thấy trang web hiển thị tới giao diện người dùng chi tiết sản phẩm thông qua tham số `productId=1`.

![](https://i.imgur.com/htpOXeM.png)

Từ đây có thể dự đoán tham số `productId` tương ứng với mỗi dòng sản phẩm mang giá trị là số nguyên dương như 1, 2, 3, ... Có thể thay giá trị này thành 2, 3, ... sẽ thấy sản phẩm hiển thị thay đổi (hành động này cũng có thể khiến trang web hiển thị thông tin những sản phẩm chưa được công khai, tuy nhiên vấn đề này chúng ta chưa xét tới tại tình huống này).

Như vậy, chúng ta có thể thay giá trị `productId` thành các kí tự khác số nguyên dương để tạo ra tình huống ngoại lệ (exception) nhằm tìm kiếm một số thông tin thú vị. Chẳng hạn với một số cách như:

- Số nguyên âm: Nhận được thông báo "Not Found". Như vậy kiểu dữ liệu lập trình viên sử dụng cho biến `productId` có thể là **integer** nên trang web không tìm thấy sản phẩm tương ứng với `productId=-5`.

![](https://i.imgur.com/OxAKuHs.png)

- Kí tự chữ cái: Trả về thông báo lỗi với input string "abc", trong đó chứa thông tin phiên bản framework sử dụng - **Apache Struts 2 2.3.31** (Tìm đọc thêm framework này tại [Tổng quan về Struts 2 Framework](https://viblo.asia/p/tong-quan-ve-struts-2-framework-gDVK29Nj5Lj)).

![](https://i.imgur.com/cFYty6Q.png)

- Kí tự đặc biệt: Trả về thông báo lỗi tương tự với kí tự chữ cái.

![](https://i.imgur.com/F19YZv5.png)

Submit phiên bản để hoàn thành thử thách:

![](https://i.imgur.com/cmRGPSE.png)

![](https://i.imgur.com/aeFrXFk.png)

### 4. Thông tin tiết lộ trong tệp phpinfo.php

Đối với các bạn lập trình bằng ngôn ngữ **PHP** sẽ không còn xa lạ với hàm `phpinfo()`. Chúng ta có thể tạo tệp `phpinfo` đơn giản bằng đoạn code sau:

```php=
<?php
    phpinfo( );
?>
```

Khi đó, chúng ta có thể truy cập tệp `phpinfo` bằng cách thêm `/phpinfo.php` vào cuối tên miền của trang web:

`https://example-website.com/phpinfo.php`

Tệp `phpinfo` hiển thị cho chúng ta một số thông tin như:

- Phiên bản PHP hiện tại.
- Thông tin và môi trường của máy chủ.
- Môi trường PHP.
- Thông tin phiên bản hệ điều hành hiện tại.
- Đường dẫn và vị trí của php.ini.
- Các giá trị chính và cục bộ cho các tùy chọn cấu hình PHP.
- Các HTTP header.
- Bản quyền PHP.
- Các mô-đun và tiện ích mở rộng hiện có.
...

![](https://i.imgur.com/DYsE8lR.png)

Tệp `phpinfo` giúp các lập trình viên kiểm tra biến môi trường của PHP, xem cấu hình hosting để chạy những phần mềm cần PHP modules cụ thể được cài đặt sẵn, ... Sẽ thật nguy hiểm nếu những thông tin này cũng công khai đối với tất cả người dùng.

#### Phân tích lab [Information disclosure on debug page](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-on-debug-page)

![](https://i.imgur.com/CJ2MyHP.png)

**Miêu tả:** Trang web chứa một trang debug tiết lộ một số thông tin quan trọng. Chúng ta cần tìm kiếm giá trị biến môi trường **SECRET_KEY**.

Quan sát source code trang web tại trang chủ nhận thấy:

![](https://i.imgur.com/t0OtQA6.png)

Đoạn comment cho biết một đường dẫn `/cgi-bin/phpinfo.php` tới một trang Debug. Được các lập trình viên tạo ra trong quá trình xây dựng sản phẩm (vị trí ở dưới cùng trang web)

![](https://i.imgur.com/Oa31DAs.png)

Khi đưa sản phẩm tới người dùng, theo đúng quy trình cần xóa bỏ tùy chọn này, nhưng lập trình viên hơi "vô trách nhiệm" một chút khi chỉ sửa dòng code này thành comment. Dẫn tới tiết lộ đường dẫn `/cgi-bin/phpinfo.php`.

Truy cập tới `/cgi-bin/phpinfo.php`, giao diện hiển thị các thông tin trong tệp `phpinfo.php`:

![](https://i.imgur.com/Jy8oAi2.png)

Tìm kiếm giá trị biến môi trường **SECRET_KEY**:

![](https://i.imgur.com/4PGCiwd.png)

Submit để hoàn thành thử thách:

![](https://i.imgur.com/6hI1YGK.png)

![](https://i.imgur.com/yzA3flC.png)

Trong tình huống trên, kể cả trường hợp lập trình viên không comment đoạn code chứa đường dẫn tới `/cgi-bin/phpinfo.php` mà xóa hoàn toàn dòng code ấy đi. Thì chúng ta vẫn có thể biết tới đường dẫn này qua một số tool quét thư mục như **Dirsearch**, **Gobuster** hoặc tính năng **Discover content** của Burp Suite.

### 5. Thông tin tiết lộ qua tệp sao lưu - File backup

Khi xây dựng sản phẩm, các lập trình viên cần có các tệp backup dữ liệu nhằm đề phòng những trường hợp xấu nhất xảy ra. Trong thực tế, backup dữ liệu đóng vai trò như một "giáp hồi sinh" khi xảy ra thiên tai, virus, lỗi ổ cứng, ... Đúng ra thì "người anh em sinh đôi" này cần được đặt ở một vị trí an toàn và không cùng vị trí với các dữ liệu đang hoạt động. Tuy nhiên, khi triển khai sản phẩm tới người dùng, nhiều lập trình viên đã ... quên xóa những tệp back up này đi. Dẫn tới kẻ xấu có thể đọc được một phần hoặc thậm chí là toàn bộ mã nguồn sản phẩm!

Một số trường hợp về file backup:

- Các file backup thường được lưu với đuôi `.bak`: ví dụ `backup.java.bak`
- Đối với các file php, các file backup có thể được lưu với đuôi `.phps`
- Trong một số hệ điều hành như **Ubuntu**, khi sử dụng **gedit** làm việc với file sẽ tự động tạo ra một file backup kết thúc bằng `~` (Xem thêm tại [https://help.ubuntu.com/community/gedit](https://help.ubuntu.com/community/gedit)). Khi đó chúng ta có thể thêm kí tự `~` vào sau tên file để tải xuống file backup.
`https://example-website/backup.php~`
- Hoặc khi sử dụng **vim** làm việc với file cũng có thể xuất hiện các file backup. Chẳng hạn, khi đang soạn thảo văn bản với lệnh `vim`, do sự cố nên cửa sổ soạn thảo trực tiếp bị tắt, khi đó hệ thống sẽ tự động tạo ra các file backup với đuôi `.swp`:
![](https://i.imgur.com/GpGThQY.png)
Chúng ta có thể khôi phục các file này bằng lệnh "`vim -r` + **tên file**".
![](https://i.imgur.com/uVB3CdJ.png)

#### Phân tích lab [Source code disclosure via backup files](https://portswigger.net/web-security/information-disclosure/exploiting/lab-infoleak-via-backup-files)

![](https://i.imgur.com/LfeWOKK.png)

**Miêu tả:** Trang web bị lộ file backup trong một thư mục ẩn, chúng ta cần tìm kiếm database password chứa trong file backup đó.

Truy cập tới thư mục `/robots.txt` phát hiện đường dẫn chứa file backup:

![](https://i.imgur.com/iZqQepc.png)

Truy cập tới thư mục `/backup` phát hiện file backup `ProductTemplate.java.bak`:

![](https://i.imgur.com/14Dh7gL.png)

Click vào file `ProductTemplate.java.bak` thu được database password:

![](https://i.imgur.com/iIZPiub.png)

Submit database password để hoàn thành thử thách:

![](https://i.imgur.com/gbai8U9.png)

![](https://i.imgur.com/XwZBCUa.png)

Ngoài việc phát hiện thư mục `/backup` qua tệp `robots.txt` chúng ta cũng có thể sử dụng các công cụ quét đường dẫn web.

- [https://portswigger.net/web-security/information-disclosure](https://portswigger.net/web-security/information-disclosure)
- [https://en.wikipedia.org/wiki/Robots_exclusion_standard](https://en.wikipedia.org/wiki/Robots_exclusion_standard)
- [https://en.wikipedia.org/wiki/Sitemaps](https://en.wikipedia.org/wiki/Sitemaps)
- [https://www.php.net/manual/en/function.phpinfo.php](https://www.php.net/manual/en/function.phpinfo.php)