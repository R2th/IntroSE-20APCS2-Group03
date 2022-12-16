<div align="center">
    
# Lời nói đầu
</div>

Nếu bạn là một người làm trong ngành CNTT, chắc hẳn bạn không còn lạ lẫm gì với khái niệm `giao thức`. Đơn giản đó là `phương THỨC` `GIAO tiếp` để trao đổi thông tin giữa máy các máy tính với nhau thông qua mạng máy tính. Và nhắm mắt các bạn cũng có thể kể ra một vài giao thức phổ biến (mà kể tên thì liên quan gì đến nhắm mắt nhỉ :scream::scream::scream::scream:)
- **http/https**: cái này chúng ta sẽ tìm hiểu sâu hơn trong bài viết
- **tcp (Transmission Control Protocol)**: là giao thức điều khiển truyền vận, tạo kết nối giữa các máy tính với nhau để có thể trao đổi dữ liệu hoặc các gói tin một cách đáng tin cậy và đúng thứ tự.
- **ftp (File Transfer Protocol)**: là giao thức truyền tập tin, thường dùng để trao đổi tập tin qua mạng lưới truyền thông dùng giao thức **TCP**.
- **smtp (Simple Mail Transfer Protocol)**: là giao thức truyền tải thư tín đơn giản, một chuẩn truyền tải thư điện tử qua mạng Internet.

Nhắc lại chút kiến thức vậy thôi, giờ chúng ta hãy cùng đến với nhân vật chính của bài viết nào, đó chính là **http** và **https**!

<div align="center">
    
# Nội dung
</div>

<div align="center">
    
## Http và Https
</div>

