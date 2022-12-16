# Cookie trong JavaScript
## 1. Cookie là gì?

-----

* Các trình duyệt và Web Server sử dụng giao thức HTTP để giao tiếp và HTTP là Stateless Protocol (không lưu trạng thái của Client trên Server). Nhưng đối với một Website thương mại, nó được yêu cầu duy trì thông tin phiên (session) trong các trang khác nhau. Ví dụ, một đăng ký người sử dụng kết thúc sau khi hoàn thành đăng ký ở nhiều trang. Nhưng cách để duy trì thông tin phiên của người dùng dọc theo tất cả các trang là như thế nào.
* Trong nhiều tình huống, sử dụng Cookie là phương thức hiệu quả nhất để nhớ và theo dấu vết của việc đặt mua, đặt bán, các ưu đãi, và thông tin khác được yêu cầu cho sự trải nghiệm tốt hơn của khách truy cập hoặc thống kê site.

## 2. Cách Cookie nó làm việc?

-----

* Server của bạn gửi một số dữ liệu tới trình duyệt người dùng một mẫu dạng cookie. Trình duyệt có thể chấp nhận cookie đó. Nếu chấp nhận, nó được lưu như là một bản ghi thuần văn bản trên phần cứng của khách truy cập. Bây giờ, khi khách truy cập đến một trang khác trên site của bạn, trình duyệt gửi cookie giống như thế tới Server để thu hồi. Khi được thu hồi, Server của bạn biết/nhớ những gì đã lưu trước đó.
* Các Cookie là bản ghi dữ liệu thuần văn bản của 5 trường biến:

1. **Expires** − Ngày cookie sẽ hết hạn. Nếu nó để trống, thì cookie sẽ hết hạn khi khác truy cập thoát khỏi trình duyệt.
2. **Domain** − Tên miền của site người dùng.
3. **Path** − Đường truyền tới thư mục hoặc trang web mà thiết lập cookie. Nó có thể là trống nếu bạn muốn thu nhận cookie từ bất kỳ thư mục hoặc trang nào.
4. **Secure** − Nếu trường này chứa từ “secure”, thì khi đó cookie chỉ có thể được thu nhận với một Server an toàn. Nếu trường này là trống, sẽ không có giới hạn nào.
5. **Name=Value** − Cookie được thiết lập và được thu nhận trong form các cặp khóa-giá trị (key-value)

* Các Cookie ban đầu được thiết kế cho chương trình CGI. Dữ liệu chứa trong một Cookie tự động truyền tải giữa trình duyệt và Web Server, vì thế CGI script trên Server có thể đọc và ghi các giá trị cookie mà được lưu trên Client.

JavaScript cũng có thể thao tác Cookie bởi sử dụng thuộc tính **cookie** của đối tượng **Document**. JavaScript có thể đọc, tạo, chỉnh sửa và xóa các cookie mà áp dụng tới trang web hiện tại.

## 3.Lưu giữ Cookies
-----


- Cách đơn giản nhất để tạo một cookie là để gán một giá trị chuỗi tới đối tượng document.cookie, mà trông như sau:

```
document.cookie = "key1=value1;key2=value2;expires=date";
```

* Ở đây, thuộc tính **expires** là tùy ý. Nếu bạn cung cấp thuộc tính này với ngày hoặc thời gian hợp lệ, thì khi đó cookie sẽ hết hạn với ngày hoặc thời gian đã cho, và sau đó, giá trị của cookie sẽ không có thể truy cập.

* **Ghi chú** − Các giá trị cookie không thể chứa dấu chấm phảy, dấu phảy, hoặc khoảng trống. Đối với lý do này, bạn có thể muốn sử dụng hàm JavaScript escape() để mã hóa giá trị trước khi lưu giữ nó trong cookie. Nếu bạn làm điều này, bạn cũng sẽ phải sử dụng hàm unescape() tương ứng khi bạn đọc giá trị cookie.


### Ví dụ
Bạn thử ví dụ sau. Nó thiết lập một tên khách hàng trong đầu vào của cookie.
```
<html>
   <head>

      <script type="text/javascript">
         <!--
            function WriteCookie()
            {
               if( document.myform.customer.value == "" ){
                  alert("Enter some value!");
                  return;
               }
               cookievalue= escape(document.myform.customer.value) + ";";
               document.cookie="name=" + cookievalue;
               document.write ("Setting Cookies : " + "name=" + cookievalue );
            }
         //-->
      </script>

   </head>

   <body>

      <form name="myform" action="">
         Enter name: <input type="text" name="customer"/>
         <input type="button" value="Set Cookie" onclick="WriteCookie();"/>
      </form>

   </body>
</html>
```

