### 1. Tổng quan về Appium Studio
Appium Studio là phiên bản nâng cao của Appium open-source, giúp giảm thời gian phát triển và chạy tự động hóa dựa trên Appium. Mục tiêu của Appium Studio là đơn giản hóa cách bạn xây dựng các bài kiểm tra Appium của mình.

Nó bao gồm 2 phần chính:

- Giao diện người dùng Appium Studio - cung cấp cho bạn một bộ công cụ sẽ đơn giản hóa cuộc sống của bạn.
- Các nút thực thi Appium - một công cụ thực thi có thể được sử dụng để thực hiện các bài kiểm tra Appium của bạn.

Những lợi ích chính của Appium Studio:

- Bạn có thể xây dựng và chạy thử nghiệm iOS trên máy Windows mà không cần dựa vào XCode .
- Thiết lập môi trường đơn giản
- Không bị giới hạn các ứng dụng trên mobile, bạn có thể kiểm tra ứng dụng "Settings" hoặc bất kỳ ứng dụng nào khác.
- Có một bộ công cụ mạnh mẽ để giúp tăng tốc công việc của bạn:
   - Recorder  - cho phép bạn ghi lại các bài kiểm tra.
   - Object spy - cho phép bạn xem phân cấp đối tượng và kiểm tra các truy vấn XPath của bạn.
   - Reporting - cho phép bạn có được một ảnh chụp màn hình cho bất kỳ hoạt động nào được thực hiện trên thiết bị và theo dõi lỗi trong các thử nghiệm. 
 - Hỗ trợ làm việc nhóm từ xa.

### 2.  Tìm hiểu Appium Studio cho Eclipse
Appium Studio cho Eclipse là giải pháp cuối cùng cho các nhà phát triển Java mà muốn tự động ứng dụng di động  kiểm tra  trên cả hai nền tảng Android và iOS. Nó cung cấp một khung tự động hóa nhẹ được tích hợp vào JUnit, TestNG hoặc bất kỳ khung tự động hóa nào khác.

Các tính năng chính của Appium Studio cho Eclipse là:

- Kết nối device cloud và phản ánh thiết bị: để truy cập từ xa vào các thiết bị.
- Quản lý ứng dụng: dễ dàng quản lý các ứng dụng di động của bạn.
- Dump và object spy: để nhận dạng đối tượng dễ dàng và chế độ ngoại tuyến. (phát triển các thử nghiệm di động mà không cần thiết bị)
- Storyline: giúp người dùng không phải là chuyên gia nhưng vẫn có thể hiểu mã của bạn.

