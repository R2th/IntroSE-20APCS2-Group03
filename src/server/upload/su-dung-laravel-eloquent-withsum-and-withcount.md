Bài viết này mình sẽ giới thiệu các bạn cách sử dụng withSum() and withCount()  với laravel relationship eloquent. <br>
Để demo ví dụ mình sẽ tạo 2 tables là Category và Product và tạo relationship cho chúng.<br>
Bạn có thể sử dụng withSum() & withCount() với laravel 6, laravel 7 & laravel 8 version.<br>
Hãy xem ví dụ bên dưới nhé: <br>

### **Category Model:**
```PHP
<?php
  
namespace App\Models;
  
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
  
class Category extends Model
{
    use HasFactory;

    /**
     * Get the products.
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
```
### **Product Model:**
```PHP
<?php
  
namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
  
class Product extends Model
{
    use HasFactory;
  
    protected $fillable = [
        'name', 'price'
    ];
}

```
### **Ví dụ withSum() :**
```PHP
<?php
  
namespace App\Http\Controllers;
  
use App\Models\Category;
  
class SignaturePadController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $categories = Category::select("id", "name")
                        ->withSum('products', 'price')
                        ->get()
                        ->toArray();
 
        dd($categories);
    }
}

```
**Output:**
```
Array
(
    [0] => Array
        (
            [id] => 1
            [name] => Mobile
            [products_sum_price] => 330
        )
    [1] => Array
        (
            [id] => 2
            [name] => Laptop
            [products_sum_price] => 410
        )
)

```
### **sử dụng conditions trong withSum():**
```PHP
<?php
  
namespace App\Http\Controllers;
  
use App\Models\Category;
  
class SignaturePadController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $categories = Category::select("id", "name")
                        ->withSum(['products' => function($query) {
                                  $query->where('publish', 1);
		                }], 'price')
                        ->get()
                        ->toArray();
 
        dd($categories);
    }
}

```
Mình đã thêm điều kiện trong hàm withsum ở trên chỉ những thằng có publish =1 thì mới tính tổng<br>

### Ví dụ withCount(): 
```PHP
<?php
  
namespace App\Http\Controllers;
  
use App\Models\Category;
  
class SignaturePadController extends Controller
{
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function index()
    {
        $categories = Category::select("id", "name")
                        ->withCount('products')
                        ->get()
                        ->toArray();
 
        dd($categories);
    }
}

```
**Output:**
```
Array
(
    [0] => Array
        (
            [id] => 1
            [name] => Mobile
            [products_count] => 3
        )
    [1] => Array
        (
            [id] => 2
            [name] => Laptop
            [products_count] => 2
        )
)

```
Mình hy vọng bài viết này sẽ giúp ích cho các bạn!<br>
Tham khảo: https://www.itsolutionstuff.com<br>