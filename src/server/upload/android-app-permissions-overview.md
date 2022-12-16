## 1. Tổng quan
Mục đích của permission là bảo vệ quyền riêng tư của người dùng Android. Các ứng dụng Android phải request các quyền truy cập nhảy cảm của người dùng (như danh bạ và sms), cũng như các tính năng nhất định của hệ thống (như camera và internet). Tuỳ thuộc vào tính năng, hệ thống có thể cung cấp permission tự động hoặc có thể nhắc người dùng phe duyệt yêu cầu.

Một điểm thiết kế trọng tâm của kiến trung bảo mật Android là theo mặc định, không có ứng dụng nào có quyền thực hiện bất kỳ hoạt động nào có thể ảnh hưởng xấu đến các ứng dụng khác, hệ điều hành hoặc người dùng. Điều này bao gồm đọc hoặc ghi dữ liệu riêng tư của người dùng (danh bạ và email), đọc hoặc ghi file của ứng dụng khác, thực hiện kết nôi internet, giữ cho điện thoại luôn hoạt động, ...

Qua bài viết này minh muốn cung câp các tổng quan về cách Android permissions làm việc như thế nào, bao gồm: làm thế nào để permission hiển thị cho người dùng, sự khác biệt giữ permission request của install_time và runtime, permission được thực thi như thế nào? các loại permissions và phân theo nhóm của nó.
## 2.  Permission approval (phê duyệt permission)
Ứng dung phải công khai các quyền (permission) cái mà nó yêu cầu bằng thẻ <uses-permission> trong file manifest. Ví dụ, một ứng dụng cần gửi SMS message sẽ có dòng này trong Mainifest
```Kotlin
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.example.snazzyapp">

    <uses-permission android:name="android.permission.SENDSMS"/>

    <application ...>
        ...
    </application>
</manifest>
```
Nếu ứng dụng của ta chỉ có danh sách các permissions bình thường trong file manifest của nó (nghĩa là các quyền không gây ra nhiều rủi ro cho quyền riêng tư của người dùng hoặc hoạt động của thiết bị), hệ thống tự động cấp quyền đó cho ứng dụng của bạn
    
Nếu ứng dụng có các quyền nguy hiểm trong manifest (các quyền ảnh hưởng đến quyền riêng tư của người dùng hoặc ảnh hưởng đến hoạt động bình thường của thiết bị), chẳng hạn như quyền SEND_SMS ở trên, người dùng phải đồng ý rõ ràng để cấp các quyền đó.
 
### Request nhắc nhở cho permission nguy hiểm
Cách Android yeu cầu người dùng cấp quyền nguy hiẻm tuỳ thuộc vào phiên bản Android chạy trên thiết bị và system version target trên ứng dụng của ta.

***Runtime requests (Android 6.0 và cao hơn)***
    
Nếu thiết bị đang chạy Android 6.0 (API cấp 23) trở lên và taretSdkVersion của ứng dụng là 23 hoặc cao hơn, người dùng không được thông báo về bất kỳ quyền ứng dụng nào khi cài đặt. Ứng dụng của ta phải yêu cầu người dùng cấp các quyền nguy hiểm tại runtime. Khi ứng dụng của ta yêu cầu quyền, người dùng sẽ thấy dialog hệ thống cho biết nhóm permission nào mà ứng dụng đang cố truy cập. Dialog bao gồm 2 button là Deny và Allow button.
    
