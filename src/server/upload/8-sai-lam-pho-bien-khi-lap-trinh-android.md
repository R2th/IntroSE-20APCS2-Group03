# 1. Hard code 
Có sự phát triển vượt bậc trong hệ sinh thái Android trên toàn cầu với một cộng đồng đa dạng. Sự đông đảo về cộng đồng Android kéo theo những người muốn có các tính năng ưa thích  khác nhau như chế độ night mode, dark theme, car mode , v.v.  trong cuộc sống hàng ngày của họ.

Phát triển ứng dụng cho một cộng đồng đa dạng như vậy không phải là một nhiệm vụ dễ dàng. Chưa nói về kiến trúc cấp cao ở đây mà chỉ đề cập đến những thứ đơn giản như chuỗi, màu sắc, kích thước, v.v. sẽ ảnh hưởng đáng kể đến sự phát triển của Android hiện đại.
Nhiều người có thói quen hard code về string và đến khi cần change code lại phải đi chỉnh sửa ở khắp mọi nơi. Trong khi chỉ đền khai báo ở file string.xml là sửa 1 phát ăn cả trăm đường rồi.
Hay đôi khi người thường cảm thấy thoải mái khi sử dụng ứng dụng bằng ngôn ngữ mẹ đẻ của họ. Khuyến khích là dùng tiếng anh rồi muốn chuyển ngôn ngữ ta chỉ việc thêm các file string theo ngôn ngữ cụ thể một cách nhanh chóng.

Điều này cũng có thể áp dụng cho màu sắc, kích thước và style , vì vậy khi bạn quyết định thực hiện một điều gì đó như hỗ trợ dark theme  hoặc điều chỉnh bố cục tablet view , bạn sẽ dễ dàng xử lý chúng. Điểm mấu chốt là: Duy trì code ở một nơi duy nhất để sử dụng lại thay vì hard code chúng ở bất cứ nơi nào cần thiết.
# 2. Không sử dụng Fragments
Trong những ngày đầu phát triển Android, mọi người được khuyến khích sự dụng các `activities` riêng biệt cho từng màn hình. Theo thời gian, các nhà phát triển phải đối mặt với các vấn đề khác nhau do điều này. Ngoài ra, các activity là điểm truy cập vào ứng dụng cũng là một lỗ hổng.

Nếu bạn đã là nhà phát triển Android một thời gian, thì bạn sẽ biết rằng việc sử dụng các activities đã có ý nghĩa vài năm trước khi API Fragment chưa hoàn thiện như này nay.

Tua nhanh đến năm 2020 và Android team khuyên bạn nên sử dụng các fragment để thiết kế từng màn hình và duy trì một hoặc một số activities trong toàn bộ ứng dụng để lưu trữ các fragment. Nó còn được gọi là  `Single Activity Architecture`. Đến lập trình web cũng có Single Page cơ mà . Mọi ứng dụng đều hướng tới vậy cả.

Tuân theo kiến trúc này sẽ làm giảm một số lượng đáng kể các tương tác từ bên ngoài ứng dụng.` Jetpack navigation component` chủ yếu dựa trên Single Activity Architecture. API Fragment sẽ giúp cuộc sống coder của bạn trở nên đơn giản hơn nhiều. Có thể trong một vài năm nữa, sự phát triển của Android sẽ chuyển từ activity sang fragment sao cho tốt nhất.

