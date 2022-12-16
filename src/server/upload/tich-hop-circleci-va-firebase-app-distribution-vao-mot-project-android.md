# CI là gì?

`CI – Continuous Integration` là phương pháp phát triển phần mềm đòi hỏi các thành viên trong nhóm tích hợp công việc thường xuyên. Mỗi ngày, các thành viên đều phải theo dõi và phát triển công việc của họ ít nhất một lần. Việc này sẽ được nhóm khác kiểm tra tự động, nhóm này sẽ tiến hành kiểm thử truy hồi để phát hiện lỗi nhanh nhất có thể.

Ta có thể hiểu đơn giản CI thông qua ví dụ về những thứ CI có thể cảnh báo về các vấn đề mà 1 project đang gặp phải như sau:

* Mỗi khi có người commit code lên Git, hệ thống CI sẽ tự lấy code và thực hiện build. Hệ thống sẽ gửi mail thông báo cho toàn bộ thành viên trong team nếu như build bị lỗi. Từ mail này ta có thể dễ dàng nhận ra commit nào đang gây lỗi cho project và có phương án fix kịp thời.

* Nếu project có Unit Test, mỗi khi có thành viên sửa code và commit, hệ thống sẽ build và chạy lại toàn bộ các Unit Test. Nếu có case nào bị failed, cả team sẽ nhận được thông báo. Và tất nhiên sẽ phải fix code để các test case này pass.

* Việc tích hợp được diễn ra hàng ngày, nhiều lần trong ngày. Mỗi khi có ai đó commit code làm hư build hoặc gây lỗi, cả team có thể giải quyết vấn đề **NGAY LẬP TỨC**

Nói tóm lại, CI là phương pháp mà các team Agile sử dụng để đảm bảo code của toàn dự án luôn build được, luôn chạy đúng (pass toàn bộ các test case). Để hiểu thực tế CI hoạt động như nào, chúng ta sẽ tiến hành 1 project demo nhỏ áp dụng CI thông qua framework `CircleCI`.

# Đăng ký tài khoản CircleCI

Thực hiện đầy đủ các bước sau:

1. Tạo project Android trên tài khoản `GitHub` mà ta muốn tích hợp `CircleCI`, sau đó clone về máy tính bằng command:
```php
$ git clone YOUR_REPO_HTTPS
```

