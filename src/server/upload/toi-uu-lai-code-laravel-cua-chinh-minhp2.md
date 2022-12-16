Tiếp nối thành công từ [bài viết](https://viblo.asia/p/toi-uu-lai-code-laravel-cua-chinh-minh-eW65GwGJ5DO) lần trước từ ... `3 năm trước` khi nhận được khá nhiều sự quan tâm của mọi người. Trong bài viết này mình tiếp tục khai thác một số đoạn code khá thối và `refactor` chúng.

Nếu trong bài viết trước mình nêu ra cách tối ưu về cách triển khai `syntax` và `convention` thì ở bài viết này mình sẽ khai thác về khía cạnh `performance` và viết code sao cho dễ triển khai `unit test`.

Nếu là người ngại đọc những thứ lan man thì có thể lướt qua những nội dung chính trong bài mình tổng hợp như sau

* Đừng lạm dụng **destroy** để xóa nhiều bản ghi một lúc vì chúng sẽ tốn nhiều query
* Không dùng **helper** vì nó sẽ khiến bạn viết `unit test` khó hơn
* Đừng gọi thằng biến **env**  trong code nếu muốn dùng `config:cache`
* Hạn chế dùng **whereHas** nếu không muốn hệ thống của bạn chậm như rùa


# 1. Cân nhắc khi xóa bản ghi
Trong Laravel mình thấy mọi người thường dùng 3 `hàm` để xóa một bản ghi **(nếu có cách khác vui lòng comment cho mình biết thêm)**
* ***detete()** của Eloquent Builder*: **https://github.com/laravel/framework/blob/8.x/src/Illuminate/Database/Eloquent/Builder.php#L972**
```php
//Sytaxt
User::where('id', $id)->delete();
```
* ***delete()** của Eloquent Model*: **https://github.com/laravel/framework/blob/8.x/src/Illuminate/Database/Eloquent/Model.php#L1097**
```php
//Syntax
$user = User::find($id); 
$user->delete();
```
* ***destroy()** của Eloquent Model*: **https://github.com/laravel/framework/blob/8.x/src/Illuminate/Database/Eloquent/Model.php#L1062**
```php
//Syntax
User::destroy($id); //$id là một array
```


Trong khi code dự án, mình có một task phải xóa **nhiều bản ghi** trong một `action`.  Chúng ta có 2 cách để thực hiện chúng với tư duy của một lập trình viên biết `sql`
```sql
// Cách 1
DELETE FROM table WHERE id = 1;
DELETE FROM table WHERE id = 4;
DELETE FROM table WHERE id = 6;
DELETE FROM table WHERE id = 7;
// Cách 2 
DELETE FROM table WHERE id IN (1, 4, 6, 7)

```

Trước đây mình hay sử dụng hàm `destroy()` cho tiện vì cú pháp hết sức đơn giản. Nhưng chính vì nó quá tiện nên chúng ta đã rơi vào cái bẫy của `Laravel`. Trước khi đọc code base của `Laravel`, mình **cứ nghĩ** hàm này sẽ dùng `WHERE IN` để tìm các bản ghi rồi thực hiện việc xóa các bản ghi để tiết kiệm `truy vấn`.

Nhưng nhìn qua lại một chút cách mà Laravel đã xây dựng hàm `destroy()`
```php
    public static function destroy($ids)
    {

       ... Còn một số đoạn code nữa nhưng dài quá không show ra  

        // We will actually pull the models from the database table and call delete on
        // each of them individually so that their events get fired properly with a
        // correct set of attributes in case the developers wants to check these.
        $key = ($instance = new static)->getKeyName();

        $count = 0;

        foreach ($instance->whereIn($key, $ids)->get() as $model) {
            if ($model->delete()) {
                $count++;
            }
        }

        return $count;
    }
```
Các bạn nếu để ý kĩ thì thấy `Laravel` đã làm theo tư duy của **cách 1**. Đầu tiên mình cũng phải thốt lên, Laravel thật `ngok ngeck`. 
Và mình cũng nghĩ trong trường hợp trên mình sử dụng hàm **delete() của Eloquent Builder** sẽ tốn ít query hơn.
```php
User::whereIn('id', $id)->delete();
```

Nhưng khoan vội phán xét =)) thực ra họ có lí do cả đấy.

