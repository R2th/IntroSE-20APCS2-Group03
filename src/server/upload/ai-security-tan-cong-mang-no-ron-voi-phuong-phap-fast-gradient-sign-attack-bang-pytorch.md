# Lời chào hỏi 
Xin chào tất cả các bạn. Gần đây số lượng các bài viết liên quan đến mạng nơ ron hay các chủ đề khác về Deep Learning đã trở nên khá phổ biến trên Viblo nói riêng và cộng đồng các blog về công nghệ nói chung. Chúng ta đã viết rất nhiều về các ứng dụng tuyệt vời của mạng nơ ron, đã viết rất nhiều về các kiến trúc mạng khác nhau giải quyết được vô vàn các bài toán từ phân loại hình ảnh đến xe tự lái ... Tuy nhiên, công bằng mà nói thì AI nói chung hay Deep Learning nói riêng cũng chỉ là một công nghệ, nó là một phần nhỏ cấu thành lên bức tranh công nghệ phần mềm rộng lớn. Thế nên, đã nói đến một hệ thống công nghệ phần mềm thì ngoài việc tìm hiểu về các kĩ thuật xây dựng, kiến tạo nên các sản phẩm phần mềm thì việc nghiên cứu tìm hiểu về các phương thức tấn công, phòng chống tấn công các hệ thống đó. Deep Learning nở rộ trong một thập niên trở lại đây với sự tiến bộ của phần cứng, hàng loạt các mô hình mới được sinh ra mỗi năm càng đưa các ứng dụng Deep Learning tới gần thực tế đời sống hơn. Thế nhưng đi kèm theo đó thì các phương pháp đảm bảo an toàn thông tin cũng cần được chú trọng vì dù sao thì cũng có một tâm lý chung khi sử dụng các ứng dụng AI đó là **Đếch hiểu cái máy nó làm gì?**. AI như một chiếc hộp đen đối với người sử dụng thì điều gì khẳng định rằng trong mọi trường hợp nó đều đưa ra quyết định chính xác 

