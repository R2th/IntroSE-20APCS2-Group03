## **1.Khái niệm về AJAX**
**a, khái niệm cơ bản**
-	AJAX viết tắt từ Asynchronous JavaScript and XML, là bộ công nghệ giúp tạo ra các web động hay các ứng dụng giàu tính Internet, cho phép tăng tốc độ ứng dụng web bằng cách cắt nhỏ dữ liệu và chỉ hiển thị những gì cần thiết, thay vì tải đi tải lại toàn bộ trang web.
-	AJAX không phải một công nghệ đơn lẻ mà là sự kết hợp một nhóm công nghệ với nhau.

* Các nhóm công nghệ hình thành lên AJAX.
   *     HTML (hoặc XHTML) với CSS trong việc hiển thị thông tin.
   *    Mô hình DOM (Document Object Model), được thực hiện thông qua JavaScript, nhằm hiển thị thông tin động và tương tác với những thông tin được hiển thị.
   *     Đối tượng XMLHttpRequest để trao đổi dữ liệu một cách không đồng bộ với máy chủ web (Mặc dù, việc trao đổi này có thể được thực hiện với nhiều định dạng như HTML, văn bản thường, JSON và thậm chí EBML, nhưng XML là ngôn ngữ thường được sử dụng).
   *    XML thường là định dạng cho dữ liệu truyền, mặc dù bất cứ định dạng nào cũng có thể dùng, bao gồm HTML định dạng trước, văn bản thuần (plain text), JSON và ngay cả EBML.

**b, 5 bước hoạt động của AJAX**.

