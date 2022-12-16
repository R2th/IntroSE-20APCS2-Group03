# Tóm tắt nội dung chính:
Chuẩn PSR này mô tả các đặc tả cho các lớp tải tự động file theo đường dẫn. Nó hoàn toàn tương thích và có thể bổ sung cho bất kỳ đặc tả trình tải tự động khác, kể cả PSR-0(và thực tế là đã thay thế PSR-0). Đặc tả này sẽ hướng dẫn nơi để đặt các file sẽ được tải tự động.
# Đặc tả
1. Lớp ở đây ám chỉ các lớp, giao diện, trait và các cấu trúc tương tự
2. 1 lớp chuẩn sẽ có cấu trúc như sau
```
\<NamespaceName>(\<SubNamespaceNames>)*\<ClassName>
```
- Tên lớp đủ điều kiện PHẢI có tên namespace tên cấp cao nhất,
còn được gọi là "vendor namespace".
- Tên lớp đủ điều kiện CÓ THỂ có một hoặc nhiều tên sub-namespace.
- Tên lớp đầy đủ PHẢI có 1 tên lớp kết thúc.
- Dấu gạch dưới không có ý nghĩa đặc biệt trong bất kỳ phần nào của toàn bộ
tên lớp đủ điều kiện.
- Các chữ cái trong tên lớp đủ điều kiện CÓ THỂ là kế hợp tùy ý của các chữ hoa và chữ thường.
- Tất cả các tên lớp PHẢI trông thân thiện về mặt chữ hoa chữ thường.
3. Khi tải 1 file thỏa mãn 1 class được đặt tên theo chuẩn 1 cách đầy đủ ...
  - Một chuỗi liền kề của một hoặc nhiều tên namespace và sub-namespace, không bao gồm dấu phân cách không gian tên hàng đầu, trong tên lớp đầy đủ (“tiền tố không gian tên”) tương ứng với ít nhất một “thư mục cơ sở”.
  - Các tên namespace con liền kề sau "tiền tố namespace" tương ứng với một thư mục con trong "thư mục cơ sở", trong đó việc phân chia namespace đại diện cho việc phân chia thư mục. Tên thư mục con PHẢI khớp với tên của các tên sub-namespace.
  - The terminating class name corresponds to a file name ending in `.php`. Tên tệp PHẢI khớp với trường hợp của tên lớp kết thúc.
4. Việc triển khai trình nạp tự động KHÔNG ĐƯỢC trả ngoại lệ, KHÔNG ĐƯỢC đưa lỗi
của bất kỳ cấp độ nào và KHÔNG NÊN trả lại giá trị nào. 
# Ví dụ
| Fully Qualified Class Name    | Namespace Prefix   | Base Directory           | Resulting File Path
| ----------------------------- |--------------------|--------------------------|-------------------------------------------
| \Acme\Log\Writer\File_Writer  | Acme\Log\Writer    | ./acme-log-writer/lib/   | ./acme-log-writer/lib/File_Writer.php
| \Aura\Web\Response\Status     | Aura\Web           | /path/to/aura-web/src/   | /path/to/aura-web/src/Response/Status.php
| \Symfony\Core\Request         | Symfony\Core       | ./vendor/Symfony/Core/   | ./vendor/Symfony/Core/Request.php
| \Zend\Acl                     | Zend               | /usr/includes/Zend/      | /usr/includes/Zend/Acl.php

Để có thể rõ hơn, các bạn có thể xem nhiều ví dụ hơn [tại đây](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader-examples.md)
# Tài liệu tham khảo
https://www.php-fig.org/psr/psr-4/