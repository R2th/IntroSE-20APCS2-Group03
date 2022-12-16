# Nội dung
Trong bài viết này chúng ta sẽ tìm hiểu về CircleCI phiên bản 2.0, ý nghĩa các thành phần cơ bản trong file cấu hình của CircleCI.

Đồng thời, cũng tiến hành cấu hình một project cơ bản trên Github để tự động build khi mã nguồn có thay đổi, kết hợp liên kết với Firebase Test Lab để thực hiện các việc kiểm tra và gửi kết quả phân tích về.
## 1. Giới thiệu về CircleCI
CircleCI (Continuous integration) là một hệ thống giúp tự động build ứng dụng, thực hiện việc kiểm thử và triển khai ứng dụng. Mỗi khi mã nguồn của bạn có sự thay đổi trên Github hoặc Bitbucket, hệ thống sẽ tự động build ứng dụng và gửi một email thông báo là thành công hoặc thất bại giúp các nhà phát triển nhanh chóng biết được trạng thái của ứng dụng để kịp thời tiến hành các thay đổi, sửa chữa cần thiết.

CircleCI hoạt động trên tất cả các nền tảng hệ điều hành hiện có: Linux, Windows và MacOS. Nó cũng có thể được cấu hình để deploy code trên các môi trường đa dạng như AWS CodeDeploy, AWS EC2, AWS S3, Google Kubernetes Engine (GKE), Microsoft Azure, Heroku.
![](https://images.viblo.asia/7db3415d-32c1-4fff-84b4-5db6e19ea7a4.png)
## 2. Các thành phần chính cơ bản trong config.yml
Để cấu hình CircleCI từ mã nguồn của ứng dụng, tại thư mục chính của ứng dụng ta tạo một thư mục là **.circleci**, bên trong thư mục ta tạo một file **config.yml**

File này sẽ thường có nội dung như sau
```json
version: 2

references:
  # We will define reusable references here
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
jobs:
  # Build APK for unit tests and an instrumented test APK
  build:
    # ...
  # Run unit tests
  test_unit:
    # ...
  # Run instrumented tests
  test_instrumented:
    # ...
  # Deploy release APK
  deploy:
    # ...
    
workflows:
  version: 2
  workflow:
    jobs:
      - build
      - test_unit
      - test_instrumented:
            requires:
              - build_debug
```
Quan sát từ một file config.yml mẫu ở trên, thông thường ta sẽ thấy 1 file cấu hình chứa 4 key chính:
- version: đây là tag để khai báo phiên bản CircleCI mà chúng ta sẽ sử dụng để chạy, thường giá trị của nó sẽ là 2 tương ứng với phiên bản CircleCI 2.0
- references: đây là tag chúng ta sử dụng để định nghĩa các hằng số, các tham chiếu được sử dụng nhiều lần trong file config này giúp chúng ta không phải khai báo lặp đi lặp lại và giúp file config.yml ngắn gọn hơn. Thường ta sẽ khai báo định nghĩa các biến để lưu cache, đường dẫn workspace và key từ google, firebase...
- jobs: đây là nơi thể hiện và định nghĩa đầy đủ chi tiết nhất các công việc cần làm, mỗi job sẽ là một tập hợp các bước cần thiết cho việc build, test hay deploy của dự án.
- [workflows](https://circleci.com/docs/2.0/workflows/): là một bộ các quy tắc để xác định tập hợp các công việc và thứ tự chạy của chúng. Ví dụ như bạn xác định một tập các sub-tasks cần chạy trong quá trình build, bạn bảo CircleCI sự phụ thuộc giữa các task này và nó sẽ chạy các task độc lập một cách song song khi nó có đủ thông tin hay thỏa một điều kiện nào đó quy định trước. Lưu ý là để thực hiện việc chạy song song thì cấu hình phần cứng bạn đăng kí từ CircleCI có hỗ trợ chạy đa nhiệm, thường là các gói trả phí sẽ có đa nhiệm.

## 3. Phân tích các bước trong một task build cơ bản
Tiếp theo chúng ta sẽ đi vào phân tích một task build cơ bản trong một job để hiểu rõ hơn các thành phần trong đó. Ta định nghĩa một job có tên là **build_debug** sẽ có các tác vụ công việc như bên dưới:
```json
jobs:
    build_debug:
        working_directory: *workspace
        docker:
            - image: circleci/android:api-28
        environment:
            TERM: dumb
            _JAVA_OPTIONS: "-Xmx3072m -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap"
            GRADLE_OPTS: '-Dorg.gradle.jvmargs="-Xmx2048m"'
        steps:
            - checkout
            - *restore_cache
            - run:
                name: Download dependencies
                command: ./gradlew androidDependencies
            - *save_cache
            - run:
                name: Gradle build (debug)
                command: ./gradlew -PciBuild=true :app:assembleDebug :app:assembleAndroidTest
            - store_artifacts:
                path: app/build/outputs/apk/
                destination: /apk/
```
* working_directory: để định nghĩa tên thư mục chứa dự án của chúng ta trên CircleCI, nơi mà code của chúng ta sẽ được clone từ Github/Bitbucket về.
* [docker](https://circleci.com/docs/2.0/language-android/#docker-images): là nơi ta khai báo image được sử dụng cho việc build project của chúng ta. CircleCI và cộng đồng đã xây dựng một tập các công cụ, thư viện và câu lệnh được tích hợp sẵn cho mỗi loại dự án ngôn ngữ khác nhau, giúp cho việc cấu hình CircleCI trở nên đơn giản hơn. Ta chỉ cần lên trang https://hub.docker.com/search/?q=circleci&type=image tìm kiếm image theo loại dự án và sử dụng.
* environment: là nơi thiết lập các yêu cầu về môi trường cho việc build. Ví dụ như là sử dụng **dum** để tránh các output lạ từ Gradle, giới hạn heap size của máy ảo JVM tối đa là 3Gb để tránh sử dụng quá bộ nhớ gây ra hiện tượng tràn bộ nhớ và làm quá trình build bị thất bại.
* steps: định nghĩa tập các bước để build dự án, như ví dụ trên ta sẽ thấy có các bước là:
    * *checkout*: lệnh này giúp checkout dự án từ Github hoặc Bitbucket về
    * *restorecache*: để phục hồi lại các cấu hình sẵn có giúp giảm thời gian build
    * *./gradlew androidDependencies*: giúp download các thư viện được implement trong project về, nếu đã được lưu trữ trong restore_cache rồi thì nó chỉ download những thư viện không có trong cache giúp giảm thời gian build
    * *savecache*: tiến hành cache lại để tái sử dụng cho những lần gọi sau
    * *./gradlew -PciBuild=true :app:assembleDebug :app:assembleAndroidTest*: câu lệnh giúp build ra apk debug và apk cho việc chạy instrumented test.
    * *store_artifacts*: chỉ định nơi lưu trữ apk trong CircleCI artifacts.
## 4. Liên kết và cấu hình dự án với CircleCI
Ở các bước trên ta đã tìm hiểu cách tạo và thêm file config.yml vào trong project ta cần thiết lập CircleCI. Ở bước này ta sẽ liên kết dự án của ta trên trang CircleCI và tiến hành các cấu hình cần thiết trên trang này.

Ta truy cập vào trang https://circleci.com/vcs-authorize/ chọn nơi lưu trữ dự án là GitHub hoặc Bitbucket

![](https://images.viblo.asia/537a3989-378d-4c4e-a52f-c77ad8e5b911.png)

Khi đó chúng ta sẽ được redirect vào trang config của CircleCI, tại tab "ADD PROJECTS" chúng ta sẽ thấy được danh sách các dự án đang có.
![](https://images.viblo.asia/199e946b-bec1-4952-9eff-2dc1a63968ab.png)

Chọn project và click vào nút "Set Up Project" để đi đến bước kế tiếp.

![](https://images.viblo.asia/8c1986a0-9107-4bfc-a29f-908eb51d350a.png)

Ta chọn hệ điều hành cần build và loại ngôn ngữ, ở đây là dự án **Android** nên ta sẽ chọn **Gradle(Java)**.

Khi thiết lập xong ta nhấn vào nút "**Start building**" để hệ thống bắt đầu build dự án của chúng ta, kết quả sẽ được liệt kê như hình bên dưới.

![](https://images.viblo.asia/4f6879c7-ddf5-4bca-8246-f2255d669270.png)

Từ những thông báo FAILED hoặc SUCCESS ta có thể biết được quá trình build có thành công hay không. Đồng thời có thể click vào các thông báo để xem chi tiết quá trình build, nếu quá trình build thất bại ta có thể quan sát được bước nào làm sai và tiến hành sửa chữa kịp thời.

![](https://images.viblo.asia/247bc4a1-13ec-4f52-b1e0-cf05ef6a0eeb.png)

Tới đây mình đã giới thiệu các bạn các bước cơ bản để cấu hình CircleCI 2.0 cho dự án Android.

Phần tiếp theo sẽ giới thiệu các bước cấu hình trên Firebase Test Lab để liên kết với CircleCI.
# Tham khảo
1. https://circleci.com/docs/2.0/language-android/