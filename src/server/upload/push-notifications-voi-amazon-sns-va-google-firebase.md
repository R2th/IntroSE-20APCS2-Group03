## Amazon SNS là gì?

**Amazon Simple Notification Service** (Amazon SNS) là một dịch vụ gửi message từ publishers đến subscribers. Các publishers giao tiếp không đồng bộ với subcriber bằng cách gửi tin nhắn đến một **topic** được coi như là một chanel giao tiếp. client có thể subcribe  các chủ đề trên SNS và nhận các tin nhắn bằng cách sử dụng các loại endpoint khác nhau, chẳng hạn như Amazon Kinesis Data Firehose, Amazon SQS, AWS Lambda, HTTP, email, thông báo đẩy trên thiết bị di động.

Trong khuôn khổ bài viết này chúng ta sẽ kết hợp Aws sns với dịch vụ Google Firebase để gửi thông báo đến thiết bị. Chúng ta sẽ tạo app endpoint là dịch vụ Firebase Cloud Messaging (FCM). Cụ thể sơ đồ sau:


![](https://images.viblo.asia/3eb00d01-f69d-4d60-a788-6cd4a1ae6170.png)



Trong đó.
1. Thiết bị mobile sẽ registered vào dịch vụ FCM.
2. FCM trả lời bằng mã thông báo xác định người dùng (token định danh thiết bị). trong sản phẩm thực tế chúng ta cần tự động hóa quá trình này và lưu trữ token này để tiến hành gửi message sau này.
3. Sau khi đã đăng ký thiết bị với FCM. Chúng ta sẽ tiến hành tạo một platform app để kết nối AWS sns với CFM bằng FCM API credentials. Cái này sẽ được trình bày chi tiết trong phần sau
4. Với token đã nhận được ở 2, một application endpoint sẽ được tạo. Endpoint này sẽ xác định ứng dụng đã đăng ký
5. Khi backend muốn push notification. chúng ta sẽ sử app endpoint đã được đăng ký hoặc publish message trực tiếp đến **topic**
6. SNS sẽ tiến hành forward message sang hệ thống FCM với payload tương ứng tùy vào mục đích.(Payload này sẽ được trình bày chi tiết sau)
7. Ở bước này FCM sẽ tiến hành push message đến thiết bị mobile tương ứng

**Tại sao phải sử dụng kiến trúc này. Thay vì sử dụng nguyên SNS**
* Một số vùng có thể không hỗ trợ SNS
* Sử dụng FCM sẽ tối ưu hiệu quả quản lý thiết bị mobile hơn
* SNS dễ dàng có thể mở rộng để push đến nhiều nền tảng thiết bị hơn cũng như dễ thao tác ở môi trường backend hơn

## Tạo project FCM API key và kết nối AWS SNS với FCM

**Thêm project vào Firebase**
Với mỗi nền tảng ứng dụng sẽ có những cách thêm khác nhau. các bạn có thể tham khảo thêm tại docs của firebase tại đây. [https://firebase.google.com/docs/ios/setup](https://firebase.google.com/docs/ios/setup)

**Copy API key của FCM project để tạo app platform trên SNS**

1. Trong  [Firebase console](https://console.firebase.google.com/), chọn project.
2. Tại baner phía bên trái chọn biểu tượng cài đặt và chọn **Project setting**
3. Chọn tab **cloud message**
4. Bên dưới **Project credentials**, tìm mục **Server key**. Đây chính là **FCM API key** cần tìm để tạo platform app cho sns. Copy clipboard.

![](https://images.viblo.asia/70194d84-a899-46af-8ad8-15d2e6c657cb.jpg)


**Tạo platform application trong Amazon SNS**
1.  Mở [Amazon SNS console](https://console.aws.amazon.com/sns/home)
2.  Trong panel bên trái, chọn **Mobile Push notifications**
3.  Chọn **Create platform application**. Trong phần cài đặt chi tiết nhập tên ứng dụng, phần **Push notification platform** lựa chọn **Firebase Cloud Messaging (FCM)**. Tại phần **Firebase Cloud Messaging Credentials**,  nhập **API key** ở đây chính là server key đã coppy bên **Firebase** 
4.  cuối cùng chọn **Create platform application**. để hoàn thành việc tạo

![](https://images.viblo.asia/172f7a05-c32b-4ad8-9ba1-2617fa0e552f.png)


## Tạo application endpoint để push notification

Sau khi thực hiện bước 1,2 theo sơ đồ trên ta sẽ sử dụng token để tạo application endpoint. Đồng thời cũng có thể thêm các attributes User data để phục vụ việc filter và send message có chọn lọc sau này.
![](https://images.viblo.asia/178d909e-86c6-466e-bf6f-a2a22a25ba07.png)

Sau khi tạo xong ta có thể sử dụng app endpoint để push message rồi. Đây chỉ là demo, trong thực tế nên sử dụng aws cli để sự động hóa các công việc trên.


**Payload data**
```
{
   "GCM":"{  
       \"notification\": 
         { \"body\": \"Sample message for Android endpoints\", \"title\":\"TitleTest\" },
      \"data\":
         {\"time_to_live\": 3600,\"collapse_key\":\"deals\"}"
   }
}  
```
ngoài ra có thể bổ sung các attributes khác phù hợp với FCM

Sau khi có thông tin endpoint. Với những anh em sử dụng python có thể sử dụng boto3 để thao tác. Code demo

```
import json
import logging
import time
import boto3
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)


# snippet-start:[python.example_code.sns.SnsWrapper]
class SnsWrapper:
    """Encapsulates Amazon SNS topic and subscription functions."""
    def __init__(self, sns_resource):
        """
        :param sns_resource: A Boto3 Amazon SNS resource.
        """
        self.sns_resource = sns_resource
# snippet-end:[python.example_code.sns.SnsWrapper]

# snippet-start:[python.example_code.sns.CreateTopic]
    def create_topic(self, name):
        """
        Creates a notification topic.
        :param name: The name of the topic to create.
        :return: The newly created topic.
        """
        try:
            topic = self.sns_resource.create_topic(Name=name)
            logger.info("Created topic %s with ARN %s.", name, topic.arn)
        except ClientError:
            logger.exception("Couldn't create topic %s.", name)
            raise
        else:
            return topic
# snippet-end:[python.example_code.sns.CreateTopic]

# snippet-start:[python.example_code.sns.ListTopics]
    def list_topics(self):
        """
        Lists topics for the current account.
        :return: An iterator that yields the topics.
        """
        try:
            topics_iter = self.sns_resource.topics.all()
            logger.info("Got topics.")
        except ClientError:
            logger.exception("Couldn't get topics.")
            raise
        else:
            return topics_iter
# snippet-end:[python.example_code.sns.ListTopics]

    @staticmethod
# snippet-start:[python.example_code.sns.DeleteTopic]
    def delete_topic(topic):
        """
        Deletes a topic. All subscriptions to the topic are also deleted.
        """
        try:
            topic.delete()
            logger.info("Deleted topic %s.", topic.arn)
        except ClientError:
            logger.exception("Couldn't delete topic %s.", topic.arn)
            raise
# snippet-end:[python.example_code.sns.DeleteTopic]

    @staticmethod
# snippet-start:[python.example_code.sns.Subscribe]
    def subscribe(topic, protocol, endpoint):
        """
        Subscribes an endpoint to the topic. Some endpoint types, such as email,
        must be confirmed before their subscriptions are active. When a subscription
        is not confirmed, its Amazon Resource Number (ARN) is set to
        'PendingConfirmation'.
        :param topic: The topic to subscribe to.
        :param protocol: The protocol of the endpoint, such as 'sms' or 'email'.
        :param endpoint: The endpoint that receives messages, such as a phone number
                         (in E.164 format) for SMS messages, or an email address for
                         email messages.
        :return: The newly added subscription.
        """
        try:
            subscription = topic.subscribe(
                Protocol=protocol, Endpoint=endpoint, ReturnSubscriptionArn=True)
            logger.info("Subscribed %s %s to topic %s.", protocol, endpoint, topic.arn)
        except ClientError:
            logger.exception(
                "Couldn't subscribe %s %s to topic %s.", protocol, endpoint, topic.arn)
            raise
        else:
            return subscription
# snippet-end:[python.example_code.sns.Subscribe]

# snippet-start:[python.example_code.sns.ListSubscriptions]
    def list_subscriptions(self, topic=None):
        """
        Lists subscriptions for the current account, optionally limited to a
        specific topic.
        :param topic: When specified, only subscriptions to this topic are returned.
        :return: An iterator that yields the subscriptions.
        """
        try:
            if topic is None:
                subs_iter = self.sns_resource.subscriptions.all()
            else:
                subs_iter = topic.subscriptions.all()
            logger.info("Got subscriptions.")
        except ClientError:
            logger.exception("Couldn't get subscriptions.")
            raise
        else:
            return subs_iter
# snippet-end:[python.example_code.sns.ListSubscriptions]

    @staticmethod
# snippet-start:[python.example_code.sns.SetSubscriptionAttributes]
    def add_subscription_filter(subscription, attributes):
        """
        Adds a filter policy to a subscription. A filter policy is a key and a
        list of values that are allowed. When a message is published, it must have an
        attribute that passes the filter or it will not be sent to the subscription.
        :param subscription: The subscription the filter policy is attached to.
        :param attributes: A dictionary of key-value pairs that define the filter.
        """
        try:
            att_policy = {key: [value] for key, value in attributes.items()}
            subscription.set_attributes(
                AttributeName='FilterPolicy', AttributeValue=json.dumps(att_policy))
            logger.info("Added filter to subscription %s.", subscription.arn)
        except ClientError:
            logger.exception(
                "Couldn't add filter to subscription %s.", subscription.arn)
            raise
# snippet-end:[python.example_code.sns.SetSubscriptionAttributes]

    @staticmethod
# snippet-start:[python.example_code.sns.Unsubscribe]
    def delete_subscription(subscription):
        """
        Unsubscribes and deletes a subscription.
        """
        try:
            subscription.delete()
            logger.info("Deleted subscription %s.", subscription.arn)
        except ClientError:
            logger.exception("Couldn't delete subscription %s.", subscription.arn)
            raise
# snippet-end:[python.example_code.sns.Unsubscribe]

# snippet-start:[python.example_code.sns.Publish_TextMessage]
    def publish_text_message(self, phone_number, message):
        """
        Publishes a text message directly to a phone number without need for a
        subscription.
        :param phone_number: The phone number that receives the message. This must be
                             in E.164 format. For example, a United States phone
                             number might be +12065550101.
        :param message: The message to send.
        :return: The ID of the message.
        """
        try:
            response = self.sns_resource.meta.client.publish(
                PhoneNumber=phone_number, Message=message)
            message_id = response['MessageId']
            logger.info("Published message to %s.", phone_number)
        except ClientError:
            logger.exception("Couldn't publish message to %s.", phone_number)
            raise
        else:
            return message_id
# snippet-end:[python.example_code.sns.Publish_TextMessage]

    @staticmethod
# snippet-start:[python.example_code.sns.Publish_MessageAttributes]
    def publish_message(topic, message, attributes):
        """
        Publishes a message, with attributes, to a topic. Subscriptions can be filtered
        based on message attributes so that a subscription receives messages only
        when specified attributes are present.
        :param topic: The topic to publish to.
        :param message: The message to publish.
        :param attributes: The key-value attributes to attach to the message. Values
                           must be either `str` or `bytes`.
        :return: The ID of the message.
        """
        try:
            att_dict = {}
            for key, value in attributes.items():
                if isinstance(value, str):
                    att_dict[key] = {'DataType': 'String', 'StringValue': value}
                elif isinstance(value, bytes):
                    att_dict[key] = {'DataType': 'Binary', 'BinaryValue': value}
            response = topic.publish(Message=message, MessageAttributes=att_dict)
            message_id = response['MessageId']
            logger.info(
                "Published message with attributes %s to topic %s.", attributes,
                topic.arn)
        except ClientError:
            logger.exception("Couldn't publish message to topic %s.", topic.arn)
            raise
        else:
            return message_id
# snippet-end:[python.example_code.sns.Publish_MessageAttributes]

    @staticmethod
# snippet-start:[python.example_code.sns.Publish_MessageStructure]
    def publish_multi_message(
            topic, subject, default_message, sms_message, email_message):
        """
        Publishes a multi-format message to a topic. A multi-format message takes
        different forms based on the protocol of the subscriber. For example,
        an SMS subscriber might receive a short, text-only version of the message
        while an email subscriber could receive an HTML version of the message.
        :param topic: The topic to publish to.
        :param subject: The subject of the message.
        :param default_message: The default version of the message. This version is
                                sent to subscribers that have protocols that are not
                                otherwise specified in the structured message.
        :param sms_message: The version of the message sent to SMS subscribers.
        :param email_message: The version of the message sent to email subscribers.
        :return: The ID of the message.
        """
        try:
            message = {
                'default': default_message,
                'sms': sms_message,
                'email': email_message
            }
            response = topic.publish(
                Message=json.dumps(message), Subject=subject, MessageStructure='json')
            message_id = response['MessageId']
            logger.info("Published multi-format message to topic %s.", topic.arn)
        except ClientError:
            logger.exception("Couldn't publish message to topic %s.", topic.arn)
            raise
        else:
            return message_id
# snippet-end:[python.example_code.sns.Publish_MessageStructure]


def usage_demo():
    print('-'*88)
    print("Welcome to the Amazon Simple Notification Service (Amazon SNS) demo!")
    print('-'*88)

    logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

    sns_wrapper = SnsWrapper(boto3.resource('sns'))
    topic_name = f'demo-basics-topic-{time.time_ns()}'

    print(f"Creating topic {topic_name}.")
    topic = sns_wrapper.create_topic(topic_name)

    phone_number = input(
        "Enter a phone number (in E.164 format) that can receive SMS messages: ")
    if phone_number != '':
        print(f"Sending an SMS message directly from SNS to {phone_number}.")
        sns_wrapper.publish_text_message(phone_number, 'Hello from the SNS demo!')

    email = input(
        f"Enter an email address to subscribe to {topic_name} and receive "
        f"a message: ")

    if email != '':
        print(f"Subscribing {email} to {topic_name}.")
        email_sub = sns_wrapper.subscribe(topic, 'email', email)
        answer = input(
            f"Confirmation email sent to {email}. To receive SNS messages, "
            f"follow the instructions in the email. When confirmed, press "
            f"Enter to continue.")
        while (email_sub.attributes['PendingConfirmation'] == 'true'
               and answer.lower() != 's'):
            answer = input(
                f"Email address {email} is not confirmed. Follow the "
                f"instructions in the email to confirm and receive SNS messages. "
                f"Press Enter when confirmed or enter 's' to skip. ")
            email_sub.reload()

    phone_sub = None
    if phone_number != '':
        print(f"Subscribing {phone_number} to {topic_name}. Phone numbers do not "
              f"require confirmation.")
        phone_sub = sns_wrapper.subscribe(topic, 'sms', phone_number)

    if phone_number != '' or email != '':
        print(f"Publishing a multi-format message to {topic_name}. Multi-format "
              f"messages contain different messages for different kinds of endpoints.")
        sns_wrapper.publish_multi_message(
            topic, 'SNS multi-format demo',
            'This is the default message.',
            'This is the SMS version of the message.',
            'This is the email version of the message.')

    if phone_sub is not None:
        mobile_key = 'mobile'
        friendly = 'friendly'
        print(f"Adding a filter policy to the {phone_number} subscription to send "
              f"only messages with a '{mobile_key}' attribute of '{friendly}'.")
        sns_wrapper.add_subscription_filter(phone_sub, {mobile_key: friendly})
        print(f"Publishing a message with a {mobile_key}: {friendly} attribute.")
        sns_wrapper.publish_message(
            topic, "Hello! This message is mobile friendly.", {mobile_key: friendly})
        not_friendly = 'not-friendly'
        print(f"Publishing a message with a {mobile_key}: {not_friendly} attribute.")
        sns_wrapper.publish_message(
            topic,
            "Hey. This message is not mobile friendly, so you shouldn't get "
            "it on your phone.",
            {mobile_key: not_friendly})

    print(f"Getting subscriptions to {topic_name}.")
    topic_subs = sns_wrapper.list_subscriptions(topic)
    for sub in topic_subs:
        print(f"{sub.arn}")

    print(f"Deleting subscriptions and {topic_name}.")
    for sub in topic_subs:
        if sub.arn != 'PendingConfirmation':
            sns_wrapper.delete_subscription(sub)
    sns_wrapper.delete_topic(topic)

    print("Thanks for watching!")
    print('-'*88)


if __name__ == '__main__':
    usage_demo()
```


Tham khảo thêm tại đây [https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/python/example_code/sns/sns_basics.py](https://github.com/awsdocs/aws-doc-sdk-examples/blob/master/python/example_code/sns/sns_basics.py)

## Tổng kết
Qua bài viết trên đã giới thiệu sơ bộ về Việc sử dụng SNS với FCM.
các tài liệu tham khảo:
* https://www.agalera.eu/sns-firebase-android-ios/
* https://aws.amazon.com/es/premiumsupport/knowledge-center/create-android-push-messaging-sns/
* https://docs.aws.amazon.com/sns/latest/dg/sns-mobile-application-as-subscriber.html
* https://docs.aws.amazon.com/sns/latest/dg/sns-send-custom-platform-specific-payloads-mobile-devices.html