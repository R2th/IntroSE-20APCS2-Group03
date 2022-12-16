Hãy đối mặt với một sự thật. Dù code của bạn có ngon đến đâu, kiến trúc hệ thống xịn thế nào thì cũng sẽ đến lúc
hệ thống của bạn gặp sự cố (incident). Sự cố có thể đến từ code của bạn, code không phải của bạn, do sự cố từ nhà
cung cấp dịch vụ. Việc nhắm đến 100% uptime giờ đây không còn là một mục tiêu ý nghĩa mà mọi người hướng đến mà thay
vào đó giả định rằng incident sẽ xảy đến vào một ngày nào đó.

> Anything that can go wrong will go wrong

Trong một thế giới công nghệ như hiện nay, vài phút hay vài giây downtime cũng có thể dẫn tới thiệt hại to lớn.
Nhưng dù sao thì nó vẫn sẽ xảy ra và chúng ta sẽ phải khắc phục. Việc theo dõi những chỉ số về incident sẽ giúp chúng
ta có được cái nhìn tổng quan về tính khả dụng của hệ thống, mức độ hiệu quả và phản ứng đối với incident, từ đó có
thể đưa ra những chiến lược hợp lý để giảm thiểu incident và ảnh hưởng của chúng.

4 trong số những chỉ số quen thuộc nhất thường được nhắc đến là MTBF (mean time between failures),
MTTR (mean time to repair), MTTF (mean time to failure), MTTA (mean time to acknowledge).

## MTBF - Mean time between failures

Chỉ số này có nghĩa là thời gian trung bình giữa các sự cố. Nôm na là bao lâu thì hệ thống của bạn sẽ tèo một lần.
Nó thể hiện tính khả dụng và độ tin cậy của hệ thống. Thời gian giữa các sự cố càng lớn thì chứng tỏ hệ thống càng
hoạt động tốt.

Để tính MTBF trong một khoảng thời gian, lấy thời gian hoạt động của hệ thống chia cho số lần xảy ra sự cố trong khoảng
thời gian đó.

$$
MTBF=\tfrac{\text{Total uptime}}{\text{Number of incidents}}
$$

Ví dụ trong một tuần (7 ngày = 168 giờ) hệ thống của bạn xảy ra sự cố 3 lần, downtime tổng cộng là 3 tiếng. Như vậy
tổng thời gian uptime là 165 giờ, chia cho 3 sự cố là ra *MTBF = 55 giờ*

Lưu ý là MTBF chỉ dành cho những sự cố có thể phục hồi được. Ví dụ như sự cố gây ra do bug, kết nối mạng có thể được
phục hồi. Với những sự cố không thể phục hồi được mà cần thay thế, ví dụ như ổ cứng hỏng chằng hạn thì chúng ta sẽ
dùng một chỉ số khác là MTTF.

## MTTR - Mean time to repair/recovery

MTTR là thời gian trung bình sự cố được khắc phục. Hay đơn giản là mỗi lần sập thì bao lâu sau hệ thống của bạn sống lại.

Thời gian khắc phục sự cố có thể được định nghĩa khác nhau.
Ở một số nơi có thể người ta sẽ phân biệt **R** là viết tắt của *repair* hay *recovery*.
Thời gian để *recovery* thì đơn giản là như trên. Nó được tính bằng công thức sau.

$$
MTTR=\tfrac{\text{Total downtime}}{\text{Number of incidents}}
$$

Bằng tổng thời gian downtime chia cho số incident. Ví dụ tháng này bạn có 3 incident và downtime tổng cộng là 1h thì
MTTR của bạn tháng này là 20 phút.

Còn thời gian để *repair* là thời gian team vận hành sửa một lỗi. Quá trình sửa chữa sẽ chậm hơn thời điểm sự cố xảy
ra một chút nên khoảng thời gian sửa chữa sẽ ngắn hơn downtime một chút. Tuy nhiên có những lỗi có thể được ngăn chặn
trước khi nó được push lên production (thông qua testing chẳng hạn) và chúng ta sẽ có MTTR cho lỗi đó bằng 0, bởi vì nó
chưa kịp gây ra tí downtime nào. Trong trường hợp này MTTR có liên quan trực tiếp đến MTBF vì càng nhiều lỗi được sửa
trước khi lên production thì khả năng hệ thống bạn sẽ sập vì lỗi sẽ thấp hơn phải không.

Dù sao thì cả 2 cách hiểu đều có nhược điểm. Với repair thì không thể hiện được thời gian hệ thống thực sự không sử dụng
được. Còn với recovery thì lại không thể hiện được chi tiết về mức độ hiệu quả của team vận hành khi xảy ra sự cố, vì
thiếu những chi tiết như thời gian phát hiện hay phản ứng khi có sự cố. Chỉ số tiếp theo sẽ giúp chúng ta đánh giá
những thứ này.

## MTTA - Mean time to acknowledge

MTTA là thời gian trung bình để phát hiện ra sự cố. Nghĩa là sau khi sự cố xảy ra bao lâu thì team vận hành biết được
và tiến hành khắc phục. Khoảng thời gian này được tính từ lúc hệ thống cảnh báo tự động được kích hoạt đến lúc team vận
hành bắt đầu sửa chữa. Vậy nên chúng ta có công thức tính như sau.

$$
MTTA=\tfrac{\text{Total team between alert and acknowledgement}}{\text{Number of incidents}}
$$

## MTTF - Mean time to failure

Đây là thời gian trung bình cho tới lần xảy ra sự cố tiếp theo.
Cái này tương tự như MTBF nhưng được sử dụng cho những sự cố không thể sửa chữa được mà buộc phải thay thế.
Nó dùng để dự đoán lần tiếp theo sự cố xảy ra để có thể lên kế hoạch thay thế trước khi ngày đó đến.

Ví dụ như chúng ta có số liệu thống kế ổ cứng thường sẽ gặp sự cố sau 1 năm sử dụng, thì tốt hơn hết là nên thay ổ cứng
mới khi được 10-11 tháng thôi, đừng đợi đến lúc nó hỏng mới thay.

Ngoài ra chúng ta cũng có thể dùng nó để so sánh chất lượng của sản phẩm mới với sản phẩm cũ nữa. Sống lâu hơn nghĩa là
tốt hơn rồi.

Tóm lại cái này sẽ chủ yếu dùng cho phần cứng, và dùng để lên kế hoạch hơn là để phân tích.

## Đâu là chỉ số bạn nên quan tâm

Với một hệ thống phần mềm thì có lẽ chúng ta không cần quan tâm đến MTTF lắm vì lí do như vừa nói ở trên.
Với 3 chỉ số còn lại thì mỗi chỉ số đều có ý nghĩa riêng.

- MTTR sẽ giúp bạn đánh giá mức độ hiệu quả của team dev hoặc vận hành khi giải quyết sự cố.
- Kết hợp MTTR với MTTA có thể giúp bạn biết được hệ thống cảnh báo có hoạt động tốt hay không
  (cảnh báo muộn hay không đúng người chẳng hạn).
- MTBF thì mang lại bức tranh toàn cảnh về chất lượng của cả hệ thống.