# Session:
- Là phiên làm việc để lưu trữ 1 biến và biến đó có thể tồn tại từ trang này đến trang khác(cùng tên miền)
- Session được lưu trữ trên server
- Thời gian sống của nó sẽ kết thúc khi ta xoá nó hoặc hết tuổi thọ (tắt trình duyệt)

## Cách làm việc của session
- Khi Session được tạo ra, php tạo 1 định danh duy nhất cho session đó, định danh này là chuỗi ký tự ngẫu nhiên của 32 số hexa.<br>
    + Ví dụ như: `3c7foj34c3jj973hjkop2fc937e3443`<br>
- Khi đó 1 cookies được gọi là PHPSESSID sẽ được tự động gửi đến máy người dùng để lưu trữ chuỗi định danh session duy nhất ở trên<br>
- Một file được tự động tạo và lưu trên server trong 1 thư mục tạm thời đã được chỉ định và nó mang tên của định danh duy nhất và được bắt đầu bằng sess_.<br>
    + Ví dụ: `sess_3c7foj34c3jj973hjkop2fc937e3443`
    + Hình ảnh minh hoạ:<br>
        ![](https://images.viblo.asia/1fa8877e-b4ee-42dd-91d8-b49cfdbae958.png)
## Sử dụng session<br>
- Để sử dụng session trước tiên chúng ta cần sử dụng hàm:
    ```php
        session_start();
    ```
- Khởi tạo 1 session trong PHP ta dùng: <br>
    ```php
        $_SESSION['session_name'] = 'session_value';
    ```
- Sử dụng session: 
     ```php
         $_SESSION['session_name'];
     ```
- Huỷ 1 session:  
    ```php
        unset($_SESSION['session_name']);
    ```
- Xoá bỏ hết tất cả session: 
    ```php
        session_destroy();
    ```
# Cookies<br>
- Cookies là 1 phần dữ liệu được lưu trên máy khách, mỗi khi máy khách yêu cầu đến máy chủ nào đó, thì nó sẽ gửi phần dữ liệu được lưu trong cookies tương ứng tới máy chủ đó<br>
- Một cookies có độ lớn giới hạn bởi trình duyệt là 4kb<br>
- Browsers giới hạn số cookies lưu trữ trên 1 server là khoảng 50 cookies<br>
### Cookie có một số thông số như sau:<br> 
- **setcookie(name, value, time, path, domain, security);**<br>
    + name: tên của biến cookies (bắt buộc)<br>
    + value: value của cookies<br>
    + time: thời gian sống của cookies<br>
    + path: thư mục mà cookies có hiệu lực<br>
    + domain: tên miền mà cookies có hiệu lực<br>
    + security: Nếu là 1 thì cookies chỉ được gửi bằng đường dẫn an toàn HTTPS, nếu là 0 thì cookies có thể gửi bằng HTTP thông thường<br>
## Xác định người dùng với cookies<br>
- Với Cookies, có 3 bước để xác định người dùng cũ:<br>
	+ Server gửi 1 tập tin bao gồm thông tin của người dung(tên, tuổi, ....)<br>
	+ Trình duyệt sẽ lưu lại trên local để sử dụng trong tương lai<br>
	+ Khi trình duyệt gửi bất cứ request nào đến server thì nó sẽ gửi luôn thông tin của cookies đó lên server và server đó sẽ sử dụng thông tin đó để xác thực người dùng này<br>
    - Hình ảnh minh hoạ:
        ![](https://images.viblo.asia/ff3cbce3-16f7-482f-8834-db166961a610.jpg)
        
### Thao tác với cookies<br>
- Sử dụng Cookies: 
    ```php
        $_COOKIE['cookie_name'];
    ```
- Để xoá 1 cookies ta chỉ cần set thời gian sống của nó sang giá trị âm lớn hơn hoặc bằng giá trị sống lúc ban đầu thiết lập:<br>
    Ví dụ: 
    ```php
        setcookie("username", "", time()-3600);
    ```
# So sánh session và cookies<br>


|                | Session             | Cookies |
| --------       | --------            | -------- |
| Vị trí lưu     | Lưu trên server     | Lưu trên trình duyệt của client     |
| Bảo mật        | Session lưu trên server nên bảo mật hơn | Cookie lưu dưới client nên kém bảo mật hơn|
| Giới hạn       | Lưu không giới hạn  | Lưu có giới hạn |<br>
# Vậy sử dụng Session hay cookies?<br>
- Session có thêm 1 ưu điểm nữa là: Nếu trình duyệt từ chối lưu trữ cookies chúng ta vẫn có thể truyền session từ trang này sang trang khác thông qua url: ví dụ: test.php?session=abc <br>
Vậy với session và cookies thì ta nên sử dụng gì?<br>
- Câu trả lời là còn tuỳ vào ý đồ của lập trình viên.


    + Nếu cần lưu những thông tin bảo mật thì nên dùng session


    + Nếu muốn gửi dữ liệu nhanh và không cần bảo mật cao thì nên dùng cookies

<br>

# Trên đây là một số vấn đề về session và cookies
- Rất cám ơn các bạn đã đọc và rất mong giúp các bạn biết thêm về session và cookies.
<br>
<br>
**Xin chân thành cảm ơn!**