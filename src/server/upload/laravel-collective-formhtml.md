<br>
&emsp;Chào các bạn. Trong bài viết này mình sẽ giới thiệu về Laravel Collective xem nó là gì và cách dùng ra sao nhé. Bắt đầu thôi.

### 1. Giới thiệu 
&emsp; Thông thường khi chúng ta làm xây dựng trang admin thì việc tương tác với html/form là khá nhiều. Trong trường hợp như vậy chúng ta sẽ sử dụng khá nhiều thẻ html với form làm ta nhìn khá rắc rối. Ít thì không sao chứ nhiều thì tìm khá vất vả. Nhìn lằng nhằng ko dễ đọc chút nào. :) Những kiểu như vậy thì maintance lại nhìn nản lắm :D Vậy có cách nào sử dụng cú pháp ngắn gọn hơn không? :sunglasses: <br>
&emsp;Có đó là Laravel Collective. Laravel collective là một package cung cấp cho chúng ta cách viết form, html với cú pháp ngắn gọn hơn, dễ nhìn hơn.
Bạn có thể nhìn vào ví dụ sau để compare:

```php
// sửa category cho một bài post ta viết như sau:
// Không dùng Laravel collective
        <form action="{{ route('posts.update', $post->id) }}" method="POST">
            @csrf
            @method('PUT')
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
   {!! Form::open(['method' => 'PUT', 'route' => ['posts.update', $post->id]) !!}
        <div class="form-group">
            {!!  Form::label('category', 'Category:') !!}
            {!!  Form::select('category', $categories, $post->category, ['class' => 'form-control']) !!}
        </div>
   {!! Form::close() !!}
```

### 2. Install

- Install qua composer với câu lệnh:
```bash
composer require laravelcollective/html
```
- Tiếp theo ta cần config để sử dụng:
<br> Bạn vào `config/app.php` và thêm `Provider` và `Aliases` sau:

```php
 ...
    'providers' => [
        // ...
        Collective\Html\HtmlServiceProvider::class,
        // ...
    ],
    // ...
    'aliases' => [
        // ...
        'Form' => Collective\Html\FormFacade::class,
        'Html' => Collective\Html\HtmlFacade::class,
        // ...
    ],
...

```
&emsp;Vậy là xong. so easy. :)
### 3. Cách sử dụng thao tác với Form

