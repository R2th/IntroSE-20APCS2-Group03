# Mở đầu 
Các ứng dụng AI  đang càng ngày càng gần hơn với những người dùng. Từ đó phát sinh rất nhiều nhu cầu về việc đưa mô hình AI chạy trên các loại môi trường khác nhau như Edge Device, Web Browser, Mobile App, Arduino... Vì lý do đó thì việc export model AI sang các định dạng có thể chạy trên các nền tảng đó là một việc làm rất cần thiết. Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu về cách export mô hình từ PyTorch sang một framework khá hot trong cộng đồng AI đó là ONNX cùng như triển khai thử mô hình này trên web browser với ONNX.js. OK không dài dòng nữa chúng ta sẽ bắt đầu ngay thôi.

# Deploy model dưới client
Để thống nhất khái niệm chung cho phần này thì mình xin phép được định nghĩa khái niệm **deploy trên client** chỉ các dạng deploy mô hình AI trực tiếp trên các edge device, web browser, mobile app... để phân biệt cho việc deploy mô hình phía backend (hay server). 
## Tại sao cần deploy model dưới client 
Trước hết chúng ta cần phân biệt ưu và nhược điểm của hai hình thức deploy này:
* **Deploy phía server:** Các model AI được deploy trên một server tập trung. Các client giao tiếp với mô hình AI thông qua các API. Ưu điểm của phương pháp này là có thể xử lý được các model AI một cách tập trung trên server, ít bị phụ thuộc vào cấu hình và môi trường triển khai. Việc quản lý mô hình tập trung cũng dễ dàng hơn cho việc deploy cũng như versioning, mantaining các mô hình và đặc biệt là tính **model privacy** sẽ được đảm bảo khi deploy tập trung. Bạn sẽ không phải lo có người lấy cắp mô hình của mình cũng như kiến trúc nghiên cứu mô hình của mình bị sao chép. Tuy nhiên các deploy này có một nhược điểm đó chính là việc tập trung tất cả mọi xử lý ở server có thể khiến cho hệ thống của chúng ta quá tải cũng như các chi phí vận hành, scale các mô hình AI trên server tập trung là rất lớn. Một nhược điểm khác của phương pháp này đó chính là việc **Data privacy** khó được đảm bảo do người dùng sẽ phải gửi dữ liệu về server để xử lý 
* **Deploy phía client:** Chính là phương pháp thứ hai mà chúng ta thường sử dụng. Phương pháp này sẽ đưa các xử lý cũng như mô hình AI xuống phía client. Phương pháp này có ưu điểm là các xử lý phía AI được phân tán và không cần một server có cấu hình quá lớn để chạy mô hình. Các ứng dụng chạy các mô hình AI hoàn toàn có thể chạy phía dưới client một cách offline mà không cần truy cập lên server. Ưu điểm khác của phương pháp này đó chính là giữ được **User Data Privacy**. Tuy nhiên phương pháp này cũng có những nhược điểm đó chính là việc khó update và quản lý version của mô hình. Chỉ phù hợp với các  mô hình có kích thước nhỏ do giới hạn tính toán hiện tại của các phần cứng phía client. Sẽ cần phải đảm bảo mô hình chạy trên nhiều nền tảng, môi trường deploy khác nhau và hơn nữa, rất quan trọng đó là chúng ta không thể đảm bảo được **Model Privacy** khi đã đưa toàn bộ mô hình AI, các xử lý xuống dưới client. Việc này đối với những hacker không khác nào **giao con cho ác** vậy. Tổng hợp ưu và nhược điểm của hai phương pháp này chúng ta có thể thấy trong hình sau 

