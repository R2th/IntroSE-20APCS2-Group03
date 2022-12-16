Tiếp tục với chuỗi bài viết về Basic AWS Setting, chúng ta tiếp tục tìm hiểu tiếp tới SNS (Simple Notification Service).

# 1.Khái niệm SNS
Đây là một service của AWS cho phép người dùng setting thực hiện gửi email, text message hay push notification tự động tới mobile device dựa trên event người dùng setting phía AWS Account.

Định nghĩa khác mang tính technical hơn thì SNS là service điều phối và quản lý việc trạng thái gửi và nhận của các message tới các endpoint đã được đăng kí cũng như tới enduser.
Trong AWS SNS, có 2 loại client là **publisher** và **subscriber**, tương ứng với bên cung cấp và bên tiêu thụ.

**Publishers** giao tiếp theo giao thức bất đồng bộ với phía **subcriber** bằng cách tạo và gửi message tới một topic, là một logical access point và communication channel.
**Subscriber** (i.e, web server, email address, Amazon SQS Queues, AWS Lambda function) sẽ tiếp nhận message hoặc notification thông qua một giao thức được hỗ trợ (i.e, Amazon SQS, HTTP/S, email, SNS, Lambda) đã được đăng kí trước đó.

![](https://images.viblo.asia/efda5d75-cf3a-4e63-8efa-3cb356d740b9.png)

# 2. SNS Workflow
SNS Service rất quan trọng trong việc tự động hoá quy trình giám sát hệ thống phòng khi có bất kì lỗi nào xảy ra phía AWS.

Ví dụ:

![](https://images.viblo.asia/889f0333-6864-462f-a6d8-d9feb32b99db.png)

Trong ví dụ này với trường hợp EC2 bị crash:
- Phía Cloudwatch sẽ phát hiện được lỗi dựa trên error prefix log đã setting trước cho các lỗi critical (VD: error.production.prefix)
- Đồng thời phía Cloudwatch sẽ trigger tự động C.W alarm 
- C.W Alarm sẽ trigger event gửi message thông báo lỗi EC2 crash tới System Admin để có action fix lỗi sớm nhất có thể

# 3. Các component cơ bản của SNS và Pricing option
### 3.1 Các component cơ bản

![](https://images.viblo.asia/1e38ad98-0748-49c7-849f-77439559fb8b.png)

Component cơ bản của SNS bao gồm:
- Topic: Nơi dán nhãn và group các **endpoint** để gửi message tới
- Subcription: Các **endpoint** để topic gửi message tới (VD i.e, email address, phone number của system admin)
- Publisher: Person in charge/Alarm/Event setting message để phía SNS gửi đi.

### 3.2 SNS Pricing
Chúng ta sẽ bị charge phí thế nào khi sử dụng SNS?
- Publisher: Charge theo số lượng SNS request (Số message i.e cần gửi đi)
- Notification delivery (Push notification): Sẽ charge phí theo số lượng device message gửi đi.
- Data transfer IN/OUT của SNS

**Chi tiết về SNS Pricing:**
https://aws.amazon.com/sns/pricing/

# 4. Các bước sử dụng SNS Service 

![](https://images.viblo.asia/d02e1f2b-84cf-4c88-afd8-4e1535d5dee0.png)


Các bước cơ bản để sử dụng SNS Service:

**1. Tạo topic:**
- Add name và click "Next"

![](https://images.viblo.asia/fef772d5-d1d8-4c7a-bb95-5f45717b636e.png)


- Đối với SMS (Text message endpoint), thì bắt buộc phải add display name.

![](https://images.viblo.asia/c905cd49-9bd6-4136-814b-d446a1f7a0f8.png)

![](https://images.viblo.asia/2208a760-5ec7-477c-a524-1c7db48cb5fa.png)

- Click **Create topic**.

**2. Add subcriptions:**
- Lựa chọn topic muốn add **subcription**.
- Click **Create subcription**.

![](https://images.viblo.asia/f5c1f266-8129-41f5-8a77-c990d792033b.png)

- Lựa chọn một giao thức protocol (dựa vào endpoint)

![](https://images.viblo.asia/e7c1b47c-0c33-4cf9-b507-3228342aae56.png)

- Chọn **Enpoint**

![](https://images.viblo.asia/226dd9b4-1938-429b-8b0b-6e0bd38148f8.png)

- Click **Create Subcription**.

3. Publish topic:
- Click **Publishing a topic**
- Nhập nội dung subject và message
- Click **publish message**

Mình xin kết thúc topic setting SNS ở đây, hẹn gặp mọi người ở topic sau về Setting ELB.