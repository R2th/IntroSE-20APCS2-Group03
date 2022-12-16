## 1. Giới thiệu
Trong 1 project, các đối tượng luôn có mối quan hệ với nhau. Các bảng trong database cũng được liên kết với nhau. Ví dụ 1 project ecommerce, 1 người có thể mua nhiều đơn hàng, mỗi đơn hàng có nhiều sản phẩm khác nhau. Ở phần này, mình sẽ giới thiệu các mối quan hệ cơ bản và cách sử dụng nó trong Laravel.

* One to one (1 - 1)
* One To Many (1 - n)
* Many To Many (n - n)
* Has One Through
* Has Many Through
* Polymorphic Relationships

## 2. Các quan hệ cơ bản
### 2.1. One to one (1 - 1)
Đây là quan hệ rất cơ bản. Ví dụ 1 User có 1 địa chỉ xác định. Ta có 2 model là User và Address. 

Để lấy ra address của user, ta viết function `address()` trong class model `User`, sử dụng method `hasOne()`.  (1 user chỉ có 1 address)
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * return the user's address.
     */
    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
```
Tham số đầu tiên truyền vào `hasOne()` là tên của model được liên kết. Ở ví dụ trên, khóa ngoại của quan hệ được đặt mặc định là `user_id`, tương ứng với cột `id` của bảng users. Nếu khóa ngoại của bạn khác, bạn cần truyền vào tham số thứ 2 là tên khóa ngoại tương ứng. 
```
 return $this->hasOne(Address::class, 'foreign_key');
```
Ngoài ra, mặc định giá trị khóa ngoại tương ứng với cột id trong quan hệ cha. Nếu quan hệ của bạn xác định qua 1 trường khác, bạn phải truyền vào tham số thứ 3 là tên cột tham chiếu.
```
return $this->hasOne(Address::class, 'foreign_key', 'local_key');
```
Sau khi quan hệ này được xác định, bạn có thể gọi nó như 1 thuộc tính được định nghĩa trên model. 
```
$address = User::find(1)->address;
```
### **Inverse**
Vậy là bạn đã lấy được địa chỉ của 1 user. Vậy nếu bạn có địa chỉ và muốn lấy ra user có địa chỉ đó thì làm cách nào? Để lấy ra user tương ứng với 1 địa chỉ, ta viết function `user()` trong class model `Address`, sử dụng method `belongsTo()`. (1 address thuộc về 1 user)
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    /**
     * Return user 
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```
Tương tự như phương thức `hasOne()`, bạn có thể truyền vào tham số thứ 2 và thứ 3 tương ứng với tên khóa ngoại và tên cột tham chiếu từ quan hệ cha.
```
return $this->belongsTo('App\User', 'foreign_key', 'other_key');
```
Sau khi quan hệ này được xác định, bạn có thể gọi nó như 1 thuộc tính được định nghĩa trên model. 
```
$address = Address::find(1)->user;
```

### 2.2. One To Many (1 - n)
Quan hệ 1 - n xác định khi 1 model của có quan hệ với nhiều model khác. Ví dụ 1 `user` sẽ có nhiều đơn hàng `order`. 
Để lấy ra các đơn hàng của 1 user, ta sẽ viết 1 function `orders()` trong model User, sử dụng method `hasMany()` (1 người có nhiều đơn hàng). Vì kết quả trả về gồm nhiều đơn hàng nên tên function nên đặt số nhiều nhé.
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * Trả về danh sách các đơn hàng của user
     */
    public function orders()
    {
        return $this->hasMany('Order::class');
    }
}
```
Giống với method hasOne(), bạn có thể tuyền vào tham số thứ 2 `foreign_key` và tham số thứ 3 `local_key` để xác định khóa tương ứng trong quan hệ.
```
return $this->hasMany('Order::class', 'foreign_key', 'local_key');
```
Sau khi quan hệ được xác định, bạn có thể gọi nó như 1 thuộc tính của model.
```
$orders = User::find(1)->orders;
```
Kết quả trả về sẽ là 1 collection các đơn hàng của user. Bạn có thể dùng foreach để xử lý kết quả đó.
```
foreach ($orders as $order) {
    // xử lý kết quả
}
```
Bạn cũng có thể thêm các điều kiện truy vấn vào sau hàm quan hệ. Ví dụ: 
```
$order = User::find(1)->orders()->where('total', 500000)->first();
```
### **Inverse**

Vậy là chúng ta đã lấy được các đơn hàng của user. Vậy nếu có 1 đơn hàng, có thể tìm ra user đặt đơn hàng đó không? Tất nhiên có thể. Chúng ta sẽ dùng method `belongsTo()` giống như quan hệ 1 - 1. 
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * Trả về người đặt đơn hàng
     */
    public function post()
    {
        return $this->belongsTo(User::class);
    }
}
```
Tương tự như quan hệ 1 - 1, bạn có thể truyền vào tham số thứ 2 và thứ 3 để xác định foreign_key và local_key.
```
return $this->belongsTo(User::class, 'foreign_key', 'local_key');
```
Và sử dụng nó như 1 thuộc tính của model
```
$user = Order::find(1)->user;
```
### 2.3. Many To Many (n - n)
Đây là quan hệ phức tạp hơn 2 quan hệ trước. Ví dụ như 1 đơn hàng có nhiều sản phẩm, 1 sản phẩm có thể có trong nhiều đơn hàng. Vì vậy, khi thiết kế databse, chúng ta cần có 3 bảng cho mối quan hệ này là `orders`, `products` và `order_product`. Bảng `order_product` là bảng trung gian giữa sản phẩm và đơn hàng, sẽ lưu 2 trường giá trị là `order_id` và `products_id`. Tên của bảng này được đặt theo thứ tự bảng chữ cái của tên 2 quan hệ chính. 
Đầu tiên, để xác định 1 order có nhiều product, ta sẽ viết  1 function `products()` (tên nên đặt số nhiều vì kết quả chứ nhiều product), sử dụng method `belongsToMany()`. 
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * Trả về các sản phẩm của đơn hàng
     */
    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
