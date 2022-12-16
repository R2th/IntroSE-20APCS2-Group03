Xin chào các bạn hôm nay mình sẽ tiếp tục hướng dẫn các bạn cài đặt OpenCV4 lên MacOS.

(phần 1: https://viblo.asia/p/huong-dan-cai-dat-opencv-4-len-macos-phan-1-Qbq5Q323ZD8)

### **Cài đặt python dependencies cho OpenCV4**

Chúng ta sẽ cài đặt các phụ thuộc Python cho OpenCV4 trong bước này. 

Hãy tải xuống và cài đặt pip (trình quản lý gói Python):

```
$ wget https://bootstrap.pypa.io/get-pip.py
$ sudo python3 get-pip.py
```
Sau khi đã cài đặt pip, chúng ta có thể cài đặt `virtualenv và virtualenvwrapper` , hai công cụ để quản lý môi trường ảo.

Hãy cài đặt `virtualenv và virtualenvwrapper`  , sau đó dọn dẹp một chút:
```
$ sudo pip3 install virtualenv virtualenvwrapper
$ sudo rm -rf ~/get-pip.py ~/.cache/pip
```
Tiếp theo chúng ta cần chỉnh sửa lại bash profile của mình để hai công cụ này hoạt động chính xác.
```
$ nano ~/.bash_profile
```
Và sau đó thêm các dòng này vào cuối:
```
# virtualenv and virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3
source /usr/local/bin/virtualenvwrapper.sh
```
![](https://images.viblo.asia/f33cd780-c168-43bb-9ec8-a60f19a005cc.jpg)
Bạn cũng có thể sử dụng echo để thêm vào bash profile mà không cần mở file bash:
```
$ echo -e "\n# virtualenv and virtualenvwrapper" >> ~/.bash_profile
$ echo "export WORKON_HOME=$HOME/.virtualenvs" >> ~/.bash_profile
$ echo "export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3" >> ~/.bash_profile
$ echo "source /usr/local/bin/virtualenvwrapper.sh" >> ~/.bash_profile
```
Sau đó
```
$ source ~/.bash_profile
```
Công  cụ `virtualenvwrapper` cung cấp cho chúng ta một số lệnh:

`mkvirtualenv <env_name> <options>`  : Được sử dụng để tạo ra một môi trường ảo

`rmvirtualenv <env_name>`  : Gở bỏ môi trường ảo

`workon <env_name>`  : Kích hoạt một môi trường ảo

`deactivate`  : Hủy kích hoạt môi trường ảo hiện tại

Hãy dùng lệnh đầu tiên để tạo môi trường ảo Python cho OpenCV:
```
$ mkvirtualenv cv -p python3
```
Kết quả
```
Running virtualenv with interpreter /usr/local/bin/python3
Using base prefix '/usr/local/Cellar/python/3.6.5_1/Frameworks/Python.framework/Versions/3.6'
New python executable in /Users/admin/.virtualenvs/cv/bin/python3.6
Also creating executable in /Users/admin/.virtualenvs/cv/bin/python
Installing setuptools, pip, wheel...
done.
virtualenvwrapper.user_scripts creating /Users/admin/.virtualenvs/cv/bin/predeactivate
virtualenvwrapper.user_scripts creating /Users/admin/.virtualenvs/cv/bin/postdeactivate
virtualenvwrapper.user_scripts creating /Users/admin/.virtualenvs/cv/bin/preactivate
virtualenvwrapper.user_scripts creating /Users/admin/.virtualenvs/cv/bin/postactivate
virtualenvwrapper.user_scripts creating /Users/admin/.virtualenvs/cv/bin/get_env_details
```
Lưu ý rằng `cv`  là tên của môi trường của chúng ta và ta đang tạo môi trường Python 3.

**Quan trọng: Lưu ý rằng Python 3.6 đang được sử dụng cho môi trường (được tô sáng).**

Bạn có thể đặt tên cho môi trường của bạn khác nhau nếu bạn muốn. Tôi thực sự thích đặt tên cho môi trường của mình như vậy:

1. py3cv4
2. py3cv3
3. py2cv2
4. ...

Tiếp theo, hãy cài đặt NumPy khi chúng ta ở trong môi trường.

Rất có thể, môi trường đã hoạt động (được biểu thị bằng (cv) trước dấu nhắc bash của bạn). Chỉ trong trường hợp, chúng ta hãy workon (kích hoạt) môi trường:
```
$ workon cv
```
![](https://images.viblo.asia/609b3b65-ca21-4cbf-820c-64ba7aa72038.jpg)
Bây giờ môi trường của chúng ta đã được kích hoạt, chúng ta có thể cài đặt NumPy:
```
$ pip install numpy
```
# **Compile OpenCV cho MacOS**
Compile từ source cho phép bạn điều khiển ở mức tối đa dối với bản build của bạn. Không giống như các trình quản lý package như pip, anaconda, homebrew

Trình quản lý package rất thuận tiện tuy nhiên bạn có thể sẽ không có bản update mới nhất của OpenCV và trong một số trường hợp nó có vẻ hoạt động không tốt với môi trường ảo. Bạn cũng có thể bị thiếu một số tính năng.

**Tải xuống OpenCV 4**
Đầu tiên chúng ta di chuyển đến home và tải xuống `opencv` và `opencv_contrib`:
```
$ cd ~
$ wget -O opencv.zip https://github.com/opencv/opencv/archive/4.0.0.zip
$ wget -O opencv_contrib.zip https://github.com/opencv/opencv_contrib/archive/4.0.0.zip
```
Sau đó giải nén:
```
$ unzip opencv.zip
$ unzip opencv_contrib.zip
```
Đổi tên thư mục:
```
$ mv opencv-4.0.0 opencv
$ mv opencv_contrib-4.0.0 opencv_contrib
```
Nếu bạn bỏ qua việc đổi tên các thư mục, đừng quên cập nhật các đường dẫn `cmake`. Như hiện tại là `opencv` và `opencv_contrib`

**Compile OpenCV 4 từ source**
```
$ cd ~/opencv
$ mkdir build
$ cd build
```
Bây giờ chúng ta đã sẵn sàng cho `cmake`. Hãy chắc chắn sử dụng lệnh `workon` trước khi thực hiện lệnh `cmake` như dưới:
```
$ workon cv
$ cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib/modules \
    -D PYTHON3_LIBRARY=`python -c 'import subprocess ; import sys ; s = subprocess.check_output("python-config --configdir", shell=True).decode("utf-8").strip() ; (M, m) = sys.version_info[:2] ; print("{}/libpython{}.{}.dylib".format(s, M, m))'` \
    -D PYTHON3_INCLUDE_DIR=`python -c 'import distutils.sysconfig as s; print(s.get_python_inc())'` \
    -D PYTHON3_EXECUTABLE=$VIRTUAL_ENV/bin/python \
    -D BUILD_opencv_python2=OFF \
    -D BUILD_opencv_python3=ON \
    -D INSTALL_PYTHON_EXAMPLES=ON \
    -D INSTALL_C_EXAMPLES=OFF \
    -D OPENCV_ENABLE_NONFREE=ON \
    -D BUILD_EXAMPLES=ON ..
```
Khi `cmake` đã kết thúc, hãy cuộn lên cho đến khi bạn thấy thông tin sau:
![](https://images.viblo.asia/3341f898-59b7-4226-b219-a73a69244d65.jpg)
Otput của bạn sẽ trông rất giống với mình. Những gì bạn đang tìm kiếm là để đảm bảo rằng trình thông dịch` Python 3` và `NumPy` của bạn trong môi trường ảo sẽ được sử dụng. Nếu bạn không thấy điều này, thì có khả năng bạn đã thực hiện `cmake` mà không phải trong môi trường ảo `cv` (hoặc bất cứ tên môi trường ảo Python của bạn). Nếu là trường hợp đó, không phải lo lắng - chỉ cần xóa thư mục `build` , kích hoạt môi trường ảo bằng lệnh `workon` và chạy lại `cmake`.

Tiếp theo, cuộn lên xa hơn một chút để kiểm tra xem output của bạn có khớp với nơi mình đã tô sáng không:
![](https://images.viblo.asia/fb2aa84a-70dd-41d8-8b58-6645298f5ccb.jpg)
Sau khi đúng hết tất cả hãy bắt đầu compile bằng:
```
$ make -j4
```
Đối số `-j4` là tùy chọn và sẽ giúp `make` tận dụng 4 lõi CPU. Bạn có thể điều chỉnh giá trị số hoặc bỏ hoàn toàn đối số.

Khi `make` xong bạn sẽ thấy:
![](https://images.viblo.asia/dca7e4da-e225-45d6-a36f-f287717492f6.jpg)
Nếu bạn đã đạt 100%, thì sẽ có thêm một lệnh để cài đặt OpenCV 4:
```
$ sudo make install
```
### Sym-link OpenCV4 trên MacOS với môi trường ảo site-pagekages
Bây giờ chúng ta cần tạo ra cái được gọi là `symbolic link`. Chúng ta cần link môi trường ảo `cv`  `site-pagekages` tới `site-pagekages` hệ thống nới OpenCV được cài đặt. Tóm lại là OpenCV liên kết với môi trường ảo cho phép nhập nó vào các tập lệnh Python cũng như trình thông dịch các tập lệnh.

Hãy xác định python version:
```
$ workon cv
$ python --version
```
Kết quả
```
Python 3.6
```
Các phiên bản trước của OpenCV đã cài đặt các liên kết ở một vị trí khác (`/usr/local/lib/python3.6/site-packages`), vì vậy hãy chắc chắn xem xét các đường dẫn bên dưới một cách cẩn thận.
Tại thời điểm này, các ràng buộc Python 3 cho OpenCV sẽ nằm trong thư mục sau:
```
$ ls /usr/local/python/cv2/python-3.6
cv2.cpython-36m-darwin.so
```
Hãy đổi tên chúng thành `cv2.so` :
```
$ cd /usr/local/python/cv2/python-3.6
$ sudo mv cv2.cpython-36m-darwin.so cv2.so
```
Nếu bạn đang cài đặt OpenCV 3 và OpenCV 4 cùng nhau, thay vì đổi tên tệp thành `cv2 .so`, bạn có thể xem xét đặt tên cho nó là `cv2.opencv4.0.0.so` và sau đó trong liên kết sym-step bước tiếp theo một cách thích hợp từ tệp đó đến `cv2 .so`.

Sym-link OpenCV:
```
$ cd ~/.virtualenvs/cv/lib/python3.6/site-packages/
$ ln -s /usr/local/python/cv2/python-3.6/cv2.so cv2.so
```
Hãy chắc chắn rằng đường dẫn của bạn là chính xác. **Mình khuyên bạn nên dùng tab hơn là sao chép / dán.**

Python trong môi trường ảo `cv` là hoàn toàn độc lập và khác biệt với python mặc định của hệ thống. Nên bất kỳ cài đặt nào trên python mặc định sẽ không có trên python môi trường ảo và ngược lại. Biết rõ điều này giúp bạn tránh được những rắc rối về sau.

**Tải về imutils**
```
$ workon cv
$ pip install imutils
```
### Kiểm tra lại cài đặt
Điều quan trọng là luôn kiểm tra cài đặt OpenCV của bạn để đảm bảo các liên kết thích hợp đã được thực hiện.
```
$ workon cv
$ python
>>> import cv2
>>> cv2.__version__
'4.0.0'
>>> exit()
```
![](https://images.viblo.asia/b563f3a5-6c52-4cd5-b0de-cd8ea08e75cb.jpg)
Miễn là bạn không thấy lỗi và OpenCV 4 đã được cài đặt.

Vậy là bạn đã hoàn thành cài đặt OpenCV 4 lên MacOS. Chúc các bạn thành công

Nguồn: https://www.pyimagesearch.com/2018/08/17/install-opencv-4-on-macos/