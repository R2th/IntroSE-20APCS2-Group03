## SEO ( Search Engine Optimization – Tối ưu hóa cho công cụ tìm kiếm )
Ở phần 1, mình đã giới thiệu 1 số [phương pháp tối ưu SEO cơ bản](https://viblo.asia/p/nhung-dieu-can-biet-de-toi-uu-hoa-seo-cho-website-cua-ban-phan-1-GrLZD8B2Zk0), bây giờ mình sẽ tiếp tục liệt kê ra 1 số phương pháp nâng cao hơn nhằm tối ưu hoá SEO để cải thiện thứ hạng website của bạn trên các công cụ tìm kiếm, bắt đầu nào :clap:
#### 1. Assets(Image, Javascript, CSS files) client side caching
Đây là 1 phương pháp nhằm tăng tốc độ load page, khi browser lần dầu request đến website thì server sẽ trả về content và các file assets với response cache headers, sau đó browser sẽ cache các file assets này dựa vào cache headers, những lần tiếp theo browser request đến server thì không cần phải load những file assets đó từ server nữa mà load từ bộ nhớ cache của browser.

Ví dụ khi request trang wikipedia lần đầu tiên thì tổng dung lượng là 1.2 MB
![](https://images.viblo.asia/cb08783a-24c1-496c-8424-b663b0af26e8.png)

Lần request tiếp theo thì hầu hết các file assets đều load từ bộ nhớ cache của browser, do đó tổng dung lượng giảm còn 54.4KB
![](https://images.viblo.asia/f2729f9e-a527-4f9d-a4cd-5918381f5c9a.png)

Quá optimized đúng không nào :stuck_out_tongue_winking_eye:

Vậy cache headers đó bao gồm những thông tin gì?
* Cache-Control: max-age=3600 - File được cache trong khoảng thời gian là 1h (3600s)
* ETag (or Entity Tag) - Là 1 chuổi validation token để browser compare file ở cache memory và trên server có giống nhau hay không
*  Expires - Browser sẽ bỏ qua header này nếu đã có Cache-Control: max-age=3600
*  Last-Modified - Chứa thông tin ngày tháng cuối cùng mà file chỉnh sửa

Ví dụ về 1 response cache headers:
```js
Accept-Ranges: bytes
Cache-Control: max-age=3600
Connection: Keep-Alive
Content-Length: 4361
Content-Type: image/png
Date: Tue, 25 Jul 2019 17:26:16 GMT
ETag: "1109-554221c5c8540"
Expires: Tue, 25 Jul 2019 18:26:16 GMT
Keep-Alive: timeout=5, max=93
Last-Modified: Wed, 12 Jul 2019 17:26:05 GMT
Server: Apache
```


#### 2. Page Cache Test (Server Side Caching)
Cũng là 1 phương pháp tăng tốc độ load page, nhưng cách thức cache này lại được thực hiện ở phía server, mỗi server sẽ có mỗi cách implement riêng hoặc sử dụng các library cache nhằm tránh re-excute scripts hoặc request đến database.

#### 3. Flash
Một Website tối ưu SEO thì không nên chứa các Flash objects, một công nghệ cũ dùng để xử lý và hiển thị các nội dung đa phương tiện (multimedia content). Flash không hoạt động tốt trên các mobile devices, và gây khó khăn cho các search engine khi craw page.

Thay vào đó ta có thể sử dụng HTML5 objects để hiển thị nội dung đa phương tiện như là `video`,  `audio`,  `canvas` tags ...

#### 4. Media Query Responsive
Responsive web design sử dụng `@media` rule cho phép áp dụng nhiều style rules trên nhiều screen sizes khác nhau, đảm bảo nội dung và giao diện luôn tối ưu trên các device khác nhau.

Đi kèm với responsive là thẻ viewport:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

#### 5. Custom 404 Error Page
Mỗi framework sẽ có default 404 error page, sử dụng default page dẫn đến trải nghiệm người dùng không tốt và nhìn không chuyên nghiệp, làm cho users nhầm tưởng là toàn bộ website bị down và sẽ tăng cơ hội leave page.

Vì thế cần một custom 404 error page cung cấp các thông tin chi tiết, help link đến users, nhờ đó tăng trải nghiệm người dùng và phía server cũng có thể log các broken links.

#### 6. URL Canonicalization 
`https://your-website.com` và `https://www.your-website.com` nên trỏ về cùng 1 URL trên server.

Từ `https://www.your-website.com` có thể redirect về `https://your-website.com` hoặc ngược lại, vì sao phải làm như vậy bởi vì nếu cả 2 URL cùng 1 nội dung như nhau thì search engines sẽ khó phân biệt được sẽ nên index URL nào (primary URL).

Hãy thử gõ URL https://www.kutecolor.com vào trình duyệt, bạn sẽ thấy nó luôn redirect về https://kutecolor.com

#### 7. HTTPS (HTTP Secure)
HTTPS là phiên bản secure của HTTP. HTTPS là giao thức gởi/nhận thông tin trên internet mà sẽ có thêm 1 layer encrytion giữa client và server để đảm bảo thông tin truyền đi luôn được mã hoá.

Các search engines luôn đánh giá rank cao một website sử dụng HTTPS.

#### 8. Robots.txt
Khi có một công cụ tìm kiếm thông tin website của bạn, điều đầu tiên mà nó tìm kiếm đến hầu hết là file robots.txt. File này giúp thiết lập việc cho phép bot lập chỉ mục hoặc không cho phép lập chỉ mục ở một khu vực nào đó trong website.

Trong một website có rất nhiều khu vực không nên cho bot tìm kiếm index tới như /admin, /private,… Vì vậy bạn phải thiết lập không cho phép index những khu vực quan trọng thông qua file robots.txt. File robots.txt thường đặt ở root path của website `https://your-website.com/robots.txt` .

File robots.txt gồm những property chính như sau:
* User-agent: xác định các loại công cụ tìm kiếm.
* Disallow: ngăn chặn các công cụ tìm kiếm thu thập thông tin và lập chỉ mục.
* Allow: cho phép các công cụ tìm kiếm thu thập thông tin và lập chỉ mục.

Ví dụ về 1 file robots.txt:
```
User-agent: *
Disallow: /admin/
Disallow: /readme.html
Disallow: /license.txt
Disallow: /?s=*
Allow: /posts/
Allow: /categories/
Sitemap: https://kutecolor.com/sitemap.xml
```

#### 9. Sitemap.xml
Sitemap là một danh lục liệt kê tất cả các mục thông tin, các path trên trang web của bạn. Sitemap được sử dụng trong việc thực hiện tìm kiếm nhanh để tìm ra thông tin cần thiết cũng như trong việc di chuyển thông qua các đường link trên website của bạn. Sitemap giống như là một sơ đồ của website.

Bạn có thể tưởng tượng sitemap tạo ra một lộ trình cho các bot tìm kiếm, và bot tìm kiếm chỉ việc đi theo lộ trình đó mà thu thập và xử lý dữ liệu có trên website của chúng ta. Điều này đặc biệt hữu ích với các trang web mới, hoặc website có nhiều bài viết mới/được update. Sitemap giúp cho công cụ tìm kiếm dò tìm thấy trang của chúng ta nhanh hơn, nhiều hơn, giảm thời gian đáng kể lập chỉ mục. File sitemap.xml thường đặt ở root path của website `https://your-website.com/sitemap.xml` .

Ví dụ về 1 file sitemap.xml:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
        <loc>https://kutecolor.com/</loc>
        <lastmod>2018-11-16T16:21:22+00:00</lastmod>
        <priority>1.00</priority>
    </url>
    <url>
        <loc>https://kutecolor.com/privacy</loc>
        <lastmod>2018-11-16T16:21:22+00:00</lastmod>
        <priority>0.80</priority>
    </url>
    <url>
        <loc>https://kutecolor.com/how-to-read-faster-app</loc>
        <lastmod>2018-11-16T16:21:22+00:00</lastmod>
        <priority>0.80</priority>
    </url>
</urlset>
```

## Kết luận
Ở trên là 1 số phương pháp nâng cao để tối ưu hoá SEO cho webpage. Tất cả các phương pháp mình nêu ra ở trên chỉ là tối ưu hoá SEO, còn muốn tăng rank trên search engine thì các bạn cần làm thêm SEO - OFF Page (nhiều đấy :joy:)

Xin các bạn cho ý kiến và đóng góp thêm những cách để tối ưu SEO hiệu quả hơn :pray: .
Mong rằng bài viết này sẽ có ích cho các bạn. Cảm ơn các bạn đã dành thời gian đọc.