# 3. Không sử dụng Using Data Bindings hay View Bindings
![](https://miro.medium.com/max/4800/1*42FZcmYQhmznt6mIYKKJAw.png)

Môi trường phát triển Android đã dựa trên hai loại file ngay từ đầu: XML, Kotlin / Java. File XML chứa mọi thứ liên quan đến thiết kế và file Kotlin / Java bao gồm bất kỳ thứ gì khác ngoài phần thiết kế.

Cuối cùng, giao diện người dùng và logic nghiệp vụ cần được liên kết và đó là nơi mà `data binding` và `view binding` đóng vai trò quan trọng. Mối liên hệ giữa giao diện người dùng và logic nghiệp vụ được bắt đầu bằng hàm `findviewbyid` khét tiếng.
Ai code Android mà lại không biết hàm ý cơ chứ.

Nhưng `data binding` và `view binding` là những giải pháp được khuyến nghị để giải quyết vấn đề này. Mục đích chính của liên kết chế độ xem là giải quyết vấn đề liên kết này với an toàn kiểu và null trong thời gian chạy.

`Data binding` là vì lợi ích lớn hơn. Nó cho phép bạn liên kết các thành phần giao diện người dùng trong bố cục với các nguồn dữ liệu bằng cách sử dụng định dạng khai báo thay vì theo chương trình.

# 4. Không sử dụng Kotlin and Coroutines
Đã một vài năm kể từ khi Google công bố Kotlin là ngôn ngữ được khuyến nghị để phát triển các ứng dụng Android. Đó là một trong những quyết định mang tính chuyển đổi: Kotlin đã giải quyết được những điểm khó khăn trong Java và có thể giảm bớt gánh nặng cho các nhà phát triển.
Việc sử dụng Kotlin cho phát triển Android đã mở ra những cánh cổng mới với các tính năng như [extensions](https://medium.com/better-programming/advanced-android-programming-with-kotlin-5e40b1be22bb), scoped functions, data classes, object keyword, null safety, v.v. Ngoài phát triển Android, bạn cũng có thể tham gia phát triển đa nền tảng và server-side với Kotlin.

Lập trình không đồng bộ đóng một vai trò quan trọng trong phát triển di động. Trong giai đoạn đầu, chúng ta đã sử dụng AsyncTask. Theo thời gian, RxJava được đưa ra ánh sáng và đó là một sự thay đổi mang tính chuyển đổi. Nhưng RxJava đi kèm với là ta phải học một tá kiến thức sâu rộng và cách tiếp cận hoàn toàn khác với các lệnh callback.

Sau đó là coroutines, một giải pháp Kotlin-y cho lập trình không đồng bộ với một cách tiếp cận đơn giản. Ngày nay, coroutines là một giải pháp tiêu chuẩn để triển khai các tác vụ không đồng bộ. Các tính năng mạnh mẽ và cách triển khai đơn giản làm cho nó dễ thích nghi hơn.
![](https://miro.medium.com/max/2552/1*8AyDbZh5VnQ1QrEmqxEr6A.png)

Kotlin giúp việc phát triển của bạn trở nên dễ dàng và ngắn gọn, trong khi đó coroutines cho phép bạn thực thi các tác vụ không đồng bộ một cách tuần tự mà không cần phải học bất kỳ điều gì mới. Sử dụng chúng trong quá trình phát triển của bạn chỉ mang lại kết quả đầu ra năng suất và hiệu quả hơn.
Việc dùng Rx hay corountines là phục thuộc vào mỗi project nên tốt nhất bạn nên biết được cả hai nhé.

# 5. Các lỗi Design 
**Đánh giá thấp ConstraintLayout**

ConstraintLayout đi kèm với sự kết hợp của nhiều tính năng tiện dụng như `Guidelines`, `Barriers`, `Group`, `aspect ratio`, `flow`, `Layer`,, v.v. Với tất cả các tính năng này, ConstraintLayout có thể vẽ hầu hết mọi màn hình (từ các trường hợp sử dụng đơn giản đến phức tạp).
ConstraintLayout khác với `Relative` and `Linear layouts`. Chúng ta có thể tạo bố cục phẳng mà không cần phân cấp lồng nhau. Thiết kế bố cục phẳng dẫn đến ít lớp hơn để vẽ trên khung nhìn.

**Lạm dụng quá mức ConstraintLayout**

Các tính năng mạnh mẽ đều có nguy cơ bị lạm dụng. Sử dụng ConstraintLayout trong giao diện người dùng mà bạn có thể thiết kế bằng FrameLayout hoặc LinearLayout là một cách tiếp cận thừa thãi, giết gà dùng dao mổ trâu.

**Sợ MotionLayout**
![](https://miro.medium.com/max/1946/1*ht1WQDkxsoeINtC2pwSfig.png)

`ConstraintLayout` là lựa chọn phù hợp để thiết kế các trường hợp sử dụng phức tạp, nhưng không phải để triển khai các `animations` và `transitions`. MotionLayout là một giải pháp hiệu quả để làm điều đó.

`MotionLayout` là một lớp con của ConstraintLayout bao gồm tất cả các tính năng nổi bật của nó và nó được khai báo đầy đủ với khả năng thực hiện các chuyển đổi phức tạp trong XML. Nó tương thích ngược với API 14, có nghĩa là nó bao gồm 99% các trường hợp sử dụng máy Android bây giờ.

Trình chỉnh sửa MotionLayout mới bắt đầu từ Android Studio 4.0 giúp bạn dễ dàng làm việc với `MotionLayout`. Nó cung cấp một môi trường editor ưa nhìn để thực hiện `transitions`, `MotionScenes` và hơn thế nữa.

MotionLayout không phải là thứ bao gồm các phép tính và thuật toán phức tạp. Thay vào đó, đó là một cách tiếp cận khai báo đơn giản để triển khai `animations` và `transitions` bằng trình chỉnh sửa mới lạ trong Android Studio.

# 6. Không nhận thức được vấn đề bảo mật

**Lưu trữ dữ liệu nhạy cảm**

Lưu trữ dữ liệu nhạy cảm trong Android shared preference, database, or local storage là một rủi ro. Nó có thể bị hack một cách dễ dàng. Nhiều nhà phát triển không nhận thức được điều này và sử dụng tùy chọn chia sẻ để lưu trữ dữ liệu nhạy cảm của người dùng.
Điều này có thể được giải quyết bằng cách sử dụng thư viện [datastore](https://medium.com/better-programming/jetpack-datastore-improved-data-storage-system-adec129b6e48) mới hoặc thư viện[ Encrypted preference](https://medium.com/android-dev-hacks/securing-sensitive-data-in-android-e261687ab66e) hoặc bằng cách tự thực hiện mã hóa.

![](https://miro.medium.com/max/2436/1*kDQKAjnpv6VHYrQcN3ouAQ.png)

**Giao tiếp an toàn**

Nhiều nhà phát triển Android nghĩ rằng việc sử dụng HTTPS có thể giúp giao tiếp của họ với máy chủ được an toàn. Nhưng đó không phải là trường hợp. Nhiều tin tặc can thiệp vào thông tin liên lạc để đánh lừa máy chủ và máy khách. Đây được gọi là [middle man attach](https://medium.com/better-programming/secure-communication-with-the-server-from-your-android-client-with-certificate-pinning-5f53cea55972) 

Để thiết lập một đường truyền an toàn tới máy chủ, chúng ta cần thực hiện [certificate pinning.](https://medium.com/better-programming/secure-communication-with-the-server-from-your-android-client-with-certificate-pinning-5f53cea55972)

# 7. Không biết về khả năng của Android Studio
Bạn sẽ không biết một vũ khí mạnh đến mức nào trừ khi bạn học cách sử dụng nó đúng cách. Là nhà phát triển, chúng ta thật may mắn có một công cụ mạnh mẽ như Android Studio ( dùng nó sưởi ấm vào mùa đông thật là tuyệt vời mà , khóc mất), nhưng bạn nên biết cách sử dụng nó một cách hiệu quả.
Có rất nhiều tính năng ẩn như [shortcuts](https://medium.com/android-dev-hacks/android-studio-tips-tricks-for-beginners-703bc9a36259),[ live templates](https://medium.com/@sgkantamani/constraint-layout-with-live-templates-do-less-finish-more-b62397725835), [file templates](https://medium.com/@sgkantamani/constraint-layout-with-live-templates-do-less-finish-more-b62397725835), cấu trúc dự án được xác định trước, code generator plug-ins, tùy chỉnh và hơn thế nữa. Chúng ta cũng có[ database inspector](https://medium.com/better-programming/exploring-the-database-inspector-in-android-studio-de0026024895) để tùy chỉnh database , [layout inspector](https://medium.com/better-programming/explore-the-new-layout-inspector-in-android-studio-4-0-6f9ffb1505f2), profiler, v.v. để hoạt động hiệu quả trong thời gian chạy.

![](https://developer.android.com/studio/images/studio-homepage-hero.jpg)

Android Studio cũng cung cấp hỗ trợ công cụ cho một số thư viện, chẳng hạn như trình navigation editor để xem application’s navigation graph và motion editor để thực hiện các animation  và transition hiệu quả theo cách lạ mắt.

# 8. Không sử dụng Jetpack Libraries
![](https://miro.medium.com/max/1838/1*FB931aBGoALv3OLY5LSRGg.png)

> “Jetpack is a suite of libraries to help developers follow best practices, reduce boilerplate code, and write code that works consistently across Android versions and devices so that developers can focus on the code they care about.” — Android Jetpack
> 
> “Jetpack là một bộ thư viện để giúp các nhà phát triển làm theo các phương pháp hay nhất, giảm boilerplate code  và viết code hoạt động nhất quán trên các phiên bản và thiết bị Android để các nhà phát triển có thể tập trung vào code mà họ quan tâm.” - Android Jetpack

Thư viện JetPack bao gồm các tính năng chính như [Paging3](https://medium.com/android-dev-hacks/exploring-paging3-part-1-653dc537a69a) để phân trang, [Room](https://medium.com/better-programming/how-to-use-the-room-persistence-library-with-kotlin-flow-c73f461a0819) cho cơ sở dữ liệu cục bộ, [WorkManager](https://medium.com/swlh/workmanager-basics-how-to-use-workmanager-with-rxjava2-kotlin-coroutines-c2a317197038) cho các tác vụ nền chạy lâu, [DataStore](https://medium.com/better-programming/jetpack-datastore-improved-data-storage-system-adec129b6e48) để cải thiện lưu trữ dữ liệu, [Hilt](https://medium.com/better-programming/hilt-a-new-dependency-injection-library-for-android-e6e00e719aeb) cho DI, [navigation component ](https://medium.com/better-programming/jitpack-navigation-component-in-android-944165c35f54)để điều hướng trong giao diện người dùng ứng dụng, [App Startup](https://medium.com/better-programming/app-startup-new-architecture-component-d115b062a701) để giảm thời gian khởi động ứng dụng , và nhiều hơn nữa.

Tất cả các thư viện này được xây dựng để lưu ý đến hiệu suất và tính dễ sử dụng để thực hiện các tác vụ phức tạp với ít code hơn.

Bài viết lần này tới đây thôi vậy các bạn , nó dược dịch từ trang  [Medium](https://betterprogramming.pub/8-common-mistakes-in-android-development-2edcf5179ec0) này . Cảm ơn mọi người đã xem nha. Có gì chưa hợp lý thì mọi người cùng thảo luận nha :heart_eyes: