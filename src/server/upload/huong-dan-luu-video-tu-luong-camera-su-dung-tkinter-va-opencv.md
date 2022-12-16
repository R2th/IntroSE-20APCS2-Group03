Ở bài viết này thì mình sẽ hướng dẫn các bạn thiết kế 1 chương trình đơn giản để có thể show luồng camera từ máy tính hoặc luồng rtsp, sau đó có thể lưu video theo bao nhiêu giây đó tùy các bạn. Ở bài viết này mình sẽ sử dụng thư viện tkinter để làm giao diện và opencv để đọc luồng video và xử lí frame và xuất ra video. Không luyên thuyên nữa mình sẽ đi vào phần hướng dẫn tạo chương trình luôn nhé.

Đầu tiên, để làm quen với tkinter, chúng ta sẽ tạo một giao diện rỗng như sau:
```
import tkinter
import cv2

class App:
    def __init__(self, window, window_title):
        self.window = window
        self.window.title(window_title)

        self.window.mainloop()
App(tkinter.Tk(), "Tkinter and OpenCV")
```
Sau khi chạy dọng lệnh trên, sẽ hiện lên một cửa sổ rỗng. Như vậy bước đầu bạn đã làm quen được với giao diện sử dụng tkinter.

Tiếp theo, ta sẽ dùng hàm VideoCapture của OpenCV để mở video, lấy kích thước chiều cao và chiều rộng và đảm bảo rằng nguồn video được đưa ra khi đối tượng bị hủy:
```
class MyVideoCapture:
    def __init__(self, video_source):
        self.vid = cv2.VideoCapture(video_source)
        if not self.vid.isOpened():
            raise ValueError("Unable to open video source",video_source)
        self.width = self.vid.get(cv2.CAP_PROP_FRAME_WIDTH)
        self.height = self.vid.get(cv2.CAP_PROP_FRAME_HEIGHT)

    def __del__(self):
        if self.vid.isOpened():
            self.vid.release()
        self.window.mainloop()
```
Tiếp theo, sử dụng phương thức đọc của VideoCapture để lấy từng frame trong video nguồn :
```
class MyVideoCapture:
 
    # ...
    
    def get_frame(self):
        if self.vid.isOpened():
            ret, frame = self.vid.read()
            frame = cv2.resize(frame,(640,480))
            if ret:
                return (ret, cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            else:
                return (ret,None)
```
Bây giờ, chúng ta có thể tạo một đối tượng MyVideoCature trong hàm App và sử dụng kích thước chiều cao, rộng của nguồn video để tạo canvas đủ lớn để chứa video bên trong:
```
class App:
    def __init__(self, window, window_title,video_source = 0, fpsLimit = 30):

        self.window = window
        self.window.title(window_title)

        self.video_source = video_source
        self.fpsLimit = fpsLimit

        self.vid = MyVideoCapture(video_source)    
        self.canvas = tkinter.Canvas(window, width = self.vid.width, height = self.vid.height)
        self.canvas.pack()
```
Nếu bạn chạy những dòng lệnh trên, bạn sẽ thấy một cửa sổ trắng, đủ lớn để có thể chứa đầu vào webcam của bạn. Thoát khỏi cửa sổ sẽ dừng luôn webcam.

Để biết đầu vào của webcam là gì, chúng ta cần tiếp túc lấy các frame từ camera và show nó ra trên Canvas. Trong một loại ứng dụng OpenCV, bạn có thể viết một vòng lặp không giới hạn và lấy các frame từ đầu vào của camera cho đến khi nào người dùng đóng cửa sổ. Điều này không được khuyến khích khi sử dụng cùng Tkinter. Tkinter giống như các thư việu GUI khác, có một vòng lặp để xử lí các sự kiện và vẽ lại trên ứng dụng. Một giải pháp để tích hợp tốt với Tkinter đó là thêm một phương thức cập nhật cho lớp App, cũng được chuyển cho phương thức after là một widget của Tkinter. 
```
class App:
    def update(self):
          
        self.window.after(self.delay, self.update)
```
Tại thời điểm này, nếu chạy chương trình, bạn sẽ thấy hình ảnh thu được từ camera của bạn đã hiển thị trên cửa sổ Tkinter.

