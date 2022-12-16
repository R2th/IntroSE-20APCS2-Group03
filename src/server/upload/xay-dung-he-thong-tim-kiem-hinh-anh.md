![](https://images.viblo.asia/20d7d96b-3a1d-4279-b3b3-a424650ce6ab.png) <br>

## I. Đặt vấn đề
Xin chào các bạn mình lại ngóc dậy rồi đây, câu chuyện chả là thế này mình có làm một project về phát hiện và tìm kiếm sản phẩm với input là hình ảnh sản phẩm cầu truy vấn và output mong muốn là hình ảnh trong database. Ý tưởng ban đầu của mình là xây dựng một mạng CNN để trích xuất đặc trưng của hình ảnh với đầu ra của mạng là một vector đặc trưng cho hình ảnh đó sau đó dùng hnswlib, annoy hoặc faiss để search. Nghe thì có vẻ khả thi tuy nhiên khi bắt tay vào làm thì không như những gì mình tưởng với những sản phẩm bị bắt nhầm khá nhiều. Các bạn có thể xem ví dụ dưới đây: <br>
![](https://images.viblo.asia/f5135059-4637-493e-b724-7c457454fcb1.jpeg) <br>
![](https://images.viblo.asia/b8c2866e-860a-4052-9fad-6114cf0fc9f3.jpeg)  <br>
Với 2 hình ảnh trên các bạn có thể thấy rằng chúng có kích thước khá giống nhau dẫn tới việc mô hình sẽ cho ra kết quả search bị nhầm lẫn và chỉ biết ngồi cầu nguyện. Sau một thời gian loay hoay thì mình có được bạn [Bùi Tiến Tùng](https://viblo.asia/u/tungbuitien) cho một vài gợi ý, sau khi kết hợp giữa phương pháp hiện tại của mình và phương pháp của bạn ấy  thì kết quả của khá tốt nên mình quyết định viết bài chia sẻ để các bạn có ai đang gặp vấn đề như mình thì có thể áp dụng thử nhé. Do 2 hình ảnh có kích thước tương tự nhau nên ngoài việc dùng vector embedding từ mô hình thì có thể kết hợp thêm các đặc trưng về màu sắc.
## II. Đặc trưng nội dung ảnh
Tìm kiếm ảnh theo nội dung (Content Based Images Retrieval CBIR) hay truy vấn theo nội dung ảnh (Query Based Image Content QBIC) là một ứng dụng của thị giác máy tính đối với bài toán tìm kiếm ảnh. “Dựa vào nội dung ảnh (ContentBased) ” nghĩa là việc tìm kiếm sẽ phân tích nội dung thực sự của các bức ảnh. Nội dung ảnh ở đây được thể hiện bằng màu sắc, hình dạng, kết cấu (texture), các đặc trưng cục bộ (local features), … hay bất cứ thông tin nào có từ chính nội dung ảnh. Cụm từ CBIR được T.Kato đưa ra vào năm 1992 trong quá trình thu thập ảnh một cách tự động từ cơ sở dữ liệu dựa trên biểu diễn màu sắc và hình dạng của ảnh. <br>
* Đặc trưng màu sắc: Màu sắc là một đặc trưng nổi bật và được sử dụng phổ biến nhất trong tìm kiếm ảnh theo nội dung. Mỗi một điểm ảnh (thông tin màu sắc) có thể được biểu diễn như một điểm trong không gian màu sắc ba chiều. Các
không gian màu sắc thường dùng là: RGB, Munsell, CIE, HSV. Tìm kiếm ảnh
theo màu sắc tiến hành tính toán biểu đồ màu cho mỗi ảnh để xác định tỉ trọng
các điểm ảnh của ảnh mà chứa các giá trị đặc biệt (màu sắc). Các nghiên cứu
gần đây đang cố gắng phân vùng ảnh theo các màu sắc khác nhau và tìm mỗi
quan hệ giữa các vùng này.
* Đặc trưng kết cấu: Trích xuất nội dung ảnh theo kết cấu nhằm tìm ra mô hình
trực quan của ảnh và cách thức chúng được xác định trong không gian. Kết cấu
được biểu diễn bởi các texel mà sau đó được đặt vào một số các tập phụ thuộc
vào số kết cấu được phát hiện trong ảnh. Các tập này không chỉ xác định các kết
cấu mà còn chỉ rõ vị trí các kết cấu trong ảnh. Việc xác định các kết cấu đặc
biệt trong ảnh đạt được chủ yếu bằng cách mô hình các kết cấu như những biến
thể cấp độ xám 2 chiều. <br>
![](https://images.viblo.asia/d44abcce-7c88-49e6-8ab6-b9846bcdb31a.png) <br>
* Đặc trưng hình dạng: Hình dạng của một ảnh hay một vùng là một đặc trưng
quan trong trong việc xác định và phân biệt ảnh trong nhận dạng mẫu. Mục tiêu
chính của biểu diễn hình dạng trong nhận dạng mẫu là đo thuộc tính hình học
của một đối tượng được dùng trong phân lớp, so sánh và nhận dạng đối tượng.  <br>

Thực tế đã có  nhiều máy tìm kiếm cho phép tìm kiếm hình ảnh theo nội dung ảnh:
* Google Image Swirl:  Là một thử nghiệm tìm kiếm hình ảnh theo nội dung của
Google, trong đó, kết quả tìm kiếm được sẽ được tổ chức lại dựa vào hiển thị trực
quan và độ tương đồng ngữ nghĩa giữa các ảnh. Google Image Swril phân cụm tốp
đầu các kết quả trả về cho trên 200.000 câu truy vấn và cho phép hiển thị hình ảnh
dưới dạng các cụm và mối quan hệ giữa các ảnh. <br>
![](https://images.viblo.asia/8ebd3a5f-6d68-492a-aa5d-db15d83e17a5.png) <br>
* Tiltomo: Là một công cụ dựa trên Flickr và duy trì chính cơ sở dữ liệu ảnh của
Flickr. Nó cho phép tìm kiếm ảnh dựa vào độ tương đồng về chủ đề, màu sắc
hay kết cấu. <br>
![](https://images.viblo.asia/403cd1bf-cba7-492d-bea6-fe57337d0f26.png) <br>
## III. Xây dựng hệ thống
Tìm kiếm ảnh theo lược đồ màu là phương pháp phổ biến và được sử dụng nhiều trong các hệ thống tìm kiếm ảnh theo nội dung. <br>
* Lược đồ màu RGB: <br>
Đối với ảnh màu 256 lược đồ màu của ảnh tương đương với lược đồ màu của ảnh xám. Đối với ảnh 24 bit màu, lược đồ miêu tả khả năng kết nối về cường độ của ba kênh màu R, G, . Lược đồ màu được định nghĩa như sau :
![](https://images.viblo.asia/547bf4e2-821f-4086-abc7-ed35425a71d6.png) <br>

Trong đó N là số lượng điểm có trong ảnh. Lược đồ màu này được tính bằng cách rời rạc hoá từng màu trong ảnh, sau đó đếm số điểm của mỗi màu. Để thuận tiện hơn người ra chuyển đổi ba kênh màu thành một biến duy nhất. Một cách tính lược đồ màu khác đó là ta chia ra làm 3 lược đồ riêng biệt. Khi đó mỗi lược đồ được tính bằng cách đếm kênh màu tương ứng trong mỗi điểm ảnh. Một số độ đo tương đồng được sử dụng như: Độ đo khoảng cách Ơclit, độ đo Jensen-shannon (JSD)
<br>

4 bước cơ bản của bất kì hệ thống Content-Based Image Retrieval:
1. Defining your image descriptor: Tại đây bạn cần quyết định xem bạn muốn mô tả khía cạnh nào của hình ảnh. Bạn có quan tâm đến màu sắc của hình ảnh? Hình dạng của một vật thể trong ảnh? Hay bạn muốn mô tả đặc điểm của kết cấu? <br>
2. Indexing your dataset: Sau khi xác định được bố mô tả hình ảnh (image descriptor) thì công việc tiếp theo là áp dụng bộ mô tả này cho từng hình ảnh trong tập dữ liệu, trích xuất các đặc trưng từ những hình ảnh này và ghi vào bộ nhớ (ví dụ : CSV, Redis,..)
3.  Defining your similarity metric:  Sau khi có một loat các vector đặc trưng từ các hình ảnh, bạn sẽ sử dụng chúng như thế nào. Các lựa chọn phổ biến bao gồm khoảng cách Euclide, khoảng cách Cosin, việc lựa chọn thực tế phụ thuộc nhiều vào tập dữ liệu của bạn và đối tượng bạn trích xuất. 
4.  Searching: Bước cuối cùng để thực thi việc tìm kiếm. Người dùng sẽ gửi hình ảnh truy vấn đến hệ thống của bạn và công việc của bạn sẽ là trích xuất các đặc trưng từ hình ảnh truy vấn này sau đó so sánh với các đặc trưng hình ảnh có sẵn, từ đó trả ra kết quả phù hợp nhất theo chức năng tương tự của bạn. 

Các bạn có thể xem mô tả về các bước thực hiện qua hình dưới đây :
![](https://images.viblo.asia/3ba422be-a549-4051-ae4e-d3cedafad18e.png) <br>
Với đầu vào là tệp dữ liệu hình ảnh của mình, trích xuất các đặc trưng của mỗi ảnh sau đó lưu các đặc trưng này vào trong cơ sở dữ liệu của bạn.  <br>
![](https://images.viblo.asia/a2d7989b-483e-4eb2-b813-2850650c0e4b.png) <br>
Sau đó thực hiện bước tìm kiếm qua việc người dùng gửi truy vấn, hình ảnh truy vấn được mô tả, các đăch trưng truy vấn được so sánh với các đặc trưng hiện có trong cơ sở dữ liệu, kết quả sẽ được sắp xếp theo độ liên quan và sau đó được show lên cho người dùng.  <br>
Ok chúng ta sẽ đi cho tiết vào từng bước 1 nhé : <br>

**Step 1: Defining our Image Descriptor** <br>
Trước tiên mình sẽ cùng nói qua một chút về histogram nhỉ để các bạn mới tìm hiểu có thể tiếp cận dễ hơn còn bạn nào biết rồi có thể bỏ qua nhé. Vậy biểu đồ (histogram) là gì? Bạn có thể coi histogram là một biểu đồ, nó cung cấp cho bạn ý tưởng tổng thể về sự phân bố cường độ của một hình ảnh. Nó là một biểu đồ có các giá trị pixel theo trục X và số pixel tương ứng trên trục Y. Bằng cách nhìn vào biểu đồ (histogram) của một hình ảnh, bạn có được trực giác về độ tương phản, độ sáng, phân bố cường độ, v.v. của hình ảnh đó.  <br>
![](https://images.viblo.asia/e7b8c527-0683-42b2-b805-3e6d8fe7b688.png) <br>
**BINS :** Biểu đồ trên hiển thị số lượng pixel cho mỗi giá trị pixel, tức là từ 0 đến 255. tức là bạn cần 256 giá trị để hiển thị biểu đồ trên. Nhưng khi bạn không cần tìm số lượng pixel cho tất cả các giá trị pixel một cách riêng biệt, mà là số lượng pixel trong một khoảng giá trị pixel? Ví dụ: bạn cần tìm số pixel nằm trong khoảng từ 0 đến 15, sau đó là 16 đến 31, ..., 240 đến 255. Bạn sẽ chỉ cần 16 giá trị để biểu diễn biểu đồ. Vậy những gì bạn làm chỉ đơn giản là chia toàn bộ biểu đồ thành 16 phần con và giá trị của mỗi phần con là tổng của tất cả số lượng pixel trong đó. Mỗi phần này được gọi là "BIN". Trong trường hợp đầu tiên, số lượng thùng là 256 trong khi ở trường hợp thứ hai, nó chỉ là 16. <br>
Xem xét hình dưới đây : <br>
![](https://images.viblo.asia/85d31253-15f1-4905-b8fd-7279e5f8be99.png) <BR>
   Nếu bạn chọn số bin ít quá , thì biểu đồ của bạn sẽ có ít thành phần hơn và không thể phân biệt giữa các hình ảnh có sự phân bố màu về cơ bản khác nhau. Tương tự như vậy, nếu bạn chọn số bin nhiều quá,  biểu đồ của bạn sẽ có nhiều thành phần và hình ảnh có nội dung rất giống nhau có thể bị coi là “không giống” trong thực tế. <br>
![](https://images.viblo.asia/bc648f84-5afe-4cd8-a4d9-825f44cad9f3.png) <br>
 Bây giờ thay vì việc bạn sử việc trích xuất đặc trưng về màu sắc trên toàn bộ hình ảnh thì ta sẽ chia hình ảnh trên ra thành 5 phần sau đó trích xuất đặc trưng theo từng phần. <br>
![](https://images.viblo.asia/98fc324c-7d8a-4f12-a604-2be5df454750.png) <br>
Chúng ta chia hình ảnh thành 5 phần khác nhau(1) góc trên cùng bên trái, (2) góc trên cùng bên phải, (3) góc dưới cùng bên phải, (4) dưới cùng- góc bên trái, và cuối cùng là (5) chính giữa hình ảnh. <br> 
Chúng ta sử dụng hàm cv2.calcHist để trích xuất đặc trưng màu sắc hình ảnh. 

 ```python
class ColorDescriptor:
    def __init__(self, bins):
        # store the number of bins for the 3D histogram
        self.bins = bins

    def describe(self, image):
        image = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
        features = []

        (h, w) = image.shape[:2]
        (cX, cY) = (int(w * 0.5), int(h * 0.5))

        segments = [(0, cX, 0, cY), (cX, w, 0, cY),
                    (cX, w, cY, h), (0, cX, cY, h)]

        (axesX, axesY) = (int((w * 0.75) / 2), int((h * 0.75) / 2))
        ellipMask = np.zeros(image.shape[:2], dtype="uint8")
        cv2.ellipse(ellipMask, (cX, cY), (axesX, axesY), 0, 0, 360, 255, -1)

        for (startX, endX, startY, endY) in segments:
            cornerMask = np.zeros(image.shape[:2], dtype="uint8")
            cv2.rectangle(cornerMask, (startX, startY), (endX, endY), 255, -1)
            cornerMask = cv2.subtract(cornerMask, ellipMask)

            hist = self.histogram(image, cornerMask)
            features.extend(hist)

        hist = self.histogram(image, ellipMask)
        features.extend(hist)

        return features

    def histogram(self, image, mask):
        hist = cv2.calcHist([image], [0, 1, 2], mask, self.bins,
                            [0, 180, 0, 256, 0, 256])

        cv2.normalize(hist,hist)
        hist = hist.flatten()

        return hist
```
   
**Step 2: Extracting Features from Our Dataset** <br>
    
Sau khi có bộ mô tả hình ảnh ta sẽ chuyển sang bước 2, trích xuất đặc trưng hình ảnh từ dữ liệu. 
```python
import argparse
import glob
import cv2
cd = ColorDescriptor((8, 12, 3))
# open the output index file for writing
output = open(path_to_csv, "w")
for imagePath in glob.glob(path_to_dataset + "/*.png"):
    imageID = imagePath[imagePath.rfind("/") + 1:]
	image = cv2.imread(imagePath)
    features = cd.describe(image)
	# write the features to file
	features = [str(f) for f in features]
	output.write("%s,%s\n" % (imageID, ",".join(features)))
# close the index file
output.close()
```
**Step 3: The Searcher** <br>
  ```python
 import numpy as np
import csv
class Searcher:
	def __init__(self, indexPath):
		# store our index path
		self.indexPath = indexPath
	
    def search(self, queryFeatures, limit = 10):
		# initialize our dictionary of results
		results = {}
    		# open the index file for reading
		with open(self.indexPath) as f:
			# initialize the CSV reader
			reader = csv.reader(f)
			# loop over the rows in the index
			for row in reader:
                features = [float(x) for x in row[1:]]
				d = self.chi2_distance(features, queryFeatures)
                results[row[0]] = d
			# close the reader
			f.close()

		results = sorted([(v, k) for (k, v) in results.items()])
		# return our (limited) results
		return results[:limit]
    	
    def chi2_distance(self, histA, histB, eps = 1e-10):
		# compute the chi-squared distance
		d = 0.5 * np.sum([((a - b) ** 2) / (a + b + eps)
			for (a, b) in zip(histA, histB)])
		# return the chi-squared distance
		return d
```
**Step 4: Performing a Search** <br>
```python
cd = ColorDescriptor((8, 12, 3))
query = cv2.imread(path_to_image)
features = cd.describe(query)
# perform the search
searcher = Searcher(path_to_csv)
results = searcher.search(features)
# display the query
cv2.imshow("Query", query)
# loop over the results
for (score, resultID) in results:
	# load the result image and display it
	result = cv2.imread(path_to_result + "/" + resultID)
	cv2.imshow("Result", result)
	cv2.waitKey(0)
    
```
Trong phần search các bạn có thể sử dụng các thư viện như annoy, faiss... cái này thì cũng tuỳ mọi người và tuỳ vào bài toán để mọi người chọn sao cho phù hợp. Ngoài việc sử dụng thêm đặc trưng về màu sắc thì chúng ta cũng có thể sử dụng thêm các đặc trưng về hình dạng , kết cấu để tăng độ chính xác.


## IV. Kết luận
Bài viết của mình đến đây là kết thúc nếu các bạn thấy hay thì cho mình xin một upvote nhé. Mọi thắc mắc các bạn có thể comment dưới bài viết. Cảm ơn các bạn đã theo dõi bài viết của mình.