Trong trường hợp chúng ta cần sử dụng chức năng về email thông qua các Email Provider (Gmail, Yahoo, AOL, ...) Laravel Imap là 1 thư viện cung cấp cho chúng ta giải pháp với ưu điểm dễ dàng cài đặt và sử dụng.

Laravel Imap là cách đơn giản để tích hợp thư viện php vào trong ứng dụng sử dụng framework Laravel
https://github.com/Webklex/laravel-imap
# Cài đặt
1. Nếu chưa cài đặt thư viện php-imap thì bạn có thể cài đặt bằng câu lệnh sau (dấu * là phiên bản php muốn cài đặt) :
```
sudo apt-get install php*-imap php*-mbstring php*-mcrypt && sudo apache2ctl graceful
```
Để chắc chắn thì bạn có thể sử dụng phpinfo() để kiểm tra xem thư viện đã được kích hoạt chưa

2. Cài đặt Laravel imap package : 
```
composer require webklex/laravel-imap
```

Trong trường hợp phiên bản Laravel <=5.4, bạn cần sửa lại file config/app.php như sau:
- Thêm vào mảng `providers`
```
Webklex\IMAP\Providers\LaravelServiceProvider::class,
```
- Thêm vào mảng `aliases`
```
'Client' => Webklex\IMAP\Facades\Client::class,
```

3. Publish file config của package:
```
php artisan vendor:publish --provider="Webklex\IMAP\Providers\LaravelServiceProvider"
```

# Cách sử dụng
Một số giao thức được hỗ trợ:
- Imap (default)
- pop3
- nntp

Một số phương thức mã hóa được hỗ trợ:
- false: không mã hóa
- ssl
- tls
- starttls
- notls

Ví dụ đơn giản chức năng kiểm tra đã kết nối thành công chưa với tài khoản AOL mail
Ta có thể tạo một command trong laravel để kiểm tra, ở đây tôi tạo command email:get
```
use Webklex\IMAP\Client;

class GetMailService
{
    /* @var Client $client */
    protected $client;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    /**
     * @return bool
     */
    public function testConnection() 
    {
        $client = $this->client->setConfig([
            'host' => 'imap.aol.com',
            'port' => 993,
            'encryption' => 'ssl',
            'validate_cert' => true,
            'username' => 'phongtest@aol.com',
            'password' => 'Aa@123456',
            'protocol' => 'imap',
        ]);

        try {
            $client->connect();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
```

## Lưu ý:
> Đối với một số email providers (ví dụ như Gmail, Yahoo, AOL) bạn phải kích hoạt chức năng "Allow apps that use less secure sign in" mới có thể connect thành công.
> Zoho mail sẽ không cần làm như trên.
> 
![](https://images.viblo.asia/ef0147af-86b9-41ca-ad6e-de513d997593.jpg)


Ví dụ lấy ra các tin nhắn từ 1 hộp INBOX của một tài khoản 
```
        try {
            $client->connect();
            $oFolder = $client->getFolder("INBOX"); // Lấy email từ folder INBOX

                $aMessage = $oFolder->messages()->all()->get();

// Với mỗi tin nhắn lấy ra 1 số thông số : tiêu đề, UID, nội dung text
                foreach($aMessage as $oMessage) {
                    echo 'Subject: ' . $oMessage->getSubject() . "\n";
                    echo 'UID: '.$oMessage->getUid() . "\n";
                    echo 'Text Body: ' . $oMessage->getTextBody() . "\n";
                }
        } catch (\Exception $e) {
            return false;
        }

```
Kết quả:
Hình ảnh tại CLI

![](https://images.viblo.asia/0d55ab37-68fe-4b93-8459-236279d8eb11.png)
Hình ảnh hộp thư INBOX

![](https://images.viblo.asia/78f2f699-fda9-4b1c-b928-e677c5778e68.png)

Các phương thức mà Laravel - imap hỗ trợ bạn có thể tham khảo tại: 
https://github.com/Webklex/laravel-imap

Một số config với từng Email Providers: 

```
AOL (including Verizon.net)
Server: imap.aol.com

Port: 993

Encryption: SSL/TLS
```
```
Gmail
Server: imap.gmail.com

Port: 993

Encryption: SSL/TLS
```
```
Yahoo!
Server: imap.mail.yahoo.com 

Port: 993

Encryption: SSL
```
Nguồn tham khảo:
https://support.office.com/en-us/article/pop-and-imap-email-settings-for-outlook-8361e398-8af4-4e97-b147-6c6c4ac95353: