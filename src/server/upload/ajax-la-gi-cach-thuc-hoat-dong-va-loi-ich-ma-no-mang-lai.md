&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Chào các bạn. Trong bài này mình sẽ giới thiệu về AJAX. Một kĩ thuật lập trình phổ biến mà chúng ta sử dụng rất nhiều. Ta sẽ cùng đi tìm hiểu xem nó là gì, tại sao lại sử dụng AJAX, nó có lợi ích gì và nên sử dụng ra sao cho hợp lý. Ok, Bắt đầu nào. 

### 1. AJAX là gì?
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AJAX Là viết tắt của cụm từ **Asynchronous Javascript and XML**. Là phương thức trao đổi dữ liệu với máy chủ và cập nhật một hay nhiều phần của trang web giúp chúng ta tạo ra sự sinh động cho Website của mình mà không reload lại trang.  Ajax là một thuật ngữ chung cho các kỹ thuật Javascript khác nhau được sử dụng để kết nối với máy chủ web tự động mà không nhất thiết phải tải lại trang. Về mặt kỹ thuật, nó đề cập đến việc sử dụng các đối tượng  [XmlHttpRequest](https://www.w3schools.com/xml/xml_http.asp) để tương tác với một máy chủ web động thông qua Javascript. 
<br>
### 2. Tại sao lại là AJAX?
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Khi bạn code xong một trang web thì điều đó chỉ là một phần mà thôi. Code xong mà không ai dùng thì nó cũng chả có ý nghĩa gì cả. Vậy làm sao khi code xong một trang web hay tạo ra một chức năng gì đó hay ho thì làm sao để mọi người thấy thích nó, thích dùng nó thì đó mới là vấn đề chính mà ta cần quan tâm tới. Trải nghiệm người dùng là rất quan trọng với developer chúng ta. Và AJAX là một trong những công cụ giúp chúng ta đem lại cho người dùng trải nghiệm tốt hơn. Khi chỉ cần một thay đổi nhỏ thì sẽ không cần load lại cả trang web, làm trang web phải tải lại nhiều thứ không cần thiết. Đặt mình vào vị trí người dùng, mình cũng chẳng thích trang nào mà chỉ thao tác nhỏ thôi mà cũng phải load đi load lại nhiều lần cả.
<br> <br>
##### Lợi ích mà AJAX mang lại: 
- AJAX được sử dụng để thực hiện một cuộc gọi lại. Được dùng để thực hiện việc truy xuất dữ liệu hoặc lưu trữ dữ liệu mà không cần phải reload lại trang. Với những server nhỏ thì việc này cũng tiết kiệm được băng thông cho chúng ta hơn.
- Cần gì thì chỉ gửi phần đó, load lại phần đó chứ không load cả trang. Bằng cách này thì có thể giảm thiểu được tốc độ tải trang (Ta cần cái gì thì ta load ra cái đó, không cần phải load tất cả dữ liệu ra rồi lại không dùng) giúp người dùng có trải nghiệm tốt hơn.
- Trang web bạn tạo ra cũng sẽ đa dạng hơn.
- Với lập trình viên thì nó khá dễ học và dễ dùng. :))
<br>
### 3. Cách thức hoạt động
![ajax](https://images.viblo.asia/d0276277-2c0d-45e1-96d4-a1c652070871.png)

<br>
1.  Đầu tiên từ trình duyệt của chúng ta, ta có một sự kiện để gọi ajax. Khi đó javascript sẽ tạo nên một đối tượng XMLHttpRequest. Và đối tượng này sẽ được gửi một request đến server<br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ví dụ: Khi người dùng click vào ô input và chọn tỉnh/thành phố của người dùng.
   Khi đó ta sẽ lấy thông tin đó và gửi đến server và cần trả về các quận/huyện của người dùng <br>
2. Khi server nhận được HttpRequest từ đó sẽ xử lý request và trả về response cho web.<br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Server xử lí lấy ra các quận/huyện thuộc tỉnh/thành phố mà người dùng cần và trả về dữ liệu của các quận/huyện.<br>
3. Sau khi nhận được một response từ server, Javascript sẽ xử lý và cập nhật vào trang web cho chúng ta,.<br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Javascript sẽ nhận được các quận/huyện và xử lí đưa vào ô select các quận/huyện cho chúng ta. <br> <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   Để minh họa cho ví dụ trên ta cùng làm thử luôn với laravel nhé.
  <br>
  Đầu tiên ta sẽ cần có 2 Model là City (gồm field id và name) và District (gồm field id, name, city_id). <br> <br>
  
  ```php
//City

class City extends Model
{
    public function districts()
    {
        return $this->hasMany('App\District');
    }
}

//District

class District extends Model
{
    public function city()
    {
        return $this->belongsTo('App\City');
    }
}

  ```

  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Và 1 Controller `CityController` tạo bằng cách chạy lệnh `php artisan make:controller CityController`. <br>  <br>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tiếp đó ta cần đến 1 route để trả ra view cho người dùng chọn thành phố, 1 route để lấy ra các quận/huyện từ tỉnh/thành phố mà người dùng chọn.

```php
Route::get('/select', 'CityController@select');
Route::get('/get-district/{id}', 'CityController@getDistrict');
```
  
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chúng ta sẽ viết function select() trong `CityController` . 
```php
    public function select()
    {
        $cities = City::pluck('name', 'id');

        return view('select', compact('cities'));
    }
    
    //function này sẽ trả ra view cho người dùng để chọn thành phố.
```

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;View của chúng ta sẽ như thế này:
```html
<div class="col-md-6 mb-3">
    {!! Form::label('Thành Phố') !!}
    {!! Form::select('city', $cities, null, ['class' => 'form-control city']) !!}
</div>
<div class="col-md-6 mb-3">
    {!! Form::label('Huyện') !!}
    {!! Form::select('district', ['--Chọn thành phố của bạn--'], null, ['class' => 'form-control district']) !!}
</div>
```
![](https://images.viblo.asia/6915a80c-4749-4c2c-b8c8-f28410b7b3c1.png)
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tiếp theo chúng ta sẽ viết một function getDistrict():

```php
    public function getDistrict($id)
    {
        $district = District::where('city_id', $id)->get();

        return $district;
    }
    
    //function này có tác dụng nhận vào id của thành phố cần 
    //lấy ra các tên của quận/huyện và lấy ra các quận/huyện tương ứng.
```
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Và cuối cùng đến phần chính của chúng ta là dùng ajax:
```js
$(function () {
    $('.city').on('change', function(e) { //viết sự kiện khi select được thay đổi thì gửi dữ liệu đi 1 lần để lấy dữ liệu cần.
        var id = $(this).val(); //lấy id từ của thành phố mà người dùng chọn 
        $.ajax({
            type: 'get', // phương thức gửi
            url: '/get-district/' + id, //tới route mà chúng ta đã định nghĩa ở trên.
            data: id, // gửi đi id của thành phố cần lấy.
        }).done(function(res) { // khi gửi và nhận thành công sẽ nhận được res
            var district = $('.district');
            for (var i in res) {
                district.append('<option value="' +  res[i].id + '">' + res[i].name + '</option>');
                //khi lấy được dữ liệu về thì ta đẩy nó vào ô select có chứa quận/huyện.
                district.val(res[0].id); //select vào quận/huyện đầu tiên.
            }
        });
    });
});

```

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vậy là xong. Rất đơn giản phải không nào. :) <br> <br>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ở đây mỗi khi ta cần dùng ajax cần chú ý đến: <br>
`type`: xác định phương thức gửi đi. Ở đây mình dùng phương thức `GET`. Nếu bạn dùng phương thức `POST`, `PATH`, `DELETE` thì ta cần thêm một token  để đảm bảo tính bảo mật. Tại sao phải dùng thì bạn có thể tham khảo qua bài viết [này](https://viblo.asia/p/csrf-la-cai-quai-gi-hoat-dong-nhu-the-nao-bWrZngnOlxw).<br>
`url`: Là route cần chuyến đển để xác định hành động tiếp theo ( ví dụ ở đây mình xác định controller và function để xử lí lấy dữ liệu ra). <br>
`data`: Gửi đi dữ liệu cần thiết ( ở đây mình gửi đi id của thành phố cần lấy ra các quận huyện).
 ### 4. Nên sử dụng thế nào?
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AJAX tuy mang lại cho ta nhiều lợi ích nhưng không phải cái gì ta cũng sử dụng AJAX được. Bên cạnh đó nó cũng có mặt hạn chế nhất định của nó. Vì vậy chúng ta cũng nên cân nhắc xem sử dụng thế nào? Nên sử dụng ở đâu cho hợp lý. Một trang web dùng quá nhiều AJAX quá cũng không tốt, khi có nhiều người dùng như thế sẽ làm cho server nhận được quá nhiều request có thể gây chết server. Ta nên sử dụng ở những chức năng nhỏ như là ví dụ trên, vote bài viết, comment, rate, ... 
  <br>  <br>