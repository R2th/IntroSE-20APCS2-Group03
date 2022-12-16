Dưới đây là bài viết tổng hợp các thông báo mới về Android tại sự kiên I/O 18 mà tôi đã tổng hợp và tìm hiểu được. Các bạn có thể tham khảo mặc dù nó có thể không đầy đủ và chi tiết.
![](https://images.viblo.asia/f8a32ae5-1e78-45e4-b483-b29ebacc2fde.png)

### **Android Jetpack**
Google đã công bố về Andorid Jatpack trong nội dung phát triển của họ như là một danh sách các thư viện với các công cụ hỗ trợ giúp chúng ta có thể xây dựng các ứng dụng một cách tuyệt vời. Họ phân loại Android Jetpack thành 4 thành phần chính :
* Thành phần nền tảng -  Foumdation components (ktx, appcompat, multidex, test)
* Thành phần kiến trúc - Architecture components (Data Binding, Lifecycles, ViewModel, Livedata, Room, Paging, Navigation, WorkManager)
* Thành phần hành vi - Behavior components (Download manager, Media, Notifications, Permissions, Sharing, Slices)
* Thành phần giao diện - UI components (Animations, Auto, Emoji, Fragment, Layout, Palette, TV, Wear OS )

### **AndroidX**
Google đã có một mô hình cấu trúc mới cho Android (hiện nay chúng ta vẫn đa số sử dụng MVP, MVVM, MVC).
Các bundled package trong hệ điều hành android sẽ đi kèm với `android. *` phân cấp các package và tất cả các package khác sẽ đi kèm với APK/ AAB sẽ đi kèm với `androidx. *` phân cấp. Đây gọi là ánh xạ AndroidX Artifact.
Các bạn có thể tham khảo ví dụ này: 

![](https://images.viblo.asia/e312cef2-9998-45e3-8622-ba40b3655448.png)

### *Android Studio 3.2 có công cụ tái cấu trúc AndroidX*

### **Các thành phần kiến trúc mới**
Các kiến trúc components sẽ có 2 thư viện mới (Navigation và WorkManager) và cũng đã áp dụng DataBinding.
**DataBinding**
* Hỗ trợ cho LiveData trong DatabBinding. Có nghĩa là bạn có thể sử dụng trực tiếp LiveData trong xml của bạn.
* Vòng đời nhận thức của ViewBindings.
* DataBinding hiện hỗ trợ plugin modum tính năng

**Room**
* Room hỗ trợ truy cập đọc và ghi song song trong Sqlite  (với WriteAheadLogging), cũng với những cải tiến về tốc độ ghi.
* Room hỗ trợ truy vấn động với `@rawquery` chú thích.

**Navigation**
Navigation Component cung cấp hỗ trợ trong việc thực hiện điều hướng trong ứng dụng của bạn.
Android Studio 3.2 có trình chỉnh sửa điều hướng, biểu diễn đồ họa của biểu đồ điều hướng.
![](https://images.viblo.asia/04ae4edf-e886-4c01-bbc7-420e2d43b20f.png)
![](https://images.viblo.asia/8024f1f8-e23b-41bb-aae2-ff203eafaee8.png)

### **WorkManager**
WorkManager có thể thấy điều này như một wrapper bên trên ThreadPool, JobScheduler, JobDispatcher hoặc AlarmManager. Đưa một nhiệm vụ cho WorkManager và để cho nó chọn một cách thích hợp để chạy nó trong nền tùy theo điều kiện.
Nó cũng gói một số tính năng như chuỗi nhiệm vụ và lắng nghe tình trạng nhiệm vụ bằng cách sử dụng LiveData.

### **Android KTX**
Chúng ta có thể tận dụng các tính năng ngôn ngữ Kotlin trong API Android với sự trợ giúp của KTX.
Phiên bản Android API của Kotlin hiện được liệt kê cùng với tài liệu gốc và không còn tách biệt nữa.

**Keep (Quá trình tiến hóa và tăng cường Kotlin) 110 Annotations**
Có thể tạo các API java thân thiện hơn với Kotlin
* `@ExtensionFunction`  - Biến một phương thức java tĩnh với ít nhất một đối số thành một hàm mở rộng.
* `@DefaultValue ` - có thể được sử dụng để cung cấp giá trị mặc định cho tham số trong hàm java.
* `@KtName ` - Chú thích này trong tham số phương thức java có thể giúp tính năng tham số được đặt tên của Kotlin.

### **(He)ART of Android:**
Google đã công bố vài cải tiến quan trọng trong ART (Android Run Time), điều đầu tiên là tối ưu hóa tất nhiên cho ngôn ngữ Kotlin.
**Cải tiên Memory và Storage**
![](https://images.viblo.asia/95bc2b1b-8fc6-456c-a4be-52cde3e3aa88.png)

CompactDex là một tính năng mới được giới thiệu trong ART mới, thu nhỏ các tập tin dex với vài kỹ thuật. Điều quan trọng nhất là loại bỏ multidex data. CompactDex xác định dữ liệu chung giữa nhiều dex và loại bỏ trùng lặp nó trong phần dữ liệu được chia sẻ.

**Cloud Profiling**
![](https://images.viblo.asia/9edd683e-63dc-47c0-bfab-a38081e8b8b4.png)

Google cố gắng cải thiện thời gian khởi động của một ứng dụng bằng kỹ thuật lược tả trên đám mây (cloud profiling technique). Để điều này hoạt động tốt hơn từ lần sử dụng đầu tiên của ứng dụng, họ khuyên bạn nên sử dụng kênh thử nghiệm alpha và beta trong google play.

Google thu thập thông tin hồ sơ từ người dùng có quyền truy cập sớm, tổng hợp thông tin đó để tạo hồ sơ trên đám mây, sau đó sẽ được chuyển đi với APK để cải thiện thời gian khởi động ngay từ đầu. Cũng trong tương lai gần, hồ sơ tổng hợp sẽ được chia sẻ với các nhà phát triển, do đó sẽ giúp họ tối ưu hóa ứng dụng của họ.

### **App Actions**

![](https://images.viblo.asia/d0e87444-10fd-42db-aa41-fc274a03edb5.png)

Google đã giới thiệu App Actions và điều này có thể tạo ra một lỗi về việc tương tác lại các ứng dụng của chúng ta. Hành động ứng dụng có thể tăng lực kéo cho các ứng dụng của chúng tôi bằng cách cung cấp các điểm tiếp xúc khác nhau cho các ứng dụng của chúng tôi trên nền tảng.
Một tệp actions.xml duy nhất có ý định và thực hiện có thể giúp chúng tôi giữ được nhiều lưu giữ hơn. Google bắt nguồn từ danh sách các mục đích được tích hợp sẵn có thể được các ứng dụng của chúng tôi sử dụng với sự hoàn thành trong ứng dụng của chúng ta.
Khi chúng ta sử dụng Touch point thì Tác vụ ứng dụng sẽ hiển thị cho người dùng:

![](https://images.viblo.asia/da2c2d09-dde2-4b8a-97df-d4d57ddb7aa2.jpg)
* Google Search App - Đề xuất các actions trong ứng dụng đã cài đặt
* All app -  Actions dự đoán sẽ được hiển thị dựa trên thói quen và ngữ cảnh của người dùng.
* Smart Text Selection - Các hành động ứng dụng có liên quan cho văn bản đã chọn sẽ được hiển thị.
* Play Store sẽ hiển thị các actions app là "Top Actions" cho chuỗi được truy vấn.

**Tích hợp với Google Assitant**
App Actions cũng có thể được mở rộng ngoài các thiết bị chạy Android, khi ứng dụng của chúng tôi có actions xml được tải lên google play, nó phát hiện actions và cung cấp cho chúng ta tùy chọn để yêu cầu dự án trong bảng điều khiển Actions trên Google. 
![](https://images.viblo.asia/563944d5-7012-4788-bb57-bd41f39f7f4c.png)

### **App Slices**
Chúng ta có thể nghĩ rằng các App Slices là phiên bản mở rộng của các app actions. Không giống như App Actions chỉ là các Touch points trên nền tảng, các app slices sẽ có nội dung phong phú và năng động từ ứng dụng của chúng ta. Và nó sẽ được đề xuất cho người dùng trong Ứng dụng tìm kiếm của Google. Slice có thể giúp tương tác với ứng dụng thông qua context search.
![](https://images.viblo.asia/62d61811-a3fe-4928-87fb-c2d9fef4097d.jpg)

### **App Bundles và Dynamic Delivery**
Gói ứng dụng (App bundles) là định dạng mới (.aab) bao gồm tất cả các code và tài nguyên được biên dịch. Với Gói ứng dụng, chúng ta không còn cần phải tạo nhiều APK để hỗ trợ các cấu hình thiết bị khác nhau.

Giờ đây, Google Play có tính năng này được gọi là Phân phối động (Dynamic Delivery) do đó lượt phát trong gói ứng dụng và đảm bảo tạo APK cho mọi cấu hình thiết bị khác nhau.

Bạn cần đăng ký chương **app signing** của trò chơi để tận dụng lợi thế của việc phân phối các ứng dụng nhỏ hơn và mô-đun cho người dùng của bạn.

Và có thêm một điều hơn thế hệ phân chia APK với App Bundles. Bây giờ chúng ta có thể tải / phân phối một tính năng theo yêu cầu từ ứng dụng mà không cần cài đặt ngay từ đầu.

### **Dynamic Feature**
Chúng ta tải các ứng dụng của chúng ta với các tính năng, nhưng kích thước của APK có thể tải xuống là bao nhiêu. Đôi khi chỉ có rất ít phần trăm người dùng sẽ sử dụng một tính năng cụ thể trong ứng dụng, chúng ta có thể chia các tính năng đó và tải chúng theo yêu cầu từ người dùng.

Bằng cách này, cài đặt ban đầu sẽ không có tính năng hiếm khi được sử dụng. Và nếu người dùng muốn tải tính năng đó, chúng ta có thể sử dụng Play Core Library để tải APK tính năng đó theo yêu cầu.
*Dynamic Feature  chia sẻ gần 95% mã từ plugin ứng dụng Instant Apps.*
Chúng ta có thể mong đợi việc hợp nhất tính năng động (Dynamic Feature) và instant app rất sớm. APK tính năng động sẽ có sẵn để sử dụng mà không cần cài đặt như instant apps.

Đó là những gì tôi tìm hiểu được. Nếu có thiếu sót thì các bạn có thể tìm hiểu thêm
Nguồn tìm hiểu: https://android.jlelse.eu/all-about-android-from-google-i-o-18-52cf3c90a53c