Repository Pattern là một mẫu thiết kế tối ưu giúp cho các bạn có thể tối ưu, tiết kiệm dòng code, tái sử dụng được nhiều nơi. Trong Laravel, nó là nằm giữa Model và Controller. Đây là nơi thực hiện các truy vấn dữ liệu. Trước đây thường bạn sẽ viết vào controllor nhưng bạn có cảm thấy mình lặp code khá nhiều, đặc biệt là các chức năng CRUD, hầu như ở mọi controller đều khá tương tự nhau. Ở bài viết này, mình sẽ giới thiệu với các bạn Repository để giảm sự lặp code ở các Controller.

# Đặt vấn đề
Nếu như bạn có 2 controller là Post và Category để có các tính năng thêm, xóa, sửa... ở các tính năng này, bạn chỉ cần sửa lại Model thì nó đều giống nhau. Vì vậy, bạn hoàn toàn có thể triển khai Repository cho nó như sau

# Triển khai Repository
Đầu tiên, bạn tạo thư mục **Repositories** ngang hàng với app trong dự án Laravel của bạn. Bên trong mình tạo thêm thư mục **Eloquent** (để chứ Post và Category) và 2 file là **EloquentInterface.php** và **EloquentRepository.php**
![](https://images.viblo.asia/14ffbaa6-5001-49da-aea9-adadb6ce338a.png)

### Bên trong EloquentInterface.php
```
<?php
namespace App\Repositories;

interface EloquentInterface
{
    public function all();

    public function create(array $data);

    public function update(array $data, $id);

    public function delete($id);

    public function find($id);
}
```

### Bên trong EloquentRepository.php
```
<?php
namespace App\Repositories;

use Illuminate\Database\Eloquent\ModelNotFoundException;

abstract class EloquentRepository implements EloquentInterface
{
    protected $_model;

    public function __construct()
    {
        $this->setModel();
    }

    public function setModel()
    {
        $this->_model = app()->make(
            $this->getModel()
        );
    }

    abstract public function getModel();

    public function all()
    {
        return $this->_model->all();
    }

    public function create(array $data)
    {
        return $this->_model->create($data);
    }

    public function update(array $data, $id)
    {
        return $this->find($id)->update($data);
    }

    public function delete($id)
    {
        return $this->find($id)->delete();
    }

    public function find($id)
    {
        try
        {
            return $this->_model->findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return false;
        }
    }
}
```
Ở EloquentRepository.php sẽ có biến $model nhận được model từ các Repository truyền vào sau khi khi đè phương thức getModel
Bên trong thư mục Eloquent đã tạo ở trên, mình tạo tiếp 2 file khác là **CategoryRepository.php** và **PostRepository.php**
![](https://images.viblo.asia/9cb7bab5-10f2-4678-a09f-75441efa8cd2.png)

### Nội dung trong CategoryRepository.php
Đơn giản mình chỉ ghi đè lại function getModel và truyền vào Model Category
```
<?php
namespace App\Repositories\Eloquent;

use App\Category;
use App\Repositories\EloquentRepository;

class CategoryRepository extends EloquentRepository
{
    public function getModel()
    {
        return Category::class;
    }
}
```
Tương tự, bên dưới là PostRepository sẽ như thế này:
```
<?php
namespace App\Repositories\Eloquent;

use App\Post;
use App\Repositories\EloquentRepository;

class PostRepository extends EloquentRepository
{
    public function getModel()
    {
        return Post::class;
    }
}
```

## Cách sử dụng các repository đã tạo
Đầu tiên, các bạn cần vào **AppServiceProvider.php** như hình dưới và truyền vào function register đoạn code bên dưới
```
$this->app->bind(
            'App\Repositories\EloquentInterface',
            'App\Repositories\EloquentRepository'
);
```
![](https://images.viblo.asia/c4dd8563-2a71-4f21-b036-44b61449cce4.png)

Như vậy là các bạn đã khai báo Repository thành công, bước tiếp theo, bạn vào Controller để sử dụng các Repository đã tạo. Mình ví dụ ở CategoryController(các bạn cần tạo CategoryController)
* Khai báo use **App\Repositories\Model\CategoryRepository;**
Các bạn thêm vào **construct**  như bên dưới.

```
protected $categoryRepo;

    public function __construct(CategoryRepository $category)
    {
        $this->categoryRepo = $category;
    }
```
![](https://images.viblo.asia/afd304b8-f1c8-48e7-8f93-57266b1761bc.png)

Hoặc là để tạo mới một category thì bạn có thể gọi như ảnh dưới
![](https://images.viblo.asia/ab9d6879-0a09-4da0-85aa-d27606c8b5b6.png)

Ở PostController bạn cũng có thể làm tương tự như bên CategoryController.

# Kết
Repository Pattern thực sự rất hiệu quả và giúp được các lập trình viên rất nhiều trong việc giảm đi sự lặp lại của code và mang tính chặt chẽ hơn trong các dòng code. Hi vọng qua bài viết này, bạn có thể triển khai Repository trong dự án laravel của mình. Nếu bạn có điều gì còn thắc mắc, vui lòng comment bên dưới để mình cùng thảo luận nhé. Cảm ơn các bạn đã đọc bài viết!