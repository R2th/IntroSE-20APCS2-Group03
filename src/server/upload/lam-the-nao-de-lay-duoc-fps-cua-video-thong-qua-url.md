###  Mở đầu
Gần đây mình có một task liên quan đến lấy **fps (frame per second)** của video và mình đã tốn kha khá thời gian để tìm hiểu, nên mình muốn chia sẻ để các bạn cũng đang gặp phải vấn đề tương tự có thể tham khảo và tiết kiệm được thời gian hơn. :kissing_heart: Bình thường chỉ cần click chuột phải vào Properties của video là có thể xem được fps rồi, vậy thì tại sao không thể lấy được fps thông qua code một cách đơn giản được cơ chứ?

Nhân tiện, ngôn ngữ mà mình sử dụng lần này là **Python**. 

Với các video có sẵn ở local, có khá nhiều cách để lấy được thông số fps của nó, ví dụ như:
```
ffmpeg -i filename 2>&1 | sed -n "s/.*, \(.*\) fp.*/\1/p"
```
hoặc bạn cũng có thể dùng **openCV**,
```
import cv2
import time
 
if __name__ == '__main__' :
 
    # Start default camera
    video = cv2.VideoCapture(0);
     
    # Find OpenCV version
    (major_ver, minor_ver, subminor_ver) = (cv2.__version__).split('.')
     
    # With webcam get(CV_CAP_PROP_FPS) does not work.
    # Let's see for ourselves.
     
    if int(major_ver)  < 3 :
        fps = video.get(cv2.cv.CV_CAP_PROP_FPS)
        print "Frames per second using video.get(cv2.cv.CV_CAP_PROP_FPS): {0}".format(fps)
    else :
        fps = video.get(cv2.CAP_PROP_FPS)
        print "Frames per second using video.get(cv2.CAP_PROP_FPS) : {0}".format(fps)
     
 
    # Number of frames to capture
    num_frames = 120;
     
     
    print "Capturing {0} frames".format(num_frames)
 
    # Start time
    start = time.time()
     
    # Grab a few frames
    for i in xrange(0, num_frames) :
        ret, frame = video.read()
 
     
    # End time
    end = time.time()
 
    # Time elapsed
    seconds = end - start
    print "Time taken : {0} seconds".format(seconds)
 
    # Calculate frames per second
    fps  = num_frames / seconds;
    print "Estimated frames per second : {0}".format(fps);
 
    # Release video
    video.release()
```
Cũng có thể có nhiều cách khác nữa, nhưng vấn đề ở đây là mình lại không có sẵn file video ở local mà lại đang được lưu ở 1 nơi khác (như trên S3 chẳng hạn). Và mình muốn lấy được fps của nó thông qua URL luôn, chứ lại phải down video về local rồi mới lấy thì khá là tù :sweat_smile:

### Tìm hiểu
Sau một thời gian tìm tòi nghiên cứu, mình thấy có [VLC.py](https://pypi.org/project/python-vlc/) là trông có vẻ khả thi để giúp mình đạt được mục đích. Nghe cũng hợp lí vì bình thường bạn có thể dùng vlc để chạy 1 link stream, như khi xem bóng đá bằng acestream chẳng hạn, nên việc đọc file từ link s3 chắc cũng sẽ không có vấn đề gì.

Cách thực hiện như sau:
B1: cài vlc cho máy:
```
sudo snap install vlc
```
và cho python
```
pip install python-vlc
```

B2: execute!!!
```
import vlc
import time

vlc_ins = vlc.Instance()
player = vlc_ins.media_player_new()
player.set_mrl(video_url)
player.play()
time.sleep(4)
fps = player.get_fps()
player.stop()
print('video fps is: ', fps)
```
trong đó video_url là link s3 của video.
Mình dùng sleep(4) để timeout 4s chờ cho video được chạy, ở bước này thì thực ra vlc trên máy bạn sẽ play video, sau đó mới có thể dùng player.get_fps() để lấy được fps, vì nếu video không được chạy thì fps trả về sẽ là 0.0
Cách này thì vẫn khá là tù vì về cơ bản là video vẫn phải được play trực tiếp ở local để lấy fps. Tuy nhiên ít nhất thì nó cũng giúp mình đạt được mục đích là có thể lấy được fps từ URL chứ không phải video có sẵn trên local.

Và thêm 1.. à không, nhiều chút thời gian tìm hiểu nữa, thì mình đã tìm thấy 1 thư viện khác có thể làm "ngon" hơn nữa, đó là [moviepy](https://pypi.org/project/moviepy/).

B1: cài cắm
```
pip install moviepy
```
B2: chạy thôi
```
from moviepy.editor import VideoFileClip 
video = VideoFileClip(video_url)
print(video.fps)
```

### Kết quả
Như vậy là mình đã tìm hiểu được về cách lấy FPS của video thông qua file/URL với **VLC** và **moviepy**, mình sẽ tiếp tục tìm hiểu thêm trong thời gian tới để có những giải pháp đơn giản và hiệu quả hơn nữa. Hi vọng sẽ giúp các bạn có thể giải quyết được những vấn đề đang gặp phải để có một ngày làm việc thật tốt nhé.

HAPPY CODING!

-----
*P/S: Ngoài những cách bên trên, mình vẫn đang thử tìm hiểu thêm có còn cách nào khác đơn giản mà hiệu quả hơn không, ví dụ như lấy fps của video thông qua js
https://mediainfo.js.org/ tuy nhiên sử dụng cách này thì video sẽ được đọc ngay từ lúc upload lên chứ không phải đọc qua URL.*