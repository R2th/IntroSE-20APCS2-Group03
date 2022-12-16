# Phân tích 
Trong các hệ thống nhận diện ta thường gặp phải vấn đề thời gian detection của hệ thống khá là chậm. Để cải thiện tốc độ detection, ta sẽ cải thiện tốc độ từng bước trong quá trình đó. Và bước đầu tiên là cải thiện tốc độ đọc frame từ file video.
Trong bài viết này, khi làm việc với file video và OpenCV hệ thống sử dụng hàm cv2.VideoCapture. 
Đầu tiên để khởi tạo đối tượng cv2.VideoCapture bằng cách truyền đường dẫn của file video. 
Sau đó, bắt đầu một vòng lặp, gọi phương thức .read của cv2.VideoCapture để đọc frame tiếp theo từ file video. Frame này sẽ được xử lý sau đó.  
Vấn đề (và lý do tại sao bước này có thể cảm thấy chậm) là nó vừa đọc vừa giải mã frame trong main processing thread. Phương thức .read là một blocking operation, luồng chính của hệ thống (main thread) hoàn toàn bị chặn (tức là bị đình trệ) cho đến khi frame được đọc từ  file video, giải mã và quay lại calling function.
Bằng cách di chuyển các hoạt động I / O chặn này sang một luồng riêng biệt và duy trì hàng đợi các frame được giải mã thì có thể cải thiện tốc độ xử lý FPS lên tới 52%.
Sự gia tăng tốc độ xử lý frame xuất phát từ việc giảm đáng kể độ trễ, không phải chờ phương thức .read để đọc và giải mã frame, thay vào đó luôn có một khung được giả mã sẵn sàng để chúng ta xử lý.
Để thực hiện việc giảm độ trễ này, mục tiêu là chuyển việc đọc và giải mã các frame từ file video thành một luồng hoàn toàn riêng biệt của chương trình, giải phóng main thread để xử lý ảnh thực tế.
# Thực hiện 
Để cải thiện tốc độ xử lý FPS của các frame được đọc từ các tệp video bằng OpenCV, chúng tôi sẽ sử dụng thread và cấu trúc dữ liệu queue:

![](https://images.viblo.asia/fb9adcca-a040-40ad-83c8-057e8057432d.png)

Vì phương thức .read của cv2.VideoCapture là một blocking I/O operation, chúng ta có thể tăng tốc đáng kể chỉ bằng cách tạo một luồng riêng biệt từ tập lệnh Python chính, cái mà chịu trách nhiệm đọc các frame từ file video và duy trì hàng đợi queue.
![](https://images.viblo.asia/2b85dc91-d11e-4c00-a348-8fbfc5f4f9a3.png)

Bây giờ chúng ta có thể định nghĩa hàm khởi tạo cho FileVideoStream
![](https://images.viblo.asia/07ec22d9-3956-4b50-8974-d00fde4a4cad.png)
- path: đường dẫn đến file video 
- queueSize: Số lượng khung hình tối đa để lưu trữ trong hàng đợi. Giá trị này mặc định là 128 khung hình.

Dòng 18: khởi tạo đối tượng cv2.VideoCapture bằng cách truyền đường dẫn video
Sau đó, khởi tạo một boolean để cho biết liệu có nên dừng quá trình phân luồng (Dòng 19) cùng với cấu trúc dữ liệu queue  (Dòng 23)
Để bắt đầu thread, ta viết hàm start :
![](https://images.viblo.asia/9a040443-28c3-42f3-bf3b-6e12aaa89dd5.png)
Hàm này đơn giản là khởi tạo một thread tách biệt với main thread. Thread này sẽ được gọi hàm .update (được định nghĩa ở dưới)
Hàm update chịu trách nhiệm đọc và giải mã các khung từ tệp video, cùng với việc duy trì cấu trúc dữ liệu hàng đợi thực tế
![](https://images.viblo.asia/95f43d17-2b28-49cb-a47e-ed1b0ccf86e6.png)
Đây là mã này thực sự đang chạy trong một luồng riêng biệt - đây là nơi tăng tốc độ xử lý FPS thực tế. 
Trên dòng 33 bắt đầu lặp qua các khung trong tệp video. 
Nếu biến stopped được đặt bằng true, thoát khỏi luồng (Dòng 36 và 37). 
Nếu hàng đợi không đầy, đọc khung tiếp theo từ luồng video, kiểm tra xem liệu  đã đạt đến cuối tệp video chưa, sau đó cập nhật hàng đợi queue (Dòng 40-51).
Hàm read sẽ xử lý trả về frame tiếp theo
![](https://images.viblo.asia/89273bf2-dba9-40d3-9117-77fb877036c5.png)

Hàm more sẽ trả về True nếu vẫn còn nhiều frame trong hàng đợi (và False nếu ngược lại)
![](https://images.viblo.asia/c46f86e8-8341-49ef-a1be-eefcb76381ca.png) 

Hàm stop sẽ được gọi khi muốn dừng thread
![](https://images.viblo.asia/6dd195ec-0cbf-4e22-85a4-dafb5ebaf62a.png) 

Bây giờ chúng ta đã định nghĩa class FileVideoStream 
![](https://images.viblo.asia/6bb7a477-3a8a-478b-8371-93e058c5d79e.png) 

Khởi tạo đối tượng FileVideoStream và bắt đầu chuỗi đọc frame (Dòng 19).
Dòng 23 bắt đầu FPS timers.
Xử lý đọc các frame từ FileVideoStream, xử lý chúng và hiển thị chúng trên màn hình.
![](https://images.viblo.asia/21738f4c-e9a4-495f-85d2-c464e7e015b7.png)
Bắt đầu một vòng lặp while trên dòng 24 sẽ tiếp tục lấy các frame từ hàng đợi FileVideoStream cho đến khi hàng đợi trống.
Đối với mỗi frame này, ta sẽ áp dụng các thao tác xử lý hình ảnh giống nhau, bao gồm: thay đổi kích thước, chuyển đổi sang grayscale và hiển thị văn bản trên khung.
Frame được xử lý được hiển thị trên màn hình của trên dòng 40-42. 
Khối mã cuối cùng tính toán tốc độ thông qua FPS:
![](https://images.viblo.asia/0bac0766-aafe-49ef-bc1a-42c15da4d61c.png)
# Kết quả 
- Trước khi áp dụng code tăng tốc độ thì tốc độ đọc frame là 20,21 frame per second.
- Sau khi áp dụng code tăng tốc thì tốc độ đọc frame là 30,75 frame per second.
Như vậy trong trường hợp này tốc độ đọc frame tăng 52%, cho thấy hiệu quả của phương pháp.