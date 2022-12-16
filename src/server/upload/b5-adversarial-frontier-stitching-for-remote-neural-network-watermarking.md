Đây là một bài trong series [Báo khoa học trong vòng 5 phút](https://viblo.asia/s/bao-khoa-hoc-trong-vong-5-phut-rLZDX4YnZk0).<br>
<sub>Bài này thực ra mình đọc không thích lắm, mong là không có bias gì trong tóm tắt này. Nếu có, mong mọi người chỉ ra trong comment section ạ.</sub>
## Nguồn
Được viết bởi Merrer *et. al*. Được đăng ở [Neural Computing and Applications '19](https://link.springer.com/article/10.1007/s00521-019-04434-z).<br>
https://arxiv.org/pdf/1711.01894.pdf

## Ý tưởng chính
- Chọn ra một nhóm $K$ các ví dụ bí mật làm key watermark (ví dụ, 100 cái), rồi được chỉnh sửa làm 2 loại:
    - True adversaries: các ví dụ ban đầu đã phân lớp chính xác, sau đó được thêm các nhiễu adversarial không nhìn thấy được bằng mắt thường để làm mô hình dự đoán sai.
    - False adversaries: các ví dụ ban đầu đã phân lớp chính xác, sau đó được thêm các nhiễu adversarial không nhìn thấy được bằng mắt thường chỉ vừa đủ để mô hình vẫn dự đoán đúng (từ đó các ví dụ đó sẽ ở rất gần vạch phân cách chia các lớp, tưởng tượng như cái biên của SVM).

<sub>Paper gợi ý sử dụng [Fast Gradient Sign Method](https://christophm.github.io/interpretable-ml-book/adversarial.html): $x'=x+\epsilon\cdot\mathrm{sign}(\nabla_xJ(\theta,x,y))$. Về nhiễu adversarial, bạn có thể tham khảo ở mục gần cuối của [bài này](https://viblo.asia/p/tai-sao-mang-tich-chap-lai-hoat-dong-hieu-qua-jvEla076Zkw) của mình.</sub>

- Fine-tune mô hình đó sao cho tất cả các data trong tập key watermark $K$ đều được classify đúng.
- Lý do sử dụng false adversaries là để giới hạn các thay đổi về kết quả của mô hình sau khi đã phân lớp đúng các true adversaries. Đồng thời, những adversaries đó sẽ ảnh hưởng tới hình dạng của đường biên phân lớp, làm cho mô hình chống chọi được với các vector tấn công: nếu watermark bị vô hiệu hoá thì hiệu năng của mô hình cũng sẽ giảm đi đáng kể.

![](https://images.viblo.asia/2f06e34a-ca0c-448d-89e7-3f98f2180762.png)

- Để chứng minh đó là mô hình của bạn, classify các data trong $K$ và xem có bao nhiêu kết quả đúng như dự kiến. Với set $K$ có 100 phần tử, thì nếu từ 42 kết quả đúng trở lên thì đó là mô hình của mình.

<sub>Tác giả lập luận giải thích chọn số 42 bằng [kiểm định giả thiết thống kê](https://vi.wikipedia.org/wiki/Ki%E1%BB%83m_%C4%91%E1%BB%8Bnh_gi%E1%BA%A3_thuy%E1%BA%BFt_th%E1%BB%91ng_k%C3%AA), có bình luận của mình bên dưới.</sub>

## Điểm cộng
- Hoạt động với mô hình hộp đen
- Sửa/gỡ watermark sẽ gây ảnh hưởng đáng kể đến kết quả mô hình

## Điểm trừ
- Chỉ hoạt động với các mô hình phân lớp

## Lỗ hổng
- Định nghĩa thứ 2 về chất lượng của watermark không tốt hơn định nghĩa đầu, thậm chí dở hơn vì làm mờ đi ý tưởng của nó:
    - Việc sử dụng $\approx$ trong định nghĩa là không chặt chẽ (thay vì đó có thể sử dụng $\delta/\epsilon$)
    - Định nghĩa về "effectiveness" đọc vẫn thấy choảng định nghĩa về "robustness."
- Tại sao chỉ chọn 1 giá trị $\epsilon$ cho cả 2 loại adversaries?
- Các bảng trong paper khó hiểu: cột "$K$ elts removed" nghĩa là gì? Nếu là về pruning, tại sao lại liên quan gì đến keys $K$? Nó thì khá chắc không phải về kết quả extract watermark, vì đã có một cột riêng cho cái đó rồi.

## Bình luận
- Tại sao cần có yêu cầu về security của watermark? (nghĩa là watermark phải khó bị detect — một kẻ trộm model không được biết trên đó có tracker :D) Mục tiêu chúng ta đang không phải là đặt bẫy chuột mà chỉ muốn phòng ngừa trộm cắp thôi. Tuy nhiên, cũng dễ hiểu là nếu có yêu cầu đó thì sẽ hay hơn.
- Ý tưởng về một null-model trong kiểm định giả thiết thống kê (null hypothesis testing) có cảm giác không được đúng: tác giả trong paper chọn null model là các model predict với xác suất đúng 50/50 trên các data trong watermark key $K$. Kể cả cho dù các watermark key được xây dựng nhân tạo, nó chỉ predict 50/50 trên mô hình của chúng ta thôi — vì vậy, tại sao cái null model không phải là tất cả các mô hình có thể? (Mình không rành về lý thuyết này lắm nên mong mọi người giải thích nếu mình sai).

## Hết.
Hãy like subscribe và comment vì nó miễn phí?