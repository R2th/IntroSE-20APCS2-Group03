Khi sử dụng heroku, chúng ta thường phải trả money để có  SSL Certificates và đặc biệt khi public 1 app lên apple store thường bị reject vì server không support IPv6. Với Cloudflare, bạn có thể thiết lập SSL heroku trên heroku hoàn toàn miễn phí và giúp cho server sử dụng heroku của bạn có thể support IPv6. Sau đây mình sẽ giới thiệu các bước để thiết lập cloudflare với heroku nhé!
### Thêm custom domain cho heroku app.
Bạn có thể tham khảo theo hướng dẫn của heroku: [Custom Domain Names for Apps](https://devcenter.heroku.com/articles/custom-domains)
### Add site to cloudflare
Vào link https://dash.cloudflare.com/ đăng kí account và add domain đã thêm vào cloudflare
![](https://images.viblo.asia/d9f35676-8d01-4cb0-801c-b9ddcba88f45.png)
Sau khi thêm bạn sẽ có được 2 Nameservers, Nếu domain không phải do cloudflare quản lí bạn cần trỏ nó đến 2 dns này để active.
### Cấu hình DNS record
![](https://images.viblo.asia/95679a16-9d17-465a-9cab-da36f9f5a959.png)

Sau khi hoàn tất đăng kí chúng ta sẽ được 1 list record dns tương tự như thế này. Các A record đã được tự động fill và không cần sửa.
Bạn cần update lại CNAME với name và value được lấy từ heroku của bạn như sau:

| Type | Name | Value |
| -------- | -------- | -------- |
| CNAME | www | is an alias of example.herokuapp.com |

### DNS propagation 
 Khi bạn cập nhận DNS hoàn tất thì thường sẽ mất từ 24-48 tiếng để hoàn thành, giai đoạn này gọi là DNS progagation, sau khi hoàn thành ta sẽ có:
 
*  http://example.com đã điều hướng về https://example.com
*  http://www.example.com đã điều hướng về https://www.example.com
 
 Bạn có thể test trên command bằng lệnh curl

```
curl -I -L example.com
HTTP/1.1 301 Moved Permanently
Date: Sat, 19 Jan 20189 09:08:44 GMT
Connection: keep-alive
Cache-Control: max-age=3600
Expires: Wed, 24 Jan 2018 00:17:44 GMT
Location: https://example.com/
Server: cloudflare
CF-RAY: 3e1e77d5c42b8c52-SFO-DOG
```

### Page Rules
Để đảm bảo các request luôn luôn được chuyển hướng đến kết nối an toàn, luốn sử dụng ssl, chuyển đến tab page rules và add 1 page rule như sau:

![](https://images.viblo.asia/6b611142-8451-46c0-9009-4f5465631f19.png)

Các request http sẽ luôn chuyển tiếp URL với chuyển hướng mã 301, ngoài việc chuyển hướng đến https bạn cũng có thể chuyển hướng đến 1 domain khác. ví dụ:
* `http://example.com/* `

    chuyển hướng mã 301 đến
* ` https://www.example.com/$1`

### SSL và IPv6
Ở tab net work , bạn có thể thấy IPv6 luôn luôn được bật.
![](https://images.viblo.asia/b123632c-65ec-48de-a42f-75d5541133b8.png)

Kiểm tra ở tab crypto chắc chắn răng chọn option full ssl, để biết thêm chi tiết bạn có thể click vào help

![](https://images.viblo.asia/c23d9365-f309-4f09-a2ff-d705c226a6cc.png)

Ngoài ra, với cloudflare bạn còn có thể chặn hoặc cho phép 1 địa chỉ ip truy cập, và cũng sẽ có một số địa chỉ ip của chúng ta cũng bị cloudflare cho vào blacklist của nó nên dẫn đến trường hợp khi client gọi server sẽ bị dừng ở đây và bắt buộc phải nhập mã catpcha để tiếp tục, bạn có thể tắt hoặc thiết lập khác chức năng này ở tab firewall.

![](https://images.viblo.asia/21c947bc-bafd-4c9e-88a2-d595ff8b752b.png)

Với các bước đơn giản như trên, bạn đã có được ssl miễn phí cùng với IPv6 cho server heroku :D