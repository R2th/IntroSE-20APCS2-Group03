Cứ code mãi cùng buồn, nên mình muốn ôn lại một chút kiến thức về Android, vừa là để ôn tập vừa là để ghi lại khi nào cần thì mở ra xem. Các câu hỏi thì mình cũng sẽ tổng hợp từ những bài viết khác nhau, nhưng cũng có những câu hỏi, những câu trả lời có lẽ đã không đúng hoặc không còn đầy đủ ở thời điểm mình viết bài này, nên hôm nay mình sẽ cùng các bạn ôn tập lại và trả lời các câu hỏi mà mình tổng hợp được nhé.
### 1. [Application](https://developer.android.com/reference/android/app/Application) là gì?
Là lớp cơ sở để duy trì trạng thái của toàn bộ ứng dụng. Chứa toàn bộ các thành phần như các `Activities` hay `Services`. Lớp `Application` hoặc bất kì lớp con nào của nó sẽ được khởi tạo trước bất kì lớp nào khác khi thực cho ứng dụng/package của bạn được khởi tạo.
### 2. [Context](https://developer.android.com/reference/android/content/Context) là gì?
Là một đối tượng cung cấp, xử lý toàn bộ thông tin về môi trường, tài nguyên của ứng dụng. Nó là một lớp trừu tượng được triển khai bởi hệ thống Android. Nó cho phép truy cập vào tài nguyên và các lớp dành riêng cho ứng dụng như `resources`, `preference`, `database` ...  cũng như các lệnh gọi ở `application-level` như `startActivity`, `receiveIntent` ...
**Application Context**:  Là một context gắn với vòng đời của ứng dụng. Sử dụng application context khi bạn cần sử dụng một context khác với context hiện tại hoặc một context ở một nơi vượt qua vòng đời của `Activity` <br>
**Activity Context**: Là context gắn với vòng đời của một `Activity`, có sẵn trong mọi `Activity`, chúng ta sử dụng khi mà chúng ta chỉ cần một Context gắn với Activity hiện tại hoặc có cùng vòng đời với Activity.
### 3. ARM, ARM64 và x86 là gì?
Cho đến nay, có ba kiến trúc CPU chính được sử dụng trong điện thoại thông minh Android – ARM, ARM64 và x86. Trong số ba loại này, ARM là phổ biến nhất vì nó được tối ưu hóa cho mức tiêu thụ pin. ARM64 là một sự phát triển của kiến ​​trúc ARM gốc hỗ trợ xử lý 64 bit để tính toán mạnh hơn và nó nhanh chóng trở thành tiêu chuẩn trong các thiết bị mới hơn. Sau đó, có x86, mạnh hơn một chút so với các loại CPU ARM, nhưng không hoàn toàn ổn với pin, vì vậy đây là loại ít phổ biến nhất trong ba loại.
* ARM: ARMv7 hoặc armeabi
* ARM64: AArch64 hoặc arm64
* x86: x86 hoặc x86abi

### 4. Tại sao bytecode không chạy được trong android?
Bởi vì Android sử dụng **DVM - Dalvik Virtual Machine** (từ các phiên bản trước Lollipop) và **ART - Android Runtime** (chính thức từ phiên bản Lollipop trở lên, tuy nhiên nó đã được thông báo và cho dùng thử nghiệm từ phiên bản Kitkat) để thực thi chương trình chứ không sử dụng **JVM (Java Virtual Machine).**
### 5. Phân biệt ART, DVM và JVM
Khác biệt lớn nhất của DVM và JVM là kiến trúc của chúng:
* DVM được đăng kí được thiết kế chạy dựa trên bộ nhớ thấp, sử dụng mã byte riêng biệt là chạy tệp `.dex`
* JVM là Stack dựa trên đó sử dụng mã byte java và chạy tệp` .class` có JIT.

