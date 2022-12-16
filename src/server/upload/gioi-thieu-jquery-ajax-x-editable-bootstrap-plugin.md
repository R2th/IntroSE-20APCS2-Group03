# I. Mở đầu
Trong trang admin, chắc hẳn các bạn sẽ có rất nhiều danh sách. Mỗi danh sách lại có các chức năng cơ bản như CRUD (create, read, update, delete). Nếu danh sách của bạn ít cột và có thể hiện thị được những dữ liệu cần update ngay trên danh sách, thì các bạn nên sử dụng X-editable để đỡ phải mở sang 1 trang mới, đỡ mất công back đi back lại nhiều lần.
![Ảnh minh họa](https://images.viblo.asia/cc166cf8-b926-4fde-81c6-5707255e40e7.gif)
Nhìn hình minh họa này ta cũng có thể thấy X-editable giúp đơn giản các thao tác cho người dùng. Họ có thể biết được bản ghi họ đang sửa nằm ở vị trí nào trong danh sách. Rất tiện lợi phải không nào. Giờ mình cùng bắt tay vào tìm hiểu nhé.

# II. Giới thiệu về X-editable
1. Để sử dụng được X-editable, bạn cần phải include những thư viện này vào trong code:
```html
<link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
<script src="http://code.jquery.com/jquery-2.0.3.min.js"></script> 
<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
```
2. Tải X-editable tương ứng và thực hiện include nó vào code:
```html
<link href="bootstrap-editable/css/bootstrap-editable.css" rel="stylesheet">
<script src="bootstrap-editable/js/bootstrap-editable.js"></script>
```
3. Đánh dấu các phần tử mà bạn sẽ chỉnh sửa. Thông thường sẽ là phần tử `<a>` với các thuộc tính `data-*`.
```html
<a href="#" id="name" data-type="text" data-pk="1" data-url="/post" data-title="Enter your name">Trang</a>
```
Các thuộc tính mà bạn cần định nghĩa là:
* `type`: type của input (text, textarea, select,...)
* `url`: url để gửi dữ liệu cần update lên server
* `pk`: khóa chính của từng bản ghi cần update
* `id` và `name`: tên của trường cần update (tên cột trong db). Lấy từ `id` và thuộc tính `data-name`
* `value`: giá trị khởi tạo ban đầu.
4. Thiết lập chế độ chỉnh sửa: `inline` hoặc `popup` (default)
```html
//thiet lap che do inline
$.fn.editable.defaults.mode = 'inline';
```
5. Sử dụng method `editable()` cho phần tử có id là `name`
```js
$(document).ready(function() {
    $('#name').editable();
});
```
6. Hoàn thành frontend
Mở page của bạn và click vào 1 phần tử. Nhập giá trị mới và summit form. Nó sẽ gửi một ajax request với giá trị mới tới `/post`. Request này sẽ chứa `name`, `value`, `pk` của bản ghi cần update:
```php
POST /post
{
    name:  'name',  //ten cua truong (cot trong db)
    pk:    1            //khoa (record id)
    value: 'haha!' //gia tri moi
}
```
7. Viết backend
Nếu bạn muốn validate giá trị vừa gửi lên server:
* Nếu giá trị là `valid`, bạn sẽ được trả về **HTTP status 200 OK**. Bản ghi đó sẽ được update, không yêu cầu nội dung trả về.
* Nếu giá trị là `invalid`, bạn sẽ được trả về **HTTP status != 200** với 1 message thông báo lỗi bên trong nội dung trả về. Bản ghi sẽ không được update và form edit đó sẽ hiển thị thông báo lỗi.

   Mặc định request method là `POST`, bạn cũng có thể sửa nó bằng cách:
```js
$.fn.editable.defaults.ajaxOptions = {type: "PUT"};
```
Để message lỗi show ra trên form, bạn có thể xử lý nó như sau:
```js
$('#name').editable({
    ...
    success: function(response, newValue) {
        if (response.status == 'error') {
            return response.msg; //message loi tra ve
        }
    }
});
```
Nếu bạn không muốn gửi giá trị lên server thì bạn có thể bỏ trống `data-url` và xử lý như sau:
```js
$('#name').editable({
    type: 'text',
    title: 'Enter name',
    success: function(response, newValue) {
        userModel.set('name', newValue); //update gia tri moi
    }
});
```
Các bạn có thể xem thêm tại https://vitalets.github.io/x-editable/docs.html#editable để tìm hiểu kĩ về cách sử dụng các options, inputs, methods, events... trong editable.
# III. Demo
Mình xin phép được viết 1 số demo sau khi đã tìm hiểu về editable.

**Demo 1. Sử dụng editable cho cột trong bảng**

HTML:
```html
    <table id="users" class="table table-bordered table-condensed">
        <tr>
            <th>Tên</th>
            <th>Tuổi</th>
        </tr>
        <tr>
            <td><a href="#" data-pk="1">Trang</a></td>
            <td>24</td>       
        </tr>
        
        <tr>
            <td><a href="#" data-pk="2">Thủy</a></td>
            <td>25</td>       
        </tr>        
        
        <tr>
            <td><a href="#" data-pk="3">Thảo</a></td>
            <td>26</td>       
        </tr>        
    </table>    
```
Các bạn nhớ thêm thuộc tính data-pk để phân biệt giữa các cột nhé.

JS:
```js
$('#users a').editable({
    type: 'text',
    name: 'username',
    url: '/post',
    title: 'Nhập tên'
});

//ajax emulation
$.mockjax({
    url: '/post',
    responseTime: 200,
    response: function(settings) {
        if(settings.data.value == 'err') {
           this.status = 500;  
           this.responseText = 'Server-side error'; 
        } else {
           this.responseText = "";  
        }
    }
}); 
```
Ở đây mình sử dụng mockjax để test trên jsfiddle, còn nếu trong project các bạn sẽ khai báo 1 route::post, để gửi dữ liệu lên server và xử lí chúng.

**Demo 2. Sử dụng editable cho 2 list phụ thuộc nhau**

HTML:

```html
<div>
    List: <a href="#" data-type="select" id="listCountry"></a><br>
    Dependent list: <a href="#" data-type="select" id="listCity"></a><br>
</div>
```

JS:

```js
var sources = {
    1: [{value: 1, text: 'Ha Noi'}, {value: 2, text: 'Ho Chi Minh'}], 
    2: [{value: 3, text: 'Hokkaido'}, {value: 4, text: 'Tokyo'}],
    3: [{value: 5, text: 'Bac Kinh'}, {value: 5, text: 'Dai Loan'}],
};

$('#listCountry').editable({
    url: '/post',    
    pk: 1,
    source: [{value: 1, text: 'Vietnam'}, {value: 2, text: 'Japan'}, {value: 3, text: 'China'}],
    title: 'Select Country',
    success: function(response, newValue) {
       $('#listCity').editable('option', 'source', sources[newValue]);  //lay city theo country
       $('#listCity').editable('setValue', null);
    }
});

$('#listCity').editable({
    url: '/post',    
    pk: 1,    
    title: 'Select City',
});

$.mockjax({
    url: '/post',
    responseTime: 400,
    response: function(settings) {
        if(settings.data.value == 'err') {
           this.status = 500;  
           this.responseText = 'Validation error!'; 
        } else {
           this.responseText = '';  
        }
    }
}); 
```

**Demo 3. Kết hợp editable với select2**

Các bạn nhớ add thêm thư viện của [select2](https://select2.org/) 

HTML:
```html
    <a href="#" id="country" data-type="select2" data-pk="1" data-value="VN" data-title="Select country" class="editable editable-click editable-open" data-original-title="" title="">Vietnam</a>
```
JS:
```js
var countries = [];
$.each({"VN": "Vietnam", "JP": "Japan", "PHI": "Philippin", "ID": "Indonesia", "US": "United States", "UK": "United Kingdom"}, function (key, value) {
    countries.push({
        id: key,
        text: value
    });
});

$('#country').editable({
    source: countries,
    select2: {
        width: 200,
        placeholder: 'Select country',
        allowClear: true
    }
});

$.mockjax({
    url: '/post',
    responseTime: 400,
    response: function(settings) {
        if(settings.data.value == 'err') {
           this.status = 500;  
           this.responseText = 'Validation error!'; 
        } else {
           this.responseText = '';  
        }
    }
}); 

```

Ngoài ra các bạn cũng có thể sử dụng editable với checklist, typehead...
# IV. Kết luận
Trên đây mình chỉ demo đơn giản các thao tác trên frontend. Nếu bạn muốn sau khi chỉnh sửa, dữ liệu được lưu trên server thì các bạn phải viết bên phía backend để xử lý nó.

Thao tác với X-editable rất đơn giản phải không ạ. Cảm ơn bạn đã đọc bài viết của mình!

>Tham khảo: 
>https://vitalets.github.io/x-editable/docs.html