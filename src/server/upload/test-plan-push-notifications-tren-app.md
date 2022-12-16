Đây là kế hoạch để thử nghiệm tính năng Push notiffication trên thiết bị di động, còn tùy thuộc vào specs khác nhau sẽ có yêu cầu sản phẩm và UX khác nhau.

Push notification tập trung vào việc cung cấp thông báo đẩy tới ứng dụng dành cho thiết bị di động khi tester/ dev đăng thông báo mới. 

## Những điều cần lưu ý
- Chuyển đổi phía ứng dụng cho các thông báo là cài đặt dành riêng cho thiết bị và không được đồng bộ hóa với các thiết bị khác của người dùng.
- Push notification đối với từng thiết bị cụ thể. Vì vậy, các thiết bị sẽ không tự động nhận được thông báo khi không có tại địa phương (ví dụ: nếu danh sách đăng ký đã lỗi thời).
- Android và iOS hoạt động khác nhau :
    - Nhận được thông báo khi ứng dụng ở foreground
    - Thông báo thu gọn (collapsing messages)(iOS chỉ hiển thị thông báo mới nhất) 
# Nhận push
## Các kịch bản trạng thái ứng dụng
1. Foreground  - tin nhắn nhận được trong khi ứng dụng ở Foreground ( Lưu ý: tin nhắn sẽ được nhận trên Android, không phải iOS)
- Nhấn vào thông báo Thông báo push sẽ đưa người dùng đến trang đích khi gửi push. 
2. Background  - tin nhắn nhận được trong khi ứng dụng ở chế độ nền
- Nhấn vào thông báo Thông báo push sẽ đưa ứng dụng lên nền trước và đưa người dùng đến trang đích khi gửi push
3. Closed app - tin nhắn được gửi trong khi ứng dụng không mở
 - Tin nhắn sẽ không được nhận cho đến khi ứng dụng mở
-  Mở app và tin nhắn push sẽ được nhận


## Trường hợp nhiều thiết bị
1. Browser và mobile - đăng ký tài khoản push notification trên trình duyệt

* Case 1
    - Tạo tài khoản X và đăng ký Push notification trong trình duyệt
    - Đăng nhập vào tài khoản trên thiết bị di động
    - Gửi và nhận thông báo push tới thiết bị di động
* Case 2
    - Tạo tài khoản X trong trình duyệt
    - Đăng nhập vào tài khoản trên thiết bị di động
    - Đăng ký push notification trong trình duyệt
    - Gửi và nhận thông báo push tới thiết bị di động.
   
2. Hai thiết bị di động 
* Case 1
    - Tạo tài khoản X và đăng ký push notification trên DeviceA
    - Gửi và nhận PushNotification1 đến DeviceA
    - Đăng nhập vào tài khoản trên DeviceB
    - Gửi và nhận PushNotification2 đến DeviceA và DeviceB
* Case 2
    - Tạo tài khoản X trên DeviceA
    - Đăng nhập vào tài khoản trên DeviceB
    - Đăng ký push notification trên DeviceA
    - Gửi và nhận thông báo push tới DeviceA và DeviceB 

3. Hai- ba thiết bị di động - tắt push notification trên 1 device
- Tạo tài khoản X và đăng ký push notiication trên DeviceA
- Đăng nhập vào tài khoản trên DeviceB
- Tắt thông báo push notiication trên DeviceA
- Gửi và nhận thông báo PUSH - chỉ đến DeviceB
- Đăng nhập vào tài khoản trên DeviceC
- Gửi và nhận thông báo push - tới DeviceB và DeviceC

