# Giới thiệu :
Hello mọi người , sau khi làm gần xong một dự án, mình đã học thêm được một vài điều mới khá là thú vị để cùng chia sẻ với mọi người. Hôm nay, mình ngoi lên để cùng mọi người trao đổi một chút về Gates Và Policies trong Laravel nhé :sunglasses::sunglasses::sunglasses: 

Ngoài việc cung cấp các authentication services , Laravel cũng cung cấp một cách đơn giản hơn để phân quyền cho các hành động của người dùng đối với một tài nguyên nhất định. Chúng ta có hai cách để thực hiện việc authorizing đó là : gates và policies.

Như trong tài liệu đã ghi :

```
Think of gates and policies like routes and controllers. Gates provide a simple, Closure based approach to authorization while policies, like controllers, group their logic around a particular model or resource. We'll explore gates first and then examine policies.
```
#  Gates :
Gates là một Closures xác định người dùng được cho phép để thực hiện một hành động nhất định. Chúng ta định nghĩa trong class App\Providers\AuthServiceProvider và  use Illuminate\Support\Facades\Gate.
Gates luôn luôn nhận một action của người dùng là đối số đầu tiên, chúng ta có thể tùy biến nhận đối số bổ sung như là một relevant Eloquent model:

```php
use Illuminate\Support\Facades\Gate;

 public function boot()
    {
            Gate::define('update-post', function($user, $post) {
                    return $user->id == $post->user_id;
            });
    }
```

Khi return một authorization response từ gates, **Gate::allows** return về giá trị boolean , nếu bạn muốn tự tùy biến response trả về, có thể sử dụng **Gate::inspect**


```php
$response = Gate::inspect('update-post', $post); 
if ($response->allowed()) {
        // The action is authorized... 
} else { 
        echo $response->message(); 
}
```

Và cuối cùng để sự dụng Gates thì chúng ta dùng như sau : 

```php
Gate::authorize('update-post', $post);
```

# Policies :

Theo mình hiểu thì Policies là một Class quản lí các authorizing logic. Ví dụ nhé, mình có một trang quản lí và chỉ có Admin hay Pm mới có thể tạo project mới, thì chúng ta có mô hình Project và ProjectPolicy tương ứng để phân quyền cho các hành động của người dùng như tạo hoặc cập nhật project.
### Khởi tạo Policies : 
Chúng ta có thể khởi tạo Policies bằng câu lệnh : 

**php artisan make:policy ProjectPolicy** hoặc gắn thêm cùng với model **php artisan make:policy ProjectPolicy  --Project**

### Đăng kí Polices : 

Sau khi tạo xong để đăng kí policies, chúng ta đăng kí trong App\Providers\AuthServiceProvider.php mà chúng ta vừa tạo., ví dụ nhé :

```php
namespace App\Providers;

use App\Models\Form;
use App\Models\HoleSecurity;
use App\Models\Project;
use App\Models\Report;
use App\Models\Template;
use App\Models\UserProject;
use App\Policies\FormPolicy;
use App\Policies\HoleSecurityPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\ReportPolicy;
use App\Policies\TemplatePolicy;
use App\Policies\UserProjectsPolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        Template::class => TemplatePolicy::class,
        Form::class => FormPolicy::class,
        Project::class => ProjectPolicy::class,
        HoleSecurity::class => HoleSecurityPolicy::class,
        Report::class => ReportPolicy::class,
        UserProject::class => UserProjectsPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
```

Và để thiết lập quyền cho user nào được tạo project chúng ta đăng kí trong policies chúng ta vừa tạo : 

```php
public function view(User $user, Project $project)
    {
        $roleUser = $user->roles()->pluck('role_id')->first();

        return $roleUser === Role::ADMIN
        || $project->userProjects->where('user_id', $user->id)->first() != null;
    }
```


Cuối cùng cách sử dụng rất là đơn giản thôi, trong controller ta gọi như sau : 
**Gate::authorize('view', $project);**

# Kết bài : 
Đó là cách sử dụng đơn giản về Gates và Policies mà mình đã dùng trong project đang làm, rất vui vì được chia sẻ cùng với mọi người :kissing_smiling_eyes::kissing_smiling_eyes::kissing_smiling_eyes: