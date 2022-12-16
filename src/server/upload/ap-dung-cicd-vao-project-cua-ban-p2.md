## 1. Mở đầu
<hr>

Ở bài viết [trước](https://viblo.asia/p/ap-dung-cicd-vao-project-cua-ban-p1-gDVK2Q8e5Lj) mình đã giới thiệu cho các bạn về CircleCI cũng như cách setup project của mình trên CircleCI. Trong bài phần này mình sẽ hưỡng dẫn các bạn nốt hai phần còn lại đó là `Notification` và `Auto Deploy`. Nào chúng ta cùng bắt đầu :D.

## 2. Notification
<hr>

Với một bản build mà chúng ta vừa thực hiện ở trên, thời gian mỗi bản build chỉ có vài chục giây nên ta hoàn toàn có thể ngồi đợi bản build đó chạy xong và xem kết quả. Tuy nhiên với project lớn hơn, thời gian build sẽ có thể lên đến vài phút thậm chí vài chục phút mà chúng ta cứ nhìn ngồi nhìn màn hình thì sẽ hơi tốn thời gian. Thay vào đó, ta có thể sử dụng tính năng notification để gửi thông báo mỗi khi có bản build thành công hoặc thất bại để trong lúc chờ bản build ta có thể làm việc khác. Ở đây mình sẽ hướng dẫn các bạn gửi notification qua 2 kênh là [Slack](https://slack.com/) và [Chatwork](https://www.chatwork.com).
### 2.1 Slack
Đối với việc gửi notification qua slack khá đơn gian vì CircleCi đã hỗ trợ nó rồi. Để config notification cho Slack, ở màn hình danh sách các bản build bạn chọn icon hình bánh răng để vài phần setting cho project của bạn:

![](https://images.viblo.asia/8f7a0329-8d57-467e-a941-d098d626a4df.png)

Tiếp đỏ ở thanh menu bên tay phải bạn chọn phần `Chat Notifications` trong mục **NOTIFICATIONS**. Như bạn có thể thấy CircleCI đã hỗ trợ một số ứng dụng khác trong đó có Slack:

![](https://images.viblo.asia/c7572fd0-f998-478a-a9d0-442686373f6a.png)

Bạn lấy thông tin `channel` và `webhook` từ bên slack của bạn (hướng dẫn ở đây [đây](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)) và sau đó điền các thông tin đó vào CircleCI. Sau đó ta chọn `Save` và thử gửi 1 pull/push request sẽ nhận được kết quả như sau:

![](https://images.viblo.asia/819e6adc-ca8f-4a20-9340-45d7c9503fed.png)

### 2.2 Chatwork
Mặc dù CircleCI không hỗ trợ Chatwork sẵn tuy nhiên, do mình làm việc chủ yếu trên Chatwork nên mình cũng đã tìm cách để có thể gửi được notification lên chatwork. Mục tiêu mà chúng ta hướng đến cũng giống như với bên Slack là có thể thu nhận lại được một số thông tin về bản build như sau:
- Tên repository
- Người tạo bản build
- Tên branch
- Link dẫn tới commit/pullrequest đó trên github (hoặc bitbucket)
- Link dẫn tới bản build đó trên CircleCI
Để làm được điều này, chúng ta sẽ sử dụng API mặc định của Chatwork cung cấp. Cụ thể bạn có thể tham khảo danh sách các API ở [đây](http://link.chat-work.com/api_doc). Để có thể thao tác được với API của Chatwork, trước tiên chúng ta cần có một tài khoản Chatwork và lấy API từ tài khoản đó để sử dụng. Mình đã tạo sẵn thêm 1 tài khoản Chatwork khác và sử dụng token của nó, bạn có thể lấy token bằng cách bấm vào phần tên của mình ở góc trên bên trái trong Chatwork và chọn API setting sau đó nhập lại password để lấy được token.

![](https://images.viblo.asia/909af8fb-38ee-4fa3-b0b3-d856f7a7098a.png)

![](https://images.viblo.asia/ed254d3b-4d2b-43c4-8305-f2e44fc300c6.png)

![](https://images.viblo.asia/df00abe3-310c-4997-ad7c-6b7b9426e8f9.png)

Sau khi đã lấy được Chatwork token, ta sẽ thêm nó vào danh sách các biến môi trường để có thể sử dụng trong file `config.yml` mà vẫn đảm bảo được tính bí mật. Đầu tiên ta vào phần setting của project trên CirclCI:

![](https://images.viblo.asia/44cc0d58-d0ec-4dab-bf3b-64b8194e3618.png)

Tiếp đó trong trang setting, ta chọn mục `Enviroment Variables` và chọn `Add Variable`:

![](https://images.viblo.asia/0bcf6c21-eb92-4236-b27e-897f3e672008.png)

Cuối cùng ta nhập tên của biến đi kèm với đó là giá trị tương ứng và chọn `Add Variable` để lưu lại biến:

![](https://images.viblo.asia/29c6a9c2-a1f8-4d4d-8741-bf27194c6106.png)

Với mỗi biến mà ta khai báo ở đây ta có thể sử dụng chúng trong file `config.yml` bằng cách sử dụng tên biến bạn đặt kết hợp với kí tự `$` ở đầu. Ví dụ ở trên mình đặt tên biến là `CHATWORK_TOKEN` thì trong file `config.yml` sẽ sử dụng là `$CHATWORK_TOKEN`. Chú ý bạn nên đặt tên các biến môi trường dưới dạng chữ hoa để tránh nhầm lẫn với các lệnh khác trong file `config.yml`. Tiếp sẽ tạo 1 room chat mới với tài khoản chính của mình và tài khoản vừa tạo ở trên rồi lấy id của phòng đó khai báo tiếp trong phần `Enviroment Variables`. Đây là kết quả sau khi mình đã tạo xong 2 biến môi trường:

![](https://images.viblo.asia/908d7117-9c1c-4504-9de0-f16971535a12.png)

Tiếp tới chúng ta sẽ mở lại file `config.yml` trong project của chúng ta lên và thêm phần sau vào cuối file:
```yaml
...
# Send notification to chatwork
- run:
    name: Sending notification
    command: |
      if [[ true ]];  then
        curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
          "body=Test message" \
          "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM/messages"
      fi
```
Do trong file `config.yml` không cho phép chúng ta viết trực tiếp lệnh curl như trên nên ta sẽ bọc nó vào với điều kiện if của cú pháp bash. Như bạn thấy ở trên ta dùng `$CHATWORK_TOKEN`và `$CHATWORK_ROOM` để đặt phần token vào header và room id vào phần lời gọi API. Với lệnh trên sau khi chạy `"thành công"` các lệnh trước đó là:
```yaml
# run test
- run: php artisan key:generate
- run: framgia-ci test-connect 127.0.0.1 3306 60
- run: php artisan migrate
- run: framgia-ci run --local
```
Thì nó sẽ gửi lại message trên về room mà chúng ta đặt như trên. Bây giờ chúng ta hãy lưu lại các thay đổi sau đó push lại lên github để kiểm tra kết quả của:

![](https://images.viblo.asia/c2092636-35e9-488d-951f-b6ab6aa747b5.png)

*Lưu ý: lệnh gửi notification này cũng được thực hiện trong container với image mà chúng ta đã khai báo vì thể để dùng được curl thì bạn phải chắc rằng trong image đó đã cài curl.*<br><br>

Như bạn có thể thấy, ở đây sau khi chạy xong lệnh `framgia-ci run --local` thì sẽ đến lệnh gửi thông báo lên chatwork room mà chúng ta đã đăng kí và nếu gửi thành công bạn sẽ thấy mục `message_id` như trong hình. Còn đây là thông báo mà ta nhận được trên chatwork:

![](https://images.viblo.asia/fe8cc505-a33c-48a6-aa35-92bec8a7fa6c.png)

Phần nội dung tin nhắn, bạn có thể điền bất cứ nội dung gì giống như chatwork tuy nhiên ở đây để lấy được các thông tin mà mình đã đề cập đến ban đầu thì chúng ta cần sử dụng thêm các biến môi trường mặc định của bản build mà CircleCI hỗ trợ. Danh sách cụ thể các biến bạn có thể xem ở [đây](https://circleci.com/docs/2.0/env-vars/#built-in-environment-variables). Ứng với mỗi yêu cầu ban đầu mà ta đặt ra, đây là các biến mà ta sẽ lấy:
<br>
   - Tên repository: `$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME`
   - Người tạo bản build: `$CIRCLE_USERNAME`
   - Tên branch: `$CIRCLE_BRANCH`
   - Link dẫn tới commit/pullrequest đó trên github: `https://github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/commit/$CIRCLE_SHA1`
   - Link dẫn tới bản build đó trên CircleCI: `https://circleci.com/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_BUILD_NUM`

Với những thông tin trên ta có thể cập nhật lại phần message cho chatwork notification trong file `config.yml` như sau:
```yaml
# Send notification to chatwork
      - run:
          name: Sending notification
          command: |
            if [[ true ]];  then
              curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
                "body=
                - Repository name: $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME
                - Author: $CIRCLE_USERNAME
                - Branch: $CIRCLE_BRANCH
                - Commit/pull request link: https://github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/commit/$CIRCLE_SHA1
                - Build link: https://circleci.com/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_BUILD_NUM
                " \
                "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM/messages"
            fi
```
Sau đó lưu lại và thử push lại lên và đây là kết quả ta thu được ở chatwork:

![](https://images.viblo.asia/35d5bdbb-4fb6-45b0-90d9-c30fb97eb554.png)

Tuy nhiên ở đây vẫn còn 2 vấn đề mà ta cần giải quyết như sau:
<br>
- Notification trả về không hề có thông tin về bản build đó thành công hay thất bại vì CircleCI không cung cấp cho chúng ta biến này
- Notification chỉ trả về khi các lệnh trước đó thành công, nếu một trong cách lệnh trước đó thất bại thì sẽ không có thông báo trả về

Để giải quyết 2 vấn đề nêu trên, chúng ta sử dụng một lệnh hỗ trợ mà CircleCI cung cấp sẵn cho chúng ta đó là `when`. Lệnh hỗ trợ này sẽ đi kèm với lệnh chính của chúng ta dưới dạng sau:
```yaml
- run:
    name: Do something
    when: <option>
    command: |
      echo "Hello"
```
Lệnh `echo "Hello"` sẽ thực hiện khi đáp ứng `<option>` mà chúng ta khai báo trong `when`. Cụ thể, CircleCI cung cấp 3 option đó là `on_success`, `on_fail` và `always` tương ứng với khi bản build thành công, khi bản build bị lỗi hoặc luôn luôn. Mặc định khi bạn không khai báo gì nó sẽ có giá trị là `on_success`. Như vậy áp dụng lệnh `when` vào phần notification của chúng ta sẽ được kết quả như sau:
```yaml
# Send notification to chatwork
      - run:
          name: Sending notification
          when: on_success
          command: |
            if [[ true ]];  then
              curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
                "body=
                Your have a success build !
                - Repository name: $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME
                - Author: $CIRCLE_USERNAME
                - Branch: $CIRCLE_BRANCH
                - Commit/pull request link: https://github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/commit/$CIRCLE_SHA1
                - Build link: https://circleci.com/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_BUILD_NUM
                " \
                "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM/messages"
            fi
      - run:
          name: Sending notification
          when: on_fail
          command: |
            if [[ true ]];  then
              curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
                "body=
                Your have a fail build !
                - Repository name: $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME
                - Author: $CIRCLE_USERNAME
                - Branch: $CIRCLE_BRANCH
                - Commit/pull request link: https://github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/commit/$CIRCLE_SHA1
                - Build link: https://circleci.com/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_BUILD_NUM
                " \
                "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM/messages"
            fi
```
Như vậy với mỗi trường hợp bản build thành công hay thất bại ta cũng sẽ gửi được notification về chatwork với nội dung chỉ khác nhau ở phần `You have a success/fail build !`.

## 3. Auto deploy với Heroku
<hr>

Mặc định CircleCI cũng hỗ trợ cho chúng ta sẵn việc auto deploy project lên Heroku. Đầu tiên bạn cần tạo 1 project trên Heroku. Sau đó bạn vào phần [account setting](https://dashboard.heroku.com/account) rồi lăn xuống phần API key, bấm `Reveal` và copy lại nó:

![](https://images.viblo.asia/d433a135-23f6-401e-898d-6b46856d4eaa.png)

Tiếp theo bạn vào lại phần `Enviroment Variables` của project trên CircleCI và thêm vào dưới dạng với tên là `HEROKU_API_KEY`. Tiếp đến bạn thêm một biến nữa có tên là `HEROKU_APP_NAME` có giá trị là tên mà bạn đặt cho project của mình trên Heroku. Cuối cùng trong file `config.yml` bạn thêm một mục mới, tách biệt với mục ban đầu như sau:
```yaml
version: 2
jobs:
  build:
    docker:
      - image: 7896/civ3-workspace:2.0
      - image: mysql:5.7
        environment:
          MYSQL_HOST: 127.0.0.1
          MYSQL_DATABASE: homestead
          MYSQL_USER: homestead
          MYSQL_PASSWORD: secret
          MYSQL_ROOT_PASSWORD: root
    steps:
      - checkout
      - run: cp .env.example .env

      # composer cache
      - restore_cache:
          keys:
            - vendor-v2-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v2-{{ checksum "composer.lock" }}
          paths:
            - vendor

      # run test
      - run: php artisan key:generate
      - run: framgia-ci test-connect 127.0.0.1 3306 60
      - run: php artisan migrate
      - run: framgia-ci run --local

      # Send notification to chatwork
      - run:
          name: Sending notification
          when: on_success
          command: |
            if [[ true ]];  then
              curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
                "body=
                Your have a success build !
                - Repository name: $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME
                - Author: $CIRCLE_USERNAME
                - Branch: $CIRCLE_BRANCH
                - Commit/pull request link: https://github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/commit/$CIRCLE_SHA1
                - Build link: https://circleci.com/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_BUILD_NUM
                " \
                "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM/messages"
            fi
      - run:
          name: Sending notification
          when: on_fail
          command: |
            if [[ true ]];  then
              curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
                "body=
                Your have a fail build !
                - Repository name: $CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME
                - Author: $CIRCLE_USERNAME
                - Branch: $CIRCLE_BRANCH
                - Commit/pull request link: https://github.com/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/commit/$CIRCLE_SHA1
                - Build link: https://circleci.com/gh/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/$CIRCLE_BUILD_NUM
                " \
                "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM/messages"
            fi
            
  deploy-heroku:
    docker:
      - image: buildpack-deps:trusty
    steps:
      - checkout
      - run:
          name: Deploy to Heroku
          command: |
            git config --global push.default current
            git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_NAME.git develop:master -f
```
Chú ý lúc nào trong file `config.yml` của bạn sẽ có 2 mục chính đó là `build` và `deploy-heroku`. Bạn có thể hiểu đây là 2 công việc hay 2 job khác nhau. `Build` là job dùng để chạy test cho project của chúng ta còn `deploy-heroku` là job chịu trách nhiệm cho việc deploy lên heroku. Ở trên là cấu trúc mẫu mà CircleCI cung cấp cho chúng ta trong việc deploy với Heroku tuy nhiên ở phần cuối mình có thêm đoạn `develop:master -f` cho phép chúng ta có thể đẩy code từ nhánh develop vào nhánh master trên Heroki bởi mặc định Heroku sẽ deploy ở nhánh master mà thôi. Sở dĩ mình làm vậy bởi có thể bạn sẽ sử dụng Heroku làm server dev còn VPS làm server product nên việc merge code hay push code ở develop sẽ được deploy lên Heroku còn master sẽ lên VPS.

Cuối cùng để chạy được cả 2 job trên ta cần tạo ra 1 `workflow` hay 1 luồng chạy với cú pháp như sau:
```yaml
version: 2
jobs:
  build:
    ...
    
 deploy-heroku:
   ...

workflows:
  version: 2
  build-n-deploy:
    jobs:
      - build
      - deploy-heroku:
          requires:
            - build
          filters:
            branches:
              only:
                - develop
```

`Workflow` mà chúng ta mới thêm ở trên rất đơn giản, nội dung chính sẽ bắt đầu sau chữ `jobs`. Cụ thể ta sẽ chạy job `build` mà chúng ta khai báo ở trên sau đó mới chạy job `deploy-heroku`. Tuy nhiên khác với job `build` sẽ chạy mặc định thì với job `deploy-heroku` ta có một số điều kiện sau đó là:
    
   - `requires`: Chỉ chạy sau khi job `build` thành công nghĩa là bản build của chúng ta success và không có lỗi gì. Bạn có thể thêm nhiều job khác và có thể thêm vào phần `requires` như mình làm ở trên để đảm bảo tất cả các job trong danh sách đó đều phải thành công trước khi chạy job này
   - `filters/branches`: Chỉ áp dụng với branch develop hay chính xác là chỉ chạy job này khi thao tác push/merge code diễn ra trên nhánh develop.

Sau khi sửa lại xong bạn có thể thử đẩy lại code lên. Lúc này trên CircleCI bạn sẽ thấy nó xuất hiện trong phần `workflow`:

![](https://images.viblo.asia/02d7503d-29a9-4365-907f-6ca500a1d3ff.png)

Trên đây là 2 lần chạy `workflow` một lần thất bại và một lần thành công ở job `build`. Cả 2 trường hợp ta đều chạy với branch develop trên github. Cụ thể với trường hợp thất bại ta bấm vào `workflow` đó sẽ thu được kết quả như sau:

![](https://images.viblo.asia/215fbb09-6dfa-409d-97ac-64e361904b12.png)

Do phần chạy job `build` thất bại nên job `deploy-heroku` sẽ không được chạy. Còn đối với lần chạy job `build` success kết quả sẽ như sau:

![](https://images.viblo.asia/632e632a-23ff-459c-8325-562e2af4595b.png)

Như bạn có thể thấy ở đây khi job `build` chạy success sẽ tiếp tục chạy đến jon `deploy-heroku`. Bạn cũng có thể bấm vào job mình muốn để xem được log như các bản build thông thường:

![](https://images.viblo.asia/60567fb1-fbb9-4587-809b-0bddb8a84bc0.png)

## 4. Hạn chế khi sử dụng CircleCI
<hr>

Như mình đã nói ở bài viết trước, mặc dù CircleCI cung cấp cho chúng ta rất nhiều lợi ích tuy nhiên nếu bạn sử dụng plan-free thì có một số lưu ý:
- Đối với project dạng open source/ public repo thì bạn có thể sử dụng khá thoải mái và có thể chạy tới 4 bản build song song cùng với các tiện ích khác như lưu trữ file log, xem thống kê project
- Đối với project dạng private thì có khá nhiều hạn chế như bạn không thể xem thống kê project và số bản build song song bị giới hạn chỉ còn 1 mà thôi. Nghĩa là khi có 2 người cùng gửi pull request thì CircleCI sẽ chạy từng bản build một và bản build đến sau phải nằm trong hàng chời bản build thứ nhất chạy xong mới tiếp tục thực hiện. Điều này sẽ trở nên khá phiền phức nếu project của bạn mất từ 10-15p cho một bản build và số lượng dev nhiều dẫn đến mọi bạn build sẽ phải chờ nhau làm giảm hiệu quả công việc. Bạn cũng có thể giải quyết vấn đề trên bằng cách up lên plan trả phí. Tuy nhiên chi phí trên CircleCI khá cao với khoảng 150\$ /tháng cho 4 bản build chạy song song như plan free.

## 5. Kết bài
<hr>

Qua hai bài viết của mình về CircleCI, mong rằng có thể giúp ích cho bạn trong quá trình làm việc thường ngày của mình. Nếu bạn có bất cứ thắc mắc gì hãy comment ở phía dưới và nhớ upvote cho bài viết của mình :D. Cảm ơn bạn đã đọc !!!