![](https://images.viblo.asia/91d79106-24e4-4657-9262-b62bf9e701fd.gif).

   *  	Giai đoạn 1: Client gửi yêu cầu lên  phía server sử dụng XMLHttpRequest. ( trong giai đoạn này sẽ gửi yêu cầu lên một trang php trên phía server).
   * 	Giai đoạn 2 : Server sẽ xử lý yêu cầu.
   *    Giai đoạn 3: Truy vấn đến CSDL ( cập nhật ,hoặc truy vấn dữ liệu trong DB).
   * Giai đoạn 4 : Trang php trên phía server sẽ trả lại kết quả
   * Giai đoạn 5: AJAX sử dụng cơ chế bất đồng bộ để update lại những phần cần thay đổi thay vì phải làm mới lại toàn bộ trang web. 
   
**c, so sánh cơ chế hoạt động giữa WEB truyền thống và web có sử dụng ajax**.

![](https://images.viblo.asia/a0b154ba-b275-49ba-8aec-875f687d6293.png).

**(Note : hình bên trái không sử dụng ajax, hình bên phái có sử dụng ajax).**.

Đầu tiên chúng ta cần so sánh đặc điểm của hai cơ chế đồng bộ (Synchronous) và cơ chế bất đồng bộ (Asynchronous).
* **Cơ chế đồng bộ(Synchronous)**.
    - Chương trình sẽ chạy theo từng bước và chỉ khi nào bước 1 thực hiện xong thì mới nhảy sang bước 2.
	- Trong một chuỗi các hàm của một quy trình có n tác vụ, trình tự thực hiện các hàm sẽ không bao giờ thay đổi. 
    - Hàm A đã được thiết lập để được gọi và chạy trước hàm B thì dù có phải đợi trong thời gian rất dài hàm B cũng phải chờ hàm A kết thúc mới được phép bắt đầu.
vì vậy: điều này sinh ra trạng thái chờ
* ***Cơ chế bất đồng bộ(Asynchronous)***
    - Chương trình có thể nhảy đi bỏ qua một bước nào đó
	- Trong một chuỗi các hàm của một quy trình có n tác vụ, nếu nó được bảo là bất đồng bộ thì có nghĩa là cho dù hàm B được gọi sau hàm A nhưng không ai đảm bảo được rằng hàm A sẽ phải kết thúc trước hàm B và hàm B bắt buộc phải chỉ được gọi chạy khi hàm A kết thúc.

**Như vậy,** thông qua đặc điểm của hai cơ chế trên , chúng ta có thể thấy được đặc điểm của trang web truyền thống và trang web hiện đại có sử dụng AJAX như sau.
*  **Với ứng dụng web thường:** CLIENT sẽ gửi lên SEVER một HTTP Request. Trải qua một loạt các tác vụ bên phía SEVER như: tính toán, lấy dữ liệu, kiểm tra tính hợp lệ, sửa đổi bộ nhớ… sau đó mới gửi trả lại một trang HTML hoàn chỉnh tới CLIENT. Về mặt kỹ thuật, phương pháp này nghe có vẻ hợp lý nhưng cũng khá bất tiện và mất thời gian, bởi khi server đang thực hiện vai trò của nó thì người dùng sẽ làm gì ? Có vấn đề gì ở đây ? Mỗi lần như vậy Client sẽ gửi toàn bộ nội dung website lên Server, và Server cũng trả về tương ứng. Bạn hình dung, khi xem một bài báo, hay website chia sẻ hình ảnh, bạn chỉ quan tâm nội dung bài báo, hình ảnh đó mà thôi, không cần tải hết cả trang làm gì đó. Đó là hạn chế, bạn sẽ phải tốn thời gian chờ đợi thứ không mong muốn.

* 	**Với ứng dụng web + AJAX**: Ở đây cở chế xử lý AJAX sẽ đóng vai trò làm trung gian giữa CLIENT và SERVER. Thay vì tải lại (refresh) toàn bộ một trang, nó chỉ nạp những thông tin được thay đổi, còn giữ nguyên các phần khác. Ví dụ, trong một website ảnh, với ứng dụng truyền thống, toàn bộ trang chứa các ảnh sẽ phải mở lại từ đầu nếu có một thay đổi nào đó trên trang. Còn khi áp dụng AJAX, DHTML chỉ thay thế đoạn tiêu đề và phần vừa chỉnh sửa, do vậy tạo nên các giao dịch trơn tru, nhanh chóng.
## 2. xây dựng ứng dụng với ajax.
* **yêu cầu của ứng dụng**.

    Chúng ta sẽ tìm hiểu Ajax Live Search với PHP và MySql với Jquery. Trong hầu hết các trang web, chúng ta có thể thấy có một thanh tìm kiếm trên trang web và chúng ta có thể tìm kiếm nội dung của trang web đó. Nếu bạn đã sử dụng Facebook hoặc twitter, có một chức năng tìm kiếm trực tiếp tuyệt vời có sẵn để tìm kiếm bạn bè hoặc người theo dõi mới. Trong các trang web giả sử chúng ta nhập một số từ khóa để tìm từ những trang web sau đó chúng ta có thể nhận được kết quả ngay lập tức từ trang web mà không cần làm mới trang. Chức năng này được thực hiện bởi Ajax với Jquery. Với sự trợ giúp của Jquery. Chúng ta có thể sử dụng  AJAX, với sự trợ giúp của AJAX, nó tìm kiếm dữ liệu ở phía máy chủ và gửi kết quả về trang web front end mà không cần refresh lại trang. Chức năng này sẽ cung cấp cái nhìn tuyệt vời cho trang web của bạn. 
*   Chúng ta cùng nhau bắt tay xây dựng ứng dụng với AJAX + PHP + JQUERY+ MYSQL qua các bước sau. 

**Bước 1:** xây  dựng Database:chúng ta một cơ sở dữ liệu có tên là :**ajax-live-search-data**. Sau đó tạo một bảng có tên là **tbl_customer**.
```mysql
CREATE TABLE IF NOT EXISTS `tbl_customer` (
  `CustomerID` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerName` varchar(250) NOT NULL,
  `Address` text NOT NULL,
  `City` varchar(250) NOT NULL,
  `PostalCode` varchar(30) NOT NULL,
  `Country` varchar(100) NOT NULL,
  PRIMARY KEY (`CustomerID`)
) 
INSERT INTO `tbl_customer` ( `CustomerName`, `Address`, `City`, `PostalCode`, `Country`) VALUES
  ( 'Nguyễn Đăng Khoa', 'Khoái Châu - Hưng yên', 'Hà Nội', '12209', 'Việt Nam'),
  ('Nguyễn Hoàng Trung Hiếu', 'Avda. de la Construction 2222', 'Mexico D.F.', '5021', 'Mexico'),
  ( 'Nguyễn Hoàng Anh Khang', 'Yên Mỹ - Hưng Yên', 'Hưng yên', '5023', 'Việt nam'),
  ( 'Thomas Hardy', '120 Hanover Sq.', 'London', 'WA1 1DP', 'UK'),
  ( 'Nguyễn Tiến Nhật Minh', 'Thanh Trì','Hà Nội', '08737-363', 'Việt Nam'),
  ( 'Wolski Zbyszek', 'ul. Filtrowa 68', 'Walla', '01-012', 'Poland'),
  ( 'Nguyễn Trung Hiếu', 'Hai Bà Trưng', 'Hà Nội', '21240', 'Việt Nam'),
  ( 'Nguyễn Hoàng Bảo Khang', 'Hoàng Mai', 'Hà Nội', '98128', 'Việt Nam'),
  ( 'Nguyến Hoàng Trí Kiên', 'Thanh Xuân', 'Hà Nội', '08737-363', 'Việt Nam'),
  ( 'Pirkko Koskitalo', 'Torikatu 38', 'Oulu', '90110', 'Finland'),
  ( 'Paul Henriot', '2, rue du Commerce', 'Reims', '51100', 'France'),
  ( 'Helvetius Nagy', '722 DaVinci Blvd.', 'Kirkland', '98034', 'USA'),
  ( 'Karin Josephs', 'Luisenstr. 48', 'Butte', '59801', 'USA');

```

**Bước 2:** chúng ta  tạo một file **index.php** để thiết lập một giao diện cho người dùng.
```html
<html>
 <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Tìm Kiếm Live với Ajax</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
<script src="action.js "></script>
 </head>
 <body>
  <div class="container">
   <br />
   <h2 align="center">Ajax Live Data Search using Jquery PHP MySql</h2><br />
   <div class="form-group">
    <div class="input-group">
     <span class="input-group-addon">Search</span>
     <input type="text" name="search_text" id="search_text" placeholder="Search by Customer Details" class="form-control" />
    </div>
   </div>
   <br />
   <div id="result"></div>
  </div>
 </body>
</html>
```
**Bước 3 :** các bạn tạo một file Js để xử lý ajax có tên là **action.js**

```javascript
$(document).ready(function(){
 function load_data(query){
  $.ajax({
   url:"fetch.php",
   method:"POST",
   data:{query:query},
   success:function(data) {
    $('#result').html(data);
   }
  });
 }
 $('#search_text').keyup(function(){
  var search = $(this).val();
  if(search != ''){
   load_data(search);
  } else{
   load_data();
  }
 });
});
```
**Bước 4 :** bạn tạo một file **fetch.php** để nhận yêu cầu từ clien và xử lý yêu cầu và trả về kết quả sau khi truy vấn vào CSDL.
```php
<?PHP
$connect = mysqli_connect("localhost", "root", "", " ajax-live-search-data ");
$output = '';
if(isset($_POST["query"])){
 $search = mysqli_real_escape_string($connect, $_POST["query"]);
 $query = "
  SELECT * FROM tbl_customer 
  WHERE CustomerName LIKE '%".$search."%'
  OR Address LIKE '%".$search."%' 
  OR City LIKE '%".$search."%' 
  OR PostalCode LIKE '%".$search."%' 
  OR Country LIKE '%".$search."%'
 ";
}else{
 $query = "
  SELECT * FROM tbl_customer ORDER BY CustomerID
 ";
}
$result = mysqli_query($connect, $query);
if(mysqli_num_rows($result) > 0){
 $output .= '
  <div class="table-responsive">
   <table class="table table bordered">
    <tr>
     <th>Customer Name</th>
     <th>Address</th>
     <th>City</th>
     <th>Postal Code</th>
     <th>Country</th>
    </tr>
 ';
 while($row = mysqli_fetch_array($result)){
  $output .= '
   <tr>
    <td>'.$row["CustomerName"].'</td>
    <td>'.$row["Address"].'</td>
    <td>'.$row["City"].'</td>
    <td>'.$row["PostalCode"].'</td>
    <td>'.$row["Country"].'</td>
   </tr>
  ';
 }
 echo $output;
}
else{
 echo 'Data Not Found';
}

?>

```
**Kết quả cuối cùng chúng ta nhận được**.
![](https://images.viblo.asia/04c33ba0-6869-4032-a071-32eb132ee2dd.png)
 
## 3. LỜI KẾT
Quá trình hoạt động của Ajax diễn ra ở 2 giai đoạn:
Client sẽ gửi một request theo dạng bất đồng bộ (Asynchronous) tới server. Được gọi là bất đồng bộ là bởi vì trang web trên trình duyệt vẫn duy trì hoạt động như bình thường cho tới khi Server nhận được request từ phía client và trả về kết quả cho client. Lúc này trình duyệt sẽ cập nhật nội dung trang web dựa trên kết quả trả về.
Như vậy bạn có thể thấy được toàn bộ quá trình hoạt động của Ajax không làm gián đoạn sự hiển thị hay tương tác của trang web vào trước và trong thời gian trình duyệt gửi Ajax request tới server. Chính tính năng này sẽ giúp tăng trải nghiệm của người dùng và đồng thời tối ưu hóa tài nguyên trên server.