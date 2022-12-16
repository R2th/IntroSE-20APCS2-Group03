dlib là một thư viện được viết bằng C++ về machine learning được sử dụng trong rất nhiều ứng dụng liên quan đến xử lý hình ảnh. Nó được sử dụng trong nhiều ứng dụng liên quan đến computer vision và machine learning, nó có thể được sử dụng để phát hiện các điểm trên khuôn mặt như mắt, mũi, môi, v.v. Ví dụ như ứng dụng snapchat sử dụng các filter trên khuôn mặt.

![](https://images.viblo.asia/bedfce32-b579-41ee-9330-8921d1ac3c2d.jpg)

Vì nó là thư viện C++ nên có một chút khó khăn để làm cho nó hoạt động trong dự án iOS swift. Bài viết này nhằm mục đích giải thích cách thêm dlib vào một dự án iOS hiện có.


# Building dlib

Chúng ta sẽ cần cài đặt X11 và CMake . Nếu bạn không có cmake, bạn có thể cài thông qua homebrew.

`brew install cmake`

- Mở terminal và cd tới thứ mục bên trong folder dlib.
- Sau đó tạo 1 thư mục có tên là "build"

`mkdir build && cd build`

- Sau đó thực hiện các lệnh sau:

`cmake -G Xcode ..`

`cmake --build . --config Release`

Một project Xcode sẽ được tạo ra bên trong thư mục "build/dlib_buid" mà vừa tạo trước đó.

![](https://images.viblo.asia/cc09dc9e-b6e1-49e5-8164-0789f655e2d1.png)

Bây giờ chúng ta có thư viện dlib đã được build và setup. Hay cùng thử thêm thư viện đó vào trong project Xcode.

# Thêm dlib vào project Xcode

Trong thư mục root của project Xcode tạo một folder tên là 'lib'. Sau đó copy file 'libdlib.a' từ project xcode dlib tạo được từ bên trên vào thư mục 'lib' vừa tạo. 
Sau đó copy thư mục 'dlib' từ thư mục 'dlib-{verison}' ví dụ: dlib-19.2 và paste vào thư mục 'lib'.

  Kéo file 'libdlib.a' từ thư mục lib và thả vào project Xcode chúng ta đang thêm thư viện dlib. Khi xong thì file libdlib.a sẽ hiện trong mục "linked libraries and frameworks" trong project Xcode.
    
Đây là tất cả các tệp cần thiết để thêm dlib vào porject Xcode. Nhưng nếu build ngay lúc này nó sẽ không hoạt động vì chúng cần thiết lập một số  flag và thêm header path framework cho xcode để có thể build thư viện dlib cùng với project hiện tại.

# Thiết lập

Mở mục "Build Settings" sau đó thêm vào các mục ‘Library Search Paths’ và ‘Header Search Paths’ như sau:

`$(PROJECT_DIR)/lib`

Phần này sẽ cho xcode biết được thư mục dlib ở đâu trong quá trình build.
Tiếp theo cần thêm 1 số các macros tiền xử lý để Xcode có thể compile các file dilb đúng cách.
```
DLIB_NO_GUI_SUPPORT
DLIB_JPEG_SUPPORT
NDEBUG
DLIB_USE_BLAS
DLIB_USE_LAPACK
```

![](https://images.viblo.asia/8918a3a3-ec38-4c81-a45b-5a8c51a8c035.png)

Như vậy đã có đủ các setting cần thiết cho việc thêm thư viện dlib vào trong project Xcode. Trong một số trường hợp nếu gặp lỗi "BITCODE ERROR" => Cần phải setting enable bitcode to "No" trong mục "Build Setting"

# Tổng kết
Đó là những thao tác cần để thêm thư viện dlib vào trong project xcode. Để sử dụng thư viện này cần viết thêm một class dạng wrappter các function của dlib. Ví dụ về phần đó mọi người có thể xem ở đây.
[face-landmarking-ios using dlib](https://github.com/zweigraf/face-landmarking-ios)