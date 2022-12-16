### I. Introduction

   Faster RCNN - Đây là một thuật toán object detection trong gia đình RCNN( Region-based CNN ) với phiên bản nâng cấp cao hơn so với RCNN và Fast RCNN. So với 2 phiên bản trước, phiên bản này nhanh hơn rất nhiều do có sự tối ưu về mặt thuật toán. 
   
   Hãy cùng so sánh một chút giữa RCNN, Fast RCNN và Faster RCNN
   
   * Với RCNN
       
       R-CNN sử dụng [Selective Search](https://www.learnopencv.com/selective-search-for-object-detection-cpp-python/) để extract các regions từ image đầu vào và check sự xuất hiện bất kì của object bên trong các box. Từ các regions này, sử dụng CNN cho mỗi region để tìm ra các specific features rồi sử dụng các features này để detect ra các objects.
       
       ![](https://images.viblo.asia/15f5514d-1cc1-4a57-9eaf-f280fb1dd7e7.png)
   * Fast RCN
       
       Fast R-CNN ngược lại, pass toàn bộ image vào mạng CNN thay vì pass từng extract region như R-CNN để sinh ra các [ROIs](https://www.oreilly.com/library/view/hands-on-convolutional-neural/9781789130331/60b5d52c-225e-46e7-b21a-df5f0c3c80ec.xhtml) (region of interest). Vì vậy thay vì dùng nhiều models thì nó chỉ cần 1 model duy nhất để extract ra các features từ các regions, phân loại chúng thành các class khác nhau, rồi trả về các bounding boxes tương ứng.
       
       ![](https://images.viblo.asia/2b921247-88de-450a-b923-dce5e68f4c14.png)
       
       Tất cả các bước trên đều được run đồng thời vì vậy nó nhanh hơn so với R-CNN, tuy nhiên vẫn là 1 trở ngại với 1 dataset lớn do nó vẫn sử dụng selective search để extract ra các regions.
   * Faster RCNN

        Faster R-CNN giải quyết được vấn đề của Fast R-CNN bằng cách thay thế `Selective Search` với [RPN](https://medium.com/@tanaykarmarkar/region-proposal-network-rpn-backbone-of-faster-r-cnn-4a744a38d7f9) (Region Proposal Network) 
        
        ![](https://images.viblo.asia/23f4c016-123c-4a43-8be5-c43dd559a93f.png)
        
        1. Đưa ảnh đầu vào qua mạng CNN để extract ra các features map
        2. Apply RPN lên các feature maps để thu được các object proposals
        3. Sử dụng ROI pooling lên all các proposals
        4. Pass các proposals này qua fully connected layer để phân loại và dự đoán bounding box cho các objects
   
### II. Implement
    
   **1. Dataset**
        
   Chúng ta sẽ làm việc trên một healcare dataset có tên là BCCD, mục tiêu ở đây là phát hiện ra những vấn đề bất thường ở trên mạch máu người nhằm phục vụ cho các nghiệp vụ chuẩn đoán trong ý tế. Miêu tả một chút về dataset thì dataset này chứa các ảnh tế báo máu được chụp từ kính hiển vi, nhiệm vụ của chúng ta là phải phát hiện ra tất cả các tế bào `Hồng cầu (RBCs)`, `Bạch cầu (WBCs)`  và `Tiểu cầu (Platelets)` trong mỗi ảnh.
   
   Ví dụ: 
   
   ![](https://images.viblo.asia/939880d7-1eaf-4c95-85d1-1051c431c119.png)
   
*Mọi người có thể download dataset này tại [đây](https://github.com/Shenggan/BCCD_Dataset)*

  **2. Librabies and frameworks required**
  
   Dưới đây là danh sách các libraries và frameworks cần cài đặt:
   
   ```
    pandas
    matplotlib
    tensorflow - 1.8.0
    keras – 2.2.0
    numpy
    opencv-python
    sklearn
    h5py
   ```
   
   **3. Data Exploration**
   
   Hãy xem qua bức ảnh dưới đây để hiểu sơ qua về dataset ta đang có:
       
   ![](https://images.viblo.asia/936e8887-4347-4f27-8f5b-84be2838edbd.png)
   
   Có thể thấy ta đang có 6 columns ở đây, trong đó vai trò của mỗi column như sau:
   
*    filename: chứa tên của ảnh
*    cell_type: 1 trong 3 loại RBC, WBC, Platetet 
*    xmin: toạ độ x bottom left của ảnh
*    ymin: toạ độ y bottom left của ảnh
*    xmax: toạ độ x top right của ảnh
*    ymax: toạ độ y top right của ảnh

  Load thử 1 ảnh lên xem thử:

![](https://images.viblo.asia/4ff338ac-4188-475a-8254-a17ff9948134.png)

  **4. Implementing Faster RCNN**
  
  Để mô phỏng thuật toán Faster RCNN, chúng ta sẽ làm theo các bước được mô tả trong respo [này](https://github.com/kbardool/keras-frcnn) .
  
  Với bộ dataset BCCD phía trên, chúng ta cần chuẩn bị data cho việc training. Convert chúng sang 1 file CSV:
  
  ```python
  %pylab inline

import os, sys, random
import xml.etree.ElementTree as ET
from glob import glob
import pandas as pd
from shutil import copyfile

annotations = glob('BCCD_Dataset-master/BCCD/Annotations/*.xml')

df = []
cnt = 0

for file in annotations:
    prev_filename = file.split('/')[-1].split('.')[0] + '.jpg'
    filename = str(cnt) + '.jpg'
    row = []
    parsedXML = ET.parse(file)

    for node in parsedXML.getroot().iter('object'):
        blood_cells = node.find('name').text
        xmin = int(node.find('bndbox/xmin').text)
        xmax = int(node.find('bndbox/xmax').text)
        ymin = int(node.find('bndbox/ymin').text)
        ymax = int(node.find('bndbox/ymax').text)

    row = [prev_filename, blood_cells, xmin, xmax, ymin, ymax]
    df.append(row)
    cnt += 1

data = pd.DataFrame(df, columns=['filename', 'cell_type', 'xmin', 'xmax', 'ymin', 'ymax'])

data[['filename', 'cell_type', 'xmin', 'xmax', 'ymin', 'ymax']].to_csv('blood_cell_detection.csv', index=False)
  ```
  
  Convert lại 1 lần nữa cho chuẩn với format input đầu vào:
  
  ```python
  import pandas as pd
import matplotlib.pyplot as plt
%matplotlib inline
from matplotlib import patches

train = pd.read_csv('blood_cell_detection.csv')
train.head()

data = pd.DataFrame()
data['format'] = train['filename']

for i in range(data.shape[0]):
    data['format'][i] = 'train_images/' + data['format'][i]

for i in range(data.shape[0]):
    data['format'][i] = data['format'][i] + ',' + str(train['xmin'][i]) + ',' + str(train['ymin'][i]) + ',' + str(train['xmax'][i]) + ',' + str(train['ymax'][i]) + ',' + train['cell_type'][i]

data.to_csv('annotate.txt', header=None, index=None, sep=' ')
  ```
  
  Ta cần 1 file config cho quá trình training mode và make predictions. Các bạn có thể down nó tại [đây](https://drive.google.com/open?id=1o2hLMwxj3K88DwcuVY8ZvaOXAv0t08-R)
  
  Tiếp theo chạy lệnh sau để train_model:
  
  ```python
  python train_frcnn.py -o simple -p annotate.txt
  ```
  
  Quá trình train model sẽ take khá nhiều time vì vậy các bạn có thể change lại number epochs (suggest là around 500) hoặc sử dụng lại file weights đã được train ở [đây](https://drive.google.com/file/d/1OmCKlUEYmTjg_jaaN-IQm81eHROU-Gyl/view?usp=sharing)
  
  Sau quá trình training thì bây giờ là lúc make predictions cho tập test, để lưu các images sau khi predict, các bạn vào file `test_frcnn.py` sau đó
  
   1. Bỏ comment: `cv2.imwrite(‘./results_imgs/{}.png’.format(idx),img)`
   2. và comment 2 lệnh cuối này:

   ```python
    # cv2.imshow(‘img’, img)
    # cv2.waitKey(0)
   ```
   
   Sau đó chạy lệnh sau để make predictions:
  
  ```python
  python test_frcnn.py -p test_images
  ```
  
  Dưới đây là 1 vài kết quả mà mình thu được:
  
  ![](https://images.viblo.asia/d1c2b0ba-2225-42e8-af65-32b1bb9289fd.png)
  
  ![](https://images.viblo.asia/4ac4750f-9441-4204-8c41-5b3fd1b82953.png)
  
  ![](https://images.viblo.asia/f4ce1053-89ef-4554-808e-9cff097915e1.png)
  
### III. Summary

   Trên đây là những gì mình muốn giới thiệu về Faster-RCNN, có khá nhiều bài so sánh giữa R-CNN, Fast R-CNN khá chi tiết trên mạng, các bạn có thể tìm hiểu thêm nha. Cảm ơn mọi người đã đọc bài.

### IV. References

https://papers.nips.cc/paper/5638-faster-r-cnn-towards-real-time-object-detection-with-region-proposal-networks.pdf

https://github.com/ShaoqingRen/faster_rcnn

https://towardsdatascience.com/r-cnn-fast-r-cnn-faster-r-cnn-yolo-object-detection-algorithms-36d53571365e

https://www.analyticsvidhya.com/blog/2018/11/implementation-faster-r-cnn-python-object-detection/

https://www.analyticsvidhya.com/blog/2018/10/a-step-by-step-introduction-to-the-basic-object-detection-algorithms-part-1/