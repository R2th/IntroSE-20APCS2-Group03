Nói đến ứng dụng chat realtime, chắc ai cũng nghĩ ngay đến việc dùng thư viện hay service bên thứ 3 như websocket, Firebase RealTimeDatabase … phải không nào?

Mỗi công nghệ sẽ có ưu điểm, nhược điểm riêng, mà quan trọng nhất phải phù hợp với hệ thống hiện tại.

Vậy hãy cùng xem các kĩ sư Eureka tại sao chọn gRPC cho giải pháp của mình, và đã tối ưu nó như thế nào nhé.

Trước khi đi vào phần chính cùng tìm hiểu xem Eureka là công ty như thế nào đã nhé.

## Eureka là công ty như thế nào

Công ty [Eureka](https://eure.jp/) là công ty Nhật bản, được thành lập vào năm 2008, đến thời điểm hiện tại Eureka đã có 130 nhân viên.

Eureka đang vận hành 1 service về tình yêu và dịch vụ kết hôn lớn nhất Nhật Bản có tên là [Pairs](https://www.pairs.lv/) (Hay nói cách khác đây là 1 dịch vụ về hẹn hò thì đúng hơn).

Chức năng chính trong Pairs thì có rất nhiều nhưng mình chỉ điểm qua 1 số điểm chính thôi nhé:

* Người dùng sẽ vào website đó để đăng kí tài khoản (có thể đăng kí thông qua Facebook). Sau đó sẽ chọn ảnh bạn gái mà mình yêu thích và like.
* Nếu có cảm tình thì tiến hành nhắn tin hẹn hò.
* Ban đầu Pairs sẽ cho mỗi tài khoản 1 số lượng point nhất định. Nếu dùng hết sẽ phải nạp thêm point.
* Khi like hay nhắn tin thì bạn sẽ mất 1 phần point nào đó. Cứ 1 tin nhắn là 1 point chẳng hạn.

Điểm mà mình thích nhất ở Pairs đó là mặc dù mình đăng kí tài khoản thông qua Facebook. Nhưng Pairs sẽ luôn lựa chọn ảnh “bạn gái” mà không cùng Friend trên Facebook với mình (kể cả Friend của friend cũng không hiển thị ra luôn).

Vào đó hẹn hò lén lút mà gặp phải bạn thân của vợ thì … Mà thôi nói đến đây các bạn tự hiểu. =))

Vậy đến đây các bạn cũng hiểu đôi chút về Pairs của Eureka rồi phải không.

Tiếp theo chúng ta đi vào vấn đề chính nhé.

## Vấn đề đang gặp phải
Như mình giới thiệu ở trên, Pairs có 1 chức năng gọi là “chat hẹn hò”. Thế nhưng, hiện tại chức năng này đang thực hiện theo hình thức **polling** (tức là cứ mấy giây sẽ request lên api server lấy dữ liệu 1 lần).

Chính vì điều đó mà tin nhắn được gửi đến đối phương sẽ bị delay mất khoảng mấy giây. (Tức là sau khi A gửi tin nhắn cho B thì sau khoảng mấy giây tin nhắn mới hiển thị trên màn hình của B).

Vì đây là app hẹn hò. Nếu tin nhắn mà bị delay nhiều như thế thì về UX không được thân thiện cho lắm. Nên Eureka quyết định cải thiện chức năng chat này.

## Tại sao lại chọn gRPC?
Bài toán đã có, bước tiếp theo là tìm hướng giải quyết. Nói là tìm hướng giải quyết nhưng việc lựa chọn công nghê phù hợp quả thật là 1 vấn đề đau đầu.

Ngoài gRPC ra thì còn có 1 số công nghệ khác nữa có thể giải quyết được bài toán này. Nói không xa đó chính là WebSocket đã có từ rất lâu đời.

Hay 1 công nghệ mà message Facebook đang sử dụng đó là MQTT.

1 số dịch vụ bên thứ 3 cung cấp cũng đang rất nổi tiếng như AWS AppSync, Firebase RealTimeDatabase cũng chuyên cung cấp giải pháp gửi nhận real time.

