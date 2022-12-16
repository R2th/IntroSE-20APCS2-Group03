**Giới thiệu về Docker Selenium:**

Như chúng ta đã biết Selenium grid giúp chạy các testcase trong các hệ thống cũng như browser khác nhau.

Tuy nhiên, hướng dẫn về Docker Selenium sẽ giải thích phần nào cho các bạn về Docker là gì và những hướng dẫn về việc download, cài đặt và tích hợp Selenium grid với hình ảnh sẽ giúp người đọc có thể hiểu được quy trình một cách nhanh chóng và dễ dàng.

**Vậy Selenium Grid là gì?**

Selenium grid giúp master computer (hub) phân phối các testcase đến các slave machines (nodes).

Khi chúng ta chạy toàn bộ testcase trên cùng một thiết bị thì tại một thời điểm nào đó sẽ có thể xảy ra một số hạn chế. Đôi khi một thiết bị sẽ là không đủ để chạy tất cả các test cáse và khi đó vai trò của Selenium grid xuất hiện.

**Một ví dụ thực tế về việc sử dụng Selenium Grid**

2-3 năm trở về trước Trung Quốc đã cấm các sản phẩm của Google tại quốc gia này. Tại thời điểm đó các quốc gia khác khi phát triển hệ thống web cho Trung Quốc sẽ phải test hệ thống web với các browser khác nhau ngoại trừ sản phẩm của Google (Google Chrome) như Internet Explorer, Firefox, Opera, etc…

Tại thời điểm này Selenium Grid đã trở nên vô cùng hữu ích cho các công ty phát triển hệ thống web cho Trung Quốc, họ đã sử dụng Selenium Grid để chạy testcase trên các browser khác nhau ngoài Google Chrome.

**Docker là gì?**

Hiểu một cách đơn giản, Docker có thể coi là một được coi là một container. Developer hay người dùng Docker có thể đưa các dữ liệu như database, thư viện, các phụ thuộc vào trong container và sau đó có thể sử dụng database, các phụ thuộc và các thư viện này để khởi tạo, deploy cũng như chạy ứng dụng.

Bằng việc sử dụng Docker container bạn có thể setup và đóng gói các ứng dụng phần mềm với tất cả các nội dung cần thiết để xây dựng ứng dụng đó, chẳng hạn như database, thư việc và các phụ thuộc. Cuối cùng thì, bản có thể gửi chúng được gói trọn trong một package

Thông thường trong khi cấu hình Selenium Grid chúng ta cần host nhiều máy áo như là các nodes và chúng ta cần kết nỗi mỗi node với hub. Ngoài ra, khi setup một grid bình thường chúng ta cần download Selenium server jar file và chạy file jar ở mỗi máy tính mà chúng ta setup Selenium Grid.

Việc này rất tốn kém và đôi khi tốn rất nhiều thời gian cho tester. Tuy nhiên, Docker sẽ giúp chúng ta giải quyến vấn đề liên quan tới phí tổn về thời gian cũng như tiền bạc.

Docker được phát minh bởi Solomon Hykey và được đã được chạy trong công nghiệp phần mềm vào tháng 3 năm 2013 dưới dạng open-source tool. Ngày nay, các lập trình viên và kỹ sư hệ thống đang sử dụng Docker với rất nhiều lí do.

Trong bài hướng dẫn này, chúng ta sẽ sử dụng Docker cho Software testing và Software automation. 

