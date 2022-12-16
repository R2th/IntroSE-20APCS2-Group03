## I. Giới thiệu về nhận dạng cảm xúc qua khuôn mặt
   Khuôn mặt của con người biểu hiện nhiều cảm xúc mà không cần phải nói ra. Đó là một trong những phương tiện mạnh mẽ và tự nhiên nhất để con người truyền đạt thể hiện cảm xúc. Không giống như các hình thức giao tiếp phi ngôn ngữ khác, cảm xúc trên khuôn mặt nó phổ quát. Hiện nay, nhận dạng và phân tích cảm xúc khuôn mặt tự động là một vấn đề thú vị và đầy thách thức, có ảnh hưởng to lớn đến xã hội.
  Cảm xúc trên khuôn mặt và hành động của chúng ta là phương tiện giao tiếp phi ngôn ngữ, bao gồm 93% cảm xúc giao tiếp của con người, trong đó 55% thể hiện cử chỉ khuôn mặt và hành động của con người. Cảm xúc khuôn mặt có thể được phân tích dễ dàng thông qua hình ảnh khuôn mặt và máy tính có thể tương tác với con người, như cách con người tương tác với nhau. Đó là lý do tại sao nhận dạng cảm xúc qua khuôn mặt ngày càng được sự quan tâm trong mọi lĩnh vực.
 Các nhà nghiên cứu đã chỉ ra rằng cảm xúc trên khuôn mặt là phổ quát và bẩm sinh trong tất cả các chủng tộc, giới tính và độ tuổi. Thêm cảm xúc trung tính là có bảy cảm xúc cơ bản, gồm: trung tính, giận dữ, ghê tởm, sợ hãi, hạnh phúc, buồn và bất ngờ.
 Nhận dạng cảm xúc qua khuôn mặt có ứng dụng trong các lĩnh vực khác nhau: 
 + Giáo dục: Phản ứng của người học trong thời gian thực và sự tham gia vào nội dung là giáo dục là một thước đo lường cho hiệu quả của bài giảng.
 + Tiếp thị: Đây là một cách tuyệt vời để các công ty kinh doanh phân tích cách khách hàng phản hồi với quảng cáo, sản phẩm, bao bì và thiết kế cửa hàng của họ.
 + Chơi game: Với sự ra đời của game thực tế ảo gần với trải nghiệm thực tế. Nhận dạng cảm xúc khuôn mặt đóng một vai trò quan trọng để cải thiện trải nghiệm chơi trò chơi.
 + Bảo mật: Nó có thể giúp xác định hành vi đáng ngờ trong đám đông và có thể được sử dụng để ngăn chặn tội phạm và những kẻ khủng bố tiềm năng.
 + Chăm sóc sức khỏe: Nó có thể hữu ích trong việc tự động hóa dịch vụ y tế. Cả sức khỏe thể chất và tinh thần có thể được phân tích thông qua ứng dụng này.
 + Dịch vụ khách hàng: Quản lý dịch vụ khách hàng có thể hiệu quả hơn bằng cách sử dụng hệ thống nhận dạng cảm xúc khuôn mặt. Phân tích phản hồi của khách hàng và phản ứng của máy tính sẽ đảm bảo tương tác máy tính với con người trong cuộc sống thực.
   Hệ thống nhận diện cảm xúc khuôn mặt được sử dụng nhiều trong cuộc sống: điều trị y tế, giao tiếp song ngôn ngữ, đánh giá đau của bệnh nhân, phát hiện nói dối, giám sát trạng thái của người lái xe phát hiện trạng thái buồn ngủ dựa vào cảm xúc trên khuôn mặt được phát triển để cảnh báo cho người lái xe khi thấy dấu hiệu buồn ngủ, mệt mỏi.
