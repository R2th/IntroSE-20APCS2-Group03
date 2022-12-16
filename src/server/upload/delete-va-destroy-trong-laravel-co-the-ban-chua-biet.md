## Giới thiệu

Xin chào các bạn, nếu các bạn đã làm việc với framework Laravel thì chắc đều đã sử dụng tới Eloquent ORM nhỉ. Đây là loại ORM mặc định của Laravel, nó đã support rất "nhiệt tình" cho chúng ta khi làm việc với database :kissing_heart: . Vậy có khi nào bạn thắc mắc khi xóa một dữ liệu nào đó bằng **Delete()** hoặc **Destroy()** thì nên dùng khi nào? và hai methods đó chạy như nào không? Nên hôm nay mình xin phép đưa ra ý kiến cá nhân của mình tìm hiểu được, chúng ta cùng bắt đầu nhé :wink:

## Khi nào nên sử dụng Delete() hoặc Destroy()?

### Delete()

Delete() được sử dụng theo hai cách khác nhau:

Ví dụ như để xóa một model, thì ta sẽ gọi luôn hàm `delete()` trong model instance:

```php
$item = App\Item::find(1);

$item->delete();
```

Hoặc là dùng để xóa các Models bằng truy vấn:

```php
$item = App\Item::where('active', 0)->delete();
```

Qua hai ví dụ trên, ta có thể thấy câu lệnh sẽ thực thi lấy model từ database trước khi gọi tới hàm `delete()`. Tuy nhiên, nếu chúng ta đã biết primary key của model rồi thì ta có thể xóa mà không cần lấy nó ra nữa,  lúc đó là ta sẽ sử dụng tới hàm `destroy()`.

### Destroy()

`Destroy()` là phương pháp dùng để loại bỏ một thực thể trực tiếp (thông qua object hoặc model).

```php
Item::destroy(1);

Item::destroy([1, 2, 3]);

Item::destroy(1, 2, 3);
```

Như vậy vừa rồi mình đã nói về việc nên sử dụng `delete()` và `destroy()` khi nào rồi, giờ chúng ta cùng thử xem khi mình gọi đến cái hàm đó thì trong Eloquent ORM của Laravel sẽ chạy như nào và có liên quan gì với nhau không nhé (go).

## Cách xử lý Delete(), Destroy() trong Eloquent của Laravel.

Giờ ta cùng đào sâu vào trong framework của Laravel một tý nhé, bạn có thể giữ Ctrl rồi click chuột thẳng vào hàm `delete()` hoặc `destroy()` là nó sẽ đưa ta đến đích. Nếu không thì bạn cũng có thể mở bằng cơm :grin: nó sẽ nằm trong thư mục sau **vendor/laravel/framework/src/Illuminate/Database/Elequent/Model.php** rồi nhấn Ctrl + F để tìm nhé, một pha xử lý khá cồng kềnh phải không :)))

Ok, giờ ta có thể nhìn thấy hàm `delete()` như sau: 

```php
    public function delete()
    {
        if (is_null($this->getKeyName())) {
            throw new Exception('No primary key defined on model.');
        }

        // If the model doesn't exist, there is nothing to delete so we'll just return
        // immediately and not do anything else. Otherwise, we will continue with a
        // deletion process on the model, firing the proper events, and so forth.
        if (! $this->exists) {
            return;
        }

        if ($this->fireModelEvent('deleting') === false) {
            return false;
        }

        // Here, we'll touch the owning models, verifying these timestamps get updated
        // for the models. This will allow any caching to get broken on the parents
        // by the timestamp. Then we will go ahead and delete the model instance.
        $this->touchOwners();

        $this->performDeleteOnModel();

        // Once the model has been deleted, we will fire off the deleted event so that
        // the developers may hook into post-delete operations. We will then return
        // a boolean true as the delete is presumably successful on the database.
        $this->fireModelEvent('deleted', false);

        return true;
    }
```
Đầu tiên nó sẽ kiểm tra xem Model đó có tồn tại hay không, nếu tồn tại thì nó sẽ tiếp tục quá trình xóa trên model, kích hoạt các sự kiện cần thiết. Khi model bị xóa, laravel sẽ loại bỏ sự kiện đã xóa và sau đó sẽ return một giá trị boolean là true khi xóa thành công trên database.

Tiếp theo là hàm `destroy()`: 

```php
public static function destroy($ids)
    {
        // We'll initialize a count here so we will return the total number of deletes
        // for the operation. The developers can then check this number as a boolean
        // type value or get this total count of records deleted for logging, etc.
        $count = 0;

        if ($ids instanceof BaseCollection) {
            $ids = $ids->all();
        }

        $ids = is_array($ids) ? $ids : func_get_args();

        // We will actually pull the models from the database table and call delete on
        // each of them individually so that their events get fired properly with a
        // correct set of attributes in case the developers wants to check these.
        $key = ($instance = new static)->getKeyName();

        foreach ($instance->whereIn($key, $ids)->get() as $model) {
            if ($model->delete()) {
                $count++;
            }
        }

        return $count;
    }
```
Ở đây nó sẽ khởi tạo biến `$count = 0` để trả về tổng số lần xóa, theo mình nghĩ là nó sẽ áp dụng trong trường hợp xóa một mảng nào đó. Tiếp theo nó sẽ kéo models từ database và gọi xóa trên mỗi đơn vị xóa trong tổng số đó. Ta cũng thấy nó cũng gọi tới hàm `delete()` để load hết dữ liệu trước rồi mới tìm chính xác đến đơn vị cần xóa rồi cuối cùng sẽ return ra tổng số lần xóa.

> Như vậy khi gọi hàm destroy() thì nó vẫn chạy qua hàm delete() rồi mới thực thi tiếp quá trình xóa.

Ngoài ra, Laravel cũng cung cấp một phương thức xóa khác gọi là  `Soft Deleting` có nghĩa là xóa nhưng không phải xóa :))) cụ thể nó hoạt động ra sao các bạn tìm hiểu theo trên doc của Laravel nhé.

## Kết thúc

> Tóm lại có thể hiểu đơn giản như sau, `delete()` sẽ trả về giá trị kiểu bool là **true** hoặc **false** , còn `destroy()` sẽ trả ra kiểu giá trị int là tổng số bản ghi được xóa.

Qua bài viết này mong các bạn cũng hiểu được phần nào về `Delete() và Destroy()`. Đây là bài viết đầu tiên của mình nên chắc chắn còn nhiều sai sót, mong các bạn góp ý để mình hoàn thiện bản thân hơn nữa, cảm ơn mọi người đã đọc bài của mình.

### Bài viết tham khảo:

https://laravel.com/docs/5.7/eloquent#deleting-models

https://laracasts.com/discuss/channels/laravel/what-is-the-difference-between-destroy-and-delete