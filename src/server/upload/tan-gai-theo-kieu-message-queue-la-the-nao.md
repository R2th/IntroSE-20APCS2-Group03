![](https://images.viblo.asia/f3b52456-618d-425b-ab7c-420f235fee17.png)

# Bài toán

Vào những năm 1900, khi mà công nghệ chưa phát triển, con người chỉ nói chuyện với nhau trực tiếp hoặc qua thư...

B là một cô gái nổi tiếng là xinh đẹp, học giỏi, hiền lành vẫn còn trong tuổi thanh xuân phơi phới và không thích uống trà xanh, được bao người săn đón. Cùng với đó, A là một chàng trai khôi ngô, tuấn tú, học giỏi, cao 1m69.96, anh này tán cô B.

![](https://images.viblo.asia/34c4de0b-2be9-4e27-95f9-fd0d2019759b.png)

Trai tài gái sắc, họ nói chuyện với nhau một cách thoải mái, tự nhiên. Mọi chuyện yên bình cho đến khi có anh chàng C đến, chiều cao chuẩn 1m8 chứ không cộng thêm sừng. C cũng thích B và làm quen với B. Vì thấy C đẹp trai lại có chiều cao lý tưởng, B cũng khá là siêu lòng, vậy B nghĩ ra cùng lúc sẽ nói chuyện với cả 2 anh.

![](https://images.viblo.asia/b4d0ff53-9686-4764-a402-52fddaef4f07.png)

Rồi đến một ngày nọ, anh D xuất hiện, anh này không cao, không đẹp trai như 2 anh trước, nhưng được cái đi Merc, cũng thích chị B. Và rồi chẳng phải mối tình tay ba nữa, mà là mối tình tay tư.

![](https://images.viblo.asia/a8e5daf7-5d1e-4fc2-bb18-d0758fcaeaa1.png)

Nói chuyện với 1 người thì không sao, ngay cả 2 người thì gọi là mệt hơn tí, nhưng giờ 3 người thì cũng hơi căng rồi đó. Nhưng chị B vẫn dành tình cảm cho cả 3 anh, nhất quyết chưa chọn ra anh nào là người yêu cả. Và thời gian tiếp tục trôi, lại có anh E, anh F, G, H, J, K... làm quen. Chị B không kham nổi nữa, vì nói chuyện với nhiều người quá, nhiều lúc quên cuộc hẹn với người này, mai thì quên đi với người kia, rồi nhiều khi cả 2 hay 3 anh cùng hẹn, đành phải chọn 1 anh rồi để các anh khác bơ vơ.

Qua vài lần như vậy, vì không muốn làm mất lòng ai, chị B nghĩ ra một cách, đó là dùng những lá thư.

![](https://images.viblo.asia/7a17dd93-f4c6-4b45-b5de-5ce7d0552948.png)

Vậy là thay vì nói chuyện trực tiếp với các anh cao to đẹp zai và trả lời trực tiếp, chị báo mình bận và cứ gửi thư tới nhà chị, chị sẽ trả lời. Thế là các anh cứ gửi thư vào hòm thư, bao tình cảm, bao cảm xúc, và kể cả là trang sức cũng gửi qua thư luôn. Chị thì cứ ở nhà, đọc thư người này, trả lời, rồi lại lấy tiếp thư người khác trả lời, vậy là vẹn cả đôi đường, à không, vẹn cả chục đường mà không làm mất lòng ai. 

Từ câu chuyện trên, chúng ta rút ra là đừng như chị B, đừng bắt cá chục tay, đừng...

À quên, đang phân tích kỹ thuật lại đi lan man chuyện tình yêu. Hãy tưởng tượng các anh zai kia là các các application (**Producer**) còn chị B là service xử lý (**Consumer**) cần phải nói chuyện với nhau. Các anh zai này (Producer) muốn nói chuyện, tạo ra yêu cầu (**Message**) tới chị B, chị B trả lời (**Response**) họ.

# Cách thức hoạt động

Ban đầu, như ở bối cảnh đặt ra vào những năm 1900, họ chỉ có thể gặp nhau trực tiếp (**Synchronous**) và nói chuyện, 1 anh nói chuyện và chị cần phải trả lời ngay, nếu nhiều anh cùng nói liên tục thì chị không thể đáp ứng được. Tình huống này được mô tả như hình sau.

![](https://images.viblo.asia/1437cc0f-b6ab-4680-a912-33275c45fa9f.png)

Còn sau khi chị áp dụng phương pháp nói chuyện qua thư, tức là không cần phải trả lời ngay, thư cứ gửi đến hòm và để đó, lúc nào có thời gian chị trả lời sau cũng được, cái này gọi là **Asynchronous**, hay còn gọi là **Event-based**. Hòm thư ở đây là Queue, lá thư chính là các Message, tin nhắn gửi hoặc trang sức gọi là Content (hoặc Data).

![](https://images.viblo.asia/f6c95d0b-a98a-41b5-9cc1-f9143e9c3320.png)

# Thành phần

Trong Message Queue bao gồm các thành phần sau:
- Producer: Chương trình/Ứng dụng tạo ra các yêu cầu. Trong câu chuyện đó là các anh cao to đen hôi tạo ra những lời tán tỉnh, lời mời cho cô gái
- Consumer: Chương trình/Service nhận yêu cầu và xử lý chúng. Chính là cô gái trên, cô ấy nhận các lá thư và phản hồi chúng
- Message: Thông tin cần xử lý, có thể là JSON, text. Chính là nội dung của các lá thư, hoặc vật phẩm trang sức
- Message Queue: Là chỗ chứa các message. Chính là cái hòm thư

Trong thực tế, đặc biệt là hệ thống Microservice, người ta hay sử dụng Message Queue để liên hệ với nhau một cách bất đồng bộ. Service A gửi message tới Message queue và thế là xong việc, không cần phải đợi Service B trả lời ngay lập tức, sau đó Service B pull message từ Queue về và xử lý. 

# Vấn đề giải quyết
- Dễ mở rộng (Horizontal scaling): Khi có quá nhiều Message, có thể chạy nhiều Consumer để xử lý, sau khi xử lý xong lại giảm số lượng đi
- Đảm bảo Message sẽ được xử lý (Durability): Ngay cả khi Consumer đang xử lý và bị crashed, Message vẫn tồn tại trong Queue và Consumer khác sẽ xử lý thay
- Tận dụng được kiến trúc Microservice: Ngày nay khi triển khai hệ thống Microservice, Message Queue giúp việc giao tiếp giữa các hệ thống một cách dễ dàng

# Hạn chế
- Tăng tính phức tạp: Chúng ta cần phải biết message nào của service nào, việc phát triển ở local cũng phải cài đặt phức tạp
- Giới hạn: Giới hạn tổng số lượng message, message size
- Thống nhất format: 2 bên gửi và nhận cần phải thống nhất chung một kiểu định dạng, một bên thay đổi thì bên kia sẽ không đọc được

# Một số Message Queue
Hiện nay có một số Message Queue được mọi người hay dùng:
- RabbitMQ
- Kafka
- Amazon SQS

## Amazon SQS
AWS cũng có dịch vụ về Queue, đó là SQS - Simple Queue Service.

![](https://images.viblo.asia/89bef09f-b188-4e3c-ad0f-777075a1f54b.png)

> Mục tiêu của mình là tìm hiểu về AWS, dưới đây là một số bài mình đã viết trong quá trình học tập, nếu bạn quan tâm hãy đọc và ủng hộ mình nhé:
> - [Hệ thống chứng chỉ AWS](https://viblo.asia/p/tim-hieu-he-thong-chung-chi-aws-63vKjbq6K2R)
> - [Giới thiệu về Lambda](https://viblo.asia/p/gioi-thieu-lambda-aws-bJzKmaYEK9N)
> - [Tìm hiểu về VPC](https://viblo.asia/p/tim-hieu-ve-vpc-virtual-private-cloud-aws-3P0lPPpGlox)

Hãy giúp cô gái B tạo ra hòm thư để thuận tiện trong việc trả lời tin nhắn của các chàng trai nào.

1. Đầu tiên, tạo ra hòm thư (Message Queue) đặt trước cửa nhà cô gái

```bash
$ aws sqs create-queue --queue-name mailbox
```

Kết quả trả ra sẽ là queue mới tạo. OK, hoàn thiện hộp thư rồi, đợi các con mồi muốn làm quen đến đặt thư vào thôi

```json
{
    "QueueUrl": "https://sqs.us-east-1.amazonaws.com/938163269426/mailbox"
}
```

2. Quá trình gửi thư để tán gái

Chàng trai A gửi cho cô gái nội dung tin nhắn rất thân thương: "Em yeu a, toi nay minh di choi nhe".

Tất nhiên bên ngoài sẽ phải để tên là chàng trai A, trong SQS chúng ta sẽ thêm `attributes` để định nghĩa metadata

```bash
$ aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/938163269426/mailbox --message-body "Em yeu a, toi nay minh di choi nhe" --message-attributes file://attributes.json
```

File `attributes.json`
```json
{
  "Name": {
    "DataType": "String",
    "StringValue": "Nguyen Van A"
  }
}
```

Sau đó, lại có anh C đến gửi thư cho cô gái: "Anh nho em lam, cuoi tuan minh gap nhau duoc khong", ngoài ra anh còn gửi kèm ảnh của mình cho cô gái ngắm, đúng là đẹp trai cao ráo thì chỉ khoe dáng là chuẩn rồi
```bash
$ aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/938163269426/mailbox --message-body "Anh nho em lam, cuoi tuan minh gap nhau duoc khong" --message-attributes file://attributes.json
```

File `attributes.json`
```json
{
  "Name": {
    "DataType": "String",
    "StringValue": "Tran Van C"
  },
  "Image": {
    "DataType": "String",
    "StringValue": "https://tran-van-c-s3-bucket.com/image.png"
  }
}
```

Tiếp đó anh D đến và gửi: "Anh yeu em" kèm theo bên trong số tiền 10.000$.

Có câu nói sau:

> Nếu một cô gái buồn, hãy cho cô ta tiền. Nếu cô ấy vẫn buồn, hãy cho cô ấy thật nhiều tiền.

Đúng là một chàng trai tâm lý.
```bash
$ aws sqs send-message --queue-url https://sqs.us-east-1.amazonaws.com/938163269426/mailbox --message-body "Anh yeu em" --message-attributes file://attributes.json
```

File `attributes.json`
```json
{
  "Name": {
    "DataType": "String",
    "StringValue": "Hoang Van D"
  },
  "Money": {
    "DataType": "String",
    "StringValue": "10000"
  },
  "Type": {
    "DataType": "String",
    "StringValue": "$"
  }
}
```

3. Cô gái nhận thư

Sau một ngày đi chơi bời với vài anh khác rồi, sáng hôm sau cô mới ra nhận thư của anh A, C, D. Cứ từ từ, trả lời lúc nào chả được (Asynchronous)

```bash
$ aws sqs receive-message --queue-url https://sqs.us-east-1.amazonaws.com/938163269426/mailbox
```

Và cô ấy đọc thư, bao gồm nội dung và số tiền 10.000$ 

```json
{
    "Messages": [
        {
            "MessageId": "031b8684-8b8b-47ff-b563-82a9a339fa11",
            "Body": "Anh yeu em",
            "MessageAttributes": {
                "Money": {
                    "StringValue": "10000",
                    "DataType": "String"
                },
                "Name": {
                    "StringValue": "Hoang Van D",
                    "DataType": "String"
                },
                "Type": {
                    "StringValue": "$",
                    "DataType": "String"
                }
            }
        },
       {
            "MessageId": "3f10b98d-493a-4488-b39a-3c56b073570d",
            "Body": "Anh nho em lam, cuoi tuan minh gap nhau duoc khong",
            "MessageAttributes": {
                "Image": {
                    "StringValue": "https://tran-van-c-s3-bucket.com/image.png",
                    "DataType": "String"
                },
                "Name": {
                    "StringValue": "Tran Van C",
                    "DataType": "String"
                }
            }
        },
        {
            "MessageId": "b7ea16cd-90da-43d7-aecb-ea16920971b8",
            "Body": "Em yeu a, toi nay minh di choi nhe",
            "MessageAttributes": {
                "Name": {
                    "StringValue": "Nguyen Van A",
                    "DataType": "String"
                }
            }
        }
    ]
}
```

# Tổng kết
Message Queue là thành phần quan trọng trong những hệ thống lớn, đặc biệt là microservice. Nếu các tác vụ của bạn không yêu cầu phải xử lý ngay lập tức (ví dụ như gửi mail, nhắn tin, xử lý video chất lượng thấp hơn, tạo thumbnail...), thì Message Queue chính là thứ bạn cần. 

Cảm ơn mọi người đã đọc bài viết của mình. Mong rằng qua ví dụ trên mọi người sẽ hiểu rõ hơn về Message Queue.