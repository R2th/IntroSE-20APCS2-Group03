Như đã [giới thiệu](https://viblo.asia/p/he-thong-phat-gao-nhan-dien-khuon-mat-aWj5372w56m), phần đầu tiên này mình xin nói về hệ thống AI cho hệ thống nhé.
Trong bài toán nhận diện khuôn mặt này, có vài yêu cầu như sau: 
- Vì lượng người ra vào nhiều nên không có thời gian để huấn luyện mô hình nhận diện khuôn mặt.
- Data mặt người đó thường chỉ có một hoặc vài ảnh là cùng. Nếu trong cùng một ngày thì chỉ có một, nếu không gặp phải mấy ông bà lầy lội ra xin nhiều lần :D.

Vì thế, bài toán này mình sẽ đưa ra hướng giải quyết là sử dụng mô hình object detection pretrain cho bài toán nhận diện khuôn mặt. Sau đó, ta sẽ trích xuất đặc trưng khuôn mặt người đó ra bằng một mạng tích chập pretrain nốt. Nói một cách dễ hiểu là con người ta sẽ chỉ nhìn mặt người đó, rồi tìm những đặc điểm như mũi cao, nốt ruồi đâu đó, ... để phân biệt nhưng chỉ khác là máy tính xử lý trên giá trị pixel ảnh. Sau đó ta sẽ sử dụng các cây tìm kiếm hoặc đồ thị tìm kiếm. Với mỗi người mới ta sẽ đưa vào đồ thị đặc trưng của người đó để tìm kiếm sau này.
# Phần giải thích AI
Ở đây, mình xin giải thích qua về một vài lý thuyết AI mà mình sử dụng. Nếu bạn chỉ quan tâm đến phần code xin hãy vào phần code ngay. Lưu ý, bỏ qua phần này không ảnh hưởng đến việc code.

Ở đây, mình sử dụng MTCNN. Mình biết là các bạn sẽ kiểu: Ewww *insert the meme here*.  Sao không xài FaceNet hay CenterNet-Resnet 50 gì đó cho xịn. Lí do là vì khi mình tra xem có cái thư viện nào pretrain để phát triển nhanh hệ thống thì repo MTCNN được viết bằng torch đập ngay vào mặt và tiện ở chỗ ngươi ta còn làm `pip install` cho nó rồi. CenterNet mà cho vào docker thì lằng nhằng, FaceNet thì lại dùng MXNet.<br />
Paper gốc: https://arxiv.org/pdf/1604.02878v1.pdf.

MTCNN bao gồm 3 mạng: 
* P-Net
* R-Net
* O-Net
<br>Đầu vào hình ảnh được resize thành nhiều kích thước tạo thành một Image Pyramid. Sau đó pyramid sẽ được đưa vào P-Net:
<p align="center">
<img src="https://miro.medium.com/max/1134/1*Ey4E1ZreYY8F_GiXLVCD_Q.png">
Kiến trúc PNet
 </p>
Có thể thấy ở đây, P-Net là một mạng dạng FCN - Fully convolutional network. Nhiệm vụ của nó là xác định các window ảnh  bao gồm mặt người nhưng lại lấy nhiều, nhanh và thiếu chính xác. Output đầu ra gồm có:

* Face classificationcó shape (1x1x2).
* BBox regressioncó shape (1x1x4).

Các mạng R-Net và O-Net có cấu trúc tương tự nhau chỉ khác nhau về độ sâu và đầu ra. Với đầu vào R-Net là các bounding box từ P-Net và đầu vào O-Net là các bounding box từ R-Net. Nhiệm vụ của chúng là lọc ra các bounding boxes chính xác hơn nhờ vào việc tặn độ sâu của mô hình.
<p align="center">
<img src="https://miro.medium.com/max/1050/1*5KNvVDQHpsquv5yinnTDWw.png">
<br>Kiến trúc RNet<br><br>
 <img src="https://miro.medium.com/max/996/1*BT6XlTxVjqaNSj87iDFjcg.png"><br>
 <img src="https://miro.medium.com/max/992/1*eBiydaqk2HU36P0LcUbGzA.png"> 
<br>Kiến trúc ONet<br>
 </p>
 2 mạng trên có thêm lớp Fully connected. Vì thế mà đầu ra của chúng:
 
* Face classificationcó shape (2).
* BBox regressioncó shape (4).

# Phần thực hiện code
Bạn có thể tự git clone [repo](https://github.com/timesler/facenet-pytorch) này để sử dụng hoặc sử dụng pip. Nếu không có ý định chỉnh sửa behaviour của các lớp trong repo thì nên sử dụng pip cho tiện lợi khi config đường dẫn, ... 
Đầu tiên, tạo folder backend trong folder project. Và hãy tạo các file sau đây:

- `face_detector.py`
- `face_searcher.py`
## Phần trích xuất đặc trưng
Ta sẽ khởi tạo một class đảm nhiệm cho việc định vị khuôn mặt và trích xuất đặc trưng qua một mạng tích chập trong file `face_detector.py`

```
from facenet_pytorch import MTCNN, InceptionResnetV1
import torch
import PIL
from PIL import Image
import cv2
import numpy as np
import os
import sys
import time

class FaceDetector(object):
    def __init__(self, image_size=160, keep_all=False):
        """
            mtcnn: face detector
            extractor: face feature extractor
            Args:
                image_size: face image size
                keep_all: detect all faces or single face
        """
        self.keep_all = keep_all
        # self.device = torch.device(
        #     "cuda" if torch.cuda.is_available() else "cpu")
        self.device = 'cpu'
        print('Using ', self.device)
        t = time.time()
        self.mtcnn = MTCNN(
            image_size=image_size, min_face_size=20,
            thresholds=[0.6, 0.7, 0.7], factor=0.709, post_process=True,
            keep_all=False, device=self.device
        )
        self.extractor = InceptionResnetV1(
            pretrained='vggface2').eval().to(self.device)
        print('Fininsh load model in {} sec'.format(time.time()-t))
```
Giải thích về một vài param:
- MTCNN:
    - image_size: kích thức ảnh mặt crop
    - min_face_size: kích thước mặt nhỏ nhất trên nahr gốc để tìm kiếm
    - threshold: mức độ confidence để nhận mặt. Array ba giá trị cho ba mạng.
    - factor: đơn vị scale ảnh trên pyramid
- InceptionResnetV1:
    - pretrain: chọn mô hình pretrain để sử dụng
    - classify: nếu ta sử dụng True thì mạng sẽ đi qua cả lớp Logits và là bài toán phân loại. Ở đây ta sẽ set False để lấy đặc trưng ảnh.
  
 Giờ ta sẽ tiếp tục code nhận diện khuôn mặt:
  ```
def detect(self, image, save_path=None):
        # boxes, _ = self.mtcnn.detect(image)
        faces = self.mtcnn(image, save_path=save_path)
        return faces
```
Hàm trên trả về ảnh ở dạng torch tensor
```
def extract_feature(self, tensor):
        if not self.keep_all:
            tensor = tensor.unsqueeze(0)
        embeddings = self.extractor(tensor.to(self.device))
        embeddings = embeddings.detach().cpu().numpy()
        return embeddings if self.keep_all else np.squeeze(embeddings)
```
Hàm trên sẽ trả về vector đặc trưng có shape (512, ) trong bài toán của ta. Tiếp theo ta sẽ viết các hàm để lấy vector từ ảnh trực tiếp và từ một folder (trường hợp khởi động lợi server ta cần đưa hết các ảnh đã có lại vào hệ thống).
```
def extract_face(self, image, save_path=None):
    try:
        faces = self.detect(image, save_path)
        embeddings = self.extract_feature(faces)
        return embeddings
    except Exception as err:
        # TODO: Logging here
        print(err)
        return None

def extract_face_from_folder(self, folder, save_prefix=None):
    # Use for single face per image. Modify save_path for multi face
    if not self.keep_all:
        all_embeddings = []
        for image_name in sorted(os.listdir(folder)):
            image_path = os.path.join(folder, image_name)
            print(image_path)
            image = pil_loader(image_path)
            save_path = os.path.join(
                save_prefix, image_name) if save_prefix is not None else None

            all_embeddings.append(self.extract_face(image, save_path))
        return np.array(all_embeddings)
```
## Phần đưa vào đồ thị tìm kiếm
Phần này mình sử dụng Hnswlib vì 2 lí do sau đây:
- Thư viện trên cho phép add thêm các giá trị mới sau khi xây dựng đồ thị. Các thư viện như Annoy không cho phép làm như vậy.
- Theo benchmark, Hnswlib tốt hơn nhiều thư viện khác ở cả tốc độ lẫn độ chính xác Recall
![benchmark](https://camo.githubusercontent.com/027adff014f63209dba16e348304d523fb33812e/68747470733a2f2f7261772e6769746875622e636f6d2f6572696b6265726e2f616e6e2d62656e63686d61726b732f6d61737465722f726573756c74732f676c6f76652d3130302d616e67756c61722e706e67) 

Ta sẽ viết một class phụ trách việc tìm kiếm trong  `face_searcher.py`:
```
class FaceSearcher(object):
    def __init__(self, dim=512, space='l2', threshold=0.5):
        """
            Args:
                dim: face embedding feature length
                space: distance algorithm (L2, Inner product, cosine)
                threshold: similarity threshold
        """
        self.p = hnswlib.Index(space=space, dim=dim)
        self.p.init_index(max_elements=1000, ef_construction=200, M=48)
        self.p.set_ef(20)
        self.k = 1
        self.threshold = threshold

    def add_faces(self, data, index):
        try:
            if index.shape[0] != data.shape[0]:
                # TODO: Logging here
                print('Try to assign index with length {} to data with length {}'.format(
                    index.shape[0], data.shape[0]))
            else:
                self.p.add_items(data, index)
        except Exception as err:
            # TODO: Logging here
            print(err)

    def query_faces(self, data):
        try:
            index, distance = self.p.knn_query(data, k=self.k)
            # Filter result
            index = np.squeeze(index)
            distance = np.squeeze(distance)
            print('Index: ', index, '\nDistance: ', distance)
            return index if distance < self.threshold else None
        except Exception as err:
            # TODO: Logging here
            print(err)
            return None
```
Các tham số của hnswlib.Index bao gồm:

- space: cách thức tính khoảng cách: Squared L2, Inner product, Inner product
- dim: độ dài vector truyền vào, ở đây là 512

Cách tham số như ef, M, ... hãy xem ở [đây](https://github.com/nmslib/hnswlib/blob/master/ALGO_PARAMS.md)

Ở phần tiếp theo, chúng ta sẽ xây dựng hệ thống server với flask.