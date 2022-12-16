## Giới thiệu
Hiện nay có 2 cơ chế bảo mật chính trong các web server hiện tại.

**Access Control Lists (ACLs)**:  Trên máy chủ thì người dùng chỉ được phép truy cập vào các thư mục, file mà quản trị viên đã chỉ định từ trước gọi là Access Control Lists.

**Root Directory**: Là thư mục chứa tất cả các thư mục khác hoặc cũng có thể chứa các files.

Path traversal thực hiện quyền truy cập vào các thư mục nhạy cảm hoặc bị hạn chế truy cập.
## Path traversal là gì?
- Path traversal( hay còn gọi là Directory traversal) là một lỗ hổng web cho phép kẻ tấn công đọc các file không mong muốn trên server. Nó dẫn đến việc bị lộ thông tin nhạy cảm của ứng dụng như ` thông tin đăng nhập ` , một số ` file hoặc thư mục ` của hệ điều hành. Trong một số trường hợp cũng có thể ghi vào các `files` trên server, cho phép kẻ tấn công có thể thay đổi dữ liệu hay thậm chí là `chiếm quyền điều khiển server`.

## Ví dụ về cách tấn công.
- Một ứng dụng load ảnh như sau:
```html
<img src="/?filename=test_image.png">
```


- Khi chúng ta gửi một request với một param `filename=test_image.png` thì sẽ trả về nội dung của file được chỉ định với tệp hình ảnh ở `/var/www/images/test_image.png`.
- Ứng dụng không thực hiện việc phòng thủ cuộc tấn công `path traversal`, kẻ tấn công có thể thực hiện một yêu cầu tùy ý để có thể đọc các file trong hệ thống.
    - ví dụ:
        ```HTTP
        https://hostname.abc/?filename=../../../etc/passwd
        ```
        - Khi đó ứng dụng sẽ đọc file với đường dẫn là `/var/www/images/../../../etc/passwd` với mỗi `../` là trở về thư mục cha của thư mục hiện tại. Như vậy với `../../../` thì từ thư mục `/var/www/images/` đã trở về thư mục gốc và file `/etc/passwd` chính là file được đọc.
        - Trên các hệ điều hành dựa trên Unix thì `/etc/passwd/` là một file chứa thông tin về các người dùng.
        - Trên Windows thì có thể dùng cả hai `../` và `..\` để thực hiện việc tấn công này.
        - Đây là một trang web và chúng ta có thể xem các sản phẩm của họ dưới dạng hình ảnh.
        ``` ảnh ```
        - Thử gửi một request đọc file `/etc/passwd` xem sao:
        - ![](https://images.viblo.asia/2222ac2e-c415-4620-92a5-c776e9c06db0.png)


        - Và kết quả là chúng ta đã đọc được file `/etc/passwd`:
        -  ![](https://images.viblo.asia/cdcf824e-4c32-4ac5-b2a3-2b3eb2c672b5.png)
- Thế nhưng chả có lý do gì mà các dụng không thực hiện việc phòng thủ các cuộc tấn công `path traversal` khi mà lỗ hổng này rất nghiệm trọng. Vậy làm sao để bypass?
- Sau đây là một số cách bypass:

   
   ![](https://images.viblo.asia/6d7349f6-db47-4926-a189-6efb1b9fbd3f.png)
   
   ![](https://images.viblo.asia/2552bd5d-1de9-4516-a372-3278ca77ff58.png)


    - Ta thử với `../../../etc/passwd` thì bị chặn, ta có thể thử bằng cách dùng đường dẫn tuyệt đối như `/etc/passwd`
  
         ![](https://images.viblo.asia/95391671-b07e-47e6-9723-1dd0f56631f5.png)
         ![](https://images.viblo.asia/cdcf824e-4c32-4ac5-b2a3-2b3eb2c672b5.png)
     - Như vậy là param đã nhận đường dẫn tuyệt đối và chúng ta có thể đọc được file `/etc/passwd`
     - Hay một cách khác bạn có thể bypass bằng cách sử dụng `../` lồng nhau giống như trong trường hợp này:
     ![](https://images.viblo.asia/dc4b3b56-e29e-4ef3-bab9-e89bda2823f9.png)
    - Một cách khác nữa chúng ta có thể encode hoặc null byte để vượt qua filter input
    - ![](https://images.viblo.asia/465e9bb9-cfec-4b52-8d69-3f20037ccc82.png)
    - ![](https://images.viblo.asia/b9b50f49-aa7a-4541-ac30-92ad8ee342b1.png)
    
   - Ngoài ra các bạn có thể sử dụng 
       - utf-8 unicode encoding
           - . = %u002e
           - / = %c0%af, %e0%80%af, %c0%2f
           - \ = %c0%5c, %c0%80%5c
       -  16-bit unicode encoding
           -  . = %u002e
           -  / = %u2215
           -  \ = %u2216

## Một số cách ngăn chặn.
- Nên validate input của người dùng trước khi xử lý nó.
- Sử dụng whitelist cho những giá trị được cho phép.
- Hoặc tên file là những kí tự số,chữ không nên chứa những ký tự đặc biệt.
## Tham khảo
https://portswigger.net/web-security/file-path-traversal