Có rất nhiều thứ khác nữa, nhưng do mỗi thứ có ưu điểm nhược điểm riêng, cộng với việc công nghệ đó phải phù hợp với project hiện tại. Nên các kĩ sư Eureka quyết định chọn gRPC cho giải pháp lần này.

Dưới đây là 1 số lí do:

* Ngôn ngữ chính của các kĩ sư Eureka là Golang. Mà gRPC thì cũng đang support Golang.
* Trong 1 số ngôn ngữ mà Eureka đang sử dụng như go/java/swift thì gRPC có phương thức tự động sinh ra Document, Code dựa vào định nghĩa IDL.
* Trong vấn đề giao tiếp stream (là chức năng mới của HTTP/2) đều có sample hay interface khá đầy đủ. Nên không cần để ý đến tầng communication cũng được.
* Pattern xung quanh interceptor cũng được trang bị rất đầy đủ nên việc implement cũng khá đơn giản.
* Chỉ cần xem ví dụ hay code của phần  [grpc-middleware](https://github.com/grpc-ecosystem/go-grpc-middleware) là thể sử dụng được ngay nên khá tiện.

## Implement Two-way communication bằng gRPC

Trên proto, chỉ cần gắn stream vào trong request lẫn response là có thể sinh ra được interface dùng cho việc truyền thông Two-way ở phía client.

```
rpc Chat(stream ChatRequest) returns (stream MessageResponse);
```

Vì cách thực thi nó sẽ khác nhau với từng ngôn ngữ, nên để hiểu rõ hơn các bạn có thể xem qua tutorial ở đây nhé:  [gRPC tutorial](https://grpc.io/docs/tutorials/)

## Hướng cải thiện tốc độ

Cấu trúc hệ thống hiện tại đang như sau:

![](https://images.viblo.asia/d7ddc5d2-0ab5-41f0-9608-33e78bdbfc7c.png)

Cấu trúc sau khi đưa gRPC vào sẽ được thay đổi như sau:

![](https://images.viblo.asia/907ad9a7-e7c5-4b4b-b0dc-02e8b3c8931c.png)

Qua 2 cấu trúc bên trên, ta thấy sự khác nhau chủ yếu là ở phía receiver. Cụ thể như sau:

* Vì đã thực hiện kết nối ngay từ đầu nên sẽ không mất cost kết nối HTTP nữa
* Việc kết nối đến mysql để lấy message thì bây giờ không cần nữa.
* Không tồn tại Polling.

Dựa vào cấu trúc như này (dạng pub-sub) sẽ thấy không còn sự delay của việc Polling nữa. Thay vào đó phía receiver có thể nhận được message ngay tức thì.

## Cấu trúc toàn thể của hệ thống

![](https://images.viblo.asia/205bdcdf-37f9-46cf-8498-e28f434f0bdf.png)

Nhờ việc sử dụng RedisPubSub như là nơi giao tiếp giữa các server (mới và cũ) đã giúp cho người dùng có thể gửi và nhận message 1 cách tức thời.

## Làm thế nào để release an toàn?
Chức năng chat có thể nói là 1 trong những chức năng chính của hệ thống Pairs, nên việc có bug xảy ra có thể gây ảnh hưởng vô cùng lớn.

Vì phạm vi ảnh hưởng vô cùng lớn nên khi có bất kì bug nào thì việc rollback, detect lỗi là điều vô cùng quan trọng.

Trước khi release thì test code là điều đương nhiên phải làm. Thế nhưng để co hẹp phạm vi ảnh hưởng, Eureka đã nghĩ đến việc sẽ release chức năng chat mới này trên thiết bị Android trước. Sau khi chạy ổn định sẽ release tiếp trên iOS.

Chính vì điều đó mà sơ đồ cấu trúc hệ thống ở bên trên mới có phần API cũ và API mới là như thế.

## Cách quản lý proto
**・Tách repository ra riêng**

File proto sẽ không nằm trong repository của các platform (ios/android/serverside) mà sẽ nằm ra 1 repository riêng biệt. Và dùng git submodule để chèn nó vào trong các repository của platform.

**・Cách generate document và code**

1 trong số những điểm mạnh của gRPC là có thể generate document và code 1 cách tự động nhờ sử dụng protoc.

Hơn nữa chúng ta có thể dễ dàng viết command line Make để generate ra document và code như bên dưới:

```
gen-doc:
 docker run --rm -v $(CURRENT_DIR):$(CURRENT_DIR) -w $(CURRENT_DIR) xxxx/protoc --doc_out=markdown,README.md:./ -I. *.proto
```

Đây là ví dụ về sample Document và proto đã được sinh ra nhờ command line phía trên:

```
message ChatRequest {
 string message_body = 1;
 string sticker_id = 2;
 string user_message_partner_id = 3;
}
```

Đúng quả là tiện thật.

## Kết quả tối ưu tốc độ và đo hiệu năng

Với gRPC đang gặp phải 1 vấn đề là rất khó khăn trong việc đo hiệu năng.

Thông thường, 1 request 1 response thì chỉ cần xem log nginx hay apache là có thể biết được request đó xử lý mất bao lâu, thời gian trung bình của latency là bao nhiêu.

Thế nhưng với dòng stream của gRPC thì lại khác, tương ứng với 1 request thì có bao nhiêu response, và khi nào sẽ trả về. Dữ liệu khi nào xảy ra, khi nào đến … đều không thể biết được.

Do đó nếu không cải thiện chỗ này thì khó có thể tính toán, đo đạc hiệu năng được.

Chính vì vậy, Eureka đã lưu 3 giá trị metrics ở bên dưới vào StackDriver & BigQuery và tiến hành đo đạc:

1. Thời gian (μs) lưu data đến database ở phía sender.
2. Thời gian (μs) broadcast message đến gRPC server.
3. Thời gian (μs) send message đến sender từ gRPC server.
Kết quả là tổng thời gian từ 1 -> 3 chỉ mất dưới 0.2s nên việc tối ưu tốc độ lần này có thể coi là thành công.

Ngoài ra nhờ có thể lấy được giá trị cụ thể này mà dễ dàng detect khi tổng thời gian vượt quá giá trị cho phép.

## Sự hạn chế về mặt infrastructure, monitoring, AccessLog

Về phương diện implement code thì không gặp nhiều khó khăn, thế nhưng về phương diện vận hành, monitoring server thì đang gặp rất nhiều vấn đề. Cần phải mapping lại các error code, các metrics thì mới có thể đo đạc đươc. Cụ thể như sau:

* Việc monitoring RateBase trên ELB (4xx, 5xx) thì bây giờ phải chuyển sang monitoring Rate của từng con gRPC server với mã error codes khác
* Để đo đạc được latency trong giao tiếp stream thì cần phải lấy được giá trị về thời gian phát sinh dữ liệu (event), thời gian nhận dữ liệu, thời gian update dữ liệu.
* Về Logging của Send với Receive trong Stream thì hiện tại chưa support, do đó cần phải viết lại Wrapper cho thằng ServerStream.
* Phần giao tiếp với BackendTarget thì hiện tại AWS ALB chưa support HTTP2. TCPMode của AWS ELB cũng chưa support ALPN. Do đó hiện tại Eureka đang sử dụng NetworkLoadBalancer.

## Kết luận

Mặc dù việc vận hành gRPC còn có chút try hard, nhưng với case tạo API mà sử dụng micro framework, hay với những dòng stream sử dụng HTTP/2 thì gRPC rất thích hợp và dễ dùng, dễ implement.

Nên nếu bạn nào đang có nhu cầu đưa gRPC vào hệ thống thì hi vọng bài viết này sẽ giúp các bạn 1 phần nào đó.

**Nguồn:** [https://nghethuatcoding.com/2019/05/05/cac-ki-su-eureka-da-toi-uu-ung-dung-chat-su-dung-grpc-nhu-the-nao/](https://nghethuatcoding.com/2019/05/05/cac-ki-su-eureka-da-toi-uu-ung-dung-chat-su-dung-grpc-nhu-the-nao/)

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

👉👉👉 [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.