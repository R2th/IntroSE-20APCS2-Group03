Đây là chuỗi bài viết theo phong thái dễ hiểu, đơn giản, cơ bản, phù hợp với những người bắt đầu với Laravel từ con số 0. 
# Laravel Forms
   Phần này sẽ bao gồm các nội dung sau:
* RESTful
* Cơ bản về form với POST request
* Cơ bản về form với PUT request
* Validate dữ liệu khi gửi request
## RESTful
Có rất nhiều bài viết về RESTful nói chung hay RESTful về laravel nói riêng. Một số bài viết như sau:
* [REST](https://en.wikipedia.org/wiki/Representational_state_transfer)
* [RESTful API trong Laravel](https://viblo.asia/p/restful-api-trong-laravel-cho-nguoi-moi-bat-dau-ByEZkNaqKQ0)
* [RESTful Resource Controllers](https://laravel.com/docs/5.1/controllers#restful-resource-controllers)
* [Xây Dựng RESTful API](https://codelearn.io/sharing/xay-dung-restful-api-voi-laravel)

Về phía mình, xin chia sẻ một số hiểu biết về RESTful:
* RESTful là một nguyên tắc thiết kế web, và nó coi mỗi đối tượng dữ liệu trong một project là một tài nguyên (resource). Ví dụ người dùng, quyển sách, phiên đăng nhập,... sẽ đều là resource. Và ở mỗi resource sẽ có những hành động (action) tương ứng với nó (tạo, sửa, xóa, xem,...). Các action này cũng sẽ được tương ứng với các HTTP request method (điển hình như GET, POST, PUT, DELETE).
* Các ngôn ngữ tuân theo nguyên tắc này, sẽ phải đảm bảo các convention sau:
    * Chỉ được có các method trong controller tương ứng với action của mỗi resource. Tên gọi của action ở mỗi ngôn ngữ là khác nhau, ví dụ trong laravel đối với resource photo được thể hiện ở dưới bảng.
    * Về cách đặt tên routes phải tuân theo sự tương ứng với một resource cụ thể.
    * Mỗi action sẽ phải thực hiện đúng role được đề cập.

| Verb | Path | Action | Route Name| Role |
| -------- | -------- | -------- | -------- | -------- |
| GET |	/photo | index | photo.index | In ra list tất cả bức ảnh|
| GET | /photo/create | create | photo.create | In ra form để tạo 1 bức ảnh |
| POST| /photo | store |photo.store | Tạo 1 bức ảnh bằng việc thực thi lưu dữ liệu từ form vào database |
| GET | /photo/{photo} | show | photo.show | Hiển thị một bức ảnh |
| GET | /photo/{photo}/edit	| edit | photo.edit | In ra form để sửa thông tin 1 bức ảnh |
| PUT/PATCH | /photo/{photo} | update |	photo.update | Update thông tin sửa từ form vào database
| DELETE | /photo/{photo} | destroy | photo.destroy | Xóa bức ảnh |

Để có thể thiết lập RESTful dễ dàng cho một đối tượng. Ta làm như sau.

**Bước 1**: Gõ câu lệnh sau trong terminal:
```
php artisan make:model Photo -mcr
```
Câu lệnh này sẽ tạo ra model Photo kèm file migration và controller. `-r` ở đây theo như `php artisan help make:model` giải thích như sau 
> -r, --resource Indicates if the generated controller should be a resource controller

Tức nó sẽ tạo ra một controller mà tuân theo RESTful hay cũng có nghĩa là coi là Photo là một resource. Khi các bạn truy cập vào controller này các bạn sẽ thấy những method tương ứng với action đã được khai báo sẵn, và chúng ta sẽ chỉ được làm việc với những action như vậy tuân theo các convention trên.

**Bước 2**: Khai báo các route như ở bảng trên. Khai báo như sau.
```php:routes/web.php
    ...
    Route::resource('photo', 'PhotoController');
```
Như vậy là xong cách thiết lập RESTful. Các bạn có thể xem một cách tùy biến khai báo routes khác tại [đây](https://laravel.com/docs/5.1/controllers#restful-partial-resource-routes).
## Cơ bản về Form với POST request
Như các phần trước chúng ta đã làm được hiển thị danh sách các bài báo và hiển thị thông tin một bài báo. Bây giờ chúng ta sẽ thực hành tiếp việc làm form tạo bài báo và lưu vào cơ sở dữ liệu. Ta sẽ có các routes tương ứng theo RESTful ở bảng dưới đây và sẽ sửa code các file sau.
| Verb | Path | Action | Route Name| Role |
| -------- | -------- | -------- | -------- | -------- |
| GET | /articles/create | create |articles.create | In ra form để tạo 1 bài báo |
| POST| /articles | store |articles.store | Tạo 1 bài báo bằng việc thực thi lưu dữ liệu từ form vào database |
```php:routes/web.php
    ...
Route::post('/articles', 'ArticlesController@store');
Route::get('/articles/create', 'ArticlesController@create');
# Dòng code trên phải đặt lên trên action show vì Laravel load routes theo thứ tự từ trên xuống, vì vậy để tránh với đường link đó với cùng method GET sẽ truyền vào wildcards và sẽ dẫn tới action show.
Route::get('/articles/{article}', 'ArticlesController@show');
```
```html:resources/views/articles/create.blade.php
@extends('layout')

<!-- Chỉ áp dụng css cho màn hình view cụ thể. Ta chỉ đang có mục đích là để làm đẹp form. -->
@section('head')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css" />
@endsection

@section('content')
    <div id="wrapper">
        <div id="page" class="container">
            <h1 class="heading has-text-weight-bold is-size-4">New Article</h1>

            <form method="POST" action="/articles">
                <!-- Sinh ra token xác thực nhằm tránh giả mạo request -->
                @csrf
        
                <div class="field">
                    <label class="label" for="title">Title</label>
                    
                    <div class="control">
                        <input class="input" type="text" name="title" id="title">
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="excerpt">Excerpt</label>
                    
                    <div class="control">
                        <textarea class="textarea" name="excerpt" id="excerpt"></textarea>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="body">Body</label>
                    
                    <div class="control">
                        <textarea class="textarea" name="body" id="body"></textarea>
                    </div>
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <button class="button is-link" type="submit">Submit</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
@endsection
```
```html:resources/views/layout.blade.php
    ...
    <link href="css/fonts.css" rel="stylesheet" type="text/css" media="all" />
    <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css" media="all" />
    <!-- In ra nếu một view cụ thể nào đó có nội dung riêng biệt -->
    @yield('head');
    ....
```
```php:app/Http/Controllers/ArticlesController.php
    ...
    public function create() {
        return view('articles.create');
    }

    public function store() {
        $article = new Article();
        $article->title = request('title');
        $article->excerpt = request('excerpt');
        $article->body = request('body');
        $article->save();
        return redirect('/articles');
    }
}
```
Như vậy là chúng ta đã có thể tạo một bài báo. Tuy nhiên phần code controller ở trên cần được refractoring và cần phải validate dữ liệu người dùng nhập vào để tránh những khởi tạo không được cho phép. 
## Cơ bản về Form với PUT request
Tiếp theo chúng ta sẽ làm chức năng sửa thông tin về bài báo. Ta sẽ có các routes tương ứng theo RESTful ở bảng dưới đây và sẽ sửa code các file sau.
| Verb | Path | Action | Route Name| Role |
| -------- | -------- | -------- | -------- | -------- |
| GET | /articles/{article}/edit | edit |articles.edit |  In ra form để sửa thông tin 1 bức ảnh |
| PUT| /articles/{article} | update |articles.update | Update thông tin sửa từ form vào database |
```php:routes/web.php
Route::get('/articles/{article}/edit', 'ArticlesController@edit');
Route::put('/articles/{article}', 'ArticlesController@update');
```
```html:resources/views/articles/edit.blade.php
@extends('layout')

@section('head')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css" />
@endsection

@section('content')
<div id="wrapper">
    <div id="page" class="container">
        <h1 class="heading has-text-weight-bold is-size-4">Update Article</h1>

        <form method="POST" action="/articles/{{ $article->id }}">
            @csrf
            @method('PUT')

            <div class="field">
                <label class="label" for="title">Title</label>

                <div class="control">
                    <input class="input" type="text" name="title" id="title" value="{{$article->title}}">
                </div>
            </div>

            <div class="field">
                <label class="label" for="excerpt">Excerpt</label>

                <div class="control">
                    <textarea class="textarea" name="excerpt" id="excerpt" value="{{$article->excerpt}}"></textarea>
                </div>
            </div>

            <div class="field">
                <label class="label" for="body">Body</label>

                <div class="control">
                    <textarea class="textarea" name="body" id="body" value="{{$article->body}}"></textarea>
                </div>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button class="button is-link" type="submit">Submit</button>
                </div>
            </div>

        </form>
    </div>
</div>
@endsection
```
```php:app/Http/Controllers/ArticlesController.php
    ...
    public function edit($articleId) {
        $article = Article::findOrFail($articleId);

        return view('articles.edit',compact('article'));
    }

    public function update($articleId) {
        $article = Article::findOrFail($articleId);

        $article->title = request('title');
        $article->excerpt = request('excerpt');
        $article->body = request('body');
        $article->save();

        return redirect('/articles/' . $article->id);
    }
}
```
Kiểm tra xem đã update được thông tin bài báo chưa nhé! <3
## Validate dữ liệu khi gửi request - Form Validation Essentials
Thông thường sẽ luôn bắt buộc phải validate dữ liệu để tránh trường hợp người dùng submit dữ liệu không hợp lệ. Thường những validate này được đặt trong các file model nhưng tạm thời, để đơn giản ta hãy đặt nó trong controller.
```php:app/Http/Controllers/ArticlesController.php
    ...
    public function store() {

        request()->validate([
            # Nếu nhiều tiêu chí validate thì cần cho vào mảng.
            'title' => ['required', 'min:3', 'max:255'],
            'excerpt' => 'required',
            'body' => 'required'
        ]);
        ...
    }
...
```
Tham khảo thêm các tiêu chí validate tại [đây](https://laravel.com/docs/7.x/validation#available-validation-rules).

Sửa thêm tại view để hiển thị feedback lại với người dùng nếu dữ liệu không hợp lệ.


```html
    <!-- Nếu có lỗi liên quan đến trường 'title' thì sẽ in nội dung bên trong. -->
    @error('title')
    <!-- In ra nội dung lỗi liên quan đến trường 'title'. -->
    <p class="help is-danger">{{ $errors->first('title') }}</p>
    @enderror
```
```html
    <!-- Lấy dữ liệu cũ của lần request trước. -->
    {{ old('title') }}
```
```html:resources/views/articles/create.blade.php
...
        <div class="field">
            <label class="label" for="title">Title</label>

            <div class="control">
                <input class="input {{ $errors->has('title') ? 'is-danger' : '' }}" type="text" name="title" id="title" value="{{ old('title') }}">

                @error('title')
                <p class="help is-danger">{{ $errors->first('title') }}</p>
                @enderror
            </div>
        </div>

        <div class="field">
            <label class="label" for="excerpt">Excerpt</label>

            <div class="control">
                <textarea class="textarea {{ $errors->has('excerpt') ? 'is-danger' : '' }}" name="excerpt" id="excerpt">{{ old('excerpt') }}</textarea>

                @error('excerpt')
                <p class="help is-danger">{{ $errors->first('excerpt') }}</p>
                @enderror
            </div>
        </div>

        <div class="field">
            <label class="label" for="body">Body</label>

            <div class="control">
                <textarea class="textarea {{ $errors->has('body') ? 'is-danger' : '' }}" name="body" id="body">{{ old('body') }}</textarea>

                @error('body')
                <p class="help is-danger">{{ $errors->first('body') }}</p>
                @enderror
            </div>
        </div>
...
```

Kiểm tra xem sự thay đổi. Và bạn cũng làm giống như vậy với view và controller của việc update bài báo nhé <3.
> Phần này xin được tạm kết tại đây! Có lẽ đến phần này các bạn đã được làm quen đủ với Model, View, Controller, đã có thể hiển thị dữ liệu trong database, sinh dữ liệu và có các thao tác với database. Sau khi "vỡ lòng" thì đã cứng cáp hơn rồi đấy. Có thể tiếp tục tìm tòi và làm chủ laravel rồi đó. <3

> Nguồn tham khảo: https://laracasts.com/series/laravel-6-from-scratch/