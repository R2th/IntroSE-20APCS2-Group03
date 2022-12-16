## 1. Định nghĩa
   *The Lightweight Directory Access Protocol* (LDAP) được sử dụng để lưu trữ thông tin về người dùng, máy chủ lưu trữ và nhiều đối tượng khác. LDAP injection là một cuộc tấn công về phía máy chủ, nơi có thể cho phép các thông tin nhạy cảm về người dùng và máy chủ được thể hiện trong một cấu trúc LDAP được tiết lộ, sửa đổi hoặc thêm mới. Điều này được thực hiện bằng cách thao tác với các tham số đầu vào sau đó được chuyển đến các chức năng tìm kiếm nội bộ, thêm và sửa đổi.

Một ứng dụng Web có thể sử dụng LDAP trong việc cho phép người dùng xác thực hoặc tìm kiếm thông tin các người dùng khác trong cơ cấu công ty. Mục tiêu của các cuộc tấn công LDAP injection là để tiêm vào bộ lọc siêu ký tự trong LDAP tìm kiếm trong một truy vấn sẽ được thực thi bới ứng dụng.

[Rfc2254] định nghĩa một cấu trúc về cách xây dựng một bộ lọc tìm kiếm trên LDAPv3 và kế thừa [Rfc1960] (LDAPv2). 

## 2. Các kí hiệu của điều kiện Boolean
   Một bộ lọc tìm kiếm LDAP được xây dựng dựa trên ký hiệu Ba Lan, còn được biết đến dưới tên các kí hiệu tiền tố (prefix notation). Điều này có nghĩa rằng một điều kiện mã giả trong bộ lọc tìm kiếm như sau:
   
`find(“cn=John & userPassword=mypass”)`

   Sẽ được hiển thị như sau:
   
`find(“(&(cn=John)(userPassword=mypass))”)`
    
   Các điều kiện Boolean và tập hợp nhóm trên bộ lọc tìm kiếm LDAP có thể được áp dụng bằng cách sử dụng các siêu ký tự sau:
![](https://images.viblo.asia/23715f19-1f47-4e5d-bc76-3638c366903e.png)
## 3.Một số ví dụ
**Ví dụ 1: Bộ lọc tìm kiếm**
    Khi chúng ra có một ứng dụng Web sử dụng bộ lọc tìm kiếm như sau: 
    
`searchfilter=”(cn=”+user+”)”`

   Được khởi tạo bởi HTTP request như sau:
   
`http://www.example.com/ldapsearch?user=John`

   Nếu giá trị “John” được thay thế bới kí tự “*” bằng việc gửi đi request:
   
`http://www.example.com/ldapsearch?user=*`

bộ lọc sẽ như sau: 

`searchfilter=”(cn=*)”`

   Hệ thống sẽ tìm tất cả các đối tượng có thuộc tính “cn”
    
   Nếu ứng dụng tồn tại lỗ hổng LDAP injection, thì nó sẽ hiển thị một vài hoặc tất cả thuộc tính của người dùng, tùy thuộc vào các luồng mà ứng dụng đó thực thi và quyền của người dùng đã kết nối tới LDAP.
  
  Tester có thể sử dụng “trial and error approach” (cách thức tiếp cận và giải quyết vấn đề bằng cách thử hàng loạt các phương pháp khác nhau, tìm hiểu và tìm ra giải pháp từ cách lỗi gặp phải trong quá trình thử), bằng cách thêm các tham số ‘(‘, ‘|’, ‘&’, ‘*’ và các kí tự khác để kiểm tra được các lỗi của ứng dụng.

**Ví dụ 2: Đăng nhập**
    
   Nếu một ứng dụng Web sử dụng LDAP để kiểm tra các thông tin đăng nhập của người dùng trong suốt tiến trình đăng nhập và nó dễ bị tác động bởi LDAP injection, điều đó có khả năng sẽ vượt qua được quá trình xác thực với các câu truy vấn LDAP luôn luôn đúng (một cách đơn giản đối với SQL và XPATH injection).
Hãy thử với một ứng dụng Web sử dungh bộ lọc kiểm tra cặp giá trị LDAP user/password.

`searchlogin=“(&(uid=”+user+”)(userPassword={MD5}”+base64(pack(“H*”,md5(pass)))+”))”;`

   Bằng cách sử dụng các giá trị sau:

`user=*)(uid=*))(|(uid=* pass=password`

   Kết quả của bộ lọc tìm kiếm sẽ trả về như sau:
   
`searchlogin=”(&(uid=*)(uid=*))(|(uid=*)(userPassword={MD5} X03MO1qnZdYdgyfeuILPmQ==))”;`

Điều này là chính xác và luôn luôn đúng. Bằng cách này, tester sẽ thu được thông báo đã đăng nhập với vai trò là người dùng đầu tiên trong  LDAP.

## 4. **Kết luận**
Việc khai thác thành công lỗ hổng LDAP injection có thể cho phép:
-	Truy cập trái phép vào các tài liệu
-	Tránh đươc các hạn chế của ứng dụng 
-	Thu thập các thông tin trái phép
-	Thêm hoặc sửa đổi các đối tượng bên trong cấu trúc cây LDAP

## 5.Tài liệu tham khảo
•	Sacha Faust: “LDAP Injection: Are Your Applications Vulnerable?” - http://www.networkdls.com/articles/ldapinjection.pdf 

•	Bruce Greenblatt: “LDAP Overview” - http://www.directory-applications.com/ldap3_files/frame.htm 

•	IBM paper: “Understanding LDAP” - http://www.redbooks.ibm.com/redbooks/SG244986.html 

•	RFC 1960: “A String Representation of LDAP Search Filters” - http://www.ietf.org/rfc/rfc1960.txt