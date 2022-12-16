Chào các bạn, để tiết kiệm thời gian build app rồi phải deploy  thủ công thì hôm nay mình sẽ viết 1 bài về Continuous delivery (from local machine) android phục vụ cho deploy Flutter app. Vì là bài viết đầu tay nên có gì thiếu sót mọi người thông cảm và góp ý để nâng cao chất lượng bài viết sau này nhé.

![](https://images.viblo.asia/c4c9637b-c042-4a2d-a4f4-411044be11b2.png)

# Các cách để setup Continuous delivery cho Flutter app

Chúng ta có thể dễ dàng tìm được những giải pháp hỗ trợ cho việc deploy Flutter dễ dàng trên Docs của Flutter, về cơ bản có 2 giải pháp chính:
* Sử dụng dịch vụ bên thứ 3 như: Codemagic, Bitrise, Appcircle. (mình có dùng qua Codemagic, khá tiện lợi).
* Cấu hình thủ công bằng fastlane (trong bài viết này mình sẽ tập trung vào giải pháp này).

# Điều kiện tiên quyết
* Cần có tài khoản Google Play Console Developer.
* Đã cài đặt môi trường cần thiết để phát triển Flutter App.
* Cài đặt môi trường phát triển và build file .aab (android app bundle).

# Cài đặt và cấu hình fastlane.
```bash
brew install fastlane
flutter create —org com.example projectname
cd android
fastlane init
```

Sau khi chạy lệnh “fastlane init” terminal sẽ yêu cầu cung cấp 1 số thông tin:
* Cung cấp package name của app (ví dụ: my.package.name).
* Cung cấp json secret file: nhấn “n” (bước này mình sẽ thiết lập sau).
* Nhấn 'n' khi được hỏi “liệu bạn có định tải thông tin lên Google Play qua fastlane hay không?” (mình sẽ thiết lập sau).

**Sau khi hoàn tất “thủ tục” fastlane init fastlane sẽ khởi tạo 2 file Appfile (cấu hình thông tin cho app) và Fastfile (cấu hình các lệnh deploy) trong thư mục android/fastlane.**

# Cấu hình trên Google Play Console và Google Cloud Platform để lấy “Json secret file” đã đề cập trước đó.

Các bước sẽ như sau:
1. Mở Google Play Console
2. Ở Sidebar bên trái, click vào Account Details, chú ý **Developer Account ID.**
3. Click vào Setup ⇒ **API access**
4. Chuyển tới Google Cloud Platform
*  Click vào nút **Create new service account. để chuyển tới Google Cloud Platform.**
*  Click nút **CREATE SERVICE ACCOUNT** ở đầu trang Google Cloud Platform Console.
*  Xác minh dùng đúng **Developer Account ID trong IAM & Admin → Service Account.**
*  Cung cấp Service account name và click **Create.**
*  Click **Select a role, chọn** **Service Account User** và nhấn tiếp tục → Nhấp **DONE**.
*  Click  **Actions** ở icon 3 chấm của service account vừa tạo  → Chọn **Manage keys.**
*  Click **ADD KEY**  → **Create New Key**
*  Chọn kiểu JSON  → nhấp **CREATE**.
*  Download file và lưu trữ nơi cần thiết trên máy tính.

5. Quay về Google Play Store click nút DONE để đóng popup
6. Click nút **Grant Access**  → **Refresh service accounts** để cập nhật những thay đổi từ bước 4.
7. Cấp quyền cho tài khoản này. Gợi ý **Admin (all permissions).**
8. Click **Invite user** để hoàn tất.

![](https://images.viblo.asia/1616bcb8-4db7-4427-9c82-96c00fb9eab8.png)

# Run những lệnh fastlane đầu tiên.
 Sau khi đã cấu hình những thứ cần thiết, chúng ta sẽ viết những lệnh phục vụ cho deploy.
 1. Đầu tiên kiểm tra xem thử đã kết nối với Google Play Store thành công chưa, chạy lệnh:
  
 ```bash
 fastlane run validate_play_store_json_key json_key:/path/to/your/downloaded/file.json
 ```
 
 2. Khi mọi thứ đã ok hết thì mở file android/fastlane/Appfile để thêm đường dẫn file json secret.
 
 ```bash
json_key_file("path/to/your/play-store-credentials.json")
package_name("my.package.name")
 ```
 
 3. Chạy lệnh sau để bắt đầu cấu hình.
 
 ```bash
 fastlane supply init
 ```

*Lưu ý: Google Play Store yêu cầu phải có 1 bản build đầu tiên (version code: 1) đã upload lên Google Play Store trước mới có thể deploy những bản build sau này.*

# Cấu hình build android app 
Để tránh bài viết dài dòng, các bạn có thể làm theo hướng dẫn của Flutter để build bản android app đầu tiên: https://docs.flutter.dev/deployment/android.

Thay đổi 1 số config để tránh việc chạy lệnh fastlane deploy bị lỗi.

1. Thêm lintOptions: `android/app/build.gradle`.

```build.gradle
android {
    //....

    lintOptions {
        checkReleaseBuilds false
    }

		// Đổi versionName, versionCode để phục vụ cho việc tăng version build bằng plugin 
		defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId "my.package.name"
        minSdkVersion flutter.minSdkVersion
        targetSdkVersion flutter.targetSdkVersion
        // versionCode flutterVersionCode.toInteger()
        // versionName flutterVersionName
        versionCode 2 // Đổi về dạng tiêu chuẩn để khi chạy lệnh increment_version_code không bị lỗi
        versionName 1.0.0
    }
    //...
}
```

2. Ở file android/gradle.properties thêm dòng lệnh sau:

 ```
 org.gradle.jvmargs=-Xmx1536M --add-exports=java.base/sun.nio.ch=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.base/java.lang.reflect=ALL-UNNAMED --add-opens=java.base/java.io=ALL-UNNAMED --add-exports=jdk.unsupported/sun.misc=ALL-UNNAMED
 ```
 
 3. Ở file android/gradle/wrapper cài đặt project chạy trên gradle 7.5 thay vì 6.7 như hiện tại.

 ```
 #Fri Jun 23 08:50:38 CEST 2017
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
// distributionUrl=https\://services.gradle.org/distributions/gradle-6.7-bin.zip
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5-bin.zip
 ```
 
4. Chạy lệnh sau để cập nhật gradle 7.5

```
cd android  
./gradlew --refresh-dependencies
```

# Viết các lệnh cần thiết cho việc Deploy
### **Sau khi đã hoàn tất các bước trên. Mở file android/fastlane/Appfile.**
```
# Increment version code - Lệnh này để tăng version code trước mỗi lần build
  desc "Increment version code"
  lane :increment_vc do
  increment_version_code(
    gradle_file_path: "./app/build.gradle",
    version_code: 2 // Thay đổi version code ở đây 2 -> 3 -> 4 -> ... cho mỗi lần deploy mới.
  )
  end
```

### **Cấu hình việc build & deploy**
```
desc "Deploy a new version to the Internal Google Play"
  lane :deploy do // lane deploy
    gradle(task: "clean bundleRelease") // Lệnh này để clean bundleRelease (làm sạch project trước mỗi lần build mới).
    gradle(
      task: 'bundle',
      build_type: 'Release'
    ) // Lệnh này để build file .aab
    upload_to_play_store(
      track: 'internal', // Chúng ta thử nghiệm trên Internal tester. Thay đổi track cho những bản build production, beta, alpha, internal,...
      release_status: 'draft',
      skip_upload_changelogs: true,
      aab: '../build/app/outputs/bundle/release/app-release.aab', // Lệnh này để trỏ đường dẫn bản build file .aab (dùng file .aab này để upload lên Google Play Console).
    )
  end
```

### **Hoàn tất các lệnh cần thiết. Bắt đầu deploy thôi nào!**
```
cd android
fastlane increment_vc // Chạy lệnh tăng version code trước mỗi lần deploy
fastlane deploy // Chạy lệnh để build & deploy trên lane :deploy
```
# Tận hưởng thành quả. 
Sau khi đã hoàn tất các bước trên thì ta đã hoàn thành việc Continuous delivery (local machine) cho android app. Các bản build sau chỉ cần nâng version code và chạy lệnh sau là đã upload file lên Internal Tester (tương tự cho các trường hợp beta, production,...)

![](https://images.viblo.asia/b34e4d5b-bf8f-4a54-b795-6f8655000e27.png)
![](https://images.viblo.asia/a5306413-6ca6-4203-b058-9aa1ddb470f2.png)

# Tài liệu tham khảo
https://docs.flutter.dev/deployment/cd

https://docs.fastlane.tools/getting-started/android/setup/

# Mục tìm kiếm đồng đội.
![](https://images.viblo.asia/4730d689-21ee-4e0a-b894-2b6a88831acf.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội[ Senior Backend Engineer.](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022)

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).