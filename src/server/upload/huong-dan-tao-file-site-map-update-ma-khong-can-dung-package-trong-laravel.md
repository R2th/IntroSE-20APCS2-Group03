**Chào mọi người**

m đang làm về phần site map.xml trên web code trực tiếp,
Nay m hướng dẫn mọi người tạo file site map update khi bạn add bài, cái này hỗ trợ google rất tốt vì khi google crawler web thì nó sẽ là update, và không phải dùng tới pkg để tạo file mới

Trong phần route web thì bạn tạo 1 controller

```php
Route::get('/site-map.xml', [..........Controller::class, 'site_map']);
```

bạn nên để route này dưới route trang chủ nhé (/) nhé vì nếu để dưới sâu thì sẽ không nhận ra route khi chạy link sitemap

Trong controller thì bạn lấy hết dữ liệu cate, post, page, tags,... ra hết rồi truyền data ra view

view thì bạn đặt tên gì cũng được rồi add cái chuẩn XML vào

như m đang cho ví dụ, cái này còn thiếu nhé mn

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>http://inanbinhduong.info/</loc>
    </url>
    <url>
        <loc>http://inanbinhduong.info/in-hoa-don</loc>
    </url>
    <url>
        <loc>http://inanbinhduong.info/in-offset</loc>
    </url>
    <url>
        <loc>http://inanbinhduong.info/in-hoa-don/in-hoa-don-ban-le-1-lien-30.html</loc>
    </url>
   
</urlset>
```

những cái đó thì bạn lấy file XML chuẩn trên mạng mà add vào,

Nhưng điều quan trọng lúc bạn truyền dữ liệu ra view bình thường là dùng `return view('.............',compact('.....'))` thì lúc chạy link nó sẽ không hiện file như XML mà là file text

**ảnh chụp mà m làm thành công**

![image.png](https://images.viblo.asia/0da5e66b-cdf2-4cfb-9d56-de233e265b62.png)

**ảnh chụp khi chưa thành công**

![image.png](https://images.viblo.asia/45655488-339f-40dd-b67f-48051b1d35a9.png)

để có được thành quả thì lúc truyền dữ liệu ra view bạn chỉ cần thay đổi chỗ này là được nhé 

## return response()->view('pan_site.site_map', compact('............'))->header('Content-Type', 'text/xml');

chỗ này sẽ quyết định dữ liệu truyền ra, có thể nhiều người đã biết có thể không biết nên m viết bài cho những ai cần, m cũng thử nhiều hướng dẫn trên mạng, may mà vô tình lại được

thank mn đã đọc, nếu không hiểu chỗ nào vui lòng để lại cmt cho tớ nhé