# Lời mở đầu 
**PyTorch** là một trong những framework rất mạnh mẽ với các task về Deep Learning.  Nó vừa đủ dễ hiểu và tường minh để cho những người mới học cũng có thể bắt đầu dễ dàng nhưng cũng có khả năng mở rộng và customize rất linh hoạt cho những mô hình phức tạp hoặc được sử dụng trong những nghiên cứu mới, khi mà kiến trúc mô hình **chưa từng thấy bao giờ**. PyTorch mạnh mẽ còn bởi các hệ thống thư viện phong phú với đầy đủ các task từ xử lý cho dữ liệu hình ảnh, âm thanh, ngôn ngữ tự nhiên cho đến tín hiệu số ... cùng một cộng đồng phát triển và chia sẻ rất rộng lớn. Trong bài viết này mình xin phép được chia sẻ với các bạn về **PyTorch Hooks** - một trong những công cụ sử dụng rất hiệu quả trong khi lập trình và debug với PyTorch. Trong bài này chúng ta sẽ nói về các tác dụng và các cách sử dụng khác nhau của công cụ này nhé.

# Nỗi khổ sở khi debug mô hình 

![](https://image.slidesharecdn.com/fse2015crowddebuggingtosung5sep-150905004759-lva1-app6891/95/crowd-debugging-fse-2015-2-638.jpg?cb=1441414166)

Nếu bạn đã từng làm việc với các model Deep Learning trước đó thì chắc hẳn bạn sẽ nhận thấy một điều rằng việc debug chúng chưa bao giờ là dễ dàng. Có rất nhiều thứ có thể xảy ra như exploding/vanishing gradients, tensor shape mismatch hay rất nhiều những thứ phát sinh khác trong quá trình xây dựng và training mô hình. Để giải quyết các vấn đề đó đôi khi khiến bạn phải **mò mẫm** vào từng layer, từng node, từng feature để xem thực sự cái mô hình của chúng ta nó đang làm gì bên trong. Đối với các bạn đã sử dụng các framework dựa trên static graph như Tensorflow 1 thì việc debug đều phải thông qua session rất khó khăn và khổ sở. Mình tin rằng đã hơn một lần các bạn bắt gặp kiểu debug như này 

![](https://images.viblo.asia/db5651b7-9c58-4e85-af6a-1a8c01aa23ee.png)

Tất cả mọi tính toán đều phải thông qua `session` nên việc debug trở nên rất vất vả. 

Đó chính là lý do tại sao khi làm việc với Tensorflow 2 hay PyTorch chúng ta có một trải nghiệm **sung sướng hơn**. Các việc debug mô hình cũng gần như cú pháp của một chương trình Python thông thường. Như trong PyTorch chúng ta có thể viết các câu lệnh in ra các giá trị của biến qua từng step trong hàm `forward` với câu lệnh `print` thông thường trong Python. Tuy nhiên cách làm như vậy với các mô hình nhỏ cũng đã làm cho code của bạn trở nên rất rối rắm và **tay to**.  Chắc hẳn là bạn đã từng code một chương trình PyTorch như này rồi chứ 

```python 
import torch.nn as nn
import torch.nn.functional as F


class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(3, 6, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(6, 16, 5)
        self.fc1 = nn.Linear(16 * 5 * 5, 120)
        self.fc2 = nn.Linear(120, 84)
        self.fc3 = nn.Linear(84, 10)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        # Print what happend here
        print(x)
        x = self.pool(F.relu(self.conv2(x)))
        x = x.view(-1, 16 * 5 * 5)
        # Print what happend here
        print(x.shape)
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x
```

Với việc debug trên cả model to đùng như **Resnet50** dường như là bất khả thi. Nó đòi hỏi bạn phải ngồi phán đoán như một nhà tiên tri xem mô hình đang bị sai ở đâu, layer nào đang hoạt động tốt, layer nào hoạt động không tốt. Và đó chính là lúc bạn cần dùng đến **PyTorch Hooks**

# PyTorch hooks là gì?

![](https://blog.paperspace.com/content/images/size/w2000/2019/07/1_1weEyJRIXCzRlYYQhdZCgA.jpeg)

Hiểu đơn giản, hooks là một nơi để lắng nghe một events. Tương tự như webhooks nhưng trong deep learning chúng ta có model hooks sử dụng để lắng nghe các sự kiện xảy ra với model. Khi một trggier method được sử dụng với **hooks** nó có thể gửi các kết quả đầu ra của từng thay đổi đến hooks. Điểm hay của nó là có thể ghi lại được cả giá trị của biến tại các thời điểm **trước, sau khi forward** và **sau quá trình backward** tức đã được cập nhật bởi giải thuật Gradient Descent.  Ôi nghe thì có vẻ phức tạp đấy nhưng thực ra sử dụng nó cũng đơn giản lắm. Chúng ta sẽ bắt đầu sử dụng nó ngay nhé. 

# Ví dụ sử dụng để lưu output sau mỗi lớp convulution 

Giả sử các bạn muốn lưu lại kết quả của ảnh sau khi đi qua mỗi lớp convulution thì sẽ tạo ra các feature map như thế nào. Việc này vốn có thể thực hiện bằng các tool visualization tuy nhiên chúng ta cũng có thể thực hiện bằng một cách khác đó là sử dụng hooks. 

Đầu tiên chúng ta cũng định nghĩa mô hình 

```python 
import torch
from torchvision.models import resnet34

device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')

model = resnet34(pretrained=True)
model = model.to(device)
```

Tiếp theo chúng ta định nghĩa một hook với mục đích lưu lại kết quả đầu ra của các layer. Phần này định nghĩa khá đơn giản, giống như một function thông thường. Khi trigger function (ví dụ `forward`) có thay đổi giá trị thì call đến hook này để thực hiện lưu giá trị thay đổi đó lại. 

```python 
class OutputHook:
    def __init__(self):
        self.outputs = []
        
    def __call__(self, module, module_in, module_out):
        self.outputs.append(module_out)
        
    def clear(self):
        self.outputs = []
```

Sau khi định nghĩa, chúng ta khởi tạo một instance của hook này 

```python 
hook = OutputHook()
```

Mục đích của chúng ta là **xem output của các conv layer** và hook này sẽ được register với hàm `register_forward_hook(hook)` để lắng nghe thay đổi và gửi event sang hook trong quá trình forward. Chúng ta còn có các loại hàm register khác như `register_backward_hook` và `register_forward_pre_hook` để thực hiện việc xử lý trong quá trình backward và giá trị trước khi forward xảy ra. Tiếp theo chúng ta sẽ handle giá trị của layer trong quá trình forward và lưu vào một list `hook_handle`

```python 
hook_handles = []

for layer in model.modules():
    if isinstance(layer, torch.nn.modules.conv.Conv2d):
        handle = layer.register_forward_hook(hook)
        hook_handles.append(handle)
```
Tiếp theo chúng ta load bức anh con chó lên để làm dữ liệu mẫu bằng cách thực hiện transform 
```python 
from PIL import Image
from torchvision import transforms as T

image = Image.open('images/dog.jpeg')

from torchvision import transforms as T

transform = T.Compose([T.Resize((224, 224)), T.ToTensor()])
X = transform(image).unsqueeze(dim=0).to(device)

out = model(X)
```
![](https://images.viblo.asia/f4bffa3d-e4bf-49dd-b222-99834ef964f0.jpeg)

Sau phần này các giá trị của hook đã được lưu lại vào trong mảng `hook_output` của chúng ta. 

```python 
import matplotlib.pyplot as plt

def module_output_to_numpy(tensor):
    return tensor.detach().to('cpu').numpy() 

images = module_output_to_numpy(hook.outputs[0])

images.shape

>>> (1, 64, 112, 112)
```
Và cuối cùng chúng ta sẽ visualize mảng images của ta 

```python 
with plt.style.context("seaborn-white"):
    plt.figure(figsize=(20, 20), frameon=False)
    for idx in range(64):
        plt.subplot(8, 8, idx+1)
        plt.imshow(images[0, idx])
    plt.setp(plt.gcf().get_axes(), xticks=[], yticks=[])
```
Đây chính là các feature map sau conv layer thứ nhất. Các bạn có thể thấy được mỗi kernel khác nhau tác động lên trên bức ảnh đầu vào tạo thành một feature map như sau 

![](https://images.viblo.asia/693e1e83-f1df-4fac-b4f2-06546f27aea8.png)

Việc nhìn sâu vào các layer giúp chúng ta dễ dàng hình dung xem thực sự các kernel trong lớp Convulution này đã thực hiện công việc gì và kết quả của chúng như thế nào. 

# Kết luận 

**PyTorch Hooks** là một trong những công cụ rất hữu ích để các bạn debug mô hình AI khi sử dụng PyTorch. Kết hợp với việc sử dụng các công cụ visualization khác như TensorBoard sẽ giúp cho chúng ta hiểu hơn về cách hoạt động của mô hình hơn. Chúc các bạn luôn vui vẻ và hẹn gặp lại ở các bài viết sau.