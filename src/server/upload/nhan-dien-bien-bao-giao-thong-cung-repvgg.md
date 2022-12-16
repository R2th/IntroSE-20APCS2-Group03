## I. Giới thiệu
Bài toán nhận diện biển báo giao thông có lẽ đã vô cùng quen thuộc với mọi người rồi. Và mục đích chủ yếu bài viết hôm nay của mình cũng không phải để giải quyết bài toán này mà thông qua bài viết này mình sẽ giải thích chi tiết các mô đun trong mô hìnhcó phần code ví dụ. Mình hy vọng các bạn qua đây có thể hiểu rõ hơn về mô hình RepVGG cũng như sử dụng nó trong các bài toán thực tế. Nếu các bạn chưa nẵm rõ mô hình RepVGG, các bạn có thể đọc lại bài viết [RepVGG - Sự trở lại của một tượng đài](https://viblo.asia/p/repvgg-su-tro-lai-cua-mot-tuong-dai-GrLZDGenKk0) của mình để nắm chắc lý thuyết trước khi vào bài thực hành này nhé. :hugs:

## II. Mô hình RepVGG
![](https://images.viblo.asia/7bafb5c9-1a1c-447d-ace4-3be6c963e606.png)
Nói lại một chút về kiến trúc mô hình RepVGG mà mình sẽ sử dụng trong bài toán hôm nay:
- Kiến trúc được tách thành hai phần riêng biệt đơn nhánh khi inference và đa nhánh khi training.
- Mô hình gồm có 5 stages. Mỗi stage gồm 1 hoặc nhiều các block được gọi là RepVGG block. Tất cả các block đầu tiên mỗi stage đều có stride bằng 2, các block khác thì có stride bằng 1.
- Mô hình chỉ sử dụng convolution có kernel 3x3 và Relu (nhánh identity và 1x1 chỉ dùng khi training), loại bỏ hoàn toàn lớp pooling trong VGG.

Có một điều mà bạn đặc biệt cần phải lưu ý đó  là **kiến trúc của mô hình khi huấn luyện và inference là hoàn toàn khác nhau**. Do đó từ lúc huấn luyện chuyển sang bước inference, bạn cần làm một bước trung gian là chuyển toàn bộ weight của kiến trúc đa nhánh sang weight của kiến trúc đơn nhánh. Đây cũng là điểm khác biệt của mô hình RepVGG so với các mô hình khác.

Sau đây mình xin giải thích phần code một số mô đun quan trọng trong bài toán. **Các bạn có thể xem toàn bộ source code của mình tại github** [TrafficSignClassification](https://github.com/buiquangmanhhp1999/TrafficSignClassification).
### 1. Kiến trúc của RepVGG block
```python
class RepVGGBlock(nn.Module):
    def __init__(self, in_channels, out_channels, kernel_size,
                 stride=1, padding=0, dilation=1, groups=1, padding_mode='zeros', deploy=False, use_se=False):
        super(RepVGGBlock, self).__init__()
        self.deploy = deploy
        self.groups = groups
        self.in_channels = in_channels

        assert kernel_size == 3
        assert padding == 1

        padding_11 = padding - kernel_size // 2

        self.nonlinearity = nn.ReLU()

        if use_se:
            self.se = SEBlock(out_channels, internal_neurons=out_channels // 16)
        else:
            self.se = nn.Identity()

        if deploy:
            self.rbr_reparam = nn.Conv2d(in_channels=in_channels, out_channels=out_channels, kernel_size=kernel_size, stride=stride,
                                      padding=padding, dilation=dilation, groups=groups, bias=True, padding_mode=padding_mode)

        else:
            self.rbr_identity = nn.BatchNorm2d(num_features=in_channels) if out_channels == in_channels and stride == 1 else None
            self.rbr_dense = conv_bn(in_channels=in_channels, out_channels=out_channels, kernel_size=kernel_size, stride=stride, padding=padding, groups=groups)
            self.rbr_1x1 = conv_bn(in_channels=in_channels, out_channels=out_channels, kernel_size=1, stride=stride, padding=padding_11, groups=groups)
```
Đây là một mô đun quan trọng nhất trong mô hình. Bạn có thể nhìn rõ kiến trúc mô hình đơn nhánh khi infrence/triển khai và mô hình đa nhánh khi huấn luyện ở phần này. Cụ thể các bạn có thể thấy ở đây khi **deploy (inference)** thì mô hình chỉ sử dụng một lớp Conv2D, tuy nhiên khi **huấn luyện sẽ có ba nhánh** đó là : **rbr_identity, rbr_dense, rbr_1x1** tương ứng với nhánh identity (chỉ chứa hàm batch normaliztion), nhánh conv 3x3 (sau có lớp batch normalization)  và nhánh conv 1x1 (sau có lớp batch normalization).

### 2. Chuyển từ đa nhánh sang đơn nhánh
```python
def _fuse_bn_tensor(self, branch):
        if branch is None:
            return 0, 0

        if isinstance(branch, nn.Sequential):
            kernel = branch.conv.weight
            running_mean = branch.bn.running_mean
            running_var = branch.bn.running_var
            gamma = branch.bn.weight
            beta = branch.bn.bias
            eps = branch.bn.eps
        else:
            assert isinstance(branch, nn.BatchNorm2d)
            if not hasattr(self, 'id_tensor'):
                input_dim = self.in_channels // self.groups
                kernel_value = np.zeros((self.in_channels, input_dim, 3, 3), dtype=np.float32)
                for i in range(self.in_channels):
                    kernel_value[i, i % input_dim, 1, 1] = 1
                self.id_tensor = torch.from_numpy(kernel_value).to(branch.weight.device)
            kernel = self.id_tensor
            running_mean = branch.running_mean
            running_var = branch.running_var
            gamma = branch.weight
            beta = branch.bias
            eps = branch.eps
            
        std = (running_var + eps).sqrt()
        t = (gamma / std).reshape(-1, 1, 1, 1)
        return kernel * t, beta - running_mean * gamma / std
```
Mục đích của hàm này là **biểu diễn trọng số của hai phép convolution và batch normalization về một phép convolution tương ứng**  bằng cách lấy các tham số như mean, variance, gamma, epsilon của hàm batch normalization cùng với  trọng số của kernel, bias của phép convolution được dùng khi huấn luyện. Sau đó sử dụng công thức đặc biệt để chuyển đổi các tham số này. Công thức chuyển đổi trọng số này  mình đã đề cập trong phần **1.3 Kết hợp cả hai kiến trúc** trong bài viết [RepVGG - Sự trở lại của một tượng đài](https://viblo.asia/p/repvgg-su-tro-lai-cua-mot-tuong-dai-GrLZDGenKk0). Bạn nào quên thì ngó lại xem nhá. 

Do nhánh **identity** chỉ có lớp Batch Normalization không chứa lớp Convolution nên ta cần chia ra hai trường hợp (if/else) để xứ lý, tạo ra weight kernel giả để tính toán như các nhánh khác.

```python
def get_equivalent_kernel_bias(self):
    kernel3x3, bias3x3 = self._fuse_bn_tensor(self.rbr_dense)
    kernel1x1, bias1x1 = self._fuse_bn_tensor(self.rbr_1x1)
    kernelid, biasid = self._fuse_bn_tensor(self.rbr_identity)
    return kernel3x3 + self._pad_1x1_to_3x3_tensor(kernel1x1) + kernelid, bias3x3 + bias1x1 + biasid
  ```
  
  Cuối cùng, khi inference ta tính kernel và bias tương ứng  của phép convolution và batch normaliztion trên cả 3 nhánh rồi thêm padding vào nhánh kernel 1x1 để chúng có cùng kích thước với nhau rồi  cộng chúng vào với nhau  để tính ra kernel, bias của phép convoltuon cuối cùng được dùng khi huấn luyện. Giống như kiểu **Một cây làm chẳng nên non / Ba cây chụm lại lên hòn núi cao.**
  ```python
  def switch_to_deploy(self):
        if hasattr(self, 'rbr_reparam'):
            return
        kernel, bias = self.get_equivalent_kernel_bias()
        self.rbr_reparam = nn.Conv2d(in_channels=self.rbr_dense.conv.in_channels, out_channels=self.rbr_dense.conv.out_channels,
                                     kernel_size=self.rbr_dense.conv.kernel_size, stride=self.rbr_dense.conv.stride,
                                     padding=self.rbr_dense.conv.padding, dilation=self.rbr_dense.conv.dilation, groups=self.rbr_dense.conv.groups, bias=True)
        self.rbr_reparam.weight.data = kernel
        self.rbr_reparam.bias.data = bias
        for para in self.parameters():
            para.detach_()
        self.__delattr__('rbr_dense')
        self.__delattr__('rbr_1x1')
        if hasattr(self, 'rbr_identity'):
            self.__delattr__('rbr_identity')

```
Hàm **switch_to_deploy** này là một hàm tổng hợp của tất cả hai hàm bên trên từ việc tính toán weight mới cho kiến trúc đơn nhánh, gắn weight mới vào kernel, bias của Convolution 2D và xóa đi các nhánh 1x1 và nhánh identity. Nhờ vào hàm **switch_to_deploy**, chúng ta dễ dàng chuyển từ kiến trúc đa nhánh khi huấn luyện sang đơn nhánh khi inference. 

Có lẽ đây là những mô đun quan trọng nhất, ảnh hướng rất nhiều đến performance của mô hình. Hy vọng đến đây là các bạn đã nắm được kha khá kiến thức về mô hình RepVGG rồi. Còn bây giờ mình thử dùng RepVGG để giải quyết bài toán ban đầu của mình nhé. :smiley:

## II. Nhận diện biển báo giao thông.
Các bạn có thể xem tải toàn bộ mã nguồn tại github của mình ở repo [TrafficSignClassification](https://github.com/buiquangmanhhp1999/TrafficSignClassification). Mình sẽ thực hiện bài toán theo các bước sau đây:

1. **Chuẩn bị dataset**
2.  **Chuẩn bị huấn luyện**
3.  **Huấn luyện**
4.  **Convert từ đa nhánh về đơn nhán**
5. **Inference**

### 1. Chuẩn bị dataset
Đầu tiên các bạn download repo của mình về
```
git clone https://github.com/buiquangmanhhp1999/TrafficSignClassification.git
```
Giải nén file Data.zip sẽ có thư mục myData chứa các file ảnh chứa trong các folder class tương ứng và labels.csv chứa tên các lớp và id tương ứng.
```
unzip Data.zip
```
Nào mình cùng visualize để hình dung rõ hơn một tí nhé. Các bạn có thể xem trực tiếp tại notebook [visualize\_data.ipynb](https://github.com/buiquangmanhhp1999/TrafficSignClassification/blob/main/visualize_data.ipynb).
```python
import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns

lab = pd.read_csv('./Data/labels.csv')
d = dict()
class_labels = dict()
print('Label map: ')
print('-----------------------------------------')
for dirs in os.listdir('./Data/myData'):
    count = len(os.listdir('./Data/myData/' + dirs))
    print(str(dirs) + '\t' + str(lab[lab.ClassId == int(dirs)].values[0][1]))
    d[dirs+' => '+lab[lab.ClassId == int(dirs)].values[0][1]] = count
    class_labels[int(dirs)] = lab[lab.ClassId == int(dirs)].values[0][1]
 ```
 Chúng ta sẽ thu được id cùng tên các class như sau:
 ```
 0	Speed limit (20km/h)
40	Roundabout mandatory
14	Stop
10	No passing for vechiles over 3.5 metric tons
5	Speed limit (80km/h)
12	Priority road
39	Keep left
37	Go straight or left
25	Road work
15	No vechiles
3	Speed limit (60km/h)
7	Speed limit (100km/h)
2	Speed limit (50km/h)
18	General caution
23	Slippery road
6	End of speed limit (80km/h)
20	Dangerous curve to the right
42	End of no passing by vechiles over 3.5 metric tons
36	Go straight or right
29	Bicycles crossing
38	Keep right
9	No passing
13	Yield
11	Right-of-way at the next intersection
27	Pedestrians
```
Chúng ta cũng có thể visualize cả số lượng dữ liệu mỗi class bằng biểu đồ như sau:
```python
plt.figure(figsize = (20, 50))
sns.barplot(y = list(d.keys()), x = list(d.values()), palette = 'Set3')
plt.ylabel('Label')
plt.xlabel('Count of Samples/Observations')
```
Và chúng ta sẽ có một biểu đồ vô cùng xịn như này:
![](https://images.viblo.asia/fd3d45a6-04cb-419c-a877-38a90a6b1a6c.png)

Sau khi đã nắm rõ được dữ liệu, chúng ta load dữ liệu, khởi tạo dataset. 
```python
from dataloader import TrafficSignDataset

dataset = TrafficSignDataset(image_dir='./Data/myData/', label_file='./Data/labels.csv', target_shape=(32, 32))
print('------------------------------------------------------')
print('The number of data: ', len(dataset))
```
Chúng ta có thể visualize random một số ảnh để kiểm tra lại dữ liệu đã được load đúng chưa nhé. 
```python
# imshow random images
dataset.visualize_random_images(nb_row=8, nb_col=10)
```
![](https://images.viblo.asia/9fbbe4f2-c15f-4568-b316-a9efd45872ba.png)

### 2. Chuẩn bị huấn luyện
Phần này các bạn có thể xem trực tiếp tại notebook [trainer.ipynb](https://github.com/buiquangmanhhp1999/TrafficSignClassification/blob/main/trainer.ipynb) trên github của mình nhé.

**Bước 1**: Import các thư viện cần thiết
```python
from dataloader import TrafficSignDataset, Collator
from model.repvgg import create_RepVGG_A0
from torch.optim import AdamW
from torch.optim.lr_scheduler import OneCycleLR
import torch.nn as nn
from torch.utils.data import DataLoader, random_split
import numpy as np
from tqdm import tqdm
import torch
import matplotlib.pyplot as plt 
import cv2
```

**Bước 2**: Chia dataset thành hai tập huấn luyện và validation
```python
# split train and val dataloader
split_ratio = 0.9
n_train = int(len(dataset) * split_ratio)
n_val = len(dataset) - n_train
train_dataset, val_dataset = random_split(dataset, [n_train, n_val])
```

**Bước 3**: Định nghĩa các tham số cần cho việc huấn luyện
```python
batch_size = 128
valid_every = 2000
print_every = 500
lr = 0.001
num_iters = 12000
device = ("cuda" if torch.cuda.is_available() else "cpu")
```
**Bước 4**: Khởi tạo dataloader để load data
```python
train_loader = DataLoader(train_dataset, batch_size=batch_size, collate_fn=Collator(), shuffle=True, num_workers=8, pin_memory=True)
val_loader = DataLoader(val_dataset, batch_size=batch_size, collate_fn=Collator(), shuffle=False, num_workers=8, pin_memory=True, drop_last=True)
data_iter = iter(train_loader)
```
**Bước 5**: Khởi tạo mô hình RepVGG. Ở đây mình sử dụng mô hình RepVGG A0. **nb_classes** ờ đây là số class có trong dữ liệu.
```python
repvgg_model = create_RepVGG_A0(num_classes=nb_classes)
repvgg_model = repvgg_model.to(device)
```

**Bước 6**: Định nghĩa hàm loss và optimizer. Loss ở đây mình dùng cross entropy bình thường thôi còn hàm tối ưu là Adam rất quen thuộc với các bạn rồi đúng không ? :)
```python
criterion = nn.CrossEntropyLoss().cuda()
optimizer = AdamW(repvgg_model.parameters(), lr=lr, betas=(0.9, 0.98), eps=1e-09)
scheduler = OneCycleLR(optimizer, max_lr=lr, total_steps=num_iters, pct_start=0.1)
```

### 3. Huấn luyện
Tiến hành huấn luyện mô hình RepVGG cùng với các tham số được khởi tạo (Do phần code quá dài nên mình không trích đầy đủ các hàm, các bạn xem thêm ở notebook [trainer.ipynb](https://github.com/buiquangmanhhp1999/TrafficSignClassification/blob/main/trainer.ipynb) nhé)
```python
total_loss = 0
best_acc = 0
global_step = 0
weight_path = 'repvgg.pth.tar'

for i in range(num_iters):
    repvgg_model.train()
    
    try:
        batch = next(data_iter)
    except StopIteration:
        data_iter = iter(train_loader)
        batch = next(data_iter)
        
    global_step += 1
    loss = train_step(batch)
    total_loss += loss

    if global_step % print_every == 0:
        print('step: {:06d}, train_loss: {:.4f}'.format(global_step, total_loss / print_every))
        total_loss = 0
        

    if global_step % valid_every == 0:
        # validate 
        val_loss, val_acc = validate()
        
        if val_acc > best_acc:
            best_acc = val_acc
            torch.save(repvgg_model.state_dict(), weight_path)
            
        print("==============================================================================")
        print("val_loss: {:.4f}, val_acc: {:.4f}".format(val_loss, val_acc))
        print("==============================================================================")
 ```
 Mình huấn luyện mô hình qua khoảng 4000 vòng lặp đã thu được kết quả đạt tầm 99%. Chắc do bộ dữ liệu này tương đối dễ hay RepVGG quá khủng nhỉ ? File weight lúc huấn luyện của mô hình sẽ được lưu vào file **'repvgg.pth.tar'**.
 ```
 step: 000500, train_loss: 2.1712
step: 001000, train_loss: 0.4318
step: 001500, train_loss: 0.1775
step: 002000, train_loss: 0.0922
==============================================================================
val_loss: 0.0922, val_acc: 0.9751
==============================================================================
step: 002500, train_loss: 0.0559
step: 003000, train_loss: 0.0446
step: 003500, train_loss: 0.0284
step: 004000, train_loss: 0.0231
==============================================================================
val_loss: 0.0214, val_acc: 0.9949
==============================================================================
```

### 4. Convert weight và model từ đa nhánh về đơn nhánh
Như đã giải thích ở phần trên, mô hình RepVGG sử dụng kiến trúc đa nhánh khi huấn luyện và kiến trúc đơn nhánh khi inference. Do đó để sử dụng thì ta cần phần chuyển weight và model ta thu được lúc huấn luyện về weight và model mới. Ở đây weight sau khi chuyển được lưu vào file **convert_weight_path.pth.tar**.

```python
import copy

def repvgg_model_convert(model:torch.nn.Module, save_path=None, do_copy=True):
    if do_copy:
        model = copy.deepcopy(model)
    for module in model.modules():
        if hasattr(module, 'switch_to_deploy'):
            module.switch_to_deploy()
    if save_path is not None:
        torch.save(model.state_dict(), save_path)
    return model
    
    
 # weight path
weight_path = 'repvgg.pth.tar'
convert_weight_path = 'convert_weight_path.pth.tar'

# create model
repvgg_model = create_RepVGG_A0(num_classes=43)
repvgg_model.load_state_dict(torch.load(weight_path, map_location=device), strict=False)

# convert multi branch model to single branch model
convert_model = repvgg_model_convert(repvgg_model, save_path=convert_weight_path)
convert_model = convert_model.to(device)
```

### 5. Inference
Sau khi chuẩn bị xong xuôi tất cả các bước bên trên, mình thử test xem có ổn không nhé. Mình chọn ngẫu nhiên một cái ảnh trên mạng tải về test thử với mô hình vừa huấn luyện.
```python
img_path = './sample/stop.jpg'

def imshow(img, figsize=(10, 10)):
    fig, ax = plt.subplots(1, 1, figsize=figsize)
    ax.axis('off')
    ax.imshow(img)
    
def predict(model, images, device):
    images = images.to(device, non_blocking=True)
    outputs = model(images)
    _, preds = torch.max(outputs, dim=1)
    
    return preds
    
# read and preprocess image
img = cv2.imread(img_path)
preprocess_img = cv2.resize(img, (32, 32), cv2.INTER_AREA)
preprocess_img = preprocess_img.transpose(2, 0, 1)
preprocess_img = preprocess_img / 255.0
preprocess_img = np.expand_dims(preprocess_img, axis=0)
preprocess_img = torch.FloatTensor(preprocess_img)

# predict
output = predict(convert_model, preprocess_img, device)
output = output.cpu().detach().numpy()

fig, ax = plt.subplots(1, 1, figsize=(18, 18))
ax.axis('off')
ax.imshow(img)
ax.grid(False)
ax.set_title('Label: '+ dataset.label_maps[int(output[0])])
```
Kết quả mô hình được dự đoán được mô phỏng như ở dưới đây:
```
Text(0.5, 1.0, 'Label: Stop')
```
![](https://images.viblo.asia/e30ed353-c362-4273-81de-b2b9fdb66efa.png)
## IV. Lời kết
Mình rất ấn tượng về ý tưởng đơn giản nhưng lại độc đáo về kiến trúc RepVGG giúp mô hình vừa đạt độ chính xác rất quả quan trong khi tốc độ inference lại rất nhanh. Tuy nhiên theo cá nhân mình mô hình có điểm hạn chế nhỏ là do khi chuyển từ đa nhánh sang đơn nhánh đã xóa hết các nhánh phụ nên khi tiến hành các tối ưu như pruning thông thường chúng ta cần phần tuning lại mô hình thì ta bắt buộc phải pruning trên kiến trúc đa nhánh sẽ phức tạp và không tận dụng được lợi thế đơn nhánh. Yup nhưng nhìn tổng quan RepVGG khá là ngon rồi. Cảm ơn các bạn đã theo dõi hết bài đọc của mình. Hy vọng qua bài này các bạn lại thu được nhiều kiến thức hữu ích.

À tí quên nữa, hiện tại Viblo đang trong chiến dịch May Fest - Lan tỏa kiến thức IT, các bạn hãy viết bài để cùng tham gia và nhận những phần quà hấp dẫn nhé. Và nếu thấy bài viết mình hay, **hãy upvote và clip bài cho mình nhé để mình có động lực viết hơn nhé**. Cảm ơn các bạn nhiều (love)

## Tham khảo
1. [Github DingXiaH/RepVGG](https://github.com/DingXiaoH/RepVGG)
2. [Paper RepVGG: Making VGG-style ConvNets Great Again](https://arxiv.org/abs/2101.03697)