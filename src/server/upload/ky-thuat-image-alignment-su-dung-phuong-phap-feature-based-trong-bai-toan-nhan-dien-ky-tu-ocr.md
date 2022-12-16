*Trong các bài toán về Machine Learning thì xử lý data luôn là việc chúng ta thực hiện đầu tiên. Tương tự, như trong bài toán OCR bước xử lý dữ liệu thực sự quan trọng cho việc tăng accuracy của Model*.

# Giới thiệu
Trong những năm gần đây, việc số hóa dữ liệu đang rất được các cơ quan, tổ chức quan tâm để phục vụ cho mục đích lưu trữ và thống kê.  Nhiệm vụ là tự động trích xuất thông tin từ hình ảnh hóa đơn do người dùng cung cấp, chẳng hạn như: tên khách hàng, địa chỉ khách hàng, chi tiết về giao dịch, sau đó lưu trữ vào cơ sở dữ liệu. Lúc người dùng chụp ảnh để cập nhật lên sẽ có rất nhiều góc chụp khách nhau. Vì vậy chúng ta cần phải thực hiện bước chỉnh lại form hoặc hình ảnh sao cho giống với ban đầu nhất để việc trích xuất chính xác hơn. Hôm nay, mình sẽ giới thiệu cho các bạn kỹ thuật **Alignment Image** cho form điện của Việt Nam do  mình chỉnh sửa các bạn cũng có thể thử với một form bất kỳ.


# Alignment Image là gì?
Image Alignment là quá trình biến đổi các bộ dữ liệu khác nhau về cùng một hệ tọa độ. Các hình ảnh được chụp từ điện thoại, từ cảm biến được chụp bởi các góc độ khác nhau. Ở đây mình sẽ sử dụng một hình ảnh gốc làm chuẩn (nên dùng ảnh scan) để wrap các features trong ảnh gốc với các features trong ảnh cần aligned làm sao để ảnh được aligned giống với ảnh tham chiếu nhất. Bạn có thể xem ở hình 1 dưới đây.
![](https://images.viblo.asia/26801a9a-2e04-4d03-b7ce-8eeed9092124.jpg)
Hình 1: Ví dụ về Image Alignment
Ở Hình 1 bạn có thể thấy ảnh đầu tiên là ảnh tham chiếu, ảnh thứ 2 là ảnh cần aligned, ảnh cuối cùng là ảnh sau khi aligned xong.

## Homography
### Homography là gì?
Homography là sự dịch chuyển sử dụng phép chiếu hình học, hay nói cách khác nó là một phép biến đổi (ma trận 3 × 3) ánh xạ các điểm trong một hình ảnh sang các điểm tương ứng trong hình ảnh khác.
Ở Hình 2 chúng ta có thể thấy 4 điểm trên 2 quyển sách là 4 điểm tương ứng với nhau trong 2 hình ảnh này. 
![](https://images.viblo.asia/298f1ffb-7c0e-455b-9f28-a9d6146db48f.jpg)

Hình 2: Ví dụ về Homography

Ở Hình 2 chúng ta có thể thấy 4 điểm trên 2 quyển sách là 4 điểm tương ứng với nhau trong 2 hình ảnh này. 
Homography là một ma trận 3x3: 
$$
H = 
\begin{bmatrix}
h00&h01&h02\\
h10&h11&h12\\
h20&h21&h22\\
\end{bmatrix}
$$
Xét một cặp điểm tương ứng trên 2 hình ảnh cuốn sách ở trên. Ví dụ (x1, y1) trên hình 1 và (x2, y2) trên hình 2 và ta có :
$$
\begin{bmatrix}
x1\\
y1\\
1\\
\end{bmatrix}
= H \begin{bmatrix}
x2\\
y2\\
1\\
\end{bmatrix}
=\begin{bmatrix}
h00&h01&h02\\
h10&h11&h12\\
h20&h21&h22\\
\end{bmatrix} \begin{bmatrix}
x2\\
y2\\
1\\
\end{bmatrix}
$$
Ở trong bài toán này chúng ta sẽ áp dụng homography cho tất cả các điểm ảnh để wraped các điểm ảnh tương ứng giữa ảnh template và ảnh cần được aligned.


# Ứng dụng của kỹ thuật Alignment Image
Image Alignment có rất nhiều ứng dụng
Với sự tiến bộ trong lĩnh vực Computer Vision, đặc biệt là Deep Learning trong vài năm qua, các vấn đề nhận dạng chữ viết tay  đã đạt được nhiều thành tựu đáng chú ý. Tuy nhiên, kết quả của các phương pháp này phụ thuộc đáng kể vào quá trình xử lý trước dữ liệu đầu vào trước khi đưa vào mô hình dự đoán. Việc sử dụng kỹ thuật này là cực kỳ cần thiết để tăng thêm độ chính xác cho Model. 

Trong một số ứng dụng y tế, nhiều lần quét mô có thể được thực hiện ở những thời điểm hơi khác nhau và hai hình ảnh được căn chỉnh bằng cách sử dụng kết hợp các kỹ thuật image alignment.

Kỹ thuật này có thể áp dụng vào ứng dụng tạo ảnh toàn cảnh. Trong trường hợp này, hai hình ảnh thay vì là một mặt phẳng thì nó là của một cảnh 3D. Nói chung, căn chỉnh 3D yêu cầu thông tin chuyên sâu và chi tiết. Tuy nhiên, khi hai hình ảnh được chụp bằng cách xoay camera về trục quang của nó, chúng ta có thể sử dụng kỹ thuật được mô tả trong bài này để căn chỉnh hai hình ảnh toàn cảnh.
#  Các bước thực hiện 
## Hình ảnh 
Đọc hình ảnh: bước này là hiển nhiên rồi :)), mình phải có 2 ảnh một ảnh template và một ảnh cần được align

Đầu tiên chúng tá sẽ phải chuẩn bị hình ảnh để thực hiện bài toán. Ở đây mình sẽ sử dụng OpenCv nhé các bạn :D
```
import cv2
MAX_FEATURES = 500
img_template = cv2.imread('template.jpg')
img_need_aligned = cv2.imread('im_test.jpg')

```
![](https://images.viblo.asia/a46817ab-7ae2-4851-b471-d14fac7c3c7d.jpg)
Hình 3: Ảnh template

![](https://images.viblo.asia/c0133636-37fa-442f-9d6d-b2c00dc5ca98.jpg)
Hình 4: Ảnh cần được aligned
## Detect Feature
Chúng ta cần phải tìm các keypoints (feature points) trong mỗi hình ảnh. Ở đây mình sẽ sử dụng ORB detect feature bởi vì SIFT hay SUFT nếu muốn dùng phải trả phí :( 
Mình sẽ chuyển hình ảnh về grayscale 

```
  im1Gray = cv2.cvtColor(img_need_aligned, cv2.COLOR_BGR2GRAY)
  im2Gray = cv2.cvtColor(img_template, cv2.COLOR_BGR2GRAY)
```
Ở đây số lượng Max_Feature mình để là 500 cho mỗi ảnh. 
```
orb = cv2.ORB_create(MAX_FEATURES)
keypoints1, descriptors1 = orb.detectAndCompute(im1Gray, None)
keypoints2, descriptors2 = orb.detectAndCompute(im2Gray, None)
```
## Matching Feature
Tìm matching feature tương ứng ở 2 bức ảnh, sau đó tìm kiếm các keypoints giống nhau nhất và loại bỏ các keypoints xấu. Cuối cùng hiển thị các kết quả là good matchs để kiểm tra trực quan. Dùng thuật toán đo khoảng cách *hamming* để đo độ tương đồng giữa các keypoints.
```
  # Match features.
  matcher = cv2.DescriptorMatcher_create(cv2.DESCRIPTOR_MATCHER_BRUTEFORCE_HAMMING)
  matches = matcher.match(descriptors1, descriptors2, None)
   
  # Sort matches by score
  matches.sort(key=lambda x: x.distance, reverse=False)
 
  # Remove not so good matches
  numGoodMatches = int(len(matches) * GOOD_MATCH_PERCENT)
  matches = matches[:numGoodMatches]
 
  # Draw top matches
  imMatches = cv2.drawMatches(im1, keypoints1, im2, keypoints2, matches, None)
  cv2.imwrite("matches.jpg", imMatches)
   
  # Extract location of good matches
  points1 = np.zeros((len(matches), 2), dtype=np.float32)
  points2 = np.zeros((len(matches), 2), dtype=np.float32)
 
  for i, match in enumerate(matches):
    points1[i, :] = keypoints1[match.queryIdx].pt
    points2[i, :] = keypoints2[match.trainIdx].pt
```
![](https://images.viblo.asia/596f977e-f8df-45ae-8b42-75b4f55466e1.jpg)

Hình 5: Ảnh chứa các match features 
## Find Homography 
Khi chúng ta đã có các keypoints thì tiếp tục sử dụng *Homography* để tính toán, tuy nhiên không phải kết quả lúc nào cũng chính xác 100% bởi các keypoint giữa các ảnh đôi lúc giống nhau làm thuật toán của chúng ta bị nhầm lẫn. Có rất nhiều thuật toán để tính Homography nhưng ở đây mình sửa dụng [RANSAC](https://en.wikipedia.org/wiki/Random_sample_consensus). 
```
  # Find homography
  h, mask = cv2.findHomography(points1, points2, cv2.RANSAC)

``` 
## Wraping image 
Khi đã tìm được ma trận *homography* chúng ta sử dụng *cv2.warpPerspective* để ánh xạ nó về gần với tọa độ của ảnh gốc nhất. 
```
  # Use homography
  height, width, channels = im2.shape
  im1Reg = cv2.warpPerspective(im1, h, (width, height))
``` 

![](https://images.viblo.asia/48a944e5-e242-4d7a-ba71-d3eba8f1dac7.jpg)
Hình 6: Ảnh sau khi được aligned 

Ở Hình 6 chúng ta có thể thấy tuy ảnh không được giống 100% như ảnh template nhưng với kết quả như thế này so với ảnh ban đầu đã góp phần tăng độ chính xác lên kha khá :D 
# Kết Luận
Khi thực hiện bài toán OCR với các form kiểu như trên thì mình nghĩ bước căn chỉnh hình ảnh này rất quan trọng. Theo quan điểm cá nhân mình thấy phương pháp feature-based có thể được xem là tốt nhất mình vẫn hay sử dụng phương pháp này nhất. Tuy nhiên đối với một số form mà có các features giống nhau có thể gây ra sự nhầm lẫn trong việc mapping các features giữa hai bức ảnh như chữ Nhật hay Trung Quốc. 
Cảm ơn các bạn đã đọc bài của mình <3 
# Tham Khảo 
https://www.learnopencv.com/image-alignment-feature-based-using-opencv-c-python/
https://en.wikipedia.org/wiki/Image_registration