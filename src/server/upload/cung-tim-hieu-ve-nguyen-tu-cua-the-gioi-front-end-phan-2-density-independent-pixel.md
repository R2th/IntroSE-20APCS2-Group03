# 1. Mở đầu

[Ở kì trước](https://viblo.asia/p/cung-tim-hieu-ve-nguyen-tu-cua-the-gioi-front-end-phan-1-pixel-4P856PoOZY3), ta đã cùng nhau tìm hiểu về Pixel của CSS, đó là 1 đơn vị độc lập, không bị phụ thuộc vào độ phân giải hay các thông số khác của màn hình. Đối với một loại màn hình (xét theo khoảng cách từ mắt tới màn hình), nó luôn là 1 hằng số không đổi. Điều đó đã giúp cho lập trình viên Web dễ thở hơn rất nhiều.

Ở Android cũng có một đơn vị giống như vậy, Google đặt tên cho nó là DP (hay DIP - Density Independent Pixel). Ngoài ra đơn vị này còn dùng trong React Native [[link]](https://facebook.github.io/react-native/docs/height-and-width.html#fixed-dimensions)

# 2. Một số khái niệm cần nhắc lại

#### Pixel thiết bị:

Là 1 điểm ảnh, nó phụ thuộc vào kích thước màn hình, và độ phân giải màn hình. Thông thường, 1px thiết bị trên các màn hình đều có giá trị khác nhau.

Pixel này là pixel vật lý của thiết bị khác hoàn toàn so với đơn vị px mà ta hay sử dụng trong CSS.

#### Độ phân giải thiết bị - Resolution:

Các bạn thường thấy màn hình có độ phân giải 4k, HD, FullHD, kèm theo nó là 2 con số có dạng P1xP2 phải không nào?

Những con số này thể hiện số pixel có trên màn hình, P1 là số pixel phân bố theo chiều dài, còn P2 là theo chiều rộng.

![](https://images.viblo.asia/d4b0da95-f9d9-44ff-92e9-71931821321a.jpg)

(_ảnh chỉ mang tính chất minh họa, mình k phải seeder đâu nhá =))_)

TV trên có chiều dài 52.4 inch, có 3840px theo chiều ngang. 1px sẽ có giá trị

`1px = 52.4 / 3840 = 0.01365 (inch)`

#### DPI, PPI:

DPI - **Dots Per Inch**. PPI - **Points Per Inch**

Chúng đều là số pixel/điểm ảnh có trên 1 inch độ dài vật lý của thiết bị, biểu thị mật độ pixel trên màn hình.

DPI thấp, 1px có kích thước lớn, hình ảnh có thể sẽ bị răng cưa, không sắc nét bằng DPI cao

![](https://images.viblo.asia/1e74f9f2-8d4e-407c-9023-9f4d248598cf.jpg)

Lấy lại VD màn hình TV trên:

`DPI = 3840 / 52.4 = 73.28 (pixels/inch)`

# 3. Density Independent Pixels

### 3.1 Đặt vấn đề

Các điện thoại Android có nhiều loại kích thước (phone, tablet, TV, ...), hơn nữa chúng lại còn có độ phân giải khác nhau, dẫn đến kích thước pixel luôn thay đổi, gây khó khăn cho nhà phát triển khi dựng giao diện.

Lấy ví dụ đơn giản nhất về 2 điện thoại có cùng kích thước đường chéo 5inch, nhưng 1 chiếc FullHD 1080x1920, 1 chiếc 4K 2160 x 3840.

Nếu bạn là dev, bạn sẽ muốn 1 button trong app của mình hiển thị trên 2 điện thoại này giống nhau phải không nào?

Thế nhưng nếu làm việc với px thiết bị, ta sẽ gặp 1 chút rắc rối vì với cùng 1 kích thước, điện thoại 4K luôn cần gấp đôi số px so với FullHD.

![](https://images.viblo.asia/4b56fc09-40ee-4f95-b7fc-8409b2961e99.jpg)

2 cái đã mệt, trên thực tế, ta có ty tỷ loại màn hình, vậy thì style sao cho xuể, chưa kể còn đến tối ưu các file ảnh cho app.

Chính vì vậy, `dp` ra đời.

### 3.2. DP

Google định nghĩa nó như sau:

> One dp is a virtual pixel unit that's roughly equal to one pixel on a medium-density screen (160dpi; the "baseline" density). Android translates this value to the appropriate number of real pixels for each other density.

Nếu bạn đã đọc bài trước của mình về CSS pixel, thì có thể thấy nó khá quen thuộc phải không nào, đây cũng là 1 _virtual unit_.

**1dp tương đương 1 px trên màn hình 160dpi**. Có nghĩa là `1dp = 1 / 160 = 0.00625 (inch) = 1px (160dpi)`

Để quy đổi `dp` sang `px` trên các loại màn hình khác, ta nhân dp với 1 số, gọi là scale factor (tỉ lệ DPI của màn hình so với chuẩn 160dpi).

Ví dụ máy 320dpi. `1dp = 1 * 320 / 160 = 2px`

Android sẽ tự động convert sang pixel thiết bị cho ta, nên ta chỉ cần dùng `dp` là trên mọi thiết bị, phần tử của ta sẽ đều có kích thước bằng nhau (ngoại lệ sẽ đề cập sau).

Khi ta dựng UI, nên tận dụng tối đa `dp`, tránh sử dụng `px`.

Bên cạnh đó, Google cũng khuyên ta không nên sử dụng `dp` cho text, mà hãy dùng `sp`. Đây cũng là một loại density-independent, nhưng nó có thể bị ảnh hưởng bởi tùy chọn của người dùng. Người dùng chọn cỡ chữ to, thì 1sp cũng lớn lên theo. Vì vậy, cũng tránh dùng `sp` khi thiết kế layout.

### 3.3 Density Bucket

`dp` ra đời, nhưng cũng chưa giải quyết được hết các vấn đề. Đó chính là về resource hình ảnh. Style cho ảnh thì có thể sử dụng dp được (ảnh sẽ bị kéo to, hoặc co lại cho đủ size cần thiết), nhưng resource thì đâu có thể to nhỏ tùy ý được, thông số của nó luôn là cố định.

Lấy ví dụ về 1 hình ảnh 500x500px (resolution), với 2 màn hình có kích thước bằng nhau, nhưng khác độ phân giải (khác DPI), 1 chiếc là 360x640, 1 chiếc là 720x1280.

Hình ảnh trên nếu hiển thị trên màn hình 360x640 thì chẳng phải sẽ dư thừa sao? Vì chiều rộng màn hình chỉ có 360px. Còn trên màn hình 720x1280, thì nó chả đáng là bao. Vì vậy ta cần sử dụng hình ảnh có độ phân giải thấp hơn cho màn hình 360x640.

Nhưng không lẽ cứ mỗi độ phân giải lại tạo 1 hình ảnh tương ứng? Vậy thì app size của ta sẽ bùng nổ luôn.

Vì lẽ đó mà ra đời `density bucket`.

Để cho đơn giản, các loại màn hình có DPI gần bằng nhau sẽ được làm tròn rồi gom vào 1 nhóm. Ví dụ như máy 293dpi, Android sẽ coi như máy đó là 320dpi, khi đó 1dp = 2px. Còn nhiều loại khác nữa, nhưng mình chỉ nêu ra 4 bucket đáng chú ý, best practice là support cả 4 bucket này.

| Bucket name      | Density bucket | DPI | Scale Factor |
| ---------------- | -------------- | --- | ------------ |
| Medium           | mdpi           | 160 | 1.00         |
| High             | hdpi           | 240 | 1.50         |
| Extra High       | xhdpi          | 320 | 2.00         |
| Extra Extra High | xxhdpi         | 480 | 3.00         |

Những gì bạn cần làm là ném hết hình ảnh của các bucket vào thư mục tương ứng. Android sẽ tự detect và chọn hình ảnh tối ưu nhất cho bạn (lấy từ DPI cao nhất về).

![](https://images.viblo.asia/653192f1-8c27-469d-a007-1ac22681ea23.png)

![](https://images.viblo.asia/d606e411-f5cc-4151-b13e-4b2dfd626097.png)

Cũng vì việc làm tròn DPI này, mà 1dp của ta trên các thiết bị có thể không bằng nhau, nhưng **luôn xấp xỉ 1/160 = 0.00625 inch**

| Density | Bucket         | Scale factor | Physical Size (inch)   |
| ------- | -------------- | ------------ | ---------------------- |
| 293dpi  | xhdpi - 320dpi | 2            | 1 \* 2 / 293 = 0.00686 |
| 320dpi  | xhdpi          | 2            | 1 \* 2 / 320 = 0.00625 |
| 330 dpi | xhdpi          | 2            | 1 \* 2 / 330 = 0.00606 |

Điều này cũng đem đến cho ta 1 lợi ích, đó là với các số máy density khác nhau, nhưng cùng độ phân giải, kích thước bề ngang của ta tính bằng dp đều bằng nhau. Lấy ví dụ 3 máy 720x1280, 1 máy 293 dpi, 1 máy 320 dpi, 1 máy 330 dpi.

| Density | Width (without Density Bucket) | Width (with density bucket) |
| ------- | ------------------------------ | --------------------------- |
| 293dpi  | 720 / (293 / 160) = 393dp      | 360dp                       |
| 320dpi  | 720 / (320 / 160) = 360dp      | 360dp                       |
| 330dpi  | 720 / (330 / 160) = 349dp      | 360dp                       |

# 4. Ví dụ

Sau khi nhồi 1 đống lý thuyết vào đầu, ta hãy thử làm 1 bài tập nho nhỏ, để áp dụng chúng. Hãy thử tự tính toán thông số cho điện thoại của mình xem.

Điện thoại mình 5inch, độ phân giải 720x1280.

Ta dễ dàng tính toán được chiều dài và chiều rộng của máy, dựa vào định lý Pytago:

```tx
5**2 = (1280 * x)**2 + (720 * x)**2
width = 720 * x = 2.4513 (inch)
height = 1280 * x = 4.3579 (inch)
```

Từ đó ta có thể tính tất cả các thông số khác:

| Thông số       | Giá trị                   |
| -------------- | ------------------------- |
| Device density | 720 / 2.4513 = 294 dpi    |
| Density bucket | xhdpi - 320dpi            |
| Scale factor   | 320 / 160 = 2.00          |
| Width          | 720 / 2 = 360dp           |
| Height         | 1280 / 2 = 640dp          |
| DIP            | 1dp = 2px = 0.0068 (inch) |

# 5. Kết luận

Sự ra đời của `dp` và `density bucket` quả thực đã giúp ta tránh được không ít rắc rối trong khi phát triển ứng dụng Android, tối ưu hình ảnh cho app. Bài viết không tránh khỏi sai sót, nếu có sạn, hãy cứ góp ý, mình sẽ tiếp thu và chỉnh sửa cho phù hợp.

Đây có lẽ là bài cuối của mình trong series về những thứ bé nhỏ mà ít ai để ý trong khi thiết kế giao diện Web, mobile. Cám ơn mọi người đã đọc bài! - nếu các bạn đọc đến tận dòng này =))

# 6. Link tham khảo

1. https://developer.android.com/training/multiscreen/screendensities
2. https://www.highgroundgaming.com/tas/gaming-mouse-guide/low-vs-high-dpi-example/
3. https://facebook.github.io/react-native/docs/height-and-width.html#fixed-dimensions
4. https://www.avconcepts.com/2015/09/24/4k-ultra-hd-vs-hd-projection/
5. https://www.captechconsulting.com/blogs/understanding-density-independence-in-android
6. https://medium.com/@sashaserg/a-mysterious-density-independent-pixel-a-quick-introduction-to-android-design-111d68be7cf5