## II. Tổng quan về nhận dạng cảm xúc qua khuôn mặt
  Đầu tiên, khi muốn nghiên cứu về đề tài này, bạn cần phải chuẩn bị những kiến thức học máy là gì? Phân loại các kỹ thuật học máy? Đưa ra một số kỹ thuật học máy?
    Tiếp theo, tìm hiểu về SVM cách thức hoạt động và ứng dụng của SVM trong thực tế.
    Cuối cùng, tìm hiểu về CNN: giới thiệu về khái niệm và mô hình CNN.
    Các kiến thức trên, các bạn có thể dễ dàng tìm hiểu qua các bài báo, website khác trên mạng, mình sẽ không nhắc đến nữa, nếu có thời gian mình sẽ có những bài báo đi chi tiết về những chủ đề này. Sau đây, mình xin bắt đầu vào phần nội dung chính của bài viết và theo như mình có tìm hiểu thì chưa có nhiều bài viết nào được nhắc đến nội dung nghiên cứu này.
    Chủ đề của mình là nhận dạng cảm xúc qua khuôn mặt, sử dụng 2 phương pháp chính là SVM và CNN. Mục tiêu của bài viết:
+ So sánh phương pháp SVM và CNN trong nhận dạng cảm xúc qua khuôn mặt.
+ So sánh phương pháp CNN cơ bản và CNN cơ bản kết hợp các đặc trưng truyền thống
   Mình có tìm hiểu 1 số bài báo và 1 số các phần mềm ứng dụng thực tế hiện nay về nhận diện khuôn mặt thì thấy có 2 vấn đề chính và quan trọng nhất cần giải quyết là :  Thiếu dữ liệu traning và các biến thể không liên quan đến biểu hiện cảm xúc: ánh sáng, tư thế đầu và sai lệch nhận dạng.
   Để giải quyết vấn đề trên thì phương pháp  nhận dạng cảm xúc qua khuôn mặt được chia thành nhiều hướng theo các tiêu chí khác nhau, chia thành hai loại chính: phương pháp truyền thống và phương pháp hiện đại. Để hiển rõ hơn thế nào là phương pháp truyền thống, phương pháp hiện đại, thì mình sẽ nói qua về nội dung này:
