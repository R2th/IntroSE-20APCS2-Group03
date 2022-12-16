Chào các bạn, bài viết hôm nay mình xin được giới thiệu chức năng push notification của Rails app sử dụng Firebase Cloud Messaging.

Giới thiệu một chút, Firebase Cloud Messaging là một dịch vụ gửi message đa nền tảng của Firebase và nó hoàn toàn miễn phí.

Hình vẽ dưới đây sẽ mô tả cách hoạt động của FCM

![](https://images.viblo.asia/9a73b88f-a780-49cf-a33d-3832b1ebf0bb.png)

Trong phạm vi bài viết, mình sẽ hướng dẫn các bạn sử dụng server Rails app API để tương tác với FCM. Vấn đề config phía client để nhận message các bạn có thể tham khảo [docs của firebase](https://firebase.google.com/docs/cloud-messaging).

## Về FCM messages

Với FCM, bạn có thể gửi 2 loại messages cho client:

- **Notification messages**: Đây là loại message được xử lý tự động bằng SDK, sẽ sử dụng các cặp key-value được quy định sẵn
- **Data messages**: Là những data custom để client có thể tùy mục đích sử dụng mà xử lý

Bạn có thể gửi 1 trong 2 loại hoặc cả 2 loại trên cho client tùy vào mục đích sử dụng.

Format khi bạn gửi cả notification key và data key sẽ như sau:

```json
{
  "message":{
    "token":"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
    "notification":{
      "title":"Portugal vs. Denmark",
      "body":"great match!"
    },
    "data" : {
      "Nick" : "Mario",
      "Room" : "PortugalVSDenmark"
    }
  }
}
```

FCM cho phép bạn đặt tất cả các field có sẵn trong một message object. Bao gồm:

- Các field phổ biến, có thể sử dụng cho tất cả các platfom (`message.notification.title`, `message.notification.body`, `message.data`)
- Các field được set riêng cho từng platform

Ví dụ:

```json
{
  "message":{
     "token":"bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...",
     "notification":{
       "title":"Match update",
       "body":"Arsenal goal in added time, score is now 3-0"
     },
     "android":{
       "ttl":"86400s",
       "notification"{
         "click_action":"OPEN_ACTIVITY_1"
       }
     },
     "apns": {
       "headers": {
         "apns-priority": "5",
       },
       "payload": {
         "aps": {
           "category": "NEW_MESSAGE_CATEGORY"
         }
       }
     },
     "webpush":{
       "headers":{
         "TTL":"86400"
       }
     }
   }
 }
```

Để rõ hơn về các option của FCM messages, các bạn có thể tham khảo [tại đây](https://firebase.google.com/docs/cloud-messaging/concept-options)

## Thiết lập phía Rails Server

Để support cho việc gửi HTTP request lên FCM, các bạn có thể cài [gem fcm](https://github.com/spacialdb/fcm). Thêm gem này vào Gemfile và bundle install

```ruby
gem "fcm"
```

Bây giờ chúng ta cùng xây dựng một class để gửi notification và sau đó có thể gọi bất kỳ đâu mà chúng ta mong muốn.

### Gửi một message tới multi devices.

```ruby
class FcmAdmin
  attr_reader :fcm_admin
  
  def initialize
    @fcm_admin = FCM.new ENV["FCM_SERVER_KEY"]
  end
  
  def notify device_tokens, payload
    fcm_admin.send device_tokens, payload
  end
end
```

Trong đó FCM_SERVER_KEY là key để server xác thực với FCM. Các bạn có thể truy cập vào Project Console -> Project Settings -> Cloud Messaging. Copy Server key và lưu vào `.env`

![](https://images.viblo.asia/61f1b4f3-c3e0-4e56-9640-c6311379f85b.png)

Lúc này ở bất cứ nơi nào trong Project bạn có thể định nghĩa payload mong muốn và gửi request lên FCM, những device đã được config sẽ nhận được push.

```ruby
payload = {
  notification: {
    title: "Hello",
    body: "Hello World"
  },
  data: {
    key1: "value1",
    key2: "value2"
  }
}

FcmAdmin.new.notify device_tokens, payload
```

### Gửi messgage tới topic

FCM topic cho phép bạn gửi một message vào một topic mà ở đó có nhiều devices đang subscribe vào, message sẽ được FCM gửi tới tất cả devices đó.

Tiếp tục với class FcmAdmin ở trên

```ruby
class FcmAdmin
  .....
  
  # Subscribe nhiều device tokens vào một topic
  def subscribe_topic topic_name, device_tokens
    fcm_admin.batch_topic_subscription topic_name, device_tokens
  end

  # Unsubscribe device tokens khỏi một topic
  def unsubscribe_topic topic_name, device_tokens
    fcm_admin.batch_topic_unsubscription topic_name, device_tokens
  end

  # Gửi message tới một topic
  def send_topic_notification topic_name, payload
    fcm_admin.send_to_topic topic_name, payload
  end
end
```

Ở đây bạn sẽ không cần phải tạo hoặc xóa topic, FCM sẽ làm hết cho bạn. Nếu ở request subscribe topic FCM check không tồn tại topic name nó sẽ tự động tạo topic mới. Và khi unsubscribe device token cuối cùng ra khỏi một topic thì topic đó cũng sẽ tự động được xóa.

### Gửi message tới Group

Device group messaging tương tự như topic messaging, nó cũng cho phép bạn add nhiều device vào 1 group. Group messaging khác với topic messaging ở chỗ là nó liên quan đến việc quản lý các device group từ tầng server của bạn thay vì quản lý trực tiếp từ tầng application. Mỗi group chỉ có thể có tối đa 20 tokens.

Trước khi gửi một message cho một group, bạn phải chắc chắn đã thực hiện công việc sau:

- Có device token cho mỗi device mà bạn muốn thêm vào group
- Tạo `notification_key` cho group

Vẫn tiếp tục với `FcmAdmin` ở trên

```ruby
class FcmAdmin
  .....
  
  # Hàm này sẽ tạo Group đồng thời add những tokens vào Group
  def create_notification_group group, device_tokens
    params = {
      key_name: group.id, # unique indentifier của group trên FCM
      project_id: ENV["FCM_SENDER_ID"],
      registration_ids: device_tokens
    }
    response = fcm_admin.create(*params.values)
    
    notification_key = JSON.parse(response[:body])["notification_key"]
    return unless notification_key
    group.update notification_key: notification_key # lưu lại notification_key của group
  end
    
  # Gửi message tới group
  def send_group_notification group, payload
    return if group.notification_key.blank?
    fcm_admin.send_with_notification_key(group.notification_key, payload)
  end
    
  # Add tokens vào group
  def add_tokens_to_group group, device_tokens
    params = {
      key_name: group.id,
      project_id: ENV["FCM_SENDER_ID"],
      notification_key: group.notification_key,
      registration_ids: device_tokens
    }
    
    fcm_admin.add(*params.values)
  end
    
  # Xóa token khỏi group
  def remove_tokens_from_group group, device_tokens
    params = {
      key_name: group.id,
      project_id: ENV["FCM_SENDER_ID"],
      notification_key: group.notification_key,
      registration_ids: device_tokens
    }
    
    fcm_admin.remove(*params.values)
  end
end
```

Trong đó FCM_SENDER_ID được lấy từ Project Console -> Project Settings -> Cloud Messaging. Copy Sender ID và lưu vào `.env`

Bài viết mình đã giới thiệu một số xử lý cơ bản với chức năng push notification với FCM của server Rails API. Chúc các có những trải nghiệm thú vị với FCM :)