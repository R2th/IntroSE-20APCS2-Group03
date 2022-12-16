Vậy là sau bao nhiêu ngày chờ đợi, sau khi thực hiện rất nhiều khó khăn trong việc hoàn thành ứng dụng của mình, bây giờ bạn sẽ phát hành ứng dụng Android của mình lên Google Store. Nhưng bạn lại đang suy nghĩ liệu không biết là mình đã làm đủ bước chưa nhỉ?
Đã setting đúng môi trường chưa? Sau đây là một checklist giúp bạn kiểm tra những công việc đó.
# 1 Thêm Analytics vào ứng dụng của bạn
Thông thường thì mình thường bắt buộc kiểm tra xem crashlytics đã được thêm hay chưa, các lỗi crash app thường nghiệm trọng và ảnh hướng rất xấu tới UX của người dùng, vì vậy đoạn này là vô cùng cần thiết.


Google analytics là một ứng dụng miễn phí cho phép chúng ta cái nhìn rộng hơn về ứng dụng và các hành vi người dùng.
https://firebase.google.com/docs/analytics/


Analytics tích hợp dựa trên các tính năng của firebase và và cung cấp cho bạn báo cáo không giới hạn, tối đa lên tới 500 sự kiến riêng biệt mà bạn có thể xác định bằng cách sử dụng Firebase SDK.  Báo cáo giúp bạn hiểu rõ cách người dùng sử dụng ứng dụng, điều này cho phép các bạn đưa ra những quyết định sáng suốt liên quan đến marketing và nâng cao chất lượng của sản phẩm.
![](https://media.giphy.com/media/l46Cy1rHbQ92uuLXa/giphy.gif)

# 2 Áp dụng Proguard vào ứng dụng
ProGuard là một công cụ rút gọn (shrink), tối ưu hoá (optimize) và làm mờ (obfuscate) code. Mặc dù cũng có các công cụ khác cho developer làm việc này tuy nhiên ProGuard thì có sẵn là một phần của Android Gradle build process và gửi kèm với SDK.
Có ba lý do chính và vô cùng thuyết phục để các bạn nên sử dụng Proguard
1. Proguard giúp bạn loại bỏ các resource không đựoc sử dụng trong code của các bạn (thông thường thì đó thường là  images đối tượng lớn dẫn đến việc làm tăng kích thướng apk) , thông qua đó làm** giảm size của apk**
2. Proguard auto thay đổi các định danh (class name, class variable thậm chỉ cả package) thành các class có ngắn như a.A, a.a.B, d.x .... vừa giúp giảm size của apk vừa giúp các hacker khác không thể đọc code cuả các bạn khi dịch ngược lại apk.
3. Proguard là một phần đã được xây dựng sẵn cho Android Studio và setup rất đơn giản.

Lưu ý khi làm việc với proguard 
1. Chú ý nếu bạn đang sử dụng gson để parse json thì model của các bạn nên được thêm vào proguard
Giả sử các bạn có 1 model là ```com.toandoan.example.data.model.User.java``` thì bắt buộc các bạn cần thêm đoạn code sau vào file ```proguard-rules.pro``` nếu không sau khi được build qua proguard thì tên cũng như các key json của các bạn sẽ bị thay đổi và do đó Gson sẽ k thể parse model cho các bạn theo ý muốn.
```
-keep class com.toandoan.example.data.model.User.java**
```
2. Không sử dụng nhưng thứ như Fragment.class.getSimpleName() như là một Fragment TAG. Vì như mình nói ở trên Proguard sẽ auto thay đổi các định danh đó.
3. Bắt buộc test kĩ lại app sau khi build qua proguard

Một số rule cần add khi sử dụng một số lib thông dụng
* [Retrofit](https://github.com/square/retrofit/blob/master/retrofit/src/main/resources/META-INF/proguard/retrofit2.pro)
* [Glide](https://github.com/bumptech/glide/blob/master/library/proguard-rules.txt)
* [RxJava](https://gist.github.com/kosiara/487868792fbd3214f9c9)
* .....
# 3 Kiểm tra size của apk
Kích thước của ứng dụng càng ít thì cơ hội được tải xuống càng nhiều, và khả năng bị gỡ bỏ càng thấp. Vì vậy đừng quên loại bỏ các tài nguyên khong được sử dụng.
Mặc dụng Proguard cũng giúp các bạn làm việc đó rồi tuy nhiên hãy tracking lại nữa nhé, giảm size càng  thấp càng tốt.
* Resize ảnh nếu cần thiết
* Sử dụng ảnh vector thay cho ảnh png hoặc jpg

Một số cách để giảm thiếu kích thước của APK các bạn có thể tham khảo tại đây
https://blog.mindorks.com/how-to-reduce-apk-size-in-android-2f3713d2d662

![](https://media.giphy.com/media/l4JzbBLmrsJXYOoY8/giphy.gif)

# 4 Kiểm tra lại các phần được cấp nhật trong ứng dụng
Test lại nếu ứng dụng của các bạn có được cập nhật thành công từ phiên bản trước lên phiên bản hiện tại hay không. Cách tốt nhất là install ứng dụng trước đó rồi cài đè version mới lên. Bạn có thể quên tăbg database version sau khi thay đổi database hoặc bạn cũng có thể quên viết mirgration khi thay đổi database.

![](https://www.oracle.com/technetwork/developer-tools/sql-developer/migration-logo-2389341.png)

# 5 Tắt logging và Debugging.
Đảm bảo rằng bạn đã tắt bỏ tất cả Logging và Debugging trong bản release. Bạn cũng có thể sử dụng một vài thư viện cho việc Log và Debug tuy nhiên trước khi releáse hãy đảm bảo rằng chúng đã được gỡ bỏ hoàn toàn khỏi ứng dụng.

# 6 Chuẩn bị những thông tin mới của bản cập nhật

# 7 Chuẩn bị Screenshots cho bản release mới (nếu có)
![](https://cdn-images-1.medium.com/max/800/1*Oem_B16dymHgIHfeDnltIw.png)

# 8 Kiểm tra version name và version code của ứng dụng
Đừng quên điền đúng version name và code nhé, nếu không sẽ rất khó để quản lý các version tiếp theo.
Mình suggest các bạn tạo 1 file release note để note lại qua các version khác nhau. 
![](https://cdn-images-1.medium.com/max/800/1*ZGLnEt6mvOirl2IkYIL0yQ.png)
 
 # 9 Kiểm tra các ngôn ngữ của ứng dụng
 Nếu ứng dụng của các bạn hỗ trợ nhiều ngôn ngữ khác nhau, đảm bảo rằng bạn đã thêm đầy đủ string cho các ngôn ngữ.
 Bằng cách sử dụng Translator Editor của Android Stuidio, những string nào chưa được dịch sẽ có báo đỏ.
 ![](https://images.viblo.asia/b333f7a3-fa67-44a2-9a09-9683c92118c1.png)
 
 # 10 Kiểm tra ứng dụng ở các hệ điều hành khác nhau và các kích thước màn hình khác nhau. 
 Như các bạn cũng biết thì Android là một hệ điều hành mở và rất phân mảnh. Nó có đủ hình dạng và kích thước màn hình khác nhau và cũng có nhiều phiên bản khác nhau. Vì vậy trước khi relesae bạn cần test trên tất cả các thiết bị Android
 
![](https://cdn-images-1.medium.com/max/800/1*D-lJhK6cnjtsgljZodtf8w.png)
![](https://cdn-images-1.medium.com/max/800/1*UaIkvhbRZEjWuWfisk4DCA.png)

# 11 Kiểm tra về bảo mật của ứng dụng
Nếu có bất cứ key nào trong ứng dụng của các bạn hãy đảm bảo rằng chúng được bảo mật và khó để có thể tìm ra hay hack được

![](https://media.giphy.com/media/lp3GUtG2waC88/giphy.gif)

# 12 Theo sát feedback từ phía người dùng trên Play Store.
Đảm bảo rằng các report từ người dùng đã đựoc xử lý ở version lần này.

![](https://media.giphy.com/media/l0MYCn3DDRBBqk6nS/giphy.gif)

Chúc các bạn thành công!.

Bài viết có nguồn từ: https://medium.com/mindorks/android-app-release-checklist-for-the-production-launch-4095f46d04fa