![](https://images.viblo.asia/9da86703-239b-4aaa-b95a-c3d265d9adab.png)


## Khi nào nên deploy model dưới client 

Vậy một câu hỏi đặt ra là trong trường hợp nào chúng ta sẽ sử dụng phương thức deploy dưới client. Qua kinh nghiệm của mình khi làm qua các dự án về AI thì chúng ta có thể lựa chọn deploy ở dưới client trong những trường hợp như sau:

* **Ứng dụng yêu cầu phải chạy offline:** lúc này thì không có cách nào khác là phải đưa mô hình xuống dưới client 
* **Mô hình đủ nhẹ và vẫn đảm bảo được độ chính xác:** Đây là một điểm rất quan trọng để tránh ảnh hưởng đến trải nghiệm của người dùng. Bởi những model quá nặng sẽ cho thời gian load và inference rất lâu trên các thiết bị client do giới hạn về phần cứng. Điều này làm ảnh hưởng đến trải nghiệm người dùng. 
* **Mô hình không cần update nhiều:** Điều này tuỳ thuộc vào mỗi bài toán khác nhau, nếu như bài toán của bạn không đòi hỏi việc phải update các mô hình liên tục như Online Learning thì hướng đưa mô hình xuống client cũng nên được cân nhắc 
* **Ứng dụng quan trọng việc bảo mật dữ liệu người dùng:** Nếu như ứng dụng của bạn không muốn gửi dữ liệu lên phía server tập trung để xử lý thì đưa mô hình AI xuống client là một điểm lợi thế 
* **Có giải pháp bảo vệ bản quyền của mô hình:** Khi đưa mô hình xuống client thì một điểm quan trọng bạn cần cân nhắc đến là việc bảo việ bản quyền của mô hình làm ra với các việc tấn công. 

Đó là những điểm cần cân nhắc trước khi quyết định đưa mô hình AI xuống dưới client để deploy. Nếu như các bạn đã sẵn sàng rồi thì chúng ta sẽ đi sâu vào phần kĩ thuật và các công cụ để thực hiện điều này nhé. Trong bài này mình sử dụng ONNX - [Open Neural Network Exchange](https://onnx.ai/) - một trontg những framework khá nổi tiếng để thực hiện việc convert mô hình và demo trên ứng dụng web với ONNX.js nhé. 

# ONNX là gì 
ONNX có thể coi là một framework trung gian để biểu diễn một mô hình  AI đã được trianing từ nhiều framework khác nhau như PyTorch, Tensorflow, Caffe... Với format ONNX chúng ta hoàn toàn có thể chạy mode trên các nền tảng khác nhau như web, desktop, FPGA, ARM, Mobile .... Và chính vì lý do đó nó thực sự rất hữu dụng nếu như bạn muốn phát triển các mô hình AI theo hướng cross-platform 

![](https://microsoft.github.io/ai-at-edge/assets/images/ONNX.PNG)

Về cơ bản là như vậy. Chúng ta chỉ cần hiểu được ý nghĩa của nó thôi. Mình sẽ không đi quá sâu vào việc sử dụng framework này. Các bạn có thể tự tìm hiểu trên chính documentation của nó. Chúng ta sẽ đi vào phần code luông nhé. 

# Show me your code 

## Build model trên PyTorch 

Rất đơn giản thôi chúng ta sẽ xây dựng thử một ứng dụng nhận dạng chữ số với MNIST. Đây là một bài khá đơn giản nên mình xin phép không giải thích quá nhiều. Các bạn cứ chạy theo code là được nhé 

* Đầu tiên là import thư viện
```python 
import torch
import torchvision
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
```

* Tiếp theo là khai báo các hyperparams cần thiết

```python 
n_epochs = 30
batch_size_train = 64
batch_size_test = 1000
learning_rate = 0.01
momentum = 0.5
log_interval = 10

random_seed = 1
torch.backends.cudnn.enabled = False
torch.manual_seed(random_seed)
```

* Tiếp theo là khai báo transform cho dữ liệu và load các dữ liệu tương ứng 

```python 
mnist_transform = transform=torchvision.transforms.Compose([
    torchvision.transforms.ToTensor(),
    torchvision.transforms.Normalize(
        (0.1307,), (0.3081,))
    ]
)

# Train dataloader 
train_loader = torch.utils.data.DataLoader(
    torchvision.datasets.MNIST(
        'data', 
        train=True, 
        download=True, 
        transform=mnist_transform
    ),
    batch_size=batch_size_train, 
    shuffle=True
)

# Test dataloader 
test_loader = torch.utils.data.DataLoader(
    torchvision.datasets.MNIST(
        'data', 
        train=False, 
        download=True, 
        transform=mnist_transform
    ),
    batch_size=batch_size_test, 
    shuffle=True
)
```

* Khai báo một mạng đơn giản 

```python 
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
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
        
        return F.log_softmax(x)
```

* Khai báo hàm loss và optimizer 

```python 
net = Net()
criterion = nn.CrossEntropyLoss()
optimizer = optim.SGD(net.parameters(), lr=learning_rate, momentum=momentum)
```

* Xây dựng hàm test 

```python 
def test(net, test_loader):
    correct = 0
    total = 0

    with torch.no_grad():
        for data in test_loader:
            images, labels = data
            outputs = net(images)
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()

    print('Accuracy of the network on the 10000 test images: %d %%' % (
        100 * correct / total))
```

* Training model

```python 
for epoch in range(200):
    running_loss = 0.0

    for i, data in enumerate(train_loader, 0):
        # get the inputs; data is a list of [inputs, labels]
        inputs, labels = data

        # zero the parameter gradients
        optimizer.zero_grad()

        # forward + backward + optimize
        outputs = net(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        # print statistics
        running_loss += loss.item()
        if i % 200 == 0:    # print every 2000 mini-batches
            print('[Epoch %d, %5d] loss: %.3f' %
                  (epoch + 1, i + 1, running_loss / 2000))
            running_loss = 0.0
            
    test(net, test_loader)

print('Finished Training')
```

Sau đó chúng ta tiến hành training như bình thường. Nhâm nhi một cốc cafe và chờ kết quả nhé.... 

```python 
[Epoch 200,     1] loss: 0.000
[Epoch 200,   201] loss: 0.007
[Epoch 200,   401] loss: 0.008
[Epoch 200,   601] loss: 0.008
[Epoch 200,   801] loss: 0.007
Accuracy of the network on the 10000 test images: 97 %
```
OK chúng ta sẽ lưu lại mô hình với độ chính xác **97%** này để tiến hành xử lý về sau 

```python
torch.save(net.state_dict(), "pytorch_model.pt")
```
## Export model trên ONNX 

Việc export model từ PyTorch sang ONNX thực ra rất đơn giản. Chúng ta chỉ cần thực hiện một vài lệnh như sau 

```python 
model = Net()
# Load pretrained weight 
model.load_state_dict(torch.load('pytorch_model.pt'))

# Set dummy input 
dummy_input = torch.zeros(1, 1, 28, 28)

# Export to ONNX 
torch.onnx.export(model, dummy_input, 'onnx_model.onnx', verbose=True)
```

## Chạy thử trên trình duyệt 

### Import thư viện ONNX.js 
Các bạn tạo file `index.html` tại thư mục hiện tại và paste code giống như đoạn code test trên [Github ONNX.js](https://github.com/microsoft/onnxjs)

```python 
<html>
<head></head>

<body>
<!-- Load ONNX.js -->
<script src="https://cdn.jsdelivr.net/npm/onnxjs/dist/onnx.min.js"></script>
<!-- Code that consume ONNX.js -->
<script>
    // create a session
    const myOnnxSession = new onnx.InferenceSession();
    // load the ONNX model file
    myOnnxSession.loadModel("./onnx_model.onnx").then(() => {
        // generate model input
        const inferenceInputs = new onnx.Tensor(new Float32Array(28*28), 'float32', [1, 1, 28, 28]);
        // execute the model
        myOnnxSession.run([inferenceInputs]).then((output) => {
            // consume the output
            const outputTensor = output.values().next().value;
            console.log(`model output tensor: ${outputTensor.data}.`);
        });
    });
</script>
</body>
</html>
```

Khởi tạo một server nho nhỏ để test kết quả của chúng ta. Vào terminal ở thư mục hiện tại gõ lệnh 

```python 
python -m http.server 

>>> Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

### Kiểm tra kết quả 

Sau khi truy cập vào địa chỉ trên chúng ta thấy một màn hình trắng. Để kiểm tra xem model đã load thành công chưa chúng ta bật console log lên 

![](https://images.viblo.asia/a32178ba-d419-466f-8a05-f4fa64c3ebea.png)

Kết quả hiện lỗi đỏ lòm luôn. Chúng ta sẽ tiến hành điều tra xem có lỗi ở đâu nhé 

### Điều tra lỗi 

Lỗi trên báo rằng hàm LogSoftMax hiện tại chưa support trên ONNX.js. Vào trong github của ONNX.js chúng ta tìm thấy phần [Openrators Support](https://github.com/microsoft/onnxjs/blob/master/docs/operators.md). Trong đây có nêu rõ các Operators hiện đang support. Chúng ta tìm đến **LogSoftmax** thì hiện tại các phiên bản của ONNX.js chưa support operator này 

![](https://images.viblo.asia/f9f69a06-73d5-4eee-af50-d82329bb1865.png)

Vậy chúng ta lại phải quay lại model PyTorch lúc đầu để tiến hành tinh chỉnh và tìm các operators thay thế. 

## Chỉnh lại model 

Ở trong phần model của PyTorch chúng ta thấy toán tử `log_softmax` được sử dụng ở cuối cùng hàm forward như sau:

```python 
return F.log_softmax(x)
```

Tiến hành thay hàm này thành hàm `softmax` và để cho thuận tiện chúng ta sẽ khai báo luôn một mạng mới để chỉnh sửa cho dễ dàng. Lúc này mạng mới là 

```python 
# Inference Net

class InferenceNet(nn.Module):
    def __init__(self):
        super(InferenceNet, self).__init__()
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
        
        return F.softmax(x)
```

Do thay thế hàm softmax không làm ảnh hưởng đến weight của model nên chúng ta có thể load lại state_dict cũ 

```python 
model = InferenceNet()
model.load_state_dict(torch.load('pytorch_model.pt'))
```

Sau đó test lại performance trên tập test 

```python 
test(model, test_loader)

>>> Accuracy of the network on the 10000 test images: 97 %
```

Độ chính xác của mô hình không thay đổi nên chúng ta không cần finetuning lại mạng. Tiến hành export lại mô hình sang ONNX.js thay thế cho mô hình cũ và load lại trang web. Lúc này chúng ta bật console log lên sẽ thấy kết quả của mô hình như sau:

![](https://images.viblo.asia/135b5b1d-5310-4a79-b2f8-51ef3eccf835.png)

Điều này chứng tỏ mô hình của chúng ta đã được load thành công trong ONNX.js 
## Xây dựng giao diện demo 
Phần này chúng ta không bàn quá nhiều. Các bạn copy code và chạy thôi nhé. Bổ sung thêm vào `index.html`

```html  
<div class="card elevation">
    <h3>MNIST ONNX.js</h3>
    <canvas
            class="canvas elevation"
            id="canvas"
            width="280"
            height="280"
    ></canvas>

    <div class="button" id="clear-button">CLEAR</div>

    <div class="predictions">
        <div class="prediction-col" id="prediction-0">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">0</div>
        </div>

        <div class="prediction-col" id="prediction-1">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">1</div>
        </div>

        <div class="prediction-col" id="prediction-2">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">2</div>
        </div>

        <div class="prediction-col" id="prediction-3">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">3</div>
        </div>

        <div class="prediction-col" id="prediction-4">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">4</div>
        </div>

        <div class="prediction-col" id="prediction-5">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">5</div>
        </div>

        <div class="prediction-col" id="prediction-6">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">6</div>
        </div>

        <div class="prediction-col" id="prediction-7">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">7</div>
        </div>

        <div class="prediction-col" id="prediction-8">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">8</div>
        </div>

        <div class="prediction-col" id="prediction-9">
            <div class="prediction-bar-container">
                <div class="prediction-bar"></div>
            </div>
            <div class="prediction-number">9</div>
        </div>
    </div>
</div>
```

Và đừng quên style css nữa nhé. Các bạn có thể export riêng ra một file css riêng cho tiện. 

```python 
<head>
    <link rel="stylesheet" href="style.css"/>
</head>
```

Nội dung của file style.css các bạn tham khảo trong source code 

Chạy lại chúng ta thu được giao diện như sau 

![](https://images.viblo.asia/361288fd-3701-4019-a122-d6d5f9a2d563.png)

Giờ chúng ta sẽ tiền hành code các xử lý chính 

## Code xử lý chính 

```js 
<script>
const CANVAS_SIZE = 280;
const CANVAS_SCALE = 0.5;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.getElementById("clear-button");

let isMouseDown = false;
let hasIntroText = true;
let lastX = 0;
let lastY = 0;

// Load our model.
const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel("./onnx_model.onnx");

async function updatePredictions() {
  // Get the predictions for the canvas data.
  const imgData = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  const input = new onnx.Tensor(new Float32Array(imgData.data), "float32");

  const outputMap = await sess.run([input]);
  const outputTensor = outputMap.values().next().value;
  const predictions = outputTensor.data;
  const maxPrediction = Math.max(...predictions);

  for (let i = 0; i < predictions.length; i++) {
    const element = document.getElementById(`prediction-${i}`);
    element.children[0].children[0].style.height = `${predictions[i] * 100}%`;
    element.className =
      predictions[i] === maxPrediction
        ? "prediction-col top-prediction"
        : "prediction-col";
  }
}

loadingModelPromise.then(() => {
  canvas.addEventListener("mousedown", canvasMouseDown);
  canvas.addEventListener("mousemove", canvasMouseMove);
  document.body.addEventListener("mouseup", bodyMouseUp);
  document.body.addEventListener("mouseout", bodyMouseOut);
  clearButton.addEventListener("mousedown", clearCanvas);

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.fillText("Draw a number here!", CANVAS_SIZE / 2, CANVAS_SIZE / 2);
})
</script>
```
Các xử lý về thao tác vẽ canvas chúng ta sẽ không bàn đến tại đây. Chúng ta sẽ tập trung vào hàm `updatePredictions()`. Hàm này sẽ thực hiện lấy dữ liệu từ canvas mỗi khi có thao tác vẽ một đường mới trên canvas. Hàm này thực hiện lấy hình ảnh từ canvas hiện tại và đưa vào mô hình để dự đoán. Sau đó cập nhật kết quả vào phần view. Chúng ta thử chạy mô hình xem sao 

![](https://images.viblo.asia/be91182c-f7ab-45cf-8cf4-e7e709d11368.png)

Đã có lỗi xuất hiện. Do đầu vào ở canvas không tương thích với model chúng ta đã export ra. Vậy chúng ta sẽ cần tính chỉnh lại mô hình ở phần code PyTorch một lần nữa. 

## Chỉnh lại model lần nữa 
Để ý thấy đầu vào của mô hình đang là ảnh thu được từ canvas với kích thước 280*280*4 với 4 channel.  Mà đầu vào đang là 1 channel với kích thước 28*28. Chúng ta sẽ tiến hành chỉnh sửa trong hàm forward của **InferenceNet** với các dòng như sau 

```python 
def forward(self, x):
    x = x.reshape(280, 280, 4)
    x = torch.narrow(x, dim=2, start=3, length=1)
    x = x.reshape(1, 1, 280, 280)
    x = F.avg_pool2d(x, 10, stride=10)
    x = x / 255
    x = (x - MEAN) / STANDARD_DEVIATION

    x = F.relu(F.max_pool2d(self.conv1(x), 2))
    x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
    x = x.view(-1, 320)
    x = F.relu(self.fc1(x))
    x = F.dropout(x, training=self.training)
    x = self.fc2(x)
    return F.softmax(x)
```

Sau đó chúng ta tiến hành export lại nhưng nhờ phải thay đổi input đầu vào 

```python 
model = InferenceNet()
model.load_state_dict(torch.load('pytorch_model.pt'))
dummy_input = torch.zeros(280*280*4)
torch.onnx.export(model, dummy_input, 'onnx_model.onnx', verbose=True)
```
# Chạy thử demo 
sau khi đã có mô hình chúng ta tiến hành refesh lại trang web lúc này không còn thấy lỗi nữa. Các bạn có thể test thử giống demo sau 

![](https://images.viblo.asia/adadcce1-ef54-4c57-9116-3226b5da7a21.gif)

# Source code 
Source code của bài viết được cung cấp tại [đây](https://github.com/toanpv-0639/mnist_onnx_js) 
# Kết luận

như vậy chúng ta đã cùng nhau thử nghiệm việc convert mô hình PyTorch sang ONNX.js. Hi vọng bài viết này sẽ giúp các bạn hiểu hơn về cách thức hoạt động, lợi ích cũng như nhược điểm của các phương pháp deploy mô hình dưới client. Hẹn gặp lại các bạn trong các bài viết tiếp theo.