**1. Mở đầu**

Hôm này mình sẽ làm một ví dụ demo cách rating các bài post sử dụng [Laravel Rateable](https://github.com/willvincent/laravel-rateable) composer package kết hợp với [bootstrap-star-rating](https://github.com/kartik-v/bootstrap-star-rating) jquery plugin

Ảnh demo
![](https://images.viblo.asia/9c31a705-47e2-4ecb-986a-0b0e16550721.PNG)
**2. Tiến hành Code**

> Bước 1: cài đặt project Laravel rating-demo

```
composer create-project --prefer-dist laravel/laravel rating-demo
```

> Bước 2: cài đặt laravel rateable package

```
composer require laravel-rateable
```
Sau đó ở file **app.php** trong folder **config** ta thêm đoạn sau

```php
<?php

return [
    ....
    'providers' => [
    	....
        willvincent\Rateable\RateableServiceProvider::class,
    ],
    ....
```

Sau khi cài đặt xong chúng ta chạy lệnh sau để tạo file migration cho table rating

```
php artisan rateable:migration
```

> Bước 3: tạo đăng ký, đăng nhập người dùng bằng auth

```
php artisan make:auth
```

> Bước 4: tạo migration và model cho table posts

Tạo migration bằng lệnh sau

```
php artisan make:migration create_posts_table
```

Sau lệnh trên sẽ tạo ra file với đường dẫn là database/migrations, chỉnh sửa file trên như sau

```php
<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void

     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
```
Sau đó chạy lệnh dưới đây để tạo chạy các file migration
```
php artisan migrate
```
Tạo model post bằng việc chạy lệnh sau

```
php artisan make:model Post
```
Để sử dụng được Traits Rateble trong app/Post.php đặt code dưới đây vào file Post.php

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use willvincent\Rateable\Rateable;

class Post extends Model
{
    use Rateable;
}
```

> Bước 5: tạo route

Mở file routes/web.php thêm đoạn code dưới đây để tạo các route hiển thị chi tiết bài post và hiển thị danh sách các bài post

```php
Route::get('posts', 'HomeController@posts')->name('posts');
Route::post('posts', 'HomeController@postPost')->name('posts.post');
Route::get('posts/{id}', 'HomeController@show')->name('posts.show');
```

> Bước 6: tạo controller tên là **HomeController**

```
php artisan make:controller HomeController
```
Thêm các phương thức sau vào
```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response

     */
    public function index()
    {
        return view('home');
    }

    // hiển thị danh sách các bài post
    public function posts()

    {
        $posts = Post::all();
        
        return view('posts',compact('posts'));
    }
    
    // hiển thị chi tiết bài post
    public function show($id)
    {
        $post = Post::find($id);
        
        return view('postsShow',compact('post'));
    }

    // xử lý rating
    public function postPost(Request $request)
    {
        request()->validate(['rate' => 'required']);
        $post = Post::find($request->id);
        $rating = new \willvincent\Rateable\Rating;
        $rating->rating = $request->rate;
        $rating->user_id = auth()->user()->id;
        $post->ratings()->save($rating);
        
        return redirect()->route("posts");
    }
}
```

> Bước 7: tạo các view sau

Hiển thị các bài post

**resources/views/posts.blade.php**
```php
@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading">Posts</div>
                <div class="panel-body">
                    <table class="table table-bordered">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th width="400px">Star</th>
                            <th width="100px">View</th>
                        </tr>
                        @if($posts->count())
                            @foreach($posts as $post)
                            <tr>
                                <td>{{ $post->id }}</td>
                                <td>{{ $post->name }}</td>
                                <td>
                                    <input id="input-1" name="input-1" class="rating rating-loading" data-min="0" data-max="5" data-step="0.1" value="{{ $post->averageRating }}" data-size="xs" disabled="">
                                </td>
                                <td>
                                    <a href="{{ route('posts.show',$post->id) }}" class="btn btn-primary btn-sm">View</a>
                                </td>
                            </tr>
                            @endforeach
                        @endif
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $("#input-id").rating();
</script>
@endsection
```
Hiển thị chi tiết bài post

**resources/views/postsShow.blade.php**

```php
@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form action="{{ route('posts.post') }}" method="POST">
                        {{ csrf_field() }}
                    <div class="card">
                        <div class="container-fliud">
                            <div class="wrapper row">
                                <div class="preview col-md-6">
                                    <div class="preview-pic tab-content">
                                      <div class="tab-pane active" id="pic-1"><img src="https://dummyimage.com/500x450/000/fff" /></div>
                                    </div>
                                </div>
                                <div class="details col-md-6">
                                    <h3 class="product-title">Laravel 5.5 Ratting System</h3>
                                    <div class="rating">
                                        <input id="input-1" name="rate" class="rating rating-loading" data-min="0" data-max="5" data-step="1" value="{{ $post->userAverageRating }}" data-size="xs">
                                        <input type="hidden" name="id" required="" value="{{ $post->id }}">
                                        <span class="review-no">422 reviews</span>
                                        <br/>
                                        <button class="btn btn-success">Submit Review</button>
                                    </div>
                                    <p class="product-description">Suspendisse quos? Tempus cras iure temporibus? Eu laudantium cubilia sem sem! Repudiandae et! Massa senectus enim minim sociosqu delectus posuere.</p>
                                    <h4 class="price">current price: <span>$180</span></h4>
                                    <p class="vote"><strong>91%</strong> of buyers enjoyed this product! <strong>(87 votes)</strong></p>
                                    <h5 class="sizes">sizes:
                                        <span class="size" data-toggle="tooltip" title="small">s</span>
                                        <span class="size" data-toggle="tooltip" title="medium">m</span>
                                        <span class="size" data-toggle="tooltip" title="large">l</span>
                                        <span class="size" data-toggle="tooltip" title="xtra large">xl</span>
                                    </h5>
                                    <h5 class="colors">colors:
                                        <span class="color orange not-available" data-toggle="tooltip" title="Not In store"></span>
                                        <span class="color green"></span>
                                        <span class="color blue"></span>
                                    </h5>
                                    <div class="action">
                                        <button class="add-to-cart btn btn-default" type="button">add to cart</button>
                                        <button class="like btn btn-default" type="button"><span class="fa fa-heart"></span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    $("#input-id").rating();
</script>
@endsection
```

> Bước 8: tạo các file css sau

File layout master,
thêm css vào trong file : resources/views/layouts/app.blade.php

```php
<link href="{{ asset('css/app.css') }}" rel="stylesheet">
<link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.css" rel="stylesheet"> 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-star-rating/4.0.2/css/star-rating.min.css" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-star-rating/4.0.2/js/star-rating.min.js"></script>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
<link href="{{ asset('css/preview.css') }}" rel="stylesheet">
```
File css cho hiển thị chi tiết bài post

public/css/preview.css
```css
img {
  max-width: 100%; }
.preview {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column; }
  @media screen and (max-width: 996px) {
    .preview {
      margin-bottom: 20px; } }
.preview-pic {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1; }
.preview-thumbnail.nav-tabs {
  border: none;
  margin-top: 15px; }
  .preview-thumbnail.nav-tabs li {
    width: 18%;
    margin-right: 2.5%; }
    .preview-thumbnail.nav-tabs li img {
      max-width: 100%;
      display: block; }
    .preview-thumbnail.nav-tabs li a {
      padding: 0;
      margin: 0; }
    .preview-thumbnail.nav-tabs li:last-of-type {
      margin-right: 0; }
.tab-content {
  overflow: hidden; }
  .tab-content img {
    width: 100%;
    -webkit-animation-name: opacity;
            animation-name: opacity;
    -webkit-animation-duration: .3s;
            animation-duration: .3s; }
.card {
  background: #eee;
  padding: 3em;
  line-height: 1.5em; }
@media screen and (min-width: 997px) {
  .wrapper {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex; } }
.details {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
      -ms-flex-direction: column;
          flex-direction: column; }
.colors {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
          flex-grow: 1; }
.product-title, .price, .sizes, .colors {
  text-transform: UPPERCASE;
  font-weight: bold; }
.checked, .price span {
  color: #ff9f1a; }
.product-title, .rating, .product-description, .price, .vote, .sizes {
  margin-bottom: 15px; }
.product-title {
  margin-top: 0; }
.size {
  margin-right: 10px; }
  .size:first-of-type {
    margin-left: 40px; }
.color {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
  height: 2em;
  width: 2em;
  border-radius: 2px; }
  .color:first-of-type {
    margin-left: 20px; }
.add-to-cart, .like {
  background: #ff9f1a !important;
  padding: 1.2em 1.5em !important;
  border: none;
  text-transform: UPPERCASE;
  font-weight: bold;
  color: #fff !important;
  -webkit-transition: background .3s ease;
          transition: background .3s ease; }
  .add-to-cart:hover, .like:hover {
    background: #b36800;
    color: #fff; }
.not-available {
  text-align: center;
  line-height: 2em; }
  .not-available:before {
    font-family: fontawesome;
    content: "\f00d";
    color: #fff; }
.orange {
  background: #ff9f1a; }
.green {
  background: #85ad00; }
.blue {
  background: #0076ad; }
.tooltip-inner {
  padding: 1.3em; }
```
**3. Link source code**

https://github.com/quanghv96/rating-demo

**4. Nguồn tham khảo**

https://github.com/willvincent/laravel-rateable

https://github.com/kartik-v/bootstrap-star-rating