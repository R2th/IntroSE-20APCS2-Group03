# 1. Đặt vấn đề với bài toán xóa bản ghi
Đối với một ứng dụng bất kì chúng ta cũng đều có các chức năng đơn giản như thêm, xóa, sửa. Trong laravel để xóa 1 bản ghi chúng ta thường sử dụng hàm `delele()` hoặc `destroy`.
Đi vào ví dụ cụ thể nhé.

Tỉ dụ mình có bảng `groups` ánh xạ thông qua model `Group`, để xóa 1 bản ghi trong bảng này chúng ta thường làm theo cách nào ?
```php
    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $group = Group::findOrFail($id);
        
        return $group->delele();
    }
```
Đây có lẽ là cách cùi bắp nhất thường sử dụng.

Đợi chút, ví dụ ở đây bảng `groups` có quan hệ `nhiều - nhiều` với bảng `users` thông qua bảng trong gian `group_user`. Chúng ta có thể hình dung ra việc viết quan hệ giữa các bảng sẽ như thế này.

`Model Group`
```php
    /**
     * Relationships many to many and a pivot table.
     *
     * @return void
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }
```
`Model User`
```php
    public function groups()
    {
        return $this->belongsToMany(Group::class);
    }
```
Vậy là khi thêm bản ghi mới ở bảng `groups` chúng ta đồng thời thêm 1 bản ghi ở bảng `group_user` lưu `user_id` và `group_id`
Giờ vấn đề đặt ra là khi xóa bảng group thì đồng thời xóa bản ghi ở bảng trung gian `group_user`.
Quay lại hàm `delete()` chúng ta xử lí như nhau.
```php
    public function destroy(int $id)
    {
        $group = Group::findOrFail($id);
        $detachUser = $group->users()->detach();
        
        return $group->delele();
    }
```
Bây giờ có một chức năng bắt xóa nhiều group trong 1 action, chúng ta làm như thế nào ?

```php
public function destroy(int $ids)
{
    foreach ($ids as $id) {
        $group = Group::findOrFail($id);
        $detachUser = $group->users()->detach();

        return $group->delele();
    }
}
```
Nhìn qua  thì đoạn code này tương đối nát
1.  Hàm này đang vi phạm nguyên tắc `SOLID` khi hàm 2 nhiệm vụ xóa bảng ghi ở bảng `groups` và `group_user`
2.  Tôi luôn hạn chỉ tối đa việc sử dụng vòng `for` trong code của mình. Nhìn rối mắt.

Ví dụ như hàm trên nếu chúng ra chỉ làm mỗi chức năng xóa bản ghi tên bảng `groups` có lẽ mọi chuyện đã đơn giản hơn khi code không phải dùng hàm `for()`.
```php
public function destroy(int $ids)
{
    return Group::destroy($ids);
}
```
Ở đây tôi sử dụng hàm `destroy()` của `Eloquent` cho phép xóa 1 `array` `ID` nhưng ngặt một lỗi là chúng ta còn muốn xóa cả bản ghi `group_user`, vì vậy kiểu gì cũng phải tìm ra từng `group` thông qua hàm `findOrFail` để `detach`. Vì vậy trong trường hợp này cách `destroy()` có vẻ không hợp lí rồi.

**Bây giờ là lúc chúng ta cần vận dụng sự linh hoạt của Model event trong Laravel để giải quyết vấn đề này.**
# 2. Giải quyết vấn đề với Model event
Trong quá trình hoạt động của mình, mỗi Eloquent Model có thể tạo ra nhiều sự kiện khác nhau, cho phép chúng ta thao tác với những thời điểm khác nhau trong chu kỳ hoạt động của model đó. Các phương thức tương ứng với các sự kiện đó là: 
1. `creating`, `created`: Xảy ra khi bản khi được **lưu lần đầu tiên** vào cơ sở dữ liệu.
2. `updating`, `updated`: Xảy ra khi bản ghi đó được **chỉnh sửa**.
3. `saving`, `saved`: Xảy ra mỗi khi **lưu bản ghi**(có thể là **tạo mới** hoặc **chỉnh sửa**).
4. `deleting`, `deleted`: Xảy ra ghi **xóa** một bản ghi
5. `restoring` và `restored`: Xảy ra khi sử dụng **soft delete** và khi muốn restore lại bản ghi .

Quay lại bài toán ban đầu chúng ta sẽ sử dụng sự kiện `deleting` khi xóa group.
Phần xóa group mình sẽ viết như sau.

```php
public function destroy(int $ids)
{
    return Group::destroy($ids);
}
```
Okay, `method()` này làm duy nhất một nhiệm vụ là xóa `group` để dảm bảo tính `SOLID`.
Vậy còn `detach()` group_user ?

Chúng ta sẽ lợi dụng event `deleting` của **Model event** để làm việc này.

Đầu tiên chúng ta tạo `Event Observer class` cho `Group model`. Class này mình thường để trong thư mục **app/Models/Observers** với tên class là `GroupObserver.php`.
```php
<?php

namespace App\Models\Observers;

use App\Models\Group;

class GroupObserver
{
    /**
     * Hook into group deleting event.
     *
     * @param Group $group
     * @return void
     */
    public function deleting(Group $group)
    {
        $group->users()->detach();
    }
}
```
Việc tiếp theo là **Đăng ký GroupObserver class trong AppServiceProvider**. Cụ thể là trong method `boot()`.
```php
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Group::observe(GroupObserver::class);
    }
```
Đừng quên use `App\Models\Group` và  `App\Models\Observers\GroupObserver`.

Đó vậy là mình đã có thể detach được hoàn toàn tất cả các bản ghi trong bảng `group_user`.
Ở đây mình không quan tâm xóa 1 hay nhiều bản ghi, chỉ cần biết khi xóa 1 `group` thì có sự kiện `deleting()`. Với mỗi lần `destroy` ta tiến hành `detach()` `group_user` tương ứng.
# 3. Tổng kết
Vậy là mình đã hướng dẫn mọi người cách sử dụng Model event trong Laravel. Việc này giúp chúng ta.
1.  Code dễ maintain, bảo trì hơn
2.  Đảm bảo tính `SOLID` mỗi `method` làm một nhiệm vụ duy nhất.
3.  Dễ viết `unit test` hơn.
# 4. Tham khảo
1. [Laravel Model Events](https://viblo.asia/p/laravel-model-events-AyQMpJDpv0Ek) via Viblo.
2. [ Model Event](https://laravel.com/docs/5.7/eloquent#deleting-models) via Document Laravel.

Cảm ơn các bạn đã đọc bài viết. Có bất cứ thắc mắc gì về bài viết xin hãy comment bên dưới. Tạm biệt và hẹn gặp lại.