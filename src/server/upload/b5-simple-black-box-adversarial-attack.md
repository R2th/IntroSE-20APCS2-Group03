Đây là một bài trong series [Báo khoa học trong vòng 5 phút](https://viblo.asia/s/bao-khoa-hoc-trong-vong-5-phut-rLZDX4YnZk0).

## Nguồn
Được viết bởi Guo *et. al*, Cornell University. Được đăng ở ICML '19.<br>
https://arxiv.org/pdf/1905.07121.pdf

## Ý tưởng chính
- Tấn công theo một tập hợp các hướng vuông góc và độc lập với nhau, với bước nhảy (step size) $\epsilon$ bé.
- Có hai mô hình tấn công:
    - Tấn công gây mô hình đoán sai: chỉ cần lớp đầu ra sai là được.
    - Tấn công gây mô hình đoán ra lớp đã định trước: ví dụ, lừa mô hình hải quan nhìn cái camera ra khẩu súng, hậu quả sẽ khá lớn.
- Với ảnh đầu vào $\mathbf{x}$ và mỗi hướng đi $\mathbf{q}$, thì một trong 2 $\mathbf{q}+\epsilon\mathbf{x}$ hoặc $\mathbf{q}-\epsilon\mathbf{x}$ sẽ phải hướng kết quả của adversarial input theo hướng chúng ta mong muốn:
    - Tấn công gây mô hình đoán sai: giảm độ tự tin của mô hình vào đáp án đúng $\min p(y|\mathbf{x})$.
    - Tấn công gây mô hình đoán ra lớp đã định trước: tăng độ tự tin của mô hình vào đáp án mong muốn của kẻ tấn công $\max p(y'|\mathbf{x})$.
<br><sub>Có thể hiểu đây là một bài toán tối ưu giống như khi luyện mô hình với một hàm mất mát, tuy nhiên ở đây hàm mất mát là ngầm và không được biết. Vậy, từng bước nhảy trên giá trị đầu vào đó giống như Gradient Descent vậy, chỉ mỗi cái là hướng đi không phải là tối ưu để giảm hàm mất mát như GD.</sub>
- Thuật toán đơn giản:
    - Chốt trước bước nhảy $\epsilon$, và một tập hợp các vector đơn vị vuông góc $\mathbf{Q}=\{\mathbf{q}_1, \mathbf{q}_2,\dots,\mathbf{q}_n\}$.
<br><sub>Thí nghiệm cho thấy có thể chọn $\epsilon$ bất kỳ từ 0 đến 1, với giá trị càng to thì hội tụ càng nhanh.</sub>
    - Chọn ngẫu nhiên không lặp lại một $\mathbf{q}_i$, thử hướng đi và chọn dấu $\mathbf{x}\pm\epsilon\mathbf{q}_i$ tương ứng với mô hình tấn công
    - Cập nhật $\mathbf{x}$ theo hướng đi đã xác định ở trên cho đến khi mô hình predict theo ý muốn.
- Với thiết kế thuật toán như trên, sau khi cập nhật ảnh đầu vào $\mathbf{x}$ của chúng ta $T$ lần, thì độ lớn của các biến đổi $\delta$ được tính bởi $\Vert\delta\Vert_2=\sqrt{T}\epsilon$. Từ đó, để ảnh không bị thay đổi quá mức, chúng ta có thể giới hạn số bước nhảy hoặc độ dài mỗi bước nhảy phù hợp.
- Có 2 cách chọn tập hợp các hướng đi $\mathbf{Q}$:
    - One-hot basis: mỗi ma trận hướng đi có tất cả giá trị bằng 0 ngoại trừ một ô có giá trị bằng 1. Cài đặt này tương ứng với việc thử thay đổi từng pixel một trong ảnh.
    - Ma trận biến đổi DCT: khi biến đổi qua miền tần số, các giá trị ở các tần số thấp hơn thường có tính chất adversarial hơn. Sau khi lấy được các tần số của ảnh, chúng ta chỉ giữ lại các tần số thấp để làm hướng tấn công.
- Kết quả thí nghiệm:
    - Theo mục đích tấn công: cũng khá dễ hiểu khi tác giả thấy dạng tấn công đầu (chỉ dụ mô hình đoán sai thôi) hội tụ nhanh hơn so với dạng tấn công thứ hai (dụ mô hình đoán sai thành một lớp cụ thể).
    - Theo tập hợp các hướng tấn công:
        - One-hot hội tụ chậm hơn, nhưng các ảnh khó tấn công nhất yêu cầu ít thay đổi (và query) hơn so với DCT.
        - Số ảnh One-hot thất bại ít hơn DCT, trong đó với dạng tấn công đầu không có ảnh nào thất bại.

## Điểm cộng
- Có thể xác nhận sở hữu với các mô hình hộp đen: ví dụ, nếu đối tượng chỉ mở API.
- Sử dụng ít query do các hướng attack vuông góc (và do đó, độc lập) với nhau.

## Điểm trừ
- Chỉ hoạt động khi có full vector xác suất phân lớp đầu ra (thay vì chỉ lớp đầu ra như đa số các dịch vụ online).

## Lỗ hổng
- Tác giả cho rằng các tần số thấp của ảnh mang tính adversarial cao, theo [một nghiên cứu khác của tác giả](https://arxiv.org/pdf/1809.08758.pdf); trong khi đó [nhiều bài báo khác](https://arxiv.org/pdf/1905.02175.pdf) lại [cho rằng ngược lại](https://arxiv.org/pdf/1905.13545.pdf). Mong các cao nhân có kinh nghiệm hơn về mảng này chỉ giáo.

## Bình luận
- Tác giả chọn ngẫu nhiên không lặp lại các hướng đi để có thể giới hạn độ thay đổi của ảnh; tuy nhiên, điều đó có thể ảnh hưởng tới khả năng hoạt động của mô hình. Bởi vì, khi phiên bản mới của ảnh đã thay đổi, thì cái gradient của ảnh đó cũng thay đổi, và các hướng đã đi rồi có thể lại là hướng tối ưu. Vậy, liệu việc chọn lặp lại vector nhưng chỉ cho các ảnh tấn công bất thành có thể giải quyết vấn đề?
- Liệu việc chọn các hướng đi theo SVD là một hướng đi đáng để xem xét: bởi vì, với một ảnh $\mathbf{S}=\mathbf{U\Sigma V}^\top=\sum\sigma_i\mathbf{u}_i\mathbf{v}_i^\top$, thì các ma trận nhỏ trong tổng trên cũng vuông góc với nhau:
$$(\mathbf{u}_i\mathbf{v}_i^\top)^\top(\mathbf{u}_j\mathbf{v}_j^\top)=\mathbf{v}_i(\mathbf{u}_i^\top\mathbf{u}_j)\mathbf{v}_j^\top=0.$$

## Hết.
Hãy like subscribe và comment vì nó miễn phí?