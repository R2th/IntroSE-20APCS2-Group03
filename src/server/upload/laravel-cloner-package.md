Chào mọi người, hôm nay mình sẽ lại lượn về chủ đề Laravel 1 xíu nhé. Bài hôm nay nói về 1 điều 'nho nhỏ' mình mới đọc được trên Laravel News, nên tiện tay tìm hiểu thì viết bài luôn :D
# Đặt vấn đề

1 ngày đẹp trời, bạn muốn thêm 1 chục bản ghi y hệt nhau vào CSDL, hoặc giả như khi bạn làm chức năng Duplicate Post cho người dùng có thể copy bài post chẳng hạn, hoặc chức năng kiểu như thế này:
![](https://images.viblo.asia/474f5dd1-40b2-4a25-8394-57e147de2440.png)
Vậy giờ map từng trường dữ liệu của bản ghi để copy à?
```php
$new_record->title = $old_record->title
$new_record->excerpt = $old_record->excerpt
...
```
Cách này cũng ổn đấy, nhưng mà mình giới thiệu cho 1 cách nhanh hơn này :D. Chỉ cần 1 dòng thôi: 
```php
Post::first()->duplicate();
```
# Tìm hiểu nào
## Cài đặt
Trước tiên phải tải package về đã nhé
```bash
composer require bkwld/cloner
```
![](https://images.viblo.asia/d6c409af-bf7c-427e-baac-e2bbbf77f89e.png)

Tiếp theo để cài đặt, bạn cần phải khai báo sử dụng nữa. Chúng ta sẽ khai báo để sử dụng package này trong AppService Provider nhé

Tại thời điểm này, nếu bạn chạy thử `php artisan serve` thì sẽ dính ngay lỗi sau nhé:
![](https://images.viblo.asia/30ae554c-2aa8-4270-a420-e6ce8929f2a9.png)

Nhìn lại file này bạn sẽ thấy
```php
use Illuminate\Support\ServiceProvider;
use Bkwld\Cloner\ServiceProvider;
```
Vậy là 2 cái sử dụng cùng namespace rồi :(. Sửa thế nào đây? Đơn giản lắm, đổi namespace khác là ổn ngay :D. Mình đổi sang namespace `ClonerPackage` nhé
```php
use Bkwld\Cloner\ServiceProvider as ClonerProvider;
```

Chạy thử lại phát thấy ngon ngay :D

Được rồi, phần chuẩn bị đã xong, giờ chúng ta đi vào tìm cái sử dụng để test thử nào.
## Sử dụng
Bây giờ bạn muốn sử dụng Cloner cho Model nào thì chỉ cần qua đó, thêm 1 dòng `use \Bkwld\Cloner\Cloneable;` vào đó là được. Giả sử mình sử dụng cho Model Post nhé:
```php
class Post extends Model
{
    use \Bkwld\Cloner\Cloneable;
}
```
### Nhân bản 1 bản ghi - Duplicate a record
Giờ bạn muốn thêm 1 chục bản ghi y hệt nhau vào CSDL, hoặc giả như khi bạn làm chức năng Duplicate Post cho người dùng có thể copy bài post chẳng hạn, hoặc chức năng kiểu như thế này:
![](https://images.viblo.asia/474f5dd1-40b2-4a25-8394-57e147de2440.png)
Vậy giờ map từng trường dữ liệu của bản ghi để copy à?
```php
$new_record->title = $old_record->title
$new_record->excerpt = $old_record->excerpt
...
```
Cách này cũng ổn đấy, nhưng mà mình giới thiệu cho 1 cách nhanh hơn này :D. Chỉ cần 1 dòng thôi: `Post::first()->duplicate();`
```php
$clone = Post::first()->duplicate(); //sử dụng biến clone để lưu giá trị duplicate

return $clone; //check thử xem biến clone bây giờ có gì
```
Giờ thì bạn sẽ thấy trong DB của mình có thêm 1 bản sao của bản ghi đầu tiên nhé :D
![](https://images.viblo.asia/f64dbc1b-3950-438c-91b0-51d5a1ce79e0.png)
### Copy 1 bản ghi sang bảng khác - database khác
Trong trường hợp bạn cần copy DB, hay copy bản ghi sang 1 bảng tương tự thì cũng tận dụng được package này luôn nhé:
```php
Post::first()->duplicateTo('connection');

```
Ở đây ta copy bản ghi đầu tiên trong bảng post, và copy sang địa chỉ mới thông qua 1 `connection` (Đọc tài liệu tại [đây](https://laravel.com/docs/5.2/database#accessing-connections) nhé)
### Nhưng mà Model của mình có cả dây mơ rễ má relationship đi kèm thì sao?
Bây giờ đặt tình huống, `Post` của mình thì có nhiều `Image` hình ảnh minh họa đi kèm, mà nó cũng có nằm trong nhiều `Category` - Danh mục sẵn rồi. Vậy thì khi Clone, muốn clone kèm cả các thể loại dây mơ rễ má đó bạn sửa lại Model 1 chút như sau nhé:
```php
class Post extends Eloquent {
	use \Bkwld\Cloner\Cloneable;

	protected $cloneable_relations = ['images', 'categories']; //Chọn các relationship sẽ được clone kèm

	public function images() {
		return $this->hasMany('Image');
	}

	public function categories() {
		return $this->belongsToMany('Category');
	}
}
```
Sau khi sửa lại như vậy, chỉ cần dòng lệnh 
```php
Post::first()-> duplicate();
```
ở trên là kèm theo đã clone cả các Hình ảnh minh họa và cả Danh mục của bài post đấy rồi: Tất cả các hình ảnh được copy mới và thiết lập quan hệ với bản ghi mới, đồng thời tự động các trường trong pivot table của quan hệ N - N giữa Post và Category cũng tự động được thêm vào bản ghi mới tương ứng. Ngoài ra, nếu `Image` lại dây mơ rễ má gì hơn nữa thì bạn lại có thể dùng `$cloneable_relations` để thiết lập và clone cho đủ nhá :D
> Chú ý: Quan hệ N - N thì không thể clone sang DB khác được nhé, vì chưa chắc DB mới đã có thể sử dụng mối quan hệ bảng trung gian này
### Vậy có tự tùy chỉnh - chọn clone trường này, không clone chỗ nào không?
Về mặc định thì qua ví dụ Clone đầu tiên thì chắc mọi người cũng để ý rồi, Cloner sẽ không clone `Id`, cũng như `updated_at` và `created_at`. Tuy nhiên là bạn có thể chọn thêm vài trường khác để Cloner không động vào các giá trị này:
```php
class Image extends Eloquent {
	use \Bkwld\Cloner\Cloneable;

	protected $clone_exempt_attributes = [
       'img_name',
       'source',
    ]; //khai báo các trường không clone

	public function post() {
		return $this->belongsTo('Post');
	}

	public function onCloning($src, $child = null) { //trong trường hợp cần clone
		$this->img_name = str_random(); //nếu muốn có thể tự động thêm giá trị khác vào trường mà mình đã chọn không clone
		if ($child) echo 'This was cloned as a relation!'; // biến $child giúp xác định xem quá trình clone này có clone cả relation hay không 
		echo 'The original key is: ' . $src->getKey();
	}
}
```
Việc xử lý thêm hàm `onCloning()` vô cùng hữu ích khi mà bạn có thêm 1 trường cần Unique nữa ngoài trường ID, bởi khi bạn Clone thì không thể Clone cả trường Unique đó được, vì làm vậy thì nó đâu còn Unique nữa :v, nhưng lại cũng không thể để trống trường này, vì nó là NOT NULL. Vậy thì bạn có thể gán giá trị khác cho nó trong quá trình clone như trên nhé.
### Clone file thì sao?
Hmm, giờ 1 trong số các trường cần clone có dẫn tới 1 file, thì muốn clone cả cái file mà nó dẫn tới có được không? `Cloner` cho phép bạn có thể làm điều này nhưng với sự support của [Bkwld\Upchuck](https://github.com/BKWLD/upchuck).
Bạn có thể đọc thêm hướng dẫn và ví dụ gốc ở đây nhé: https://github.com/BKWLD/cloner#cloning-files
# Nguồn và tham khảo thêm
Bài viết mình dịch và làm rõ chi tiết hơn từ bài viết gốc cho mọi người sử dụng, mọi người có thể tham khảo bài viết gốc ở đây nhé:
https://github.com/BKWLD/cloner