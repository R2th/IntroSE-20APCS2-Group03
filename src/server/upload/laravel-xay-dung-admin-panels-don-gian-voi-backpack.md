# Lời mở đầu

![](https://images.viblo.asia/bfc88cf7-c035-41cb-8615-6b4fb5af8102.png)


**Backpack** - Laravel là một bộ sưu tập các packages cho phép chúng ta tạo admin panels cho bất kỳ ứng dụng web nào một cách đơn giản và nhanh chóng. **Backpack** đã cung cấp cho chúng ta một giao diện trực quan cho admin panel (HTML, CSS, JS); **Backpack** sử dụng theme [**CoreUI**](https://coreui.io/) rất bắt mắt người dùng, họ có một thiết kế riêng được gọi là [**Backstrap**](https://backstrap.net/). Hơn nữa, Backpack còn hỗ trợ chúng ta triệt để tác vụ CRUD, họ gọi chúng là CRUD Panels bao gồm các action cơ bản nhất: Create/Read/Update/Delete; như vậy thì bạn sẽ có thể rút ngắn thời gian hoàn thành các tác vụ CRUD nhàm chán rồi nhỉ :D

Nếu bạn còn đang phân vân chưa biết thiết kế và xây dựng Admin Panel cho trang web của mình như nào thì **Backpack** là một sự lựa chọn đáng để thử. Hãy cùng mình thực hiện demo đơn giản sau đây nhé! :D

# Thực hành

## 1. Init project và cài đặt Backpack
Mình sẽ init project Laravel mới toanh và xây dựng riêng Admin Panel cho nó bằng Backpack.

```
composer create-project laravel/laravel backpack-app

cd backpack-app

composer install
```

Tiếp theo chúng ta cần install backpack/crud bằng composer:

```
composer require backpack/crud:"4.1.*"

# bạn cũng có thể cài đặt thêm các công cụ này để trợ giúp trong quá trình phát triển
composer require backpack/generators --dev
composer require laracasts/generators --dev
```

Tiếp theo là chạy lệnh install Backpack cho project:

```
php artisan backpack:install
```

![](https://images.viblo.asia/95fe7306-e16d-4461-9eab-420cea5a848c.png)

Nhìn vào hình phía trên, chúng ta có thể thấy **Backpack** đã thực hiện vài việc như publish vài configs, views, js, css files; tạo users table; tạo middleware CheckIfAdmin.

Vậy là đã cài đặt xong **Backpack**, chúng ta hãy dùng lệnh `php artisan serve` và bạn đã có thể truy cập vào bảng quản trị của mình tại ` http://127.0.0.1:8000/admin`.

![](https://images.viblo.asia/6666a93e-9a03-4489-8e70-0a45048804c2.png)

## 2. Authentication

**Backpack** đi kèm với một hệ thống xác thực cơ bản tách biệt với của Laravel. Bằng cách này, chúng ta có thể có các màn hình đăng nhập khác nhau cho người dùng và quản trị viên. Chúng ta cũng có thể chọn chỉ sử dụng một xác thực - của Laravel hoặc của **Backpack**.

Tuy nhiên có lưu ý nho nhỏ ở đây:

- Theo mặc định thì tất cả người dùng khi đăng kí sẽ đều là admin và đăng nhập được vào trong trang quản trị viên. Đương nhiên trong thực tế không thể để điều này xảy ra được :D. Điều này xảy ra do **Backpack** mặc định `return true` khi check User trong middleware `CheckIfAdmin`. Để giải quyết điều này thì bạn hãy sửa lại function `checkIfUserIsAdmin($user)` để đảm bảo rằng bạn chỉ cho phép quản trị viên truy cập vào bảng quản trị.
-  Nếu User model của bạn đã được di chuyển (không phải là `App\User.php`), thì bạn sẽ cần thay đổi `config/backpack/base.php` để sử dụng đúng User model bằng cách sử dụng `user_model_fqn` config key. Thực hiện điều này nếu bạn đang sử dụng Laravel 8 trở lên vì theo mặc định Laravel 8 trở lên sẽ lưu User model bên trong file Models.

Giờ mình sẽ seed 1 admin account trong `database/seeds/UsersTableSeeder.php` như sau:

```
class UsersTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->truncate();

        DB::table('users')->insert([
                'name'     => 'Demo Admin',
                'email'    => 'admin@example.com',
                'password' => bcrypt('admin'),
                'is_admin' => 1,
            ]);
    }nhé
}
```

Hãy nhớ call Seeder này trong `database/seeds/DatabaseSeeder.php` nhé các bạn, giờ thì chạy `php artisan db:seed`. ( Mình đã thêm trường `is_admin` trong create_users_table migration có sẵn của Laravel để xác định xem user có phải là admin hay không, tuy nhiên khi làm việc thì các bạn hãy tạo một migration mới rồi thực hiện update chứ đừng update trực tiếp trên các migration cũ nhé :laughing: ).

Oke, tài khoản đã có rồi, giờ thì đăng nhập bằng tài khoản đó xem kết quả như nào:

![](https://images.viblo.asia/0da32ffc-d650-46ec-a625-bb98ed9d44c3.png)

Tada, vài bước đơn giản là đã có cái admin panel cơ bản rồi :v Bạn có thể tùy chỉnh lại 1 chút trang quản trị của mình bằng cách thay đổi các config trong `config/backpack/base.php`. Bạn có thể thay đổi URL prefix từ `admin` thành URL khác và rất nhiều các config khác nữa, bạn hãy thử mở file này lên và tìm hiểu chúng nhé :smile:

## 3. CRUDs

Việc tạo các thao tác CRUDs để admin thao tác với DB là yêu cầu tối thiểu đối với mỗi trang quản trị nào. Với **Backpack** thì việc này trở nên vô cùng đơn giản. Mình sẽ thực hiện 1 ví dụ đơn giản về việc tạo bảng quản trị CRUD cho model Tag:

```
# STEP 1. create migration
php artisan make:migration:schema create_tags_table --model=0 --schema="name:string:unique,slug:string:unique"
php artisan migrate

# STEP 2. create crud
php artisan backpack:crud tag #use singular, not plural
```

Đoạn code phía trên sẽ tạo ra:

- Migration file tương ứng
- Model Tag (`app\Models\Tag.php`)
- Request file (`app\Http\Requests\TagRequest.php`)
- Controller file, nơi bạn có thể tùy chỉnh giao diện của CrudPanel (`app\Http\Controllers\Admin\TagCrudController.php`)
- Route tương ứng với controller phía trên được thêm trong `routes/backpack/custom.php`
- Một item Sidebar trong `resources/views/vendor/backpack/base/inc/sidebar_content.blade.php`

Hãy thử truy cập `http://127.0.0.1:8001/admin/tag` xem kết quả: 

![](https://images.viblo.asia/ea891568-db70-45a4-8733-0bca6b8fa35d.png)

Uầy, chỉ với vài dòng lệnh mà nó tạo luôn cho chúng ta Tag Page đã bao gồm đầy đủ các tác vụ CRUD cơ bản rồi. Hãy xem qua `TagCrudController` mà **Backpack** đã tạo cho chúng ta xem nó đã làm những gì nhé:

```
namespace App\Http\Controllers\Admin;

use App\Http\Requests\TagRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class TagCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    
    public function setup()
    {
        CRUD::setModel(\App\Models\Tag::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/tag');
        CRUD::setEntityNameStrings('tag', 'tags');
    }
    
    protected function setupListOperation()
    {
        CRUD::setFromDb(); // columns
    }
    
    protected function setupCreateOperation()
    {
        CRUD::setValidation(TagRequest::class);

        CRUD::setFromDb(); // fields
    }
    
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
```

Mặc định thì Backpack đã enable các action cơ bản nhất. Bạn hãy thử thực hiện các thao tác Thêm/Sửa/Xóa:

* **Create** - sử dụng Create form
* **List** - sử dụng AJAX DataTables
* **Update** - sử dụng Update form
* **Delete** - sử dụng button trong list view
* **Show** - sử dụng button trong list view

Chúng ta có thể thấy:

- Nó sử dụng kế thừa `TagCrudController extends CrudController`, vậy nên bạn có thể dễ dàng chỉnh sửa lại các tác vụ bằng cách overwrite lên method tương ứng trong `TagCrudController`.
- Method `setup()` sẽ defines ra các tác vụ trong CRUD panel.
- Mỗi operation được setup trong `setupXxxOperation()` method.
- Mặc định khi Backpack tạo một CrudController thì nó sẽ sử dụng method `CRUD::setFromDb()`. Method này sẽ cố gắng tìm ra những fields bạn có thể cần trong forms create / update và những columns nào trong list view của bạn, nhưng nó chỉ hoạt động cho các loại fields đơn giản. Bạn có thể chọn tiếp tục sử dụng `setFromDb()` và thêm/bớt/thay đổi các fields hoặc là xóa `setFromDb()` và define thủ công từng fields và columns. (Hãy nhớ config với DB của bạn trong file .env nhé :+1:)

# Kết luận
Ở đây, mình chỉ thực hiện CRUD cơ bản. Tuy nhiên thì trong thực tế, DB sẽ không đơn giản như vậy, sẽ có thêm các relationship và chứa nhiều fields phức tạp hơn, nhưng với Backpack thì việc custom lại sẽ rất dễ dàng và hiệu quả. Ngoài ra, Backpack còn có các operations khác như: 
* Clone - bạn có thể tạo một bản sao của một item; 
* Reorder: bạn có thể sắp xếp lại và sắp xếp các mục nhập;
* Revise: cho phép lưu trữ, xem và hoàn tác các thay đổi đối với các entries trên Eloquent model.
* BulkDelete - bạn có thể xóa nhiều items trong một lần; 
* BulkClone - bạn có thể sao chép nhiều items trong một lần;
* ...

Nói tóm lại, Backpack là 1 sự lựa chọn khá hữu ích để xây dựng một Admin Panel vừa đẹp, vừa đầy đủ tính năng dành cho trang web của bạn. 

Ở bài viết lần tới, mình sẽ demo cụ thể hơn nữa để các bạn có thể thấy được lợi ích của Backpack đem lại nhé. Cảm ơn mọi người đã theo dõi bài viết này!!! (bow)