# Hypothesis
Có khi nào bạn phát triển cho một hệ thống mà bảng user có nhiều khóa chính chưa nhỉ? Điều này không có vẻ khá là ít gặp. Và trong dự án mới mình đã gặp cái điều ít gặp này. Hơi bị hách não, vì làm quen với laravel thì thường làm kiểu 1 user có một khóa chính. Vì thế mình đã tốn hơi nhiều công sức cho cái việc login. Thực ra thì sau khi làm xong, custom đủ kiểu bla.... thì mình thấy nó cũng đơn giản thôi, vấn đề là phải đi đọc core code của laravel để custom lại. (Mình ghét điều này).

Đầu tiên bảng user với nhiều khóa chính của mình tương tự như sau (tất cả chỉ là ví dụ thôi nhé)
 ```
       Schema::create('users', function (Blueprint $table) {
            $table->string('account');
            $table->string('email');
            $table->string('firstname');
            $table->string('lastname');
            $table->timestamps();
            $table->primary(['account', 'email' ]);
        });
```
Và trong model User ta cần khai báo lại khóa chính như sau
```
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    protected $primaryKey = [
        'account',
        'email',
    ];
    public $incrementing = false;
    protected $fillable = [
        'account',
        'email',
        'firstname',
        'lastname',
    ];
}
```
# Problem
Đấy bài toán là login với table user như thế. Nếu cứ login một cách thông thường như laravel đã support `Auth:attempt($input)` thì kiểu gì cũng gặp lỗi, tin mình đi. 
Nào để lỗi không xảy ra thì ta đi tìm nguyên nhân vậy. Khi bạn gọi method `attempt()` của laravel, method này sẽ gọi đến method `getAuthIdentifier()` xác định key của session là khóa chính để lưu lại.
 ```
   /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        return $this->{$this->getAuthIdentifierName()};
    }
```
`$this->{$this->getAuthIdentifierName()}` ở đây sẽ trả về cho bạn value của khóa chính. 

Nếu như model có tận 2 khóa chính vậy thì `$this->{$this->getAuthIdentifierName()};` sẽ trả về một mảng. 

Và việc `updateSession()` thực hiện sẽ gặp khó khăn khi nó chỉ nhận một giá trị mà `$this->{$this->getAuthIdentifierName()};` lại cho nó tận một mảng. Và thế là lỗi. 
# Resolve
Để giải quyết lỗi này thì mình custom lại cả function `getAuthIdentifier()`. `getAuthIdentifier()` thuộc `Authenticatable` nên ta chỉ cần ném function này vào model là được (vì model đã extends `Authenticatable`)
```
    public function getAuthIdentifier()
    {
        $authIdentifier = null;
        if (is_array($this->getAuthIdentifierName())) {
            foreach ($this->getAuthIdentifierName() as $key => $value) {
                $authIdentifier .= $this->{$value} . ' ';
            }
            $authIdentifier = trim($authIdentifier);
        } else {
            $authIdentifier = $this->{$this->getAuthIdentifierName()};
        }
        return $authIdentifier;
    }
```
Ok, đến đây mình đã xong được bước đầu. Ở trên ta đã gán lại giá trị cho `getAuthIdentifier()`, điều này có nghĩa là ta sẽ phải custom lại `retrieveById($id)`, `retrieveByToken($identifier, $token)` cho phù hợp với `getAuthIdentifier()` mà ta đã tạo ra. 

 Tuy nhiên thì retrieveById và retrieveByToken thuộc `EloquentUserProvider` (hoặc `DatabaseUserProvider`). Mà chúng ta đâu thể chọc thằng vào sửa ở 2 class này được. 
 
 Cách hay nhất là custom lấy một thằng UserProvider (và lại phải custom, vui rồi đấy).  Trong folder provider mình sẽ tạo ra 1 provider (ví dụ là MySelfUserProvider chẳng hạn) extend của `EloquentUserProvider` (hoặc `DatabaseUserProvider`). 
 
```
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Illuminate\Contracts\Auth\UserProvider;
use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Contracts\Auth\Authenticatable as UserContract;
use Illuminate\Auth\EloquentUserProvider;

class MySelfUserProvider extends EloquentUserProvider implements UserProvider
{
    protected $model;
    protected $hasher;
    /**
     * Create a new database user provider.
     *
     * @param  \Illuminate\Contracts\Hashing\Hasher  $hasher
     * @param  string  $model
     * @return void
     */
    public function __construct(HasherContract $hasher, $model)
    {
        $this->model = $model;
        $this->hasher = $hasher;
    }
    
    public function retrieveById($identifier)
    {
        $model = $this->createModel();
        if (is_array($model->getAuthIdentifierName())) {
            $identifierArray = explode(' ', $identifier);
            $queryVaule = array_combine($model->getAuthIdentifierName(), $identifierArray);
            return $model->newQuery()
                ->where($queryVaule)
                ->first();
        }
        return $model->newQuery()
            ->where($model->getAuthIdentifierName(), $identifier)
            ->first();
    }
    
    public function retrieveByToken($identifier, $token)
    {
        $model = $this->createModel();
        if (is_array($model->getAuthIdentifierName())) {
            $identifierArray = explode(' ', $identifier);
            $queryVaule = array_combine($model->getAuthIdentifierName(), $identifierArray);
            $model = $model->where($queryVaule)->first();
        } else {
            $model = $model->where($model->getAuthIdentifierName(), $identifier)->first();
        }
        
        if (! $model) {
            return null;
        }
        $rememberToken = $model->getRememberToken();
        return $rememberToken && hash_equals($rememberToken, $token) ? $model : null;
    }
}
```
Gần xong rồi, bây giờ thì khai báo MySelfUserProvider vào trong AuthServiceProvider 
```
    public function boot()
    {
        $this->registerPolicies();
        Auth::provider('mySelfUserProvider', function ($app, array $config) {
            return new MySelfUserProvider($app['hash'], $config['model']);
        });
    }
```
Tạo xong provider mới thì sử dụng thông nào. Vào config/auth chỉnh sửa thôi
```
'providers' => [
        'users' => [
            'driver' => 'mySelfUserProvider',
            'model' => App\User::class,
            'table' => 'users',
        ],
]
```
Done, xong rồi, vấn đề đã được giải quyết.