# Điều hướng trang (Redirect) trong JavaScript là gì?
Bạn có thể gặp tình huống khi bạn click vào một URL để tới trang X nhưng bạn được điều hướng tới trang Y. Nó xảy ra là do Page Redirection – Điều hướng lại trang. Khái niệm này khác với: JavaScript Refresh trang.

Có nhiều lý do khác nhau để tại sao bạn muốn redirect người dùng từ trang ban đầu. Dưới đây là một số lý do:
* Bạn không thích tên miền của bạn và bạn đang muốn chuyển qua tới một tên miền mới. Trong trường hợp này, bạn có thể muốn điều hướng trực tiếp tất cả khách truy cập của bạn tới site mới. Tại đây, bạn có thể duy trì tên miền cũ, nhưng đặt một trang đơn với một sự điều hướng lại trang để mà tất cả khách truy cập tên miền cũ có thể tới miền mới.
* Bạn đã xây dựng các trang khác nhau dựa trên các trình duyệt hoặc tên của nó hoặc có thể dựa trên các quốc gia khác nhau, sau đó, thay vì sử dụng sự điều hướng lại trang ở Server-Side, bạn có thể sử dụng sự điều hướng lại trang ở Client-Side để chuyển người dùng tới trang thích hợp.
* Search Engines có thể đã Index các trang của bạn. Nhưng trong khi di chuyển tới miền mới, bạn không muốn đánh mất những vị khách truy cập thông qua phương tiện tìm kiếm. Vì thế bạn có thể sử dụng sự điều hướng lại trang ở Client-Side. Nhưng bạn nên nhớ rằng điều này không nên được thực hiện để lừa dối Search Engine, nó có thể cho trang của bạn thành trang bị cấm.

## Page Redirection làm việc như thế nào?

Qui trình thực hiện của Page Redirection như sau:
### Ví dụ 1
Nó là khá đơn giản để thực hiện Page Redirection sử dụng JavaScript tại Client-Side. Để điều hướng khách truy cập tới một trang mới, bạn chỉ cần thêm một dòng code trong khu vực head như sau:

```
<html>
   <head>

      <script type="text/javascript">
         <!--
            function Redirect() {
               window.location="https://viblo.asia.vn";
            }
         //-->
      </script>

   </head>

   <body>
      <p>Click the following button, you will be redirected to home page.</p>

      <form>
         <input type="button" value="Redirect Me" onclick="Redirect();" />
      </form>

   </body>
</html>
```

### Ví dụ 2
Bạn có thể hiển thị một thông báo thích hợp cho khách truy cập trước khi điều hướng họ tới một trang mới. Điều này có thể cần một chút thời gian trì hoãn để tải trang mới. Ví dụ sau chỉ cách thực hiện tương tự. Tại đây, setTimeout() là một hàm có sẵn trong JavaScript mà có thể được sử dụng để thực thi lệnh khác sau một khoảng thời gian đã cho.

```
<html>
   <head>

      <script type="text/javascript">
         <!--
            function Redirect() {
               window.location="https://viblo.asia.vn";
            }

            document.write("You will be redirected to main page in 10 sec.");
            setTimeout('Redirect()', 10000);
         //-->
      </script>

   </head>

   <body>
   </body>
</html>
```

### Ví dụ 3
Ví dụ sau chỉ cách điều hướng khách truy cập của bạn tới một trang khác dựa trên trình duyệt họ sử dụng.
```
<html>
   <head>

      <script type="text/javascript">
         <!--
            var browsername=navigator.appName;
            if( browsername == "Netscape" )
            {
               window.location="http://www.location.com/ns.jsp";
            }
            else if ( browsername =="Microsoft Internet Explorer")
            {
               window.location="http://www.location.com/ie.jsp";
            }
            else
            {
               window.location="http://www.location.com/other.jsp";
            }
         //-->
      </script>

   </head>

   <body>
   </body>
</html>
```

## Refresh trang trong JavaScript

Bạn có thể refresh một trang web bởi sử dụng phương thức location.reload trong JavaScript. Code này có thể được gọi tự động trên một sự kiện hoặc đơn giản khi người dùng click trên một link. Nếu bạn muốn refresh một trang web bởi sử dụng cú nhấp chuột, bạn có thể sử dụng code sau:
```
<a href="javascript:location.reload(true)">Refresh Page</a>
```

### Refresh tự động
Bạn cũng có thể sử dụng JavaScript để refresh trang một cách tự động sau một khoảng thời gian đã cho. Ở đây, setTimeout() là một hàm có sẵn trong JavaScript mà có thể được sử dụng để thực thi hàm khác sau một quãng thời gian đã cho.

**Ví dụ**
Bạn thử ví dụ sau. Nó chỉ cách refresh một trang sau mỗi 5 giây. Bạn có thể thay đổi thời gian này tùy theo bạn.

```
<html>
   <head>

      <script type="text/JavaScript">
         <!--
            function AutoRefresh( t ) {
               setTimeout("location.reload(true);", t);
            }
         //-->
      </script>

   </head>

   <body onload="JavaScript:AutoRefresh(5000);">
      <p>This page will refresh every 5 seconds.</p>
   </body>

</html>
```


**Kết quả**
```
This page will refresh every 5 seconds.
```