### Sử dụng Relationships để tránh các query lớn

Bạn đã bao giờ sử dụng một tấn joins ^^ trong một câu query chỉ để có thêm thông tin? Thật khó để viết các câu SQL đó, ngay cả với Query Bulder, nhưng model đã làm điểu đó với  Relationships. Ban đầu, có lẽ bạn không quen với việc làm quen, do lượng thông tin lớn mà tài liệu cung cấp, nhưng điều này sẽ giúp bạn hiểu rõ hơn về cách thức hoạt động của mọi thứ và làm thế nào để ứng dụng của bạn chạy mượt hơn.

Xem tài liệu về Relationships [tại đây](https://laravel.com/docs/5.7/eloquent-relationships)

### Sử dụng Jobs cho các tác vụ tốn thời gian

[Laravel Jobs](https://laravel.com/docs/5.7/queues) là một công cụ mạnh mẽ dùng để chạy các tác vụ dưới background.

* Bạn muốn gửi mail? Jobs.
* Bạn muốn gửi tin nhắn? Jobs.
* Bạn muốn xử lý hình ảnh? Jobs.
...

Jobs giúp bạn bỏ qua thời gian chờ cho người dùng của mình vào các tác vụ tốn thời gian. Chúng có thể được đặt vào hàng đợi được đặt tên, chúng có thể được ưu tiên và đoán xem -- Laravel có thể triển khai hàng đợi ở mọi nơi, có thể: xử lý PHP trong background, hoặc gửi thông báo...

Bạn có thể xem tài liệu về Queues’ [tại đây](https://laravel.com/docs/5.7/queues)

### Bám sát vào tiêu chuẩn cơ sở dữ liệu và Accessors

Laravel dạy bạn ngay từ đầu rằng các biến và phương thức của bạn phải là `$camelCase` `camelCase()` trong khi các trường trong cơ sở dữ liệu của bạn phải là `snake_case`. Tại sao? Vì điều này giúp xây dựng `Accessors` tốt hơn.

Accessors là các trường tùy chỉnh, chúng ta có thể xây dựng ngay trong model của mình. Nếu trong cơ sở dữ liệu chứa `first_name` và `last_name`, chúng ta có thể thêm trường tùy chỉnh `name` là tên nối liền của `first_name` và `last_name`. Đừng lo lắng, điều này không được viết trong DB bằng mọi cách. Nó chỉ là một thuộc tính tùy chỉnh mà model có. Tất cả accessors, như Scopes, có một cú pháp đặt tên tùy chỉnh `getSomethingAttribute`:

```php
class User extends Model
{
   ...
   public function getNameAttribute(): string
   {
       return $this->first_name.' '.$this->last_name;
   }
}
```

Khi sử dụng `$user->name`, nó sẽ trả về chuỗi được nối trong hàm trên.

Mặc định, thuộc tính `name` sẽ không hiển thị nếu chúng ta `dd($user)`, nhưng chúng ta có thể làm điều này bằng cách sử dụng biến `$appends`:

```php
class User extends Model
{
   protected $appends = [
      'name',
   ];
   ...
   public function getNameAttribute(): string
   {
       return $this->first_name.' '.$this->last_name;
   }
}
```

Bây giờ, mỗi lần chúng ta `dd($user)` đều thấy `name` ở đó(nhưng không có trong cơ sở dữ liệu)

Tuy nhiên, hãy cẩn thận:, nếu bạn đã có trường `name`, mọi thứ sẽ khác một chút: `name` trong `$appends` không còn cần thiết nữa và hàm thuộc tính cần 1 tham số, đó là biến đã được lưu trữ.

Ví dụ, chúng ta muốn `ucfirst` cho `first_name` và `last_name`:

```php
class User extends Model
{
   protected $appends = [
      //
   ];
   ...
   public function getFirstNameAttribute($firstName): string
   {
       return ucfirst($firstName);
   }
   public function getLastNameAttribute($lastName): string
   {
      return ucfirst($lastName);
   }
}
```

Bây giờ, khi chúng ta gọi `$user->first_name`, nó sẽ trả về một chuỗi có chữ cái đầu tiên in hoa.

Do có tính năng này nên bạn hãy sử dụng `snake_case` trong cơ sở dữ liệu của bạn.

### Không nên lưu dữ liệu tĩnh liên quan đến model trong config

Thay vì:

`BettingOdds.php`

```php
class BettingOdds extends Model
{
   ...
}
```

`config/bettingOdds.php`

```php
return [
   'sports' => [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ],
];
```

Và có thể gọi chúng bằng cách:

```php
config(’bettingOdds.sports.soccer’);
```

Tôi thích làm điều này:

`BettingOdds.php`

```
class BettingOdds extends Model
{
   protected static $sports = [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ];
}
```

Và có thể gọi chúng bằng cách:

```php
BettingOdds::$sports['soccer'];
```

Tại sao? Vì chúng dễ sử dụng hơn trong các hàm tiếp theo.

```php
class BettingOdds extends Model
{
   protected static $sports = [
      'soccer' => 'sport:1',
      'tennis' => 'sport:2',
      'basketball' => 'sport:3',
      ...
   ];
   public function scopeSport($query, string $sport)
   {
      if (! isset(self::$sports[$sport])) {
         return $query;
      }
      
      return $query->where('sport_id', self::$sports[$sport]);
   }
}
```

Và bây giờ chúng ta có thể gọi đến scope:

```
BettingOdds::sport('soccer')->get();
```

Nguồn: https://medium.com/@alexrenoki/pushing-laravel-further-best-tips-good-practices-for-laravel-5-7-ac97305b8cac