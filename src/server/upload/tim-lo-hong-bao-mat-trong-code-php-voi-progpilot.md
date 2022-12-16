Progpilot là công cụ phân tích source code PHP với mục đích tìm các lỗ hổng bảo mật. Progpilot là công cụ phân tích tĩnh và sử dụng kỹ thuật taint checking để tìm lỗi. Với kỹ thuật này thì khả năng báo lỗi chính xác hơn so với kỹ thuật phân tích thông thường như regex chẳng hạn. Progpilot có hỗ trợ tìm lỗi trên các framework như: wordpress, symfony, codeigniter, prestashop, suitecrm.

Trong bài này mình sẽ nếu:
+ Tổng quan
+ Cách cài đặt.
+ Cách sử dụng.
+ Sửa đổi tập luật để nâng cao hiệu quả scan.
# Tổng quan
Progpilot là công cụ phân tích tĩnh mã nguồn PHP để tìm kiếm các lỗ hổng bảo mật như: SQL injection, XSS, file inclusion, ....

> Phân tích tĩnh là quá trình phân tích mà không thực thi code hay code hay chương trình.

Có nhiều kỹ thuật phân tích tĩnh với progpilot sử dụng kỹ thuật taint checking. Kỹ thuật này được hiểu đơn giản như sau:

> **Taint checking** xác định tất cả các hàm có thể gây ra lỗi như: exec, echo, eval, .... tất cả những hàm này được gọi là sink (nơi thực thi các hàm gây ra lỗi). Từ những sink này tìm những dữ liệu liên quan mà người dùng có thể kiểm soát được (điểm này được gọi là source).

Áp dụng kỹ thuật này progpilot cho ra kết quả đúng hơn nhiều so với cách phân tích thông thường. Vì kỹ thuật này chỉ ra nơi thực thi hàm nhạy cảm và điểm bắt đầu của dữ liệu từ đó đưa ra dự đoán chuẩn xác hơn.

Progpilot cho phép sử dụng như một chương trình độc lập hoặc như một thư viện.

Sử dụng như một chương trình độc lập

![](https://images.viblo.asia/e6ab3ec9-fb27-4e8b-9b6a-543e094613d8.png)

Sử dụng như một thư viện
```php
<?php
require_once './vendor/autoload.php';

$context = new \progpilot\Context;
$analyzer = new \progpilot\Analyzer;

$context->inputs->setFile("source_code1.php");

try {
  $analyzer->run($context);
} catch (Exception $e) {
   echo "Exception : ".$e->getMessage()."\n";
}  
  
$results = $context->outputs->getResults();

var_dump($results)
```
# Cài đặt progpilot
Để cài đặt progpilot có 3 cách

**Tải file phar**
Cách này đơn giản và không gặp lỗi trong quá trình thực hiện. Để tải file thực thi truy cập vào link sau: https://github.com/designsecurity/progpilot/releases/tag/v0.8.0

**Build từ source code**
Cách này loằng quằng và không thích hợp với những bạn chỉ muốn tải sử dụng công cụ. Mình thì muốn đọc source và thay đổi nó nên sử dụng cách này.

Để tạo file phar từ source thì làm theo các bước sau.
```
git clone https://github.com/designsecurity/progpilot
cd progpilot
./build.sh
```

**Sử dụng composer**
Cách này tiện ở chỗ nó cho phép mình dùng progpilot như một thư viện và như một chương tình độc lập. Để thực hiện cài đặt thì dùng lệnh sau:

```
composer require --dev designsecurity/progpilot
```

Khi thực hiện cài đặt theo cách này thì file thực thi của progpilot nằm tại đường dẫn `vendor/bin/progpilot`. 

*Nhưng hiện tại mình vẫn không cài được do đang lỗi gì đó :v*

# Sử dụng
Để sử dụng progpitlot ta phải dùng đến CLI mà không có giao diện. Điều này không ảnh hưởng gì đến mình mà ngược lại mình rất thích cách này. Cá nhân mình đánh giá dùng CLI đơn giản và tiện lợi hơn dùng giao diện nhiều lần.

Cách sử dụng progpilot

```bash
progpilot example1.php example2.php folder1/ folder2/
```

Progpilot cho phép ta test một lúc nhiều file và nhiều folder cùng lúc.

![](https://images.viblo.asia/b3ec7734-d2dd-41d2-9f0a-437e2ae03c50.png)

Hình trên mình test với 1 folder trong folder này chỉ có một file và file này cũng chỉ có một lỗi.

![](https://images.viblo.asia/0bc0c1d1-285a-41b9-9c52-9dcfa85ceb00.png)

# Tập luật
Progpilot cho phép mình sửa luật của: sink, source, sanitizer, validator.

Sources
```json
{
{
    "sources": [
        {"name": "_GET", "is_array": true, "language": "php"},
        ....
        ]
}
```

Sinks
```json
{
"sinks": [
        {"name": "setcookie", "parameters": [{"id": 2}], "language": "php", "attack": "session_fixation", "cwe": "CWE_384"},
        .....
        ]
}
```

Sanitizers
```json
{
    "sanitizers": [
    {"name": "highlight_string", "language": "php", "prevent": ["xss"]},
    ...
    ]
}
```

Cấu trúc của các luật trên cơ bản là như nhau.
+ Tất cả chúng đều bắt buộc có: `name` và `language`.
+ Luật được tổ chức theo json nên rất dễ viết và chỉnh sửa.

Một vài điểm khác:
+ Sink bắt buộc phải có `attack`.
+ Đối với sink và sanitizer thì `name` phải bắt buộc là tên của hàm.
+ Sanitizer bắt buộc phải có `prevent` và prevent này cần phải tương ứng với `attack` trong sinks.
+ `name` của source có thể là biến hược hàm.

Ví dụ viết một rule cơ bản cho sink là hàm [loadXML](https://www.php.net/manual/en/domdocument.loadxml.php)

```json
{
    "sinks": [
        {"name": "loadXML", "language": "php", "attack": "xxe"}
    ]
}
```

![](https://images.viblo.asia/25d7fd91-75f3-4646-93de-c9ff4cc114ce.png)

Trong ví dụ trên mình không sử dụng `parameters` nên bất cứ tham số nào của `loadXML` nhận giá trị có thể dẫn đến lỗi thì progpilot sẽ cảnh báo. Nếu muốn chỉ định rõ tham số nào cần chương trình kiểm tra thì ta dùng thêm tham số `parameters`.

```json
{
    "sinks": [
        {"name": "loadXML", "language": "php", "attack": "xxe", "parameters": [{"id": 1}]}
    ]
}
```

Sau khi sử dụng mình đánh giá progpilot cho ra nhiều kết quả tốt. Nhưng cũng nhiều lỗi chưa tìm thấy nhưng đây là tool  opensource nên kết quả vậy mình thấy là tốt. Để có thể cải thiện hiệu quả scan thì nên sửa rule hoặc thêm rule cho nó.

Mình xin kết thúc bài ở đây!