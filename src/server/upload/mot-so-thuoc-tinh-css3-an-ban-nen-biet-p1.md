CSS3 đã làm cho thiết kế web trở nên thú vị hơn với việc giới thiệu các thuộc tính mới. Mặc dù bạn có thể biết về những cái phổ biến, chẳng hạn như bóng hộp , bán kính đường viền và biến đổi , có rất nhiều thuộc tính mà bạn có thể chưa nghe nói hoặc đã thử, nhưng sẽ rất vui khi biết về sự tồn tại của nó.

W3C liên tục làm việc trên các thuộc tính CSS mới để làm cho web tốt hơn nhiều cho các nhà thiết kế, nhà phát triển và người dùng. Trong khi đó, chúng ta hãy xem 10 thuộc tính này bạn có thể không biết nhưng thực sự nên thử nó.

# 1. Tab-size
Hầu hết các trình soạn thảo mã được trang bị điều khiển Kích thước tab cho phép nhà phát triển chỉ định chiều rộng thụt mã được thực hiện bằng phím Tab . Chỉ gần đây, chúng tôi cũng có thể tùy chỉnh thụt lề của mã được nhúng trên các trang web.
```
pre {
  tab-size: 2;
}
```
Lưu ý rằng mỗi trình duyệt có thể có cách hiểu riêng về đơn vị chiều rộng của tab nên dài bao nhiêu. Vì vậy, chúng tôi có thể mong đợi để thấy một số khác biệt giữa các trình duyệt khác nhau. Về mặt hỗ trợ trình duyệt, tab-sizetài sản hoạt động trong Chrome, Opera, Firefox và Safari theo CanIUse .
![](https://images.viblo.asia/10ce5fdb-6362-4af6-b9e0-a3c540fda4f6.jpg)
# 2. Text-rendering
Các text-renderingbất động sản sẽ nói với các trình duyệt như thế nào họ nên làm cho văn bản trong trang web. Văn bản sẽ được tối ưu hóa cho hiệu suất, mức độ dễ đọc hoặc độ chính xác, cuối cùng sẽ xác định chất lượng văn bản. Hãy xem xét kỹ hơn về độ sáng của văn bản trong ảnh chụp màn hình sau đây để so sánh giữa văn bản và optimizedLegibilityvăn bản 'bình thường' .

![](https://images.viblo.asia/ab54d04d-0f48-497b-af7e-09b184f49dac.jpg)
# 3. Font-stretch
Một số phông chữ cung cấp các khuôn mặt bổ sung ngoài các chữ thường, đậm và nghiêng thông thường. Helvetica Neue hoặc Myriad Pro là một ví dụ đi kèm với các khuôn mặt như 'Ngưng tụ', 'Siêu cô đặc' và 'Bán ngưng tụ'. Đây là nơi một tài sản mới được gọi font-stretchlà giới thiệu; nó cho phép chúng ta áp dụng những khuôn mặt này.
![](https://images.viblo.asia/2927eb70-84b6-4477-8376-7ab054052970.jpg)
Chúng tôi có thể sử dụng font-stretchkết hợp với thuộc tính phông chữ, ví dụ , font-style. Đây là một ví dụ:
```
h1 {
  font-style: bold;
  font-stretch: ;
}
```
Các font-stretchbất động sản hiện nay chỉ hoạt động trong Firefox và Internet Explorer 9 (trở lên).
# 4. Text-overflow
Các text-overflowtài sản quy định cụ thể trình bày nội dung đó là tràn hoặc cắt ngắn bằng container của nó. Giá trị mặc định được đặt thành clipchỉ đơn giản là ẩn văn bản bị cắt bớt. Thay phiên, bạn có thể đặt nó để ellipsismô tả văn bản hoặc nội dung bị cắt bớt bằng dấu chấm lửng ngang , như sau.
```
.content-box {
  text-overflow
}
```
Trong trường hợp bạn đang tự hỏi, dấu chấm lửng ngang là ba dấu chấm ở cuối thường biểu thị nội dung bị bỏ qua.
![](https://images.viblo.asia/128c6752-9cf9-4c73-b912-494131a5ce22.jpg)

# 5. Writing-mode
Không phải mọi ngôn ngữ được viết từ hướng trái sang phải. Thay vào đó, một vài ngôn ngữ được viết từ trên xuống dưới như tiếng Nhật hoặc từ phải sang trái như tiếng Ả Rập và tiếng Do Thái.
![](https://images.viblo.asia/cbbb2925-1850-42af-80d8-7615ddbd1774.jpg)
Để phù hợp với các ngôn ngữ này, một thuộc tính mới có tên writing-modeđược giới thiệu để cho phép các nhà phát triển thay đổi hướng viết nội dung thông qua CSS. Đoạn mã này, ví dụ, điều hướng luồng nội dung từ trái sang phải (bất kể ngôn ngữ).
```
p {
  writing-mode: rl-tb;
}
```
Để thay đổi luồng nội dung, di chuyển từ trên xuống dưới, đặt thuộc tính với vertical-lrgiá trị:
```
p {
  writing-mode: vertical-lr;
}
```