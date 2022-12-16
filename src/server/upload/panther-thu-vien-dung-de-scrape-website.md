### Tản mạn 1 xíu

Vào một ngày nọ, khi nhận được 1 ticket yêu cầu lấy đường dẫn cuối cùng của 1 link rút gọn và lấy cookie của 1 trang web bất kỳ từ phía server, tôi đã thay đổi trạng thái của ticket sang "*In-Progress*". Nhưng 1 hồi sau đó thì gặp....

**Vấn đề 1**: Việc lấy đường dẫn cuối cùng của 1 link rút gọn dường như có thể sử dụng CURL (PHP). Nhưng đời không như mơ, khi cái link rút gọn đấy lại dẫn đến 1 trang web chứa đoạn mã redirect bằng javascript và thế thì không thể lấy được đường dẫn cuối cùng mà mong muốn.

**Vấn đề 2**: Việc lấy cookie của 1 trang web bất kỳ từ phía server như cách thông thường có vẻ như... no hope !!

Và rồi khi đã định comment "The ticket is not support....." vào ticket thì ông bụt đã hiện lên và thỏ thẻ vào tai mình là thử **symfony/panther** đi, thử **symfony/panther** đi.

Thôi không dài dòng nữa. Mình thử **Panther** và đã thành công giải quyết được 2 vấn đề trên. Còn làm như nào thì mình sẽ hướng dẫn bên dưới nhé. It's easy !! 

### Cài đặt và sử dụng
**Cài đặt Panther:**
```
composer req symfony/panther
```
**Cài đặt Drivers:**
```
composer require dbrekelmans/bdi
vendor/bin/bdi detect drivers
```
**Sử dụng:**
```
/* khởi tạo 1 trình duyệt chrome ảo */
$client = Client::createChromeClient();

/* mở 1 request với link rút gọn bằng phương thức GET */
$client->request('GET', 'https://stvkr.com/click-DQWEJ-FMEQ54?tl=1');

/* lấy đường dẫn cuối cùng sau khi đã được redirect */
$lastUrl = $client->getCurrentURL();

/* lấy coockie của trang web */
$cookies = $client->getCookieJar()->all();
```

**Lưu ý:**
Khi sử dụng nên tránh việc chạy cùng lúc 2 trình duyệt ảo vì có thể bị gặp lỗi về "**the port is already in use**". 

### Mở rộng
Ngoài những lợi ích trên thì Panther có thể được sử dụng để crawl data của trang web thông thường hoặc những trang web được render bằng 100% javascript.

---
Bài viết đến đây là hết rồi. Nếu các bạn cảm thấy hữu ích thì vote cho mình nhé. Hoặc có gì góp ý thì hãy comment bên dưới. Thank you!!


**Tài liệu tham khảo:** 
[https://github.com/symfony/panther](https://github.com/symfony/panther)