Hi mọi người,<br>
Bài viết này mình sẽ chia sẻ cách sử dụng factory tinker trong laravel 8.<br>
Như mọi người đã biết testing là một phần rất quan trọng của bất kỳ dự án phát triển web nào.<br>
Đôi khi chúng ta có yêu cầu phải thêm 100 hoặc 1000 dummy records(dữ liệu giả) vào tables nào đó hoặc chức năng phân trang dữ liệu phải cần đến nhiều bản ghi để test.<br>
Thay vì dùng tay để insert dummy records vào tables và mất nhiều thời gian để insert chúng.
Do đó, Laravel đã có chức năng tinker cái sẽ giúp chúng ta tạo nhiều dummy records trong table một cách nhanh chóng.<br>
Mặc định trong ứng dụng laravel đã cung cấp sẵn User factory và bạn có thể tìm thấy nó trong url bên dưới:<br>
**url: database/factories/UserFactory.php.**<br>
Bạn có thể tạo một số bản ghi bằng cách sử dụng code bên dưới.<br>
```PHP
    <?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{

    public function index()
    {
        User::factory()->count(5)->create();
    }
}

```
**Output:**<br>
![](https://images.viblo.asia/807495b4-ec81-4f75-9a98-f36f6923c9a6.png)<br>

> Create Custom Factory:

Khi bạn muốn tạo các dummy records cho các tables như items , products or admin thì bạn phải tạo một new factory mới.<br>
Ví dụ bên dưới mình sẽ tạo item factory và thực hiện insert 500 dummy records vào bảng items.<br>
**app\Models\Item.php**<br>
Thêm code vào model như bên dưới<br>
```PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'title',
        'description',
    ];
}

```
Tiếp theo mở command và tạo item factory bằng command bên dưới.<br>
```
php artisan make:factory ItemFactory --model=Item
```

Bây giờ new factory class cho item đã được tạo trong thư mục bên dưới.<br>
**database\factories\ItemFactory.php**<br>
Hãy thêm code bên dưới vào file ItemFactory.php.<br>
```PHP
<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ItemFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Item::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->name,
            'description' => $this->faker->text,
        ];
    }
}

```
Hàm definition() sẽ thêm dữ liệu mẫu tương ứng với trường title, description vào table items.<br>
**Sử dụng Faker, bạn có thể tạo các kiểu dữ liệu sau:**
```
Numbers

Lorem text

Person i.e. titles, names, gender etc.

Addresses

Phone numbers

Companies

Text

DateTime

Internet i.e. domains, URLs, emails etc.

User Agents

Payments i.e. MasterCard

Colour

Files

Images

uuid

Barcodes
```

Cuối cùng hãy tạo và thêm code vào controller bên dưới để tạo 500 dummy records.<br>
**app\Http\Controllers\ItemController.php**<br>
```PHP
<?php

namespace App\Http\Controllers;

use App\Models\Item;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Item::factory()->count(500)->create();
    }
}

```
**Output:** <br>
Bạn sẽ thấy 500 dummy records trên table items.<br>
![](https://images.viblo.asia/45ab7299-d9c2-49bc-a2a0-a91a3d5cd9e5.png)<br>

Hy vọng bài viết này có ích cho các bạn!