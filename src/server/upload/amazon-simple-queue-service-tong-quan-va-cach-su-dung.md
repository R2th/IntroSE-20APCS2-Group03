# Tổng quan về SQS

![](https://images.viblo.asia/74d8c1d9-8d8f-4ddb-a2a0-beead6abec28.png)

**Amazon Simple Queue Service (SQS) là gì ?**

SQS là dịch vụ hàng đợi thông điệp phân tán, được giới thiệu bởi Amazon Web Service năm 2004. Là dịch vụ hỗ trợ gửi và nhận thông điệp thông qua môi trường internet HTTP API.
SQS được thiết kế để nhắm đến các ứng dụng cần khả năng mở rộng cao. Bởi vì cung cấp HTTP API nên các thành phần khác nhau của hệ thống có thể gửi nhận thông điệp một cách dễ dàng.


# Một vài đặc điểm nổi bật của SQS

**Tính mở rộng cao**

>SQS mở rộng bởi dung lượng đọc/ghi của thông điệp, nên chúng ta không cần quan tâm đến việc mở rộng hàng đợi, bởi việc này đã có AWS lo.


**Trả tiền trên số lần xử lý**

>Chúng ta phải trả tiền cho mỗi lượt đọc/ghi thông điệp, không có khoản phí định kỳ nào.


**Dễ dàng thiết lập**

>Khi lựa chọn SQS, không cần phải setup bất kỳ hạ tầng nào để có thể sử dụng nó. Chỉ đơn giản là gọi API để đọc/ghi thông điệp.


**Có hai lựa chọn là Standard và FIFO queues**

>Có hai lựa chọn để thiết lập queue là tiêu chuẩn hay FIFO, tùy theo nhu cầu sử dụng mà lựa chọn cho phù hợp.

**Tự động xử lý thông điệp trùng lặp ở FIFO queues**

>Xử lý lặp thông điệp khá quan trọng trong queue, SQS sẽ xóa những thông điệp trùng lặp. Điều này làm FIFO queue phù hợp cho các tác vụ mà mỗi task chỉ chạy một lần.

**Xử lý lỗi qua Dead letter queue**

>Chức năng quan trọng để debug lỗi. Tất cả các thông điệp mà không thể xử lý sẽ được lưu vào Dead letter queue, nó như là một hàng đợi bình thường và chúng ta có thế kiểm tra hoặc xử lý logic cho những thông điệp lỗi trên Dead letter queue này.



# SQS hoạt động như thế nào ?

**Behind the scenes:**

Hàng đợi (queue) hoạt động như thế nào ?

![](https://images.viblo.asia/a692c809-9f47-4110-a113-e163a182ac0b.jpeg)

Điển hình thì xử lý hàng đợi sẽ như sau.
Hệ thống có các Producer với vai trò là đấy thông điệp vào hàng đợi, các Consumer sẽ nhận thông điệp và xử lý chúng.

Hệ thống đánh dấu là tin nhắn đang `pending` hoặc là `in-flight` và gửi nó đến các `consumer` - các background job management ở consumer client sẽ chạy  và xử lý các thông điệp này.

Khi mà `consumer` hoàn thành xử lý, nó sẽ thông báo cho `queue` là đã xử lý thành công bằng cách gửi một thông báo `acknowledge` - xác nhận xử lý thành công. Sau đó thì thông điệp được đánh dấu từ `pending` thành `processed`.

Nếu quá trình này xảy ra break ở đâu đó, ví dụ thiếu thông báo `acknowledge` trong một khoảng thời gian nhất định chẳng hạn, thì có nghĩa là quá trình xử lý thông điệp không thành công, và thông điệp không còn được coi là `pending` nữa. Như vậy sẽ không có thông điệp nào bị kẹt ở trạng thái `pending` mãi mãi.

Khi mà xử lý fail một số lần nhất định, queue sẽ coi là các thông điệp này có vấn đề và ngừng gửi nó đến các `consumer`. Hoặc cũng có thể đưa nó lưu vào Dead letter queue (DLQ).

### Với SQS
SQS cung cấp một api endpoint để các `producer` gửi thông điệp vào `queue`, các `consumer` sẽ đọc thông điệp và xử lý thông điệp đó.
- Thông điệp gửi đến SQS có thể là chuỗi string bất kỳ, XML hay là JSON. 
- SQS không giới hạn số lượng thông điệp được gửi đến và được xử lý.

**Thông điệp**

Một thông điệp ở SQS sẽ trông như này.
```JSON
{
  "message_id": "b1438d18-8095-4bed-ad26-ee1b8768e537",
  "receipt_handle": "AQEBLUaoBHhmJXetoonDkqfDDHUSlkGsIXLtHNATnSCeDd2nzk6V45nTnOt2PSCjqt5bbm2uCBUdoablpUJ59q4qS/kWOoT6h/R6y+kax+H6GNasKX6NU7IzGg/kr2E+QiI/OssES0niKE7J45fAge7UnrafrBWbpo1vJCgJzEzot3Z00AvwhsYmqxIiItQV7TRz165gdf9MTD+uILt6WNboJqglKpjba/4SN1MbQtuI7fEO0TFbp673YmNG8haNi0epfofzMKa+90+pjCDHBjUmSxkCrbx42Q3JIgA4LWPQVoBUo6mwttLyfkcSzoDfHVbGl0/Aph6uMgMymDkfN++79Il/LCrwOHSHj9Mpv1C1AuXj+TGO+6Vu1qvFvWdmoIvHNR+/AvALxWLKkhUH+ky9yg==",
  "md5_of_body": "c9f0f895fb98ab9159f51fd0297e236d",
  "body": "8",
  "attributes": {
    "SenderId": "596865106215",
    "ApproximateFirstReceiveTimestamp": "1605893094056",
    "ApproximateReceiveCount": "1",
    "SentTimestamp": "1605892972066"
  },
  "md5_of_message_attributes": null,
  "message_attributes": {}
}
```


Mỗi thông điệp sẽ được gán một `message_id`, `receipt_handle` cũng như là `body`, `message_attributes`.
`receipt_handle` sẽ dùng cho trường hợp muốn xóa thông điệp ở `queue`

**Visible timeout**
- Visible timeout là thời gian chờ tối đa mà thông điệp được xử lý ở `consumer`
- Với một queue có visible timeout 60 phút thì khi một message được `consumer` đọc, và xử lý thì timer bắt đầu chạy, thông điệp đó sẽ coi như bị ẩn đi 60 phút - ở trạng thái `in-flight`, các consumer khác không  đọc được thông điệp đó trong một khoảng thời gian.

- Nếu đang xử lý mà consumer client bị ngỏm, mất mạng hay vì lý do gì đó mà không thể xử lý, thì sẽ không thể tiếp tục thông báo tới queue về tình trạng xử lý. Vậy nên quá thời gian này thì thông điệp đó sẽ tiếp tục xuất hiện để consumers kéo về xử lý tiếp.


# SQS tích hợp Ruby SDK

Quen thuộc với các dịch vụ khác của AWS, với SQS thì AWS cũng cung cấp đầy đủ api trong sdk để sử dụng. Sau đây sẽ là một vài ví dụ đơn giản:

Để sử dụng SQS sdk ruby thì chúng ta cần cài gem `aws-sdk-sqs`, và cấu hình đầy đủ AWS với key id và acess key id.

Khởi tạo SQS với `queue_name`
```ruby
SQS = Aws::SQS::Client.new(region: "us-east-1")
queue = SQS.create_queue(queue_name: "my_queue")
```

Tạo một message mới
```ruby
SQS.send_message({queue_url: queue_url, message_body: "process_record_id", message_attributes: {"Id" => {string_value: "1", data_type: "String"}}})
```


Với poller thì chúng ta có thể lắng nghe queue liên tục để bắt message ở queue
```ruby
QUEUE_URL = SQS.get_queue_url(queue_name: "my_queue").queue_url
POLLER = Aws::SQS::QueuePoller.new(QUEUE_URL)
poller_stats = POLLER.poll({max_number_of_messages: 10 }) do |messages|
    messages.each do |message|
        puts "Message body: #{message.body}"
        # Do any logic process message here
    end
end
```
Hoặc chủ động lấy message:
```ruby
SQS.receive_message({
  queue_url: QUEUE_URL,
  max_number_of_messages: 5,
  visibility_timeout: 60
})
```

Với mỗi message thì sau khi handle xong, chúng ta cần xóa nó ở queue để hoàn thành job, params cần có receipt_handle là value lúc chúng ta get message về
```ruby
resp = SQS.delete_message({
  queue_url: QUEUE_URL,
  receipt_handle: "receipt_handle value",
})
```

Trường hợp trong lúc xử lý message, máy bị mất kết nối hoặc bị ngỏm, sau một số lần nhất định thì message sẽ được lưu vào Dead letter queue, việc chúng ta cần làm là tiếp tục handle những message lỗi này nếu cần.

Chúng ta cần phải tự tạo một queue để sử dụng làm Dead letter queue này, qua SDK hoặc qua AWS Console UI
- Sử dụng SDK:
```ruby
SQS.create_queue({
  queue_name: "my_dead_letter_queue"
})
dead_letter_queue_url = SQS.get_queue_url(queue_name: "my_dead_letter_queue").queue_url
dead_letter_queue_arn = SQS.get_queue_attributes({
  queue_url: dead_letter_queue_url,
  attribute_names: ["QueueArn"]
})
.attributes["QueueArn"]

redrive_policy = {
    "maxReceiveCount" => "5", # After the queue receives the same message 5 times, send that message to the dead letter queue.
    "deadLetterTargetArn" => dead_letter_queue_arn
}.to_json

# Sau đó set queue attributes
SQS.set_queue_attributes({
  queue_url: QUEUE_URL,
  attributes: {
    "RedrivePolicy" => redrive_policy
  }
})
```

- Với AWS console UI, chúng ta tạo một queue mới là dead_letter_queue chẳng hạn, sau đó vào edit queue chính, chọn enable dead letter và select queue dead_letter_queue  là xong (easy).

![](https://images.viblo.asia/35fb29d7-f95f-496a-8619-f161d76f3f89.png)

- Để xóa queue:

```ruby
SQS.delete_queue(queue_url: QUEUE_URL)
```


# SQS tích hợp gem shoryuken

Với gem shoryuken, việc tích hợp background job sử dụng SQS đơn giản và dễ dàng hơn bao giờ hết.

https://github.com/phstc/shoryuken

Chúng ta cần cài 2 gem này vào nhé.
```
gem "shoryuken"
gem "aws-sdk-sqs"
```

Với những ai đã quen thuộc với bộ đôi Sidekiq + Redis thì combo shoryuken + SQS cũng khá là tương đồng, cơ chế cũng như cách sử dụng gần như là không khác gì nhau cả.

Lan man một tý:

>Về combo Sidekiq + Redis thì chúng ta cần mua gói PRO (950 $ / năm) để có thể handle job failed như Dead letter bên SQS.
>
>Còn với SQS thì job chạy sẽ không được realtime cho lắm vì thông qua HTTP API, sẽ không nhanh bằng combo Sidekiq + Redis, phù hợp cho những Job không cần realtime
>
>Những Job như bắn thông báo, gửi notification hay cần ưu tiên xử lý nhanh thì nên dùng Redis vì nó bắt rất nhanh - ngược lại thì có thể sử dụng SQS.

- Khai báo worker
```ruby
class HelloWorker
  include Shoryuken::Worker

  shoryuken_options queue: "my_queue", auto_delete: true

  def perform(sqs_msg, data)
    puts "Hello, #{data}"
  end
end
```

- Start shoryuken
```shell
bundle exec shoryuken -q my_queue -R
```

- Và enqueue một job
```ruby
HelloWorker.perform_async({message: "1"})
```


Như vậy là chúng ta vừa tìm hiểu về Amazon Simple Queue Service (SQS) qua một vài khái niệm, các đặc điểm nổi bật, cách sử dụng SQS tích hợp với SDK ruby cũng như sài gem. Hy vọng bài viết sẽ có ích cho những ai đang tìm hiểu về SQS

Cảm ơn mọi người đã theo dõi bài viết!