Đối với việc push notification trên mobile app thì chúng ta có GCM dành cho android và APNS cho ios, nhưng sử dụng AWS SNS, với một yêu cầu duy nhất, chúng ta có thể nhắm push trên cả thiết bị Android và iOS. Và tất nhiên, nó rẻ ngay cả vượt qua  free tier 1 million push notifications per month. Và sau đây chúng ta sẽ cùng cài đặt trên rails application.
Thêm vào Gemfile
```
gem "aws-sdk", "~> 2"
```
Tạo platform applications trên AWS
![](https://images.viblo.asia/4290285b-e20a-4fc6-8a82-6ba26651eb71.png)

Cấu hình AWS
```
#config/initializers/aws.rb
Aws.config[:credentials] = Aws::Credentials.new(ENV["AWS_ACCESS_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"])
Aws.config[:region] = ENV["AWS_REGION"]

```

Tạo 1 builder để build message cho android và ios
```
class Aws::Sns::Message
  attr_accessor :content, :type, :sound, :id

  def to_json
    case type
    when "IOS"
      {
        APNS:  ios_payload.to_json,
        APNS_SANDBOX: ios_payload.to_json
      }
    else
      {
        GCM: android_payload.to_json
      }
    end.to_json
  end

  private

  def ios_payload
    {
      aps: {
        alert: content,
        sound: sound || "default"
      },
      notification_id: id
    }
  end

  def android_payload
    {
      data: {
        message: notification.title,
        notification_id: id
      }
    }
  end

  class << self
    def build
      builder = new
      yield builder
      builder
    end
  end
end

```

Tạo push service
```
class Aws::Sns::PushService
  def initialize
    @sns_client = Aws::SNS::Client.new
  end

  def push sns_message, device_token
    @sns_client.publish(
      target_arn: endpoint_arn(device_token, sns_message.type),
      message: sns_message.to_json,
      message_structure: :json
    )
  rescue Aws::SNS::Errors::ServiceError => e
    Logger.new(Rails.root.join("log", "notification_push.log")).warn e.message
  end

  private

  def endpoint_arn device_token, type
    @sns_client.create_platform_endpoint(
      platform_application_arn: ENV["AWS_#{type}_ARN"],
      token: device_token
    ).endpoint_arn
  end
end
```
Và sử dụng nó khi bạn cần
```
sns_message = Aws::Sns::Message.build do |msg|
    msg.id = 1
    msg.content = "title"
    msg.type = "IOS"
end

Aws::Sns::PushService.new.push sns_message, device_token
```
Just memo, chúc các bạn thành công