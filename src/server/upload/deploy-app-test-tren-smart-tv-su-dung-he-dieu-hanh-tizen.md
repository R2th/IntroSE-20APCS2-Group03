Hệ điều hành Tizen được Samsung cho ra mắt vào năm 2015. Đến năm 2017, hãng nâng cấp hệ điều hành với cái tên Tizen OS 4.0 phát triển trên nền tảng mã nguồn mở, hỗ trợ chuẩn web dành cho việc phát triển những ứng dụng trên tivi, sẽ giúp các nhà phát triển ứng dụng dễ dàng hơn trong việc tạo ra những nội dung tương thích. 
Trong bài viết lần này, mình sẽ hướng dẫn các bạn từng bước để demo 1 app test lên TV sử dụng hệ điều hành Tizen.

# 1. Cài đặt JDK:
Mở Terminal và nhập lệnh:
```shell
$ javac -version
```
Nếu máy đã cài đặt JDK, bạn sẽ thấy dòng thông báo như sau: 
```shell
javac 1.8.0_144
```
Nếu máy bạn đã cài JDK, bạn có thể bỏ qua bước này và tiến tới cài đặt Tizen luôn.

## Download và cài đặt:
*  Truy cập trang web: http://www.oracle.com/technetwork/java/javase/downloads/index.html. 
*  Lựa chọn phiên bản như sau:
Java Platform, Standard Edition ⇒ "Java SE 10.0.{x}" ⇒ JDK's "Download" ⇒ "Java SE Development Kit 10.0.{x}" ⇒ Chọn "Accept License Agreement" ⇒  "Linux" (for 64-bit system) "tar.gz" package, (e.g., "jdk-10.0.{x}-linux-x64_bin.tar.gz" - 338MB).
* Sau khi download hoàn thành, hãy tạo thư mục "java" nằm trong "usr/local".
Mở terminal và chạy:
```perl
$ cd /usr/local
$ sudo mkdir java
```
Giải nén package:
```shell
$ cd /usr/local/java
$ sudo tar xzvf ~/Downloads/jdk-10.0.2_linux-x64_bin.tar.gz
```
LDK nên được giải nén trong thư mục có dạng: "/usr/local/java/jdk-10.0.{x}" với x là số version.
Bạn nên thông báo cho Ubuntu để sử dụng JDK/JRE:
```
// Cài đặt vị trí cho java, javac và javaws
$ sudo update-alternatives --install "/usr/bin/java" "java" "/usr/local/java/jdk-10.0.{x}/bin/java" 1

$ sudo update-alternatives --install "/usr/bin/javac" "javac" "/usr/local/java/jdk-10.0.{x}/bin/javac" 1

$ sudo update-alternatives --install "/usr/bin/javaws" "javaws" "/usr/local/java/jdk-10.0.{x}/bin/javaws" 1

$ sudo update-alternatives --set java /usr/local/java/jdk-10.0.{x}/bin/java

$ sudo update-alternatives --set javac /usr/local/java/jdk-10.0.{x}/bin/javac

$ sudo update-alternatives --set javaws /usr/local/java/jdk-10.0.{x}/bin/javaws
$ ls -ld /usr/bin/java*

$ ls -ld /etc/alternatives/java*
```

* Hiển thị phiên bản của Java Compiler (javac):
```shell
$ javac -version
 // hiển thị phiên bản Java Runtime (java)
$ java -version
 // hiển thị vị trí của javac và java
$ which javac/usr/bin/javac
$ which java/usr/bin/java
```

# 2. Cài đặt Tizen cho Ubuntu:
Tải bản cài đặt của Tizen tại đây: https://developer.tizen.org/ko/development/tizen-studio/download
Tải về file có dạng: **web-ide_Tizen_Studio_2.5_ubuntu-64.bin**
Mở terminal và chạy:
```shell
$ sudo apt-get install libwebkitgtk-1.0-0 cpio rpm2cpio
$ cd ./Downloads/
$ chmod +x web-ide_Tizen_Studio_2.5_ubuntu-64.bin
$ ./web-ide_Tizen_Studio_2.5_ubuntu-64.bin 
```
Cài đặt theo hướng dẫn tại trang chủ: https://developer.tizen.org/ko/development/tizen-studio/download/installing-tizen-studio

