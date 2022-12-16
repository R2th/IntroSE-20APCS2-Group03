Trong [bài lần trước](https://viblo.asia/p/thi-giac-may-tinh-la-gi-cac-van-de-lien-quan-toi-thi-giac-may-tinh-Az45b4M6ZxY), mình đã chia sẻ một vài khái niệm cơ bản liên quan tới thị giác máy tính. Như đã hứa, trong bài viết này, mình sẽ chia sẻ chi tiết về vấn đề trích chọn đặc trưng và nhận dạng bằng màu sắc.

# 1. Trích chọn đặc trưng là gì?
Nói một cách dễ hiểu, là tìm ra điểm đặc trưng của đối tượng so với đối tượng khác tuỳ theo mục đích nhận dạng trong quá trình xử lí ảnh. Ví dụ như ta muốn phân biệt đâu là ảnh cà chua chín thì dựa vào màu sắc chẳng hạn.
Có thể dựa vào một số đặc điểm sau: 
- **Đặc điểm không gian**: Phân bố mức xám, phân bố xác suất, biên độ, điểm uốn....
- **Đặc điểm biến đổi**: Các đặc điểm loại này được trích chọn bằng việc thực hiện lọc vùng (zonal filtering). Các bộ vùng được gọi là “mặt nạ đặc điểm” (feature mask) thường là các khe hẹp với hình dạng khác nhau (chữ nhật, tam giác, cung tròn v. v...)
-	**Đặc điểm biên và đường biên**: Đặc trưng cho đường biên của đối tượng và do vậy rất hữu ích trong việc trích trọn các thuộc tính bất biến được dùng khi nhận dạng đối tượng. Các đặc điểm này có thể được trích chọn nhờ toán tử gradient, toán tử la bàn, toán tử Laplace, toán tử “chéo không” (zero crossing) v. v... Việc trích chọn hiệu quả các đặc điểm giúp cho việc nhận dạng các đối tượng ảnh chính xác, với tốc độ tính toán cao và dung lượng nhớ lưu trữ giảm xuống.


 Trong bài viết này, mình sẽ chia sẻ chi tiết việc trích chọn đặc trưng dựa vào đặc điểm lược đồ màu sắc. Đây là phương pháp phổ biến và được dùng nhiều nhất trong hệ thống tìm kiếm ảnh theo nội dung. Phương pháp rất đơn giản mà tốc độ tìm kiếm lại khá nhanh và độ chính xác tương đối.
 
# 2. Nhận dạng 
Nhận dạng tự động (automatic recognition), mô tả đối tượng, phân loại và phân nhóm các mẫu là những vấn đề quan trọng trong thị giác máy, được ứng dụng trong nhiều ngành khoa học khác nhau. 

Tuy nhiên, một câu hỏi đặt ra là: mẫu (pattern) là gì? Watanabe, một trong những người đi đầu trong lĩnh vực này đã định nghĩa: “Ngược lại với hỗn loạn (chaos), mẫu là một thực thể (entity), được xác định một cách ang áng (vaguely defined) và có thể gán cho nó một tên gọi nào đó”. Ví dụ mẫu có thể là ảnh của vân tay, ảnh của một vật nào đó được chụp, một chữ viết, cơ thể người hoặc một ký đồ tín hiệu tiếng nói. Khi biết một mẫu nào đó, để nhận dạng hoặc phân loại mẫu đó có thể:

-	Hoặc phân loại có mẫu (supervised classification), chẳng hạn phân tích phân biệt (discriminant analyis), trong đó mẫu đầu vào được định danh như một thành phần của một lớp đã xác định.
-	Hoặc phân loại không có mẫu (unsupervised classification hay clustering) trong đó các mẫu được gán vào các lớp khác nhau dựa trên một tiêu chuẩn đồng dạng nào đó. Các lớp này cho đến thời điểm phân loại vẫn chưa biết hay chưa được định danh.


	Hệ thống nhận dạng tự động bao gồm ba khâu tương ứng với ba giai đoạn chủ yếu sau đây:

1. Thu nhận dữ liệu và tiền xử lý.
2. Biểu diễn dữ liệu.
3. Nhận dạng, ra quyết định.


	Bốn cách tiếp cận khác nhau trong lý thuyết nhận dạng là:
1. Đối sánh mẫu dựa trên các đặc trưng được trích chọn.
2. Phân loại thống kê.
3. Đối sánh cấu trúc.
4. Phân loại dựa trên mạng nơ-ron nhân tạo.


	Trong các ứng dụng rõ ràng là không thể chỉ dùng có một cách tiếp cận đơn lẻ để phân loại “tối ưu” do vậy cần sử dụng cùng một lúc nhiều phương pháp và cách tiếp cận khác nhau. Do vậy, các phương thức phân loại tổ hợp hay được sử dụng khi nhận dạng và nay đã có những kết quả có triển vọng dựa trên thiết kế các hệ thống lai (hybrid system) bao gồm nhiều mô hình kết hợp.
    
   
	Việc giải quyết bài toán nhận dạng trong những ứng dụng mới, nảy sinh trong cuộc sống không chỉ tạo ra những thách thức về thuật giải, mà còn đặt ra những yêu cầu về tốc độ tính toán. Đặc điểm chung của tất cả những ứng dụng đó là những đặc điểm đặc trưng cần thiết thường là nhiều, không thể do chuyên gia đề xuất, mà phải được trích chọn dựa trên các thủ tục phân tích dữ liệu.
    
# 3. Không gian màu

Không gian màu là một mô hình toán học được biểu diễn dưới dạng số học. Trên thực tế có rất nhiều không gian màu khác nhau được mô hình để sử dụng vào những mục đích khác nhau. Trong đó có hai hệ màu cơ bản là: RGB và HSV.

## 3.1 Hệ màu RGB
	
RGB là không gian màu rất phổ biến được dùng trong đồ hoạ máy tính và nhiều kĩ thuật số khác. Ý tưởng chính của không gian màu này là sự kết hợp của ba màu sắc cơ bản: màu đỏ (R, Red), xanh lục (G, Green), xanh lơ (B, Blue) để mô tả tất cả các màu sắc khác.
![](https://images.viblo.asia/2ee09f38-1675-47e0-8986-437ead7188de.png)

Nếu như một ảnh số được mã hoá bằng 24bit nghĩa là 8bit cho kênh R, 8bit cho kênh G, 8bit cho kênh B thì mỗi kênh này màu sẽ nhận giá trị từ 0-255. Với mỗi giá trị khác nhau của các kênh màu kết hợp với nhau ta sẽ nhận được một màu khác nhau, như vậy ta sẽ có tổng cộng 255*255*255 = 1.66 triệu màu sắc.

Ví dụ màu đen là sự kết hợp của các kênh màu (R, G, B) với các giá trị tương ứng là (0, 0, 0), màu vàng (255, 255, 0) … Nếu ta dùng 16bit để mã hoá một kênh màu thì dải màu sẽ rất rộng: 3*2^16…. Một con số rất lớn.

## 3.2 Hệ màu HSV
Hệ màu HSV cũng gần tương tự với HSL là không gian màu được dùng nhiều trong lĩnh vực chỉnh sửa ảnh, phân tích ảnh và là một phần của lĩnh vực thị giác máy tính. Hệ không gian này dựa vào ba thông số để mô tả màu sắc: 

H = Hue: Màu sắc.

S = Saturation: Độ đậm đặc, sự bão hoà.

V = Value: Giá trị cường độ sáng.

Không gian màu này thường được biểu diễn dưới dạng hình trụ hoặc nón. Theo đó, đi theo hình vòng tròn từ 0 - 360 độ là trường biểu diễn màu sắc (Hue). Trường này bắt đầu từ màu đỏ đầu tiên (red primary) tới màu xanh lục đầu tiên (gree primary) nằm trong khoảng 0 - 120 độ, từ 120 - 240 độ là màu xanh lục tới màu xanh lơ (green primary – blue primary), từ 240 - 360 độ là từ màu đen tới lại màu đỏ.
![](https://images.viblo.asia/be6cd818-3a3b-46d2-a02f-690e4828272c.png)

# 4. Lí thuyết về HOG và SVM 
## 4.1 Histogram of gradient (HOG)
Histogram of gradient (HOG) là đặc trưng được dùng nhiều trong lĩnh vực phát hiện đối tượng, được đề xuất bởi Bill Triggs và Navel Dalal vào năm 2005 tại viện nghiên cứu INRIA.

Ý tưởng chính của phương pháp là hình dạng và trạng thái xuất hiện của vật có thể được đặc trưng bằng sự phân bố về cường độ và hướng của cạnh. Đặc trưng này được phát triển dựa trên SIFT, đặc trưng HOG được tính trên cả một vùng. Do sự biến thiên màu sắc trong các vùng là khác nhau, kết quả là các vùng sẽ cho ta vector đặc trưng của nó. Vì vậy, để có được đặc trưng của toàn bộ cửa sổ (window) ta phải kết hợp nhiều vùng liên tiếp lại với nhau.

Đặc trưng HOG có một vài biến thể thường gặp như: R-HOG, R2-HOG, C-HOG, …Các đặc trưng này khác nhau ở các phân bố và hình dạng của các ô như trong hình:
![](https://images.viblo.asia/65d10485-bd87-45c1-9037-8eea1682bfc9.png)

Hình: R-HOG (trên) và C-HOG (dưới)

Để hiểu rõ về HOG, mình nghĩ nên cần một bài chi tiết hơn, các bạn có thể tham khảo như : 

https://minhng.info/tutorials/histograms-of-oriented-gradients.html
## 4.2 Support Vector Machines (SVM)
SVM là một phương pháp trong việc phân loại dữ liệu tuyến tính và không tuyến tính. Có nhiều phương pháp phân loại dữ liệu như: phân lớp dựa vào cây quyết định, phân lớp dựa vào luật, phân lớp Bayesian, phân lớp theo lan truyền ngược, … Tuy nhiên trong lĩnh vực của đề tài thì SVM là phương pháp phân lớp được chọn để sử dụng.

Bài báo đầu tiên về Support Vector Machine được giới thiệu vào năm 1992 bởi Vladimir Vapnik và hai đồng sự Berhard Boser và Isabelle Guyon, mặc dù nền móng cơ bản của SVM đã có từ năm 1960 (bao gồm các công việc được thực hiện từ rất sớm bởi Vapnik và Alexei Chervonenkis trong lí thuyết học thống kê). 

Cũng như HOG, SVM cũng khá nhiều kiến thức toán học, hàn lâm nên mình nghĩ các bạn nên đọc hiểu thêm các bài viết chi tiết.

# 5. Kết luận 
Trong hai bài chia sẻ vừa rồi, có khá nhiều kiến thức, khái niệm về thị giác máy tính rôi. Mình mong phần nào giúp các bạn hiểu thêm về một lĩnh vực mới này, mình cũng vừa nghiên cứu, vừa tìm hiểu dần nên có phần nào đó hiểu chưa đúng, mong nhận được ý kiến đóng góp của mọi người ạ.

Trong bài tiếp theo, mình sẽ giới thiệu một thư viện khá quen thuộc với rất nhiều ngôn ngữ khi nhắc tới xử lí ảnh đó chính là OpenCV và một demo nho nhỏ với chương trình nhận diện đồng phục.

Demo thả thính nhỏ xíu của mình ^^

Mong các bạn sẽ tiếp tục theo dõi

![](https://images.viblo.asia/d4f9f4b8-06d5-45c7-8adc-485e2b562f53.png)