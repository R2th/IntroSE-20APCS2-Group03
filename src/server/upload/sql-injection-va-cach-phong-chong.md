Xin chào các bạn, hôm nay mình sẽ chia sẻ cho các bạn hiểu SQL Injection là gì và tại sao nó lại nguy hiểm!

**1) Tại sao SQL Injection lại “Nguy hiểm”?**
-

**SQL Injection** là một kỹ thuật lợi dụng những lỗ hổng về câu truy vấn lấy dữ liệu của những website không an toàn trên web, đây là một kỹ thuật tấn công rất phổ biến và sự thành công của nó cũng tương đối cao.

Đọc qua thì các bạn cũng hiểu sơ sơ rồi phải không nào, giờ mình sẽ một vài lý do đã tạo nên tên tuổi lừng lẫy của  **SQL Injection**:

* Có thể gây ra những thiệt hại khổng lồ. Với SQL Injection, hacker có thể truy cập một phần hoặc toàn bộ dữ liệu trong hệ thống.
* Lỗ hổng này rất nổi tiếng, từ developer đến hacker gần như ai cũng biết. Ngoài ra, còn có 1 số tool tấn công SQL Injection cho dân “ngoại đạo”, những người không biết gì về lập trình.
* Rất nhiều ông lớn từng bị dính – Sony, Microsoft UK. Mọi vụ lùm xùm liên quan tới “lộ dữ liệu người dùng” ít nhiều đều dính dáng tới SQL Injection.

Dễ tấn công, phổ biến, gây ra hậu quả nghiêm trọng, đó là lý dó Inject (Không chỉ SQL mà OS và LDAP) nằm chễm chễ ở vị trí đầu bảng trong top 10 lỗ hỗng bảo mật của OWASP. Tất nhiên là XSS, CSRF, và không mã hoá dữ liệu cũng nằm trong list này nốt.

**Hậu quả của SQL Injection**

* Hậu quả lớn nhất mà SQL Injection gây ra là: Làm lộ dữ liệu trong database. Tuỳ vào tầm quan trọng của dữ liệu mà hậu quả dao động ở mức nhẹ cho đến vô cùng nghiêm trọng.
* Lộ dữ liệu khách hàng có thể ảnh hưởng rất nghiêm trọng đến công ty. Hình ảnh công ty có thể bị ảnh hưởng, khách hàng chuyển qua sử dụng dịch vụ khác, dẫn đến phá sản v…v...
* Lỗ hỗng này cũng ảnh hưởng lớn đến khách hàng. Do họ thường dùng chung một mật khẩu cho nhiều tài khoản, chỉ cần lộ mật khẩu một tài khoản thì các tài khoản khác cũng lộ theo.
* Đây cũng là lý do mình nhắc nhở phải mã hoá mật khẩu, nếu database có bị tấn công thì người dùng cũng không bị mất mật khẩu. (Đây là lý do vietnamwork bị ăn chửi vì không mã hoá mật khẩu).

    ![](https://images.viblo.asia/1547e613-b670-44ec-b046-a98df7eece31.jpg)
    
* Trong nhiều trường hợp, hacker không chỉ đọc được dữ liệu mà còn có thể chỉnh sửa dữ liệu. Lúc này hacker có thể đăng nhập dưới vai trò admin, lợi dụng hệ thống, hoặc xoá toàn bộ dữ liệu để hệ thống ngừng hoạt động.

**2) Tấn công SQL Injection như thế nào?**
-
Cơ chế SQL Injection vô cùng đơn giản. Ta thường sử dụng câu lệnh SQL để truy cập dữ liệu. Giả sử, muốn tìm đăng nhập user, ta thường viết code như sau:

```
var username = request.username; // GiangLeLe

var password = request.password; // 12345678

var sql = "SELECT * FROM Users WHERE Username = '" + username + "' AND Password = '" + password + "'";

// SELECT * FROM Users WHERE Username = 'GiangLeLe' AND Password = '12345678' 
```

Đoạn code trên đọc thông tin nhập vào từ user và cộng chuỗi để thành câu lệnh SQL.
Để thực hiện tấn công, Hacker có thể thay đổi thông tin nhập vào, từ đó thay đổi câu lệnh SQL .

