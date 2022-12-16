Hầu hết các Dev Ruby on Rails đều khá quen thuộc với công việc này:
- Mở 1 trình soạn thảo code lên
- Quẩy 1 cơ số mã Ruby bên trong dự án
- Rồi thì bật server ứng dụng lên hoặc deploy lên đâu đó
- Truy cập URL từ 1 trình duyệt bất kỳ và xem thành quả từ đoạn code mình vừa viết :)
- ... easy 

Nhưng có bao giờ, các bạn thắc mắc lý do tại sao chỉ bằng việc viết code ở trình soạn thảo thôi mà lại hiện lên được trình duyệt không? Tại sao thay đổi đường dẫn URL thì nội dung lúc thì thay đổi, lúc lại không ? ...

Ai (cái gì) thực sự đang làm những việc này? Có sự vi diệu nào ở đây không??

Bài viết này hy vọng sẽ giúp bạn trả lời những câu hỏi đó, let's go !!!


## Hành trình vào thế giới Internet

Giả sử bạn muốn hẹn ăn trưa với 1 cô nàng mới quen tại nhà hàng XYZ nổi tiếng nào đó chẳng hạn. XYZ có thể quen thuộc với bạn hay những đã đến đó ăn rất nhiều. Nhưng nếu chỉ nói là XYZ, có thể cô gái đó sẽ không biết và không thể xác định được chính xác nó ở đâu. Thay vào đó, có lẽ bạn nên cung cấp 1 địa chỉ chính xác như đường phố, số nhà của nhà hàng. Bằng cách đó, cô nàng nóng bỏng có thể dễ dàng cung cấp cho tái xế taxi hoặc search và đi theo chỉ dẫn trên map để đến nơi hẹn :)

Máy tính cũng làm việc theo các tương tự như vậy. Khi bạn nhập một tên miền trang web bất kỳ vào trình duyệt, chính là bạn đang cung cấp địa chỉ để máy tính tìm kiếm đến trang web đó.

Ví dụ: bạn tìm đến trang "viblo.asia" chẳng hạn. 

Mặc dù các tên miền kiểu như "viblo.asia" rất dễ nhớ, nhưng nó lại không giúp máy tính của bạn tìm thấy máy chủ của trang đó (bạn đã thấy tương đồng với câu chuyện kể trên chưa). Để tìm ra trang web đó, máy tính cần dịch tên miền đó thành 1 địa chỉ chính xác cho mạng máy tính hiểu, đấy chính là địa chỉ IP (hiểu đơn giản thì nó là viết tắt của của địa chỉ giao thức Internet, bạn có thể search thêm về IP nếu tò mò)

Nó sẽ kiểu dạng giống như thế này `104.27.189.151`. Với loại địa chỉ này, máy tính có thể điều hướng các mạng được kết nói của Internet và tìm đến điểm cần đến.

