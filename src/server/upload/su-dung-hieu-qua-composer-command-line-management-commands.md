# Mở đầu
Hôm nay, tôi sẽ cùng các bạn điểm qua những Composer Command-Line phục vụ cho việc quản lý dependencies. Tôi gọi chúng là Managment Commands. Cụ thể hơn, những command line này sẽ giúp chúng ta tạo project cũng như cài đặt, cập nhật, gỡ bỏ,... dependencies. Để có được cái nhìn trực quan hơn, tôi sẽ sử dụng những command line này trong một ví dụ xuyên suốt.

# Cách sử dụng

## create-project

```bash
$ cd /path/to/working-dir/
$ composer create-project 'laravel/laravel:5.5' laravel-5.5
```

- Chú thích:
  + **create-project** là tên của câu lệnh.
  + **laravel/laravel:5.5** là package_name:version_constraint.
  + **laravel-5.5** là thư mục chứa mã nguồn của project.


- Thay vì tạo ra project một cách thủ công bằng cách sao chép một template bao gồm cả composer.json file từ mã nguồn khác, chúng ta có thể nhờ đến sự hỗ trợ của Composer thông qua câu lệnh trên. Luồng hoạt động của nó có thể tóm tắt như sau:
  + Composer tìm kiếm và tải về package laravel/laravel với version 5.5 và cho hết mã nguồn của package đó vào thư mục laravel-5.5.
  + Sau khi đã tạo ra thư mục laravel-5.5 với mã nguồn tương ứng, Composer sẽ cài đặt các dependency cần thiết. Nếu không cung cấp đường dẫn đến thư mục của project. Composer mặc định tạo một thư mục ngay tại working directory với tên "laravel".

- Như vậy không chỉ riêng gì Laravel, chúng ta có thể tạo project với template từ bất kì một package nào.

```bash
$ # Create a Symfony project with version 4.1.
$ composer create-project 'symfony/skeleton:4.1' symfony-4.1
$ # Create a Cakephp project with version 2.4.
$ composer create-project 'zendframework/skeleton-application:3.4' zend-3.4
```

## install

- Trong trường hợp bạn có sẵn mã nguồn của một project (phải có file composer.json hoặc có thể cả composer.lock), chúng ta có thể chuyển đến thư mục project và sử dụng lệnh install để cài đặt các dependencies cần thiết. Bây giờ, tôi sẽ vào laravel-5.5 và xóa thư mục vendor đi - coi như chúng ta mới chỉ có mã nguồn (template) của Laravel Project version 5.5.

```
$ cd laravel-5.5
$ rm -r vendor
$ # Check the status of the project.
$ composer show
No dependencies installed. Try running composer install or update.
$ # Install dependencies.
$ composer install
Loading composer repositories with package information
Installing dependencies (including require-dev) from lock file
Package operations: 70 installs, 0 updates, 0 removals
  - Installing doctrine/inflector (v1.3.0): Loading from cache
  - Installing doctrine/lexer (v1.0.1): Loading from cache
  - Installing erusev/parsedown (1.7.1): Loading from cache
  ...
$ # Using ls command to determine whether the vendor directory exists.
$ ls | grep vendor
vendor
```

## update

- Khi muốn thêm, cập nhật hoặc loại bỏ một package nào đó, chúng ta có thể sửa nội dung file composer.json rồi sau đó chạy lệnh update. Tôi sẽ sửa phần require của composer.json như sau:

```json
"require": {
    "php": ">=7.0.0",
    "fideloper/proxy": "~3.3",
    "laravel/framework": "5.5.*",
    "laravel/tinker": "~1.0",
    "graham-campbell/exceptions": "^11.1"
},
```

```bash
$ # Add, update or remove a package from vendor directory.
$ composer update
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing graham-campbell/exceptions (v11.1.0): Downloading (100%)
Writing lock file
Generating optimized autoload files
```

## require

- Để thêm hoặc cập nhập packages, chúng ta có thể sử dụng require thay vì sửa composer.json và dùng lệnh update. Cá nhân tôi thích sử dụng require hơn. Trường hợp cần khá nhiều packages thì tôi mới tự sửa composer.json.

