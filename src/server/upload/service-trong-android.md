Đã bao giờ các bạn tự hỏi vì sao khi điện thoại bắt đầu có mạng thì messenger, zalo hay một số ứng dụng khác lại gửi 1 đống thông báo về cho điện thoại của bạn mặc dù bạn không bật ứng dụng chưa? Vâng chính là service đấy. Nói cho nôm thì có thể ứng dụng sử dụng service chạy ngầm để nhận thông báo từ server về và mỗi khi có mạng chúng sẽ hiển thị thông báo.
![](https://images.viblo.asia/4256fbe0-4cbe-45ce-bfd2-ba9db6966c39.gif)

Vậy service là gì?

Service là một trong 4 component lớn của android có khả năng thực hiện các tác vụ ngầm và không cung cấp giao diện người dung. Một Component có thể bắt đầu 1 service và nó sẽ tiếp tục chạy ngầm ngay cả khi người dung chuyển sang 1 ứng dụng khác. Ngoài ra 1 component có thể gắn kết với một Service để tương tác với nó.

### **1)	Bạn nên sử dụng Service hay Thread?**

Service đơn thuần là một thành phần có thể chạy ngầm ngay cả khi người dùng không đang tương tác với ứng dụng của bạn. Vì thế, bạn chỉ nên tạo một Service nếu đó là điều bạn cần.

Nếu bạn cần thực hiện công việc bên ngoài MainThread của mình, nhưng chỉ trong khi người dùng đang tương tác với ứng dụng của bạn, thì thay vào đó, bạn nên tạo một Thread mới chứ không phải một Service.

Ví dụ, nếu bạn muốn phát một bản nhạc, nhưng chỉ trong khi Activity của bạn đang chạy, bạn có thể tạo một Thread trong onCreate(), bắt đầu chạy nó trong onStart(), rồi dừng nó trong onStop(). Cũng xem xét việc sử dụng AsyncTask hoặc HandlerThread, thay vì sử dụng lớp Thread truyền thống. 
 
### 2)	Quản lý vòng đời của Service

   Vòng đời của 1 Service có thể đi theo 2 con đường khác nhau:

 ![](https://images.viblo.asia/0fdf94a8-51eb-495f-848b-97ee99b21302.png)
 
-	onCreate(): phương thức này sẽ được gọi khi Service được tạo lập lần đầu. Người sử dụng có thể thực hiện quy trình thiết lập một lần ở hàm này. Nếu như Service đã đang chạy, phương thức này sẽ không được gọi.

-	onStartCommand(Intent intent, int flags, int startId): được gọi sau hàm onCreate() ở lần tạo lập đầu tiên và gọi mỗi khi khởi động Service trong các lần tiếp theo bằng phương thức startService(). Giá trị trả về của hàm này mô tả cách tiếp tục service nếu nó bị hủy bao gồm:

    o	START_STICKY: tự tạo lại Service khi đã có đủ bộ nhớ và gọi onStartCommand() với 1 intent null.

    o	START_NOT_STICKY: không cần tạo lại Service

    o	START_REDELIVER_INTENT: Service được khởi tạo lại với Intent cuối cùng khởi tạo nó.

    o	START_STICKY_COMPATIBILITY: một phiên bản tương thích của START_STICKY, không đảm bảo rằng onStartCommand() sẽ được gọi lại.

-	onBind(): Hệ thống sẽ gọi phương pháp này khi một thành phần khác muốn gắn kết với Service. Trong triển khai phương pháp này của mình, bạn phải cung cấp một giao diện mà các máy khách sử dụng để giao tiếp với Service, bằng cách trả về IBinder. Bạn phải luôn triển khai phương pháp này, nhưng nếu bạn không muốn cho phép gắn kết thì bạn nên trả về null.

-	onUnbind(): được gọi khi tất cả các client không gắn kết với Service

-	onDestroy(): được gọi khi Service tự gọi stopself() hoặc một thành phần khác gọi stopService()

### 3)	Phân loại Service

**a.	Foreground Service**: là một Service mà người dùng nhận thức được nó đang hoạt động bằng cách cung cấp một Notificaion cho thanh trạng thái. Mặc định Notification sẽ đặt tiêu đề là “đang chạy”, điều này có nghĩ người sử dụng ko thể loại bỏ thông báo trừ khi dừng Service hoặc loại bỏ foreground.

-	Ví dụ, một trình chơi nhạc đang phát nhạc từ một Service là một Foreground Service, vì người dùng rõ ràng ý thức được hoạt động của nó. Thông báo trong thanh trạng thái có thể cho biết bài hát đang chơi và cho phép người dùng khởi chạy một hoạt động để tương tác với trình chơi nhạc.
![](https://images.viblo.asia/9160fdf8-d529-4e5c-8e8b-b07133ce4f37.gif)

b.	Background Service: là một Service chạy ngầm mà người dùng không cần nhận thức rằng nó đang hoạt động.

-	Lớp mở rộng IntentService: Vì phần lớn các Service không cần xử lý nhiều yêu cầu 1 cách đồng thời (điều này có thể tạo ra đa luồng nguy hiểm). IntentService được tạo ra để giải quyết vấn đề này.

    o	Tạo 1 Thread thực hiện mặc định để thực thi tất cả ý định được chuyển tới onStartCommand() tách riêng với luồng chính.
    
    o	Tạo một hang đợi công việc cần xử lý để chuyển lần lượt tới hàm onHandleIntent().
    
    o	Tự động dừng khi tất cả các công việc đã được thực hiện.
    
**c.	Bound Service**: cho phép các component (ví dụ như Activity) gắn kết  với Service gửi yêu cầu, nhận phản hồi, cho phép các ứng dụng khác gắn kết và tương tác với nó. Để thực hiện gắn kết 1 dịch vụ, Bạn cần kế thừa lại hàm onBind() trả về 1 đối tượng IBinder định nghĩa giao diện tương tác cho các client.

-  Một Client có thể gắn kết với Service bằng cách gọi bindService(). Khi làm vậy, nó phải cung cấp việc triển khai ServiceConnection, có chức năng theo dõi kết nối với dịch vụ. Phương pháp bindService() trả về ngay lập tức mà không có giá trị, nhưng khi hệ thống Android tạo kết nối giữa máy khách và dịch vụ, nó gọi onServiceConnected() trên ServiceConnection, để giao IBinder mà máy khách có thể sử dụng để giao tiếp với dịch vụ.

- Khi máy khách cuối cùng bỏ gắn kết với dịch vụ, hệ thống sẽ hủy dịch vụ (trừ khi dịch vụ cũng được bắt đầu bởi startService()).