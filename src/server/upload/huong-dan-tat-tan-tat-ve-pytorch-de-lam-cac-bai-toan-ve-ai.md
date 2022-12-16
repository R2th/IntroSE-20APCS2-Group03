# Giới thiệu về pytorch
Pytorch là framework được phát triển bởi Facebook. Đây là một ông lớn về công nghệ đầu tư rất nhiều nguồn lực cho việc phát triển Trí tuệ nhân tạo. Pytorch được phát triển với giấy phép mã nguồn mở do đó nó tạo được cho mình một cộng đồng rất lớn.Một cộng đồng lớn đồng nghĩa với nhiều tài nguyên để học và các vấn đề của bạn có thể đã có ai đó giải quyết và chia sẻ với cộng đồng. Pytorch cùng với Tensorflow và Keras là một trong những framework phổ biến được sử dụng trong các bài toán về Deep Learning hiện nay. Đặc biệt, trong các lĩnh vực nghiên cứu, hầu như các tác giả đều sử dụng pytorch để triển khai bài toán của mình. Pytorch cho thấy lợi thế của nó trong lĩnh vực nghiên cứu bởi việc rất dễ dàng để bạn debug và visuallize, ngoài ra nó theo cơ chế Dynamic Graphs cho phép giảm thời gian huấn luyện mô hình.
# Tensor trong pytorch
Tensor cũng giống như Numpy array nhưng được chuyển sang tensor để sử dụng tính toán trên GPU. Các phép toán, biến đổi và các hoạt động cơ bản của Numpy đều có thể thực hiện được trên Tensor. Sau đây, mình sẽ đưa ra một số cú pháp cơ bản trên Tensor để các bạn nắm được những
## Create Tensor
Có rất nhiều cách tạo một Tensor , bao gồm việc chuyển đổi từ List, Numpy  sang Tensor. Dưới đây mình sẽ giới thiệu một số cú pháp cơ bản hay được sử dụng để tạo một Tensor, để biết thêm nhiều hơn các bạn vào docs của pytorch để biết thêm [tại đây](https://pytorch.org/docs/stable/tensors.html).
```python
#Tạo một Tensor từ list cho trước sử dụng torch.Tensor
t = torch.Tensor([[1,2,3],[3,4,5]])

#Tạo một Tensor với kích thước (2, 3) cho trước và có giá trị ngẫu nhiên tuân theo phân phối chuẩn với trung vị bằng 0 và phương sai bằng 1
t = torch.randn(2, 3)

# Tạo một Tensor với kích thước (2, 3) cho trước và tất cả phần tử có giá trị đều bằng 1
t = torch.ones(2, 3)

# Tạo một Tensor với kích thước (2, 3) cho trước và tất cả phần tử có giá trị đều bằng 0
t = torch.zeros(2, 3)

#Tạo một tensor có kích thước (2,3) với giá trị nằm trong khoảng từ 0->10
t = torch.randint(low = 0,high = 10,size = (2,3))

#Sử dụng torch.from_numpy để chuyển đổi từ Numpy array sang Tensor
a = np.array([[1,2,3],[3,4,5]])
t = torch.from_numpy(a)
# Sử dụng .numpy() để chuyển đổi từ Tensor sang Numpy array
t = t.numpy()
```
## Tensor operations
Có rất nhiều phương thức bạn có thể sử dụng trong Tensor. Để biết thêm chi tiết, các bạn vào link [say đây](https://pytorch.org/docs/stable/torch.html?highlight=mm#math-operations). Sau đây mình sẽ đưa ra một số phương thức cơ bản mà mình hay sử dụng :
```python
A = torch.randn(2,4)
W = torch.randn(4,3)
#Nhân 2 ma trận sử dụng .mm
t = A.mm(W)
print(t)
#Ma trận chuyển vị
t = t.t()
print(t.shape)
#Bình phương mỗi giá trị trong Tensor
t = t**2
print(t)
#Trả về  size của Tensor
t_size = t.size()
print(t_size)
#Duỗi Tensor có kích thước (a,b) thành (1,a*b)
t = t.flatten()
print(t)

#Thêm 1 chiều với dim bằng 0 cho Tensor
t = t.unsqueeze(0)
print(t.shape)
#Giảm 1 chiều với dim bằng 0 cho Tensor
t = t.squeeze(0)
print(t.shape)
#hàm transpose có tác dụng đổi chiều dữ liệu ví dụ dữ liệu đang có shape=(224,224,3), sau khi thực hiện câu lệnh dưới sẽ thành (3,224,224)
t = t.transpose(2,0,1)
#hàm view có tác dụng giảm chiều dữ liệu ví dụ dữ liệu đang có shape = (3,224,224), sau khi thực hiện câu lệnh dưới sẽ thành (3,224*224)
t = t.view(t.size(0),-1)
```
**Lưu ý:** Variables trong PyTorch là gì? Trong các phiên bản trước của Pytorch, Tensor và Variables đã từng khác nhau và cung cấp chức năng khác nhau, nhưng bây giờ API Variables không được dùng nữa và tất cả các phương thức cho Variables đều hoạt động với Tensors. Vì vậy, nếu bạn không biết về chúng, cũng không sao vì chúng không cần thiết.

# Tạo một model bằng pytorch
Đây là phần thú vị nhất của khi bạn sử dụng pytorch để tạo ra một mô hình. Chúng ta có thể tạo một mô hình là một lớp bằng cách kế thừa **nn.Module**, điều này cho phép bạn tạo một mô hình học sâu dưới dạng một lớp. Lớp này có 2 hàm bắt buộc phải có đó là **__init__** và **forward**:
*  **__init__** Là một hàm khởi tạo nhận vào các biến,tham số giúp bạn có thể khởi tạo các biến, hàm của đối tượng được khởi tạo. Vì **Class** này kế thừa **nn.Module** nên khi khởi tạo một đối tượng mới của Class thì phải khởi tạo lớp kế thừa nên trong hàm **__init__** luôn phải có `super().__init__()` .Ngoài ra hàm khởi tạo này chúng ta có thể khởi tạo các layer custom sử dụng trong mô hình, tạo backbone bằng cách load mô hình pretrained, khởi tạo và thực thi một số hàm khác.
*  **forward** Là hàm nhận vào là dữ liệu input ban đầu. Dữ liệu sẽ đi lần lượt qua từng layer của model và trả về output của model.
Dưới đây mình sẽ triển khai code một mô hình đơn giản:
```python
class MySimpleModel(nn.Module):
    def __init__(self):
        super().__init__()
        #Định nghĩa các layer
        self.lin1 = nn.Linear(256, 128)
        self.lin2 = nn.Linear(128, 10)
    def forward(self, x):
        # Kết nối các layer lại với nhau 
        x = self.lin1(x)
        x = self.lin2(x)
        return x
```
Trên đây là một model đơn giản với 2 lớp Fully Connected với đầu vào là một tensor có độ dài là 256 và đầu ra có độ dài là 10.Nhưng điều đáng nói ở đây là với mô hình chuyển tiếp này sẽ giúp chúng ta có thể dễ dàng thiết kế mô hình tính toán theo từng layer, cho thấy khả năng customize mô hình trong Pytorch là rất thuận tiện cho việc nghiên cứu và thiết kế mô hình trong việc Research. Sau đầy mình sẽ đưa ra một ví dụ cho thấy việc customize model trong Pytorch là rất dễ dàng:
```python
class MySkipCModel(nn.Module):
    def __init__(self):
        super().__init__()
        # Định nghĩa các layers
        self.layer1 = nn.Linear(256, 128)
        self.layer2 = nn.Linear(128, 256)
        self.layer3 = nn.Linear(128, 10)
        
    def forward(self, x):
        #Kết nối các layer lại với nhau
        x_out1 = self.layer1(x)
        x_out2 = x + self.layer2(x_out1)
        x_out2 = self.layer1(x_out2)
        x = self.layer3(x_out2)
        return x
```
Mô hình trên được gọi là mô hình Skip Connection được sử dụng trong các mô hình hiện đại hiện nay. Mô hình này giúp cho việc tính toán trở nên nhanh hơn... Qua ví dụ trên ta có thể thấy được để định nghĩa một mô hình trong Pytorch thật dễ dàng đúng không nào :)))))))))
Sau đây, mình sẽ code mẫu một model classification đơn giản sử dụng phương pháp transfer learning của mô hình Resnet50 :
```python
import torch.nn as nn
import torchvision.models as models
class MyModel(nn.Module):
  def __init__(self,num_cls):
    super().__init__()
    self.num_cls = num_cls
    backbone = models.resnet50(pretrained=True)
    self.model_backbone = nn.Sequential(*list(backbone.children())[:-1])
    self.clf = nn.Sequential(
            nn.Linear(2048,512),
            nn.ReLU(),
            nn.BatchNorm1d(512),
            nn.Dropout(0.5),
            nn.Linear(512,self.num_cls)
        )
  def forward(self,input):
    output = self.model_backbone(input)
    output = output.view(output.size(0),-1 )
    output = self.clf(output)
    return output
```
Cú pháp `nn.Sequential(*list(backbone.children())[:-1])` cho phép bạn custom model backbone, cắt bỏ các layer không cần dùng đến. Ngoài mô hình Resnet ra bạn có thể sử dụng các mô hình trích xuất thôn tin khác trong thư viện của Pytorch như : VGG, Inception, Googlenet, Mobilenet,... Các bạn tìm hiểu thêm[ tại đây](https://pytorch.org/docs/stable/torchvision/models.html).
À mình bonus thêm một mô hình customize object detection sử dụng FasterRCNN, tất nhiên là Pytorch đã có thư viện cho chúng ta sử dụng nên sẽ rất ngắn gọn và dễ hiểu:
Đầu tiên bạn sử dụng thư viện torchvision.models để import FasterRCNN:
```python
# load a model; pre-trained on COCO
model = torchvision.models.detection.fasterrcnn_resnet50_fpn(pretrained=True)
```
Sau đó tùy theo bài toán của bạn để định nghĩa số lớp đầu ra của mô hình, vì COCO có 80 lớp sẽ không phù hợp nếu bài toán của bạn có mục tiêu khác , sau đây mình sẽ ví dụ có 2 lớp:
```python
num_classes = 2  # 1 class (wheat) + background

# get number of input features for the classifier
in_features = model.roi_heads.box_predictor.cls_score.in_features

# replace the pre-trained head with a new one
model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)
```

Xong, bây giờ bạn có thể sử dụng model này cho bài toán object detection. Ngoài ra còn có thư viện Detecto trong Pytorch rất hay bạn đọc có thể tìm hiểu thêm tại repo gốc của tác giả [tại đây](https://github.com/alankbi/detecto) và Detectron2 cho các bài toán về Object Detection và Segmentation, mình đã có bài viết về Detectron2, bạn đọc có thể xem thêm [tại đây](https://viblo.asia/p/face-detection-on-custom-dataset-using-detectron2-in-google-colab-Az45bDrzZxY) nhé (May quá cuối cùng cũng dẫn dắt được để quảng cáo bài viết này của mình, hehehe).

Nhưng một lần nữa, Pytorch sẽ không được sử dụng rộng rãi nếu nó không cung cấp nhiều lớp sẵn sàng tạo sẵn được sử dụng rất thường xuyên trong nhiều loại kiến ​​trúc Mạng thần kinh
Tiếp theo mình sẽ giới thiệu một số layer và activation có trong Pytorch. Một phần quan trọng để giúp Pytorch được sử dụng rộng rãi nếu không cung cấp nhiều layers có sẵn được sử dụng thường xuyên. Một số layers như : `nn.Linear, nn.Conv2d, nn.MaxPool2d, nn.ReLU, nn.BatchNorm2d, nn.Dropout, nn.Embedding, nn.GRU/nn.LSTM, nn.Softmax, nn.LogSoftmax, nn.MultiheadAttention, nn.TransformerEncoder, nn.TransformerDecoder`

Mình sẽ ví dụ cách sử dụng của layer Conv2D nhé, các layers khác bạn đọc vào docs của Pytorch tìm hiểu [tại đây](https://pytorch.org/docs/stable/nn.html) nhé. 

```python
torch.nn.Conv2d(in_channels: int, out_channels: int, kernel_size: Union[T, Tuple[T, T]], stride: Union[T, Tuple[T, T]] = 1, padding: Union[T, Tuple[T, T]] = 0, dilation: Union[T, Tuple[T, T]] = 1, groups: int = 1, bias: bool = True, padding_mode: str = 'zeros')
```
Mình sẽ code một layer đơn giản và giải thích cho các bạn luôn :
```python
import torch.nn as nn
import torch
#Tạo một lớp Conv2d với đầu vào channals là 3, đầu ra là 256, với kernel có kích thước (3,3) và stride = 2
layers =  nn.Conv2d(3,256,(3,3),2)
#Mình sẽ tạo ngẫu nhiên một Tensor có chiều (3,256,256) để xem nó thay đổi như thế nào sau khi đi qua lớp Conv2d, kết quả sẽ được một Tensor có chiều (256,127,127)
print(layers(torch.randn(1,3,256,256)).shape)
```
Rất dễ dàng phải không nào, các bạn có thể thử với các layer khác như LSTM,GRU hay Transformer.
# Tạo dataset theo batch size trong pytorch
## Dataset

Sau khi tạo được mô hình thì bước tiếp theo để có thể huấn luyện mô hình đó là cách tạo dữ liệu chia thành tập train, val, test và cho qua mô hình theo từng batch size.
Trước khi đến với việc custom môt Dataset thì mình sẽ giới thiệu trước một thư viện hỗ trợ việc tạo Dataset này nhưng dữ liệu của bạn đã được chia ra tập train,val,test theo format sau:
```
Data
    Train
         Image_train1
         Image_train2
         ...
         Image_train1000
     Val
         Image_val1
         ...
     Test
         Image_test1
         ...
```
Chúng ta có thể sử dụng thư viện `torchvision.datasets.ImageFolder` để tạo dataset:
```python
from torchvision import transforms
from torchvision.datasets import ImageFolder
traindir = "data/train/"
t = transforms.Compose([
        transforms.Resize(size=256),
    transforms.CenterCrop(size=224),
        transforms.ToTensor()])
train_dataset = ImageFolder(root=traindir,transform=t)
print("Num Images in Dataset:", len(train_dataset))
print("Example Image and Label:", train_dataset[2])
```
Kết quả như sau:

![](https://images.viblo.asia/3cf5644e-b7c5-4fe9-a554-509d40706664.png)

Vì trong thực tế sẽ không có data để theo format như thế cho bạn nên việc hiểu và biết customize dataset là rất quan trọng và nó được sử dụng rất phổ biến:
Chúng ta sẽ tạo Dataset thành 1 lớp giống như model trên kia. Lớp này kế thừa `torch.utils.data.Dataset` và cũng có 3 lớp bắt buộc có đó là :
*  **__init__** : Là hàm khởi tạo, nhận vào các tham số và khởi tạo các tham số tương ứng
*  **__len__** : Hàm trả về độ dài của dữ liệu
*  **__getitem__**: nhận vào là index, chỉ số này nằm trong độ dài của dữ liệu. Hàm này mục tiêu để đọc dữ liệu, xử lí dữ liệu, nhãn và trả về dữ liệu chuẩn để đưa vào model. Các phương pháp Augmentation được thực hiện tại đây luôn.
Dưới đây là code mẫu của mình trong một bài toán classification. Tùy vào từng format dữ liệu để bạn tạo được data truyền vào là gì, trong ví dụ dưới đây mình đã tiền xử lí và lấy được data dưới dạng dict mà mỗi example là một cặp link ảnh và nhãn của ảnh đấy. Augmentation ảnh có thể sử dụng thư viện `torchvision.transforms`, bạn đọc xem thêm các hàm khác[ tại đây](https://pytorch.org/docs/stable/torchvision/transforms.html) nhưng nó nhận dữ liệu vào dưới dạng Image nên nếu bạn đọc dữ liệu vào bằng Numpydarray thì bạn có thể sử dụng thư viện  **albumentations** như mình code mẫu ở dưới [tại đây](https://albumentations.readthedocs.io/en/latest/).

```python
class myDataset(Dataset):
    def __init__(self,data_dict,trans = None):
        super().__init__()
        self.data_dict = data_dict
        self.trans = trans

    def __len__(self):
        return len(self.data_dict)

    def __getitem__(self,idx):
        image_path = self.data_dict[idx]['data_link']
        label= self.data_dict[idx]['label']
        try:
            image = cv2.imread(image_path)
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        except Exception as e:
            print(e)
        if self.trans:
            transformed = self.trans(image=image)
            image = transformed["image"]
        return image.float(), label
```
## Dataloader
Vậy là xong việc tạo đối tượng Dataset, nhưng Class này chỉ generate ra từng example và để dữ liệu tạo thành batch thì ta phải sử dụng hàm `torch.utils.data.Dataloader` của Pytorch 

```python
torch.utils.data.DataLoader(dataset, batch_size=1, shuffle=False, sampler=None, batch_sampler=None, num_workers=0, collate_fn=None, pin_memory=False, drop_last=False, timeout=0, worker_init_fn=None, multiprocessing_context=None, generator=None)
```
Mình sẽ giải thích một số tham số thường dùng :
* **dataset** :nhận vào class Dataset đã khởi tạo ở trên.
* **batch_size**: thể hiện bạn muốn dữ liệu cua bạn được generate theo batch bao nhiêu.
* **num_workers**: khi bạn muốn chạy nhiều tiến trình cùng một lúc tùy vào phần cứng của bạn.
* **collate_fn**:  Hàm này để định nghĩa cách sắp xếp và kết nối dữ liệu và nhãn tương ứng theo từng lô dữ liệu.

Dưới đây, mình sẽ code mẫu sử dụng Dataloader ở ví dụ sau:
```
trans = A.Compose([
            A.RandomCrop(width=256, height=256),
            A.HorizontalFlip(p=0.5),
            A.RandomBrightnessContrast(p=0.2),
            ToTensorV2(),
        ])
train_dataset = myDataset(data_dict=data_dict,trans=trans)
train_dataloader = DataLoader(train_dataset,batch_size = 64, shuffle=True, num_workers=10)
```
Để kiểm tra dữ liệu đã được gen đúng hay chưa, bạn thực hiện câu lệnh sau để kiểm tra:
```
x_batch,y_batch = next(iter(train_dataloader))
print(x_batch.shape)
```

Hàm **next(iter(train_dataloader))** sẽ trả về dữ liệu theo từng batch_size

# Cách huấn luyện mô hình
Sau khi đã tạo được model và dữ liệu thì bước tiếp theo là làm sao để có thể chạy nó và cho nó hoạt động, ở phần này mình sẽ code mẫu và giải thích từng bước sẽ làm các bạn dễ hiểu hơn : 

```python
num_epochs = 10
for epoch in range(num_epochs):
    #Thiết lập trạng thái huấn luyện cho mô hình
    model.train()
    for x_batch,y_batch in train_dataloader:
        #xóa gradients
        optimizer.zero_grad()
        # Cho dữ liệu qua model và trả về output cần tìm
        pred = model(x_batch)
        # Tính toán giá trị lỗi và backpropagation 
        loss = loss_criterion(pred, y_batch)
        loss.backward()
        # Cập nhật trọng số 
        optimizer.step()
    #Thiết lập trạng thái đánh giá cho mô hình, ở bước này thì mô hình không backward và cập nhật trọng số
    model.eval()
    for x_batch,y_batch in valid_dataloader:
        pred = model(x_batch)
        val_loss = loss_criterion(pred, y_batch)
```

Ở code trên, mô hình chạy 5 epochs và ở mỗi epoch:
1. Sử dụng **model.train()** để thiết lập trạng thái huấn luyện cho mô hình
2. Sử dụng vòng for để lấy từng cặp dữ liệu theo từng batch size
3. Ở mỗi vòng lặp, chúng ta forward dữ liệu bằng cách sủ dụng **model(x_batch)**, trả về output tương ứng.
4. Thực hiện tính toán hàm mất mát đã được định nghĩa trước đó, về hàm loss thì mình sẽ nói ở phần dưới đây, thực hiện bằng cách truyền vào hàm đó hàm mục tiêu và hàm dự đoán, hàm này trả về giá trị mất mát và mình cần tối ưu nó về nhỏ nhất có thể.
5. Thực hiện Back-propagation bằng cách sử dụng **loss.backward()**. 
6. Cập nhật trọng số bằng cách sử dụng **optimizer.step()**
Sau khi chạy xong vòng lặp dữ liệu huấn luyện thì sẽ đến với việc đánh giá mô hình bằng cách sử dụng dữ liệu val:
1. Trước tiên thực hiện **model.eval()** để chuyển trạng thái mô hình sang đánh giá
2. chạy vòng lặp dữ liệu đánh giá
3. Ở mỗi vòng lặp ta chỉ forward dữ liệu qua model và tính giá trị loss tại mỗi vòng lặp.

# Các hàm loss và custom hàm loss trong pytorch
Pytorch hỗ trợ rất nhiều các hàm loss như các bài toán hồi quy, phân loại,... Một số hàm loss phổ biến như là **nn.MSE(),nn.CrossEntropyLoss(), nn.KLDivLoss(), nn.BCELoss, nn.NLLLoss()**. Bạn đọc tìm hiểu thêm các hàm loss [tại đây](https://pytorch.org/docs/stable/nn.html).
Ngoài các hàm phổ biến ra thì còn một số hàm loss khác chưa được pytorch hỗ trợ nhưng việc triển khai nó là rất dễ dàng, bạn chỉ việc tạo một hàm nhận đầu vào là giá trị mục tiêu và giá trị dữ đoán do mô hình đưa ra và trả về giá trị lỗi là xong. Sau đây, mình sẽ ví dụ code hàm loss **dice_loss** được sử dụng nhiều trong bài toán **segmentation** để giải quyết việc imballanced data :

```python
def dice_loss(pred, target, smooth = 1.):
    pred = pred.contiguous()
    target = target.contiguous()    

    intersection = (pred * target).sum()
    
    loss = (1 - ((2. * intersection + smooth) / (pred.sum() + target.sum() + smooth)))
    
    return loss.mean()
```
Ngoài ra còn có thể kết hợp các hàm loss lại với nhau như sau:
```python
def calc_loss(pred, target, metrics, bce_weight=0.5):

    bce = F.binary_cross_entropy( pred, target)
         
    dice = dice_loss(pred, target)
    
    loss = bce * bce_weight + dice * (1 - bce_weight)
    
    metrics['bce'] += bce.data.cpu().numpy() * target.size(0)
    metrics['dice'] += dice.data.cpu().numpy() * target.size(0)
    metrics['loss'] += loss.data.cpu().numpy() * target.size(0)
    
    return loss

```

# Các hàm tối ưu trong pytorch
Tương tự như các hàm loss, Pytorch cũng hỗ trợ rất nhiều các hàm tối ưu để bạn sử dụng như là **torch.optim.Adadelta , torch.optim.Adagrad , torch.optim.RMSprop** và hàm loss hay sử dụng đó là  **torch.optim.Adam.**. Bạn đọc tìm hiểu và sử dụng thêm các hàm loss khác [tại đây](https://pytorch.org/docs/stable/optim.html).
# Cách sử dụng GPU
Nếu bạn có gpu hãy sử dụng cú pháp sau để giúp việc huấn luyện trở nên nhanh chóng hơn :
```python
model.cuda()
x_batch.cuda()
y_batch.cuda()
```
# Kết luận
Trên đây, mình đã hướng dẫn một số cú pháp và các hàm cơ bản trong pytorch, cùng với đó là hướng dẫn cho bạn cách tạo một model, data và cách huấn luyện nó ra sao. Cùng với đó là giới thiệu tới các bạn rất nhiều thư viện đã được Pytorch hỗ trợ. Qua bài viết này hy vọng sẽ giúp ích cho các bạn trong con đường research và muốn sử dụng pytorch trong quá trình xây dựng mô hình. Ngoài ra để tìm hiểu thêm thì tác giả Văn Toàn Phạm cũng đã có 3 bài viết rất hữu ích về lý thuyết và ứng dụng của Pytorch, bạn đọc có thể tìm hiểu thêm [tại đây](https://viblo.asia/u/pham.van.toan). Tạm biệt và hẹn gặp lại, nếu thấy bài viết hay thì cho mình một upvote để mình có thêm động lực nhé (Camxamita) .