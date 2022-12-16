Vừa rồi mình có giúp 1 người bạn sửa lỗi không thể vào được gmail từ chrome.

Lỗi này thường sẽ có thông báo như sau: net::err_cert_authority_invalid
![](https://images.viblo.asia/8bfc8504-54cb-445c-b660-32fff29177d0.png)

Và sau khi search google mỏi mệt thì đa phần sẽ nhận được các hướng dẫn như:
1. Cài đặt lại ngày giờ.
2. Kiểm tra các phần mềm diệt virus.
3. Thay đổi config trong regedit.
4. Gỡ chrome ra, xóa cache, và cài đặt lại.
5. Sử dụng trình duyệt khác.
6. Mua máy mới.

Và sau tất cả những cách trên đều không được, thì các bạn hãy áp dụng cách cuối cùng này nhé!

### Bước 1: Các bạn mở cửa sổ command prompt (Win+r => cmd):
- rồi gõ lệnh: certutil -f -verifyCTL AuthRootWU.
P/s: với 1 số bản win cũ sẽ bị báo lỗi -verifyCTL thì các bạn download trực tiếp từ link sau:
https://secure.globalsign.net/cacert/Root-R2.crt

![](https://images.viblo.asia/d2931fc5-c57c-45eb-878b-75ad60ec1729.png)

### Bước 2: Sau đó các bạn cài đặt theo hình như sau:

![](https://images.viblo.asia/346ee1c8-50b7-4f46-b16b-6b1cf07c0b8c.png)

![](https://images.viblo.asia/6ea2dffa-60be-4ba1-bade-2debf2a8e3ec.png)

![](https://images.viblo.asia/00b0b61f-6c38-4a9c-9798-fc84c3bf018c.png)

![](https://images.viblo.asia/7d3a0c75-6e25-46a3-81a8-ccd9191592ba.png)

![](https://images.viblo.asia/94cd882b-2154-4fe1-b3e8-12dc583e1f7b.png)

Và cuối cùng là bật lại chrome, thử vào lại gmail để tận hưởng thành quả nhé ;)

Chúc các bạn thành công ^_^

Nguồn tham khảo: https://textslashplain.com/2017/10/23/google-internet-authority-g3/