2. Đi đến trang [Đăng ký](https://circleci.com/signup/) `CircleCI`.
3. Màn hình đăng nhập của `CircleCI` được hiển thị, chọn **Sign up with GitHub**

![](https://images.viblo.asia/272f4bfa-2cca-47be-8fa1-be9a26943087.png)

4. Nếu chưa từng đăng nhập vào `GitHub` trên browser, ta cần nhập user name và password của tài khoản `GitHub` và nhấn **Sign in**.
5. Chọn **Authorize circleci** để đồng ý cho `CircleCI` truy cập vào tài khoản `GitHub`.
6. Chọn **Organization** có chứa project mà ta muốn tích hợp `CircleCI`.

![](https://images.viblo.asia/51aa8122-83d2-4bce-8295-ebd007c5ca09.png)

7. Sau khi chọn **Organization**, ta sẽ đến màn hình liệt kê các project mà ta đang là thành viên. Chọn nút **Set Up Project** bên phải project mà ta đã tạo ở bước đầu.

![](https://images.viblo.asia/28a54ed3-0836-4ee4-8c69-092b4c4a95c8.png)

8. Tiếp theo ta sẽ đến màn hình tạo file `CircleCI` config cho project.

![](https://images.viblo.asia/d6b26328-2f84-4376-98cb-3c30ae0de740.png)

9. Chọn ngôn ngữ lập trình mà project đang sử dụng, ở đây ta chọn ngôn ngữ **Android**.

![](https://images.viblo.asia/9c03dde1-13c6-4884-bc32-52f6aef27ac8.png)

10. Tiếp theo, chọn **Add Config**, ta sẽ chuyển sang màn hình **Pipelines** của project đã chọn. `CircleCI` sẽ tạo ra 1 branch mới có tên là `circleci-project-setup` bao gồm folder `.circleci` chứa file `config.yml`. File config này chính là nơi ta sẽ viết code để thực hiện các công việc khi `CircleCI` chạy với mỗi commit lên branch.

![](https://images.viblo.asia/2f1580c1-02f8-4585-88b4-f2f628718c46.png)

![Branch circleci-project-setup được CircleCI tạo cho project:](https://images.viblo.asia/9d288ddd-fc26-41b6-85a9-0f4d4c48a9bd.png)

* Nội dung của file `config.yml` như sau. Trong đó các dòng code ở block `jobs` sẽ được khởi chạy trên `CircleCI`
```php
version: 2.1

orbs:
android: circleci/android@0.2.1

jobs:
 build:
   executor: android/android

   steps:
     - checkout
     - run:
         command: ./gradlew build
```

* Ở màn hình **Pipelines**, ta thấy các status đều báo `Failed` vì trên branch `circleci-project-setup` chưa tồn tại code của project Android nào nên lệnh `./gradlew build` trong file `config.yml` sẽ không thực hiện được.

11. Tiếp theo, ta có thể rebase project ở branch cần chạy `CircleCI` trên branch `circleci-project-setup`, mục đích là đưa folder `.circleci` đến branch đó. Ở ví dụ này là branch `import_circle_ci_demo`. Kết quả ta có code trên branch `import_circle_ci_demo` như sau:

![](https://images.viblo.asia/de0568e3-7fac-4f26-9595-c6e1cb745f16.png)

12. Vào màn hình **Pipelines**, chọn project và branch `import_circle_ci_demo`, ta thấy trạng thái chạy `CircleCI` đã được chuyển thành `Success`.

![](https://images.viblo.asia/ee5b4e37-6b56-4ddb-9788-0bdcdc550a75.png)

**Như vậy ta đã hoàn thành xong việc tích hợp CircleCI cho một project Android. Tiếp theo ta sẽ custom file config.yml để có thể build ra file APK -> Upload lên Firebase App Distribution -> Thông báo trạng thái về Chatwork**

# Kết nối CircleCI với Firebase App Distribution

Mục tiêu của phần này là ta có thể tạo lệnh build APK và đẩy lên **Firebase App Distribution** mỗi khi có commit mới trên branch `import_circle_ci_demo`.

## Setup Firebase Service cho project
1. Truy cập [Firebase Console](https://console.firebase.google.com/u/0/), ta sẽ thấy tùy chọn để thêm project mới. Chọn **Add project**

![](https://images.viblo.asia/a7477f57-df1e-4731-932c-0911a1bf1e5b.png)

2. Điền một số thông tin bao gồm tên project, chọn cài đặt chia sẻ dữ liệu của project. Chọn **Continue** và đợi một vài giây để project Firebase được tạo và ta có thể chuyển sang bước tiếp theo.

![](https://images.viblo.asia/cb74462a-c316-4da3-a77f-4c0e78f8646c.png)

![](https://images.viblo.asia/939a5799-1980-4698-bb0c-55d804e71f10.png)

3. Chọn **Default Account for Firebase** rồi ấn **Create project**

![](https://images.viblo.asia/dcdc8fef-5269-498b-9cda-7a9d2d427b27.png)

4. Click vào icon Setting bên phải **Project Overview**, chọn **Project Settings**

![](https://images.viblo.asia/a163a856-7444-431c-b978-0b40a93489dd.png)

Màn hình hiển thị trang **General** của project. Nếu chưa thấy app Android nào được tạo, hãy chọn **Add app** để tạo thêm app mới

![](https://images.viblo.asia/deb50915-ce5a-4d8c-af8c-0ef4e4d2bd5d.png)

5. Lưu lại giá trị App ID vào **Environment Variables** của `CircleCI` theo các bước sau:
* Chọn **Project Settings** ở màn hình **Pipelines** của project.
* Ở màn hình **Project Settings**, chọn **Environment Variables**.
* Chọn **Add Variable**, điền giá trị name và value như hình dưới đây. Sau đó chọn **Add Environment Variable** để hoàn tất quá trình lưu lại `Firebase App ID`.

![](https://images.viblo.asia/3ff212d2-c2a0-4b85-a0bb-f8720771d8b6.png)

## Cài đặt môi trường Firebase CLI

Truy cập trang [Firebase CLI reference](https://firebase.google.com/docs/cli/) để nắm rõ hơn các bước cài đặt `Firebase CLI` trên hệ điều hành của máy tính. Ở đây ta sẽ thực hiện ví dụ trên hệ điều hành Ubuntu (Linux)

1. Mở terminal, chạy đoạn script sau:
```php
$ curl -sL https://firebase.tools | bash
```

Script này tự động phát hiện hệ điều hành và tải xuống bản phát hành `Firebase CLI` mới nhất, sau đó sẽ kích hoạt `firebase command` ở mức độ global

![](https://images.viblo.asia/d9cd12e0-6d03-49f8-9be9-120c3ee47701.png)

2. Tiếp theo ta cần log in và test `Firebase CLI`. Chạy tiếp command sau trên terminal:

```php
$ firebase login
```

Command này kết nối máy tính với `Firebase` và cấp quyền truy cập tới các project trên `Firebase`. Đăng nhập bằng tài khoản `Google` dùng để setup `Firebase` cho project ở trên và chọn **Cho phép** để `Firebase CLI` có thể truy cập vào tài khoản này.

![](https://images.viblo.asia/d77105ac-32f6-4161-ac4f-01a2bdf71e1d.png)

Màn hình terminal sẽ thông báo kết nối với tài khoản Google thành công:

![](https://images.viblo.asia/1b9118f2-256b-40fa-bd19-5fc8229fe88e.png)

3 Kiểm tra xem `Firebase CLI` đã được cài đặt đúng cách và đã truy cập được tài khoản Google bằng cách gọi lệnh hiển thị các Firebase project của tài khoản. Chạy command sau:

```php
$ firebase projects:list
```

Danh sách hiển thị sẽ giống như danh sách các Firebase project trên trang [Firebase console](https://console.firebase.google.com/u/0/). Ta có thể dễ dàng thấy project được tạo ở mục 1 được hiển thị trên terminal

![](https://images.viblo.asia/f04bdad0-687e-4c5c-a0c0-b3515e12716a.png)

4. Để có thể kết nối `CircleCI` với `Firebase App Distribution` thông qua `Firebase CLI`, ta cần lưu lại Refresh token vào **Variable Environments** của project trên `CircleCI`. Thực hiện tiếp command dưới đây:

```php
$ firebase login:ci
```

Truy cập vào `URL` được cung cấp trên terminal khi chạy command trên, sau đó tiến hành đăng nhập với tài khoản `Firebase`.

![](https://images.viblo.asia/4455705e-ea5d-4bc0-98eb-10a43b19dfc0.png)

Lưu lại refresh token (vùng bị bôi đỏ ở ảnh trên) vào **Variable Environments** của project trên `CircleCI` tương tự như khi lưu `Firebase App ID`

![](https://images.viblo.asia/ef78e5bc-3ee5-4e59-8dcc-220290982d18.png)


## Build APK test và upload lên Firebase App Distribution

1. Chỉnh sửa file `config.yml` trong thư mục `.circleci` với nội dung như sau:

```php
version: 2.1

orbs:
 android: circleci/android@0.2.1

references:
 cache_key: &cache_key
   key: jars-{{ checksum "build.gradle" }}-{{ checksum  "app/build.gradle" }}-{{ checksum "gradle/wrapper/gradle-wrapper.properties" }}

config_android: &config_android
 working_directory: ~/code
 docker:
   - image: circleci/android:api-30

 environment:
   JVM_OPTS: -Xmx3200m

build_test: &build_test
 <<: *config_android
 steps:
   - checkout
   - restore_cache:
       <<: *cache_key
   - run:
       name: Download Dependencies
       command: ./gradlew androidDependencies

   - save_cache:
       <<: *cache_key
       paths:
         - ~/.gradle/caches
         - ~/.gradle/wrapper

   - run:
       name: Build app
       command: ./gradlew build

deploy_debug_to_firebase: &deploy_debug_to_firebase
 <<: *config_android
 steps:
   - checkout
   - run:
       name: Build debug
       command: ./gradlew :app:assembleDebug

   - run:
       name: Install Firebase CLI
       command: |
         curl -sL https://firebase.tools | bash

   - run:
       name: Upload File APK Debug to Firebase App Distribution
       command: firebase appdistribution:distribute app/build/outputs/apk/debug/app-debug.apk --app $FIREBASE_APP_ID --token $FIREBASE_TOKEN_CLI --release-notes "Upload APK to Firebase"

jobs:
 build_test:
   <<: *build_test

 deploy_debug_to_firebase:
   <<: *deploy_debug_to_firebase

workflows:
 version: 1
 build_test_and_deploy:
   jobs:
     - build_test
     - deploy_debug_to_firebase:
         requires:
           - build_test
         filters:
           branches:
             only: import_circle_ci_demo
```

* Key `jobs`: Mỗi job đại diện cho một giai đoạn trong quy trình **Build - Test - Deploy**. Project demo này ta chỉ cần tạo job Build và đẩy lên Firebase App Distribution nên bước này ta chỉ cần tạo 2 job là build_test và deploy_debug_to_firebase

* Với job `build_test`: Công việc cần làm chỉ là chạy các lệnh gradlew trước khi generate APK.

* Với job `deploy_debug_to_firebase`: CircleCI sẽ thực hiện việc generate ra file APK debug. Tiếp theo đó là script cài đặt Firebase CLI trên môi trường của CircleCI tương tự như đã cài đặt Firebase CLI trên hệ điều hành. Sau khi đã generate file APK debug thành công, tiến hành upload file APK lên Firebase App Distribution bằng command có sử dụng các biến FIREBASE_APP_ID và FIREBASE_TOKEN_CLI đã được lưu trên CircleCI Variable Environment

# Gửi thông báo về Chatwork sau khi upload APK thành công

Sau khi upload file APK lên Firebase App Distribution thành công, ta cần thông báo điều này cho những người trong team biết quá trình commit code lên branch không xảy ra vấn đề gì. Ở đây tôi chọn thông báo qua Chatwork - phần mềm giao tiếp mà Công ty tôi đang sử dụng

## Kích hoạt Chatwork API

1. Tạo tài khoản `Chatwork` cá nhân bằng cách truy cập trang chủ Chatwork và chọn **Sign Up**. Nếu đã có tài khoản Chatwork cá nhân vui lòng bỏ qua bước này.

2. Truy cập [Chatwork API Developer](https://developer.chatwork.com/ja/), kéo xuống cuối trang và chọn Đăng ký sử dụng API

3. Login bằng tài khoản Chatwork cá nhân.

4. Nhập password, sau đó nhấn **Display** để hiển thị `API Token`

![](https://images.viblo.asia/1d38ad81-c67f-4b9c-9a0c-b605b165f156.png)

5. Lưu lại `Chatwork API Token` vào **Environment Variables** của `CircleCI`

6. Vào Chatwork, tạo room chat (có thể thêm người nếu muốn), sau đó click vào icon setting góc trên bên phải, chọn **Cài đặt trò chuyện nhóm** để lấy Room ID.

![](https://images.viblo.asia/61fa7baf-5e7a-464d-8bea-906b6924e390.png)

7. Lưu lại Room ID vào **Environment Variables** của `CircleCI`

![](https://images.viblo.asia/4717e97c-06bc-48dd-b189-af62b5ef741a.png)

## Tạo job gửi message thông báo về Chatwork

1. Define job send_message_to_chatwork trong file config.yml:

```php
send_message_to_chatwork: &send_message_to_chatwork
  <<: *config_android
  steps:
    - run:
        name: Send message to ChatWork
        command: |
          curl -X POST -H "X-ChatWorkToken: $CHATWORK_API_TOKEN" -d "body=[toall]%0Build+completed%21%0Link+APK%3A" "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM_ID/messages"
```

* Các biến $CHATWORK_API_TOKEN và $CHATWORK_ROOM_ID được lấy từ Environment Variables của CircleCI

* body=... là định nghĩa message muốn gửi vào room.

2. Thêm job sau khi upload APK lên **Firebase App Distribution** thành công Thêm đoạn code sau vào workflows của file `config.yml`:

```php
- send_message_to_chatwork:
          requires:
            - deploy_debug_to_firebase
          filters:
            branches:
              only: import_circle_ci_demo
```

Sau khi job deploy_debug_to_firebase chạy success, CircleCI sẽ chạy tiếp đến job `send_message_to_chatwork`. Key requires ở đây biểu thị rằng job `send_message_to_chatwork` sẽ được pending lại đến khi nào job `deploy_debug_to_firebase` hoàn thành mới được khởi chạy.