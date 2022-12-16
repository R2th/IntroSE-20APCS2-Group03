Khi sử dụng WordPress. Chúng ta sẽ tạo ra các file templates để có thể sử dụng ở nhiều vị trí khác nhau cũng như dễ dàng chỉnh sửa. WordPress được base trên PHP nên các file code đều có đuôi file là PHP. Sau đây mình sẽ giới thiệu một số các gọi file php trong function cũng như trong file templates.

## Thêm file trong PHP trong file function.php
Khi các bạn code 1 function cần tương tác với admin thì các file sẽ phải được include trong function.php

Sử dụng Hàm `include()` sẽ gọi 1 file PHP. Nếu không tìm thấy, sẽ có lỗi PHP warning.

Sử dụng Hàm `include_once()` cũng tương như `include()`, nhưng sẽ chỉ gọi file cần thêm vào 1 lần.

![](https://images.viblo.asia/fa456673-2210-4dcb-8784-a7a8daea110d.png)

## Thêm file bắt buộc trong PHP
Cũng tương tự như thêm file ở trên, nhưng quá trình hoạt động sẽ bị gián đoạn và hiển thị lỗi khác nhau.

`require()` hoạt động tương tự `include()`, nhưng một khi file không tìm thấy, bạn sẽ thấy script break từ đó.

`require_once()` cũng tương tự `include_once()`, tức là nếu đã call file đó một lần thì không thể call lần thứ 2.

![](https://images.viblo.asia/265914f6-adbd-4646-875e-9020c7f4f295.png)

## Gọi file trong Templates WordPress
Trong WordPress, khi làm theme chúng ta nên tách biệt các phần có thể sử dụng lại nhiều lần như Loop Post, Element, Shortcode. Chúng ta sẽ tạo ra file templates riêng như `logo.php` hoặc `latest-post.php` khi sử dụng các file này ở teamplates. Chúng ta sẽ sử dụng hàm `get_template_part()` là một phần API của WordPress, có thể sử dụng để gọi section/template hoặc một phần code vào trong theme.

Function này sẽ có 2 tham số truyền vào :
> Đối đầu tiên là slug của template.
> 
> Đối thứ hai là tên của template.

Về cơ bản function này khá thú vị nếu các thành phần bạn cần gọi vào là độc lập, tức là các giá trị và define biến của chúng được gọi bên trong, hoặc gọi từ header.

![](https://images.viblo.asia/a282ee0a-99b9-4ab2-b66f-b1e335eb9040.png)

## Thực hành
Chúng ta hãy thử với những ví dụ đơn giản để dễ hiểu hơn.

> 1. Ta có 1 template tên logo.php nằm trong thư mục `/themes/dgt-gapfood/inc/templates`
> 
> 2. Ta có 1 template header-right.php nằm trong thư mục `/themes/dgt-gapfood/inc/header`

Vậy ta sẽ sử dụng get_template_part() để gọi file template logo.php như thế nào

Trong file header.php chúng ta muốn gọi logo ở vị trí bên trái. Chúng ta sẽ có đoạn code như sau:

```
<div class="col-sm-3 col-md-3 col-lg-3">
    <?php get_template_part('inc/templates/logo', ''); ?>
</div>
```

Vậy với file template header-right.php thì chúng ta sẽ gọi như sau:

```
<div class="hidden-sm hidden-xs col-sm-9 col-md-9 col-lg-9">
    <?php get_template_part('inc/header/header', 'right'); ?>
</div>
```

Như vậy các bạn sẽ thấy nếu như file template của các bạn chỉ có 1 đối số là logo chả hạn thì k cần truyền đối số thứ 2 vào. Nhưng nếu file template có 2 đối số ví dụ header-right.php thì header và right là 2 đối số. 

## Kết luận
Với việc sử dụng file ở trong function nếu bạn sử dụng get_template_part() thì sẽ không có tác dụng. Vì vậy, hãy sử dụng `require` còn nếu sử dụng file templates trong teamplate của WordPress thì sử dụng `get_template_part`

Chúc các bạn thành công.