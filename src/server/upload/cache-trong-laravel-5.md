*Chào các bạn, trong bài viết này mình sẽ giới thiệu cho các bạn về cache và các phương thức được sử dụng trong bộ nhớ cache của Laravel 5.*
# A) Cache là gì và cách cấu hình bộ nhớ cache trong Laravel 5
## 1. Cache là gì
Cache hay còn được gọi là bộ nhớ đệm về cơ bản là một lớp ở giữa website và cơ sở dữ liệu của bạn. Những dữ liệu được lưu trữ trong bộ nhớ cache có thể là kết quả của những lần xử lý trước hoặc là bản sao dữ liệu được lưu trữ ở nơi khác (ví dụ trong cơ sở dữ liệu). Các truy vấn tới cơ sở dữ liệu có thể bị chậm nếu bạn có nhiều người truy cập vào website cùng lúc. Lớp cache sẽ hoạt động như là trung gian để lưu trữ những dữ liệu không thay đổi giữa các request và việc lấy các thông tin từ bộ nhớ cache sẽ nhanh hơn rất nhiều hơn là việc bạn phải tính toán lại kết quả hoặc truy vấn lại tới cơ sở dữ liệu của bạn.
Chẳng hạn như bạn dùng bộ nhớ cache trong blog cá nhân thì khi bạn đưa lên một post mới thì nội dung của post đó gần như sẽ không thay đổi vì vậy bạn không cần thiết phải yêu cầu cơ sở dữ liệu một bản copy nội dung của post đó mỗi khi có request gửi lên. Thay vào đó bạn lưu post đó trong cache thì sẽ phải truy vấn cơ sở dữ liệu 1 lần và nếu bạn muốn cập nhật post đó trong tương lai thì chỉ cần xóa post đó trong bộ nhớ đệm và cập nhật nội dung mới vào trong cơ sở dữ liệu.
## 2. Cấu hình Cache trong Laravel 5
Laravel cung cấp một API thống nhất cho nhiều hệ thống bộ nhớ cache khác nhau, các cấu hình cho bộ nhớ cache được đặt trong file config/cache.php. Trong file này, bạn có thể xác định driver cho bộ nhớ cache được sử dụng mặc định trong ứng dụng của mình. Laravel hỗ trợ các bộ nhớ đệm phổ biến như Memcached và Redis.
Ngoài ra, trong file cấu hình config/cache.php còn có nhiều tùy chọn khác được ghi chú trong file. Theo mặc định, Laravel được cấu hình để sử dụng driver bộ nhớ cache ‘file’ tức là sẽ lưu trữ tuần tự các đối tượng dựa trên các file tại đường dẫn storage/framework/cache. Đối với các ứng dụng lớn hơn, bạn nên sử dụng một bộ nhớ đệm trong (in-memory cache) như Memcached hoặc APC.
Chi tiết các tùy chọn cấu hình trong file config/cache.php như sau:
![](https://images.viblo.asia/332bf5e0-6cbc-4f2f-807d-53ed9f2d34db.png)
*default*: Tùy chọn này thiết lập driver bộ nhớ cache mặc định được sử dụng. Thiếp lập mặc định là ‘file’ tức là sử dụng hệ thống bộ nhớ cache của tệp tin hệ thống (filesystem). Ngoài lựa chọn mặc định ra các bạn có thể lựa chọn: database, apc, memcached, redis và array.
![](https://images.viblo.asia/55712634-f3a0-44c6-9a8e-8339bd5d322e.png)
*stores*: tùy chọn này cho bạn thiết lập vị trí lưu trữ cho tất cả các bộ nhớ cache trong ứng dụng của bạn cũng như driver của chúng.
![](https://images.viblo.asia/0d23d82e-b271-44d9-8fc3-48578aefda0e.png)
*prefix*: Khi triển khai việc lưu trữ trên RAM như APC hoặc Memcached thì sẽ có khả năng các ứng dụng khác cũng sử dụng cùng một bộ nhớ cache. Vì vậy, để tránh xung đột ta thiết lập một giá trị tiền tố (prefix) cho tất cả các từ khóa (key) lưu trữ.
## 3. Các thiết lập bắt buộc của một số bộ nhớ cache
*Database*
Khi sử dụng driver bộ nhớ cache là database thì bạn cần phải tạo ra một bảng để chứa các đối tượng cần lưu trữ. Để tạo bảng đó thì đầu tiên các bạn cần vào console và vào thư mục ứng dụng và gõ lệnh sau để tạo model Cache bằng lệnh php artisan make:model Cache –m như sau:
![](https://images.viblo.asia/efc8449b-6d94-477a-9d12-5c46862d02ba.png)
Tiếp theo các bạn vào file migration mới tạo trong database/migrations có tên _create_caches_table và chỉnh sửa hàm up như sau:
```
public function up()
{
        Schema::create('caches', function (Blueprint $table) {
            $table->string('key')->unique();
            $table->text('value');
            $table->integer('expiration');
        });
}    
```
Sau đó các bạn vào console và gõ lệnh php artisan migrate để tạo bảng cache trong cơ sở dữ liệu như sau:
![](https://images.viblo.asia/6e0a70a4-67e6-43b9-ae77-0eb5a7c878c7.png)
**Memcached**
Sử dụng Memcached yêu cầu bạn cần phải cài đặt Memcached PECL package.
**Redis**
Trước khi sử dụng bộ nhớ cache Redis với Laravel thì bạn cần phải cài đặt thông qua composer thông qua lệnh composer require predis/predis. Bạn có thể xem chi tiết hơn về việc cấu hình Redis tại https://laravel.com/docs/5.2/redis#configuration
# B) Các phương thức được sử dụng với bộ nhớ cache trong Laravel
## 1. Tạo đối tượng bộ nhớ cache
Laravel cung cấp các contract Illuminate\Contracts\Cache\Factory và Illuminate\Contracts\Cache\Repository để truy cập vào các dịch vụ bộ nhớ cache của Laravel.
(Contract là một tập hợp các interface thiết lập các dịch vụ được cung cấp bởi Laravel Framework bạn có thể xem thêm thông tin tại https://laravel.com/docs/5.2/contracts )
Contract Factory cho phép bạn truy cập tới tất cả các driver bộ nhớ cache cho ứng dụng của bạn được xác định trong file cấu hình cache của bạn.
Tuy nhiên bạn nên sử dụng facade cache để có thể truy cập thuận tiện và dễ dàng hơn tới các contract bộ nhớ cache được Laravel sử dụng. (Facade là cách để Laravel sử dụng các chức năng được cung cấp từ các class được sử dụng thông qua các service provider)
Ví dụ cách import facade cache vào trong UsersController:
```
use Cache;
class UsersController extends Controller
{
    public function index()
    {
        $value = Cache::get('key');
    }
}
```
## 2. Lấy dữ liệu từ trong bộ nhớ cache
Phương thức get trong facade cache trong laravel 5 được sử dụng để lấy dữ liệu từ bộ nhớ cache. Nếu dữ liệu được yêu cầu không có trong bộ nhớ cache thì phương thức sẽ trả về giá trị null. Nếu muốn, bạn có thể đưa vào một tham số thứ hai tới phương thức get để xác định giá trị mặc định sẽ trả về trong trường hợp dữ liệu được yêu cầu không tồn tại:
```
 $value = Cache::get('key');

 $value = Cache::get('key','default');
```
Trong một số trường hợp bạn muốn lấy một dữ liệu từ trong bộ nhớ cache tuy nhiên nếu dữ liệu đó không có thì bạn sẽ lưu một giá trị mặc định vào. Chẳng hạn như nếu bạn muốn lấy thông tin tất cả người dùng từ bộ nhớ cache tuy nhiên nếu không có thì bạn sẽ lấy thông tin đó từ cơ sở dữ liệu và thêm nó vào bộ nhớ cache. Để làm được việc đó bạn sẽ sử dụng phương thức Cache::remember như sau:
```
 $minutes = 60;//Thời gian hết hạn
       
 $value = Cache::remember('users',$minutes,function(){
      return DB::table('users')->get();
 });
```
Nếu bạn muốn lấy dữ liệu từ bộ nhớ cache sau đó xóa nó đi thì bạn có thể sử dụng phương thức pull. Cũng giống như phương thức get, giá trị null sẽ được trả về trong phương thức pull nếu dữ liệu không tồn tại trong bộ nhớ cache:
```
 $value = Cache::pull('key');
```
## 3. Kiểm tra việc tồn tại của dữ liệu trong bộ nhớ cache
Để kiểm tra việc tồn tại của dữ liệu trong bộ nhớ cache bạn có thể sử dụng phương thức has như sau:
```
 if(Cache::has('key'))
 {
   //Code nếu có giá trị trong bộ nhớ cache 
 }
```
## 4. Tăng và giảm các giá trị đối với các dữ liệu kiểu integer
Để tăng hay giảm giá trị của các dữ liệu kiểu interger trong bộ nhớ cache bạn có thể dùng phương thức increment và decrement. Mặc định giá trị được tăng/giảm là 1 tuy nhiên bạn có thể đưa vào một tham số thứ 2 để xác định số giá trị được tăng hay giảm với giá trị của dữ liệu:
```
$amount = 5; //Số giá trị muốn tăng / giảm
 Cache::increment('key');
 Cache::increment('key',$amount);
 
 Cache::decrement('key');
 Cache::decrement('key',$amount);
```
## 5. Lưu trữ dữ liệu vào bộ nhớ cache
Để lưu dữ liệu vào bộ nhớ cache thì bạn có thể sử dụng phương thức put trong façade cache. Khi thêm dữ liệu mới vào bộ nhớ cache thì bạn cần phải xác định thời gian (theo số phút) mà giá trị dữ liệu đó hết hiệu lực:
```
 $minutes = 60;//Thời gian hết hạn
 Cache::put('key','value',$minutes);
```
Ngoài ra, thay vì việc xác định số phút thì bạn có thể truyền vào một giá trị PHP Datetime để xác định thời gian hết hiệu lực của dữ liệu ví dụ như sau:
```
 $expiresAt = Carbon::now()->addDays(7); //Đặt thời gian hết hạn sau 1 tuần
 Cache::put('key','value',$expiresAt);
```
Laravel còn cung cấp một phương thức khác để chỉ thêm dữ liệu vào trong bộ nhớ cache trong trường hợp nó chưa xuất hiện trong bộ nhớ cache đó là phương thức add. Phương thức add sẽ trả về giá trị true nếu thêm thành công dữ liệu vào bộ nhớ cache còn không sẽ trả về false:
```
  Cache::add('key','value',$minutes);
```
Để lưu trữ một giá trị trong bộ nhớ cache vĩnh viễn thì bạn có thể sử dụng phương thức forever:
```
Cache::forever('key','value');
```
Để xóa một dữ liệu trong bộ nhớ cache thì bạn có thể sử dụng phương thức forget trong facade cache như sau:
```
Cache::forget('key');
```
Còn nếu bạn muốn xóa toàn bộ tất cả các dữ liệu trong bộ nhớ cache thì bạn có thể sử dụng phương thức flush:
```
Cache::flush();
```
Trong bài viết này mình đã giới thiệu cho các bạn về bộ nhớ cache và các phương thức được sử dụng trong bộ nhớ cache. Trong phần sau mình sẽ làm một ví dụ cụ thể để các bạn có thể hiểu rõ hơn về cách sử dụng cache trong thực tế.