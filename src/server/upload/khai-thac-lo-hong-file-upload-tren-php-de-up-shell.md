# 1.Giới thiệu
Trong thực tế chúng ta bắt gặp rất nhiều trang web cho phép chúng ta upload file từ máy lên. Đơn giản như upoad hình nền làm avatar hoặc gửi file video các thứ. Tuy nhiên nếu chúng ta không đảm bảo file upload lên được kiểm soát chặt chẽ, hacker rất có thể sẽ sử dụng các shell giả mạo dưới dạng file ảnh nhằm thực thi mã và chiếm quyền điều khiển. Bài viết này sẽ chỉ cho bạn 1 vài cách khai thác cơ bản khi đầu vào kiểm soát chưa được chặt chẽ. Vậy let's go.
# 2.Các cách khai thác
### a. Khai thác cơ bản
Đầu tiên cũng là đơn giản nhất. Đó là trang web tin tưởng hoàn toàn vào người dùng và không có bất kỳ biện pháp bảo vệ nào. Ta sẽ code 1 trang web đơn giản nhằm upload file như sau:
       ![](https://images.viblo.asia/7f222732-8445-4a5c-bc13-79179a746e1f.png)
       
Phần code php khi không có sự kiểm soát đầu vào sẽ có dạng:
    
   ![](https://images.viblo.asia/05829914-dbf6-4b56-8889-a5468e0ace05.png)

Giao diện trang web sẽ cho ta 1 chỗ để upload file:
![](https://images.viblo.asia/b090a01c-9ea4-4934-81d9-2008515f2869.png)

Sau khi upload thì file được lưu vào địa chỉ ./uploads/file_name. Ta sẽ thử gửi lên 1 ảnh 1 bất kỳ là test.jpg. Sau khi gửi lên thành công, ta có thể vào ./uploads/test.jpg để xem trực tiếp ảnh:

![](https://images.viblo.asia/4b254fa3-7c46-4a07-b5c8-9dc05eab436a.png)

Như vậy là upload thành công.Bây giờ ta sẽ thử up shell php lên, ở đây mình sử dụng tool pony shell để up: 

![](https://images.viblo.asia/f4d4395e-60b9-43b3-bf06-6f2940aacb11.png)

Sau khi upload và chạy ./uploads/shell.php thì đã vào được bảng terminal, tại đây ta có thể khai thác để chạy lệnh linux, từ đó lấy được thông tin:

![](https://images.viblo.asia/f501cade-44a7-49c5-a734-a3986570c43c.png)

### b.Bypass MMI-Type
Tiếp đến các trang web có thể giới hạn định dạng file, gọi là  MMI file extension. Ta sẽ thêm 1 đoạn code như sau vào trang trước:
![](https://images.viblo.asia/2a4afc27-bb60-4d8c-9e1b-349100c57aa2.png)

Đoạn code trên sẽ sử dụng `_FILES['userfile']['type']` để lấy file extension. Sau đó sử dụng hàm in_array để chỉ cho phép các file dạng jpg, gif và png. Ta thử up shell lên thì xuất hiện lỗi:

![](https://images.viblo.asia/ea27cb95-d1b6-4271-91d6-80846e1d30fd.png)

Đến đây ta sẽ sử dụng burpsuite để khai thác. Bắt request bằng burpsuite ta được:

![](https://images.viblo.asia/3fe91db0-57e6-4299-9198-67e03a263fb8.png)

Do file ta up lên là file php nên tại phần header sẽ có dạng `Content-Type: application/x-php`. Với đoạn code trên thì trang sẽ chỉ check xem Content-type có đúng định dạng hay không, còn không kiểm tra nội dung bên trong. Nên ta chỉ cần đổi `Content-type`cho phù hợp với file ảnh là được, ở đây ta sẽ dùng `Content-Type: image/jpeg`:
![](https://images.viblo.asia/cd656f97-e407-457e-90a4-829aca796f2d.png)
![](https://images.viblo.asia/3ad1621a-d969-4632-83a2-0dc2443a799a.png)

Vậy là upload thành công.

### c. Bypass getimagesize()

Hàm getimagesize () sẽ đọc 1 lượng byte ban đầu nhất định nhằm xác định xem về định dạng file, chiều rộng cũng như chiều cao của file. Đoạn code sẽ được thêm như sau:
![](https://images.viblo.asia/f362dbc2-511b-44cb-9804-c2cd0497934b.png)

Để bypass thì ta sẽ chỉnh sửa phần đầu của file php để hàm check sẽ nghĩ là file ảnh. Hoặc ta chỉ cần thêm đoạn `GIF89a` vào trước shell là được. Khi đó hàm sẽ check đây là 1 file gif. Thử kết hợp 2 lỗi trên và khai thác, sử dụng burpsuite để bắt và thay đổi content-type, sau đó thêm vào đầu đoạn shell `GIF89a` ta được:
![](https://images.viblo.asia/034a5ccf-ae06-4c83-985e-567f1449a424.png)
![](https://images.viblo.asia/5e0e1756-652e-47e9-82d5-a36dd0197676.png)

Vậy là upload thành công. Khá tiếc là cái pony shell sử dụng cách này lại không chạy được, Bạn có thể sử dụng các shell khác như mini shell hoặc r57 shell đều được.
### d. Bypass pathinfo()
Hàm pathinfo() sẽ lấy thông tin về đường dẫn truyền vào:
![](https://images.viblo.asia/6a3e3795-a83c-4acd-b5ef-0d497cc3bd12.png)

Extension sẽ được check bởi đoạn sau dấu chấm cuối cùng. Ví dụ shell.php.jpg thì hàm pathinfo() sẽ check đây là 1 file jpg. Tuy nhiên nếu ta để như thế thì khi truyền url đoạn chứa shell vào sẽ không chạy được. Đến đây ta có 1 cách để khai thác. Đó là sử dụng null byte %00, hiểu đơn giản thì ta sẽ để file dạng `shell.php%00.jpg` hoặc `shell.php/x00.jpg` . Khi đó hàm sẽ hiểu là file ảnh. Tuy nhiên khi thực hiện upload ảnh thì đoạn sau `%00` sẽ bị xóa mất, nên file trở lại thành shell.php và thực hiện khai thác bình thường. Tuy nhiên lỗi này đã được sửa từ phiên bản php 5.3.4 trở đi.
### e. Một vài cách khai thác khác
   -  Bên cạnh những cách khai thác trên. Đôi khi trang sẽ loại bỏ các file php bằng cách đưa các ký tự không cho phép vào blacklist. Thì ta có thể bypass bằng các sử dụng những đuôi như .Php, PhP, PHP5, php1, php2 vv.  
   -  Một vài trang web sẽ chỉ cho phép ta upfile với 1 dung lượng rất nhỏ. Khi đó ta chỉ có thể khai thác bằng cách sử dụng các shell đơn giản, ví dụ: `<?system($_GET[0]);`
 
# 3.Cách khắc phục
- Trên đây là 1 vài cách trang web xử lý check file upload đi kèm với cách khai thác cơ bản.
- Có rất nhiều cách để 1 trang web có thể khắc phục điều này. Với mình thì cách hay nhất là check xem nó thuộc file gì sau đó ta có thể thay đổi tên và fix cứng định dạng cho nó. Còn nếu file đó không nằm trong các định dạng cho phép thì sẽ bị bỏ qua và không cho upload.
![](https://images.viblo.asia/5d16c092-d656-47d3-b608-95a5bbacf26a.png)


Up file lên sẽ được:
![](https://images.viblo.asia/b808731f-c978-4fe1-9508-db26630b5401.png)

Như vậy thì dù kẻ tấn công có vượt qua và up shell lên được thì vẫn không thể thực thi được lệnh do đã bị đổi định dạng sang file ảnh.