**Kết quả** Bây giờ thiết bị của bạn có một cookie gọi là **name**. Bạn có thể thiết lập nhiều cookie bởi sử dụng cặp khóa-giá trị phân biệt nhau bởi dấu phảy.

## 4.Đọc Cookie
-----

* Đọc một cookie là đơn giản như viết nó, bởi vì giá trị của đối tượng document.cookie là cookie. Vì thế bạn có thể sử dụng chuỗi này bất cứ khi nào bạn muốn truy cập cookie đó. Chuỗi document.cookie sẽ giữ một danh sách các cặp tên-giá trị phân biệt nhau bởi dấu chấm phảy, ở đây name là tên của cookie và giá trị là giá trị chuỗi của nó.
* Bạn có thể sử dụng hàm split() để phá vỡ một chuỗi thành khóa và các giá trị như sau:
### Ví dụ

Bạn thử ví dụ sau. Nó sẽ hiển thị tất cả cookie.
```
<html>
   <head>

      <script type="text/javascript">
         <!--
            function ReadCookie()
            {
               var allcookies = document.cookie;
               document.write ("All Cookies : " + allcookies );

               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');

               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++){
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
                  document.write ("Key is : " + name + " and Value is : " + value);
               }
            }
         //-->
      </script>

   </head>
   <body>

      <form name="myform" action="">
         <p> click the following button and see the result:</p>
         <input type="button" value="Get Cookie" onclick="ReadCookie()"/>
      </form>

   </body>
</html>
```

**Ghi chú** − Ở đây, length là phương thức của lớp **Array** mà trả về độ dài của một mảng. Chúng ta sẽ bàn luận về Mảng trong một chương riêng. Ghi chú − Có thể có một số cookie khác đã thiết lập trên thiết bị của bạn. Code trên sẽ hiển thị tất cả cookie thiết lập trên thiết bị của bạn.

## 5. Thiết lập Ngày hết hạn Cookie

-----
* Bạn có thể gia hạn vòng sống của một cookie trên phiên trình duyệt hiện tại với thiết lập một ngày hết hạn và lưu Expiry Date trong cookie. Điều này có thể được thực hiện bởi thiết lập thuộc tính expires với ngày và thời gian.

### Ví dụ

Bạn thử ví dụ sau. Nó minh họa cách để gia hạn ngày hết hạn của một cookie là 1 tháng.

```
<html>
   <head>

      <script type="text/javascript">
         <!--
            function WriteCookie()
            {
               var now = new Date();
               now.setMonth( now.getMonth() + 1 );
               cookievalue = escape(document.myform.customer.value) + ";"

               document.cookie="name=" + cookievalue;
               document.cookie = "expires=" + now.toUTCString() + ";"
               document.write ("Setting Cookies : " + "name=" + cookievalue );
            }
         //-->
      </script>

   </head>
   <body>

      <form name="formname" action="">
         Enter name: <input type="text" name="customer"/>
         <input type="button" value="Set Cookie" onclick="WriteCookie()"/>
      </form>

   </body>
</html>
```

## 6.Xóa một Cookie
-----

* Đôi khi bạn muốn xóa một cookie khi mà sau các cố gắng đọc một cookie mà không trả về bất cứ thứ gì. Để làm điều này, bạn chỉ cần thiết lập Expiry Date về một thời điểm trong quá khứ.

### Ví dụ
Bạn thử ví dụ sau. Nó minh họa cách xóa một cookie bởi thiết lập Expiry Date về một tháng trước ngày hiện tại.
```
<html>
   <head>

      <script type="text/javascript">
         <!--
            function WriteCookie()
            {
               var now = new Date();
               now.setMonth( now.getMonth() - 1 );
               cookievalue = escape(document.myform.customer.value) + ";"

               document.cookie="name=" + cookievalue;
               document.cookie = "expires=" + now.toUTCString() + ";"
               document.write("Setting Cookies : " + "name=" + cookievalue );
            }
          //-->
      </script>

   </head>
   <body>

      <form name="formname" action="">
         Enter name: <input type="text" name="customer"/>
         <input type="button" value="Set Cookie" onclick="WriteCookie()"/>
      </form>

   </body>
</html>
```