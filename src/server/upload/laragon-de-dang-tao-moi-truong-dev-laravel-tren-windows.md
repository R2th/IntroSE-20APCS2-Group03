![laragon_logo1.png](https://images.viblo.asia/25e32eb1-3b3f-44fe-8d2d-c925a69375f9.png)

Khi bắt đầu học bất cứ một ngôn ngữ lập trình nào chúng ta đều cần thiết lập môi trường cho ngôn ngữ đó. Đặc biệt là đối với những bạn theo back-end ngoài thiết lập môi trường để chạy code còn phải có thêm một số thứ khác như là database, webserver, ... Hiện nay để có thể tạo được môi trường dev Laravel trên Windows ta có thể sử dụng XAMP hoặc Docker. Đối với Docker thì sẽ khá khó khăn đối với những người mới, họ sẽ phải bỏ thời gian ra để học để có thể sử dụng được Docker mà trong khi cái muốn học lại không học được (lol), còn XAMP thì lại gặp khó khăn khi cấu hình(config) như version, port, ... hoặc hiệu năng. Vì vậy trong bài viết này mình sẽ giới thiệu và tạo môi trường dev Laravel với Laragon.

# Laragon

Laragon là phần mềm cung cấp môi trường phát triển trên Windows bao gồm Mysql, PHP, Redis, Apache (WAMP Stack) một cách dễ dàng và nhanh chóng. Ngoài ra ta còn có thể thêm một số ngôn ngữ khác như Python, Ruby, Java, ... hoặc cơ sở dữ liệu khác như MongoDB, PostgreSQL vào Laragon chỉ với vài bước đơn giản. Laragon rất nhẹ, dễ dàng mở rộng và chỉ sử dụng dưới 4MB ram khi chạy. Nó không sử dụng bất cứ services nào của Windows mà có sẵn services của mình. Để có thể có nhiều thông tin hơn về Laragon các bạn có thể tham khảo ở [đây](https://laragon.org/docs/).

# Một số tính năng nổi bật

* **Pretty URLs**: ta có thể dễ dàng tạo tên miền riêng như `viblo.local` thay vì `localhost`.
* **Portable**: dễ dàng di chuyển thư mục Laragon đến bất cứ đâu như USP, máy tính khác, ... mà không cần lo lắng liệu có lỗi hay project có không chạy được không.
* **Isolated**: Laragon là một môi trường độc lập với hệ điều hành giúp giữ cho hệ điều hành của bạn "clean".
* **Easy Operation**: Laragon tự động config tất cả mọi thứ giúp ta có thể dễ dàng thêm hoặc thay đổi phiên bản của PHP, Python, Java, Go, Apache, ...
* **Modern & Powerful**: Laragon giúp ta hoạt động với hai webserive Apache và Nginx và quản lý chúng. Hỗ trợ cài đặt SSL, cmd, các thao tác với cơ sở dữ liệu, public project lên với khách hàng, gửi mail từ local, ...

# Cài đặt
Để cài đặt Laragon bạn hay lên trang chủ để tải về hoặc vào liên kết [này](https://laragon.org/download/) để tải về. Bạn hay tùy chọn phiên bản mà mình muốn cài đặt, tùy từng bản mà sẽ có những cấu hình khác nhau. Nhưng cũng đừng lo lắng là bản mình tải về có đầy đủ những thứ cần thiết không vì ta hoàn toàn có thể thêm nó sau khi cài đặt xong. Việc của bạn chỉ là tải Laragon về chạy lên và `Next` -> `Next` -> `Next` mà thôi.

Ở đây mình sẽ giải thích về một số cấu hình trong lúc cài đặt.

![gon1.jpg](https://images.viblo.asia/b0f41a2b-9979-479c-a0e8-9b7022954f26.jpg)

* **Run Laragon when Windows starts**: Laragon sẽ được khởi động khi Windows chạy (tức là mỗi lần bạn bật máy tính thì mặc định Laragon sẽ được chạy).
* **Your app will get pretty url**: giúp tạo luôn tên miền riêng ở đây mặc định sẽ là `{name}.test`
* **Quick ways to open Text Editor & Command Prompt**: ta có thể dễ dàng mở cmd trong project.

# Giao diện và thực hiện một số tính năng

Laragon sẽ có giao diện như sau.

![demo1.jpg](https://images.viblo.asia/acf910cf-108e-4e11-86b9-32a6586eb41b.jpg)

Vì ở đây mình chưa cài thêm gì nên sẽ chỉ hiện Apache và MySQL. Khi các bạn bấm vào web Laragon sẽ mở trình duyệt dẫn đến `localhost`.

Vào cài đặt `Prefences` ta có thể thấy một số ngôn ngữ, thay đổi `root document`, `pretty urls`, `mail catcher`, `mail sender`, ...

![2.jpg](https://images.viblo.asia/29697d5b-158d-4bdb-91f6-c7277002fdcb.jpg)

Từ hostname template thì trong thư mục `laragon/www` mình có một project là viblo khi vào trình đuyệt ta sẽ có url là `viblo.local`.

![local.jpg](https://images.viblo.asia/e7ec493a-9967-4539-9b3e-b459faca870e.jpg)

Để có thể thêm một package mới vào Laragon ta vào `Tools -> Quick add -> Chọn package muốn thêm`. Ở đây mình sẽ thử add thêm `yarn`.

![qqqq (2).png](https://images.viblo.asia/6428d827-4ac8-451a-9ce8-bb75b9dcdae8.png)

Sau khi đã cài đặt xong các bạn vào cmd để kiểm tra và gõ `yarn -v`.

![yarn.jpg](https://images.viblo.asia/ba957183-eb75-40fd-a3a5-19d5c0891bd8.jpg)

Để share project đến bạn bè hay khách hàng thì ta vào `www -> Share -> Chọn tên project` (Laragon sẽ list ra các project trong thư mục `laragon/www`). Sau đó một cửa sổ cmd sẽ được mở ra và chạy `ngrok`.

![share (2).png](https://images.viblo.asia/18d45265-fd9f-41a5-b76b-6d14de37d751.png)

![ngrok.jpg](https://images.viblo.asia/fd123fca-b50f-4d7a-8fff-c1a7e0ae692d.jpg)

# Tổng kết

Qua bài viết này mình và các bạn đã cùng tìm hiểu và cách sử dụng Laragon. Hy vọng qua bài viết này các bạn có thể dễ dàng tạo được môi trường dev Laravel hay các ngôn ngữ khác với Laragon. Cảm ơn các bạn đã theo dõi đến hết bài viết.