```bash
$ # Add package symfony/asset:3.4 for the project.
$ composer require 'symfony/asset:3.4'
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing symfony/asset (v3.4.17): Downloading (100%)
Writing lock file
Generating optimized autoload files
```

- Lúc này, phần require của file composer.json sẽ nhìn như thế này:

```
"require": {
    "php": ">=7.0.0",
    "fideloper/proxy": "~3.3",
    "graham-campbell/exceptions": "^11.1",
    "laravel/framework": "5.5.*",
    "laravel/tinker": "~1.0",
    "symfony/asset": "^3.4"
},
```

```
$ # Add multiples packages.
$ composer require 'symfony/cache:3.4' 'symfony/browser-kit:3.4'
./composer.json has been updated
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 5 installs, 0 updates, 0 removals
  - Installing symfony/dom-crawler (v4.1.6): Loading from cache
  - Installing symfony/browser-kit (v3.4.0): Downloading (100%)
  - Installing symfony/polyfill-apcu (v1.9.0): Downloading (100%)
  - Installing psr/cache (1.0.1): Downloading (100%)
  - Installing symfony/cache (v3.4.0): Downloading (100%)
Writing lock file
Generating optimized autoload files
```

- Sau cùng, phần require của composer.json sẽ trông như thế này:
```json
"require": {
    "php": ">=7.0.0",
    "fideloper/proxy": "~3.3",
    "graham-campbell/exceptions": "^11.1",
    "laravel/framework": "5.5.*",
    "laravel/tinker": "~1.0",
    "symfony/asset": "^3.4",
    "symfony/browser-kit": "3.4",
    "symfony/cache": "3.4"
},
```

## remove

- Tương tự với require, thay vì tự sửa composer.json và chạy lệnh update thì chúng ta có thể dùng remove để loại bỏ một package đang sử dụng.

```bash
$ # Remove package symfony/asset.
$ composer remove symfony/asset
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 0 installs, 0 updates, 1 removal
  - Removing symfony/asset (v3.4.17)
Writing lock file
Generating optimized autoload files
```

- Phần require của composer sẽ được cập nhật.

```json
{
    "require": {
        "php": ">=7.0.0",
        "fideloper/proxy": "~3.3",
        "graham-campbell/exceptions": "^11.1",
        "laravel/framework": "5.5.*",
        "laravel/tinker": "~1.0",
        "symfony/browser-kit": "3.4",
        "symfony/cache": "3.4"
    },
}
```

```bash
$ # Remove multiple packages symfony/cache and symfony/browser-kit.
$ composer remove symfony/cache symfony/browser-kit
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 0 installs, 0 updates, 5 removals
  - Removing symfony/polyfill-apcu (v1.9.0)
  - Removing symfony/dom-crawler (v4.1.6)
  - Removing symfony/cache (v3.4.0)
  - Removing symfony/browser-kit (v3.4.0)
  - Removing psr/cache (1.0.1)
Writing lock file
Generating optimized autoload files
```

- Phần require của composer.json đã trở về như lúc chưa cài đặt hay gỡ bỏ packages.

```json
{
    "require": {
        "php": ">=7.0.0",
        "fideloper/proxy": "~3.3",
        "graham-campbell/exceptions": "^11.1",
        "laravel/framework": "5.5.*",
        "laravel/tinker": "~1.0"
    },
}
```

# Tổng kết
Như vậy, qua bài viết này, tôi đã giới thiệu các commands quan trọng phục vụ cho việc quản lý dependencies. Để có thể hiểu và sử dụng thành thạo Composer, tôi tin chắc rằng chúng ta còn phải đọc và tìm hiểu nhiều hơn nữa. Nhưng với lượng commands mà tôi đã giới thiệu, các bạn cũng đã có thể sử dụng trong nhiều trường hợp cơ bản, thông dụng nhất.

Chúc các bạn học tập và làm việc vui vẻ!