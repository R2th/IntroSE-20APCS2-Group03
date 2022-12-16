# Mở đầu
Kể từ khi phát hành vào ngày 1 tháng 3 năm 2012, Composer đã trở nên phổ biến rộng rãi vì đã mang đến một thứ rất cần thiết cho PHP: quản lý dependency. Composer về cơ bản là một cách để pull tất cả các phần mềm của bên thứ ba như frameworks CSS, plugin jQuery và các phần mềm khác vào dự án của bạn.

Tuy nhiên, có thể bạn đã / đang dùng Composer vì lợi ích mà nó mang lại mà chưa một lần từng quay lại tìm hiểu xem chính xác Composer là gì và nó làm gì. Vậy thì ở bài này mình sẽ cùng tìm hiểu cách Composer hoạt động như thế nào.



# Composer là gì?

> Composer là một công cụ để quản lý dependency trong PHP. Nó cho phép bạn khai báo các thư viện mà dự án của bạn cần và nó sẽ quản lý (cài đặt/cập nhật) chúng cho bạn.

Composer **không** phải là công cụ quản lý package như Yum hoặc Apt. Nó liên quan đến "package" hoặc thư viện, nhưng nó quản lý chúng trên cơ sở từng dự án, cài đặt chúng trong một thư mục (ví dụ: `vendor`) trong dự án của bạn. Theo mặc định, nó không cài đặt bất cứ thứ gì global. Tuy nhiên, nó hỗ trợ một project "global" để thuận tiện thông qua global command.

