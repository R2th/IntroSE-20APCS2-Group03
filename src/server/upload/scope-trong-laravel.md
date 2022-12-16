Chào các bạn, ngày hôm này mình sẽ cùng các bạn tìm hiểu qua cách sử dụng scope cơ bản trong Laravel. 
## Global Scope
Hãy tưởng tượng rằng bạn cần thêm một ràng buộc vào tất cả các truy vấn tới model. Nếu các bạn đã từng tìm hiểu qua soft delete trong laravel thì nó chính là một dạng global scope, mỗi khi truy vấn tới model sẽ chỉ lấy ra các bản ghi chưa được xóa mềm từ database. Viết một global scope sẽ giúp chúng ta thuận tiện hơn khi thêm ràng buộc tới từng truy vấn tới model.
### Writing Global Scopes
Đầu tiên chúng ta tạo một class implement interface Illuminate\Database\Eloquent\Scope . Interface **Scope** yêu cầu bạn phải có một phương thức **apply**. Sau đó chúng ta có thể thêm các mệnh đề where hoặc ràng buộc để giống như ví dụ dưới đây:
```
<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class AncientScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('created_at', '<', now()->subYears(2000));
    }
}
```
### Applying Global Scopes
Để có thể thực hiện gán một global scope cho một model bạn cần phải ghi đè phương thức static **booted** của model và gọi phương thức **addGlobalScope** của model:
```
<?php

namespace App\Models;

use App\Scopes\AncientScope;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::addGlobalScope(new AncientScope);
    }
}
```
Sau khi chúng ta đã thêm global scope như ví dụ trên, ghi truy vấn **User::all()** câu truy vấn bây giờ sẽ tương tự như sau:
```
select * from `users` where `created_at` < 0021-02-18 00:00:00
```
### Anonymous Global Scopes
Eloquent cũng giúp chúng ta có thể thêm một global scope bằng closures, khi sử dụng closures để định nghĩa global scope bạn nên xác định tên global scope ở tham số đầu tiên như ví dụ dưới đây:
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::addGlobalScope('ancient', function (Builder $builder) {
            $builder->where('created_at', '<', now()->subYears(2000));
        });
    }
}
```
### Removing Global Scopes
Đương nhiên cũng có nhiều trường hợp chúng ta không cần dùng đến global scope cho một truy vấn nào đó, Laravel đã giúp chúng ta tất cả mọi thử rồi bạn chỉ cần sử dụng phương thức **withoutGlobalScope** với tham số đầu tiên là tên class scope của bạn hoặc nếu bạn sử dụng closures để định nghĩa global scope bạn cần thêm vào tên của global scope đó:
```
//class scope
User::withoutGlobalScope(AncientScope::class)->get();

//closures scope
User::withoutGlobalScope('ancient')->get();
```
Nếu bạn muốn xóa tất cả ràng buộc global scope hoặc một vài cái thì bạn có thể sủ dụng phương thức **withoutGlobalScopes**
```
// Remove all of the global scopes...
User::withoutGlobalScopes()->get();

// Remove some of the global scopes...
User::withoutGlobalScopes([
    FirstScope::class, SecondScope::class
])->get();
```
## Local Scopes
Khác với global scope là luôn gọi đến ràng buộc mỗi khi truy vấn, local scope sẽ giúp bạn định nghĩa những trường hợp bạn cần thêm ràng buộc và gọi tới nó bất cứ đâu. Để định nghĩa một local scope bạn cần thêm một phương thức bắt đầu với scope trong model:
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Scope a query to only include popular users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePopular($query)
    {
        return $query->where('votes', '>', 100);
    }

    /**
     * Scope a query to only include active users.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('active', 1);
    }
}
```
### Utilizing A Local Scope
Để sử dụng local scope cũng đơn giản thôi chúng ta chỉ cần gọi tới tên scope mỗi khi muốn truy vấn tới model ví dụ:
```
use App\Models\User;

$users = User::popular()->active()->orderBy('created_at')->get();
```
Và bạn để ý rằng không có chứ scope phía trước mỗi khi gọi tới tên của local scope nhé.
### Dynamic Scopes
Laravel cũng hỗ trợ chúng ta thêm tham số vào local scope mỗi khi chúng ta cần gọi đến ví dụ sau đây tôi sẽ truyền vào local scope một tham số **type** để thêm value cho ràng buộc của mình:
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Scope a query to only include users of a given type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  mixed  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }
}
```
Sau đó mỗi khi gọi tới tôi chỉ cần thêm giá trị tham số type vào scope
```
$users = User::ofType('admin')->get();
```

Dưới đây là một chút chia sẻ về scope trong Laravel. Cảm ơn các bạn đã quan tâm.
Tham khảo: https://laravel.com/docs/8.x/eloquent#anonymous-global-scopes