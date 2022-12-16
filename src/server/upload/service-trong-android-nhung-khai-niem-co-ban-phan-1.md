Có bao giờ bạn tự hỏi tại sao ứng dụng Android đã được thoát, tắt hẳn đi mà nhạc vẫn chạy, việc download vẫn được thực thi chưa ? Thật lạ phải không nào vì ta không còn nhìn thấy ứng dụng đó nữa. Vậy tại sao lại có thể vậy được ?
Câu trả lời rất đơn giản. Android đã cung cấp cho chúng ta một thành phần đó là Service - dịch vụ. Bài viết sẽ đi vào tìm hiểu khái niệm, phân loại và cách triển khai Service. Sau đây là phần một.

Bài viết cũng đồng thời được đăng tại blog của mình: [https://codecungtrung.com](https://codecungtrung.com)
- [Service trong Android – Những khái niệm cơ bản – Phần 1](https://codecungtrung.com/2019/11/android/advanced-android-service-trong-android/)

    Lướt qua để đọc nhiều bài viết khác nữa nhé :D

## I. Khái niệm
### 1. Service là gì ?
Service là 1 thành phần của Android, tạo bởi hệ thống, có thể thực hiện các hoạt động ... lâu dài trong background và không cung cấp giao diện người dùng, có thể hoạt động cả khi ứng dụng bị hủy.

Một thành phần ứng dụng khác có thể khởi chạy một service, và nó tiếp tục chạy trong background kể cả khi người dùng chuyển sang ... ứng dụng khác.

### 2. Tại sao sử dụng ?
Trong định nghĩa đã cung cấp cho chúng ta lý do sử dụng service. Ví dụ như xử lý về mạng, chơi nhạc, vào ra file, ... tất cả ở trong background

Có một * **Tips** * nhỏ cho phần này là :

Service chạy trong ... **main thread** của process chứa nó (process có thể chứa nhiều thread). Service không tạo **một thread riêng** của nó cũng như không chạy trong một process độc lập trừ khi bạn tạo ra. Vậy nên bình thường nó sẽ chạy trong ... **Main UI Thread**.

Vì thế nếu bạn muốn thực hiện 1 tác vụ nặng, tốn CPU, đợi kết quả, ... nên tạo 1 thread mới trong service để làm những việc đó, tránh lỗi **ANR** ( Application Not Responding ).

Thật hay phải không nào 😀

## II. Phân loại service
Trước kia người ta thường chia làm 2 loại Unbound Service và Bound Service. Nhưng giờ đã có cách phân loại mới như sau:

- **Foreground service**: thực hiện các tác vụ người dùng có thể chú ý, nhận biết và phải hiển thị một Notification. Ví dụ như một ứng dụng chơi nhạc thì phần người dùng nhận biết được chính là nhạc phát ra. Phần Notification sẽ hiển thị tên bài hát hiện tại, cho phép người dùng chuyển bài, dừng nhạc, ...

- **Background service**: thực hiện hành động người dùng ... ko cần chú ý trực tiếp. Từ Android 8.0, service chạy trong background bị giới hạn

- **Bound service**: cung cấp 1 giao diện Client - Server cho phép các thành phần tương tác với nó: gửi yêu cầu, nhận kết quả và thậm chí là IPC (inter-process communication) - giao tiếp qua nhiều tiến trình.

Sau đây mình sẽ đi vào chi tiết từng loại nhé

### 1. Unbound Service ( foreground + background service)
### a. Sử dụng
Mình gộp hai loại foreground và background service vào phần này - unbound service vì thấy hai loại này ... cơ bản là giống nhau. Các bạn có ý kiến gì thì cứ comment ở dưới nhé, rất hoan nghênh các bạn !

**Unbound** nghĩa là ... không ràng buộc. **Unbound** service là service sẽ chạy lâu dài, ko ràng buộc với thành phần giao diện start nó và ... vẫn chạy kể cả khi thành phần đó bị hủy. Chính là lúc bạn xóa hẳn app khỏi những ứng dụng gần đây đó - bị hủy, mà nhạc vẫn chạy, file vẫn down về.

Từ Android 8.0, unbound service mà không có một thông báo đi kèm sẽ không được phép hoạt động khi activity mất đi. Lúc đó bạn sẽ phải tạo một foreground service như ở trên và gọi tới **startForegroundService**() và **startForeground**().

### b. Vòng đời

Vòng đời của unbound service

<img src="https://o7planning.org/vi/10421/cache/images/i/1174191.png">


| onCreate() | Gọi bởi hệ thống khi service được start lần đầu tiên. Bạn có thể khởi tạo các đối tượng cần thiết cho service của bạn tại đây |
| -------- | -------- | 
| onStartCommand()     | Hệ thống gọi phương thức này khi một thành phần khác, chẳng hạn như một Activity, yêu cầu start service. Những công việc bạn muốn service làm sẽ được implement tại đây.     | 
| onDestroy() | Hệ thống gọi phương thức này khi service không còn được sử dụng và đang bị hủy (destroy). Bạn nên loại bỏ các đối tượng không cần thiết, dọn dẹp bộ nhớ ở đây.|

 **Tips** 

- Start service bằng startService() hoặc startForeGroundService() - sử dụng bắt đầu ở Android 8.0
- Một context gọi startService():

Nếu service đó chưa được tạo sẽ gọi onCreate() -> onStartCommand()

Nếu service đó đã được tạo -> ko gọi onCreate() mà gọi onStartCommand() luôn

=> Start bao lần thì ... chỉ có duy nhất một instance của service được tạo ra

 Có các cờ hay dùng để trả về của hàm onStartCommand, nó sẽ giúp hệ điều hành quyết định khi điện thoại hết bộ nhớ và các tác vụ khác đang cần:

- **START_STICKY**: bảo với hệ điều hành rằng cần tạo lại service khi có đủ bộ nhớ và call lại onStartCommand() với ... intent là null

- **START_NOT_STICKY**: bảo với hệ điều hành rằng ... không cần tạo lại service

- **START_REDELEVER_INTENT**: nếu Service bị kill thì nó sẽ được khởi động lại với một Intent là Intent cuối cùng mà Service được nhận. Điều này thích hợp với các service đang thực hiện công việc muốn tiếp tục ngay tức thì như download fie chẳng hạn

- **START_STICKY_COMPATIBILITY**: giống như **START_STICKY** nhưng nó không chắc chắn, đảm bảo khởi động lại service.

### c. Code
Code cho phần này khá đơn giản, sẽ gồm các bước sau:

- Khai báo service trong **AndroidManifest**

-  Extend lại class Service, viết lại các hàm **onCreate**(), **onStartCommand**() và **onDestroy**() theo mô tả ở phần vòng đời.

- Sau đó ở bên Client chỉ cần gọi **startService**(intent) để khởi chạy service hoặc **stopService**(intent) để dừng service.

Chi tiết hơn bạn hãy tham khảo tại cuối bài post nhé 😀

### d. stopService(intent) vs stopSelf() vs stopSeft(startId)
- **stopService**(intent): giúp bạn dừng service, nhưng gọi ở ngoài service muốn dừng
- **stopSeft**(): giúp bạn dừng service, nhưng gọi ở ... bên trong service
Mỗi lần gọi startService() thì trong onStartCommand() có paremater startId, sẽ được tăng thêm 1 đơn vị. Hay chưa 😀

- **stopSeft**(startId): giúp bạn dừng service hiện tại, nhưng chỉ khi startId trùng với id của service được ... start cuối cùng. Cái này hiểu như là bạn start một request tới service và khi kết thúc xử lý bạn cho stopSelf() chẳng hạn. Nhưng giữa lúc đó bạn lại start một request khác và lúc nó chưa xử lý xong, bạn đã stopSelf() ở trên rồi nên dĩ nhiên nó ... sẽ tèo luôn.
=> Nếu dùng stopSeft(startId) thì giờ khi stop sẽ là stop cái request xen giữa kia

=> Mọi thứ chạy sẽ ok !!!

Đến đây là hết về unbound service rồi. Bạn có ý kiến gì về những điều mình viết thì để lại comment ở phía dưới nhé. Còn giờ nào hãy tiếp tục tìm hiểu Bound service nhé ! Let's go !!!

### 2. Bound service
### a. Sử dụng
Giải thích về **bound service**: **bound** có nghĩa là ràng buộc. Khác với unbound service ở trên, khi tất cả các Client gọi unbind tới service - để ngắt kết nối với nó hoặc các Client đó bị hủy đi thì đồng thời ... service cũng bị hủy đi.

=> Vòng đời của service phụ thuộc, ràng buộc (bound) vào vòng đời của Client. Đây cũng chính là ý nghĩa của tên bound service đó.

**Bound service** được triển khai dưới dạng mô hình **Client - Server** (hẳn bạn cũng đã nghe tới phải ko nào 😀 ). Hình vẽ dưới đây mô phỏng cách hoạt động

<img src="https://codingwithmitch.s3.amazonaws.com/static/blog/9/open_bluetooth_connection.png">

- **Client** sẽ là các đối tượng gọi **bind** - liên kết tới service. Trong hình vẽ đó chính là Activity, có yêu cầu Service lấy tọa độ GPS
- **Server** chính là **service**, ở đây sẽ thực hiện các tác vụ, rồi trả về kết quả cho **client**. Trong hình vẽ thì Service sẽ thực hiện gọi tới GPS Module, nhận kết quả trả về rồi gửi trả tiếp cho Activity (Client)

Ở phần này mình có dùng 2 từ **unbind** và **bind** (sẽ tương ứng với 2 method là **unbindService**() và **bindService**() ). Nhiều bạn khả năng sẽ tự hỏi nó để làm gì nhỉ ? (tuy mình có giải thích ở ngay sau rồi). Vậy nên trong phần tiếp theo mình sẽ giải thích rõ hơn nhé 😀

### b. Vòng đời

Vòng đời của bound service

<img src="https://o7planning.org/vi/10421/cache/images/i/1174191.png">

| onCreate() |Tương tự như ở Unbound service ở trên |
| -------- | -------- | 
| onBind() | Service gọi phương thức này khi... thành phần khác muốn liên kết với nó bằng cách gọi bindService(). Hàm sẽ trả lại một đối tượng IBinder. Với unbound service, bạn sẽ trả về null. |
| onUnbind() | 	Hệ thống gọi phương thức này khi tất cả các clients đã bị ngắt kết nối khỏi service. Muốn ngắt kết nối với service bạn sẽ gọi tới unbindService(), hoặc chỉ cần bạn ... destroy client đi - ko gọi tới unbindService(). Tuy nhiên điều này là không nên nhé :3     | 
| onRebind() | 	Hệ thống gọi phương thức này khi Client mới đã kết nối với service, sau khi trước đó đã được thông báo rằng tất cả đã bị ngắt kết nối trong onUnbind(Intent). Lưu ý là khi onUnbind() trả về true thì phương thức này mới được gọi | 
| onDestroy() | Gọi phương thức này khi tất cả các Client gọi unbind tới service hoặc chúng đã bị hủy. Bạn nên loại bỏ các đối tượng không cần thiết, dọn dẹp bộ nhớ ở đây. |

Một số Tips ở phần này là:

- Bạn có thể kết nối nhiều client tới service đồng thời. Nhưng ... hàm **onBind**() sẽ chỉ được gọi để tạo đối tượng **IBinder** khi client đầu tiên bind tới ( wow ). Lý do ở đây là hệ thống đã ... **cache** đối tượng IBinder ở lần đầu tiên kia. Nên khi các client khác liên kết tới chỉ cần lấy ra và gửi đi thôi, đỡ mất công gọi lại 😀

**Tạm kết**

Service là 1 thành phần của Android, tạo bởi hệ thống, có thể thực hiện các hoạt động ... lâu dài trong background và không cung cấp giao diện người dùng, có thể hoạt động cả khi ứng dụng bị hủy.

Trước kia người ta thường chia làm 2 loại **Unbound Service** và **Bound Service**. Nhưng giờ đã có cách phân loại mới là 3 loại: Foreground service, Background service và Bound service. Nhưng cơ bản vẫn là 2 loại ở trên.

Unbound service và bound service có cách sử dụng, vòng đời riêng. Cần phải hiểu rõ từng loại để vận dụng cho đúng.

--------------------------------------------------------------------------------------

Bài viết khá dài, cảm ơn bạn đã đọc đến đây 😀

Có ý kiến đóng góp gì về nội dung bài viết, các bạn hãy để lại ở phía dưới nhé. Mong nhận được đóng góp của các bạn có thể hoàn thiện hơn. Cảm ơn các bạn 😀

Ở phần 2 chúng ta sẽ tiếp tục tìm hiểu về Bound Service, cách khởi tạo, một số lưu ý và một vài thông tin hữu ích khác nha.

**Tham khảo**

Code cho bound service: https://developer.android.com/guide/components/services#Declaring

Thay đổi ở Android 8.0 https://developer.android.com/about/versions/oreo/background

Tổng quan Service https://developer.android.com/reference/android/app/Service.html

-------------------------------------------------------------------------------

Xem thêm các bài viết khác của mình tại

Trên blog cá nhân :  [Code cùng Trung](https://codecungtrung.com/)
- [Service trong Android – Những khái niệm cơ bản – Phần 1](https://codecungtrung.com/2019/11/android/advanced-android-service-trong-android/)
- [Retrofit và Ok Http trong Android - Những điều cần biết](https://codecungtrung.com/2019/11/android/advanced-android/retrofit-va-ok-http-trong-android-nhung-dieu-can-biet/)
- [Deeplink đến Dynamic link trong Android - Những điều cần biết](https://codecungtrung.com/2019/11/android/advanced-android/deeplink-den-dynamic-link-trong-android-nhung-dieu-can-biet/)