DNS (viết tắt của hệ thống tên miền) là thứ giúp máy tính của chúng ta dịch tên miền thành địa chỉ IP mà họ đang sử dụng để tìm đến đúng máy chủ mong muốn. Bạn có thể tự thử điều này với trang web của mình bằng 1 tiện ích tên là `dig`, tiện ích này sẽ giúp bạn tra cứu DNS của tên miền. Bạn có thể thử [tại đây](https://toolbox.googleapps.com/apps/dig/)

```
id 41551
opcode QUERY
rcode NOERROR
flags QR RD RA
;QUESTION
viblo.asia. IN A
;ANSWER
viblo.asia. 267 IN A 104.27.189.151
viblo.asia. 267 IN A 104.27.188.151
;AUTHORITY
;ADDITIONAL
```

Hehe, đầu ra có vẻ hơi đáng sợ nhể, nhưng điều cốt lõi ở đây bạn có thể thấy trong câu trả lời trên là: tên miền `viblo.asia` đang được gán với địa chỉ IP 104.27.189.151

DNS chính là 1 sổ đăng ký tên miền được ánh xạ đến địa IP. Khi bạn mua hay sở hữu 1 tên miền nào đó, bạn phải chịu trách nhiệm thiết lập và duy trì ánh xạ này, nếu không mọi người sẽ không thể tìm thấy bạn khi gõ tên miền trên trình duyệt.

Okay, một khi chúng ta đã có địa chỉ IP của máy chủ (server) thì trình duyết sẽ có thể kết nối đến với nó. Cách mà trình duyệt kết nối với máy chủ thực sự khá thú vị. Xem nào để hiểu đơn giản hơn, bạn hãy tưởng tượng đến việc mở 1 kết nối giữa hai người đang nhấc điện thoại lên và quay số gọi cho nhau. Trong thực tế, chúng ta có thể kiểm tra thử bằng cách cài chương trình này trên máy tính, đó là `telnet`. Telnet cho phép bạn mở 1 kết nối "thô" (raw) với bất kỳ máy chủ nào. Ví dụ: telnet 104.27.189.151 sẽ cố gắng mở kết nối đến máy chủ mà chúng ta tìm thấy ở phía trên, trên cổng 80 (cổng 80 là cổng HTTP mặc định).

![](https://images.viblo.asia/432e1ba3-76f1-41e8-8778-1cd2e5745c87.png)

Sau khi kết nối, chúng ta sẽ phải nói điều gì? Tương tự, giao tiếp giữa con người với nhau thì giữa trình duyệt và máy chủ cũng phải thống nhất 1 ngôn ngữ để "nói" với nhau, để hiểu được những yêu cầu của nhau. Đây chính là nơi HTTP xuất hiện, nó là viết tắt của giao thức truyền tải siêu văn bản, đây là ngôn ngữ mà cả trình duyệt và máy chủ có thể hiểu được.

Để làm ví dụ, chúng ta sẽ thực hiện yêu cầu đến `viblo.asia/newest`. Và nói cụ thể đó là 1 yêu cầu GET, cho đường dẫn `/newest`, sử dụng giao thức HTTP phiên bản 1.1 và dành cho máy chủ "viblo.asia"

```
GET /newest HTTP/1.1
Host: viblo.asia
```

Và đây là kết quả nhận được phản hồi từ máy chủ như sau

![](https://images.viblo.asia/c0eb0498-c969-46c0-9450-2da83fe137f1.png)

Vì lý do bảo mật nên chỉ định của chúng ta bị lỗi đưa về mã lỗi 302. 

HTTP là một giao thức văn bản đơn giản, trái ngược với giao thức nhị phân, giúp con người dễ dàng hỏi hỏi, tìm hiểu và gỡ lỗi. Nó cung cấp một cách có cấu trúc để trình duyệt yêu cầu các trang web, cung cấp các file tĩnh và assets, form nhập và submit, cache ....

Giống như đường dây diện thoại của bạn thì kết nối giữa máy chủ và trình duyệt không được mã hóa. 1 yêu cầu được gửi đi (request) để đến phía kia sẽ qua rất nhiều nơi: bộ định tuyến wifi (router), bộ định tuyến trung tâm, nhà cung cấp Internet, công ty lưu trữ máy chủ (hosting) và nhiều nhà mạng trung gian khác nhau ở giữa giúp chuyển yêu cầu đi. Điều này có nghĩa là, rất rất nhiều nơi trên đường đi có cơ hội nghe lén cuộc chuyển đổi. Và tất nhiên rồi, bạn sẽ không muốn người khác biết được cuộc trò chuyện của bạn đang nói đúng không?

Không có vấn đề, bạn có thể mã hóa nội dung của cuộc trò chuyện này. Nó vẫn sẽ đi qua tất cả các bên kể trên giống nhau và họ sẽ vẫn có thể thấy rằng bạn đang gửi tin nhắn qua lại cho nhau. Nhưng, những tin nhắn đó đã được mã hóa (thay đổi), và chỉ có trình duyệt và máy chủ của bạn có chìa khóa để giải mã những tin nhắn này.

VÀ cái này được gọi là HTTPS - S nghĩa là làm cho nó an toàn (secure) :). Điều đáng chú ý, nó không phải là 1 giao thức khác với HTTP. Ngay từ cái tên chúng ta đã thấy điều đó, cũng sẽ là giao thức siêu văn bản ở đây. Chỉ khác là trước khi trình duyệt gửi tin nhắn đi, nó sẽ mã hóa trước . Sau khi máy chủ nhận được tin nhắn, nó sẽ giải mã chúng. Việc mã hóa/giải mã được thực hiện bằng cách sử dụng khóa bí mật mà cả trình duyệt và máy chủ đều đã đống ý và không ai biết về điều này. Nhưng làm thể nào để trình duyệt và máy chủ sinh ra chìa khóa nói trên để mã hóa/giải mã trong khi đang bị tất cả các bên khác đang lắng nghe? Vâng, đó là 1 câu chuyện ........................... dài, mà sẽ được kể vào 1 thời điểm khác =))

## Web Server

![](https://images.viblo.asia/de7f04b8-3032-4e43-8830-173eb6d265c6.png)

Đến bây giờ, trình duyệt của bạn đã kết nối thành công với máy chủ và yêu cầu nó đến 1 trang web cụ thể. Làm thế nào để nhận được phản hồi - response - ở đây???

Chúng ta cần 1 cái gì đó nói được tiếng HTTP, thứ ngôn ngữ giao tiếp giữa máy chủ và trình duyệt chúng ta đã đề cập ở phía trên. Cái gì đó ở đây được gọi là Web Server - Máy chủ Web. **Nginx** và **Apache** là 2 ông lớn web server mà bạn sẽ đụng độ ở đây :v:

Công việc của Web Server là phân tích và "hiểu" yêu cầu và từ đó đưa ra quyết định về cách thực hiện những yêu cầu đó. Đối với các yêu cầu đơn giản, như cung cấp các file tĩnh assets, bạn có thể dễ dàng định cấu hình máy chủ web để thực hiện điều đó.

Ví dụ: giả sử rằng chúng tôi muốn nói với máy chủ web rằng bất cứ khi nào trình duyệt yêu cầu bất cứ điều gì trong `/assets/`, những file tĩnh như ảnh ọt, icon .... thì máy chủ web sẽ cố gắng tìm tệp đó trong thư mục `/public/assets` của ứng dụng của tôi. Nếu nó tồn tại, nó sẽ  hiển thị điều đó lên nếu không, nó sẽ trả về một trang 404 không tìm thấy. Tùy thuộc vào web server bạn đang sử dụng mà nó sẽ có 1 cách diễn đạt (ngôn ngữ) hoặc cú pháp riêng để cấu hình điều bạn mong muốn. Ví dụ, nếu bạn sử dụng `nginx`,  bạn có thể sẽ cần viết 1 thứ kiểu như thế này trong file `nginx.conf`:

```
location /assets {
  alias /var/myapp/public/assets;
  gzip_static on;
  gzip on;
  expires max;
  add_header Cache-Control public;
}
```

Đấy là trong trường hợp đơn giản thôi, còn đối với những yêu cầu phức tạp thì nó sẽ trở nên phức tạp hơn :v

Ví dụ: chúng ta có thể muốn nói với  web server của mình: "Này, bất cứ khi nào trình duyệt truy cập đường dẫn `/newest`, hãy truy cập tới cơ sở dữ liệu và lấy về 10 bài viết gần đây nhất nhé, sau đó làm cho chúng trông đẹp, cũng có thể hiển thị một số nhận xét, và gán vào một cái tiêu đề và thêm chân trang nữa, một thanh điều hướng nữa, một số JS và CSS, và .... "

Chà, đây có lẽ là một cái gì đó quá phức tạp để diễn đạt bằng ngôn ngữ cấu hình của máy chủ web. Nhưng đừng lo, chúng ta có Rails làm giúp điều này rồi đúng không?. ***Bài toán ở đây sẽ biến thành "chúng ta muốn Web Server biết rằng nó cần phải xử lý các yêu cầu nhận được từ Rails (sau khi Rails đã giải quyết bài toán phức tạp kể trên cho nó),*** nhưng Web Server sẽ giao tiếp với Rails như thế nào? 

## App Server

![](https://images.viblo.asia/10601d30-1895-4ada-97b6-ffd5c1f6f056.png)

App server là thứ thực sự chạy trong ứng dụng Rails của bạn. App server tải code của bạn viết lên và giữ app đó trong bộ nhớ (chính là code bạn dùng để giải quyết mấy bài toán lằng nhằng phía trên, điều mà ngôn ngữ của web server không giải quyết được đó), đến đoạn này cũng lờ mờ hiểu được mối liên hệ giữa cá bên rồi nhỉ :D

Khi app server nhận được request từ web server, nó sẽ báo lại cho Rails app. Sau khi app xử lý xong request đó, app server sẽ gửi response lại cho web server. Sau đó Web Server sẽ làm công việc còn lại, biến thành những request HTTP để giao tiếp với trình duyệt

1 lưu ý nhỏ, bạn có thể chạy hầu hết các app servers một mình, không cần có web server. Nghĩa là từ app server giao tiếp thẳng với trình duyệt luôn (ghê nhở, hehe). Ơ ơ, thế sao lại cần Web Server làm gì nữa ta???

Thực ra, App server chạy 1 mình chính là những gì bạn đã làm ở môi trường development. Ở môi trường production, thường phải cần một web server đặt phía trước. Vì trên production sẽ phải xử lý nhiều app một lúc, lượng request cần xử lý cũng đông và hung hãn hơn, tốc độ render file tĩnh assets cũng yêu cầu cao hơn. Do đó Web server và App server cần phải giao thông ... à nhầm, giao lưu và kết hợp với nhau để giải quyết các bài toán được đặt ra.

Có thể kể đến cơ số app servers cho Rails app, như Unicorn, Puma, Thin, Rainbows và Passenger. Mỗi cái có một thế mạnh riêng, nhưng xét cho cùng, chúng đều làm cùng 1 việc giống nhau là giữ cho app chạy và xử lý các requests nhận được từ Web Server (hoặc có thể trực tiếp là các request HTTP, trong trường hợp đứng 1 mình để quẩy)

**Vậy App server làm cách nào để nhận biết được đống code Ruby mà bạn viết ở 1 trình soạn thảo nhỉ?**

App server, Web server và Rails chúng liên hệ với nhau ra sao???**

Tất cả sẽ được giải đáp trong phần tiếp theo nha ...