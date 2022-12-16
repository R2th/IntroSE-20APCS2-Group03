Đây là một bài trong series [Báo khoa học trong vòng 5 phút](https://viblo.asia/s/bao-khoa-hoc-trong-vong-5-phut-rLZDX4YnZk0).

## Nguồn
Được viết bởi Chen *et. al*, đại học Bắc Kinh. Được đăng ở ICCV '19.<br>
https://openaccess.thecvf.com/content_ICCV_2019/papers/Chen_Data-Free_Learning_of_Student_Networks_ICCV_2019_paper.pdf

## Ý tưởng chính

Như với Knowledge Distillation truyền thống thì chúng ta sẽ train với data trong domain với label từ mô hình dạy (teacher model), tuy nhiên trong trường hợp chúng ta không có data thì phải làm gì? Tự sinh ra data bằng GAN. Cụ thể, quá trình training này, tên gọi là Data-Free Learning (DAFL - mình cũng không biết chữ A từ đâu ra) gồm 2 bước: sinh data và huấn luyện model.

### Sinh data

Nếu chỉ đơn giản sinh data từ GAN thì các data đó sẽ không đại diện được tính chất của bài toán (giống như kiểu nhìn ảnh random đoán ra random thì không có ý nghĩa gì cả). Vì vậy, chúng ta phải sử dụng một số hàm loss để data sinh ra có ý nghĩa. Gọi GAN generator là G, chúng ta có các yêu cầu sau:
- Data sinh ra phải thuộc 1 class nào đó: đặt $t^i=\argmax_j(y_T^i)$ là label one-hot được sinh ra từ xác suất đầu ra của mô hình bố, chúng ta ép các xác suất đó về gần one-hot nhất có thể với **one-hot loss**, sử dụng hàm cross-entropy:

$$
\mathcal{L}_\mathrm{oh}=\frac{1}{n}\sum_i\mathcal{H}_\mathrm{cross}(y_T^i, t^i)
$$

- Với các data trong domain, mô hình đã học xong phải cho chúng ta các đặc tính có ý nghĩa &mdash; điều này tương ứng với hidden feature vector phải có các giá trị sau kích hoạt lớn. Chúng ta áp dụng yêu cầu đó với lớp feature cuối cùng ngay trước phần fully-connected:

$$
\mathcal{L}_a=-\frac{1}{n}\sum_i\Vert f_i^T\Vert_1.
$$

- Data trong domain sinh ra ngẫu nhiên cần có một distribution ngẫu nhiên. Cụ thể với ví dụ MNIST, các data được sinh ra phải có 1/10 là số 0, 1/10 là số 1, vân vân. Yêu cầu đó được biểu diễn bằng information entropy loss:

$$
\mathcal{L}_\mathrm{ie}=-\mathcal{H}_\mathrm{info}(\frac{1}{n}\sum_iy_T^i),
$$

với công thức information entropy là

$$
\mathcal{H}_\mathrm{info}=-\frac{1}{k}\sum_ip_i\log(p_i).
$$

Từ đó chúng ta cộng tổng các hàm loss trên với các hệ số regularization để có được hàm loss tổng cần tối ưu:

$$
\mathcal{L}_\mathrm{total}=\mathcal{L}_\mathrm{oh}+\alpha\mathcal{L}_\mathrm{a}+\beta\mathcal{L}_\mathrm{ie},
$$
trong đó tác giả chọn $\alpha=0.1$ và $\beta=5$ theo kết quả mô hình trên validation set.

### Huấn luyện model
Phần này thì giống với Knowledge Distillation cơ bản: sử dụng data đã được sinh ra và huấn luyện như bình thường sao cho đầu ra của mô hình con giống với đầu ra của mô hình bố: cụ thể, với $y_T^i$ là xác suất đầu ra của mô hình bố với điểm data $i$, và $y_S^i$ là xác suất đầu ra của mô hình con, chúng ta tối thiểu hóa độ khác nhau của 2 phân bố đó với hàm loss cross-entropy (hay [phân kỳ Kullback-Leibler](https://vi.wikipedia.org/wiki/Ph%C3%A2n_k%E1%BB%B3_Kullback%E2%80%93Leibler)):

$$
\mathcal{L}_\mathrm{KD}=\frac{1}{n}\sum_i\mathcal{H}_\mathrm{cross}(y_S^i, y_T^i).
$$

---

Ngoài ra, tác giả còn thí nghiệm với các mô hình với độ phức tạp khác nhau (Hinton-MLP, LeNet, AlexNet, ResNet) và các dataset có độ phức tạp khác nhau (MNIST/USPS, CIFAR-10/100, CelebA). Kết quả tóm tắt là tất cả các thí nghiệm đều ra kết quả như sau với chênh lệch không quá lớn:

**Data-Free** (phương pháp của tác giả) **< Normal Training** (dạy mô hình học sinh với data gốc) **< Knowledge Distillation** (dạy mô hình học sinh với data gốc nhưng label của giáo viên).

## Điểm cộng
- Không cần có data trong quá trình distillation
- Kết quả sát với tối ưu
- Ý tưởng khá đơn giản và dễ hiểu

## Điểm trừ
- Tối đa hóa giá trị sau kích hoạt của feature map cuối không nhất thiết sẽ tạo ra ví dụ gần với ví dụ thật, do cho dù ví dụ thật có giá trị đó cao hơn random, sẽ có những ví dụ khác (non-random) cho giá trị đó còn cao hơn (tương tự với adversarially-crafted images)

## Bình luận
Hiện team mình có đang nghiên cứu topic này và độc lập ra được ý tưởng này, tuy nhiên sau khi @QuangPH survey ra paper này thì ngay lập tức nó không còn là contribution mới nữa :(

Có lẽ lý do khi Knowledge Distillation cho kết quả cao hơn là bởi tác động của randomness và soft label theo teacher, bởi việc làm giảm độ tự tin của mô hình đồng thời sẽ làm giảm độ overfit của mạng (mọi người có thể tìm hiểu thêm về label smoothing trong cuốn gối đầu giường Deep Learning của Ian Goodfellow và [độ hiệu quả của nó](http://papers.nips.cc/paper/8717-when-does-label-smoothing-help.pdf)).

One-hot loss có thể được thay đổi bằng $l_1$ loss, do nó làm tăng độ thưa của vector. Với xác suất đầu ra có tổng bằng 1, tối đa hóa $l_1$-norm trên cả vector đó sẽ hướng tới một vector one-hot. Chúng ta cũng có thể sử dụng $l_2$ cho việc này, tuy nhiên $l_1$ sẽ nhanh hơn.

Information entropy loss hiện đang được sử dụng với vector trung bình các xác suất đầu ra của data được sinh ra. Chúng ta có thể thay đổi hàm loss này bằng trung bình của các information entropy của các data đó:

$$
\mathcal{L}_\mathrm{ie}=-\frac{1}{n}\sum_i\mathcal{H}_\mathrm{info}(y_T^i).
$$

Hàm loss mới này sẽ làm tăng entropy của *từng* điểm dữ liệu một cách độc lập thay vì trên cả dataset. Tuy nhiên với one-hot loss thì tính chất của 2 công thức sẽ tương tự nhau. Chúng ta có thể thử cả 2 để xem cái nào tốt hơn, do công thức mới này sẽ nhanh hơn (có thể tính toán theo batch hàm loga, nhân, và tổng).

Ngoài ra, tác giả sử dụng kỹ thuật activation loss $\mathcal{L}_a$ để tăng hiệu năng học cho mô hình. Đây là một đặc tính có *tương quan* tới hiệu năng được kiểm nghiệm qua thí nghiệm, thay vì *trực tiếp ảnh hưởng*, nên có thể không phải là một cách áp dụng tối ưu. Cụ thể, tác giả đang maximize độ lớn của các giá trị trong hidden representation ngay trước lớp fully-connected. Khi sinh ra các data nhân tạo, chúng có thể trở thành các adversarial example làm cho các giá trị hidden feature trở nên lớn nhưng không làm tăng ý nghĩa của data (không biểu diễn được các tính chất của bộ dữ liệu). Tuy nhiên, với một lựa chọn regularization coefficient hợp lý, hiện tượng này có thể được khắc phục một chút.

Ngoài ra, nếu tìm ra các đặc tính cụ thể khác có liên quan tới độ hiệu quả của mô hình, chúng ta có thể sử dụng chúng làm training heuristics tương tự với khi tác giả sử dụng activation loss.

## Hết.
Hãy like subscribe và comment vì nó miễn phí?