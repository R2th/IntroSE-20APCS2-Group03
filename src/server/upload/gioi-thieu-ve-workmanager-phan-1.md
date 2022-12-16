![](https://images.viblo.asia/e44b1f36-2983-46f5-b301-7cc9bab11e6f.png)

**WorkManager** là một trong những **Architecture Components** trong Android cho phép thực hiện duy trì một công việc dưới nền background ngay cả khi thoát ứng dụng hoặc khởi động lại thiết bị. <p>
Thư viện này cung cấp interface đơn giản và rõ ràng để chỉ định các tác vụ không đồng bộ và khi nào chúng nên chạy. Chúng ta sẽ thảo luận chi tiết về kiến trúc của thư viện WorkManager và về các thành phần chính **(Worker, WorkRequest, WorkManager, WorkInfo)** của nó ở trong series về WorkManager. </p>
Ở bài viết này thì chúng ta sẽ cùng thảo luận về:
- Mô hình bộ nhớ Android
- Tối ưu hóa pin Android
- Xử lý các tiến trình ở background
- Nơi mà WorkManager được thực hiện ở background work schema
    </p>
Trong thế giới di động, hiệu suất ứng dụng có tác động quan trọng đến việc sử dụng của người dùng. Nhưng vấn đề có thể làm cho người dùng không hài lòng là gì?
- Pin nhanh hết
- Một chiếc điện thoại hết bộ nhớ 
<p>
    
Nghiên cứu cho thấy rằng: <br>
- 53% tất cả người dùng đã gỡ cài đặt hoặc xóa ứng dụng di động với các sự cố nghiêm trọng như sự cố, đóng băng hoặc lỗi 
- 36% sẽ ngừng sử dụng ứng dụng di động do lượng tiêu hao pin lớn.
    
Đó là lý do tại sao hiệu năng ứng dụng di động nên được chú ý khi phát triển ứng dụng. </p>
### 1. Mô hình bộ nhớ Android
Khi xây dựng một ứng dụng, chúng ta cần quan tâm và xây dựng dựa trên trải nghiệm của người dùng vì họ là người sẽ trực tiếp trải nghiệm ứng dụng. Vì vậy, tất cả là về hệ sinh thái Android, vì **Android dành cho tất cả mọi người**:
- Ứng dụng
- Thiết bị
- Người dùng

<br>Về mặt thiết bị, chúng có thể được chia thành 3 loại chính dựa trên cấu hình của chúng. Vì vậy, chúng ta có các thiết bị cấp thấp, thiết bị tầm trung và thiết bị cao cấp. <br> <br>

![](https://images.viblo.asia/567ff11d-2291-4c63-aa0d-71a66d60a42c.png) <p>
Khi chúng ta nói về tính khả dụng và sử dụng bộ nhớ, chúng ta nên tập trung nhiều hơn vào các thiết bị cấp thấp vì các thiết bị cao cấp và tầm trung có cấu hình bộ nhớ tốt. Nếu chúng ta không xây dựng các ứng dụng có thể hoạt động chính xác trên các thiết bị cấp thấp thì các thiết bị này sẽ ngừng được sản xuất và dựa vào đó, một phần lớn người dùng của chúng ta cũng sẽ biến mất. Đây không phải là một điều tốt. Những người dùng đó sẽ thất vọng. </p>

![](https://images.viblo.asia/89c8f5f5-d6d3-417c-af3a-3571f0a7f992.png)

Trên một thiết bị, bộ nhớ vật lý được sắp xếp theo trang và mỗi trang có khoảng 4 kilobyte. Và các trang này có thể có 3 trạng thái chính: các trang được sử dụng, được lưu trong bộ nhớ cache và còn trống - chưa được sử dụng

Nếu chúng ta đặt một thiết bị dưới áp lực bộ nhớ ngay từ lúc đầu, chúng ta sẽ có sẵn một số bộ nhớ trống, vì vậy chúng ta có một happy device bởi vì nếu một ứng dụng cần bộ nhớ, chúng ta có đủ cho nó. Theo thời gian vì chúng ta sử dụng nhiều bộ nhớ hơn, bộ nhớ trống bị mất dần và trong trường hợp này, nhân linux có một cơ chế gọi là **kswapd** và công việc của nó là tìm thêm bộ nhớ trống. Hành động chính được thực hiện bởi quá trình này là lấy lại các trang được lưu trong bộ nhớ cache

Hoạt động này mất một thời gian để tải lại các trang được lưu trong bộ nhớ cache nhưng nó không hiển thị cho người dùng.

Chúng ta tiếp tục sử dụng bộ nhớ thiết bị và số lượng trang được lưu trong bộ nhớ cache bắt đầu ngừng hoạt động và hệ thống bắt đầu gặp sự cố, đó là một điều tồi tệ. Tại thời điểm này, **low memory killer** (Android quản lý trạng thái bộ nhớ thấp bằng mô-đun Kernel được gọi là **Low Memory Killer** (LMK). LMK là một kẻ giết người quá trình, được thiết kế để hợp tác với Khung Android. ) xuất hiện và bắt đầu giết các quá trình đang chạy. Đó là một điều tốt cho bộ nhớ, nhưng nó có thể ảnh hưởng đến ứng dụng hiện đang được sử dụng bởi người dùng. 
    
![](https://images.viblo.asia/8763e697-3d71-482e-89f4-100780bb4ea2.png)
    
### 2. Tối ưu hóa pin Android
Về tối ưu hóa pin, Android đã cung cấp các tính năng tiết kiệm pin trong các phiên bản như:
- **Marshmallow**, nó được giới thiệu chế độ ngủ sâu (deep doze) - thiết bị được đặt ở chế độ ngủ sâu với điều kiện thiết bị không di chuyển - tắt hoạt động nền
-  **Nougat**, ngủ gật (doze) khi đang di chuyển - đặt thiết bị ở chế độ ngủ nhẹ hơn và thức dậy thường xuyên hơn để kiểm tra xem có công việc đang chờ xử lý không (tắt một phần công việc nền background)
- **Oreo**,  được giới thiệu những hạn chế về dịch vụ nền background
- Và trong Android **Pie** - pin thích ứng dựa trên chế độ chờ của ứng dụng - các ứng dụng được di chuyển trong 4 nhóm (hoạt động (active), thiết lập hoạt động (working set), thường xuyên (frequent ) và hiếm (rare))
    
    ![](https://images.viblo.asia/9235fd02-e3b7-4c0f-8f76-948faf5800dc.png)
    

### 3. Xử lý các tiến trình ở background
Trong những năm qua, Google đã cung cấp các phương pháp khác nhau để các nhà phát triển hỗ trợ thực hiện hoặc lên lịch làm việc trong background
- **JobScheduler** là một API mới tuyệt vời, nhưng chỉ được hỗ trợ cho **Android Lollipop (API 21) trở lên**
- **Firebase JobDispatcher** tương thích ngược với **Ice Cream Sandwich (API 15)** - nhưng nó yêu cầu các dịch vụ Google Play, rất lớn và nặng và không có sẵn ở Trung Quốc. Cũng từ năm sau, tháng 4 năm 2020 nó sẽ được lưu trữ. Hiện tại nó không được dùng nữa.
- **AlarmManager** hoạt động trên tất cả các cấp API, nhưng **yêu cầu BroadcastReceiver** tồn tại trong quá trình khởi động lại thiết bị và cũng chịu một số hạn chế của trình quản lý nguồn, được giới thiệu trong Android Pie.

Vì vậy, có vẻ như chúng ta có một sự lựa chọn giữa việc loại trừ các thiết bị cũ hơn hoặc mất nhiều thời gian để xây dựng tất cả từ đầu. 

Một cách tốt để tổ chức các tiến trình dưới nền background là phân chia chúng dựa trên thời gian và tầm quan trọng:
- Trục tung là thời gian của công việc: công việc nên được thực hiện khi nó được chỉ định hoặc nó có thể chờ một chút.
- Trục hoành biểu thị tầm quan trọng của công việc: nó nên được thực hiện khi ứng dụng ở **foreground** hoặc nó cần được thực hiện tại một thời điểm nhất định.

![](https://images.viblo.asia/fb1c4225-40be-46cc-b96a-7147c218fabc.png)
 
### 4. WorkManager
    WorkManager is a library for managing deferrable and guaranteed background work.
- **Deferrable work**: tác vụ có thể chạy sau và nó vẫn hữu ích (tải lên nhật ký or gửi tin nhắn)
- **Guaranteed work**: tác vụ sẽ chạy ngay cả khi ứng dụng sẽ bị đóng hoặc thiết bị khởi động lại (sao lưu ảnh vào máy chủ)

    #### Tại sao nên sử dụng WorkManager?
    - Khả năng tương thích ngược với các phiên bản HĐH khác nhau (API level 14+)
    - Tốt cho hệ thống (Memory and Pin)
    - Hỗ trợ thực thi các task định kỳ
    - Hỗ trợ thực thi chuỗi các task với đầu vào / đầu ra
    - Xác định các ràng buộc khi task chạy
    - Đảm bảo thực thi tác vụ, ngay cả khi ứng dụng hoặc thiết bị khởi động lại
    
   #### Khi nào nên sử dụng WorkManager?
    - Tìm nạp dữ liệu định kỳ
    - Tải hình ảnh / tập tin lên máy chủ
    - Đồng bộ hóa dữ liệu giữa ứng dụng và máy chủ
    - Gửi nhật ký đến máy chủ
    
### 5. Kết luận
Bài viết của mình đến đây là kết thúc. Ở phần tiếp theo chúng ta sẽ đi chi tiết vào các thành phần chính của WorkManager [tại đây nhé](https://viblo.asia/p/gioi-thieu-ve-workmanager-worker-workrequest-workmanager-phan-2-QpmledG9Zrd).