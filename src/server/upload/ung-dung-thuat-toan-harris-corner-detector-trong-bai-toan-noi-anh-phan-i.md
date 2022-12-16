### Introduction

   Xin chào mọi người, như mọi người đã biết trong các bài toán xử lý ảnh thì những đặc trưng của ảnh hay còn gọi là image features là vô cùng quan trọng trong việc giải quyết các bài toán thực tế như object detection, object classification, object localization, vân vân và vân vân. Hôm nay mình xin giới thiệu đến các bạn một thuật toán điển hình và mạnh mẽ trong việc tìm ra các corners cũng như các image features nhằm phục vụ cho các bài toán như image matching, image stitching for panorama,...
   
   Giới thiệu qua về `Harris Corner Detector(HCD)`, thì đây là thuật toán lần đầu tiên được giới thiệu bởi Chris Harris and Mike Stephens vào năm 1988. Ý tưởng chính của Harris là ông dựa vào sự biến đổi cường độ sáng tại một vùng lân cận được phát biểu như sau: một vùng nhỏ xung quanh các đặc trưng sẽ có 1 sự thay đổi lớn về cường độ sáng nếu một window dịch chuyển 1 đoạn (u,v) từ điểm (x,y) theo bất kì hướng nào.
  
  Một ví dụ về ứng dụng HCD:
  ![](https://images.viblo.asia/9789f099-31d0-4792-a741-8a5d2a51f189.gif)
  
### Mathematical overview
    
   Chúng ta có công thức tính lượng thay đổi cường độ sáng khi dịch chuyển 1 đoạn [u, v] như sau:
   
   ![](https://images.viblo.asia/ce7c21a4-1037-4d4a-892b-0585ae7f8349.png)
   
   Trong đó:
   
   W: Cửa sổ w có thể coi = 1 để cho đơn giản trong việc tính toán nhưng để chuẩn xác hơn cho kết quả đầu ra ta có thể coi đây như một mặt nạ Gauss(3x3, 5x5, ...)
   
   I(x, y): Cường độ sáng tại điểm x, y
   
   I(x + u, y + v): Cường độ sáng sau khi dịch chuyển cửa sổ đến điểm (x + u, y + v)
   
   Ở đây ta sẽ áp dụng biến đổi Taylor để rút gọn lại biểu thức, ta có:
   
   f(x + u, y + v)  ≈ f(x, y) + u*fx(x, y) + v*fy(x, y)
   
   Suy ra ![](https://images.viblo.asia/0b6ffc3e-2524-459a-9940-e7ad9e6ba321.png)
   
   Đến đây ta coi 
   
   ![](https://images.viblo.asia/7a4c3b87-0964-40d1-9223-b42e007021ca.png)
   
   Như vậy cuối cùng ta có sự thay đổi cường độ sáng:
   
   ![](https://images.viblo.asia/2fcc554e-a101-4300-aac1-c7b43fbeac41.png)
   
   Việc phân loại và tìm ra các điểm ảnh có phải là các corner hay không dựa vào việc tính giá trị R (Mesure of corner response). Công thức R như sau:
   
   ![](https://images.viblo.asia/510ff24b-667d-46da-b1fb-77138baeabee.png)
   
   Trong đó: det(M) = AB - C^2 = λ1λ2, trace(M) = λ1 + λ2, λ1, λ2 là các giá trị bản địa of M tương ứng với độ cong của hàm địa phương quyết định xem điểm này có phải là corners hay không.
   
   ![](https://images.viblo.asia/e608f7fe-e944-4a23-8b1a-2a5e17ae0457.png)
   
### Intuitive Way to Understand Harris

   Đạo hàm 1 chiều 1 tập các điểm (dx, dy) ta thu được:
   
   ![](https://images.viblo.asia/33e02d62-61e3-43dc-93a0-7bc6fa5c58da.png)
   
   Ở đây ta có thể nhận ra được sự khác nhau giữa các image features theo các hướng đạo hàm bậc 1 và đạo hàm bậc 2.
   
   Plot các điểm nay lên trục đồ thị:
   
   ![](https://images.viblo.asia/42476d49-2a8a-4ddf-975a-8fa42d1b6773.png)
   
   Chúng ta có thể thấy sự phân bố đạo hàm theo x, y là rất khác nhau giữa mặt phẳng, cạnh và góc trong một ảnh.
   
#### Step by step to implement Harris Algorithm

   Chúng ta có thể sử dụng function cornerHarris trong thư viện OpenCv, nhưng để hiểu bản chất thuật toán hơn chúng ta sẽ implement lại từ đầu thuật toán.
   
   1. Đầu tiên, chuyển từ ảnh RGB thành ảnh xám sau đó xoá nhiễu bằng mặt nạ Gauss
   2. Thực hiện đạo hàm ảnh theo x, y bằng Sobel, Ix, Iy
   3. Tính toán độ tương quan giữa các đạo hàm:
   
        *  A = Ix^2
        *  B = Ix * Iy
        *  C = Iy^2
        
        Có 1 điểm đặc biệt ở đây là khi nhân ma trận, chúng ta sẽ không thực hiện phép nhân ma trận thông thường mà nhân các điểm tương ứng của ma trận này với ma trận kia: Ví dụ: A[i][j] = Ix[i][j] * Ix[i][j], sau đó áp dụng mặt nạ Gauss lên các ma trận A, B, C thu được _A, _B, _C 
    4. Tính corner response:
        
        R = det(M) - k * Trace(M)
        
        Với: det(M) = _A*_B - _C^2, Trace(M) = _A + _B, k là giá trị thực nghiệm [0,04 - 0,06]
    
   5. Threshhold và lấy giá trị max ở mỗi vùng. Ở bước này sau khi threshhold, chúng ta sẽ lấy 1 cửa sổ (3x3) trượt qua từng pixel của R và lấy giá trị max ở mỗi vùng.

### Code Implement
   Bây giờ mình sẽ giới thiệu qua về code:
   
   Import các thư viện cần thiết:
   
   ```python
   import cv2
   import numpy as np
   import matplotlib.pyplot as plt
   from random import randint
   ```
   ```python
   // Hàm tìm giá trị max trong một cửa sổ 3x3 với tâm là [i, j] 
   
   def find_max(R, i, j):
    max_point = 0
    
    for k in [-1, 0, 1]:
        for l in [-1, 0, 1]:
            if (max_point < R[i+k][j+l]):
                max_point = R[i+k][j+l]
    return max_point
   ```
   ```python
   \\ Hàm nhân 2 ma trận các điểm tương ứng
   
   def matrix_multiply(I_x, I_y):
    (h, w) = I_x.shape
    result = np.empty((h, w))
    
    for i in range(0, h):
        for j in range(0, w):
            result[i][j] = I_x[i][j] * I_y[i][j]

    return result
   ```
   
   ```python
   \\ Hàm này sẽ giữ lại các vị trí có giá trị = giá trị max tại mỗi cửa sổ, các giá trị không thoả mãn sẽ bị đưa về 0
   
   def nonmax_suppression(R, i, j, max_point):
    for k in [-1, 0, 1]:
        for l in [-1, 0, 1]:
            if (R[i+k][j+l] == max_point):
                continue
            else:
                R[i+k][j+l] = 0
   ```
   
   ```python
   \\ hàm tính trace của ma trận M
   
   def calculate_trace(A, B):
    return A + B
   ```
   
   ```python
   \\ Hàm tính det của ma trận M
   
   def calculate_det(A, B, C):
    det = matrix_multiply(A, B) - matrix_multiply(C, C)
    
    return det
   ```
   
   ![](https://images.viblo.asia/b5a55d98-28c4-4055-b68b-836af9462664.png)
   
   ![](https://images.viblo.asia/66f5ff42-537b-4c12-8d60-bfd0cafdc18c.png)
   
   Chúng ta có thể thấy kết quả trả về là khá chính xác, có 1 lưu ý là ở bước chọn threshhold là khá quan trọng để có được kết quả tối ưu nhất.
   
  Ở bài tiếp theo, mình sẽ giới thiệu về việc tận dụng thuật toán Harris trong ứng dụng nối ảnh để thu được kết quả như này. Cảm ơn mọi người đã đọc bài nha.
  
  ![](https://images.viblo.asia/813dee44-ae67-4b34-b821-35c1393e7d75.png)