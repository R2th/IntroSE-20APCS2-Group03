[Google Collaboratory ](https://colab.research.google.com/notebooks/welcome.ipynb)vừa mới cho phép người dùng sử dụng GPU Tesla K80. Dù vẫn còn hạn chế về thời gian sử dụng (nhiều nhất chạy GPU 20 tiếng liên tục), tính năng mới giúp tăng tốc độ chạy thuật toán lên ít nhất x20 lần. Ở bài này mình sẽ hướng dẫn mọi người cách sử dụng GG Colab GPU và chạy thử demo keras.

## Chọn cài đặt GPU
Mặc định GG Colab sẽ chạy trên CPU, để chạy trên GPU, chúng ta chọn Runtime => Change runtime type => GPU

![](https://images.viblo.asia/a0614d7d-2e29-4876-ac1b-638957d67121.gif)

## Liên kết Google Drive với Google Colab
Nếu như bạn không có ý định sử dụng file/ tài liệu trên Google Drive thì có thể bỏ qua bước này, nhưng bản thân mình thấy bước này rất hữu ích.

Bạn mở/ tạo 1 file .ipynb bất kỳ lên để chạy các dòng lệnh phía sau.


#### 1. Cho phép quyền truy cập GG Drive
Copy dòng lệnh sau và chạy tất cả cùng lúc.
```
!apt-get install -y -qq software-properties-common python-software-properties module-init-tools
!add-apt-repository -y ppa:alessandro-strada/ppa 2>&1 > /dev/null
!apt-get update -qq 2>&1 > /dev/null
!apt-get -y install -qq google-drive-ocamlfuse fuse
from google.colab import auth
auth.authenticate_user()
from oauth2client.client import GoogleCredentials
creds = GoogleCredentials.get_application_default()
import getpass
!google-drive-ocamlfuse -headless -id={creds.client_id} -secret={creds.client_secret} < /dev/null 2>&1 | grep URL
vcode = getpass.getpass()
!echo {vcode} | google-drive-ocamlfuse -headless -id={creds.client_id} -secret={creds.client_secret}
```

**Lưu ý:** Bạn cần cho phép quyền truy cập **2 lần**. Mỗi lần hiện 1 link lên bạn click vào để lấy code rồi điền vào khung trống

Sau đó, bạn sẽ nhìn thấy thông báo sau, chứng tỏ cho phép quyền truy cập thành công
```
Please enter the verification code: Access token retrieved correctly.
```

#### 2. Tạo thư mục ảo trên GG Colab
Thư mục ảo có tên `drive`
```
!mkdir -p drive
!google-drive-ocamlfuse drive
```

## Các câu lệnh hữu ích

#### 1. Kiểm tra thông số
Chạy từng nhóm một để kiểm tra thông số bạn quan tâm
```
# Device
import tensorflow as tf
from tensorflow.python.client import device_lib
print('Current Device: ', tf.test.gpu_device_name() + '\n')
device_lib.list_local_devices()

# RAM: 
!cat /proc/meminfo
# CPU: 
!cat /proc/cpuinfo

# Tensorflow version
!pip show tensorflow
```
#### 2. Làm việc với thư mục
Trong thư mục `drive` của mình có chứa thư mục `app`.
```
!ls drive/app # Liet ke cac file trong thu muc app

import os
os.getcwd() # Thu muc hien tai
os.chdir("drive") # Truy cap thu muc drive 
os.chdir("..") # Quay vee thu muc truoc
```

#### 3. Cài đặt thư viện cần thiết:
Để cài đặt các thư viện, ta sử dụng 2 cú pháp `!pip install` và `!apt-get`
```
# keras
!pip install -q keras
# OpenCV
!apt-get -qq install -y libsm6 libxext6 && pip install -q -U opencv-python
import cv2
```

#### 4. Tải file hay thư mục
```
# Tai CSV
!wget https://raw.githubusercontent.com/vincentarelbundock/Rdatasets/master/csv/datasets/Titanic.csv -P drive/app
# Tai thu muc git
!os.chdir("drive/app")
!git clone https://github.com/wxs/keras-mnist-tutorial.git
```

#### 5. Chạy file `.ipynb` hay`.py`
Với file `.ipynb`, ta mở trực tiếp trong GG Drive bằng GG Colab. Rồi chạy chương trình
Nếu đã chạy câu lệnh `git clone` phía trên, các bạn có thể mở file `MNIST in keras.ipynb` ra để chạy thử. Bạn sẽ thấy tốc độ chạy hơn CPU rất nhiều.
Thông thường 1 epoch, batch size 128, mất khoảng 3-4s

![](https://images.viblo.asia/5ebbc5d2-c213-4b5b-961c-a18b942a26a2.png)

Với file `.py`, các bạn có thể tải file[ mnist_cnn.py](https://drive.google.com/file/d/1B9gTnoDXwhQJYUOTWnvPv91uY5QDo181/view?usp=sharing) hoặc upload file của các bạn lên GG Drive
```
os.getcwd() # Kiem tra thu muc hien tai
!python3 drive/app/mnist_cnn.py # Chay file mnist_cnn
```

## Lưu ý
* Hiện tại, cứ mỗi lần đăng nhập vào GG Colab, bạn sẽ được chỉ định 1 máy ảo khác nhau, nên toàn bộ quá trình cho phép quyền truy cập, cài đặt phần mềm phải **làm lại từ đầu**.

* Mình có tổng hợp [file cài đặt](https://drive.google.com/file/d/1kpudm9vNyDHOOuE_M4tHNzsP8wqf_4i7/view?usp=sharing) để tiện cho các lần sử dụng tiếp theo, trong file có thêm cài đặt pytorch, MXNet, libarchive...
* Thư viện hữu ích [Colab_utils](https://github.com/mixuala/colab_utils) giúp sử dụng Tensorboard trên GG Colab và dễ dàng lưu và khởi tạo dữ liệu nếu chạy lâu hơn 12h.

### Nguồn tham khảo
[Google Colaboratory Free GPU Tutorial](https://medium.com/deep-learning-turkey/google-colab-free-gpu-tutorial-e113627b9f5d)