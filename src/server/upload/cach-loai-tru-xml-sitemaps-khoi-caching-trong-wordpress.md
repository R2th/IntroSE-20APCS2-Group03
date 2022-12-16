Sử dụng  caching plugins có lẽ là cách dễ nhất để tăng tốc độ trang web WordPress của bạn. Tuy nhiên, bạn cũng có thể nhận được sitemap của mình được lưu vào bộ nhớ cache và đó không phải là một ý tưởng hay.

XML Sitemaps phải luôn phản ánh các bài đăng và url mới nhất của trang web của bạn để các công cụ tìm kiếm nhận được phiên bản mới nhất của bất kỳ nội dung cập nhật nào.

Trong bài đăng này, mình muốn chia sẻ với bạn cách loại trừ và ngăn chặn các XML Sitemaps bị lưu vào bộ nhớ cache (vô ý) bởi một số plugin WordPress Caching phổ biến nhất.
## W3 Total Cache
Để loại trừ  XML Sitemaps khỏi bộ nhớ đệm bằng cách sử dụng plugin W3 Total Cache, dưới đây là những gì bạn làm:
Đi đến  Performance > Page Cache.
![](https://images.viblo.asia/2bd27279-cbaf-4644-989a-4a8a6750a1a4.jpg)
Cuộn xuống phần có nhãn "Never cache the following pages". Sau đó, nhập các dòng sau vào input.
```
[a-z0-9_\-]*sitemap[a-z0-9_\-]*\.(xml|xsl|html)(\.gz)?
([a-z0-9_\-]*?)sitemap([a-z0-9_\-]*)?\.xml
```
Lưu ý: Nếu bạn đang sử dụng Database Caching, bạn cần phải thêm các dòng tương tự vào "Never cache the following pages" trong Performance Database Cache.
Nếu bạn đang sử dụng Minification, hãy mở Performance > Minify và nhập các dòng giống nhau vào trường  "Never cache the following pages".
Cuối cùng nhưng không kém phần quan trọng, hãy chuyển đến Performance> Browser Cache và đảm bảo cùng một dòng nằm trong phần "404 error exception list".
## WP Super Cache
Để loại trừ  XML Sitemap khỏi bộ nhớ đệm bằng plugin WP Super Cache, dưới đây là những gì bạn làm:
Đi đến Settings > WP Super Cache. Mở Advanced tab.
![](https://images.viblo.asia/685349e7-ff8d-48fe-8a15-5015cdffd658.jpg)
Tìm phần có nhãn "Add here strings (not a filename) that forces a page not to be cached..." và nhập thông tin sau:
```
[a-z0-9_\-]*sitemap[a-z0-9_\-]*\.(xml|xsl|html)(\.gz)?
([a-z0-9_\-]*?)sitemap([a-z0-9_\-]*)?\.xml
```
## WP Rocket
Để loại trừ  XML Sitemaps khỏi bộ nhớ đệm bằng cách sử dụng plugin WP Rocket, dưới đây là những gì bạn làm:
Đi đến Settings > WP Rocket > Advanced Options.
![](https://images.viblo.asia/f651d158-a17e-46be-ba6b-a99858b4950c.jpg)
Cuộn xuống khối có nhãn: "Never cache the following pages". Nhập những dòng này vào trường:
```
[a-z0-9_\-]*sitemap[a-z0-9_\-]*\.(xml|xsl|html)(\.gz)?
  ([a-z0-9_\-]*?)sitemap([a-z0-9_\-]*)?\.xml
```
Lưu ý: Đảm bảo làm sạch bộ nhớ cache của bạn mỗi khi bạn thực hiện những thay đổi này bằng cách sử dụng ba plugin này.