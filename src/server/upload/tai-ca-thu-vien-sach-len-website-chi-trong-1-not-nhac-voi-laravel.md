## Giới thiệu bài toán:
Sau nhiều giờ ngồi upload từng cuốn e-book lên website - 1 việc cần thiết nhưng thật sự tốn thời gian.. Thì mình đã nghĩ ra ý tưởng upload e-books số lượng lớn lên web chỉ với 1 cú click!
## Ý tưởng:
Mình sẽ sử dụng file excel cho việc điền thông tin từng cuốn sách, như vậy là có thể tải lên hàng nghìn cuốn chỉ với 1 file duy nhất :D

Với mỗi cuốn e-book của mình sẽ gồm các thuộc tính quan trọng cần lưu trữ như sau:
* name: tên cuốn sách
* type: thể loại cuốn sách
* des: mô tả sách
* url: đường dẫn đến file pdf( tất nhiên cần lưu lại file pdf vào bộ nhớ)
* page: số trang sách
* views: lượt xem( để mặc định là 0 khi mới upload).

=> Với các trường name, type, des, url, page mình có thể lưu dưới dạng text trong 1 hàng là đủ, nhưng bản pdf cần lưu trữ vào bộ nhớ thì không làm vậy được.
Vậy thì mình đành để ngoài file excel thôi và nhớ nén nó lại để tải lên nhanh hơn nhé.
## Và đến việc thực hiện ý tưởng:
Mình sẽ phải đi giải quyết 2 việc nho nhỏ cho 1 ý tưởng to to phía trên:
1. Xử lý upload và extract file Zip.
2. Import file Excel và lưu trữ thông tin các cuốn sách.

### 1. Upload and Extract Zip file:
* Tạo 1 form bên view để upload file zip, nhớ cho vào sau @if để người dùng kịp thời phát hiện lỗi nha:
```php
@if ($errors->any())
     <h4 style="color: red">{{ $errors->first() }}</h4>
@endif
<form method='post' action='' enctype='multipart/form-data'>
    @csrf
    <label for="url">File upload (.zip):</label>
    <input type='file' name='file' required><br/>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```
*  Viết code trong `BookController.php` để xử lý việc upload file Zip:

     Ở đây, mình cần lấy được file Zip và để xem nào: nếu có file zip được upload thì mình sẽ giải nén file đó với `ZipArchive` của PHP và lưu thư mục giải nén vào bộ nhớ để xử lý( khi này mình sẽ lấy được 1 file Excel ngàn dòng và ngàn file pdf nội dung sách nhé ; ))
 ```php
 $file = $request->file('file');
 $tmp_name = $file->getPathname();
 $zip = new ZipArchive;
 $res = $zip->open($tmp_name);
if ($res === TRUE) {
    //lưu folder đã được giải nén vào storage
    $path = storage_path('app/public/zip');
    $zip->extractTo($path);
    $zip->close();
    
    return true;
}
 ```
*  Tiếp theo mình cần truy cập đến thư mục vừa giải nén để lấy dữ liệu :
```php
$unzipfile = substr($file->getClientOriginalName(), 0, -4);
$path = storage_path('app/public/zip/'.$unzipfile);
$files = File::allFiles($path);
```
*  Do cần lưu lại các file pdf vào thư mục `media` nên mình sẽ duyệt lần lượt từng file trong thư mục như này:
```php
foreach ($files as $file) {
    if ($file->getExtension() == 'pdf') {
        $pdftext = file_get_contents($file);
        //đếm số trang sách:
        $page = preg_match_all("/\/Page\W/", $pdftext, $dummy);
        $pdf = array(
            $file->getFilename() => $page,
        );
        $listpdfs = array_merge($listpdfs, $pdf);
        //copy các file pdf vào thư mục media để tiện truy xuất sau này
        File::copy($path.'/'.$file->getFilename(), storage_path('app/public/media/pdf/'.$file->getFilename()));
    }
}
```
Như vậy là đã xong việc giải nén và lưu trữ được nghìn file pdf rồi. Giờ mình chỉ cần lấy thông tin của các cuốn sách tương ứng và lưu vào database là xong ; D
### 2. Import Excel file using Maatwebsite package:
* Đầu tiên cần cài đặt package thông qua composer với câu lệnh:
```
composer require maatwebsite/excel
```
Sau đó kiểm tra xem trong file config/app.php, phần providers và alias đã có `Maatwebsite` chưa:
```php
'providers' => [
    /*
     * Package Service Providers...
     */
    Maatwebsite\Excel\ExcelServiceProvider::class,
]

'aliases' => [
    ...
    'Excel' => Maatwebsite\Excel\Facades\Excel::class,
]
```
Để publish config, hãy chạy câu lệnh vendor như sau:
```php
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider" --tag=config
```
* Tiếp đến, mình cần tạo 1 class `app/Imports/BooksImport.php` để xử lý việc import và đọc file Excel, nhớ truyền mảng listpdfs khi nãy để có thể lưu Book ngay sau khi đọc file Excel nhá:
```php
//implements interface ToModel sẽ có thể dùng hàm model() ;v
class BooksImport implements ToModel, WithValidation
{
    use Importable;
    protected $listpdfs;
    public function __construct(array $listpdfs)
    {
        $this->listpdfs = $listpdfs;
    }
    public function model(array $row)
    {
        return new Book([
            'name' => $row[0],
            'type' => $row[1],
            'des' => $row[2],
            'url' => $row[3],
            'page' => $this->listpdfs[$row[3]],
            'views' => 0,
        ]);
    }
}
```
Vậy là công việc lưu ngàn sách đã hoàn tất, bonus validation để còn bán được cho người khác nữa hehe. Và nhớ implements `WithValidation` để dùng được hàm `rules()` nhé, mình sẽ viết tiếp đoạn code này sau hàm `model()`:
```php
public function rules(): array
{
    return [
        '0' => 'bail|required|max:255',
        '3' => 'bail|required|mimes:pdf'
    ];
}

public function customValidationMessages()
{
    return [
        '0.required' => 'The name must be required',
    ];
}
```
## Kết luận:
Vậy là kết thúc một ý tưởng. Hẹn gặp mọi người trong các ý tưởng tiếp theo : D

Code và tư tưởng còn nhiều hạn chế ;> mong được mọi người comment chỉnh sửa ạ. Loves and Thanks!
### Tài liệu tham khảo:
https://docs.laravel-excel.com/3.1/getting-started/installation.html

https://www.php.net/manual/en/book.zip.php

https://laravel.com/docs/8.x/validation