Các class giả định trong CSS có tên gọi là pseudo-class, thực ra không phải là khái niệm gì mới mẻ hoàn toàn. Các class này về cơ bản là các bộ chọn đặc biệt giúp chúng ta thiết lập phong cách hiển thị mang tính điều kiện dựa trên trạng thái của phần tử HTML. Ứng dụng thường nhìn thấy nhất của các class giả định đó là chúng ta có thể khiến cho một liên kết có thể thay đổi phong cách hiển thị khi được trỏ chuột tới. Hãy cùng thảo luận về các bộ chọn đặc biệt này.

## Các class giả định - pseudo-class

Chúng ta sẽ mở đầu bằng code ví dụ. Bộ chọn `:empty` trong ví dụ dưới đây sẽ chọn tất cả các phần tử rỗng.

```empty.css
:empty {
   display: block;
   width: 300px;
   height: 45px;

   background-color: Crimson;
}
```

```empty.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Empty your cup</title>
      <link rel="stylesheet" href="empty.css">
   </head>
   <body>
      <h2>
          "Trống rỗng, rồi sẽ được lấp đầy."<br>
          _Lão Tử
       </h2>

      <p></p>

      <p>I want to be empty.</p>

      <h2></h2>

      <p>I want to be empty, too.</p>

      <p></p>
   </body>
</html>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/WNdvveV)

Bạn thấy đấy, pseudo-class không có gì khác đặc biệt hơn và thực ra chỉ là các bộ chọn. Tuy nhiên, để sử dụng các pseudo-class hiệu quả hơn thì chúng ta nên kết hợp với các bộ chọn khác nữa, thường thì sẽ là lấy phần giao với một bộ chọn khác. Ví dụ: `p:empty`, `.section:empty`, `a:hover`, v.v...

Đây là danh sách tham khảo của các pseudo-class - [Danh sách đầy đủ các pseudo-class](https://www.w3schools.com/css/css_pseudo_classes.asp).

Hãy chọn ra một vài pseudo-class khác để dùng thử. Lần này chúng ta sẽ sử dụng `:hover`. Bộ chọn này được sử dụng rất phổ biến để thiết lập cho các liên kết và các nút nhấn. Tuy vậy, chúng ta cũng có thể sử dụng nó cho những thứ khác nữa.

```dreamer.css
.dreamer {
   color: LightGray;
}

.dreamer:hover {
   color: White;
}
```

```dreamer.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Full-time Dreamer</title>
      <link rel="stylesheet" href="dreamer.css">
   </head>
   <body>
      <h1 class="dreamer">Don't touch me!</h1>
   </body>
</html>
```

Như bạn đã thấy thì pseudo-class thực sự không phải là khái niệm gì mới mẻ và rất dễ để
hiểu được cách hoạt động của các bộ chọn này. Vì vậy nên chúng ta sẽ không viết code ví dụ cho từng bộ chọn pseudo-class. Bạn chỉ cần lưu lại liên kết tham khảo để sử dụng sau này hoặc bạn có thể đọc lướt qua danh sách để chọn ra một vài bộ chọn mà bạn có ý tưởng sử dụng để luyện tập.

## Pseudo-Elements - Các Phần Tử Giả Định

Ồ! Mình đã quên không nhắc đến các phần tử giả định trong tiêu đề của bài viết. Xin lỗi bạn vì kế hoạch bất ngờ này bởi vì mình chợt có linh cảm rất mạnh mẽ rằng pseudo-element dường như có gì đó liên quan tới pseudo-class. :D

CSS cho phép chúng ta chèn các `phần tử giả` vào các trang web đơn. Các công cụ tìm kiếm như Google, Bing, v.v... sẽ không nhìn thấy nội dung bên trong các phần tử này. Đó là bởi vì các pseudo-element được thiế kế chỉ để sử dụng cho mục đích trang trí.

Code CSS trong ví dụ dưới đây sẽ chèn một pseudo-element vào ngay phía trước mỗi thành viên của class `.entry`.

```separator.css
.entry {
   height: 180px;
}

.entry::before {
   content: "I'm not real. I'm just a separator.";

   display: block;
   width: 100%;
   height: 21px;

   color: Gray;
   background-color: WhiteSmoke;
}
```

```separator.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Pseudo Separators</title>
      <link rel="stylesheet" href="separator.css">
   </head>
   <body>
      <section class="entry">
         <h2>Trích đoạn 1</h2>
         <p>Một trích đoạn ngắn với một vài từ hay...</p>
         <a href="#">Xem thêm</a>
      </section>

      <section class="entry">
         <h2>Trích đoạn 2</h2>
         <p>Một trích đoạn ngắn với một vài từ hay...</p>
         <a href="#">Xem thêm</a>
      </section>

      <section class="entry">
         <h2>Trích đoạn 3</h2>
         <p>Một trích đoạn ngắn với một vài từ hay...</p>
         <a href="#">Xem thêm</a>
      </section>
   </body>
</html>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/Exojjjm)

Như bạn đã thấy, cú pháp của pseudo-element trông khá giống với pseudo-class. Chúng ta cũng có thể các pseudo-element như các bộ chọn. Hãy tưởng tượng rằng các trang đơn của chúng ta có đầy các phần tử giả được ẩn đi theo mặc định và chúng ta đang sử dụng các bộ chọn đặc biệt để làm việc với các phần tử giả này.

Trong ví dụ ở trên, `::before` được sử dụng để chèn (hoặc chọn) các phần tử giả vào phía trước các phần tử là thành viên của class `.entry`. Chúng ta cũng có thể sử dụng `::after` để chèn các phần tử giả vào phía sau.

Bên cạnh đó, có 3 pseudo-element nữa được CSS cung cấp ở phiên bản hiện tại:

- `::first-letter` - chọn chữ cái đầu tiên của 1 phần tử.
- `::first-line` - chọn dòng đầu tiên của 1 phần tử.
- `::selection` - chọn phần chữ được khoanh vùng bằng trỏ chuột bởi người dùng.

Bạn có thể thử dùng các pseudo-element này để mô phỏng lại một trang báo giấy. :D

Bài viết về các class giả định và các phần tử giả định của chúng ta tới đây là kết thúc. Trong bài viết tiếp theo, chúng ta sẽ gặp lại các thuộc tính `width` và `height`. Mặc dù, chúng ta đã sử dụng các thuộc tính này khá nhiều rồi, tuy nhiên để giữ cho mọi thứ được đơn giản khi mới khởi đầu thì mình đã không nhắc đến một vài yếu tố. :D

[[CSS] Bài 11 - Gặp Lại Width & Height](https://viblo.asia/p/GrLZDrV35k0)