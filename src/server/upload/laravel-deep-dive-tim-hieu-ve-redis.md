# Giới thiệu về redis

Redis là một server lưu trữ dữ liệu trong bộ nhớ giúp cho việc đọc và ghi nhanh chóng, ngoài ra ta có thể cấu hình để cho nó thỉnh thoảng lưu trữ dữ liệu lên đĩa (có dung lượng lớn nhưng tốc độ đọc ghi chậm), nhận đôi hoặc tác dữ liệu vào các nodes khác nhau. Nói vậy có nghĩa là sử dụng redis cùng với một cơ sở dữ liệu quan hệ hoặc phi quan hệ giúp ta có thể xây dựng được ứng dụng có khả năng lưu trữ dư liệu lớn cũng như cung cấp cách để đọc dữ liệu một cách nhanh chóng.

# Một số ví dụ sử dụng Redis

Giả sử ta có một ứng dụng quản lý các điểm bán hàng và người chủ sở hữu muốn theo dõi thống kê khác nhau về số lượng bán, hàng tồn kho, doanh thu ... của các chi nhanh khác nhau. Giả định chúng ta tập trung vào chỉ số sản phẩm được bán ra, và ta sẽ muốn xây dựng một bảng tin cập nhật liên tục sản phẩm nào được bán nhiều nhất trong ngày. Thông thường nếu sử dụng sql để truy vấn thì câu lệnh có thể như sau:

```sql
    select SUM(order_products.price), products.name
        from order_products
        join products on order_products.product_id = products.id
        where DATE(order_products.created_at) = CURDATE()
        where order_products.status = "done"
```

Câu lệnh trên sẽ đưa ra danh sách các sản phẩm được bán trong ngay, nhưng có một vấn đề ở đây là nếu với những cửa hàng lớn, lượng dữ liệu lấy ra sẽ rất lớn dẫn đến rất mất thời giản để query, và việc cập nhật liên túc dữ liệu cho bảng tin là rất khó. Một giải pháp đưa ra là là nếu ta có thế cache sản phẩm được bán ra mỗi khi một order được phục vụ, và có thể đọc được từ cache ra:

```php
    Event::listen('newOrder', function ($order) {
        $order->products->each(function($product){
            SomeStorage::increment("product:{$product->id}:sales:2017-05-22", $product->sales);
        );
    });
```

Như vậy mối khi có order mới ta sẽ tăng mỗi sản phẩm trong order lên một lượng tương ứng, và có thể đọc nó đơn giản từ cache:

```php
    $sales = Product::all()->map(function($product){
        return SomeStorage::get("product:{$product->id}:sales:2017-05-22");
    });
```

Class SomeStorage là một server lưu trữ dữ liệu trong memory mà ở đây chúng ta sử dụng là Redis. Như vậy ta không cần phải chạy câu query lớn mỗi khi update dữ liệu cho bảng tin.

Một ví dụ khác là nếu ta muốn biết số lượng người dùng truy cập website ta có thể đọc nó từ bảng log thông qua câu lệnh:

```php
    select COUNT(Distinct user_id) as count from unique_visits where date = "2017-05-22"
```

Như vậy mỗi khi có user truy cập ta lại phải thêm record vào database như vậy là không nên đối với những website có lượng truy cập lớn và số lượng user lớn. Ta có thể dùng cache mỗi khi có một user mới truy cập rồi sau đó có thể lưu vào database sau:

```php
    SomeStorage::addUnique('unique_visits:2017-05-22', $user->id);
```

Với cách này ta có thể lưu trữ nhanh chóng số lượng người dùng truy cập website vừa giảm tải băng thông khi không phải update cơ sở dữ liệu một cách thường xuyên.

Tính nguyên tử của các câu lệnh redis

Các câu lệnh redis luôn được đảm bảo tính nguyên tử, điều này có nghĩa không có gì làm thay đổi khi câu lênh đang được thức hiện.

