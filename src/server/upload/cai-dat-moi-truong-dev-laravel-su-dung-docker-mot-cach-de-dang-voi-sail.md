# Tại sao lại có bài này

Nay buồn buồn nên ngồi viết lách tí giải sầu...

Cách đây không lâu thì [php8 trình làng!](https://viblo.asia/p/php8-trinh-lang-LzD5dLBY5jY) Mình cũng háo hức đấy, nhưng hiện dự án công ty đang chạy trên php7.4 và không dễ gì đổi môi trường qua lại. Đang dev dở php8 mà cần mở project php7.4 fix nhanh thì thốn lắm. Thế là mình bắt đầu kiếm cách xây dựng môi trường dev Laravel trên Docker :<

Docker là gì? Nếu buộc phải giải thích Docker một cách ngắn gọn, thì ta có thể nói Docker là một nền tảng giúp xây dựng và quản lý môi trường phát triển phần mềm, giúp đơn giản quá trình build, run hay deploy sản phẩm của bạn. Docker làm được điều này vì nó mô phỏng/ảo hoá hệ điều hành mà sản phẩm của bạn yêu cầu.

Còn Laravel thì sao? Laravel là một web php framework với cú pháp biểu cảm, thanh lịch. Nó cung cấp cấu trúc và điểm bắt đầu để tạo ứng dụng web, cho phép bạn tập trung vào việc tạo ra thứ gì đó tuyệt vời trong khi những phần khó nhằn thì để Laravel lo :3 

Là một newcomer đối với Docker, quả thật đọc bao nhiêu bài cũng vẫn thấy nó khoai như thường. Ngoài ra Docker còn là 1 sát thủ ổ cứng, khi mỗi project của nó là 1 image riêng, nên 1 project là vài GB cũng bình thường :sweat_smile: Và như đã nói, `những phần khó nhằn thì để Laravel lo` :kissing_heart: chúng ta hãy nhờ Laravel Sail hỗ trợ mong muốn trải nghiệm php8 mà ko làm ảnh hưởng tới project cũ của mình nào :satisfied::satisfied:

# Laravel Sail
[Laravel Sail](https://laravel.com/docs/8.x/sail) là một giao diện dòng lệnh đơn giản để tương tác với môi trường phát triển Docker mặc định của Laravel. Sail cung cấp một điểm khởi đầu tuyệt vời giúp xây dựng ứng dụng Laravel sử dụng PHP, MySQL và Redis mà không yêu cầu kinh nghiệm Docker trước đó :heart_eyes:

Mặc định Sail sẽ đi kèm với các project mới luôn, còn cái nào chưa có thì các bạn có thể cài thông qua package được. Trong bài viết này mình sẽ giới thiệu Sail bằng cho 1 fresh project luôn.

# Cài đặt Laravel nào
Có nhiều tùy chọn để phát triển và chạy một dự án Laravel trên máy tính của riêng bạn. Trong khuôn khổ bài này, chúng ta sẽ tìm hiểu cách sử dụng [Docker](https://www.docker.com/). Để bắt đầu, chúng ta cần cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop).

Nếu các bạn sử dụng Mac hoặc Linux distribution như Ubuntu thì mọi thứ khá đơn giản. Tuy nhiên với người dùng Windows như mình, thì cần thêm WSL2 thì mới chạy được :sweat_smile: May mắn, mình vừa đẹp sử dụng cái đồ chơi này :grin::grin: nếu các bạn yêu cầu thì mình có thể release thêm 1 bài riêng cho việc setup wsl2 + windows terminal + visual studio code. Trong khuôn khổ bài này, mình sẽ mặc định là các bạn đã có môi trường sẵn sàng cho việc chạy Docker, bạn nào chưa có thì chịu khó google nhé :joy::joy:

![](https://images.viblo.asia/bad3371e-a332-4353-b5a7-f01acb1a3e36.png)

Tiếp theo, chúng ta sẽ kéo Laravel mới về, thông qua câu lệnh gõ vào terminal

```bash
curl -s https://laravel.build/example-app | bash
```

Với `example-app` là tên folder chứa project mới của chúng ta. Các bạn cứ tự nhiên đổi tên theo mong muốn nhé

Sau khi project đã được tạo, bạn có thể điều hướng đến folder chứa project và khởi động Laravel Sail

```bash
cd example-app

./vendor/bin/sail up -d
```

Lần đầu tiên bạn chạy lệnh Sail `up`, các vùng chứa ứng dụng của Sail sẽ được tạo trên máy của bạn. Quá trình này có thể mất vài phút tới vài chục phút. **Đừng lo lắng, các lần khởi động Sail tiếp theo sẽ nhanh hơn nhiều.**

Khi vùng chứa Docker của ứng dụng đã được khởi động, bạn có thể truy cập ứng dụng trong trình duyệt web của mình tại: http://localhost.

Và boom, bạn đã khởi động thành công một ứng dụng Laravel. Không thấy phải cài apache mysql php gì nhỉ :sweat_smile:

<div align="center">

![](https://i.imgur.com/1ayQGFY.gif)
    
 </div>