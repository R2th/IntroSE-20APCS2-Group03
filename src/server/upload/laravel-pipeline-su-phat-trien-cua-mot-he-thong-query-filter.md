**Query filter**... một vấn đề quen thuộc khi phát triển một hệ thống. Nhưng khi bắt tay vào code, nhiều câu hỏi quen thuộc hiện lên trong mỗi developer nói chung: "Mình nên để đống logic query này ở đâu? Mình nên quản lý nó như nào cho dễ sử dụng?". Thành thật mà nói, với mỗi một dự án mình phát triển, mình lại viết theo một kiểu riêng, dựa vào kinh nghiệm của những dự án trước để tạo. Và mỗi lần khởi tạo một dự án mới, mình lại tự hỏi bản thân cùng một câu hỏi lần này mình sẽ bố trí query filter như nào! Bài viết này có thể coi như từng bước phát triển một hệ thống query filter, với những vấn đề gặp phải tương ứng.

# Ngữ cảnh bài toán
Ở thời điểm bài viết, mình sử dụng Laravel 9, trên nền PHP8.1 và MySQL 8. Mình tin rằng tech-stack không phải một vấn đề đáng kể, ở đây chúng ta tập trung chủ yếu là xây dựng một hệ thống Query Filter. Trong bài viết này, mình sẽ giả tưởng xây dựng filter cho bảng `users`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('gender', 10)->nullable()->index();
            $table->boolean('is_active')->default(true)->index();
            $table->boolean('is_admin')->default(false)->index();
            $table->timestamp('birthday')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
```

Ngoài ra, mình cũng sử dụng thêm [Laravel Telescope](https://laravel.com/docs/9.x/telescope) để tiện theo dõi query


# Khởi điểm

Trong những ngày đầu tiếp xúc và học sử dụng Laravel, mình thường trực tiếp gọi query ngay tại controller. Đơn giản, dễ hiểu, tuy nhiên cách này tồn tại các vấn đề:

* Một lượng lớn logic đặt tại controller khiến controller bị phình to
* Không thể tái sử dụng
* Nhiều công việc giống nhau lặp đi lặp lại

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __invoke(Request $request)
    {
        // /users?name=ryder&email=hartman&gender=male&is_active=1&is_admin=0&birthday=2014-11-30
        $query = User::query();

        if ($request->has('name')) {
            $query->where('name', 'like', "%{$request->input('name')}%");
        }

        if ($request->has('email')) {
            $query->where('email', 'like', "%{$request->input('email')}%");
        }

        if ($request->has('gender')) {
            $query->where('gender', $request->input('gender'));
        }

        if ($request->has('is_active')) {
            $query->where('is_active', $request->input('is_active') ? 1 : 0);
        }

        if ($request->has('is_admin')) {
            $query->where('is_admin', $request->input('is_admin') ? 1 : 0);
        }

        if ($request->has('birthday')) {
            $query->whereDate('birthday', $request->input('birthday'));
        }

        return $query->paginate();

        // select * from `users` where `name` like '%ryder%' and `email` like '%hartman%' and `gender` = 'male' and `is_active` = 1 and `is_admin` = 0 and date(`birthday`) = '2014-11-30' limit 15 offset 0
    }
}
```

