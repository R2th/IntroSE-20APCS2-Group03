**Nếu bạn phải xây dựng một trang quản trị với nhiều form có cấu trúc giống nhau thêm, sửa , xóa.., làm sao để sử dụng các form một cách một cách hợp lý, nhanh chóng, dễ nhìn, ngắn gọn  và bảo mật. Bạn đã nghĩ ra làm sao để tối ưu và giải quyết được vấn đề bên trên chưa?,  không để các bạn  phải đợi lâu nữa sau đây mình sẽ giời thiệu cho bạn một  package được hỗ trợ cũng rát hữu ích với những bạn mới bắt đầu  đó là   Form/Html Collective.
Nào chúng ta cùng bắt tay vào tìm hiểu nhé:**
## Cài đặt 
Bây giờ chúng ta cùng nhau tìm hiểu các bước để cài đặt package này nhé

Để cài đặt package này chúng ta sử câu lệnh sau chạy trong  terminal sau: 
    ```
    composer require laravelcollective/
    ```

 Thêm vào thư mục config/app.php như sau:

 Trong  mảng  providers của config/app.php ta thêm dòng sau :
```rust
'providers' => [
// ...
Collective\Html\HtmlServiceProvider::class,
// ...
],
```
Trong mảng aliases của config/app.php ta thêm dòng sau:

```rust
'aliases' => [
// ...
'Form' => Collective\Html\FormFacade::class,
'Html' => Collective\Html\HtmlFacade::class,
// ...
],
```

Ok thế là bạn đã hoàn thành xong cách cài đặt package  form/html collective.
## Cách sử dụng 
### 1. Cấu trúc chung của form collective
  Cấu trúc chung của một form collective gồm cặp thẻ mở và thẻ đóng như sau:
      ![](https://images.viblo.asia/224be5c1-a904-4f68-b72c-462a6336f863.PNG)
### 2. Cách truyền route và biến của form collective
 Cách truyền qua route trong form collective.
 ![](https://images.viblo.asia/69f91b39-1d3d-42dd-a653-99b0a3244d1d.PNG)
 Cách truyền biến trong form collective
```ruby
 Form::open(['method' => 'POST', 'url' => "products/$id"])

Form::open(['method' => 'POST', 'action' => ['ProductsController@detail','id' => $id]])
```
Đăc biệt chú ý với các form  upload file thì bạn cần thêm  "file" = true
```rust
Form::open(['url' => 'categories/id', 'files' => true])
```

### 3. Cách sử dụng với các form html input
**1. Với Labels**
```javascript
    Form::label('name', 'address')

    Form::label('name', 'address', ['class' => 'address1'])

    //Đoạn html được generate như sau:

    <label for="name">address</label>

    <label for="name" class="foo">address1</label>

```
**2. Với text và  textarea**
```html

Form::text('name', 'BN')
//Đoạn html được generate như sau:
<input name="name" type="text" value="BN">

Form::text('name', 'BN', ['class' => 'adress'])
//Đoạn html được generate như sau:
<input name="name" type="text" value="BN" class="adress">

Form::textarea('name', $value)
Form::textarea('name', BN)
//Đoạn html được generate như sau:
<textarea name="name" value="BN"></textarea>

Form::textarea('name', $value, ['class' => 'name'])
Form::textarea('name', BN, ['class' => 'address'])
//Đoạn html được generate như sau:
<textarea name="name" value="BN" class="address></textarea>
```
**3. Với password**
```html
Form::password('password')
//Đoạn html được generate như sau:
<input type="password" name="password">

 Form::password('password', ['placeholder' => 'Password'])
 //Đoạn html được generate như sau:
 <input type="password" name="password", placeholder' => 'Password'>
```
**4. Với Với checkbox và radio**
```rust
 Form::checkbox('name', 'value')
   // Generating một checkbox được checked
    Form::checkbox('name', 'value', true, ['class' => 'name'])

    Form::radio('name', 'value')
   // Generating một radio input được selected
    Form::radio('name', 'value', true, ['class' => 'name'])
```
**5. Với file, email, number, date, hidden form**
```python
Form::hidden('foo', $value)

Form::email('name', $value, ['class' => 'name'])

Form::number('number', $value, ['class' => 'name'])

Form::file('name', ['class' => 'name'])

Form::date('date', \Carbon\Carbon::now())
```
**6. Với button, submit, button reset:**
```php
Form::submit('Submit', ['class' => 'name'])
<input type="submit" value="Submit">

Form::reset('Reset', ['class' => 'name'])
<input type="reset" value="Reset">

Form::button('Save', ['class' => 'name'])
<button type="button">Save</button>
```

**7. Với thẻ select**
   ```ruby
    Form::select('name', ['key' => 'value'])

    Form::select('name', ['key' => 'value], ['class' => 'name'])

    Form::select('name', $value, $selected, ['class' => 'name'])
```
## Tổng kết
Trên đây mình đã giới thiệu cho các bạn hiểu qua về cách sử dụng form/html collective trong laravel. Từ nay việc sử dụng form thêm, sửa, xóa.. sẽ trở nên đơn giản, với cú pháp ngắn gọn, bảo mật nữa.
HI vọng những chia sẻ trên sẽ giúp ích được cho các bạn .