Nếu người dùng không đồng ý thì lần sau ứng dụng của ta vẫn xuát hiện dialog và yêu cầu tiếp. Tuy nhiên nếu người dùng tick vào checkbox never ask again thì lần sau hệ thống sẽ không cho hiện thỉ dialog để requets permission nữa.
![](https://images.viblo.asia/e012ebb0-7612-4a7c-8f0d-37f1431ddf6d.png)
Nếu người dùng cung cấp cho ta các quyền mà ta đã yêu cầu nhưng sau này họ có thẻ tuỳ chọn bật hoặc tắt từng quyền mộ trong cài đặt hệ thống. Ta phải luôn kiểm trả và yêu cầu permission tại runtime để chống lỗi (SecurityException)

***Request install-time (Android 5.1 và nhỏ hơn)***

Với các thiết bị này, hệ thống tự động yêu cầu người dùng cấp tất cả các quyền nguy hiểm hco ứng dụng của bạn khi cài đặt
 ![](https://images.viblo.asia/e3d0c7d0-30eb-4ddd-939c-2f4bacab8392.png)
Nếu người dùng chấp nhận, tát cả các quyền yêu cầu của ứng dụng được cấp. Nếu người dùng từ chối, hệ thống sẽ huỷ cài đặt ứng dụng. 
## 3.  Permission cho tính năng phần cứng
Truy cập vào một số tính năng phần cứng (như Buletooth hoặc Camera) cần có sự cho phép của ứng dụng. Tuy nhiên không phải tất cả các thiết bị Android thực sự có các tính năng phần cứng này. VÌ vậy nếu ứng dụng của bạn có yêu cầu quyền camera, bạn cũng khai báo trong mainifest để tuyên bố nó có là tính năng quan trọng hay không.
```Kotlin
<uses-feature android:name="android.hardware.camera" android:required="false" />
```
Nếu bạn khai báo thêm thuộc tính android: required = "false", thì Google Play hco phép ứng dụng của bạn được cài đặt trên các thiết bị không có tính năng này. Do vậy bạn nên kiểm tra trong thời gian chạy, thiết bị có nhưng tính năng nào băng lời gọi PackageManager.hasSystemFeature(), ứng dụng sẽ nhẹ nhàng vô hiệu hoá tính năng đó nếu nó không có sẵn.
    
Nếu ta không cung cấp thẻ <uses-feature>, khi Google Play thấy ứng dụng request một quyền, nó giả định ứng dụng yêu cầu tình năng này. Vậy nó lọc cá ứng dụng không có tính năng này, giống như bạn khai bỏ thuộc tính android:required="true"
## 4.  Thực thi Permission
Permission không chỉ request chức năng hệ thống. Các Service được cung cấp bởi ứng dụng có thể thực thi một custom permission để hạn chế những ai sử dụng. 
### Activity permission
Permission được áp dụng bằng cách sử dụng thuộc tính andorid: allow trong thẻ <activity> ở mainifest để hạn chế những ai có thể start Activity đó. Permission được kiểm tra trong Context.startActivity () và Activity.startActivityForResult (). Nếu có lỗi thì sẽ ném ra một SecurityException. 
### Service Permission
Được sử dụng bằng cách sử dụng thuộc tính android:permission trong thẻ <service> ở mainifest để hạn chế người dùng có thể start haowcj bind tới Service. Quyền được kiểm tra trong Context.startService (), Context.stopService () và Context.bindService (). Nếu cuộc gọi ko có yêu cầu permission thì ngoại lệ SecurityException sẽ được ném ra.
### Broadcast Permission
TƯơng tự trên thì trong thẻ <receiver> sẽ khai báo thuộc tính android:permission ai có thể gửi truyền phát đến BroadcastReceiver liên quan. Permission đã được check sau khi Context.sendBroadcast return
### ContentProvider Permission
Thẻ provider cũng tương tự như các components trên là cũng có thuộc tính android:permission để hạn chế quyền truy cập. Nhưng ở đây có thêm một điều khác biệt đó là có hai thuộc tính cấp phép riêng biệt mà bạn có thể đặt: android: readPermission hạn chế những người có thể đọc từ provider và android: writePermission hạn chế những người có thể viết cho nó.
### URI Permission
Các permission chuẩn thường không đủ với ContentProvider, một ContentProvider có thể muốn tự bảo vệ mình bằng quyền đọc và ghi, trong khi các client cũng cần trao đổi các URI cụ thể cho các ứng dụng khác hoạt động. 
    
Có một ví dụ đó là ứng dụng email có các file, truy cập email nên được bảo vệ bởi các quyền. Tuy nhiên nếu một URI cho tệp đính kèm hình ảnh được cung cấp cho trình xem ảnh, thì trình xem hỉnh ảnh này cũng không có lý do gì để truy cập tất cả các email. 
    
Để giải quyết vấn đề này ta có thể sử dụng URI-Permission. Khi start một Activity và trả về một kết quả ở Activity khác, cuộc gọi có thể đặt Intent.FLAG_GRANT_READ_URI_PERMISSION và / hoặc Intent.FLAG_GRANT_WRITE_URI_PERMISSION.
### Other Permission
Các permission chi tiết có thể được thực thi tại bất cuộc gọi nào vào Service. Điều này được thực hiện bằng phương thức Context.checkCallingPermission ().
Ngoài ra còn một số quyền chưa được nói đến ở đây, các bạn có thể tham khảo thêm nhé.
## 5.  Điều chỉnh permission tự động
Theo thời gian, các hạn chế mới có thể được thêm vào platform sao cho, để sử dụng một số API nhất định, ứng dụng của bạn phải yêu cầu permission mà trước đây nó không cần. Bởi vì các ứng dụng hiện tại cho rằng quyền truy cập vào các API đó là miễn phí. Android có thể áp dụng permission cấp phép mới cho manifest của ứng dụng để tránh phá vỡ ứng dụng trên phiên bản platform mới. Android đưa ra quyết định liệu một ứng dụng có thể cần permission hay không dựa trên giá trị được cung cấp cho thuộc tính targetSdkVersion
## 6.  Cấp độ bảo vệ
Permisson được chia thành nhiều cấp bảo vệ. Mức bảo vệ ảnh hưởng đến runtime permission hay không.
    
Có ba cấp độ bảo vệ ảnh hưởng đến các ứng dụng của bên thứ ba: normal, signature và dangerous permission. 
## 7.  Permission đặc biệt
Có một số quyền (permission) không hoạt động như các quyền bình thường (normal) và nguy hiểm (dangrous). SYSTEM_ALERT_WINDOW và WRITE_SETTING đặc biệt nhạy cảm, vì vậy hầu hết các ứng dụng không nên sử dụng chúng. Nếu một ứng dụng cần một trong những quyền này, nó phải khai báo quyền trong manifest và gửi một intent yêu cầu ủy quyền của người dùng
## 8.  Nhóm permission
Permission được tổ chức thành các nhóm liên quan đến khả năng hoặc tính năng của thiết bị. Trong hệ thống này, các permission request được xử lý ở cấp độ nhóm và một nhóm quyền duy nhất tương ứng với một số khai báo quyền trong manifest. Ví dụ: SMS group bao gồm cả khai báo READ_SMS và RECEIVE_SMS. Phân nhóm quyền theo cách này cho phép người dùng đưa ra các lựa chọn có ý nghĩa và sáng suốt hơn mà không bị quá tải bởi các yêu cầu cấp phép kỹ thuật và phức tạp
![](https://images.viblo.asia/21c2eccd-1204-4e20-8a0d-8452c2b0eccf.png)
## 9.  Xem quyền của ứng dụng
Ta có thể xem tất cả các quyền hiện được xác định trong hệ thống sử dụng Setting app và lệnh 
```
adb shell pm list permissions
``` 
Chọn Setting -> Apps. Chọn một ứng dụng và cuộn xuống để xem các quyền mà ứng dụng sử dụng. Đối với chế độ nhà phát triển, tùy chọn adb '-s' hiển thị các quyền ở dạng tương tự như cách người dùng nhìn thấy chúng:
```
$ adb shell pm list permissions -s
All Permissions:

Network communication: view Wi-Fi state, create Bluetooth connections, full
internet access, view network state

Your location: access extra location provider commands, fine (GPS) location,
mock location sources for testing, coarse (network-based) location

Services that cost you money: send SMS messages, directly call phone numbers

...
```
Bạn cũng có thể sử dụng tùy chọn adb -g để tự động cấp tất cả các quyền khi cài đặt ứng dụng trên trình giả lập hoặc test device
```
$ adb shell install -g MyApp.apk
```
## 10.  Tổng kết
Qua bài viết này thì mình đã giới thiệu một cách tổng quan về Android app permission. Chắc chắn còn nhiều hạn chế và thiếu sót. Cám ơn các bạn đã theo dõi.
   
Để thực hiện bài viết này mình đã tham khảo doc của google