### 3. Cài đặt Appium Studio cho Eclipse
Có 2 cách để cài đặt 
1. Sử dụng Eclipse Marketplace
![](https://images.viblo.asia/d1d6c1b2-655a-484d-821a-fbee8d2ea38b.png)

2. Cài đặt từ file tải về
- Tải file cài đặt [tại đây](https://experitest.com/mobile-test-automation/appium-studio-eclipse/)
- Trong eclipse, chọn Help -> Install New Software.. -> thêm file cài đặt plugin vào repository

### 4. Thực hành với Appium Studio
#### Cấu hình
Sau khi cài đặt Appium Studio cho Eclipse, bước tiếp theo sẽ là kết nối nó với một device cloud , nếu bạn có cloud tại chỗ, bạn có thể sử dụng nó, hoặc bạn có thể sử dụng [Experitest Cloud Platform](https://experitest.com/free-trial/) để thực hành.

Cấu hình Appium Studio cho Eclipse:
  - Bước 1: Appium Studio -> Clound Configuration
  
  ![](https://images.viblo.asia/804960f8-2d91-436f-8523-b431776c125d.PNG)
  - Bước 2: Nhập Access Key -> OK 
  
  ![](https://images.viblo.asia/b97bb4ce-4f9a-40c9-9f6b-24eabccd816c.PNG)
  - Bước 3: Bật hiển thị trình xem di động:  Window -> Perspective -> Open perspective -> Other
  
  ![](https://images.viblo.asia/497eded0-2b68-45cf-a4a6-7d2b26581dfd.PNG)
  - Bước 4: Chọn Mobile
  
  ![](https://images.viblo.asia/e8282e08-1f9c-4ece-bdc8-bd1c75bc159d.PNG)
  - Bước 5; Sau khi kết nối xong bạn có thể xem được tất cả các thiết bị trên cloud trong Cloud Devices
  
  ![](https://images.viblo.asia/2f165c66-5fcb-437a-a393-815b7775333d.PNG)
  
  #### Tạo project
  - Bước 1: Tạo một java project

![](https://images.viblo.asia/252804e5-493a-4eeb-ad09-1a4d8fd16c07.PNG)

![](https://images.viblo.asia/e50eb56d-6b19-4fec-999b-53f66405759d.PNG)

- Bước 2: Chọn project -> Configure -> Mobile Nature

 ![](https://images.viblo.asia/39f55ec7-747d-40ab-ae56-37f3173d2e2e.PNG)

- Bước 3: Thiết lập các đặc tính cho project
![](https://images.viblo.asia/dd7ea0e3-c840-4d5f-baee-6457c28cd373.PNG)

Sau khi thiết lập xong project có cấu trúc như sau:
![](https://images.viblo.asia/7444c845-5607-439a-a65d-aecff4b8756e.PNG)

Trong đó:

- Lớp BaseTest được tạo sẽ cung cấp các framework services cơ bản
- AndroidDemoTest và IOSDemoTest chứa mã soạn sẵn cho nền tảng Android và iOS tương ứng.
- Build.gradle và cloud.properations: giúp dễ dàng tích hợp với các môi trường CI như Jenkins .

#### Thực hành với ứng dụng đơn giản
- Chọn và mở 1 thiết bị:
![](https://images.viblo.asia/26b9a673-6a5f-4b92-adf4-362875235cc1.PNG)

- Cài đặt và chạy ứng dụng trên máy ảo:
Trong Application, Install -> Launch
![](https://images.viblo.asia/b9658171-f98d-49cb-89d5-09bf99c97f7f.PNG)

Sau khi chạy xong bạn sẽ thấy kết quả như bên dưới
![](https://images.viblo.asia/d9f77001-495f-43f9-9fee-6983fa500304.PNG)

- Mở Dump UI tại đây  ![](https://images.viblo.asia/8fc948e9-4258-49ca-9f3f-1ae9172ee023.PNG) , bạn sẽ thấy một file dump được tạo:

![](https://images.viblo.asia/516cfca1-61af-4818-b46e-78f75af191ca.PNG)

- Chọn các element và thuộc tính của các element đó, sau đó thêm chúng vào Repository:

![](https://images.viblo.asia/303a3159-150b-45ef-8b3e-e915b6d85b0e.PNG)

- Đặt tên cho các elements:

![](https://images.viblo.asia/7ac1ae00-959a-431f-a800-05be03040383.PNG)

- Sau khi chọn các element xong, ta sẽ có danh sách các element như sau:

![](https://images.viblo.asia/6657bd7d-e6c6-4261-945b-ce6fdf40649d.PNG)

- Trong Repository, kéo thả các element vào file code của bạn

```java
@Test
	public void test(){
		driver.findElement(in.Repo.obj("total.number1")).click();
		driver.findElement(in.Repo.obj("total.number2")).click();
		driver.findElement(in.Repo.obj("total.equals")).click();
	}
```
- Cuối cùng chạy test bộ thử nghiệm này: Chuột phải vào project -> Run As -> TestNG Test . Bạn có thể quan sát kết quả dưới Console.

Như vậy chúng ta đã cùng nhau tìm hiểu qua về Appium Studio, mong rằng các bạn có thể áp dụng tốt nó để tiết kiệm thời gian viết automation test trên mobile. Bạn có thể tìm hiểu thêm về các chức năng của Appium Studio cho Eclipse [tại đây](https://docs.experitest.com/display/TC/Appium+Studio+for+Eclipse+-+Functionality).

Nguồn tham khảo:
https://docs.experitest.com/display/TC/Getting+Started