```
var password = request.password; // ' OR '' = ''

var sql = "SELECT * FROM Users WHERE Username = '" + username + "' AND Password = '" + password + "'";

// SELECT * FROM Users WHERE Username = 'GiangLeLe' AND Password = '' OR '' = ''  
// Câu SQL này luôn cho kết quả true
```

Hacker có thể thông qua SQL Injection để dò tìm cấu trúc dữ liệu (Gồm những table nào, có những column gì), sau đó bắt đầu khai thác dữ liệu bằng cách sử dụng các câu lệnh như UNION, SELECT TOP 1…

Như mình đã nói SQL Injection rất phổ biến, bạn có thể dễ dàng google để tìm kiếm những bài viết liên quan tới nó. Do vậy, mình chỉ tóm tắt sơ về cơ chế tấn công.

Các bạn tự tìm hiểu thêm qua các ví dụ ở bài viết này nhé: [http://expressmagazine.net/development/1512/tan-cong-kieu-sql-injection-va-cac-phong-chong-trong-aspnet](http://expressmagazine.net/development/1512/tan-cong-kieu-sql-injection-va-cac-phong-chong-trong-aspnet)

**3) Cách phòng chống**
-
May thay, mặc dù SQL rất nguy hại nhưng cũng dễ phòng chống. Gần đây, hầu như chúng ta ít viết SQL thuần mà toàn sử dụng ORM (Object-Relational Mapping) framework. Các framework web này sẽ tự tạo câu lệnh SQL nên hacker cũng khó tấn công hơn.

Tuy nhiên, có rất nhiều site vẫn sử dụng SQL thuần để truy cập dữ liệu. Đây chính là mồi ngon cho hacker. Để bảo vệ bản thân trước SQL Injection, ta có thể thực hiện các biện pháp sau.

* **Lọc dữ liệu từ người dùng:** Cách phòng chống này tương tự như XSS. Ta sử dụng filter để lọc các kí tự đặc biệt (; ” ‘) hoặc các từ khoá (SELECT, UNION) do người dùng nhập vào. Nên sử dụng thư viện/function được cung cấp bởi framework. Viết lại từ đầu vừa tốn thời gian vừa dễ sơ sót.
* **Không cộng chuỗi để tạo SQL:** Sử dụng parameter thay vì cộng chuỗi. Nếu dữ liệu truyền vào không hợp pháp, SQL Engine sẽ tự động báo lỗi, ta không cần dùng code để check.
* **Không hiển thị exception, message lỗi:** Hacker dựa vào message lỗi để tìm ra cấu trúc database. Khi có lỗi, ta chỉ hiện thông báo lỗi chứ đừng hiển thị đầy đủ thông tin về lỗi, tránh hacker lợi dụng.
* **Phân quyền rõ ràng trong DB:** Nếu chỉ truy cập dữ liệu từ một số bảng, hãy tạo một account trong DB, gán quyền truy cập cho account đó chứ đừng dùng account root hay sa. Lúc này, dù hacker có inject được sql cũng không thể đọc dữ liệu từ các bảng chính, sửa hay xoá dữ liệu.
* **Backup dữ liệu thường xuyên:** Các cụ có câu “cẩn tắc vô áy náy”. Dữ liệu phải thường xuyên được backup để nếu có bị hacker xoá thì ta vẫn có thể khôi phục được. Còn nếu cả dữ liệu backup cũng bị xoá luôn thì … chúc mừng bạn, update CV rồi tìm cách chuyển công ty thôi!

**4) Kết Luận**

Dữ liệu là một trong những thứ “đáng tiền” nhất trong website của bạn. Sau khi đọc xong bài viết này, hãy kiếm tra lại xem trang của mình có thể bị tấn công SQL Injection hay không, sau đó áp dụng những phương pháp mình đã hướng dẫn để fix.

Bạn nào từng bị tấn công bởi SQL Injection, hoặc có kinh nghiệm gì về phòng chống nó, hãy chia sẻ trong phần comment nhé!

Nguồn tham khảo:

* [https://freetuts.net/ky-thuat-tan-cong-sql-injection-va-cach-phong-chong-trong-php-107.html]()
* [https://toidicodedao.com/2016/11/15/lo-hong-sql-injection-than-thanh/]()
* [http://expressmagazine.net/development/1512/tan-cong-kieu-sql-injection-va-cac-phong-chong-trong-aspnet]()