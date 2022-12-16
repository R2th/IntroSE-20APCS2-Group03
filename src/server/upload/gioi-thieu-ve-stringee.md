# Giới thiệu

Stringee là nền tảng (SDK/API) cung cấp tính năng Nghe - Gọi - Chat - SMS, có thể tích hợp nhanh vào các ứng dụng web. 

Stringee có tới 6 cơ chế kết nối cuộc gọi của người dùng gồm:

1. Gọi từ App đến App: Kết nối internet

2. Gọi từ App đến Số di động: kết nối internet và sóng GSM

3. Gọi từ Số di động đến App: kết nối sóng GSM và internet

4. Gọi từ App đến tổng đài

5. Gọi từ Số di động đến Số di động thông qua 1 số ảo để giấu số người gọi

6. Cuộc gọi nhóm

Mức chi phí khi sử dụng Stringee tiết kiệm hơn nhiều lần so với các dịch vụ của nước ngoài, cũng như so với gọi điện thoại thông thường, cùng với những lợi ích nổi trội trên nên dù mới chỉ ra mắt một thời gian ngắn chúng tôi đã nhận được các yêu cầu tích hợp từ các thương hiệu lớn như Viettel, VOV, Misa, Mobifone, VnDirect, Mediamart,… và cũng đang có nhiều doanh nghiệp gửi yêu cầu tích hợp.

# Stringee for Web

## Stringee Call API Overview

Stringee Call API là công cụ dễ dàng giúp ta xây dựng ứng dụng voice với chất lượng cao trên cloud. Với Stringee Call API bạn có thể:

- Xây dựng những ứng dụng có thể dễ dàng tích hợp với các công nghệ web mà bận đang sử dụng
- Chức năng mua số điện thoại động
- Mở rộng kiến trúc của bạn với giao diện SIP
- Controll luồng của cuộc gọi bằng JSON với đối tượng Stringee Call Control Objects (SCCO): Tạo một cuộc gọi app to app hoặc app to phone, nhận và handle một cuộc gọi từ phone, transfer hay reject, record một cuộc gọi đến app
- Ghi lại và lưu trữ các cuộc gọi
- Tạo các cuộc họp đàm thoại

## Concepts

- Authentication với JWT: tương tác với Stringee Server được xác thực bằng JWTs
- SCCO: Stringee Call Control Objects
- answer_url: URL trên server của bạn gửi SCCO
- event_url: Stringee Server gửi thông tin đồng bộ đến URL này khi trạng thái cuộc gọi thay đổi.

## How Stringee Call works (some flows)

### Flow 1: Make a app-to-app call

Sử dụng Stringee Call API to nhúng app-to-app voice or video:
![](https://images.viblo.asia/50632d7e-6149-4cef-ba7c-3dd2a8fc2320.png)

- 1. Ứng dụng của bạn gọi một makeCall(from, to) với method: "from" là ID của người gọi(user_1), và "to" là ID của bên nhận(user_2)
- 2. Stringee Server get SCCO từ server của bạn bằng cách gửi một HTTP GET request đến answer_url, answer được config trong project của bạn ở dashboard developer stringee, ví dụ

```
https://yourserver.com/answer_url-from_internal.php?from=user_1&to=user_2&fromInternal=true&userId=user_1&projectId=22512&custom=
```

- 3. Your Server trả lại SCCO với format: 

```
[{
  "action": "connect",

  "from": {
    "type": "internal",
    "number": "user_1",
    "alias": "user_1"
  },

  "to": {
    "type": "internal",//internal: app-to-app call type
    "number": "user_2",//make a call to user_2
    "alias": "user_2",
  },

  "customData": "test-custom-data"
}]
```

### Flow 2: Make a app-to-phone call

![](https://images.viblo.asia/f105de85-1f55-4c3e-b19b-f3d23a29e879.png)

- 1. Ứng dụng của bạn gọi một makeCall(from, to) với method "from" là số điện thoại của bạn(phone_number_1), cái sẽ được hiển thị ở bên nhận, "to" là số bên nhận(phone_number_2)
- 2. Stringee Server gets SCCO from Server của bạn bằng cách gửi một HTTP GET request đến answer_url, answer_url được configed in project của bạn trên https://developer.stringee.com, ví dụ:

```
https://yourserver.com/answer_url-from_internal.php?from=phone_number_1&to=phone_number_2&fromInternal=true&userId=user_1&projectId=22512&custom=
```

- Server của bạn trả lại SCCO với format:

```
[{
  "action": "connect",

  "from": {
    "type": "internal",
    "number": "phone_number_1",//the phone number that displayed to the called party.
    "alias": "phone_number_1"
  },

  "to": {
    "type": "external",//external: app-to-phone call type
    "number": "phone_number_2",//make a call to this phone number
    "alias": "phone_number_2",
  },

  "customData": "test-custom-data"
}]
```

### Flow 3: Receive a phone call

![](https://images.viblo.asia/ca71ef89-4cfe-4f35-b039-95e726623f6d.png)

- 1. Số  điện thoại của bạn(phone_number_1) tạo một cuộc gọi đến String Serve
- 2. Stringee Server gets SCCO from Server của bạn bằng cách gửi một HTTP GET request đến answer_url, answer_url được configed in project của bạn trên https://developer.stringee.com, ví dụ

```
https://yourserver.com/answer_url-from_external.php?from=phone_number_2&to=phone_number_1&uuid=882696e2-bb01-11e7-8056-3fae8fb0a1ad&fromInternal=false
```

- Server của bạn trả lại SCCO với format:

```
[{
    "action": "connect",

    "from": {
        "type": "external",
        "number": "phone_number_2",//the caller's phone number
        "alias": "phone_number_2"
    },

    "to": {
        "type": "internal",//internal: the call is routed to Your App
        "number": "user_1",// the call is routed to this user.
        "alias": "phone_number_1"//your phone number which bought from Stringee
    },

    "customData": "test-custom-data"
}]
```

### Flow 4: Receive a phone call and route to phone

![](https://images.viblo.asia/2fcd15dc-df69-43f5-b733-99a348c775e2.png)


- 1. Số  điện thoại của bạn(phone_number_1) tạo một cuộc gọi đến String Serve
- 2. Stringee Server gets SCCO from Server của bạn bằng cách gửi một HTTP GET request đến answer_url, answer_url được configed in project của bạn trên https://developer.stringee.com, ví dụ

```
https://yourserver.com/answer_url-from_external.php?from=phone_number_2&to=phone_number_1&uuid=882696e2-bb01-11e7-8056-3fae8fb0a1ad&fromInternal=false
```

- Server của bạn trả lại SCCO với format:

```
[{
    "action": "connect",

    "from": {
        "type": "external",
        "number": "phone_number_2",//the caller's phone number
        "alias": "phone_number_4"//your phone number which bought from Stringee
    },

    "to": {
        "type": "external",//external: the call is routed to phone
        "number": "phone_number_3",// the call is routed to this phone.
        "alias": "phone_number_3"
    },

    "customData": "test-custom-data"
}]
```

Note: phone_number_4 có thể giống hoặc khác phone_number_1

# Lời kết

Trên đây là overview về stringee, bài viết sẽ tiếp tục trong phần tiếp theo