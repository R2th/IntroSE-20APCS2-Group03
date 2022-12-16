# 1. Giới thiệu<br>
Laravel Collective là một package hỗ trợ xây dựng các Form HTML một cách nhanh chóng, ngắn gọn trong Laravel.
Ta có thể thấy rõ qua ví dụ sau:
```html
// Dùng Form HTML bình thường
  <form action="{{ route('product.store', $product->id) }}" method="POST">
      @csrf
      <div class="form-group">
        <label>Category:</label>
        <select class="form-control" name="category">
            @foreach ($categories as $category)
                <option value="{{ $category->id }}" {{ $category->id == $post->category->id ? 'selected' : '' }}>
                    {{ $category->name }}
                </option>
            @endforeach
        </select>
    </div>
 </form>

// Dùng Laravel collective
   {!! Form::open(['method' => 'POST', 'route' => ['product.store', $product->id]) !!}
        <div class="form-group">
            {!!  Form::label('category', 'Category:') !!}
            {!!  Form::select('category', $categories, $post->category, ['class' => 'form-control']) !!}
        </div>
   {!! Form::close() !!}
```
# 2. Cài đặt
- Cài đặt Laravel Collective bằng composer, ta chạy lệnh:<br>
`composer require "laravelcollective/html":"^5.3.0"`

- Trong file config/app.php:<br>
 Thêm  vào mục 'providers' dòng:<br>
`Collective\Html\HtmlServiceProvider::class,`<br>
Còn trong mục 'aliases' ta thêm các dòng:<br>
`'Form' => Collective\Html\FormFacade::class,`<br>
` 'Html' => Collective\Html\HtmlFacade::class,`   
Vậy là đã hoàn thành xong bước cài đặt :)
# 3. Sử dùng Laravel Collective
- Thẻ mở, đóng form:<br>
```php
{!! Form::open(['method' => 'POST', 'url' => 'foobar']) !!}
{!! Form::close() !!}
```
Laravel cung cấp một phương pháp dễ dàng để bảo vệ ứng dụng của bạn khỏi các giả mạo yêu cầu trên nhiều trang web. Nếu bạn sử dụng phương thức Form :: open() với POST, PUT hoặc DELETE, mã thông báo CSRF sẽ được thêm vào biểu mẫu của bạn dưới dạng trường ẩn tự động. Ngoài ra, nếu bạn muốn tạo HTML cho trường CSRF ẩn, bạn có thể sử dụng phương thức mã thông báo:<br>
`{!! Form::token() !!}`
- Các thẻ HTML thường gặp:<br>

```php
//form collective
{{ Form::label('name', 'Description', ['class' => 'foo']) }}
// Không dùng Laravel collective
<label for="name" class="foo">Description</label>
```
<br>
      Thẻ input:<br>

```php
//text
{{ Form::text('username', null, ['class' => 'form-control', 'placeholder' =>  'Please enter...']) }}
<input name="username" type="text" class="form-control" placeholder="Please enter...">


//textarea 

{{ Form::textarea('description', null, ['class' => 'summernote']) }}
<input name="description" type="textarea" class="summernote">


+ Form::hidden('username')
    <input name="username" type="hidden">
//password
Form::password('password', ['class' => 'awesome'])
    <input name="password" type="password" value="" class="awesome">
//email
Form::email('email')
    <input name="email" type="email" value>
//file
Form::file('file') 
    <input name="file" type="file">
//submit
{!! Form::submit( 'Gui', ['class' => 'btn-submit']) !!}
<button type="button"  class="btn-submit">Gui</button>
//select
{!! Form::select('status', [0 => 'True', 1 => 'False'], null, ['class' => 'form-control', 'id' => 'm_select']) !!}
<select name="status" class="'form-control" id="m_select">
    <option value="0">True</option>
    <option value="1">False</option>
</select>
//checkbox
{!! Form::checkbox('hobbies', 'value', true) !!}
    <input checked="checked" name="hobbies" type="checkbox" value="value">
//radio
{!! Form::radio('name', 'value') !!}
    <input name="role" type="radio" value="value">
//date
{!! Form::date('dob', \Carbon\Carbon::now()) !!}
    <input name="dob" type="date" value="2017-04-23">
   ```
- Biding dữ liệu trong form sử dụng Form::model()
```php
// Bind dữ liệu bằng form model. Các attributes value của thẻ input sẽ tự động match với các value của key tương ứng trong model $user
{!! Form::model($user, ['method' => 'PATCH', 'route' => ['users.update', $user->id]]) !!}
    {!! Form::text('name') !!}
    {!! Form::text('email') !!}
{!! Form::close() !!}
```
Nguồn tham khảo :<br>
* https://laravelcollective.com/docs/master/html <br>
https://techblog.vn/index.php/html-collective-phan-1