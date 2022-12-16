**Khi viết chương trình xử lý bằng PHP sẽ không tránh khỏi việc lặp lại một công việc nào đó. Lúc này PHP cho phép nhúng một file php vào một file php khác, có thể coi đây là một phúc lợi cho người lập trình.**

### 1. Nhúng file trong PHP

- Nhúng file là một thao tác rất hữu ích khi bạn muốn nhúng cùng một đoạn code PHP, HTML hoặc văn bản giống nhau vào nhiều trang khác nhau mà không cần phải lặp lại code.
- Trong PHP, để tiết kiệm thời gian chúng ta có thể tạo sẵn các file nhúng php như phần header, content, footer, function ... dùng chung nào đó và chỉ việc nhúng chúng vào trang web. Khi cần chỉnh sửa ta cũng chỉ cần vào các file nhúng để sửa mà không phải *lội* vào trang web để *mò* :satisfied:. 

-----

### 2. Các hàm nhúng file trong PHP

***Khởi tạo 3 file php như sau:***

-  Header:
 ```html
 <header>
      Header
</header>
```

- Footer:
```html
<footer>
     Footer
</footer>
```

- index.php:
```php
<?php  ?>
    <div>Content</div>
<?php  ?>
```
<br>

* **Kiểm tra sự tồn tại** của đường dẫn trước khi nhúng file:

```php
<?php
  $path = "fileA.php";
  if(file_exists($path)){
     require $path;
  } else{
     die("{$path} không tồn tại");
  }
?>
```

<br>

