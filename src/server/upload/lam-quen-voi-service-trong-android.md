Chào các bạn, hôm nay mình sẽ giới thiệu với các bạn một chủ đề mà mình nghĩ nó vô cùng quan trọng nếu bạn là một lập trình viên android. Chắc các bạn còn nhớ tới 4 thành phần chính của android chứ. Đó chính là: 
* Activity
* Service
* Broadcast Receive
* Content provider  
Và nội dung của bài viết này mình sẽ đề cập tới Service, app component thứ 2 của android.
Vậy Service là gì và tại sao đã là một android developer bạn không những hiểu mà còn phải hiểu sâu về nó. Mời các bạn cùng đọc bài viết này của mình nhé  
## I.	Introduction to Service
### 1.Service là gì?
-	Service là một thành phần có thể thực hiện các thao tác dài hạn trong background mà không cung cấp giao diện người dùng (UI)
-	Một app component khác( chẳng hạn như activity) có thể start hoặc bind với service
-	Điều đặc biệt ở đây là service vẫn có thể chạy khi người dùng không còn tương tác với ứng dụng hoặc chuyển sang sử dụng ứng dụng khác  
### 2.	Phân loại service  
theo tài liệu trên trang developer thì service được chia thành 3 loại:
* Foreground Service : thực hiện các thao tác đang được người dùng chú í, và phải hiển thị một notification, các foreground service vẫn tiếp tục chạy ngay cả khi người dùng không còn tương tác với ứng dụng  
* Background Service : thực hiện các thao tác không được chú ý trực tiếp bởi người dùng. Ví dụ nếu app đã sử dụng service để thu gọn dung lượng thì đó thường là background service  
* Bound Service : Một service được gọi là Bound khi một app component bind(ràng buộc) với nó bằng lời gọi bindService(). Một bound service cung cấp một interface client-server cho phép các component có thể giao tiếp đc với service (gửi request, nhận kết quả). Một bound service chỉ chạy khi có app component bind với nó. Nhiều component có thể ràng buộc đến service cùng lúc, nhưng khi tất cả thành phần đó ubbind thì service sẽ bị hủy  
### 3.	Mức độ ưu tiên khi hệ thống kill service  
* Khi một service được khai báo trong foreground thì khả năng hệ thống kill nó  (Foreground Service) gần như là không bao giờ. Còn trong trường hợp service được ràng buộc với một activity đang được người dùng chú í thì khả năng nó bị hệ thống kill rất thấp (Bound Service). Và trường hợp cuối cùng một service chạy vô thời hạn trong background thì khả năng cao nó sẽ bị hệ thống kill.
Vậy thứ tự ưu tiên sẽ là  
**Foreground Service > Boundservice > Background Service**
## II.	Các giá trị trả về của hàm onStartComand()
 Và tiếp theo đây mình sẽ đề cập đến một hàm đó chính là onStartCommand(). Tại sao vậy, đơn giản vì method onStartCommand phải return một integer. Ddayy chính là giá trị mô tả cách hệ thống nên tiếp tục service như thế nào trong trường hợp hệ thống kill nó
Giá trị return từ onStartCommand() phải là một trong các hằng số sau

