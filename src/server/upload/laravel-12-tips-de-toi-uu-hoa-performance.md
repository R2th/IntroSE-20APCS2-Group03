Kể từ khi xuất hiện vào năm 2011, Laravel đã trở thành một lựa chọn rất phổ biến để phát triển các ứng dụng business-focused bao gồm các hệ thống quản lý thông tin (thường được gọi là hệ thống quản lý thông tin business) và nền tảng thương mại điện tử. Một khía cạnh quan trọng của sự phổ biến này là tối ưu hóa hiệu suất của Laravel cho phép các nhà phát triển hoàn thiện hiệu năng(performance) của các ứng dụng Laravel.

![](https://images.viblo.asia/4ba5d0ec-56d2-48f2-980c-60ef7978e584.jpg)

<br>

## Why Businesses Should Focus on Laravel Performance Optimization

Cấu trúc của framework và các thư viện liên quan đảm bảo cho các developer có thể tạo code mạnh mẽ với effort tối thiểu. Tuy nhiên, code vẫn có chỗ để tối ưu hóa có thể được sử dụng để điều chỉnh performance của Laravel để đảm bảo hiệu suất mượt mà (smooth) sau khi triển khai(deployment).

<br>

Hiệu năng và tối ưu hóa là hai yếu tố chính quyết định sự thành công của mọi ứng dụng business. Trong trường hợp này, đảm bảo hiệu năng của ứng dụng Laravel là một tính năng quan trọng mà mọi developer nên cung cấp cho khách hàng của họ. Do Laravel thường được sử dụng để xây dựng các hệ thống business information, hiệu năng của các ứng dụng được cung cấp bởi Laravel có ý nghĩa quan trọng đối với sự thành công của doanh nghiệp. Trong nhiều trường hợp, các hệ thống quản lý thông tin hỗ trợ ra quyết định cho các lớp quản lý cần phải nhanh và hiệu suất cao mọi lúc.

<br>

Trong bài viết này, tôi đã thu thập một số mẹo(tips) quan trọng để tối ưu hóa hiệu năng ứng dụng của Laravel 5.5. Tôi tin rằng những lời khuyên này sẽ giúp ích rất nhiều cho các Laravel's developer, những người chịu trách nhiệm duy trì các ứng dụng business được hỗ trợ bởi Laravel.

<br>

## Prerequisites

Với mục đích của tutorial này, tôi giả sử bạn đã cài đặt ứng dụng Laravel trên web server. Thiết lập của tôi là:

* Laravel 5.5
* PHP 7.1
* MySQL

Để chắc chắn rằng tôi không bị phân tâm bởi các vấn đề ở cấp độ server, tôi đã quyết định sử dụng Cloudways Laravel cloud hosting vì nó quan tâm đến các vấn đề ở cấp độ máy chủ và rất thích hợp để lưu trữ Laravel project. Bạn có thể dùng thử Cloudways miễn phí bằng cách đăng nhập tài khoản (Đoạn này chắc là quảng cáo :D).

<br>

## Tips to Improve Laravel Performance
### 1. Config Caching
Laravel cung cấp một command đặc biệt thú vị, ```Artisan Cache Config``` rất hữu ích trong việc tăng hiệu năng. Cách sử dụng cơ bản của lệnh là:
```
php artisan config:cache
```

Mỗi khi bạn cache config, các thay đổi mà bạn thực hiện sẽ không có hiệu lực. Nếu bạn muốn làm mới cấu hình, chỉ cần chạy lại command trên một lần nữa. Để xóa config cache, sử dụng command sau:

```
php artisan config:clear
```

Để tối ưu ứng dụng hơn nữa, bạn có thể sử dụng ```OPcache``` lưu mã PHP để bạn không cần biên dịch lại.

<br>

### 2. Routes Caching
Routes cache là một tính năng tối ưu hóa cần thiết, đặc biệt đối với các ứng dụng có nhiều routes và config. Routes cache là một mảng đơn giản và giúp tăng tốc hiệu suất của Laravel vì tải mảng nhanh hơn. Để làm điều này, ta sử dụng command sau:

```
php artisan route:cache
```

Nhớ chạy command mỗi lần config hoặc các routes file được thay đổi. Nếu không, Laravel sẽ tải các thay đổi cũ từ cache. Để xóa cache, sử dụng command sau:

```
php artisan route:clear
```

<br>

### 3. Remove Unused Service

Trong việc điều chỉnh hiệu năng của Laravel, một mẹo quan trọng là không tải tất cả các service thông qua config. Trong khi bạn ở đó, luôn nhớ tắt các service không sử dụng trong các file config.

<br>

### 4. Classmap Optimization

Ngay cả một ứng dụng Laravel cấp trung cũng có một số file vì Laravel có thói quen include nhiều file cho include request. Một mẹo đơn giản là khai báo tất cả các file sẽ được đưa vào include request và kết hợp chúng trong một file duy nhất. Do đó, đối với tất cả các include request, một file sẽ được gọi và tải. Để làm điều này, sử dụng command sau:

```
php artisan optimize --force
```

<br>

### 5. Composer Optimize Autoload
Đó là một ý tưởng tốt để sử dụng ```Composer``` scan ứng dụng và tạo liên kết one-to-one của các class và file trong ứng dụng. Sử dụng command sau:

```
composer dumpautoload -o
```

<br>

### 6. Limit Included Libraries

Điểm hay của Laravel là một số lượng lớn các thư viện(libraries) có thể được đưa vào một ứng dụng. Mặc dù đây là một điều tốt, nhưng nhược điểm là việc trải nghiệm ứng dụng có thể bị chậm lại.

<br>

Đây là lý do tại sao cần xem lại tất cả các thư viện được gọi lại trong code. Nếu bạn nghĩ rằng bạn có thể thực hiện mà không cần thư viện, hãy xóa nó khỏi ```config/app.php``` để tăng tốc ứng dụng Laravel. Một nơi quan trọng khác là ```composer.json```.

<br>

### 7. JIT Compiler


Dịch mã PHP sang bytecode và sau đó execute nó là một tiến trình tốn nhiều tài nguyên. Đây là lý do tại sao go-between như Zend Engine được yêu cầu để execute C subroutines. Quá trình này phải được lặp lại mỗi lần ứng dụng được thực thi. Để giảm thời gian thì điều cần thiết là quá trình này chỉ được lặp lại chỉ một lần. Đây là nơi trình biên dịch Just-in-Time (JIT) tỏ ra rất hữu ích. Đối với các ứng dụng Laravel, trình biên dịch JIT được đề xuất là HHVM của Facebook.

<br>

### 8. Choose a Fast Cache and Session driver

Để điều chỉnh hiệu năng tối ưu của Laravel, cách tốt nhất là lưu trữ cache và session trong RAM. Tôi tin rằng cache và session driver nhanh nhất cho hiệu năng của Laravel 5 là ```Memcached```.

<br>

Driver key để thay đổi session driver thường nằm trong ```app/config/session.php```. Tương tự, driver key để thay đổi cache driver nằm trong ```app/config/cache.php```.

<br>

### 9. Cache Queries Results

Caching các kết quả của các truy vấn thường xuyên chạy là một cách tuyệt vời để cải thiện hiệu năng của Laravel 5.5. Đối với điều này, tôi khuyên bạn nên sử dụng ```remember``` function, được sử dụng như sau:

```
$posts = Cache::remember('index.posts', 30, function()
 
{return Post::with('comments', 'tags', 'author', 'seo')->whereHidden(0)->get();});
```

<br>

### 10. Use “Eager Loading” for Data

Laravel cung cấp một ORM tuyệt vời để xử lý cơ sở dữ liệu. Được biết đến như ```Eloquent```, nó tạo ra các abstracts model từ các bảng trong cơ sở dữ liệu. Sử dụng các cấu trúc đơn giản, các developer có thể sử dụng ```Eloquent``` để xử lý tất cả các CRUD trong PHP. Khi Eloquent sử dụng eager loading, nó sẽ truy xuất tất cả các object model được liên kết để response với truy vấn ban đầu. Điều này được thêm vào response của ứng dụng. Hãy so sánh lazy loading and eager loading:

<br>

Lazy loading query sẽ như sau:

```
$books = App\Book::all();
 
foreach ($books as $book) {
 
echo $book->author->name;}
```

Tương ứng, eager loading query sẽ như sau:

```
$books = App\Book::with('author')->get();
 
foreach ($books as $book) {
 
echo $book->author->name;
 
}
```

<br>

### 11. Precompile Assets
Để điều chỉnh ứng dụng Laravel, các developer thường phân phối code thành các file riêng biệt. Mặc dù điều này giữ cho code sạch (code clean) và dễ quản lý, nhưng nó không góp phần vào một sản phẩm hiệu quả. Để giúp các developer trong bối cảnh này, Laravel cung cấp một command đơn giản:

```
php artisan optimize
 
php artisan config:cache
 
php artisan route:cache
```

<br>

### 12. Use CDN for Delivering Static Assets

![](https://images.viblo.asia/7ae42566-bde0-4d20-8f67-e7cd04482478.jpg)

Tải static assets file từ máy chủ CDN (trái ngược với tải trực tiếp từ máy chủ lưu trữ file) sẽ cải thiện hiệu năng ứng dụng của Laravel.

<br>

Khi client truy cập vào một site, một phần thông tin được cung cấp từ khu vực ```CloudwaysCDN``` gần nhất. Kết quả này về cơ bản là ```stack speed``` trang nhanh và đáng kinh ngạc cho client. ```CloudwaysCDN``` là một lợi ích dựa trên CDN. Điều này nghĩa là bạn phải mô tả các tài nguyên tĩnh (JS, CSS, HTML, hình ảnh, recording, v.v.) trên một ứng dụng cụ thể.

<br>

**Nguồn**: https://www.cloudways.com/blog/laravel-performance-optimization