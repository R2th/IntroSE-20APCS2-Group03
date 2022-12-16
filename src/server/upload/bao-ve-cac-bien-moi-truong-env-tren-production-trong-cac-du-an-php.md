Cách tốt nhất để lưu trữ dữ liệu nhạy cảm trong source code dự án của bạn là gì? Nếu bạn đề nghị lưu trữ dữ liệu vào tệp môi trường (.env), thì bạn đang đi đúng hướng. 

Bạn có thể không khó mã hóa dữ liệu nhạy cảm của mình trong source code, nhưng nhưng tệp tin dưới dạng text đơn giản rất dễ để bất kỳ ai cũng có  thể có quyền truy cập nó.

Điều gì sẽ xảy ra nếu chúng ta có thể mã hóa tệp tin môi trường và giải mã nó trong dự án của mình bất cứ khi nào chúng ta cần truy cập dữ liệu nhạy cảm của mình. Tôi sẽ chỉ cho bạn cách sử dụng thư viện **secure-env-php** để mã hóa các tập tin **.env**.


Bạn sẽ cần phải tải xuống thư viện **secure-env-php** bằng cách sử dụng `composer` trong thư mục gốc của dự án.

```
composer require johnathanmiller/secure-env-php
```

Nếu bạn chưa tạo  tệp **.env**, hãy thực hiện ngay bây giờ. Sau đó bạn sử dụng mở nó lên để nhập vào các dữ liệu config như thông tin database, api key, ...

Ví dụ:
```
DB_HOST=localhost
DB_USER=username
DB_PASS=password
```

Sau khi bạn nhập dữ liệu của mình, hãy lưu tệp và bây giờ chúng ta có thể tiếp tục và đến phần thú vị.

### Mã hóa

Tôi đã include một PHP script trong thư mục `vendor/bin` để có thể execute trong terminal và hướng dẫn bạn các bước để mã hóa tệp môi trường của bạn.

Để chạy tập lệnh này, gõ như sau: 
```
vendor/bin/encrypt-env
```

![](https://cdn-images-1.medium.com/max/800/1*PCjFohyf8AMoL_lHOaip4A.png)

1. Đầu tiên sẽ yêu cầu đường dẫn đến tệp `.env`của bạn. Bạn có thể nhận thấy trong dấu ngoặc vuông nó sẽ nói  `.env`. Đây là gợi ý mặc định. Nếu tệp môi trường của bạn nằm trong thư mục gốc của dự án, bạn có thể nhấn enter và tiếp tục. Nếu không, sau đó nhập đường dẫn trực tiếp hoặc tương đối vào tệp môi trường của bạn.
2. Thứ hai sẽ hỏi bạn có muốn tạo `secret key` không. Nếu bạn nhập vào **`y`** hoặc **`yes`** thì tập tin `.env.key` sẽ được tạo cho bạn. Nếu bạn quyết định không tạo tệp secret key, thay vào đó sẽ hỏi bạn đường dẫn đến tệp `secret key` hiện có của bạn.
3. Thứ ba, bạn có thể chấp nhận thuật toán mặc định `aes256` hoặc bạn có thể nhập một thuật toán khác được hỗ trợ bởi hàm `openssl_encrypt`. Đây là danh sách các thuật toán được hỗ trợ:  https://secure.php.net/manual/en/function.openssl-get-cipher-methods.php.
4. Cuối cùng, đề xuất đường dẫn và tên tệp để lưu tệp môi trường đã được mã hóa của bạn. Nó thường sẽ là cùng một đường dẫn với tệp `.env`, nhưng được gắn `.enc` vào cuối tên. Bạn có thể thay đổi đường dẫn và tên thành những gì bạn thích.

### Setup

Trong ví dụ này tôi sẽ sử dụng tệp **index.php** cơ bản . Chúng tôi sẽ bắt đầu với việc thêm `composer autoload` ở đầu file.

```
require_once './vendor/autoload.php';
```

Điều này sẽ cho phép chúng ta import class **SecureEnvPHP** và khởi tạo nó.

```
use SecureEnvPHP\SecureEnvPHP;
(new SecureEnvPHP())->parse('.env.enc', '.env.key');
```

Chúng tôi đang truyền ít nhất 2 đối số vào phương thức `parse` để giải mã tệp môi trường được mã hóa. Đối số đầu tiên là đường dẫn đến tệp môi trường được mã hóa. Đối số thứ hai là đường dẫn đến tệp khóa môi trường hoặc nó cũng có thể chấp nhận chuỗi bí mật. Theo tùy chọn, bạn có thể chuyển vào đối số thứ ba để đặt thuật toán mã hóa nếu bạn sử dụng thuật toán mã hóa khác ngoài mặc định.

### Retrieving .env values


Bây giờ chúng tôi đã khởi tạo lớp `SecureEnvPHP` với các tùy chọn phù hợp, các biến `.env` của chúng tôi sẽ được giải mã và được load vào project.

Chúng ta có thể gọi hàm `getenv` và truyền vào một trong các tên biến `.env` của chúng ta để lấy giá trị.
```
$host = getenv('DB_HOST');
```
Nếu bạn đang ở trong môi trường thử nghiệm, hãy thoải mái in ra biến để xem nó xuất ra giá trị mong đợi của bạn.

Xin chúc mừng! Bây giờ bạn có thể đẩy tệp môi trường được mã hóa của mình môi trường production của mình mà không sợ nó bị xâm phạm.

Bài viết được sưu tầm và lược dịch  từ: https://medium.com/@johnathanmiller/securing-php-environment-variables-for-production-use-f867e584a1f9