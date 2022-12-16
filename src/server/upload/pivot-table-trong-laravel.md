## 1. Giới thiệu
Nếu bạn mới làm quen với Laravel, có thể bạn sẽ không biết khái niệm về pivot table và công dụng tuyệt vời của nó trong các ứng dụng. Thoạt nghe bạn có thể thấy lạ nhưng khi sử dụng nó có thể rất hữu ích trong việc build many-to-many relationship(mối quan hệ nhiều-nhiều).

Về cơ bản, pivot table là một bảng chung giữa hai bảng chính(main tables) trong mối quan hệ nhiều-nhiều. Trên thực tế có rất nhiều ví dụ về mối quan hệ nhiều-nhiều, một người dùng (User) có nhiều vai trò (Role) và một role có thể được gán cho nhiều user, hay như một cửa hàng (Store) bán nhiều sản phẩm (Product) và một sản phẩm thì được bán ở nhiều cửa hàng,... và còn vô vàn những ví dụ nữa.

## 2. Tạo tables và Model
### 2.1 Bắt đầu

Mình sẽ lấy ví dụ Store - Product làm ví dụ trong bài viết này nhé. Chúng ta sẽ phát thảo sơ qua database như thế này:

Bảng: stores

| Column Name |
| -------- |
|id|
|name|

Bảng: products

| Column Name |
| -------- |
|id|
|name|

Bảng: product_store

| Column Name |
| -------- |
|product_id|
|store_id|

Bước tiếp theo, chúng ta sẽ tạo pivot table dựa trên 2 bảng chính là article và tag. Ở đây chúng ta cần chú ý một chút:

Tên của pivot table bao gồm tên của 2 bảng chính (ở dạng số ít), ngăn cách nhau bởi dấu gạch dưới (underscore) và sắp xếp theo thứ tự bảng chữ cái (alphabetical).
Để tạo pivot table đơn gianr chúng ta có thể dùng

Và chúng ta thấy bảng bảng cuối cùng trong danh sách product_store chính là bảng Pivot được tạo ra dựa trên 2 bảng chính là products và stores. Bảng pivot là bảng nối giữa 2 bảng, đúng như tên gọi "trục xoay" của nó :grin: Ở đây chúng ta cần phải tuân thủ một số nguyên tắc sau đây nên các bạn lưu ý khi thiết kế CSDL nhé:

1. Tên của pivot table bao gồm tên của 2 bảng chính (ở dạng số ít đó là product và store)
2. Ngăn cách nhau bởi dấu gạch dưới (underscore product_store)
3. Sắp xếp theo thứ tự bảng chữ cái (alphabetical: p đứng trước s nên phải là product_store).
4. Phải chứa 2 cột là khóa ngoại của 2 bảng tham chiếu theo công thức tên bảng tham chiếu số ít + "_id" cho nên ta có: product_id và store_id

### 2.2 Tạo migration
- Tạo migrate cho Store model

`php artisan make:model Store -m`

Sau khi chạy xong chúng ta sẽ có 2 file app\Store.php và database\migrations\2021_03_16_174819_create_stores_table.php

```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stores', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('des_info');
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
        Schema::dropIfExists('stores');
    }
}
```

**File app\Store.php**
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    //
}
```

- Tạo migrate cho Product model

Tương tự chúng ta sẽ có 2 file app\Product.php và database\migrations\2021_03_16_175939_create_products_table.php

```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('des_info');
            $table->int('price');
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
        Schema::dropIfExists('products');
    }
}
```

**File app\Product.php**
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
}
```

**Bước tiếp theo, chúng ta sẽ tạo pivot table dựa trên 2 bảng chính là products và stores. Ở đây chúng ta cần chú ý một tí nhé:**

Tên của pivot table bao gồm tên của 2 bảng chính (ở dạng số ít), ngăn cách nhau bởi dấu gạch dưới (underscore) và sắp xếp theo thứ tự bảng chữ cái (alphabetical).

```php artisan make:migration create_product_store_table```

File database\migrations\2021_03_16_180539_create_product_sotre_table.php

```
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductStoreTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_store', function (Blueprint $table) {
            $table->increments('id');

            $table->integer('product_id')->unsigned()->index();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');

            $table->integer('store_id')->unsigned()->index();
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_store');
    }
}
```

### 2.3 Model

Ở phần trên, chúng ta mới chỉ tạo ra file migration và model nhưng chưa viết thêm gì cho model. Bây giờ chúng ta sẽ tạo mối quan hệ many to many cho 2 bảng qua pivot table. Việc này có thể làm ở một trong hai bảng chính. Ở ví dụ này, mình sẽ viết ở Product model như sau:

```
class Product extends Model
{
    //
  protected $table = 'products';
  protected $fillable = ['name'];

  public $timestamps = true;

  public function stores() {
    return $this->belongsToMany('App\Store', 'produc_store', 'store_id', 'product_id');
  }
}
```

Như mọi người thấy, ở đây mình chỉ ra rõ 2 trường của pivot table là store_id và product_id. Lợi ích: Chúng ta sẽ chẳng cần tạo thêm một model là product_store làm gì cả. Chúng ta sẽ quản lý nó dựa trên commands.

## 3. Thao tác với cơ sở dữ liệu
### 3.1 attach() - thêm
Giả sử Store của bạn có id là $storeId muốn thêm một sản phẩm có id là $productId chúng ta làm như sau:
```
$store = Store::find($storeId);
$store->products()->attach($productId);
```
Kết quả là trong bảng Pivot: product_store có thêm 1 row mới chứa giá trị $storeId và $productId.

