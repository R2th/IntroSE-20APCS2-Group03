# Sử dụng `exists()` và `doesntExist()`

## 1. `exists()`

Thay vì:
```php
if (Post::where('slug', $slug)->count()) {
    //...logic
}
```
Hãy dùng:
```php
if (Post::where('slug', $slug)->exists()) {
    //...logic
}
```

## 2. `doesntExist()`

Thay vì:
```php
if (! Post::where('slug', $slug)->count()) {
    //...logic
}
```
Hãy dùng:
```php
if (Post::where('slug', $slug)->doesntExist()) {
    //...logic
}
```

## 3. So sánh

Với mysql laravel sẽ biên dịch thành:
- `count()` 

    ```mysql
    select count(*) as aggregate from `posts` where `slug` = 'abc'
    ```
    Đếm có bao nhiêu dòng dữ liệu thỏa điều kiện. Phải chạy từ đầu đến cuối bảng dữ liệu để so sánh và đếm => ***chậm***.
- `exists()`

    ```mysql
    select exists(select * from `posts` where `slug` = 'abc') as `exists`
    ```
    Nếu tìm thấy dòng dữ liệu thỏa điều kiện thì sẽ trả về true, nếu không thì trả về false. Trường hợp tốt nhất là dòng dữ liệu thỏa điều kiện nằm ở đầu của bảng dữ liệu.

![](https://images.viblo.asia/baaedc89-295d-4174-9805-2ad6e0914b54.png)

## 4. Tham khảo

- [Laravel - Determining If Records Exist](https://laravel.com/docs/9.x/queries#determining-if-records-exist)

## 5. Lời kết
Ưu điểm: 
- Tốc độ query nhanh hơn so với dùng `count()`.

- Code sẽ tường minh hơn về mặt ngữ nghĩa (exists: tồn tại - does not exists: không tồn tại).

Hi vọng chia sẻ này sẽ giúp các bạn newbie 1 phần nào trong quá trình tìm hiểu về Laravel.

> Mình là **Công Thành** Cám ơn các bạn đa theo dõi bài viết của mình, nếu nếu có câu hỏi nào vui lòng bình luận 👇 phía dưới nhé.