- **http (HyperText Transfer Protocol)** là giao thức truyền tải siêu văn bản. Đây là một giao thức ứng dụng trong bộ các giao thức TCP/IP (gồm 1 nhóm các giao thức nền tảng cho internet). Giao thức này hoạt động dựa trên mô hình Client-Server, máy Client (người dùng) sẽ gửi một request tới Server HTTP và Server sẽ lần lượt trả lại các response tương ứng (http mặc định sử dụng port **80**).

    Khi Server trả về RESPONSE thì sẽ có 1 status code (phổ biến nhất có lẽ là 200, 404 và 500) và dữ liệu từ server. Nếu muốn tìm hiểu thêm về nhiều HTTP STATUS CODE khác mà bạn có thể tìm hiểu [tại đây](https://viblo.asia/p/tim-hieu-ve-http-response-status-code-gDVK2MgX5Lj).

![](https://images.viblo.asia/6fd97415-4dd2-4621-aee6-2f914c53635e.png)
<div align="center">
        
mô hình hoạt động của http
</div>

- **https (HyperText Transfer Protocol Secure)** là giao thức http có sử dụng thêm **SSL (Secure Sockets Layer)** để mã hóa dữ liệu trong lúc truyền tải dữ liệu, từ đó tăng thêm tính an toàn cho việc truyền dữ liệu giữa Client và Server (dùng port **443**).
    
- **Vậy thì http và https cái nào tốt hơn?**
    
    + Hiện nay https chủ yếu được dùng cho các trang web có giao dịch trực tuyến sử dụng các loại thẻ thanh toán để đảm bảo an toàn cho giao dịch, tránh những rủi ro bị lấy mất thông tin thẻ trong quá trình thanh toán. Khi vào 1 trang web mà thấy thế này, chắc bạn cũng sẽ cân nhắc lại về việc sử dụng nó chứ
    
    ![](https://images.viblo.asia/34511f32-b0d1-4837-a9b1-bbd3371f0048.png)

    + Ngoài ra web sử dụng giao thức https cũng là 1 tín hiệu để Google xếp hàng từ khóa, hỗ trợ cho việc tìm kiếm và SEO, vì vậy hiện nay có rất nhiều trang web đã chuyển qua sử dụng https thay vì http (Như bạn có thể thấy thì [Viblo](https://viblo.asia) cũng đang sử dụng https)

    => từ 2 điều trên thì chắc là https sẽ tốt hơn rồi, đúng không nào!
    
- Vậy các "coder" có baoh để ý rằng các project chạy trên localhost của bạn luôn là http không? Hôm nay mình sẽ chỉ cho các bạn cách để setup https chạy trên localhost luôn, nhìn cho nó "xịn sò" (như hình bên dưới) ^^

![](https://images.viblo.asia/e42a446f-4216-4f61-a60c-13b9474b8f4e.png)

<div align="center">
    
## Thiết lập Https cho localhost
</div>

Như đã nói ở trên thì https là http có sử dụng thêm SSL (Secure Sockets Layer), và để làm được điều đó, chúng ta cần phải có một Certificate (chứng chỉ) hợp lệ. Và công cụ [mkcert](https://github.com/FiloSottile/mkcert) sẽ giúp chúng ta làm được điều đó.

Nói một cách đơn giản thì `mkcert` là một công cụ giúp sinh ra các chứng chỉ để phát triển cho môi trường local mà không cần phải cấu hình quá nhiều thứ lằng nhằng. 

Bắt đầu thôi nào!

<div align="center">
    
### Tự tạo certificate với mkcert
</div>

- **Cài đặt** (thực ra thì vào link github có hướng dẫn hết rồi, nhưng mà thôi, hướng dẫn ở đây luôn để bạn đỡ mất công click sang trang khác, mình là người lười nên mình nghĩ mọi người chắc cũng lười như mình :laughing::laughing::laughing::laughing:)

    - **Với Ubuntu**:
        ```bash
        #1. cách 1
            sudo apt install libnss3-tools 
        
            brew install mkcert #nếu bạn sử dụng Linuxbrew(https://docs.brew.sh/Homebrew-on-Linux)
       #2. Cách 2 build từ source code (yêu cầu tối thiểu Go 1.10)
            go get -u github.com/FiloSottile/mkcert
            $(go env GOPATH)/bin/mkcert
               # hoặc 
            tải bộ cài đặt tại địa chỉ https://github.com/FiloSottile/mkcert/releases
        ```
        
        
    - **Với Windows**:
        ```bash
        #1. cách 1: sử dụng Chocolatey
        choco install mkcert
        
        #2. cách 2: sử dụng Scoop
        scoop bucket add extras
        scoop install mkcert
        ```

    - **Với MacOS**:
        ```bash
        #1. cách 1: sử dụng Homebrew
        brew install mkcert
        brew install nss # if you use Firefox
        
        #2. cách 2: sử dụng MacPorts
        sudo port selfupdate
        sudo port install mkcert
        sudo port install nss # if you use Firefox
        ```

- **Tạo certificate**: sau khi đã cài đặt xong, mkcert, chúng ta chỉ cần chạy 1 câu lệnh để sinh ra certificate

    ```bash
    #1. tạo một certificate authority (CA) được lưu ở thư mục mà bạn cài mkcert.
        mkcert -install 
        #certificate-authority này sẽ được cài cho cả trình duyệt (bạn sẽ phải khởi động lại trình duyệt để certificate có thể có hiệu lực)
    
    #2. tạo certificate cho domain name mong muốn
        mkcert "domain-đk-certificate" (bạn có thể đăng kí nhiều domain chỉ với 1 câu lệnh)
        #VD: 
        # mkcert example.com "*.example.com" example.test localhost 127.0.0.1
        # Với câu lệnh trên, bạn đã sinh certificate cho các domain:
        #    - example.com
        #    - "*.example.com"
        #    - example.test
        #    - localhost
        #    - 127.0.0.1
    ```
    
- Sau khi tạo xong certificate, bạn sẽ nhận được 2 file `domain.pem` và `domain-key.pem`. Vậy 2 file này được sử dụng như thế nào?  Hãy cùng xem tiếp nhé!
    
<div align="center">
    
### Cài đặt trên Apache web server
</div>
Sau khi đã có được certificate rồi thì bạn chỉ cần vào config đường dẫn đến certificate cho Apache:

```
<VirtualHost localhost:443>
  ...
  SSLEngine on
  SSLCertificateFile "link-certificate-file"
  SSLCertificateKeyFile "link-certificate-key-file"
  ...
</VirtualHost>
```

Sau khi lưu lại config hãy nhớ restart lại apache nhé!

Và đây là kết quả mình thu được:

![](https://images.viblo.asia/2e50073e-a429-4b2b-a53d-af1ef48a135b.jpg)

<div align="center">

**https**
</div>

Chúc các bạn thành công, nếu có bất cứ vấn đề gì, hãy comment vào bài viết này để mình hỗ trợ nhé, nếu biết mình sẽ giúp, còn nếu không biết thì mình sẽ cố gắng tìm hiểu để giải đáp cho bạn!

<div align="center">
    
# Lời kết
</div>

Ở trên mình có nói việc cài đặt https cho localhost để `nhìn cho "xịn sò"` cho vui thôi. Trên thực tế có thể bạn sẽ cần phải test chức năng mà yêu cầu https trên localhost, lúc ấy hãy nhớ đến bài viết này nhé!

Cảm ơn bạn đã dành thời gian theo dõi bài viết, nếu thấy bài viết này hữu ích,  hãy upvote ủng hộ mình nhé!

<div align="center">
    
# Tài liệu tham khảo
</div>

- Internet protocol: https://vi.wikipedia.org/wiki/Internet_Protocol
- Mkcert: https://github.com/FiloSottile/mkcert