Chào tất cả bà con, sau 1 thời gian vắng bóng mình lại quay lại đây, đợt vừa rồi bận quá nên cũng không chia sẻ được gì nhiều, thôi thì cũng đang có series về Deploy, thì mình làm luôn 1 bài về CI/CD bằng cách sử dụng CircleCI và Deployer mọi người nhé.

Như ae Sun thì có SunCI và nếu muốn setup để nghịch ngợm thì phải tầm keymember hoặc là leader trở lên mới có quyền fetch dự án về SunCI để test nên cũng khá bất cập. 

Nhưng đến với CircelCI thì mọi người build thoải mái nhé, chức năng và giao diện theo mình đánh giá còn sịn sò hơn SunCI nữa. Ok lan man thế thôi chúng ta bắt đầu thôi.

Để có thể làm được bài này đảm bảo mọi người đã hoặc từng làm qua những bài này:

+ [ [Backend] Deploy ứng dụng Laravel của bạn (P1)](https://viblo.asia/p/deploy-ung-dung-laravel-cua-ban-p1-gAm5y4zXldb)

+ [ [Backend]  Deploy ứng dụng Laravel của bạn (P2 - Phần cuối)](https://viblo.asia/p/deploy-ung-dung-laravel-cua-ban-p2-phan-cuoi-1Je5EO9AZnL)

+ [[Backend] Deploy dự án Laravel bằng Deployer](https://viblo.asia/p/backend-deploy-du-an-laravel-bang-deployer-1VgZv4bR5Aw)
+ [[Frontend] Cài đặt ESLINT cho dự án sử dụng Laravel và Vuejs](https://viblo.asia/p/frontend-cai-dat-eslint-cho-du-an-su-dung-laravel-va-vuejs-WAyK8pREKxX)

+ [  [Backend] PHP static code analysis tools](https://viblo.asia/p/php-static-code-analysis-tools-4dbZNxNy5YM)

+ [[Docker] Biết và sử dụng được docker](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-1-lich-su-ByEZkWrEZQ0)

+ [ [Docker] Setup Docker Hub](https://viblo.asia/p/docker-chua-biet-gi-den-biet-dung-phan-2-dockerfile-RQqKLzeOl7z)

+ [ Hiểu được CI/CD và DevOps là gì ?](https://viblo.asia/p/ci-cd-va-devops-07LKXYXDZV4)

1 option thêm nếu bạn muốn viết Test cho dự án của mình thì bạn cần phải có kinh nghiệm về UnitTest và IntegrationTest
+  [[Test] Giới thiệu về Laravel Testing](https://github.com/framgia/laravel-test-guideline/blob/master/vn/Introduction.md)
+  [[Test] Sample Laravel Project with Tests](https://github.com/framgia/laravel-test-examples)

> Thôi chốt lại để có thể làm tốt và hiểu được về CI/CD các bạn phải có khá là nhiều kinh nghiệm về Build Server, Auto deploy, Check convention JS,PHP, Config được Test trong dự án laravel, Biết sử dụng docker, build dockerhub ...

OK chuẩn bị kiến thức thể là đủ rồi, mình triển thôi =))
# Setup config.yml file
Để bắt đầu mọi người phải có 1 project (của mình là laravel), 2 là phải đang sử dụng Github hoặc Bitbucket nhé

Sau khi đã thỏa mã 2 điều kiện trên, trong folder root của project của bạn, bạn tạo 1 folder có tên là .circleci và bên trong đó tạo thêm 1 file config.yml. Sau khi tạo, thì cấu trúc folder của mình sẽ có dạng như sau:
![](https://images.viblo.asia/cc7ed31a-31b3-4cb6-9eeb-8150179c3f7b.png)

OK nội dung cơ bản của nó sẽ như sau

```php
version: 2
jobs:
  build_and_test:
    docker:
      - image: framgia/laravel-workspace
    steps:
      - checkout
      - run: cp .env.example .env

      # composer cache
      - restore_cache:
          keys:
            - vendor-v1-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v1-{{ checksum "composer.lock" }}
          paths:
            - vendor

      # run test
      - run: phpcs --standard=Framgia app
```
 Giải thích qua 1 vài syntax mn nhé
*   Gồm có 2 phần chính là docker và steps
    *   Đầu tiên bạn có thể thấy ở phần docker mình đang sử dụng một image có tên là **framgia/laravel-workspace**.  Đối với các bạn đã biết về Docker hay chưa biết về Docker thì đơn giản image giống như 1 cái hộp đã được cài một số thứ hỗ trợ chúng ta trong việc chạy test project như php, composer, git và tool dùng để kiểm tra convention cho php là phpcs cùng một vài tool khác. Nội dung cụ thể image bạn có thể xem ở [đây](https://github.com/FramgiaDockerTeam/laravel-workspace/blob/master/Dockerfile).
       
    * Tiếp đó phần steps là các bước lần lượt mà chúng ta sẽ chạy cho project của chúng ta, cụ thể:
        * checkout - Clone code từ github - đây là lệnh mặc định của CircleCI.
        * run: [lệnh] - Các lệnh cần thực hiện.
        * restore_cache - Khôi phục lại folder chứa cái package (vendor/) dựa trên file composer.lock
        * save_cache - Lưu lại folder vendor nesu file composer.lock bị thay đổi hay do bạn xóa hoặc thêm package mới.
        * Việc cache lại folder vendor giúp tăng tốc cho bản build của bạn cho những lần chạy sau vì thay vì phải install lại các package thì đầu thì ta có thể tái sử dụng lại folder vendor của bản build trước đó nếu file composer.lock không bị thay đổi.

Sau khi đã config xong thì ae push code lên repo nhé

# Init project 
Mọi người vào trang https://circleci.com/ sau đó login bằng github hoặc Bitbucket của mọi người nhé, mình dùng github cho quen nhé, sau khi login xong nó sẽ chuyển hướng đến trang dashboard là ok
![](https://images.viblo.asia/cee535d1-31c1-49cc-9e30-073b1ab1ae55.png)

Mọi người chọn  vào mục **ADD PROJECT** nhé
![](https://images.viblo.asia/7cfe38c1-910d-46de-9e15-e63ac1c0295c.png)
Sau đó chọn project cần Setup, Mọi người chọn project của mn nhé,  click vào button **Set up Project** nhé
![](https://images.viblo.asia/66addfc8-b7a8-4cec-baba-2c9aa52e06b5.png)

Vào màn hình này thì sẽ có chỗ chọn Hệ điều hành, ngôn ngữ, nó đã mặc định cho mình rồi, mình code PHP mà =)) Lúc này chọn **Start Building** là ok, chọn thì nó sẽ chuyển sang màn hình build, và nó sẽ chạy bản build đầu tiên

![](https://images.viblo.asia/cf85f31e-8a04-4904-8499-8a3fdc9fcc20.png)
Chờ nó build 1 tý mình ok
![](https://images.viblo.asia/791ce3c2-da47-43fb-aaa5-2d0bdc98f701.png)

Success rồi đúng không, phê lòi, lầu đầu mà mượt mà như thế là do mình đã chạy test phpcs trước ở dưới local rồi, còn nếu mn và bị fail thì click vào detail để xem nó fail cái gì để sửa rồi push lại nhé

Tỷ dụ như cái này bị fail eslint thì mình chỉ cần vào xem nó fail chỗ nào rồi sửa và push lại thôi
![](https://images.viblo.asia/c12dd185-8602-489b-aa1a-440cfc0edf15.png)
##   CI

OK như trên là mọi người đã có thể tự build 1 bản rồi, giờ thì check nhiều hơn nhé, check thêm ESLINT, TEST trong laravel nhé.
Mọi người update lại file config.yml nhé
```php
version: 2
jobs:
  build_and_test:
    docker:
      - image: framgia/laravel-workspace
      - image: mysql:5.7
        environment:
          MYSQL_HOST: 127.0.0.1
          MYSQL_DATABASE: homestead
          MYSQL_USER: homestead
          MYSQL_PASSWORD: secret
          MYSQL_ROOT_PASSWORD: root
    steps:
      - checkout
      - run: cp .env.testing.example .env.testing
      # composer cache
      - restore_cache:
          keys:
            - vendor-v1-{{ checksum "composer.lock" }}
      - run:  composer install
      - save_cache:
          key: vendor-v1-{{ checksum "composer.lock" }}
          paths:
            - vendor
      # Yarn
      - restore_cache:
          name: Restore yarn cache
          keys:
            - yarn-{{ checksum "yarn.lock" }}
            - yarn-
      - run: yarn
      - save_cache:
          paths:
            - node_modules
          key: yarn-{{ checksum "composer.json" }}

      - run:
          name: Check convention javarscript
          command: npm run eslint
      # run test
      - run: php artisan key:generate --env=testing
      - run:
          name: Check convention PHP
          command: phpcs --standard=Framgia app
      - run:
          name: Check connection database
          command: framgia-ci test-connect 127.0.0.1 3306 60
      - run: php artisan migrate --seed --env=testing
      - run:
          name: Check PhpUnit
          command: ./vendor/bin/phpunit
```
Để có thể chạy được Test trong laravel cần phải có 1 cái database để chạy test đúng ko , đó chính là lúc mn thêm cái image mysql:5.7 đấy 
```php
      - image: mysql:5.7
        environment:
          MYSQL_HOST: 127.0.0.1
          MYSQL_DATABASE: homestead
          MYSQL_USER: homestead
          MYSQL_PASSWORD: secret
          MYSQL_ROOT_PASSWORD: root
```
lúc này mọi người config vài cái biến môi trường để có thể kết nối được nhé, 
Bạn cần đảm bảo rằng trong file **.env.testing.example** của bạn cũng có phần khai báo cơ sở dữ liệu với các thông tin về host, tên database, username và password trùng với mục ta vừa thêm ở trên như sau:
```php
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```
Sau khi đã làm 2 việc trên, ta tiếp tục thêm  lệnh sau vào trong file .circleci/config.yml như sau nhé:
```
      - run:
          name: Check convention javarscript
          command: npm run eslint
      - run: php artisan key:generate --env=testing
      - run:
          name: Check convention PHP
          command: phpcs --standard=Framgia app
      - run:
          name: Check connection database
          command: framgia-ci test-connect 127.0.0.1 3306 60 
      - run: php artisan migrate --seed --env=testing
      - run:
          name: Check PhpUnit
          command: ./vendor/bin/phpunit
```
Mỗi câu lệnh run mình thêm 2 lệnh con đó là name và command để đến lúc build nó hiện thị name lên cho nó sịn thay vì là hiện thị câu lệnh ấy.
Trong đoạn này thì mình có cho thêm check convention của js bằng Eslint nhé.
```
      - run:
          name: Check convention javarscript
          command: npm run eslint
```
cái này mn phải đảm bảo trong projec mn đã setup eslint rồi nhé. Ai chưa tìm hiểu thì xem lại ở [đây](https://viblo.asia/p/frontend-cai-dat-eslint-cho-du-an-su-dung-laravel-va-vuejs-WAyK8pREKxX)

Để chạy được test chắc chắn file env của mn phải có key đúng không, thêm vào mà chạy thôi :v: 
```php
- run: php artisan key:generate --env=testing
```
Tiếp theo là check PHPCS theo chuẩn của [Framgia](https://viblo.asia/p/php-static-code-analysis-tools-4dbZNxNy5YM). mình thấy chuẩn này khá là ổn, nó chỉ bắt những convention cần thiết nhất. chứ theo full của psr2 .. thì nó bắt nhiều lắm, nào là viết doc cho function cho class ... đủ thứ trên đời. 
```php
      - run:
          name: Check convention PHP
          command: phpcs --standard=Framgia app
```
Tiếp theo là phần test connect với database xem đã ok chưa và chạy migrate

```php
      - run:
          name: Check connection database
          command: framgia-ci test-connect 127.0.0.1 3306 60
      - run: php artisan migrate --seed --env=testing
```
cái framgia-ci là 1 tool của Framgia, nó có sẵn trong cái image framgia/laravel-workspace mn nhé, nó là open source nên cứ lấy mà dùng thôi hihi

Phần cuối là  chạy test
```php
      - run:
          name: Check PhpUnit
          command: ./vendor/bin/phpunit
```
OK ngon hàng push lên rồi thử xem nó chạy như thế nào , mà nhớ mn thao tác cái này thì tạo 1 branch mới rồi push lên tạo pull compare với develop nhé
![](https://images.viblo.asia/a60b09ca-d04c-4784-be32-3628a2559e64.png)
    Sau khi đẩy lên nó build thì đang báo lỗi JS, ok xem lỗi và check dưới local và push lên thôi
   ![](https://images.viblo.asia/f4e887d3-600c-4451-9ccd-faa5da3368f9.png)
![](https://images.viblo.asia/8f5e4648-7c2b-453e-83ff-c1eb1b348983.png)

Xanh lè rồi đúng không, nhìn là đã muốn merged thôi =))

## CD
  Phần trên là setup CI ok rồi đúng không, sau khi check CI tất cả ok thì auto deploy thôi, =)) mình thấy cái phần CD của thằng này khá là ổn, trong file config mình có thể tùy biến được rất nhiều thứ, như CI pass thì phải approved mới được deploy lên môi trường Development, rồi có phần require chạy lần lượt, Deploy xong môi trường này mới được deploy môi trường khác,
  Giao diện để mình có thể hình dung được cách tiến trình của nó cũng khá trực quan .
  
  Ví dụ như 1 quy trình như này
  
![](https://images.viblo.asia/f39d2f2a-879c-41ad-a812-514356ace039.png)

Khi mọi người setup xong khi Circle build nó sẽ hiện rất trực quan và mỗi 1 job sẽ là 1 bản build
![](https://images.viblo.asia/9cea6369-60f1-4233-85c0-e0dc02d91dd8.png)

OK trên lý thuyết là thế , còn lại thì mình deploy cùng lắm là 1 - 2 môi trường thôi, như bài này thì mình chỉ auto deploy lên môi trường development thôi nhé

Để làm được đến đoạn này thì mọi người phải có
+ 1 Server đã setup đầy đủ để có thể chạy được project laravel rồi nhé
+ Đã config được deployer và đã deploy được lên server này.
Nếu ai chưa làm được thì thử làm qua 3 bài này đã nhé

    + [ [Backend] Deploy ứng dụng Laravel của bạn (P1)](https://viblo.asia/p/deploy-ung-dung-laravel-cua-ban-p1-gAm5y4zXldb)

    + [ [Backend]  Deploy ứng dụng Laravel của bạn (P2 - Phần cuối)](https://viblo.asia/p/deploy-ung-dung-laravel-cua-ban-p2-phan-cuoi-1Je5EO9AZnL)

    + [[Backend] Deploy dự án Laravel bằng Deployer](https://viblo.asia/p/backend-deploy-du-an-laravel-bang-deployer-1VgZv4bR5Aw)
    
 Ai đã từng setup server thì để biết 1 cách để có thể truy cập vào server thì có thể thông qua ssh-key đúng không, thằng Circle này cũng vậy, muốn auto deploy được thì mình phải cho phép thằng CircleCI này ssh vào được server đúng không,
 thế thì mình làm như sau nhé
 
 > Mọi người copy cái private key ở thư mục **~/.ssh/id_rsa** ở máy local của mọi người và paste cái này cùng  với hostname của server  vào SSH Permission trong phần setting của project trên CircleCI nhé.
 > 
 > Mọi người có thể đọc kỹ ở [đây](https://circleci.com/docs/2.0/gh-bb-integration/) nhé

![](https://images.viblo.asia/3d0078a1-c380-4f28-bf90-adf18b44d041.png)

 sau đó copy nhém vào phần modal như bên dưới
![](https://images.viblo.asia/e12bcef2-a400-429e-86ab-0e3700762885.png)

sau khi add ssh key thì nó sẽ gen cho mn 1 cái mã, lúc này mn config lại file config.yml nữa là ok

Của mình là private nên ứ show lên cho mn xem đâu hehe, Sau khi đã add ok thì mình chỉnh lại file config.yml tý nhé
```php
 deploy_development:
    docker:
      - image: framgiaciteam/deb-deploy:7.3
    steps:
      - add_ssh_keys:
          fingerprints:
            - "e9:93:45:b9:d9:88:ae:b7:b3:e3:66:bf:d2:2e:7c:6f"
      - checkout
      - run:
          name: Deploy Develop to development
          command: |
            if [ -z `ssh-keygen -F '34.66.101.233'` ]; then
              ssh-keyscan -H '34.66.101.233' >> ~/.ssh/known_hosts
            fi
            dep deploy -vv
```
Để có thể deploy được trên circle CI thì phải đảm bảo là dưới máy local của mọi người đã deploy bằng deployer ok rồi nhé. lúc này file known_hosts nó sẽ lưu thông tin những host mà đã deploy vào.

Giờ circel CI  chì cần có cái private của máy các bạn là có thể giả định là máy của mn và có thể ssh vào server để deploy được.
Đây chính là đoạn check xem đã ssh được vào server chưa (Như SunCI thì sẽ gen cho mình có 1 cái ssh key public luôn, mình chỉ cần nhém cái  sshkey đấy vào file **authorized_keys**  là được , nhưng Circle không có gen cho mình thì mình cần phải lấy cái private key của máy local của mình để gỉa định thôi ).
 ```
   if [ -z `ssh-keygen -F '34.66.101.233'` ]; then
         ssh-keyscan -H '34.66.101.233' >> ~/.ssh/known_hosts
   fi
 ```
Thêm 1 phần deploy development vào phần job nhé, trong này sẽ có 1 cái image  framgiaciteam/deb-deploy:7.3 , cái này mình cứ dùng của Sun, mọi người rảnh có thể tự build cái image make by me cho sịn sò cũng được , Và cuối dùng chạy câu lệnh deployer thôi 
```
 command: dep deploy -vv
```
Ok thế là ổn rồi, còn deployer config như nào thì mn xem ở bài mà mình đã note ở trên nhé.

Thằng Cicle này nó có 1 chức năng là chạy theo workflows, ở cái workflow này mình muốn thằng nào chạy thì nó chạy, hay là đặt điều kiện là thằng này pass thằng kia mới được chạy khá là hay, 
```php
workflows:
  version: 2
  build-and-deploy:
    jobs:
      - build_and_test
      - deploy_development:
          requires:
            - build_and_test
          filters:
            branches:
              only: develop
```
Qua đoạn này thì dân chơi nhìn phát đoán ngay là làm gì đúng không, đó là ta sẽ chạy job

chạy thằng **build_and_test** => **deploy_development** (Yêu cầu thằng **build_and_test** phải pass tất cả rồi mới được chạy thằng deploy, và ở thằng deploy này chỉ chạy khi code được update ở nhánh develop)
 
 . OK ngon hàng, đẩy code lên nào , mọi người để lên cái nhánh mn đang code, chờ nó pass hết thì merged vào develop nhé.
 Khi merged vào thì nó sẽ có 1 bản build
 
 ![](https://images.viblo.asia/e0076acc-d65d-4b51-a88f-483d875c5b45.png)
Bản build này chỉ là để check convention và chạy Test thôi

![](https://images.viblo.asia/3d9d1392-0359-4bbb-bd7f-c08bc1c18b07.png)

Khi bản build đấy ngon thì nó sẽ chạy job auto deploy

![](https://images.viblo.asia/e9719f0b-18e3-4163-8955-4f45a2c4c50a.png)

Mọi người click vào chỗ running kia thì sẽ nhìn thấy 2 cái job của mn đã config sẵn

![](https://images.viblo.asia/3dcfe1a7-3f12-487e-a9e2-933f7e75cc0c.png)

Thế là xong. chờ bản build kia chạy pass là ngon ăn thôi, làm cốc cafe để tận hưởng nào.

> Ở thằng này mình thích nhất là đoạn approved, ví dụ như auto deploy lên production hoặc là một môi trường nào đấy mà cần phải suy nghĩ chẳng hạn thì chức năng này khá hợp lý
> 

Ta chỉ cần thêm đoạn code này vào file config thôi

```php
      - build_and_test
      - hold_for_approval:
          type: approval
          requires:
          - build_and_test
```
Rồi push lên để cảm nhận nhé: Lên xem bản build nó sẽ như thế này
![](https://images.viblo.asia/1170f9ed-18c3-4234-88c6-a64df0b09be7.png)

Chờ build test xong, pass thì nhảy sang job, chờ mình appprove, nếu mình chọn approved thì mới được sang job deploy hehe
![](https://images.viblo.asia/de0e1a39-2373-448f-96db-8432caa1ff15.png)

Lên hình và cảm nhận nhé
# Notification
Phần notification thì nó support slack chứ chưa có chatwork nên mình ko config nữa, mọi người thử xem thế nào nhé. :v: 

Thôi thì minh cũng hướng dẫn luôn, như bình thường thì chỉ cần báo noti về box là khi build pass hoặc fail thôi đúng không, ok mọi người sửa lại file .yml 1 tý nhé

```
 - run:
          name: Sending notification
          when: on_fail
          command: |
            if [[ true ]];  then
              curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
                "body=[To:2359460]
                [info][title]Build $CIRCLE_BUILD_NUM - FAIL[/title]
                Repo: $CIRCLE_PROJECT_REPONAME
                Author: $CIRCLE_USERNAME
                Branch: $CIRCLE_BRANCH
                Build link: https://circleci.com/gh/tranvanmy/RemindBot/$CIRCLE_BUILD_NUM
                [/info]" \
                "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM_ID/messages"
            fi
      - run:
          name: Sending notification
          when: on_success
          command: |
            if [[ true ]];  then
              curl -X POST -H "X-ChatWorkToken: $CHATWORK_TOKEN" -d \
                "body=[To:2359460]
                [info][title]Build $CIRCLE_BUILD_NUM - SUCCESS[/title]
                Repo: $CIRCLE_PROJECT_REPONAME
                Author: $CIRCLE_USERNAME
                Branch: $CIRCLE_BRANCH
                Build link: https://circleci.com/gh/tranvanmy/RemindBot/$CIRCLE_BUILD_NUM
                [/info]" \
                "https://api.chatwork.com/v2/rooms/$CHATWORK_ROOM_ID/messages"
            fi
```
Phần này mọi người cho vào cuối của mỗi job muốn bắn noti là được.
Có 1 vài biến như $CHATWORK_TOKEN , $CHATWORK_ROOM_ID để tránh bị lộ thông tin thì mọi người config trong phần  Enviroment Variables là được nhé.
![](https://images.viblo.asia/9cb8312d-48e6-494e-ac51-f18850e6e98f.png)

Còn những biến như $CIRCLE_PROJECT_REPONAME, $CIRCLE_USERNAME .. là mặc định của Circle CI . mọi xem qua ở đây nhé: https://circleci.com/docs/2.0/env-vars/

Khi build pass hoặc fail thì có noti ngay 

![](https://images.viblo.asia/4389383d-cd43-442b-8b17-61fb0633ee95.png)

# Kết Luận
Ok bài này của mình đến đây thôi, ai mà đọc đến đây thì mn  cũng khá là kiên trì đấy ạ, vì để có thể thao tác được bài này , có thể setup được ngon lành thì kiến thức của các bạn cũng phải thuộc dạng hầm hố rồi  =)) 

Đợt này mình đang làm series về CI/CD . bài sau mình làm 1 bài về autodeploy với github action nhé, 1 công cụ của github cũng mới phát triển nhé