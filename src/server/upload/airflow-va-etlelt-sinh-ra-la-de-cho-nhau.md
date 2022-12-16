# Tôi mệt quá mà - Data pipeline

Một trong những việc mà data phải làm nhất là mấy ông kỹ sư data DE là lấy data từ một, nhiều nguồn và đổ về một chỗ nào đó(data lake/DWH..) để cho các chuyên viên phân tích dữ liệu 😋 mần rì pọt. Mấy bác trong nghề gọi là ETL/ELT (Extract, Transform, Load) đó, hiểu đơn giản là như bác lấy nước ở chậu A và đổ và chậu B.
Một case dễ nhất là các bác đọc data từ 1 file rồi write vào database thì cũng có thể coi là ELT

![image.png](https://images.viblo.asia/d3fcfb9d-6dfa-4904-a79e-7a0980c52d38.png)

, nhưng thực tế nó chua hơn nhiều. 

![image.png](https://images.viblo.asia/6ccaa15c-b35e-41c2-af95-61b9e2246fa4.png)

, hoặc có thể như này, với những logic phức tạp hơn như check 10 api, call xong, nếu lỗi thông báo email/noti, đẩy data vào DB, rồi chạy model preditive, rồi chọn ra model dưới một ngưỡng chấp nhận nào đó, rồi email/noti nếu không có model nào được chạy....Nói chung mỗi case thực tế sẽ có nhiều thứ nữa kiểu như này:

![image.png](https://images.viblo.asia/70c62c04-099d-4ece-ab4d-276c4981fd45.png)

Chưa kể việc bạn còn phải kiểm soát thời gian chạy từng task, viết connection cho một đống data source như file, API, Clould database... 
![image.png](https://images.viblo.asia/535d4252-23b6-46e9-9acf-358ae41e09d8.png)


***Thôi submit nghỉ.!!!!***

# Airflow đến và cứu rỗi tâm hồn này
Quá nản khi quản lý khoảng từ 50 tasks, rồi airflow đến và mang lại một làn gió mới cho công nghiệp ETL này. Sau khi dùng airflow bạn sẽ không phải nhọc nhằn debug, viết connection, re run job... Tất cả điều đó ẻm đã giải quyết cho bạn. Túm cái váy lại là Airflow sinh ra sẽ để:
* Quản lý pipeline
* Cấu hình pipline một cách nhanh nhất
* Điều phối pipeline, tức là thằng nào chạy trước thằng nào, logic task ra sao.

***Với Airflow pipeline của bạn sẽ được chạy 3R: Right time, Right way, and Right order.***

Không phải chỉ có mỗi Airflow làm được những việc như trên đâu còn có vài ba thằng nữa như Apache Nifi, Workflow ... nhưng airflow có những ưu điểm:
1. Nó nhẹ, nó tách bạch việc quản lý task và chạy task

![image.png](https://images.viblo.asia/a23ff2dc-62ed-4cff-a380-49e020535e03.png)

2. Kiến trúc dễ scale, công ty nhiều task, chỉ cần mở nhiều woker lên là xong.

![image.png](https://images.viblo.asia/f7960531-872a-499f-bf6a-e035b58dca8e.png)

3. Nhiều provider, tức là nó connect được tới nhiều thằng data source, pip install là xong (core của airflow là Python nha các bác) .
4. Nó đẹp :v: (Bắt đầu từ 2.0 :) ) 

***Tạm thời nhẹ nhàng này. Tiếp theo em sẽ share về kiến trúc, thành phần (component), cài cắm và cách sử dụng....Hẹn các bác bài tiếp***