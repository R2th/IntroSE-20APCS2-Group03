Ở bài trước mình đã hướng dẩn các bạn về Template Matching. Và ở bài viết tiếp theo này mình sẽ giới thiệu và hướng dẩn một thuật toán khá cơ bản đó là thuật toán GrabCut.
# I. Giới thiệu.
Thuật toán GrabCut được thiết kế bởi Carsten Rother, Vladimir Kolmogorov & Andrew Blake từ Microsoft Research Cambridge, Vương quốc Anh. trong bài báo của họ, "GrabCut": khai thác nền trước tương tác bằng cách sử dụng cắt giảm đồ thị lặp lại. Một thuật toán rất cần thiết cho việc khai thác ảnh nền, tách nền đối với các hình ảnh chứa nọi dung cần xác định, và kết quả là GrabCut ra đời.

- Ý tưởng ở đây là tìm tiền cảnh và xóa nền. 
- Chúng ta sẽ thấy được thuật toán GrabCut làm việc như thế nào, trích xuất ảnh nền trong hình ảnh.
- Chúng ta sẽ tạo ra một ứng dụng tương tác hình ảnh với thuật toán GrabCut cho việc tách nên các hình ảnh.

# II. GrabCut Foreground 
Cách hoạt động của nó phát sinh từ quan điểm nào và nó hoạt động ra làm sao, chúng ta xem nhe. Ban đầu, người ta vẽ một hình chữ nhật xung quanh vùng tiền cảnh (khu vực foreground phải hoàn toàn bên trong hình chữ nhật). Sau đó, thuật toán phân đoạn nó lặp đi lặp lại để có được kết quả tốt nhất. Làm xong. Nhưng trong một số trường hợp, phân đoạn sẽ không được tốt, giống như, nó có thể đã đánh dấu một số khu vực tiền cảnh làm nền và ngược lại. Trong trường hợp đó, người dùng cần phải thực hiện các liên lạc tốt hơn. Chỉ cần cung cấp cho một số nét trên những hình ảnh mà một số kết quả bị lỗi là có. Strokes về cơ bản là muốn thể hiện việc "Khi khu vực này nên được tiền cảnh, bạn đánh dấu cho nó đi, sửa nó trong lần lặp tiếp theo", hoặc đối diện của nó cho nền. Sau đó, trong lần lặp tiếp theo, bạn sẽ có kết quả tốt hơn.
## 1. Ví dụ.
Xem hình ảnh bên dưới. Cầu thủ và quả bóng được bao bọc trong một hình chữ nhật màu xanh. Sau đó, một số touchups cuối cùng với nét trắng (biểu thị foreground) và nét đen (biểu thị nền) được thực hiện. Và chúng tôi có kết quả tốt đẹp.

