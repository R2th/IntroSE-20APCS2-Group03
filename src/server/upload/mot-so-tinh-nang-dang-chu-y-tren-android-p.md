![](https://images.viblo.asia/1e95133c-ed64-418b-8e2d-375a852c52c6.png)
Tại Google I / O, Google đã phát hành phiên bản beta đầu tiên của Android P, đưa AI vào cốt lõi của hệ điều hành và tập trung vào những trải nghiệm thông minh và đơn giản. Họ đã nói về một số tính năng mới nhất của Android trong các ghi chú và đi sâu vào API của nhà phát triển trong các lần đột phá. 
Android P làm cho điện thoại thông minh thông minh hơn, giúp nó học hỏi và thích ứng với người dùng. Ứng dụng của bạn có thể tận dụng tính năng thông minh mới nhất trong máy để giúp bạn tiếp cận nhiều người dùng hơn và cung cấp các loại trải nghiệm mới.Ở bài viết này mình sẽ nói về một số tính năng đáng chú ý trên Android P
### 1. Adaptive Battery
Pin luôn là ưu tiên số một từ người dùng điện thoại di động, bất kể thiết bị họ đang sử dụng là gì. Trong Android P, Google đã hợp tác với DeepMind về một tính năng mới gọi là **Adaptive Battery**, tối ưu hóa cách ứng dụng sử dụng pin.
![](https://images.viblo.asia/36fda3b8-94fc-40e2-996e-b07d16361bf0.gif)


**Adaptive Battery** sử dụng machine learning để ưu tiên truy cập vào tài nguyên hệ thống cho các ứng dụng mà người dùng quan tâm nhất. Bằng cách sử dụng **App Standby Buckets**. Hệ thống giới hạn quyền truy cập của các ứng dụng vào tài nguyên thiết bị như CPU hoặc pin, dựa trên các mẫu sử dụng của người dùng. Nghĩa là mỗi ứng dụng được đặt vào một trong năm nhóm ưu tiên (priority buckets). Hệ thống giới hạn tài nguyên thiết bị có sẵn cho từng ứng dụng dựa trên nhóm mà ứng dụng đang sử dụng.
* Các nhóm ưu tiên (**priority buckets**) này được thiết kế để cho phép hệ thống thông minh hơn về cách phân phối tài nguyên giữa các ứng dụng - nếu có một ứng dụng mà bạn hiếm khi sử dụng để thực hiện một số công việc nền trong khi đang sử dụng ứng dụng chuyên sâu thường xuyên sử dụng, tại sao bạn muốn dịch vụ nền đó có thể khởi động và gây ra sự gián đoạn về những gì bạn đang làm? Và trên một lưu ý khác, thật tuyệt vời khi có thể chặn các thông điệp có mức độ ưu tiên cao từ một ứng dụng mà bạn hiếm khi sử dụng và không thực sự quan tâm, đồng thời vẫn có thể nhận các ứng dụng cho bạn thường xuyên sử dụng. Đối với những mục đích này và nhiều hơn nữa, bây giờ chúng ta có khái niệm về các nhóm ưu tiên nhóm các ứng dụng của chúng ta thành một trong năm nhóm khác nhau mà mỗi nhóm có các quy tắc hoạt động khác nhau được áp đặt bởi hệ thống. Một ứng dụng sẽ rơi vào một trong 5 nhóm sau:
* **Active**  : Một ứng dụng hiện đang được người dùng sử dụng. Lưu ý: Nếu một ứng dụng không có hoạt động trình khởi chạy thì ứng dụng đó sẽ không bao giờ được đặt trong nhóm này.
* **Working Set**  :Một ứng dụng hiện không được sử dụng nhưng chạy khá thường xuyên, có thể là hầu hết các ngày.
* **Frequent**  : Một ứng dụng hiện không được sử dụng nhưng đôi khi được mở trong suốt tuần
* **Rare**  : Một ứng dụng hiếm khi được sử dụng trên thiết bị. Ví dụ: ứng dụng chia sẻ chuyến đi mà bạn chỉ có thể sử dụng khi bạn đi nghỉ lễ.
* **Never**  : Ứng dụng được cài đặt nhưng chưa bao giờ được chạy

![](https://images.viblo.asia/bd03ffc0-63b9-4a8d-af60-a26c4e5db6a7.png)
* Khi ứng dụng đã được gán cho nhóm, điều đó không có nghĩa là ứng dụng đó sẽ tồn tại mãi mãi. Những nhóm này luôn thay đổi, có nghĩa là hệ thống sẽ gán lại một nhóm ứng dụng dựa trên các hành vi gần đây. Ví dụ: nếu người dùng của bạn không bao giờ thường xuyên sử dụng ứng dụng của bạn và sau đó tìm thấy thứ gì đó có giá trị tăng dần mức sử dụng của họ thì ứng dụng của bạn sẽ di chuyển qua cấp độ nhóm. Nếu có trên thiết bị, hệ thống sẽ sử dụng học máy để xác định tần suất ứng dụng và sau đó chúng sẽ được đặt vào nhóm dựa trên những dự đoán đó. Nếu không, các ứng dụng sẽ được sắp xếp thành các nhóm dựa trên cách chúng được sử dụng gần đây. Bằng cách sử dụng có một số điều được tính như sau: 
Người dùng mở ứng dụng của bạn 
Người dùng tương tác với một hành động thông báo. Hiển thị thông báo sau đó bị loại bỏ không có đóng góp cho trạng thái nhóm ứng dụng. 
* Vì vậy, bây giờ chúng ta biết rằng ứng dụng của chúng ta sẽ rơi vào một trong các nhóm này - nhưng điều này có ý nghĩa gì đối với chúng ta? Mỗi một trong số các nhóm này có hành vi cá nhân riêng do hệ thống thực thi.
![](https://images.viblo.asia/192304f1-a2f2-4b01-977b-b9e76606a43a.png)
* Mặc dù những hạn chế này chỉ được áp dụng khi thiết bị đang hết pin, điều quan trọng là phải biết về chúng và tối ưu hóa ứng dụng của bạn theo những cách có thể vẫn cho phép chúng hoạt động như dự định trong các trường hợp này. Để bắt đầu, nếu ứng dụng của bạn rơi vào nhóm **Active** thì không có hạn chế nào được đưa ra, do đó bạn không cần phải lo lắng về bất kỳ hành vi ứng dụng nào thay đổi trong những trường hợp này.

Mặt khác, khi ứng dụng của bạn đã nhập vào nhóm **Working Set** thì có một vài hạn chế nhẹ được đưa ra. Trong trường hợp này, bất kỳ Công việc nào đang chạy đều có thể được hoãn lại tối đa 2 giờ và mọi cảnh báo đang được kích hoạt có thể được hoãn lại tối đa 6 phút. Tiếp theo, khi ứng dụng  di chuyển vào nhóm **Frequent**, công việc đã đăng ký có thể bị hoãn lại tối đa 8 giờ và báo thức được hoãn lại tối đa 30 phút - đây là một bước nhảy vọt từ nhóm trước đó. Tại thời điểm này, các hạn chế cũng được nhập cho các tin nhắn FCM ưu tiên cao vì các ứng dụng thường xuyên sẽ chỉ có thể nhận được 10 trong số này một ngày. Cuối cùng, khi ứng dụng của chúng ta rơi vào nhóm **Rare** , công việc có thể được hoãn lại lên đến 24 giờ và báo động lên đến 2 giờ. Thông báo mức độ ưu tiên cao cũng giảm xuống giới hạn 5 ngày và hiện có giới hạn mạng được giới thiệu, có nghĩa là các hoạt động mạng có thể bị trì hoãn tối đa 24 giờ.

* Lưu ý: Điều quan trọng cần lưu ý là nếu một ứng dụng được chia thành các gói khác nhau thì tất cả các gói này có thể rơi vào các nhóm ưu tiên khác nhau. Không dựa vào cùng một hành vi xảy ra giữa các gói vì điều này sẽ không xảy ra.

Nếu muốn kiểm tra xem ứng dụng của bạn đang ở trong nhóm nào, thì bạn có thể sử dụng hàm **getAppStandbyBucket ()**. Trong khi ứng dụng của bạn nên được xây dựng theo cách làm cho nó tối ưu cho mọi tình huống, chức năng này có thể thuận tiện cho các tình huống mà thời gian là quan trọng. Ví dụ, có thể một cái gì đó được đăng lên một API là rất quan trọng trong một khoảng thời gian nào đó - nếu một ứng dụng nằm trong nhóm Hiếm thì có thể sẽ không có ý nghĩa để lên lịch một công việc vì nó có thể được hoãn lại tới 24 giờ.

Với ý nghĩ đó, điều quan trọng là bạn không nên thử và thay đổi hành vi của ứng dụng để di chuyển ứng dụng của bạn giữa các gói. Để bắt đầu, các nhà sản xuất thiết bị khác nhau có thể thay đổi cách nhóm ưu tiên hoạt động để bạn không bao giờ có thể dựa vào cách các yếu tố quyết định vị trí đặt ứng dụng. Thứ hai, bạn không nên ép buộc người dùng lấy lại sự tương tác chỉ để di chuyển qua các nhóm ưu tiên - ví dụ: cố gắng lấy lại tương tác thông qua các thông báo có mức độ ưu tiên cao trong nỗ lực khôi phục trạng thái nhóm sẽ là hành vi xấu. Nếu thông báo của bạn cung cấp giá trị, điều đó thật tuyệt vời - nhưng đừng lạm dụng hệ thống để di chuyển thông qua các cấp độ nhóm. Ngoài ra, bạn có thể đạt đến hạn mức ưu tiên cao của mình và không thể hiển thị thêm bất kỳ thông báo nào cho phần còn lại của ngày đó.


### 2. App Actions và Slices
![](https://images.viblo.asia/7682c839-1f89-42c3-ac50-dec16269ca19.gif)

App Action là một cách mới để tăng khả năng hiển thị ứng dụng của bạn cho người dùng khi họ bắt đầu nhiệm vụ của mình. Họ đưa khả năng cốt lõi của ứng dụng lên trước người dùng dưới dạng đề xuất để xử lý công việc của họ, từ các điểm tiếp xúc chính trên hệ thống như Smart Text Selection, Google Play, Google Search và Assistant. 

Hành động sử dụng học máy để hiển thị đúng ứng dụng cho người dùng dựa trên ngữ cảnh của họ hoặc tương tác gần đây. Bởi vì Tác vụ làm nổi bật ứng dụng của bạn ở đâu và khi nào phù hợp nhất, chúng là cách tuyệt vời để tiếp cận người dùng mới và tương tác lại với người dùng hiện tại.
![](https://images.viblo.asia/e7f4e329-505b-418a-bbd5-1a028899ff4b.gif)

Slices là một cách mới tuyệt vời để thu hút người dùng và chúng tôi muốn họ có sẵn càng rộng rãi càng tốt. Google đã thêm hỗ trợ nền tảng trong Android P và đã xây dựng các API và mẫu nhà phát triển vào Android Jetpack, bộ thư viện và công cụ mới của chúng tôi để xây dựng các ứng dụng tuyệt vời. Thông qua [Jetpack](https://developer.android.com/jetpack/), việc triển khai Slices của bạn có thể nhắm mục tiêu người dùng quay trở lại Kitkat - trên 95% thiết bị Android đang hoạt động. Google cũng sẽ có thể cập nhật các mẫu thường xuyên để hỗ trợ các trường hợp sử dụng và tương tác mới (chẳng hạn như nhập văn bản).
Chi tiết bạn có thể xem tại: https://developer.android.com/guide/slices/getting-started#slice-viewer .

### 3. ML Kit
![](https://images.viblo.asia/f1f5132c-e35b-4ef7-a886-349794ff277a.jpg)

Ngoài ra trong Android P còn sử dụng ML Kit API để thêm tính năng trả lời thông minh trên notification và nâng cấp [TextClassifier](https://developer.android.com/reference/android/view/textclassifier/TextClassifier), thúc đẩy việc học máy để xác định một số thực thể trong văn bản được chọn và đề xuất các hành động. Ví dụ: TextClassifier có thể cho phép ứng dụng của bạn phát hiện rằng một số điện thoại đã được chọn và đề xuất rằng người dùng thực hiện cuộc gọi điện thoại. Các tính năng mới của [TextClassifier](https://developer.android.com/reference/android/view/textclassifier/TextClassifier) thay thế chức năng của lớp Linkify.
### 4. New system navigation
![](https://images.viblo.asia/24311218-4282-466b-9d84-90bf51aec593.jpg)
Google đặt trọng tâm đặc biệt vào sự đơn giản trong Android P, phát triển giao diện người dùng của Android để hợp lý hóa và nâng cao nhiệm vụ của người dùng. Đối với developer, các thay đổi giúp cải thiện cách người dùng tìm, sử dụng và quản lý ứng dụng của bạn. 
Google giới thiệu một hệ thống điều hướng trong Android P cho phép người dùng truy cập dễ dàng hơn vào Home, Overview và Assistant từ một nút trên mỗi màn hình. Điều hướng mới đơn giản hóa đa nhiệm và làm cho việc khám phá các ứng dụng liên quan dễ dàng hơn nhiều. Trong phần overview, người dùng có cái nhìn lớn hơn về những gì họ đang làm khi họ rời khỏi từng ứng dụng, giúp việc xem và tiếp tục hoạt động trở nên dễ dàng hơn nhiều. Phần overview cũng cung cấp quyền truy cập vào tìm kiếm, ứng dụng được dự đoán và hành động ứng dụng và đưa người dùng đến tất cả ứng dụng bằng một lần vuốt khác.
### 5. Magnifier (Phóng to)
Trong Android P, được bổ sung thêm một loại widget mới đó là Magnifier,nó được thiết kế để dễ dàng hơn trong việc chọn văn bản và thao tác con trỏ văn bản trong văn bản. Theo mặc định, các lớp mở rộng TextView sẽ tự động hỗ trợ Magnifier (phóng to), nhưng bạn có thể sử dụng API Magnifier để đính kèm nó vào bất kỳ Chế độ xem tùy chỉnh nào, mở ra nhiều mục đích sử dụng khác nhau.
![](https://images.viblo.asia/70e4527c-b32c-4203-90f0-a149b5776c70.gif)
Ví dụ, khi ta muốn tạo một Magnifier, chúng ta chỉ cần gọi hàm tạo lớp truyền trong tham chiếu đến view mà chúng ta đang muốn cung cấp độ phóng đại:
```java
Magnifier magnifier = new Magnifier(mImageView);
```
Tại thời điểm này, manifier đã được gắn vào imageview, ta chỉ cần implement onTouchListener để sử lí các sự kiện touch với chúng.

```java
 mImageView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                switch (motionEvent.getAction()) {
                    case MotionEvent.ACTION_DOWN:
                        magnifier.show(motionEvent.getX(), motionEvent.getY());
                    case MotionEvent.ACTION_MOVE:
                        magnifier.show(motionEvent.getX(), motionEvent.getY());
                    case MotionEvent.ACTION_UP :
                        magnifier.dismiss();
                }
                return true;
            }
```
### 6.Display cutout support (Chế đệ hiển thị tai thỏ)
![](https://images.viblo.asia/8c22e350-d779-4c23-aa91-95b363727101.png)

Android P cung cấp hỗ trợ cho các màn hình cạnh mới nhất với màn hình bỏ đi cho máy ảnh và loa. Lớp [DisplayCutout](https://developer.android.com/reference/android/view/DisplayCutout) mới cho phép bạn tìm ra vị trí và hình dạng của các khu vực không hoạt động mà nội dung không được hiển thị. Để xác định sự tồn tại và vị trí của các vùng cắt bỏ này, hãy sử dụng phương thức **getDisplayCutout ()**. 

Thuộc tính bố cục cửa sổ mới, **layoutInDisplayCutoutMode**, cho phép ứng dụng của bạn bố trí nội dung của nó xung quanh các đoạn cắt của thiết bị. Bạn có thể đặt thuộc tính này thành một trong các giá trị sau: 

* LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT 
* LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES 
* LAYOUT_IN_DISPLAY_CUTOUT_MODE_NEVER

### 7.Tổng kết 
Android P còn rất nhiều các tính năng khác các bạn có thể tham khảo thêm tại 
- https://developer.android.com/preview/
- https://vivekc.xyz/whats-new-in-android-p-the-breaking-changes-and-amazing-features-8f4e864802a9
- https://android-developers.googleblog.com/2018/03/previewing-android-p.html