Kể từ kitkat (phiên bản Android 4.4), Google đã thay thế thời gian chạy **DVM** thành **ART** . Google làm điều này vì nó sẽ cải thiện hiệu suất trong khi ứng dụng được khởi chạy. Trong DVM khi bạn nhấp vào ứng dụng, nó sẽ biên dịch bytecode DEX và chuyển đổi nó thành mã máy, thường được gọi là JIT (Just In Time). Thay vì chạy quá trình biên dịch mỗi khi khởi chạy ứng dụng, ART đã thay đổi theo cách đó bằng cách chuyển đổi bytecode DEX và chuyển nó thành mã máy khi ứng dụng ở bước cài đặt. Quá trình này có thể mất nhiều thời gian khi bạn cài đặt ứng dụng, nhưng sẽ nhanh hơn khi bạn khởi chạy ứng dụng.
### 6. BuildType ở trong Gradle là gì? Nó được sử dụng với mục đích gì?
Các loại `build` định nghĩa những thuộc tính mà `Gradle` sử dụng khi xây dựng và đóng gói một ứng dụng Android.
* Build type xác định cách một module được xây dựng, ví dụ như có sử dụng `ProGuard` hay không, ...
* `Product flavor `xác định những gì sẽ được tạo ra, ví dụ như tài nguyên nào được bao gồm trong bản build.
* `Gradle` tạo ra một  [build-variants](https://developer.android.com/studio/build/build-variants) cho mọi tổ hợp có thể có từ product flavor và build type trong dự án của bạn.

### 7. Quá trình build một ứng dụng Android
![image.png](https://images.viblo.asia/c1e2d674-bfea-4824-8700-c08505150ea9.png)

* Bước đầu tiên liên quan đến việc biên dịch thư mục tài nguyên (/ res) bằng công cụ aapt (công cụ đóng gói tài sản android). Chúng được biên dịch thành một tệp lớp duy nhất có tên là R.java. Đây là một lớp chỉ chứa các hằng số. 
* Bước thứ hai liên quan đến việc mã nguồn `.java/.kt `được javac biên dịch thành các tệp `.class`, và sau đó các tệp lớp được chuyển đổi thành Dalvik bytecode bằng công cụ "dx", được bao gồm trong sdk ‘tools’. Đầu ra là các lớp `.dex`
* Bước cuối cùng liên quan đến apk builder android, lấy tất cả dữ liệu đầu vào và xây dựng tệp apk (khóa đóng gói android).
### 8. Android Architectute là gì?
Kiến trúc Android chứa nhiều thành phần khác nhau để hỗ trợ bất kỳ nhu cầu thiết bị Android nào. Phần mềm Android chứa Linux kernel mã nguồn mở có tập hợp số lượng thư viện C / C ++ được hiển thị thông qua các dịch vụ khung ứng dụng.
* **Applications** : Là lớp trên cùng, đó là các ứng dụng được cài sẵn như máy ảnh, danh bạ... hay các ứng dụng cài đặt từ bên thứ 3 như youtube, game...
* **Application Framework**: Cung cấp một số lớp quan trọng để tạo ứng dụng Android. Nó cung cấp các cách để truy cập phần cứng cũng như hiển thị giao diện người dùng. Ví dụ như Activity Manager, Notification Manager, Package Manager, Window Manager, Content Providers, View System.
* **Android Runtime**: Android Runtime là một trong những phần quan trọng nhất của Android. Nó chứa các thành phần như thư viện lõi và máy ảo Dalvik (DVM). Về cơ bản, nó cung cấp nền tảng cho Application Framework  và cung cấp năng lượng cho ứng dụng của chúng tôi với sự trợ giúp của các thư viện lõi.
* **Platform Libraries**: Platform Libraries bao gồm các thư viện lõi C / C ++ khác nhau và các thư viện dựa trên Java như Media, Graphics, Surface Manager, OpenGL, v.v. để hỗ trợ phát triển Android.
* **Linux Kernel**: Linux Kernel là trái tim của kiến trúc Android. Nó quản lý tất cả các trình điều khiển có sẵn như trình điều khiển hiển thị, trình điều khiển máy ảnh, trình điều khiển Bluetooth, trình điều khiển âm thanh, trình điều khiển bộ nhớ, v.v. được yêu cầu trong thời gian chạy. Linux Kernel sẽ cung cấp một lớp trừu tượng giữa phần cứng thiết bị và các thành phần khác của kiến trúc android. Nó chịu trách nhiệm quản lý bộ nhớ, nguồn điện, thiết bị, v.v.

### 9. Diễn giải [Actitity](https://developer.android.com/reference/android/app/Activity)
Một `Activity` là một việc đơn lẻ, tập trung mà người dùng có thể thực hiện. Hầu hết tất cả các hoạt động đều tương tác với người dùng, vì vậy lớp `Activity` sẽ đảm nhận việc tạo một cửa sổ cho bạn trong đó bạn có thể đặt giao diện người dùng của mình với `setContentView (View)`. Trong khi các hoạt động thường được hiển thị cho người dùng dưới dạng cửa sổ toàn màn hình, chúng cũng có thể được sử dụng theo những cách khác: dưới dạng cửa sổ nổi (thông qua một chủ đề với bộ `R.attr.windowIsFloating`), chế độ đa cửa sổ hoặc được nhúng vào các cửa sổ khác.

### 10. [Vòng đời](https://developer.android.com/guide/components/activities/activity-lifecycle) của một Activity
![image.png](https://images.viblo.asia/95732393-fb3e-4e28-b115-518c144ac9af.png)

* `OnCreate ()`: Đây là khi `view` được tạo lần đầu tiên. Đây thường là nơi chúng tôi tạo các khung nhìn, lấy dữ liệu từ các gói, v.v. 
* `OnStart ()`: Được gọi khi hoạt động hiển thị cho người dùng. Tiếp theo là `onResume ()` nếu hoạt động xuất hiện ở nền trước hoặc `onStop ()`nếu hoạt động bị ẩn.
* `OnResume ()`: Được gọi khi Activity sẽ bắt đầu tương tác với người dùng. Tại thời điểm này, Activity của bạn đang ở trên cùng của ngăn xếp hoạt động, với đầu vào của người dùng sẽ được chuyển đến.
* `OnPause ()`: Được gọi là một phần của vòng đời hoạt động khi một Activity đang ở chế độ nền, nhưng chưa (chưa) bị kết thúc.
* `OnStop ()`: Được gọi khi bạn không còn hiển thị với người dùng.
* `OnDestroy ()`: Được gọi khi Activity kết thúc.
* `OnRestart ()`: Được gọi sau khi Activity của bạn bị dừng, trước khi bắt đầu lại.

### 11. Sự khác biệt giữa onCreate () và onStart () là gì?
Phương thức` onCreate ()` được gọi một lần trong vòng đời Activity, khi ứng dụng khởi động hoặc khi Activity đã bị hủy và sau đó được tạo lại, chẳng hạn như trong khi thay đổi cấu hình. Phương thức `onStart ()` được gọi bất cứ khi nào Activity hiển thị cho người dùng, thường là sau `onCreate ()`hoặc `onRestart ()`.
### 12. Khi nào thì onDestroy () được gọi mà không có onPause () và onStop ()
Nếu bạn gọi hàm `finish()` trong hàm `onCreate()`, `onDestroy()` sẽ được gọi trực tiếp không qua `onPause()` và `onStop()`.
### 13. Tại sao lại gọi setContentView() trong onCreate() của Activity
 Như bạn đã biết `onCreate()` được gọi duy nhất một lần khi Activity khởi đông, đây là thời điểm các quá trình khởi tạo nên được thực hiện. Sẽ không hiệu quả nếu đặt trong `onStart() `và `onResume()`(những hàm được gọi nhiều lần) vì `setContentView` là một hàm nặng, tốn nhiều tài nguyên.
 
 ### 14. onSavedInstanceState() và onRestoreInstanceState() trong Activity?
`OnRestoreInstanceState () `- Khi Activity được tạo lại sau khi nó bị hủy trước đó, chúng ta có thể khôi phục trạng thái đã lưu từ `Bundle` mà hệ thống chuyển cho hoạt động. Cả hai phương thức gọi lại onCreate () và onRestoreInstanceState () đều nhận được cùng một `Bundle` chứa thông tin trạng thái cá thể. Nhưng vì phương thức onCreate () được gọi cho dù hệ thống đang tạo một phiên bản hoạt động mới của bạn hay tạo lại một phiên bản trước đó, bạn phải kiểm tra xem gói trạng thái có rỗng không trước khi bạn cố đọc nó. Nếu nó là `null`, thì hệ thống đang tạo một phiên bản mới của hoạt động, thay vì khôi phục một phiên bản trước đó đã bị hủy. 

`onSaveInstanceState () `- là một phương thức được sử dụng để lưu trữ dữ liệu trước khi tạm dừng hoạt động.

### 15. Launch mode trong Android
Có 4 launchMode khác nhau mà bạn có thể sử dụng: `standard`, `singleTop`, `singleTask`, `singleInstance`. Tùy vào mục đích sử dụng như là tạo mới hay sử dụng lại activity đã có trước đó mà bạn sẽ sử dụng launchMode sao cho phù hợp.
* **Standard**: Nó tạo ra một phiên bản mới của một Activity khi được bắt đầu. Nhiều phiên bản của Activity có thể được tạo và nhiều phiên bản có thể được thêm vào các nhiệm vụ giống nhau hoặc khác nhau. Vd: Giả sử có một ngăn xếp hoạt động là A -> B -> C. Bây giờ nếu chúng ta khởi chạy lại B với chế độ khởi chạy là "**standard**", ngăn xếp mới sẽ là A -> B -> C -> B.
* **SingleTop**: Tương tự như `standard`,  nhưng có trường hợp nếu Activity đang ở trên cùng của BackStack thì sẽ không tạo ra thêm phiên bản mới của Activity. Ví dụ như ta đang có A->B->C, nếu ta thêm Activity A ta sẽ có A->B->C->A, nếu tiếp tục thêm A ta vẫn sẽ là A->B->C->A.
* **Single Task** : Một nhiệm vụ mới sẽ luôn được tạo và một phiên bản mới sẽ được đẩy lên tác vụ làm tác vụ gốc. Vì vậy, nếu Activity đã có trong tác vụ, `intent` sẽ được chuyển hướng đến `onNewIntent () `nếu không một phiên bản mới sẽ được tạo. Tại một thời điểm, chỉ một phiên bản hoạt động sẽ tồn tại. Ví dụ: Giả sử có một ngăn xếp hoạt động là A -> B -> C -> D. Bây giờ nếu chúng ta khởi chạy D với chế độ khởi chạy là "singleTask", ngăn xếp mới sẽ là A -> B -> C -> D như bình thường. Bây giờ, nếu có một ngăn xếp hoạt động là A -> B -> C -> D. Nếu chúng ta khởi chạy lại hoạt động B với chế độ khởi chạy là "singleTask", thì ngăn xếp hoạt động mới sẽ là A -> B. Các hoạt động C và D sẽ bị phá hủy.
*  **SingleInstance**: Giống như nhiệm vụ đơn lẻ nhưng hệ thống không khởi chạy bất kỳ hoạt động nào cùng nhiệm vụ với hoạt động này. Nếu các hoạt động mới được khởi chạy, chúng sẽ được thực hiện trong một nhiệm vụ riêng biệt. Ví dụ: Giả sử có một ngăn xếp hoạt động A -> B -> C -> D. Nếu chúng ta khởi chạy lại hoạt động B với chế độ khởi chạy là "**singleInstance**", ngăn xếp hoạt động mới sẽ là: 
    *  Task1 - A -> B -> C
    *   Task2 - D

### 16. Activity phản hồi như thế nào khi người dùng xoay màn hình
Khi màn hình được xoay, phiên bản hiện tại của `Activity` bị phá hủy, một phiên bản mới của Activity được tạo theo hướng mới. Phương thức onRestart () được gọi đầu tiên khi màn hình được xoay. Các phương thức vòng đời khác được gọi trong luồng tương tự như khi hoạt động được tạo lần đầu tiên.

### 17. Làm cách nào để ngăn dữ liệu tải lại và đặt lại khi xoay màn hình?
Cách tiếp cận cơ bản nhất sẽ là sử dụng kết hợp `ViewModels` và `onSaveInstanceState ()`.Vậy làm thế nào chúng ta làm điều đó? 

Khái niệm cơ bản về `ViewModel`: ViewModel là `LifeCycle-Aware`. Nói cách khác, ViewModel sẽ không bị hủy nếu chủ sở hữu của nó bị hủy vì thay đổi cấu hình (ví dụ: xoay). Phiên bản mới của chủ sở hữu sẽ chỉ được kết nối lại với ViewModel hiện có. Vì vậy, nếu bạn xoay một Hoạt động ba lần, bạn vừa tạo ba phiên bản Hoạt động khác nhau, nhưng bạn chỉ có một ViewModel. Vì vậy, thực tiễn phổ biến là lưu trữ dữ liệu trong lớp ViewModel (vì nó vẫn tồn tại dữ liệu trong quá trình thay đổi cấu hình) và sử dụng `OnSaveInstanceState` để lưu trữ một lượng nhỏ dữ liệu giao diện người dùng. 

Ví dụ: giả sử chúng ta có một màn hình tìm kiếm và người dùng đã nhập một truy vấn vào `Edittext`. Điều này dẫn đến danh sách các mục được hiển thị trong `RecyclerView`. Bây giờ nếu màn hình được xoay, cách lý tưởng để ngăn việc đặt lại dữ liệu sẽ là lưu trữ danh sách các mục tìm kiếm trong ViewModel và người dùng văn bản truy vấn đã nhập vào phương thức `OnSaveInstanceState` của hoạt động.

Tạm thời đến đây, hẹn gặp lại các bạn ở phần 2 nhé.

Nguồn tham khảo: 
* https://medium0.com/android-news/android-interview-questions-cheat-sheet-96ea01c88def
* https://developer.android.com/reference/