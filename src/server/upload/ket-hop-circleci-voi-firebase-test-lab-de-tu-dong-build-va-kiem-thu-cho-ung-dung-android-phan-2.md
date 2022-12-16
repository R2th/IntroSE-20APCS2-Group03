# Nội dung
Ở phần 1 (https://viblo.asia/p/ket-hop-circleci-voi-firebase-test-lab-de-tu-dong-build-va-kiem-thu-cho-ung-dung-android-phan-1-aWj536dGl6m) chúng ta đã tìm hiểu các bước cấu hình 1 dự án cơ bản với CircleCI. Phần tiếp theo này ta sẽ tiếp tục tìm hiểu các bước để liên kết CircleCI với Firebase Test Lab, việc liên kết này sẽ giúp chúng ta có thể tận dụng được các công cụ test cơ bản mà Firebase hổ trợ giúp ứng dụng chúng ta có thể hoạt động tốt hơn, kịp thời phát hiện các bước tìm ẩn từ chương trình.

Quá trình chạy 1 build với Firebase Test Lab từ CircleCI có thể tóm tắt qua các bước cơ bản như sau:
1. CircleCI sẽ tự động phát hiện những thay đổi trên build và tiến hành build APK cho việc kiểm thử.
2. CircleCI sẽ gửi apk build được đến Firebase Test Lab thông qua các cloud API hổ trợ sẵn.
3. Firebase Test Lab chạy các bước kiểm thử đã thiết lập sẵn trong build và trả kết quả về cho CircleCI.
4. CircleCI nhận kết quả và gửi email thông báo đến người quản lý dự án rằng commit vừa push lên có tạo ra 1 build thoả các yêu cầu được thiết lập sẵn trước đó hay không.

Để thực hiện việc cấu hình này ta sẽ lần lượt đi qua các bước bên dưới
## 1. Thiết lập Firebase Test Lab
Đầu tiên ta truy cập trang https://console.firebase.google.com và nhấn "**Add project**", nhập tên dự án để tạo dự án cần chạy Firebase Test Lab.

Sau khi tạo dự án xong, chúng ta sẽ đi đến giao diện chính của Firebase. Tại đây ta chọn loại dự án là iOS, Android, Unity hay Web. Trong phạm vi bài viết này chúng ta sẽ thiết lập cho dự án Android nên ta chọn Android.

![](https://images.viblo.asia/ae5d5c9c-0445-4b42-aa96-bc57de56ab5d.PNG)

Kế đến nhập **package name** của dự án rồi nhấn "**Register**", ta sẽ chuyển đến bước "**Download config file**". Tại đây ta tải file **google-services.json** về lưu trữ ở máy để thực hiện các bước cấu hình sau đó. Các bước cấu hình kế tiếp ta có thể "Skip".

![](https://images.viblo.asia/ccbb2f3b-f023-47d8-86a9-725d4c94e8dd.PNG)

Sau khi thiếp lậo xong ta di chuyển đến phần **Setting** của dự án vừa tạo

![](https://images.viblo.asia/559483a8-d805-4ffd-bd99-53feddbb58b0.PNG)

Tại đây có 2 thông tin từ cần ghi chép lại để thực hiện cho việc cấu hình sau đó từ CircleCI:
* Tại tab **General**: ta ghi nhận lại "**Project ID**" của dự án
* Tại tab **Services account**: ta ghi nhận lại tài khoản "**Firebase service account**"

Đến đây ta đã hoàn thành các bước cấu hình cho Firebase Test Lab
## 2. Thiết lập tài khoản Google Cloud Service
Một tài khoản Google Cloud Service thì được đòi hỏi để chạy các test trên Firebase Test Lab từ CircleCI. Để thực hiện việc này chúng ta sẽ truy cập vào trang https://console.cloud.google.com/projectselector2/iam-admin/serviceaccounts?supportedpurview=project (thực hiện các bước đăng kí nếu bạn chưa có tài khoản)

Sau khi vào được trang này, nhấn vào nút "**Select**" để chọn tên dự án bạn đã tạo từ Firebase. Tiếp theo chúng ta sẽ thấy được tài khoản Firebase service account của dự án cái mà ta đã ghi nhận từ bước trên, ở cột "**Action**" ta chọn "**Create key**", đặt tên là **client-secrets.json** và lưu về máy. File này chứa thông tin về tài khoản Google Cloud Service mà chúng ta cần tạo

![](https://images.viblo.asia/5b98f8db-97ed-41e2-bf26-34e3223d2fe9.png)

Chúng ta cũng nên kiểm tra lại tài khoản Firebase service account đã có **Role** là **Editor** hay chưa, nếu chưa có hãy vào thẻ "**IAM**" ở góc trên cùng bên trái để kiểm tra và cấp quyền Editor cho nó.

## 3. Enable cloud testing API trên Google console
Để có thể chạy được các cloud API cho việc kiểm tra và nhận kết quả, ta cần enable 2 API từ Google Developer Console. Ta truy cập vào trang https://console.developers.google.com/apis/library?pli=1

Sau đó chọn đúng tên dự án của chúng ta và tìm kiếm 2 API là: **Cloud Testing API** và **Cloud Tool Results API**.
Tiến hành **Enable** 2 API này lên.

![](https://images.viblo.asia/663dc26e-4ea0-47d0-81f4-2c420b506b66.PNG)

![](https://images.viblo.asia/ad12dd37-fb7a-4a1e-9aba-e5ea28c42f5d.PNG)
## 4. Mã hóa JSON file và thiết lập biến môi trường cho CircleCI
Đến bước này chúng ta đã có 2 file **google-services.json** và **client-secrets.json**. Hai file này có tác dụng dùng để chứng thực cho việc sử dụng các dịch vụ của Firebase và Google Cloud. 

Thông thường chúng sẽ được chép vào chung với mã nguồn của dự án để sử dụng, nhưng chúng ta không nên làm điều này vì mã nguồn chúng ta thường lưu trữ trên Github hoặc Bitbucket vì một lý do nào đó chúng ta bị lộ mã nguồn hoặc vô tình để public, những thông tin này sẽ bị đánh cấp dẫn đến chúng ta bị mất những khoản tiền rất lớn. Chẳng hạn như người nào đó dùng nó để kích hoạt các gói trả phí hoặc họ dùng nó để tạo những máy cấu hình cao phục vụ cho việc cày tiền ảo...

Do đó, chúng ta thường lưu trữ những file này ở local và chỉ chép vào khi build dự án. Còn với CircleCI, hệ thống này hỗ trợ ta tạo ra các biến môi trường và sẽ cung cấp thông tin này cho dự án khi build. Do đó, ta sẽ lưu trữ 2 file này trong các biến môi trường của CircleCI.

Và cũng để tăng tính bảo mật trước khi lưu trữ trên CircleCI ta nên **encode** nội dung 2 file này với **Base64**. Ta có thể dùng các công cụ có sẵn để làm điều này hoặc sử dụng công cụ online như https://www.base64encode.org/ để thực hiện, lưu ý nên dùng các trang có độ tin cậy cao để tránh việc sao chép bất hợp pháp.

Trên Linux ta thường dùng câu lệnh đơn giản với Terminal như sau:
```shell
 base64 -i google-services.json > google-services.b64
 base64 -i client-secrets.json > client-secrets.b64
```

Trên Windows ta có thể mở command line và dùng câu lệnh sau:
```shell
certutil -encode google-services.json google-services.b64
certutil -encode client-secrets.json client-secrets.b64
```

Sau khi đã có được các thông tin cần thiết, ta tiến hành truy cập phần **Setting** của dự án cần thiết lập CircleCI và đi đến phần "**Environment Variables**" để thiết lập 2 biến môi trường là **GCLOUD_SERVICE_KEY** và **GOOGLE_SERVICES_KEY** như hình mình hoạ.
![](https://images.viblo.asia/926f48b0-f0e0-4bc9-aaa0-069555567540.PNG)

## 5. Cấu hình file YML để liên kết test với Firebase và nhận kết quả.
Sau khi đã có được đầy đủ các thông tin cần thiết, đây là bước ta cập nhật lại file config.yml để CircleCI có thể đọc các tham số từ file cấu hình này và chạy một cách tự động các bước build và kiểm thử.

Đầu tiên ở thẻ **references** ta khai báo các biến để lưu và phục hồi cache, thông tin workspace
```yaml
  ## Cache
  cache_key: &cache_key
    key: cache-{{ checksum "build.gradle" }}-{{ checksum  "app/build.gradle" }}-{{ checksum "gradle/wrapper/gradle-wrapper.properties" }}

  restore_cache: &restore_cache
    restore_cache:
      <<: *cache_key

  save_cache: &save_cache
    save_cache:
      <<: *cache_key
      paths:
        - ~/.gradle
        - ~/.m2

  ## Workspace
  workspace: &workspace
    ~/workspace
```

Ta cũng tiến hành định nghĩa loại docker image được sử dụng cho build dự án android và chạy các lệnh với Google cloud

```yaml
  ## Docker image configurations
  android_config: &android_config
    working_directory: *workspace
    docker:
      - image: circleci/android:api-28
    environment:
      TERM: dumb
      _JAVA_OPTIONS: "-Xmx3072m -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap"
      GRADLE_OPTS: '-Dorg.gradle.jvmargs="-Xmx2048m"'
  
  gcloud_config: &gcloud_config
    working_directory: *workspace
    docker:
      - image: google/cloud-sdk:latest
    environment:
      TERM: dumb
```

Tiếp theo định nghĩa các biến để đọc các key từ Google services và Google clould đã được lưu trữ từ biến môi trường trước đó. Với mỗi key ta có 2 bước:  đọc từ biến môi trường và decode thông tin, lưu trữ đến vị trí của dự án cần sử dụng.

```yaml
  ## Keys
  # Google Services
  export_gservices_key: &export_gservices_key
    run:
      name: Export Google Services key environment variable
      command: echo 'export GOOGLE_SERVICES_KEY="$GOOGLE_SERVICES_KEY"' >> $BASH_ENV

  decode_gservices_key: &decode_gservices_key
    run:
      name: Decode Google Services key
      command: echo $GOOGLE_SERVICES_KEY | base64 -di > app/google-services.json

  # Google Cloud Service
  export_gcloud_key: &export_gcloud_key
    run:
      name: Export Google Cloud Service key environment variable
      command: echo 'export GCLOUD_SERVICE_KEY="$GCLOUD_SERVICE_KEY"' >> $BASH_ENV
  decode_gcloud_key: &decode_gcloud_key
    run:
      name: Decode Google Cloud credentials
      command: echo $GCLOUD_SERVICE_KEY | base64 -di > ${HOME}/client-secret.json
```

Phần tiếp theo ta sẽ định nghĩa nội dung các công việc cho việc build ứng dụng ở chế độ debug, thực hiện việc chạy unit test, instrumented test từ Firebase. Để làm việc này tại thẻ jobs ta sẽ khai báo các câu lệnh để chạy như sau:
* Build apk ở chế độ debug
```yaml
  ## Build debug APK and instrumented test APK
  build_debug:
    <<: *android_config
    steps:
      - checkout
      - *restore_cache
      - run:
          name: Download dependencies
          command: |
            sudo chmod +x ./gradlew
            ./gradlew androidDependencies
      - *save_cache
      - *export_gservices_key
      - *decode_gservices_key
      - run:
          name: Gradle build (debug)
          command: ./gradlew -PciBuild=true :app:assembleDebug :app:assembleAndroidTest
      - store_artifacts:
          path: app/build/outputs/apk/
          destination: /apk/
```
* Run unit test
```yaml
  ## Run unit tests
  test_unit:
    <<: *android_config
    steps:
      - checkout
      - *restore_cache
      - run:
          name: Download dependencies
          command: |
            sudo chmod +x ./gradlew
            ./gradlew androidDependencies
      - *save_cache
      - *export_gservices_key
      - *decode_gservices_key
      - run:
          name: Run unit tests
          command: ./gradlew -PciBuild=true :app:testDebugUnitTest
      - store_artifacts:
          path: app/build/reports/
          destination: /reports/
      - store_test_results:
          path: app/build/test-results/
          destination: /test-results/
```
* Run instrumented trên Firebase
```yaml
  ## Run instrumented tests
  test_instrumented:
    <<: *gcloud_config
    steps:
      - attach_workspace:
          at: *workspace
      - *export_gcloud_key
      - *decode_gcloud_key
      - run:
          name: Set Google Cloud target project
          command: gcloud config set project PROJECT_ID_OF_YOUR_PROJECT
      - run:
          name: Authenticate with Google Cloud
          command: gcloud auth activate-service-account FIREBASE_SERIVCES_ACCOUNT --key-file ${HOME}/client-secret.json
      - run:
          name: Run instrumented test on Firebase Test Lab
          command: gcloud firebase test android run --type instrumentation --app app/build/outputs/apk/debug/app-debug.apk --test app/build/outputs/apk/androidTest/debug/app-debug-androidTest.apk --device model=sailfish,version=26,locale=en_US,orientation=portrait --environment-variables coverage=true,coverageFile=/sdcard/tmp/code-coverage/connected/coverage.ec --directories-to-pull=/sdcard/tmp --timeout 20m
      - run:
          name: Create directory to store test results
          command: mkdir firebase
      - run:
          name: Download instrumented test results from Firebase Test Lab
          command: gsutil -m cp -r -U "`gsutil ls gs://TEST_LAB_ID | tail -1`*" /root/workspace/firebase/
      - store_artifacts:
          path: firebase/
          destination: /firebase/
```
Tại đây ta cần lưu ý thay thế 3 biến sau:

1. **PROJECT_ID_OF_YOUR_PROJECT**: thông tin project id của dự án ta đã có và lưu trữ từ bước 1.
2. **FIREBASE_SERIVCES_ACCOUNT**: thông tin Firebase services account cũng đã có và lưu trữ từ bước 1.
3. **TEST_LAB_ID**: thông tin này nếu build lần đầu sẽ không có, ta cần chạy 1 lần và nhìn vào log ở bước "Run instrumented test on Firebase Test Lab"  của CircleCI để lấy và cập nhật như hình minh hoạ
![](https://images.viblo.asia/053825df-07f7-4dc0-ad01-492fdbcaab50.PNG)

Sau khi hoàn thành các cấu hình cần thiết để chạy các job mong muốn, ta tiếp tục cấu hình thẻ **workflows** để xác định job nào muốn chạy trước, job nào cần chạy song song. Ta có thể thiết lập như sau
```yaml
workflows:
  version: 2
  workflow:
    jobs:
      - build_debug
      - test_unit:
          requires:
            - build_debug
      - test_instrumented:
          requires:
            - build_debug
```
Với thiết lập này thì job **build_debug** sẽ chạy trước, sau khi có kết quả từ build_debug chạy xong, 2 job **test_unit** và **test_instrumented** có thể chạy song song giúp tiết kiệm thời gian chạy và kiểm tra.

Sau khi thiếp lập xong ta có thể commit và push code để CircleCI có thể tự động chạy, kết quả chúng có thể thấy trực tiếp từ trang CircleCI
![](https://images.viblo.asia/8ba575b4-4195-46cd-af29-b9875fa70e9a.PNG)

Về kết quả test instrumented ta có thể đọc trực tiếp từ CircleCI vì nó đã được download về sau khi chạy xong hoặc kiểm tra trực tiếp trên trang Firebase ở thẻ Test Lab
![](https://images.viblo.asia/f3aacf2b-2849-41cb-bf89-0c38fe7f698a.PNG)

Đến đây chúng ta cũng đã hoàn thành các bước cho việc cấu hình 1 dự án Android cơ bản kết hợp với Firebase Test Lab để chạy các test. Cảm ơn các bạn đã quan tâm theo dõi :man_dancing::man_dancing::man_dancing:
# Tham khảo
1. https://medium.com/@ayltai/all-you-need-to-know-about-circleci-2-0-with-firebase-test-lab-2a66785ff3c2
2. https://techblog.vn/migrate-circle-ci-version-20-automation-testing