![](https://miro.medium.com/max/970/1*5z9lrpjfXak7Da2tCU_WfQ.png)

Chính vì thế việc tìm hiểu các phương pháp tấn công mạng nơ ron cũng là một chủ đề hết sức nóng. Trong bài viết này chúng ta sẽ cùng đi tìm hiểu một phương pháp tấn công kinh điển vào mạng nơ ron đó là **Fast Gradient Sign Attack**. Chúng ta sẽ cùng triển khai nó với framework PyTorch cũng như đưa ra các thảo luận về đề tài này nhé. OK bây giờ chúng ta bắt đầu thôi 

# Thế nào là tấn công mạng nơ ron 

Cũng giống như rất nhiều hệ thống thông tin khác, khi có các phương pháp xây dựng mô hình tốt, nhanh, chính xác thì cũng sẽ có các phương pháp nhằm phá hoại, tấn công, đánh lừa mô hình của chúng ta. Đây là hai thái cực tồn tại song song và chẳng bao giờ hết nóng cả. Có nhiều kiểu tấn công mạng nơ ron tuỳ thuộc vào mục tiêu cũng như các giả thiết về **knowledge** của kẻ tấn công đối với mô hình của ta. Nhìn chung thì đa phần những kẻ tấn công đều muốn bằng một cách nào đó tác động vào mô hình hoặc dữ liệu đầu vào để khiến cho mô hình đưa ra những phán đoán sai lầm. Dựa trên hiểu biết của kẻ tấn công về mạng có thể chia thành hai cách tấn công đó là **white-box** và **black-box**. Đây giống như khải niệm trong kiểm thử phần mềm vậy 

![](https://toidicodedao.files.wordpress.com/2017/12/wbtut1.jpg)

* **White box attacker**: là một kẻ tấn công có hiểu biết đầy đủ về đầu vào, đầu ra,  kiến trúc của mạng, thứ tự sắp xếp các layer, các activation sử dụng, các trọng số đã được training cũng như có toàn quyền truy cập, thay đổi các thông số đó. Kẻ tấn công dạng này có thể chiếm trọn quyền sử dụng và khiến model hoạt động theo ý muốn của hắn. 
* **Black box attacker** là một kẻ tấn công chỉ biết được thông tin dựa trên đầu vào và đầu ra của mạng mà không hề biết gì về kiến trúc bên trong của model cũng như các trọng số đã được training. Các hướng tấn công sẽ tập trung vào việc thay đổi dữ liệu đầu vào nhằm mục đích đánh lừa mô hình AI. Mục đích của những kẻ tấn công này cũng chia thành hai loại chính là **misclassification** và **source/target misclassification**. Đối với dạng **misclassification** thì mục đích của kẻ tấn công chỉ nhằm khiến cho mô hình nhận dạng sai đi mà không cần quan tâm đến kết quả đầu ra. Ví dụ đưa ảnh con mèo vào thì mô hình không nhận ra đây là con mèo nữa tức là đã tấn công thành công. Còn đối với **source/target misclassification** thì lại nâng tầm tấn công lên một level mới. Ví dụ đưa ảnh con mèo vào bắt buộc đầu ra của mô hình sẽ nhận dạng thành con chó. 

Trong bài ngày hôm nay chúng ta sẽ tìm hiểu về phương pháp **Fast Gradient Sign Attack - FGSA** một phương pháp tấn công **white-box** với mục đích là **misclassification**. Với các kiến thức nền tảng đó chúng ta sẽ đi sâu tìm hiểu chi tiết trong các phần tiếp theo nhé 

# Fast Gradient Sign Attack

Phương pháp tấn công này được mô tả lần đầu vào năm 2015 trong bài báo của **Goodfellow** [Explaining and Harnessing Adversarial Examples](https://arxiv.org/pdf/1412.6572.pdf). Paper này chỉ ra rằng phần lớn các mạng nơ ron có thể bị đánh lừa bởi các mẫu đối kháng **adversarial examples** được tạo ra bằng cách cố tình thêm vào một vài nhiễu nhỏ trong ảnh đầu vào khiến cho mạng bị phán đoán sai. Phương pháp tấn công này đủ mạnh để đánh lừa các hệ thống xây dựng trên mạng nơ ron cũng như khá trực quan trọng việc giải thích. Ý tưởng cơ bản của nó như sau:
* Mô hình thông thường sẽ thay đổi trọng số thông qua quá trình tối ưu sử dụng **gradient descent** với giá trị gradient được tính toán trong bước **backpropagation**. Quá trình cập nhật trọng số này sẽ làm cực tiểu hoá hàm loss
* Để tấn công thì thay vì cập nhật trong số của mô hình và cực tiểu hoá hàm loss thì ta sẽ thay đổi dữ liệu đầu vào với mục đích để cực đại hoá hàm loss 

Cùng xem ví dụ về phân loại gấu trúc để thấy rõ một số khái niệm

![](https://pytorch.org/tutorials/_images/fgsm_panda_image.png)

Trong đó $x$ là ảnh input, $y$ là nhãn của ảnh $x$. $J(\mathbf{\theta}, \mathbf{x}, y)$ là hàm loss sử dụng để training model $\theta$. Quá trình training sử dụng backpropagation để tính toán đạo hàm và giải thuật gradient descent sẽ căn cứ vào các giá trị đạo hàm để thay đổi input $x$ đồng thời tính toán sự thay đổi của hàm loss $\nabla_{x} J(\mathbf{\theta}, \mathbf{x}, y)$.  Khi thay đổi input $x$ một lượng $\epsilon$ rất nhỏ theo hướng maximize loss $sign(\nabla_{x} J(\mathbf{\theta}, \mathbf{x}, y))$ thì giá trị $x'$ sẽ bị phân loại sai thành classs **gibbon** như trong hình 

Tư tưởng chính của thuật toán là như vậy. Bây giờ chúng ta tiến hành code thôi 

# Implement FGSA Attack 

## Import các thư viện cần thiết 
Trong bài này chúng ta sử dụng PyTorch để triển khai. Cũng giống như các bài toán computer vision khác trên PyTorch chúng ta import một vài package cần thiết như sau 

```python 
from __future__ import print_function
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
from torchvision import datasets, transforms
import numpy as np
import matplotlib.pyplot as plt
```
## Định nghĩa các inputs 

Để training mô hình này cần sử dụng 3 tham số đầu vào như sau:
```python 
epsilons = [0, .05, .1, .15, .2, .25, .3]
pretrained_model = "data/lenet_mnist_model.pth"
use_cuda=True
```

Trong đó tham số **epsilons** là một danh sách các giá trị thể hiện cho mức độ nhiễu được add vào input của mô hình. Giá trị 0 tương ứng với việc giữ nguyên input đầu vào của tập test. Giá trị epsilon càng cao thì mức độ nhiễu loạn càng nhiều. Chúng ta sẽ so sánh các mức độ nhiễu loạn này tương ứng với accuracy của mô hình bị giảm như thế nào. Model được định nghĩa cho tập MNIST và các bạn có thể tải pretrained weigth tại [đây](https://drive.google.com/drive/folders/1fn83DF14tWmit0RTKWRhPq5uVXt73e0h)

## Định nghĩa mô hình và dữ liệu 

Chúng ta sử dụng mô hình LeNet được training sẵn cho tập dữ liệu MNIST 

```python 
class LeNet(nn.Module):
    def __init__(self):
        super(LeNet, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, 10)

    def forward(self, x):
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(-1, 320)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)
        return F.log_softmax(x, dim=1)
```

Sau đó việc cần làm tiếp theo là định nghĩa dữ liệu test bằng module DataLoader của PyTorch 

```python 
transform = transforms.Compose([
    transforms.ToTensor(),
])

test_loader = torch.utils.data.DataLoader(
    datasets.MNIST('../data', train=False, download=True, transform=transform),
    batch_size=1, shuffle=True
)
```

## Load pretrained model 

Sau khi định nghĩa mô hình và dữ liệu chúng ta tiến hành load pretrained weight đã được tải về trước đó 

```python 
print("CUDA Available: ",torch.cuda.is_available())
device = torch.device("cuda" if (use_cuda and torch.cuda.is_available()) else "cpu")

# Initialize the network
model = LeNet().to(device)

# Load the pretrained model
model.load_state_dict(torch.load(pretrained_model, map_location='cpu'))

# Set the model in evaluation mode. In this case this is for the Dropout layers
model.eval()
```

## Tấn công FGSA
Tiếp theo chúng ta cần định nghĩa hàm tấn công bằng các thay đổi input đầu vào của mạng với các trọng số của epsilon tơng ứng. Hàm `fgsm_attack` nhận vào 3 tham số tương ứng như sau:
* `image`: truyền vào ảnh input
* `epsilon` giá trị tương ứng thể hiện mục độ tấn công 
* `data_grad` là giá trị của gradient của hàm loss tương ứng với data input image $\nabla_{x} J(\mathbf{\theta}, \mathbf{x}, y)$. 

Giá trị của ảnh được thay đổi qua hàm `fgsa_attack` thực hiện như sau:

$$perturbed\_image = image + epsilon*sign(data\_grad) = x + \epsilon * sign(\nabla_{x} J(\mathbf{\theta}, \mathbf{x}, y))$$

Và cuối cùng thì giá trị mới của input data sẽ được đưa về trong khoảng $(0, 1)$

Chi tiết hàm đó như sau 

```python 
# FGSM attack code
def fgsm_attack(image, epsilon, data_grad):
    # Collect the element-wise sign of the data gradient
    sign_data_grad = data_grad.sign()
    # Create the perturbed image by adjusting each pixel of the input image
    perturbed_image = image + epsilon*sign_data_grad
    # Adding clipping to maintain [0,1] range
    perturbed_image = torch.clamp(perturbed_image, 0, 1)
    # Return the perturbed image
    return perturbed_image
```

Sau cùng chúng ta định nghĩa hàm test. Mỗi lần call đến hàm test này sẽ thực hiện duyệt qua tất cả các sample trong tập test của MNIST và thực hiện dự đoán với model đã được attack bởi FGSA. Để thực hiện việc tấn công thì đạo hàm của hàm loss tương ứng với input data sẽ được tính toán với từng sample trong tập test. Sau đó sẽ được đưa qua hàm `fgsm_attack` phía trên để sinh ra `input_data` mới. Chi tiết hàm này như sau 

```python 
def test( model, device, test_loader, epsilon ):

    # Accuracy counter
    correct = 0
    adv_examples = []

    # Loop over all examples in test set
    for data, target in test_loader:

        # Send the data and label to the device
        data, target = data.to(device), target.to(device)

        # Set requires_grad attribute of tensor. Important for Attack
        data.requires_grad = True

        # Forward pass the data through the model
        output = model(data)
        init_pred = output.max(1, keepdim=True)[1] # get the index of the max log-probability

        # If the initial prediction is wrong, dont bother attacking, just move on
        if init_pred.item() != target.item():
            continue

        # Calculate the loss
        loss = F.nll_loss(output, target)

        # Zero all existing gradients
        model.zero_grad()

        # Calculate gradients of model in backward pass
        loss.backward()

        # Collect datagrad
        data_grad = data.grad.data

        # Call FGSM Attack
        perturbed_data = fgsm_attack(data, epsilon, data_grad)

        # Re-classify the perturbed image
        output = model(perturbed_data)

        # Check for success
        final_pred = output.max(1, keepdim=True)[1] # get the index of the max log-probability
        if final_pred.item() == target.item():
            correct += 1
            # Special case for saving 0 epsilon examples
            if (epsilon == 0) and (len(adv_examples) < 5):
                adv_ex = perturbed_data.squeeze().detach().cpu().numpy()
                adv_examples.append( (init_pred.item(), final_pred.item(), adv_ex) )
        else:
            # Save some adv examples for visualization later
            if len(adv_examples) < 5:
                adv_ex = perturbed_data.squeeze().detach().cpu().numpy()
                adv_examples.append( (init_pred.item(), final_pred.item(), adv_ex) )

    # Calculate final accuracy for this epsilon
    final_acc = correct/float(len(test_loader))
    print("Epsilon: {}\tTest Accuracy = {} / {} = {}".format(epsilon, correct, len(test_loader), final_acc))

    # Return the accuracy and an adversarial example
    return final_acc, adv_examples
```

Sau đó tiến hành tấn công với các giá trị epsilon khác nhau 

```python 
accuracies = []
examples = []

# Run test for each epsilon
for eps in epsilons:
    acc, ex = test(model, device, test_loader, eps)
    accuracies.append(acc)
    examples.append(ex)
```

Ta thu được kết quả 

```python 
Epsilon: 0	Test Accuracy = 9810 / 10000 = 0.981
Epsilon: 0.05	Test Accuracy = 9426 / 10000 = 0.9426
Epsilon: 0.1	Test Accuracy = 8510 / 10000 = 0.851
Epsilon: 0.15	Test Accuracy = 6826 / 10000 = 0.6826
Epsilon: 0.2	Test Accuracy = 4301 / 10000 = 0.4301
Epsilon: 0.25	Test Accuracy = 2082 / 10000 = 0.2082
Epsilon: 0.3	Test Accuracy = 869 / 10000 = 0.0869
```
# Phân tích kết quả tấn công 
Chúng ta có thể thấy rằng với các giá trị epsilon càng tăng thì accuracy sẽ giảm tương ứng. Điều này giải thích đơn giản ở công thức của hàm loss. Với giá trị `epsilon` lớn hơn thì sự thay đổi giá trị của hàm loss trong mỗi bước attack cũng sẽ lớn hơn, dẫn đến sự thay đổi về accuracy của mô hình lớn hơn Sự biến đối của accuracy là không tuyến tính dù cho các giá trị epsilon là tuyến tính. Chúng ta có thể thấy sự tương quan giá accuracy và epsilon bằng đoạn code sau 

```python 
plt.figure(figsize=(5,5))
plt.plot(epsilons, accuracies, "*-")
plt.yticks(np.arange(0, 1.1, step=0.1))
plt.xticks(np.arange(0, .35, step=0.05))
plt.title("Accuracy vs Epsilon")
plt.xlabel("Epsilon")
plt.ylabel("Accuracy")
plt.show()
```

Và đây là output của nó 

![](https://pytorch.org/tutorials/_images/sphx_glr_fgsm_tutorial_001.png)

Các bạn sẽ có thắc mắc rằng nếu như cứ thêm thật nhiều nhiễu vào trong input data thì sẽ làm cho accuracy của mô hình giảm đi đồng nghĩa với việc hiệu quả của việc tấn công càng tăng lên. Tuy nhiên có một thực tế rằng nếu như càng thêm nhiều nhiễu thì khả năng bị phát hiện có can thiệp vào input data càng cao. Cụ thể chúng ta sẽ in ra một vài mẫu ảnh ở các giá trị `epsilon` cao để  thấy rõ sự khác biệt 

```python 
# Plot several examples of adversarial samples at each epsilon
cnt = 0
plt.figure(figsize=(8,10))
for i in range(len(epsilons)):
    for j in range(len(examples[i])):
        cnt += 1
        plt.subplot(len(epsilons),len(examples[0]),cnt)
        plt.xticks([], [])
        plt.yticks([], [])
        if j == 0:
            plt.ylabel("Eps: {}".format(epsilons[i]), fontsize=14)
        orig,adv,ex = examples[i][j]
        plt.title("{} -> {}".format(orig, adv))
        plt.imshow(ex, cmap="gray")
plt.tight_layout()
plt.show()
```

![](https://images.viblo.asia/63687b50-8b3e-407f-922e-38169f417385.png)

Vậy nên để đánh lừa được mô hình cần phải có sự đánh đổi. Nếu input data dễ dàng lừa được mô hình thì cũng dễ dàng nhận biết được bởi con người. 

# Tổng kết 

Bài viết này giúp các bạn tìm hiểu về một cách tấn công mạng nơ ron phổ biến đó là **Fast Gradient Sign Attack** cũng như các phân tích dựa trên phương pháp tấn công này. Từ đó cho chúng ta thêm mindset về việc đảm bảo an toàn hơn cho các mạng nơ ron của chúng ta . Trên thực tế còn rất nhiều các phương pháp tấn công khác các bạn có thể tham khảo thêm tại paper [Adversarial Attacks and Defences Competition](https://arxiv.org/pdf/1804.00097.pdf). Xin chào và hẹn gặp lại các bạn trong những bài viết sau