![](https://images.viblo.asia/20b8b59a-b261-41f0-bcd8-7800afef5108.jpg)

## 2. Hướng dẫn.

Vậy điều gì sẽ xảy ra trong hình ảnh trên?
- Người dùng nhập hình chữ nhật. Tất cả mọi thứ bên ngoài hình chữ nhật này sẽ được thực hiện như là nội dung nền (Đó là lý do nó được đề cập trước đó hình chữ nhật của bạn nên bao gồm tất cả các đối tượng vật chủ).

- Tất cả mọi thứ bên trong hình chữ nhật là không rõ ràng. Tương tự, bất kỳ đầu vào người dùng nào chỉ định nền trước và nền được coi là gắn nhãn cứng có nghĩa là chúng sẽ không thay đổi trong tiến trình. Máy tính thực hiện ghi nhãn ban đầu tùy thuộc vào dữ liệu chúng ta đã cung cấp. Nó gắn nhãn các pixel nền trước và nền sau (hoặc nhãn cứng).
-  Bây giờ, một Mô hình Hỗn hợp Gaussian (GMM) được sử dụng để mô hình hóa nền trước và nền sau. Tùy thuộc vào dữ liệu chúng ta đã cung cấp, GMM học và tạo phân phối pixel mới. Tức là, các điểm ảnh không xác định được gắn nhãn hoặc nền trước có thể xảy ra hoặc có thể xảy ra tùy thuộc vào mối quan hệ của nó với các pixel được gắn nhãn cứng khác về số liệu thống kê màu (Nó giống như phân cụm). 
-  Biểu đồ được tạo từ phân phối pixel này. Các nút trong biểu đồ là pixel. Bổ sung hai nút được thêm vào, nút Nỗi và nút Chìm. Mỗi điểm ảnh nền trước được kết nối với nút Nỗi và mỗi điểm ảnh nền được kết nối với nút Chìm. 
-  Trọng số của các cạnh nối các điểm ảnh với nút nỗi / nút kết thúc được xác định bởi xác suất của pixel là nền trước / nền.
-  Trọng số giữa các pixel được xác định bởi thông tin cạnh hoặc điểm tương đồng pixel. Nếu có sự khác biệt lớn về màu pixel, cạnh giữa chúng sẽ có trọng lượng thấp. 
-  Sau đó, thuật toán cắt nhỏ được sử dụng để phân đoạn biểu đồ. Nó cắt biểu đồ thành hai nút nỗi và nút chìm với hàm chi phí tối thiểu. 
-  Hàm chi phí là tổng của tất cả các trọng số của các cạnh được cắt. Sau khi cắt, tất cả các điểm ảnh kết nối với nút Nỗi trở thành tiền cảnh và những điểm kết nối với nút Sink trở thành nền.
-  Quá trình này được tiếp tục cho đến khi phân loại hội tụ.

![](https://images.viblo.asia/3007cbda-91c6-4373-a969-b31ab87ea5aa.jpg)
Đây là ảnh minh họa thuật toán. Các bạn xem có hiểu đươcj chút gì không nhé.
Bây giờ là một ví dụ nhỏ về việc hiển thị kết quả của thuật toán.

```
import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt
img = cv.imread('messi5.jpg')
mask = np.zeros(img.shape[:2],np.uint8)
bgdModel = np.zeros((1,65),np.float64)
fgdModel = np.zeros((1,65),np.float64)
rect = (50,50,450,290)
cv.grabCut(img,mask,rect,bgdModel,fgdModel,5,cv.GC_INIT_WITH_RECT)
mask2 = np.where((mask==2)|(mask==0),0,1).astype('uint8')
img = img*mask2[:,:,np.newaxis]
plt.imshow(img),plt.colorbar(),plt.show()
```

Kết quả : 
![](https://images.viblo.asia/0987f306-5623-460d-a080-1ce367182ab9.jpg)

Rất tiếc, tóc của Messi đã biến mất. Ai thích Messi mà không có tóc? Chúng ta cần mang nó trở lại. Vì vậy, chúng ta sẽ cung cấp cho nó một touchup tốt với 1-pixel (chắc chắn foreground). Đồng thời, một số phần của mặt đất có chứa trong kết quả mà chúng ta không muốn, và cũng có một số logo. Chúng ta cần phải loại bỏ chúng. Ở đó chúng ta cung cấp cho một số 0-pixel touchup (chắc chắn nền). Vì vậy, chúng ta sửa đổi mặt nạ kết quả của chúng ta trong trường hợp trước đó như chúng ta đã nói lúc này. Điều chúng ta thực sự muốn làm là, chúng ta đã mở hình ảnh đầu vào trong ứng dụng vẽ và thêm một lớp khác vào hình ảnh. Sử dụng công cụ brush trong sơn, tôi đánh dấu bỏ qua foreground (tóc, giày, bóng vv) với nền màu trắng và không mong muốn (như logo, mặt đất, vv) với màu đen trên lớp mới này. Sau đó điền vào nền còn lại với màu xám. Sau đó tải hình ảnh mặt nạ đó trong OpenCV, chỉnh sửa hình ảnh mặt nạ ban đầu mà chúng tôi nhận được với các giá trị tương ứng trong hình ảnh mặt nạ mới được thêm vào. Kiểm tra mã dưới đây:

```
# newmask is the mask image I manually labelled
newmask = cv.imread('newmask.png',0)
# wherever it is marked white (sure foreground), change mask=1
# wherever it is marked black (sure background), change mask=0
mask[newmask == 0] = 0
mask[newmask == 255] = 1
mask, bgdModel, fgdModel = cv.grabCut(img,mask,None,bgdModel,fgdModel,5,cv.GC_INIT_WITH_MASK)
mask = np.where((mask==2)|(mask==0),0,1).astype('uint8')
img = img*mask[:,:,np.newaxis]
plt.imshow(img),plt.colorbar(),plt.show()
```

Và đây là kết quả mong đợi hơn. 
![](https://images.viblo.asia/27009e4e-130e-4ecf-84f2-d056ae52b055.jpg)

Bạn thấy được kết quả khá mong muốn rồi đúng không ?

## 3. Kết quả.
Có một số kết quả sai ở đây. Bạn có thể tiếp tục điều chỉnh chúng cho đến khi bạn có 100% thành công nhé.
# III. Tài liệu tham khảo.
http://docs.opencv.org/
https://techmaster.vn/
https://pythonprogramming.net/

Chờ bài viết tiếp theo của mình nhé.