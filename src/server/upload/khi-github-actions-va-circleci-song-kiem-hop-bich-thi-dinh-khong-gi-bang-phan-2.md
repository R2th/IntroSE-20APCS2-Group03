# Cách thức thực hiện

Có thể nói ưu điểm của Github Actions chính là số lượng trigger nhiều.

CircleCI chỉ có 1 trigger là lúc push vào nhánh. Còn Github Actions thì có một lượng trigger không thể đếm xuể.

Việc khởi động CircleCI sẽ gọi API của CircleCI từ phía Github Actions và kích hoạt trigger.

Thông thường, ta sử dụng Webhook để khởi động CircleCI, nhưng lần này sẽ dùng cách call API.

Cho nên, ở setting của repository, hãy cài OFF cho Webhook.

![](https://images.viblo.asia/2f99b75d-c53f-4d29-a9d2-ebf3e84247d3.png)

Chỉ cần không check vào ô Active là đã tắt được Webhook.


# Cách thức khởi động CircleCI sau khi Reviewer đã thực hiện approve

Dù tôi có nhắc đến việc Github Actions có rất nhiều trigger, nhưng thật ra lại không có trigger giới hạn nào sau khi reviewer approve.

Đến đây có thể các bạn sẽ thốt lên: "Ôi thế thì sao mà được nhỉ?" "Haizzz cũng thế cả mà thôi"

Nhưng xin đừng vội vàng nói như vậy, bởi ta có thể thực hiện được chỉ cần kết hợp các trigger lại với nhau!  

(Tham khảo chi tiết ở link này, ghi chú nhỏ là không phải tiếng Việt
https://qiita.com/dosukoi_android/items/a3464548b3aa293c62dd)

Nói một cách đơn giản, bạn chỉ cần call API của CircleCI bằng cách: trigger = submit review, và trạng thái ('STATE') của review get được thông qua webhook của github là 'APPROVED' <= vậy là đã OK rồi.



# Cách thức khởi động CircleCI tại thời điểm merge

Lại phải nói, do nó không có trigger vào thời điểm merge. Vậy ta phải làm sao? 
Đương nhiên là lại kết hợp các trigger!

(Chi tiết có thể đọc bài viết ở link sau, bài gốc không có vietsub nhé
https://qiita.com/dosukoi_android/items/e41f5c2c2a7120685af8)

Nói một cách đơn giản, ta sẽ dùng combo trigger: sau khi được close; và flag đã được merge chưa, get được thông qua webhook => nếu đã được merge rồi, vậy thì API của CircleCI sẽ được gọi.



# Vấn đề
Hẳn những ai từng sử dụng CircleCI đều hiểu, nó không thể khởi chạy từng job. (tôi cho là như vậy, cũng không chắc lắm, nếu điều này sai thì xin lỗi nhé, vì tôi nghĩ rằng chắc chắn không thể làm được vậy lúc call API)

Cho nên chỉ với vấn đề này thôi, thì sẽ nảy sinh câu chuyện là : lúc reviewer approve => merge =>  job bị khởi chạy.

Điều này không ổn cho lắm.
Dù chỉ muốn test một chút thôi nhưng lại thành ra deploy... thế là muốn ngất luôn rùi.



# Cách giải quyết
Có thể giải quyết vấn đề trên bằng cách sử dụng parameters có trong CircleCI v2.1.

Lúc call API của CircleCI, sẽ truyền đi parameters và như vậy có thể phán đoạn được job nào sẽ được chạy.

https://circleci.com/docs/api/v2/#operation/triggerPipeline

# Thí dụ một chút nhé!
**Lúc call API**

```
curl -X POST -H "Content-Type:application/json" -d '{"branch": "master", "parameters": {"task": "build"}}' \
https://circleci.com/api/v2/project/github/username(Organizationname)/repositoryname/pipeline
```

**Bên CircleCI**

```
version: 2.1

parameters:
  task:
    type: enum
    enum: ["build", "test", "deploy"]
    default: "build"

orbs: 
  android: circleci/android@0.2.1

job: 
  build: 
    executor: android/android
    steps:
      Viết cái muốn làm vào đây

  test:
    Giống với build

  deploy:
    Như trên

workflows:
  version: 2.1
  build:
    # đây là phần chính nhé!
    when:
      equal: [ build, << pipeline.parameters.task >> ]
      jobs:
        - build

  test:
    when:
      equal: [ test, << pipeline.parameters.task >> ]
      jobs:
        - test

  deploy:
    when:
      equal: [ deploy, << pipeline.parameters.task >> ]
      jobs:
        - deploy
```


Kiểu như vậy là ta sẽ truyền được parameters "enum" => tuỳ vào giá trị được truyền đi thì sẽ quyết định xem job nào sẽ được chạy!

(tác giả bài báo cực kỳ mê "enum")


![](https://images.viblo.asia/04433e11-cc03-42d0-918b-08c719921722.jpg)


# PHẦN KẾT ~~~~~~


Nhắc lại !!!!

### Github Actions
* Build
* Lint check

### CircleCI
* Test
* Notification to Slack
* Automatic merge
* Deploy


Thử với Android commands như dưới nhé~~~

## BUILD
```

name: Build

on:
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - name: Build with Gradle
        run: ./gradlew compileDebugSources
```

Rất đơn giản! Thuần tuý chỉ cần viết xử lý của Github Actions là OK!


## Lint check

```
name: Build

on:
  pull_request:
    branches: [ master ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: set up JDK 1.8
        uses: actions/setup-java@v1
        with:
          java-version: 1.8
      - name: Build with Gradle
        run: ./gradlew lintDebug
```

*(Thực ra nó là multi-module và tác giả bài viết sử dụng Danger để hiển thị kết quả ở comment của Github)*


## TEST

Từ đây trở đi là bước chính nhé!
Tác giả đăng toàn bộ workflow của Github Actions trước và đăng workflow của CircleCI ở cuối 
(Vì CircleCI đang quản lý tập trung ở config.yml)

Đây là chạy test sau khi reviewer thực hiện approve nhé.

### Github Actions

```
name: UnitTest

on:
  pull_request_review:
    types: [ submitted ]

jobs:
  test:
    # Handling if approved here & handling by branch name if using Git-flow
    if: ${{ github.event.review.state == 'approved' && github.event.pull_request.base.ref == 'master' }}
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Call CircleCI API
        # Call CircleCI's API here
        run: |
          curl \
          -X POST \
          -H "Content-Type: application/json" \
          -d '{ "branch": "master", "parameters": { "build_variant": "dev", "task": "test", "pull_request_title": "${{ github.event.pull_request.title }}", "pull_request_html_url": "${{ github.event.pull_request.html_url }}", "pull_request_user": "${{ github.event.pull_request.user.login }}", "pull_request_url": "${{ github.event.pull_request.url }}", "pull_request_sha": "${{ github.event.pull_request.head.sha }}"}}' \
          https://circleci.com/api/v2/project/github/${{ github.event.repository.full_name }}/pipeline
```


# DEPLOY

### Github Actions

```
name: Deploy

on:
  pull_request:
    types: [closed]
    branches: [master]

jobs:
  build:
    # Only when PR is closed and merged is true → That is, it starts only when merged
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-18.04

    steps:
      - uses: actions/checkout@v1
      - name: Call CircleCI API
        run: |
          curl \
          -X POST \
          -H "Content-Type: application/json" \
          -H "Circle-Token: ${{ secrets.CIRCLE_TOKEN }}" \
          -d '{ "branch": "master", "parameters": { "build_variant": "dev", "task": "deploy", "pull_request_title": "${{ github.event.pull_request.title }}" } }' \
          https://circleci.com/api/v2/project/github/${{ github.event.repository.full_name }}/pipeline
```


### CircleCI

```
version: 2.1

parameters:
  # Handling which job to start
  task:
    type: enum
    enum: ["deploy", "test"]
    default: "deploy"
  # Can be changed for each environment
  build_variant:
    type: enum
    enum: ["dev", "stg", "production"]
    default: "dev"
  # From here on is used for Slack notifications
  pull_request_title:
    type: string
    default: ""
  pull_request_html_url:
    type: string
    default: ""
  pull_request_url:
    type: string
    default: ""
  pull_request_user:
    type: string
    default: ""
  pull_request_sha:
    type: string
    default: ""

executors:
  android:
    docker:
      - image: circleci/android:api-30
    environment:
      JVM_OPTS: -Xmx1536m
      GRADLE_OPTS: '-Dorg.gradle.daemon=false -Dorg.gradle.jvmargs="-Xmx1536m -XX:+HeapDumpOnOutOfMemoryError" -Dorg.gradle.configureondemand=true -Dkotlin.compiler.execution.strategy=in-process -Dkotlin.incremental=false'


orbs:
  android: circleci/android@0.2.1

jobs:

  deploy:
    executor: android
    steps:
      - checkout
      - run:
          # Create aab file
          name: Build with Gradle
          command: |
            ENV=(<< pipeline.parameters.build_variant >>)
            ENV_UPPER_CASE=${ENV[@]~}
            ./gradlew ":navigation:phone:bundle${ENV_UPPER_CASE}Release"
      - run:
          # Call DeployGate's API
          name: Distribute App
          command: |
            curl \
            -H "Authorization: token $DEPLOY_GATE_API_KEY" \
            -F "file=@navigation/phone/build/outputs/bundle/<< pipeline.parameters.build_variant >>Release/phone-<< pipeline.parameters.build_variant >>-release.aab" \
            -F "message=<< pipeline.parameters.pull_request_title >>" \
            -v "https://deploygate.com/api/users/$DEPLOY_GATE_USER_NAME/apps"


  test:
    executor: android
    steps:
      - checkout
      - run:
          name: Unit Test
          command: |
            ENV=(<< pipeline.parameters.build_variant >>)
            ENV_UPPER_CASE=${ENV[@]~}
            ./gradlew "test${ENV_UPPER_CASE}DebugUnitTest"
      - run:
          # Slack notification on failure
          when: on_fail
          name: Unit Test Failure Notification
          command: |
            curl \
            -X POST \
            -H "Content-Type: application/json" \
            -d '{"attachments": [{"color": "#D73A49", "title": "<< pipeline.parameters.pull_request_title >>", "title_link": "<< pipeline.parameters.pull_request_html_url >>", "text": "Failure Unit Test", "author_name": "<< pipeline.parameters.pull_request_user >>"}]}' \
            $SLACK_WEBHOOK

  auto_merge:
    executor: android
    steps:
      - run:
          name: Wait For Status Check
          command: sleep 5s
      - run:
          # Call MergeAPI of Github
          name: Auto Merge
          command: |
            curl \
            -X PUT \
            -H "Authorization: token $PERSONAL_ACCESSTOKEN" \
            -H "Content-Type: application/json" \
            -d '{"sha": "<< pipeline.parameters.pull_request_sha >>", "merged": "true", "message": "Pull Request successfully merged"}' \
            "<< pipeline.parameters.pull_request_url >>/merge"


workflows:
  version: 2.1
  build_and_deploy:
    # Launch this job if the parameter (when calling the API)) is 'deploy'
    when:
      equal: [deploy, << pipeline.parameters.task >>]
    jobs:
      - deploy:
          name: Deploy

  test:
    # Launch this job if the parameter (when calling the API) is 'test'
    when:
      equal: [test, << pipeline.parameters.task >>]
    jobs:
      - test
      - auto_merge:
          name: Auto Merge
          requires:
            - test
     # When the 'test' job is finished, start the 'auto_merge' job
```


(Gần như là AUTOMATIC từ bước build cho đến deploy, việc duy nhất cần chạy cơm đó là lúc REVIEW
Miễn là không có conflicts, thì có thể tự động hoá mọi thứ từ test, merge cho đến deploy đó!)


*Hết rùi ạ, thanks for reading~~*