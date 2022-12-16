Hihi đọc tiêu đề là bạn đã có thể nhận ra ngay nội dung bài viết này nói về tối ưu framwork Laravel rồi. Ơ mà vì sao lại phải tối ưu? 

Câu chuyện là hiện nay Laravel là một PHP framework rất phổ biến, nó được sử dụng ở khắp các web app. Và ai cũng nhận ra rằng việc performance của một trang web là yếu tố rất quan trọng để giữ chân người dùng lại với sản phẩm của mình. Ví dụ:

-  [Pinterest giảm 40% thời gian chờ đợi -> tăng 15% lưu lượng truy cập và chất lượng SEO](https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7)
- [BBC nhận thấy rằng với mỗi 1s tăng thêm khi tải trang web, 10% người dùng sẽ rời đi](https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale)

Trong bài viết này, chúng ta sẽ xem xét qua một số cách để cải thiện hiệu suất của website sử dụng Laravel, biết đâu đó nó sẽ giúp ích cho việc phát triển và duy trì người dùng mà chúng ta vừa đề cập ở bên trên. 
Note: Những tips dưới đây được áp dụng tại phiên bản Laravel 5.8 
# Basics 
### Sử dụng Route Cache
Cách nhanh nhất và đơn giản nhất được nói đến đầu tiên giúp cải thiện performance của web app sử dụng Laravel đó chính là kích hoạt [Route Cache](https://laravel.com/docs/5.7/controllers#route-caching). Chỉ cần thực hiện câu lệnh artisan này ngay sau khi triển khai dự án:
```
php artisan route:cache
```
Những gì lệnh này thực hiện là quét qua tất cả routes trong app của bạn và lưu chúng dưới dạng string được mã hóa base64 tới file bootstrap/cache/routes.php. Nếu file này đã tồn tại, sau này Laravel sẽ bỏ qua quá trình quét routes đó.

Có hai lưu ý khi sử dụng Route Cache:

- Bạn phải refresh route cache mỗi khi routes có sự thay đổi (bằng cách chạy lại câu lệnh php artisan route:cache). Vì vậy, điều này chỉ thực sự phù hợp với môi trường product khi các câu lệnh được thực hiện tự động thôi.
- Route Cache không hoạt động nếu bạn sử dụng Closures trong routes. Đây là lý do tại sao cái command trên kia sẽ không hoạt động trên routes sử dụng Closures làm ví dụ ở project mới khởi tạo. Để giải quyết điều này, bạn phải chuyển routes sang class controller.
### Sử dụng Config Cache
Cách dễ dàng thực hiện tiếp theo giúp cải thiện performance cho Laravel là cho phép [config Cache](https://laravel.com/docs/5.7/controllers#route-caching). Và again, điều này có thể được thực hiện bằng cách chạy command đơn giản sau đây:
```
php artisan config:cache
```
Command này hoạt động tương tự với Route Cache, những gì nó thực hiện là quét qua tất cả các file config, tìm tất cả các biến trong .env và lưu kết quả vào file bootstrap/cache/config.php. Điều này cho phép Laravel chỉ cần load một file cấu hình duy nhất thay vì nhiều file cấu hình mỗi lần chạy.

Giống như Route Cache, khi sử dụng Config Cache cũng cần một số lưu ý:

- Bạn phải refresh config cache mỗi khi file config nào đó hoặc biến trong .env có sự thay đổi (bằng cách chạy lại php artisan config:cache). Vì vậy, điều này giống như ở Route Cache, chỉ thực sự phù hợp với môi trường product.
- Bạn chỉ có thể sử dụng method `env()` trong file config của mình chứ không phải trong các file code dự án, vì file .env không được load sau khi config đã cache lại.
### Sử dụng Eager loading
Với những bạn làm việc với Laravel thì Eloquen ORM đã trở nên rất quen thuộc rồi, và đương nhiên nó giúp cho công việc tương tác với DB trở nên dễ dàng hơn rất nhiều. Và có lẽ vấn đề dưới đây có thể bạn cũng đã tìm hiểu qua rồi, tuy nhiên trong bài viết về optimize thì mình vẫn quyết định liệt kê nó vào một chút.
Ví dụ dưới đây khá đơn giản, mỗi `User` có thể có nhiều `Tasks`. Code trong model User trông sẽ như thế này:
```php
class User extends Model
{
    // ...

    public function tasks()
    {
        return $this->hasMany('App\Task');
    }
}
```
Khi muốn lấy ra tất cả các tasks liên kết với user, code chỉ đơn giản như này:

```php
$tasks = $user->tasks;
```
Tuy nhiên sự đơn giản đôi khi lại phải đánh đổi bằng hiệu năng. Vì khi bạn muốn lấy ra task của tất cả người dùng thì cách đầu tiên có thể nghĩ đến để tận dụng đoạn code trên kia đó là:
```php
$users = User::all();

foreach ($users as $user) {
    $tasks = $user->tasks; // Mỗi lần sẽ đều query lại
    dump($tasks);
}
```
Nếu trong DB có 5 user, đoạn code này sẽ thực hiện 6 truy vấn: 1 để lấy ra tất cả users và 1 truy vấn lấy ra các tasks của từng user.
![](https://images.viblo.asia/52847e0a-759c-4750-8934-79b51edf01f1.png)
6 truy vấn (hay với cái tên quen thuộc là N + 1 query)
Làm thế nào để giải quyết vấn đề này? Laravel cung cấp cho chúng ta Eager load, thay vì sử dụng all() thì chúng ta có thể sử dụng phương thức with() và truyền vào những relation muốn lấy ra
```php
$users = User::with('tasks')->get();

foreach ($users as $user) {
    $tasks = $user->tasks; // Ở đây không còn tạo ra những query mới nữa
    dump($tasks);
}
```
Và giờ chỉ còn 2 truy vấn, bất kể trong DB có bao nhiêu bản ghi đi chăng nữa. 
![](https://images.viblo.asia/824a243e-e504-4e07-b8b2-329a090bd9f1.png)
2 truy vấn


### Sử dụng Chunk
Vấn đề thắt cổ chai khi xử lý kết quả DB sử dụng quá nhiều bộ nhớ. Tưởng tượng khi bạn load vài chục nghìn Models, mỗi model lại có data riêng và relations riêng, và bạn có thể dính ngay chưởng`allowed memory size exhausted error`.

Vấn đề này thường gặp khi có một command được lên lịch chạy trên tất cả users trong DB. Sử dụng code lúc nãy làm ví dụ:
```php
$users = User::all();

foreach ($users as $user) {
    $tasks = $user->tasks;
}
```
Cơ mà nếu DB có khoảng 20.000 users, mỗi user có nhiều tasks, bạn có thể nhận được một cái gì đó như thế này:
![](https://images.viblo.asia/76f93ddf-f6b9-42e3-9f18-c8c1bc6ba62d.gif)

Chạy đc khoảng 88% và toạch, hết bộ nhớ. Vậy làm thế nào để chúng ta giải quyết vấn đề này? Phần này nói về `chunk` thì đương nhiên rồi =)) ở đây chúng ta sử dụng method `chunk()` trong Eloquent được sinh ra để tối ưu bộ nhớ khi làm việc với các bộ dữ liệu lớn. Sửa code 1 chút để chunk DB sẽ như thế này:
```php 
User::chunk(200, function($users) {
    foreach ($users as $user) {
        $tasks = $user->tasks;
    }
});
```
Với việc chunking mỗi lần một nhóm 200 users, việc sử dụng bộ nhớ sẽ được duy trì như này:
![](https://images.viblo.asia/0fd78652-10f6-43ee-a499-1df002f05044.gif)

Bây giờ sẽ không còn quan trọng có bao nhiêu users trong DB nữa, command này sẽ không bao giờ sử dụng hết bộ nhớ.

Lưu ý một chút, chúng ta có thể kết hợp eager leading với chunking để quá trình xử lý trở nên nhanh hơn nhiều và yên tâm hơn với việc xử lý khối lượng dữ liệu trong DB lớn:
```php
User::with('tasks')->chunk(200, function($users) {
    foreach ($users as $user) {
        $tasks = $user->tasks;
        // do some processing...
    }
});
```
# Sử dụng DB indexing để cải thiện tốc độ truy vấn
### DB indexing là gì?
Đây là điều không thể không nhắc đến khi nói đến vấn đề optimize, nếu bạn nghĩ bạn chưa bao giờ sử dụng database indexing trước đây thì surprise mỗi khi bạn tạo bảng trong MySQL với PRIMARY key (thường là id) thì MySQL đã đánh index cho cột đó rồi. 
Database indexing sẽ cải thiện tốc độ truy vấn từ một bảng bằng cách duy trì index của dữ liệu. Kiểu như mục lục của sách nhưng mà áp dụng vào DB của bạn ý. Index được sử dụng để nhanh chóng tìm ra chính xác row data mà không cần scan toàn bộ bảng mỗi lần thực hiện. Với những DB nhỏ thì hiệu suất tăng lên cảm nhận rất khó vì thực ra truy vấn DB có số lượng bản ghi nhỏ rất nhanh. Tuy nhiên khi có hàng triệu bản thì câu chuyện sẽ khác nêu không có index.

Tuy nhiên điều gì cũng có 2 mặt, với những bảng nhỏ có index đôi khi khiến MySQL làm việc mệt hơn vì phải cõng thêm ông index để đọc và khi ghi truy vấn sẽ phải đánh lại index nữa. Vì thế chỉ khi bảng lớn hẳn thì hãy thêm index vào.
### Một số vấn đề khi chưa sử dụng Index
Quay lại với model Task và relation user có nhiều tasks. Tưởng tượng mỗi user có 2 triệu tasks và chúng ta cần lấy tất cả task của user đó.
```php
$user = User::find(1);
$tasks = $user->tasks()->get();
```
Điều đầu tiên bạn có thể nhận thấy là trang sẽ không tải vì PHP sẽ hết bộ nhớ (ví dụ: “Allowed memory size of X bytes exhausted”). Vì vậy, để bắt đầu xem xét vấn đề này, chúng ta sẽ check truy vấn SQL được tạo bởi Laravel:
```php 
SELECT * FROM `tasks` WHERE `tasks`.`user_id` = 1 AND `tasks`.`user_id` IS NOT NULL
```
Chạy truy vấn này mất ~ 1 giây. Không ổn lắm.

Để thấy rõ hơn, chúng ta có thể sử dụng câu lệnh EXPLAIN của MySQL:
```php 
EXPLAIN SELECT * FROM `tasks` WHERE `tasks`.`user_id` = 1 AND `tasks`.`user_id` IS NOT NULL
```
![](https://images.viblo.asia/bbe7f143-28f9-45b4-a59e-ad28e225a88b.png)
Trong trường hợp này, không có index nào được sử dụng và chúng ta phải scan qua tất cả ~ 2,4 triệu rows!

### Khi đã sử dụng Index
Bây giờ, thêm index vào `user_id` cho bảng `tasks`. Bạn có thể làm điều này trong Laravel bằng cách tạo một migration và thêm index mới vào bảng bằng phương thức `$table->index()`:
```php
Schema::table('tasks', function (Blueprint $table) {
    $table->index('user_id');
});
```
Sau khi chạy migration và đánh index, chạy lại truy vấn và kết quả được trả về sau khoảng ~500ms. Bằng nửa thời gian trước luôn! Và lại sử dụng EXPLAIN xem sao:
![](https://images.viblo.asia/8d3c70f0-ebb4-4921-9099-f869eb4387b6.png)

Chúng ta có thể thấy rằng truy vấn hiện đang sử dụng  tasks_user_id_indexmà chúng ta vừa tạo và bằng cách sử dụng index, số lượng hàng mà nó phải quét đã giảm từ ~ 2,4 triệu xuống còn ~ 400.000.

Một điều quan trọng ở đây đó là việc đánh index phụ thuộc không chỉ vào lượng dữ liệu trong bảng mà còn ảnh hưởng bởi cả truy vấn đang thực thi. 

Và nếu bạn có nhiều câu lệnh WHERE , thì việc đánh index có thể thực hiện với mọi columns trong những WHERE đó. Ví dụ với truy vấn:
```php 
SELECT * FROM `tasks` WHERE `tasks`.`user_id` = 1 AND `tasks`.`created_at` >= '2019-03-19 11:00:00'
```
Chúng ta có thể đánh một mảng index như thế này:
```php 
Schema::table('tasks', function (Blueprint $table) {
    $table->index(['user_id', 'created_at']);
});
```
Chạy truy vấn trên với một mảng index đã cải thiện hiệu suất của truy vấn khoảng 50% nữa =)) Đỉnh.

Tuy nhiên, hãy chú ý:

- Thêm nhiều index sẽ tăng kích thước DB của bạn và RAM phải lưu trữ nhiều hơn dữ liệu của DB (vì MySQL cố gắng lưu trữ các index trong bộ nhớ).
- MySQL đủ thông minh để sử dụng các index mặc dù có thể không bao gồm mọi trường trong câu lệnh WHERE. 
- MySQL có thể sử dụng nhiều index nếu cần.
- Thứ tự của các trường trong mảng index cũng có thể cóảnh hưởng đến hiệu năng. Nói chung, chúng nên được đặt với độ ưu tiên từ phổ biến nhất đến ít phổ biến nhất.
# Cải thiện hiệu năng bằng Object Caching
### Object Caching là gì?
Ý tưởng đằng sau Object Caching trái ngược với browser caching hoặc page caching, ở đây chúng ta sẽ lưu trữ kết quả của một câu query được thực hiện rất chậm hoặc một đoạn code quan trọng được cache trong một khoảng thời gian ngắn. Có nghĩa là những lần thực hiện sau với cùng một data sẽ được thực hiện nhanh hơn vì lấy từ cache thay vì thực hiện từ đầu.

Một số điều cần chú ý khi sử dụng Object Caching, đó là thời gian lưu trữ data trong cache. Nó phụ thuộc vào mức độ thay đổi có thường xuyên không, hay tầm quan trọng của việc update dữ liệu như thế nào. Ngoài ra đó là lượng truy cập. Object Caching có thể vô dụng trong vài giây nhưng trang web có lưu lượng truy cập cao thì sẽ là sự khác biệt rất lớn.

[Laravel’s Cache API](https://laravel.com/docs/5.8/cache)
hỗ trợ một số driver khác nhau dùng để cache data (include file, database, memcached và Redis) và tất cả chúng hoạt động như một store chứa các cặp key-value. Cụ thể phần này chúng ta sẽ xem xét đến  việc sử dụng Redis làm bộ đệm vì nó  cache trong RAM khiến cho việc truy cập trở nên nhanh hơn hẳn.
### Vấn đề
Vẫn tiếp tục với ví dụ trên kia. Nếu bây giờ muốn hiển thị biểu đồ về số lượng tasks được tạo mỗi ngày, truy vấn của chúng ta  sẽ trông giống như thế này:
```php
$results = DB::table('tasks')
              ->select(DB::raw('COUNT(*) as total, DATE(created_at) as date'))
              ->where('user_id', $user->id)
              ->groupBy('date')
              ->orderBy('date', 'asc')
              ->get();
```
Ví dụ DB với users có ~ 850.000 tác vụ tải trang với đoạn code này mất ~ 10 giây (truy vấn cơ sở dữ liệu mất ~ 350 ms). Nếu bản report này được sử dụng bởi nhiều users mỗi ngày, thời gian tải chậm sẽ gây khó chịu khi làm việc. Vậy làm thế nào chúng ta có thể giải quyết điều này với Object Caching?
### Cách sử dụng
Việc triển khai Object Caching trong Laravel thực sự rất đơn giản. Đầu tiên coi như đã có có Redis up và chạy trên cổng mặc định ( 6379). Tiếp theo, config Redis trong .env:
```php
CACHE_DRIVER=redis
```
Cài đặt package predis nếu chưa thực hiện trước đây:
```php 
composer require predis/predis
```
Bây giờ, Redis caching đã sẵn sàng sử dụng, update code một chút. Thay vì check xem cache có data cần thiết chưa thì chúng ta có thể sử dụng method `remember()`:
```php 
$cacheKey = 'tasks.' . $user->id;

$results = Cache::remember($cacheKey, now()->addHours(24), function() use ($user) {
    $results = DB::table('tasks')
                  ->select(DB::raw('COUNT(*) as total, DATE(created_at) as date'))
                  ->where('user_id', $user->id)
                  ->groupBy('date')
                  ->orderBy('date', 'asc')
                  ->get();
                  
    return $results;
});
```
Từ giờ, sau lần đầu tiên chạy code, kết quả sẽ được truy xuất từ Redis cache mỗi khi được gọi thay vì thực hiện lại từ đầu.
Và kết quả so với lúc đầu ~10s, bây giờ là 30ms. Chỉ bằng việc active Redis cache và sử dụng method `remember()`.

Một số điều cần lưu ý:

- $cacheKey có chứa $user->id nên luôn là duy nhất. 
- Chú ý việc sử dụng cache không làm lộ thông tin.
- Nếu có thêm truy vấn bằng điều kiện WHERE khác thì hãy thêm biến vào $cacheKey để phân biệt với các key cũ.
- Tối ưu khung thời gian để hiển thị vì dữ liệu cache có thể sẽ vẫn hiển thị ngoài thời gian sử dụng. Có thể giảm thời gian đi để xử lý vấn đề này.

# Kết luận
Trên đây là một vài cách để optimize một website sử dụng Laravel, có thể bạn đã sử dụng hết rồi hoặc chưa. Tuy nhiên vẫn mong rằng bài viết có thể giúp bạn clear được điều gì đó và áp dụng vào dự án của bản thân. Cảm ơn đã theo dõi!

Tham khảo:

https://deliciousbrains.com/