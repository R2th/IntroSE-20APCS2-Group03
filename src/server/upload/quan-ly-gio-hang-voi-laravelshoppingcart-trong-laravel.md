# Cài đặt.
  Để cài đặt package này các bạn chỉ cần chạy lệnh sau:
    `composer require gloudemans/shoppingcart`
    Trong trường hợp bạn đang sử dụng Laravel phiên bản 5.5 bạn sẽ làm thêm 1 bước như sau:
    Các bạn vào file `app/config.php` thêm vào mảng `providers` như sau:
    `Gloudemans\Shoppingcart\ShoppingcartServiceProvider::class`
và mảng `aliases` như sau:
'Cart' => Gloudemans\Shoppingcart\Facades\Cart::class,`
# Các phương thức cơ bản.
## 1. Cart::add()
Thêm sản phẩm vào giỏ hàng để thêm 1 item vào giỏ hàng rất đơn giản, bạn chỉ việc sử dụng phương thức `add()`, VD:
    `Cart::add('293ad', 'Product 1', 1, 9.99);`
tất nhiên là bạn vẫn có thể tự định nghĩa các tham số như 'id, name, quantity' nếu bạn muốn, VD:
`Cart::add(['id' => '293ad', 'name' => 'Product 1', 'quantity' => 1, 'price' => 9.99, 'options' => ['size' => 'M']]);`
Các item này sau khi được thêm vào trong giỏ hàng (Cart) nó sẽ là kiểu `CartItem`.

## 2. Cart::get()
Phương thức này giúp chúng ta có thể  lấy ra 1 item CartItem từ giỏ hàng, ví dụ mình muốn lấy item có id là `293ad` từ trong giỏ hàng thì mình sẽ làm như sau:
`Cart::get('293ad');`

## 3. Cart::content()
Trường hợp bạn muốn lấy hết tất cả các CartItem trong giỏ hàng thì đây là hàm rất hữu ích, khi bạn gọi hàm này nó sẽ trả về 1 danh sách Collection of CartItem, Vd:
`Cart::content();`

## 4. Cart::update()
Để update 1 item trong giỏ hàng bạn chỉ việc chỉ định item bạn cần update bằng cách cung cấp  tham số  là id và dữ liệu bạn muốn thay đổi như ví duj dưới đây mình muốn đổi tên `Product 1` thành `Sản Phẩm 1`: 
`Cart::update('293ad', ['name' => 'Sản phẩm 1'])`

## 5. Cart::remove()
Để  xóa 1 item bạn chỉ việc truyền vào id của item CartItem mà bạn muốn xóa:
`Cart::remove('293ad');`
Lúc này item có id là `293ad` sẽ được xóa khỏi giỏ hàng của bạn

## 6. Cart::destroy()
Nếu bạn muốn xóa tất cả các item trong giỏ hàng thì bạn chỉ việc làm như sau:
`Cart::destroy();`

## 7. Cart::total()
Đây là một phương thức rất hữu ích bạn không cần phải thực hiên phép tính nào cả mà vẫn có thể nhanh chóng tính toán tất cả các sản phầm đang có trong giỏ hàng cùng với giá và số  lượng bằng cách:
`total($decimals, $decimalPoint, $thousandSeperator)`
phương thức này sẽ tính toán và trả về một định dạng tiền tệ

## 8. Cart::count()
Trường hợp bạn muốn đếm xem trong giỏ hàng của bạn có bao nhiêu sản phẩm trong đó bạn có thể sử dụng 2 cách như sau: 
`Cart::count();`
hoặc
`Cart::content()->count();`
một trong 2 cách này đều trả về cho bạn số lượng các sản phẩm có trong giỏ hàng

# Danh sách các item trong giỏ hàng.
Một danh sách chứa các CartItem được lưu trong 1 collection, điều này sẽ trở nên dễ  dàng vì bạn có thể thao tác dễ dàng trên collection bằng những hàm thông thường, VD:
`Cart::content()->count();`
`Cart::content()->groupBy('id');`

# Liên kết với Model.
Package này thực sự quá tiện dụng là có khả năng liên kết với 1 model từ các item(CartItem) trong giỏ hàng của bạn, Giả sử bạn có 1 model là `Product` bằng cách sử dụng các phương thức `associate()` bạn có thể  tạo liên kiết đến model `Product` từ đây bạn có thể sử dụng các tài nguyên của model từ CartItem, để  tạo liên kết từ CartItem với model bạn hãy làm như sau:
`Cart::associate($cartItem->rowId, 'Product');`
hoặc
`Cart::add('293ad', 'Product 1', 1, 9.99, ['size' => 'large'])->associate('Product');`

# Kết luận.
Thực sự package này là 1 trong những package quản lý giỏ hàng rất có ích cho việc phát triển ứng dụng web thương mại điện tử, các phương thức đều được cung cấp rất đầy đủ và dễ dáng sử dụng.

# Tham khảo.
https://github.com/Crinsane/LaravelShoppingcart