Việc họ tiến hành xóa bản ghi một cách `máy móc` để đảm bảo có thể mỗi khi xóa bản ghi có thể kích hoạt các `model event` như **deleting**, **deleted** đối với *từng bản ghi(record)*. 

Chốt lại vấn đề ở đây chúng ta có thể nhìn nhận khách quan về việc **xóa nhiều bản ghi như sau**.


##### 1. Nếu bạn không cần trigger các **model event**. Hãy sử dụng **whereIn** rồi dùng **delete()** của *Query Builder*.


##### 2. Nếu bạn cần trigger **model event**, Bạn không thể dùng hàm `delete()` của `Query Builder` vì nó không kích hoạt sự kiện của model event, `destroy()` sẽ là một trong số cách lựa chọn của bạn, **tuy nhiên bạn sẽ đối mặt với vấn đề có nhiều truy vấn sql trong một action một cách không cần thiết**

# 2. Cân nhắc trước khi dùng helper
Về bản chất thì `Laravel` có hai loại `helpers` là **Support Helpers** và **Foundation Helpers**

**Foundation Helpers**: *cung cấp những chức năng với input và output đơn giản theo hướng hàm. Ví dụ như **Log**, **Str**, **Collection***

**Support Helpers**: *cung cấp những **api** từ **core classes** của **Laravel**, nó chỉ là "mặt nạ" tham chiếu đến một instance trong 
container*

Chúng ta cùng đi vào ví dụ với 2 loại này.
```php
//Support helpers
logger('Debug message');
// Foundation Helpers
Log::info('Debug message');
```
Bản chất thì cả 2 đều tham chiếu đến đối tượng `\Illuminate\Log\LogManager`. Tuy nhiên khi viết `unit test` chúng ta sẽ thấy việc dùng `Support Helpers` không hề có lợi cho lập trình viên.

Nếu sử dụng `logger()` thì **mình phải hiểu bản chất rằng LogManager được binding thế nào trong container** để mock một đối tượng với key phù hợp.
Còn khi sử dụng `Log facade`, **mình có thể mock "trực tiếp" từ facade theo sự hỗ trợ từ Laravel.**

Unit test với **Support helpers**
```php
$logger = m::mock('Illuminate\Log\LogManager')->shouldReceive('info')->....;
// Vì logger được bind bằng một key là "log" nên muốn giả lập thì phải bind lại nó trong container.
app()->instance('log', $logger);

// run code to test
```

Unit test với **Foundation Helpers**
```php
Log::shouldReceive('info')->....

// run code to test
```

Chốt lại vấn đề là nếu dự án có viết **Unit test**, thì nên cân nhắc việc ngừng sử dụng **Support helpers**. **Vì lúc viết test, phải tìm rất kĩ mới thấy đối tượng để tiến hành mock**.
# 3. Sử dụng biến env
Không chỉ `Laravel (PHP)` mà với tất cả các loại ngôn ngữ lập trình, dự án, không nên sử dụng trực tiếp biến môi trường trong `source code` mà chỉ thao tác với cấu hình.

Trong docs của Laravel cảnh báo về điều này.

> Nếu bạn thực thi "config:cache" trong khi quá trình deploy, bạn nên chắc chắn rằng bạn chỉ gọi hàm env từ những files cấu hình của mình. Một khi cấu hình được cached, file .env sẽ không được load và tất cả kết quả gọi đến env function sẽ trả về null

