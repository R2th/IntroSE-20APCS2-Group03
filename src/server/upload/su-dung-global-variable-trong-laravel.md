Trong bài viết này mình sẽ chia sẻ cách sử dụng biến toàn cục (global variable) trong Laravel.<br> 
Bạn có thể định nghĩa biến toàn cục với  giá trị string, integer, array và có thể truy cập biến đó ở tất cả các controller, views, blade, middleware trong laravel.<br>
Khi làm dự án chúng ta thường phải định nghĩa một số biến toàn cục như number_records_per_page, user_type, site_url...sau đó mọi người có thể sử dụng nó ở mọi nơi trong dự án.<br>
Mình sẽ demo bằng ví dụ bên dưới để mọi người hiểu hơn nhé<br>
### Create Global Config File
**config/global.php**
```PHP
<?php
   
return [
    'pagination_records' => 10,
    'user_type' => ['User', 'Admin'],
];
```
### Use Global Variable
**Sử dụng trong controller:**
```PHP
$number_records_per_page = config('global.pagination_records');
dd($number_records_per_page);
```
**Output:**
```
10
```
```PHP
$user_type = config('global.user_type');
dd($user_type);
```
**Output:**
```
array:2 [▼
  0 => "User"
  1 => "Admin"
]
```
**Sử dụng trong file blade**
```PHP
<h1>{{ config('global.pagination_records') }}</h1>
```
**Output:**
```
10
```
Hy vọng các bạn thích bài viết này!