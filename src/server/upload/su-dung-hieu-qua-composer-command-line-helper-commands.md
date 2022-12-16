# Mở đầu

Tiếp tục series bài viết tìm hiều về Composer, tôi sẽ đi qua một lượt những command-line của Composer. Bên cạnh đó, tôi cũng sẽ nêu ra những chú ý riêng từ kinh nghiệm của bản thân khi sử dụng công cụ này. Qua đó, tôi mong có thể cung cấp thêm cho các bạn những thông tin hữu ích về Composer. Vì số lượng commands quá nhiều nên tôi sẽ không trình bày hết trong một bài viết. Trong bài viết này, tôi sẽ nói về Helper Commands - những câu lệnh hữu ích giúp chúng ta như xem thông tin của Composer hoặc package của nó, kiểm tra hệ thống,...

## Thông tin cơ bản

Ở thời điểm viết bài này, tôi đang sử dụng HĐH Ubuntu 16.04, Composer 1.7.2. Nếu các bạn đang sử dụng HĐH Ubuntu hoặc các HĐH họ Linux khác và đã cài đặt Composer thì các bạn thể kiểm tra thông tin với hai câu lệnh bên dưới.

```shell
$ uname -a
Linux xuanquynh-lt 4.15.0-34-generic #37~16.04.1-Ubuntu SMP Tue Aug 28 10:44:06 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
$ composer --version
Composer version 1.7.2 2018-08-16 16:57:12
```

Tôi nghĩ rằng việc tìm hiểu và sử dụng tất cả commands là không cần thiết. Tôi sẽ chỉ chọn ra một vài commands điển hình. Để xem được danh sách các commands, bạn hãy chạy lệnh dưới đây.

```shell
$ composer list
# Logo - Version

Usage:
  command [options] [arguments]

Options:
  -h, --help                     Display this help message
  -q, --quiet                    Do not output any message
  -V, --version                  Display this application version
      --ansi                     Force ANSI output
      --no-ansi                  Disable ANSI output
  -n, --no-interaction           Do not ask any interactive question
      --profile                  Display timing and memory usage information
      --no-plugins               Whether to disable plugins.
  -d, --working-dir=WORKING-DIR  If specified, use the given directory as working directory.
  -v|vv|vvv, --verbose           Increase the verbosity of messages: 1 for normal output, 2 for more verbose output and 3 for debug

Available Commands
about                Shows the short information about Composer.
  archive              Creates an archive of this composer package.
  browse               Opens the package's repository URL or homepage in your browser.
  check-platform-reqs  Check that platform requirements are satisfied.
  clear-cache          Clears composer's internal package cache.
  clearcache           Clears composer's internal package cache.
  config               Sets config options.
  create-project       Creates new project from a package into given directory.
  depends              Shows which packages cause the given package to be installed.
  diagnose             Diagnoses the system to identify common errors.
  dump-autoload        Dumps the autoloader.
  dumpautoload         Dumps the autoloader.
  exec                 Executes a vendored binary/script.
  global               Allows running commands in the global composer dir ($COMPOSER_HOME).
  help                 Displays help for a command
  home                 Opens the package's repository URL or homepage in your browser.
  i                    Installs the project dependencies from the composer.lock file if present, or falls back on the composer.json.
  info                 Shows information about packages.
  init                 Creates a basic composer.json file in current directory.
  install              Installs the project dependencies from the composer.lock file if present, or falls back on the composer.json.
  licenses             Shows information about licenses of dependencies.
  list                 Lists commands
  outdated             Shows a list of installed packages that have updates available, including their latest version.
  prohibits            Shows which packages prevent the given package from being installed.
  remove               Removes a package from the require or require-dev.
  require              Adds required packages to your composer.json and installs them.
  run-script           Runs the scripts defined in composer.json.
  search               Searches for packages.
  self-update          Updates composer.phar to the latest version.
  selfupdate           Updates composer.phar to the latest version.
  show                 Shows information about packages.
  status               Shows a list of locally modified packages, for packages installed from source.
  suggests             Shows package suggestions.
  u                    Upgrades your dependencies to the latest version according to composer.json, and updates the composer.lock file.
  update               Upgrades your dependencies to the latest version according to composer.json, and updates the composer.lock file.
  upgrade              Upgrades your dependencies to the latest version according to composer.json, and updates the composer.lock file.
  validate             Validates a composer.json and composer.lock.
  why                  Shows which packages cause the given package to be installed.
  why-not              Shows which packages prevent the given package from being installed.
```

