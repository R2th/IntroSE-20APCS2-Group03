# 1.Giới thiệu
Như các bạn đã biết, ở framgia đã áp dụng CI. Mỗi khi có pull request, CI sẽ fetch pull request về, chạy rake spec, gửi report. Để mọi người biết được có bị fail RSPEC hay ko, % coverage là bao nhiêu. Sau 1 thời gian cặm cụi, mình xin chia sẻ cách config CI cho project. `Framgia CI` được viết bằng Python do 2 Authors `Trần Đức Thắng` và `Nguyễn Anh Tiến`. Vì thời gian tìm hiểu `Framgia CI` chưa được nhiều nên trong khuôn khổ bài viết mình chỉ hướng dẫn các bạn cài đặt và sử dụng Framgia CI để check convertion trên local trong trường hợp project của bạn chưa được các sếp tích hợp `Framgia CI` hoặc `Framgia CI` trên server có vấn đề. Ngoài ra các bạn cũng có thể ghé qua [blog của mình](https://storyofsu.com/) để đọc thêm 1 số bài viết về nghề lập trình :D
# 2.Cài đặt
## 2.1 Install Framgia CI report tool 

Vì công ty mình đang sử dụng Linux nên mình sẽ chỉ hướng dẫn các bạn cài đăt trên Linux và mình cũng `không khuyến khích` các bạn lập trình viên sử dụng `Window lậu`.

`Requirement` cho  là python 3.5 nên trước khi cài Framgia CI bạn check lại version pip bằng lệnh 
```
$ pip --version
```
trên Terminal  nếu version 3.5 thì ngon luôn. Sử dụng 
```
$ pip install framgia-ci
```

Nếu version của pip < 3,5 thì bạn phải cài pip3.

```
 $ sudo apt-get install python3-pip
 $ pip3 install framgia-ci
```

Ngoài ra bạn cũng có thể sử dụng lệnh 
```
$ sudo -H pip3 install framgia-ci
```
cài CI mà không cần quan tâm đến pip đang ở version nào.
Trong trường hợp lỗi bạn xóa đi cài lại Framgia CI bằng lệnh
```
$ sudo -H pip3 uninstall framgia-ci
```
## 2.2 Add Framgia PHP Standards Checker

Đầu tiên chúng ta phải cài đặt `PHP_CodeSniffer` globally bằng composer với lệnh 
```
$ composer global require "squizlabs/php_codesniffer=*"
``` 
Hãy chắc chắn rằng trong máy bạn đang có đường dẫn kiểu như `~/.composer/vendor/bin/ in your PATH`. 
Di chuyển vào thư mục `Standards` để cài thêm chuẩn Framgia. Mình hay di chuyển thằng bằng ` cơm` vào thư mục `Standards` sau đó chạy  lệnh `git clone https://github.com/wataridori/framgia-php-codesniffer.git Framgia` hoặc bạn có thể dùng Terminal để move vào `Standards` rồi clone chuẩn Framgia về 
```
cd ~/.composer/vendor/squizlabs/php_codesniffer/src/Standards
git clone https://github.com/wataridori/framgia-php-codesniffer.git Framgia
```

Kiểm tra xem chuẩn Framgia có được cài đặt thành công hay không 
```
$ phpcs -i
The installed coding standards are PEAR, PSR1, Framgia, Squiz, MySource, Zend and PSR2
```

Tuy nhiên đến bước này bạn cần `lưu ý một chút` sau khi cài xong chuẩn Framgia vào thư mục `Standards` bạn cần làm một việc sau. 
`dùng bash thì mở file ~/.bashrc` bằng termial
```
$ vi ~/.bashrc => sau đó thêm dòng sau vào cuối file => PATH="~/.composer/vendor/bin":$PATH => save lại
$ source ~/.bashrc
```
Làm tương tự với file `~/.profile `
```
$ vi ~/.profile => sau đó thêm dòng sau vào cuối file => PATH="~/.composer/vendor/bin":$PATH => save lại
$ source ~/.profile
```
**Nếu gặp lỗi phpcs not found, bạn có thể để đường dẫn tuyệt đối đến thư mục bin của composer thay vì đường dẫn tương đối**

```
$ composer global config bin-dir --absolute
Changed current directory to /home/nguyen.huu.su/.config/composer
/home/nguyen.huu.su/.config/composer/vendor/bin
```
để tìm đúng PATH của mình.

Đến đây coi như xong bạn có thể sử dụng `Framgia CI` để check convention.

# 3.Sử dụng
Di chuyển về thư mục sự án đang code chạy lệnh `framgia-ci init php` để init file `.framgia-ci.yml`cho project PHP của bạn. Vì chỉ check convention nên bạn tùy chỉnh lại file `.framgia-ci.yml` như sau 
```
project_type: php
test:
  phpcpd:
    ignore: true
    command: phpcpd --log-pmd=.framgia-ci-reports/phpcpd.xml app
  phpmd:
    ignore: true
    command: phpmd app xml codesize --reportfile .framgia-ci-reports/phpmd.xml
  pdepend:
    ignore: true
    command: pdepend --summary-xml=.framgia-ci-reports/pdepend.xml
        --jdepend-chart=.framgia-ci-reports/pdepend.svg
        --overview-pyramid=.framgia-ci-reports/pyramid.svg
        app
  phpmetrics:
    ignore: true
    command: phpmetrics --report-html=.framgia-ci-reports/metrics.html
        --report-xml=.framgia-ci-reports/metrics.xml
        app
  # eslint:
  #   ignore: true
  #   command: eslint --format=checkstyle
  #       --output-file=.framgia-ci-reports/eslint.xml
  #       resources/assets/js/
  phpcs:
    ignore: false
    command: phpcs --standard=Framgia --report-checkstyle=.framgia-ci-reports/phpcs.xml app
  # phpunit:
  #   command:
  #     - sleep 30
  #     - php artisan migrate --database=mysql_test
  #     - php artisan db:seed --database=mysql_test
  #     - php -dzend_extension=xdebug.so vendor/bin/phpunit
  #       --coverage-clover=.framgia-ci-reports/coverage-clover.xml
  #       --coverage-html=.framgia-ci-reports/coverage

```
Để kiểm tra convention bạn chạy lệnh 
```
$ framgia-ci run --local
```
bằng Terminal kết quả sẽ hiện ra như sau.
```

[o] Build Success!
------------------------------------------
[!] phpmetrics: failed but ignored
[o] phpcs: success
[!] phpmd: failed but ignored
[!] pdepend: failed but ignored
[!] phpcpd: failed but ignored

``` 
Tức là bạn code sạch đẹp. Gửi pull lên Leader chỉ việc auto merged :D
còn trường hợp 
```
------------------------------------------
[x] Build Fail!
[x] phpcs: failed
[!] phpcpd: failed but ignored
[!] pdepend: failed but ignored
[!] phpmd: failed but ignored
[!] phpmetrics: failed but ignored
```
Thì bạn vào thư mục `.framgia-ci-reports`check lỗi ở file `framgia-ci.yml ` rồi chạy lại bằng lệnh 
```
  $ framgia-ci run --local
```

# 4.Trải lòng
Lúc đầu mình cũng rất vất vả với việc cài đặt cũng như sử dụng `Framgia CI` một phần vì chưa hiểu hết hệ điều hành Linux cũng như gà mờ về việc cài đặt một ứng dụng. Bạn đọc cài đặt có gì lỗi có thể comment để mình support. 
Chúc các bạn cài đăt cũng như sử dụng thành công !!!
# 5. Tài liệu tham khảo 

https://github.com/wataridori/framgia-php-codesniffer/tree/master 

https://github.com/framgia/ci-report-tool