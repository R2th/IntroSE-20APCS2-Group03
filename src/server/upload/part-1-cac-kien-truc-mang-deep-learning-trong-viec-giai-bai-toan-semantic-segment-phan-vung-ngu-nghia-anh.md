Hiện nay trong nghiên cứu về Computer Vision có rất nhiều khía cạnh cần để tìm hiểu như: Object Detection, Recognize Face, Semantic Segment,... nhưng hôm nay mình muốn viết một bài nói về semantic segment để các bạn hiểu hơn về ứng dụng thực tế của nó trong cuộc sống ngày nay. Trong quá trình trình bày, nếu có gì sai sót, mong các bạn cùng comment để chúng ta có thể trao đổi nhé.
# Giới thiệu bài toán Semantic Segment
Bài toán về semantic segment hay còn gọi là bài toán về phân vùng ảnh. Nó khác với các bài toán về object detection là bài toán này có thể xác định rõ được vùng ảnh của đối tượng nào đó, còn object detection nó chỉ xác định được bounding box của đối tượng. Để dễ hiểu cái mình diễn giải, bạn có thể nhìn hình dưới : 
![](https://images.viblo.asia/22d81020-188a-4a16-a796-81310c9e62a0.jpg) 
(Nguồn: cs231n.stanford.edu)
# Điều kiện để có thể hiểu những gì trình bày
Bạn phải có kiến thức cơ bản về Machine Learning và Convolution Network. Ngoài ra bạn còn phải biết cách lập trình kiến trúc mạng ConvNet bằng python với thư viện Keras
# Thế nào là Semantic Segment ?
 Về bài toán phân vùng ảnh (Image Segment)  này thì còn chia ra nhiều loại nhỏ hơn: 
* Semantic segmentation:  Thực hiện segment với từng lớp khác nhau, ví dụ: tất cả các ghế là một lớp 
* Instance segmentation: Thực hiện segment với từng đối tượng trong một lớp. Ví dụ có 9 cái ghế trong ảnh, thì mỗi ghế được phân biệt với một màu khác nhau.
![](https://images.viblo.asia/d545e7c0-c637-4408-b83f-e3ee47fe00d9.jpg)

Chắc nhìn qua hình vẽ này bạn cũng dễ dàng hiểu được semantic segment là gì rồi đúng không nào.
# Ứng dụng của Semantic Segment
Nếu bạn đang thắc mắc rằng Semantic Segment có ý nghĩa gì trong cuộc sống không thì mình xin trả lời rằng nó có ý nghĩa rất thiết thực trong cuộc sống. Có nhiều vấn đề phức tạp cần đến sự phân tích kĩ chi tiết của hình ảnh. Sau đây chúng ta cùng tìm hiểu sơ qua một số ứng dụng thực tế của nó nhé.
1. Xe tự hành
*   Lái xe tự hành là một nhiệm vụ rất phức tạp của robot (xe), đòi hỏi phải có khả năng nhận thức, biết cách tự điều khiển trong bất kỳ mọi tình huống nào. Nhiệm vụ này được thực hiện với độ chính xác tối đa, vì độ an toàn của người ngồi trên xe là được đặt lên hàng đầu. Trong việc xử lý xe tự hành, Semantic Segment cung cấp các thông tin về không gian ở trên đường, phát hiện các đối tượng và các biển báo giao thông ở trên đường.  Segmentation xác định đường, các xe ô tô, người đi bộ,… để hỗ trợ cho ô tô tự lái
    
    ![](https://images.viblo.asia/fd8c25e5-a785-4a91-a703-c460925d43ef.gif)

2. Chuẩn đoán hình ảnh y học
*   Ung thư là một căn bệnh hiểm nghèo và cần được phát hiện sớm để điều trị. Vì hình dạng của các tế bào ung thư là một trong những yếu tố quyết định độ ác tính của bệnh, nên ta cần image segmentation để biết được chính xác hình dạng của các tế bào ung thư để có các chẩn đoán xác định. Rõ ràng object detection ở đây không giải quyết được vấn đề.
  Ngoài ra, nó còn giúp tăng cường khả năng phân tích x-quang cho các chuyên gia. Giúp việc chuẩn đoán trở nên nhanh và tiết kiệm thời gian hơn. 
  
  ![](https://images.viblo.asia/f11bdb4b-18ea-414a-8e91-79720b37e5a5.png)
  
3. Cảm biến địa lý
*   Semantic Segment cũng có thể được xem là bài toán phân lớp cho các hình ảnh về đất được chụp từ vệ tinh. Dựa vào ảnh chụp từ vệ tinh, thì semantic segment có thể phân loại từng khu trên ảnh thuộc loại đất nào (đất nông nghiệp, nước, đất cho giao thông,...) 
 
 ![](https://images.viblo.asia/62e1ca59-529a-44f9-bf49-670f55e7d739.png)
 
4. Sử dụng trong nông nghiệp
*   Trong nông nghiệp khi bạn phun thuốc trừ sâu, thì bạn có thể sẽ có khả năng sẽ phun toàn bộ cả cánh đồng, nhưng trên cánh đồng đó có cây cối. Nếu phun như vậy sẽ tốn thuốc, chính vì vậy mà semantic segment đã được ứng dụng để phân biệt được đâu là chỗ cần tưới, và đâu là cây. Để từ đó tránh các khu có cây cối và sẽ phun các chỗ cần thiết. 
 
 ![](https://images.viblo.asia/e59f0b89-efd0-411b-896d-e82ab820ed62.png)

# Các thuật toán truyền thống giải quyết bài toán
Trước khi nói đến vai trò của deep learning vào bài toán semantic segment thì mình xin giới thiệu qua một số thuật toán truyền thống đã được sử dụng để giải quyết bài toán này. Nhưng xin nhắc là những thuật toán truyền thống thì nó không cho hiệu quả cao và độ chính xác cao như deep learning được, mình chỉ giới thiệu sơ lược chứ không đi sâu vào thuật toán : 
## Thuật toán nở vùng (region growing)
* Là thuật toán phân đoạn ảnh được sử dụng để phân chia các vùng trên 1 ảnh.
* Quá trình nở vùng sẽ được dừng khi không có pixel thỏa mãn tiêu chuẩn của vùng đó. Khi thông tin ban đầu không thể tìm kiếm được, quá trình nở vùng sẽ dựa vào những pixel có cùng đặc tính để quyết định xem pixel có nằm trong vùng cần tính hay không. Việc lựa chọn các tiêu chuẩn tương đồng phụ thuộc đặc điểm của đối tượng cần xét trên ảnh và loại dữ liệu ảnh. Tiêu chuẩn có thể bao gồm giá trị cường độ xám, đặc điểm cấu trúc hoặc chỉ số thống kê và không tiến hành tính toán lại các pixel đã tính trong vùng. Việc lựa chọn tiêu chuẩn chính xác sẽ làm tăng khả năng xác định của thuật toán nở vùng cả về kích thước của vùng xét và hình dạng của vùng. 
* Có 2 thuật toán cơ bản:
1. * Thuật toán nở vùng cơ bản: 
        * Thuật toán cơ bản là bắt đầu từ các điểm gieo mầm và từ đó mở rộng vùng tìm kiếm phụ thuộc vào các điểm lân cận có cùng đặc điểm với điểm gieo mầm như cùng mức độ xám.
           $$P(R_i) = True: if |z-z_{seed}|<T$$
        * Xét công thức trên thì pixel $R_i$ sẽ được chọn vào vùng P nếu thỏa mãn điều kiện là giá trị tuyệt đối của hiệu giá trị độ xám của pixel $R_i$ và giá trị độ xám của điểm gieo mầm nhỏ hơn một ngưỡng T được lựa chọn. Ngưỡng T được người dùng chọn tùy theo mục đích.
2. * Thuật toán nở vùng thống kê:
        * Thuật toán nở vùng thống kê về bản chất vẫn là thuật toán nở vùng theo nguyên tắc lan tỏa từ một điểm gieo mầm bên trong vùng. Quy tắc đặt ra cho việc lấy thêm một điểm vào vùng là dựa trên việc so sánh giá trị điểm ảnh mới với chỉ số thống kê được tính từ các điểm đã được phân loại vào vùng đang xét [1]. Thuật toán nở vùng thống kê được thực hiện dựa trên giá trị trung bình của các điểm ảnh trong vùng) và độ lệch chuẩn theo 2 công thức dưới đây:
        $$M = \frac1n\sum_{(r,c)\in R(i)}I(r,c) $$
        $$s.d = \sqrt{\frac1n\sum_{(r,c)\in R(i)}[I(r,c) - M]^2}  $$
        * Trong đó: $I_(r,c)$ giá trị cường độ xám của các pixel có trong vùng. Một pixel sẽ được phân loại vào vùng đang xét nếu giá trị cường độ xám của pixel đó gần với giá trị cường độ xám trung bình của vùng xét dựa vào công thức: $|I(r,c) - M(i)| \leq T(i)$. Trong đó, giá trị ngưỡng T (i) của vùng xét có thể được xác định theo công thức
        $$T(i) = 1 - \dfrac{s.d(i)}{M(i)}$$
        
 ## Phân đoạn ảnh theo biến đổi Watershed:
* Nếu ảnh được xem là cảnh quan địa chất thì các đường phân thủy xác định ranh giới tách các vùng hình ảnh. Thuật toán watershed mục đích để tìm ra các lưu vực và các đường phân thủy, hay còn gọi là các đường phân cách các vùng trên ảnh, nhóm các vùng ảnh có cùng các thuộc tính liên quan lại thành một vùng đồng nhất. 
![](https://images.viblo.asia/86b28b90-f48f-4b4b-9bae-864563ff086e.png)
* Watershed line là đường phân thủy được giải thích như là đập để ngăn chặn sự hòa nhập lượng nước của các lưu vực chứa nước khác nhau, trong một bức ảnh thì nó được xem như đường phân cách các khu vực ảnh được nhóm vào thành một nhóm trước đó. Catchment basins là các lưu vực chứa nước, áp dụng vào trong một bức ảnh thì nó được coi như là một vùng các pixel được nhóm lại thành một vùng nhất định có cùng một số thuộc tính nào đó (mức xám, độ sáng vv…) 
* Thuật toán watershed dựa theo nguyên lý nước dâng: 
    * Nước bắt đầu từ những điểm có độ xám nhỏ nhất. 
    * Ảnh đầu vào được coi như một vùng địa hình với các vùng trũng nhất là tập hợp những điểm có giá trị mức xám nhỏ nhất. Hãy tưởng tượng, nước được ngập bắt đầu từ những điểm này với tốc độ không đổi, mực nước sẽ tăng dần bề mặt, khi mực nước dâng lên cao, các lưu vực sẽ kết hợp với nhau. Để ngăn chặn sự sát nhập này, một đập được xây dựng đúng chỗ giao nhau của 2 lưu vực. Cứ thế, nước dâng sẽ đạt đến đỉnh điểm mà chỉ đầu đập mới có thể nhìn thấy trên đường nước. Những ranh giới đập liên tục này được gọi là các đường phân thủy.
## Thuật toán K-mean
Với thuật toán K-mean thì bài toán đặt ra như sau : 

Input: 
*     Ảnh có kích thước m * n
*     Số cụm (k) muốn phân đoạn
    
Output : 
*     Ảnh được phân thành k đoạn có màu sắc tương đồng nhau.
    
Thuật toán sẽ dựa vào số lượng cụm mong muốn, trọng tâm các cụm mà tính toán khoảng cách giữa các điểm với các trọng tâm cụm. Sau đó gán
các điểm tới cụm mà nó có khoảng cách tới trọng tâm cụm đó là nhỏ nhất, cập nhật lại trọng tâm cụm. Kết quả thu được sau khi tâm các cụm là không đổi. 
1.  Tìm kiếm Top X color: 
Đầu tiên ta so sánh số màu thực tế có trong ảnh và số cụm màu, nếu số màu thực tế nhỏ hơn số cụm màu thì ta nhận số cụm màu chính là số màu thực tế. Tạo danh sách chứa các loại màu, sau đó sắp xếp chúng theo thứ tự giảm dần. Lấy X phần tử đầu tiên của danh sách. 
2.  Tính khoảng cách và phân cụm: 
    Sử dụng thuật toán Euclide tính khoảng cách màu của các điểm với các tâm cụm. Dựa vào khoảng cách đó đƣa các điểm vào cụm mà khoảng cách của nó tới tâm cụm là nhỏ nhất. 
3.  Tính lại trọng tâm cụm
4.  Kiểm tra hội tụ: 
    Để kiểm tra tính hội tụ của dữ liệu chúng ta kiểm tra trọng tâm hiện tại vừa tính đƣợc với trọng tâm trước đó của cụm.
# Các kiến trúc mạng Deep Learning giải quyết Semantic Segment
Trong phần này mình sẽ giới thiệu về Unet, Deep Lab v1, v2, v3, Resnet,.... liên quan đến việc giải quyết bài toán Semantic Segment. Vì mình muốn viết hết tất cả các kiến trúc mạng deep learning giải quyết về chủ đề này nên mình sẽ viết về chủ đề này trong nhiều phần khác nhau nữa. Hi vọng các bạn sẽ đón đọc tiếp.
Cảm ơn các bạn đã đọc bài ạ.

Tham khảo :
https://towardsdatascience.com/understanding-semantic-segmentation-with-unet-6be4f42d4b47