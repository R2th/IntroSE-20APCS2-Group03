# Giới thiệu
Trong bài viết này, chúng ta sẽ tìm hiểu về hệ thống CI trên gitlab.com và tích hợp vào một project Laravel để tự động quá trình build, test pull request: check convention, chạy phpunit... Các cấu hình cơ bản, cách optimze để tăng tốc quá trình build...

# Luồng hoạt động
Để bắt đầu, chúng ta sẽ tạo một repository trên gitlab.com và khởi tạo Laravel 6.0:
```bash
composer create-project --prefer-dist laravel/laravel:6 demo-ci-laravel
cd demo-ci-laravel
git init
git remote add origin git@gitlab.com:pht/demo-ci-laravel.git
git add .
git commit -m "Initial commit"
git push -u origin master
```

Flow cơ bản của CI:
![](https://images.viblo.asia/cafbc7f4-decc-4a3b-bb4c-f6cc6d95db63.png)

Cụ thể hơn, ở bài này chúng ta sẽ cần chạy `phpcs` và `phpunit` để test pull request:
- `phpcs` để đảm bảo convention
- `phpunit` để chạy unit test
![](https://images.viblo.asia/0efed84b-ceb9-49ca-9825-d303510797eb.png)

# Định nghĩa Job
Sau bước init, tiếp theo chúng ta sẽ tiến hành config để chạy Gitlab CI bằng cách tạo **`.gitlab-ci.yml`** và push file này lên repository, Gitlab sẽ đọc và thực hiện các câu lệnh theo chỉ dẫn trong file này.

Bắt đầu bằng file config đơn giản như sau:
```yml:.gitlab-ci.yml
image: framgia/laravel-workspace

list-files:
  script:
    - pwd
    - ls -a
```

Gitlab CI sẽ chạy test trong một Docker container và dòng config đầu tiên chính là để khai báo Docker image dùng để tạo container.
```yml
image: framgia/laravel-workspace
```
Image chúng ta sử dụng ở đây là [framgia/laravel-workspace](https://hub.docker.com/r/framgia/laravel-workspace).

Các dòng còn lại dùng để định nghĩa 1 **job**.
> Mỗi khi có sự kiện push lên repository, Gitlab CI sẽ tạo ra 1 **pipeline**, 1 pipeline bao gồm 1 hoặc nhiều job và các job chạy song song và độc lập với nhau.
> 
> Dựa vào tính năng này chúng ta có thể tăng tốc quá trình chạy CI bằng các tách ra các job riêng biệt để chạy song song.
> 
Với mục đích để test cách hoạt động của Gitlab CI, mình định nghĩa 1 job gọi là `list-files` chỉ đơn giản là để xem câu lệnh được CI chạy trong thư mục nào, các bạn có thể xem kết quả chạy CI ở [đây](https://gitlab.com/pht/demo-ci-laravel/-/jobs/300961102):
```bash
Running with gitlab-runner 12.3.0-rc1 (afb9fab4)
  on docker-auto-scale 72989761
Using Docker executor with image framgia/laravel-workspace ...
Pulling docker image framgia/laravel-workspace ...
...
Initialized empty Git repository in /builds/pht/demo-ci-laravel/.git/
Created fresh repository.
From https://gitlab.com/pht/demo-ci-laravel
 * [new branch]      basic_ci_config -> origin/basic_ci_config
Checking out 3d0ccad1 as basic_ci_config...
...

$ pwd
/builds/pht/demo-ci-laravel

$ ls -a
.
..
app
composer.json
composer.lock
...
.gitlab-ci.yml
package.json
phpunit.xml
...
tests
webpack.mix.js

Job succeeded
```
Ok, có thể thấy Gitlab thực hiện fetch code từ commit (pull request, branch) vào một thư mục và thực hiện chạy lệnh trong thư mục này.

# PHPCS và PHPUnit
Bây giờ chúng ta sẽ thực hiện config để chạy phpcs, thay đổi file config như sau:
```yml:.gitlab-ci.yml
image: framgia/laravel-workspace

list-files:
  script:
    - pwd
    - ls -a

phpcs:
  script:
    - phpcs --standard=Framgia app/
```
> `phpcs` và standard `Framgia` đã được cài sẵn trong docker image `framgia/laravel-workspace`
> 

Lần này thì có 2 job được define và khi push lên chúng ta sẽ có 2 job được [chạy song song](https://gitlab.com/pht/demo-ci-laravel/pipelines/83672930/builds):
![](https://images.viblo.asia/7e50a486-bc64-4258-ac55-ea097ca32b2c.png)

Các bạn có thể thấy 1 job có thể chạy nhiều lệnh như `pwd` và `ls -a`, nhưng các lệnh này là chạy tuần tự, tức là lệnh này chạy xong thì mới chạy lệnh tiếp theo. Khác với các job có thể chạy song song. Vì thế khi các lệnh không phụ thuộc vào nhau, chúng ta có thể tách ra thành job riêng biệt để tăng tốc quá trình build. Tuy nhiên, cũng phải hạn chế tạo quá nhiều job để tiết kiệm tài nguyên server.

Chẳng hạn với Laravel (PHP) chúng ta thường chạy các [Static Code Analyse Tools](https://viblo.asia/p/php-static-code-analysis-tools-4dbZNxNy5YM) như `phpcs`, `phpmd`, `phpcpd`, `phpmetrics`, `phpstan` và unit test `phpunit`. Ở đây chúng ta focus vào 2 tools là `phpcs` và `phpunit`, để chạy được `phpunit` thì chúng ta cần phải cài composer dependencies, nếu có integration test thì cần phải chạy npm nữa, còn `phpcs` thì không. Do đó ở đây chúng ta sẽ define ra 2 job riêng biệt. Update ci config như sau:
```yml:.gitlab-ci.yml
image: framgia/laravel-workspace

phpcs:
  script:
    - phpcs --standard=Framgia app/

phpunit:
  coverage: '/^\s*Lines:\s*\d+.\d+\%/'
  script:
    - cp .env.testing.example .env
    - composer install
    - php artisan key:generate
    - yarn install
    - yarn dev
    - php ./vendor/bin/phpunit --coverage-text --colors=never
```
Vì thường có cả unit test và integration test nên cần phải generate key và install npm dependency.

Khi chạy job phpunit, Gitlab CI sẽ parse output để lấy ra coverage % (dòng `Lines:   41.82% (23/55)`):
![](https://images.viblo.asia/6f7b4ec3-e100-4719-a2ce-e846ea5e026b.png)

Và kết quả sẽ được hiển thị trên tab `Jobs` của pipeline detail:
![](https://images.viblo.asia/fd9ac8fe-4e5e-4de5-845f-10edf6023570.png)

Hoặc có thể hiển thị bằng markdown:
[![coverage report](https://gitlab.com/pht/demo-ci-laravel/badges/basic_ci_config/coverage.svg)](https://gitlab.com/pht/demo-ci-laravel/commits/basic_ci_config)
```md
[![coverage report](https://gitlab.com/pht/demo-ci-laravel/badges/master/coverage.svg)](https://gitlab.com/pht/demo-ci-laravel/commits/master)
```

# Optimize 
## phpcs
PHPCS là công cụ để đảm bảo convention của dự án, do đó các cấu hình cũng nên được đảm bảo giống nhau giữa các developer, tức là phải có 1 file config chung cho cả dự án. Chẳng hạn, mặc định chúng ta muốn check convention ở 3 folder `app/`, `config/` và `resources/lang` hoặc muốn ignore các warning (VD: độ dài dòng code vượt quá 120 ký tự thì chỉ báo warning và coi như không ảnh hưởng đến kết quả build cuối cùng là failed hay success)...
Và PHPCS cũng hỗ trợ file cấu hình như thế, mặc định là `phpcs.xml`. Chúng ta tiến hành thêm file `phpcs.xml` và update ci config:
```xml:phpcs.xml
<?xml version="1.0"?>
<ruleset name="Framgia Extended">
    <description>Framgia Extended Coding Convention</description>
    <arg name="tab-width" value="4"/>
    <arg name="encoding" value="UTF-8"/>
    <!-- Do not return exit code != 0 if only have warnings, meaning ignore warnings -->
    <config name="ignore_warnings_on_exit" value="1"/>

    <!-- Check both app/ and config/ and resources/lang -->
    <file>./app</file>
    <file>./config</file>
    <file>./resources/lang</file>

    <rule ref="Framgia"/>
    <rule ref="Squiz.WhiteSpace.SuperfluousWhitespace">
        <properties>
            <!-- Force checking whitespace on blank lines -->
            <property name="ignoreBlankLines" value="false" />
        </properties>
    </rule>
    <!-- Check space between operator +-*/ -->
    <rule ref="Squiz.WhiteSpace.OperatorSpacing">
        <properties>
            <property name="ignoreNewlines" value="true" />
        </properties>
    </rule>
    <!-- Line between class method -->
    <rule ref="Squiz.WhiteSpace.FunctionSpacing">
        <properties>
            <property name="spacing" value="1" />
            <property name="spacingAfterLast" value="0" />
            <property name="spacingBeforeFirst" value="0" />
        </properties>
    </rule>
    <!-- Space after type cast, e.g. (string) $response -->
    <rule ref="Generic.Formatting.SpaceAfterCast" />
</ruleset>
```
```diff:.gitlab-ci.yml
 phpcs:
   script:
-    - phpcs --standard=Framgia app/
+    - phpcs
```
Gitlab CI hay developer chỉ cần chạy `phpcs` là tool sẽ tự động đọc file config và thực hiện test mà không cần phải các tham số như `--standard` hay đường dẫn đến folder code.

## phpunit
Xem lại các câu lệnh cần thiết khi chạy phpunit:
```yml
phpunit:
  coverage: '/^\s*Lines:\s*\d+.\d+\%/'
  script:
    - cp .env.testing.example .env
    - composer install
    - php artisan key:generate
    - yarn install
    - yarn dev
    - php ./vendor/bin/phpunit --coverage-text --colors=never
```
Câu lệnh đầu tiên là để tạo file .env riêng biệt khi thực hiện unit test. Tuy nhiên, có thể bạn chưa biết là các biến env có thể được khai báo bên trong file `phpunit.xml`, ví dụ như mặc định của laravel:
```xml
    <php>
        <server name="APP_ENV" value="testing"/>
        <server name="BCRYPT_ROUNDS" value="4"/>
        <server name="CACHE_DRIVER" value="array"/>
        <server name="MAIL_DRIVER" value="array"/>
        <server name="QUEUE_CONNECTION" value="sync"/>
    </php>
```
=> Có thể bỏ việc khai báo env cho môi trường test bằng file `.env` mà khai báo trực tiếp trong file `phpunit.xml` để đồng bộ và không phải mất công sử dụng PHP DotEnv để load file env.

Câu lệnh key generate dùng để khi thực hiện integration test, tuy nhiên khi test thì không cần phải generate lại key, vì thế chúng ta có thể config 1 key cố định trong file `phpunit.xml` luôn:
```xml:phpunit.xml
    <php>
        <server name="APP_ENV" value="testing"/>
        <server name="BCRYPT_ROUNDS" value="4"/>
        <server name="CACHE_DRIVER" value="array"/>
        <server name="MAIL_DRIVER" value="array"/>
        <server name="QUEUE_CONNECTION" value="sync"/>
        <server name="SESSION_DRIVER" value="array"/>
        <server name="APP_CONFIG_CACHE" value="bootstrap/cache/config.phpunit.php"/>
        <server name="APP_SERVICES_CACHE" value="bootstrap/cache/services.phpunit.php"/>
        <server name="APP_PACKAGES_CACHE" value="bootstrap/cache/packages.phpunit.php"/>
        <server name="APP_ROUTES_CACHE" value="bootstrap/cache/routes.phpunit.php"/>
        <server name="APP_EVENTS_CACHE" value="bootstrap/cache/events.phpunit.php"/>

        <!-- APP_KEY for integration http test -->
        <server name="APP_KEY" value="base64:gzcNfa/eRUm7/HOG0hv8njzmoHX5eCv2s0QOOMDP6Vo=" />
        <!-- Disable debug to speed up test -->
        <server name="APP_DEBUG" value="false" />
        <!-- Using SQLite in memory database test -->
        <server name="DB_CONNECTION" value="sqlite" />
        <server name="DB_DATABASE" value=":memory:" />
        <!-- Or using mysql test db -->
        <!-- <server name="DB_CONNECTION" value="mysql" />
        <server name="DB_HOST" value="mysql" />
        <server name="DB_PORT" value="3306" />
        <server name="DB_DATABASE" value="hnsme_portal_db_test" />
        <server name="DB_USERNAME" value="hnsme_portal_test" />
        <server name="DB_PASSWORD" value="secret" /> -->
    </php>
```
Các bạn có thể tắt chế độ debug, sử dụng SQlite in-memory DB để tăng tốc quá trình chạy test.

Ngoài ra, còn có 1 step optimize nhỏ nữa là bỏ color ouput của phpunit với tham số `--colors=never`.

Tiếp theo là lệnh install npm packages và chạy Laravel Mix, khi xem log của CI bạn có thể thấy nó có 1 loạt output không cần thiết:
![](https://images.viblo.asia/ebf065d6-2bb1-465a-b9a9-e90eef5b02c9.png)

Điều này là do Laravel Mix output ra progress của quá trình build assets (tham số `--progress`, xem file `package.json`):
```json
"development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
```
Mặc dù nó có ích khi chạy trên máy dev nhưng với CI thì nó không cần thiết và làm chậm quá trình chạy, vì thế ta có thể bỏ progress output bằng cách thêm 1 lệnh npm khác:
```json
"ci": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
```

Và update ci config:
```yml:.gitlab-ci.yml
image: framgia/laravel-workspace

phpcs:
  script:
    - phpcs

phpunit:
  script:
    - composer install
    - yarn install
    - yarn ci
    - php ./vendor/bin/phpunit --coverage-text --colors=never
```

## Caching
Command `composer install` cài dependencies vào folder `vendor/` và command `yarn install` tạo ra thư mục `node_modules`. Hầu hết các file trong 2 folder này đều không thay đổi trừ khi có update package hay cài đặt thêm package. Vì thế chúng ta có thể cache lại 2 folder này, khi có mặt 2 folder này thì các command kia có thể sử dụng cache thay vì phải download và cài các package lại từ đầu.

Thêm nữa, các file `composer.lock` và `yarn.lock` hoặc (`package-lock.json` nếu không dùng yarn) cũng nên được push lên repository để tăng tốc chạy composer hay yarn (npm). 

Update file ci config và thêm cache:
```yml:.gitlab-ci.yml
image: framgia/laravel-workspace

cache:
  paths:
    - vendor/
    - node_modules/
```

Khi chạy CI sẽ có output dạng như sau:
![](https://images.viblo.asia/40c65b98-c859-4cc5-a721-44725b4d7878.png)

![](https://images.viblo.asia/60ef540f-c9db-4f84-846d-37b015bb9bee.png)

## Conditional build
Dự án của bạn có thể áp dụng git flow: disable fork, tất cả thành viên sẽ push feature lên branch trong repository chính duy nhất và tạo pull request; repo có 2 branch đặc biệt là `develop` và `master`. Với CI config như trên thì cứ mỗi lần dev push commit lên repo thì CI sẽ chạy, điều này gây lãng phí tài nguyên, do có thể dev vẫn chưa hoàn thiện feature branch và chỉ đẩy lên để save, vì thế cần phải config cho CI chỉ chạy khi có pull request mới hoặc có push lên 2 branch đặc biệt là `develop` và `master` (để kích hoạt deploy chẳng hạn).

Gitlab CI cũng support để config trong trường hợp này:
```yml:.gitlab-ci.yml
image: framgia/laravel-workspace

cache:
  paths:
    - vendor/
    - node_modules/

phpcs:
  script:
    - phpcs
  only:
    - merge_requests

phpunit:
  script:
    - composer install
    - yarn install
    - yarn ci
    - php ./vendor/bin/phpunit --coverage-text --colors=never
  only:
    - develop
    - master
    - merge_requests
```
Với từ khóa `only` chúng ta có thể khai báo tên branch hoặc [một số từ khóa đặc biệt (`merge_requests`)](https://gitlab.com/help/ci/yaml/README#onlyexcept-basic).

# Tổng kết
Bài viết giới thiệu cơ bản về Gitlab CI và áp dụng để build và test Laravel app. Trong bài tiếp theo, chúng ta cùng tìm hiểu về auto deploy cùng Gitlab CI/CD. Cảm ơn các bạn đã theo dõi.