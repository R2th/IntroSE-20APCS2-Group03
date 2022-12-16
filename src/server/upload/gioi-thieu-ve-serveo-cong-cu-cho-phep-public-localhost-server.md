<div align="center">

# Lời mở đầu
</div>

Với phương châm của Viblo là chia sẻ kiến thức thì ngày hôm nay mình xin giới thiệu tới các bạn về một công cụ mình thấy khá là hay ho trong qua trình phát triển phần mềm, đó chính là **Serveo**.

Vậy Serveo là gì? Dùng để làm gì? Dùng như thế nào?  Chúng ta hãy cùng đi vào tìm hiểu thêm nhé.

<div align="center">

# Nội dung
</div>

<div align="center">

## Bài toán đặt ra
</div>

![](https://images.viblo.asia/90f9676b-c907-499c-a96a-19b1ef3d15b3.jpg)

Chắc hẳn bạn nào theo ngành lập trình cũng từng xem qua bức ảnh này rồi đúng không ? (nếu không thì giờ xem cũng không muộn ^^ )

Bài toán đặt ra ở đây là server localhost của bạn thì chỉ có một mình bạn xem được.  

Vậy bây giờ tôi muốn đưa server localhost của mình public lên trên internet để những người khác cũng có thể truy cập thì phải làm thế nào?

Câu trả lời cho bạn chính là **Localtunnel**.

<div align="center">

## Localtunnel là gì
</div>

**Localtunnel** là một "loại công cụ" cung cấp đường hầm (**tunnel**) liên kết localhost của bạn và mạng internet để bạn có thể truy cập vào localhost giống như một server bình thường. 

Và một số công cụ khá phổ biến gồm có:

+ [**Localtunnel.me**](https://localtunnel.github.io/www/)
+ [**Ngrok**](https://ngrok.com/)
+ [**Serveo**](https://serveo.net/)

Nhưng trọng phạm vi bài viết này, chúng ta sẽ tìm hiểu về  Serveo thôi nhé!

> Tại sao lại là Serveo mà không phải những công cụ khác?

> Câu trả lời rất đơn giản, vì nó free, không cần cài đặt và đăng kí tài khoản.

<br>

Trước tiên ở localhost mình có một project test như hình ảnh bên dưới (hơi xấu tí anh em thông cảm nha ^^)

![](https://images.viblo.asia/253bb21a-f466-43ca-9a86-b7c450d9f8b3.jpg)


Và ở phần demo, mình sẽ thử truy cập localhost của mình thông qua điện thoại xem thế nào nhé.

<div align="center">

## Serveo
</div>

Tuy nhiên lựa chọn free này chỉ áp dụng cho người dùng cá nhân dùng để thử nghiệm, vì vậy chỉ có thể sử dụng **tối đa là 3 tunnel cùng lúc**. Nếu muốn sử dụng nhiều hơn, hãy sử dụng phiên bản dành cho doanh nghiệp hoặc có thể email để xin xỏ thử xem (trên trang chủ ông ấy viết thế mà)

> Email me at trevor@serveo.net if you're interested in licensing Serveo for business use or otherwise need more than 3 tunnels at a time.

<br>

Và đây là kết quả khi mà mình truy cập vào từ điện thoại di động (mình dùng 4g nhé, không lại bảo là dùng mạng LAN)
![](https://images.viblo.asia/f03095f6-5e2d-48ec-af40-97eb16e78179.jpg)

- **Khởi tạo tunnel**

    Tại sao lại là địa chỉ cernuus.serveo.net? Thì các bạn hãy để ý hình ảnh bên dưới, khi chạy câu lệnh 

    ```bash
    ssh -R 80:localhost:80 serveo.net
    ```
    thì serveo sẽ sinh ra cho chúng ta 1 đường dẫn xxxxxxx.serveo.net với phần subdomain là sinh ngẫu nhiên với mỗi địa chỉ IP (restart lại thì nó vẫn là subdomain cũ thôi).  Và sau khi có thiết bị kết nối với địa chỉ localhost của bạn thì thông tin các request sẽ được hiển thị trên **commandline** như bên dưới.

![](https://images.viblo.asia/b8790e8e-ac33-4c3a-a77c-5e63ea591e0a.jpg)

- **Khởi tạo nhiều tunnel cùng lúc:**

    Ví dụ bạn có N project chạy ở localhost (N <= 3 vì bản free chỉ cho chạy tối đa 3 tunnel cùng lúc thôi) thì bạn chỉ cần lặp lại đoạn `-R 80:localhost:port` N lần là có thể chạy đồng thời.

    ```bash
    ssh -R 80:localhost:80   -R 80:localhost:8000 serveo.net
    #ở đây mình chạy 2 project, 1 cái chạy cổng 80, 1 cái chạy cổng 8000
    ```


- **Chỉ định subdomain:**

    Nếu như bạn muốn sử dụng 1 subdomain cụ thể thì chỉ cần truyền thêm vào trong câu lệnh như sau:

    ```bash
    ssh -R subdomain:80:localhost:port serveo.net
    ssh -R subdomain.serveo.net:80:localhost:port serveo.net
    ```

    Ở đây mình sử dụng subdomain **lovelqd**:

![](https://images.viblo.asia/acb00347-c676-4e30-abc8-e5d71cf756b1.jpg)

- **Tuỳ chỉnh domain mong muốn:**

    Nếu bạn muốn sử dụng subdomain ngẫu nhiên này thì bạn cũng có thể truyền vào một subdomain mà bạn muốn. Tuy nhiên sẽ hơi lằng nhằng 1 chút vì dính dáng đến **ssh key** (tạo và lấy ssh-key như thế nào thì các bạn tự search gg nhé). 

    Sau khi lấy được fingerprint (của mình là `SHA256:KTLNcMgKeg6jIcmrClEfA9svM/F3/vMqt1NlXL/Dbjo`) thì bạn cần thêm 2 bản ghi DNS cho dơmain của bạn.

    - 1 bản ghi A chỉ đến địa chỉ IP  
    - 1 bản ghi TXT thì điền fingerprint vào chỗ `authkeyfp=[fingerprint]`

    (nếu bạn nào chưa biết về cấu hình DNS thì có thể tham khảo thêm trong [bài viết này](https://viblo.asia/p/zimbra-mail-server-on-centos-part-1-bJzKmWEwl9N#_2-cai-dat-va-cau-hinh-dich-vu-dns-domain-name-service-1) của mình)

    Sau khi đã cấu hình DNS xong thì bạn có thể tạo tunnel đến domain của bạn với câu lệnh:
    ```bash
    ssh -R your.domain:80:localhost:80 serveo.net
    ```

- **Tuỳ chỉnh thời gian timeout:**

    Nếu bạn sử dụng thì sẽ để ý thấy là cứ sau 1 khoảng thời gian nhất định thì các tunnel này sẽ tự động đóng. Để thiết lập thời gian sống cho các tunnel này thì bạn chỉ cần thêm `-o ServerAliveInterval=TIME` vào trong câu lệnh khởi tạo tunnel.

<div align="center">

# Lời kết
</div>

Trên đây là một số thứ mình tìm hiểu được về serveo muốn chia sẻ lại với mọi người (vì mình tìm trên google tài liệu về Serveo không có tiếng Việt, chắc là nó cũng mới ra), hy vọng nó giúp ích cho các bạn.

Xin cảm ơn đã đọc bài của mình và hãy upvote ủng hộ mình ra thêm những bài viết chất lượng hơn nhé!

<div align="center">
    
# Tài liệu tham khảo
</div>

- Trang chủ: https://serveo.net/
- Google: https://www.google.com/