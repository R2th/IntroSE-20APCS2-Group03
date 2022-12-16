Hầu hết các trang web ngày nay đều có chức năng search. Và với Laravel thì các nhanh nhất và tiện nhất cho việc search là dùng Scout. Và cũng liên quan đến search thì ai ai cũng là fan hâm mộ của ElasticSearch bởi ưu điểm về tốc độ. Tuy nhiên, Laravel 5.6 không hỗ trợ tốt lắm cho ElasticSearch và thay vào đó sử dụng Algolia. Đồng ý Algolia cũng là 1 cách hiệu quả nhưng bạn chỉ được dùng thử 14 ngày và sau đó tính phí(hoặc đăng kí project ở dạng opensource nhưng cũng khá lằng nhằng). Còn nếu thay các ElasticSearch thì chao ôi, cài đặt thì đã lằng nhằng mà hầu như các driver hiện tại toàn thích chơi với Scout cũ mà có khi chưa chắc đã chạy được.

Bạn cần hoàn thiện chức năng search trong thời gian nhanh chóng mà hoàn toàn chạy ổn định ngay cả trong tương lai? Rõ ràng giải pháp của bạn không phải 2 engine kia. Xin chân trọng giới thiệu với các bạn:

![](https://images.viblo.asia/147017fc-8cf5-4d3c-afba-b0b2d04b9e6e.jpg)

Ý lộn
![](https://images.viblo.asia/6117a696-be0f-435b-9a07-7c52a07f5aae.jpg)

# Giới thiệu về TNTSearch
TNTSearch là 1 search engine được viết hoàn toàn bằng PHP. Việc cài đặt và tùy chỉnh đơn giản khiến cho bạn có thể nhanh chóng đưa chức năng search vào.

Ưu điểm mình đánh giá là thường các dự án cá nhân, đồ án, ... với dữ liệu ít nên search engine nào cũng cho tốc độ như nhau. Các dự án công ty mới là lúc cần phải tính đến tốc độ của việc tìm kiếm. Thế nên nếu xét độ phức tạp của việc cài đặt thì ElasticSearch xét khó hơn Algolia và TNTSearch. Và khi so 2 engine còn lại, ta nhận thấy Algolia lại yêu cầu đăng kí rồi lại chỉ cho thử 14 ngày. Vậy nên hãy cài TNTSearch cho các dự án PHP cá nhân, bài tập lớn, đồ án,...
# Demo
Và chúng ta bắt đầu làm với việc tìm kiếm phim Nhật nào =)))
## Tạo project Laravel mới
Đầu tiên, chúng ta chạy lệnh quen thuộc 
```
composer create-project --prefer-dist laravel/laravel Japanese-movie-TNTSearch
```
Và vì lần này chúng ta có dùng tới Scout và TNTSearch nên chúng ta chạy tiếp các lệnh sau
```
cd Japanese-movie-TNTSearch
composer require laravel/scout
composer require teamtnt/tntsearch
composer require teamtnt/laravel-scout-tntsearch-driver
```
Vậy là chúng ta đã có 1 project
## Tạo các Model, migration và Controller
Chúng ta sẽ tạo 2 model này
```
 php artisan make:model Actress --migration
 php artisan make:model Movie --migration
```
Định nghĩa quan hệ cho 2 Model. Ở đây cho đơn giản mình mặc định là 1 diễn viên sẽ đóng nhiều phim và mỗi phim chỉ có 1 diễn viên, tức quan hệ Một-Nhiều(đúng là là Nhiều-Nhiều)

Vì vậy đây là `Movie.php`
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $table='movies';

    public function actress
    {
    	return $this->belongsTo('App\Movie');
    }    
}

```
Còn đây là `Actress.php`
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Actress extends Model
{
    protected $table='actresses';

    public function movies
    {
    	return $this->hasMany('App\Movie');
    }
}

```
Tiếp đó chúng ta sẽ chỉnh sửa ở 2 file migration như sau

![](https://images.viblo.asia/06b895dc-8aa6-483a-91db-9d7f77cad31d.jpg)
![](https://images.viblo.asia/78e51af0-5e0c-4bef-bf6f-1183c7dcc010.jpg)

Và rồi seed vài data vào tùy ý nhé các bạn. Ở đây mình xin chia sẻ bộ data của mình

![](https://images.viblo.asia/447ad1f6-d7f1-477b-870c-265e33cb456f.jpg)

Vậy là chúng ta đã có dữ liệu cho phần mềm tìm kiếm phim Nhật 5 anh em siêu nhân 🤣🤣🤣🤣🤣(tên nữ diễn viên kia cũng là tên siêu nhân nữ trong các phim đóa)

Sau đó chúng ta sẽ tạo 2 controller
```
php artisan make:controller MovieController
php artisan make:controller ActressController
```
Vậy là chúng ta đã sẵn sàng để tìm kiếm
## Cài đặt chức năng tìm kiếm
Ở `config/app.php`, ta thêm như sau
```
// config/app.php
'providers' => [
    // ...
    TeamTNT\Scout\TNTSearchScoutServiceProvider::class,
    Laravel\Scout\ScoutServiceProvider::class,
],
```
Và đặt `SCOUT_DRIVER=tntsearch` ở `.env`
Sau đó chạy lệnh
```
php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"
```
ở `scout.php`, chúng ta thêm như sau
```
'tntsearch' => [
    'storage'  => storage_path(), //place where the index files will be stored
    'fuzziness' => env('TNTSEARCH_FUZZINESS', false),
    'fuzzy' => [
        'prefix_length' => 2,
        'max_expansions' => 50,
        'distance' => 2
    ],
    'asYouType' => false,
    'searchBoolean' => env('TNTSEARCH_BOOLEAN', false),
],
```
Và thêm dòng `/storage/*.index` ở `.gitignore`

Viết lại model Movie
```
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;

class Movie extends Model
{
	use Searchable;

    public $asYouType = true;//chỉ cần gõ 1 kí tự là cho ra các kết quả chứa kí tự ấy
    protected $table='movies';
    public $timestamps = false;

	/**
     * Get the indexable data array for the model.
     *
     * @return array
     */
    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Customize array...
        $array['name'] = $this->name;
        $array['actress'] = $this->actress['name'];

        return $array;
    }

    public function actress()
    {
    	return $this->belongsTo('App\Actress');
    }    
}
```
Và chúng ta sẽ chạy lệnh `php artisan scout:import "App\Movie"`

Ở `MovieController` chúng ta sẽ thêm hàm search
```

    public function search(Request $request)
    {
        $movies=Movie::search($request->get('search'))->get();
        return view('movies.index',compact('movies'));
    }
```
Thêm form search
```
	<form method="GET" action="{{action('MovieController@search')}}">
		<input type="text" name="search" placeholder="Tìm phim">
		<input type="submit">
	</form>
```
Và thêm route
```
Route::get('/search', 'MovieController@search');
```
Cuối cùng các bạn đã có thể search được thoải mái rồi

Cảm ơn các bạn đã theo dõi bài viết

Link: https://github.com/BlazingRockStorm/Japanese-movie-TNTSearch
# Xem thêm
* https://github.com/teamtnt/laravel-scout-tntsearch-driver
* https://github.com/teamtnt/tntsearch