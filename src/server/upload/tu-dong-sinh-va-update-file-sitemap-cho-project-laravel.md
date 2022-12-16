### Mở đầu
Với một trang web thì file sitemap tương đối quan trọng, nhất là trong việc seo và phục vụ google boot đánh index các url hiện có trên website của chúng ta. Vậy nên việc sinh một sitemap tự động là nhu cầu tất yếu, không tốn nhiều thời gian mà lại rất thiết thực. Nhất là khi website còn mới, đã qua giai đoạn test và tạo những dữ liệu ban đầu, và rồi quyết định publish ra ngoài thì việc chỉ một lệnh tạo luôn site map và các url đã có là rất tiện lợi và tiết kiệm thời gian... 

Mặc dù hiện cũng có một số công cụ giúp tạo site map online nhưng với một số lượng giới hạn url nhất định, nổi tiếng nhất có lẽ là [sitemap generator của xml-sitemaps.com](https://www.xml-sitemaps.com/) nhưng họ chỉ cho những site nào ở mức độ nhỏ, cỡ khoảng 500 urls đổ lại. Còn nhiều hơn thì phải trả phí. Hơn nữa việc tạo online rồi tải về, sau đó lại update lên host của chúng ta thực sự khá bất tiện, nhất là khi so với một công cụ tự viết chỉ cần gõ - ví dụ `php artisan sitemap:create` rồi set nó vào cronjob tự động sinh và update cuối mỗi tuần thì rõ ràng tool tự viết tiện lợi hơn nhiều...  

### Sử dụng package Laravelium/Sitemap và tạo lệnh sinh site map
Tình cờ mình tinh được package này thôi, khi mình search google để tìm một package mà mình đoán kiểu gì thì cũng có vài cái. Bạn có thể xem qua repo của package này tại đây https://gitlab.com/Laravelium/Sitemap.  Việc sử dụng thì tương đối dễ dàng, không có gì là khó cả. Đầu tiên chúng ta cần cài đặt package trước đã:

```bash
composer require laravelium/sitemap
//Publish các file config
php artisan vendor:publish --provider="Laravelium\Sitemap\SitemapServiceProvider"
```

Tiếp theo là chúng ta cần tạo một Artisan command, giả sử câu lệnh mà chúng ta sử dụng sinh site map là `php artisan sitemap:create` như đã nói ở trên chẳng hạn. Gõ lệnh dưới đây để tạo mới một command class nằm trong `app/Console/Commands`
```
php artisan make:command CreateSiteMap
```

Phần việc tiếp theo tương đối đơn giản, cập nhật phần signature. Đây là phần đối số sẽ trigger câu lệnh cũng như hiển thị khi chúng ta chạy php artisan list

```
protected $signature = 'sitemap:create';
```

Bây giờ đến phần logic chính tạo sitemap ở phần handle câu lệnh. Bạn có thể xem qua phần code ví dụ của mình như dưới đây.

```php
public function handle()
    {
        // create new sitemap object
        $sitemap = \App::make("sitemap");

        // add items to the sitemap (url, date, priority, freq)
        $sitemap->add(\URL::to('/'), '2012-08-25T20:10:00+02:00', '1.0', 'daily');

        $categories = \DB::table('categories')->orderBy('created_at', 'desc')->get();

        foreach ($categories as $category)
        {
            $sitemap->add(env('APP_URL'). $category->slug, $category->created_at, '0.8', 'daily');
        }

        // get all posts from db
        $posts = \DB::table('posts')->orderBy('created_at', 'desc')->get();

        // add every post to the sitemap
        foreach ($posts as $post)
        {
            $sitemap->add(env('APP_URL'). "some-things/{$post->slug}", $post->created_at, '0.7', 'daily');
        }

        // generate your sitemap (format, filename)
        $sitemap->store('xml', 'sitemap');

    }
```

Phần code trên đã bao gồm comment khá dễ để hình dung, `(url, date, priority, freq)` các giá trị truyền vào lần lượt ở đây là `url`, `date` - ngày sinh ra url khá dễ hiểu, tuy nhiên mình chỉ lưu ý cách đánh điểm `priority` và `freq`. 

Nôm nà là chỉ số priority biểu thị độ quan trọng của url trong trang. Nhằm nhấn mạnh hơn đối với crawler, chứ bản thân nó không có giá trị gì đối với việc so sánh hay cho rằng url này cao hơn hay thấp hơn đối với những trang khác, mà chỉ có giá trị trong nội bộ trang thôi. Giá trị hợp lệ của chỉ số priority này từ `0 -> 1` Vì thế giá trị ưu tiên hiện mình để như trên là trang chủ thì giá trị là 1 - quan trọng nhất, các trang thể loại thì giá trị thấp hơn một chút và bài viết thì thấp hơn các trang danh sách thể loại bài viết, sản phẩm...

Tiếp theo, chỉ số freq biểu thị mức hay thay đổi, update của url. Chỉ số này không ảnh hưởng đến tần suất crawler google  quay lại và reindex url của chúng ta nên cũng không quá quan trọng, chỉ cần để daily hay monhtly là được....

Và rồi kết quả là chúng ta có được một file site map với định dạng xml như dưới đây trong folder public mỗi khi chạy `php artisan sitemap:create` 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet href="/vendor/sitemap/styles/xml.xsl" type="text/xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
	<url>
	<loc>https://home.com</loc>
		<priority>1.0</priority>
		<lastmod>2012-08-25T18:10:00+00:00</lastmod>
		<changefreq>daily</changefreq>
	</url>
	<url>
	<loc>category-url</loc>
		<priority>0.8</priority>
		<lastmod>2019-04-02T13:36:10+00:00</lastmod>
		<changefreq>daily</changefreq>
	</url>
    <url>
	<loc>post-url</loc>
		<priority>0.7</priority>
		<lastmod>2018-12-06T10:22:45+00:00</lastmod>
		<changefreq>daily</changefreq>
	</url>
</urlset>

```

Để tiện lợi hơn thì chúng ta có thể thêm vào cronjob để tự động sinh sitemap vào mỗi cuối tuần (hay cuối tháng, tùy thuộc vào tần suất sinh ra content mới trên trang của chúng ta)
```php
$schedule->command('sitemap:create')->weekly();
```

### Kết luận

Vậy là chỉ với một chút thời gian nhỏ bỏ ra, chúng ta vừa tiết kiệm được một khoản chi phí không đáng có phải trả cho một số dịch vụ sinh sitemap online. Chủ động đánh các thông số, cũng như tự động sinh sitemap từ nay về sau mà không cần lưu tâm gì đến nó nữa, mà còn tốt cho SEO chứ. Hơn thế, lại có được một file site map hiển thị rất đẹp như dưới đây không nhưng phục vụ bot mà thậm chí còn cả trải nghiệm người dùng (tuy hiếm ai vào xem) như hình dưới đây
![](https://images.viblo.asia/4e4ebdb6-b639-41b5-bb67-481113fe41cb.png)

Bài viết của mình đến đây là đã kết thúc, cám ơn bạn đã giành thời gian cho bài viết của mình nhiều nhé ^^

![](https://i.imgur.com/3Q686p3.gif)