```
Khác với các method của quan hệ trước, method `belongsToMany()` có các tham số truyền vào khác 1 chút. Tham số thứ 1 là tên của model có quan hệ. Tham số thứ 2 là tên bảng tung gian giữa 2 quan hệ. Ở ví dụ  của mình, bảng trung gian là bảng `order_product`. Tham số thứ 3 là tên khóa ngoại của model bạn đang sử dụng (ở đây là `order_id`). Tham số thứ 4 là tên khóa ngoại của model có quan hệ (ở đây là `product_id`).
```
return $this->belongsToMany(Product::class, order_product, order_id', 'product_id');
```
Để lấy ra các sản phẩm trong đơn hàng, bạn có thể gọi nó như 1 thuộc tính của model. Kết quả trả về là 1 colection và bạn có thể sử dụng vòng lặp để xử lý nó. (giống như các quan hệ trước thôi :))))
```
$order = Order::find(1);

foreach ($order->products as $product) {
    //xử lý kết quả.
}
```
### **Inverse**
Sau khi lấy được các sản phẩm trong đơn hàng, chúng ta có thể lấy các đơn hàng có chứa sản phẩm đó. Bạn có thể  viết 1 function `orders()` trong model `Product`, sử dụng method `belongsToMany()` và truyền vào các tham số tương ứng nhé.
```
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /**
     * Trả về các đơn hàng có chứa sản phẩm
     */
    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }
}
```
hoặc truyền vào tham số
```
return $this->belongsToMany(Order::class, 'role_user', 'product_id', 'order_id');
```
### **Pivot**
Ở quan hệ **Many to many** chúng ta có thêm bảng trung gian (ở ví dụ là order_product). Bảng này thể hiện mối quan hệ giữa 2 đối tượng của model. Ngoài việc lưu id, bạn có thể dùng bảng này để lưu lại 1 vài thuộc tính khác. Ở đây mình lấy ví dụ là thời gian thêm product vào order. Vậy chúng ta có thể tác động vào bảng này được không và làm như thế nào?

Eloquent cung cấp một số cách tương tác rất hữu ích với bảng này. Sau khi tạo quan hệ, chúng ta có thể truy cập vào bảng trung gian bằng thuộc tính `pivot`.
```
$order = Order::find(1);

foreach ($order->products as $product) {
    echo $product->pivot->created_at;
}
```
Mặc định thì `pivot` chứa các key của 2 bảng có quan hệ. Nếu bảng trung gian của bạn có nhiều thuộc tính khác, bạn có thể khai báo nó bằng cách dùng method `withPivot` khi xác định quan hệ.
```
return $this->belongsToMany(Product::class)->withPivot('column1', 'column2');
```
Nếu bạn muốn pivot tự động trả về timestamp thì bạn có thể dùng method `withTimestamps` khi xác định quan hệ.
```
return $this->belongsToMany(Product::class)->withTimestamps();
```
Nếu bạn muốn thay đổi tên pivot để phù hợp với mục đích của bảng trung gian, hay đơn giản bạn không thích cái tên pivot, bạn cũng có thể thay đổi tên này. Với ví dụ của mình, mình muốn đổi pivot thành contain, mình sẽ làm như thế này:
```
return $this->belongsToMany(Product::class)
                ->as('contain')
                ->withTimestamps();
```
Khi sử dụng, thay vì `->pivot`, mình có thể `->contain`. Thế thôi.

Còn 1 cách để tương tác với bảng trung gian nữa nhưng mình sẽ mói ở những phần sau nhé. 
## Tổng kết nhẹ
Tưởng không dài mà dài không tưởng. Mình định viết thêm mà thôi để giành phần sau nhé. Mong là nó giúp ích cho các bạn. Đây là phần 1 nên toàn kiến thức đơn giản, các bạn hãy đón đợi phần 2 nhé. 

Cảm ơn các bạn.
### Tài liệu tham khảo
https://laravel.com/docs/6.x/eloquent-relationships