Ngược lại muốn attach Product và Store ta làm ngược lại:
```
$product = Product::find($productId);
$product->stores()->attach($storeId);
```
Cũng giả sử như trên nhưng thay vì muốn thêm 1 sản phẩm, ta muốn thêm nhiều sản phẩm có id là $productId1, $productId2, $productId3 thì đơn giản như sau:
```
$store = Store::find($storeId);
$store->products()->attach([
    $productId1,
    $productId2,
    $productId3
]);
```
Nếu bảng Pivot ngoài product_id và store_id mà bạn còn thêm trường a, b, c  mà bạn muốn thêm thông tin cho trường đó thì đơn giản như sau:
```
$store = Store::find($store);
// attach một
$store->products()->attach($productId, [
    'a' => 'value',
    'b' => 'value',
    'c' => 'value',
]);

// attach nhiều
$store->products()->attach([
    $productId1,
    $productId2,
    $productId3
], [
    'a' => 'value',
    'b' => 'value',
    'c' => 'value',
]);
```

## 3.2 detach() - xóa
Ngược lại với attach, detach cũng hỗ trợ xóa 1 hoặc nhiều records trong bảng Pivot (product_store).
```
$store = Store::find(1);
// xóa một sản phẩm ra khỏi store
$store->products()->detach(1);

// xóa nhiều sản phẩm ra khỏi store
$store->products()->detach([
    $productId1,
    $productId2,
    $productId3
]);

// xóa tất cả sản phẩm ra khỏi store
$store->products()->detach();
```
### 3.3 sync() - đồng bộ
Sync là sự kết hợp giữa attch và detach ở trên. Khi truyền vào tham số là $productId, hoặc mảng tham số [$productId1, $productId2, $productId3] thì sync sẽ kiểm tra, cái nào không có sẽ loại bỏ, cái nào đang có thì giữ nguyên và cái nào mới thì thêm vào.

Giả sử hiện tại Store có $id là 1 hiện đang liên kết với các Product có $id là 1 và 2

id	product_id	store_id
1	1	1
2	2	1
| id | product_id | store_id |
| -------- | -------- | -------- |
|1|1|1|
|2|2|1|
Bây giờ ta muốn Store có $id là 1 chỉ bán Product có $id là 2 và 3 ta làm như sau:

```
$store = Store::find(1);

// đồng bộ
$store->products()->sync([2, 3]);
// Tương đương với
$store->products()->attach([3]);
$store->products()->detach([1]);
```

Khi bạn muốn sync nhưng kiểm tra có mới thì thêm vào, còn không có thì cũng đừng có xóa đi thì làm như sau:

```
$store = Store::find(1);

// đồng bộ
$store->products()->syncWithoutDetaching([2, 3]);
// Tương đương với
$store->products()->attach([3]);
```

### 3.4 Toggle - Bật tắt
Giống như công tắc, đang bật thì tắt mà đang tắt thì bật. Vậy thì nếu đã attach rồi thì detach và ngược lại.

Giả sử giống như ở trên: hiện tại Store có $id là 1 hiện đang liên kết với các Product có $id là 1 và 2
```
// Giả sử hiện tại Store có $id là 1 hiện đang liên kết với các Product có $id là 1 và 2
$store->products()->toggle([1, 2, 3]);
// Tương đương với
$store->products()->attach([3]);
$store->products()->detach([1, 2]);
```

### 3.5 Updating một Record với bảng Pivot

Nếu như bạn muốn update 1 row đã có trong pivot table, bạn có thể sử dụng updateExistingPivot method.

```
$store->products()->updateExistingPivot($product_id, $attributes);
```

### 3.6 Thêm cột trong bảng Pivot

Như đã đề cập ở trên, chúng ta sẽ làm gì nếu như muốn thêm 1 trường và pivot table? ĐƠn giản là chúng ta sẽ dùng hàm withPivot() để thêm vào pivot table (mình sẽ lấy 1 ví dụ khác):

```
public function skills() {
    return $this->belongsToMany('App\Skill',  'skill_user', 'user_id', 'skill_id')->withPivot('level');
}
```

ở ví dụ này, mình giả sử mình có 2 bảng chính đó là user và skill với 1 pivot table là skill_user. Mối quan hệ là many to many, một user có thể có nhiều skill như HTML, CSS, PHP,... và tương tự skill cũng vậy. Trong pivot table skill_user mình muốn thêm một trường đó là level. Thuộc tính này dùng để define level của user về skill nào đó. Ví dụ như user1 có skill PHP ở mức độ là intermediate và Java level là talented. Bạn cũng có thể thêm timestamps vào bằng việc gọi đến method withTimestamps().

Bây giờ, chúng ta có thể gọi value level với thuộc tính đó là pivot:

```
@foreach ($member->skills as $skill)
    <div class="col-md-3">
        <div class="circular-bar">
            <div class="circular-bar-chart" data-percent="{{$skill->pivot->level}}" data-plugin-options='{"barColor": "{{rand_color()}}", "delay":300}'>
                <strong>{{$skill->name}}</strong>
                <label><span class="percent">{{$skill->pivot->level}}</span>%</label>
            </div>
        </div>
    </div>
 @endforeach
```

*Hy vọng bài viết này sẽ có ích cho bạn khi tìm hiểu về mối quan hện many-to-many trong Laravel, cảm ơn các bạn đã đọc bài.*