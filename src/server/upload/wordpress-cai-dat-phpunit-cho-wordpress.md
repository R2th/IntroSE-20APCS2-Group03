Như tiêu đề mình đã đề cập, bài viết này sẽ hướng dẫn các anh em cách để integrate <a href="https://hungphamdevweb.com/php-language-vai-phut-phut-tim-hieu-public-protected-va-private.html"><strong>PHPUnit</strong></a> cho <strong>Wordpress</strong>.

Các anh em có thể truy cập bài viết gốc của mình để xem thêm chi tiết nhé:

**[https://hungphamdevweb.com/wordpress-cai-dat-phpunit-cho-wordpress.html](https://hungphamdevweb.com/wordpress-cai-dat-phpunit-cho-wordpress.html)**

Lý do chúng ta cần thiết lập <strong>Unit Test</strong> cho <strong>Wordpress</strong>:
<ul>
 	<li>Kiểm tra độ đúng đắn của Plugin hoặc Function mà chúng ta viết thông qua Testing.</li>
 	<li>Có thể áp dụng <strong>TDD</strong> (Test Driven Development) để có thể viết Function tốt hơn.</li>
 	<li>Biết viết <strong>Unit Test</strong> thì lương sẽ cao hơn  :laughing:  :laughing:  :laughing:.</li>
</ul>
<strong>Lưu ý:</strong> Bài viết này được viết dựa trên hệ điều hành MacOS do đó cũng sẽ hoạt động tốt trên Linux, còn những hệ điều hành khác thì mình không biết nha.

Dưới đây là một vài bước để cài đặt <strong>PHPUnit</strong> cho <strong>Wordpress</strong>:
<h2>Cài đặt PHPUnit</h2>
Để có thể sử dụng được <strong>PHPUnit</strong>, đầu tiên chúng ta cần phải cài đặt nó trước cái đã. Có rất nhiều option nhưng ở đây mình chọn cài đặt chúng bằng <code>Wget</code>thông qua một số lệnh như sau:

```
wget https://phar.phpunit.de/phpunit-7.5.9.phar
chmod +x phpunit-7.5.9.phar
sudo mv phpunit-7.5.9.phar /usr/local/bin/phpunit
```

<h2>Cài đặt WP-CLI</h2>
<code>WP-CLI</code> (Wordpress Command-line Interface) là tổ hợp các câu lệnh dùng để tương tác với <strong>Wordpress.</strong> Ngoài ra <code>WP-CLI</code> có rất nhiều cách câu lệnh mà các anh em không thể làm được trong Admin Dashboard

Ví dụ:

```
wp transient delete --all
```

Cài đặt <strong>WP-CLI</strong> thông qua <code>Homebrew</code> bằng câu lệnh bên dưới hoặc các anh em có thể tham khảo thêm ở <strong><a href="https://make.wordpress.org/cli/handbook/installing/#installing-via-homebrew" rel="nofollow">đây</a></strong> để biết thêm một số cách cài đặt khác nhé.

```
brew install wp-cli
```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/lcmc0atd43_install-wp-cli-1024x464.png)cài xong thì nó sẽ giống như vầy

<h2>Cài đặt PHPUnit cho Wordpress</h2>
Sau khi hoàn thành cả hai bước trên, tiếp theo cũng ta sẽ config <a href="https://hungphamdevweb.com/php-language-vai-phut-phut-tim-hieu-public-protected-va-private.html"><strong>PHPUnit</strong></a> cho<strong> Wordpress</strong> thông qua <strong>WP-CLI</strong> bằng command bên dưới:

```
wp scaffold plugin-tests tên-plugin
```

Ở command bên trên các anh em chỉ cần thay <code>tên-plugin</code> bằng tên thư mục Plugin của mình thôi nhé.

<strong>Lưu ý:</strong> là nhớ chạy lệnh trên tại vị trí floder của Plugin nha.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/rdcf11am74_phpunit%20cho%20wordpress.png)sau khi chạy xong nó sẽ tạo ra thư mục giống như trên nhé

Tiếp đến là cấu hình một database riêng để test cho Plugin của mình. Các anh em chạy command bên dưới ngay tại thư mục Plugin mình luôn nhé.

```
bash bin/install-wp-tests.sh wordpress_test root password localhost latest
```

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/xrgb3y9wx3_phpunit%20cho%20wordpress%20bu%CC%9Bo%CC%9B%CC%81c%203.png)xong nó sẽ giống như vầy

<h2>Viết Unit Test đầu tiên</h2>
Đầu tiên anh em cần remove dòng code bên dưới trong file <code>phpunit.xml.dist</code> đi nha. Dòng tô vàng bên dưới nhé.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/vk5c63aqon_remove%20code%20phpunit.png)

Tiếp đến mình sẽ thử viết một function để test trong file <code>test-sample.php</code> với nội dung như sau:

```
public function test_sample() {
  $string = 'Unit tests are sweet';

  $this->assertEquals( 'Unit tests are sweet', $string );
}
```

Sau đó chạy thử command <code>phpunit</code> và tận hưởng kết quả như hình bên dưới nhé:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/y7acbpkec5_thu%CC%9B%CC%89%20cha%CC%A3y%20phpunit.png)

Bài viết tới đây là hết rồi. Mọi thắc mắc vui lòng để lại bình luận bên dưới nhé.

Video hướng dẫn sẽ cập nhật vào thứ 4 tuần này.

Hẹn gặp lại các anh em trong một bài viết sắp tới, mình sẽ hướng dẫn cơ bản cách để viết <strong>Unit Test</strong> trên <a href="https://hungphamdevweb.com/wordpress-theme-tim-hieu-action-hook-va-filter-hook.html"><strong>Wordpress</strong></a> nhé. ahihi   :laughing:  :laughing:  :laughing: