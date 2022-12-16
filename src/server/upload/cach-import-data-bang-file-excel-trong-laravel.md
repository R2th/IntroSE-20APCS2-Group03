# 1. Giới thiệu
Bài viết trước mình đã chia sẻ cho mọi người cách export file excel trong `Laravel`. Hôm nay mình sẽ tiếp tục chia sẻ cho mọi người cách import file excel.
# 2. Cài đặt
## 2.1. Cài đặt package
Đầu tiên muốn sử dụng được thì các bạn cần cài package `maatwebsite/excel` bằng `composer` như sau:
```
composer require maatwebsite/excel
```
## 2.2. Tùy chỉnh cấu hình excel
Để làm được điều này các bạn cần chạy
```
php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
```
Lệnh này có tác dụng copy file config của `maatwebsite/excel` ra bên ngoài. File mới sẽ có tên là `config/excel`
# 3. Import bằng maatwebsite/excel
Đầu tiên các bạn cần chạy câu lệnh `artisan` để tạo ra một file export
```
php artisan make:import UserImport
```
Một file import sẽ được tạo ra. Nó sẽ trông như thế này
```
class UserImport implements ToModel
{
    public function model(array $row)
    {
        return new User([
            //
        ]);
    }
}
```
`maatwebsite/excel` hỗ trợ sẵn chúng ta một số function để chúng ta có thể dễ dàng thực thi về logic hay về hiện thị như một số function sau đây:
## 3.1. function model()
Đúng với tên gọi của nó, function này có chức năng để thao tác với DB để thay đổi dữ liệu.
```
$rm = User::where('email', $row['email'])->first();
        if ($rm) {
            $rm->update($row);
        } else {
            $password = Str::random(8);
            $row['password'] = Hash::make($password);
            $rm = User::create($attributes);
        }
```
Đoạn code trên sẽ thực thi như sau. Nếu mà data import trong file excel trùng email thì mình sẽ cập nhật các trường còn lại. Còn không sẽ cập nhật data.
## 3.2. function map()
Một function khác cũng khá là quan trọng là `map()`. Function này sẽ giúp ta mapping dữ liệu trong file excel
```
public function map($row): array
    {
        return [
            'name' => trim($row[self::FIRST_NAME]), //index=0
            'email' => trim($row[self::EMAIL]), //index=1
            'status' => trim($row[self::STATUS]), //index=2
        ];
    }
```
Để sử dụng function này cần implements interface `Maatwebsite\Excel\Concerns\WithMapping`
## 3.3. function startRow()
function này sẽ giúp ta biết nên đọc dữ liệu từ hàng nào. Trong một số file có heading việc sử dụng function này là cần thiết. Để sử dụng ta cần implements interface `Maatwebsite\Excel\Concerns\WithStartRow`.
```
 public function startRow(): int
    {
        return config('excel.imports.start_row'); // return 2;
    }
```
## 3.4. function rules()
- Có một câu nói rằng " Đừng bao giờ tin vào người dùng". Vì thế trong mọi trường hợp chúng ta cần validate dữ liệu. function rules validate dữ liệu đầu vào giúp ngăn chặn lỗi xảy ra. Để sử dụng chúng ta cần implements interface `Maatwebsite\Excel\Concerns\WithValidation`
```
public function rules(): array
    {
        return [
            'name' => [
                'bail',
                'required',
                'string',
                'max:'.'50',
            ],
            'email' => [
                'bail',
                'required',
                'max:'.config('validation.maxlength_input'),
                'email',
                new EmailRule(),
            ],
            'tel' => [
                'bail',
                'required',
                'max:'.config('validation.maxlength_input'),
            ],
        ];
    }
```
# 4. Tạo routes
Chúng ra cần tạo 2 routes để hiện thị và import file
```
Route::get('/import', 'ImportUserController@importBlade');
Route::post('/import', 'ImportUserController@import')->name('import');
```
# 5. Tạo template
Ở đây mình chỉ tạo một template đơn giản thực hiện cho việc gửi file như sau:
```
<form action="{{ route('import') }}" method="post" enctype="multipart/form-data">
    @csrf
    <input type="file" name="file_user" id="file_user">
    <button type="submit">Submit</button>
</form>
```
# 6. Tạo controller
Mỗi khi thao tác với dữ liệu chúng ta cần tạo controller. Ở đây mình sẽ tạo một controller như sau:
```
php artisan make:controller ImportUserController
```
Controller sẽ chứa các fucntion như sau
## 6.1. __construct()
```
//Hàm này sẽ inject hàm UserImport mà chúng ta vừa tạo
use App\Imports\UserImport;
public function __construct(UserImport $userImport)
    {
        $this->userImport = $userImport;
    }
```
## 6.2. importBlade()
```
//function này sẽ hiển thị blade view
public function importBlade()
    {
        return view('admin.Import.import');
    }
```
## 6.3. import()
```
//function này sẽ thực thi import
public function import(Request $request)
    {
        try {
            $this->userImport->import($request->file('file_user'));
        } catch (\Exception $e) {
            report($e);
        }
    }
```
# 7. Kết luận

Hi vọng bài viết này sẽ giúp ích được cho các bạn. Nếu có thắc mắc hay câu hỏi gì đừng ngần ngại comment dưới post này nha. Ngoài ra các bạn có thể tham khảo post mình viết về import excel Laravel. Cám ơn các bạn 🤗
https://viblo.asia/p/cach-export-data-ra-file-excel-trong-laravel-Eb85ozX6l2G