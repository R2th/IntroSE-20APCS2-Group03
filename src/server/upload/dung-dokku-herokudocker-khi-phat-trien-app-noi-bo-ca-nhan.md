Các bạn lập trình viên, ngoài công việc trên công ty, bạn có tự mình phát triển phần mềm riêng không?
Chắc hẳn khi tự code phần mềm, bạn luôn mong muốn:
Sản phẩm của mình viết ra, sau khi Release sẽ được ai đó  xem, sử dụng. Mặc dù, khi làm những việc này, bạn hiếm khi kiếm được lợi nhuận.

Nếu bạn làm trang web tĩnh, thì đã có các công cụ hỗ trợ như: github.io, firebase hosting...v.v Nhưng nếu là Web Application, thì bạn sẽ không thể sử dụng các Tool kể trên.
Trước đây, Heroku luôn được ưu tiên, được giới lập trình coi như một trong những sự lựa chọn hàng đầu. Tuy nhiên, nó cũng có một số bất tiện khi App sleep...v.v
Chính vì vậy, ngày hôm nay, tôi muốn giới thiệu tới các bạn[ **Dokku**](https://github.com/dokku/dokku)

### Dokku là gì? 

![](https://images.viblo.asia/3329366e-0f11-4fae-95ba-7145a3ef00d8.png)

**Dokku** là PaaS (Platform as a Service) cho Open Source. Nó là 1 application na ná Heroku – và chỉ cần chạy Shell Script là Install được.

Tôi đã cài đặt vào VPS (Virtual Private Server) trên một trang cung cấp dịch vụ có chi phí cực rẻ, có tên là Vultr.

### Trong môi trường phát triển thực tế, Dokku chạy như thế nào?

Về cách cài đặt và hướng dẫn các thao tác cơ bản...v.v: Các bạn tham khảo link dưới đây:

- [Getting Started with Dokku](http://dokku.viewdocs.io/dokku/getting-started/installation/)
- [Dùng thử Dokku – Mini Heroku với Sakura Cloud](https://viblo.asia/p/vyDZOz17Kwj)
 
Cảm giác của tôi lúc mới dùng thử: Nếu sử dụng để tự mình phát triển một ứng dụng nho nhỏ, hoặc trên môi trường Staging, thì Dokku quả là một công cụ khá hữu ích. Người dùng có thể dễ dàng sử dụng các tính năng của nó.
Tuy nhiên, Dokku vẫn còn một số điểm hạn chế như: Nếu không phải là Plug-in (thường là bản beta) thì không sử dụng được; CUI Client không rõ ràng nên đôi khi phải SSH vào Remote Host rồi gõ command..vv.
Tuy nhiên, bạn có thể set domain của riêng mình. Vì vậy bạn có thể lấy được những URL có tên dễ hiểu, bằng cách tạo Sub Domain. Ngoài ra, Dokku còn hỗ trợ thêm Scale App,  Deploy bằng Dockerfile.

### Ưu điểm của Dokku

Ưu điểm có thể kể đến đầu tiên của Dokku, đó là Plugin [dokku-letsencrypt](https://github.com/dokku/dokku-letsencrypt).
Chỉ với 2 dòng lệnh dưới đây, bạn có thể chuyển App của bạn sang dạng HTTPS
```
dokku config:set --global DOKKU_LETSENCRYPT_EMAIL=your@email.tld
dokku letsencrypt myapp
```

Về **Community Plug-in**: Hiện tại đã có thông báo Slack và Web Hook Plugin, nên tôi nghĩ là các bạn có thể thêm liên kết với Service khác nữa.
Nếu đăng ký Public key: bạn có thể add thêm User khác =>  bạn có thể áp dụng trên môi trường Staging...v.v

### Tổng hợp

Nói đến PassS của OSS, thì  Cloud Foundry  đã rất nổi tiếng rồi. Còn Dokku sẽ phù hợp với những service nội bộ, không yêu cầu load lưu lượng lớn.
Cài đặt dễ dàng, nhanh chóng.
Nếu bạn định muốn tự mình viết app, hãy install Dokku về làm thử nhé.
 
**Link bài gốc:**
https://goo.gl/MZ5YyW
 
**Link đánh giá tham khảo:**
https://www.g2crowd.com/products/dokku/reviews

**Sưu tầm & Dịch bài: *Thanh Thảo***