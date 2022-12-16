Đây là một bài trong series [Báo khoa học trong vòng 5 phút](https://viblo.asia/s/bao-khoa-hoc-trong-vong-5-phut-rLZDX4YnZk0).<br>
<sub>Lẹm 1' mong mọi người bỏ qua (^^;)</sub>

## Nguồn
Được viết bởi Nagai *et. al*, KDDI Research. Được đăng trong [International Journal of Multimedia Information Retrieval '18](https://link.springer.com/article/10.1007/s13735-018-0147-1).<br>
https://arxiv.org/pdf/1802.02601.pdf

## Ý tưởng chính
- 3 phương pháp nhúng watermark vào mô hình:
    - train-to-embed: nhúng từ khi bắt đầu dạy
    - finetune-to-embed: nhúng sau khi đã dạy bằng fine-tuning
    - distill-to-embed: nhúng sau khi đã dạy bằng [knowledge distillation/teacher-student](https://arxiv.org/pdf/1503.02531)
- sử dụng một mạng MLP riêng để tách watermark nhị phân (0/1) từ các trọng số của 1 (số) lớp nào đó.
    - trong paper sử dụng một ví dụ cụ thể được đơn giản hoá:
        - linear "classification" thay vì MLP: phân lớp sẽ ra 0/1 đúng như binary domain cần có
        - sử dụng trọng số của một lớp convolutional trong mạng Wide ResNet làm chỗ giấu watermark
    - cấu trúc của mạng watermark là bí mật, và lớp trọng số chứa watermark cũng là bí mật
        - nếu vị trí của những trọng số chứa watermark bị lộ ra, mô hình này có thể bị vô hiệu hoá bằng tấn công ghi đè watermark
        - nếu sợ lộ, có thể nhúng watermark vào *tất cả* các lớp trọng số.
    - cấu hình cơ bản của mạng MLP lấy watermark:
        - đầu vào: từ tensor $\mathbf{W}\in\mathbb{R}^{H\times W\times C\times F}$, lấy trung bình của các channel/filter để ra một ma trận 2D $\bar{\mathbf{W}}\in\mathbb{R}^{H\times W}$, rồi reshape thành vector cột $\mathbf{w}$.
        - đầu ra: sau sigmoid, một vector 0/1
        - hàm mất mát $E_R$: binary cross-entropy
    - nhúng watermark bằng hàm mất mát chứa watermark regularization: hàm mất mát là tổng của loss mô hình chính $E_0$ và loss mô hình lấy watermark (có nhân hệ số $\lambda$ như regularization bình thường): $E(\mathbf{w})=E_0(\mathbf{w})+\lambda E_R(\mathbf{w})$
    - trong trường hợp sử dụng phân lớp tuyến tính 1-lớp làm mạng lấy watermark: có 3 cách lựa chọn weight của mạng đó:
        - `direct`: mỗi hàng có 1 số $1$ và tất cả còn lại là $0$
            - tương ứng với việc chọn 1 trong các giá trị trong vector $\mathbf{w}$ cho mỗi giá trị đầu ra.
        - `diff`: mỗi hàng có 1 số 1, một số $-1$, và còn lại là $0$
            - mỗi giá trị trong vector đầu ra là (sigmoid của) chênh lệch của 2 giá trị trong $\mathbf{w}$
        - `random`: mọi giá trị được sample từ $\mathcal{N}(0,1)$
            - mỗi giá trị đầu ra là một kết hợp tuyến tính ngẫu nhiên của các giá trị trong $\mathbf{w}$.
    - kết quả: `random` cho kết quả nhúng watermark tốt nhất và không làm thay đổi phân bố trọng số của layer gốc
- watermark sống sót qua fine-tune, pruning (không kèm fine-tuning), nhưng sẽ mất nếu sử dụng distillation

## Điểm cộng
- có thể nhúng watermark trước, giữa, hay sau khi train model
- watermark khó bị gỡ
- mỗi key cho một mô hình khác nhau, có thể dùng làm auth key

## Điểm trừ
- chỉ có thể sử dụng trong trường hợp hộp trắng
- có thể bị tấn công bởi tấn công distillation

## Lỗ hổng
- tại sao watermark histogram không có các giá trị gần 0? vì watermark phải bao gồm cả 0 và 1?
- **[using random scheme gives] "no alteration of the parameter distribution"**: phân bố trọng số sau khi nhúng nhìn giống (trong cùng) exponential family không có nghĩa là phân bố không thay đổi.
- **"Table _ shows the best test errors"**: vi phạm các yêu cầu cơ bản về data snooping/validation-vs-test?
- **"poor local minima are rarely a problem with large networks in practice"**: việc train model khèo xảy ra khá thường xuyên, phụ thuộc vào độ phức tạp của mô hình và điểm bắt đầu của trọng số trước khi train, nhất là khi các mô hình RL thường bị khèo với xác suất 3/10 (nhớ là như vậy, google cite nếu cần thiết).
- **[overwriting attack requires] "regularizer parameters"**: không nhất thiết nếu đã biết lớp nào chứa watermark: xoá lớp đấy đi, [LwF](https://viblo.asia/p/lam-the-nao-de-dung-mot-model-cho-nhieu-cong-chuyen-1VgZv40O5Aw) các lớp còn lại (giảm tốc độ thay đổi trọng số hoặc đóng băng lại), rồi retrain.

## Bình luận
- tác giả có chọn layer cụ thể cho test kết quả đẹp? vì trong biểu đồ thì phân bố trọng số nhìn giống exponential family, nhưng thực tế các lớp cuối nhiều thông tin hơn có giá trị trọng số to hơn nhiều
- có thể lý do tại sao cách nhúng watermark của tác giả hoạt động tốt vì phân bố như đã nói trên khá "đẹp," hoặc cũng có thể tại paper sử dụng mạng Wide ResNet: lớp có càng nhiều trọng số thì thông tin của watermark càng được rải đều.
- tác giả có đề cập việc fine-tune sau pruning trong future work, nhưng lại không test trong mục experiment — mục này cần được đề cập.
- tác giả sử dụng *bit error rate* để nhận xét xem watermark đã bị xoá hẳn chưa. tại sao không so sánh khoảng cách thống kê (statistical distance) từ output (watermark hỏng) tới kết quả đúng, và output tới phân bố Bernoulli tiêu chuẩn.
- "distillation does not seem to be an important attack in reality, since it requires data that are very similar to the inputs": đúng là như vậy, tuy nhiên trường hợp unlabeled raw data dễ có (bằng scraping google chẳng hạn) thì sao? chỉ annotate là khó thôi, nhưng distillation không cần labels.

## Hết.
Hãy like subscribe và comment vì nó miễn phí?