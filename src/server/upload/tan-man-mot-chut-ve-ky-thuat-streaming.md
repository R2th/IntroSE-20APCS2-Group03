# Lời mở đầu
Hôm nay trong lúc rảnh rỗi tôi ngồi tìm hiểu kỹ thuật streaming và áp dụng nó bằng Python. Bài viết có thể có thiếu sót mong các bạn thông cảm.

# Khái niệm
Stream là một kỹ thuật chuyển dữ liệu theo dòng ổn định và liên tục. Khái niệm này bắt đầu có từ năm 1920 khi George Owen Squier được cấp bằng sáng chế cho một hệ thống truyền tải và phân phối các tín hiệu qua đường dây điện. Đến năm 1990, thuật ngữ "Streaming" ra đời được mô tả là công cụ giúp truyền tải một cách nhanh chóng video tới người dùng.

Tại thời điểm hiện tại, cùng với sự mở rộng và phát triển của Internet, stream trở nên ngày càng quan trọng hơn. Lấy ví dụ, mỗi tập tin bạn tải từ trình duyệt Chrome hoặc Firefox (download) đều sử dụng kỹ thuật stream hay các chương trình live video trên Youtube, Tweet, ... cũng đang sử dụng kỹ thuật stream. Nhưng đừng nhầm downloading và streaming, cái trước là tải dữ liệu về và lưu ở thiết bị của người dùng (có thể là mobile, laptop, pc, ...), cái sau truyển tải dữ liệu liên tục nhưng không lưu lại trong máy. Vậy kỹ thuật stream hoạt động ra sao ?

Dưới góc nhìn người dùng, để live stream họ cần các công cụ sau:
- Nguồn video và audio: camera, webcam, màn hình máy tính, microphone, ...
- Video encoder: phần mềm máy tính, thiết bị phần cứng hỗ trợ đóng gói video thời gian thực và gửi qua Internet.
- Nơi đến: Youtube, Vimeo, Facebook Live.
- Kết nối ổn định: kết nối với Internet cần ổn định để việc stream không bị delay hay tạm ngưng.

![](https://images.viblo.asia/a8b43a15-9564-4c17-a2f7-12856b6e87f9.png)

Dưới góc nhìn develop:
- Trình phát video chạy trên trình duyệt
- Nội dung của video sẽ bị encode thành các chuỗi bytes (thành nhiều khối rời rạc)
- Trình phát video có thể chuyển đổi khối lượng dữ liệu ở bất kỳ thời điểm trong stream.
    - Với trình phát dựa trên RTMP được thực hiện bởi một giao thức độc lập giữa server và client.
    - Với trình phát dựa trên HTTP, mỗi khối lượng dữ liệu phân tách thành nhiều mảnh. Mỗi mảnh sẽ được sắp xếp theo đúng thứ tự thời gian nên có thể chuyển đổi một cách dễ dàng giữa các khối.
- Trình phát video dựa vào HTTP cho phép server chuyển đổi trong quá trình stream. Mỗi video "chunk" được lưu ở nhiều server, trình phát có thể chuyển giữa các chunk bằng cách gửi request tới server khác nhau (ngay cả CDN hoặc cache).
- Logic quyết định khối lượng dữ liệu và server cung cấp nằm trong trình phát video ở bên phía client. 

![](https://images.viblo.asia/4f636583-45e2-4f92-b5fc-be02ebe49a44.png)

![](https://images.viblo.asia/b7b4503c-2893-49aa-b5ff-82c9f368436d.jpg)

![](https://images.viblo.asia/5970f6a4-5645-4194-96db-dd16fdd2d4f5.jpg)

Nhìn chung:

Âm thanh stream được nén bằng cách sử dụng định dạng âm thanh như MP3, Vorbis, AAC.

Hình ảnh video stream được nén bằng cách sử dụng codec video như H.264, H.265, VP8.

Mã hóa âm thanh và video stream được nhúng trong một gói bitstream như FLV, WebM, ASF, ISMA, MP4.

Một streaming server truyền Bitstream tới một streaming client bằng cách sử dụng một giao thức truyền tải, ví dụ như là MMS hoặc RTP.

Các streaming client có thể tương tác với streaming server bằng cách sử dụng một giao thức kiểm soát, chẳng hạn như MMS hoặc RTSP.

# Giao thức
Để truyền tải dữ liệu từ streaming server tới streaming client cần phải sử dụng giao thức truyền tải dữ liệu. Ở đây tôi sẽ liệt kê các giao thức đó, do không phải dân chuyên nên chắc chắn còn nhiều thiếu sót và không kỹ càng. :(

- **Giao thức UDP** (User Datagram Protocol): có đặc điểm nhanh và hiệu quả với các tập tin nhỏ nhưng truyền tải các tập tin không được sắp xếp và dễ bị mất tập tin nếu đứt đường truyền. Ở đây UDP sẽ gửi media dưới dạng các gói tin nhỏ, không có cơ chế đảm bảo các
gói tin được giao hoàn chỉnh, dẫn đến chất lượng stream không được đảm bảo.

- **Giao thức RTSP** (Real-time Streaming Protocol): ra đời vào năm 1996, được thiết kế đặc biệt cho việc stream media, dùng để kết nối và kiểm soát các phiên truyền tải dữ liệu trên các dòng đồng bộ hóa thời gian cho phương tiện liên tục như video và âm thanh.

    RTSP có hình thức khá giống giao thức HTTP, định nghĩa các tín hiệu điều khiển tuần tự, phục vụ cho việc điều khiển playback. Khác với HTTP là giao thức không trạng thái, RTSP là giao thức có trạng thái. Một định danh được sử dụng để theo dõi các phiên giao tiếp trong quá trình streaming (session). Lấy ví dụ trong quá trình streaming, Client có khả năng tạm dừng trình phát bằng cách gửi request tới server
    ![](https://images.viblo.asia/b249d0a3-894c-4832-afa5-e9e792c0c924.png)
    RTSP sử dụng TCP để duy trì kết nối đầu cuối giống HTTP, port mặc định là 554. Nói qua về TCP, giao thức này đảm bảo trong quá trình truyền dữ liệu sẽ không bị mất dữ liệu và được sắp xếp đúng thứ tự. Dữ liệu bị mất sẽ được truyền lại, tất nhiên không nhanh bằng UDP nhưng được cái dữ liệu được đảm bảo.

- **Giao thức RTMP** (Real-time Messaging Protocol): ra đời vào năm 2008, ban đầu là giao thức hỗ trợ Flash (cuối năm 2020 toang rồi), là một giao thức dựa trên TCP, liên tục duy trì kết nối, cho phép giao tiếp với độ trễ thấp. Giao thức này chia luồng truyền thành nhiều đoạn (fragment), kích thước các đoạn quyết định bởi xác nhận chung của Client và Server. Kích thước mặc định cho dữ liệu audio là 64 bytes và 128 bytes cho dữ liệu video. Các đoạn này sau đó được sắp xếp lại và ghép thành một kết nối duy nhất. Với các tập tin dài, RTMP chỉ chứa 1 byte header / 1 fragment nên không bị quá tải.

    ![](https://images.viblo.asia/4506c347-c22f-4d32-b339-085bafe661e7.png)

    Giao thức này định nghĩa các kênh ảo (virtuals channels), ở đây các gói tin hoạt động độc lập. Ví dụ, 1 channel cho việc xử lý RPC requests và responses, 1 channel cho dữ liệu stream video, 1 channel  cho dữ liệu stream audio, ... Trong 1 phiên làm việc của RTMP (session), các channels có thể làm việc cùng một thời điểm. Khi RMTP data được mã hóa (encoded), một header của gói tin sẽ được sinh ra. Header này có chứa ID channel, thời gian tạo, dung lượng của gói tin.
    
    ![](https://images.viblo.asia/844fa7d9-a790-4d47-b178-4657840319ea.png)

- **Giao thức HLS** (HTTP Live Streaming): ra đời vào năm 2009, dựa trên giao thức HTTP ở tầng ứng dụng của Internet, hoạt động bằng cách băm luồng thành nhiều tập tin nhỏ (HTTP-based transport stream) - `.ts` files. Các tập tin này được sắp xếp lại thứ tự bởi UTF-8 M3U playlist (`.m3u8`).

    ![](https://images.viblo.asia/5b4e6c53-0d76-4743-bb46-67aecff4b6fc.jpg)

- **Giao thức MPEG-DASH** (Dynamic Adaptive Streaming over HTTP): ra đời vào năm 2010, giao thức có phương thức hoạt động khá giống HLS, chia nội dung thành các chuỗi tập tin nhỏ.

    ![](https://images.viblo.asia/2d5056be-5b48-41bc-870b-2334d0569a90.png)

Còn nhiều giao thức nữa nhưng thôi tôi giới thiệu sơ qua thế này thôi do ngại viết dài :bow:.

# Thư viện FFmpeg
Một dự án phần mềm mã nguồn mở, là một thư viện lớn, chứa nhiều chương trình xử lý video, âm thanh như ghi lại, chuyển đổi, phát trực tiếp, bla bla ...
![](https://images.viblo.asia/af26f1cb-a576-4d41-b574-b8fd5f9c839c.png)

Một vài ví dụ sử dụng thư viện này, implement bởi Python và sử dụng thư viện (https://github.com/kkroening/ffmpeg-python)

## Stream from a local video to HTTP server
``` python
video_format = "flv"
server_url = "http://127.0.0.1:8080"

process = (
    ffmpeg
    .input("input.mp4")
    .output(
        server_url,
        codec = "copy", # cùng codecs với video ban đầu
        listen=1, # mở HTTP server
        f=video_format)
    .global_args("-re") # nếu live stream thì dùng biến này
    .run()
)
```
Muốn xem stream video này thì chạy trong terminal : `ffplay -f flv http://localhost:8080`

## Stream from RTSP server to TCP socket
``` python
packet_size = 4096

process = (
    ffmpeg
    .input('rtsp://%s:8554/default')
    .output('-', format='h264')
    .run_async(pipe_stdout=True)
)

while process.poll() is None:
    packet = process.stdout.read(packet_size)
    try:
        tcp_socket.send(packet)
    except socket.error:
        process.stdout.close()
        process.wait()
        break
```

## Tensorflow Deep Dream Streaming
Một ví dụ khá vui cho các bạn làm AI, biến stream output thành một bức tranh trừu tượng.
``` python
process1 = (
    ffmpeg
    .input(in_filename)
    .output('pipe:', format='rawvideo', pix_fmt='rgb24', vframes=8)
    .run_async(pipe_stdout=True)
)

process2 = (
    ffmpeg
    .input('pipe:', format='rawvideo', pix_fmt='rgb24', s='{}x{}'.format(width, height))
    .output(out_filename, pix_fmt='yuv420p')
    .overwrite_output()
    .run_async(pipe_stdin=True)
)

while True:
    in_bytes = process1.stdout.read(width * height * 3)
    if not in_bytes:
        break
    in_frame = (
        np
        .frombuffer(in_bytes, np.uint8)
        .reshape([height, width, 3])
    )

    # See examples/tensorflow_stream.py:
    out_frame = deep_dream.process_frame(in_frame)

    process2.stdin.write(
        out_frame
        .astype(np.uint8)
        .tobytes()
    )

process2.stdin.close()
process1.wait()
process2.wait()
```
![](https://images.viblo.asia/21d79ab4-a172-4559-a470-c5c432fff903.png)

Hoặc có thể dùng luôn thư viện hỗ trợ stream bằng FFmpeg (https://github.com/aminyazdanpanah/python-ffmpeg-video-streaming). Ở đây tôi không đề cập đến do dài.

# Video Streaming với OpenCV và Flask
![](https://images.viblo.asia/b3802bdd-1cee-43bb-8762-4af16b6a3adb.png)

Các IP Camera đa phần có giao thức RTSP và không hỗ trợ trực tiếp trên trình duyệt nên cần thông qua một thư viện API, ở đây tôi dùng Flask.

Đầu tiên import các thư viện cần thiết
``` python
#Import necessary libraries
from flask import Flask, render_template, Response
import cv2
#Initialize the Flask app
app = Flask(__name__)
```

Capture video bằng OpenCV
``` python
camera = cv2.VideoCapture(0)
'''
for ip camera use - rtsp://username:password@ip_address:554/user=username_password='password'_channel=channel_number_stream=0.sdp' 
for local webcam use cv2.VideoCapture(0)
'''
```

Sau khi capture video, tôi chuyển đổi các framte thành bytes để generate lên trình duyệt
``` python
def gen_frames():  
    while True:
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result
```

Để show lên trình duyệt, tôi cần thiết lập một router nối tới trang html. Đầu tiên tôi cần một trang mặc định đã, thường là trang home khi mọi người nhập địa chỉ sẽ hiện lên.
``` python
@app.route('/')
def index():
    return render_template('index.html')
```

Tiếp đấy cần một route chỉ hướng tới trang sẽ hiện các frame trên trình duyệt. Type ở đây để multipart hỗ trợ media.
``` python
@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
```

Trong file `index.html`, mặc định trống trơn, chỉ khi nào server gửi trả các frame thì mới hiện lên.
``` html
<body>
<div class="container">
    <div class="row">
        <div class="col-lg-8  offset-lg-2">
            <h3 class="mt-5">Live Streaming</h3>
            <img src="{{ url_for('video_feed') }}" width="100%">
        </div>
    </div>
</div>
</body>
```

Chạy Flask app
``` python
if __name__ == "__main__":
    app.run(debug=True)
```

# Kết luận
Tôi chỉ mới viết có nhiêu đây, chưa được đầy đủ và cũng chưa đi sâu. Nếu có thiếu sót, mong các bạn góp ý :bow:

# References
https://medium.com/datadriveninvestor/video-streaming-using-flask-and-opencv-c464bf8473d6
https://github.com/kkroening/ffmpeg-python
https://github.com/aminyazdanpanah/python-ffmpeg-video-streaming
https://www.wowza.com/blog/streaming-protocols