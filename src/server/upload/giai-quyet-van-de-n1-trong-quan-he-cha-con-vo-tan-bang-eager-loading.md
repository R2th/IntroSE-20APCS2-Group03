## Vấn đề
Trong khi phát triển ứng dụng, chắc hẳn các bạn đã gặp phải trường hợp đệ quy cha-con trong khi phát triển các dự án, ví dụ như cây thư mục như sau:

| id | name | parent_id |
| -------- | -------- | -------- |
| 1     | A     | null     |
| 2     | B     | 1     |
| 3     | C     | 1     |
|...|...|...|

Trong bài viết này mình sẽ lấy ví dụ về `QuestionFolder`, thư cây thư mục chứa câu hỏi của hệ thống trắc nghiệm.
Thông thường chúng ta sẽ tạo 2 relationship ở Model như sau:
```php
// Model QuestionFolder.php
public function childs()
{
    return $this->hasMany('App\Models\QuestionFolder', 'parent_id', 'id');
}

public function parent()
{
    return $this->belongsTo('App\Models\QuestionFolder', 'parent_id', 'id');
}
```

Vậy khi chúng ta cần lấy ra `Collection` tất cả các thư mục con (và cả thư mục con của thư mục con nữa) của một thư mục nào đó:
```php
// Model QuestionFolder.php
public function allChildFolders()
{
    $child_folders = [$this];
    $folders = [$this];
    while(count($folders) > 0) {
        $nextFolders = [];
        foreach ($folders as $folder) {
            $child_folders = array_merge($child_folders, $folder->childs->all());
            $nextFolders = array_merge($nextFolders, $folder->childs->all());
        }
        $folders = $nextFolders;
    }

    return new Collection($child_folders);
}
```
Bây giờ chạy xem kết quả nào:
```php
// Route web.php
Route::get('test-recursive', function() {
    dump(\App\Models\QuestionFolder::findOrFail(27)->all_child_folders);
});
```

![](https://images.viblo.asia/8c003499-bf24-4c0c-a585-1db9016e186f.png)

Mọi thứ vẫn cứ ok, bạn vẫn có được kết quả mong muốn. Nhưng tận 101 lượt truy vấn, **quá nhiều query**. Trong một ứng dụng có vài chục thư mục thì có vẻ ổn, tuy nhiên nếu số lượng thư mục lên đến hàng ngàn, hay chục ngàn, Laravel sẽ phải **truy vấn hàng chục ngàn lần**, và CSDL của bạn sẽ như cái mềm rách ☹

## Recursive Relationship & Eager Loading
Trong Laravel có một chức năng rất tiện lợi để giải quyết những trường hợp N+1 query đó chính là Eager Loading. 

Nhưng ở trường hợp này, chúng ta không biết cây thư mục này sâu bao nhiêu để có thể gọi phương thức `with()`.
Vì vậy chúng ta sẽ bổ sung vào một quan hệ là `allChilds`:
```php
// Model Folder.php
public function allChilds()
{
    return $this->childs()->with('allChilds');
}
```
Và sửa hàm `allChildFolders()` lại một xíu:
```
public function allChildFolders()
{
    $child_folders = [$this];
    $folders = [$this];
    while(count($folders) > 0) {
        $nextFolders = [];
        foreach ($folders as $folder) {
            $child_folders = array_merge($child_folders, $folder->allChilds->all());
            $nextFolders = array_merge($nextFolders, $folder->allChilds->all());
        }
        $folders = $nextFolders;
    }

    return new Collection($child_folders);
}
```
Ta tạo thêm một route khác để test xem nào
```php
// Route web.php
Route::get('test-recursive', function() {
    dump(\App\Models\QuestionFolder::findOrFail(27)->allChildFolders);
});
```
Và đây là kết quả:
![](https://images.viblo.asia/acc54287-92c1-467c-8de4-80f145084999.png)

Awesome! Đây là bài viết đầu tiên trên Viblo, hy vọng là các bạn thích bài viết này, happy coding 🥰
Bạn cũng có thể tham khảo thêm bài viết [Làm thế nào để tối ưu hoá khi cần lấy bài viết mới nhất, hay bình luận mới nhất](https://viblo.asia/p/lai-la-cau-chuyen-n1-ban-se-lam-the-nao-de-lay-bai-viet-dau-tien-hay-binh-luan-moi-nhat-3Q75wV2GlWb) bằng cách sử dụng Subquery trên Laravel nhé

Xem thêm các bài viết của tác giả tại blog [Heliotech](https://heliotech.me)