# Giới thiệu
Nếu đã từng train model Deep Learning, bạn sẽ thường phải thực hiện các bước sau:

* Load dataset, split ra thành bộ train/validation/test
* Load model, config hyperparameters
* Train model
* Plot biểu đồ loss và accuracy trong quá trình train (có thể có hoặc không)

Trong bài viết này, mình muốn giới thiệu đến các bạn TorchStudio, một "IDE" dành cho PyTorch. Thay vì phải tốn thời gian ngồi code các bước trên, TorchStudio có thể giúp cho các bạn nhanh chóng setup để train model chỉ với vài cú click chuột, thậm chí là không phải gõ một dòng code nào. Nó sẽ thay bạn setup các module có sẵn trong phần mềm. Còn với những module không có sẵn, TorchStudio cũng sẽ cho phép bạn tự code để thêm vào như các extension mở rộng.

*Note: Hiện tại, do phần mềm còn khá mới, vẫn đang trong bản beta nên có thể có nhiều chức năng chưa được hoàn thiện.*

# 1. Cài đặt
Bạn có thể tải TorchStudio tại [đây](https://torchstudio.ai/download/). Sau khi cài đặt xong, TorchStudio sẽ hỏi bạn muốn cài environment mới hay chọn cái có sẵn. Do phần mềm đang trong bản beta nên chức năng chọn environment đã có sẵn đang bị lỗi, tạm thời chưa dùng được. Vì thế, bạn hãy chịu khó để phần mềm cài environment mới từ đầu để tránh bị lỗi.

![install.jpg](https://images.viblo.asia/29675572-9284-49f9-8011-18acc68296ad.jpg)

Sau khi cài đặt xong, giao diện của TorchStudio sẽ xuất hiện như sau:

![image.png](https://images.viblo.asia/f4bb75ef-e1f7-4aa3-a80f-3f6b53c1f69f.png)

# 2. Chọn dataset
Ở bước này, ta sẽ chọn dataset dùng để train model, đồng thời config các tham số dùng cho dataset.

TorchStudio cho phép chọn các dataset của `torchvision` và viết thêm code nếu muốn augment dataset ở 2 mục `transform` và `target_transform`. Ngoài ra, bạn cũng có thể chọn `Custom Dataset` để tự code dataset nếu như trong `torchvision` không có hoặc muốn chạy với bộ dataset riêng. Khi đó, cột Definition sẽ cung cấp sẵn một template để bạn có thể tự code dataset của mình. Sau khi cài đặt xong, ta chỉ cần bấm Load (Ctrl + L) để phần mềm tự load dataset. Ở đây, mình sẽ lấy bộ MNIST làm ví dụ.

Ở cột giữa, TorchStudio cho bạn lựa chọn số lượng dữ liệu sẽ được sử dụng để train model, và cách chia bao nhiêu % cho việc training và validation, bật shuffling hay không. Ngoài ra, TorchStudio còn cho phép bạn lướt qua từng cặp input-label, và phân tích bộ dataset theo 3 kiểu: Multilabel, ValuesDistribution (phân bố dữ liệu) và Multiclass. Ví dụ, với Multiclass:

![image.png](https://images.viblo.asia/ea0ef5c6-6fac-462e-95d2-d38cd3f38f30.png)

ValuesDistribution của bộ MNIST:

![Untitled.jpg](https://images.viblo.asia/9bd86746-bd4b-4a9a-a585-285040c3f350.jpg)

# 3. Chọn model và train
Sau khi xong phần dataset, bạn hãy bấm nút New Model (có hình dấu cộng trong hình lục giác) ở bên phải tab Dataset để thêm tạo một model mới. Bạn có thể tạo thêm nhiều model bằng cách bấm nút đó.

Ở bước này, ta sẽ chọn một model để train. TorchStudio có cung cấp vài model mẫu và cũng cho phép bạn chọn các model có sẵn của `torchvision`. Tương tự với Dataset, bạn có thể chọn Custom Model để tự code model của mình. Tuỳ vào model bạn chọn, TorchStudio sẽ cho phép bạn config model theo các tham số khác nhau. Ở đây, mình sẽ dùng model `MNISTClassifier` của `torchstudio.models` làm ví dụ. Sau khi chọn xong model, hãy nhấn Build (Ctrl+B) để `torchstudio` tự khởi tạo model.

![image.png](https://images.viblo.asia/9846a79c-5c53-4aec-b531-5c86ec2e6e5b.png)

Khi load xong model, phần mềm sẽ visualize kiến trúc của model trong cột Graph (khá là giống với việc visualize bằng [Netron](https://netron.app/)). Cột Hyperparameters sẽ cho phép chúng ta cài đặt các siêu tham số dùng trong quá trình training như Loss, Metric, Optimizer, Scheduler, Batch Size và training epoch. Với các loss, metric, optimizer và scheduler, TorchStudio cũng cho phép ta tuỳ chỉnh từng thành phần riêng của chúng như learning rate, decay, etc. Dưới các dòng này, bạn có thể chọn một ảnh sample nhất định để theo dõi output của model đối với sample đó trong quá trình training theo từng epoch. Bên phải là bảng metric và loss cũng sẽ được update trong quá trình training. Sau khi chọn xong hyperparameters, ta chỉ cần bấm Train để TorchStudio tự train model.

Kết quả sau khi train xong, model đã nhận diện được chính xác số 4 ở bên trên:

![image.png](https://images.viblo.asia/617d2663-3144-4214-9d5b-784681829edb.png)

Nếu bạn train nhiều model, TorchStudio cũng sẽ cho phép bạn so sánh performance của các model. Ví dụ, sau khi train 3 model, bạn hãy bấm nút Dashboard ở góc phải trên cùng. TorchStudio sẽ tự động vẽ biểu đồ so sánh loss và metric cho bạn như dưới đây:

![Untitledaa.jpg](https://images.viblo.asia/60dee6a2-cdb5-48ff-9ca5-445e334363ae.jpg)

Sau khi train xong, ta có thể export model ra dưới dạng TorchScript hoặc ONNX nếu muốn.

Như vậy, trong hình trên, mình đã train được không những một mà đến 3 model (accuracy vẫn hơi thấp do mình chỉ dùng 10% dataset train cho nhanh) mà không cần phải gõ tí dòng code nào. Tiện hơn nữa, TorchStudio cũng tự lo phần biểu đồ về loss và accuracy hộ các bạn để các bạn có thể theo dõi trong lúc và sau khi training và so sánh các model với nhau.