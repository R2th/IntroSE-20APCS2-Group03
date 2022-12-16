Xin chào các bạn, mình là Hưng - Lập Trình Viên AI - AI Engineer. Hiện tại mình đang làm các dự án phần lớn liên quan tới mảng Computer Vision (Thị Giác Máy Tính).  Các bài toán mình giải quyết toàn tập trung đến việc xử lí luồng stream từ các cameras, giúp công ty xậy dựng hệ thống VMS (Video Management System), tối ưu hóa và quản lý việc sử dụng Camera, đưa các luồng stream này đến các core ứng dụng AI ví dụ Nhận Diện Khuôn Mặt, Nhận Diện Phương Tiện và Đếm Số Lượng Xe trên đường, ...  

Do đó, đối với mảng Computer Vision, các bạn cũng cần chút kiến thức về xử lí hình ảnh (Image Processing) và xử lí Video (Video Processing). Hiện tại, có 2 ông lớn cung cấp cung cấp công cụ rất mạnh cho việc xử lý Video đó là **FFMPEG** và **GStreamer**. Mỗi công cụ sẽ có ưu và nhược điểm khác nhau, mình sẽ có bài viết khác nói về GStreamer. 

Các bạn làm việc nhiều với thư viện OpenCV thì biết rằng OpenCV sử dụng backend FFMPEG để giải mã (decode) thông tin video, lấy những frame hình ảnh từ video ra , rồi cuối cùng đưa vào AI model để xử lí (inference). 

Mình xin ví dụ đoạn code dùng để đọc 1 luồng stream từ Webcam
```python
# import the opencv library
import cv2


# define a video capture object
vid = cv2.VideoCapture(0)

while(True):
	
	# Capture the video frame by frame
	ret, frame = vid.read()

	# Display the resulting frame
	cv2.imshow('frame', frame)
	
	# the 'q' button is set as the
	# quitting button you may use any
	# desired button of your choice
	if cv2.waitKey(1) & 0xFF == ord('q'):
		break

# After the loop release the cap object
vid.release()
# Destroy all the windows
cv2.destroyAllWindows()
```

Khi sử dụng hàm `vid.read()`, nó sẽ lấy frame, giải mã (decode) và trả về numpy array image cho mình.

Tuy nhiên, nếu các bạn có để ý thì mọi công đoạn giải mã của FFMPEG sẽ được thực hiện hầu hết ở trên CPU. Các bạn có thể kiểm tra bằng cách sử dụng tool `htop` trên Ubuntu. 
```bash
# install via sudo apt-get install htop
htop
```

Ngoài ra, openCV còn cung cấp một function khác sử dụng FFMPEG đó là `cv2.VideoWriter`. Các máy tính chạy AI dùng để phát triển phần mềm sẽ gắn 1 con card đồ họa từ NVIDIA. Ví dụ trên công ty mình đang sử dụng con NVIDIA Gefore 1050ti cung cấp 4GB VRAM. Công ty NVIDIA có cung cấp một bộ SDK tên là NVIDIA Video Codec SDK để tăng tốc quá trình xử lí video trên chính con card GPU, thay vì sử dụng CPU như trước đây. Tại sao giải mã (decode) video trên GPU lại quan trọng? 
1. Tăng tốc độ inference trên toàn bộ hệ thống. 
2. GIảm áp lực tài nguyên sử dụng trên CPU
3. Tận dụng tối đa bộ encoder, decoder có sẵn của NVIDIA để xử lí

## FFMPEG
Sau đây, mình sẽ hướng dẫn các bạn cài FFMPEG theo 2 cách:
* Thông qua apt-get install (FFMPEG chỉ sử dụng CPU)
* Thông qua rebuild lại thư viện FFMPEG kết hợp với bộ NVIDIA Codec SDK (FFMPEG sẽ sử dụng đồng thời CPU & GPU)

### 1. Giới thiệu
FFMPEG là một framework về xử lý đa phương tiện từ âm thanh, video đến streaming đa nền tảng bao gồm các plugins ví dụ như
* Encode (Mã hóa) 
* Decode (Giải mã) 
* Transcode (Chuyển mã)
* Mux (Ghép Kênh) 
* Demux (Tách kênh) 
* Stream 
* Filter (Bộ lọc)
* Play

Bên cạnh đó, sau khi cài đặt FFMPEG, các bạn có thể sử dụng các tool đi kèm theo của nó ví dụ FFPLAY và FFprobe. 
* FFPLAY: dùng để play video hoặc luồng stream rất tiện lợi
* FFProbe: lấy thông tin từ luồng stream 

### 2. Cách cài đặt 
Chú ý: Lâu nay mình hay sử dụng môi trường Linux để phát triển ứng dụng, đồng thời việc thao tác xử lí trên Linux lại nhanh và thuận tiện hơn, nên mình xin phép mô tả toàn bộ quá trình trên môi trường Linux. 

FFMPEG phát hành nhiều versions khác nhau, thì phiên bản 4.4 mình thấy chạy ổn định nhất. 1 số luồng stream sẽ không tương thích với FFMPEG phiên bản cũ.

Đặc biệt, nếu bạn đang sử dụng phiên bản Ubuntu 18.04, cài đặt FFMPEG bằng cách này 
```bash
sudo apt-get install ffmpeg
```
thì phiên bản FFMPEG 3.4.8. Phiên bản này khá là cũ là thiếu nhiều plugins cũng như lỗi. 

Vì vậy, mình khuyến khích các bạn cài đặt FFMPEG phiên bản mới hơn là 4.4.
```bash
# nếu đã từng cài đặt ffmpeg, remove ffmpeg 
sudo apt-get remove ffmpeg
# add repository 
sudo add-apt-repository ppa:savoury1/ffmpeg4
sudo apt-get update
sudo apt-get install ffmpeg
```
Gói cài đặt FFMPEG dung lượng khoảng trên dưới 100MB, nên sẽ nhanh hay chậm tùy thuộc vào đường truyền mạng nữa.

### 2. Kiểm tra sau khi cài đặt
Mình có thể kiểm tra version cuả FFMPEG bằng cách 
```bash
ffmpeg -version
```
![ffmpeg.png](https://images.viblo.asia/ff7179ac-7b56-4aab-87d1-f9ae0f61719a.png)

Trên đây là những bước để cài đặt FFMPEG `Thông qua apt-get install (FFMPEG chỉ sử dụng CPU)` .

Mình sẽ cập nhật cách build lại thư viện FFMPEG và tích hợp thêm 1 số plugins của NVIDIA để encode và decode luồng streams bằng GPU.

## Tham khảo 
1. FFMPEG Documentation: https://ffmpeg.org/documentation.html
2. FFMPEG 4.4: https://ubuntuhandbook.org/index.php/2021/05/install-ffmpeg-4-4-ppa-ubuntu-20-04-21-04/