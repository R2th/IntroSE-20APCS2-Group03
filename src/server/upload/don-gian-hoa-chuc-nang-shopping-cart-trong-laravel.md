# Giới thiệu

Chắc hẳn từ những bạn mới sử dụng laravel cho tới những lão làng laravel hầu hết đều đã đụng tới chức năng giỏ hàng trong một đồ án, hay một project nào đó. Và cách thông dụng mình thấy hay sử dụng là code bằng session để lưu sản phẩm vào giỏ hàng. Hôm nay, mình sẽ giới thiệu một package đã từng làm mưa làm gió trong suốt quãng đời sinh viên của các bạn code laravel, giúp tiết kiệm phần lớn thời gian xây dựng chức năng shopping cart, đó chính là **bumbummen99/shoppingcart**

# Lợi ích

* Tiết kiệm thời gian
* Sử dụng dễ dàng, linh hoạt
* Dễ chỉnh sửa

*Chống chỉ định:* Những newbie chưa hiểu về session, chưa từng tự code giỏ hàng bằng session, php thuần.

# Cài đặt

Chạy lệnh Composer request từ Terminal:

`composer require bumbummen99/shoppingcart`

Tiếp theo: `php artisan vendor:publish --provider="Gloudemans\Shoppingcart\ShoppingcartServiceProvider" --tag="config"`

Lệnh này sẽ tạo một file trong `config/cart.php` để bạn có thể tùy ý setting những cái cần thiết cho package này.

Vậy là phần cài đặt đã xong!

# Sử dụng

Package này hỗ trợ chúng ta những method như sau:https://github.com/vietninjjas/SkyMart

1. Những method hay sử dụng

**Cart::add() :** Thêm sản phẩm vào giỏ hàng Theo mặc định của bumbummen, chúng ta sẽ truyền lần lượt các tham số tương ứng như sau:

> Cart::add(<id>, <tên sản phẩm>, <số lượng>, <giá tiền>, <tùy chọn khác (có thể có hoặc không)>)

Ví dụ:

> Cart::add('293ad', 'Product 1', 1, 9.99, 550, ['size' => 'large']);

Hoặc:

> Cart::add(['id' => '293ad', 'name' => 'Product 1', 'qty' => 1, 'price' => 9.99, 'weight' => 550, 'options' => ['size' => 'large']]);

Đơn giản hơn, chúng ta có thể add sản phẩm vào mà không cần id của giỏ hàng, nó sẽ tự sinh ra cho chúng ta:

> Cart::add($product, 1, ['size' => 'large']);

Nếu muốn thêm nhiều sản phẩm, chúng ta có thể :

> Cart::add([ ['id' => '293ad', 'name' => 'Product 1', 'qty' => 1, 'price' => 10.00, 'weight' => 550], ['id' => '4832k', 'name' => 'Product 2', 'qty' => 1, 'price' => 10.00, 'weight' => 550, 'options' => ['size' => 'large']] ]);
> 
> Cart::add([$product1, $product2]);

**Cart::update()** : Cập nhật giỏ hàng

Quá đơn giản, bạn chỉ cần:

> $rowId = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
> 
> Cart::update($rowId, 2); 
    
**Cart::remove()**  Xóa một item trong giỏ hàng

> $rowId = 'da39a3ee5e6b4b0d3255bfef95601890afd80709';
> 
> Cart::remove($rowId);

**Cart::get() **: lấy một item trong giỏ hàng

> $rowId = 'da39a3ee5e6b4b0d3255bfef95601890afd80709'; Cart::get($rowId);

**Cart::content() :** Lấy toàn bộ trong giỏ hàng

**Cart::destroy() :** Xóa luôn giỏ hàng 😃

2. Các method tính toán:

**Cart::total()** : Đây là method giúp tổng số tiền trong giỏ hàng, và bao gồm thuế , số thuế được tính trong package của nó, bạn có thể sửa nó trong package nhé

Vậy làm sao để tránh không sử dụng đến thuế? => chúng ta sẽ có method: **Cart::subtotal()**

3. Khác
Giả sử bạn muốn người dùng thấy được trong giỏ hàng của họ có bao nhiêu mặt hàng, hãy sử dụng **Cart::count();** , method này sẽ lấy tổng các item có trong giỏ hàng.

# Lời kết

Trên đây mình đã giới thiệu những method rất tiện lợi của bumbummen99, ngoài ra còn có các method khác rất hay các bạn có thể tham khảo trong link dưới nhé!

Happy coding!

Tham khảo: https://packagist.org/packages/bumbummen99/shoppingcart https://github.com/vietninjjas/SkyMart