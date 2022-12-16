Để theo dõi chuyển động trong một không gian, AR sẽ theo dõi các thuộc tính không gian khi nó có sự chuyển động. Thông thường trong context của AR, theo dõi một thực thể có nghĩa vị trí và hướng của thực thể được đo liên tục. Có thể theo dõi các thực thể khác nhau như: đầu, mắt hoặc tay chân, ... của user hoặc của một thiết bị AR như máy ảnh hoặc screen hoặc bất kỳ đối tượng nào có AR.

Trong bài này mình sẽ giải thích một số đặc điểm của tracking và thảo luận về một vài công nghệ tracking.

Chúng ta bắt đầu với hệ thống stationary, tiếp đó là các sensor mobile và cuối cùng là thảo luận về  một công nghệ đó là theo dõi thông qua quang học.

# TRACKING, CALIBRATION và REGISTRATION

Trong context của AR, ba thuật ngữ quan trọng được liên kết với việc đo lường và căn chỉnh các đối tượng là  **tracking, calibration, resgistration**. 

![](https://images.viblo.asia/e0526f5d-df92-4488-9510-c1fa9d60e97a.png)

- *Một hệ thống AR phải giải quyết ba khái niệm quan trọng: ttracking, calibration, resgistration.*

Để giới thiệu ngắn gọn và nhận ra được sự khác nhau giữa của các khái niệm này thì mọi đọc đoạn sau đây :

> Registration refers to the alignment of spatial properties. Objects “registered in AR” are aligned to each other in some coordinate system. Accurate registration of virtual information with physical scene objects in a user’s perception is a typical goal of AR systems. Calibration is the offline adjustment of measurements. Calibration correlates the readings of a sensor or instrument with those of a standard so as to check and adjust the sensor’s accuracy. Calibration is responsible for static registration and is necessary for many nonspatial parameters of tracking systems, while tracking is responsible for dynamic registration.


Cụ thể hơn thì **tracking** là một thuật ngữ được sử dụng để mô tả **sensor** động và đo lường các hệ thống AR. Để hiển thị các đối tượng ảo được **register** với các đối tượng thật trong không gian ba chiều, chúng ta phải biết ít nhất là tư thế tương đối, đó là vị trí và hướng của màn hình AR so với các đối tượng thật. Vì AR hoạt động theo thời gian thực, các phép đo cũng phải được cập nhật liên tục. 

Nghe awesome đúng không :heart_eyes:

**Calibration** là quá trình so sánh các phép đo được thực hiện với hai thiết bị khác nhau, một thiết bị tham chiếu và một thiết bị được hiệu chuẩn. Thiết bị tham chiếu có thể được thay thế bằng giá trị tham chiếu đã biết hoặc, đối với các phép đo hình học, bằng hệ tọa độ đã biết. Mục tiêu là xác định các tham số cho việc sử dụng thiết bị được hiệu chuẩn để cung cấp các phép đo theo thang đo đã biết.

**Registration** trong AR đề cập đến sự liên kết của các hệ tọa độ giữa các đối tượng ảo và thực. Cụ thể, màn hình nhìn xuyên qua sẽ hiển thị các yếu tố đồ họa máy tính sao cho chúng thẳng hàng với các đối tượng trong thế giới thực. Điều này đòi hỏi phải theo dõi đầu người dùng hoặc máy ảnh cung cấp nền video ( hoặc cả hai ).

# COORDINATE SYSTEMS

Trong AR, sẽ thường dựa vào một đường ống đồ họa máy tính tiêu chuẩn để tạo ra các lớp phủ trên thế giới thực. Nó không phụ thuộc vào loại màn hình AR, đường ống này bao gồm **model transformation**, **view transformation,** và **projective transformation**.

![](https://images.viblo.asia/4955b281-be1a-457b-9027-f09d62305d9a.png)

Trong hình trên, AR cần xem xét nhiều hệ thống biến đổi. Chuyển đổi mô hình mô tả tư thế của các đối tượng chuyển động trong một môi trường tĩnh. Chuyển đổi chế độ xem mô tả tư thế của máy ảnh, cảm biến theo dõi hoặc hiển thị trong môi trường. Chuyển đổi phối cảnh mô tả ánh xạ từ tọa độ mắt sang tọa độ màn hình. Cả hai biến đổi mô hình và khung nhìn đều có thể được **tracking**, và **register**.

Resgister ở đây ngụ ý rằng hiệu ứng tích lũy của các phép biến đổi này phải được khớp giữa thực và ảo.

**Model Transformation** mô tả mối quan hệ của tọa độ đối tượng cục bộ 3D và tọa độ thế giới toàn cầu 3D. Nó xác định nơi các đối tượng được đặt trong thế giới thực.

**View Transformation** mô tả mối quan hệ của tọa độ thế giới toàn cầu 3D và tọa độ camera 3D.

**Projective Transformation** mô tả mối quan hệ của tọa độ camera 3D và tọa độ thiết bị 2D.

Ảnh dưới là một ví dụ minh họa : Giả sử rằng người trong ảnh đang sử dụng hệ thống điều hướng mà anh ta trải nghiệm qua kính AR. Giao diện AR giúp anh ta thông báo về điểm đến của mình, cho biết lộ trình của anh ta dọc theo tuyến đường đã chọn và giúp anh ta đưa ra quyết định rẽ chính xác hơn. Chiếc kính cho anh ta nhìn thấy các chú thích của thế giới trước mặt anh ta, chẳng hạn như biển chỉ dẫn màu xanh (ảo), cho biết anh ta lên rẽ bên nào.

![](https://images.viblo.asia/c71b750e-6161-4f34-9c36-5287a0dac428.png)

Hệ thống AR này cũng cung cấp cho ta một màn hình hiển thị (HUD). Nó xuất hiện dưới dạng một cửa sổ ở góc trên cùng bên trái của chế độ xem.