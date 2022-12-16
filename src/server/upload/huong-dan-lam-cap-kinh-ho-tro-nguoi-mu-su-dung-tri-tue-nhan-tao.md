## Giới thiệu
![](https://images.viblo.asia/cb42ac2d-2762-4744-be7e-34175af1b923.jpg)<br>
Như chúng ta đã biết việc đi lại, di chuyển của người mù, khiếm thị rất khó khăn. Ví dụ họ muốn đi ăn , uống, tập thể dục, massage,... thì bên cạnh việc xác định vị trí nơi đến, làn đường để di chuyển đã là rất cực khổ, gian nan, thậm chí bất khả thi, còn chưa tính tới không nhìn thấy các chướng ngại vật ( xe máy, xe ô tô đỗ , thùng rác, cột đèn,..) để tránh va chạm. Mặc dù đã có gậy thông minh nhưng vẫn còn nhiều hạn chế (ví dụ như họ phải liên tục rà đường mà không biết trước mặt có gì, có thể gây nguy hiểm cho họ ). <br>
Xuất phát từ nhu cầu thực tế đó, nhóm mình đã đề xuất ý tưởng, xây dựng sản phẩm giúp hỗ trợ cho người mù, người khiếm thị có 1 cuộc sống như người bình thường, họ sẽ thoải mái trong việc di chuyển đến nhiều nơi mà không sợ va chạm, nguy hiểm. Bên cạnh đó họ còn biết vật trước mắt là gì ! Nên nhóm mình lấy tên là đôi mắt ảo cho người mù. :grinning::sweat_smile: <br>

Người mù hay người khiếm thị sẽ nói địa điểm muốn tới ( hoặc bấm 1 số nút cài đặt mặc định trên google class) => Hệ thống sẽ nhận dạng giọng nói => Tìm địa điểm gần nhất dựa trên định vị GPS và google map API ( đảm bảo sao cho hạn chế các địa điểm không tồn tại, địa điểm ảo ) => Sao đó sẽ tìm đường đi ngắn nhất ( dựa trên thuật toán A*) => Hướng dẫn bằng giọng nói giúp người mù có thể đi sát lề đường, bên cạnh đó nếu có chướng ngại vật trước mặt sẽ nhận diện và cảnh báo) .Nếu người mù gặp sự cố có thể gửi thông báo về cho người nhà. Sản phẩm là sự kết hợp của **trí tuệ nhân tạo** ( AI) để nhận diện vật cản ( obstacle) và **LIDAR** để tính toán khoảng cách đến obstacle, **sound 8D**. Sản phẩm được build trên **glass** nên rất nhỏ nhẹ, dễ sử dụng.<br>
![](https://images.viblo.asia/eb2a508a-c9e6-4486-8586-9f61d2032d4b.jpg)
## Design solution
### 1.  Nhận dạng giọng nói
![](https://images.viblo.asia/24d4fcf9-15e0-47ba-99c4-0ec5ef7c7109.jpg)<br>
Hệ thống sẽ nhận dạng giọng nói của người mù ( hoặc người khiếm thị ) và truyền dữ liệu tới app để xử lí => Từ đó đưa ra action tiếp theo sẽ thực hiện . Ví dụ như chỉ đường cho họ tới quán tập gym chẳng hạn. Tuy nhiên như các bạn đã biết nhận dạng tiếng nói là 1 đề tài rất khó đòi hỏi phải có lượng dữ liệu lớn( vì mỗi người sẽ có 1 âm giọng khác nhau, chưa kể khi họ bị ốm, khàn giọng ) nên việc nhận dạng giọng nói này có thể thay thế bằng 1 số nút cài đặt các chức năng sẵn trên glass.
### 2. Google map, định vị GPS
![](https://images.viblo.asia/046fb6a5-7111-4cc9-8e21-9f7b9f2f3107.png)<br>
Chúng ta có thể sử dụng google map API, GPS để định vị vị trí người đó. Từ đó tìm tọa độ địa điểm mà họ cần đến đó => Tìm đường đi ngắn nhất tới đó, nhưng đảm bảo an toàn ( có thể sử dụng thuật toán A* ).<br>
Link algorithm : https://quangnle.com/thuat-toan-a-thuat-toan-tim-duong/ <br>
Bên cạnh việc hướng dẫn họ đi như thế nào, chúng ta còn thêm chức năng liên lạc với người thân khi gặp chuyện khẩn cấp.
### 3. Object detection, tính toán distance, alert va chạm
Quy trình thực hiện:<br>
![](https://images.viblo.asia/40854f41-1449-41fe-ad4e-4e8a56b6b34f.png)<br>
#### a. Detect lề đường
![](https://images.viblo.asia/17b6dfed-a775-465c-bc09-6fbfa9c41283.png)<br>
Sau khi tìm được đường đi ngắn nhất tới địa điểm cần đến => Thì chúng ta dùng OpenCV ( cụ thể dùng hough tranform) để xác định các lề đường.<br>
Link algorithm : https://towardsdatascience.com/lines-detection-with-hough-transform-84020b3b1549 <br>
=> Sau đó đưa ra cảnh báo đi qua trái, hay qua phải  mấy bước nếu người mù ( hay người khiếm thị ) đang ở giữa đường
#### b. Object detection, Tính toán khoảng cách
![](https://images.viblo.asia/17a84b41-f974-42ce-bdff-ec6776e743de.png)<br>
* Object detection:
![](https://images.viblo.asia/a912626e-fb8f-4182-9a3e-e8f3d42b8031.jpg)<br>

Chúng ta sẽ sử dụng YOLO v4 ( you only look once) để nhận dạng vật thể, chướng ngại vật như xe ô tô đỗ, người đi đường, cột đèn, thùng rác. Nếu thiếu đối tượng nào thì chúng ta phải kiếm thêm dữ liệu để trainning lại. Vì sao chúng ta không sử dụng model khác như EfficientDet, RestinaNet có độ chính xác cao ? Bởi vì bên cạnh việc detect độ chính xác cao chúng ta phải đảm bảo thời gian real time thì mới áp dụng thực tế được. Mình sẽ không đi sâu vào kiến trúc model, các bạn có thể tham khảo link sao đây : <br>
Link code : https://github.com/Tianxiaomo/pytorch-YOLOv4
* LIDAR-Camera Transformation

Sau khi dùng Yolov4 để xác định các bouding box của các đối tượng vật cản thì chúng ta sẽ sử dụng LIDAR để tính khoảng cách tới các đối tượng đó. LIDAR hoạt động dựa trên sóng ( ví dụ như sóng âm của dơi : dơi thường phát sóng âm vào tường sau đó nhận lại để xác định địa hình => bay nhanh mà không bao giờ va vô tường ). Tuy nhiên object detection thì xử lí trên images 2D còn LIDAR trên images 3D nên ta phải chuyển từ images 3D sang images 2D thông qua thuật toán :<br>
![](https://images.viblo.asia/a83f96ea-7da7-477e-a816-c127b784810f.png)<br>
![](https://images.viblo.asia/e07eab4b-0e2f-4b0f-aa79-3f12533846c0.png)<br>
* Object Locator 
![](https://images.viblo.asia/6b50c5b0-e328-4b9f-9d37-4640df48427a.png)<br>

Từ các bouding box của đối tượng ta sẽ xác định tọa độ tâm theo công thức :<br>
![](https://images.viblo.asia/b9a3f004-52f9-4c20-b01b-f4779f77b8c9.png)
* Kalman Filter
<br>Kalman filter là thuật toán cho phép bạn đánh giá độ chính xác của các biến chưa biết sử dụng độ đo đơn lẻ của đầu vào và đầu ra dựa trên đo lường về nhiễu thống kê.
* Collision Detection and Alert  
Sau khi nhận dạng được đối tượng và tính toán được khoảng cách đến đối tượng thì căn cứ vào khoảng cách để xuất âm thanh cảnh báo nguy hiểm.
#### c. Cảnh báo va chạm
![](https://images.viblo.asia/c2586771-d55d-488f-8635-ee113abebc82.jpeg)<br>

Hệ thống sẽ cảnh báo người dùng thông qua headphone bằng âm thanh 8D => Cho cảm giác chân thật, sống động.
## Kết luận
Link code tham khảo : <br>
1. https://repositorio.comillas.edu/xmlui/bitstream/handle/11531/24628/TFG%20-%20Rioja%20GarcAa,%20Roberto.pdf?sequence=1
2. https://github.com/Onlee97/Object-Detection-and-Avoidance-with-Intel-Realsense
3. https://github.com/Tianxiaomo/pytorch-YOLOv4
4. https://github.com/vita-epfl/monoloco <br>

Mình đã trình bày ý tưởng , các kĩ thuật, quy trình để build sản phẩm **'Đôi mắt ảo cho người mù'**. Trong bài viết này mình sẽ không trình bày phần code, nếu bạn nào cần có thể để lại comment ở dưới. Về chi phí làm dự án này thì rất đắt ( chi phí LIDAR rẻ nhất là 1 triệu mấy,  glass, server,...). Bên cạnh dự án này các bạn có thể làm một dự án hỗ trợ người mù, người khiếm thị bắt (đón) xe buýt. Nguyên nhân đón xe buýt của người mù rất khó khăn bởi vì họ không biết chuyến xe nào là chuyến xe cần đi. Các bạn có thể sử dụng object detection để nhận dạng số xe ( chuyến xe) hay OCR để nhận dạng chuyến đường => Phát âm thanh giúp người mù hay người khiếm thị biết chuyến xe nào họ cần đi.<br>

Mình nói tới đây thôi ! Bạn nào thấy hay thì comment để mình có động lực viết thêm nhiều bài nữa. :laughing:
## Tài liệu tham khảo
1. https://repositorio.comillas.edu/xmlui/bitstream/handle/11531/24628/TFG%20-%20Rioja%20GarcAa,%20Roberto.pdf?sequence=1
2. https://github.com/Onlee97/Object-Detection-and-Avoidance-with-Intel-Realsense
3. https://github.com/vita-epfl/monoloco