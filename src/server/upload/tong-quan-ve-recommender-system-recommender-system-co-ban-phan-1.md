# Giới thiệu
Recommender System là một trong những ứng dụng phổ biến nhất của khoa học dữ liệu ngày nay. Chúng được sử dụng để dự đoán "rating" hoặc "preference" mà người dùng sẽ dành cho một mặt hàng. Hầu hết mọi công ty công nghệ lớn đều đã áp dụng chúng dưới một số hình thức. 
-	Amazon sử dụng nó để đề xuất sản phẩm cho khách hàng
-	Netflix sử dụng gợi ý phim cho người dùng
-	YouTube sử dụng nó để đề xuất các video và quyết định video sẽ phát tiếp theo trên chế độ tự động phát
-	Facebook sử dụng nó để gợi ý kết bạn, đề xuất các trang để thích và mọi người theo dõi. 

Ở bài viết, chúng ta sẽ trình bày tổng quan về cách thức hoạt động của một hệ thống Recommender System. Ngoài ra bạn cũng có thể tham khảo cách xây dựng một hệ thống Recommender System với Python và bộ dữ liệu của Movilens qua 2 bài viết còn lại trong series này là [Xây dựng Content-based RS](https://viblo.asia/p/xay-dung-content-based-filtering-rs-recommender-system-co-ban-phan-2-bWrZnVovZxw) và [Xây dựng Collaborative filtering RS](https://viblo.asia/p/xay-dung-collaborative-filtering-rs-recommender-system-co-ban-phan-3-Az45bMqolxY).
# Hướng  tiếp cận
Một hệ thống gợi ý phim thường được chia thành 3 quá trình chính:
-	Bước 1: Tìm các đặc trưng (features) có ảnh hưởng đến việc đánh giá của người dùng, thông qua việc phân tích và thăm dò dữ liệu
-	Bước 2: Phân tích và áp dụng giải thuật filtering phù hợp
-	Bước 3: Tiến hành training mô hình
![](https://images.viblo.asia/e1c07990-3078-4f1b-b1c2-9968c88796b9.jpg)

Nhìn chung, hệ thống Recommender System có thể được chia thành 4 loại chính:
-	Simple Recommenders: Đưa ra các đề xuất tổng quát cho mọi người dùng, dựa trên mức độ phổ biến và/hoặc thể loại phim. Ý tưởng cơ bản đằng sau hệ thống này là những bộ phim nổi tiếng hơn và được giới phê bình đánh giá cao hơn sẽ có xác suất được khán giả bình thường thích cao hơn. Một ví dụ có thể là IMDB Top 250.
-	Content-based Recommenders: Đề xuất các mặt hàng tương tự dựa trên một mặt hàng cụ thể. Hệ thống này sử dụng siêu dữ liệu mục, chẳng hạn như thể loại, đạo diễn, mô tả, diễn viên, v.v. cho phim, để đưa ra các đề xuất này. Ý tưởng chung đằng sau các hệ thống giới thiệu này là nếu một người thích một mặt hàng cụ thể, họ cũng sẽ thích một mặt hàng tương tự với nó. Và để khuyến nghị điều đó, nó sẽ sử dụng siêu dữ liệu mục trước đây của người dùng. Một ví dụ điển hình có thể là YouTube, nơi dựa trên lịch sử của bạn, nó gợi ý cho bạn những video mới mà bạn có thể xem.
-	Collaborative filtering Recommenders: Những hệ thống này được sử dụng rộng rãi và chúng cố gắng dự đoán “ratings” hoặc “preference” mà người dùng sẽ đưa ra một mặt hàng dựa trên xếp hạng trước đây và sở thích của những người dùng khác. Bộ lọc cộng tác không yêu cầu siêu dữ liệu mục giống như các bộ lọc dựa trên nội dung của nó.
-	Hybrid Recommenders: Hybrid Filtering là sự kết hợp của hai giải thuật Content-based Filtering và Collabrative Filtering: Hybrid Fitering được sử dụng mềm dẻo khi hệ thống Collabrative Filtering không có các hành vi (ratings), khi đó hệ thống sẽ sử dụng Content-based Filtering và ngược lại, khi Content-based Filtering không có các feature cần thiết trong việc đánh giá thì hệ thống sẽ sử dụng Collaborative Fitering để thay thế.

Vậy là chúng ta đã tìm hiểu tổng quan về Recommender System. Tài [bài viết tiếp theo](https://viblo.asia/p/xay-dung-content-based-filtering-rs-recommender-system-co-ban-phan-2-bWrZnVovZxw), chúng ta sẽ tiếp tục tìm hiểu thuật toán và xây dựng một hệ thống Content-based Recommender System đơn giản với Python và bộ dữ liệu Movilens.