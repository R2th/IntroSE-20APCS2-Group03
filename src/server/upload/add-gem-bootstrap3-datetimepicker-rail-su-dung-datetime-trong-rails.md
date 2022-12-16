**1. Giới thiệu**

Datepicker là một dạng component đã quá quen thuộc với các bạn làm front-end, là một thư viện js hỗ trợ tạo ra các datefield , daterange, được sử dụng rộng rãi trên rất nhiều ứng dụng web. Mục đích của nó là hiển thị một tờ lịch trên màn hình máy tính để người dùng có thể chọn ngày tháng một cách dễ dàng.

**2. Các bước thực hiện**

Tạo project:

```
    rails new demo-datetimepicker
```

Thêm vào gem file: 

```
    gem 'momentjs-rails', '>= 2.9.0'
    gem 'bootstrap-sass', '3.3.7'
    gem 'bootstrap3-datetimepicker-rails', '~> 4.17.47'
```

thêm vào file app/assets/javascripts/application.js

```
    //= require bootstrap
    //= require moment 
    //= require bootstrap-datetimepicker
```

Tạo thêm 1 file: *Touch app/assets/stylesheets/custom.scss*
và import:

```
    @import 'bootstrap-sprockets';
    @import 'bootstrap';
    @import 'bootstrap-datetimepicker';
```

Tiếp tục thêm vào file application.css

```
    *= require bootstrap
    *= require bootstrap-datetimepicker
```

tạo model: 

```
    rails g model User name:string gender:string dob:datetime email:string address:string
```
 sau đó 
 ```
     rails db:migrate
 ```
 
 Thêm vào file routes:
 
 ```
     resources :users
 ```
 
 Tạo file: *Touch app/assets/javascripts/datetimepicker.js*
  và thêm nội dung sau:
  ```
    $(function () {
      $('#datetimepicker').datetimepicker({
        format: "DD/MM/YYYY"
      });
    });
```

Với format : "dd/mm/YYYY"

```
<div class="input-group date" id="datetimepicker">
  <%= f.text_field :dob, placeholder: "Select the date and time", class: "form-control" %>
  <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>
</div></br>
```

Thêm nội dung sau vào file datetimepicker.js

```
 $('#datetimepicker').datetimepicker({
    format: "DD/MM/YYYY"
  });
});
</script>
```

![](https://images.viblo.asia/3a9b2149-c390-45c2-88b1-c514f0828e02.png)

Khi custom với format: only time<br>
Thêm nội dung sau vào file datetimepicker.js

```
<script>
 $('#datetimepicker').datetimepicker({
    format: "LT"
  });
});
</script>
```

![](https://images.viblo.asia/cce98c6c-7df3-4659-a2a4-3808541fe272.png)

Custom với field hiện thị không có icon

```
<%= f.label :dob %>
<%= f.text_field :dob, placeholder: "Select the date and time", id:"datetimepicker", class: "form-control" %>
```

Thay đổi file datetimepicker.js

```
 $(function () {
  $('#datetimepicker').datetimepicker();
});
```

![](https://images.viblo.asia/03bf2836-0f76-40ef-b450-d90ceb044d44.png)

Khi Enabled/Disabled: để ngày mặc định: 11/1/2019, ngày hiện tại: 12/20/2019 sẽ được select, ngày: 12/21/2019 và 12/22/2019 bị disable.

```
    $(function () {
        $('#datetimepicker').datetimepicker({
        defaultDate: "11/1/2019",
        disabledDates: [
            moment("12/20/2019"),
            new Date(2019, 11 - 1, 21),
            "11/22/2019 00:53"
        ]
        });
  });
  ```
  
  ![](https://images.viblo.asia/0ff37e75-5f1d-4c17-b53d-13dab7c62f03.png)
  
Với view mode hiển thị năm trên view thì sửa lại datetimepicker.js như sau:
  
   ```
  $(function () {
    $('#datetimepicker').datetimepicker({
    viewMode: 'years'
  });
   ```
   
 ![](https://images.viblo.asia/21fe5a74-5713-467e-a3e2-da9b13696494.png)

Trên đây là các bước add gem “bootstrap3-datetimepicker-rail” vào ứng dụng rails. Bài viết còn nhiều thiếu sót rất mong được mọi người góp ý.