Xin chào mọi người. Lại là mình đây :duck: 

Mình nhớ hồi mới đi thực tập, lúc nhìn thấy distributed application, mình có hỏi đồng nghiệp (cũ) là: Tại sao chúng ta không nhét hết backend, frontend, database vào một machine, chạy thế vừa trẻ, vừa khỏe, tốn công bóc tách thành "collection of containers" làm gì? Thực ra câu hỏi ấy vừa dở vừa không ... dở.

### Goals behind containerization

Về câu hỏi trên, tại sao mình nói nó dở. Vì mục đích hiển nhiên là để scale rồi. Bạn chạy trên nhiều máy, availibility tăng, app ngon sếp tăng lương. Vậy tại sao mình nói nó không dở? Vì hồi đó bọn mình intern, được phát cho một server 50GB 2vCPUs 4GB RAM,  nếu bạn chỉ có một machine, bạn bóc tách thành một collection of containers, bạn chạy toàn bộ các containers đó trên một machines. Vậy ... khác điều gì? Chưa nói tới bọn mình develop app cho nội bộ công ty sử dụng. Không cần scale. Nghe cũng không sai lắm nhỉ? Nhưng, đây vẫn là một câu hỏi dở.

![](https://www.slideteam.net/media/catalog/product/cache/960x720/w/h/what_is_containerization_dimensions_powerpoint_presentation_example_slide01.jpg)

Về mặt bằng chung, mục đích của container là để thiết lập "rào cản" giữa các resources với nhau (Ví dụ app con :duck: cần 2 cores và 8 GB memory chẳng hạn)  hoặc thiết lập "rào cản" giữa team ownership ( team A dùng image A, team B dùng image C). Chúng ta có thể tổng kết lại là để: **isolate resource**.

Nói về application :duck: nó được tạo bởi hai thành phần: **user-facing application server** và **background logic server**. Vậy người dùng quan tâm cái gì? Họ quan tâm bạn :lollipop: . Hoặc không, họ không quan tâm bạn. Họ quan tâm tới **request latency'**. Để improve request latency, frontend cần phải có một lượng resources nhất định để có thể đáp ứng nhu cầu "highly responsive".

Nói về backend, nói là best-effort serivice. Vậy nên nếu nó có delay *một chút* vì high user-request volume, system cũng sẽ không (nên) bị ảnh hưởng. Việc này giống như bạn đi nhà hàng gọi món, miễn sao bồi bàn đưa đơn đúng, không dồn dập, thì nói sẽ không thành hưởng tới quality of service mà người dùng nhận được. Vì vậy, khi bạn separate frontend và backend vào different containers, bạn sẽ có thể attach different resource requirements cho từng containers khác nhau. Hành vì thiên vị này giống như bạn thấy con :duck: nào gầy hơn thì cho nó ăn nhiều hơn. Vậy đó. :duck: Tiếp đó, bạn separate resource requirement, điều đó đồng nghĩa bạn chắc chắn được backend sẽ bị terminate trước frontend nếu có vấn đề về memory leak hoặc overcommitment của memory resource.

### Scaling

Bây giờ bỏ qua vấn đề scaling application, nói về scaling team đi. Việc chia nhỏ module trong single node khiến chúng ta có thể tạo dedicate team cho từng module. Hơn nữa việc chia rẽ như vậy khiến chúng ta không bị language dependency. Chúng ta có thể tích hợp mọi loại ngôn ngữ chúng ta muốn, và không ảnh hưởng tới người khác. Bạn có thể viết API bằng Golang, web chạy PHP, proxy apache, không ảnh hưởng tới ai hết, đặc biệt lại còn reusable.

Application của bạn càng decoupling, thì nó càng dễ hiểu, dễ test, dễ update và dễ deploy. Bạn có thể deploy api container và không cần redeploy application server. Không ảnh hưởng đúng không nào?

Đặc biệt, bạn chia nhỏ sẽ khiến bạn dễ ... nài sếp. Để sếp mua thêm server. =)). Vì app dễ deploy, chạy đâu cũng được. Tránh tình trạng "all-in-one".

![](https://images.viblo.asia/1705eec5-3a78-4e5d-844a-edc62b52f5c8.png)

Vậy thôi, hôm nay lảm nhảm vậy thôi.  Chào các bạn. Cuối tuần vui vẻ :duck: 

À quên, tâm sự xíu.

Mình viết trên này thực chất là để giải trí. Gọi là thư giãn sau giờ làm việc (hoặc trước, ~~hoặc trong~~ :satisfied: ). Mình không phải giáo viên, cũng không dạy dỗ ai cả. :duck:. Vì thế mình viết khá tùy hứng. Mình biết nhiều người không thích cách viết của mình. Đọc rất rối trí và ... nhảm. Mình hiểu. Thực sự bài mình hàm lượng kĩ thuật không cao. Hàm lượng lảm nhảm cực cao :satisfied:. Nên nếu bạn tìm đọc để thư giãn,  đọc nhảm thì bạn tìm đúng nơi rồi đó =)). Còn bạn thích đọc kiểu bài chất lượng  thì mình chịu, tính mình thế quen rồi. Nếu bạn thấy ngứa mặt vì bài thằng Rice nó đập vô mặt, nhìn cốc cà phê phát ghét thì cứ block mình đi. 

Lại cuối tuần vui vẻ nhé. :duck:

Somewhere, xx-xx-20xx

Rice