Ở  [Lession 0](https://viblo.asia/p/lession-0-php-lan-dau-lam-quen-voi-php-cac-cong-cu-lap-trinh-cai-dat-tren-windows-Qbq5QQVX5D8) , tôi đã giới thiệu cách cài đặt localhost Xampp trên Window 10. Bây giờ hãy khởi động Xampp để trải nghiệm Apache và SQL nào :wink: .
<br>

-----

##### 2.1. Hàm Include:

> **Include** được dùng để chèn một file PHP vào một file PHP khác. **Khi gặp lỗi** include sẽ chỉ tạo cảnh báo PHP nhưng **vẫn cho phép tiếp tục thực thi tập lệnh** nếu không tìm thấy tệp được include.

- Cú pháp:
```php
<?php
include "đường_dẫn_file/tên_file";
?>
```

- Ví dụ: 

    + Trong thư mục htdocs tạo một **thư mục chung là *DEMO*** , bên trong **tạo thư mục con *include*** và lưu file **footer.php** và **header.php** trong đó.
    + file **index.php** đồng mức với thư mục ***include***, tức là: 

    ![](https://images.viblo.asia/9c0ef4af-c02c-44da-85f3-a862af7b40e6.PNG)

    <br>

Chỉnh sửa file **index.php** như sau:
```php
<?php include "include/header.php"; ?>
<div>Content</div>
<?php include "include/footer.php"; ?>
```

<br>

:white_check_mark: Running trên localhost:

> Gõ lệnh: **localhost:80/DEMO/index.php**

<br>

 **Kết quả:** Nội dung 2 tệp **footer.php** và **header.php** đều đã được thêm vào dưới và trên `Content`

![](https://images.viblo.asia/2a6145ec-2775-469f-82b7-75dcc08ddc1d.PNG)

<br>

-----

##### 2.2. Hàm Require:
> **Require** đưa ra thông báo lỗi và ngừng thực thi đoạn code bên dưới câu lệnh.

- Cú pháp: 
```php
<?php
require "đường_dẫn_file/tên_file";
?>
```

- Ví dụ: Sử dụng lại từ ví dụ ở trên:

    + Sửa tên thư mục **include** :arrow_right: **require** như hình.

    ![](https://images.viblo.asia/a9f1c110-68a4-4011-b22b-8b9f8fa7a80a.PNG)

   + Sửa file index.php như sau:

 ```php
  <?php require "require/header.php"; ?>
<div>Content 2</div>
<?php require "require/footer.php"; ?>
```

<br>

:white_check_mark: Running trên localhost:

> Gõ lệnh: **localhost:80/DEMO/index.php**

**Kết quả**: Nội dung 2 tệp **footer.php** và **header.php** đều đã được thêm vào dưới và trên `Content 2`

![](https://images.viblo.asia/dab9ecbc-3bc6-472b-807c-c8643985ea3b.PNG)

 ##### 2.2. Hàm Include_once và Require_once

> Nếu bạn vô tình **gọi cùng một tệp** (thường là các function hoặc class) **nhiều hơn một lần** trong code của bạn bằng cách sử dụng các câu lệnh include() hoặc require(), nó có thể gây ra **xung đột**.

* Đừng lo lắng, ***Include_once*** và ***Require_once*** sẽ giải quyết vấn đề này. 

* Cái tên nói lên tất cả, ***Include_once*** và ***Require_once*** quy định các tệp đã được thêm vào rồi sẽ không được thêm bất kì lần nào nữa.
```php
<?php
 include_once '<ĐƯỜNG DẪN TỚI FILE>';
?>

```

```php
<?php
 require_once '<ĐƯỜNG DẪN TỚI FILE>';
?>
```

* Hai phương thức này hoạt động giống hệt nhau, đó là chỉ nhận tệp đúng 1 lần: 
Thử chút nhé :hugs:

+ Đầu tiên ta đưa tệp ***header.php*** ra cùng mức với ***index.php***

    ![](https://images.viblo.asia/02ed285a-aca8-4a35-8642-ecdfe1c70c35.PNG)

Oops! Tôi lỡ tay cho cả hai tệp ra rồi :laughing::laughing: các bạn lỡ tay theo tôi cũng không sao cả nhé! :grin::grin:

+ Sửa tệp index.php thành thế này:

```php
<?php
require 'header.php';
require 'header.php';
?>
```

:fast_forward: **Include** hay **require** nếu gọi giống như trên, 2 em ấy sẽ in ra hai lần nhé :weary:

![](https://images.viblo.asia/5a63535d-c9b1-46d2-a6d8-743ec17c428b.PNG)

Nhưng chỉ cần thêm **`_once`** sau **include** hoặc **require** thì trang web sẽ chỉ nhận tệp một lần mà thôi, bất kể trước đó đã có **require** hay **include**

```php
<?php
//dùng 1 once
require 'header.php';
require_once 'header.php';
?>
```

```php
<?php
//dùng 2 once
require_once 'header.php';
require_once 'header.php';
?>
```

Dù 1  **`_once`** hay 2 **`_once`** thì code trên cũng chỉ ra một kết quả:

![](https://images.viblo.asia/b9ae745b-1f91-4a59-99a4-e79e2c37c3bc.PNG)

### 3. Đường dẫn trong file nhúng

##### Có 2 loại đường dẫn:

Trước tiên cần đưa 3 file về cùng một thư mục, ở đây tôi kéo 3 em ấy về cùng một nhà trong thư mục **include** :kissing_heart:

**3.1. Đường dẫn tuyệt đối:**

- Sử dụng cách này cần kích hoạt **allow_url_fopen** và **allow_url_include** sang chế độ **On** trong **php.ini**
> Để tìm file **php.ini** chỉ cần vào Xampp và chọn **config** ấn tổ hợp phím **ctrl + F**, cửa sổ tìm kiếm hiện ra, ta tìm hai từ khóa trên và đổi giá trị sang **On**.

![](https://images.viblo.asia/96f745fb-308c-45b3-a1ea-c323298f1162.png)

-----

> **Tiến hành tìm kiếm với ctrl + F**: allow_url_fopen

![](https://images.viblo.asia/26d7cb77-6ccd-4f31-b88b-73d1be804459.PNG)

-----

> Chuyển sang chế độ : **On**

![](https://images.viblo.asia/8e4b6ac7-16a2-4078-899b-52562eaf5c67.PNG)

-----

> **Tiến hành tìm kiếm với ctrl + F**: allow_url_include

![](https://images.viblo.asia/dd195df4-b6a3-4b26-a88c-8e3f445add07.PNG)

-----

> Chuyển sang chế độ : **On**

![](https://images.viblo.asia/30509248-3ecc-41f8-8c9f-6d3fa063b2e1.PNG)

<br>

**Sử dụng đường dẫn tuyệt đối như sau:**
```php
<?php include "http://localhost/DEMO/include/header.php"; ?>
<div>Content</div>
<?php include "http://localhost/DEMO/include/footer.php"; ?>
```
<br>

:white_check_mark: Running trên localhost:

> Gõ lệnh: **localhost:80/DEMO/index.php**

**Kết quả**: Nội dung 2 tệp **footer.php** và **header.php** đều đã được thêm vào dưới và trên `Content`

![](https://images.viblo.asia/d3edd866-52ec-4076-b3a7-7a43bac0ab66.PNG)

**3.2. Sử dụng DOCUMENT_ROOT**
> Một giải pháp hiệu quả khi bạn nhất thời chưa thể đưa ra được đường dẫn tuyệt đối của file php.

- Cú pháp:
```php
<?php include $_SERVER["DOCUMENT_ROOT"] . "/include/header.php"; ?>
<div>Content</div>
<?php include $_SERVER["DOCUMENT_ROOT"] . "/include/footer.php"; ?>
```
:white_check_mark: Running trên localhost:

> Gõ lệnh: **localhost:80/DEMO/index.php**

**Kết quả**: Nội dung 2 tệp **footer.php** và **header.php** đều đã được thêm vào dưới và trên `Content 2`

![](https://images.viblo.asia/b648bff7-b9ce-481e-895c-69aebf1aec0b.PNG)

Link tham khảo:

https://hocwebchuan.com/tutorial/php/php_include_require.php

https://laptrinhvienphp.com/bai-19-huong-dan-iclude-va-require-trong-php/

https://www.codehub.com.vn/Hoc-PHP/Nhung-File-trong-PHP

:maple_leaf:**𝔑𝔥ậ𝔱 𝔏𝔞𝔪**:maple_leaf: