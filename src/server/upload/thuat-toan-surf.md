Trong bài viết trước chúng ta đã biết, SIFT để phát hiện và mô tả keypoint. Nhưng nó tương đối chậm và mọi người cần phiên bản tăng tốc hơn. Năm 2006, ba người Bay, H., Tuytelaars, T. và Van Gool, L, đã xuất bản một bài báo, "SURF: Speeded Up Robust Features" giới thiệu một thuật toán mới gọi là SURF. Như tên cho thấy, nó là một phiên bản tăng tốc của SIFT.

## Detection

SURF sử dụng các bộ lọc hình vuông như một phép gần đúng của làm mịn Gaussian. (Phương pháp SIFT sử dụng các bộ lọc xếp tầng để phát hiện các điểm đặc trưng bất biến theo tỷ lệ, trong đó sự khác biệt của Gaussian (DoG) được tính toán dần dần trên các hình ảnh được thay đổi tỷ lệ.) Lọc hình ảnh bằng hình vuông nhanh hơn nhiều nếu sử dụng hình ảnh tích phân:


![](https://images.viblo.asia/80b04d67-d70a-4ada-a11d-b9c1efa657a2.png)


Tổng của hình ảnh ban đầu trong một hình chữ nhật có thể được đánh giá nhanh chóng bằng cách sử dụng hình ảnh tích phân, yêu cầu đánh giá ở bốn góc của hình chữ nhật.

SURF sử dụng máy dò đốm màu dựa trên ma trận Hessian để tìm các điểm quan tâm. Định thức của ma trận Hessian được sử dụng làm thước đo sự thay đổi cục bộ xung quanh điểm và các điểm được chọn khi yếu tố quyết định này là cực đại. Trái ngược với máy dò Hessian-Laplacian của Mikolajczyk và Schmid, SURF cũng sử dụng yếu tố quyết định Hessian để chọn thang đo, cũng được thực hiện bởi Lindeberg. Cho điểm p = (x, y) trong ảnh I, ma trận Hessian H (p, σ) tại điểm p và tỷ lệ σ, là:

![](https://images.viblo.asia/387d1135-d9bd-40a1-b7d4-7392b87d1067.png)

trong đó Lxx, v.v ... là tích chập của đạo hàm bậc hai của gaussian với ảnh I(x,y) tại điểm p.

Bộ lọc hộp có kích thước 9 × 9 là xấp xỉ của một Gaussian với σ = 1,2 và đại diện cho mức thấp nhất (độ phân giải không gian cao nhất) cho các bản đồ phản hồi đốm màu.

## Không gian tỉ lệ và vị trí của các điểm quan tâm

Các điểm quan tâm có thể được tìm thấy ở các quy mô khác nhau, một phần vì việc tìm kiếm sự tương hợp thường yêu cầu hình ảnh so sánh nơi chúng được nhìn thấy ở các tỉ lệ khác nhau. Trong các thuật toán phát hiện đối tượng khác, không gian tỷ lệ thường được coi là một kim tự tháp hình ảnh. Hình ảnh được làm mịn nhiều lần bằng bộ lọc Gaussian, sau đó chúng được lấy mẫu con để có được cấp cao hơn tiếp theo của kim tự tháp. Do đó, có rất nhiều tầng với cách phép đo khác nhau của mặt nạ được tính toán:

![](https://images.viblo.asia/05151596-b1ec-4520-a363-8682ee08c8dd.png)

tám đề cập đến một loạt các bản đồ phản ứng của việc tăng gấp đôi tỷ lệ. Trong SURF, mức thấp nhất của không gian tỷ lệ thu được từ đầu ra của bộ lọc 9 × 9.

Do đó, không giống như các phương pháp trước đây, không gian tỷ lệ trong SURF được thực hiện bằng cách áp dụng các bộ lọc hộp có kích thước khác nhau. Theo đó, không gian tỷ lệ được phân tích bằng cách tăng kích thước bộ lọc thay vì giảm kích thước hình ảnh lặp đi lặp lại. Đầu ra của bộ lọc 9 × 9 ở trên được coi là lớp tỷ lệ ban đầu ở tỷ lệ s = 1,2 (tương ứng với đạo hàm Gauss với σ = 1,2). Các lớp sau thu được bằng cách lọc hình ảnh với các mặt nạ lớn dần, có tính đến bản chất rời rạc của các hình ảnh tích phân và cấu trúc bộ lọc cụ thể. Điều này dẫn đến các bộ lọc có kích thước 9 × 9, 15 × 15, 21 × 21, 27 × 27, .... Bộ lọc không tối đa trong vùng lân cận 3 × 3 × 3 được áp dụng để bản địa hóa các điểm quan tâm trong hình ảnh và trên quy mô . Các cực đại của định thức của ma trận Hessian sau đó được nội suy trong tỷ lệ và không gian ảnh với phương pháp được đề xuất bởi Brown và cộng sự. Nội suy không gian tỷ lệ đặc biệt quan trọng trong trường hợp này, vì sự khác biệt về tỷ lệ giữa các lớp đầu tiên của mỗi quãng tám là tương đối lớn.

## Descriptor

Mục tiêu của bộ mô tả là cung cấp mô tả độc đáo và mạnh mẽ về đối tượng địa lý hình ảnh, ví dụ: bằng cách mô tả sự phân bố cường độ của các pixel trong vùng lân cận của điểm ưa thích. Do đó, hầu hết các bộ mô tả được tính toán theo cách cục bộ, do đó, một mô tả thu được cho mọi điểm quan tâm đã được xác định trước đó.

Kích thước của bộ mô tả có tác động trực tiếp đến cả độ phức tạp tính toán và độ mạnh / độ chính xác của đối sánh điểm. Một mô tả ngắn có thể chống lại các biến thể ngoại hình mạnh mẽ hơn, nhưng có thể không đủ khả năng phân biệt và do đó đưa ra quá nhiều kết quả dương tính giả.

Bước đầu tiên bao gồm việc cố định hướng có thể tái tạo dựa trên thông tin từ một vùng hình tròn xung quanh điểm quan tâm. Sau đó, chúng tôi tạo một vùng hình vuông được căn chỉnh theo hướng đã chọn và trích xuất bộ mô tả SURF từ nó.

## Xác định hướng

Để đạt được sự bất biến quay, định hướng của điểm quan tâm cần phải được tìm thấy. Các phản hồi của Wavelet Haar theo cả hướng x và y trong vùng lân cận hình tròn bán kính  6s xung quanh điểm ưa thích được tính toán, trong đó s là thang đo tại đó điểm quan tâm được phát hiện . Các phản hồi thu được được tính trọng số bởi một hàm Gauss được đặt ở tâm tại điểm quan tâm, sau đó được vẽ thành các điểm trong không gian hai chiều, với phản hồi ngang trong abscissa và phản hồi dọc trong tọa độ. Hướng ưu thế được ước tính bằng cách tính tổng tất cả các phản hồi trong cửa sổ hướng trượt có kích thước π / 3. Các phản hồi theo chiều ngang và chiều dọc trong cửa sổ được tổng hợp. Hai phản hồi tổng hợp sau đó mang lại một vectơ định hướng cục bộ. Vectơ dài nhất như vậy tổng thể xác định hướng của điểm quan tâm. Kích thước của cửa sổ trượt là một tham số phải được lựa chọn cẩn thận để đạt được sự cân bằng mong muốn giữa độ chắc chắn và độ phân giải góc cạnh.

## Bộ mô tả dựa trên tổng số phản hồi của Wavelet Haar

Để mô tả vùng xung quanh điểm, một vùng hình vuông được trích xuất, tập trung vào điểm quan tâm và được định hướng dọc theo hướng như đã chọn ở trên. Kích thước của cửa sổ này là 20s.

Vùng quan tâm được chia thành các vùng con 4x4 vuông nhỏ hơn, và đối với mỗi vùng, các phản hồi của Wavelet Haar được trích xuất tại các điểm mẫu cách đều nhau 5x5. Các phản hồi được cân nhắc với một Gaussian (để cung cấp độ chắc chắn hơn cho các biến dạng, tiếng ồn và dịch).

## Matching

Bằng cách so sánh các bộ mô tả thu được từ các hình ảnh khác nhau, có thể tìm thấy các cặp phù hợp.

Nguồn : https://en.wikipedia.org/wiki/Speeded_up_robust_features,
               https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_feature2d/py_surf_intro/py_surf_intro.html