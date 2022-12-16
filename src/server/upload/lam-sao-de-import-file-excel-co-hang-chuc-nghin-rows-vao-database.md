### I. Lời mở đầu
![](https://images.viblo.asia/af98dc3a-0038-4151-8e2a-795da9b836a3.png)
Trong những năm gần đây, việc lưu trữ dữ liệu hay thông tin ra file excel là khá phổ biến. Và việc lưu lại thông tin dữ liệu lên máy chủ để sử dụng cho các mục đích khác nhau là rất cần thiết. Bài toán được nói đến ở đây là chúng ta làm thế nào để cùng lúc import một lượng dữ liệu lớn vào CSDL của máy chủ (trang web của chúng ta).
### II. Bài toán
Import file excel có hàng chục, hàng trăm nghìn rows vào CSDL trang web.
### III. Giải quyết
* Công nghệ Backend: [Laravel 6.2](https://laravel.com/)
* Package: [Laravel-Excel](https://laravel-excel.com/)
* Redis: [Redis 6.0](https://redis.io/)
* Tham khảo :
    * [Tìm hiểu về các bài toán với dữ liệu lớn][https://viblo.asia/p/mot-so-bai-toan-khi-lam-viec-voi-du-lieu-lon-ma-ban-can-biet-3P0lPYb45ox]
    * [Laravel Queue][https://viblo.asia/p/ban-biet-gi-ve-laravel-queue-phai-chang-doi-cho-la-hanh-phuc-djeZ1DWYKWz]

**1. Cài đặt redis:**
```bash
    sudo apt-get update
    sudo apt-get install build-essential tcl
    wget http://download.redis.io/releases/redis-stable.tar.gz
```
Sau khi download redis xong, giải nén redis:
```bash
    tar xzf redis-stable.tar.gz
```
Tiếp tục đi vào folder và **make**:
```bash
    cd redis-stable && make
```
Kiểm tra lại quá trình biên soajn:
```bash
    make test
```
Nếu không có gì lỗi thì bạn bắt đầu chạy cài đặt:
```bash
    sudo make install
```
Khởi động redis server:
```bash
    /usr/local/bin/redis-server
```
Và cuối cùng ping thử xem redis có chạy không:
```bash
    redis-cli ping
    PONG
```
**2.  Khởi tạo project:**
```bash
    composer create-project --prefer-dist laravel/laravel project-excel
```
config cho queue:
```bash
    #-------------------------------------------------------------------------------
    # Worker
    #-------------------------------------------------------------------------------

    QUEUE_CONNECTION=redis
```
**3. Bắt đầu nào:**

Tạo một migration có tên là data, tại đây sẽ lưu trữ toàn bộ thông tin của file excel
```bash
    php artisan make:migration create_data_table
```

Thêm các fields cần lưu trữ: ```name```, ```phone``` và ```address```
```php
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('phone');
            $table->string('address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data');
    }
```
Tiếp đó ta khởi tạo model ```Data```:
```php
    protected $table = 'data';

    protected $fillable = [
        'name',
        'phone',
        'address',
    ];
````
Cài đặt package laravel-excel:
```bash
    composer require maatwebsite/excel
```
Đăng ký ServiceProvider trong config/app.php
```php
    'providers' => [
        /*
         * Package Service Providers...
         */
        Maatwebsite\Excel\ExcelServiceProvider::class,
    ]
```
Và cuối cùng chạy command để tạo ra file config/excel.php
```bash
    php artisan vendor:publish --provider="Maatwebsite\Excel\ExcelServiceProvider"
```
Sau khi đã cài đăt xong package tiếp đến ta tiến hành viết code thôi nào =))

Tạo controller xử lý import:
- Input: Request truyền vào là 1 file excel đã có sẵn data.
- Output: Data được lưu trữ trong CSDL và thông báo thành công.
```php
<?php

namespace App\Http\Controllers\Import;

use App\Imports\DataImport;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ImportQuestion extends Controller
{
    public function __invoke(Request $request)
    {
        Excel::import(new DataImport(), $request->file('file'));

        return response()->json([
            'status' => 'success',
        ], 200);
    }
}
```

Tạo một service xử lý file import: Phần này sẽ dùng packge laravel-excel để xử lý lấy ra data trong file excel.
function ```collection``` sẽ chuyển các rows trong file excel về dạng collection từ đó ta có thể bóc tách được các thành phần.
```php
        /**
         * @param Collection $collection
         */
        public function collection(Collection $userCollections)
        {
            foreach ($userCollections as $key => $user) {
                dispatch(new Import($user));
            }
        }
```

![](https://images.viblo.asia/cafdc57d-0d26-4269-a55c-8605af96f8aa.png)

function ```startRows``` xử lý file excel từ hàng thứ 2 trở đi tức là bỏ phần header ```Name```, ```Email```, ...

```php
    public function startRow(): int
    {
        return 2;
    }
```

function ```chunkSize``` lấy ra lần lượt tổng số rows trong mỗi lần đọc để tránh quá tải.

```php
    public function chunkSize(): int
    {
        return 200;
    }
```
Cuối cùng ta sẽ có một class như sau:
```php
<?php

namespace App\Imports;

use App\Jobs\Data\Import;
use App\Models\User;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Contracts\Queue\ShouldQueue;

class DataImport implements ToCollection, ShouldQueue, WithChunkReading, WithStartRow
{
    /**
     * @param Collection $collection
     */
    public function collection(Collection $userCollections)
    {
        foreach ($userCollections as $key => $user) {
            dispatch(new Import($user));
        }
    }

    // Bỏ phần header không cần thiết của file excel
    public function startRow(): int
    {
        return 2;
    }

   // Lấy lần lượt và Xử lý 200 rows liên tiếp (tránh việc lấy tất cả các rows sẽ khiến server quá tải)
    public function chunkSize(): int
    {
        return 200;
    }
}
```
Tạo một job có chạy queue để lưu trữ trong trường hợp này sẽ phải lưu một dữ liệu lượng lớn dữ liệu nên ta sẽ phải đẩy nó vào queue.
```php
<?php

namespace App\Jobs\Data;

use App\Models\Data;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class Import implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Data::create([
            'name' => $this->user[0],
            'phone' => $this->user[1],
            'address' => $this->user[2],
        ]);
    }
}
```
Mở command và chạy queue rồi test thử ta sẽ thu được kết quả ahihi.

```bash
    php artisan queue:work
```
![](https://images.viblo.asia/3fbe26ba-d9cf-4cdb-80d1-881c86adc487.png)

Input:

![](https://images.viblo.asia/35bb33e9-d4b6-4ba3-afb8-aa5b2e0cdb51.png)

Output:

![](https://images.viblo.asia/fd201343-b91b-4d30-a648-55f9a3ce5020.png)
### IV. Tạm kết
Qua bài viết chắc hẳn bạn đã có thể import một lượng lớn dữ liệu từ file excel vào CSDL rồi đúng không nào. Rất mong được sự góp ý từ mọi người. Ahihi =))
![](https://images.viblo.asia/9c0bd5e7-d1fd-420f-be19-92e1de7d8a24.jpg)