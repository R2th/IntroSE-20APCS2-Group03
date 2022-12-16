Tiếp tục *Seri* *[cải thiện code base cho Android Project của bạn](https://viblo.asia/s/cai-thien-code-base-cho-android-project-24lJDzM8KPM)*, mình tiếp tục chia sẻ một vài *setup* cơ bản cho `Circle CI, Github Action & Sun* CI`. Về cơ bản, phần *CI* của mình chỉ *setup* 3 bước chính :

*1. Chạy task check code style.*

*2. Chạy task check code smell.*

*3. Chạy UnitTest và report.*

Mình chọn những *CI* này vì chúng có `Free Plan (Pricing)`, `performance` ổn và khá nổi tiếng. Nếu có các *CI* khác, hãy *comment* để mình *research* thêm nhé :)
## Chuẩn bị
Hãy chắc chắn rằng *project* của bạn đã thực hiện *config task* cho *lint* và *code style* [Check Android code style và code smell dùng ktlint và detekt](https://viblo.asia/p/check-android-code-style-va-code-smell-dung-ktlint-va-detekt-yMnKMbwmZ7P)

## Cài đặt
### Circle CI
Đầu tiên tại *root project folder*, tạo thư mục `.circleci`, trong đó tạo file `config.yml`. Đường dẫn cụ thể: `.circleci/config.yml`

Các *config* cơ bản cho *Circle CI*, mình có *comment* ở những đoạn cần thiết:
```yaml
version: 2.1
jobs:
  build:
    # Đây là project folder name, nên đúng tên hoa, thường.
    working_directory: ~/AndroidSetup
    docker:
      - image: circleci/android:api-28
    environment:
      GRADLE_OPTS: -Xmx4g -Dorg.gradle.daemon=false
      JVM_OPTS: -Xmx4g
    steps:
      # checkout code mới từ PR
      - checkout
      # restore cache từ lần build cuối, kiểm tra sự thay đổi của tất cả các file gradle hoặc file có ảnh hưởng đến version trong gradle.
      - restore_cache:
          key: gradle-{{ checksum "build.gradle.kts" }}-{{ checksum  "buildSrc/src/main/kotlin/Config.kt" }}-{{ checksum  "gradle/wrapper/gradle-wrapper.properties" }}-{{ checksum "app/build.gradle.kts" }}
      - run:
          name: Download Dependencies
          command: ./gradlew androidDependencies
      - save_cache:
          paths:
            - ~/.gradle
          key: gradle-{{ checksum "build.gradle.kts" }}-{{ checksum  "buildSrc/src/main/kotlin/Config.kt" }}-{{ checksum  "gradle/wrapper/gradle-wrapper.properties" }}-{{ checksum "app/build.gradle.kts" }}
      - run:
          # kiểm tra code style
          name: Run Ktlint
          command: ./gradlew ktlintCheck
      - run:
          # kiểm tra code smell
          name: Run Detekt
          command: ./gradlew detekt
      - run:
          name: Run UnitTest
          # cú pháp test[Flavor][BuildType]UnitTest
          command: ./gradlew testDebugUnitTest
      - run:
          name: Save UnitTest results
          command: |
            mkdir -p ~/test-results/junit/
            find . -type f -regex ".*/build/test-results/.*xml" -exec cp {} ~/test-results/junit/ \;
          when: always
      - store_test_results:
          path: ~/test-results
      - store_artifacts:
          path: app/build/reports
          destination: reports 
```

[Tham khảo code tại đây](https://github.com/huunam1108/AndroidSetup/pull/3)

### Github Action - Run a workflow on any GitHub event
Với *github action*, mọi người có thể [tham khảo chi tiết tại đây.](https://github.com/features/actions)

Để *config github action*, tạo file `main.yml` theo đường dẫn `.github/workflows/main.yml`.

```yaml
# Name của action
name: CI
# Controls when the action will run. Triggers the workflow on push or pull request
# events but only for the master branch
on:
  # push hoặc pull_request action trên master sẽ trigger github action chạy. 
  # demo project nên mình dùng luôn master, anh em nên tránh, thay bằng develop hoặc default branch nhé.
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # hiện chỉ có 1 job là build, bạn có thể thêm các job tùy ý.
  build:
    # Chọn máy chủ để job chạy, có thể dùng macos-latest hoặc windows-latest
    runs-on: ubuntu-latest

    # Các task tương ứng được thể hiện qua các step tuần tự, mỗi step như là 1 phần của 1 job.
    steps:
      # Checks-out your repository
      - uses: actions/checkout@v2

      # Runs a single command using the runners shell
      - name: Setup JDK 1.8
        uses: actions/setup-java@v1
        with:
            java-version: 1.8
      - name: Grant execute permision for gradlew
        run: chmod +x gradlew
      - name: Download Dependencies
        run: ./gradlew androidDependencies
      - name: Run ktlint # checking code style
        run: ./gradlew ktlintCheck
      - name: Run detekt # checking code smell
        run: ./gradlew detekt
      - name: Run UnitTest
        run: ./gradlew test
      - name: Android Test Report Action
        uses: asadmansr/android-test-report-action@v1.2.0
```
Điểm đặc biệt của *github action* là khả năng chia sẻ các *actions* được định nghĩa sẵn. Tức là bạn có thể viết *actions* và *share* nó trên [github marketplace](https://github.com/marketplace?type=actions) , người khác có thể dùng lại bằng cách thêm vào như các *steps* của 1 *job*.

Ở trên, mình có dùng thử `asadmansr/android-test-report-action@v1.2.0` để lấy *unit test report.*

[Tham khảo code tại đây](https://github.com/huunam1108/AndroidSetup/pull/1)

### Sun* CI
*Sun CI* là một sản phẩm *CI* của *Sun*, sau này khi Sun* có kế hoạch *public* cho nhiều người dùng hơn, mình sẽ chia sẻ chi tiết. Hiện tại, mình [có setup trên Sun* CI v3](https://github.com/namnh-0652/AndroidSetup/commit/22872b68f561391498db3b7d675ff288781f6eb8), nếu anh em là *Sunner*, hãy *contact* mình nếu cần hỗ trợ. Mình sẽ hỗ trợ :)

**Happy coding!**