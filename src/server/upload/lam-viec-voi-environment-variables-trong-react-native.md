# 1. Environment Variables là gì? Tại sao cần sử dụng Environment Variables?
Environment Variables được hiểu là một biến môi trường cung cấp một số giá trị có sẵn để ứng dụng hoạt động, biến này có thể thay đổi tuỳ vào mục đích và môi trường phát triển của ứng dụng.
Đối với một sản phẩm ứng dụng thông thường sẽ được phát triển trên 3 môi trường:
* **Development**: môi trường phát triển của các lập trình viên, là môi trường local được đặt trên thiết bị phát triển của 1 hoặc 1 số lập trình viên. Là môi trường đầu tiên của việc phát triển ứng dụng.
* **Staging**: môi trường phát triển chung của 1 team phát triển gồm developer, tester, BA,… Là môi trường sau khi deploy và kết hợp mã nguồn của các thành viên trong nhóm phát triển để chạy và kiểm tra ứng dụng trước khi được đưa đến khách hàng ( môi trường production).
* **Production**: môi trường thật và là môi trường tồn tại vận hành của ứng dụng. Các ứng dụng phải được kiểm tra, đánh giá kĩ càng ở môi trường staging trước khi được đẩy lên môi trường production để tránh những lỗi gây ra hậu quả nghiêm trọng với người sử dụng.

Chính vì việc có nhiều môi trường phát triển dẫn đến việc thay đổi môi trường phát triển thường xuyên để phát triển cũng như kiểm tra ứng dụng là việc bắt buộc đối với các lập trình viên.

Environment variables sinh ra để giúp các lập trình viên giải quyết một phần vấn đề này.

Đối với việc phát triển ứng dụng di động nói chung và phát triển ứng dụng di động bằng react native nói riêng thì việc thay đổi biến môi trường để đưa ra các bản phát triển và kiểm thử cho từng môi trường là cần thiết.
# 2. Cài đặt môi trường phát triển cho ứng dụng react native.
Trong phần này mình sẽ hướng dẫn các bạn taọ ra 3 ứng riêng biệt tương ứng với 3 môi trường phát triển Development(Dev), Staging, Production(Prod) từ cùng một mã nguồn. Qua đó các bạn sẽ hiểu rõ hơn về việc xây dựng ứng dụng trên từng môi trường từ 1 mã nguồn qua đó tích hợp environment variables trong phần sau.
## 2.1. Khởi tạo một ứng dụng demo.
Tại terminal của bạn chạy lệnh sau
```
react-native init DemoENV
```
Tiếp theo các bạn cần chuẩn bị cho mình công cụ : Vscode, Xcode, AndroidStudio để có thể thực hiện các bước tiếp theo.
## 2.2. Cài đặt với môi trường IOS.
Mở thư mục ios của ứng dụng bằng Xcode. Ở đây mình dùng Xcode 11. Sau đó truy cập vào Info.plist. Thay đổi mục **Bundle display name** thành **$(PRODUCT_NAME)**

 ![alt](https://ducgiangtran.files.wordpress.com/2021/02/1.png?w=1024)

Sau đó chọn về thư mục gốc **DemoENV** của bạn và tạo ra các config như sau :

 ![alt](https://ducgiangtran.files.wordpress.com/2021/02/2.png?w=1024)


Trong phần **TARGETS** chọn **DemoENV** và tìm kiếm từ khoá **product name**. Sau đó chỉnh sửa các giá trị như sau:

![alt](https://ducgiangtran.files.wordpress.com/2021/02/3.png?w=1024)

Thay đổi từ khoá tìm kiếm bằng **identifier** và thay đổi các giá trị như sau:

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-20.30.57.png?w=1024)

Truy cập *Product/Scheme/Edit Scheme/ManageSchemes*… từ thanh công cụ của Xcode.

Chỉnh sửa **DemoENV** thành **DemoENVDev** và thêm 2 scheme là **DemoENVStaging** và **DemoENVProd.**

![alt](https://ducgiangtran.files.wordpress.com/2021/02/4.png?w=1024)

Quay lại **Edit Scheme** và thay đổi **Build Configuration** tương ứng với từng Scheme cho 4 mục : **Run, Test, Profile, Analyze, Archive.**

![alt](https://ducgiangtran.files.wordpress.com/2021/02/5.png?w=1024)

Truy cập **Podfile** từ vscode. Thêm đoạn mã sau :
```
project 'DemoENV', {
  'DebugDev' => :debug,
  'DebugStaging' => :debug,
  'DebugProd' => :debug,
  'ReleaseDev' => :release,
  'ReleaseStaging' => :release,
  'ReleaseProd' => :release,
}
```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/6.png?w=1024)

Trong project này mình đã xoá các config **Flipper** trong podfile.

Trong terminal của vs code chạy lệnh để cập nhật **podfile**.

```
cd ios
pod install
```


Sau đó dùng Xcode để chạy 3 phiên bản vừa tạo là **DemoENVDev**, **DemoENVStaging**, **DemoENVProd**.

![alt](https://ducgiangtran.files.wordpress.com/2021/02/7.png)

Kết quả bạn đã có được 3 ứng dụng của 3 môi trường khác nhau từ cùng 1 mã nguồn.

![alt](https://ducgiangtran.files.wordpress.com/2021/02/simulator-screen-shot-iphone-11-2021-02-28-at-02.06.55.png?w=241)

Phần phát triển android mình sẽ tích hợp vào phần phát triển biến .env vì nó khá ngắn gọn về dễ triển khai.

# 3. Triển khải config .env trên ứng dụng.
Cài đặt thư viện react-native-config. Link : https://github.com/luggit/react-native-config

## 3.1 Triển khai cho IOS.

Khởi tạọ 4 file :

* **.env** : biến môi trường mặc định.
* **.env.development** : biến môi trường develop.
* **.env.production**: biến môi trường production.
* **.env.development**: biến môi trường develop.

Nội dung file như sau :

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.13.06.png?w=1024)

Ngoài ra các bạn có thể thêm các biến môi trường tuỳ theo dự án của mình vào file.

Quay lại với Xcode, chúng ta cần tham chiếu các môi trường vừa tạo ứng với các scheme vừa tạo.

Chọn **Pre-actions** => **New Run Script Action** và thêm đoạn mã sau :

```
echo ".env.production" > /tmp/envfile  
```

Thay thế **.env.production** bằng **.env.development** hoặc **.env.staging** ứng với các scheme **dev** và **staging**.

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-20.35.02.png?w=1024)

## 3.1 Thiết lập Build Settings

Bấm vào cây thư mục và tạo 1 file mới dạng **XCConfig**

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.18.41.png)

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-20.36.19.png?w=1024)

Lưu file đó dưới tên **Config.xcconfig** với nội dung như sau:

```
#include? "tmp.xcconfig"
```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.22.29.png?w=1024)