# 3. Kết nối TV và SDK:
## 1. Bật chế độ Developer Mode trên TV:
* Trên TV, mở 'smart hub'.
* Chọn 'App'.
![](https://images.viblo.asia/2f0c28db-0e3e-4b54-9c8f-8ca2ab1c4fa0.png)
* Nhập '12345' trên điều khiển để truy cập màn hình developer mode.
![](https://images.viblo.asia/39a8ebdc-fdca-498e-a7d0-fb0a56e2f283.png)
* Chọn On.
* Nhập IP của máy tính mà bạn muốn connect vào TV và chọn OK.
* Restart TV.
![](https://images.viblo.asia/29fd05b8-000f-4f0c-98d3-cafd9026386d.png)
**Sau khi restart thành công, bạn sẽ thấy biểu tựong của developer mode nằm phía trên màn hình**
![](https://images.viblo.asia/157dedf5-d01d-478f-a6b1-2bfb4d0e62dc.png)

## 2. Kết nối TV với SDK:
* Trong Tizen studio, chọn "Tools > Device Manager"
![](https://images.viblo.asia/48b9090a-5746-44ee-9f2e-622f1e932b5d.png)
* Để thêm một TV, chọn "Remote Device Manager" và "+".
![](https://images.viblo.asia/2850b54a-b96d-42e2-aec1-673faa249898.png)
* Trong cửa sổ 'App Devide', cài đặt thông tin cho TV và chọn 'Add'.
![](https://images.viblo.asia/66dc8e75-66c9-47f1-b3e6-e7ed76055870.png)
* Trong cửa sổ Device Manager, chọn TV từ danh sách và chuyển "Connection" thành "On".
![](https://images.viblo.asia/7dbe9a4b-215c-417e-b64d-b14e38b7c101.png)

## 3. Cài đặt Tizen Studio:
Mở Tizen Studio và tinh chỉnh như sau:
* Vào menu sau và setting như hình: Window > Preferences > Tizen Studio > Web > Editor > JavaScript Editor.
![](https://images.viblo.asia/6ace0e76-476b-4437-a6ee-c21f4758b220.png)
* Vào menu sau và setting như hình: Window > Preferences > Tizen Studio > Web > Editor > Privilege.
![](https://images.viblo.asia/9880659b-e6b8-46fb-abc8-560c87523221.png)

## 4. Tạo project Tizen:
* Mở Tizen Studio.
* Chọn: File => New => Tizen Project
* Tại cửa sổ vừa mở lên, chọn "Template" => "Next".
![](https://images.viblo.asia/4a472163-d0e7-41b1-a01d-e09f310353e7.png)
* Chọn "TV and v4.0" => next:
![](https://images.viblo.asia/9ab74237-2ebe-4e5a-a36e-9afbcdd0a6d1.png)
* Chọn “Web application” => next:
![](https://images.viblo.asia/0c4a2eaa-32c7-4c14-afa4-19e447329920.png)
* Chọn BasicUI -> next:
![](https://images.viblo.asia/803f6a78-60f8-4c2e-8fc3-71287713138d.png)
* Chọn tên Project => Finish:
![](https://images.viblo.asia/00e73756-e7ab-4a04-9000-07eb429ac6d8.png)
* Mở thư mục: /home/{user name}/workspace/ProjectName
![](https://images.viblo.asia/eb5f4840-cbce-470f-bbd2-b487c8b80ed1.png)
* Xóa toàn bộ file trừ file config.xml
![](https://images.viblo.asia/06b50725-2db2-4674-b166-7d5ab448f1a7.png)
* Copy toàn bộ nội dung trong thư mục **dist** từ React project và dán vào đây:
![](https://images.viblo.asia/9f51e164-a572-42b5-bd68-ef605a3ddfd6.png)
* Chuột phải vào project và chọn "Build Signed Package”

## 5. Chỉnh sửa PATH:
* Tại thư mục home, nhấn ctrl + H, mở file **.bashrc**
* Thêm vào "export PATH=$PATH:/home/{user name}/tizen-studio/tools".
![](https://images.viblo.asia/ad8d6adc-44fa-4136-a56a-a6599e470fc4.png)

## 6. Chạy App trên TV:
Mở terminal và chạy:

**LƯU Ý** YÊU CẦU ĐÃ KẾT NỐI VỚI TIVI TRƯỚC KHI CHẠY.

```shell
sdb push /home/{user name}/workspace/TestDeployTizen/TestDeployTizen.wgt /home/{user name}/share/tmp/sdk_tools/tmp/TestDeployTizen.wgt
cd /home/{user name}/tizen-studio/tools/ide/bin
./tizen install -n /home/{user name}/workspace/TestDeployTizen/TestDeployTizen.wgt
./tizen run -p {Pakage_Id}.TestDeployTizen
```