Để tạo một tài liệu Word thì hiện tại không có nhiều thư viện PHP để làm tốt công việc này. Trong bài viết này sẽ giới thiệu về thư viện PhpWord để xuất ra các định dạng Word.  PHPWord ta có thể dễ dàng tạo ra một file văn bản mới với các thành phần và định dạng như mong muốn, hoặc ta cũng có thể tạo ra một file văn bản từ một template đã có sẵn. PHPWord cung cấp các phương thức để người dùng dễ dàng tạo một file văn bản với các thành phần cơ bản như text, paragraph, header, footer, table 

![](https://images.viblo.asia/749880c6-9894-481d-9bdc-12a16b0e5f1f.png)


## 1. Các tính năng
* Đặt tiêu đề, chủ đề và người tạo 
* Tùy biến kích thước và đánh số trang 
* Tạo header và footer cho mỗi trang văn bản
* Đặt loại phông chữ mặc định, kích thước phông chữ
* Sử dụng phông UTF-8 và East Asia
* Tùy chỉnh kiểu phông chữ như in đậm, in nghiêng, khoảng cách ...
* Chèn các đoạn văn bản đơn giản hoặc phức tạp 
* Chèn tiêu đề, mục lục 
* Ngắt văn bản hoặc ngắt trang 
* ...

## 2. Cài đặt 
Sử dụng composer 
```composer.json
{
    "require": {
       "phpoffice/phpword": "v0.17.*"
    }
}

# run:  composer install 
```
Sau khi cài đặt xong thì ta có thể sử dụng bằng ví dụ tạo file word sau
```PhpWordService.php
<?php

namespace App\Services;
 
use PhpOffice\PhpWord\PhpWord;
use PhpOffice\PhpWord\IOFactory;

class PhpWordService
{
    public function createFileWord()
    {
        //Khởi tạo đối tượng phpWord
        $phpWord = new PhpWord();

        //Thêm một tài liệu Word
        $section = $phpWord->addSection();

        //Thêm nội dung tài liệu cũng như các định dạng cơ bản của tài liệu
        $section->addText(
            'Nội dung',
            array(
                'name' => 'Arial',
                'size' => 14
            )
        );

        //Khởi tạo đối tượng writer
        $writer = IOFactory::createWriter($phpWord, 'Word2007');

        //Tạo tập tin Word
        $writer->save('path/to/save/filename.docx');
    }
}
```

## Tạo file từ một mẫu cho trước

Với PhpWord ta có thể tạo một file từ một mẫu cho trước bằng cách đặt các ${key_search} ở các vị trí trong văn bản mẫu, các vị trí này sẽ được thay thế bằng bất cứ giá trị nào mà ta muốn điền. 

Để tải một file word mẫu ta dùng 
```php
$templateProcessor = new TemplateProcessor('Template.docx');
```

### setValue
Trong file template ta tạo các ${firstname} và ${lastname} vào các vị trí cần điền các nội dung tương ứng

`Hello ${firstname} ${lastname}!`

khi này ta chỉ cần thêm bất cứ nội dung cần thiết bằng cách sử dụng hàm `setValue`
```
$templateProcessor->setValue('firstname', 'John');
$templateProcessor->setValue('lastname', 'Doe');
```

kết quả thu được sẽ là **Hello John Doe!**
### setValues
Ngoài cách sử dụng nhiều hàm `setValue` thì ta có thể truyền 1 mảng nhiều phần tử vào hàm `setValues`

```php
$templateProcessor->setValues(
        [
            'firstname' => 'John',
            'lastname' => 'Doe'
        ]
    );

```
### setImageValue
Ta có thể chèn hình ảnh vào văn bản mẫu bằng nhiều cách như sau
* `${search-image-pattern}`
* `${search-image-pattern:[width]:[height]:[ratio]}`
* `${search-image-pattern:[width]x[height]}`
* `${search-image-pattern:size=[width]x[height]}`
* `${search-image-pattern:width=[width]:height=[height]:ratio=false}`

Ví dụ 
```
${CompanyLogo}
${UserLogo:50:50} ${Name} - ${City} - ${Street}
```

```php
$templateProcessor = new TemplateProcessor('Template.docx');
$templateProcessor->setValue('Name', 'John Doe');
$templateProcessor->setValue(array('City', 'Street'), array('Detroit', '12th Street'));

$templateProcessor->setImageValue('CompanyLogo', 'path/to/company/logo.png');
$templateProcessor->setImageValue('UserLogo', array('path' => 'path/to/logo.png', 'width' => 100, 'height' => 100, 'ratio' => false));
```

### cloneBlock
```
${block_name}
Customer: ${customer_name}
Address: ${customer_address}
${/block_name}
```
Nội dung ở giữa ${block_name} và ${/block_name} sẽ được lặp lại 3 lần khi ta sử dụng:
```php
$templateProcessor->cloneBlock('block_name', 3, true, true);
```
Kết quả trả về sẽ là 
```
Customer: ${customer_name#1}
Address: ${customer_address#1}

Customer: ${customer_name#2}
Address: ${customer_address#2}

Customer: ${customer_name#3}
Address: ${customer_address#3}
```

ta cũng có thể truyền một mảng nhiều phần tử: 
```php
$replacements = array(
    array('customer_name' => 'Batman', 'customer_address' => 'Gotham City'),
    array('customer_name' => 'Superman', 'customer_address' => 'Metropolis'),
);
$templateProcessor->cloneBlock('block_name', 0, true, false, $replacements);
```
kết quả 
```
Customer: Batman
Address: Gotham City

Customer: Superman
Address: Metropolis
```

### replaceBlock
ta dùng hàm này để sửa 1 nội dung nào đó trong file mẫu 
```
${block_name}
This block content will be replaced
${/block_name}
```

```php
$templateProcessor->replaceBlock('block_name', 'This is the replacement text.');
```

### deleteBlock
Xóa một khối nội dung trong văn bản mẫu 
```php
$templateProcessor->deleteBlock('block_name');
```
### cloneRow
Hàm này khá tiện khi trong văn bản mẫu có những nội dung dạng bảng:
```
+-----------+----------------+
| ${userId} | ${userName}    |
|           |----------------+
|           | ${userAddress} |
+-----------+----------------+
```
```php
$templateProcessor->cloneRow('userId', 2);
```
Sẽ cho kết quả
```
+-------------+------------------+
| ${userId#1} | ${userName#1}    |
|             |------------------+
|             | ${userAddress#1} |
+-------------+------------------+
| ${userId#2} | ${userName#2}    |
|             |------------------+
|             | ${userAddress#2} |
+-------------+------------------+
```

### cloneRowAndSetValues
cũng như hàm **cloneRow** tuy nhiên hàm **cloneRowAndSetValues** có vẻ hữu dụng hơn trong nhiều trường hợp dữ liệu truyền vào là dạng mảng:
```
+-----------+----------------+
| ${userId} | ${userName}    |
|           |----------------+
|           | ${userAddress} |
+-----------+----------------+
```

```php
$values = [
    ['userId' => 1, 'userName' => 'Batman', 'userAddress' => 'Gotham City'],
    ['userId' => 2, 'userName' => 'Superman', 'userAddress' => 'Metropolis'],
];
$templateProcessor->cloneRowAndSetValues('userId', );
```

Kết quả sẽ là 
```
+---+-------------+
| 1 | Batman      |
|   |-------------+
|   | Gotham City |
+---+-------------+
| 2 | Superman    |
|   |-------------+
|   | Metropolis  |
+---+-------------+
```

*Lưu ý: Trong quá trình làm việc với file word có thể là do vô tình hoặc cố ý ta phải xuống dòng ở 1 số nội dung nào đó. Thì ta dùng `</w:t><w:br/><w:t>` không nên dùng `\n`, ` <br />`*

## Kết Luận
Ở bài viết này đã giới thiệu những khái niệm cũng như tính năng của thư viên PHPWord. Còn cách dùng thì tập chung vào phần sử dung PHPWord để tạo file từ một file mẫu có sẵn. Chúc thành công!
## Tài liệu tham khảo 
[PHPWord](https://phpword.readthedocs.io/en/latest/index.html)