# Sử dụng Local Scope
Để có thể ẩn bớt lượng logic trong khi query, chúng ta cùng thử sử dụng [Local Scope của Laravel](https://laravel.com/docs/9.x/eloquent#local-scopes). Chuyển các query thành các function scope trong model `User`
```php

// User.php
public function scopeName(Builder $query): Builder
{
    if (request()->has('name')) {
        $query->where('name', 'like', "%" . request()->input('name') . "%");
    }
    return $query;
}

public function scopeEmail(Builder $query): Builder
{
    if (request()->has('email')) {
        $query->where('email', 'like', "%" . request()->input('email') . "%");
    }
    return $query;
}

public function scopeGender(Builder $query): Builder
{
    if (request()->has('gender')) {
        $query->where('gender', request()->input('gender'));
    }
    return $query;
}

public function scopeIsActive(Builder $query): Builder
{
    if (request()->has('is_active')) {
        $query->where('is_active', request()->input('is_active') ? 1 : 0);
    }
    return $query;
}

public function scopeIsAdmin(Builder $query): Builder
{
    if (request()->has('is_admin')) {
        $query->where('is_admin', request()->input('is_admin') ? 1 : 0);
    }
    return $query;
}

public function scopeBirthday(Builder $query): Builder
{
    if (request()->has('birthday')) {
        $query->where('birthday', request()->input('birthday'));
    }
    return $query;
}

// UserController.php
public function __invoke(Request $request)
{
    // /users?name=john&email=desmond&gender=female&is_active=1&is_admin=0&birthday=2015-04-11

     $query = User::query()
             ->name()
            ->email()
            ->gender()
            ->isActive()
            ->isAdmin()
            ->birthday();

    return $query->paginate();

    // select * from `users` where `name` like '%john%' and `email` like '%desmond%' and `gender` = 'female' and `is_active` = 1 and `is_admin` = 0 and `birthday` = '2015-04-11' limit 15 offset 0
}
```

Với cách bố trí này, chúng ta đã chuyển phần lớn thao tác với database vào lớp model, tuy vậy việc lặp lại code là khá nhiều. Ví dụ 2 scope filter cho `name` và `email` là giống nhau, tương tự với nhóm `gender` `birthday` và `is_active` `is_admin`. Chúng ta sẽ tiếp cận theo hướng nhóm các query tương tự nhau

```php
// User.php
public function scopeRelativeFilter(Builder $query, $inputName): Builder
{
    if (request()->has($inputName)) {
        $query->where($inputName, 'like', "%" . request()->input($inputName) . "%");
    }
    return $query;
}

public function scopeExactFilter(Builder $query, $inputName): Builder
{
    if (request()->has($inputName)) {
        $query->where($inputName, request()->input($inputName));
    }
    return $query;
}

public function scopeBooleanFilter(Builder $query, $inputName): Builder
{
    if (request()->has($inputName)) {
        $query->where($inputName, request()->input($inputName) ? 1 : 0);
    }
    return $query;
}


// UserController.php
public function __invoke(Request $request)
{
    // /users?name=john&email=desmond&gender=female&is_active=1&is_admin=0&birthday=2015-04-11

    $query = User::query()
        ->relativeFilter('name')
        ->relativeFilter('email')
        ->exactFilter('gender')
        ->booleanFilter('is_active')
        ->booleanFilter('is_admin')
        ->exactFilter('birthday');

    return $query->paginate();

    // select * from `users` where `name` like '%john%' and `email` like '%desmond%' and `gender` = 'female' and `is_active` = 1 and `is_admin` = 0 and `birthday` = '2015-04-11' limit 15 offset 0
}
```

Lúc này chúng ta đã nhóm gần hết những thứ trùng lặp. Tuy vậy, muốn khử if hoặc là mở rộng các filter này sang bên model khác thì có chút khó khăn. Chúng ta cùng tìm kiếm một phương pháp giải quyết triệt để vấn đề này.

# Sử dụng Pipeline pattern

**Pipeline design pattern** là một design pattern cung cấp khả năng xây dựng và thực thi một chuỗi các hành động theo từng bước. Laravel đã xây dựng sẵn khung Pipeline giúp chúng ta có thể dễ dàng ứng dụng design pattern này trong thực tế, nhưng vì lý do nào đó nó ko được liệt kê trên offical documentation. Bản thân Laravel cũng áp dụng Pipeline để apply được cái middleware nằm giữa Request và Response. Cơ bản nhất thì để sử dụng Pipeline trong Laravel, chúng ta có thể dùng mẫu:

```php
app(\Illuminate\Pipeline\Pipeline::class)
    ->send($intialData)
    ->through($pipes)
    ->thenReturn(); // data with pipes applied
```

Đối với bài toán của chúng ta, có thể áp dụng truyền vào pipeline một intial query `User:query()`, trải qua các bước filter, trả về một query builder đã được apply các filter vào.
```php
app(\Illuminate\Pipeline\Pipeline::class)
    ->send(User::query())
    ->through($filters)
    ->thenReturn(); // builder with filters applied
```

Với ý tưởng này, chúng ta cùng xây dựng prototype trên controller
```php
// UserController
public function __invoke(Request $request)
{
    // /users?name=john&email=desmond&gender=female&is_active=1&is_admin=0&birthday=2015-04-11

    $query = app(Pipeline::class)
        ->send(User::query())
        ->through([
            // filters
        ])
        ->thenReturn();

    return $query->paginate();

    // select * from `users` where `name` like '%john%' and `email` like '%desmond%' and `gender` = 'female' and `is_active` = 1 and `is_admin` = 0 and `birthday` = '2015-04-11' limit 15 offset 0
```

Bắt tay vào xây dựng các pipe filters

```php
// File: app/Models/Pipes/RelativeFilter.php

<?php

namespace App\Models\Pipes;

use Illuminate\Database\Eloquent\Builder;

class RelativeFilter
{
    public function __construct(protected string $inputName)
    {
    }

    public function handle(Builder $query, \Closure $next)
    {
        if (request()->has($this->inputName)) {
            $query->where($this->inputName, 'like', "%" . request()->input($this->inputName) . "%");
        }
        return $next($query);
    }
}


// File: app/Models/Pipes/ExactFilter.php

<?php

namespace App\Models\Pipes;

use Illuminate\Database\Eloquent\Builder;

class ExactFilter
{
    public function __construct(protected string $inputName)
    {
    }

    public function handle(Builder $query, \Closure $next)
    {
        if (request()->has($this->inputName)) {
            $query->where($this->inputName, request()->input($this->inputName));
        }
        return $next($query);
    }
}

//File: app/Models/Pipes/BooleanFilter.php
<?php

namespace App\Models\Pipes;

use Illuminate\Database\Eloquent\Builder;

class BooleanFilter
{
    public function __construct(protected string $inputName)
    {
    }

    public function handle(Builder $query, \Closure $next)
    {
        if (request()->has($this->inputName)) {
            $query->where($this->inputName, request()->input($this->inputName) ? 1 : 0);
        }
        return $next($query);
    }
}

// UserController
public function __invoke(Request $request)
{
    // /users?name=john&email=desmond&gender=female&is_active=1&is_admin=0&birthday=2015-04-11

    $query = app(Pipeline::class)
        ->send(User::query())
        ->through([
            new \App\Models\Pipes\RelativeFilter('name'),
            new \App\Models\Pipes\RelativeFilter('email'),
            new \App\Models\Pipes\ExactFilter('gender'),
            new \App\Models\Pipes\BooleanFilter('is_active'),
            new \App\Models\Pipes\BooleanFilter('is_admin'),
            new \App\Models\Pipes\ExactFilter('birthday'),
        ])
        ->thenReturn();

    return $query->paginate();

    // select * from `users` where `name` like '%john%' and `email` like '%desmond%' and `gender` = 'female' and `is_active` = 1 and `is_admin` = 0 and `birthday` = '2015-04-11' limit 15 offset 0
}
```

Bằng việc chuyển mỗi logic query từng class riêng biệt, chúng ta đã mở khóa khả năng tùy biến sử dụng OOP như bao gồm đa hình, kế thừa, đóng gói, trừu tượng. Ví dụ các bạn thấy trong hàm `handle` của pipe, chỉ có phần logic nằm trong *if statement* là khác nhau, mình sẽ tách và trừu tượng hóa nó bằng cách tạo ra một class abstract `BaseFilter`
```php
//File: app/Models/Pipes/BaseFilter.php

<?php

namespace App\Models\Pipes;

use Illuminate\Database\Eloquent\Builder;

abstract class BaseFilter
{
    public function __construct(protected string $inputName)
    {
    }

    public function handle(Builder $query, \Closure $next)
    {
        if (request()->has($this->inputName)) {
            $query = $this->apply($query);
        }
        return $next($query);
    }

    abstract protected function apply(Builder $query): Builder;
}

// BooleanFilter
class BooleanFilter extends BaseFilter
{
    protected function apply(Builder $query): Builder
    {
        return $query->where($this->inputName, request()->input($this->inputName) ? 1 : 0);
    }
}

// ExactFilter
class ExactFilter extends BaseFilter
{
    protected function apply(Builder $query): Builder
    {
        return $query->where($this->inputName, request()->input($this->inputName));
    }
}

// RelativeFilter
class RelativeFilter extends BaseFilter
{
    protected function apply(Builder $query): Builder
    {
        return $query->where($this->inputName, 'like', "%" . request()->input($this->inputName) . "%");
    }
}
```

Giờ Filter của chúng ta đã trực quan và có tính tái sử dụng cao, dễ dàng triển khai và thậm chí mở rộng hơn, chỉ cần tạo một pipe, `extends BaseFilter` và khai báo function `apply` là đã có thể nhét vào query để sử dụng.

# Kết hợp Local Scope với Pipeline
Thời điểm này, chúng ta sẽ cố gắng ẩn đoạn Pipeline trên controller đi, giúp cho đoạn code của chúng ta sạch sẽ hơn, bằng cách tạo 1 scope gọi tới Pipeline bên trong Model
```php
// User.php
public function scopeFilter(Builder $query)
{
    $criteria = $this->filterCriteria();
    return app(\Illuminate\Pipeline\Pipeline::class)
        ->send($query)
        ->through($criteria)
        ->thenReturn();
}

public function filterCriteria(): array
{
    return [
        new \App\Models\Pipes\RelativeFilter('name'),
        new \App\Models\Pipes\RelativeFilter('email'),
        new \App\Models\Pipes\ExactFilter('gender'),
        new \App\Models\Pipes\BooleanFilter('is_active'),
        new \App\Models\Pipes\BooleanFilter('is_admin'),
        new \App\Models\Pipes\ExactFilter('birthday'),
    ];
}


// UserController.php
public function __invoke(Request $request)
{
    // /users?name=john&email=desmond&gender=female&is_active=1&is_admin=0&birthday=2015-04-11

    return User::query()
        ->filter()
        ->paginate()
        ->appends($request->query()); // append all current queries into pagination links

    // select * from `users` where `name` like '%john%' and `email` like '%desmond%' and `gender` = 'female' and `is_active` = 1 and `is_admin` = 0 and `birthday` = '2015-04-11' limit 15 offset 0
}
```

`User` đã có thể gọi filter từ bất cứ đâu. Nhưng để các model khác cũng có thể triển khai filter thì chúng ta sẽ tìm các khai báo dễ dàng hơn. Lúc này mình sẽ tạo một Trait chứa scope và chìa ra khai báo các pipe tham gia quá trình filters bên trong model
```php
// User.php

use App\Models\Concerns\Filterable;

class User extends Authenticatable {
        use Filterable;
        
        protected function getFilters()
        {
            return [
                new \App\Models\Pipes\RelativeFilter('name'),
                new \App\Models\Pipes\RelativeFilter('email'),
                new \App\Models\Pipes\ExactFilter('gender'),
                new \App\Models\Pipes\BooleanFilter('is_active'),
                new \App\Models\Pipes\BooleanFilter('is_admin'),
                new \App\Models\Pipes\ExactFilter('birthday'),
            ];
        }
        
        // the rest of code
  
  
  
// File: app/Models/Concerns/Filterable.php

namespace App\Models\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pipeline\Pipeline;

trait Filterable
{
    public function scopeFilter(Builder $query)
    {
        $criteria = $this->filterCriteria();
        return app(Pipeline::class)
            ->send($query)
            ->through($criteria)
            ->thenReturn();
    }

    public function filterCriteria(): array
    {
        if (method_exists($this, 'getFilters')) {
            return $this->getFilters();
        }

        return [];
    }
}
```

Chúng ta đã giải quyết ổn thỏa vấn đề chia để trị, mỗi file mỗi class mỗi function giờ đã có trách nhiệm rõ ràng, không ôm đồm quá nhiều công việc. Code cũng vì thế mà sạch sẽ trực quan và dễ dàng tái sử dụng hơn rất nhiều rồi đúng không! Mình sẽ để code của toàn bộ quá trình [Demo bài này tại đây](https://github.com/l3aro/query-filter-evolution)


# Lời kết
Trên đây là một phần nào đó hành trình mà mình đã trải qua để xây dựng một hệ thống Query Filter nâng cao, đồng thời giới thiệu tới các bạn một số hướng tiếp cận lập trình Laravel như `Local Scope` và đặc biệt `Pipeline design pattern`. Để nhanh chóng và dễ dàng áp dụng hệ thống này cho một Project mới, các bạn có thể tham khảo và sử dụng [package Pipeline Query Collection](https://github.com/l3aro/pipeline-query-collection), gồm một bộ các pipe mình đã dựng sẵn giúp dễ dàng cài cắm và sử dụng. Hi vọng mọi người sẽ ủng hộ