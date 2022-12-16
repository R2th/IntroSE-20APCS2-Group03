# Một số kiến thức cần biết
Mình khuyến khích mọi người trước khi đọc bài này thì nên đọc về [Generalized Focal Loss](https://arxiv.org/pdf/2006.04388.pdf) hoặc bài phân tích về Generalized Focal Loss (GFL) mà mình đã viết ở [đây](https://viblo.asia/p/paper-explain-generalized-focal-loss-learning-qualified-and-distributed-bounding-boxes-for-dense-object-detection-bWrZnAwmKxw) để có thể hiểu rõ được bài này. Tuy nhiên, mình vẫn sẽ tóm tắt lại các ý chính của GFL ở đây.  
Trong cấu trúc của các Dense Object Detector thường có 3 đầu ra: đầu ra cho **Classification**, **Localization** và một đầu ra cho chất lượng của localization (**Localization Quality**). Các tác giả của GFL nhận thấy 2 vấn đề:  
- Nhánh Classification và Localization Quality trong quá trình training và testing không đồng bộ với nhau
- Các sự biểu diễn của Bounding Box chưa cân nhắc đến tính không rõ ràng của vật thể  

Do vậy, GFL đã thay đổi cấu trúc 3 đầu ra của các Dense Object Detector thông thường thành kiến trúc 2 đầu ra, với đầu ra Classification là sự kết hợp giữa Classification và Localization Quality, đồng thời thiết kế một hàm loss mới gọi là Quality Focal Loss (QFL) cho sự kết hợp này. Và GFL cũng thay đổi sự biểu diễn của Bounding Box, từ phân phối Delta Dirac thành phân phối tự do, và tạo ra hàm loss mới gọi là Distribution Focal Loss (DFL) cho sự biểu diễn này.

# Đặt vấn đề
GFLv2 nhận thấy rằng, các Dense Object Detector khác dự đoán Localization Quality sử dụng các feature từ các lớp Convolution trước đó. GFLv2 đề ra một hướng tiếp cận khác đến việc dự đoán Localization Quality, sử dụng thống kê từ sự biểu diễn của Bounding Box  thay vì feature từ Convolution. Ở đây, sự biểu diễn của Bounding Box được kế thừa từ GFL, sử dụng **General Distribtion** (phân phối tự do).  
Ý tưởng của hướng tiếp cận này là do nhóm tác giả quan sát được rằng, thống kê thu được từ General Distribution có một sự tương quan mạnh với Localization Quality (Hình 1).  
![image.png](https://images.viblo.asia/d684c006-f1a9-4115-8abd-0daecd88a579.png)  
Cụ thể hơn, ở Hình 2a và 2b, hình dạng của General Distribution cho Bounding Box phản ánh rõ ràng chất lượng của sự dự đoán: Phân phối càng sắc nhọn thì độ tự tin cho dự đoán về Bounding Box càng cao, và ngược lại. Từ đó, nhóm tác giả có ý tưởng rằng Localization Quality có thể được tính toán thông qua thông tin về phân phối của Bounding Box.  
![image.png](https://images.viblo.asia/1fce7f9c-6c27-4655-bdbf-d6e2b2806cc5.png)  
Nhóm tác giả tạo ra một mạng nơ-ron nhỏ gồm một vài (cụ thể là 64) hidden units để sinh ra **Localization Quality** từ thống kê của **phân phối Bounding Box** và gọi nó là **Distribution-Guided Quality Predictor** (DGQP), tạm dịch là dự đoán chất lượng dựa trên phân phối.  
# Phương pháp cụ thể
Trong phần này, ta sẽ nhắc lại một chút về Generalized Focal Loss rồi sau đó triển khai Generalized Focal Loss v2 dựa trên đó.  
### Generalized Focal Loss V1
**Sự biểu diễn kết hợp giữa Classification và IoU**. Sự biểu diễn kết hợp giữa Classification và Localization Quality này là thành phần chính trong GFLv1, được thiết kế để giảm đi sự bất đồng bộ giữa Classification và Localization Quality trong training và testing. Tóm gọn lại, cho một object với label $c \in \{ 1,2 , \ldots , m \}$ với $m$ là tổng số loại object (category), ở nhánh Classification của GFLv1 sẽ sinh ra sự biểu diễn kết hợp giữa Classification và IoU có dạng $J = [ J _ { 1 } , J _ { 2 } , \ldots , J _ { m } ]$ thỏa mãn:
![image.png](https://images.viblo.asia/75ca0953-25d3-4002-b0c5-6495f2431543.png)  
với $IoU ( b _ { p r e d } , b _ { g t } )$ là IoU giữa Bounding Box đự đoán $b_{pred}$ và ground truth Bounding Box $b_{gt}$.  
**Phân phối tự do để biểu diễn Bounding Box**. Các Object Detector thường biểu diễn Bounding Box dưới dạng phân phối Delta Dirac $y = \int _ { - \infty } ^ { + \infty } \delta ( x - y ) x d x$. Nhưng GFLv1 sử dụng một General Distribution (phân phối tự do) $P(x)$ để biểu diễn Bounding Box, với mỗi cạnh có thể được biểu diễn theo công thức $\hat { y } = \int _ { - \infty } ^ { + \infty } P ( x ) x d x = \int _ { y _ { 0 } } ^ { y _ { n } } P ( x ) x d x$ với khoảng $[y_{0}, y_{n}]$ cho trước. Để tương thích với mạng nơ-ron tích chập, tích phân trên miền liên tục sẽ được chuyển sang miền rời rạc, với khoảng $[y_0, y_n]$ sẽ được rời rạc hóa thành $[y_0, y_1, ..., y_i, y_{i+1}, ..., y_n]$ với khoảng đều nhau $\Delta$ $( \Delta = y _ { i + 1 } - y _ { i } , \forall i \in \{ 0,1 , \ldots , n - 1 \} )$. Do vậy, với tính chất của phân phối rời rạc $\sum _ { i = 0 } ^ { n } P ( y _ { i } ) = 1$, giá trị dự đoán $\hat{y}$ có thể được biểu diễn dưới dạng:  
![image.png](https://images.viblo.asia/f052b335-c815-4572-9c10-f0a199915070.png)  
Khác với phân phối Delta Dirac, General Distribution được tin rằng là có khả năng phản ánh Localization Quality, đó cũng là ý chính của paper này.  
### Generalized Focal Loss V2  
![image.png](https://images.viblo.asia/a9888016-67f4-4aee-a0f7-1f5005cf23d0.png)  
**Tách rời sự biểu diễn kết hợp của Classification và IoU**. Mặc dù sự biểu diễn kết hợp giữa Classification và Localization Quality giải quyết được vấn đề bất đồng bộ giữa Classification và Localization Quality trong training và testing, song vẫn còn một số hạn chế trong việc **chỉ** sử dụng nhánh Classification để dự đoán sự biểu diễn kết hợp này. Trong paper này, nhóm tác giả phân tách sự biểu diễn kết hợp này bằng việc kết hợp thông tin từ 2 nhánh là nhánh Classification **$C$** và nhánh Regression $I$:  
![image.png](https://images.viblo.asia/354a9461-24ac-4003-86d4-bfc750a154ad.png)  
với $C = [ C _ { 1 } , C _ { 2 } , \ldots , C _ { m } ]$, $C _ { i } \in [ 0,1 ]$ là sự biểu diễn của Classification của tổng $m$ categories, và $I \in [0,1]$ là một giá trị vô hướng, là sự biểu diễn của IoU.  
Mặc dù **$J$** được phân tách làm 2 thành phần, nó vẫn là sự biểu diễn kết hợp được dùng trong cả training và testing, như vậy ta vẫn tránh được vấn đề bất đồng bộ được nhắc tới trong GFLv1. Cụ thể hơn, ta sẽ kết hợp **$C$** từ nhánh Classification và $I$ từ Distribution-Guided Quality Predictor (DGQP) từ nhánh Regression thành sự kết hợp $J$. Sau đó, $J$ được sử dụng trong Quality Focal Loss (QFL) như trong GFLv1 lúc training, và dùng trong NMS lúc testing.  
**Distribution-Guided Quality Predictor**. DGQP là thành phần chính của GFLv2, nó có nhiệm vụ nhận các thông tin từ General Distribution $P$ để sinh ra IoU Score $I$, sau đó dùng để tạo ra sự biểu diễn kết hợp của Classification và IoU. Theo chân GFLv1, nhóm tác giả sử dụng khoảng cách từ tâm tới 4 cạnh của Bounding Box làm giá trị để regression. Ta kí hiệu trái, phải, trên, dưới là $\{ l , r , t , b \}$, và xác suất rời rạc của cạnh $w$ là $P ^ { w } = [ P ^ { w } ( y _ { 0 } ) , P ^ { w } ( y _ { 1 } ) , \ldots , P ^ { w } ( y _ { n } ) ]$ với $w \in \{ l , r , t , b \}$.  
Như biểu diễn trong hình 2, độ bằng phẳng của phân phối sẽ tương quan với chất lượng của Bounding Box được dự đoán. Những thông tin về thống kê của phân phối Bounding Box có tương quan mạnh với Localization Quality, từ đó sẽ khiến việc training dễ hơn và đưa ra những dự đoán chất lượng hơn. Nhóm tác giả sử dụng top-$k$ giá trị cùng với giá trị trung bình của chúng ở trong mỗi phân phối $P^w$, kết hợp chúng lại thành statistical feature (feature về mặt thống kê) $F \in R ^ { 4 ( k + 1 ) }$:  
![image.png](https://images.viblo.asia/8753b7fe-d6f6-45d9-800d-6cd8d87e563c.png)  
với $Topkm(.)$ là top-$k$ giá trị được lựa chọn và trung bình của chúng. $Concat(.)$ là channel concatenation. Việc lựa chọn top-$k$ giá trị và trung bình làm thông tin của phân phối Bounding Box có ý nghĩa sau:
- Vì tổng của $P^w$ là một giá trị không đổi $\sum _ { i = 0 } ^ { n } P ^ { w } ( y _ { i } ) = 0$, top-$k$ cùng với trung bình của chúng có thể phản ánh tính chất của phân phối đó: $1$ giá trị lớn, $k-1$ giá trị còn lại nhỏ, và trung bình của chúng lớn thì phân phối đó khá sắc nhọn, còn các giá trị ngang nhau và trung bình của chúng nhỏ thì phân phối có dạng đồng bằng (Hình 4)
- Top-$k$ và giá trị trung bình của chúng sẽ làm cho statistical feature ít nhạy cảm với sự dịch chuyển ở trên miền phân phối (Hình 4), khiến cho sự biểu diễn của Bounding Box ít bị ảnh hưởng bởi độ lớn của object  

![image.png](https://images.viblo.asia/ffb7b883-1445-40b3-96c8-c6f5cf863ebf.png)  
Với statistical feature $F$ thu được từ General Distribution, nhóm tác giả thiết kế một mạng nơ-ron nhỏ $\mathcal { F } \left ( \cdot \right )$ để dự đoán chỉ số IoU. Mạng nơ-ron nhỏ này chỉ bao gồm 2 lớp Fully-Connected (Hình 3). Giá trị vô hướng IoU $I$ được tính theo công thức sau:  
![image.png](https://images.viblo.asia/7ef02fcb-ed99-4657-af9c-e1bdec9fbc67.png)  
với $\delta$ và $\sigma$ là ReLU và Sigmoid. $W _ { 1 } \in R ^ { p \times 4 ( k + 1 ) }$ và $W _ { 2 } \in R ^ { 1 \times p }$. $k$ là trị số $k$ trong top-$k$ và $p$ là số channel trong hidden layer. Trong paper này, qua một số các thử nghiệm, nhóm tác giả chọn ra $k=4$ và $p=64$.  
# Kết quả
![image.png](https://images.viblo.asia/221b0992-1df8-4931-9783-bb6452d99c7b.png) 
# TL;DR
Mình sẽ tóm tắt lại paper cho những ai cảm thấy quá sức với những công thức toán học ở bên trên, để có thể nắm được ý tưởng của paper này theo phong cách 3W.
### [W]hat
- Một **Head** mới cho các Object Detector dựa trên GFLv1
### [W]hy
- Nhóm tác giả quan sát thấy có sự tương quan giữa **sự biểu diễn của Bounding Box (General Distribution)** và **ground-truth Localization Quality**, cụ thể là IoU Score (Hình 1).
### Ho[W]
- Sử dụng các thông tin từ sự biểu diễn của Bounding Box (General Distribution), cụ thể là top-$k$ giá trị và trung bình của chúng, tạo ra **Statistical Feature**.
- Tạo ra một mạng nơ-ron nhỏ, biến đổi **Statistical Feature** thành **Predict IoU Score** để kết hợp với **Classification Score** trong nhánh Classification.
# Các thử nghiệm và phân tích
### Lựa chọn thông tin từ General Distribution?
Ngoài top-$k$ giá trị, một phân phối còn có thể cho ta thông tin về trung bình và phương sai. Vì vậy, tác giả đã thực hiện thử nghiệm với các thông tin nói trên, từ riêng lẻ đến kết hợp và nhận thấy sử dụng thông tin kết hợp của top-$k$ và trung bình đạt kết quả tốt nhất (Bảng 1).  
![image.png](https://images.viblo.asia/99e6200e-2d9b-4396-9d18-508c9f9e06cd.png)
### Kiến trúc của DGQP
Nhóm tác giả thử nghiệm các tham số khác nhau cho mạng nơ-ron con như tham số $k$ trong top-$k$ và số hidden units trong hidden layer. Thử nghiệm cho thấy với $k=4$ và $p=64$ ta thu được kết quả tốt nhất (Bảng 2).  
![image.png](https://images.viblo.asia/204354d1-75b4-4d84-8482-9072d6dce6c7.png)  
### Loại thông tin đưa vào DGQP
Nhóm tác giả muốn chứng minh rằng việc sử dụng thông tin từ phân phối của sự biểu diễn Bounding Box tốt hơn so với Convolution feature. Nhóm tác giả giữ nguyên kiến trúc DGQP và lựa chọn các loại thông tin khác nhau đưa vào DGQP, kết quả thử nghiệm cho thấy việc sử dụng thông tin từ phân phối biểu diễn Bounding Box không chỉ tốt hơn mà còn nhanh hơn (Bảng 3).  
![image.png](https://images.viblo.asia/b5cd6996-d9b7-4a3f-8c84-650f11627688.png)  
![image.png](https://images.viblo.asia/497965a8-005b-4423-a869-cf7f0d1d9573.png)  
### Phân tích DGQP
- Để chứng minh DGQP giúp ích trong quá trình tính toán Localization Quality, nhóm tác giả tính Pearson Correlation Coefficient (PCC) của IoU dự đoán và ground-truth IoU. Kết quả cho thấy rằng DGQP làm tăng sự tương quan giữa IoU dự đoán và ground-truth IoU (Bảng 4).  
![image.png](https://images.viblo.asia/868db662-71cf-4736-b0c4-de0f1b6d685b.png)  
- GFLv2 được hình thành từ ý tưởng thông tin từ General Distribution có tương quan với IoU (Hình 1). DGQP còn cho ra kết quả có tính tương quan cao hơn nữa (Hình 6).   
![image.png](https://images.viblo.asia/39cd8262-a451-4e7f-b08d-b8eeaf0de161.png)