#### 3.1 Mở đóng thẻ form
```php
{!! Form::open(['method' => 'PUT', 'route' => ['posts.update', $post->id]) !!}
    ...
{!! Form::close() !!}
```
&emsp;Đoạn code trên sẽ generate ra đoạn code như sau:
```html
 <form method="POST" action="http:/localhost:8000/post/1" accept-charset="UTF-8">
     <input name="_method" type="hidden" value="PUT">
     <input name="_token" type="hidden" value="77wax3zPfi85eZ5ICi6k9G4z8svlmaUEMQTabaM4">
 </form>
```
&emsp;Với phương thức là `PUT/PATH/DELETE` thì Collective sẽ tự động generate thêm `csrf token`. Vì sao lại cần cái này thì bạn có thể tham khảo qua bài viết này của mình :D [ở đây](https://viblo.asia/p/csrf-la-cai-quai-gi-hoat-dong-nhu-the-nao-bWrZngnOlxw).
<br>
Ngoài sử dụng route như trên các bạn có thể sử dụng `action` và `url` như sau:

```php
Form::open(['method' => 'POST', 'url' => 'foo/bar'])

Form::open(['method' => 'POST', 'route' => 'foo.bar'])

Form::open(['method' => 'POST', 'action' => 'FooController@method'])
```
Với form cần truyền biến thì ta làm như sau:
```php
Form::open(['method' => 'POST', 'url' => ['foo/bar', $parameter]])

Form::open(['method' => 'DELETE', 'route' => ['foo.bar', $parameter]])

Form::open(['method' => 'PUT', 'action' => ['FooController@method', $parameter]])

```
&emsp;**Tips**: Khuyển khích các bạn nên sử dụng `route` hơn vì `route name` sẽ không thay đổi nhiều, ít khi bị thay đổi. Còn `action` và `url` sẽ có thể bị thay đổi nhiều hơn. <br>
&emsp;Để có thể upload file thì bạn cần thêm `'file' => true`:
```php
    Form::open(['url' => 'foo/bar', 'files' => true])
```
<br>

#### 3.2 Với các HTML Input và Label
- Với Label:
```php
    Form::label('name', 'Description')
    
    Form::label('name', 'Description', ['class' => 'foo'])
    
    // Nó sẽ generate đoạn html sau
    
    <label for="name">Description</label>
    
    <label for="name" class="foo">Description</label>
```
- Với thẻ text thông thường:
```php
    Form::text('name')
    <input name="name" type="text">
    
    Form::text('name', 'Framgia')
    <input name="name" type="text" value="Framgia">
    
    Form::text('name', 'Framgia', ['class' => 'name'])
    <input name="name" type="text" value="Framgia" class="name">
```
- Với textarea:
```php
    Form::textarea('name')
    
    Form::textarea('name', $value)
    
    Form::textarea('name', $value, ['class' => 'name'])
```
- Với password:
```php
    Form::password('password')
    
    Form::password('password', ['placeholder' => 'Password'])
 ```
 - Với checkbox và radio
 ```php
     Form::checkbox('name', 'value')
    // Generating một checkbox được checked
     Form::checkbox('name', 'value', true, ['class' => 'name'])
     
     Form::radio('name', 'value')
    // Generating một radio input được selected
     Form::radio('name', 'value', true, ['class' => 'name'])
 ```
 - Với file, email, number, date, hidden form
 ```php
     Form::hidden('foo', $value)
 
     Form::email('name', $value, ['class' => 'name'])
     
     Form::number('number', $value, ['class' => 'name'])
     
     Form::file('name', ['class' => 'name'])
     
     Form::date('date', \Carbon\Carbon::now())
```
- Với thẻ select:
```php
    Form::select('name', ['key' => 'value'])
    
    Form::select('name', ['key' => 'value], ['class' => 'name'])
    
    Form::select('name', $value, $selected, ['class' => 'name'])
```
 - Với các thẻ select range và select ngày tháng:
 ```php
    Form::selectRange('range', 1, 10)
    
    Form::selectYear('year', 2011, 2015)
    
    Form::selectMonth('month')
```
- Với button, submit, button reset:
```php
    Form::submit('Submit', ['class' => 'name'])
    <input type="submit" value="Submit">
    
     Form::reset('Reset', ['class' => 'name'])
    <input type="reset" value="Reset">
    
     Form::button('Save', ['class' => 'name'])
    <button type="button">Save</button>
```
- Chúng ta cũng có thể binding dữ liệu vào form như sau:
```php
// Bind dữ liệu bằng form model. 
// Các attributes value của thẻ input sẽ tự động match với các value của key tương ứng trong model $user
    {!! Form::model($post, ['method' => 'PATCH', 'route' => ['post.update', $post->id]]) !!}
        {!! Form::text('title') !!}
        {!! Form::text('content') !!}
    {!! Form::close() !!}
```
- Ngoài các thẻ trên các bạn cũng có thể tự đinh nghĩa một cái Form mà bạn muốn.
```php
    Form::macro('framgia', function()
    {
        return '<input type="awesome">';
    })
```
- Sử dụng:
```php
    Form::framgia();
```
- Nếu bạn dùng đi dùng lại 1 component nhiều lần thì bạn cũng có thể định nghĩa 1 component.
Để làm được điểu này ta cần đăng ký trong method boot của Service Provider .
```php
    Form::component('framgia', 'components.form.text', ['name', 'value' => null, 'attributes' => []])
```
- Tạo một view như sau:
```php
// resources/view/components/form/text.blade.php
    <div class="form-group">
        {{ Form::label($name, null, ['class' => 'control-label']) }}
        {{ Form::text($name, $value, array_merge(['class' => 'form-control'], $attributes)) }}
    </div>
```
Sử dụng:
```php
    {{ Form::framgia('first_name') }}
```
### 4. Cách sử dụng thao tác với Html
- Với Html thì ta thường với các thẻ thông dụng như sau:
```php
   // Generate ra một link tới một file Js
    HTML::script($url, $attributes)
    
    // Generate ra một link tới một file CSS
    HTML::style($url, $attributes)
    
    // Generate ra một HTML image
    HTML::image($url, $alt, $attributes)
    
    // Generate ra một HTML link
    HTML::link($url, 'title', $attributes, $secure)
```
- Ngoài ra còn generate ra một ul, ol:
```php
    // Generate ra một danh sách item theo thứ tự
    HTML::ol($list, $attributes)
       <ol>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
       </ol> 
    // Generate ra một danh sách không theo thứ tự
    HTML::ul($list, $attributes)
       <ul>
          <li>Coffee</li>
          <li>Tea</li>
          <li>Milk</li>
       </ul
```
&emsp;Trên đây là những gì mình giới thiệu về Laravel collective. Mong rằng qua bài này các bạn có thể áp dụng luôn được vào project của mình. 
<br>
&emsp;Tài liệu  [tham khảo](https://laravelcollective.com/docs/master/html#installation)