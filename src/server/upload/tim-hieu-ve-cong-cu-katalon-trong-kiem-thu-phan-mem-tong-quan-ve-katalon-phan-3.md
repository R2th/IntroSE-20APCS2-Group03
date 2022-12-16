# IV. Kiểm thử tự động trên điện thoại di động với Studio Katalon
Dưới đây là các bước để thực thi tập lệnh hoặc để tự động hoá ứng dụng Android bằng cách sử dụng Katalon Studio trên Windows 10. 
Tuy nhiên, có vài điều kiện tiên quyết cho cùng một điều: 

**- Studio Katalon** 
**- Node JS** 
**- Appium** 
**- Bật chế độ developer mode trên thiết bị Android**

## Cài đặt Katalon Studio
Thiết lập Katalon Studio - Tải xuống và cài đặt Katalon Studio từ https://www.katalon.com/

![](https://images.viblo.asia/0ea0122f-fcf4-4645-9035-2ac0362a3c06.png)

## Cài đặt Node JS
Node JS - Tải xuống và cài đặt Node.js từ https://nodejs.org/en/download/

![](https://images.viblo.asia/a7426818-0b68-49c4-948b-9fad6f2a1342.png)

***Lưu ý***: Để làm theo các bước cài đặt cho Node JS, vui lòng tham khảo ở đây. 
Cài đặt Appium - Nhập lệnh nhắc và nhập lệnh dưới để cài đặt Appium
**npm install -g appium**

![](https://images.viblo.asia/016a625f-0583-431a-81d8-2a8a32b1eab0.png)

***Lưu ý***: Để làm theo các bước cài đặt cho Appium, vui lòng tham khảo ở đây (http://toolsqa.com/mobile-automation/appium/download-and-install-appium-desktop-client/)

Cài đặt thư mục Appium cần được thực hiện trong Studio Katalon:
* Mở Katalon Studio. 
* **Menu >> Windows >> Katalon Studio Preferences >> Katalon >> Mobile settingsg**. Ở đây, thiết lập thư mục Appium Directory và nó sẽ là một cái gì đó như:

![](https://images.viblo.asia/70c0685e-e67b-48db-8c8f-464d32e15c5a.png)

Bật chế độ developer mode trên thiết bị Android
Trình điều khiển USB dành cho thiết bị Android dùng để thử nghiệm
* Cài đặt trình điều khiển **USB Driver** cho điện thoại của bạn
* Chuyển đến **Settings -> Developer** của Nhà phát triển và bật nó lên
* Kết nối thiết bị Android của bạn với máy tính bằng cáp USB.
***Lưu ý***: Để thực hiện theo các bước Bật chế độ developer node trên thiết bị Android, vui lòng tham khảo ở đây (http://toolsqa.com/mobile-automation/appium/enabling-developer-mode-options-on-android-phone-or-tablet/)

Thực hiện kiểm tra 
* Mở Studio Katalon 
* Tạo một test case mới

![](https://images.viblo.asia/8994da14-b2b2-483b-85e6-9fc590595365.png)

* Nhấp vào **Spy Mobile** - Một cửa sổ mới sẽ mở ra nơi người dùng có thể chụp các đối tượng

![](https://images.viblo.asia/e46167b3-6068-4cac-bd1b-cb4bef2be832.png)

* Cửa sổ Mobile Object Spy - sẽ mở ra. Ở đây bạn có thể đặt cấu hình như xác định thiết bị để thử nghiệm cũng như ứng dụng APK được thử nghiệm. Nhấp vào **Start**  khi bạn đã hoàn tất cài đặt.

![](https://images.viblo.asia/83f72e56-c194-427a-89b7-3a97e1365835.png)**

* Sau khi nhấp vào **Start**, bây giờ các apk sẽ chạy và người dùng có thể bấm vào **Capture Object** và bắt đầu chụp các đối tượng.

![](https://images.viblo.asia/2cd525ae-d2cc-4a06-870a-284cc97a091b.png)

* Chụp các đối tượng và thêm vào một thư mục.

![](https://images.viblo.asia/ca700233-c923-4754-8fec-cfe86137e26b.png)

* Đây là cách các đối tượng bị bắt của bạn sẽ xuất hiện trong **Studio Katalon**:

![](https://images.viblo.asia/2792ef55-3730-477c-aceb-2db172ae4660.png)

* Bây giờ bạn có thể tạo kịch bản bằng cách sử dụng:
a. **Keyword** - Có thể tìm nạp chúng bằng cách nhấp chuột phải vào **Item** và **Add >> Mobile keyword**
b. **Object** - Chúng có thể được lấy ra từ các đối tượng được lưu trữ dưới kho
c. **Input** – Input là bắt buộc đối với từ khóa nhất định. Ví dụ: bước đầu tiên để Start ứng dụng cần có thông tin về đường dẫn tệp apk.

![](https://images.viblo.asia/89039e60-b213-474a-aed9-60d8155afad1.png)

![](https://images.viblo.asia/05a5c460-df32-4d4e-9222-0d19d58e7cae.png)

* Bây giờ thực hiện với thiết bị Android từ nút **Run** trên thanh công cụ chính.

![](https://images.viblo.asia/8a64e64c-d362-4acb-a3ee-ee57376191df.png)

* Chọn thiết bị của bạn từ danh sách Android Devices list. Nhấp OK.

![](https://images.viblo.asia/2948ff15-2155-490d-b0c6-00563c58ad8a.png)

* Thử nghiệm thành công

![](https://images.viblo.asia/e4af834b-7315-4452-a348-83762d3f37be.png)

Các bước trên tạo và chạy một test case đơn giản. Đối với các tính năng nâng cao như phân nhánh, vòng lặp hoặc xác nhận tính hợp lệ, bạn có thể tham khảo các bài viết sau:
- Common Validation: https://www.katalon.com/tutorials/common-validation/
-  Control Statements: https://docs.katalon.com/display/KD/Control+Statements

### **Xin chúc mừng! Bây giờ có thể tự viết kịch bản bằng tay bằng điện thoại di động và Katalon Studio.**

# V. Tạo trường hợp kiểm thử bằng chế độ thủ công

Studio Katalon hỗ trợ Keywords-Driven testing, nơi mà các trường hợp kiểm thử bao gồm các từ khoá đại diện cho hành động của người dùng trên AUT (Applications Under Test). Điều này cho phép người dùng có ít kinh nghiệm trong lập trình để dễ dàng tạo ra các bài kiểm thử tự động hóa. Hướng dẫn dưới đây sẽ cung cấp cho bạn hướng dẫn từng bước để tạo ra một trường hợp thử nghiệm tự động trong chế độ thủ công.

Với một ví dụ kiểm thử mẫu với các bước như sau:
*** Mở trình duyệt 
* Điều hướng đến một trang web
* Nhấp vào kiểm soát nhất định 
* Xác nhận nếu kiểm soát tồn tại trên trang 
* Đóng trình duyệt**

Thực hiện theo các bước sau để tự động hóa các kịch bản thử nghiệm ở trên bằng tay xem:

1. Chọn **File> New> Test Case** từ menu chính. Hộp thoại **New Test Case** sẽ được hiển thị. Cung cấp tên cho test case mới, sau đó nhấp vào nút OK.

![](https://images.viblo.asia/eb9e0210-883a-4e89-98b9-b9cf15b212e7.png)

2. Khi một test case mới được tạo, nó sẽ được mở ra trong chế độ **Manual view**. Quan điểm này cho phép người dùng tạo các bài kiểm tra tự động hóa một cách dễ dàng với các kỹ năng lập trình nhỏ.

![](https://images.viblo.asia/fb74ebe5-f9f3-4d7e-867e-ba3c26b0a5e6.png)

3. Chọn **Add> Web UI Keyword** từ thanh công cụ lệnh.

![](https://images.viblo.asia/ad6fc4b2-5251-4756-a40a-4fcdb7b9794d.png)

4. Chọn **Open Browser** (https://docs.katalon.com/display/KD/%5BWebUI%5D+Open+Browser). Từ khoá này sẽ mở một trình duyệt và điều hướng đến URL đã chỉ định nếu được cung cấp. (các từ khoá đã chọn sẽ được hiển thị mô tả của họ để tham khảo).

![](https://images.viblo.asia/35031f5f-2d86-47e3-a77b-e36b67b73245.png)

5. Thêm **Navigate To Url** (https://docs.katalon.com/display/KD/%5BWebUI%5D+Navigate+to+Url). Từ khóa này sẽ điều hướng đến một URL được chỉ định. Nhấp đúp vào ô **Input** để cung cấp thêm dữ liệu (thông số) cho từ khoá.

![](https://images.viblo.asia/5c765be9-4c92-453f-a536-924a06e49279.png)

6. Hộp thoại **Input** được hiển thị.

![](https://images.viblo.asia/fbdbe7e1-1db4-4efc-b0ed-f05f92f1564e.png)

Nơi mà:



| Field | Miêu tả | 
| -------- | -------- |
| No | Số tham số cho từ khóa đã chọn. | 
| Param Name     | Tên của thông số.  | 
| Param Type     | Loại dữ liệu được chỉ định cho tham số (ví dụ: String, Variable hoặc Test Data Value ...)     | 
| Value     | Giá trị đầu vào cho tham số này. 
Giá trị đầu vào có thể thay đổi dựa trên Value Type. Tham khảo Value Type trong Katalon (https://docs.katalon.com/display/KD/Value+Types) để biết thêm chi tiết. | 

Bây giờ, nhập URL của bản demo Katalon AUT (http://demoaut.katalon.com) vào cột **Value** sau đó nhấp vào **OK**.

7. Thêm **Click** (https://docs.katalon.com/display/KD/%5BWebUI%5D+Click). Từ khóa này đại diện cho hành động nhấp chuột trên một đối tượng nhất định. Bạn cần cung cấp đối tượng cho từ khóa này. Nhấn đúp chuột vào ô **Object** để mở hộp thoại **Test Object Input**.

![](https://images.viblo.asia/36826219-2b98-4086-abca-d5439ff927a6.png)

8. Tất cả các đối tượng bị bắt trong **Object Repository** được hiển thị trong hộp thoại **Test Object Input** (Tham khảo Đối tượng Spy - https://docs.katalon.com/display/KD/Spy+Object để biết chi tiết về cách nắm bắt các đối tượng). Chọn đối tượng của bạn rồi nhấp **OK**.

![](https://images.viblo.asia/69f23579-f083-4c87-a4fe-0ea07b7b4303.png)


9. Thêm **Verify Element Present** (https://docs.katalon.com/display/KD/%5BWebUI%5D+Verify+Element+Present). Từ khoá này hợp lệ nếu một đối tượng nhất định được hiển thị trên trình duyệt đang chạy. Tương tự như bước trước, bạn cần chỉ định đối tượng sẽ được sử dụng với từ khoá này.

![](https://images.viblo.asia/3983402c-afd1-4be6-bf40-caffdb51fed2.png)

10. Thêm **Close Browser**  (https://docs.katalon.com/display/KD/%5BWebUI%5D+Close+Browser) từ khóa và lưu test case của bạn.

![](https://images.viblo.asia/a53fc0db-ecd7-44cf-a702-77776ec46e97.png)

11. Nhấp vào **Run**  trên thanh công cụ chính để thực hiện các trường hợp thử nghiệm.

![](https://images.viblo.asia/11a837a0-7b2b-4b8b-899e-875e3cf8e308.png)

Katalon Studio sẽ có thể thực hiện tất cả các bước của test case mẫu và bạn có thể xem kết quả **Test Execution** trong  **Log Viewer**. Ví dụ:

![](https://images.viblo.asia/05d2dceb-dabe-4f93-9332-b911ba90b5b8.png)

**Link tham khảo: **

http://toolsqa.com/katalon-studio/simple-mobile-automation-testing-katalon-studio/

http://toolsqa.com/katalon-studio/create-test-case-using-manual-mode/

**Các bài viết trước:**

https://viblo.asia/p/tim-hieu-ve-cong-cu-katalon-trong-kiem-thu-phan-mem-tong-quan-ve-katalon-phan-1-aWj532EYl6m

https://viblo.asia/p/tim-hieu-ve-cong-cu-katalon-trong-kiem-thu-phan-mem-tong-quan-ve-katalon-phan-2-GrLZDpeVZk0