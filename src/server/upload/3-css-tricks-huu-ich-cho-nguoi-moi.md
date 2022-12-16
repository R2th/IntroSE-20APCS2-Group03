![](https://images.viblo.asia/35dc585b-6f4b-4dc6-b530-e40731250dbe.jpg)
1. Tạo hiệu ứng thu hút với keyframes radial-pulse
Nếu bạn muốn user click vào 1 button nào đó, có nhiều cách khác nhau để đạt được hiệu quả. Và mình muốn chia sẽ 1 trick khá đơn giản nhưng mượt mà. Ví dụ codepen luôn:
{@embed: https://codepen.io/davidmellul/pen/BVQrrg}

Ưu điểm:
Không làm thay đổi chiều rộng hoặc cao của element đó => tránh làm vỡ layout
Dễ dàng custom lại màu sắc, thời lương hay kích thước hiệu ứng
Đơn giản nhưng hiệu quả

2.	Căn giữa element theo chiều dọc và ngang
Khá nhiều người sử dụng css lâu năm vẫn mệt mỏi với việc căn giữa element mà ko hardcode kiểu margin-top: 15px hay padding-left: 20px.
Và với display flex trong phiên bản CSS3, rất dễ để căn giữa element với vài dòng code như sau:
.parentElement: display:flex + justify-content:center + align-items:center
Ví dụ codepen: {@embed: https://codepen.io/davidmellul/pen/oyYdpR}

3.	Vỡ layout khi add border
Hẳn nhiều bạn trong 1 số trường hợp khi them border vào 1 div nào đó và khiến layout lỗi tung tóe lên, thằng div bên cạnh đang nằm cạnh thì lại bị nhảy xuống dòng
Giải pháp:
Sử dụng box-sizing: border-box lên element có border, như vậy width của element đó sẽ bao gồm luôn border width.
Ko dung border nữa mà sử dụng box-shadow để thay thế, ví dụ minh họa:
{@embed: https://codepen.io/davidmellul/pen/vryRmr}

Cảm ơn các bạn đã đọc bài viết này của mình, mình hy vọng nó sẽ giúp ích ít nhiều cho các bạn ^^