Ý tưởng này không phải là mới và Composer được truyền cảm hứng mạnh mẽ bởi [npm](https://www.npmjs.com/) của node và [bundler](https://bundler.io/) của ruby.

Giả sử:
1. Bạn có một dự án phụ thuộc vào một số thư viện.
2. Một số thư viện phụ thuộc vào các thư viện khác.

Composer:
1. Cho phép bạn khai báo các thư viện mà bạn phụ thuộc vào.
2. Tìm ra phiên bản nào của package nào có thể / cần được cài đặt, và cài đặt chúng (có nghĩa là nó tải chúng vào dự án của bạn).

# Dependency management

Có hai cách để quản lý dependency với Composer. Đầu tiên là chính Composer, một công cụ command line để thu thập và quản lý các dependency. Thứ hai là [Packagist](https://packagist.org/) - kho lưu trữ tổng hợp chính. Đây là nơi các package bạn (có thể) muốn sử dụng được lưu trữ.

Khi sử dụng Composer, có thể bạn sẽ quen với một file JSON là `composer.json`. Cơ bản thì nó sẽ trông thế này:

```json
{
    "name": "laravel/laravel",
    "description": "The Laravel Framework",
    "keywords": [
        "framework",
        "laravel"
    ],
    "license": "MIT",
    "require": {
        "monolog/monolog": "1.12.0"
    }
}
```

Các package yêu cầu của dự án của bạn sẽ được liệt kê trong phần `require`. Trong trường hợp này, mình đã require Monolog, một framework để ghi log. Sử dụng terminal, trong thư mục dự án chạy lệnh `composer install`,  nó sẽ tải tất cả package được định nghĩa trong file `composer.json` vào thư mục `vendor` của dự án và làm một số điều khác (sẽ bàn luận bên dưới).

Thư mục `vendor` sẽ được tạo ra chứa tất cả các dependency - bao gồm cả chính composer.  Ngoài ra, monolog và psr (dependency của monolog) cũng được thêm vào một file khác là `composer.lock`.


# Chỉ định phiên bản
Có 6 cách để chỉ định phiên bản trong file `composer.json`:

1. Các toán tử `>`, `<`, `>=`, `<=` và `!=`. Ví dụ `>2.7` có nghĩa là bất kì phiên bản vào trên 2.7, `>2.7 <=3.5` nghĩa là bất kì phiên bản nào trên 2.7 và dưới 3.5, bao gồm cả 3.5.
 
2. `2.3.*` sẽ bao gồm tất cả phiên bản nào lớn hơn bằng 2.3.0 và nhỏ hơn bằng 2.4.0. Nó tương đương với `>=2.3.0 <2.4`

3. `2.0.0 - 3.0.0` có nghĩa là bất kì phiên bản vào lớn hơn bằng 2.0.0 và nhỏ hơn bằng 3.0.0. Nó tương đương với `>=2.0.0 <=3.0.0`

4. `~3.6` cho phép tất cả phiên bản lớn hơn bằng 3.6, nhưng không bao gồm từ 4.0 trở lên. Nó tương đương với `>=3.6 <4.0`.

5. Toán tử`^`, theo document của composer thì có vẻ loằng ngoằng, nhưng nói đơn giản thì nó cho phép tất cả phiên bản ở giữa hai phiên bản chính liền kề nhau (ví dụ 1. và 2.). Ví dụ `^1.2.3` sẽ cho phép tất cả phiên bản giữa 1.2.3 và 2.0.0, nó tương đương với `>=1.2.3 <2.0.0`. Toán tử `^` được recommend khi dùng để viết code file composer.json.

6. `dev-master`, khi chỉ định dev-master bạn sẽ nhận được phiên bản mới nhất đang được phát triển mà chưa được gắn số phiên bản.

# composer.json và composer.lock

Để giải thích thì hơi dài, bạn có thể đọc qua [bài này](https://viblo.asia/p/the-composer-lock-file-pDOKjkWvzPr) để hiểu về compser.json và composer.lock có nhiệm vụ khác nhau thế nào.

TL;DR:
- composer.json chỉ liệt kê dependency, không chỉ định cụ thể version package sẽ được install, composer.lock là nơi chỉ định version nào được install khi chạy composer install.
- composer.json được dùng để chạy composer install lần đầu tiên, composer.lock được tạo ra sau đó, lưu trữ phiên bản đã được cài đặt. Sau khi đã có composer.lock, composer sẽ sử dụng composer.lock để xác định phiên bản cài đặt mà không dùng composer.json nữa.
- Dùng composer.lock để đảm bảo version package của các thành viên trong nhóm là giống nhau.

# Cơ chế cache của composer

Composer có một cơ chế để lưu cache các dependency khi cài đặt, điều này giúp giảm thời gian khi chạy lại câu lệnh install. Có thể bạn đã từng gặp warning này của Composer khi chạy composer install:
```
Do not run Composer as root/super user! See https://getcomposer.org/root for details
```

Điều này xảy ra khi bạn chạy `composer install` với câu lệnh `sudo`. Việc này có liên quan đến cơ chế cache của Composer, vì khi bạn chạy với quyền sudo, cache của Composer cũng sẽ được lưu với quyền sudo (tức là quyền của user root). Khi bạn chạy lại câu lệnh composer install - không có sudo - ở một project / user khác, composer sẽ không có quyền để đọc file cache này.

Cơ chế lưu cache của Composer cũng như bao hệ thống khác, khi cài đặt lần đầu nó sẽ lưu một phiên bản cache ở trên máy bạn, và khi bạn cần dùng lại đúng package đó, verison đó, nó sẽ kiểm tra cache và (nếu có) lấy từ cache ra thay vì phải tải lại từ đầu.

Bạn có thể kiểm tra thư mục cache mặc định trên máy bằng câu lệnh:
```
sudo composer config --list --global
```

![](https://images.viblo.asia/89fe1817-b0df-42b8-b1fa-b9d761be4540.png)
Một số config cache của Composer:
- cache-dir: Thư mực gốc lưu trữ tất cả cache sử dụng bởi Composer.
- cache-files-dir: Nơi lưu các file package dưới dạng nén zip.
- cache-repo-dir: Lưu trữ các siêu dữ liệu repository cho Composer và các Version Control System (VCS) như github, bitbucket.
- cache-vcs-dir: Lưu trữ bản sao VCS để tải siêu dữ liệu repository VCS  git/hg và để tăng tốc quá trình install.
- cache-files-ttl: Mặc định là 15552000 (6 tháng). Composer cache tất cả package mà nó download. Chúng mặc định sẽ bị xóa sau 6 tháng không được sử dụng. Bạn có thể điều chỉnh thông số này để tùy chỉnh thời lượng (tính bằng giây) hoặc vô hiệu hóa hoàn toàn bằng cách đặt thành 0.
- cache-files-maxsize: Mặc định là 300MiB, đây là giới hạn tối qua mà cache có thể được sử dụng. Khi vượt quá mức cho phép, những file cũ nhất (hoặc ít được dùng nhất) sẽ bị xóa.

# Packagist
[Packagist](https://packagist.org/) là nơi lưu trữ package mặc định của Composer. Nó cho phép bạn tìm các package và cho Composer biết nơi lấy code từ đâu. Bạn có thể public package của mình lên đây một cách đơn giản bằng cách thêm một file `composer.json` vào thư mục gốc trên repository (github / bitbucket) của bạn, với nội dung như sau:
```json
{
    "name": "your-vendor-name/package-name",
    "description": "A short description of what your package does",
    "require": {
        "php": "^7.2",
        "another-vendor/package": "1.*"
    }
}
```

Đây là thông tin tối thiểu mà bạn phải cung cấp. Để biết thêm chi tiết về đặt tên package và các trường bạn có thể sử dụng để document package của bạn tốt hơn, bạn có thể đọc [tại đây](https://packagist.org/about).

Sau đó bạn có thể [đăng nhập](https://packagist.org/login/) vào packagist và [submit](https://packagist.org/packages/submit) package của mình. Khi bạn đã nhập public repository URL của mình vào đó, package của bạn sẽ được tự động thu thập thông tin theo định kỳ. Bạn chỉ cần đảm bảo rằng bạn luôn cập nhật tệp `composer.json`.

# Tổng kết
Trên đây là những kiến thức mình góp nhặt được về Composer. Còn rất nhiều điều nữa bạn có thể làm với Composer nhưng mình hy vọng mình đã cho các bạn một cái nhìn tổng thể về cách Composer hoạt động.