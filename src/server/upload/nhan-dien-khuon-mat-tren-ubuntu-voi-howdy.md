##### Nếu anh em đã biết với Windows Hello cho phép mở máy bằng nhận diện khuôn mặt. Thì ở trên Linux cũng có thể làm được như thế, thậm chí còn hơn cả thế nữa. Và Howdy sẽ giúp chúng ta làm việc đó.
### Howdy là gì ?
Howdy cung cấp xác thực kiểu cho Linux.  Nó dụng máy ảnh và kết hợp với nhận dạng khuôn mặt để chứng minh bạn là ai. Từ đó nó sẽ tự động xác thực bạn là ai. <br>
Để cho dễ hiểu, ví dụ khi ae chạy lệnh `sudo apt-get update` thì terminal sẽ bắt ta phải nhập password vào để tiếp tục. Còn khi đã cài Howdy rồi thì việc này nó sẽ tự động làm, ae chỉ cần ngồi yên thẳng thắn, giương cái bản mặt đẹp trai ra là được còn lại Howdy lo hết, không còn phải chạm tay vào nhập password nữa <br>
![](https://images.viblo.asia/8c23d60b-a91d-4701-a47f-aecdd8006c17.png)
<br>
### Cài đặt
#### Hiện tại Howdy có thể dùng trên Debian/Ubuntu, Arch Linux, Fedora and openSUSE. Nhưng ở đây mình sẽ chỉ cài đặt trên Ubuntu 20.04 thôi.
### 1.Cài đặt 
 `ctrl + alt + t` mở terminal lên. Sau đó chạy 3 dòng lệnh sau: <br> 
`sudo add-apt-repository ppa:boltgolt/howdy` <br>
`sudo apt update` <br>
`sudo apt install howdy`<br>
Sau khi các lệnh chạy xong, chạy lệnh `howdy -h` để kiểm tra: <br>
![](https://images.viblo.asia/886808b8-122c-4c59-82b1-0d743cab37aa.png) <br>
*Nếu kết quả giống trên ảnh thì việc cài đặt đã thành công rồi ae :3.
### 2. Tiếp đến sau khi cài đặt là bước config <br>
Chạy lệnh `sudo howdy config` để mở file config và sửa path của camera. Kéo tới đoạn có `device_path`, ae sửa giá trị mặc định thành đường dẫn tới camera của máy. <br>
`device_path = path_to_camera` <br>
> Nếu k biết đường dẫn tới camera như nào, chạy lệnh `ls -ltrh /dev/video*`, sẽ đc kết quả như hình : 
> ![](https://images.viblo.asia/384e342b-7dbc-4a00-ab4c-792bf6835ada.png) <br>
Lấy cái đường dẫn thứ nhất nha ae. <br>

Kết quả sau khi thay đường dẫn ta sẽ được như này : 
![](https://images.viblo.asia/60517527-1232-4efb-ac97-501cf7a1992f.png)
Rồi  `ctrl + x` : Lưu và đóng file config lại.
#### Tới bước quan trọng, thêm dữ liệu khuôn mặt của ae cho nó là data
Chạy lệnh `sudo howdy add`  cho nó chụp lại ảnh khuôn mặt ae. Bước này có thể làm nhiều lần, chụp nhiều góc độ, ánh sáng các kiểu cho data càng nhiều càng tốt.
![howdy add user](https://images.viblo.asia/7d3af0b3-75d3-4077-a57e-5b71809dd2da.png)
### 3. Đã xong. 
#### Restart lại máy và tận hưởng thành quả nha. <br>
Mặc định nó sẽ auto mở máy và khi mở ứng dụng đầu tiên nó sẽ yêu cầu nhập lại password 1 lần.
##### Trên đây là bài hướng dẫn cài cài đặt cơ bản, nó còn nhiều config khác để tối ưu hơn, ae có thể tham khảo thêm ở github.
 > [Link github](https://github.com/boltgolt/howdy)