-	START_NOT_STICKY : các service sẽ không được khởi tạo lại trừ khi có một intent đang chờ được chuyển đến. đây là option an toàn nhất để tránh trường hợp service chạy khi không cần thiết 
-	START_STICKY : service sẽ được tạo lại nhưng không phải là intent cuối cùng mà service nhận được. trong trường hợp không có intent nào đang chờ nó sẽ khởi tạo lại service với intent là null
-	START_REDELIVER_INTENT : service được tạo lại với intent là intent cuối cùng được chuyển đến service. Mọi pending intent đều được chuyển đến lần lượt
## III.	Các phương thức quan trọng 
Để tạo ra một service các bạn phải kế thừa lớp cha service ( loại service này mình sẽ nói kĩ hơn trong phần Service and Intent Service). Và sau khi kế thừa từ lớp này nó sẽ yêu cầu bạn override một vài phương thức. và sau đây sẽ là một vài phương thức quan trọng bạn cần nắm được 
1.	OnStartCommand() : hệ thống sẽ gọi method này khi một component khác yêu cầu start một service bằng cách gọi startService(). Khi method này được thực thi, service sẽ bắt đầu và chạy vô thời hạn trong background. Và nếu implement phương thức này bạn phải có trach nhiệm stop service khi tất cả công việc được hoàn thành bằng cách gọi stopSelf() hoặc stopService()
2.	onBind() : hệ thống sẽ gọi method này khi một thành phần khác muốn bind với một service bằng lời gọi bindService()
3.	onCreate() : nó sẽ được gọi một lần để khởi tạo service, nếu đã được khởi tạo rỗi sẽ chuyển sang gọi phương thức khác
4.	onDestroy(): hệ thống sẽ gọi phương thức này khi service không còn được sử dụng hoặc đang trong quá trình hủy  
## IV.	StartService and BoundService
### 1.	StartService  
- Bạn có thể start một service từ một activity hoặc một thành phần dung dụng khác bởi việc chuyển một intent tới startService() hoặc startForegroundService().   
> Note : từ API 26 trở lên hệ thống sẽ hạn chế việc sử dụng background service, trừ khi app đó đang được khai báo trong foreground  
Dưới đây là ví dụ khi bạn start một service bằng việc chuyền một explicit intent tới startService()  
![](https://images.viblo.asia/e1ff6ae3-713f-47f1-a40b-068edf9ca343.PNG)
 
* Nếu như service không cung cấp bất kì sự ràng buộc nào, intent dc chuyển đến startService() là chế độ duy nhât để giao tiếp giữa app component với service. Hơn thế nữa nếu bạn muốn service gửi kết quả trả về, thì client start service có thể khởi tạo một PendingIntent cho broadcast (với getBroadcast()) và chuyển nó tới service trong một intent để start service. Service có thể sử dụng broadcast để chuyển kết quả
* Và cuối cùng nếu service tự stop chính nó sẽ gọi tới hàm stopSelf() hoặc trong trường hợp service khác muôn stop thì sẽ sử dụng hàm stopService()

### 2.	BoundService
* Một service được gọi là BoundService khi một app component ràng buộc với service bằng lời gọi bindService()
Bound service sẽ cung cấp một interface IBinder để giao tiếp giữa các client (activity, fragment,…) với service và khi tất cả những ràng buộc từ client bị hủy thì đồng nghĩ với việc service bị hủy
* Một bound service là một sự thực thi của lớp Service cho phép ứng dụng khác có thể ràng buộc và tương tác với service.
Để ràng buộc với một service bạn phải implement phương thức onBind(). Phương thức này sẽ trả về một đối tượng IBinder. Ibinder là một interface cho phép client có thể sử dụng để tương tác với service
* Liên kết với một start service 
Như đã nói ở trên bạn có thể khởi tạo một service bằng hai cách là start service và bound service. Điều đó có nghĩa là bạn có thể start một service bằng lời gọi startService(), nó cho phép service chạy vô thời hạn trong backgroung, và bạn cũng có thể cho phép client ràng buộc với một service bằng lời gọi bindService()

## V.	So sánh service và Intent Service
Trước khi tìm hiểu về sự khác nhau giữa serice và intent service mình sẽ nói về tổng quan về Intent Service (vì Service mình đã trình bày ở trên rồi nhé )
* Intent Service là một subclass của Service, nếu các bạn muốn tạo một service thì chỉ cần extend lớp này. Điều đặc biệt của Intent service đó là nó sẽ tạo ra một worker thread để xử lí các request từ client gửi đến. Các request đó được đưa vào một hàng đợi và sử dụng hàm onHandleIntent() để xử lí từng request đó. Và đến khi không còn request nào trong hàng đợi nữa thì service sẽ bị hủy. Và đó là những đặc trưng cơ bản của một intent service
Tiếp theo đây là sự khác nhau giữa hai loại service này : Service và Intent service  
* Theo một số tài liệu mình đọc được thì có điểm khác nhau chính của hai loại service này trên 3 tiêu chí : luồng thực thi, cơ chế xử lí request từ client và cách service bị hủy  
   - Về luồng thực thi : service sẽ chạy trên main thread, các request từ client sẽ được xử lí đồng thời trên cùng một luồng( hoặc nếu bạn chỉ định một luồng khác bạn có thể khởi tạo một luồng khác để xử lí). Intent service xử lí trên luồng khác gọi là worker thread do nó tạo ra   
    - Về cách xử lí request : intent service sử lí lần lượt từng request trong hàng đợi bằng hàm onHandleIntent. Service xử lí đồng thời và không có bất kì một hàng đợi nào
    - Về cách stop service: service sẽ dừng bằng việc gọi hàm stopService() hoặc stopSelf().Còn đối với intent service, nó sẽ tự động dừng khi không còn bất kì intent nào trong hàng đợi
##   VI. Tổng kết 
thực sự service rất rộng, để tìm hiểu hết về nó cần rất nhiều thời gian, mình hy vọng bài viết này sẽ giúp các bạn có một cái nhìn tổng quan về service. Và nếu bạn muốn tỉm hiểu cũng như thực hành nhiều hơn về service mời các bạn tham khảo tài liệu này nhé  
https://developer.android.com/guide/components/services