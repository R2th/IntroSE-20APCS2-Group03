### Giới thiệu công nghệ Hand Tracking ( Theo dõi chuyển động của bàn tay)

#### - Giới thiệu:

Ngày nay công nghệ thông tin đang ngày càng phát triển mạnh mẽ, trong đó công nghệ thực tế ảo đang được chú trọng và được rất nhiều các nước và các công ty công nghệ hàng đầu quan tâm.
    
Hiện này, hầu hết sự tuơng tác giữa con người với công nghệ thực tế ảo đều thông qua các thiết bị hỗ trợ như găng tay cảm biến, … . Vậy nên để có thể tương tác với công nghệ ảo mà không cần thiết bị hỗ trợ thì cần phải có một công nghệ thay thế. 
    
Hand tracking là công nghệ được phát triển để theo dõi chuyển động và mô phỏng lại mô hình của bàn tay trong không gian. Việc này được thực hiện bằng các phân tích các hình ảnh thông qua video. Và sau đó bàn tay được mô phỏng lại bằng mô hình 3D.

Con người tuơng tác với thế giới ảo qua thiết bị hỗ trợ (Hình ảnh bên dưới).
![](https://images.viblo.asia/92180ebb-bd06-40cd-9498-dc1fee25ff1f.png)
                                        
Bàn tay được mô phỏng bằng công nghệ hand tracking (Hình ảnh bên dưới).
![](https://images.viblo.asia/445a9f93-c02e-4cb8-8a8a-46a5793690f9.png)

#### - Thư viện sử dụng: Thư viện OpenCV

OpenCV được xây dựng để cung cấp một cơ sở hạ tầng chung cho các ứng dụng thị giác máy tính và để đẩy nhanh việc sử dụng nhận thức máy trong các sản phẩm thương mại. Là một sản phẩm được cấp phép BSD, OpenCV giúp các doanh nghiệp dễ dàng sử dụng và sửa đổi mã. 
 - Cấu hình hệ thống:
   - Hệ điều hành:
    + Ubuntu 14 hoặc ubuntu 16
    + Windown 8 hoặc windown 10.
    + Mac OSX Maverichs và các phiên bản khác (trên tất cả các version CPU)
    - Cấu hình hệ thống (Cấu hình tiêu chuẩn) :
    +  Nvidia GPU version:
        NVIDIA graphics card with at least 1.6 GB and At least 2.5 GB of free RAM memory for BODY_25 model or 2 GB for COCO.
        Highly recommended: cuDNN.
    + AMD GPU version:
        Vega series graphics card.
        At least 2 GB of free RAM memory.
    + CPU version:
        Around 8GB of free RAM memory.
        
##### Cài đặt:
   Buớc 1: Clone Openpose:
   
  + Ubuntu: git clone https://github.com/CMU-Perceptual-Computing-Lab/openpose
       
   + Windown: sử dụng GitHub Desktop (https://desktop.github.com/)
   Bước 2: Cài đặt:
       + Trước khi cài đặt hãy update phiên bản mới nhất của openpose.
       1. Cài đặt cmake
           - Ubuntu: `sudo apt-get install cmake-qt-gui`
          - Windown: cài đặt file thực thi trong link: https://cmake.org/download/
          - Mac: `brew cask install cmake`
       2. Trong windown cài đặt Visual studio 2015 Enterprise Update 3
           - Chú ý: với các phiên bản khác sẽ có thể xảy ra một số lỗi (Compiler errors, ...)
       3. Điều kiện tiên quyết Nvidia GPU version
             + CUDA 8
             - Ubuntu: chạy lệnh `sudo ubuntu/install_cuda.sh`
             - Windown: Cài đặt CUDA 8 sau khi cài visual studio.
             + CUDA 5.1
               Để cài đặt chỉ cần giải nén và sao chép nọi dung trên thư mục CUDA.
             - Ubuntu: có thể cài đặt bằng cách chạy lệnh `sudo ubuntu/install_cudnn.sh`
       4. Điều kiện tiên quyết AMD GPU version
           - Windown: Tải xuống trình điều khiển AMD chính thức cho Windows từ AMD - Windows.
           Tải xuống trình điều khiển ROCM của bên thứ ba cho Ubuntu từ AMD - OpenCL.
          - Ubuntu: chạy lệnh `sudo apt-get install libviennacl-dev`
    Bước 3: Building:
          - Ubuntu: 
          + `cd build/`
          + make -j `nproc`
          - Windown:
          + Để xây dựng dự án, mở Visual studio : `build/OpenPose.sln` . Sau đó thiết lập cấu hình từ Debug to Release.
#### - Các công nghệ hiện tại:

Hiện nay, có rất nhiều nhóm trên thế giới đang phát triển về công nghệ hand tracking(Theo dấu chuyển động của bàn tay) vì vậy để theo dõi chuyển động của bàn tay đã có rất nhiều phương pháp được phát triển, ví dụ như:
    
- OpenCV Hand tracking Fingers tracking
- Openpose
- Htrack
- Mobile Hand Tracking
- Impressive Hand tracking
- 3D Hand Tracking

 Hiện nay các phương pháp được sử dụng trong công nghệ hand traking luôn tồn tại  những ưu nhược điểm riêng, mỗi phương pháp có một ưu thế riêng không có phương pháp tối ưu nhất. Vì vậy tùy vào mục đích sử dụng để lựa chọn phuơng pháp tốt nhất hoặc kết hợp các phương pháp để cho ra hiệu quả tốt nhất.

#### - Input, Output

Input: Image, video, webcam, and IP camera. Included C++ demos to add your custom input.
    
Output: Basic image + keypoint display/saving (PNG, JPG, AVI, ...), keypoint saving (JSON, XML, YML, ...), and/or keypoints as array class.
    
#### Link tham khảo:
http://www.samehkhamis.com/taylor-siggraph2016.pdf

https://opencv.org/ 
                                
Cảm ơn các bạn đã theo dõi. Trong phần tiếp theo tôi sẽ đi sâu hơn về cách cài đặt thư viện, cài đặt các thuật toán và phân tích ưu nhược điểm các thuật toán.