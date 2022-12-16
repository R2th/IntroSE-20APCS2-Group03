# Tổng quan về SDN
SDN hay mạng điều khiển bằng phần mềm (Software Defined Networking) được dựa trên cơ chế tách riêng việc kiểm soát một luồng mạng với luồng dữ liệu (control plane và data plane). SDN dựa trên giao thức luồng mở (Open Flow) và là kết quả nghiên cứu của Đại học Stanford và California Berkeley. SDN tách định tuyến và chuyển các luồng dữ liệu riêng rẽ và chuyển kiểm soát luồng sang thành phần mạng riêng có tên gọi là thiết bị kiểm soát luồng (Flow Controller). Điều này cho phép luồng các gói dữ liệu đi qua mạng được kiểm soát theo lập trình. Trong SDN, control plane được tách ra từ các thiết bị vật lý và chuyển đến các bộ điều khiển. Kiến trúc của SDN gồm 3 lớp riêng biệt: lớp ứng dụng, lớp điều khiển, và lớp cơ sở hạ tầng (lớp chuyển tiếp).
![](https://images.viblo.asia/5131cee5-975c-4235-b0de-bfe0a5ae28b3.jpg)

Các bạn có thể đọc thêm về sdn ở [đây](https://tek4.vn/tong-quan-ve-mang-dinh-nghia-mem-sdn-software-defined-networks/)

# Cài đặt công cụ
Mình sử dụng môi trường ubuntu, công cụ Mininet để mô phỏng mạng các switch và ONOS làm controller. Cùng bắt đầu nào.

Trước tiên là cài đặt mininet, các bạn chạy lệnh như sau: *sudo apt -get install mininet*
![](https://images.viblo.asia/2149d031-65b9-4ca2-bea3-938146fd69c2.png)

Tiếp theo là cài đặt java:
``` ruby
sudo add-apt-repository ppa:openjdk-r/ppa
sudo apt-get update 
sudo apt-get install openjdk-8-jdk
sudo update-alternatives --config java
sudo update-alternatives --config javac
```
Cài đặt biến môi JAVA_HOME cho ubuntu: *export JAVA_HOME="/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/"*

Chạy lệnh *echo $JAVA_HOME* thấy hiện lên như mình là oke :)
![](https://images.viblo.asia/8fbfb60f-1aa1-496e-8ef7-f5a921c5842a.png)

À đúng rồi, tí quên ONOS, các bạn tải về file tar.gz ở [đây](https://wiki.onosproject.org/display/ONOS/Downloads) sau đó giải nén ra nhé. Các bạn nên tải phiên bản từ 1.14 trở lên.
Giải nén xong chúng ta sẽ có thư mục onos-*** , chạy lệnh theo mình để khởi động onos:
![](https://images.viblo.asia/518b3010-87c1-489e-98e4-4130131408df.png) 

Khi muốn tắt thì dùng lệnh *sudo ./stop* là xong 
Đường dẫn tùy thuộc vào nơi đặt thư mục và phiên bản onos của các bạn. 
Sau đó các bạn mở trình duyệt lên, truy cập vào url : localhost:8181/onos/ui   
Username: onos, password: rocks (cái này là mặc định nhé) hiển thị lên như mình là oki
![](https://images.viblo.asia/11f7753b-7fd8-42b9-b7d8-92c0ee78b2e8.png)
![](https://images.viblo.asia/68776d8a-ae66-4935-8ea1-5eb65db60ba2.png)

Vậy là xong phần cài đặt môi trường và công cụ, ở bài tiếp theo mình sẽ hướng dẫn các bạn tạo 1 kịch bản mô phỏng mạng sdn đơn giản. Phần 1 mình xin phép tạm dừng ở đây :)

Tham khảo:
* [https://askubuntu.com/questions/772235....](https://askubuntu.com/questions/772235/how-to-find-path-to-java)
* [https://wiki.onosproject.org/display/ONOS/.......](https://wiki.onosproject.org/display/ONOS/Installing+on+a+single+machine)
* [http://www.stackguy.com/archives/....](http://www.stackguy.com/archives/248)