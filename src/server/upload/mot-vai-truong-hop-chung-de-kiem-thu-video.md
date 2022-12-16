Bài viết này tổng hợp những trường hợp test video và những kinh nghiệm cần có khi test các chức năng đến video .
Dưới đây là các trường hợp , khía cạnh cần phải được kiểm thử :
### 1.Kiểm thử về giao diện 
 - Đây là khía cạnh quan trọng nhất khi đề cập đến việc người dùng có cảm thấy thích thú khi xem video của bạn ngoài vấn đề về việc video có nội dung hấp dẫn hay không 
 
  ![](https://images.viblo.asia/af5751ae-55f6-450b-8100-aaa42c1fb1b5.jpg)
  
  - Việc giao diện của video bị vỡ giao diện hay màn hình hiển thị lỗi gây khó chịu cho người dùng khi xem video, và họ sẽ bỏ ứng dụng của bạn bất cứ khi nào 
  
Hãy kiểm tra đầy đủ những trường hợp dưới đây :
- Màu sắc 
- Màn hình video có bị vỡ giao diện không 
- Màn hình có bị nháy giật hay không 
-  Có xuất hiện màn hình đen trước /trong/sau khi chạy video không 

Nếu kiểm thử loại video thông thường (Ví dụ như video get từ vimeo) thì cần check UI của những thnafh phần sau:

- Button Play/Pause
- Thanh Progress bar
- Progress Time
- Âm lượng 
- Chất lượng 
- Normal/Fullscreen

Cần kiểm thử các trường hợp   trên các loại kích thước màn hình sau:

- 640 x 480
- 800 x 600
- 1024 × 768
- 1280 x 800
- 1366 x 768
- 1400 × 900
- 1680 x 1050

Và trên các loại trình duyệt (Nếu ứng dụng web): 

- Chrome
- Firefox
- IE
- Safari
- vv..

Tất nhiên là tùy thuộc vào Khách hàng của các bạn mong muốn các bạn kiểm thử chúng trên môi trường nào 

### 2.Kiểm thử chức năng 

Nút Play/pause : Phải chắc chắn răng nút Play , Pause hoạt động 1 cách chính xác theo bảng sau :
 
 

|  Trạng thái hiện tại/Action | Play  | Pause  |
| -------- | -------- | -------- |
|  Play   | Không hiện tượng      | Play video , pause button hiển thị    |
|  Pause    | Pause video , play button hiển thị    | Không hiện tượng     |

Ngoài ra cần kiểm tra với trường hợp có thể Play/Pause video trong trường hợp click /tap vào 1 ku vực nhất định cho phép được thiết kế theo design

Thanh Progress bar:

 - Thể hiện chính xác tiến trình chạy video 
 - Có thể click để tua video 
 - Hiển thị chính xác tiến trình load video
 - Thể hiện chính xác thời gian video chạy 

Âm lượng :

- Khi tăng âm lượng
- Khi giàm âm lượng
- Chức năng  tắt âm lượng 
- Bật âm lượng

Chất lượng: Kiểm tra với chất lượng thông thường dưới đây

- 144p
- 240p
- 360p
- 480p
- 720p
- 1080p
- Trường hợp auto

Normal/Fullscreen

- Khi thu nhỏ màn hình 
- Khi phóng to màn hình 
- Gõ Esc (Exit) trên bàn phím khi muốn thu nhỏ màn hình

Ngoài ra có các chức năng cần phải kiểm thử tùy loại video như : 

Tốc độ (nhanh/chậm/bình thường)
 - 0.25
 - 0.5
 - 0.75
 - normal
 - 1.25
 - 1.5
 - 2
 
 Loading 
 
 - Việc loading video hoạt động bình thường
 - Không có hiện tượng không load được video 
 - Không xảy ra hiện tượng loading icon hiển thị mãi mãi
 - Nhấn pause trong lúc loading
 - Nhất play trong lúc loading 
 - Tăng giảm âm lượng lúc loading
 - Thay đổi chất lượng lúc loading 
 - Thay đổi tốc độ lúc loading 

Pause
- Tăng giảm âm lượng lúc stop video
- Thay đổi chất lượng lúc stop video
- Thay đổi tốc độ lúc stop video
- Thay đổi chế độ normal/full màn hình lúc stop video 

Reload video

- Reload video trong lúc video chạy
- Reload video trong lúc stop video 
 
Auto(cho phép tự động chạy video tiếp theo)

Tự động pause khi hết video
 vv..
 
1 số kiểm thử đối với ứng dụng trên điện thoại:
 - Màn hình dọc
 - Màn hình ngang
 - Zoom in/out màn hình 
 - Để video chạy ở chế độ nền 
 - Xác nhận trong TH kill app?
 - Khi tăng giảm âm thanh bằng device
 - Khi ấn nút home
 - Khi ấn nút nguồn
 - Nhấn nút back (android)

Kiểm thử 1 số trường hợp khi:
- Mất mạng
- Lỗi server
- Hết dung lượng 3G

Kinh nghiệm bản thân khi test video :
- Bug hay xảy ra trong trường hợp tua video , loading video nên cần đặt biết chý ý đến các case này 
- Các trường hợp test chất lượng , tốc độ thường xuyên xảy ra lỗi nghiệm trọng 
- Cần test đầy đủ trên các môi trường , các kích thước màn hình khác nhau để đảm bảo tốt nhất