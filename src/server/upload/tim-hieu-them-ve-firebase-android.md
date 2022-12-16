Khi bạn phát triển ứng dụng Android sử dụng Firebase, bạn sẽ thấy những khái niệm riêng chỉ của Firebase. Bài này sẽ giúp các bạn hiểu được phần nào về Firebase hơn, hoặc có những resource để các bạn có thể đọc tham khảo thêm.

## 1. Firebase Assistant plugin for Android Studio
 Firebase Assistant là một Android Studio plugin, nó sẽ đăng ký Android app của bạn với một Firebase project và thêm các file config, plugins và các dependencies cần thiết của Firebase cho project Android của bạn - tất cả chỉ với Android Studio !
 
 Theo dõi hướng dẫn từ [đây](https://firebase.google.com/docs/android/setup#assistant) để sử dụng Firebase Assistant. Hãy sử dụng version mới nhất cho cả Android Studio và Firebase Assistant (đi từ File > **Check for update**).
 
 Khi bạn chọn một dịch vụ của Firebase để thêm vào app của bạn, thì Firebase Assistant sẽ tự động định nghĩa các dependencies bắt buộc trong file **app/build.gradle** . Tuy nhiên, để sử dụng những tính năng của Firebase, bạn cũng vẫn phải cài đặt thủ công, vì Firebase Assistant chưa thể xử lý hết được. Bạn có thể implement những dependence thủ công :
 
  - Nếu bạn muốn sử dụng Firebase Android BoM (tham khảo phía dưới), hãy update dependencies trong module **(app-level) Gradle file** ( là *app/build.gradle*) để import BoM. Bạn cũng cần xóa các versions từ mỗi dòng implement Firebase library.
  
  - Nếu bạn muốn sử dụng một Kotlin extensions library (tham khảo dưới đây), định nghĩa dependence này trong module **app-level Gradle file** (*app/build.gradle*) để sử dụng thư viện *ktx* của Firebase.
  
## 2. Google services — plugin and config file

 Như một bước trong việc thêm Firebase vào Android project, bạn cần phải thêm google *services - plugin* và một file config là *google-service.json* vào project của bạn. 
  
  - Nếu bạn thêm Firebase vào project Android thông qua *[Firebase Console ](https://firebase.google.com/docs/android/setup#console)* hoặc là *[Management REST API](https://firebase.google.com/docs/projects/api/workflow_set-up-and-manage-project?platform=android#add-apps)*  hoặc là *[Firebase CLI ](https://firebase.google.com/docs/cli#management-commands)* , bạn phải thêm các plugin và file config một cách thủ công. Tuy nhiên, nếu bạn sử dụng Firebase Assistant, thì những công việc này sẽ được hoàn thành một cách tự động từng bước một.
  
  - Note một chút là file config *google-services.json* nó chứa mã hóa nhận dạng duy nhất cho project của bạn, nó không phải là file cần phải bảo mật. Để biết thêm về file config này thì hãy truy cập vào [Understand Firebase projects](https://firebase.google.com/docs/projects/learn-more) !

- Vào [Android documentation](https://developers.google.com/android/guides/google-services-plugin)  để biết thêm cách Google services plugin và file config làm việc với nhau như thế nào nhé !

## 3. Firebase Android BoM

Firebase Android BoM (Bill of Materials)  cho phép bạn quản lý tất cả các version thư viện của Firebase bằng cách chỉ định một version - version của BoM.

- Khi bạn sử dụng Firebase BoM trong app, thì BoM sẽ tự động pull tất cả các version của các thư viện riêng lẻ mapp sang version của BoM. Tất cả các version của thư viện riêng lẻ sẽ tương thích. Khi bạn update version của BoM trong app thì tất cả các thư viện của Firebase mà bạn sử dụng trong app sẽ được update sao cho nó tương thích với version của BoM.

- Để biết cách mà các version của các thư viện Firebase làm sao tương thích với version của BoM, hãy xem *[release note](https://firebase.google.com/support/release-notes/android)* cho BoM. Nếu bạn cần so sánh các version của các thư viện đã map với version của BoM so sánh với version BoM khác thì sử dụng *[comparision widget](https://firebase.google.com/docs/android/learn-more#bom)* dưới đây.  Thêm về *[Gradle's support for BoM platforms ](https://docs.gradle.org/4.6-rc-1/userguide/managing_transitive_dependencies.html#sec:bom_import)* .

- Dưới đây là cách sử dụng Firebase Android BoM để định nghĩa các dependencies trong **module (app-level) Gradle file**  (app/build.gradle). Khi sử dụng BoM, bạn không cần phải thêm các version cho các thư viện riêng lẻ nữa :

```java
dependencies {
  // Import the BoM for the Firebase platform
  implementation platform('com.google.firebase:firebase-bom:26.1.1')

  // Declare the dependencies for the desired Firebase products without specifying versions
  // For example, declare the dependencies for Firebase Authentication and Cloud Firestore
  implementation 'com.google.firebase:firebase-auth'
  implementation 'com.google.firebase:firebase-firestore'
}
```

Đây là một số câu hỏi thường gặp khi sử dụng Firebase Android BoM, Tham khảo *[Question about BoM](https://firebase.google.com/docs/android/learn-more#bom)*.

## 4. Kotlin extensions (KTX) libraries 

- Thư viện Firebase Kotlin extensions (KTX) là những companions cho các base Firebase SDKs mà cho phép bạn viết code Kotlin đẹp và dễ hiểu. 
- Để sử dụng thư viện KTX trong app, thay đổi dependence thêm hậu tố -ktx là được. Mỗi thư viện KTX đều tự động có một phần thư viện base rồi, vì vậy không cần phải include cả thư viện base và thư viện -ktx vào nữa, ví dụ : 

```java
dependencies {
  // Import the BoM for the Firebase platform (learn more)
  implementation platform('com.google.firebase:firebase-bom:26.2.0')

  // Declare the base library
  implementation 'com.google.firebase:firebase-analytics'

  // Declare the KTX library instead (which automatically has a dependency on the base library)
  implementation 'com.google.firebase:firebase-analytics-ktx'
}
```

 - Mỗi thư viện KTX đều cung cấp những tiện ích khách nhau tương ứng với thư viện base đó. Ví dụ với thư viện Analytics KTX, nó giúp log event đơn giản hơn : 

Trước khi sử dụng KTX : 

```java
val analytics = FirebaseAnalytics.getInstance();
val bundle = Bundle();
bundle.putString(FirebaseAnalytics.Param.ITEM_ID, id);
bundle.putString(FirebaseAnalytics.Param.ITEM_NAME, name);
bundle.putString(FirebaseAnalytics.Param.CONTENT_TYPE, "image");
analytics.logEvent(FirebaseAnalytics.Event.SELECT_ITEM, bundle);
```

Sau khi sử dụng KTX :

```java
firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SELECT_ITEM) {
    param(FirebaseAnalytics.Param.ITEM_ID, id)
    param(FirebaseAnalytics.Param.ITEM_NAME, name)
    param(FirebaseAnalytics.Param.CONTENT_TYPE, "image")
}
```

Để biết thêm về thư viện KTX, hãy xem [API reference docs](https://firebase.google.com/docs/reference/kotlin/packages)

## 5. Open source resources for Firebase Android SDKs

Firebase hỗ trợ open source development, và chúng ta có thể tham gia vào cộng đồng đóng góp phát triển và phản hồi về Firebase. 

- **Firebase Android SDKs** : Hầu hết Firebase Android SDKs là đều được phát triển theo kiểu thư viện mở và công khai trên *[Firebase GitHub repository](https://github.com/firebase/firebase-android-sdk)* . Bên Firebase đang tiến hành chuyển các thư viện Firebase mà được phát triển private sang public repo này. Hãy chờ đợi những điều mới mẻ từ Firebase nhé ! 
- **Quickstart samples** : Firebase có một bộ sưu tập các quickstart samples cho những Firebase APIs trên nền tảng Android. Để xem được những quickstart này, hãy truy cập *[Firebase GitHub quickstart repository](https://github.com/firebase/quickstart-android)* 
- Bạn có thể mở từng quickstart theo kiểu project Android, sau đó run trên các device mobile hoặc máy ảo (ADV). Hoặc bạn có thể sử dụng code của những ví dụ này trong project của bạn để hiểu hơn về Firebase SDKs.

Sau đây là một vài chủ đề thú vị, nếu rảnh các bạn có thể truy cập đọc xem nhé :

- *[Dependencies of Firebase Android SDKs on Google Play services](https://firebase.google.com/docs/android/android-play-services)*.
- *[Link your Firebase project to Google Play](https://support.google.com/firebase/answer/6392038)*.
- *[Integrate with your Play Games services project](https://firebase.google.com/support/guides/integrate-play-games)*

## Tham Khảo : 

Learn more about Android and Firebase : https://firebase.google.com/docs/android/learn-more

Xin chào và hẹn gặp lại ở bài tiếp theo nhaaaaaa !!!!!!!!