# **1.Lời nói đầu**
Nếu như bạn là một lập trình viên chuyên nghiệp thì việc tối ưu các đoạn code, script mà tự mình viết ra là một điều vô cùng quan trọng.Vì vậy trong bài viết này mình sẽ chia sẻ với các bạn cách để tối ưu hóa code trong lập trình php

![](https://images.viblo.asia/28558a62-892c-44d3-9988-5b7fae6db31d.png)
# **2.Tại sao tối ưu hóa code lại quan trọng ?**
Viết mã tốt là bước đầu tiên thiết yếu để tạo các ứng dụng PHP nhanh và ổn định. Thực hiện theo những thói quen tốt nhất này ngay từ đầu sẽ tiết kiệm thời gian xử lý sự cố sau này.

* ### Take Advantage of Native PHP Functions
    Hãy cố gắng tận dụng các hàm riêng của **PHP** (sort, random,...) thay vì tự viết các hàm của riêng bạn để đạt được kết quả tương tự. Dành thời gian để tìm hiểu cách sử dụng các hàm riêng, các thư viện của **PHP** không chỉ giúp bạn viết mã nhanh hơn mà còn giúp nó hiệu quả hơn.
* ### Use JSON Instead of XML
    Hãy dùng Json thay vì XML trong những rest API hay web service. Bởi đơn giản Json được PHP hỗ trợ nhiều function như là **json_encode**, **json_decode** rất nhanh. Còn nếu dùng XML bạn sẽ phải đọc XML dùng regular expression để parse ra lại, rất tốn thời gian!
* ### Cash in on Caching Techniques
    [Memcache](http://php.net/manual/en/book.memcache.php) đặc biệt hữu ích để giảm tải cơ sở dữ liệu của bạn trong khi các công cụ lưu trữ bộ đệm tạm thời như APC hoặc OPcache rất tốt để tiết kiệm thời gian thực hiện khi tập lệnh được biên dịch, giúp tăng tốc và tối ưu hệ thống.
* ### Cut Out Unnecessary Calculations
    Khi sử dụng cùng một giá trị của một biến nhiều lần, hãy tính toán và gán giá trị ở đầu thay vì thực hiện các phép tính cho mỗi lần sử dụng.
    
    `$max = count($idArr);
for( $i=0; i< $max; $i++){
    //do something
}`
    
* ### Use isset( )
    So với Count (), strlen () và sizeof (), **isset** () là cách nhanh hơn và đơn giản hơn để xác định xem giá trị có lớn hơn 0 hay không.
* ### Turn Off Debugging Notifications
    Nên tắt thông báo khi sản phẩm đã được xuất bản vì thông báo lỗi sẽ được ghi thường xuyên ra log, gây ra giảm tốc độ, tốn kém tài nguyên và không tốt chút nào cho hệ thống.
* ### Close Database Connections
    Hãy unset các biến không dùng tới hoặc close connection của database khi thực hiện tác vụ để tránh lãng phí bộ nhớ.
* ### Limit Your Database Hits
    Đừng cố truy vấn database nhiều lần trong khi công việc của bạn chỉ cần 1 lần
, điều này sẽ khiến mọi thứ chạy chậm hơn.
```
$con=mysqli_connect("localhost","username","somepassword","anydb");
if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL" ;
mysqli_connect_error(); 
}
 
function insertValues( $val ){
// Creating query for inserting complete array in single execution.
$query= " INSERT INTO tableX(someInteger) VALUES .implode(',', $val)"; 
mysqli_query($con, $query);
}
 
$data = array();
for( $i =0; $i<99; $i++){
// Creating an array of data to be inserted.
$data[ ] = '(" ' . $i. '")' ;
}
// Inserting the data in a single call
insertValues( $data );
// Closing the connection as a best practice
mysqli_close($con);
```
* ### Use the Strongest Str Functions
    Trong khi **str_replace** nhanh hơn **preg_replace**, thì hàm strtr nhanh hơn bốn lần so với str_replace.
* ### Stick With Single Quotes
    Nếu có thể, hãy sử dụng dấu ngoặc đơn thay vì dấu ngoặc kép, vì dấu ngoặc kép kiểm tra các biến, gây giảm hiệu suất của hệ thống.
* ### Stick With Single Quotes
    Nếu bạn dùng === để so sánh, thì phạm vi kiểm tra sẽ hẹp lại cho tốc độ thực thi nhanh hơn.
# **3.Kết Luận**
Trong những năm gần đây, PHP đã trở thành một trong những ngôn ngữ phổ dụng nhất trong lập trình web php. Ưu điểm của PHP là mã nguồn mở, miễn phí và không yêu cầu cấu hình hệ thống máy chủ cao. Tuy nhiên, PHP có một số điểm yếu, một trong số đó là tốc độ. Dù vậy, nếu mã nguồn được viết hợp lí, sử dụng PHP bạn hoàn toàn có thể tạo được ứng dụng chạy với tốc độ vượt trội.