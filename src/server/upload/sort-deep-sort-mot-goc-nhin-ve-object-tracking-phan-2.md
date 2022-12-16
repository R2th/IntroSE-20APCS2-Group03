> Note: Đây là chuỗi bài viết về Object Tracking nằm ở mức cao hơn beginner một chút. Nếu các bạn chưa từng nghe đến Object Tracking hoặc không hiểu Object Tracking là gì, hi vọng các bạn có thể dành chút thời gian tìm hiểu qua một chút trước khi đọc các bài viết trong series này. Bù lại, với những bạn có hứng thú về chủ đề Object Tracking, mình đảm bảo các bạn với các phần được trình bày sau đây sẽ không khiến các bạn thất vọng. Chúc các bạn có một ngày học tập và làm việc vui vẻ !

Phần 1: [SORT - Deep SORT : Một góc nhìn về Object Tracking (phần 1)](https://viblo.asia/p/sort-deep-sort-mot-goc-nhin-ve-object-tracking-phan-1-Az45bPooZxY#comment-7LKXDnBpEKV)

Hơi muộn so với lời hẹn sớm ra phần 2, hôm nay, mình mới dành ra được chút thời gian để chia sẻ tiếp về phần tìm hiểu của mình về bản cải tiến của SORT: **Deep SORT**. Vậy deep SORT có gì đặc biệt ?

Trước tiên, mình xin nhắc lại các nhược điểm của SORT gặp phải, khiến nó ít được ứng dụng rộng rãi hơn:
* Giả định tuyến tính : SORT đang sử dụng Linear Kalman Filter trong thuật toán cốt lõi, điều này trong thực tế là chưa phù hợp.
* ID Switches : Đây là vấn đề lớn nhất của SORT hiện tại. Do việc liên kết giữa detection và track trong SORT chỉ đơn giản dựa trên độ đo IOU (tức SORT chỉ quan tâm đến hình dạng của đối tượng), điều này gây ra hiện tượng số lượng ID Switches của 1 đối tượng là vô cùng lớn khi đối tượng bị che khuất, khi quỹ đạo trùng lặp, ...

Hãy cũng nhìn lại 1 chút, [luồng xử lí của SORT](https://images.viblo.asia/d2d9877b-61e2-42ef-8def-de9275da76a5.png), sau đó, so sánh với luồng xử lí của deep SORT: 

![img](https://images.viblo.asia/c35f7085-c9d5-45d7-ba16-7561587191a6.png)

Trước khi bước vào nội dung chính, các bạn hãy thử dành ra vài phút, tự so sánh 2 hình ảnh để tìm kiếm điểm vượt trội của deep SORT so với SORT, sau đó, hãy bắt đầu đọc tiếp các phần tiếp theo. 

OK, bắt đầu nào!
# 1. Deep SORT
* Paper: Deep SORT - Simple Online and Realtime Tracking with a Deep Association Metric (2017)
* Author: Nicolai Wojke, Alex Bewley, Dietrich Paulus
* Link: https://arxiv.org/abs/1703.07402

Deep SORT được Nicolai Wojke và Alex Bewley phát triển ngay SORT nhằm giải quyết các vấn đề thiếu sót liên quan đến số lượng ID switches cao. Hướng giải quyết mà deep SORT đề xuất dựa trên việc sử dụng deep learning để trích xuất các đặc trưng của đối tượng nhằm tăng độ chính xác trong quá trình liên kết dữ liệu. Ngoài ra, một chiến lược liên kết cũng được xây dựng mang tên Matching Cascade giúp việc liên kết các đối tượng sau khi đã biến mất 1 thời gian được hiệu quả hơn. 
## 1.1 Ý tưởng
Trong multiple object tracking, đặc biệt là đối với lớp thuật toán tracking-by-detection, có 2 yếu tố chính ảnh hưởng trực tiếp đến performance của việc theo dõi:
* Data Association: Quan tâm đến vấn đề liên kết dữ liệu, cụ thể là tiêu chí để xét và đánh giá nhằm liên kết một detection mới với các track đã được lưu trữ sẵn
* Track Life Cycle Management: Quan tâm đến việc quản lý vòng đời của một track đã được lưu trữ, bao gồm, khi nào thì khởi tạo track, khi nào thì ngưng theo dõi và xóa track ra khỏi bộ nhớ, ...

![](https://images.viblo.asia/6d5e1163-ab2c-405a-898e-d9a91fb25e03.png)

Trong deep SORT, nhóm tác giả giải quyết vấn đề data association dựa trên thuật toán Hungary (tương tự như SORT), tuy nhiên, việc liên kết không chỉ dựa trên IOU mà còn quan tâm đến các yếu tố khác: khoảng cách của detection và track (xét tính tương quan trong không gian vector) và khoảng cách cosine giữa 2 vector đặc trưng được trích xuất từ detection và track (chi tiết được trình ở các phần sau) - 2 vector đặc trưng của cùng 1 đối tượng sẽ giống nhau hơn là đặc trưng của 2 đối tượng khác nhau.
## 1.2 Training bộ trích xuất đặc trưng
Nhằm phát triển một bộ trích xuất đặc trưng cho mỗi detection (bounding box) thu được, Nicolai Wojke, Alex Bewley đã phát triển một kiến trúc mạng phần dư mở rộng (Wide Residual Network), huấn luyện riêng trên các bộ dữ liệu lớn về định danh người (large scale re-id dataset) như: Market 1501, MARS, .... Tác vụ này còn được gọi là **Cosine Metric Learing**. Thậm chí, một paper cũng được viết riêng về kiến trúc mạng được sử dụng này.
* Paper: Deep Cosine Metric Learning for Person Re-Identification (2018)
* Author: Nicolai Wojke, Alex Bewley
* Link: https://arxiv.org/abs/1812.00442

Kiến trúc này có gì đáng chú ý:
1. Sử dụng **Wide Residual Network (WRN)**

     Các mạng neural thông thường, để đạt được performance cao, thường cố gắng phát triển theo chiều hướng tăng độ sâu của mạng. Đây là hướng đi chung, và tốt để có tạo ra một bộ trích xuất đăc trưng hiệu quả. Tuy nhiên, một nhược điểm đi kèm với các mạng sâu là thời gian huấn luyện và thời gian inferance lớn, đây là điều đi hoàn toàn ngược lại với mục tiêu của deep SORT. Do đó, thay vì sử dụng các mạng sâu (Deep Neural Network), nhóm tác giả lựa chọn các mạng nông (Shallow Neural Network), cụ thể ở đây là [Wide Residual Network (WRN)](https://arxiv.org/abs/1812.00442). Kiến trúc này được giới thiệu chỉ với số lớp rất nhỏ (16 lớp), vẫn có thể đạt performance vượt trội hơn các kiến trúc hàng nghìn lớp khác. Đặc biệt là thời gian training và inference cũng nhanh hơn rất nhiều. 
 
 ![](https://images.viblo.asia/9c5cb256-d9e7-4d11-9d84-019968253249.png)
 
2.  Sử dụng **cosine softmax classifer**:

    Nicolai Wojke và Alex Bewley sử dụng một classifer mới bằng việc tham số hóa lại softmax classifer tiêu chuẩn (Hình ảnh : Phía trên là standard softmax classifer, phía dưới là cosine softmax classifer). 

    ![img](https://i.imgur.com/eYxRF99.jpg)

    Thật ra mình cũng chưa hoàn toàn hiểu rõ lắm về việc chỉnh sửa softmax classifer này (sử dụng hệ số K, đồng thời bỏ đi các giá trị bias $b_k$). Hi vọng các bạn, có ai đã đọc paper và hiểu được ý đồ của tác giả, có thể comment để giúp mình hiểu rõ hơn về kiến trúc này :confused: 

    3 hàm loss được thử nghiệm với kiến trúc này lần lượt là Sparse Softmax Cross Entropy Loss, Magnet Loss và Triplet Loss. Và Cross Entropy Loss cho kết quả khả quan nhất. 

![img](https://i.imgur.com/uEwNK4K.jpg)
## 1.3 Các độ đo mới
Deep SORT đề xuất 2 độ đo hoàn toàn mới, được thêm vào để improve cho quá trình liên kết dữ liệu. 
* **Khoảng cách Mahalanobis**

    $$
    d^{(1)}(i, j)=\left(\boldsymbol{d}_{j}-\boldsymbol{y}_{i}\right)^{\mathrm{T}} \boldsymbol{S}_{i}^{-1}\left(\boldsymbol{d}_{j}-\boldsymbol{y}_{i}\right)
    $$
    Trong đó $(\boldsymbol{y}_{i}, \boldsymbol{S}_{i})$ là giá trị kì vọng và ma trận hiệp phương sai của biến ngẫu nhiên track thứ i, và $\boldsymbol{d}_{j}$ là giá trị của detection thứ j. 

    Khoảng cách Mahalanobis là thước đo khoảng cách giữa điểm P và  phân phối D, do P. C. Mahalanobis đưa ra vào năm 1936. Nó là sự tổng quát hóa đa chiều về ý tưởng đo lường  độ lệch chuẩn giữa  P so với giá trị kì vọng của D. Khoảng cách này bằng 0 nếu P ở giá trị kì vọng của D và tăng lên khi P di chuyển ra xa giá trị kì vọng này.

    Ngoài việc đo lường khoảng cách giữa track và detection, khoảng cách Mahalanobis còn được dùng để loại trừ các liên kết không chắc chắn bằng cách lập ngưỡng khoảng cách Mahalanobis ở khoảng tin cậy 95\% được tính từ phân phối $\chi^{2}$. 
    $$
    b_{i, j}^{(1)}=\mathbf{1}\left[d^{(1)}(i, j) \leq t^{(1)}\right]
    $$
    Với $t^{(1)} = 9.4877$. 
* **Khoảng cách cosine**

    Deep SORT đồng thời sử dụng một độ đo khác về đặc trưng của đối tượng, nhằm đảm bảo việc liên kết chuẩn xác dù đối tượng đã biến mất và sau đó xuất hiện trở lại trong khung hình. Đó chính là các đặc trưng học được từ cosine metric learning đã được trình này ở trên. Với mỗi detection, đặc trưng $\boldsymbol{r}_{j}$ được trích xuất với $||\boldsymbol{r}_{j}|| = 1$. Với mỗi track, một danh sách với độ dài khoảng 100 được sử dụng để lưu trữ đặc trưng của 100 track gần nhất: $\mathcal{R}_k = \{\boldsymbol{r}_{k}^{(i)}\}_{k=1}^{L_k}$, $L_k = 100$. Khi đó, độ đo mới giữa track và detection được tính bằng khoảng cách cosine:
    $$
    d^{(2)}(i, j)=\min \left\{1-\boldsymbol{r}_{j}{ }^{\mathrm{T}} \boldsymbol{r}_{k}^{(i)} \mid \boldsymbol{r}_{k}^{(i)} \in \mathcal{R}_{i}\right\}
    $$
    Và 
    $$
    b_{i, j}^{(2)}=\mathbf{1}\left[d^{(2)}(i, j) \leq t^{(2)}\right]
    $$
    với $t^{(2)}$ được lựa chọn tùy vào tập dữ liệu sử dụng. 
    
![img](https://i.imgur.com/3WvLvX2.png)

Tóm lại, khoảng cách Mahalanobis cung cấp các thông tin về vị trí đối tượng  dựa trên chuyển động tức thời, đặc biệt hữu ích cho các dự đoán ngắn hạn. Mặt khác, khoảng cách cosine xem xét thông tin về đặc trưng của đối tượng, đặc biệt hữu ích cho các dự đoán dài hạn hoặc các đối tượng khó phân biệt. Bằng việc kết hợp 2 độ đo với trọng số phù hợp, deep SORT tạo ra một độ đo mới:
$$
c_{i, j}=\lambda d^{(1)}(i, j)+(1-\lambda) d^{(2)}(i, j)
$$
Với 
$$
b_{i, j}=\prod_{m=1}^{2} b_{i, j}^{(m)}
$$
Giá trị $b_{i, j}$ sau đó được sử dụng trong chiến lược liên kết matching cascade sẽ được trình bày ở phần sau. Giá trị $\lambda$ có thể được điều chỉnh tùy theo trường hợp sử dụng để cân bằng giữa 2 độ đo. Trong bài báo, tác giả để $\lambda = 0$, tức là không sử dụng đến khoảng cách Mahalanobis. Dù vậy, khoảng cách Mahalanobis vẫn hữu ích, do có thể lọc bỏ những detection có độ liên kết không đảm bảo ngưỡng. 
## 1.4 Chiến lược đối sánh theo tầng 
Chiến lược đối sánh theo tầng hay **Matching Cascade** được Deep SORT sử dụng nhằm cải thiện độ chính xác của liên kết, chủ yếu là vì khi đối tượng biến mất trong thời gian dài, độ không chắc chắn của bộ lọc Kalman sẽ tăng lên rất nhiều và sẽ dẫn đến phân tán xác suất dự đoán liên tục. Vì vậy, nếu dự đoán liên tục không được cập nhật, phương sai của phân phối chuẩn sẽ ngày càng lớn.  Khi đó, giá trị của khoảng cách Mahalanobis giữa các điểm xa giá trị kì vọng và các điểm gần giá trị kì vọng là như nhau. 

Chiến lược đối sánh theo tầng tiến hành lấy lần lượt từng track ở các frame trước đó, để tiến hành xây dựng ma trận chi phí và giải bài toán phân công theo từng tầng. Chi tiết thuật toán được trình bày cụ thể hơn ở mã giả dưới đây:

![img](https://i.imgur.com/fK4sRap.png)

## 1.5 Quản lý vòng đời 1 track
Deep SORT quản lí vòng đợi của 1 track dựa trên 1 biến trạng thái với 3 giá trị (tentative, confirmed, deleted)
* Các trạng thái này lúc mới khởi tạo sẽ được gán 1 giá trị mang tính thăm dò (tentative). 
* Giá trị này nếu vẫn đảm bảo duy trì được trong 3 frame tiếp theo, trạng thái sẽ chuyển từ thăm dò sang xác nhận (confirmed), 
* Các track có trạng thái confirmed sẽ cố gắng được duy trì theo dõi, dù bị biến mất thì Deep SORT vẫn sẽ duy trì theo dõi trong 30 frame tiếp theo. 
* Ngược lại, nếu mất dấu khi chưa đủ 3 frame, trạng thái sẽ bị xóa khỏi trình theo dõi (deleted)

![img](https://i.imgur.com/WIJiSRg.png)
# 2. Tổng kết
Do SORT đã mô hình hóa bài toán khá ổn, bên deep SORT, các thành phần trong trạng thái track không thay đổi quá nhiều. Mỗi track bao gồm 8 thành phần: 

$$
\mathrm{x}=\left[\mathrm{u}, \mathrm{v}, \gamma, \mathrm{h}, \dot{\mathrm{u}}, \dot{\mathrm{v}}, \dot{\gamma}, \dot{\mathrm{h}} \right]
$$
Với $(\mathrm{u}, \mathrm{v})$ ở đây là tọa độ tâm của đối tượng (ở đây là tâm của bounding box), $\gamma$ là tỉ lệ khung hình, $\mathrm{h}$ là chiều cao của bounding box, và các vận tốc tương ứng $\dot{\mathrm{u}}, \dot{\mathrm{v}}, \dot{\gamma}, \dot{\mathrm{h}}$.

Các mô hình trạng thái và mô hình quan sát của deep SORT hầu như giống với SORT

![img](https://images.viblo.asia/c35f7085-c9d5-45d7-ba16-7561587191a6.png)

Luồng xử lí của Deep SORT được thực hiện tuần tự qua các bước dưới đây :

* {**Bước 1**}: Sử dụng Faster Region CNN (với backbone là VGG16) để phát hiện các đối tượng trong khung hình hiện tại.
* {**Bước 2**}: Deep SORT sử dụng Kalman Filter để dự đoán các trạng thái track mới dựa trên các track trong quá khứ. Các trạng thái này lúc mới khởi tạo sẽ được gán 1 giá trị mang tính thăm dò (tentative). Giá trị này nếu vẫn đảm bảo duy trì được trong 3 frame tiếp theo, trạng thái sẽ chuyển từ thăm dò sang xác nhận (confirmed), và sẽ cố gắng được duy trì theo dõi trong 30 frame tiếp theo. Ngược lại, nếu mất dấu khi chưa đủ 3 frame, trạng thái sẽ bị xóa khỏi trình theo dõi.
* {**Bước 3**}: Sử dụng những track đã được xác nhận, tiến hành đưa vào chiến lược đối sánh phân tầng (matching cascade) nhằm liên kết với các detection phát hiện được dựa trên độ đo về khoảng cách và đặc trưng.
* {**Bước 4**}: Các track và các detection chưa được liên kết sẽ được đưa đến 1 lớp lọc tiếp theo. Sử dụng giải thuật Hungary giải bài toán phân công với ma trận chi phí IOU để liên kết lần 2
* {**Bước 5**}: Xử lí, phân loại các detection và các track 
* {**Bước 6**}: Sử dụng Kalman filter để hiệu chỉnh lại giá trị của track từ những detection đã được liên kết với track và khởi tạo các track mới. 

Với chiến lược liên kết cũng như sử dụng những độ đo phù hợp, Deep SORT đã cải thiện được vấn đề của SORT. Lượng switches ID giảm từ 1423 xuống còn 781, tức giảm 45\% đồng thời giảm các lỗi liên quan đến đối tượng bị che khuất hoặc biến mất 1 thời gian. Dù tốc độ xử lỉ có giảm nhẹ, Deep SORT vẫn đảm bảo tốc độ xấp xỉ thời gian thực (realtime) nếu sử dụng GPU. 
# 3. What's next?
Oke, bài viết cũng khá dài rồi, source code của deep SORT cũng được viết khá dễ đọc, các bạn có thể tìm hiều thêm tại https://github.com/nwojke/deep_sort

Trong bài viết này, mình chưa nói nhiều về code, do phần lí thuyết của deep SORT cũng khá nhiều thứ cần đề cập. Nếu có thời gian, mình sẽ bàn về code của deep SORT trong phần tiếp theo, với 1 ứng dụng cụ thể hơn mà mình vẫn đang phát triển. Dưới đây là demo nhẹ 1 chút của chương trình :metal:

{@vimeo:https://vimeo.com/501575577}

Cảm ơn các bạn đã quan tâm đến bài viết. Nếu thấy hay và quan tâm đến chủ đề này, đừng quên **upvote + share** để tác giả có thêm động lực viết bài. Nếu cần góp ý với các giả, hãy **comment** dưới bài viết để mình có thể cải thiện tốt hơn. 

Chúc các bạn có một ngày học tập và làm việc vui vẻ !

# Tài liệu tham khảo
* Deep SORT: https://arxiv.org/abs/1703.07402
* SORT: https://arxiv.org/abs/1602.00763
* Wide Residual Network: https://arxiv.org/abs/1812.00442
* Cosine Metric Learning: https://arxiv.org/abs/1812.00442
* Mahalanobis Distance: https://en.wikipedia.org/wiki/Mahalanobis_distance
* và rất nhiều tài liệu khác ...