## Các kịch bản đối với case nhiều tài khoản
### Thiết lập
- Tạo tài khoản A và đăng ký push notiication 1a cho tài khoản A trên thiết bị di động
- Đăng xuất
- Tạo tài khoản B và đăng ký push notiication 2b cho tài khoản B trên thiết bị di động
- Đăng xuất
### Tin nhắn được gửi khi đăng xuất
- Gửi thông báo push notiication 1a (không nên nhận)
- Gửi thông báo push notiication 1b (không nên nhận)
- Đăng nhập với tài khoản A
- Sẽ nhận được push notiication 1a, không nhận push notiication 1b
- Đăng xuất
- Đăng nhập tài khoản B
- Sẽ nhận được push notiication 1b, không nhận push notiication 1a
### Thông báo cho tài khoản đã đăng nhập
- Đăng nhập tài khoản B
- Gửi và nhận thông báo push notiication 1b
### Thông báo cho tài khoản chưa đăng nhập
- Đăng nhập tài khoản B
- Gửi thông báo push notiication 1a (không nên nhận)
- Đăng xuất
- Đăng nhập tài khoản A
- Sẽ nhận được thông báo push notiication 1a
## Tin nhắn thu gọn
- Tạo tài khoản X và đăng ký push notification trên thiết bị di động
- Gửi và nhận PushNotification1 đến thiết bị
- Đóng ứng dụng
- Gửi PushNotification2, PushNotification3
- Mở ứng dụng
- Nhận PushNotification2 và PushNotification3
## Thông báo chuyển đổi (Toggling)
### Thiết lập
Tạo tài khoản X và đăng ký push notiication trên thiết bị di động
### Chuyển đổi bên studio
1.  Bật tính năng trong quản trị django
- Đã chọn Push tới Mobile
    - Gửi và nhận thông báo push notiication bằng cách tạo checkbox push notiication được chọn
-  Đã bỏ chọn Push tới Mobile
    - Không nhận được thông báo push notiication bằng cách tạo checkbox push notiication không được chọn
2. Tắt tính năng trong quản trị django
- Checkbox thông báo push notiication sẽ không còn xuất hiện trong chế độ xem push notiication mới
- Thông báo push notiication không nhận được khi tạo một push notiication mới
### Chuyển đổi phía ứng dụng cho một push notiication
- Vô hiệu hóa thông báo cho một push notiication
    - Vô hiệu hóa thông báo cho một push notiication trên ứng dụng ( Lưu ý: đây là cài đặt push notiication cụ thể cho từng thiết bị (không phải tài khoản cụ thể)
    - Gửi thông báo push - không được nhận
- Cài đặt thông báo cho một push notiication được duy trì
    - Tắt thông báo push notiication trên ứng dụng
    - Gửi thông báo push - không được nhận
    - Đăng xuất và đăng nhập lại
        - Gửi thông báo đẩy - không được nhận
        - Xác minh thông báo vẫn bị tắt trong bảng điều khiển push notiication
- Đóng và mở lại ứng dụng
    - Gửi thông báo push - không được nhận
    - Xác minh thông báo vẫn bị tắt trong bảng điều khiển push notiication
- Bật thông báo cho push notiication
    - Bật thông báo cho push notiicationc đã tắt trước đó
    - Gửi và nhận thông báo push
- Thiết lập là push notiication cụ thể
    - Vô hiệu hóa thông báo push cho CourseA
    - Bật thông báo cho CourseB
    - Gửi và nhận thông báo đẩy cho CourseB
    - Gửi thông báo đẩy cho CourseA - không được nhận
- Cài đặt được bật theo mặc định
    - Ghi danh vào một push notiication CourseC
    - Xác minh cài đặt thông báo CourseB trên ứng dụng được bật
### Chuyển đổi phía ứng dụng cho toàn bộ ứng dụng
- Tắt thông báo cho ứng dụng X bằng cách cập nhật cài đặt trên toàn thiết bị
- Gửi thông báo push notiication - không được nhận
- Bật lại thông báo cho ứng dụng X bằng cách cập nhật cài đặt trên toàn thiết bị
- Thông báo push đã gửi trước đó vẫn chưa được nhận
- Gửi thông báo push - phải được nhận
## Parse Global Messaging
Kiểm tra việc gửi và nhận thông báo phát sóng không thông báo bằng cách sử dụng giao diện người dùng Parse.

- Đối với tất cả các thiết bị di động
- Chỉ với các thiết bị Android
- Chỉ với các thiết bị iOS
## Analytics
1. Google analytics
- Xác minh events  "received" 
- Xác minh events "tapped"
2. Tracking Logs CMS
- Sự kiện "Cập nhật khóa học đã lưu" phải bao gồm trường mới cho " push notiication tới thiết bị di động"
3. Parse analytics
- Ghi lại bất kỳ dữ liệu bị thu thập bất ngờ hoặc thú vị 

## Localization
Nội địa hóa phía máy khách của thông báo push hành động tùy chỉnh
## Kết luận
Phía trên là những plan tổng quan về push notification trên app, tùy thuộc spec cụ thể chúng ta sẽ có những case test, cũng như cách test phù hợp. Mình sẽ update test case cụ thể vào bài viết lần sau. Hi vọng hữu ích cho mọi người. 
## Tham khảo
https://openedx.atlassian.net/wiki/spaces/MA/pages/51118157/v1+Push+Notifications+Test+Plan