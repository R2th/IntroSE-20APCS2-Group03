### Lời mở đầu 
Trong việc lập trình chắc chắn các bạn luôn gặp bài toàn làm việc với file excel gần như thường xuyên như trong việc import db, export db. Và khi làm việc với Laravel cũng không ngoại lệ. Nếu như search trên google hẳn các bạn sẽ thấy 1 thư viện làm việc với excel và laravel đó là https://laravel-excel.maatwebsite.nl/ . Tại đây gần như các bạn làm việc rất tốt với Excel. Như khi bạn từ version 2.1 lên 3.0 gặp vấn đề việc import nó không còn hỗ trợ nữa. (Tin vui là version 3.1 đã có lại chức năng này). Và gặp trường hợp này các bạn làm sao? Đa số các bạn sẽ quay về version 2.1 thân yêu của chúng ta ez.
Vậy nên ở phiên bản 3.0, tuy không có phần import nhưng trên trang chủ của thư viện này giới thiệu các bạn thư viện khá tốt dùng cho excel đó là https://phpspreadsheet.readthedocs.io/ .
Và khi đến version 3.1 bản thân thư viện này vẫn nói phần import vẫn là dùng thư viện này. 
### Bước đầu cài đặt
Giống như mọi thư viện khác thì việc thêm thư viện trong project ta chỉ việc thêm vào file composer.json
```composer.json
"require": {
    "phpoffice/phpspreadsheet": "1.2.0"
}
```
Sau đó ta có thể config thêm trong file config/app.php như sau:
```app.php
'aliases' => [
        ImportExcel => PhpOffice\PhpSpreadsheet\IOFactory::class
];
```

### Cách đọc file excel
Để đọc 1 file excel thì chúng ta dùng 1 cách rất đơn giản là dùng hàm load. Ví dụ như sau
`$spreadsheet = ImportExcel::load("vidu.xlsx");`
Bản thân khi dùng hàm này, bạn không cần quan tâm là file định dạng gì (xls,xlsx) mà thư viện sẽ tự phân tích từ đó đọc file này giúp bạn.
Ngoài ra bạn có thể thiết lập thêm các thuộc tính khác ví dụ như chỉ đọc file này không cho quyền ghi
```
$reader = ImportExcel::createReaderForFile("vidu.xlsx");
$reader->setReadDataOnly(true);
$reader->load("vidu.xlsx");
``` 
hoặc có thể chỉ đích danh định dạng file excel theo cách sau:
```
$reader = ImportExcel::createReader("Xlsx");
$spreadsheet = $reader->load("vidu.xlsx");
```

Ở cách trên là ta sử dụng **IOFactory** để đọc file. Tức là thư viện sẽ tự phân tích việc file đó định dạng gì để đọc file. Nếu như trong dự án ta biết chắc chắn là file định dạng gì thì để tối ưu hơn ta có thể dùng reader. Cụ thể như muốn đọc file xlsx ta dùng như sau
```
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$spreadsheet = $reader->load("vidu.xlsx");
```

Nếu ta cần chế độ chỉ có đọc thì như sau
```
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$reader->setReadDataOnly(true);
$spreadsheet = $reader->load("vidu.xlsx");
```
Hoặc ta chỉ mở những sheet cụ thể
```
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$reader->setLoadSheetsOnly(["Sheet 1", "My special sheet"]);
$spreadsheet = $reader->load("vidu.xlsx");
```

Bản thân khi bạn sử dụng IOFactory thì thư viện nó sẽ tìm đến các thư viện tương ứng với file để đọc. Tức là nếu IOFactory::load() mà là file xlsx thì nó sẽ gọi đến \PhpOffice\PhpSpreadsheet\Reader\Xlsx() và xử lý như trên. Do vậy nếu xác định được chính xác định dạng file ta dùng cách ở dưới sẽ tối ưu hơn.

Sau khi đọc nội dung file ta xử lý như bình thường và dữ liệu sẽ đưa vào mảng (??). 
### Đọc file excel dung lượng lớn.
Như cách đọc file ở trên cũng như thư viện 2.1 có 1 vấn đề là khi đọc file excel sẽ đọc toàn bộ file và sau đó đưa hết vào mảng. Như vậy nếu như file nhỏ thì không sao, vì dễ quản lý. Nhưng khi file lớn hơn, việc tạo ra 1 mảng nhiều phần tử (>10k) dẫn đến lỗi allow memory. Vậy gặp trường hợp này các bạn sẽ làm như thế nào? Ở đây mình chia sẻ với các bạn 1 thư viện nữa đó là http://opensource.box.com/spout/ . Cơ chế hoạt động cái này như sau: Thay vì việc đọc toàn bộ file cho các dòng vào 1 mảng, thì nó sẽ thực hiện kiểu con trỏ. Đọc đến từng dòng thì cho data vào bộ nhớ sau đó chúng ta xử lý data, sau khi xong thì con trỏ sẽ đi tiếp dòng tiếp theo và giair phóng bộ nhớ. Như vậy vấn đề allow memory được giải quyết chỉ có vấn đề thời gian xử lý thì đành cho chạy ngầm.
Để cài đặt cũng đơn giản là chúng ta thêm vào composer
```composer.json
    "require": {
        "box/spout": "^2.7"
    }
```
Để đọc file vidu.xlsx ta làm như sau
```
            $reader = Box\Spout\Reader\ReaderFactory::create(Type::XLSX);
            $reader->setShouldFormatDates(true);
            $reader->open('vidu.xlsx');
```
Sau đó để chạy từng sheet là dùng hàm `getSheetIterator()` sẽ trả về các object gồm các sheet. Rồi để đọc từng hàng ta dùng `getRowIterator()`.
Cụ thể
```
            foreach ($reader->getSheetIterator() as $sheet) {
                foreach ($sheet->getRowIterator() as $row) {
                    Xử lý dữ liệu
                }
            }      
```
### Kết luận
Theo ý kiến cá nhân của mình thì thư viện **phpspreadsheet** hỗ trợ mình xử lý file tốt hơn kể cả trong việc đọc và tạo file excel. Nhưng chỉ tốt với những file dung lượng nhỏ, còn những file dung lượng lớn thì ta hẵng dùng **box/spout**.