Thêm đoạn mã sau và cuối file **.gitignore**:

```
# react-native-config codegen
ios/tmp.xcconfig
```

Đi tới **Project settings** và apply file **Config.xcconfig** mình vừa tạo

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-20.37.41.png?w=1024)


Tạo **Build phase** cho scheme. Và thêm đoạn mã sau vào **Run Script** vừa tạo:

```
"${SRCROOT}/../node_modules/react-native-config/ios/ReactNativeConfig/BuildXCConfig.rb" "${SRCROOT}/.." "${SRCROOT}/tmp.xcconfig"

```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-20.39.34.png?w=1024)

Chuyển tới project chọn **Build Settings** và tìm kiếm từ khoá **preprocess** và thay đổi:

* **Preprocess Info.plist File** thành **Yes**
* **Info.plist Preprocessor Prefix File** thành **${BUILD_DIR}/GeneratedInfoPlistDotEnv.h**
* **Info.plist Other Preprocessor Flags** thành **-traditional**

Mở **Info.plist** trong vscode và thay thế:

* **CFBundleDisplayName** thành **RNC_APP_NAME**
* **CFBundleShortVersionString** thành **RNC_IOS_APP_VERSION_CODE**
* **CFBundleVersion** thành **RNC_IOS_APP_BUILD_CODE**

## 3.2. Triển khai cho android.

Hãy tạo một file **.keystore** cho project của mình. Điều này rất quan trọng ở môi trường **staging** và **production**.

Lệnh để gen key :

```
keytool -genkeypair -v -keystore GiangTran-key.keystore -alias GiangTran-alias -keyalg RSA -keysize 2048 -validity 10000

```

Thay thế “GiangTran” bang tên bạn muốn đặt và làm theo hướng dẫn trong terminal.

Trong thư mục android mở gradle.properties và thêm đoạn mã sau vào cuối file :

```
# infomation dev keystore
DEBUG_STORE_FILE=debug.keystore
DEBUG_KEY_ALIAS=androiddebugkey
DEBUG_STORE_PASSWORD=android
DEBUG_KEY_PASSWORD=android
# infomation staging keystore
STAGING_STORE_FILE=rtr-dev-key.keystore
STAGING_KEY_ALIAS=rtr-dev-alias
STAGING_STORE_PASSWORD=giang@123
STAGING_KEY_PASSWORD=giang@123
# infomation product keystore
PRODUCT_STORE_FILE=product.keystore
PRODUCT_KEY_ALIAS=giang@123
PRODUCT_STORE_PASSWORD=giang@2021
PRODUCT_KEY_PASSWORD=giang@2021
```

Thay thế các key pass của các bạn.

Trong thư mục android mở **app/build.gradle**. Thêm đoạn mã sau vào đầu file :

```
project.ext.envConfigFiles = [
    development: ".env.development",
    staging: ".env.staging",
    product: ".env.production",
    anothercustombuild: ".env",
]
```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.40.27.png?w=1024)

Thêm đoạn mã sau vào dưới : **apply from: “../../node_modules/react-native/react.gradle”**

```
apply from: project(':react-native-config').projectDir.getPath() + "/dotenv.gradle"

```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.41.33.png?w=1024)