Bây giờ, để thực hiện việc nhận sự kiến lấy video, ta phải có một nút trên giao diện để phía backend nhận được sự kiện để xử lí lưu video trong những giây tiếp theo. Ta sẽ tạo một nút trước khi gọi phương thức update:
```
class App:
    def __init__(self, window, window_title,video_source = 0, fpsLimit = 30):
        #...
        self.btn_getvideo=tkinter.Button(window, text="getvideo", width=50, command=self.getvideo)
        self.btn_getvideo.pack(anchor=tkinter.CENTER, expand=True)
        self.delay = 1
        self.update()
        
        self.window.mainloop()
```
Khi mà nút **getvideo** được nhấn bởi người dùng, phương thức getvideo sẽ được gọi lên, ở đây chúng ta sẽ thực hiện tạo một hàm VideoWriter của openCV để khởi tạo video. Sau đó dựa vào số giây mà bạn muốn khởi tạo cho video thì xây dựng đoạn code lấy frame của camera của máy tính từ thời điểm bắt đầu nhấn đến thời điểm mà bạn muốn bằng dòng lệnh sau:
```
def getvideo(self):
        start_time = time.time()
        out = cv2.VideoWriter('output_'+time.strftime("%d-%m-%Y-%H-%M-%S")+'.avi', cv2.VideoWriter_fourcc(*'XVID'), 20.0, (640,480))

        while int(time.time()-start_time) < self.fpsLimit:           
            ret, frame = self.vid.get_frame()
            if ret:
                out.write(cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))
            else:
                break
        out.release()
        tkinter.messagebox.showinfo(title="Notification", message="save video successful")
        cv2.destroyAllWindows()
```
Sau khi kết thúc, sẽ hiện thị thông báo thành công và video sẽ được lưu ở cùng thư mục đó.
Dưới đây là đầy đủ code chạy được, các bạn cài đặt openCV và tkinter sau đó chạy dòng code dưới đây :
```
import tkinter
import cv2
import time
import PIL.Image, PIL.ImageTk
import tkinter.messagebox
class MyVideoCapture:
    def __init__(self, video_source):
        self.vid = cv2.VideoCapture(video_source)
        if not self.vid.isOpened():
            raise ValueError("Unable to open video source",video_source)
        self.width = self.vid.get(cv2.CAP_PROP_FRAME_WIDTH)
        self.height = self.vid.get(cv2.CAP_PROP_FRAME_HEIGHT)

    def __del__(self):
        if self.vid.isOpened():
            self.vid.release()

    def get_frame(self):
        if self.vid.isOpened():
            ret, frame = self.vid.read()
            frame = cv2.resize(frame,(640,480))
            if ret:
                return (ret, cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            else:
                return (ret,None)

class App:
    def __init__(self, window, window_title,video_source = 0, fpsLimit = 30):

        self.window = window
        self.window.title(window_title)

        self.video_source = video_source
        self.fpsLimit = fpsLimit

        self.vid = MyVideoCapture(video_source)    
        self.canvas = tkinter.Canvas(window, width = self.vid.width, height = self.vid.height)
        self.canvas.pack()
        self.btn_getvideo=tkinter.Button(window, text="getvideo", width=50, command=self.getvideo)
        self.btn_getvideo.pack(anchor=tkinter.CENTER, expand=True)
        self.delay = 1
        self.update()

        self.window.mainloop()
    def getvideo(self):
        start_time = time.time()
        out = cv2.VideoWriter('output_'+time.strftime("%d-%m-%Y-%H-%M-%S")+'.avi', cv2.VideoWriter_fourcc(*'XVID'), 20.0, (640,480))

        while int(time.time()-start_time) < self.fpsLimit:           
            ret, frame = self.vid.get_frame()
            if ret:
                out.write(cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))
            else:
                break
        out.release()
        # tkinter.messagebox.showinfo(title="Notification", message="save video successful")
        print("success")
        cv2.destroyAllWindows()


    def update(self):
        ret, frame = self.vid.get_frame()
        if ret:
            self.photo = PIL.ImageTk.PhotoImage(image = PIL.Image.fromarray(frame))
            self.canvas.create_image(0, 0, image = self.photo, anchor = tkinter.NW)
        self.window.after(self.delay, self.update)
        
App(tkinter.Tk(), "get_video",0,10)
```
Lưu ý vì mình chỉ code trên 1 luồng nên khi nhấn nút getvideo thì giao diện trên tkinter sẽ đứng yên do đang thực hiện lấy frame và lưu vào video, sau khi lưu video xong thì giao diện lại tiếp tục hiển thị hình ảnh lấy từ camera. Ngoài ra bạn có thể sử dụng link luồng rtsp để thay vào tham số của VideoCapture để đọc.

Trên đây là một bài viết ngắn , hy vọng sẽ giúp ích được cho các bạn trong học tập và công việc. Cảm ơn các bạn đã đọc, cho mình 1 vote vì nó free nhé ^^. 

Bài viết này có sự tham khảo code [tại đây](https://solarianprogrammer.com/2018/04/21/python-opencv-show-video-tkinter-window/?fbclid=IwAR1Jxgexq-jUh1fU46peV9qOaOlX9JxuTNTWDvXpiU9dprHrIljUZtgm3nY). Nhưng đã có sự thay đổi để có thể lưu được video thay vì lưu file ảnh.