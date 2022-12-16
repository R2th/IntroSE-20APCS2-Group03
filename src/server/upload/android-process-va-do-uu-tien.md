Như chúng ta đã biết, mỗi app khi được launch sẽ được chạy trên 1 **process** (tiến trình) có chứa 1 **main thread** (app sẽ mặc định thực thi trên luồng này). Thêm nữa, các thiết bị vật lí cấu tạo nên chiếc smart phone hay tablet... đều có giới hạn nhất định của nó. Ví dụ như khi bạn sử dụng điện thoại quá lâu thì tình trạng tệ nhất là sẽ sập nguồn đúng không nào :). Cũng tương tự như vậy thì **memory** của máy cũng không phải là vô hạn, khi bạn sử dụng quá nhiều app cùng 1 lúc gây ra tiêu tốn rất nhiều memory của máy khiến nó không thể đáp ứng được hết. Vậy lúc này hệ thống sẽ phải xử lí thế nào đây? **Vâng**. Chắc chắn rồi, những lúc thế này hệ thống sẽ buộc phải **kill** đi 1 số **process** để có thể đòi lại tài nguyên phải không nào? Nó là 1 nguyên tắc rất đơn giản mà ta có thể dễ dàng nhận thấy trong cuộc sống đó là: **Muốn có thành công thì bắt buộc phải có sự hi sinh** :)) Nhưng hi sinh như thế nào mới là hiệu quả, đúng đắn?? Chúng ta hãy cùng nhau tìm hiểu qua bài viết này nhé! :))<br>
# Cây phân cấp Android process

Trước tiên hãy cùng xem qua hình ảnh dưới này nhé!
![](https://images.viblo.asia/e49a65d7-4c42-4b56-be9b-bbadad256686.png)

Như chúng ta cũng thấy, trong Android sẽ chia **process** thành 5 loại theo thứ tự ưu tiên:
* **Foreground**
* **Visible**
* **Service**
* **Background**
* **Empty**

Chúng ta sẽ cùng lần lượt tìm hiểu sâu hơn về các loại process này để xem hệ thống sẽ chọn hi sinh thằng nào để làm hài lòng những người dùng khó tính nhất nhé :)) ! Nhanh thôi :)
### Foreground processes
Là những processes mà người dùng hiện đang tương tác đến. Đây là yếu tố quan trọng sẽ quyết định đến sự sống còn của process. Lấy ví dụ như 
* **Activity** đang ở trạng thái **onResume()**
* **BroadcastReceiver** đang running
* **Service** đang thực hiện ở các hàm **onCreate()**, **onStart()**, **onDestroy()**

Vì đây là loại process có độ ưu tiên cao nhất, chính vì thế hệ thống sẽ chỉ **kill** nó khi mà đó là giải pháp cuối cùng khi mà memory available đã quá thấp

### Visible processes
Là những process thực hiện các công việc mà user đang chú ý đến. :) Nghe có vẻ giông giống cái thằng ở trên nhỉ. Nhưng nếu đọc kĩ 1 chút bạn sẽ thấy 1 sự khác biệt nhỏ giữa chúng. 1 thằng là user đang trực tiếp tương tác(có thể k nhìn thấy), còn 1 thằng là user nhìn thấy nhưng hiện giờ không interact với nó. Thường thì 1 vài trường hợp sau sẽ là **visible processes**
* Activity được nhìn thấy nhưng không tương tác được ( đang ở **onPause()** ) 
* Service đang ở foreground 
* Process đó đang hosting 1 service được sử dụng để đáp ứng 1 tính năng cụ thể nào đó cho user 

### Service processes
Là process giữ tham chiếu đến 1 service, và không trực tiếp được nhìn thấy bởi user. Thường thì những thằng này sẽ làm những việc như upload data, download,...
Nếu process này chạy quá lâu (quá 30 phút) thì nó sẽ bị giảm độ ưu tiên để tránh gây ra hiện tượng memory leak hoặc có thể tiêu tốn quá nhiều RAM. Đây là giải pháp tốt đúng không nào? Thay vì **kill** nó ngay lập tức ta hãy làm cho nó yếu dần :))

À mình cũng có vài chú ý nho nhỏ ở đây sẽ ảnh hưởng đến việc system **kill** service do vấn đề về memory và khởi chạy lại nó. **Nếu** giá trị trả về trong onStartCommand() (được invoke mỗi khi gọi startService()) là:

* **START_STICKY**: System sẽ auto restart service khi nó có thể, và truyền vào 1 null Intent **nếu** không có PendingIntent nào đang chờ được xử lí
* **START_REDELIVER_INTENT**: Service sẽ được khởi tại lại với last intent được truyền vào trước đó (sẽ phù hợp với các service có mục đích download)
* **START_NOT_STICKY**: System sẽ không khởi động lại service trừ khi có pending intents được gửi đến 

**Ps**: Còn mấy loại nữa cơ nhưng mình nghĩ với chủ đề bài viết này các bạn chỉ cần biết 3 giá trị chính này là **OK** rồi đó. :). Còn nếu bạn nào muốn tìm hiểu kĩ hơn nữa thì đây https://developer.android.com/reference/android/app/Service.html#constants_2

### Background process
Giả sử process rơi vào trạng thái foreground. Tại đây, nơi mà (trong các trường hợp hoạt động bình thường) phần lớn bộ nhớ của bộ nhớ được dành riêng chỉ trong trường hợp bạn quyết định quay lại một trong các hoạt động mở trước đó của mình sau đó. Vì vậy các process này có thể tồn tại trong một thời gian trước khi được thu hồi do nhu cầu bộ nhớ, bị kill theo thứ tự sử dụng ít nhất gần đây. Tuy nhiên, giống như các visible activity khi chúng bị kill, bạn sẽ có thể tạo lại activity của mình bất cứ lúc nào mà không mất trạng thái người dùng.

### Empty process
Là process có độ ưu tiên thấp nhất. Ở đây, không có thành phần hoạt động nào, và liên quan đến Android, những thứ này có thể bị kill bất cứ lúc nào, mặc dù các process có thể được giữ hoàn toàn cho mục đích lưu trữ

### Cache processes (background+empty)
Nếu bạn chịu khó đọc thì sẽ thấy rằng cả 2 loại background và empty process có thể gộp chung thành 1 loại process đó là **cache process** .

Đó là các processes mà user không chú ý đến và hệ thống có thể kill mấy thằng loại này 1 cách thoải mái khi thiếu memory. Những process loại này thường giữ 1 hoặc nhiều activity instance mà user không chú ý đến (**onStop()**). 
   <br>
   Những processes này được lưu trữ trong pseudo-LRU list, nơi mà process cuối cùng trong list sẽ được kill đầu tiên. Đó là cơ chế mặc định, nhưng thường thì hệ thống sẽ chọn cách xử lí thông minh hơn đó là giữ lại những process thông qua độ hữu ích của nó. Ngoài ra chúng ta cũng có thể set số lượng giới hạn cho processes loại này và thời gian sống của nó. 
 <br>
 
 ## Cẩn thận và cân nhắc
Mặc dù mình đã nói về các ưu tiên của process về các thành phần như các activities và services, hãy nhớ rằng độ ưu tiên này được thực hiện ở cấp độ process - không phải ở cấp độ các components. Mặc dù phần lớn các ứng dụng đều chạy trên 1 process duy nhất, nhưng nếu bạn có một thành phần cực kỳ heavyweight trong ứng dụng, không phụ thuộc vào thành phần long running lighweight, thì hãy cân nhắc tạo ra các process riêng biệt để thực hiện heavyweight action. 

**Keyword** để xác định loại process đó là: ***What process category you fall into is based on what is happening at the component level.***

 ## Tổng kết
 **Woa** vậy là chúng ta cũng đã tìm hiểu xong các loại process trong android và độ ưu tiên của nó. Bài viết tuy ngắn nhưng mình nghĩ cũng sẽ rất hữu ích cho các bạn trong việc lựa chọn process phù hợp để tối ưu cho cả application và system (đây là việc không dễ dàng như bạn tưởng đâu :v). Bài viết có thể có sai sót, nếu các bạn thấy chỗ nào chưa ổn, chưa phù hợp thì đóng góp cho mình nhé! :) Trong bài viết tới mình sẽ đi sâu hơn về cách sử dụng process cho app và các component trong đó và cả thread nữa. Các bạn theo dõi nhé! :) Cảm ơn!
 
Nguồn tham khảo: https://medium.com/androiddevelopers/who-lives-and-who-dies-process-priorities-on-android-cb151f39044f