```php
    $monthSales = Redis::getSet('monthSales', 0);
```

Ví dụ ở trên sẽ lấy giá trị của key monthSales và sau đó set nó về 0, nó sẽ được đảm bảo giá trị, tên của key monthSales không bị thay đổi bởi yêu cầu của các lệnh khác trong khi lệnh trên đang được thực hiện. 

# Các lệnh trong Redis

## Set và get giá trị cho key.

```php
    Redis::set('product:1:sales', 1000)
    Redis::set('product:1:count', 10)
```

Ở trên ta set một giá trị cho key *product:1:sales* là 1000 và key *product:1:count* là 10.

```php
    \\Lấy giá trị của key product:1:sales
    Redis::get('product:1:sales')
```

## Tăng và giảm đi một lượng giá trị

```php
    \\Tăng lên một lượng giá trị
    Redis::incrby('product:1:sales', 100)
    \\Tăng lên một giá trị
    Redis::incr('product:1:count')
    \\Giảm một lượng giá trị
    Redis::decrby('product:1:sales', 100)
    \\Giảm một giá trị
    Redis::decr('product:1:count')
```

Với số thực ta cần các lệnh đặc biệt hơn

```php
    Redis::incrbyfloat('product:1:sales', 15.5)
    Redis::incrbyfloat('product:1:sales', - 30.2)
```

## Lấy và update

```php
    $value = Redis::getset('product:1:sales', 0)
```

Đoạn code trên sẽ trả về giá trị trước đó của key *product:1:sales* sau đó set nó về giá trị 0.

## Thời hạn của keys

Ta có thể thiết lập thời gian tồn tại của key khi sử dụng câu lện set() cửa Redis. Sau khoảng thời gian được thiết lập key redis sẽ bị hủy cùng với giá trị của nó. Có một vài cách để thực hiện điều này.

```php
    Redis::set('user:1:notified', 1, 'EX', 3600);
    Redis::expire('user:1:notified', 3600);
    \\ Để thiết lập thời gian hết hạn là mili giây
    Redis::set('user:1:notified', 1, 'PX', 3600);
    Redis::pexpire('user:1:notified', 3600);
    \\ Để thiết lập thời gian hết hạn là một thời điểm cụ thể
    Redis::expireat('user:1:notified', '1495469730')
```

Để kiểm tra thời gian còn lại trước khi key hết hạn ta có thể sử dụng câu lệnh:

```php
    \\ Thời gian bằng giây
    Redis::ttl('user:1:notified');
    \\ Thời gian bằng mili giây
    Redis::pttl('user:1:notified');
```

Nếu trả về -2 tức key ko tồn tại, -1 cho key ko có thời gian hết hạn.

Để hủy thời gian hết hạn cho một key

```php
    Redis::persist('user:1:notified');
```

Giá trị trả về là 1 nếu việc hủy thành công và 0 nếu key này không tồn tại hoặc không được thiết lập thời gian hết hạn

## Đọc nhiều key cùng một lúc.

Để đọc nhiều key cùng lúc ta sử dụng:

```php
    Redis::mget('product:1:sales', 'product:2:sales', 'non_existing_key')
```

Câu lệnh trên trả về một mảng bao gồm giá trị tương ứng của các key, nếu key không tồn tại null sẽ được trả về.

## Xóa key

Để xóa key ta sử dụng:

```php
    Redis::del('previous:sales', 'previous:return');
```

Và ta có thể xóa nhiều key cùng một lúc.

## Đổi tên key

Để đổi tên key ta sử dụng:

```php
    Redis::rename('current:sales', 'previous:sales');
```

Lỗi sẽ được trả về nếu key tham số đầu tiên không tồn tại. Nếu key tham số thứ 2 đã tồn tại thì nó sẽ bị ghi đè.

# Tài liệu tham khảo
1.) https://divinglaravel.com/redis