Có thể nhiều người không để ý, Composer sử dụng một component của Symfony, đó chính là [symfony/console](https://symfony.com/doc/current/components/console.html). Do vậy, về cơ bản thì cách hoạt của Composer giống hệt như mọi ứng dụng console khác được viết dựa trên symfony/console như [laravel/installer](https://github.com/laravel/installer), [php-cs-fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer),... hay tính năng Laravel Artisan mà rất nhiều người "nghiện" cũng chính là built-on-top of symfony/console.
Tôi sẽ giải thích qua một chút những thông tin với output trên:

- Phần đầu tiên là Logo trên Console và thông tin phiên bản.
- Phần [Usage] là cách sử dụng một câu lệnh. Đó chính là cú pháp để thực thi một câu lệnh cụ thể. Một câu lệnh thì có tên (command), tham số (arguments) và tùy chọn (options)
- Phần [Options] là những tất cả các tùy chọn mà bạn có thể sử dụng. Những tùy chọn trên gọi là global hay common options. Nghĩa là nó có tác dụng với mọi commands. Vì được viết dự trên symfony/console nên đa phần những tùy chọn này đến từ cha đẻ của mình, các bạn hãy tham khảo đường link mà tôi gửi phía trên. Ở đây, các bạn chỉ cần chú ý 3 tùy chọn khác mà Composer đã thêm vào.

| Option | Description |
| ------ | ----------- |
| --profile | Hiển thị thông tin về thời gian và bộ nhớ sử dụng cho mỗi câu lệnh. |
| --no-plugins | Disable - không sử dụng Composer plugins. Xem thêm tại [Composer-Plugins](https://getcomposer.org/doc/articles/plugins.md). |
| -d, --working-dir=DIR | Thiết lập thư mục làm việc khác thay vì sử dụng thư mục hiện tại.

- Phần [Available Commands] là danh sách tất cả các commands mà chúng ta có thể sử dụng.

## Cách sử dụng

### about
- Hiển thị một đoạn giới thiệu ngắn về Composer. Nếu các bạn đã theo dõi bài viết trước của tôi, chắc hẳn các bạn sẽ thấy thắc mắc một chút về "Composer - Package Management for PHP". Nhưng 1 commit của tôi với [Pull Request](https://github.com/composer/composer/pull/7612) này đã được merged vào Composer để chỉnh sửa khái niệm này. Từ những phiên bản sau, các bạn sẽ thấy "Composer - Composer - Package Management for PHP".

```shell
$ composer about
Composer - Package Management for PHP
Composer is a dependency manager tracking local dependencies of your projects and libraries.
See https://getcomposer.org/ for more information.
```

### check-platform-reqs

- Kiểm tra xem nền tảng, môi trường hay ngắn gọn hơn chính là máy tính mà bạn đang sử dụng có đáp ứng được việc chạy một dự án PHP hay không. Ví dụ, tôi có một dự án yêu cầu sử dụng php 7.3, thông tin được liệt kê trong composer.json như sau:

```json
{
    "name": "xuanquynh/composer",
    "authors": [
        {
            "name": "Nguyen Xuan Quynh",
            "email": "nguyenxuanquynh2210vghy@gmail.com"
        }
    ],
    "require": {
        "php": "7.3.*"
    }
}
```

- Khi tôi chạy lệnh này thì sẽ nhìn thấy thông báo "failed" vì dự án yêu cầu php 7.3 trong khi máy tính của tôi lại đang được cài đặt php 7.2.

```shell
$ composer check-platform-reqs --working-dir=/path/to/project/
php  7.2.9  xuanquynh/composer requires php (7.3.*)  failed
```

- Trên thực tế, khi bạn cố gắng cài đặt package thì cũng sẽ nhận được thông báo tương tự. Nhưng hãy "chuyên nghiệp", kiểm tra trực tiếp phần "require" cũng giống như việc xem một cái checklist. Nó ngắn gọn và đúng mục đích hơn, giúp chúng ta nhanh chóng biết được vấn đề hơn là "cứ làm đi, sai rồi sửa".

### diagnose

- Kiểm tra xem dự án có những vấn đề thường xảy ra không. Chẳng hạn, Composer đang cảnh báo rằng project đang thiếu một file LICENSE.

```shell
$ composer diagnose --working-dir=/path/to/project
Checking composer.json: WARNING
No license specified, it is recommended to do so. For closed-source software you may use "proprietary" as license.
Checking platform settings: OK
Checking git settings: OK
Checking http connectivity to packagist: OK
Checking https connectivity to packagist: OK
Checking github.com rate limit: OK
Checking disk free space: OK
Checking pubkeys:
Tags Public Key Fingerprint: 57815BA2 7E54DC31 7ECC7CC5 573090D0  87719BA6 8F3BB723 4E5D42D0 84A14642
Dev Public Key Fingerprint: 4AC45767 E5EC2265 2F0C1167 CBBB8A2B  0C708369 153E328C AD90147D AFE50952
OK
Checking composer version: OK
Composer version: 1.7.2
PHP version: 7.2.9
PHP binary path: /usr/bin/php7.2
```

### home|browse

- Truy cập Repository URL của một package trên trình duyệt. Khi bạn biết tên một package, bạn không cần phải google search xem trang chủ của nó ở đâu mà có thể sử dụng Composer thay vào đó.

```shell
$ composer home laravel/laravel # Open the home page of package "laravel/laravel".
$ composer browse laravel/framework # Open the home page of package "laravel/framework".
$ composer home symfony/symfony # Open the home page of package "symfony/symfony".
```

### search

- Lại thêm một lần nữa, thay vì Google Search, bạn có lẽ nên thử Composer Search.

```shell
$ composer search framework
guzzlehttp/guzzle Guzzle is a PHP HTTP client library
phpunit/phpunit The PHP Unit Testing framework.
laravel/framework The Laravel Framework.
twbs/bootstrap The most popular front-end framework for developing responsive, mobile first projects on the web.
symfony/symfony The Symfony PHP framework
laravel/laravel The Laravel Framework.
phpspec/prophecy Highly opinionated mocking framework for PHP 5.3+
mockery/mockery Mockery is a simple yet flexible PHP mock object framework
laravel/tinker Powerful REPL for the Laravel framework.
symfony/framework-bundle Symfony FrameworkBundle
sensio/framework-extra-bundle This bundle provides a way to configure your controllers with annotations
zendframework/zendframework Zend Framework 2
twitter/bootstrap The most popular front-end framework for developing responsive, mobile first projects on the web.
slim/slim Slim is a PHP micro framework that helps you quickly write simple yet powerful web applications and APIs
cakephp/cakephp The CakePHP framework
```

### show|info

- Để thấy được toàn bộ thông tin của một package, hãy sử dụng câu lệnh này.

```shell
$ composer show symfony/http-foundation --working-dir=/path/to/laravel-5.7-skeleton-project
name     : symfony/http-foundation
descrip. : Symfony HttpFoundation Component
keywords :
versions : * v4.1.4
type     : library
license  : MIT License (MIT) (OSI approved) https://spdx.org/licenses/MIT.html#licenseText
source   : [git] https://github.com/symfony/http-foundation.git 3a5c91e133b220bb882b3cd773ba91bf39989345
dist     : [zip] https://api.github.com/repos/symfony/http-foundation/zipball/3a5c91e133b220bb882b3cd773ba91bf39989345 3a5c91e133b220bb882b3cd773ba91bf39989345
names    : symfony/http-foundation

autoload
psr-4
Symfony\Component\HttpFoundation\ => .
exclude-from-classmap

requires
php ^7.1.3
symfony/polyfill-mbstring ~1.1

requires (dev)
predis/predis ~1.0
symfony/expression-language ~3.4|~4.0
```

### licenses

- Tôi nghĩ rằng rất nhiều bạn lập trình viên không hề quan tâm đến giấy phép sử dụng một phần mềm. Nhưng để hướng đến sự chuyên nghiệp, tính hợp pháp, các bạn rất cần phải quan tâm về điều này. Hãy sử dụng lệnh "composer licenses" để xem các packages đang sử dụng trong dự án được phân phối như thế nào. Những mã nguồn mở hiện nay chủ yếu sử dụng giấy phép MIT,...

```shell
$ composer licenses --working-dir=/path/to/laravel-skeleton-project
Name: laravel/laravel
Version: No version set (parsed as 1.0.0)
Licenses: MIT
Dependencies:

Name                                   Version             License
dnoegel/php-xdg-base-dir               0.1                 MIT
doctrine/inflector                     v1.3.0              MIT
doctrine/instantiator                  1.1.0               MIT
doctrine/lexer                         v1.0.1              MIT
dragonmantank/cron-expression          v2.1.0              MIT
egulias/email-validator                2.1.4               MIT
erusev/parsedown                       1.7.1               MIT
fideloper/proxy                        4.0.0               MIT
# ...
```

# Tổng kết
Trên đây, tôi đã chỉ một số câu lệnh tiện ích mà tôi hay sử dụng. Tôi nghĩ rằng tất cả mọi người nên biết và nên dùng. Ngoài lề một chút, khi tự cho mình là một Backend Developer, tôi rất thích làm việc với Terminal/Console hay bất kể cái gì đó tương tự như thế. Việc sử dụng command-line với tôi không chỉ là điều cần phải biết, mà nó còn là niềm yêu thích. Tôi hy vọng các bạn cũng sẽ tìm được niềm vui tương tự. Cuối cùng, nếu chưa quen thì các bạn hãy sử dụng chúng để chuẩn bị đến với những câu lệnh khó nhằn tiếp theo.