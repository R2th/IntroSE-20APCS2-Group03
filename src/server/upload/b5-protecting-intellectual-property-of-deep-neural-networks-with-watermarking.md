Đây là một bài trong series [Báo khoa học trong vòng 5 phút](https://viblo.asia/s/bao-khoa-hoc-trong-vong-5-phut-rLZDX4YnZk0).

## Nguồn
Được viết bởi Zhang *et. al*, IBM Research. Được đăng ở ASIACCS '18.<br>
https://gzs715.github.io/pubs/WATERMARK_ASIACCS18.pdf

## Ý tưởng chính
- Khi chứng minh quyền sở hữu, thường không có khả năng xem xét toàn bộ mô hình, bao gồm cấu trúc và trọng số cụ thể. Tác giả đề xuất việc tạo ra các đầu vào đặc biệt thử mô hình hộp đen để chứng minh.

![](https://www.researchgate.net/profile/Zhongshu_Gu2/publication/325480419/figure/fig6/AS:706288099016707@1545403613773/Workflow-of-DNN-watermarking.png)

- Sử dụng khả năng bắt các pattern của DNN để "cài" một luật đặc biệt với các dữ liệu có watermark: nếu mô hình nhận ra watermark sẽ đưa ra kết quả đặc biệt (khác với kết quả đúng)
- Tác giả đề xuất 3 loại watermark:
    - nhúng một watermark xác định trước (ví dụ: một chuỗi chữ cái hoặc in ẩn ảnh) vào dữ liệu có sẵn vào một class $C$, và dạy mô hình nhận các ảnh đã nhúng đó ra một class $C'$ khác.
    - dữ liệu không liên quan (ví dụ: dữ liệu MNIST cho một mô hình CIFAR), và dạy mô hình nhận các ảnh đó ra một class $C'$ xác định trước.
    - nhúng nhiễu từ một phân bố nào đó xác định trước vào dữ liệu có sẵn vào một class $C$, và dạy mô hình nhận các ảnh đã nhúng đó ra một class $C'$ khác.

![](https://images.viblo.asia/1fc4ffad-cfa9-4c50-bcb7-d7fab7242ff4.png)

## Điểm cộng
- Khó bị mất fingerprint kể cả nếu đối tượng sửa trọng số ít, bằng pruning hoặc fine-tuning.
- Có thể xác nhận sở hữu với các mô hình hộp đen: ví dụ, nếu đối tượng chỉ mở API.

## Điểm trừ
- Phải xác định trước việc fingerprint mô hình trước khi bắt đầu train.
- Không gỡ watermark được nếu cần.
- Chỉ có thể dùng với các mô hình phân lớp.

## Lỗ hổng
- Bài viết không thí nghiệm với pruning ***và*** fine-tuning.

Thực tế, sau khi prune thì các mô hình sẽ được dạy lại. Bài viết cho thấy, với mỗi loại watermark, mô hình chạy tốt sau khi prune **hoặc** sau khi fine-tune. Vì vậy, nếu dùng cả 2, hoàn toàn có thể mô hình sẽ nát.

- Bài viết đặt ra giả thiết rằng chi tiết cách watermark là bí mật, bao gồm các cài đặt về lớp cũ $C$ và $C'$, hoặc cách nhúng watermark.

Nếu vậy, để lấy được cách watermark, chỉ cần một lần chứng minh (ví dụ, để một bên nào đó tank một cái DMCA) là mô hình sẽ bị crack thoải mái.

- Bài viết không xem xét việc kẻ tấn công có thể lấy được lớp gốc $C$ và lớp mới $C'$ của dữ liệu có watermark nếu như chi tiết cách watermark được công bố

Kẻ tấn công có thể thêm watermark vào 10-100 ảnh của mỗi class, rồi thả qua mô hình và xem lớp nào có kết quả giống nhau nhiều nhất. Đồng thời, không chắc chắn rằng mô hình sẽ overfit với cả $C$ và watermark: có thể ảnh nào có watermark cũng sẽ đều về $C'$ không phụ thuộc vào $C$.

- Bài viết chưa nghiên cứu giả thiết việc kẻ tấn công có thể dạy mô hình học data có watermark quên đi pattern đó bằng fine-tuning, và dạy đúng các ảnh đó phân lớp thành $C$ thay vì $C'$.
- Bài viết giả thiết không thể tạo ra một discriminator.

Nếu kẻ tấn công có cách nhúng watermark, họ có thể tạo ra một discriminator dễ dàng. Từ đó, họ sẽ block các request có watermark nếu cần thiết, nếu họ không dạy lại được mô hình như ý trên thành công.

- Bài viết test quá ít ngoài MNIST (và quá ít với CIFAR)

MNIST cho kết quả **quá** tốt vì dữ liệu rất cơ bản, nên mô hình có khả năng học các feature khác tốt hơn (cụ thể là như pattern của watermark)

- Các thí nghiệm về model inversion làm không đúng quy trình

Không thực hiện đúng cách trực quan hoá các đầu vào của từng class: đúng ra phải bắt đầu từ đầu vào cỡ nhỏ, tối ưu hoá, và tăng cỡ dần — làm như vậy sẽ tránh được các adversarial pattern tần số cao (đọc [bài viết này của mình về CNN](https://viblo.asia/p/tai-sao-mang-tich-chap-lai-hoat-dong-hieu-qua-jvEla076Zkw) để tìm hiểu thêm)

## Bình luận
- Bài viết không thí nghiệm với dữ liệu 1D (ví dụ như audio), hoặc các loại/chiều dữ liệu khác, nên *có thể* chỉ hoạt động với dữ liệu ảnh.
- Bài viết giả thiết rằng các watermark khác với cái đã được dạy sẽ đưa ra kết quả random.

Giống như với adversarial attacks, mình nghĩ có thể tìm ra một watermark gần tương tự với cái thật mà vẫn ra kết quả tương tự. Có thể nó không ứng dụng với watermark loại 1.

## Hết.
Hãy like subscribe và comment vì nó miễn phí?