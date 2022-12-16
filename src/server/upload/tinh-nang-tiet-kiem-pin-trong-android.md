## Doze mode là gì ?
Doze mode là tính năng tiết kiệm năng lượng được giới thiệu trên Android 6.0 ( API level 23 )

Ý tưởng chính của tính năng này là sẽ thực hiện giảm thiểu và tiết kiệm năng lượng khi người dùng chưa cần hoặc đang không sử dụng điện thoại. Giả sử khi người dùng cất điện thoại và đi đến một nơi nào đó,  khoảng 1 giờ sau, người dùng đến nơi và mở điện thoại lên thì pin không nên được sụt giảm quá nhiều.

## Doze mode hoạt động như thế nào
Có 2 giai đoạn của Doze mode
Giai đoạn chính ( hay còn gọi là Deep Doze ) được giới thiệu trên Android 6.0 sẽ kích hoạt khi thoả mãn 3 điều kiện sau
* Thiết bị không được kết nối sạc
* Màn hình bị khoá
* Không có tương tác nào được ghi nhận trong một khoảng thời gian ( tầm 30 phút )

Khi trong Doze mode, hệ thống sẽ trì hoãn các hoạt động làm tốn pin như các lời gọi network, các wake-locks, alarms ( AlarmManager ) để tiết kiệm năng lượng. Hệ thống sẽ định kỳ để cho Doze mode một khoảng thời gian ngắn ( gọi là maintain window ) để thực hiện các hoạt động trì hoãn này. Qua thời gian, hệ thống sẽ đặt lịch cho các maintain window này ít dần đi.

Hệ thống sẽ thoát khỏi Doze mode khi mà người dùng bắt đầu sử dụng máy như di chuyển, mở khoá màn hình hay kết nối với bộ sạc.

Trên Android 7 ( Nougat ) thêm một phiên bản nhẹ hơn của Doze mode gọi là Light Doze. Light Doze được kích hoạt khi mà màn hình khoá tắt và thiết bị không được kết nối nguồn sạc. Light Doze cũng giống như Deep Doze, tuy nhiên nó sẽ ít những điều kiển để có thể khởi động và maintain window sẽ thường xuyên hơn. 

Doze Mode chuyển từ Light Doze sang Deep Doze  một khi các điều kiện của Deep Doze được thỏa mãn.
![](https://images.viblo.asia/bbbf0eec-6496-4dbb-a391-c46c31b6aca1.png)

## Các hoạt động bị hạn chế trong Doze mode
* Các network call
* Wake lock bị disable
* Alarms trong AlarmManager sẽ bị hạn chế khi trong maintain window
(ngoại trừ các hàm setAndAllowWhileInIdle(), setExactAndAllowWhileIdle(), setAlarmClock())
* Hệ thống sẽ không tự động scan wifi hay GPS
* Hệ thống chặn hoạt động của JobScheduler

## Làm thế nào để thực hiện các hành động quan trọng khi đang trong Doze mode
Như trên đối với AlarmManager, ta vẫn có thể gọi các hàm setAndAllowWhileIdle() hoặc setExactAndAllowWhileIdle() để thực hiện hành động trong Doze mode. 

Tuy nhiên ta lại không thể thực hiện lời gọi network thông qua while-idle alarm khi trong Doze mode, nó sẽ dẫn tới UnknownHostException. Nếu bạn vẫn muốn thì nên sử dụng JobScheduler hoặc WorkManager

Đối với các action cần được kích hoạt thông qua backend, thì bạn nên sử dụng FCM. Bằng cách thiết đặt high-priority messages trên FCM, bạn có thể gửi đi hoặc xử lí đc message ngay lập tức kể cả trong Doze mode

Đối với các apps cần active liên tục ( như app chỉ đường bản đồ ) thì bạn có thể sử dụng Foreground Service. Foreground Service được miễn hạn chế trong Doze mode.

Đối với các trường hợp khác mà phía trên k đáp ứng được, bạn có thể request người dùng whitelist app đó để có thể thực hiện network call hay wakelocks.

Bạn có thể yêu cầu quyền REQUEST_IGNORE_BATTERY_OPTIMIZATIONS để cho người dùng có thể tắt Doze mode cho app.

## App Standby là gì ?
App Standby là một chức năng tiết kiệm năng lượng khác cũng được giới thiệu ở Android 6.0
Ý tưởng của nó là hệ thống sẽ giữ 1 danh sách các app idling mà người dùng rất ít hoặc hiếm khi tương tác sử dụng, Hệ thống sẽ hạn chế các tác vụ tiêu tốn pin của các app này ( network, background job ... )

Một app idling là app mà người dùng không tương tác đến và cũng không có pending notification nào trong lock screen

App idling chỉ có 1 maintain window trong một ngày để chạy tất cả các job hay network call bị delay. Làm cách này hệ thống giảm thiểu được nhiều các tác vụ tiêu tốn năng lượng.

Một app sẽ thoát khỏi idle mode khi thiết bị được kết nối nguồn điện hoặc khi người dùng sử dụng app hoặc show notification.

## App Standby Buckets là gì ?
Đây cũng là một chức năng tiết kiệm khác mới được giới thiệu ở Android 9. Nó giống như là chức năng App Standby 2.0.
Ý tưởng của nó là nhờ hệ thống xác định mức độ sử dụng của các app gần đây. Hệ thống sẽ phân loại các app vào các buckets với các category sau
* Active : app hiện được sử dụng hoặc hay được sử dụng gần đây
* Working Set : app được sử dụng hàng ngày
* Frequent : app được sử dụng thường xuyên nhưng không hàng ngày
* Rare : app ít được dùng
* Never : app được cài đặt nhưng chưa được dùng

## Các hoạt động hạn chế trong App Standby Buckets
* Active : không có hạn chế về network, background job, timer cho các app này
* Working Set : Có hạn chế nhẹ dựa trên khả năng chạy jobs ( lên đến 2 giờ ) và alarms ( hạn chế lên đến 6 phút )
* Frequent : Có hạn chế lớn hơn như khả năng chạy jobs ( lên đến 8 giờ ), alarms ( lên đến 30 phút ) và high priority message FCM chỉ nhận 10 messages 1 ngày. 
* Rare : Khả năng chạy jobs ( lên đến 24 giờ ), alarms ( lên đến 2 giờ ), nhận high priority message 5 message 1 ngày, khả năng truy cập network ( lên đến 24 giờ )

> Các app nằm trong Doze mode whitelist không bị ảnh hướng bởi các hạn chế này

> Nếu muốn biết app đang ở trong category nào, bạn có thể sử dụng cài đặt "Standby Apps" trong Developer Options.