Vậy muốn sử dụng các biến được lưu trong file `.env` của dự án thì ta phải làm như thế nào ?  câu trả lời là **cho vào config**
```php
// bad
if (env('APP_ENV') !== 'local') {
    URL::forceScheme('https');
}
// good
config/app.php
'env' => env('APP_ENV', 'production'),
logic code
if (config('app.env') !== 'local') {
    URL::forceScheme('https');
}

```
# 4. Hạn chế dùng whereHas

Từng làm qua nhiều dự án `Laravel`, mỗi lần điều tra nguyên nhân query chậm là lại thấy sự xuất hiện của `whereHas`, có rất nhiều issue liên quan đến việc này được đề cập đến như [#18415](https://github.com/laravel/framework/issues/18415), [#3543](https://github.com/laravel/framework/issues/3543). 

Vậy giải pháp ở đây là không dùng whereHas nữa là xong =)) Nhưng vì là một người viết bài có tâm nên mình xin phép giải thích sự hoạt động của `whereHas` để giải thích tại sao nó lại chậm để chúng ta cùng hiểu rõ hơn nhé

```php
Replay::whereHas('players', function ($query) {
    $query->where('battletag_name', 'test');
})->get();
```
Khi chúng ta log query này ra sẽ nhận được câu lệnh sql như sau 

```sql
select * from `replays` 
where exists (
    select * from `players` 
    where `replays`.`id` = `players`.`replay_id` 
      and `battletag_name` = 'test') 
order by `id` asc 
limit 100;
```
Chúng ta có thể thấy khi dùng `whereHas` chúng ta đã sử dụng `subqueries` để truy vấn đến bảng `players` thay vì dùng `joins`. Vì vậy thời gian truy vấn sẽ chậm hơn, trên viblo đã có một bài viết [so sánh rất hay về subqueries và join](https://viblo.asia/p/join-vs-subquery-the-problem-of-mysql-query-optimizer-mrDGMbgXezL#_ket-luan-3) của anh Đinh Hoàng Long, các bạn có thể tham khảo thêm.

Vậy có phải `Laravel` lại ngok ngeck khi dùng `subqueries` hay không ? Tại sao không dùng `join` để truy vấn nhanh hơn ? 
Chúng ta cùng đi qua một số ưu điểm mà **subqueries** mang lại:

* Độ phức tạp ít hơn
* Dễ hiểu, dễ viết
* Tách biệt logic

Vì những ưu điểm trên mà `subqueries` luôn là lựa chọn hàng đầu của `framework` hay `ORMs`. Quay lại chủ đề chính, nếu trường hợp dùng **whereHas** thì refactor như thế nào? Dùng **join** là một lựa chọn 
```php
// Bad
Replay::whereHas('players', function ($query) {
    $query->where('battletag_name', 'test');
})->get();
// Good
Replay::join('players', 'players.replay_id', '=', 'replays.id')->where('players.battletag_name', 'test')->get()
```
# 5.Tổng kết
Nếu bạn là người lười đọc, chỉ cần nhớ 4 nội dung quan trọng sau 
* Đừng lạm dụng `destroy` để xóa nhiều bản ghi một lúc vì chúng sẽ tốn nhiều query
* Không dùng `helper` vì nó sẽ khiến bạn viết `unit test` khó hơn
* Đừng gọi thằng biến `env` trong code nếu muốn dùng `config:cache`
* Hạn chế dùng **whereHas** nếu không muốn hệ thống của bạn chậm như rùa

Cảm ơn các bạn đã theo dõi bài viết, nếu bài viết hữu ích vui lòng upvote và follow để có mình có nhiều động lực viết bài hơn :D 
# 6. Tham khảo

* [ Poor whereHas performance in Laravel](https://stackoverflow.com/questions/46785552/poor-wherehas-performance-in-laravel)

Ngoài ra bài viết là sự học hỏi của mình trong quá trình làm việc tại công ty, được giúp đỡ rất nhiều của các anh em  giúp mình có thêm nhiều kiến thức hơn trong quá trình chia sẻ, chứ không phải kiến thức sâu xa hay nghiên cứu trong sách vở nào cả.