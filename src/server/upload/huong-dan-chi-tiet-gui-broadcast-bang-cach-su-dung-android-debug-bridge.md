Khi làm việc với Android, chắc các bạn đã biết và sử dụng BroadcastReceiver để lắng nghe một sự kiện nào đó từ hệ thống hoặc một app khác gửi đến.

Vậy chúng ta làm thế nào để test case này, ví dụ chúng ta bắt sự kiện tắt mở máy chẳng hạn, chẳng có nhẽ chúng ta cũng phải tắt mở device liên tục để test case này.

Hôm nay, tôi sẽ hướng dẫn bạn sử dụng ADB để gửi broadcast nhé.

## 1. Android Debug Bridge là gì.
Android Debug Bridge (adb) là một công cụ dòng lệnh cho phép bạn giao tiếp với một hoặc nhiều thiết bị android trong khi đang kết nối với máy tính.

Lệnh adb tạo điều kiện cho một loạt các hành động thiết bị, chẳng hạn như cài đặt và gỡ lỗi ứng dụng.
ADB nằm trong gói SDK Công cụ nền tảng Android. 

Bạn có thể tải xuống gói này với SDK Manager, nó nằm tại android_sdk/platform-tools/. Hoặc nếu bạn muốn chỉ tải xuống ADB, nó nằm  tại [đây](https://developer.android.com/studio/releases/platform-tools).
## 2. Kích hoạt Android Debug Bridge.
Để sử dụng adb với thiết bị android được kết nối qua USB, bạn phải bật gỡ lỗi USB trong <cài đặt hệ thống> -> <thiết bị> -> <Tùy chọn nhà phát triển>.

Trên Android 4.2 trở lên, màn hình <Tùy chọn Nhà phát triển> được ẩn theo mặc định. Chi tiết cách bật và cài đặt chế độ <Tùy chọn Nhà phát triển> trên thiết bị android có thể xem tại [đây](https://developer.android.com/studio/debug/dev-options)

Bây giờ, hãy kết nối thiết bị của bạn với USB tới máy tính. Bạn có thể xác minh rằng thiết bị của bạn được kết nối bằng cách mở giao diện terminal, di chuyển tới thư mục adb và thực hiện dòng lệnh sau:

`adb devices`

Nếu kết nối thành công, bạn sẽ thấy thiết bị của mình tại "List of devices attached". Đây là ví dụ khi mình kết nối thành công adb tới máy ảo android:
```
List of devices attached
emulator-5554	device
```

Lưu ý : Khi bạn kết nối thiết bị chạy Android 4.2.2 trở lên, hệ thống sẽ hiển thị hộp thoại hỏi có chấp nhận khóa RSA cho phép gỡ lỗi thông qua máy tính này hay không, nhớ bấm "Có" để cho phép kết nối ADB.

Cơ chế bảo mật này bảo vệ thiết bị người dùng vì nó đảm bảo rằng việc gỡ lỗi USB và các lệnh adb khác không thể được thực hiện trừ khi bạn có thể mở khóa thiết bị và xác nhận hộp thoại RSA.

## 3. Hướng dẫn sử dụng ADB để gửi Broadcast Intent.

Cú pháp gửi Broadcast trong adb là :

`adb shell am broadcast [options] intent`

Chi tiết cho tham số trong intent hãy xem bảng dưới đây:


| Option | Description | Example |
| -------- | -------- | -------- |
|-a|Thêm **Intent action**, vd: android.intent.action.VIEW. Chỉ có thể khai báo một lần.|`adb shell am broadcast -a com.example.intent.TEST`|
|-d|Thêm **Intent data URI**, vd: content://contacts/people/1. Chỉ có thể khai báo một lần.|`adb shell am broadcast -a "com.example.app.action.Example" -d "http://developer.android.com"`|
|-t|Thêm **Intent MIME type**, vd: image/png. Chỉ có thể khai báo một lần.|`adb shell am broadcast -a "com.example.app.action.Example" --es "android.intent.extra.TEXT" "Hello World" -t "text/plain"`|
|-c|Thêm **Intent category**, vd: android.intent.category.APP_CONTACTS.|`adb shell am broadcast -a "com.example.app.action.Example" -c android.intent.category.DEFAULT -d "some data"`|
|-n|Thêm **Component Name** với package name prefix để khởi tạo một explicit intent, vd: com.example.app/.ExampleActivity. |`adb shell am broadcast -a "com.example.app.action.Example" -n com.example.app.action.Example/.ExampleReceiver`|
|-f|Thêm **Flags** vào intent, giống như khi bạn setFlags() trong code .|`adb shell am broadcast -a "com.example.app.action.Example" -f 67108864`|
|--esn|Thêm một giá trị rỗng **(null)**. Tùy chọn này không được hỗ trợ cho URI intents.|`adb shell am broadcast -a "com.example.app.action.Example" --esn`|
|--e\|--es|Thêm kiểu dữ liệu **String** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --es "text" "Hello World"`|
|--ez|Thêm kiểu dữ liệu **bool** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --ez "bool" true`|
|--ei|Thêm kiểu dữ liệu **int** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --ei "int" 1234`|
|--el|Thêm kiểu dữ liệu **long** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --el "long" 1234567`|
|--ef|Thêm kiểu dữ liệu **float** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --ez "float" 3.14159`|
|--eu|Thêm kiểu dữ liệu **URI** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --eu "link" "http://google.com"`|
|--eia|Thêm một **array of integers** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --eia "array" "123,123,123"`|
|--ela|Thêm một **array of long** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --ela "array" "1234567,1234567,1234567`|
|--efa|Thêm một **array of float** theo dạng cặp key-value|`adb shell am broadcast -a "com.example.app.action.Example" --efa "array" "3.14159,3.14159,3.14159`|
|--ecn|Thêm **Component Name**, được converted thành đối tượng [ComponentName](https://developer.android.com/reference/android/content/ComponentName).||

Ngoài ra trong dự án thực, chúng ta có thể bắt gặp phải gửi json qua Intent, để gửi json chúng ta sử dụng định dạng :
`adb shell "am broadcast ... -e "KEY_VALUE" '"'JSON_TEXT'"'"`

Ví dụ:

`adb shell "am broadcast -a com.example.ACTION_TEST_FEATURE -e "notify" '"'{"debug": false, "title": "Application update!"}'"'"`

## 4. Kết bài
Trên đây là cách sử dụng adb để gửi broadcast tới thiết bị android. Ngoài ra, ADB còn hỗ trợ rất nhiều cách tính năng khác, bạn có thể tham khảo thêm tại [đây](https://developer.android.com/studio/command-line/adb).
Hy vọng qua bài viết này, các bạn có thể dễ dàng sử dụng adb để test với BroadcastReceiver.

Cảm ơn các bạn đã đọc bài viết của mình, nhớ upvote cho mình nhé. 

Love you so much!