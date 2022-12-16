![](https://images.viblo.asia/d268fb3d-17bd-4799-ab4c-9cd498f81555.png)
# 1. Lời mở đầu
* Mình đã lập trình android được 1 thời gian không dài và cũng không ngắn đủ để nhìn thấy sự thay đổi chóng mặt của nó trong design, pattern, core library.
* Thực sự nhiều lúc mình đã tự hỏi rằng tại sao Google lại thay đổi nhiều thứ như vậy. 
* Đối với người mới thì sẽ khá khó khăn nếu biết rằng muốn theo đuổi Android cần rất nhiều thứ, đặc biệt nếu muốn có 1 công việc ở 1 công ty có mức thu nhật lớn.
* Lúc nào cũng có khó khăn hãy bắt đầu bằng những thứ tưởng chừng như đơn giản nhất. Đó là vạch ra con đường để trở thành professional Android programmer.

# 2. Android developer roadmap
1. **Core**: Đầu tiên, hãy học những kiến thức ngôn ngữ dùng để lập trình Android có thể là **Java** hay **Kotlin**. **Java** là ngôn ngữ truyền thống hỗ trợ cho Android nhưng giờ đây **Kotlin** mới chính là ngôn ngữ đang dần giữ lợi thế trong giới lập trình viên Android. Kotlin mang lại những tiện ích lớn cho lập trình viên, giúp code tối giản, dễ đọc, hơn thế nữa nó còn đang được support bởi **Google**.
2. **Setup IDE**: Thiết lập Android studio IDE cho chiếc PC hay laptop của bạn. 
* Link: https://developer.android.com/studio/ .
3. **Activity**: HIểu được Activity và Activity Lifecycle. Activity là 1 trong 4 thành phần cơ bản của Android rất quan trọng trong việc xây dựng Application (hầu hết app nào cũng có). 
* Link:  https://developer.android.com/guide/components/activities/activity-lifecycle .
4. **Fragment**: HIểu được Fragment và Fragment lifecycle. Fragment sinh ra với mục đích chính là thiết kế giao diện UI 1 cách uyển chuyển trên cách large device như tablets. Hãy học thật kĩ nó vì sau này nó sẽ được dùng nhiều trong các pattern. 
* Link: https://developer.android.com/guide/components/fragments .
5. **Layout**: Android cung cấp cho developer các View và ViewGroup để xây dựng lên giao diện của các màn hình trong app của bạn. Tìm hiểu các Layout hiểu được điểm mạnh, điểm yếu của nó để sử dụng cho phù hợp.
Link: https://developer.android.com/guide/topics/ui/declaring-layout
6. **Debug**: Học cách debug Android application cũng là 1 skill quan trọng của 1 lập trình viên. Android cung cấp nhiều debugger hỗ trợ các developer debug 1 cách dễ dàng. 
* Link: https://developer.android.com/studio/debug/ .
7. **Context**: Hiểu được Context trong Android. Context ở hầu hết mọi nơi trong app của bạn như Activity, Service... Bạn cần hiểu nó 1 cách đúng đắn.
* Link: https://blog.mindorks.com/understanding-context-in-android-application-330913e32514 .
8. **Looper, Handler, Thread**: Hiểu rõ về Thread. JVM cho phép 1 ứng dụng có nhiều Thread xử lý 1 cách đồng thời. Chúng ta phải biết cách xử dụng và điều khiển các Thread 1 cách hợp lý. 
* Link: https://developer.android.com/reference/java/lang/Thread.
9. **Intent và Intent Filter**: thành phần gửi message, action từ 1 thành phần sang 1 thành phần khác trong ứng dụng.
* Link: https://developer.android.com/guide/components/intents-filters
10. **Handle configuration changes**: Device configuration như screen orientation, change language... của bạn có thể thay đổi trong quá trình runtime. Hãy tìm hiểu để nắm được cách xử lý trong các trường hợp đó:
* Link: https://developer.android.com/guide/topics/resources/runtime-changes.
11.  **Sevice**: Là thành phần xử lý tác vụ dưới background như play music, xử lý file... và không cung cấp giao diện. Service là 1 trong 4 thành phần cơ bản của Android. 
* Link: https://developer.android.com/guide/components/services. 
12.  **Content provider**: là 1 trong 4 thành phần cốt lõi của Android được dùng để chia sẻ dữ liệu giữa các app.
* Link: https://developer.android.com/guide/topics/providers/content-providers
13. **App data và file**: Học cách lưu trữ dữ liệu trong các trường hợp cụ thể. Android cung cấp cho bạn nhiều công cụ để lưu trữ dữ liệu.
* Link: https://developer.android.com/guide/topics/data/
14. **Custom View**: Đôi lúc trong project có những View mà Android không cung cấp sẵn hay không đủ tính năng. Hãy tự tạo ra View của riêng bạn bằng cách custom các View cơ bản.
* Link: https://developer.android.com/guide/topics/ui/custom-components
15. **Resource**: https://developer.android.com/guide/topics/resources/available-resources
16. **Permisson**: là thành phần bảo vệ độ bảo mật của người dùng Android. Đôi khi trong app, bạn cần request các permission để có thể sử dụng được 1 tính năng nhất định.
* Link: https://developer.android.com/guide/topics/permissions/overview
17.  **Metric device components usage**: sử dụng các tool mà bạn biết để tính toán và đo đạc hiệu năng của các thành phần trong Android khi user sử dụng app.
* Link: https://blog.mindorks.com/android-app-performance-metrics-a1176334186e
18. **Tối ưu hóa các request network**: làm việc với mạng là 1 điều tất yếu và cơ bản hãy học cách tối nó.
* Link: https://www.youtube.com/watch?v=nDHeuEM30ks
19. **Performance**: Bạn viết ra 1 ứng dụng nhưng dễ gây khó chịu đối với người dùng nếu không chú trọng vấn đề hiệu năng như battery, device component usage, network, tránh memory leak... 
* Link: https://developer.android.com/topic/performance/
20.  **Các dịch vụ của Google**: như location, map, firebase...
21.  **ReactiveX (rx)**: là thành phần gần như bắt buộc đổi với việc phát triển Android app.
* Link: https://github.com/ReactiveX/RxAndroid
* Link: https://blog.mindorks.com/a-complete-guide-to-learn-rxjava-b55c0cea3631
22. **Dependency injection**: Là thành phần thực hiện nguyên tắc dependency inversion (1 trong nguyên tắc SOLID) giúp các thành phần trong ứng dụng liên kết lỏng lẻo, dễ dàng thay đổi. Các dependency hiện giờ hay dùng là: Dagger, Koin (dành cho Kotlin).
* Link: https://blog.mindorks.com/introduction-to-dagger-2-using-dependency-injection-in-android-part-1-223289c2a01b
* Link: https://insert-koin.io/
23. **architecture pattern**:  MVP => MVVM => clean architecture. 
* Link: https://medium.com/upday-devs/android-architecture-patterns-part-2-model-view-presenter-8a6faaae14a5
* Link: https://medium.com/upday-devs/android-architecture-patterns-part-3-model-view-viewmodel-e7eeee76b73b
* Link: http://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
24.  **Tools**: sử dụng thành thạo các công cụ Android cung cấp sẽ tối giản thời gian làm việc của bạn.
* Link: https://blog.mindorks.com/android-development-useful-tools-fd73283e82e3
25. **Android jetpack**: Là tập hợp các Android component mới giúp developer tạo ra app. Được đông đảo lập trình viên đón nhân vì sự tiện ích của nó. Và các ứng dụng đã áp dụng hết vào nó. Như Android architecture component giúp bạn dễ dàng thưc hiện mô hình MVVM. Mình đưa ra gần cuối vì nó rất hay, tiện dùng và dường như là bắt buộc đối với 1 professional Android developer.
* Link: https://developer.android.com/jetpack/?gclid=CjwKCAiAodTfBRBEEiwAa1hauhLwSNdzG57cyAKqv-cv8bC59XR5BIoq55wmZtdqQk-awy5g4XVZdxoC5vsQAvD_BwE
26.  **Sample**: Có rất nhiều nguồn code tham khảo nhưng mình chỉ đưa ra những nguồn thực sự tin cậy. Bạn đọc nó, code theo, đập đi và làm theo ý mình.
* Link:  https://github.com/googlesamples/android-architecture
* Link: https://developer.android.com/samples/
* Link: https://github.com/googlesamples/android-architecture-components
# 3. Kết luận
* Android rất thú vị nhưng cũng không khó khăn để tạo ra được 1 sản phẩm. Mong mọi người sẽ sớm trở thành 1 professional Android.
* Không có cách nào tốt hơn để học là tìm hiểu và thực hành.
* Link tham khảo: https://medium.com/mindorks/a-roadmap-to-become-a-better-android-developer-3038cf7f8c8d