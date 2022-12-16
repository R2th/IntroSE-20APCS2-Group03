# Giới thiệu
Heroku là một nền tảng khá tuyệt vời để deploy ứng dụng web cho nhiều mục đích với nhiều lợi ích mà nó đem lại như kết nối với Github và tự động deploy qua Github, có nhiều tool và "buildpack" đi kèm... Hiện tại Heroku đang cho chúng ta sử dụng dịch vụ một cách miễn phí nhưng đi kèm với một điều kiện là nếu chúng ta không truy cập vào ứng dụng một khoảng thời gian thì ứng dụng sẽ vào trạng thái "sleep" và khi truy cập lại nó sẽ mất khá nhiều thời gian để load (thông thường là 5-10s). Đó là một điều khá là tệ khi phải ngồi đợi trong khoảng thời gian đấy, cảm giác như đang đợi 1 trang "link skip" vậy. sdfsdfsdf
![](https://images.viblo.asia/71a1120a-aeec-4015-aaab-18b78817a821.jpg)

# Heroku App Pinger
Có khá nhiều cách để giữ ứng dụng Heroku luôn ở trạng thái "awake" nhưng trong bào viết này mình sẽ dùng một bên thứ ba đó là [Uptime Robot](https://uptimerobot.com/). Ý tưởng là mình sẽ dùng [Uptime Robot](https://uptimerobot.com/) để ping đến trang web của mình sau một khoảng thời gian (n phút) và chỉnh n sao cho n nhỏ hơn thời gian mà ứng dụng sẽ vào trạng thái "sleep" (theo mình tìm hiểu là 30p).
Nhược điểm của cách làm này là ứng dụng của chúng ta sẽ bị phụ thuộc vào một bên thứ ba và sẽ không thể khẳng định là ứng dụng sẽ luôn trong trạng thái "wake" và phải có niềm tin =)))
Đầu tiên, các bạn vào trang  https://uptimerobot.com/ và tạo một tài khoản cho riêng mình


![](https://images.viblo.asia/aa224fb0-c7f9-4475-80eb-fbb765b2dcca.jpg)

Sau khi đã có tài khoản, mình sẽ vào phần +Monitor và điền các thông số dưới đây
* Monitor Type: chọn Ping
* Friendly Name: tên của monitor đang tạo
* IP (or Host): để link tới ứng dụng heroku mà bạn muốn ping
* Monitoring Interval: khoảng thời gian giữa các lần ping (nên để dưới 30p)

![](https://images.viblo.asia/3845aaab-ddcc-4dcf-9769-3b4831fa36f0.jpg)

Sau khi nhấn Create Monitor thì một monitor được tạo và bạn có thể theo dõi qua bảng Quick Stats ở bên phải màn hình.
Bài viết của mình đến đây là hết và chúc các bạn thành công. Gud luk!!