![](https://images.viblo.asia/5f07166c-2787-435b-9d58-24a33576a3c0.jpg)

 

**Điều kiện tiên quyết cho Docker Selenium**

Đầu tiên, chúng ta cần setup môi trường và chạy Selenium Script.

**Download Docker trên Windows**

Tiếp theo chúng ta cần cài đặt Docker toolbox. Để chạy các lệnh Docker, chúng ta cần quick start terminal đi kèm với Docker toolbox. Do đó chúng ta phải cài đặt Docker toolbox.

Chúng ta có thể download Docker toolbox từ bất kì website nào, nhưng tôi recommend các bạn download Docker toolbox từ website chính thức: Docker

Trong khi cài đặt Docker toolbox, sẽ có một vài checkbox xuất hiện và để cài đặt thành công, bạn cần check toàn bộ các checkbox này và cài đặt Docker toolbox. Nếu bạn đã cài đặt thành công, sẽ có 3 icons Docker dưới đây xuất hiện.

 ![](https://images.viblo.asia/2c04fcc8-b788-45fe-b0c2-c68ef5ca7fcf.jpg)

Sau khi cài đặt Docker toolbox hãy double-click và mở Docker quick start terminal. Docker sẽ cấu hình thiết bị mặc định với IP Address: 192.168.99.100 và sẽ mất một khoảng thời gian nhất định để cấu hình thiết bị local lần đầu tiên. Tiếp đến bạn sẽ đợi tới khi cửa sổ dưới đây xuất hiện.

![](https://images.viblo.asia/1b37b7f5-26db-4546-9875-e5f262997845.jpg)
 


**Cài đặt Docker Images.**

Về cơ bản, trong khi chúng ta cấu hình Selenium Grid (không có Docker), chúng ta cần cấu hình Selenium Hub và Nodes( Browser).

Giống Grid bình thường khác khi chúng ta cấu hình Selenium Grid với Docker chúng ta sẽ cài dặt hub và browser node vào Docker container và sau đó, chúng ta có thể khởi động hub và nodes từ Docker container đó.
Tiếp đến điều đầu tiên sẽ là cài dặt hub và node image vào trong Docker.

**Ban đầu, chúng ta cần cài dặt 5 images để test Docker của chúng ta**

- Selenium hub image
- Selenium node-firefox image
- Selenium node-chrome image
- Selenium node-firefox-debug image
- Selenium node-chrome-debug image

Câu hỏi tiếp theo sẽ là, làm thế nào để tìm các image này. Để tìm được các image thì chúng ta sẽ chuyển tới Docker Hub và tìm image theo tên và sau dó bạn có thể type tên image vào search bar như phía dưới

![](https://images.viblo.asia/ac1957b1-bfa6-4fd8-ac0b-f27b027c8dfd.jpg)


Khi đã type tên và click Enter, bạn có thể nhìn thấy kết quả như phía dưới.

![](https://images.viblo.asia/aa4c42a4-4df1-4c79-9cab-420c86c8e56c.jpg)

Cửa sổ này sẽ cho hiển thị toàn bộ image chúng ta có cho Selenium hub. Lúc này bạn sẽ cần click vào image có số pull nhiều nhất và chạy code của bạn mà không xảy ra bất kì lỗi nào. Khi bạn click vào image bạn sẽ thấy một cửa sổ khác như dưới đây.

 ![](https://images.viblo.asia/181886dd-03f1-4353-8260-cfbfecdb1d48.jpg)

Cửa sổ này sẽ cung cấp cho bạn toàn bộ thông tin về image (Selenium Hub Image) và sẽ cung cấp cho bạn toàn bộ các lệnh liên quan tới image đó (Selenium Hub Image). Sau đây, Docker pull Command là lệnh để cài dặt Docker image đó tới container của bạn.

Tiếp đến, bạn sẽ phải cài đặt Selenium Hub Image. Để thực hiện phần này, bạn cần copy Docker pull Command và paste vào trong Docker quick start terminal như dưới đây.

![](https://images.viblo.asia/69e33300-edcb-4045-8c0d-8e5fa8841a3e.jpg)
 
Sau khi nhập một lệnh vào Docker quick start terminal, bạn cần đợi một chút để hệ thống cho phép các image download về Docker container và khoảng thời gian chờ phụ thuộc vào tốc độ mạng. Thỉnh thoảng các image sẽ fail trong khi cài dặt và download và điều cần làm là cài đặt lại image này cho tới khi terminal hiển thị toàn bộ các cài đặt đã hoàn thành.

Một yếu tố quan trọng khác là không nên type lệnh thứ hai trước khi hoàn thành việc download lệnh thứ nhất. ĐIều này sẽ mang tới kết quả là cả 2 lệnh cùng fail.

Tốt nhất, bạn nên search và cài đặt toàn bộ năm image được kể đến ở trên vào Docker container của bạn.

**Bảng dưới đây hiển sẽ liệt kê toàn bộ các pull command bạn cần type vào Quick start terminal và cài đặt**



| Image | Command| 
| -------- | -------- |
| Selenium hub    |docker pull selenium/hub    |
| Selenium firefox node     | docker pull selenium/node-firefox     |
| Selenium chrome node     | docker pull selenium/node-chrome     |
| Selenium firefox debug     | docker pull selenium/node-firefox-debug     |
| Selenium chrome debug     | docker pull selenium/node-chrome-debug     |



Sau khi download toàn bộ các image vào container bạn sẽ cần kiểm tra bằng cách sử dụng các lệnh dưới đây.

**Docker Image**

![](https://images.viblo.asia/aad6d472-04e0-4090-a033-8508b322d887.jpg)

**Khởi động Selenium Hub**

Trong Selenium Grid bình thường (Không có Docker) thì bước đầu tiên là khởi động Selenium Hub. Tiếp đến chúng ta sẽ khởi động Selenium Hub từ Docker container. Để thực hiện bước này thì chúng ta cần chạy lệnh

**docker run -d -p 4444:4444 –name selenium-hub selenium/hub**
 
![](https://images.viblo.asia/62f02aa7-fbfc-4375-858d-fe800cfd7e07.jpg)

Khi bạn đã type lệnh và click Enter lệnh trong terminal, Selenium Hub sẽ mở ra từ Docker container. Bạn có thể xác thực khi Selenium Hub đã được chạy hoặc check link dưới đây trong Browser của bạn.
http://192.168.99.100:4444/grid/console

![](https://images.viblo.asia/3b217db3-796a-4c21-a2d3-ee6dc7a6e3d8.jpg)

 

Ảnh trên show image 192.168.99.100 chính là địa chỉ IP của bạn,


**Khởi động Selenium Nodes**

Selenium Hub đã khởi động và tiếp đó, chúng ta cần khởi động các node từ Docker container, chúng ta cần khởi động Chrome node và Firefox node. Chúng ta đã cài dặt cả hai image này vào Docker container trong khi cài đặt.

Bay giờ, hãy khởi động cả 2 node này từng bước một. Cùng lúc, hãy nhớ rằng bạn có thể chạy bao nhiều node bạn muốn. Dưới đây tôi chỉ tiến hành sử dụng 2 node là (Chrome và Firefox).

**Command to run chrome node from Docke**r: docker run -d –link selenium-hub:hub selenium/node-chrome

**Command to run firefox node from Docker**: docker run -d –link selenium-hub:hub selenium/node-firefox

 ![](https://images.viblo.asia/8de2a09c-4bc3-4c1c-8ef7-41abd9bdd4fe.jpg)


Sau khi chạy Chrome node và Firefox node, chúng ta cần chạy Chrome debug và Firefox debug. Chúng ta sẽ chạy và cài đặt Chrome debug node và Firefox debug node để mô tả mục đích và phần cuối của phần Hướng dẫn này, tôi sẽ chạy testcase tại cả hai node bằng cách sử dụng VNC (Vitual Network Computing) Viewer.

Với VNC Viewer chúng ta cần cả debug node của Firefox và Chrome. VNC Viewer sẽ giúp chúng ta thấy được hoạt động của các browser khác nhau cùng lúc trên một máy tính.

**Command to run chrome debug node from Docker**: docker run -d –P –link selenium-hub:hub selenium/node-chrome-debug

**Command to run Firefox debug node from Docker**: docker run -d –P –link selenium-hub:hub selenium/node-firefox-debug

Đôi lúc cả hai lệnh có thể bị ignore bởi Docker quick start terminal. Nếu Docker quick start terminal bỏ qua hai lệnh này thì bạn có thể sử dụng lệnh dưới đây để chạy debug mode của Chrome và Firefox.

**Alternative 01**
docker run –d –P –link selenium-hub:hub selenium/node-chrome-debug
docker run –d –P –link selenium-hub:hub selenium/node-firefox-debug
**Alternative 02**
docker run –d –link selenium-hub:hub selenium/node-chrome-debug
docker run –d –link selenium-hub:hub selenium/node-firefox-debug

  ![](https://images.viblo.asia/364e0c09-28b3-4228-9b0d-7b79b23eecf2.jpg)

Sau khi chạy cả hai node và debug node của Chrome và Firefox nodes bạn có thể refresh browser của bạn và tiến hành tìm kiếm Firefox, Chrome node đang chạy từ container của bạn.

![](https://images.viblo.asia/3ab22c01-9a9f-4ad4-a605-b7c67ba9b8a2.jpg)

Nếu xảy ra bất kì lỗi nào trong quá trình cài đặt và chạy các image, điều tốt nhất để làm đó là cài đặt lại và chạy từng image lại từ Docker.
Chúng ta giờ đã hoàn thành các bước từ phía Docker container. Tiếp tđén, chúng ta cần tập trung vào Selenium Script và VNC Viewer cho những gì chúng ta sẽ mô tả.
Đầu tiên, chúng ta cần xác nhận Port number của Chrome và Firefox Debug node đang chạy. Bởi chúng ta cần các Port number này cho VNC Viewer.
Để xác nhận các Port number này của Chrome và Firefox node, bạn có thể type các lệnh dưới đây vào Quick Star Terminal và bạn có thể thấy toàn bộ Docker Image và chạy các cổng của mỗi image dưới cột PORTS

**docker ps-a**
 
 ![](https://images.viblo.asia/16cd61b3-1820-449e-9305-6df01cb51239.jpg)
 
 

| Nodes | Running Port Number | 
| -------- | -------- | -------- |
| Chrome debug node     | 32771     | 
| Firefox debug node     | 32772     | 


Giờ, chúng ta biết port number của Chrome và Firefox debug đang chạy và chúng ta có thể chạy cả 2 browser bằng cách sử dụng VNC Viewer.
**Các bước cần follow dưới đây:**
1)	Download VNC Viewer từ web site chính thức: Download VNC
2)	Chạy VNC
3)	Type Hub URL và port number của mỗi debug node được viết phía dưới và click vào button Connect.
HUB URL: PORT NUMBER
•	For Chrome browser 192.168.99.100:32771

![](https://images.viblo.asia/84104558-5b38-4409-ae46-1255058c2a0f.jpg)

 

4)	Sau khi click vào Button Connect trên VNC Viewer sẽ hỏi bạn password. Password mặc định của VNC Viewer là bí mật, type password bí mật vào click OK và bạn có thể thấy cửa sổ Chrome Browser.
5)	Bạn sẽ phải làm các bước tương tự với Firefox bằng cách sử dụng VNC Viewer. Chạy VNC Application trên máy tính local và sử dụng Firefox chạy port number với Hub URL và click Button Connect.
For Firefox browser 192.168.99.100:32772

Một lần nữa bạn sẽ thấy cửa sổ mở lên cho Firefox Browser.
 
![](https://images.viblo.asia/42657102-7e4f-4909-8fd3-2cf88a6fdffc.jpg)

Giờ cả hai Browser được mở trên VNC Viewer. Task tiếp theo sẽ là viết Selenium Script và chạy.

**Cấu hình Selenium Tests**
Như bình thường, chúng ta tạo test script liên quan tới Selenium Grid, các bước đã được viết ở Selenium Grid Tutorial
Script tham khảo
 
![](https://images.viblo.asia/45d2d64b-efbd-4b59-ba38-db4d9ed0b902.jpg)


![](https://images.viblo.asia/63bab5c9-d2ef-4d0f-a161-3c3d837fd2c0.jpg)

 

Chúng ta đã hoàn thành toàn bộ các bước và có thể chạy phần test. Sau khi chạy phần test, bạn ó thể thấy phần test chạy qua hai browser khác nhau khi sử dụng Docker. VNC Viewer sẽ hiển thị Browser Navigate của mỗi Website cùng lúc

 ![](https://images.viblo.asia/f5ad6408-fc81-44e2-a452-1fef4b726dee.jpg)


**Tổng kết**

Khi chúng ta có một số lượng lớn Testcase, chúng ta có thể sử dụng Selenium Grid để tang tốc độ chạy testcase. Đôi lúc chúng ta cần test các testcase dưới nhiều hệ thống khác nhau cùng lúc thì sẽ cần kiểm tra các testcase dưới nhiều browser khác nhau. Chúng ta sử dụng Selenium Grid cho phần này.


Nguồn: https://www.softwaretestinghelp.com/docker-selenium-tutorial/amp/