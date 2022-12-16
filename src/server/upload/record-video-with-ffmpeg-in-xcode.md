FFMPEG là một công cụ hữu ích cho việc quay và chỉnh sửa video. Bài viết này mình sẽ giới thiệu cách để tích hợp ffmpeg vào trong xcode để có thể record video trong ứng dụng Macos.


-----


# Bước 1. Tích hợp ffmpeg vào Xcode
1, Download package cho Macos để tích hợp vào trong Xcode của ffmpeg tại đây
https://ffmpeg.org/download.html#build-mac

2, Sau khi đã có file package thì sẽ kéo vào trong thư mục của project như sau
![](https://images.viblo.asia/9d8fa9ae-81b0-475c-9a8c-6c385483318c.png)


# Bước 2. Xử dụng FFMPEG trong xcode
Để có thể sử dụng ffmpeg trong ứng dụng macos chúng ta sẽ sử dụng "Process" như sau
```

guard let launchPath = Bundle.main.path(forResource: "ffmpeg", ofType: "") else { return }
        DispatchQueue.global().async {
            let compressTask  = Process()
            compressTask.launchPath = launchPath
            compressTask.arguments = [
               // Command của FFMPEG sẽ được dùng ở đây
            ]
            do {
                try compressTask.run()
            } catch {
                
            }
        }
```

* Khởi tại một biến *launchPath* chính là source của ffmpeg trong project.
* Khởi tạo một Process *compressTask*  có các thuộc tính *launchPath* là biến *launchPath* vừa tạo và thuộc tính *arguments* chính là các command của ffmpeg.
* Sau khi đã có hai thuộc tính trên thì chúng ta có thể sử dụng câu lệnh *compressTask.run()*

Như vậy là chúng ta đã tích hợp và sử dụng được bộ package của ffmpeg. Tiếp theo sẽ là thêm command vào trong thuộc tính *arguments* để có thể chạy được ffmpeg.

# Bước 3. Xử dụng command FFMPEG để record video từ camera.
Trước để biết những index device nào support việc record thì cũng ta sẽ sử dụng câu lệnh

`-f avfoundation -list_devices true -i ""`

Câu lệnh này sẽ list ra những devices cho phép record với macos.
Thường thì 
* index 0: sẽ là default camera
* index :0 sẽ là default mic
* index 1: sẽ là default screen - Nếu máy không sử dụng 2 camera

## Record camera
Lưu ý: Command sử dụng  ffmpeg trong xcode được chia bởi từng biến nhỏ như sau
```
"-f", "avfoundation",
                "-framerate", "30",
                "-i", "0:0",
                "-vcodec", "libx264",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-preset", "ultrafast",
                "-tune", "zerolatency" ,
                "-pix_fmt", "yuv422p",
                "-b:a", "384k",
                "-b:v", "2500k",
                "-acodec", "aac",
                "-strict", "-2",
                "-t", "60",
                "-c", "copy",
                "-an", "\(folderRecord)/testCam.ts"
```
Một số commond cần lưu ý trong command trên
* "-i", "0:0": Record camera và Mic
* "-t", "60": Video sẽ có độ dài 60s
* "-an", "\(folderRecord)/testCam.ts": File chứa có định dạng .ts và được lưu ở folder record camera

## Record screen

```
"-f", "avfoundation",
                "-framerate", "30",
                "-i", "1:",
                "-vcodec", "libx264",
                "-force_key_frames", "expr:gte(t,n_forced*2)",
                "-preset", "ultrafast",
                "-tune", "zerolatency" ,
                "-pix_fmt", "yuv422p",
                "-b:a", "384k",
                "-b:v", "2500k",
                "-acodec", "aac",
                "-strict", "-2",
                "-t", "60",
                "-c", "copy",
                "-an", "\(folderRecord)/testScreen.ts"
```

Một số commond cần lưu ý trong command trên
* "-i", "1:": Record screen và không có audio
* "-t", "60": Video sẽ có độ dài 60s
* "-an", "\(folderRecord)/testScreen.ts": File chứa có định dạng .ts và được lưu ở folder record camera

----------
Bên trên là những cách cơ bản để tích hợp FFMPEG vào Xcode và run 1 vài command đơn giản.

Lưu Ý: Khi submit/verify app thì cần sign file ffmpeg trong folder của projet bằng Cer và Provisionning của Apple. Có thể tham khảo command sau

`pkgbuild --root build/pkgroot --identifier "com.iden.app" --version "1.0" --install-location "/" --sign "Developer ID Installer: AVCzczcQDAD (ten-num)" path_ffmpeg`