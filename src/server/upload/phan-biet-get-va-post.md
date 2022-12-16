# Get và Post
----
<p>Thông thường khi chúng ta truy cập vào một Website nào đó thì trang Web đó sẽ sử dụng GET để thực hiện truy cập. Vì vậy chúng ta có thể coi GET là phương thức căn bản cho việc truy cập một Website nào đó. Mặt khác, POST là phương thức thường được sử dụng để gửi form.<br>

Khi dùng GET, *dù có truy cập từ bất kỳ đâu, truy cập như thế nào thì đều trả về kết quả hiển thị giống nhau.*<br> 
Ngược lại, đối với POST thì *kết quả trả về sẽ phản ánh lại đúng tình trạng của thời điểm truy cập.*<br>
Khi Reload lại màn hình gửi form của POST thì trang web sẽ luôn nhảy ra màn hình cảnh báo với nội dung đại loại như "Bạn có muốn gửi lại form không ?". </p>

# So sánh
<hr>
<h3>Giống nhau:</h3> Đều là phương thức của HTTP.<br>
Được dùng khi truy cập vào trang web và gửi dữ liệu về server.

<h3>Khác nhau:</h3><br>


 | GET | POST|
 | -------- | -------- |
 | - Luôn trả về kết quả giống nhau bất kể<br> thời điểm truy cập là lúc nào | - Kết quả trả về sẽ khác nhau tùy thuộc<br>vào thời điểm truy cập.    |
 |-  Thông tin sẽ bị lộ sau dấu '?' trên đường dẫn URL<br> => Kém an toàn | - Thông tin luôn được ẩn, không hiện lên URL<br>=> An toàn hơn GET|
 |Tốc độ truy cập nhanh| Tốc độ truy cập chậm hơn GET|
 |Có thể cached và lưu Bookmark được| Không cached và lưu Bookmark được|
 |Chỉ gửi được data dưới dạng ký tự ASCII | Gửi được data dưới nhiều dạng, kể cả dạng nhị phân   |
 
 # Minh họa
 -----

 <h4>GET method</h4>
 
 ![image.png](https://images.viblo.asia/e302ac99-fb4c-4bae-8f76-dedb19ba6a91.png)
 
 Dù truy cập vào bất kỳ thời gian nào hay từ nhiều browser khác nhau thì kết quả trả về của GET đều giống nhau (đều trả về kết quả A).<br><br><br>
 
 <h4>POST method</h4>
 
 ![image.png](https://images.viblo.asia/7aed959a-e43b-4aff-80ec-952b5873829e.png)
 
 Dùng POST thì thời điểm truy cập khác nhau sẽ trả về kết quả khác nhau (có lúc Website sẽ trả về kết quả A, kết quả B hoặc kết quả C tùy thuộc vào thời điểm truy cập).
 
 <h2>Nguồn tham khảo :</h2>
1.  Sách Ruby on Rails 5 超入門, tác giả  掌田津耶乃, xuất bản 5/2017, trang 91-92