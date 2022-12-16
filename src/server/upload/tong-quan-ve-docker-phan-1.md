Hello everyone, welcome back to my channel =)).

Sau khoảng thời gian lặng khá sâu, thì hôm nay mình đã trở lại, vẫn ăn hại như xưa =)), không đâu, lặng sâu là có lý do hết nha mấy bro.
Và lý do là đang mài mò Docker =)), và hôm nay mình quyết định viết bài tổng hợp những kiến thức mà mình đã tìm hiểu về em ý :D.

## Vấn đề gặp phải trước khi biết đến Docker

Vài năm trước, chính xác là 2 năm, mình được thông báo pass phỏng vấn và được 1 slot thực tập tại 1 team nhỏ ở ĐN, đây vào vấn đề chính =)), ngày đầu mình được a PM của dự án bảo là e cài PHP, Mysql, Nodejs, ... trong máy chưa, rồi mình cũng loay hoay cài thêm Nodejs, trước đó máy mình đã có PHP, Mysql. sau khi cài xong mình mới biết cả team xài Ubuntu, mình thì xài Window (tấm chiếu mới mà), rồi mình lại xin a PM 1 chút thời gian ngồi cài lại HĐH Ubuntu, may mà a có sẵn USB boot Ubuntu nên mình cài nhanh, cài xong rồi mình lại cài PHP, Mysql, và tiếp đến Git để pull source code về, xong hớn hở setup DB, vài step nữa thôi là mình có thể xem dự án ở local rồi, nhưng không, khi chạy composer install thì bị lỗi, k cài được lại keo a PM qua hỏi, ảnh xem máy mình và bảo e cài sai version PHP rồi, gỡ ra cài lại đi, rồi lại loay hoay cài lại, mà mới dùng Ubuntu nữa, mất cả buổi chiều =)), tóm lại mình mất nguyên ngày chưa show được dự án ở local.

Qua câu chuyện bịa đặt trên của mình, (bịa đặt nhưng tôi chắc mấy ông dev cũng gặp nhiều rồi đó nghe =))), phát triển một dự án thì cần đến rất nhiều thư viện để chạy, môi trường chạy có khi cũng khác nhau, ở local chạy ok, lên server thì ngủm củ tỏi, và còn hàng tá lý do...
Vậy có liên quan gì đến Docker, "ông cứ lòng vòng (chan)", đọc tiếp nhé.

## Vậy, Docker là gì ?

Định nghĩa ở trang chủ của Dockers
> Docker is an open platform for developing, shipping, and running applications. Docker enables you to separate your applications from your infrastructure so you can deliver software quickly. With Docker, you can manage your infrastructure in the same ways you manage your applications. By taking advantage of Docker’s methodologies for shipping, testing, and deploying code quickly, you can significantly reduce the delay between writing code and running it in production.

Để tiếng anh cho các bác mài mò chơi =)), đọc chắc mấy bác cũng k hiểu gì đâu, vì để trên doc mà, người ta phải trừu tượng hóa nó lên, bên dưới là khái niệm theo cách hiểu của mình.

Docker đơn giản là một nền tản mã nguồn mở, hổ trợ setup, implement project chạy ở các HĐH như Window, Linux vào trong các container và chạy độc lập, tách biệt với môi trường gốc đang sử dụng.

## Ưu điểm của Docker

### Tách biệt với môi trường gốc.

Phần này khá hay, cái này giải quyết được câu chuyện mà mình đã bịa đặt ở trên =))

Docker sẽ tạo ra cho các bạn môi trường "ảo" trong đó các bạn có thể chạy project của mình, bất kể hệ điều hành gốc của các bạn có là gì. Do đó, kể cả bạn ở Win hay Mac thì vẫn có thể chạy project dưới môi trường Ubuntu hay bất cứ môi trường nào, trừ khi bạn đen quá mới không chạy đc =))

### Khả năng mở rộng

Với Docker bạn có thể chia nhỏ ứng dụng ra nhiều container riêng lẻ, không phụ thuộc vào nhau, ví dự như DB chạy trên 1 container, sử dụng Redis để cache trên 1 container và Nodejs lại chạy ở 1 container, các container này chạy độc lập nhưng có thể liên kết với nhau để ứng dụng chúng ta có thể chạy được.

### Docker nhẹ và nhanh

Không giống như máy ảo, Docker cung cấp việc setup cơ sở hạ tầng để có thể chạy 1 project ở môi trường ảo, việc này được Docker thực hiện nhanh hơn rất nhiều.

## So sánh Docker với máy ảo.

Chắc các bác đã biết qua các máy ảo như VMWare, Virtual Box và việc sử dụng các ứng dụng này khá nặng máy, mình nhớ hồi Đại học học môn HĐH Linux, máy 8GB bật ông VMWare lên là đứng máy =)) vì cài đặt máy áo bạn phải cắt cứng một phần tài nguyên cho nó, chẳng hạn như máy mình share 4GB RAM để sử dụng đc Ubuntu trong VMWare, nhưng với Docker nó sẽ tạo ra môi trường ảo, sử dụng chung tài nguyên với môi trường gốc, và việc tạo ra 1 môi trường riêng trên máy ảo cũng khá dễ, chỉ với vài command thì bạn đã có 1 HĐH =)) trong container.

![](https://images.viblo.asia/3f35efa0-5d10-41bb-8e9c-83865a982b7a.png)

Nhưng Docker có thay thể hoàn toàn máy ảo, theo mình là **KHÔNG**, vì với Docker bạn không thể tương tác trực tiếp qua giao diện của 1 hệ điều hành, chẳng hạn như window, chỉ có thể qua các cmd. Và máy ảo mục đích sử dụng cho việc giảng dạy, hoặc là bạn muốn tìm hiểu sơ qua 1 HĐH nào đó như việc đang dùng Window, sếp bảo qua học mấy cmd bên Linux để vài bữa tự deploy trên 1 con server Linux chẳng hạn =)).

## Ai đang sử dụng Docker

Rất nhiều ông lớn trong thế giới IT đang sử dụng Docker như Google, Facebook, Amazon,.. đang sử dụng Docker để phát triển các services. Và các project hiện nay và cả những project cũ nữa cũng đang áp dụng Docker. Docker hiện nay cũng đã support rất tốt việc tự động hóa như auto deploy, CI/CD và còn vân vân, mây mây các tiện ích khác, mình mới chỉ khám phá tới đây (hihi)

## Tổng kết

Trên đây là 1 bài tổng quan những gì mình đã và đang tìm hiểu về Docker, ở phần 2 mình sẽ đi sâu vào architect và engine và các thành phần trong Docker nhé, nếu có bất cứ vấn đề gì, các bác cứ cmt ở dưới để cũng bàn luận nhé, nếu thấy hay đừng quên đăng ký kênh cho mình (hihi). Chào các bác !

## Tài liệu tham khảo
https://docs.docker.com/get-started/overview/

https://viblo.asia/p/li-do-toi-yeu-docker-ORNZqxRMK0n