Tìm mục **android.defaultConfig** và thay thế như sau:

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-20.41.04.png?w=1024)

Tìm mục android.signingConfig và thay thế nội dung bằng đoạn mã:

```
debug {
    storeFile file(DEBUG_STORE_FILE)
    storePassword DEBUG_STORE_PASSWORD
    keyAlias DEBUG_KEY_ALIAS
    keyPassword DEBUG_KEY_PASSWORD
 
}
development {
    storeFile file(DEBUG_STORE_FILE)
    storePassword DEBUG_STORE_PASSWORD
    keyAlias DEBUG_KEY_ALIAS
    keyPassword DEBUG_KEY_PASSWORD
}
staging {
    storeFile file(STAGING_STORE_FILE)
    storePassword STAGING_STORE_PASSWORD
    keyAlias STAGING_KEY_ALIAS
    keyPassword STAGING_KEY_PASSWORD
}
product {
    storeFile file(PRODUCT_STORE_FILE)
    storePassword PRODUCT_STORE_PASSWORD
    keyAlias PRODUCT_KEY_ALIAS
    keyPassword PRODUCT_KEY_PASSWORD
}
```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.44.42.png?w=1024)

Bên dưới **android.buildTypes** thêm đoạn mã:

```
flavorDimensions "enviroment"
  productFlavors {
      dev {
          dimension "enviroment"
          resValue "string", "app_name", project.env.get("APP_NAME")
          signingConfig signingConfigs.staging
      }
      staging {
          dimension "enviroment"
          resValue "string", "app_name", project.env.get("APP_NAME")
          signingConfig signingConfigs.staging
      }
      product {
          dimension "enviroment"
          resValue "string", "app_name", project.env.get("APP_NAME")
          signingConfig signingConfigs.product
      }
  }
```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.45.38.png?w=1024)

Truy cập **android/app/src/main/res/values/strings.xml** và xoá hết các thẻ **<string/>**

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.46.36.png?w=1024)

Như vậy chúng ta đã config xong cho cả 2 hệ điều hành là android và ios.

Để build ứng dụng bằng các câu lệnh. Trong **package.json** thêm các đoạn mã :

```
"ios-run-debug-develop": "react-native run-ios --scheme DemoENVDev --configuration DebugDev",
"ios-run-debug-staging" : "react-native run-ios --scheme DemoENVStaging --configuration DebugDev",
"ios-run-debug-production" : "react-native run-ios --scheme DemoENVProd --configuration DebugDev",
"android-run-debug-develop": "react-native run-android --no-jetifier --variant=devDebug --appId 'com.demoenv.app.dev'",
"android-run-debug-staging": "react-native run-android --no-jetifier --variant=stagingDebug --appId 'com.demoenv.app.stg'",
"android-run-debug-product": "react-native run-android --no-jetifier --variant=productDebug --appId 'com.demoenv.app.prod'",

```

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.48.45.png?w=1024)

Chạy các lệnh tương ứng để kiểm tra kết quả. Ở đây mình đã in ra màn hình **API_URL** của từng môi trường ứng với từng lệnh build.

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.49.19.png?w=1024)

![alt](https://ducgiangtran.files.wordpress.com/2021/02/screen-shot-2021-02-28-at-15.51.53.png?w=1024)

Như vậy các bạn đã config thành công Environment Variables cho ứng dụng react native của mình. Các bạn có thể tạo các file example env để các thành viên trong team bạn có thể dễ dàng sử dụng và thay đổi các biến môi trường tuỳ thuộc vào yêu cầu từng project của bạn.

# 4. Tổng kết.
Trong bài viết này mình đã hướng dẫn các bạn config Environment Variables cho project của các bạn. Có thể cách làm này còn tương đối phức tạp với các bạn mới bắt đầu với react native nhưng mình nghĩ trong tương lai khi các bạn gặp những project lớn hơn, nhưng team chuyên nghiệp hơn thì chắc chắn các bạn sẽ thấy nó có ích, ít nhất là bạn sẽ không bỡ ngỡ về khái niệm biến môi trường trong react native.

Ngoài ra để đơn giản hoá việc tạo các file .env phục vụ cho việc thay đổi môi trường có rất nhiều cách ngắn gọn hơn. Nếu có dịp mình sẽ chia sẻ với các bạn trong nhưng bài viết sau để phục vụ cho các bạn mới bắt đầu và làm quen với việc cài đặt Environment Variables cho project của bạn.

Bài viết được chia sẻ trên cái nhìn và cách làm cá nhân của mình trong quá trình làm thực tế và tìm hiểu. Rất mong nhận được sự góp ý của các bạn để chúng ta có thể trao đổi, tối ưu hơn trong việc triển khai những sản phẩm của mình.

Mọi đóng góp có thể chia sẻ với mình qua địa chỉ tranducgiangact@gmail.com.

Cảm ơn các bạn đã theo dõi. Hy vọng bài viết sẽ giúp ích được cho các bạn.

Các bạn có thể tham khảo mã nguồn tài : https://github.com/ducgiangtrankma/DemoSetupENV.git