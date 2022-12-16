### I. Đặt vấn đề
- Như tiêu đề bài viết, bài lần này mình sẽ hướng dẫn cách làm import csv qua [ Laravel Excel](https://github.com/Maatwebsite/Laravel-Excel)
- Vấn đề này mình gặp phải và đã mất mấy ngày, vì khi dùng package này theo tìm hiểu thì chỉ set dc đúng 1 encoding (cay), khi set cái này QA lại dùng cái khác import, rồi đến khách...chẳng nhẽ mình lại bảo họ chỉ được dùng 1 loại ? vậy đâu có được....
- File config excel.php của [ Laravel Excel](https://github.com/Maatwebsite/Laravel-Excel) có attribute là `input_encoding`, ở đây `Laravel Excel` có để sẵn mặc định là encoding `UTF-8`.
![](https://images.viblo.asia/1823ccca-f35c-48c4-8e88-ab160d0e77bd.png)
- Nhưng ở Nhật họ thường dùng Shift-JIS (hoặc cũng có thể loại khác như UJIS, ANSI...)
- Như lẽ thường thì dĩ nhiên mình cũng đã set SJIS vào config trên, mọi thứ hoạt động ok được vài ngày thì khách lại dùng file với encoding khác. :v
### II. Giải quyết vấn đề.
Sau vài lần thì mình cũng oải may quá nảy ra 1 ý là mình sẽ detect định dạng encoding thì họ có dùng encoding của Thổ Nhĩ Kỳ, Hy Lạp...cho đến teencode thì mình cũng làm được, may qua suy nghĩ đơn sơ thế mà cũng tìm ra cách <3
Và đây là cách giải quyết của mình 
```
function setInputEncoding($file) {
    $fileContent = file_get_contents($file->path());
    $enc = mb_detect_encoding($fileContent, mb_list_encodings(), true);

    \Config::set('excel.imports.csv.input_encoding', $enc);
}
```
Ý nghĩa:
- Dòng 1: function `file_get_contents` sẽ đọc nội dung trong file.
- Dòng 2: function `mb_detect_encoding` sẽ dectect encoding dựa vào [mb_list_encodings](https://www.php.net/manual/en/function.mb-list-encodings.php) và trả ra encoding của file đã upload
- Dòng 3: sẽ can thiệp vào config tại thời điểm đó - tức là n sẽ thay đổi r sau khi thực hiện xong chức năng sẽ quay trở lại như cũ (khác với việc ghi đè vào file nhé).
### III. Thực hiện việc upload file
- Mình muốn chia sẻ cái mình tìm hiểu nên trông nó hơi ngắn :)) vậy nên mình sẽ hướng dẫn thực hiện cách upload file luôn.
- Package này rất hay ở chỗ đã thực hiện chunk file ra cho mình, nên cũng đã hạn chế được phần nào việc đọc file nặng (Bạn nên dùng)
* Controller
```
    public function upload(UploadRequest $request)
    {
        try {
            $inputs = $request->all();
            setInputEncoding($inputs['file']);
            Excel::import(new ModelImport, $inputs['file']);

            return redirect()->back()->with('success', 'Upload File Thành Công');
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
            $failures = $e->failures();

            return redirect()->back()->with('failures', $failures);
        }
    }
```
- hàm setInputEncoding sẽ được chạy trước khi Laravel Excel thực hiện đọc file upload.
- Ở đây nếu bạn k sử dụng queue mà muốn hiển thị lỗi validate trong lúc import thì hãy làm như mình như phần catche nhe.
* File Import
```
<?php

namespace App\Imports;

use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithValidation;
use Illuminate\Support\Facades\Validator;
use App\Models\Model;

class ModelImport implements ToModel, WithChunkReading, WithStartRow, WithValidation
{
    use Importable;

    /**
     * @var row
     */
    private $row = 1;

    public function model(array $row)
    {
        Model::create([
            'name' => $row[0],
        ]);
    }

    public function rules(): array
    {
        return [
            '0' => [
                'required',
                'string',
            ],
        ];
    }

    public function chunkSize(): int
    {
        return 1000;
    }

    public function startRow(): int
    {
        return 2;
    }
}
```
- Ở đây mình k dùng queue, còn nếu bạn dùng queue thì nếu lỗi validate thì có thể lấy từ database (queue database)....hoặc dùng các loại queue khác.
-  hàm `chunkSize` mình thấy rất lợi hại trong package này, nó thực sự cần thiết nếu dự án nào tiết kiệm k sử dụng queue (như dự án mình =))).
### III. Kết thuc
- Trên đây là cách mình làm việc khi import csv, với những loại encoding không thực sự nhiều người dùng và phổ biến. Hi vọng sẽ giúp được các bạn đang gặp phải vấn đề như mình
- Còn một vấn đề nhỏ nữa có thể xảy ra trong khi upload đó là mình sử dụng ubuntu khi tạo file csv và gửi sang cho khách (dùng window) thì có thể sẽ rơi vào case là máy tính tự change extension của file (csv -> xls) nên bạn cũng có thể lưu ý thêm vấn đề này khi validate file nhe (lol)