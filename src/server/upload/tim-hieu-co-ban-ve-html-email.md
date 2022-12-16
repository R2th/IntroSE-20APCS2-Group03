## I> Giới thiệu:
Mấy hôm nay mình xem mấy template email (email có nội dung được hiển thị như trang web) mẫu thấy đẹp quá nên muốn tìm hiểu thử, như email này khá quen với mọi người:
![](https://images.viblo.asia/60b6fea9-33da-47b0-986b-be58a26e4bfc.PNG)

Mình cứ nghĩ sẽ viết giống như y như cách viết trang web bình thường, ai ngờ khi tìm hiểu mới thấy nó khác. Nào cùng mình tìm hiểu nào:

## II > Cùng tìm hiểu nào:
### 1. Các rule cơn bản:
 - Nội dung gửi chỉ gồm các đoạn text ( trong mail làm gì có chia thư mục có chứa các file để import vào như html web).
Điều này áp dụng khi bạn muốn nhúng link ảnh bạn phải nhúng link từ hệ thống ngoài, hay như style bạn phải viết dụng inline 
- Phải dễ dàng áp dụng khi content thay đổi
- Áp dụng với các trình đọc email khác nhau (có rất nhiều trình đọc mail ví dụ như email cho Desktop, email for Web, email for Android, email for Ios). Để đạt được rule này chúng ta đôi khi phải trick code@@
### 2. Email sẽ SẼ không hoạt động với:
- Flash
- Javascript
- Các style phức tạp đặc biệt là của css3 như: grid, flex, animation, ...
- html: các thẻ html5, button, form,...

### 3. Nên áp dụng table để chia layout:
 Vì các trình đọc mail khác với web rất khó control, nó chỉ ăn được cách chia layout tôt nhất là với dạng table. Các dạng style float, flex, grid đa số sẽ không hoạt động được!

Ví dụ mình có 1 đoạn làm thẻ header:

```html
<table>
  <tr>
    <td>
      <table  border="0" bgcolor="gray" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="left" style="padding: 10px;">
            <img height="50" width="50" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/202px-Apple_logo_black.svg.png" alt="logo" border="0"/>
          </td>
          <td align="right" >
            Sản phẩm luôn chất lượng và đắt
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
```
===> Kết quả:
![](https://images.viblo.asia/21351b86-4232-47b3-963d-0dd5e7d6f602.PNG)


===> Bạn chú ý 1 số điểm:
-  để chia align cho hình hay text, mình đều chia align với thẻ td.
- Để chia padding hay width của dòng, mình đều dùng các thuộc tính của thẻ table
- Khai báo thêm style="table-layout: fixed;" với table

Có 1 format khác bạn có thể tham khảo
```hmtl
<div style="display: table">
</div>
```

### 4> Thẻ image và thẻ button:
Với thẻ image, ta thường phải khai báo thuộc tính:
- src: phải là 1 link dạng internal từ bên ngoài
- alt: load không thành công, hoặc lúc load không được
- border: 0
- Nếu chia thêm các thuộc tính khác, ta nên khai báo thêm style: `display:block`

Với button, ta sẽ khai báo đó là thẻ a (để liên kết ra ngoài)

Ví dụ như bên dưới đây, mình muốn hiển thị 1 item product:
``` html
 <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
    <td align="center">
        <img src="https://cdn.tgdd.vn/Products/Images/522/163645/ipad-6th-wifi-32gb-1-400x460.png" alt="ipad 2018" width="280" height="218" border="0" style="display: block;" />
    </td>
    </tr>
    <tr>
    <td align="center">
        ipad 2019
    </td>
    </tr>
    <tr>
    <td align="center">
        8500000vnd
    </td>
    </tr>
    <tr>
    <td align="center" class="link">
        <a border="0" href="#" style="text-decoration:none;display:inline-block;color:#000000;background-color:#f6d16c;border-radius:0px;-webkit-border-radius:0px;-moz-border-radius:0px;width:auto; width:auto;;border-top:1px solid #f6d16c;border-right:1px solid #f6d16c;border-bottom:1px solid #f6d16c;border-left:1px solid #f6d16c;padding-top:1px;padding-bottom:2px;font-family:Merriwheater, Georgia, serif;text-align:center;mso-border-alt:none;word-break:keep-all;">
        <span style="padding-left:10px;padding-right:10px;font-size:12px;display:inline-block;">
            Chi tiết
        </span>
        </a>
    </td>
    </tr>
</table>
``` 

===> kết quả:
![](https://images.viblo.asia/a20d6c72-3848-49fc-b831-5e0cc9cef62e.PNG)

### 5> style:
Chỉ có thể viết dưới 2 dạng: viết ở thẻ style ở head hoặc viết style inline. Với cách style inline sẽ tốt hơn.
Ví dụ như để style 1 button mình đã viết:

```html
<a border="0" href="#" style="text-decoration:none;display:inline-block;color:#000000;background-color:#f6d16c;border-radius:0px;-webkit-border-radius:0px;-moz-border-radius:0px;width:auto; width:auto;;border-top:1px solid #f6d16c;border-right:1px solid #f6d16c;border-bottom:1px solid #f6d16c;border-left:1px solid #f6d16c;padding-top:1px;padding-bottom:2px;font-family:Merriwheater, Georgia, serif;text-align:center;mso-border-alt:none;word-break:keep-all;">
    <span style="padding-left:10px;padding-right:10px;font-size:12px;display:inline-block;">
        Chi tiết
    </span>
</a>
```        

Và để style common cho các td:
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Template email</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <style type="text/css">

      td {
          font-size: 14px;
      }


  </style>
</head>
```

## III> Một số tool/website:
Để có thể dễ dàng thiết kế teamplate email thường có thể áp dụng nhanh hơn.

1. Tool: https://mjml.io/ ( 1 tool tuyệt vời để bạn áp dụng nhanh và chính xác )
2. website: beefree.io, 

## IV> Tổng kết:
Có được 1 temple đẹp và chạy được trên nhiều thiết bị thì bạn cần phải chú ý những điều như mình đã note. Để tạo ra nhanh và chính xác bạn có thể sử dụng các tool hay website có sẵn. Mình vẫn đang tìm hiểu các nội dung khác: responsive,...

Cảm ơn người anh đã viết bài này: https://viblo.asia/p/giai-phap-cho-html-email-responsive-4P856a6BlY3 để mình hiểu hơn.