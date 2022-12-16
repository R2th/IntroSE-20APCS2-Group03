![](https://images.viblo.asia/c5d94b8d-9a30-407a-9340-52832dd8e1e0.jpg)

# 1. Firebase là gì?

Firebase là một nền tảng phát triển ứng dụng di động và web. Họ cung cấp rất nhiều công cụ và dịch vụ để phát triển ứng dụng chất lượng, rút ngắn thời gian phát triển và phát triển cơ sở người dùng mà không cần quan tâm đến hạ tầng phần cứng.

Firebase là sự kết hợp giữa nền tảng cloud với hệ thống máy chủ cực kì mạnh mẽ của Google. Firebase cung cấp cho chúng ta những API đơn giản, mạnh mẽ và đa nền tảng trong việc quản lý, sử dụng database.

Ví dụ: Với Firebase, chúng ta có thể tự xây dựng một ứng chat thời gian thực như Facebook mesage, Zalo… trong vài ngày, thậm chí vài giờ.

Đơn giản vì giờ chúng ta chỉ cần phải lo phát triển phía Client( Ứng dụng mobile), còn phần backend(server) đã có Firebase lo, chúng ta chỉ cần gọi API là đủ.

Trên thế giới thì xu hướng sử dụng Firebase rất lớn. Check Google Trend là thấy ngay:

![](https://images.viblo.asia/c23b09dc-ca23-4833-b154-1ab10398ff1f.png)

# 2. Lịch sử phát triển của Firebase

Firebase có tiền thân là Envolve. Đây là dịch vụ cung cấp những API để bạn dễ dàng tích hợp tính năng chat vào trang web.

Điều thú vị là người dùng Envolve sử dụng dịch vụ để truyền dữ liệu chứ không đơn thuần cho ứng dụng chat. Họ sử dụng Envolve để đồng bộ dữ liệu của những ứng dụng như game online, danh bạ, lịch…

Nhận biết được điều này, CEO của Envolve đã tách biệt hệ thống chat và đồng bộ dữ liệu thời gian thực thành 2 mảng riêng biệt.

Đến năm 2012, Firebase được thành lập như một công ty cung cấp dịch vụ Backend-as-a-Service theo thời gian thực.

Ngửi thấy mùi tiềm năng, năm 2014, Google lập tức mua lại Firebase với giá không được tiết lộ. Và giờ Google phát triển Firebase thành một dịch vụ đồ sộ như bạn đang thấy. :D

# 3. Những dịch vụ nổi bật của Firebase
Hiện nay, danh mục dịch vụ của Firebase rất nhiều. Từ hệ thống chat thời gian thực, đến A/B testing… và cả ML KIT( Bộ công cụ phát triển Machine learning).
![](https://images.viblo.asia/05e4e80b-300e-428b-afa4-1538f645cc55.png)

### 3.1. Firebase Cloud Messaging

* Firebase Cloud Messaging (FCM) là một giải pháp nhắn tin đa nền tảng, nó cho phép bạn gửi các message một cách đáng tin cậy mà không mất phí.
* Sử dụng FCM bạn có thể gửi thông báo cho ứng dụng khi có email mới hoặc có dữ liệu mới để thực hiện đồng bộ hóa. Với các trường hợp sử dụng nhắn tin real time thì tin nhắn có thể có lưu lượng lên đến 4KB.

Nó làm việc như thế nào?

Một FCM implement hai thành phần chính để gửi và nhận:

  1.  Một môi trường đáng tin cậy như Cloud Function cho Firebase hoặc một app server để build và gửi tin nhắn.
  2. Một client app như IOS, Android hoặc Web(JavaScrip) để nhận tin nhắn qua các service dành riêng cho từng nền tảng.

Có rất nhiều library, hay các service hỗ trợ như:

- Google Cloud Message (GCM)
 - Amazon Simple Notification Service (ADM)
 
 FCM hiện nay thì phổ biến nhất và được phát triển mạnh mẽ.
    
Xem thêm tại [đây](https://viblo.asia/p/firebase-android-firebase-cloud-messaging-1VgZv8RO5Aw) để biết thêm thông tin chi tết về các thành phần của FCM và cơ chế hoạt động của nó !

### 3. 2. Cloud Firestore

Sử dụng cở sở dữ liệu đám mây NoSQL linh hoạt và có thể mở rộng để lưu trữ và đồng bộ dữ liệu cho client và server.
Cloud Firestore là một cơ sở dữ liệu linh hoạt và có thể mở rộng được dành cho mobile, web và server được phát triển từ Firebase và Google Cloud Platform. Giống như Firebase Realtime Database, nó giữ dữ liệu của bạn được đồng bộ trên các client app thông qua trình lắng nghe thời gian thực, và hỗ trợ ngoại tuyến cho thiết bị di động hoặc web để bạn có thể xây dựng ứng dụng đáp ứng hoạt động được bất kể mạng yếu hay kết nối mạng. Cloud Firestore cũng có thể được sử dụng kết hợp với các dịch vụ Firebase hoặc Google Cloud Platform, bao gồm cả Cloud Functions.

Nó làm việc như thế nào?

![](https://images.viblo.asia/4c72786a-a0af-4df8-a956-43f9d54b567c.png)

Cloud Firestore là cơ sở dữ liệu NoSQL được lưu trữ trên nền tảng đám mây mà các ứng dụng web, IOS, Android có thể truy cập trực tiếp thông qua SDK native. Cloud Firestore cũng được dùng trong Node.js, Java, Python và Go SDKs, ngoại trừ REST và RPC APIs.
Theo mô hình dữ liệu NoSQL của Cloud Firestore, bạn lưu trữ dữ liệu trong documents, nó chứa các trường mà có thể map tới các giá trị. Những documents này lại được lưu trữ trong các collections. Documents hỗ trợ nhiều [kiểu data](https://firebase.google.com/docs/firestore/manage-data/data-types) khác nhau, từ string và số đơn giản đến các objects phức tạp. Bạn cũng có thể tạo subcollections trong các documents và xây dựng các cấu trúc dữ liệu phân cấp mở rộng khi cơ sở dữ liệu của bạn phát triển. Cloud Firestore [data model](https://firebase.google.com/docs/firestore/data-model) hỗ trợ bất kỳ cấu trúc dữ liệu nào hoạt động tốt nhất cho app của bạn.

Ngoài ra, truy vấn trong Cloud Firestore là linh hoạt và hiệu quả. Tạo các truy vấn để truy xuất dữ liệu ở cấp độ documents mà không cần truy xuất toàn bộ collection hay subcolletion. Thêm sort, filter và limit cho các câu truy vấn hoặc cursor để phân trang kết quả. Để lưu trữ dữ liệu trong ứng dụng hiện tại mà không cần truy xuất toàn bộ cơ sở dữ liệu mỗi khi có cập nhật thì thêm realtime listener. Sau khi thêm vào thì mỗi khi có sự thay đổi, trình lắng nghe sẽ thông báo cho bạn và chỉ cần truy xuất các thay đổi mới.
Bảo vệ quyển truy cập vào dữ liệu của bạn trong Cloud Firestore bằng Firebase Authentication và Cloud Firestore Security Rules cho Android, iOS và JavaScript, hoặc Identity and Access Management (IAM) cho các ngôn ngữ server.
Xem thêm tại [đây](https://viblo.asia/p/firebase-android-cloud-firestore-aWj53Gxb56m) để biết rõ thêm về Cloud Firestore nhé~

### 3.3. Firebase Analytics

- Google Analytics là một giải pháp đo lường app miễn phí, nó cung cấp cái nhìn sâu sắc về việc sử dụng ứng dụng và sự tham gia của người dùng. Cái cốt lõi của Firebase là Google Analytics, một giải pháp phân tích miễn phí và không giới hạn. Analytics tích hợp trên các tính năng của Firebase và cung cấp cho bạn các report không giới hạn cho dưới 500 sự kiện khác nhau mà bạn có thể xác định nhờ Firebase SDK. Các báo cáo Analytics giúp bạn hiểu rõ hơn các hành vi của người dùng, cho phép bạn đưa ra các quyết định sáng suốt về tiếp thị ứng dụng và tối ưu hóa hiệu suất.

Vậy nó làm việc như thế nào?

- Google Analytics giúp bạn hiểu cách người dùng sử dụng các web, iOS hay Android app. SDK sẽ tự động ghi lại một số sự kiện(events) và thuộc tính người dùng (user properties) và cũng cho phép bạn định nghĩa các custom events để đo lường những sự kiện quan trọng liên quan tới business. Khi dữ liệu được ghi lại, nó được lưu trong dashboard trên Firebase console. Dashboard này cung cấp cái nhìn chi tiết về data của bạn - ví dụ như: mặt hàng nào được mua nhiều nhất, khi nào người dùng hoạt động...
- Analytics cũng tích hợp với một số tính năng khác của Firebase. 
- Nó giúp bạn hiểu về hành vi người dùng, vì vậy bạn có thể đưa ra các quyết định kinh doanh trên app của bạn. Thấy được hiệu suất của các chiến lược kinh doanh để chọn ra cách thức hiệu quả nhất, mang lại giá trị người dùng cao nhất. Nếu bạn cần thực hiện các phân tích khác hoặc kết nối data của bạn với các nguồn khác, bạn có thể liên kết dữ liệu Analytics của mình với BigQuery, mở rộng phân tích trên các truy vấn lớn hơn và kết nối nhiều nguồn dữ liệu.

Muốn tìm hiểu thêm về Firebase Analytics thì xem thêm tại [đây](https://viblo.asia/p/firebase-android-firebase-analytics-bWrZn7Amlxw) nhé!

### 3.4. Firebase Remote Config

- Thay đổi hành vi và cách thức hiển thị app mà không cần đưa ra một bản update khác, không tốn chi phí và không giới hạn các hoạt động của người dùng. 

Firebase Remote Config là một cloud service mà nó giúp bạn thay đổi hành vi và cách hiển thị app của bạn mà không cần yêu cầu người dùng download để update lại app. Ví dụ khi khách hàng đổi các Base Url để thay đổi môi trường từ dev sang product. Khi sử dụng Remote Config, bạn cần tạo ra các giá trị mặc định điều khiển app. Sau đó, bạn có thể sử dụng Firebase console hoặc Remote Config REST API để ghi đè lại các giá trị mặc định đã được khở tạo trước đó. App của bạn sẽ được điều khiển khi mà apply xong các giá trị, và nó có thể thường xuyên check for update và apply các giá trị mà không làm ảnh hưởng đáng kể đến hiệu suất.

Vậy nó làm việc như thế nào??

- Remote Config bao gồm thư viện client xử lý các tác vụ quan trọng như fetching parameter values và lưu vào bộ đệm, trong khi vẫn cho phép bạn kiểm soát khi các giá trị mới được kích hoạt để  không làm ảnh hưởng đến trải nghiệm người dùng . Kiểm soát sự thay đổi này giúp cho trải nghiệm người dùng không bị ảnh hưởng.
- Các phương thức *get()* cung cấp quyền truy cập duy nhất đến các giá trị tham số.
- Khi sử dụng các giá trị mặc định trong app, bạn sử dụng Firebase console hoặc Remote Config REST API để tạo các tham số có tên giống tên mà bạn sử dụng trong file mặc định dưới app. Với mỗi tham số, bạn có thể ghi đè giá trị dưới app từ server. Hình dưới đây cho thấy cách các giá trị tham số được ưu tiên trong Remote Config backend và trong ứng dụng của bạn:

![](https://images.viblo.asia/791fad53-2efb-43c3-9efb-511c1f86f8fb.png)

Xem [thêm](https://viblo.asia/p/firebase-android-remote-config-LzD5d1vEKjY) về Firebase Remote Config!

### 3.5. Firebase Crashlytics

Dễ dàng xử lý các vấn đề liên quan tới crash app khi sử dụng giải pháp này của Firebase.

Firebase Crashlytics là một công cụ báo cáo lightweight, realtime. Nó giúp bạn theo dõi và phát hiện sửa các lỗi làm ảnh hưởng đến chất lượng app của bạn.  Hơn nữa, nó giúp bạn tiết kiệm thời gian xử lý sự cố bằng cách nhóm các sự cố lại với nhau và làm nổi  bật tình huống dẫn đến chúng. Tìm ra các sự cố làm ảnh hưởng đến người dùng và cảnh báo khi có sự cố bất ngờ xảy ra. Dò ra những dòng code làm xảy ra sự cố crash đó.

Để tìm hiểu thêm cơ chế hoạt động và cách dùng, mời các bạn xem tại [đây](https://viblo.asia/p/firebase-android-firebase-crashlytics-GrLZDk6gKk0)!

### 3.6.  Firebase Dynamic Links

- Firebase Dynamics Links là những link mà nó làm việc theo cách mà bạn muốn, trên nhiều nền tảng, và bất kể ứng dụng của bạn đã được cài đặt hay chưa.
- Với Dynamics Links, người dùng sẽ có được trải nghiệm tốt nhất cho nền tảng mà họ mở link. Nếu người dùng mở Dynamics Links trên iOS hoặc Android, họ có thể được điều hướng đến nội dung được liên kết trong ứng dụng gốc. Nếu người dùng mở cùng một Dynamics Links trong trình duyệt trên máy tính, chúng có thể được đưa đến nội dung tương đương trên trang web. 
- Ngoài ra, Dynamics Links hoạt độngtheo cách: nếu người dùng mở Dynamics Links trên iOS hoặc Android mà không cài đặt ứng dụng gốc, người dùng có thể được nhắc cài đặt ứng dụng;  sau khi cài đặt, ứng dụng  sẽ khởi động và có thể truy cập các link đó.

Vậy chúng làm việc như thế nào?

- Bạn tạo một Dynamic Links dùng Firebase console, dùng một REST API, iOS hoặc Android Builder API, hoặc tự tạo bằng cách thêm các tham số vào các miền cụ thể theo format. Các tham số này chỉ định các link bạn muốn mở, tùy thuộc vào nền tảng của người dùng và liệu ứng dụng của bạn có được cài đặt hay không.
- Khi người dùng mở một Dynamic Links, nếu app chưa được cài đặt thì người dùng sẽ được điều hướng tới App Store hoặc Play Store để cài ứng dụng, sau khi cài xong thì mở app. 

Tìm hiểu thêm về Dynamic Links tại [đây](https://viblo.asia/p/firebase-android-dynamic-links-m68Z0pj9ZkG) nhé! 

# 4. Cài Firebase vào project 
Trước hết, bạn cần check những điều kiện sau: 
* Cài đặt hoặc update Android Studio lên bản mới nhất.
* Chắc chắn rằng project của bạn thỏa mãn những điều kiện sau: 
    - Target API level >= 16 (Jelly Bean)
    - Gradle >= 4.1
    - Sử dụng AndroidX : *com.android.tools.build:gradle* >= v3.2.1. *compileSdkVersion* >= 28 
* Nếu dùng máy thật để chạy thì không cần lưu ý gì thêm. Nếu sử dụng máy ảo để test thì làm theo hướng dẫn sau: https://developer.android.com/studio/run/managing-avds
* [Đăng ký tài khoản Firebase](https://console.firebase.google.com/u/0/) sử dụng tài khoản Google ấy nhé. 

Bạn có thể add Firebase vào project bằng một trong hai cách sau: 
* Setup trên Firebase console
* Sử dụng Android Studio Firebase Assistant.
Ở đây mình sẽ dùng cách một: dùng Firebase console nhé, cách này được Firebase khuyến khích dùng, vì cách thứ hai cần phải config thêm nữa.
### B1: Tạo một Firebase project
- Trước khi add Firebase vào Android app thì cần phải tạo một project trên Firebase để connect với Android app . Click button **Add your project** như trong hình: 
![](https://images.viblo.asia/90f721c2-153c-4ae5-9f72-1aeb57443677.png)

Sau đó điền tên của project vào và nhấn buton **Continute**: 

![](https://images.viblo.asia/157312bb-3c90-4cfa-af35-0a69819a5a70.png)

Tiếp đến họ sẽ hỏi có muốn config Analytics không , 

![](https://images.viblo.asia/c9dc5e88-df49-4f2e-88ce-cfc2082ab7ae.png)

Bước này bạn có thể bỏ qua nếu như project không cần Analytics thì nhấn tắt cái switch button **Enable Google Analytics for this project** đi rồi nhấn ** Create Project**: 

![](https://images.viblo.asia/7bef25e3-161b-4c79-8b17-589063ba93be.png)

Nếu bạn muốn tích hợp cả Analytics thì cứ nhấn **Continute** thôi.
Trường hợp có Analytics thì họ sẽ yêu cầu bạn chọn tài khoản cho Google Analytics, mình click chọn tài khoản mặc định rồi nhấn  ** Create Project**.

![](https://images.viblo.asia/50cf1946-5d47-47c3-9be8-233f795ae289.png)

Chờ cho create xong thì sẽ có thông báo *Your new project is ready*  Nhấn **Continute** để trở về màn home như sau, tới đây là hoàn thành nè.

![](https://images.viblo.asia/2810416a-75f1-45b9-9d94-bf1eb9fd5ecc.png)


### B2: Đăng ký app với Firebase
Sau khi có Firebase Project thì bạn có thể add Android app vào nó rồi.
1. Ở màn hình chính trên console, bạn click vào icon Android  (plat_android) để hiển thị các bước setup như dưới đây: 
 
 ![](https://images.viblo.asia/aab06ade-4ec3-4c74-8ed3-508a3213731c.png)

2. Nhập tên package vào ô **Android package name**. Chú ý là lấy đúng package name mà bạn sử dụng sau này nhé vì giá trị này chỉ được thiết lập một lần này thôi, không thể sửa lại được.
3. Các thông tin khác về app như App nickname và Debug signing certificate SHA-1 thì có thể viết hoặc không viết tùy bạn, điều này là không bắt buộc. 
4. Xong rồi thì nhấn **Register app**

### B3: Thêm file config Firebase vào project 
Sau khi làm xong B2 thì Firebase sẽ generate ra một file google-services.json, bạn hãy download file này về và ném vào thư mục app (như hình hướng dẫn):

![](https://images.viblo.asia/6bf72f4c-d9a2-475e-a9b9-ee0071849e60.png)

Xong rồi thì click Next.
Để enable Firebase thì bạn cần phải thêm thư viện nữa, có thể làm theo hướng dẫn trên console, nhưng mình tóm gọn lại nó như sau:
* Project-level build.gradle:

```java
buildscript {
  repositories {
    // Check that you have the following line (if not, add it):
    google()  // Google's Maven repository
  }
  dependencies {
    ...
    // Add this line
    classpath 'com.google.gms:google-services:4.3.3'
  }
}

allprojects {
  ...
  repositories {
    // Check that you have the following line (if not, add it):
    google()  // Google's Maven repository
    ...
  }
}
```

* App-level build.gradle:

```java
apply plugin: 'com.google.gms.google-services'
```

Trên hướng dẫn của console còn nói thêm cả dependencies Firebase SDK for Google Analytics, nhưng nếu bạn cần thì mới thêm nhé, còn không thì chưa phải thêm vội đâu, sau làm đến phần nào thì thêm thư viện cho phần đó.
Xong rồi thì nhớ nhấn **Sync now** nhé! 

Ngoài ra, Android Studio còn có cách khác hỗ trợ nhanh hơn, mình chỉ cần liên hoàn click là xong. Bằng cách các bạn chọn Tool -> Firebase . Sau đó thanh support sẽ hiển thị ra một danh sách các công cụ của Firebase, bạn click vào thì sẽ có hướng dẫn cụ thể nhé, cách này thì nhanh lắm, mọi người nhớ thử nhé! 

Trong trường hợp bạn có các Build Variants khác nhau thì sẽ làm như thế nào???

 - Ở đây mình có 3 môi trường để build: dev, stg và prd. Vậy mình sẽ thêm 3 app vào project trên Firebase mình vừa tạo. Bằng cách vào Firebase Console: chọn Project settings -> General, ở đây mình cuộn xuống phần **Your apps** và tạo thêm các app cho từng môi trường tương ứng với từng package name, ví dụ mình tạo 3 app dưới đây:  

![](https://images.viblo.asia/9bc7bb6b-7fd4-45dc-b299-ab0ef8c9f057.png)

Sau đó mình tải file google-services.json về và thêm vào project dưới local nhé! Vậy là xong rồi đó!


[Ở đây](https://firebase.google.com/docs/samples) có project example của Firebase, mọi người có thể lấy về mà xem nhé!

Trên đây là kiến thức sơ lược về Firebase, tiếp theo mình sẽ đi vào chi tiết từng tính năng mà nó  cung cấp cho mình, mọi người chú ý đón xem phần tiếp theo nhé. Chúc mọi người code vui vẻ! 

### Tham khảo: 

Firebase docs: [https://firebase.google.com/docs](https://firebase.google.com/docs)