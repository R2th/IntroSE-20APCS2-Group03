# Hướng dẫn cài đặt opencv trong lập trình java

<br>
<br>

### 1. OpenCV là gì?


OpenCV là một thư viện mã nguồn mở hàng đầu cho thị giác máy tính (computer vision), xử lý ảnh và máy học, và các tính năng tăng tốc GPU trong hoạt động thời gian thực.
OpenCV được phát hành theo giấy phép BSD, do đó nó hoàn toàn miễn phí cho cả học thuật và thương mại. Nó có các interface C++, C, Python, Java và hỗ trợ Windows, Linux, Mac OS, iOS và Android. OpenCV được thiết kế để tính toán hiệu quả và với sự tập trung nhiều vào các ứng dụng thời gian thực. Được viết bằng tối ưu hóa C/C++, thư viện có thể tận dụng lợi thế của xử lý đa lõi. Được sử dụng trên khắp thế giới, OpenCV có cộng đồng hơn 47 nghìn người dùng và số lượng download vượt quá 6 triệu lần. Phạm vi sử dụng từ nghệ thuật tương tác, cho đến lĩnh vực khai thác mỏ, bản đồ trên web hoặc công nghệ robot.

<br>
<br>

### 2. Chức năng OpenCV
1. Image/video I/O, xử lý, hiển thị (core, imgproc, highgui)
1. Phát hiện các vật thể (objdetect, features2d, nonfree)
1. Geometry-based monocular or stereo computer vision (calib3d, stitching, videostab)
1. Computational photography (photo, video, superres)
1. Machine learning & clustering (ml, flann)
1. CUDA  acceleration (gpu)

<br>
<br>

### 3. Hướng dẫn cài đặt và sử dụng (trên intellij)

***Bước 1:***  Vào trang https://opencv.org/releases.html tiến hành download openCV bản mới nhất 

![](https://images.viblo.asia/97bf26d9-a923-471e-986a-478ff1c587b4.PNG)

Vì mình dùng windown nên mình sẽ download **Win pack**

<br>

Sau khi download về các bạn tiến hành giải nén nó

![](https://images.viblo.asia/82b95d83-eb50-458d-862e-9f0078736417.PNG)

<br>

Và đây là kết quả:

![](https://images.viblo.asia/65a3518e-3109-4dff-a44b-0f80161a2aa8.PNG)

<br>
<br>

***Bước 2:*** Khởi tạo 1 project java thông thường

![](https://images.viblo.asia/31eff8fd-567a-44ec-8ce4-279af5f864ac.PNG)

<br>
<br>


***Bước 3:*** Import thư viện OpenCV

Các bạn vào File -> Project structure -> Modules

![](https://images.viblo.asia/89092ad4-3c7f-40b4-b0e2-649a3006ad49.PNG)

Sau đó các bạn chọn Dependencies và click vào dấu “+” để tiến hành import thư viện
 
 <br>
 
Mình sẽ chọn cái JARs or directories…
 
 <br>
 
Tiếp tục trỏ nó đến file jar của openCV mà mình vừa giải nén nhé

![](https://images.viblo.asia/5a8e2419-216f-4cf1-a002-56fd6c7bf3ee.PNG)

Đây là hình ảnh sau khi ta import file jar xong

![](https://images.viblo.asia/75e035af-6254-4704-b308-e042c444cb45.PNG)

Tiếp tục nháy đúp vào file jar đó và ấn dấu (+) để add file dll vào file jar

![](https://images.viblo.asia/0a0f2290-3cf7-421c-ad14-74936ede63f2.PNG)

Đây chính là file dll

![](https://images.viblo.asia/f1ae3c04-0ee3-4b1b-9b54-33e3f34a56ca.PNG)

Cuối cùng ta ấn OK và Apply là xong việc import openCV

![](https://images.viblo.asia/19ec4eef-513d-40da-98f3-55be28be043e.PNG)

Thư viện openCV đã có trong project của chúng ta

<br>
<br>


### 4. Chương trình demo với openCV

```
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
 
public class Main {
   public static void main(String[] args) {
       System.loadLibrary(Core.NATIVE_LIBRARY_NAME);
       Mat mat = Imgcodecs.imread("test.jpg");
 
       Imgproc.rectangle(mat, new Point(10, 10),
               new Point(100, 100),
               new Scalar(0, 255, 0));
 
       Imgcodecs.imwrite("result_test.jpg", mat);
   }
}
```

Run chương trình và đây là kết quả:

**Ảnh test:**

<br>

![](https://images.viblo.asia/b63979bd-d368-4322-81f6-27f207592f33.jpg)

<br>
<br>

**Ảnh kết quả:**

<br>

![](https://images.viblo.asia/df23d068-5dc2-4388-9ff2-9c0cd696acac.jpg)

***Đây mới chỉ là ví dụ đơn giản về việc đọc ghi ảnh thông thường mà sử dụng OpenCV. Hi vọng bài viết của mình sẽ có ích cho những bạn nào mới bắt đầu cài đặt làm quen với OpenCV. Cảm ơn!***