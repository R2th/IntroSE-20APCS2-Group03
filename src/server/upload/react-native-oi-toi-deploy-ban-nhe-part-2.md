![](https://images.viblo.asia/9833bbf6-cbb3-4f5a-80c2-8cc284fb3333.png)


**Đối với mỗi con người thì có 4 loại tình yêu bạn phải trải qua .**


```
1. Storge - tình yêu trong gia đình và xã hội
2. Philia - Tình yêu trong tình bạn
3. Eros - tình yêu của tình dục
4. Agape - tình yêu giữa nhân loại và mọi sinh vật sống trên trái đất
```

Có những người chưa bao giờ trải qua nó nhưng cũng có những người đã trải nghiệm hết các loại tình yêu trên. Vậy bạn muốn thử thêm 1 loại tình yêu nữa không ?

Đó là thứ tình yêu để sinh tồn, để tồn tại , tình yêu của React Native và Google Play . Giới thiệu hơi nhãm chút. Bây giờ chúng ta đi tiếp phần 2 của bài hướng dẩn hôm trước nhé .

**Xin chúc mừng**, bạn đã hoàn thành quá trình phát triển của mình và bây giờ bạn đang tìm cách triển khai ứng dụng React Native của mình trên Google Play. 

Mặc dù React Native là một công cụ phát triển đa nền tảng tuyệt vời, nhưng nó không tự động hóa quá trình triển khai ứng dụng của bạn tới các cửa hàng. Mình sẽ hướng dẩn các bạn qua các bước để ứng dụng Android  của bạn sẵn sàng được xuất bản trên Google Play.

# II . Deploy Android
## 2. Deploying a React Native App with Google Play

Google Play Store là market chính thống và có nhiều người dùng nhất trên Android. Nên việc bạn đưa ứng dụng lên Store này cũng sẽ giúp bạn dễ dàng tiếp cận tới nhiều người dùng hơn rất nhiều. Khác với Apple, khi mà App Store có quá trình review rất chặt chẽ. Các ứng dụng khi submit lên App Store đều trải qua quá trình review thủ công. Điều này sẽ đảm bảo ứng dụng trên App Store có chất lượng tốt nhất trước khi tới tay người dùng. Google Play Store thì quá trình review ứng dụng thường làm bằng máy. Do vậy, ứng dụng của bạn có nhiều cơ hội được approve hơn rất nhiều.

### a. Chuẩn bị .
   * Điều đương nhiên và đầu tiên đó là bạn phải có một app hoàn thiện. Khái niệm hoàn thiện ở đây không phải là nó phải đạt đến mức toàn diện như những app mình đang sữ dụng mà ít nhất củng phải hoàn thiện về logic củng như giao diện người dùng. 
   * App Icon: A 512×512 px icon. Hình ảnh phải minh bạch và đúng quy định và được cho phép sử dụng bởi Google play
   * App Category: Phân loại app của mình bằng việc tìm hiểu thông tin ở  [Google Play categories](https://support.google.com/googleplay/android-developer/answer/113475).
  * Tạo một Bundle ID cho ứng dụng
   * Tạo một APK có sign key
 * Và tất nhiên là phải có một tài khoản Google developer( Chi phí để tạo là 25$) 
 
###  b. Generating Signed APK.

Android yêu cầu tất cả các ứng dụng phải có chử ký điện tử với một chứng chỉ trước khi chúng có thể được cài đặt, vì vậy, để phân phối ứng dụng Android của bạn thông qua cửa hàng[ Google Play](https://play.google.com/store), bạn sẽ cần tạo APK phát hành có chữ ký. Trang Ký kết ứng dụng của bạn trên tài liệu [Nhà phát triển Android](https://developer.android.com/studio/publish/app-signing) mô tả chi tiết về chủ đề này.

* Đầu tiên ta phải tạo chử ký .
Trên terminal bạn nhập dòng lệnh :
```
$ keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Lệnh này sẽ nhắc bạn nhập mật khẩu cho kho khóa, khóa và cho các trường, tên phân biệt cho khóa của bạn.

Sau đó, nó tạo kho khóa dưới dạng một tệp gọi là **my-release-key.keystore**. 

Kho khóa chứa một khóa duy nhất, có giá trị trong 10000 ngày.

Bí danh là tên mà bạn sẽ sử dụng sau này khi ký ứng dụng của mình, vì vậy hãy nhớ ghi chú bí danh. 

Trên Mac, nếu bạn không chắc thư mục jdk bin của mình ở đâu, thì hãy thực hiện lệnh sau để tìm nó:

```
$ /usr/libexec/java_home
```

Nó sẽ xuất ra thư mục của jdk, nó trông giống như thế này:

```
/Library/Java/JavaVirtualMachines/jdkX.X.X_XXX.jdk/Contents/Home
```

Điều hướng đến thư mục đó bằng cách sử dụng lệnh **$ cd / your / jdk / path** và sử dụng lệnh keytool với quyền sudo như dưới đây.

```
$ sudo keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**Lưu ý:  Hãy nhớ giữ tệp kho khóa của bạn ở chế độ riêng tư**

### c. Setting up gradle variables.

* Đặt tệp **my-release-key.keystore** trong thư mục **android / app** trong thư mục dự án của bạn.
* Chỉnh sửa tệp **~/.gradle/gradle.properties** hoặc **android/gradle.properties** và thêm phần sau (thay thế ***** bằng mật khẩu lưu trữ khóa chính xác, bí danh và mật khẩu khóa),

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

Đây sẽ là các biến toàn cục, mà sau này chúng ta có thể sử dụng trong cấu hình lớp của mình để ký kết ứng dụng.

### d. Adding signing config to your app's gradle config.

Chỉnh sửa tệp **android / app / build.gradle** trong thư mục dự án của bạn và thêm cấu hình ký,

![](https://images.viblo.asia/7ce3ae4d-8551-4fe7-a0cb-c67862bee91c.png)

Chỉnh sửa các mục như trong hình .

Sau đó update thông tin của app, version build.
![](https://images.viblo.asia/237b4989-77d8-4f54-b079-64fdc4fba3c4.png)

### e. Generating the release APK.
Đơn giản chỉ cần chạy như sau trong một thiết bị đầu cuối:

```
$ cd android
$ ./gradlew assembleRelease
```
![](https://images.viblo.asia/f7e92171-aac8-4a0a-9d7e-b504b26c5461.jpg)

APK được tạo có thể được tìm thấy trong **android/app/build/output/apk/release/app-release.apk** và đã sẵn sàng để được phân phối.

### f. Submit apk to Goole Store.
Đầu tiên, bạn cần đăng kí trở thành Publisher tại đây:[ Google Play Console and log in.](https://play.google.com/apps/publish/signup/)
Sau khi thực hiện xong các thủ tục thanh toán, thì bạn có thể vào được trang quản lý quả google store.

* Đăng ký một app mới với đầy đủ thông tin, tên 

![](https://images.viblo.asia/b543f44f-91da-4bfb-8e62-229abdfe0623.png)

Phía dưới của màn hình có phần chọn kiểu ứng dụng là : App hay Game. Chọn Category phù hợp với ứng dụng: Tool, Productivity, Entertainment…

![](https://images.viblo.asia/4a589a7d-dac3-422f-b192-7bf905730a99.png)

Điều URL tới file privacy policy. Nếu bạn chưa biết cách viết privacy policy như thế nào thì có thể sử dụng công cụ sau để tạo tự động: [App Privacy Policy Generator](https://app-privacy-policy-generator.firebaseapp.com/)

Bây giờ bạn đả có một định danh cho app của bạn trên Google store rồi.

![](https://images.viblo.asia/0a856328-995f-41ce-8893-48f38ea2fa0c.png)

Vào app xem có gì nào .

![](https://images.viblo.asia/1acb526b-35fb-4688-a364-e8f1b13a9270.png)

Trên là giao diện người dùng Và các mục tùy chỉnh bên thanh bên trái của bạn. 

![](https://images.viblo.asia/0851343c-388a-4843-8bba-d6a40b0f0079.png)

Tiếp theo như hình ảnh bên trên bạn chọn mục Phát hành ứng dụng. Ở đoạn này mình sẽ deploy phiên bản phát hành anpha .Tức là trước khi public sản phẩm ra cho tất cả mọi người thì mình sẽ cho một nhóm người mà mình chỉ định sử dụng để test qua theo phiên bản anpha nhé. Nếu không muốn test thì bạn có thể phát hành trực tiếp và các bước làm củng tương tự như trên thôi. Ok. mình tiếp tục nào.

Bạn click vào tạo theo dõi kín cho phiên bản anpha

![](https://images.viblo.asia/bf5eb2f5-ed7a-45d4-a4f5-f5baa5695f8b.png)

Update file apk bản release lúc nãy vừa tạo và kéo vào khu vực update apk nhé.

![](https://images.viblo.asia/31d37578-4b3e-44b0-86e8-72199c24dc1a.png)

* Hoàn thành đánh giá Content Rating

Phần content rating này, bạn cứ trả lời thật với những câu hỏi của họ . Các câu hỏi kiểu như: Ứng dụng có liên quan đến SEX không? Ứng dụng có kích động, phản động hay liên quan đến Phát xít không? … Trả lời thật lòng về ứng dụng của mình để khỏi bị BAN nhé =))
*  Đăng kí ứng dụng miễn phí hay trả phí
Phần cuối cùng là “Pricing & distribution”

Bạn cần cân nhắc là ứng dụng của bạn sẽ phát hành miễn phí hay là bán cho người dùng.

Mình chỉ lưu ý là: Một khi đã chọn là ứng dụng miễn phí thì bạn không thể chuyển thành ứng dụng trả phí được nữa. Nhưng ngược lại thì được

Nếu bạn chọn là ứng dụng trả phí thì cần phải cài đặt phương thức nhận tiền để Google thanh toán cho bạn.
*  **Xong nhé ..**
Theo kinh nghiệm của mình thì thời gian review sẽ tầm khoảng từ 2 đến 4 giờ. Trong lúc chờ đợi thì đi làm cốc cafe và nghiên cứu các loại tình yêu như mình liệt kê trên xem thế nào nhé :stuck_out_tongue_winking_eye::stuck_out_tongue_winking_eye:

Sau khi update xong và submit bạn đả thành công với bản phát hành 1.0.0 dưới dạng anpha test rồi nhé. Việc còn lại là add thêm thành viên muốn cài app để test trước khi đưa sản phẩm ra bên ngoài rồi đó. 
![](https://images.viblo.asia/d1c90319-71a2-48c7-b405-d1bf443f91fb.png)

![](https://images.viblo.asia/57b8b032-3b1f-4fd0-9dbf-2990745efd0b.png)


Như vậy, mình đã hướng dẫn chi tiết từng bước để bạn có thể submit ứng dụng lên Google Store. Hi vọng bạn sẽ có nhiều ứng dụng thành công với hàng triệu người dùng.  Nếu có chỗ chưa hiểu thì để lại bình luận bên dưới nhé. 
Cảm ơn các bạn đã đọc bài viết của mình. Chờ đón mình trong bài viết tiếp theo với Apple Store nhé.