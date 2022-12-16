Chào các bạn, nhân dịp sắp đến noel, hôm nay mình sẽ hướng dẫn các bạn làm 1 plugin đơn giản để có 1 hiệu ứng tuyết rơi cho website được làm bằng wordpress :D

# Bước 1: 
Các bạn chuẩn bị 1 ảnh bông tuyết PNG có thể download trên mạng, hoặc copy từ bài viết


![](https://images.viblo.asia/d244c159-ac50-4014-91a5-e448203a7a2b.png)

Hoặc download  [https://khongbietcode.com/wp-content/uploads/2018/12/snowflake.png](https://khongbietcode.com/wp-content/uploads/2018/12/snowflake.png)

Tải file js hiệu ứng tuyết rơi tại [https://khongbietcode.com/wp-content/themes/jannah-child/js/snow_fury.js](https://khongbietcode.com/wp-content/themes/jannah-child/js/snow_fury.js)

# Bước 2:
Tạo plugin, ở đây mình tạo 1 plugin là **kbc-snown**, bên trong chỉ chứa 1 file php là **kbc-snown.php**, vì nó rất là đơn giản mà :)

Code: 
```
<?php
/*
Plugin Name: Khong biet code - Snown
Plugin URI:
Description:  Hello Noel.
Version: 1.0
Author: SonNN9.
Author URI: https://khongbietcode.com/
*/
function kbc_snow()
{
        // Đường dẫn file js
        $path_js = "https://khongbietcode.com/wp-content/themes/jannah-child/js/snow_fury.js";
        wp_enqueue_script('kbc-snow',
            $path_js,
            array(),
            '',
            true);
   ?>
    <style>
        .flurry-container span {
            color: white !important;
            background-image: url("https://khongbietcode.com/wp-content/uploads/2018/12/snowflake.png");
            background-size: 25px 25px;
            width: 25px;
            height: 25px;
        }
    </style>
<?php
}

add_action('wp_enqueue_scripts', 'kbc_snow');
```

# Bước 3:
Sau khi code xong mấy dòng easy này, các bạn chỉ việc upload plugin lên thư mục và active plugin:
![](https://images.viblo.asia/089e6249-8cd0-4d65-8df0-25520c2bfd4e.png)

**Kết quả**: Trở ra trang web blog của các bạn, các bạn sẽ thấy hiệu ứng tuyết rơi :D, vậy là xong phần trang trí cho website của bạn ngày noel rồi nhé, hết noel thì nhớ deactive plugin, không tuyết rơi cả năm đó :D

![](https://images.viblo.asia/dda88b4c-32f9-41ea-a92a-c6e0f6fd7723.png)

Link demo [https://khongbietcode.com](https://khongbietcode.com/)

Full code: [https://khongbietcode.com/wp-content/uploads/2018/12/kbc-snown.zip](https://khongbietcode.com/wp-content/uploads/2018/12/kbc-snown.zip)


Hẹn gặp lại các bạn trong các bài tiếp theo :)