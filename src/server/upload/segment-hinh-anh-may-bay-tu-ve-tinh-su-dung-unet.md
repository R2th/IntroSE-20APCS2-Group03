![](https://i.ibb.co/5YWX7JR/Chicago-Airport-0-0-910-10071-output.png)

# Giới thiệu qua mô hình Unet

Image segmentation (phân đoạn cho hình ảnh) là 1 bài toán trong lĩnh vực Computer Vision (thị giác máy tính). Đó là 1 bài toán nâng cao hơn Object Detection, không chỉ đi tìm "bounding box" bao quanh vật thể nữa, mà còn tìm 1 đường viền tốt hơn để bao sát vào vật thể. Lúc này, việc gán nhãn đã phải chi tiết tới từng pixel.

Trước kia, người ta thường dùng các phương pháp cổ điển trước khi các mô hình deep learning ra đời. Các phương pháp này chủ yếu là những phương pháp học không giám sát. Chúng không cần phải xác định trước nhãn cho từng pixel. Nhược điểm của các phương pháp này thường không xử lý được ở các ảnh ngẫu nhiên, cũng như việc không thể xác định được cụ thể các nhãn cần segment. Một số phương pháp cổ điển có thể kể ra như: Dùng binary threshold, k-mean clustering, Mean shift Clustering, ...

Năm 2012, tác giả Olaf Ronneberger và các cộng sự đến từ Đại học Freiburg - Đức đã đề xuất 1 mô hình để phân vùng cấu trúc neural thần kinh trong não người. Kiến trúc này đã giành ngay chiến thắng trong cuộc thi EM segmentation challenge at ISBI cùng năm.

![](https://imgur.com/lKZGO0C.png)

Trên đây là hình ảnh mô hình Unet được dùng trong bài báo của tác giả. Mỗi thanh hình chữ nhật màu xanh dương là 1 feature map gồm nhiều channels. Số liệu góc dưới trái là kích thước witdth x height, số liệu ngay phía trên là số channels của feature map đó. Mỗi 1 thanh trắng hình chữ nhật bên phía phải chữ U được lấy từ thanh xanh dương phía đối diện, và được biến đổi để concatenate với thanh xanh dương bên phía phải. Mỗi 1 loại mũi tên có màu sắc khác nhau sẽ có cách biến đổi khác nhau.

Dễ thấy, kiến trúc Unet có 2 phía, phía phải và phía trái của chữ U, tương ứng với 2 phần constraction và expansion:

- Phía trái: Trích lọc đặc trưng, có vai trò như 1 encoder. Vì chiều dài và chiều rộng các layer giảm dần nên được gọi là phần 'co lại'.
- Phía phải: Gồm các layer đối xứng với phía trái, gồm nhiều quá trình Upsampling. Hiểu đơn giản thì Upsampling là biến đổi ngược của Convulation, trả về 1 feature map có chiều lớn hơn input đầu vào (ngược lại thì Convulation cho ra 1 feature map có chiều nhỏ hơn input). Upsampling có thể được thực hiện bằng nhiều phương pháp như: Tích chập chuyển vị (Transposed convulation), tích chập dãn nở (Dilation Convolution)

Kiến trúc Unet mặc dù có độ chính xác khá cao nhưng tốc độ lại chậm. Với input kích thước 572x572 thì cho ra tốc độ 5 fps theo bài báo của tác giả. Do đó, nó thường được áp dụng cho các tác vụ không yêu cầu realtime. Đặc biệt, Unet rất dễ implement

# Dùng Unet để segment hình ảnh máy bay

## Dataset

Bộ dữ liệu mình sử dụng là Rareplanes được tạo và phát triển bởi [CosmiQ](https://www.cosmiqworks.org/)

Đây là bộ dữ liệu phục vụ cho các bài toán thị giác máy tính, nhằm phát hiện máy bay và các thuộc tính của máy bay từ ảnh vệ tinh. Tập dữ liệu gồm ~600 ảnh từ vệ tinh WordView-3 trải dài ở 200 địa điểm thuộc 31 quốc gia. Bao gồm 30000 máy bay được annotate thủ công và 9 thuộc tính của nó: Chiều dài, sải cánh, ... Trong đó, tập dữ liệu tổng hợp được tạo ra từ nền tảng [AI.Reverie](https://aireverie.com/) của công ty [IQT](https://www.iqt.org/portfolio/) với hơn 46000 hình ảnh.

Chi tiết về bộ dữ liệu và cách tải bộ dự liệu mọi người có thể tham khảo ở đây: https://www.cosmiqworks.org/rareplanes-public-user-guide/

Mình chỉ sử dụng dữ liệu để segment nên mình chỉ dùng dữ liệu trong folder `synthetic`, folder này chứa mask được gán nhãn tới từng pixel. Cả folder này quá lớn (~211GB) nên mình chỉ sử dụng folder test (~23GB) trong đó để làm dữ liệu train và validate luôn. Tải cả thư mục `synthetic/test`:
```
aws s3 cp --recursive s3://rareplanes-public/synthetic/test .
```

Thư mục tải xuống gồm 3 thư mục con `images`, `masks`, `xmls`, mỗi thư mục chứa 5000 files. Bên dưới là 1 ảnh và mask của nó

![](https://i.ibb.co/yBC3FtY/Hong-Kong-Airport-0-0-219-16639.png)
![](https://i.ibb.co/HXDG6Mf/Hong-Kong-Airport-0-0-219-16639-mask.png)

File xml chứa bounding box và màu sắc của từng object máy bay trong file mask tương ứng.

Nhãn segment của mình chỉ chứa 2 class là máy bay và nền, nên mình sẽ kết hợp cả mask và xml để có định dạng target giống như kiến trúc Unet yêu cầu.

## Training

Code implement mình có để [ở đây](https://github.com/chungpv-1008/unet-planes).

Training với:

```python train.py --epoch 5 --batch-size 1 --scale 0.5 --validation 10```

Mọi người có thể chỉnh các đối số cho phù hợp hơn. Đối số validation là số phần trăm bộ dữ liệu dùng để validate, ở đây mình chia bộ dữ liệu train:val = 0.9:0.1. Với đối số `scale` mình có thể set bằng 1 để chính xác hơn nhưng tốn nhiều bộ nhớ hơn.

Hàm loss bằng tổng cross entropy và [dice_loss](https://medium.com/ai-salon/understanding-dice-loss-for-crisp-boundary-detection-bb30c2e5f62b#:~:text=Dice%20loss%20originates%20from%20S%C3%B8rensen,between%20two%20samples%20%5BWikipedia%5D.&text=3%20from%20the%20perspective%20of,of%20overlap%20between%20two%20sets.). Hiểu đơn giản dice_loss như sau:

- Đầu vào gồm: `predict`, `target`, `epsilon`. `predict` và `target` đều có shape = `(batch_size, n_classes, h, w)` và `target` như 1 vector one-hot.
- Duyệt qua mỗi phần tử (ứng với 1 ảnh) predict để tính độ khớp nhau. Sau khi có tổng độ khớp nhau thì lấy 1 trừ đi.
- Cách tính độ khớp khá dễ hiểu. Bằng trung bình độ khớp trên tất cả class. Độ khớp trên mỗi class bằng:
```
(2 * dot_product(predict, target) + epsilon) / (sum(predict) + sum(target) + epsilon) 
```
- Đối số epsilon để cả tử và mẫu khác 0.

Sau 5 epochs thì mình thu được độ chính xác là 87% trên tập validate

![](https://i.ibb.co/ZKQ3sNk/Screenshot-from-2021-09-05-02-03-29.png)

Cuối mỗi epoch mình lưu file weight vào folder `checkpoints`

## Predict

Để dự đoán 1 file ảnh, mình chỉ cần chạy lệnh sau:
```
python predict.py --model checkpoints/weight.pth --input ./images/demo.png
```

Mình được kết quả ảnh ban đầu và ảnh predict như sau:

![](https://i.ibb.co/pRHBBxJ/Chicago-Airport-0-0-910-10071.png)

![](https://i.ibb.co/5YWX7JR/Chicago-Airport-0-0-910-10071-output.png)

# Tham khảo
https://arxiv.org/abs/1505.04597

https://github.com/milesial/Pytorch-UNet

https://viblo.asia/p/u-net-kien-truc-manh-me-cho-segmentation-1Je5Em905nL

https://medium.com/the-downlinq/rareplanes-an-introduction-b28449222ca4

https://medium.com/the-downlinq/rareplanes-training-our-baselines-and-initial-results-2d9a4d10833e

[Understanding Dice Loss for Crisp Boundary Detection
](https://medium.com/ai-salon/understanding-dice-loss-for-crisp-boundary-detection-bb30c2e5f62b#:~:text=Dice%20loss%20originates%20from%20S%C3%B8rensen,between%20two%20samples%20%5BWikipedia%5D.&text=3%20from%20the%20perspective%20of,of%20overlap%20between%20two%20sets.)