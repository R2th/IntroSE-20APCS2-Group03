## 1. Lời mở đầu
Bài toán nhận diện biển số xe là một bài toán không còn mới, ứng dụng của nó đã được triển khai rộng rãi trong cuộc sống thường ngày như bãi đỗ xe thông minh, hệ thống thu tiền không dừng tại các tuyến đường cao tốc.....Tuy nhiên, mình thấy trên một số diễn đàn nhiều bạn đặc biệt các bạn  mới bắt đầu tìm hiểu về computer vision thường chọn đề tài nhận diện biển số xe này và gặp không ít khó khăn về chúng. Do đó hôm nay mình quyết định viết một bài tutorial về đề tài này. Code thực hiện thuật toán mình chỉ giải thích các ý chính ngoài ra các bạn có thể tham khảo thêm tại [github của mình](https://github.com/buiquangmanhhp1999/License-Plate-Recognition).

## 2. Chuẩn bị dataset
Trong bài viết lần này mình sử dụng dữ liệu là biển số xe Việt Nam, các bạn có thể tải bộ dữ liệu đó về [tại đây](https://thigiacmaytinh.com/tai-nguyen-xu-ly-anh/tong-hop-data-xu-ly-anh/?fbclid=IwAR2tajA5Ku83kIrb09ovhmb_68Zmdwo9KvV_CSNBCTbuIIsiK_FUM4W4Dh8). Đây là dữ liệu thô gồm các ảnh có chứa biển số xe chưa gán nhãn. Do đó để **train dữ liệu này với YoLoTiny v3** bạn cần gắn nhãn mỗi ảnh bốn tọa độ vùng có chứa biển số xe. Ở đây mình có sử dụng một tool là **LabelImage** hỗ trợ trong việc gắn nhãn các bức ảnh.  Các bạn có thể cài đặt dễ dàng cài đặt trên anaconda bằng lệnh:<br>
    
```
pip install labelImg
```
**Các bạn chọn thư mục chứa ảnh và format  là yoloV3.** Sau đó bạn vẽ một hình chữ nhật bao quanh vùng chứa biển số xe, bước này bạn nên vẽ khít nhất số với biển số xe thật để tăng độ chính xác cho mô hình. Ở lần vẽ đầu tiên bạn sẽ phải nhập vào tên nhãn mà bạn muốn gắn, do ở đây chỉ có một đối tượng nên chỉ cần cần một nhãn tên là ***LP***(ví dụ). Về cách sử dụng tool Labelmage này bạn có thể tham khảo [tại đây](https://github.com/tzutalin/labelImg#create-pre-defined-classes). Dưới đây mình liệt kê một số thao tác quan trọng:
| Phím tắt  | Ý nghĩa|
|-----|-------|-------|
| Ctrl + s	    | Lưu  |  
| Ctrl + u	| Load toàn bộ ảnh từ một thư mục |  
| w | Vẽ bounding box  |
|d| Ảnh tiếp theo|
|a| Ảnh trước|
|del| xóa bounding box|
## 3. Các bước thực hiện
Phương pháp mình giới thiệu lần này bao gồm 4 bước: <br>

* Xác định vùng chứa biển số xe sử dụng **Yolo Tiny v3** 
* Sử dụng thuật toán segment để tách từng kí tự trên biển số xe
* Xây dựng một model CNN để phân loại các kí tự(characters classification)
* Định dạng lại biển số xe xác định biển số xe gồm một hay hai dòng.

### 3.1 Xác định vùng chứa biển số xe sử dụng Yolo Tiny v3
```python
from imutils import perspective

# crop number plate used by bird's eyes view transformation
LpRegion = perspective.four_point_transform(image_original, pts)
```
Để model có thể xử lý nhanh nhất nên mình chọn model Yolo Tiny v3 nhanh hơn rất nhiều so với YoloV3. Cách train Yolo Tiny v3 các bạn có thể tham khảo [tại đây](https://github.com/AlexeyAB/darknet). Sau khi train model ta có được các file weights. Mình lấy weights sau tầm 14000, 15000 vòng lúc đó loss model khá thấp và ổn định.  Chúng ta sử dụng file weight đó xác định vùng chứa biển số xe sau đó dùng hàm **four_point_transform** crop vùng chứa biển số xe ra khỏi ảnh gốc. Hàm này nhận vào hai tham số đó là image-original-ảnh gốc ban đầu và pts - tọa độ bốn góc của biến số xe lấy được từ yolo được sắp xếp theo thứ tự  **(top left, top right, bottom left, bottom right)**. Truyền tọa độ bốn góc theo thứ tự này giúp cho có khả năng lấy ảnh từ trên cao xuống(bird's eyes view transformation) giúp cho ảnh đỡ bị méo mó  và nét hơn phương pháp crop thông thường. Có một cách khác là sử dụng một mạng transformer sẽ tốt hơn cách này nhưng mình sẽ giới thiệu trong một bài khác.
<br>
<p align="center">
    <img src="https://images.viblo.asia/8199ca5f-c775-40d3-b0f1-95ea1574c7eb.jpg" >
Ảnh 1: So sánh giữa phương pháp crop và bird's eyes view transformation
</p>

### 3.2. Segment tách từng kí tự trên biến số xe
Đầu tiên ta sẽ chuyển màu ảnh từ **BGR** sang **HSV**. Ở một số lời giải khác cho bài toán này, mình thường thấy sử dụng màu GRAY thay cho HSV. Mình đã thử nhưng cho độ chính xác không cao vì HSV biểu diễn một màu dựa trên 3 số liệu:<br>

1.  H(Hue): vùng chứa màu sắc
2.  S(Saturation): độ bão hòa
3.  V(Value): độ sáng 

nên khi ta muốn sử dụng một ngưỡng độ sáng của từng pixel để lọc ra các kí tự, thì với HSV ta dễ dàng dùng riêng rẽ giá trị độ sáng (V) còn với màu GRAY ta không thể làm việc đó vì nó biểu diễn màu dựa trên chung một giá trị.
```python
 V = cv2.split(cv2.cvtColor(LpRegion, cv2.COLOR_BGR2HSV))[2]
 ```
  
  Sau đó ta sử dụng ***adaptive threshold*** để làm nổi bật những phần mà ta muốn lấy(màu đen). Bạn tưởng tượng ***adaptive threshold*** sử dụng những cửa sổ nhỏ đi từ trái sang phải, trên xuống dưới và nó sẽ lấy những giá trị pixel nào lớn hơn giá trị trung bình(threshold) với một giá trị offset mà ta điều chỉnh. Khác với các kiểu ***threshold truyền thống*** áp dụng ngưỡng cho toàn bộ ảnh, ***adaptive threshold*** áp dụng cho từng vùng nhỏ nhờ đó hoạt động tốt hơn với điều kiện ánh sáng kém. Sau đó lấy những giá trị nào lớn hơn ngưỡng.
  ```python
  from skimage.filters import threshold_local
  
  T = threshold_local(V, 15, offset=10, method="gaussian")
  thresh = (V > T).astype("uint8") * 255
  ```
  Và đây là kết quả của bước xử lý này trông cũng khá ngon lành đúng không? :laughing:
  <p align="center" >
    <img src="https://images.viblo.asia/8ffcd18d-2834-4700-ad7f-ad6a87edcbe8.png" >
    Ảnh 2

</p>

Để tách từng kí tự ra khỏi biển số xe, ta sử dụng thuật toán ***Connected components analysis***. Thuật toán này có ý tưởng đơn giản là nó sẽ kết nối  tất cả pixel nào có cùng giá trị thành một khối và gắn cho nó một cái nhãn(label). Nhờ đó tất cả các pixel của cùng một kí tự do có cùng giá trị sẽ được kết nối và được tách ra khỏi biển số xe. Tuy nhiên để tiện xử lý thì mình convert toàn bộ màu trắng thành đen và ngược lại. Đồng thời cũng làm mờ ảnh để loại những nhiễu tròn vì có thể nó làm kí tự gắn liền với những bộ phận mình không mong muốn và thuật toán **Connected components analysis** **(CCA)** sẽ bị ảnh hưởng.
```python
# convert black pixel of digits to white pixel
thresh = cv2.bitwise_not(thresh)
cv2.imwrite("step2_2.png", thresh)
thresh = imutils.resize(thresh, width=400)
thresh = cv2.medianBlur(thresh, 5)

# connected components analysis
labels = measure.label(thresh, connectivity=2, background=0)
```

Sau khi thực hiện **CCA**, ta thu được một dãy các giá trị labels bao gồm các kí tự, các nhiễu không mong muốn(khung biển số xe, dấu gạch ngang, dấu chấm, ...) và background(có label = 0 theo mặc định của ***hàm label*** ).  Do đó đầu tiên chúng ta loại bỏ các label của background sau đó áp dụng **hàm findContours** để tạo các contours bao quanh các kí tự cũng như các nhiễu. Do ở bước này các giá trị thu được ngoài kí tự còn có cả nhiễu do đó ta thiết lập các giá trị ngưỡng để loại bỏ nhiễu.
Ở đây ta sử dụng ngưỡng đối với ba đại lượng: **aspect ratio(tỉ lệ rộng / dài), solidity(tỉ lệ diện tích phần contour bao quanh kí tự và hình chữ nhật bao quanh kí tự) và height ratio(tỉ lệ chiều dài kí tự / chiều dài biển số xe)**. Nếu sử dụng phương pháp deep learning phân loại thì tốn thời gian bởi lượng nhiễu là rất lớn. Chúng ta chỉ cần tinh chỉnh những tham biến này tùy tập dữ liệu đã có thể nhanh chóng loại bỏ phần lớn nhiễu một cách đơn giản, lấy ra ảnh kí tự  trên biển số xe mong muốn. Sau đó ta đưa về dạng (28, 28, 1) là kích thước input đầu vào của mạng CNN bước 3 và ta cũng thêm tọa độ (x, y) của từng chữ cái để dùng tại bước 4.
```python
# loop over the unique components
for label in np.unique(labels):
   # if this is background label, ignore it
   if label == 0:
      continue

   # init mask to store the location of the character candidates
   mask = np.zeros(thresh.shape, dtype="uint8")
   mask[labels == label] = 255

   # find contours from mask
   contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

   if len(contours) > 0:
     contour = max(contours, key=cv2.contourArea)
     (x, y, w, h) = cv2.boundingRect(contour)

      # rule to determine characters
      aspectRatio = w / float(h)
      solidity = cv2.contourArea(contour) / float(w * h)
      heightRatio = h / float(LpRegion.shape[0])

      if 0.1 < aspectRatio < 1.0 and solidity > 0.1 and 0.35 < heightRatio < 2.0:
           # extract characters
           candidate = np.array(mask[y:y + h, x:x + w])
           square_candidate = convert2Square(candidate)
           square_candidate = cv2.resize(square_candidate, (28, 28), cv2.INTER_AREA)
           square_candidate = square_candidate.reshape((28, 28, 1))
           self.candidates.append((square_candidate, (y, x)))
```

Dưới đây là kết quả của bước xử lý này:
<p align="center" >
   <img src="https://images.viblo.asia/bf6d48d1-e992-40fa-9d44-9f5393b82a0f.png" >
    Ảnh 3:  Kết quả bước 2
</p>

### 3.3. Phân loại các kí tự sử dụng model CNN
Ở Việt Nam, trên biển số xe chấp nhận 31 ký tự bao gốm cả chữ và chữ số(0-9). Tuy nhiên, ở kết quả bước 2 mặc dù ta đã sử dụng ngưỡng để loại bỏ nhiễu nhưng vẫn có một số nhiễu vẫn lọt qua:joy: vì nó có kích thước hình dáng đủ tiêu chuẩn như kí tự thường. Do có số lượng ít nên ở bước này mình ***thêm một class là background*** để dùng model CNN phân loại đâu là ký tự đâu là nhiễu. Vậy **tổng các class cần phân loại là 32**.

Datasets để huấn luyện model ở đây mình gặp hai vấn đề. **Thứ nhất** là datasets có sẵn như MNIST thì quá đẹp nhưng khi vào môi trường thực tế với điều kiện ánh sáng yếu thì kí tự thu được sẽ bị méo mó chút như **ảnh 3**. Và **vấn đề thứ hai** là font chữ nước ngoài khác font chữ Việt Nam. Hai yếu tố này sẽ tác động đến chất lượng của model classification(phân loại). Do đó mình đã từ datasets có sẵn về biển số xe Việt Nam mình gen ra dữ liệu kí tự để đảm bảo chất lượng mô hình.
```python
ALPHA_DICT = {0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H', 8: 'K', 9: 'L', 10: 'M', 11: 'N', 12: 'P',
              13: 'R', 14: 'S', 15: 'T', 16: 'U', 17: 'V', 18: 'X', 19: 'Y', 20: 'Z', 21: '0', 22: '1', 23: '2', 24: '3',
              25: '4', 26: '5', 27: '6', 28: '7', 29: '8', 30: '9', 31: "Background"}
```
Sau đó mình xây dựng một model CNN đơn giản để tiến hành trích xuất đặc trưng và phân loại. Các bạn có thể xem file này tại file [model.py trên github của mình](https://github.com/buiquangmanhhp1999/License-Plate-Recognition/blob/master/model.py). Model này được thiết kế với các số filters tăng dần [32, 64, 64] để sao cho càng gần về output không gian đặc trưng giảm dần nhưng số lượng cách học (= số filters) tăng dần. Tùy độ phức tạp của dữ liệu mà chúng ta có thể thay đổi. Cuối cùng ta sử dụng một layer flatten và một activation softmax để phân loại. 32 ở đây chính là số class ta đề cập bên trên.
```python
def _build_model(self):
  # CNN model
  self.model = Sequential()
  self.model.add(Conv2D(32, (3, 3), padding='same', activation='relu', input_shape=(28, 28, 1)))
  self.model.add(Conv2D(32, (3, 3), activation='relu'))
  self.model.add(MaxPooling2D(pool_size=(2, 2)))
  self.model.add(Dropout(0.25))

  self.model.add(Conv2D(64, (3, 3), padding='same', activation='relu'))
  self.model.add(Conv2D(64, (3, 3), activation='relu'))
  self.model.add(MaxPooling2D(pool_size=(2, 2)))
  self.model.add(Dropout(0.25))

  self.model.add(Conv2D(64, (3, 3), padding='same', activation='relu'))
  self.model.add(Conv2D(64, (3, 3), activation='relu'))
  self.model.add(MaxPooling2D(pool_size=(2, 2)))
  self.model.add(Dropout(0.25))

  self.model.add(Flatten())
  self.model.add(Dense(512, activation='relu'))
  self.model.add(Dropout(0.5))
  self.model.add(Dense(32, activation='softmax'))
  ```
  
  ### 3.4 Xác  định biển số xe gồm một hay hai dòng
  Ở bước cuối cùng này, ta sử dụng tọa độ (x, y) trên mỗi kí tự ta đã đề cập ở **bước 3**.  Bạn hãy tưởng tượng mặt phẳng tọa độ xOy trong đó x là trục ngang, y là trục dọc. **Nếu biển số xe gồm một dòng** thì tọa độ y (trục dọc)giữa các kí tự thu được sẽ nhỏ hơn một ngưỡng. **Còn nếu biển hai dòng** thì tọa độ y giữa các kí tự sẽ lớn hơn ngưỡng.  Sau đó ta sử dụng giá trị x để xác định thứ tự trước sau sắp xếp các kí tự từ trái qua phải từ trên xuống dưới.
  ```python
def format(self):
    first_line = []
    second_line = []

    for candidate, coordinate in self.candidates:
      if self.candidates[0][1][0] + 40 > coordinate[0]:
          first_line.append((candidate, coordinate[1]))
      else:
          second_line.append((candidate, coordinate[1]))

    def take_second(s):
      return s[1]

    first_line = sorted(first_line, key=take_second)
    second_line = sorted(second_line, key=take_second)

    if len(second_line) == 0:  # if license plate has 1 line
       license_plate = "".join([str(ele[0]) for ele in first_line])
    else:   # if license plate has 2 lines
       license_plate = "".join([str(ele[0]) for ele in first_line]) + "-" + "".join([str(ele[0]) for ele in second_line])

    return license_plate
   ```
   ## 4. Kết quả
   Project nhận diện biển số xe này của mình có thể hoạt động trên cả biển một dòng hoặc hai dòng. Thậm chí đôi khi biển số xe bị che khuất một chút vẫn đọc được. :sunglasses:
   <p align="center" >
   <img src="https://images.viblo.asia/877154c3-929f-431c-a728-4a994acf6869.png" >
    Ảnh 4:  Kết quả
</p>

Tuy nhiên, nó vẫn có một số nhược điểm::worried:

* Khi ảnh đầu vào bị đặt một góc quá nghiên thì một vài kí tự sẽ bị nhầm dòng. Có một cách giải quyết là dùng một mạng transformer xoay ảnh nghiêng về ảnh thẳng.
* Đôi khi bị nhận dạng nhầm giữa 8 và B, 0 và D
*  Hoạt động kém khi bức ảnh quá mờ

Hy vọng bài viết của mình sẽ giúp ích cho các bạn. Các bạn có câu hỏi hay thắc mắc nào thì nhớ comment cho mình nhé. À nhớ cả upvote cho bài viết để tăng động lực cho mình nữa nha.:kissing_heart: