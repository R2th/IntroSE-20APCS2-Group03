__Khi bạn tìm kiếm google để deploy một Rails app, bạn sẽ nhìn thấy một loạt các cái tên như Apache, Unicorn, Puma, Phusion Passenger, Nginx, Rainbows,... vô vàn cái tên khác nữa.
Tất cả chúng có vẻ đều phù hợp cho "deploying Rails", nhưng có một từ chỉ ra sự khác biệt giữa chúng. Một số là `web servers` và số còn lại là `app servers`.__

__Khi bạn hiểu rõ cái nào là cái nào, và chúng nằm chỗ nào trong hệ thống của bạn thì việc deploy sẽ có ý nghĩa hơn rất nhiều. Tuy nhiên sự phân biệt giữa chúng không phải lúc nào cũng rõ ràng.__

__Thế nào là một web server, nó khác gì với một app server? Có thể chỉ dùng 1 cái mà ko cần cái còn lại không? Rồi Rack nó nằm ở xó nào đây???__

# Thế nào là một web server?
Web server là một chương trình nhận request từ trang web của bạn và làm 1 vài xử lý cho request đó. Sau đó sẽ chuyển request đó cho Rails app. `Nginx` và `Apache` là 2 ông lớn web server mà bạn sẽ đụng độ.

![](https://images.viblo.asia/40b60195-ce39-4103-9118-5af5b6d4e9f7.png)

Nếu request đó là thứ gì đó không thường xuyên bị thay đổi, ví dụ như một file CSS, JS hay hình ảnh, thì có thể request này không cần đến tay Rails. Web server có thể tự xử lý được mà không cần báo với app, nó sẽ nhanh hơn theo cách này.

Web servers có thể xử lý các SSL requests, cung cấp các file tĩnh và assets, nén các request lại, và có thể làm được một số việc mà hầu hết mọi website cần. Và nếu Rails app cần xử lý request, web server sẽ chuyển request đó cho app server.

# Thế nào là một app server?
App server là thứ thực sự chạy trong Rails app của bạn. App server tải code của app lên và giữ app đó trong bộ nhớ. Khi app server nhận được request từ web server, nó sẽ báo lại cho Rails app. Sau khi app xử lý xong request đó, app server sẽ gửi response lại cho web server (và cuối cùng là cho người dùng).

Bạn có thể chạy hầu hết các app servers một mình, không cần có web server. Đó cũng chính là những gì bạn đã làm ở môi trường `development`. Ở môi trường `production`, thường phải cần một web server đặt phía trước. Nó sẽ xử lý nhiều app một lúc, render assets nhanh hơn và xử lý với nhiều request.

Có cả tá app servers cho Rails app, như Mongrel, Unicorn, Thin, Rainbows, and Puma. Mỗi cái có một thế mạnh riêng, nhưng xét cho cùng, chúng đều làm cùng 1 việc - giữ cho app chạy và xử lý các requests.

# Thế còn Passenger thì sao?
[Phusion Passenger](https://www.phusionpassenger.com/) có 1 chút khác biệt. Trong "standalone mode", nó hoạt động giống như một app server. __Nhưng có còn có thể được build ngay bên trong 1 web server, nên bạn không cần một app server riêng để chạy Rails app__.

Điều này thật sự tiện lợi, đặc biệt nếu bạn đang có dự định chạy nhiều apps và không muốn tốn thời gian cho việc setup một app server cho từng Rails app. Sau khi cài đặt Passenger, bạn chỉ cần trỏ web server trực tiếp vào Rails app (thay vì trỏ vào một app server), và Rails app sẽ bắt đầu xử lý các requests.

__Passenger là một lựa chọn tuyệt vời, nhưng có một app server tách biệt vẫn tốt hơn =))__. Giữ app server tách biệt sẽ giúp bạn linh động hơn trong việc chọn một app server phù hợp nhất với mục đích, và bạn có thể nâng cấp, thay thế nó về sau dễ dàng hơn.

# Vậy Rack thì sao?
[Rack](https://rack.github.io/) thì vi diệu lắm :3 nó cho phép bất cứ app servers nào chạy được Rails app. (hoặc Sinatra app, hoặc Padrino app,…)

Bạn có thể coi Rack là một ngôn ngữ chung cho các web frameworks của Ruby (Rails là 1 trong số đó) và app servers để 2 bên có thể giao tiếp với nhau. Bởi vì cả 2 bên đều "nói" cùng một ngôn ngữ nên Rails có thể "giao tiếp" với Unicorn và ngược lại mà Rails và Unicorn không cần phải biết gì về nhau.

# Vậy chúng liên hệ với nhau ra sao?
Hummm, tất cả chúng làm thế nào để hoạt động với nhau?

Trong số những phần này, một web request sẽ đến web server trước. Nếu đó là một request mà Rails có thể xử lý, web server sẽ có một vài xử lý với nó và trao lại nó cho app server. App server dùng Rack để giao tiếp với Rails app, khi app làm việc xong với request đó, Rails app sẽ gửi response lại cho app server và web server gửi lại phản hồi cho kẻ đang dùng app.

Cụ thể hơn, Nginx có thể gửi request cho Unicorn. Unicorn đưa request đó cho Rack, đưa nó tới Rails router để gọi đến đúng controller. Sau đó phản hồi lại (theo một đường khác).

---
Đây chỉ là overview đã được đơn giản hoá. __Nhưng sẽ giúp bạn đặt ứng dụng của mình đúng nơi, đúng tinh thần với từng phần__.

Sau khi bạn đã hiểu được app servers và web servers hoạt động chung như thế nào, bạn sẽ dễ dàng hơn rất nhiều trong việc debug các vấn đến đề liên quan đến server khi bạn gặp phải.

Lược dịch từ [justinweiss](https://www.justinweiss.com).