Xin chào các bạn, cũng lâu rồi mình mới quay trở lại ngồi viết mấy bài chia sẻ trên viblo. Chẹp, dạo này làm remote nên lười vận động, lười cả viết bài hẳn. Tuy nhiên thì sau bài này mình cũng sẽ cố ra thêm 2 bài nữa để hưởng ứng May Fest với mọi người cho xôm nào :D 

Âu kây, quay trở lại với chủ đề  của bài viết hôm nay, mình muốn chia sẻ về 1 thứ gì đó mới mẻ hơn 1 chút, dù sao thì lí thuyết, thuật toán cũng nhiều rồi. => **Chia sẻ về tips và trick**

**Note**: Thanks bạn Tiến Tỉnh Táo vì những góp ý để hoàn thiện nội  dung bài viết

![imgur](https://i.imgur.com/acqlGRA.jpg)

Thông thường thì những người đọc blog của mình đều là những người có hứng thú, đã và đang làm việc với các mô hình Deep Learning, Machine Learning. Các lí thuyết về toán, xác xuất thống kê, hướng giảm đạo hàm (gradient descent), ... thì hầu như mọi người đều đã nắm vững. 

Có thể tạm coi như mọi người đã có sẵn một thuật toán đủ tốt, đủ tối ưu (trên lí thuyết), nhưng việc triển khai (implement) thuật toán ấy ra code đôi khi không thật sự diễn ra suôn sẻ như chúng ta mong muốn, đặc biệt là với những bạn có phần cứng xử lí thấp (laptop, google colab, ...), thì **Out of memory** là vẫn đề thường xuyên xảy ra.

Hôm nay, mình sẽ chia sẻ một số tips và trick hay, khi các bạn sử dụng Pytorch để huấn luyện mô hình của mình, kể cả khi có phần cứng không đủ mạnh.
# Đặt vấn đề
Để bắt đầu, mình sẽ nêu ra ở đây một bài toán kinh điển mà đảm bảo bất cứ ai ở đây cũng đều nghe qua và thực hiện ít nhất 1 lần: "**Nhận dạng chữ số viết tay với bộ dữ liệu MNIST**". 

![imgur](https://i.imgur.com/nNO5usN.png)

Ở đây, mình sử dụng một mạng CNN đơn giản gồm 2 lớp tích chập (convolution layer) và 2 lớp kết nối đầy đủ (fully connected layer) với optimizer là Adadelta và hàm mất mát là Negative Log Likelihood Loss ([NLLLoss](https://pytorch.org/docs/stable/generated/torch.nn.NLLLoss.html))

```python
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.dropout1 = nn.Dropout(0.25)
        self.dropout2 = nn.Dropout(0.5)
        self.fc1 = nn.Linear(9216, 64)
        self.fc2 = nn.Linear(64, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = F.relu(x)
        x = self.conv2(x)
        x = F.relu(x)
        x = F.max_pool2d(x, 2)
        x = self.dropout1(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = F.relu(x)
        x = self.dropout2(x)
        x = self.fc2(x)
        output = F.log_softmax(x, dim=1)
        return output
```

Hàm training sử dụng đoạn code dưới đây (cho 1 epoch): 
```python
def train_normal(model, device, train_loader, val_loader, optimizer, epoch):
    train_loss = []
    train_acc = []
    model.train()
    for (data, target) in train_loader:
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = F.nll_loss(output, target)
        acc = accuracy(output, target)
        train_loss.append(loss)
        train_acc.append(acc)
        loss.backward()
        optimizer.step()

    val_loss = []
    val_acc = []
    model.eval()
    for (data, target) in val_loader:
        data, target = data.to(device), target.to(device)
        output = model(data)
        loss = F.nll_loss(output, target)
        acc = accuracy(output, target)
        val_loss.append(loss)
        val_acc.append(acc)
    
    result = dict()
    result['train_loss'] = torch.stack(train_loss).mean()
    result['train_acc'] = torch.stack(train_acc).mean()
    result['val_loss'] = torch.stack(val_loss).mean()
    result['val_acc'] = torch.stack(val_acc).mean()

    print("Epoch [{}], train_loss: {:.4f}, train_acc: {:.4f}, val_loss: {:.4f}, val_acc: {:.4f}".format(
        epoch, result['train_loss'], result['train_acc'], result['val_loss'], result['val_acc']))
    return result
```
Điểm qua thì model này cũng chỉ có khoảng 609,354 tham số, nếu lưu lại weights thì cũng chỉ khoảng 2MB, quá nhẹ và nhỏ gọn cho 1 mô hình deep learning thông thường.

Tạm bỏ qua tất cả các lí thuyết về neural network hay CNN, optimizer, ... gì đó ở đây, chúng ta sẽ cùng bàn luận một vài câu hỏi khác như sau (các bạn có nhiều phút để suy nghĩ và trả lời :D): 
* Đoạn code training kia **có sai logic không**? Nếu không, thì **có thể hoạt động được** khi train trên colab chứ? (RAM 12.69GB và Disk 68.40 GB)
* Hãy **chỉ ra những phần trong đoạn code có thể tối ưu hơn** nữa.
# 1. Tối ưu DataLoader
Trước khi quay ra trả lời câu hỏi, chúng ta sẽ bàn 1 chút về DataLoader của Pytorch. 

DataLoader là được module được Pytorch xây dựng nhằm hỗ trợ load và xử lí theo batch, kèm rất nhiều các tham số (parameter) khác nhau:
```python
def __init__(self, dataset: Dataset[T_co], batch_size: Optional[int] = 1,
     shuffle: bool = False, sampler: Optional[Sampler[int]] = None,
     batch_sampler: Optional[Sampler[Sequence[int]]] = None,
     num_workers: int = 0, collate_fn: Optional[_collate_fn_t] = None,
     pin_memory: bool = False, drop_last: bool = False,
     timeout: float = 0, worker_init_fn: Optional[_worker_init_fn_t] = None,
     multiprocessing_context=None, generator=None,
     *, prefetch_factor: int = 2,
     persistent_workers: bool = False)
```

Việc một mô hình xử lí nhanh hay chậm phụ thuộc tương đối lớn vào quá trình load dữ liệu để truyền vào trong mạng. Do đó, việc sử dụng DataLoader một cách hiệu quả quyết định rất nhiều đến tốc độ của mô hình. 

Dưới đây là 1 số tips với loader mà bạn có thể sử dụng
* **num_workers** (default = 0): Thay đối tham số num workers cho phép xử lí song song nhiều dữ liệu cùng một lúc. Trong lúc GPU đang bận train, CPU sẽ dành ra "num_workers" threads để cùng nhau load data cho 1 batch tiếp theo. Điều này giúp **giảm thời gian xử lí** xuống đáng kể 
* **batch_size** (default = 1): Batch size ảnh hưởng đến chất lượng học của mô hình, batch size càng lớn thì mô hình sẽ càng học được tốt hơn. Do đó, 1 tips ở đây là, **trong lần đầu training, hay tăng batch size lên lớn nhất có thể, cho đến khi RAM không load nổi nữa, lúc đó hãy giảm dần batch size hoặc tìm các phương pháp tối ưu bộ nhớ khác.**

![imgur](https://i.imgur.com/4hi6oxf.jpg)

Với đoạn code train_normal bên trên, mình đã thử thay đối bacth size cũng như num worker khác nhau, nhưng kết quả thì vẫn nhận được là **Out of Memory**
```python
torch.utils.data.DataLoader(train_set, batch_size=32, num_workers=4, shuffle=True)
```
Dưới đây là một tips và trick để xử lí vấn đề này trong Pytorch.
# 2. Sử dụng 16-bit precision
![imgur](https://i.imgur.com/GSVLgUp.png)

Thông thường, khi không đề cập gì, pytorch sẽ **mặc định đưa các tensor, ... về kiểu 32-bit precision** để tính toán loss và weights. Điều này dẫn đến việc máy tính phải sử dụng nhiều RAM hơn để lưu trữ, đôi khi khiến chúng ta phải giảm batchsize hoặc lựa chọn những mô hình ít tham số hơn để có thể training được. 

Tuy nhiên, hiện nay, cuda đã hỗ trợ kiểu **16-bit precision, giúp model giảm đi 1 nửa dung lượng lưu trữ,** cho phép xử lí batch size lớn hơn cũng như tăng tốc tính toán trong khi vẫn đảm bảo hiệu suất và độ chính xác của mô hình. 

Để sử dụng 16-bit precision, chúng ta có thể sử dụng thư viện [apex](https://github.com/NVIDIA/apex) hoặc sử dụng sẵn torch.cuda.amp đã được built-in trong pytorch (từ version 1.6 trở lên) - thứ mà được Pytorch khuyến khích sử dụng hơn.

Việc sử dụng torch.cuda.amp khá đơn giản với 2 module chính: **auto_cast** và **GradScaler**. Chúng ta sẽ tối ưu lại đoạn code ban đầu như sau:

**Note**: Đoạn code dưới đây mình sử dụng ví dụ mẫu được trình bày trong docs của Pytorch, bản chất là về Mixed precision (tức là kết hợp sử dụng cả 16 bit precion và 32 bit precision trong training). Trong trường hợp các bạn muốn sử dụng thuần 16 bit precision, các bạn có thể dụng thư viện apex với `model, optimizer = amp.initialize(model, optimizer, opt_level='02')`

```python
scaler = GradScaler()
optimizer.zero_grad()
for i, (data, target) in enumerate(train_loader):
    with autocast():
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = F.nll_loss(output, target)
        acc = accuracy(output, target)
    scaler.scale(loss).backward()
    scaler.step(optimizer)
    scaler.update()
    optimizer.zero_grad()
```
# 3. Accumulated Gradients - Sử dụng đạo hàm tích lũy
![imgur](https://i.imgur.com/XMgXgjx.png)

Như mình có nói qua ở trên, khi train 1 mô hình, để việc huấn luyện được hiệu quả, chúng ta cần cố gắng tăng tối đa kích thước của batch (batch size). Tuy nhiên, với 1 số dữ liệu nặng (như ảnh chất lượng cao, dung lượng lớn, ...) thì dù có sử dụng 16 bit precision cũng không thể giải quyết vấn đề liên quan đến batch size. Vậy hướng xử lí trong trường hợp này là gì? - **Accumulated Gradients**

Như chúng ta đã biết, việc học và cập nhật các trọng số của mô hình là qua 2 quá trình forward và backward để tính toán gradient. Trong pytorch, mặc dù chúng ta có thấy "loss.backward()", thế nhưng **model lại chỉ thực sự bắt đầu cập nhật (update) những giá trị đã backward này sau khi "optimizer.step()" được gọi.**

Đây chính là cơ sở cho tips Accumulated Gradients - sử dụng đạo hàm tích lũy. Hiểu 1 cách đơn giản là **thay vì mỗi batch, chúng ta sẽ update 1 lần thì chúng ta có thể đợi load n batch rồi mới update 1 lần** :D

Triển khai code đơn giản như sau: 
```python
scaler = GradScaler()
optimizer.zero_grad()
for i, (data, target) in enumerate(train_loader):
    with autocast():
        data, target = data.to(device), target.to(device)
        optimizer.zero_grad()
        output = model(data)
        loss = F.nll_loss(output, target)
        acc = accuracy(output, target)
    scaler.scale(loss).backward()
    
    # _iter là tham số quyết định sau bao nhiêu batch sẽ thực hiện backwasd 1 lần 
    if (i+1) % _iter == 0: 
        scaler.step(optimizer)
        scaler.update()
        optimizer.zero_grad()
```
# 4. Retained Graphs - Lưu trữ loss
Oke, nếu phía trên là các tips để xử lí các bug khách quan (do RAM, do dữ liệu, ...), thì bây giờ, mình sẽ nêu thêm 1 vấn đề chưa tối ưu trong đoạn code ở đầu bài, mà lỗi ở đây là lỗi do chủ quan (từ người code). Đó chính ra cách chúng ta lưu trữ loss hay accuracy.

Việc lưu trữ loss hay accuray, là một việc cần thiết khi bạn muốn vẽ 1 vài biểu đồ để quan sát quá trình training của mô hình. Ví dụ, như thế này: 

![imgur](https://i.imgur.com/q4CuxAf.jpg)

Thế nhưng hãy nhớ, việc tính toán trong pytorch là sử dụng tensor, do đó các giá trị loss hay accuracy **đều là các tensor** cả. Việc lưu nguyên những tensor này là một trong những nguyên nhân chính và quan trọng nhất khiến bạn gặp lỗi Out of Memory.

Sửa lỗi như nào? Rất đơn giản, hãy **biến các tensor thành float trước khi save lại**. Và thao tác này chỉ **đơn giản là thêm ".item()"**

```python
# Trước
result = dict()
result['train_loss'] = torch.stack(train_loss).mean()
result['train_acc'] = torch.stack(train_acc).mean()
result['val_loss'] = torch.stack(val_loss).mean()
result['val_acc'] = torch.stack(val_acc).mean()

# Sau
result = dict()
result['train_loss'] = torch.stack(train_loss).mean().item()
result['train_acc'] = torch.stack(train_acc).mean().item()
result['val_loss'] = torch.stack(val_loss).mean().item()
result['val_acc'] = torch.stack(val_acc).mean().item()
```
# 5. Đổi tên layer sau khi đã lưu weight
Phần này sẽ không giống như các phần mình đã trình bày phía trên, không phải là các tips trong quá trình training mà là tips sau khi bạn đã training xong và lưu lại weights thành công. Vậy, có vấn đề gì có thể xảy ra ở đây để cần phải có tip?

Câu trả lời là khi bạn **bất chợt muốn đổi tên layer**. Có thể các bạn đã biết, pytorch lưu trữ weights dưới dạng state dicts, cụ thể là tên layer và trọng số của nó. Khi load model, **chương trình sẽ tiến hành mapping giữa key của state dicts và tên layer để load trọng số tương ứng vào trong mô hình**. Vậy nếu chúng ta đã có weight của model cũ, nhưng đột nhiên lại muốn đổi tên layer mới hay hơn. Cách xử lí ở đây là gì? đổi tên xong train lại? 

```python
class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)  # ==> Muốn đổi lại thành self.embded_1
        self.conv2 = nn.Conv2d(32, 64, 3, 1)  # ==> Muốn đổi lại thành self.embded_2
        self.dropout1 = nn.Dropout(0.25)
        self.dropout2 = nn.Dropout(0.5)
        self.fc1 = nn.Linear(9216, 64)
        self.fc2 = nn.Linear(64, 10)

    def forward(self, x):
        x = self.conv1(x)  # ==> đổi thành x = self.embded_1(x)
        x = F.relu(x)
        x = self.conv2(x)  # ==> đổi thành x = self.embded_2(x)
        x = F.relu(x)
        x = F.max_pool2d(x, 2)
        x = self.dropout1(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = F.relu(x)
        x = self.dropout2(x)
        x = self.fc2(x)
        output = F.log_softmax(x, dim=1)
        return output
```

Dưới đây là cách các bạn có thể sử dụng để tạo ra 1 bộ weights mới phù hợp với model mới, dù không cần train lại. 

* Trước tiên, khai báo model cũ và load weight cũ
    ```python
    old_model = Net()
    old_model.load_state_dict('old_weights.pt')
    ```

* Khởi tạo 1 state dicts từ old state dicts và sửa lại tên layer tương ứng trong này
    ```python
    old_state_dict = old_model.state_dict()
    new_state_dict = copy.deepcopy(old_state_dict)
    for key in old_state_dict:
        if 'conv' in key:
            new_state_dict[key.replace('conv', 'embbed')] = new_state_dict.pop(key)
    ```

* Thay đổi tên layer cho model mới 
    ```python
    class Net(nn.Module):
        def __init__(self):
            super(Net, self).__init__()
            self.embded_1 = nn.Conv2d(1, 32, 3, 1)
            self.embded_2 = nn.Conv2d(32, 64, 3, 1)
            self.dropout1 = nn.Dropout(0.25)
            self.dropout2 = nn.Dropout(0.5)
            self.fc1 = nn.Linear(9216, 64)
            self.fc2 = nn.Linear(64, 10)

        def forward(self, x):
            x = self.embded_1(x)
            x = F.relu(x)
            x = self.embded_2(x)
            x = F.relu(x)
            x = F.max_pool2d(x, 2)
            x = self.dropout1(x)
            x = torch.flatten(x, 1)
            x = self.fc1(x)
            x = F.relu(x)
            x = self.dropout2(x)
            x = self.fc2(x)
            output = F.log_softmax(x, dim=1)
            return output
    ```

* Cuối cùng, khai báo model mới và load weights mới.
    ```python
    new_model = Net()
    new_model.load_state_dict(new_state_dict)
    torch.save(new_model.state_dict(), 'new_weights.pt')
    ```
# Kết luận
Done, phía trên là toàn bộ những gì mình muốn chia sẻ trong bài viết này. Hi vọng những tips và trick này có thể giúp phần nào cho các bạn. 

Nếu các bạn thấy bài viết hay và hữu ích, đừng quên **upvote**, **clip** và **share** bài viết này của mình. Hoặc nếu các bạn có những tip&trick hay khác, hãy **comment** dưới bài viết này đề chúng ta cùng thảo luận.

Full code demo cho phần này, mình để tại link Colab: https://colab.research.google.com/drive/1hsMtuApAY3Sr-NUnWYRtYqgbHCY4iBBs?usp=sharing

Hẹn gặp lại các bạn vào những bài viết gần nhất sắp tới :D