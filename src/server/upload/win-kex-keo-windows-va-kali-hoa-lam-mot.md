# Overview
Vào ngày 18-08-2020, Kali Linux release phiên bản 2020.3 với nhiều cải tiến như thay thế **Bash** truyền thống sang **ZSH**,... nhưng đối với mình, ấn tượng hơn cả là **Win-KeX (Windows + Kali Desktop EXperience)** được Kali hỗ trợ để sử dụng giao diện đồ hoạ với WSL2 trên Windows. 

![](https://images.viblo.asia/587015e6-7e8c-4878-865d-0ba8ad0cb339.png)

Có thể thấy rằng việc bạn sử dụng Windows nhưng vẫn muốn hacking trên Kali Linux mà không muốn bật VMWare lên hay Dual-boot thì đây chính là giải pháp cho bạn, quá trình khởi động cũng rất nhanh nữa :D.
# Setting
Đầu tiên bạn cần chắc chắn rằng máy Windows của mình sử dụng WSL2, tất cả quá trình cài đặt bạn có thể đọc tại https://docs.microsoft.com/vi-vn/windows/wsl/install-win10#step-2---update-to-wsl-2

Kiểm tra việc mình đã sử dụng WSL2 hay chưa chúng ta có câu lệnh
```
C:\Users\minht>wsl --list -v
  NAME          STATE           VERSION
* kali-linux    Running         2
```
Ở đây mình đang sử dụng kali-linux ở WSL2 rồi.  
Tiếp theo khởi động kali-linux lên và cài đặt **win-kex** với câu lệnh sau:
```
sudo apt update && sudo apt install -y kali-win-kex
```
Quá trình cài đặt diễn ra cũng hơi lâu, cũng khoảng 15-20 phút tuỳ thuộc vào mạng, sức mạnh PC của bạn và một trái tim chứa đầy sự chờ đợi nữa ^^!

# Run Win-Kex
Sau khi cài đặt xong, các bạn có thể gõ `kex` vào terminal của kali là chúng ta có thể sử dụng giao diện của Kali Linux rồi.  
Mặc định nó ở chế độ fullscreen nên các bạn sẽ hơi lúng túng trong việc mình muốn quay trở về giao diện Windows như thế nào. Tuy nhiên chúng ta có thể ấn nút F8 để hiện thị menu của **tightvnc** để có thể thoát khỏi chế độ fullscreen này hoặc là sử dụng tuỳ chọn khác hay ho hơn 

![](https://images.viblo.asia/d796cbb3-cdf1-40cb-8a82-fd7f877acd23.png)

# Win-Kex 2.0
Tuy nhiên, với bản Win-Kex khi mới release thì vẫn còn nhiều hạn chế, như chưa hỗ trợ âm thanh, giao diện thì vẫn giống như là chạy Windows + VMWare để sử dụng Kali vậy. Nhưng vào ngày 18-09-2020, tức đúng 1 tháng, bản Win-Kex 2.0 ra đời với nhiều cải tiến hơn cả
- Win-KeX SL (Seamless Edition)
- Hỗ trợ âm thanh
- Hỗ trợ nhiều session
- KeX session có thể chạy dưới quyền root
- Chia sẻ clipboard: Có thể copy paste thoải mái nội dung giữa Kali và Windows
- ....

Từ bản Win-Kex 2.0 hỗ trợ chế độ SL (Seamless Edition), chế độ xoá nhoà ranh giới giữa Windows với Kali đi, bạn có bao giờ tưởng tượng được việc mở những ứng dụng của Kali trên màn hình Windows theo dạng cửa sổ như hình dưới chưa :D.

![](https://images.viblo.asia/b86476c4-ca6b-4e53-93a5-2c281eccd2b3.png)

Khởi động chế độ này chúng ta kèm theo flag `--sl` và kèm theo hỗ trợ âm thanh nữa thì chúng ta có flag `--s`
```
kex --sl --s
```
Lúc này nó hiển thị lên trên Windows 1 thanh status bar của Kali lên đầu như hình, nó che mất 1 phần ứng dụng trên Windows, hy vọng phiên bản lần sau sẽ có tuỳ chọn auto hide như thanh start  của Windows để đỡ bị chiếm diện tích

![](https://images.viblo.asia/93ffbf8e-84bc-48de-8c12-43947e5508e6.png)

*Như hình này, mình mở trình duyệt lên thì k nhìn thấy cái tab nào hết, k sử dụng chuột để chuyển tab được mà phải dùng phím tắt trên keyboard.*

# Error
Trong quá trình sử dụng, mình bị cái lỗi k thể connect đến socket của kali được, mất vài hôm k thể mở Kex lên được, sau 1 hôm lên mạng tìm lỗi thì gặp bài này https://unix.stackexchange.com/questions/605309/not-able-to-initialize-gui-for-kali-linux-in-wsl-2
Nếu bạn nào bị lỗi này thì có thể sử dụng 1 trong những câu lệnh sau 
```
kex kill
kex --kill
kex --stop
```
Rồi sau đó khởi động lại Win-Kex là được rồi :)
> Có một vài cách tạo shortcut cho Windows Terminal để khởi động Win-Kex nhanh hơn các bạn có thể đọc thêm tại   
> https://www.kali.org/docs/wsl/win-kex/#optional-steps
# Reference
- https://www.kali.org/docs/wsl/win-kex/#run-win-kex
- https://www.kali.org/news/win-kex-version-2-0/
- https://www.kali.org/news/kali-2020-3-release/
- https://unix.stackexchange.com/questions/605309/not-able-to-initialize-gui-for-kali-linux-in-wsl-2
- https://docs.microsoft.com/vi-vn/windows/wsl/install-win10