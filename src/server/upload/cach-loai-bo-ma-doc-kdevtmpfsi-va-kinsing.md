Server đã được phát triển và chạy ổn định trên EC2 được vài tháng rồi. Một tuần trước khách hàng yêu cầu chuyển từ EC2 qua digitalocean( DO), nghe bảo là vì có thể giảm 20% chi phí. Do hệ thống dùng container( docker và docker-compose) nên việc chuyển, copy data chi mất một ngày. Mọi chuyện "ổn áp" lắm cho đến chiều thứ 7, khách report issues rằng server chậm!

Mình vào kiểm tra: `top` thì thấy thật v*i nồi, có cái process `kdevtmpfsi` chạy cắm đầu cắm cổ, ăn 99% CPU. Chính thức xác nhận server bị dính mã độc. 
Mình viết bài chia sẽ cách mình loại bỏ mã độc này hy vọng giúp được ai gặp tình huống tương tự.
## Step 1. Chuẩn bị tinh thần OT.
- Tự nhủ bản thân: "đi làm thứ 7 mình xứng đáng được gọi là thiên thần." 🙂
- Nhắn cho ghẹ bảo xe anh bị hư mất nên tối nay không đi chơi nhé! 🥲
## Step 2. Reseach về mã độc.
May mắn là trên mạng có rất nhiều nguồn về con mã độc này.
### 2.1 Thông tin cơ bản:
Sau vài giờ reseach mình tóm tắt về `kdevtmpfsi` và `kinsing`:
- `Kdevtmpfsi` là mã độc mang 2 thuộc tính: 1. Miner 2. Bot. -> Hiểu đơn giản nó là con bot đào coin:
![](https://images.viblo.asia/1d7b93ed-c412-4de8-8407-899b3fae0a7e.png)
- `Kinsing` là mã độc mang 4 thuộc tính: 1. Evader( Trốn tránh) 2. Spreading( Phát tán) 3. Miner 4. Bot.
-> Hiểu đơn giản nó là con bot đào coin nhưng giỏi lẫn trốn mà còn xấu tính đến mức phát tán mã độc đi nơi khác: 
![](https://images.viblo.asia/7e29dbb6-f505-4d31-9a8a-9fd3a56cafa3.png)
- Có thể khi check `top` bạn sẽ dễ dàng tìm thấy và kill `kdevtmpfsi` nhưng rất khó để tìm và kill `kinsing`. Và quan trọng nhất thì `Kinsing` chính là cái con tái tạo/ kích hoạt `kdevtmpfsi` chạy lại mỗi khi mình kill process hay remove file. Nên từ lúc này mình sẽ tập trung về con `kindsing` này, diệt con `kindsing` là con `kdevtmpfsi` tự chết.
- Về nguyên quán: Nga ngố. -> Cái này không lạ.
- Sinh nhật: 07 07 2020 -> Được update nhiều lần, lần gần nhất là 18 09 2022.
- Danh sách ip độc hại liên quan: 
![](https://images.viblo.asia/edacddcc-b7e6-46be-80e7-59657ba86ec3.png)
- Về công nghệ: mã độc viết bằng Go-lang(Dùng thư viẹn go-resty để giao tiếp http, osext để làm việc với OS ...) và chạy trên container (cụ thể là containerd). Mã độc náy khá mới với những công nghệ xịn sò.
- Source files: tại `/tmp/kdevtmpfsi`, `/tmp/kindsing` và nhiều chổ khác.
### 2.2 Hành vi tội ác:
- Đầu tiên mã độc được cài cắm vào server bằng log4j, hoặc các ports open không có password, hoặc ssh khi một server có chứa key ssh bị mã độc, hoặc trong các thư viện, images vô tình tải về.
- Sau `kinsing` đó tự động nhân lên 2 tiếng trình: `kinsing` và `getconf`
- `getconf` là tiến trình lấy hết toàn bộ config của server
- Cái `kinsing` sẽ phát tàn các file chứa mã độc khác trong đó có `/tmp/kdevtmpfsi`
- Nó chạy lệnh `chmod` thay đổi quyền file
- Sau đó dùng `sh` kích hoạt hơn 100 process `yzGnO` làm đủ thứ việc như `cat .bash_history` chạy `/usr/local/sbin/find` tìm thông tin mail...
- Cùng lúc nó kích hoạt tiếng trình `dgAZT` detect hệ thống chống mã đôc
- Kích hoạt cron job để check là tự động kích hoạt tái tạo lại mã động
- Nếu trong file có lưu key ssh của server khác -> Sẽ dùng key này để truyền mã độc qua server kia.
## Step 3. Xác định nguyên nhân và giải pháp:
### 3.1 Dự đoán đầu tiên:
- Không phải log4j vì server không có chạy java.
- Không phải bị mất ssh key, vì có 2 keys mình quản lý cả.
- Check mail thì mới phát hiện, hôm qua DO có gởi mail cảnh báo mình mở port redis mà không có mật khẩu.
- Vậy là nguyên nhân là do ở EC2 có  `security groups` lúc ở EC2 có chặn mở port redis rồi mà qua DO không cẩn thận kiểm tra lại.
### 3.2 Giải pháp đầu tiên:
- Đóng port redis và thêm password
- Kill process `kdevtmpfsi`
- Xóa tất cả folder của `/tmp/kdevtmpfsi` và `/tmp/kinsing` + set quyền read only.
- Xóa data của redis, xóa image redis, tải image mới về.
- Cài tường lửa ufw, chỉ mở ports 443, 80, chặn danh sách ip phía trên có liên quan đến mã độc.

-> Kết quả: `kdevtmpfsi` chỉ bị dừng khoản 3h sau đó lại khởi động?? -> thất bại.
### 3.3 Giải pháp thứ 2:
- Mình find trên server thì không thấy còn gì liên quan đến `kdevtmpfsi` và `kinsing`
- Các find mình set read only thì vẫn không thay đổi gì
- Sau đó mình check status của process `kdevtmpfsi`: `systemctl status <PID>`
- Bất ngờ chưa mình nhận ra là 2 file source nằm trong container postgres:
![](https://images.viblo.asia/393300f3-01d3-449c-ba64-7f2f7c5df373.png)
- Check image trên hub thì không thấy có
- Vâỵ là con mã độc này chỉ phát tán nội bộ trong mạng docker.
- Sau đó mình xóa image -> tải image mới -> chạy lại
- Từ đó đến chừ 2 tuần chưa thấy `kdevtmpfsi` bị khởi động lại -> thành công. 
### Step 4. Rút kinh nghiệm:
- Đưa việc config ports thành một bước bắt buộc phải làm.
- `Kdevtmpfsi` khá dễ nhận biết, vì nó đào coin nên chiếm dụng lượng lớn CPU. Nếu là con virus mã hóa file hay lấy thông tin thì không thể tự phát hiện.
- Do hệ thống chạy docker compose nên virrus không thể can thiệp được vào môi trường host

Những blog như này thường ít được quan tâm, chỉ khi ai gặp tình huống giống vào xem, mà dễ gì một server bị virus. Cảm ơn mọi người đã đọc!