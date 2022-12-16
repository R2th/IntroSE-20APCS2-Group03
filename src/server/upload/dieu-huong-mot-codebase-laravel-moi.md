Bắt đầu trong một codebase mới có thể khiến bạn lúng túng, thậm chí còn gây hoang mang nếu bạn mới làm quen với lập trình. Vậy bạn cần bắt đầu từ đâu? Đâu là nơi cần tìm hiểu đầu tiên về một codebase? Chúng ta hãy xem xét một vài trọng điểm của Laravel nhé.
## Tài liệu của framework
Tài liệu của project có thể hữu ích nhất khi học một codebase mới. Bạn chắc chắn sẽ được may mắn hơn nếu codebase của bạn có tài liệu, nhưng tất nhiên những tài liệu đó cũng có thể thiếu đi sự cụ thể hoặc khá mơ hồ. Tài liệu dự án thường ở dạng tệp readme, wiki hoặc tài liệu được chia sẻ khác trên các diễn đàn hoặc những bài viết blog. Trong khi bạn đang làm việc trên cơ sở mã mới, đừng ngần ngại đóng góp cho tài liệu hiện tại để lấp đầy khoảng trống hoặc làm rõ điều gì đó hơn.
Nếu bạn không may mắn (và phần lớn là như vậy), dự án của bạn sẽ không có bất kỳ tài liệu nào cả. Việc thiếu tài liệu không hoàn toàn là một điều xấu. Nếu đúng như vậy, bạn sẽ có cơ hội viết tài liệu cho nhóm của mình. Rồi bạn và đồng đội của bạn sẽ cảm ơn bạn trong tương lai - cũng như bất kỳ nhà phát triển mới nào bạn tham gia.
Viết tài liệu thực sự không phải là một công việc hấp dẫn, nhưng nó là điều cần thiết để giữ cho một dự án phát triển tốt. Tài liệu dự án không chỉ có một phác thảo về các công nghệ được sử dụng và thiết lập ban đầu, mà nó cũng phải nêu rõ lý do và cách thức thực hiện của phần mềm. Một số quyết định và lý do cấp cao nhất định có thể, và nên, được ghi lại để giúp hiểu rõ hơn về codebase.
## composer.json
Composer là một trình quản lý gói PHP đã giúp đẩy hệ sinh thái PHP tiến lên với tốc độ nhanh chóng trong vài năm qua. Laravel đã sử dụng Composer kể từ phiên bản 4, vì vậy rất có thể bạn có tệp composer.json trong dự án của mình. Bạn sẽ thấy tệp composer.json và tệp composer.lock trong kho dự án của bạn.
Tệp khóa bao gồm các phiên bản chính xác của các phụ thuộc mà ứng dụng của bạn yêu cầu trong dự án và tệp JSON hiển thị bản phát hành chung của các phụ thuộc. Hiện tại, chúng tôi chỉ quan tâm đến phiên bản JSON, nhưng nếu bạn muốn tìm hiểu thêm về các tệp này, bạn có thể đọc thêm [tại đây](https://getcomposer.org/doc/01-basic-usage.md#installing-dependencies).
Trong khi xem qua tệp composer.json, bạn sẽ thấy khối yêu cầu, trông giống như
```php
{
    "require": {
        "php": ">=7.1.3",
        "fideloper/proxy": "~4.0",
        "laravel/framework": "5.6.*",
        "laravel/tinker": "~1.0"
    }
}
```
Trong ví dụ này, chúng ta có một dự án đòi hỏi Laravel 5.6, cũng như hai gói khác và một phiên bản PHP tối thiểu là 7.1.3. Bạn sẽ có nhiều khả năng có nhiều phụ thuộc hơn trong dự án của mình và các phiên bản có thể khác nhau.
Bây giờ bạn đã biết những phụ thuộc mà dự án của bạn yêu cầu, bạn có thể bắt đầu nhìn vào những gì họ đang làm và những gì họ làm. Tôi sẽ đề nghị bắt đầu với sự phụ thuộc của Laravel và tài liệu của nó. May mắn là tài liệu đơn giản để tìm trực tuyến tại https://laravel.com/docs/{VERSION} và https://laravel.com/api/{VERSION} cho trường hợp trên đây sẽ là https://laravel.com/docs/5.6 và https://laravel.com/api/5.6.
Các tài liệu sẽ cung cấp cho bạn một cái nhìn tổng quan chung về khuôn khổ và cách thức hoạt động của từng phần chính. Tài liệu api sẽ cung cấp cho bạn danh sách tất cả các lớp của khung và tất cả các phương pháp trong mỗi lớp.
Một khi bạn đã xem qua tài liệu Laravel, sau đó bạn có thể xem xét từng phụ thuộc khác được liệt kê. Bạn có thể tìm thêm thông tin bằng cách vào [Packagist](https://packagist.org/) là kho lưu trữ gói mà Composer sử dụng. Bạn có thể tìm thêm thông tin về từng phụ thuộc bằng cách truy cập https://packagist.org/packages/{VENDOR}/{PACKAGE} trông giống như https://packagist.org/packages/fideloper/proxy.
Trên mỗi trang Packagist, bạn sẽ nhận được mô tả về gói, danh sách các phụ thuộc, số phiên bản, liên kết tới kho lưu trữ nguồn (như GitHub) và tệp readme đầy đủ, cùng với các thông tin hữu ích khác. Trang này sẽ cung cấp cho bạn đủ thông tin để hiểu gói là gì và nó làm gì cho codebase của bạn. Lặp lại quá trình này cho tất cả các phụ thuộc khác trong tệp composer.json của bạn.
## Routes
Các routes là bản đồ của bạn vào ứng dụng. Chúng cung cấp cho bạn liên kết trực tiếp từ những gì được yêu cầu thông qua trình duyệt tới bộ điều khiển hoặc [closure](https://secure.php.net/manual/en/functions.anonymous.php). Một khi bạn đã tìm thấy bộ điều khiển tương ứng với một route, bạn có thể tiếp tục đào sâu vào những gì bộ điều khiển đang làm, các lớp khác mà nó đang sử dụng và cách nó hoạt động. Khi bạn làm việc thông qua ứng dụng của mình thông qua trình duyệt, hãy lặp lại quy trình này cho từng route bạn gặp phải.
Các tệp routes có thể được tìm thấy ở các vị trí sau:
* Laravel 5.3+ routes/*.php
* Laravel 5.0-5.2 app/Http/routes.php
* Laravel 4.2 app/routes.php

Route “gotchas”
Tùy thuộc vào cách các routes dự án được xác định, bạn có thể cần một vài chiến thuật khác nhau để tìm chính xác các URL cụ thể.
Hãy lấy ví dụ URI /users/123/profile. Bạn có thể tìm thấy nó bằng cách tìm kiếm users/{id}/profile. Tuy nhiên, điều này có thể được bao gồm trong một nhóm route làm cho nó khó tìm hơn một chút.
```php
Route::prefix('users')->group(function () {
    Route::get('{id}/profile', 'UsersController@profile');
});
```
Trong ví dụ này, người dùng bị ngắt kết nối khỏi {id}/profile khiến việc tìm kiếm trở nên khó khăn hơn. Mặc dù điều này rất dễ phát hiện trên một vài dòng, điều này khó hơn đáng kể khi tệp routes của bạn có hàng trăm hoặc hàng nghìn định nghĩa routes.
Another example that catches me all the time is Route::resource() (and in newer versions Route::apiResource()).
Route::resource() sẽ tự động tạo ra các route cho bạn. Ví dụ, khi thêm dòng *Route::resource('dogs', 'DogController')* vào file route của bạn, đồng nghĩa với việc bạn sẽ định nghĩa các routes sau:
```php
Route::group(['prefix' => 'dogs'], function () {
    Route::get('/', 'DogsController@index')->name('dogs.index');
    Route::get('create', 'DogsController@create')->name('dogs.create');
    Route::post('/', 'DogsController@store')->name('dogs.store');
    Route::get('{id}', 'DogsController@show')->name('dogs.show');
    Route::get('{id}/edit', 'DogsController@edit')->name('dogs.edit');
    Route::put('{id}', 'DogsController@update')->name('dogs.update');
    Route::delete('{id}', 'DogsController@destroy')->name('dogs.destroy');
});
```
Tuy nhiên, nếu bạn cố gắng tìm kiếm *dogs/{id}/edit* thì chắc chắn sẽ không có kết quả vì route đó được định nghĩa trong cụm *Route::resource()* .
Không thể phủ nhận việc định nghĩa routes thông qua *Route::resource()* rất ngắn ngọn, tuy nhiên tôi lại khuyến khích việc định nghĩa từng route một hơn để tiện cho việc tìm kiếm. Bởi khi nhận được một source code, để nghiên cứu nó, file đầu tiên chúng ta sẽ sờ tới là file routes, và phản xạ đầu tiên chúng ta sẽ search theo từ khóa url mà mình đang muốn tìm hiểu. Để hiểu rõ hơn về route resource và resource controllers, bạn có thể tìm hiểu ở [đây](https://laravel.com/docs/5.6/controllers#resource-controllers).
Cách đơn giản nhất để có một cái nhìn tổng quát về các route trong ứng dụng của bạn, bạn có thể chạy lệnh *route:list:*
```
php artisan route:list
```
Lệnh *route:list* liệt kê từng route, gồm các dữ liệu về HTTP method, URI, tên route, action mà route đó sử dụng, và các middleware mà route đó chạy qua.

## Service Providers
Service providers là nơi chứa những điều kì diệu của Laravel. Nghe có vẻ hơi hoa văn nhưng đó là sự thật :D Ở [docs](https://laravel.com/docs/5.6/providers) của Laravel có tóm lược lại như sau:
```
Service providers are the central place of all Laravel application bootstrapping. Your own application, as well as all of Laravel’s core services are bootstrapped via service providers.

But, what do we mean by “bootstrapped”? In general, we mean registering things, including registering service container bindings, event listeners, middleware, and even routes. Service providers are the central place to configure your application.
```

Có nghĩa rằng Service Provider là trung tâm, là trái tim của Laravel. Ứng dụng Laravel mà chúng ta đang dùng, cũng như toàn bộ Laravel core là "bootstrapped" thông qua service provider. Nhưng "bootstrapped" ở đây có nghĩa là gì? Ở đây, nó nghĩa là những thứ đã được đăng ký sẵn bao gồm những [service container](https://laravel.com/docs/5.7/container) binding đã được đăng ký, các event listeners, middleware, và thậm chí là các routes. Service provider là trung tâm của ứng dụng để cấu hình toàn bộ ứng dụng.
Bạn nên tìm hiểu qua một lượt các *service provider* trong thư mục *app/providers*. Nếu bạn muốn tự tạo service cho ứng dụng của mình, chúng cũng sẽ được tìm thấy ở đây. Có một số thứ nên tìm hiểu như view composers, macros, và những alias đã được config.
Ở những version cũ hơn, ví dụ như 4.2, bạn sẽ tìm thấy những hàm tương tự ở file global.php vì thời đó, service provider chỉ được sử dụng ở trong các packages.

## Test
Code base phần test có thế cho bạn thấy ứng dụng làm gì và nó nên có output ra sao. Nó cũng có thể cung cấp cho ta cái nhìn sâu sắc có giá trị về những trường hợp trong ứng dụng có thể xảy ra. Tuy nhiên, giống như tài liệu của codebase, các test case có thể không tồn tại, rất ít xảy ra, hoặc quá lỗi thời đến mức chúng thậm chí không còn chạy nữa.
Giống như việc viết tài liệu, viết tests là một cách tuyệt vời để tìm hiểu được ứng dụng và đồng thời cải thiện codebase. Bạn có thể tình cờ gặp và fix một vài bugs, bỏ những đoạn code dư thừa, và có thể thêm test coverage cho những class quan trọng trong ứng dụng.

## Tools
Một trong những debug tool tốt nhất cho Laravel là [Laravel Debugbar](https://laravel-news.com/laravel-debugbar) của tác giả Barry vd. Heuvel. Nó rất đơn giản để cài đặt vào ứng dụng của bạn, và nó sẽ chỉ ra mọi thứ đang diễn ra trong ứng dụng - các routes và controllers sử dụng, database queries thế nào và thời gian chạy, dữ liệu file view, các exceptions, mốc thời gian để thấy cái gì đang chạy và chạy khi nào,... Một khi bạn sử dụng package này, bạn sẽ không muốn làm việc với bất kì ứng dụng Laravel nào mà không cài đặt package đó.

## Summary
Ở bài viết này, tôi đã liệt kê ra vài cách mà bạn có thế nhanh chóng tiếp cận với Laravel codebase. Nhưng nó không phải là toàn bộ, chỉ là một vài điểm mà chúng ta nên bắt đầu khi tìm hiểu về codebase của Laravel. Tôi khuyến khích bạn nên sử dụng những gợi ý đó và thậm chí có thể làm vài demo để xem nó có thể dẫn bạn đi tới đâu.
## References:
https://laravel-news.com/navigating-a-new-laravel-codebase
https://laravel.com/docs/5.7