###   1. Phương pháp truyền thống
   Hệ thống nhận dạng cảm xúc qua khuôn mặt với phương pháp truyền thống thì xử lý bài qua các giai đoạn: tiền xử lý hình ảnh khuôn mặt, trích xuất đặc trưng và phân loại.
                           ![](https://images.viblo.asia/04405a38-9cf6-435d-a58d-bb55d0a98275.PNG)
   + Tiền xử lý là quá trình được sử dụng để cải thiện hiệu suất của hệ thống nhận dạng cảm xúc qua khuôn mặt và được thực hiện các loại quy trình khác nhau: căn chỉnh độ rõ, chia tỷ lệ hình ảnh, điều chỉnh độ tương phản và sử dụng các quy trình nâng cao để cải thiện các khung biểu thức.
   + Trích xuất đặc trưng trong thị giác máy tính là một giai đoạn quan trọng, nó phát hiện ra việc chuyển từ mô tả đồ họa sang mô tả dữ liệu ẩn, trích chọn những đặc trưng riêng nhất của hình ảnh, sau đó những mô tả dữ liệu này có thể được sử dụng làm đầu vào cho bài toán phân loại.
   + Phân loại là giai đoạn cuối cùng của hệ thống nhận diện cảm xúc qua khuôn mặt (FER), để phân loại ra các loại cảm xúc trên khuôn mặt: hạnh phúc, buồn bã, bất ngờ, tức giận, sợ hãi, ghê tởm và bình thường. Sử dụng các phương pháp phân loại như: Cây quyết định (ID3), SVM, HMM (Hidden Markov Model)... thì phân loại SVM cho độ chính xác và phân loại tốt nhất. Chính vì vậy, mình chọn SVM đại diện cho phương pháp truyền thống để sử dụng cho hệ thống nhận diện của mình.
###        2.  Phương pháp hiện đại 
   Trong phần này, sẽ mô tả các bước chính phổ biến trong hệ thống nhận dạng cảm xúc qua khuôn mặt thực hiện qua các giai đoạn: tiền xử lý, phân lớp sử dụng học sâu.  Những năm gần đây, học sâu có độ chính xác hơn phương pháp truyền thống vì nó không phải qua bước trích xuất các đặc trưng một cách tường minh, nó sẽ thực hiện đi kèm với phương pháp phân loại.
   ![](https://images.viblo.asia/8715e45a-f340-4a2e-bbfc-661918cc1bca.PNG)
 + Tiền xử lý ảnh: cũng phải xử lý 1 số vấn đề của ảnh đầu vào hệ thống, xử lý trước quá trình trainning. Các bước thực hiện: Căn chỉnh khuôn mặt để phát hiện khuôn mặt, tăng dữ liệu hình ảnh đảm bảo đủ dữ liệu training, cuối cùng là chuẩn hóa dữ liệu khuôn mặt. Sử dụng các phương pháp CNN, DBN,  DAE, RNN, GAN...
 + Phân loại: Trong phương pháp truyền thống bước trích xuất đặc trưng và bước phân loại tính năng là độc lập với nhau, trong Deep learning có thể thực hiện FER theo cách từ đầu đến cuối. Một lớp mất được thêm vào cuối mạng để điều chỉnh lỗi lan truyền ngược, sau đó xác suất dự đoán của từng mẫu có thể được mạng trực tiếp xuất ra.
##   **III. Mô hình mạng tích chập cho nhận dạng cảm xúc qua khuôn mặt**
   Trong nội dung này, chúng ta sẽ đặt câu hỏi “Có nên kết hợp đặc trưng truyền thống và CNN cho hệ thống nhận dạng cảm xúc qua khuôn mặt không?”. Để trả lời cho câu hỏi trên, cần phải làm rõ và tìm hiểu các nội dung như: giới thiệu tổng quan về phương pháp CNN cho hệ thống nhận dạng cảm xúc qua khuôn mặt, tiếp theo sẽ giới thiệu mô hình thiết kế CNN kết hợp đặc trưng truyền thống cho hệ thống nhận dạng cảm xúc qua khuôn mặt
###    1. Tổng quan về CNN cho nhận dạng cảm xúc qua khuôn mặt
   Nhận dạng cảm xúc qua khuôn mặt trong môi trường tự nhiên là một trong những lĩnh vực được nghiên cứu tích cực trong nhiều năm nay, tuy nhiên không tránh khỏi một số những thách thức trong hệ thống cần phải tìm cách giải quyết khắc phục các vấn đề đó.  Để giải quyết các thách thức đó, họ đã tổ chức thành cuộc thi để thúc đẩy sự tiến bộ trong lĩnh vực này. Trong số các cuộc thách thức, có một cuộc thi thách thức dùng database FER2013, kết quả chiến thắng chung cuộc là sử dụng phương pháp CNN dùng để nhận dạng cảm xúc khuôn mặt. 
###    2. Mô hình kiến trúc nhận dạng cảm xúc qua khuôn mặt
![](https://images.viblo.asia/d7e587c1-b4a5-4da4-9db8-e34dd3673464.PNG)
    Hình 2.1 mô hình thiết kế của hệ thống nhận dạng cảm xúc qua khuôn mặt sử dụng phương pháp CNN kết hợp với đặc trưng truyền thống. Đầu vào là hình ảnh có kích thước 48x48 pixel và 1 chanels (ảnh xám) được lấy trong bộ dữ liệu dataset FER2013, đầu ra của hệ thống là dự đoán cảm xúc của hình ảnh. Để thực hiện quá trình có được đầu ra hệ thống cần thực hiện theo hai giai đoạn: tiền xử lý hình ảnh, phân lớp sử dụng học sâu. Trong đó bước trích chọn đặc trưng được thực hiện một cách không tường minh, ẩn bên trong giai đoạn phân lớp sử dụng học sâu, các giai đoạn thực hiện một cách liền mạch không phân chia một cách quá cụ thể và rõ ràng như phương pháp truyền thống.
   Hình 2.1 mô hình kiến trúc của phương pháp CNN, đầu vào là hình ảnh có kích thước là 48x48, sau đó đồng thời thực hiện 2 việc song song: 
+ Ảnh đầu vào thực hiện đi qua phương pháp deep learning hiện đại. Trong giai đoạn này, thực hiện đi qua các bước các tầng tích chập, tầng gộp, tầng kết nối. Tạo ra tầng kết nối có kích thước 1024.
+ Ảnh đầu vào kết hợp với các đặc trưng truyền thống (Face lanmarks + HoG features). Đầu ra là tạo ra tầng kết nối có kích thước 1024.
Cuối cùng, hai công việc thực hiện song song gộp lại tạo thành tầng kết nối đầy đủ có kích thước 256 và cho ra kết quả đầu ra là một trong 7 trạng thái cảm xúc.
Mô hình SVM thiết kế cho hệ thống nhận dạng cảm xúc qua khuôn mặt

![](https://images.viblo.asia/696ef0bc-b6da-45f5-8618-53a9d516ee0e.PNG)
Mô hình CNN cơ bản thiết kế cho hệ thống nhận dạng cảm xúc qua khuôn măt

![](https://images.viblo.asia/fc2b5edc-2e85-4756-9a6a-78acecf08a0e.PNG)
## **IV Cài đặt và kiểm thử**
### 1. Cơ sở dữ liệu
* FER2013 được giới thiệu trong ICML 2013 Chanllenges in Representation Learning.
* Đầu vào: hình ảnh đã được gán nhãn, đã được điều chỉnh vùng cắt, kích thước 48x48 pixel.
* Dữ liệu được thu thập bởi API tìm kiếm hình ảnh của Google.
* Tập huấn luyện (Training set): chiếm 60% dùng để học khi huấn luyện.
* Tập kiểm chứng (Cross validation set): chiếm 20% dùng để kiểm chứng mô hình huấn luyện.
* Tập kiểm tra (Test set): chiếm 20% dùng để kiểm tra mô hình đã phù hợp sau khi huấn luyện. 
### 2. Môi trường phát triển
   +  Hệ điều hành: Server Ubuntu 18.04.4
   +  RAM: 8GB, HDD, i5 2.20GHZ CPU
   +  Công cụ phát triển: Pycharm 2020.1
   +  Ngôn ngữ phát triển: Python
   +  Cơ sở dữ liệu: Dataset FER2013
    Bên trên là các môi trường mà mình đã thực hiện, ngoài ra các bạn còn có rất nhiều cách khác để thực hiện, mục đích cuối cùng là cho ra được kết quả trainning như mong muốn.
  - Kịch bản kiểm thử:
  
 ![](https://images.viblo.asia/ec6c827e-fa26-4732-9259-30850ac0d11b.PNG)
### Thử nghiệm trên bộ dataset FER 2013
+ Đầu vào: tập dữ liệu đã được training từ trước
+ Đầu ra: phần trăm độ chính xác trên toàn bộ tập dữ liệu
+ Sử dụng phương pháp SVM + CNN

![](https://images.viblo.asia/d525a074-7fa5-404f-9318-c01d9430ba48.PNG)     
### Thử nghiệm trên 1 ảnh bất kỳ trong bộ dataset FER2013
+ Đầu vào: là ảnh bất kỳ đã được gán nhãn, kích thước 48x48
+ Đầu ra: cảm xúc của khuôn mặt + phần trăm dự đoán độ chính hình ảnh.
+ Sử dụng phương pháp SVM + CNN

![](https://images.viblo.asia/6f119c65-00da-4dd9-8877-6f54a53f8902.PNG)
## **V. Kết luận**
Vậy là mình đã giới thiệu cho các bạn về các phương pháp nhận diện cảm xúc qua khuôn mặt và làm nổi bật nội dung nghiên cứu chính của mình.
Mình mong, đây là một bài viết thú vị mà mọi người đang quan tâm.
Nếu bài viết này được nhiều bạn quan tâm, thì mình sẽ chia sẻ từ các trainng dữ liệu đến khi ra được kết quả như của mình, sẽ là một bài viết đầy hứa hẹn, các bạn chờ tiếp nhá.